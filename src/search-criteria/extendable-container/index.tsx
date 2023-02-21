import React from 'react';
import cls from 'classnames';
import { Button } from 'antd';
import consoler from 'lib/consoler';
import { sortBy } from 'utils/sort';

import { ExtendableContainerContext } from './context';
import { convertChildrenToData } from './util';
import ExtendableField, { ExtendableFieldProps } from './field';
import { IExtendableField } from './type';
import Select from '../select';
import './index.less';

interface ExtendableContainerProps {
  className?: string;
  style?: React.CSSProperties;
  inline?: boolean;
  value?: string[];
  onChange?: (value?: string[]) => void;
  onClose?: (field: IExtendableField) => void;
  onAdd?: (field: IExtendableField) => void;
  children?: React.ReactNode;
  extra?: React.ReactNode;
}

interface ExtendableContainerState {
  value?: string[];
  currentOpen?: string;
  isMoreOpen?: boolean;
}

class ExtendableContainer extends React.Component<
  ExtendableContainerProps,
  ExtendableContainerState
> {
  public static Field = ExtendableField;
  private _fieldsMapRef = React.createRef<Map<string, IExtendableField>>();
  private _fixedFieldsRef = React.createRef<IExtendableField[]>();
  private _extendableFieldsRef = React.createRef<IExtendableField[]>();
  private _moreFieldsSortedRef = React.createRef<IExtendableField[]>();

  constructor(props: ExtendableContainerProps) {
    super(props);

    this.state = {
      value: props.value,
      currentOpen: undefined,
      isMoreOpen: false,
    };

    this.recollectFields(props.children);
  }

  public getSnapshotBeforeUpdate(
    prevProps: Readonly<ExtendableContainerProps>
  ) {
    if (prevProps.children !== this.props.children)
      this.recollectFields(this.props.children);
    return null;
  }

  public componentDidUpdate(prevProps: Readonly<ExtendableContainerProps>) {
    if (prevProps.value !== this.props.value)
      this.setState({ value: this.props.value });
  }

  public hasProp(prop: string, props = this.props) {
    return props.hasOwnProperty(prop);
  }

  public hasValueProp(props = this.props) {
    return this.hasProp('value', props);
  }

  public getValue() {
    return this.hasValueProp() ? this.props.value : this.state.value;
  }

  public setValue(value?: string[]) {
    const v = Array.from(
      new Set(
        (this.getFixedFields().map(field => field.name) ?? []).concat(
          value ?? []
        )
      )
    );

    this.props.onChange?.(v);
    this.setState({ value: v });
  }

  public setCurrentOpen(name?: string) {
    this.setState({ currentOpen: name });
  }

  public setIsMoreOpen(open?: boolean) {
    this.setState({ isMoreOpen: open });
  }

  private recollectFields(children: React.ReactNode) {
    const { fields, fieldsMap } = convertChildrenToData(children);
    // @ts-ignore
    this._fieldsMapRef.current = fieldsMap;
    // @ts-ignore
    this._fixedFieldsRef.current = fields.filter(field => field.fixed);
    // @ts-ignore
    this._extendableFieldsRef.current = fields.filter(field => !field.fixed);
    // @ts-ignore
    this._moreFieldsSortedRef.current = fields
      .filter(field => !field.fixed)
      .sort((a, b) => (a.text ?? '').localeCompare(b.text ?? ''));
  }

  public dropField(name: string) {
    const { onClose } = this.props;
    this.setValue(this.getValue()?.filter(item => item !== name));
    const field = this.getField(name);
    if (!field) return;
    if (onClose) onClose(field);
    if (field.onClose) field.onClose(field);
  }

  public addField(name: string) {
    const { onAdd } = this.props;
    this.setValue((this.getValue() ?? []).concat(name));
    const field = this.getField(name);
    if (!field) return;
    if (onAdd) onAdd(field);
  }

  public sortFields(fields?: IExtendableField[]) {
    return sortBy<IExtendableField>(
      { comparer: (a, b) => (a.fixed ? 1 : 0) - (b.fixed ? 1 : 0) },
      { comparer: (a, b) => (a.priority ?? 0) - (b.priority ?? 0) }
    )(fields);
  }

  public getField(name: string) {
    return this._fieldsMapRef.current?.get(name);
  }

  public getFields() {
    return Array.from(this._fieldsMapRef.current?.values() ?? []);
  }

  public getFixedFields() {
    return this._fixedFieldsRef.current ?? [];
  }

  public getExtendedFields() {
    const value = this.getValue();
    return (
      value?.reduce<IExtendableField[]>((o, item) => {
        const field = this.getField(item);
        if (field && !field.fixed) return o.concat(field);
        return o;
      }, []) ?? []
    );
  }

  public getCurrentFields() {
    return (this.getFixedFields() ?? []).concat(this.getExtendedFields() ?? []);
  }

  public getMoreFields() {
    return this._moreFieldsSortedRef.current ?? [];
  }

  public renderField(field: IExtendableField) {
    return this.getField(field.name)?.node;
  }

  public renderFields(fixed?: boolean) {
    const fields = fixed ? this.getFixedFields() : this.getExtendedFields();

    return <>{fields.map(field => this.renderField(field))}</>;
  }

  public renderMore() {
    const value = this.getValue();
    const { isMoreOpen } = this.state;
    const footer = (
      <>
        <Button
          size="small"
          type="link"
          onClick={() => {
            this.setIsMoreOpen(false);
            this.getExtendedFields()?.forEach(field =>
              this.dropField(field.name)
            );
            // reset value;
            this.setValue([]);
          }}
        >
          Reset
        </Button>
        <Button
          size="small"
          type="primary"
          onClick={() => this.setIsMoreOpen(false)}
        >
          Ok
        </Button>
      </>
    );
    return (
      <Select<string[]>
        colon={false}
        multiple
        ignoreCase
        label="More"
        value={value}
        footer={footer}
        onOpen={open => this.setIsMoreOpen(open)}
        open={isMoreOpen}
        renderSelectorValue={() => <></>}
        onSelect={(checked, key) => {
          consoler.log(`onSelect: checked is %o, value is %o`, checked, value);
          // only when oepn a new field, need to close more overlay
          if (checked) this.setIsMoreOpen(false);
          this.setCurrentOpen(key as string);
          if (checked) this.addField(key as string);
          else this.dropField(key as string);
        }}
      >
        {this.getMoreFields()?.map(field => (
          <Select.Option
            key={field.name}
            value={field.name}
            name={field.text}
            disabled={field.fixed}
            hidden={field.fixed}
          >
            {field.label ?? field.text}
          </Select.Option>
        ))}
      </Select>
    );
  }

  public render() {
    const { style, className, inline = true, extra } = this.props;
    const { currentOpen } = this.state;

    return (
      <div
        style={style}
        className={cls(
          'search-criteria-extend-container',
          inline && 'search-criteria-extend-container-inline',
          className
        )}
      >
        <ExtendableContainerContext.Provider
          value={{
            value: this.getValue(),
            onDrop: this.dropField.bind(this),
            isOpen: name => name === currentOpen,
            onOpen: name => this.setCurrentOpen(name),
          }}
        >
          <div className="search-criteria-extend-container-row fixed">
            {this.renderFields(true)}
            {this.renderMore()}
            <>{extra}</>
          </div>
          <div className="search-criteria-extend-container-row extended">
            {this.renderFields(false)}
          </div>
        </ExtendableContainerContext.Provider>
      </div>
    );
  }
}

export { ExtendableField, ExtendableFieldProps, ExtendableContainerProps };
export default ExtendableContainer;

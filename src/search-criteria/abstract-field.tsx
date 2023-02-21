import React from 'react';
import cls from 'classnames';
import { Dropdown as AntdDropdown } from 'antd';
import Flexbox from '../flexbox';
import Button from '../button';
import Selector from './selector';
import './index.less';

interface OverlayWrapperProps {
  className?: string;
  style?: React.CSSProperties;
  footer?: React.ReactNode | null;
  okText?: React.ReactNode;
  closeText?: React.ReactNode;
  onOk?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
}

const OverlayWrapper: React.FC<OverlayWrapperProps> = React.memo((props) => {
  const {
    className,
    style,
    footer,
    okText = 'Ok',
    closeText = 'Close',
    children,
    onOk,
    onClose,
  } = props;
  return (
    <div style={style} className={cls('search-criteria-overlay', className)}>
      <div className="search-criteria-overlay-body">{children}</div>
      <div className="search-criteria-overlay-footer">
        {footer ?? (
          <Flexbox justify="flex-start" gutter={7}>
            <Button size="small" type="link" onClick={() => onClose?.()}>
              {closeText}
            </Button>
            <Button size="small" type="primary" onClick={() => onOk?.()}>
              {okText}
            </Button>
          </Flexbox>
        )}
      </div>
    </div>
  );
});

export interface AbstractFieldProps<TValue> {
  className?: string;
  style?: React.CSSProperties;
  selectorClassName?: string;
  selectorStyle?: React.CSSProperties;
  selectorBodyClassName?: string;
  selectorBodyStyle?: React.CSSProperties;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  placeholder?: string;
  colon?: boolean;
  allowClose?: boolean;
  label?: React.ReactNode;
  name?: string;
  open?: boolean;
  value?: TValue;
  disabled?: boolean;
  onChange?: (value?: TValue) => void;
  onClose?: () => void;
  onOpen?: (open?: boolean) => void;
  footer?: React.ReactNode | null;
  okText?: React.ReactNode;
  closeText?: React.ReactNode;
}

export interface AbstractFieldState<TValue> {
  open?: boolean;
  value?: TValue;
}

abstract class AbstractField<
  TValue,
  TProps extends AbstractFieldProps<TValue> = AbstractFieldProps<TValue>,
  TState extends AbstractFieldState<TValue> = AbstractFieldState<TValue>
> extends React.PureComponent<TProps, TState> {
  constructor(props: TProps) {
    super(props);

    this.state = {
      open: props.open,
      value: props.value,
    } as TState;
  }

  public abstract renderSearchCriteria(): JSX.Element;
  public abstract renderSelectorValue(value?: TValue): React.ReactNode;

  public componentDidUpdate(prevProps: TProps, _: TState) {
    if (this.props.value !== prevProps.value)
      this.setState({ value: this.props.value });
    if (this.props.open !== prevProps.open)
      this.setState({ open: this.props.open });
    if (
      this.props.open &&
      this.props.open !== prevProps.open &&
      this.props.hasOwnProperty('value')
    ) {
      this.setState({ value: this.props.value });
    }
  }

  public getFieldStateOpen() {
    return this.state.open;
  }

  public getFieldStateValue() {
    return this.state.value;
  }

  public setFieldStateOpen(open?: boolean) {
    this.setState({ open });
  }

  public setFieldStateValue(value?: TValue) {
    this.setState({ value });
  }

  public getFieldValue() {
    return this.props.hasOwnProperty('value')
      ? this.props.value
      : this.state.value;
  }

  public getFieldOpen() {
    return this.props.hasOwnProperty('open')
      ? this.props.open
      : this.state.open;
  }

  public setFieldValue(value?: TValue) {
    if (this.props.hasOwnProperty('value')) {
      this.props.onChange?.(value);
    } else {
      this.setState({ value });
    }
  }

  public setFieldOpen(open?: boolean) {
    if (this.props.hasOwnProperty('open')) {
      this.props.onOpen?.(open);
    } else {
      this.setState({ open });
    }
  }

  public updateFieldValue(value?: TValue) {
    this.setFieldValue(value);
    // WARN: use next tick to recollect latest node after value updated
    Promise.resolve().then(() => this.setFieldOpen(false));
  }

  public renderOverlay(): JSX.Element {
    const { overlayClassName, overlayStyle, footer, okText, closeText } =
      this.props;
    const newValue = this.getFieldStateValue();
    return (
      <OverlayWrapper
        className={overlayClassName}
        style={overlayStyle}
        okText={okText}
        closeText={closeText}
        footer={footer}
        onOk={() => this.updateFieldValue(newValue)}
        onClose={() => this.setFieldOpen(false)}
      >
        {this.renderSearchCriteria()}
      </OverlayWrapper>
    );
  }

  public render() {
    const {
      selectorClassName,
      selectorStyle,
      selectorBodyClassName,
      selectorBodyStyle,
      colon,
      label,
      allowClose,
      disabled,
      onClose,
    } = this.props;
    const open = this.getFieldOpen();
    const value = this.getFieldValue();

    return (
      <AntdDropdown
        trigger={['click']}
        visible={open}
        disabled={disabled}
        onVisibleChange={(open) => this.setFieldOpen(open)}
        overlay={this.renderOverlay()}
        getPopupContainer={(t) => t ?? document.body}
        overlayClassName="search-criteria-dropdown"
        align={{ offset: [0, 1] }}
      >
        <Selector
          className={cls('search-criteria-selector', selectorClassName)}
          style={selectorStyle}
          bodyClassName={selectorBodyClassName}
          bodyStyle={selectorBodyStyle}
          label={
            <Flexbox inline className="search-criteria-selector-label">
              <>{label}</>
              {colon && <>:</>}
            </Flexbox>
          }
          active={open}
          allowClose={allowClose}
          onClose={() => onClose && onClose()}
        >
          {this.renderSelectorValue(value)}
        </Selector>
      </AntdDropdown>
    );
  }
}

export default AbstractField;

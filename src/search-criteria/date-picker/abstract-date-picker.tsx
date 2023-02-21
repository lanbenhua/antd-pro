import React from 'react';
import cls from 'classnames';
import { IDatePickerValue } from './type';
import './index.less';
import AbstractField, {
  AbstractFieldProps,
  AbstractFieldState,
} from '../abstract-field';
import localeJson from './locale.json';

export interface AbstractDatePickerProps<
  TValue extends IDatePickerValue[] | IDatePickerValue
> extends AbstractFieldProps<TValue> {
  hiddenOverlayValue?: boolean;
  renderSelectorValue?: (value?: TValue) => React.ReactNode;
}

abstract class AbstractDatePicker<
  TValue extends IDatePickerValue[] | IDatePickerValue,
  TProps extends AbstractDatePickerProps<TValue> = AbstractDatePickerProps<
    TValue
  >,
  TState extends AbstractFieldState<TValue> = AbstractFieldState<TValue>
> extends AbstractField<TValue, TProps, TState> {
  public datePickerRef = React.createRef<HTMLDivElement>();

  static defaultProps = {
    locale: localeJson,
  };

  constructor(props: TProps) {
    super(props);
    this.getPopupContainer = this.getPopupContainer.bind(this);
  }

  public abstract renderPicker(): JSX.Element;

  public getPopupContainer(node: HTMLElement) {
    return this.datePickerRef.current ?? node ?? document.body;
  }

  public renderSearchCriteria(): JSX.Element {
    const { className, style } = this.props;
    return (
      <div
        className={cls('search-criteria-datepicker', className)}
        style={style}
      >
        {this.renderPicker()}
        <div
          className="search-criteria-datepicker-wrapper"
          ref={this.datePickerRef}
        ></div>
      </div>
    );
  }
}

export default AbstractDatePicker;

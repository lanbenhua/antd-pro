import React from 'react';
import cls from 'classnames';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import './index.less';

export interface IQuotaExtra {
  status?: 'up' | 'down';
  color?: string;
  value?: React.ReactNode;
  prefix?: React.ReactNode;
}
export interface IQuota {
  title?: React.ReactNode;
  value?: React.ReactNode;
  prefix?: React.ReactNode;
  extra?: IQuotaExtra;
}

const Extra: React.FC<IQuotaExtra> = ({ prefix, value, status, color }) => {
  const c =
    color ??
    (status === 'up' ? '#CF1322' : status === 'down' ? '#52C41A' : 'inherit');
  return (
    <div className="aui-quota-extra">
      <span className="aui-quota-extra-prefix">{prefix}</span>
      <span className={cls('aui-quota-extra-value')} style={{ color: c }}>
        {status === 'up' && <CaretUpOutlined color={c} />}
        {status === 'down' && <CaretDownOutlined color={c} />}
        {value}
      </span>
    </div>
  );
};

const Quota: React.FC<
  IQuota & {
    className?: string;
    style?: React.CSSProperties;
  }
> = ({ className, style, title, value, prefix, extra }) => {
  return (
    <div className={cls('aui-quota', className)} style={style}>
      <h2 className="aui-quota-title">{title}</h2>
      <div className="aui-quota-content">
        <span className="aui-quota-content-prefix">{prefix}</span>
        <span className="aui-quota-content-value">{value}</span>
      </div>
      {extra && <Extra {...extra} />}
    </div>
  );
};

export default Quota;

import React from 'react';
import { Spin } from 'antd';
import cls from 'classnames';
import { SpinProps } from 'antd/lib/spin';
import { LoadingOutlined } from 'components/antd/icons';

interface SpinnerProps extends SpinProps {}

const Spinner: React.FC<SpinnerProps> = ({
  children,
  wrapperClassName,
  className,
  indicator = <LoadingOutlined spin />,
  ...rest
}) => {
  return (
    <Spin
      className={cls('sp-spinner', className)}
      wrapperClassName={cls('sp-spinner-wrapper', wrapperClassName)}
      indicator={indicator}
      {...rest}
    >
      {children}
    </Spin>
  );
};

export default Spinner;

import React from 'react';
import cls from 'classnames';
import { LoadingOutlined } from 'components/antd/icons';
import './index.less';

interface SpinningProps {
  spinning?: boolean;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const Spinning: React.FC<SpinningProps> = ({
  spinning,
  size = 20,
  className,
  style,
}) => {
  return (
    <div
      className={cls(
        'sp-spinning',
        spinning ? 'sp-spinning-visible' : 'sp-spinning-hidden',
        className
      )}
      style={style}
    >
      <LoadingOutlined spin size={size} />
    </div>
  );
};

export default Spinning;

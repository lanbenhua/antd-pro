import React from 'react';
import cls from 'classnames';
import './index.less';

interface TextProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  breakWord?: boolean;
}

const Text: React.FC<TextProps> = ({
  className,
  style,
  breakWord,
  children,
}) => {
  return (
    <span
      className={cls('aui-text', className)}
      style={{ wordBreak: breakWord ? 'break-word' : undefined, ...style }}
    >
      {children}
    </span>
  );
};

export default Text;

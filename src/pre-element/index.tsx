import React from 'react';
import cls from 'classnames';
import './index.less';

interface TextProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  breakWord?: boolean;
  border?: boolean;
  card?: boolean;
  wrap?: boolean;
}

const PreElement: React.FC<TextProps> = ({
  className,
  style,
  wrap,
  breakWord,
  border,
  card,
  children,
}) => {
  return (
    <pre
      className={cls(
        'aui-pre-element',
        wrap && 'aui-pre-element-wrap',
        border && 'aui-pre-element-border',
        card && 'aui-pre-element-card',
        className
      )}
      style={{ wordBreak: breakWord ? 'break-word' : undefined, ...style }}
    >
      {children}
    </pre>
  );
};

export default PreElement;

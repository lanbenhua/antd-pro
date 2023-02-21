import React from 'react';
import cls from 'classnames';
import { CloseCircleFilled, DownOutlined } from 'components/antd/icons';
import './index.less';

interface SelectorProps {
  className?: string;
  style?: React.CSSProperties;
  bodyClassName?: string;
  bodyStyle?: React.CSSProperties;
  label?: React.ReactNode;
  children?: React.ReactNode;
  active?: boolean;
  allowClose?: boolean;
  closeIcon?: React.ReactNode;
  switchIcon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClose?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const Selector: React.FC<SelectorProps> = ({
  className,
  style,
  bodyClassName,
  bodyStyle,
  label,
  active,
  allowClose = false,
  switchIcon = <DownOutlined />,
  closeIcon = <CloseCircleFilled />,
  children,
  onClick,
  onClose,
}) => {
  return (
    <div
      onClick={e => onClick?.(e)}
      style={style}
      className={cls(
        'aui-selector',
        active && 'aui-selector-active',
        allowClose && 'aui-selector-allowClose',
        className
      )}
    >
      <div className="aui-selector-content">
        {label && <span className="aui-selector-label">{label}</span>}
        <span
          className={cls('aui-selector-body', bodyClassName)}
          style={bodyStyle}
        >
          {children}
        </span>
      </div>
      {switchIcon || allowClose ? (
        <span className="aui-selector-trigger">
          {switchIcon && (
            <span className="aui-selector-switch">{switchIcon}</span>
          )}
          {allowClose && (
            <a
              className="aui-selector-remove"
              title="Remove selector"
              onClick={e => {
                e.stopPropagation();
                onClose?.(e);
              }}
            >
              {closeIcon}
            </a>
          )}
        </span>
      ) : null}
    </div>
  );
};

export default Selector;

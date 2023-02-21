import React from 'react';
import { createPortal } from 'react-dom';
import cls from 'classnames';
import useBBox, { IEvent, Offset } from './useBbox';
import './index.less';

//TODO: add delay config param
// allow delay to close the popup, and if user enter again, will skip close to keep it open

interface PopupProps {
  style?: React.CSSProperties;
  className?: string;
  wrapperClassName?: string;
  offset?: number | Offset;
  delay?: number;
  event?: IEvent;
  visible: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  getPopContainer?: HTMLElement | (() => HTMLElement);
  getBboxContainer?: HTMLElement | (() => HTMLElement);
}

function Popup({
  visible,
  offset,
  // delay,
  event,
  onClose,
  children,
  style,
  className,
  wrapperClassName,
  getPopContainer = document.body,
  getBboxContainer = document.documentElement,
}: PopupProps): JSX.Element {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const ele = wrapRef.current;
  const container =
    typeof getBboxContainer === 'function'
      ? getBboxContainer()
      : getBboxContainer;
  const popupContainer =
    typeof getPopContainer === 'function' ? getPopContainer() : getPopContainer;

  const [bBox, mutate] = useBBox({
    event,
    ele,
    offset,
    container,
  });

  React.useEffect(() => {
    if (visible) mutate();
  }, [children, visible]);

  React.useEffect(() => {
    const handleClose = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      if (visible && ele && !ele.contains(e.target as Node)) {
        onClose?.();
      }
    };
    if (visible && onClose) document.addEventListener('click', handleClose);
    return () => {
      if (visible && onClose)
        document.removeEventListener('click', handleClose);
    };
  }, [visible, onClose]);

  // export function createPortal(children: ReactNode, container: Element, key?: null | string): ReactPortal;
  return createPortal(
    <div
      style={{
        ...style,
        width: bBox.width,
        height: bBox.height,
        left: bBox.left,
        right: bBox.right,
        top: bBox.top,
        bottom: bBox.bottom,
      }}
      className={cls(
        'aui-popup-wrapper',
        !visible && 'aui-popup-hidden',
        wrapperClassName
      )}
    >
      <div ref={wrapRef} className={cls('aui-popup', className)}>
        {children}
      </div>
    </div>,
    popupContainer
  );
}

export default Popup;

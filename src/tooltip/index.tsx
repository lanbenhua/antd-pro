import React, { useEffect, useRef, useState } from 'react';
import cls from 'classnames';
import './index.less';

type Offset = { x: number; y: number };
type DOMRect = { height: number; width: number; x: number; y: number };

const getOffset = (ele: HTMLElement): Offset => {
  const offset = { x: 0, y: 0 };
  let curEle = ele;
  while (
    curEle.offsetParent !== null &&
    (curEle.offsetParent !== document.body ||
      curEle.offsetParent !== document.documentElement)
  ) {
    offset.x += curEle.offsetLeft;
    offset.y += curEle.offsetTop;
    curEle = curEle.offsetParent as HTMLElement;
  }
  return offset;
};

export const getRect = (ele: HTMLElement): DOMRect => {
  return ele.getBoundingClientRect
    ? ele.getBoundingClientRect()
    : { width: ele.clientWidth, height: ele.clientHeight, ...getOffset(ele) };
};

type Placement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

interface TooltipProps {
  visible: boolean;
  x: number;
  y: number;
  placement?: Placement;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  visible,
  x,
  y,
  placement = 'top',
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (visible && wrapperRef.current) {
      const rect = getRect(wrapperRef.current);
      setRect(rect);
    }
  }, [children, visible]);

  const transformOrigin =
    placement === 'top'
      ? `50% ${rect.height + 4}px`
      : placement === 'topLeft'
      ? `0px ${rect.height + 4}px`
      : placement === 'topRight'
      ? `${rect.width}px ${rect.height + 4}px`
      : placement === 'left'
      ? `${rect.width + 4}px 50%`
      : placement === 'leftTop'
      ? `${rect.width + 4}px 0px`
      : placement === 'leftBottom'
      ? `${rect.width + 4}px ${rect.height}px`
      : placement === 'right'
      ? `-4px 50%`
      : placement === 'rightTop'
      ? `-4px 0px`
      : placement === 'rightBottom'
      ? `-4px ${rect.height}px`
      : placement === 'bottom'
      ? `50% -4px`
      : placement === 'bottomLeft'
      ? `0px -4px`
      : placement === 'bottomRight'
      ? `${rect.width}px -4px`
      : '';
  const left =
    placement === 'top'
      ? x - rect.width / 2
      : placement === 'topLeft'
      ? x - 13
      : placement === 'topRight'
      ? x - rect.width + 13
      : placement === 'left'
      ? x - rect.width - 13
      : placement === 'leftTop'
      ? x - rect.width - 13
      : placement === 'leftBottom'
      ? x - rect.width - 13
      : placement === 'right'
      ? x + 13
      : placement === 'rightTop'
      ? x + 13
      : placement === 'rightBottom'
      ? x + 13
      : placement === 'bottom'
      ? x - rect.width / 2
      : placement === 'bottomLeft'
      ? x - 13
      : placement === 'bottomRight'
      ? x - rect.width + 13
      : 0;
  const top =
    placement === 'top'
      ? y - rect.height
      : placement === 'topLeft'
      ? y - rect.height
      : placement === 'topRight'
      ? y - rect.height
      : placement === 'left'
      ? y - rect.height / 2
      : placement === 'leftTop'
      ? y - 13
      : placement === 'leftBottom'
      ? y - rect.height + 13
      : placement === 'right'
      ? y - rect.height / 2
      : placement === 'rightTop'
      ? y - 13
      : placement === 'rightBottom'
      ? y - rect.height + 13
      : placement === 'bottom'
      ? y + 13
      : placement === 'bottomLeft'
      ? y + 13
      : placement === 'bottomRight'
      ? y + 13
      : 0;
  return (
    <div
      ref={wrapperRef}
      className={cls(
        'aui-tooltip',
        visible ? '' : 'aui-tooltip-hidden',
        `aui-tooltip-placement-${placement}`
      )}
      style={{
        top: top + 'px',
        left: left + 'px',
        transformOrigin: transformOrigin,
      }}
    >
      <div className="aui-tooltip-arrow"></div>
      <div className="aui-tooltip-inner">{children}</div>
    </div>
  );
};

export default Tooltip;

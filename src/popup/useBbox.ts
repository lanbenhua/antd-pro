import React from 'react';

export interface IEvent {
  clientX?: number;
  clientY?: number;
  pageX?: number;
  pageY?: number;
  x?: number;
  y?: number;
}
export type Offset = { x: number; y: number };
export type DOMRect = {
  height: number;
  width: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  x: number;
  y: number;
};
export type Mutate = () => void;
export type BBox = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
};

interface UseBboxProps {
  event?: IEvent;
  ele?: HTMLElement | null;
  container?: HTMLElement;
  offset?: number | Offset;
}

const useBbox = ({
  event,
  ele,
  offset,
  container = document.documentElement,
}: UseBboxProps): [BBox, Mutate] => {
  const [bBox, setBBox] = React.useState<BBox>(() =>
    getBbox(event, ele, offset, container)
  );

  React.useEffect(() => {
    setBBox(getBbox(event, ele, offset, container));
  }, [event, ele, offset, container]);

  const mutate = React.useCallback(
    () => setBBox(getBbox(event, ele, offset, container)),
    [event, ele, offset, container]
  );

  return [bBox, mutate];
};

const getX = (e?: IEvent): number => e?.clientX ?? e?.pageX ?? e?.x ?? 0;
const getY = (e?: IEvent): number => e?.clientY ?? e?.pageY ?? e?.y ?? 0;

export const getOffset = (
  ele: HTMLElement,
  container?: Element | null
): Offset => {
  const offset = { x: 0, y: 0 };
  let curEle = ele;
  container = container ?? document.body ?? document.documentElement;
  while (curEle.offsetParent != container && curEle.offsetParent != null) {
    offset.x += curEle.offsetLeft;
    offset.y += curEle.offsetTop;
    curEle = curEle.offsetParent as HTMLElement;
  }
  return offset;
};

export const getDOMRect = (ele: HTMLElement): DOMRect => {
  if (ele.getBoundingClientRect) return ele.getBoundingClientRect();
  const w = ele.offsetWidth || ele.clientWidth;
  const h = ele.offsetHeight || ele.clientHeight;
  const offset = getOffset(ele);
  return {
    width: ele.clientWidth,
    height: ele.clientHeight,
    x: offset.x,
    y: offset.y,
    left: offset.x,
    top: offset.y,
    right: offset.x + w,
    bottom: offset.y + h,
  };
};

export const getBbox = (
  event?: IEvent,
  ele?: HTMLElement | null,
  offset?: number | Offset,
  container: HTMLElement = document.documentElement
): BBox => {
  const x = getX(event);
  const y = getY(event);
  const offsetX = typeof offset === 'number' ? offset : offset?.x || 0;
  const offsetY = typeof offset === 'number' ? offset : offset?.y || 0;
  const { width: w = 0, height: h = 0 } = ele ? getDOMRect(ele) : {};
  const { right = 0, bottom = 0 } = container ? getDOMRect(container) : {};

  return {
    width: w,
    height: h,
    left: x + w > right ? (x - w < 0 ? 0 : x - w - offsetX) : x + offsetX,
    right:
      x + w > right
        ? right - x < 0
          ? 0
          : right - x - offsetX
        : x + w + offsetX,
    top: y + h > bottom ? (y - h < 0 ? 0 : y - h - offsetY) : y + offsetY,
    bottom:
      y + h > bottom
        ? bottom - y < 0
          ? 0
          : bottom - y - offsetY
        : y + h + offsetY,
  };
};

export default useBbox;

import React from 'react';
import { Elipsis } from 'assets/svgs';

interface EllipsisProps {
  count?: number;
  offset?: number;
  position?: 'prefix' | 'suffix';
  hideIconWhenZero?: boolean;
  trigger?:
    | React.ReactNode
    | ((collasped: boolean, currentCount: number) => React.ReactNode);
  children?: React.ReactNode;
}

const Ellipsis: React.FC<EllipsisProps> = ({
  count = 3,
  offset,
  position = 'suffix',
  hideIconWhenZero = true,
  trigger = <Elipsis />,
  children,
}) => {
  const nonNullChildren = React.useMemo(
    () => React.Children.toArray(children),
    [children]
  );
  const nonNullChildrenLen = nonNullChildren.length;
  const [collasped, setCollasped] = React.useState<boolean>(
    () => nonNullChildrenLen > count
  );

  const currentChildren = React.useMemo(() => {
    if (!collasped) return nonNullChildren;
    const sIdx = Math.max(
      0,
      position === 'prefix' ? nonNullChildrenLen - count : 0
    );
    const eIdx = Math.min(
      nonNullChildrenLen,
      position === 'prefix' ? nonNullChildrenLen : count
    );
    return nonNullChildren.slice(sIdx, eIdx);
  }, [nonNullChildren, position, collasped, count]);

  const needShow = React.useMemo(
    () =>
      !(hideIconWhenZero && currentChildren.length === 0) &&
      nonNullChildrenLen > count,
    [hideIconWhenZero, count, currentChildren, nonNullChildrenLen]
  );

  const EllipsisIcon = (
    <a
      className="aui-ellipsis-trigger"
      onClick={() => setCollasped(pre => !pre)}
      style={
        position === 'prefix' ? { marginRight: offset } : { marginLeft: offset }
      }
    >
      {typeof trigger === 'function'
        ? trigger(collasped, currentChildren.length)
        : trigger}
    </a>
  );

  return (
    <>
      {needShow && position === 'prefix' && EllipsisIcon}
      {currentChildren}
      {needShow && position === 'suffix' && EllipsisIcon}
    </>
  );
};

export default Ellipsis;

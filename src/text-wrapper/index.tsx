import React from 'react';

const intNum = (n: number): { intNum: number; multi: number } => {
  if (typeof n !== 'number' || isNaN(n)) return { intNum: 0, multi: 1 };
  if (~~n === n || !isFinite(n)) return { intNum: n, multi: 1 };
  const numArr = String(n).split('.');
  return {
    intNum: Number(numArr[0]) * 10 ** numArr[1].length + Number(numArr[1]),
    multi: 10 ** numArr[1].length,
  };
};
export const numberMulti = (base: number, multiple: number): number => {
  const { intNum: safeBase, multi: baseMulti } = intNum(base);
  const { intNum: safeMultiple, multi: multipleMulti } = intNum(multiple);

  return (safeBase * safeMultiple) / (baseMulti * multipleMulti);
};

interface TextWrapperProps {
  children: React.ReactNode;
  maxLine: number;
  lineHeight: number;
  showText?: string;
  hiddenText?: string;
}

const TextWrapper: React.FC<TextWrapperProps> = ({
  children,
  lineHeight,
  maxLine,
  showText,
  hiddenText,
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = React.useState<boolean>(true);
  const [showMore, setShowMore] = React.useState<boolean>(false);

  const renderViewButton = () => {
    return isOverflow ? (
      <div style={{ display: 'inline-block' }}>
        <a
          style={{ fontSize: '14px' }}
          onClick={() => setShowMore((pre) => !pre)}
        >
          {showMore ? hiddenText || 'hidden' : showText || 'view more'}
        </a>
      </div>
    ) : null;
  };

  const cumputeStyles = (
    lineHeight: number,
    maxLine: number
  ): React.CSSProperties => {
    const defaultStyle: React.CSSProperties = {
      overflowY: 'hidden',
      lineHeight: `${lineHeight}px`,
      height: `${numberMulti(maxLine, lineHeight)}px`,
      overflowWrap: 'break-word',
    };

    const showMoreStyle: React.CSSProperties = showMore
      ? { height: 'auto' }
      : {};
    const overflowStyle: React.CSSProperties = isOverflow
      ? {}
      : { height: 'auto' };
    return {
      ...defaultStyle,
      ...showMoreStyle,
      ...overflowStyle,
    };
  };

  const cumputeStylesMemo = React.useMemo(
    () => cumputeStyles(lineHeight, maxLine),
    [lineHeight, maxLine, showMore, isOverflow]
  );

  const update = () => {
    setShowMore(false);
    if (!wrapperRef.current) return;
    const scrollHeight = wrapperRef.current?.scrollHeight;
    const clientHeight = numberMulti(maxLine, lineHeight);
    scrollHeight > clientHeight ? setIsOverflow(true) : setIsOverflow(false);
  };

  React.useLayoutEffect(() => {
    update();
  }, [children]);

  return (
    <>
      <div style={cumputeStylesMemo} ref={wrapperRef}>
        {children}
      </div>
      {renderViewButton()}
    </>
  );
};

export default TextWrapper;

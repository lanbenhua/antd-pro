import React from 'react';
import cx from 'classnames';
import './index.less';

interface SectionProps {
  divider?: boolean;
  border?: boolean;
  block?: boolean;
  card?: boolean;
  headDivider?: boolean;
  gap?: number | string | [number, number];
  title?: React.ReactNode;
  style?: React.CSSProperties;
  headStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  divider,
  border,
  block = true,
  card,
  headDivider,
  gap,
  title,
  className,
  style,
  headStyle,
  bodyStyle,
  children,
}) => {
  const curGap = !Array.isArray(gap) && gap != null ? [gap, gap] : gap;

  return (
    <section
      style={{
        ...style,
        marginTop: curGap?.[0] ?? style?.marginTop,
        marginBottom: curGap?.[1] ?? style?.marginBottom,
      }}
      className={cx(
        'aui-content-section',
        divider && 'aui-content-section-divider',
        (border ?? card) && 'aui-content-section-border',
        block && 'aui-content-section-block',
        card && 'aui-content-section-card',
        className
      )}
    >
      {title && (
        <h2
          className={cx(
            'aui-content-section-title',
            headDivider && 'aui-content-section-title-divider'
          )}
          style={headStyle}
        >
          {title}
        </h2>
      )}
      <div style={bodyStyle} className="aui-content-section-body">
        {children}
      </div>
    </section>
  );
};

export default Section;

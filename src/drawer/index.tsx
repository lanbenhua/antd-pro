import React from 'react';
import cx from 'classnames';
import { Drawer as AntdDrawer } from 'antd';
import { DrawerProps as AntdDrawerProps } from 'antd/lib/drawer';
import { LayoutContext } from 'container/app/layout/root/context';
import './s.less';

export interface DrawerProps extends AntdDrawerProps {
  appContainer?: HTMLElement | string;
  noCollasped?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  bodyStyle?: React.CSSProperties;
  ignoreKey?: string; // it is a important prop to prevent default close handler, when you need to avoid this action.
}

export default function Drawer({
  appContainer,
  noCollasped,
  ignoreKey,
  visible,
  mask = true,
  closable = true,
  maskClosable = true,
  destroyOnClose = true,
  title,
  children,
  footer,
  onClose,
  style,
  bodyStyle,
  className,
  placement = 'right',
  width,
  height,
  getContainer,
  ...restProps
}: DrawerProps): JSX.Element {
  const {
    sider: { collapsed, hidden },
  } = React.useContext(LayoutContext);
  const isNoCollasped = noCollasped ?? hidden;

  const container =
    typeof getContainer === 'function'
      ? getContainer()
      : getContainer instanceof HTMLElement
      ? getContainer
      : typeof getContainer === 'string'
      ? (document.querySelector(getContainer) as HTMLElement)
      : null;
  const containerRef = React.useRef<HTMLElement | null>(container);
  const wrapperDivRef = React.useRef<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    if (!containerRef.current) {
      const wrapperDiv: HTMLDivElement | null = document.createElement('div');
      document.body.appendChild(wrapperDiv);
      containerRef.current = wrapperDiv;
      wrapperDivRef.current = wrapperDiv;
    }
  }, [visible]);

  React.useEffect(() => {
    return () => {
      containerRef.current = null;
      if (wrapperDivRef.current) {
        document.body.removeChild(wrapperDivRef.current);
        wrapperDivRef.current = null;
      }
    };
  }, []);

  React.useEffect(() => {
    const outsideClickHandler = (evt: MouseEvent) => {
      if (visible) {
        const isClickedInsideDrawer = containerRef.current?.contains(
          evt.target as Node
        );
        const root =
          appContainer instanceof HTMLElement
            ? appContainer
            : typeof appContainer === 'string'
            ? document.getElementById(appContainer)
            : document.getElementById('app');
        const isClickedOutsideDrawer = root?.contains(evt.target as Node);

        const shouldEmitClose =
          isClickedOutsideDrawer &&
          !isClickedInsideDrawer &&
          !(evt.target as HTMLElement)?.hasAttribute(
            `data-drawer-close-ignore${ignoreKey ? '-' + ignoreKey : ''}`
          );
        if (onClose && shouldEmitClose) {
          onClose(evt as never);
        }
      }
    };
    document.addEventListener('click', outsideClickHandler);

    return () => {
      document.removeEventListener('click', outsideClickHandler);
    };
  }, [visible, ignoreKey]);

  return (
    <AntdDrawer
      className={cx(
        className,
        'di-drawer-wrapper',
        `di-drawer-wrapper-${placement}`,
        {
          'di-drawer-wrapper-collasped': collapsed,
          'di-drawer-wrapper-no-collasped': isNoCollasped,
        }
      )}
      getContainer={containerRef.current || undefined}
      visible={visible}
      onClose={onClose}
      maskClosable={maskClosable}
      destroyOnClose={destroyOnClose}
      mask={mask}
      closable={closable}
      title={title}
      style={style}
      width={width ?? 600}
      height={height ?? 256}
      placement={placement}
      {...restProps}
    >
      <div style={bodyStyle} className="di-drawer-wrapper-body">
        {children}
      </div>
      {footer && <div className="di-drawer-wrapper-footer">{footer}</div>}
    </AntdDrawer>
  );
}

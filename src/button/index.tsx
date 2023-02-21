import React from 'react';
import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import Flexbox from '../flexbox';

type Order = 'descend' | 'ascend';

interface ButtonProps extends AntdButtonProps {
  allowOrder?: boolean;
  order?: Order;
  onOrderChange?: (order?: Order) => void;
}

const Button: React.FC<ButtonProps> = ({
  allowOrder,
  order,
  onOrderChange,
  onClick,
  children,
  ...rest
}) => {
  return (
    <AntdButton
      {...rest}
      onClick={(e) => {
        if (onClick) onClick(e);
        if (allowOrder && onOrderChange) {
          const stateMap: Record<Order | '', Order | undefined> = {
            '': 'ascend',
            ascend: 'descend',
            descend: undefined,
          };
          onOrderChange(stateMap[order ?? '']);
        }
      }}
    >
      {allowOrder ? (
        <Flexbox align="center">
          <Flexbox inline direction="column" style={{ marginRight: 5 }}>
            <CaretUpOutlined
              style={{
                position: 'relative',
                top: 2,
                fontSize: 10,
                color: order === 'ascend' ? '#2673dd' : '#BFBFBF',
              }}
            />
            <CaretDownOutlined
              style={{
                position: 'relative',
                top: -2,
                fontSize: 10,
                color: order === 'descend' ? '#2673dd' : '#BFBFBF',
              }}
            />
          </Flexbox>
          {children}
        </Flexbox>
      ) : (
        <>{children}</>
      )}
    </AntdButton>
  );
};

export default Button;

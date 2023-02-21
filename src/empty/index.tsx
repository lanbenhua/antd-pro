import React from 'react';
import { Empty as AntdEmpty } from 'antd';
import { EmptyProps as AntdEmptyProps } from 'antd/lib/empty';
import { NoData } from 'assets/imgs';

interface EmptyProps extends AntdEmptyProps {}

const Empty: React.FC<EmptyProps> = ({
  image = <img src={NoData} />,
  description = 'No Data',
  ...rest
}) => {
  return <AntdEmpty image={image} description={description} {...rest} />;
};

export default Empty;

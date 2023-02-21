import React from 'react';
import Input from '.';

const Demo: React.FC = () => {
  const [v, setV] = React.useState<string | undefined>('test');

  return <Input colon label="Input" value={v} onChange={v => setV(v)} />;
};

export default Demo;

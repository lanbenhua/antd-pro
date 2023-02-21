import React from 'react';
import TextArea from '.';

const Demo: React.FC = () => {
  const [v, setV] = React.useState<string | undefined>('test');

  return <TextArea colon label="TextArea" value={v} onChange={v => setV(v)} />;
};

export default Demo;

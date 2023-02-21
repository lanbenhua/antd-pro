import React from 'react';
import Radio from '.';

const Demo: React.FC = () => {
  const [v, setV] = React.useState<boolean | undefined>(false);

  return (
    <Radio colon value={v} onChange={v => setV(v)}>
      Radio
    </Radio>
  );
};

export default Demo;

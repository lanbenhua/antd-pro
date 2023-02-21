import React from 'react';
import Checkbox from '.';

const Demo: React.FC = () => {
  const [v, setV] = React.useState<boolean | undefined>(false);

  return (
    <Checkbox colon value={v} onChange={v => setV(v)}>
      Checkbox
    </Checkbox>
  );
};

export default Demo;

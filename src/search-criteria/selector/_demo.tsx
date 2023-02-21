import React from 'react';
import Selector from '.';

const Demo: React.FC = () => {
  const [active, setActive] = React.useState<boolean>(false);

  return (
    <Selector
      allowClose
      active={active}
      label="Test Label:"
      onClick={e => {
        console.log('onClick', e);
        setActive(pre => !pre);
      }}
      onClose={e => console.log('onClose', e)}
    >
      Tast Value
    </Selector>
  );
};

export default Demo;

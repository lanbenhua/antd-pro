import React from 'react';
import Select from '.';

const Demo: React.FC = () => {
  const [v1, setV1] = React.useState<number | undefined>(1);
  const [v2, setV2] = React.useState<number[] | undefined>([1]);

  return (
    <>
      <Select<number>
        colon
        label="Single Select"
        value={v1}
        onChange={v => setV1(v)}
      >
        <Select.Option value={1} name="1">
          1
        </Select.Option>
        <Select.Option value={2} name="2">
          2
        </Select.Option>
        <Select.Option value={3} name="3">
          3
        </Select.Option>
        <Select.Option value={4} name="4">
          4
        </Select.Option>
        <Select.Option value={5} name="5">
          5
        </Select.Option>
      </Select>

      <Select<number[]>
        colon
        label="Multiple Select"
        multiple
        value={v2}
        onChange={v => setV2(v)}
      >
        <Select.Option value={1} name="1">
          1
        </Select.Option>
        <Select.Option value={2} name="2">
          2
        </Select.Option>
        <Select.Option value={3} name="3">
          3
        </Select.Option>
        <Select.Option value={4} name="4">
          4
        </Select.Option>
        <Select.Option value={5} name="5">
          5
        </Select.Option>
      </Select>
    </>
  );
};

export default Demo;

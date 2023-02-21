import React from 'react';
import consoler from 'lib/consoler';
import ExtendContainer from './index';
import Input from '../input';
import Select from '../select';

const Demo: React.FC = () => {
  const [v, setV] = React.useState<string[] | undefined>(['a']);
  const [a, setA] = React.useState<string | undefined>('test');
  const [c, setC] = React.useState<string | undefined>('test');
  const [d, setD] = React.useState<string | undefined>('test');
  const [b, setB] = React.useState<string | undefined>('1');

  return (
    <ExtendContainer value={v} onChange={value => setV(value)}>
      <ExtendContainer.Field fixed name="a" text="a" label="a">
        <Input colon name="a" label="Input" value={a} onChange={v => setA(v)} />
      </ExtendContainer.Field>

      <ExtendContainer.Field fixed name="c" text="c" label="c">
        <Input colon name="c" label="Input" value={c} onChange={v => setC(v)} />
      </ExtendContainer.Field>

      <ExtendContainer.Field name="d" text="d" label="d">
        <Input colon name="d" label="Input" value={d} onChange={v => setD(v)} />
      </ExtendContainer.Field>

      <ExtendContainer.Field name="b" text="b" label="b">
        <Select
          onSelect={(checked, value) =>
            consoler.log(`checked, value:`, checked, value)
          }
          colon
          name="b"
          label="Select"
          value={b}
          onChange={v => setB(v)}
        >
          <Select.Option value="1" name="1">
            1
          </Select.Option>
          <Select.Option value="2" name="2">
            2
          </Select.Option>
          <Select.Option value="3" name="3">
            3
          </Select.Option>
        </Select>
      </ExtendContainer.Field>
    </ExtendContainer>
  );
};

export default Demo;

import React from 'react';

import Input from './input/_demo';
import TextArea from './textarea/_demo';
import Select from './select/_demo';
import Radio from './radio/_demo';
import Checkbox from './checkbox/_demo';
import DatePicker from './date-picker/_demo';
import ExtendContainer from './extendable-container/_demo';

const Demo: React.FC = () => {
  return (
    <>
      <Input />

      <TextArea />

      <Select />

      <Radio />

      <Checkbox />

      <DatePicker />

      <ExtendContainer />
    </>
  );
};

export default Demo;

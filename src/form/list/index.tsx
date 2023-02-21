import React, {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  useContext,
} from 'react';
import { FormInstance } from 'antd/lib/form/Form';
import { Add, Field, Move, Operation, Remove } from '../type';
import { MyFormContextConstructor } from '..';

export type MyFormListRefValue = {
  reset: () => void;
};
interface FormListProps<T> {
  name: string;
  initialValue?: T[];
  form?: FormInstance;
  children: (fields: Field<T>[], operation: Operation<T>) => React.ReactNode;
}

function FormList<T>(
  props: FormListProps<T>,
  ref: React.Ref<MyFormListRefValue>
) {
  const { name, initialValue, form, children } = props;
  const myFormContext = useContext(MyFormContextConstructor);
  const curForm = form ?? myFormContext.form;
  const keyRef = useRef<number>(initialValue?.length || 0);
  const [fields, setFields] = useState<Field<T>[]>(() =>
    init(initialValue, name)
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, forceUpdate] = useState<unknown>({});

  useImperativeHandle(
    ref,
    () => ({
      reset: () => {
        setFields(() => init(initialValue, name));
      },
    }),
    [initialValue, name]
  );

  useEffect(() => {
    setFields(fields =>
      fields.map((field, idx) => ({ ...field, name: `${name}[${idx}]` }))
    );
    forceUpdate({});
  }, [name]);

  const add: Add<T> = (initialValue?: T, index?: number) => {
    keyRef.current += 1;
    setFields(fields => {
      const len = fields.length;
      index = index === undefined ? len : index;
      return fields
        .slice(0, index)
        .concat({
          name: `${name}[${keyRef.current}]`,
          key: keyRef.current,
          initialValue,
        })
        .concat(fields.slice(index, len))
        .map((field, idx) => ({ ...field, name: `${name}[${idx}]` }));
    });
  };

  const remove: Remove = (index: number | number[]) => {
    const v = curForm?.getFieldValue(name) || [];
    curForm?.setFieldsValue({ [name]: ftr(v, index) });
    setFields(fields =>
      ftr(fields, index).map((field, idx) => ({
        ...field,
        name: `${name}[${idx}]`,
      }))
    );
  };

  const move: Move = (from: number, to: number) => {
    const v = curForm?.getFieldValue(name) || [];
    curForm?.setFieldsValue({ [name]: mv(v, from, to) });
    setFields(fields =>
      mv(fields, from, to).map((field, idx) => ({
        ...field,
        name: `${name}[${idx}]`,
      }))
    );
  };

  if (typeof children !== 'function')
    throw new Error('MyForm.List chidlren must be a funtion.');

  return (
    <>
      {children(fields, {
        add,
        remove,
        move,
      })}
    </>
  );
}

export default React.forwardRef(FormList);

function init<T>(initialValue: T[] | undefined, name: string): Field<T>[] {
  return (
    initialValue?.map((value, index) => ({
      name: `${name}[${index}]`,
      key: index,
      initialValue: value,
    })) || []
  );
}

function mv<T>(list: T[], from: number, to: number): T[] {
  const len = list.length;
  const current = list[from];
  return list
    .slice(0, from)
    .concat(list.slice(from + 1, to + 1))
    .concat(current)
    .concat(list.slice(to + 1, len));
}

function ftr<T>(list: T[], index: number | number[]): T[] {
  return list.filter((_, idx) =>
    typeof index === 'number' ? index !== idx : !index.includes(idx)
  );
}

import React from 'react';
import { Button, Input, Row, Col } from 'antd';
import { DeleteOutlined, PlusOutlined } from 'components/antd/icons';
import MyForm from '../index';

const Demo = () => {
  return (
    <MyForm.List name="names" initialValue={['1']}>
      {(fields, { add, remove }) => {
        return (
          <div>
            <>
              {fields.map((field, index) => (
                <MyForm.Item key={field.key} label="Name">
                  <Row gutter={10}>
                    <Col span={10}>
                      <Input
                        placeholder="Input name"
                        defaultValue={field.initialValue as never}
                      />
                    </Col>
                    <Col span={2}>
                      <DeleteOutlined onClick={() => remove(index)} />
                    </Col>
                  </Row>
                </MyForm.Item>
              ))}
            </>
            <MyForm.Item
              label={<span style={{ visibility: 'hidden' }}>Name</span>}
            >
              <Row gutter={10}>
                <Col span={10}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add sights
                  </Button>
                </Col>
              </Row>
            </MyForm.Item>
          </div>
        );
      }}
    </MyForm.List>
  );
};

export default Demo;

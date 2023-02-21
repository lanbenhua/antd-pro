import React from 'react';
import Form from './index';
import { Input, Row, Col, Select } from 'antd';
import random from 'utils/random';

const Demo = () => {
  return (
    <>
      <Form type="flex">
        <Row style={{ width: '100%' }}>
          <Col span={6}>
            <Form.Item label="Name" labelType="box">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Name" labelType="box">
              <Select mode="multiple">
                <Select.Option value={'1'}>{random.S()}</Select.Option>
                <Select.Option value={'2'}>{random.S()}</Select.Option>
                <Select.Option value={'3'}>{random.S()}</Select.Option>
                <Select.Option value={'4'}>{random.S()}</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Name" labelType="box">
              <Select mode="tags">
                <Select.Option value={'1'}>{random.S()}</Select.Option>
                <Select.Option value={'2'}>{random.S()}</Select.Option>
                <Select.Option value={'3'}>{random.S()}</Select.Option>
                <Select.Option value={'4'}>{random.S()}</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Country" labelType="box">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Email" labelType="box">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Age" labelType="box">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Form span={6}>
        <Form.Item label="Name" labelType="default">
          <Input />
        </Form.Item>
        <Form.Item label="Name" labelType="default">
          <Select mode="multiple">
            <Select.Option value={'1'}>{random.S()}</Select.Option>
            <Select.Option value={'2'}>{random.S()}</Select.Option>
            <Select.Option value={'3'}>{random.S()}</Select.Option>
            <Select.Option value={'4'}>{random.S()}</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Name" labelType="default">
          <Select mode="tags">
            <Select.Option value={'1'}>{random.S()}</Select.Option>
            <Select.Option value={'2'}>{random.S()}</Select.Option>
            <Select.Option value={'3'}>{random.S()}</Select.Option>
            <Select.Option value={'4'}>{random.S()}</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Country" labelType="default">
          <Input />
        </Form.Item>

        <Form.Item label="Email" labelType="default">
          <Input />
        </Form.Item>

        <Form.Item label="Age" labelType="default">
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};

export default Demo;

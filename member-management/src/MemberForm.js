import React from 'react';
import { Form, Input, Button } from 'antd';

function MemberForm({ addMember }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // 調用父組件傳入的 addMember 函數，並預設會員等級為 1
    addMember({ name: values.name, email: values.email, level: 1 });
    form.resetFields(); // 重置表單
  };

  return (
    <Form
      form={form}
      name="add-member"
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: '400px', margin: '0 auto' }}  // 居中且適當寬度
    >
      <Form.Item
        name="name"
        label="會員姓名"
        rules={[{ required: true, message: '請輸入會員姓名!' }]}
      >
        <Input placeholder="輸入會員姓名" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: '請輸入會員 Email!' },
          { type: 'email', message: '請輸入有效的 Email!' },
        ]}
      >
        <Input placeholder="輸入會員 Email" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          新增會員
        </Button>
      </Form.Item>
    </Form>
  );
}

export default MemberForm;

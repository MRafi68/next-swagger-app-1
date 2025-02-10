"use client";

import { Form, Input, Button, Modal } from "antd";
import { useEffect } from "react";

const itemForm = ({ visible, onSubmit, onCancel, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, visible]);

  return (
    <Modal
      title={initialValues ? "Edit Item" : "Add Item"}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {initialValues ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default itemForm;

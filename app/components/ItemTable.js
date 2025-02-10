"use client"

import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined} from "@ant-design/icons";

const itemTable = ({items, onEdit, onDelete}) => {
    const columns = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
        },
        {
          title: "Actions",
          key: "actions",
          render: (_, record) => (
            <Space>
              <Button type="primary" icon={<EditOutlined />} onClick={() => onEdit(record)} />
              <Button danger icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} />
            </Space>
          ),
        },
      ];
    return <Table dataSource={items} columns={columns} rowKey="id"/>
}

export default itemTable;
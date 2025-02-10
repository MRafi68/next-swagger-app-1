"use client"

import { Modal } from "antd";

const DeleteModal = ({ visible, onConfirm, onCancel }) => {
    return (
      <Modal
        title="Confirm Delete"
        open={visible}
        onOk={onConfirm}
        onCancel={onCancel}
        okText="Delete"
        okType="danger"
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
    );
  };

  export default DeleteModal;
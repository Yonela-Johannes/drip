import React from "react";
import { Modal } from "antd";
import { Select, Space } from 'antd';

const RoleModal = (props) => {
  const { open, hideModal, performAction, title,  setRole} = props;

  const handleChange = (elem) => {
    console.log(elem)
    setRole(elem)
  }
  return (
    <Modal
      title="Update user"
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Ok"
      cancelText="Cancel"
      className="text-black"
    >
      <p className="text-black">{title}</p>
      <div className="mt-4">
        <Space wrap>
          <Select
            defaultValue="User"
            style={{ width: 400 }}
            onChange={handleChange}
            options={[
              { value: 'user', label: 'User' },
              { value: 'admin', label: 'Admin' },
              { value: 'developer', label: 'Developer' },
              { value: 'manager', label: 'Manager' },
            ]}
          />
          </Space>
      </div>
    </Modal>
  );
};

export default RoleModal;

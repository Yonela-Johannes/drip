import React from "react";
import { Modal } from "antd";

const CustomModal = (props) => {
  const { open, hideModal, performAction, title } = props;
  return (
    <Modal
      title="Confirmation"
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Ok"
      cancelText="Cancel"
      className="text-black"
    >
      <p className="text-black">{title}</p>
    </Modal>
  );
};

export default CustomModal;

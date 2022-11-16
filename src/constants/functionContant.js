import { Modal } from "antd";

export const SUCCESS = (title) => {
    Modal.success({
      title: title,
    });
  };

  export  const ERROR = (title) => {
    Modal.error({
      title: title,
      
    });
  };
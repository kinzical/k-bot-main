import { SendOutlined } from "@ant-design/icons";
import { Button, Form, Tooltip } from "antd";
import * as React from "react";

type KPSendButtonProps = {
  onClick?: () => void;
};

const KPSendButton: React.FC<KPSendButtonProps> = (
  props: KPSendButtonProps
) => {
  const { onClick } = props;

  if (onClick) {
    return (
      <Tooltip title="Send">
        <Button
          onClick={onClick}
          shape="circle"
          size="large"
          type="primary"
          className="flex items-center justify-center"
          icon={<SendOutlined />}
        ></Button>
      </Tooltip>
    );
  }
  return (
    <Form.Item className="mb-0">
      <Tooltip title="Send">
        <Button
          htmlType="submit"
          shape="circle"
          type="primary"
          size="large"
          className="flex items-center justify-center"
          icon={<SendOutlined />}
        ></Button>
      </Tooltip>
    </Form.Item>
  );
};

export default KPSendButton;

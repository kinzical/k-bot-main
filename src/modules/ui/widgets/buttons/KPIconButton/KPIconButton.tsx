import * as React from "react";
import { SendOutlined } from "@ant-design/icons";
import { Button } from "antd";
type KPIconButtonProps = {
  //
};

const KPIconButton: React.FC<any> = () => {
  return <Button htmlType="submit"><SendOutlined /></Button>;
};

export default KPIconButton;

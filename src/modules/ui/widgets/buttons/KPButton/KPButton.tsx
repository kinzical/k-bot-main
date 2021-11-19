import { Button } from "antd";
import * as React from "react";

type KPButtonProps = {
  onClick?: () => void;
  className?: string;
  children?: any;
  type?: any;
  icon?: any;
};

const KPButton: React.FC<KPButtonProps> = (props: KPButtonProps) => {
  return <Button {...props}>{props.children}</Button>;
};

export default KPButton;

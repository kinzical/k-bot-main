import { Input } from "antd";
import * as React from "react";

type KPInputProps = {
  disabled?: boolean;
  placeholder?: string;
  suffix?: any;
  className?: string;
  inputref?: any;
  value?: any;
  onChange?: (e: any) => void;
  maxLength?: number;
  onPressEnter?: (e: any) => void;
  type?: any;
  id?: any;
  onKeyDown?: any;
  onBlur?:any;
  autoFocus?: boolean;
};

const KPInput: React.FC<KPInputProps> = (props: KPInputProps) => {
  return <Input {...props} ref={props.inputref} />;
};

export default KPInput;

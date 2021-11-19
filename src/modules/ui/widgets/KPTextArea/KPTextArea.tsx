import { Input } from "antd";
import * as React from "react";
const { TextArea } = Input;

type KPTextAreaProps = {
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  inputref?: any;
  value?: any;
  onChange?: (e: any) => void;
  showCount?: boolean;
  maxLength?: number;
  onPressEnter?: (e: any) => void;
  autoSize?: any;
};

const KPTextArea: React.FC<KPTextAreaProps> = (props: KPTextAreaProps) => {
  return <TextArea {...props} ref={props.inputref} />;
};

export default KPTextArea;

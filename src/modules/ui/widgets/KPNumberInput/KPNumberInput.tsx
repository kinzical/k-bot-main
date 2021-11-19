import { Input } from "antd";
import * as React from "react";

type KPNumberInputProps = {
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  inputref?: any;
  value?: any;
  onChange?: (e: any) => void;
  onPressEnter?: (e: any) => void;
  allowDecimal?: boolean;
  min?: number;
};

const KPNumberInput: React.FC<any> = (props: KPNumberInputProps) => {
  const { allowDecimal = true, min = 0 } = props;

  const handleKeyDown = (e: any) => {
    let invalidChars = ["-", "+", "e"];
    if (!allowDecimal) {
      invalidChars.push("."); //including "." if allowdecimal is false
    }
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <Input
      {...props}
      ref={props.inputref}
      onKeyDown={handleKeyDown}
      type="number"
      min={min}
    />
  );
};

export default KPNumberInput;

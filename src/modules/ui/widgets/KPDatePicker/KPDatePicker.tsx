import { DatePicker } from "antd";
import * as React from "react";

type KPDatePickerProps = {
  placeholder: string;
  format: string;
  reference?: any;
  className?: string;
  value?: any;
  onChange?: (date: any, dateString: string) => void;
  disabledDate?: any;
};

const KPDatePicker: React.FC<KPDatePickerProps> = (
  props: KPDatePickerProps
) => {
  return (
    <DatePicker
      {...props}
      ref={props.reference}
      clearIcon={false}
      inputReadOnly={true}
    />
  );
};

export default KPDatePicker;

import * as React from "react";
import { TimePicker } from "antd";
import { TimeFormat } from "../../../bot/models/enums/bot.enums";

type KPTimePickerProps = {
  placeholder: string;
  reference?: any;
  className?: string;
  value?: any;
  onChange?: (time: any, dateString: string) => void;
};

const KPTimePicker: React.FC<KPTimePickerProps> = (
  props: KPTimePickerProps
) => {
  return (
    <TimePicker
      {...props}
      ref={props.reference}
      clearIcon={false}
      use12Hours
      format={TimeFormat.h_mm_a}
      inputReadOnly={true}
    />
  );
};

export default KPTimePicker;

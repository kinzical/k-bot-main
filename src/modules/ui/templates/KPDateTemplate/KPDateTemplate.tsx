import * as React from "react";
import Moment from "react-moment";
import { DateFormat } from "../../../bot/models/enums/bot.enums";

type KPDateTemplateProps = {
  date: any;
  format?: any;
};

const KPDateTemplate: React.FC<KPDateTemplateProps> = (
  props: KPDateTemplateProps
) => {
  const { date, format = DateFormat.MM_DD_YYYY } = props;

  return (
    <div>
      <Moment format={format} date={date} local></Moment>
    </div>
  );
};

export default KPDateTemplate;

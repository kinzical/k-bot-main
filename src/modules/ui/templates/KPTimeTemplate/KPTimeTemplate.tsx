import * as React from "react";
import Moment from "react-moment";
import { TimeFormat } from "../../../bot/models/enums/bot.enums";

type KPTimeTemplateProps = {
  time: any;
  utc?: boolean;
};

const KPTimeTemplate: React.FC<any> = (props: KPTimeTemplateProps) => {
  const { time, utc = true } = props;

  return (
    <div>
      <Moment utc={utc} local format={TimeFormat.HH_MM_A} date={time}></Moment>
    </div>
  );
};

export default KPTimeTemplate;

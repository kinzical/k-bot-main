import * as React from "react";
import { ActivityVM } from "../../../models/classes/activitity.classes";
import { ActivityType } from "../../../models/enums/bot.enums";
import CalendarAnswer from "../CalendarAnswer";
import CellphoneAnswer from "../CellphoneAnswer";
import EmailAnswer from "../EmailAnswer";
import MediaUploadAnswer from "../MediaUploadAnswer";
import MultiLineTextAnswer from "../MultiLineTextAnswer";
import MultiSelectAnswer from "../MultiSelectAnswer";
import NumberAnswer from "../NumberAnswer";
import RatingAnswer from "../RatingAnswer";
import ScaleAnswer from "../ScaleAnswer";
import SingleChoiceAnswer from "../SingleChoiceAnswer";
import SingleLineTextAnswer from "../SingleLineTextAnswer";
import TimeAnswer from "../TimeAnswer";

type AnswerProps = {
  data: ActivityVM;
};

const Answer: React.FC<AnswerProps> = (props: AnswerProps) => {
  const { data } = props;

  const getAnswer = () => {
    switch (data.type) {
      case ActivityType.SINGLE_LINE_TEXT:
        return <SingleLineTextAnswer data={data}></SingleLineTextAnswer>;
      case ActivityType.NUMBER:
        return <NumberAnswer data={data}></NumberAnswer>;
      case ActivityType.MULTI_LINE_TEXT:
        return <MultiLineTextAnswer data={data}></MultiLineTextAnswer>;
      case ActivityType.EMAIL:
        return <EmailAnswer data={data}></EmailAnswer>;
      case ActivityType.CELLPHONE:
        return <CellphoneAnswer data={data}></CellphoneAnswer>;
      case ActivityType.SINGLE_CHOICE:
        return <SingleChoiceAnswer data={data}></SingleChoiceAnswer>;
      case ActivityType.MULTI_SELECT:
        return <MultiSelectAnswer data={data}></MultiSelectAnswer>;
      case ActivityType.CALENDAR:
        return <CalendarAnswer data={data}></CalendarAnswer>;
      case ActivityType.TIME:
        return <TimeAnswer data={data}></TimeAnswer>;
      case ActivityType.RATING:
        return <RatingAnswer data={data}></RatingAnswer>;
      case ActivityType.SCALE:
        return <ScaleAnswer data={data}></ScaleAnswer>;
      case ActivityType.MEDIA_UPLOAD:
        return <MediaUploadAnswer data={data}></MediaUploadAnswer>;
      default:
        return null;
    }
  };

  return <>{getAnswer()}</>;
};

export default Answer;

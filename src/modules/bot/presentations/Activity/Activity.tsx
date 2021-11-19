import * as React from "react";
import { ActivityVM } from "../../models/classes/activitity.classes";
import { ActivityType } from "../../models/enums/bot.enums";
import Answer from "../answers/Answer";
import CalendarQuestion from "../questions/CalendarQuestion";
import CellPhoneQuestion from "../questions/CellPhoneQuestion";
import EmailQuestion from "../questions/EmailQuestion";
import MediaUploadQuestion from "../questions/MediaUploadQuestion";
import MultiLineTextQuestion from "../questions/MultiLineTextQuestion";
import MultipleSelectQuestion from "../questions/MultipleSelectQuestion";
import NumberQuestion from "../questions/NumberQuestion";
import RatingQuestion from "../questions/RatingQuestion";
import ScaleQuestion from "../questions/ScaleQuestion";
import SingleChoiceQuestion from "../questions/SingleChoiceQuestion";
import SingleLineTextQuestion from "../questions/SingleLineTextQuestion";
import StatementQuestion from "../questions/StatementQuestion";
import TimeQuestion from "../questions/TimeQuestion";

type ActivityProps = {
  onQuestionSubmit: (data: ActivityVM) => void;
  data: ActivityVM;
  onQuestionSkipClick: (data: ActivityVM) => void;
};

const Activity: React.FC<ActivityProps> = (props: ActivityProps) => {
  const { onQuestionSubmit, data, onQuestionSkipClick } = props;

  const handleOnQuestionSubmit = (data: ActivityVM) => {
    onQuestionSubmit(data);
  };

  const handleQuestionSkipClick = (data: ActivityVM) => {
    onQuestionSkipClick(data);
  };

  const getQuestion = (activity: ActivityVM) => {
    switch (activity.type) {
      case ActivityType.STATEMENT:
        return <StatementQuestion data={activity}></StatementQuestion>;
      case ActivityType.EMAIL:
        return (
          <EmailQuestion
            data={activity}
            onSubmit={handleOnQuestionSubmit}
            onQuestionSkipClick={handleQuestionSkipClick}
          ></EmailQuestion>
        );
      case ActivityType.CELLPHONE:
        return (
          <CellPhoneQuestion
            data={activity}
            onSubmit={handleOnQuestionSubmit}
            onQuestionSkipClick={handleQuestionSkipClick}
          ></CellPhoneQuestion>
        );
      case ActivityType.SINGLE_CHOICE:
        return (
          <SingleChoiceQuestion
            data={activity}
            onSubmit={handleOnQuestionSubmit}
            onQuestionSkipClick={handleQuestionSkipClick}
          ></SingleChoiceQuestion>
        );
      case ActivityType.MULTI_SELECT:
        return (
          <MultipleSelectQuestion
            data={activity}
            onSubmit={handleOnQuestionSubmit}
            onQuestionSkipClick={handleQuestionSkipClick}
          ></MultipleSelectQuestion>
        );
      case ActivityType.CALENDAR:
        return (
          <CalendarQuestion
            data={activity}
            onSubmit={handleOnQuestionSubmit}
            onQuestionSkipClick={handleQuestionSkipClick}
          ></CalendarQuestion>
        );
      case ActivityType.TIME:
        return (
          <TimeQuestion
            data={activity}
            onSubmit={handleOnQuestionSubmit}
            onQuestionSkipClick={handleQuestionSkipClick}
          ></TimeQuestion>
        );
      case ActivityType.RATING:
        return (
          <RatingQuestion
            data={activity}
            onSubmit={handleOnQuestionSubmit}
            onQuestionSkipClick={handleQuestionSkipClick}
          ></RatingQuestion>
        );
      case ActivityType.SCALE:
        return (
          <ScaleQuestion
            data={activity}
            onSubmit={handleOnQuestionSubmit}
            onQuestionSkipClick={handleQuestionSkipClick}
          ></ScaleQuestion>
        );
      case ActivityType.MEDIA_UPLOAD:
        return (
          <MediaUploadQuestion
            data={activity}
            onSubmit={handleOnQuestionSubmit}
            onQuestionSkipClick={handleQuestionSkipClick}
          ></MediaUploadQuestion>
        );
      case ActivityType.SINGLE_LINE_TEXT:
        return (
          <SingleLineTextQuestion
            data={activity}
            onQuestionSkipClick={handleQuestionSkipClick}
            onSubmit={handleOnQuestionSubmit}
          ></SingleLineTextQuestion>
        );
      case ActivityType.NUMBER:
        return (
          <NumberQuestion
            data={activity}
            onQuestionSkipClick={handleQuestionSkipClick}
            onSubmit={handleOnQuestionSubmit}
          ></NumberQuestion>
        );
      case ActivityType.MULTI_LINE_TEXT:
        return (
          <MultiLineTextQuestion
            data={activity}
            onSubmit={handleOnQuestionSubmit}
            onQuestionSkipClick={handleQuestionSkipClick}
          ></MultiLineTextQuestion>
        );
      default:
        return null;
    }
  };

  const getAnswer = (activity: ActivityVM) => {
    return <Answer data={activity}></Answer>;
  };

  const SkipTemplate = () => {
    return (
      <div className="flex justify-end">
        <div>
          <div className="">You skipped this question</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="m-4">{data?.question && getQuestion(data)}</div>
      <div className="m-4">
        {data.question.isSkipped === true && <SkipTemplate></SkipTemplate>}
      </div>
      <div className="m-4">
        {data?.answer &&
          data?.answer?.isResponseReceived &&
          data.question.isSkipped === false &&
          getAnswer(data)}
      </div>
    </div>
  );
};

export default Activity;

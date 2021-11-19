import { message } from "antd";
import moment from "moment";
import * as React from "react";
import { useState } from "react";
import KPTimeTemplate from "../../../../ui/templates/KPTimeTemplate";
import KPSkipTextButton from "../../../../ui/widgets/buttons/KPSkipTextButton";
import KPSubmitButton from "../../../../ui/widgets/buttons/KPSubmitButton";
import KPDatePicker from "../../../../ui/widgets/KPDatePicker";
import KPMediaQuestion from "../../../../ui/widgets/KPMediaQuestion";
import KPRichTextEditor from "../../../../ui/widgets/KPRichTextEditor";
import { ActivityVM } from "../../../models/classes/activitity.classes";
import {
  AnswerVM,
  CalendarAnswerVM,
} from "../../../models/classes/answer.classes";
import { DateValidationType } from "../../../models/enums/bot.enums";

type CalendarQuestionProps = {
  data: ActivityVM;
  onSubmit: (data: any) => void;
  onQuestionSkipClick: (data: any) => void;
};

const CalendarQuestion: React.FC<CalendarQuestionProps> = (
  props: CalendarQuestionProps
) => {
  const { data, onSubmit, onQuestionSkipClick } = props;
  const question = data.question;
  const rules = [];

  const calendarRef: any = React.useRef();
  const [value, setValue]: any = useState("");

  React.useEffect(() => {
    if (calendarRef && calendarRef.current) calendarRef.current.focus();
  }, [calendarRef]);

  if (question.allowSkip === false) {
    rules.push({
      required: true,
      message: "Required",
    });
  }

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    if (Number(question.dateValidation) === DateValidationType.FUTURE_DATE) {
      return current && current < moment().endOf("day");
    } else if (
      Number(question.dateValidation) === DateValidationType.PAST_DATE
    ) {
      return current && current > moment().endOf("day");
    }
  };

  const handleSkipQuestion = () => {
    onQuestionSkipClick(data);
  };

  const handleOnValueChange = (date: any, dateString: string) => {
    setValue(date);
  };

  const handleOnSubmit = () => {
    if (value === "") {
      message.error("Required");
      return;
    }
    let answer: AnswerVM = {
      time: new Date().toString(),
    };
    let calendarAnswer: CalendarAnswerVM = {
      ...answer,
      date: moment(value).format(question.dateFormat),
    };
    data.answer = calendarAnswer;
    onSubmit(data);
  };

  return (
    <div className="w-full">
      <div
        className={
          "inline-block p-4 text-left max-w-3/4 rounded-tl-xl rounded-tr-3xl rounded-br-3xl rounded-bl-3xl " +
          (question.isError ? "bg-red-200" : "bg-white")
        }
      >
        <div className="mb-1 text-gray-500 text-tiny">
          <KPTimeTemplate time={question.time}></KPTimeTemplate>
        </div>
        <KPRichTextEditor value={question.text} />
        {question.allowMedia && !question.isError ? (
          <KPMediaQuestion
            mediaType={question.mediaType}
            mediaUrl={question.mediaSourceUrl}
          />
        ) : null}
      </div>
      {!data?.answer &&
        !data?.answer?.isResponseReceived &&
        data.question.isSkipped === false && (
          <div className="flex flex-col w-full my-2">
            <div className="flex justify-end my-2">
              <div className="w-64 mb-0">
                <KPDatePicker
                  reference={calendarRef}
                  placeholder="Select Date"
                  format={question.dateFormat}
                  className="w-full h-12 rounded-3xl"
                  value={value}
                  onChange={handleOnValueChange}
                  disabledDate={disabledDate}
                ></KPDatePicker>
              </div>
            </div>
            <div className="flex justify-end w-full mb-0">
              <KPSubmitButton onClick={handleOnSubmit}></KPSubmitButton>
              {question.allowSkip && (
                <KPSkipTextButton
                  onClick={handleSkipQuestion}
                ></KPSkipTextButton>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default CalendarQuestion;

import { message } from "antd";
import * as React from "react";
import KPTimeTemplate from "../../../../ui/templates/KPTimeTemplate";
import KPSkipTextButton from "../../../../ui/widgets/buttons/KPSkipTextButton";
import KPSubmitButton from "../../../../ui/widgets/buttons/KPSubmitButton";
import KPMediaQuestion from "../../../../ui/widgets/KPMediaQuestion";
import KPRichTextEditor from "../../../../ui/widgets/KPRichTextEditor";
import KPTimePicker from "../../../../ui/widgets/KPTimePicker";
import { ActivityVM } from "../../../models/classes/activitity.classes";
import { AnswerVM, TimeAnswerVM } from "../../../models/classes/answer.classes";

type TimeQuestionProps = {
  data: ActivityVM;
  onSubmit: (data: any) => void;
  onQuestionSkipClick: (data: any) => void;
};

const TimeQuestion: React.FC<TimeQuestionProps> = (
  props: TimeQuestionProps
) => {
  const { data, onSubmit, onQuestionSkipClick } = props;
  const question = data.question;
  const timeRef: any = React.useRef();
  const [value, setValue]: any = React.useState("");

  React.useEffect(() => {
    if (timeRef && timeRef.current) timeRef.current.focus();
  }, [timeRef]);

  const handleSkipQuestion = () => {
    onQuestionSkipClick(data);
  };

  const handleOnValueChange = (time: any, dateString: string) => {
    setValue(time);
  };

  const handleOnSubmit = () => {
    if (value === "") {
      message.error("Required");
      return;
    }
    let answer: AnswerVM = {
      time: new Date().toString(),
    };

    let timeAnswer: TimeAnswerVM = {
      ...answer,
      selectedTime: value,
    };
    data.answer = timeAnswer;
    onSubmit(data);
  };

  return (
    <div>
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
          <div className="flex flex-col justify-end w-full my-2">
            <div className="flex flex-col w-full my-2">
              <div className="flex justify-end my-2">
                <div className="w-64 mb-0">
                  <KPTimePicker
                    reference={timeRef}
                    placeholder="Select Time"
                    className="w-full h-12 rounded-3xl"
                    value={value}
                    onChange={handleOnValueChange}
                  ></KPTimePicker>
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
          </div>
        )}
    </div>
  );
};

export default TimeQuestion;

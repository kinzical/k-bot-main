import { message, Rate } from "antd";
import * as React from "react";
import { useState } from "react";
import KPTimeTemplate from "../../../../ui/templates/KPTimeTemplate";
import KPSkipTextButton from "../../../../ui/widgets/buttons/KPSkipTextButton";
import KPSubmitButton from "../../../../ui/widgets/buttons/KPSubmitButton";
import KPMediaQuestion from "../../../../ui/widgets/KPMediaQuestion";
import KPRichTextEditor from "../../../../ui/widgets/KPRichTextEditor";
import { ActivityVM } from "../../../models/classes/activitity.classes";
import {
  AnswerVM,
  RatingAnswerVM,
} from "../../../models/classes/answer.classes";

type RatingQuestionProps = {
  data: ActivityVM;
  onSubmit: (data: any) => void;
  onQuestionSkipClick: (data: any) => void;
};

const RatingQuestion: React.FC<RatingQuestionProps> = (
  props: RatingQuestionProps
) => {
  const { data, onSubmit, onQuestionSkipClick } = props;
  const [value, setValue] = useState(0);
  const question = data.question;

  const rules = [];
  if (question.allowSkip === false) {
    rules.push({
      required: true,
      message: "Please select rating.",
    });
  }

  const handleSkipQuestion = () => {
    onQuestionSkipClick(data);
  };

  const handleOnValueChange = (value: any) => {
    setValue(value);
  };

  const handleOnSubmit = () => {
    if (value === 0) {
      message.error("Required");
      return;
    }
    let answer: AnswerVM = {
      time: new Date().toString(),
    };
    let rateAnswer: RatingAnswerVM = {
      ...answer,
      rate: value,
    };
    data.answer = rateAnswer;
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
          <div className="flex flex-col w-full">
            <div className="flex justify-end w-full my-2">
              <div className="inline-block p-4 text-right text-white bg-international max-w-3/4 rounded-tl-3xl rounded-tr-xl rounded-br-3xl rounded-bl-3xl">
                <div className="mb-0">
                  <Rate
                    allowHalf={question.allowPartialUnits}
                    count={question.noOfUnits}
                    value={value}
                    className="bg-international"
                    onChange={handleOnValueChange}
                  />
                </div>
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

export default RatingQuestion;

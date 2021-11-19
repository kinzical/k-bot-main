import * as React from "react";
import KPTimeTemplate from "../../../../ui/templates/KPTimeTemplate";
import KPSkipTextButton from "../../../../ui/widgets/buttons/KPSkipTextButton";
import KPOption from "../../../../ui/widgets/KPOption";
import KPRichTextEditor from "../../../../ui/widgets/KPRichTextEditor";
import KPMediaQuestion from "../../../../ui/widgets/KPMediaQuestion";
import { ActivityVM } from "../../../models/classes/activitity.classes";
import {
  AnswerVM,
  SingleChoiceAnswerOptionVM,
  SingleChoiceAnswerVM,
} from "../../../models/classes/answer.classes";
import {
  SingleChoiceOption,
  SingleChoiceVM,
} from "../../../models/classes/question.classes";

type SingleChoiceQuestionProps = {
  data: ActivityVM;
  onSubmit: (data: ActivityVM) => void;
  onQuestionSkipClick: (data: any) => void;
};

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = (
  props: SingleChoiceQuestionProps
) => {
  const { data, onSubmit, onQuestionSkipClick } = props;
  const question = data.question;
  const [selectedOption, setSelectedOption] = React.useState(null as any);

  const rules = [];
  if (question.allowSkip === false) {
    rules.push({
      required: true,
      message: "Please select one option.",
    });
  }

  const handleOnSelectOption = (id: number) => {
    setSelectedOption(id);
    handleOnSubmit(id);
  };

  const handleOnSubmit = (id: number) => {
    let answer: AnswerVM = {
      time: new Date().toString(),
    };
    const ques: SingleChoiceVM = data.question;
    const optionFound = ques.options.find((item: any) => item.id === id);
    if (optionFound) {
      const choiceOption: SingleChoiceAnswerOptionVM = {
        id: optionFound?.id,
        label: optionFound.label,
      };
      const singleChoiceAnswer: SingleChoiceAnswerVM = {
        ...answer,
        option: choiceOption,
      };
      data.answer = singleChoiceAnswer;
      onSubmit(data);
    }
  };

  const handleSkipQuestion = () => {
    onQuestionSkipClick(data);
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
          <div className="flex justify-end w-full my-2">
            <div className="inline-block text-right max-w-3/4">
              {question.options.map((item: SingleChoiceOption) => {
                return (
                  <React.Fragment key={item.id}>
                    <KPOption
                      id={item.id}
                      label={item.label}
                      isSelected={item.id === selectedOption}
                      onSelect={handleOnSelectOption}
                    ></KPOption>
                  </React.Fragment>
                );
              })}
            </div>
            {question.allowSkip && (
              <KPSkipTextButton onClick={handleSkipQuestion}></KPSkipTextButton>
            )}
          </div>
        )}
    </div>
  );
};

export default SingleChoiceQuestion;

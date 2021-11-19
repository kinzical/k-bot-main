import { message } from "antd";
import * as React from "react";
import KPTimeTemplate from "../../../../ui/templates/KPTimeTemplate";
import KPSendButton from "../../../../ui/widgets/buttons/KPSendButton";
import KPSkipTextButton from "../../../../ui/widgets/buttons/KPSkipTextButton";
import KPSubmitButton from "../../../../ui/widgets/buttons/KPSubmitButton";
import KPInput from "../../../../ui/widgets/KPInput";
import KPMediaQuestion from "../../../../ui/widgets/KPMediaQuestion";
import KPOption from "../../../../ui/widgets/KPOption";
import KPRichTextEditor from "../../../../ui/widgets/KPRichTextEditor";
import { ActivityVM } from "../../../models/classes/activitity.classes";
import {
  AnswerVM,
  MultiSelectAnswerOptionVM,
  MultiSelectAnswerVM,
} from "../../../models/classes/answer.classes";
import {
  MultipleSelectOption,
  MultipleSelectVM,
} from "../../../models/classes/question.classes";
import { Validator } from "../../../validator/classes/validator.classes";

type MultipleSelectQuestionProps = {
  data: ActivityVM;
  onSubmit: (data: any) => void;
  onQuestionSkipClick: (data: any) => void;
};

const MultipleSelectQuestion: any = (props: MultipleSelectQuestionProps) => {
  const { data, onSubmit, onQuestionSkipClick } = props;
  const question = data.question;
  const [selectedOptions, setSelectedOptions] = React.useState<number[]>([]);
  const inputRef: any = React.useRef();
  const [questionOptions, setQuestionOptions] = React.useState(
    question.options
  );
  React.useEffect(() => {
    if (inputRef && inputRef.current) inputRef.current.focus();
  }, [inputRef]);

  const handleOnSelectOption = (id: number, selected: boolean) => {
    const optionFoundIndex = selectedOptions.findIndex(
      (itemId) => itemId === id
    );
    if (optionFoundIndex !== -1) {
      if (selected) {
        return;
      } else {
        const optionsTemp = JSON.parse(JSON.stringify(selectedOptions));
        optionsTemp.splice(optionFoundIndex, 1);
        setSelectedOptions(optionsTemp);
      }
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  const handleValueChange = (id: number, val: string) => {
    let tempQuestionOptions = questionOptions.map((key: any) => {
      return {
        id: key.id,
        label: key.id === id ? val : key.label,
        isEditable: key.isEditable,
      };
    });
    setQuestionOptions(tempQuestionOptions);
  };

  const handleDelete = (id: number) => {
    setQuestionOptions(question.options);
  };

  const handleValidateOption = (inputValue: string, id: number) => {
    if (Validator.checkOptionLength(inputValue)) {
      message.error("Sorry! You have exceeded 50 character limit");
      return false;
    } else if (Validator.isOptionSame(questionOptions, inputValue, id)) {
      message.error("Same choice already available");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmitClick = () => {
    if (selectedOptions.length === 0) {
      message.error("Please select atleast one option.");
    } else {
      let answer: AnswerVM = {
        time: new Date().toString(),
      };
      const formSelectedOption = selectedOptions;
      const selectedOptionsFound = questionOptions.filter(
        (item: any) =>
          formSelectedOption.find((vItem: any) => vItem === item.id) !==
          undefined
      );
      if (selectedOptionsFound) {
        const choiceOptions: MultiSelectAnswerOptionVM[] =
          selectedOptionsFound.map((item: any) => {
            return {
              id: item.id,
              input: item.isEditable ? [item.label] : [],
              label: item.label,
            };
          });
        const multiSelectAnswer: MultiSelectAnswerVM = {
          ...answer,
          options: choiceOptions,
        };
        data.answer = multiSelectAnswer;
        onSubmit(data);
      }
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
          <div className="flex flex-col items-end justify-end w-full my-2">
            <div className="inline-block my-2 text-right w-3/4">
              {questionOptions.map((item: MultipleSelectOption) => (
                <React.Fragment key={item.id}>
                  <KPOption
                    id={item.id}
                    label={item.label}
                    isEditable={item.isEditable}
                    onDelete={handleDelete}
                    onValueChange={handleValueChange}
                    validateOption={handleValidateOption}
                    isSelected={
                      selectedOptions.find((id) => id === item.id) !== undefined
                    }
                    onSelect={handleOnSelectOption}
                  ></KPOption>
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-end w-full mb-0 mr-1">
              <KPSubmitButton onClick={handleSubmitClick}></KPSubmitButton>
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

export default MultipleSelectQuestion;

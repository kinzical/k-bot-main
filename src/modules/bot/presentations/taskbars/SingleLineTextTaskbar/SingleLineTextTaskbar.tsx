import { message } from "antd";
import * as React from "react";
import { useState } from "react";
import KPSendButton from "../../../../ui/widgets/buttons/KPSendButton";
import KPSkipButton from "../../../../ui/widgets/buttons/KPSkipButton";
import KPInput from "../../../../ui/widgets/KPInput";
import { ActivityVM } from "../../../models/classes/activitity.classes";
import {
  AnswerVM,
  SingleLineTextAnswerVM
} from "../../../models/classes/answer.classes";

type SingleLineTextTaskbarProps = {
  data: ActivityVM;
  onTaskbarAnswerSubmit: (data: ActivityVM) => void;
  onTaskbarAnswerSkip: (data: ActivityVM) => void;
};

const SingleLineTextTaskbar: React.FC<SingleLineTextTaskbarProps> = (
  props: SingleLineTextTaskbarProps
) => {
  const { data, onTaskbarAnswerSubmit, onTaskbarAnswerSkip } = props;
  const question = data.question;
  const inputRef: any = React.useRef();
  const [value, setValue] = useState("");

  React.useEffect(() => {
    if (inputRef && inputRef.current) inputRef.current.focus();
  }, [inputRef]);

  const handleOnSubmit = () => {
    if (value === "") {
      message.error("Required");
      inputRef.current.focus();
      return;
    }
    let answer: AnswerVM = {
      time: new Date().toString(),
    };
    let singleLineAnswer: SingleLineTextAnswerVM = {
      ...answer,
      answer: value,
    };
    data.answer = singleLineAnswer;
    onTaskbarAnswerSubmit(data);
  };

  const handleSkipQuestion = () => {
    onTaskbarAnswerSkip(data);
  };

  const handleValueChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex items-center w-full px-3 bg-coconutwhite">
      <div className="flex items-center justify-center w-full my-4">
        <div className="w-full mb-0 mr-2">
          <KPInput
            value={value}
            onChange={handleValueChange}
            inputref={inputRef}
            className="w-full h-12 rounded-3xl"
            suffix={value.length + "/" + question.maxCharacter}
            maxLength={question.maxCharacter}
            onPressEnter={handleOnSubmit}
          ></KPInput>
        </div>
        <KPSendButton onClick={handleOnSubmit}></KPSendButton>
        {question.allowSkip && (
          <KPSkipButton onClick={handleSkipQuestion}></KPSkipButton>
        )}
      </div>
    </div>
  );
};

export default SingleLineTextTaskbar;

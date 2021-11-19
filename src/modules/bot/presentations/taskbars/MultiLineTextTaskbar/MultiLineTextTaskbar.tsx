import { message } from "antd";
import * as React from "react";
import { useState } from "react";
import KPSendButton from "../../../../ui/widgets/buttons/KPSendButton";
import KPSkipButton from "../../../../ui/widgets/buttons/KPSkipButton";
import KPTextArea from "../../../../ui/widgets/KPTextArea";
import { ActivityVM } from "../../../models/classes/activitity.classes";
import {
  AnswerVM,
  MultiLineTextAnswerVM
} from "../../../models/classes/answer.classes";
import "./MultiLineTextTaskbar.less";

type MultiLineTextTaskbarProps = {
  data: ActivityVM;
  onTaskbarAnswerSubmit: (data: ActivityVM) => void;
  onTaskbarAnswerSkip: (data: ActivityVM) => void;
};

const MultiLineTextTaskbar: React.FC<MultiLineTextTaskbarProps> = (
  props: MultiLineTextTaskbarProps
) => {
  const { data, onTaskbarAnswerSubmit, onTaskbarAnswerSkip } = props;
  const question = data.question;
  const inputRef: any = React.useRef();
  const [value, setValue] = useState("");

  React.useEffect(() => {
    if (inputRef && inputRef.current) inputRef.current.focus();
  }, [inputRef]);

  const handleSkipQuestion = () => {
    onTaskbarAnswerSkip(data);
  };

  const handleOnSubmit = () => {
    if (value === "") {
      message.error("Required");
      inputRef.current.focus();
      return;
    }
    let answer: AnswerVM = {
      time: new Date().toString(),
    };
    let multiLineAnswer: MultiLineTextAnswerVM = {
      ...answer,
      answer: value,
    };
    data.answer = multiLineAnswer;
    onTaskbarAnswerSubmit(data);
  };

  const handleOnValueChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex items-center w-full px-3 multiline-text-taskbar bg-coconutwhite">
      <div className="flex items-center justify-center w-full my-4">
        <div className="w-full mr-2">
          <KPTextArea
            inputref={inputRef}
            className="rounded-3xl min-h-12"
            value={value}
            onChange={handleOnValueChange}
            autoSize={{ minRows: 1, maxRows: 3}}
          ></KPTextArea>
        </div>
        <KPSendButton onClick={handleOnSubmit}></KPSendButton>
        {question.allowSkip && (
          <KPSkipButton onClick={handleSkipQuestion}></KPSkipButton>
        )}
      </div>
    </div>
  );
};

export default MultiLineTextTaskbar;

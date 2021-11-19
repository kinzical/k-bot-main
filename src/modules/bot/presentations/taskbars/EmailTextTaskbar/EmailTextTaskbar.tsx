import { message } from "antd";
import * as React from "react";
import KPSendButton from "../../../../ui/widgets/buttons/KPSendButton";
import KPSkipButton from "../../../../ui/widgets/buttons/KPSkipButton";
import KPInput from "../../../../ui/widgets/KPInput";
import { ActivityVM } from "../../../models/classes/activitity.classes";
import {
  AnswerVM,
  EmailAnswerVM
} from "../../../models/classes/answer.classes";

type EmailTextTaskbarProps = {
  data: ActivityVM;
  onTaskbarAnswerSubmit: (data: ActivityVM) => void;
  onTaskbarAnswerSkip: (data: ActivityVM) => void;
};

const EmailTextTaskbar: React.FC<EmailTextTaskbarProps> = (
  props: EmailTextTaskbarProps
) => {
  const { data, onTaskbarAnswerSubmit, onTaskbarAnswerSkip } = props;
  const question = data.question;
  const inputRef: any = React.useRef();
  const [value, setValue] = React.useState("");

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
    let emailAnswer: EmailAnswerVM = {
      ...answer,
      email: value,
    };
    data.answer = emailAnswer;
    onTaskbarAnswerSubmit(data);
  };

  const handleSkipQuestion = () => {
    onTaskbarAnswerSkip(data);
  };

  const handleValueChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex items-center w-full h-20 px-3 bg-coconutwhite">
      <div className="flex items-center justify-center w-full">
        <div className="w-full mb-0 mr-2">
          <KPInput
            value={value}
            onChange={handleValueChange}
            inputref={inputRef}
            className="w-full h-12 rounded-3xl"
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

export default EmailTextTaskbar;

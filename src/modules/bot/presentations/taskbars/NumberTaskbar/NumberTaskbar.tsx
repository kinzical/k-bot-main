import { message } from "antd";
import * as React from "react";
import KPSendButton from "../../../../ui/widgets/buttons/KPSendButton";
import KPSkipButton from "../../../../ui/widgets/buttons/KPSkipButton";
import KPNumberInput from "../../../../ui/widgets/KPNumberInput";
import { ActivityVM } from "../../../models/classes/activitity.classes";
import {
  AnswerVM,
  NumberAnswerVM,
} from "../../../models/classes/answer.classes";

type NumberTaskbarProps = {
  data: ActivityVM;
  onTaskbarAnswerSubmit: (data: ActivityVM) => void;
  onTaskbarAnswerSkip: (data: ActivityVM) => void;
};

const NumberTaskbar: React.FC<any> = (props: NumberTaskbarProps) => {
  const { data, onTaskbarAnswerSubmit, onTaskbarAnswerSkip } = props;
  const question = data.question;
  const inputRef: any = React.useRef();
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (inputRef && inputRef.current) inputRef.current.focus();
  }, [inputRef]);

  const handleOnSubmit = () => {
    if (value.toString().trim().length === 0) {
      message.error("Required");
      inputRef.current.focus();
      return;
    }
    if (value.toString().length > question.maxCharacter) {
      message.error("Maximum digits allowed are " + question.maxCharacter);
      inputRef.current.focus();
      return;
    }
    let answer: AnswerVM = {
      time: new Date().toString(),
    };
    let numberAnswer: NumberAnswerVM = {
      ...answer,
      answer: value.toString(),
    };
    data.answer = numberAnswer;
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
          <KPNumberInput
            value={value}
            onChange={handleValueChange}
            inputref={inputRef}
            className="w-full h-12 rounded-3xl"
            onPressEnter={handleOnSubmit}
            allowDecimal={question.allowDecimal}
            min={0}
          ></KPNumberInput>
        </div>
        <KPSendButton onClick={handleOnSubmit}></KPSendButton>
        {question.allowSkip && (
          <KPSkipButton onClick={handleSkipQuestion}></KPSkipButton>
        )}
      </div>
    </div>
  );
};

export default NumberTaskbar;

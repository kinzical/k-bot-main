import { message } from "antd";
import * as React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import countrycodes from "../../../../core/utils/country-codes.json";
import KPSendButton from "../../../../ui/widgets/buttons/KPSendButton";
import KPSkipButton from "../../../../ui/widgets/buttons/KPSkipButton";
import { ActivityVM } from "../../../models/classes/activitity.classes";
import {
  AnswerVM,
  CellPhoneAnswerVM
} from "../../../models/classes/answer.classes";
import "./CellPhoneTaskbar.less";

type CellPhoneTaskbarProps = {
  data: ActivityVM;
  onTaskbarAnswerSubmit: (data: ActivityVM) => void;
  onTaskbarAnswerSkip: (data: ActivityVM) => void;
};

const CellPhoneTaskbar: React.FC<CellPhoneTaskbarProps> = (
  props: CellPhoneTaskbarProps
) => {
  const { data, onTaskbarAnswerSubmit, onTaskbarAnswerSkip } = props;
  const question = data.question;
  const [countryCode, setCountryCode] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const inputRef: any = React.useRef();

  React.useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const country =
    countrycodes
      .find((item) => item.dial_code === question.countryCode)
      ?.code.toLowerCase() || "us";

  const rules = [];

  if (question.allowSkip === false) {
    rules.push({
      required: true,
      message: "Required",
    });
  }

  const handleOnPhoneChange = (value: any, country: any) => {
    setPhone(value);
    setCountryCode(country.dialCode);
  };

  const handleOnSubmitClick = () => {
    if ((phone === "" && countryCode === "") || phone === countryCode) {
      message.error("Please input vald phone.");
    } else {
      let answer: AnswerVM = {
        time: new Date().toString(),
      };
      let cellPhoneAnswer: CellPhoneAnswerVM = {
        ...answer,
        countryCode: countryCode,
        phone: phone
      };
      data.answer = cellPhoneAnswer;
      onTaskbarAnswerSubmit(data);
    }
  };

  const handleSkipQuestion = () => {
    onTaskbarAnswerSkip(data);
  };

  return (
    <div className="flex items-center w-full h-20 px-3 bg-coconutwhite cellphone-taskbar">
      <div className="flex items-center justify-center w-full my-4">
      <PhoneInput
        inputProps={{
          autoFocus: true,
        }}
        country={country}
        onChange={handleOnPhoneChange}
        onEnterKeyPress={handleOnSubmitClick}
        inputClass="rounded-3xl h-12 w-full"
        containerClass="mr-2 w-full"
      />
      <KPSendButton onClick={handleOnSubmitClick}></KPSendButton>
      {question.allowSkip && (
        <KPSkipButton onClick={handleSkipQuestion}></KPSkipButton>
      )}
      </div>
    </div>
  );
};

export default CellPhoneTaskbar;

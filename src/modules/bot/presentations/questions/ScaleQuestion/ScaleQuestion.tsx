import { Form, message, Slider } from "antd";
import * as React from "react";
import KPTimeTemplate from "../../../../ui/templates/KPTimeTemplate";
import KPSkipTextButton from "../../../../ui/widgets/buttons/KPSkipTextButton";
import KPSubmitButton from "../../../../ui/widgets/buttons/KPSubmitButton";
import KPMediaQuestion from "../../../../ui/widgets/KPMediaQuestion";
import KPRichTextEditor from "../../../../ui/widgets/KPRichTextEditor";
import { ActivityVM } from "../../../models/classes/activitity.classes";
import {
  AnswerVM,
  ScaleAnswerOptionVM,
  ScaleAnswerVM,
} from "../../../models/classes/answer.classes";
import { ScaleVM } from "../../../models/classes/question.classes";

type ScaleQuestionProps = {
  data: ActivityVM;
  onSubmit: (data: any) => void;
  onQuestionSkipClick: (data: any) => void;
};

const ScaleQuestion: React.FC<ScaleQuestionProps> = (
  props: ScaleQuestionProps
) => {
  const { data, onSubmit, onQuestionSkipClick } = props;
  const question: ScaleVM = data.question;

  const marks = {
    0: "0",
    [`${question.scaleLimit}`]: question.scaleLimit,
  };

  const [singleChoiceForm] = Form.useForm();

  const rules: any = [];
  if (question.allowSkip === false) {
    rules.push({
      required: true,
      message: "Please select value in slider.",
    });
  }

  const handleOnFormFinish = (values: any) => {
    let answer: AnswerVM = {
      time: new Date().toString(),
    };
    const scaleOptions: ScaleAnswerOptionVM[] = question.options.map((item) => {
      return {
        id: item.id,
        label: item.label,
        unit: values[`${item.id}`],
      };
    });
    let scaleAnswer: ScaleAnswerVM = {
      ...answer,
      scales: scaleOptions,
    };
    data.answer = scaleAnswer;
    onSubmit(data);
  };

  const handleOnFormFinishFailed = ({
    values,
    errorFields,
    outOfDate,
  }: any) => {
    message.error(errorFields[0].errors[0]);
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
            mediaType={question.mediaType || ""}
            mediaUrl={question.mediaSourceUrl || ""}
          />
        ) : null}
      </div>
      {!data?.answer &&
        !data?.answer?.isResponseReceived &&
        data.question.isSkipped === false && (
          <div className="flex justify-end w-full my-2">
            <div className="w-full max-w-3/4 sm:max-w-1/2">
              <Form
                form={singleChoiceForm}
                name="singleChoiceForm"
                onFinish={handleOnFormFinish}
                onFinishFailed={handleOnFormFinishFailed}
                className="w-full"
              >
                {question.options.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="w-full px-4 pt-2 pb-1 my-1 rounded-lg bg-coconutwhite"
                    >
                      <span className="font-semibold">{item.label}</span>
                      <Form.Item
                        name={item.id}
                        rules={rules}
                        hasFeedback={false}
                        key={item.id}
                        className="w-full mb-0"
                      >
                        <Slider
                          getTooltipPopupContainer={(triggerNode: any) =>
                            triggerNode.parentNode
                          }
                          min={0}
                          max={question.scaleLimit}
                          marks={marks}
                        ></Slider>
                      </Form.Item>
                    </div>
                  );
                })}
                <div className="flex justify-end w-full mb-0">
                  <KPSubmitButton></KPSubmitButton>
                  {question.allowSkip && (
                    <KPSkipTextButton
                      onClick={handleSkipQuestion}
                    ></KPSkipTextButton>
                  )}
                </div>
              </Form>
            </div>
          </div>
        )}
    </div>
  );
};

export default ScaleQuestion;

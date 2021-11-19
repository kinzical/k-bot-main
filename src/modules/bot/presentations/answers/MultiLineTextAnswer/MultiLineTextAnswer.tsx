import * as React from "react";
import KPTimeTemplate from "../../../../ui/templates/KPTimeTemplate";
import { ActivityVM } from "../../../models/classes/activitity.classes";

type MultiLineTextAnswerProps = {
  data: ActivityVM;
};

const MultiLineTextAnswer: React.FC<MultiLineTextAnswerProps> = (
  props: MultiLineTextAnswerProps
) => {
  const { data } = props;
  const { answer } = data;

  return (
    <div className="flex justify-end w-full">
      <div className="inline-block p-4 text-right text-white bg-international max-w-3/4 rounded-tl-3xl rounded-tr-xl rounded-br-3xl rounded-bl-3xl">
        <div className="mb-1 text-gray-300 text-tiny">
          <KPTimeTemplate utc={false} time={answer.time}></KPTimeTemplate>
        </div>
        <div className="break-all">{answer.answer}</div>
      </div>
    </div>
  );
};

export default MultiLineTextAnswer;

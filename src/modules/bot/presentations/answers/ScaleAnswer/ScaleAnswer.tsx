import * as React from "react";
import KPTimeTemplate from "../../../../ui/templates/KPTimeTemplate";
import { ActivityVM } from "../../../models/classes/activitity.classes";

type ScaleAnswerProps = {
  data: ActivityVM;
};

const ScaleAnswer: React.FC<ScaleAnswerProps> = (props: ScaleAnswerProps) => {
  const { data } = props;
  const { answer } = data;

  return (
    <div className="flex justify-end w-full">
      <div className="inline-block p-4 text-right text-white bg-international max-w-3/4 rounded-tl-3xl rounded-tr-xl rounded-br-3xl rounded-bl-3xl">
        <div className="mb-1 text-gray-300 text-tiny">
          <KPTimeTemplate utc={false} time={answer.time}></KPTimeTemplate>
        </div>
        <div>
          {answer.scales.map((item: any, index: number) => {
            return (
              <React.Fragment key={item.id}>
                <span>
                  {item.label} - {item.unit}
                  {index !== answer.scales.length - 1 ? ", " : ""}
                </span>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScaleAnswer;

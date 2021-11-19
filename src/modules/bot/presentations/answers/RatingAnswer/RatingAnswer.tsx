import { Rate } from "antd";
import * as React from "react";
import KPTimeTemplate from "../../../../ui/templates/KPTimeTemplate";
import { ActivityVM } from "../../../models/classes/activitity.classes";

type RatingAnswerProps = {
  data: ActivityVM;
};

const RatingAnswer: React.FC<RatingAnswerProps> = (
  props: RatingAnswerProps
) => {
  const { data } = props;
  const { answer } = data;

  return (
    <div className="flex justify-end w-full">
      <div className="inline-block p-4 text-right text-white bg-international max-w-3/4 rounded-tl-3xl rounded-tr-xl rounded-br-3xl rounded-bl-3xl">
        <div className="mb-1 text-gray-300 text-tiny">
          <KPTimeTemplate utc={false} time={answer.time}></KPTimeTemplate>
        </div>
        <div>
          <Rate
            defaultValue={answer.rate}
            count={data.question.noOfUnits}
            allowHalf={true}
            className="bg-international"
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default RatingAnswer;

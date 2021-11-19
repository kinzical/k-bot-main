import * as React from "react";
import KPTimeTemplate from "../../../../ui/templates/KPTimeTemplate";
import KPMediaQuestion from "../../../../ui/widgets/KPMediaQuestion";
import KPRichTextEditor from "../../../../ui/widgets/KPRichTextEditor";
import { ActivityVM } from "../../../models/classes/activitity.classes";

type StatementQuestionProps = {
  data: ActivityVM;
};

const StatementQuestion: React.FC<StatementQuestionProps> = (
  props: StatementQuestionProps
) => {
  const { data } = props;
  const question = data.question;

  return (
    <div className="h-full">
      <div
        className={
          "inline-block p-4 text-left max-w-3/4 h-full rounded-tl-xl rounded-tr-3xl rounded-br-3xl rounded-bl-3xl " +
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
    </div>
  );
};

export default StatementQuestion;

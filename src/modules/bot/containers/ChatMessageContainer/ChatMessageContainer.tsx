import * as React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import KPTypingTemplate from "../../../ui/templates/KPTypingTemplate";
import { ActivityVM } from "../../models/classes/activitity.classes";
import Activity from "../../presentations/Activity";

type ChatMessageContainerProps = {
  activityList: any[];
  onQuestionSubmit: (data: ActivityVM) => void;
  onQuestionSkipClick: (data: ActivityVM) => void;
  showTyping: boolean;
};

const ChatMessageContainer: React.FC<ChatMessageContainerProps> = (
  props: ChatMessageContainerProps
) => {
  const { activityList, onQuestionSubmit, onQuestionSkipClick, showTyping } =
    props;

  const handleOnQuestionSubmit = (data: any) => {
    onQuestionSubmit(data);
  };

  return (
    <div className="w-full h-full bg-whitesolid">
      <ScrollToBottom className="w-full h-full">
        {activityList.map((activity: ActivityVM, index: number) => (
          <div key={index}>
            <Activity
              onQuestionSubmit={handleOnQuestionSubmit}
              onQuestionSkipClick={onQuestionSkipClick}
              data={activity}
            ></Activity>
          </div>
        ))}
        {showTyping && <KPTypingTemplate></KPTypingTemplate>}
      </ScrollToBottom>
    </div>
  );
};

export default ChatMessageContainer;

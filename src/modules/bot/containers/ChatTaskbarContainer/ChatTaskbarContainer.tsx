import * as React from "react";
import { ActivityVM } from "../../models/classes/activitity.classes";
import Taskbar from "../../presentations/Taskbar";

type ChatTaskbarContainerProps = {
  activity: ActivityVM;
  onTaskbarAnswerSubmit: (data: ActivityVM) => void;
  onTaskbarAnswerSkip: (data: ActivityVM) => void;
};

const ChatTaskbarContainer: React.FC<ChatTaskbarContainerProps> = (
  props: ChatTaskbarContainerProps
) => {

 
  const { activity, onTaskbarAnswerSubmit, onTaskbarAnswerSkip } = props;
  return (
    <div className="w-full">
      {activity && (
        <Taskbar
          activity={activity}
          onTaskbarAnswerSubmit={onTaskbarAnswerSubmit}
          onTaskbarAnswerSkip={onTaskbarAnswerSkip}
        ></Taskbar>
      )}
    </div>
  );
};

export default ChatTaskbarContainer;

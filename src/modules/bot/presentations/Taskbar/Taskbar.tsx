import * as React from "react";
import { ActivityVM } from "../../models/classes/activitity.classes";
import { ActivityType } from "../../models/enums/bot.enums";
import CellPhoneTaskbar from "../../presentations/taskbars/CellPhoneTaskbar";
import EmailTextTaskbar from "../../presentations/taskbars/EmailTextTaskbar";
import MultiLineTextTaskbar from "../../presentations/taskbars/MultiLineTextTaskbar";
import SingleLineTextTaskbar from "../../presentations/taskbars/SingleLineTextTaskbar";
import NumberTaskbar from "../taskbars/NumberTaskbar";

type TaskbarProps = {
  activity: ActivityVM;
  onTaskbarAnswerSubmit: (data: ActivityVM) => void;
  onTaskbarAnswerSkip: (data: ActivityVM) => void;
};

const Taskbar: React.FC<TaskbarProps> = (props: TaskbarProps) => {
  const { activity, onTaskbarAnswerSubmit, onTaskbarAnswerSkip } = props;

  const getTaskbar = (activity: ActivityVM) => {
    switch (activity.type) {
      case ActivityType.SINGLE_LINE_TEXT:
        return (
          <SingleLineTextTaskbar
            data={activity}
            onTaskbarAnswerSubmit={onTaskbarAnswerSubmit}
            onTaskbarAnswerSkip={onTaskbarAnswerSkip}
          ></SingleLineTextTaskbar>
        );
      case ActivityType.NUMBER:
        return (
          <NumberTaskbar
            data={activity}
            onTaskbarAnswerSubmit={onTaskbarAnswerSubmit}
            onTaskbarAnswerSkip={onTaskbarAnswerSkip}
          ></NumberTaskbar>
        );
      case ActivityType.MULTI_LINE_TEXT:
        return (
          <MultiLineTextTaskbar
            data={activity}
            onTaskbarAnswerSubmit={onTaskbarAnswerSubmit}
            onTaskbarAnswerSkip={onTaskbarAnswerSkip}
          ></MultiLineTextTaskbar>
        );
      case ActivityType.EMAIL:
        return (
          <EmailTextTaskbar
            data={activity}
            onTaskbarAnswerSubmit={onTaskbarAnswerSubmit}
            onTaskbarAnswerSkip={onTaskbarAnswerSkip}
          ></EmailTextTaskbar>
        );
      case ActivityType.CELLPHONE:
        return (
          <CellPhoneTaskbar
            data={activity}
            onTaskbarAnswerSubmit={onTaskbarAnswerSubmit}
            onTaskbarAnswerSkip={onTaskbarAnswerSkip}
          ></CellPhoneTaskbar>
        );
      default:
        return null;
    }
  };
  return <>{getTaskbar(activity)}</>;
};

export default Taskbar;

import * as React from "react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import HeaderContainer from "../../../core/containers/HeaderContainer";
import { wsApiService } from "../../../core/services/api/WSApi.service";
import { botFacade } from "../../facades/Bot.facade";
import { ActivityVM } from "../../models/classes/activitity.classes";
import { ActivityType, ChatEvent } from "../../models/enums/bot.enums";
import ChatMessageContainer from "../ChatMessageContainer";
import ChatSidebarContainer from "../ChatSidebarContainer";
import ChatTaskbarContainer from "../ChatTaskbarContainer";
import "./ChatWindowContainer.less";

type ChatWindowContainerProps = {
  campaignDetails: any;
};

const ChatWindowContainer: React.FC<any> = (
  props: ChatWindowContainerProps
) => {
  const { campaignDetails } = props;
  const [activityList, setActivityList] = useState<ActivityVM[]>([]);
  const activityListRef = React.useRef(activityList);
  const [currentActivity, setCurrentActivity]: any = useState<ActivityVM>(
    new ActivityVM()
  );
  const [showTyping, setShowTyping] = useState(false);
  const currentActivityRef = React.useRef(currentActivity);
  const showTypingRef = React.useRef(showTyping);
  const [timerCount, setTimerCount] = useState(2000);
  const timerCountRef = React.useRef(timerCount);

  useEffect(() => {
    currentActivityRef.current = currentActivity;
  }, [currentActivity]);

  useEffect(() => {
    timerCountRef.current = timerCount;
  }, [timerCount]);

  const setMyActivityList = (data: ActivityVM[]) => {
    activityListRef.current = data;
    setActivityList(data);
  };

  const setMyShowTyping = (data: boolean) => {
    showTypingRef.current = data;
    setShowTyping(data);
  };

  const handleOnQuestionSubmit = (data: ActivityVM) => {
    handleOnTaskbarAnswerSubmit(data);
  };

  const handleOnTaskbarAnswerSubmit = (activity: ActivityVM) => {
    sendAnswer(activity);
  };

  const handleOnTaskbarAnswerSkip = (activity: ActivityVM) => {
    skipQuestion(activity);
  };

  const handleQuestionSkipClick = (activity: ActivityVM) => {
    skipQuestion(activity);
  };

  const sendAnswer = (activity: ActivityVM) => {
    let answerDTO = botFacade.getTransformedAnswer(
      activity.type,
      activity.answer
    );
    let response = botFacade.getResponsePayload(
      ChatEvent.ON_RESPONSE,
      answerDTO,
      activity.id
    );

    if (wsApiService.getSocket().connected) {
      wsApiService.getSocket().emit(ChatEvent.ON_RESPONSE, response);
    }
  };

  const skipQuestion = (activity: ActivityVM) => {
    let response = botFacade.getSkipQuestionPayload(
      ChatEvent.ON_RESPONSE,
      activity.id
    );
    if (wsApiService.getSocket().connected) {
      wsApiService.getSocket().emit(ChatEvent.ON_SKIP_QUESTION, response);
      const activityIndex = activityListRef.current.findIndex(
        (item) => item.id === activity.id
      );
      if (activityIndex !== -1) {
        const activity = activityListRef.current[activityIndex];
        activity.question.isSkipped = true;
        activityListRef.current.splice(activityIndex, 1, activity);
        setMyActivityList(activityListRef.current);
      }
    }
  };

  const sendResponseStatement = (activity: ActivityVM) => {
    let answerDTO = botFacade.getTransformedAnswer(
      activity.type,
      activity.answer
    );
    let response = botFacade.getResponsePayload(
      ChatEvent.ON_RESPONSE_STATEMENT,
      answerDTO,
      activity.id
    );
    if (wsApiService.getSocket().connected) {
      wsApiService.getSocket().emit(ChatEvent.ON_RESPONSE_STATEMENT, response);
    }
  };

  const listenSocketEvents = React.useCallback(() => {
    const bot = wsApiService.getSocket();

    if (bot) {
      bot.on(ChatEvent.ON_LINK_ROUTE, function (e: any) {
        if (e.message === ChatEvent.ON_INITIATE_CHAT) {
          bot.emit(
            ChatEvent.ON_CONNECT,
            botFacade.getChatConnectedPayload(ChatEvent.ON_CONNECT)
          );
        }
      });

      bot.on(ChatEvent.ON_NEXT_QUESTION, function (e: any) {
        const existingActivity = activityListRef.current.find(
          (activity) => activity.id === e.data.activity_id
        );

        if (!existingActivity) {
          let questionPayload = {
            room_id: botFacade.getRoomId(),
            activity_id: e.data.activity_id,
          };

          // create activity and push it
          const activity: ActivityVM = botFacade.getTransformedActivity(e);
          if (activity.type === ActivityType.STATEMENT) {
            activity.answer = {
              text: "-1",
            };
            sendResponseStatement(activity);
          }
          setTimerCount((prevCount: number) => prevCount + 2000);

          setMyShowTyping(true);
          setTimeout(() => {
            setMyActivityList([...activityListRef.current, activity]);
            setCurrentActivity(activity);

            // This is required because all statement questions are recieved successively.
            if (activity.type === ActivityType.STATEMENT) {
              setMyShowTyping(true);
            } else {
              setMyShowTyping(false);
            }
          }, timerCountRef?.current);
          bot.emit(ChatEvent.ON_QUESTION_RECEIVED, questionPayload);
        }
      });

      bot.on(ChatEvent.ON_RESPONSE_RECEIVED, function (e: any) {
        if (currentActivityRef.current.answer) {
          setCurrentActivity((latestCurrentActivity: ActivityVM) => {
            setTimerCount(0);
            setMyShowTyping(true);
            return (latestCurrentActivity.answer.isResponseReceived = true);
          });
        }
      });

      bot.on(ChatEvent.ON_PROCESS_RESPONSE_ERROR, function (e: any) {
        setMyShowTyping(false);
        let questionPayload = {
          room_id: botFacade.getRoomId(),
          question_id: e.data.activity_id,
        };
        const activityClone = activityListRef.current.find(
          (activity) => activity.id === e.data.activity_id
        );
        if (activityClone) {
          const activity = JSON.parse(JSON.stringify(activityClone));
          activity.question.text = e.data.response_message;
          activity.question.time = new Date();
          activity.question.isError = true;
          delete activity.answer;
          setMyActivityList([...activityListRef.current, activity]);
          setCurrentActivity(activity);
        }
        bot.emit(ChatEvent.ON_PROCESS_RESPONSE_RECEIVE_ERROR, questionPayload);
      });

      bot.on(ChatEvent.ON_END_CONVERSATION, function (e: any) {
        if (e.data != null) {
          // setTimerCount((prevCount: number) => prevCount + 2000);

          // create activity and push it
          const activity: ActivityVM = botFacade.getTransformedActivity(e);
          if (activity.type === ActivityType.STATEMENT) {
            activity.answer = {
              text: ActivityType.END,
            };
            sendResponseStatement(activity);
          }

          // setTimerCount((prevCount: number) => prevCount + 2000);

          setTimeout(() => {
            setMyShowTyping(false);
            setMyActivityList([...activityListRef.current, activity]);
            setCurrentActivity(activity);
          }, timerCountRef?.current + 4000);
        }

        bot.emit(ChatEvent.ON_END_CONVERSATION, {
          room_id: botFacade.getRoomId(),
        });
        bot.disconnect();
        wsApiService.setSocket(null);
      });
    }
  }, []);

  useEffect(() => {
    listenSocketEvents();
  }, [listenSocketEvents]);

  return (
    <div className="flex flex-col w-full h-full overflow-hidden border border-gray-200 shadow-xl lg:flex-row lg:w-10/12 lg:rounded-xl">
      <Helmet>
        <title>{campaignDetails?.campaignName}</title>
      </Helmet>
      <div>
        <div className="lg:hidden">
          <HeaderContainer
            campaignName={campaignDetails?.campaignName}
            campaignStatus={campaignDetails?.status}
          ></HeaderContainer>
        </div>
        <div className="hidden h-full lg:w-96 lg:block">
          <ChatSidebarContainer
            campaignName={campaignDetails?.campaignName}
            campaignStatus={campaignDetails?.status}
          ></ChatSidebarContainer>
        </div>
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="w-full h-full overflow-y-auto">
          <ChatMessageContainer
            activityList={activityList}
            onQuestionSubmit={handleOnQuestionSubmit}
            onQuestionSkipClick={handleQuestionSkipClick}
            showTyping={showTypingRef.current}
          ></ChatMessageContainer>
        </div>
        <div className="w-full">
          <ChatTaskbarContainer
            activity={currentActivity}
            onTaskbarAnswerSubmit={handleOnTaskbarAnswerSubmit}
            onTaskbarAnswerSkip={handleOnTaskbarAnswerSkip}
          ></ChatTaskbarContainer>
        </div>
      </div>
    </div>
  );
};

export default ChatWindowContainer;

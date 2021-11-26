import { Popover } from "antd";
import * as React from "react";
import { useState } from "react";
import { wsApiService } from "../../../core/services/api/WSApi.service";
import KPInitLoader from "../../../ui/widgets/KPInitLoader";
import ChatWindowContainer from "../../containers/ChatWindowContainer";
import { botFacade } from "../../facades/Bot.facade";
import { Campaign } from "../../models/classes/campaign.classes";
import LinkExpiredPage from "../LinkExpiredPage";
import ResponseSubmittedPage from "../ResponseSubmittedPage";
import io from "socket.io-client";
import KapFevicon from "../../../../assets/images/svg/kaptivate_fab_icon.svg";
import CloseChatBotIcon from "../../../../assets/images/svg/close_supportchat.svg";
import ChatIcon from "../../../../assets/images/svg/support_chat.svg";
import "./ChatWindowAsWidgetPage.less";

type ChatWindowAsWidgetPageProps = {
  //
};

const ChatWindowAsWidgetPage: React.FC<any> = () => {

  const [isValidChatRoom, setIsValidChatRoom] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [campaignDetails, setCampaignDetails] = useState({});
  const [responseSubmitted, setResponseSubmitted] = useState(false);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const chatId = "MTE0MzMxOQ==";

  React.useEffect(() => {
    if (isChatbotVisible && JSON.stringify(campaignDetails) === '{}') {
      verifyChatId(chatId);
    }
  }, [isChatbotVisible])

  // React.useEffect(() => {
  //   if (chatId) {
  //     verifyChatId(chatId);
  //   }
  // }, [chatId])

  const verifyChatId = (id: string) => {
    botFacade.verifyChatId(id).then(
      (response: any) => {
        const errors = response?.data?.errors;
        const socketUrl = response?.data?.data?.verifyChatId?.url;
        const roomId = response?.data?.data?.verifyChatId?.room_id;

        const campaignName = response?.data?.data?.verifyChatId?.campaignName;
        const status = response?.data?.data?.verifyChatId?.status;
        const clientMemberId =
          response?.data?.data?.verifyChatId?.client_member_id || "1234";
        const candidateId =
          response?.data?.data?.verifyChatId?.candidate_id || "456";

        if (errors && errors[0] && errors[0].statusCode === 511) {
          setIsLoading(false);
          // setIsValidChatRoom(false);
          setResponseSubmitted(true);
          return;
        }

        if (status === "0") {
          setIsLoading(false);
          setIsValidChatRoom(false);
          return;
        }

        const campaignDetails: Campaign = {
          campaignName: campaignName,
          status: status,
          clientMemberId: clientMemberId,
          candidateId: candidateId,
        };
        botFacade.setCampaignDetails(campaignDetails);
        setCampaignDetails(campaignDetails);

        if (roomId && socketUrl) {
          botFacade.setRoomId(roomId);

          let socket = io.connect(socketUrl, {
            path: "/kaptivate",
            transports: ["websocket"],
          });

          wsApiService.setSocket(socket);
          wsApiService.setSocketURL(socketUrl);
          setIsLoading(false);
          setIsValidChatRoom(true);
        } else {
          setIsLoading(false);
          setIsValidChatRoom(false);
        }
      },
      (error: any) => {
        console.log("Error", error);
        setIsLoading(false);
      }
    );
  };

  const handleBotVisibility = () => {
    setIsChatbotVisible(!isChatbotVisible)
  }

  const chatWindowContent = (
    <>
      <div className="border rounded-lg chat-window-as-widget-page">
        <div className="flex items-center p-3 space-x-1">
          <div className="bg-whitesolid p-2 rounded-full">
            <img src={KapFevicon} alt="icon"></img>
          </div>
          <div className="font-semibold text-lg">
            KapBot
          </div>
        </div>
        <div className="flex items-center justify-center sm:w-96 chat-area">
          {isLoading ? (
            <KPInitLoader></KPInitLoader>
          ) : isValidChatRoom ? (
            <div className="flex justify-center p-0 lg:p-10">
              <ChatWindowContainer
                campaignDetails={campaignDetails}
              ></ChatWindowContainer>
            </div>
          ) : responseSubmitted ? (
            <ResponseSubmittedPage></ResponseSubmittedPage>
          ) : (
            <LinkExpiredPage></LinkExpiredPage>
          )}
        </div>
      </div>
    </>
  )

  return (
    <div className="rounded-lg">
      <Popover
        content={chatWindowContent}
        trigger="click"
        visible={isChatbotVisible}
        // getPopupContainer={()=>document.querySelector(".abc")}
        placement={"topRight"}
        className=""
      >
        <>
          <div className="bottom-6 right-6 absolute">
            <div className="bg-gradient-to-tr from-blue-800 via-blue-400 rounded-full p-2 cursor-pointer" onClick={handleBotVisibility}>
              <img src={isChatbotVisible ? CloseChatBotIcon : ChatIcon} alt="icon" className=""></img>
            </div>
          </div>
        </>
      </Popover>
    </div>
  );
};

export default ChatWindowAsWidgetPage;

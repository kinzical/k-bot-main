import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Popover } from "antd";
import * as React from "react";
import { useState } from "react";
import { wsApiService } from "../../../core/services/api/WSApi.service";
import KPInitLoader from "../../../ui/widgets/KPInitLoader";
import ChatWindowContainer from "../../containers/ChatWindowContainer";
import { botFacade } from "../../facades/Bot.facade";
import { Campaign } from "../../models/classes/campaign.classes";
import LinkExpiredPage from "../LinkExpiredPage";
import ResponseSubmittedPage from "../ResponseSubmittedPage";

type ChatWindowAsWidgetPageProps = {
  //
};

const ChatWindowAsWidgetPage: React.FC<any> = () => {

  const [isValidChatRoom, setIsValidChatRoom] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [campaignDetails, setCampaignDetails] = useState({});
  const [responseSubmitted, setResponseSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  // React.useEffect(() => {
  //   verifyChatId("MTEzNzc3Nw==");
  // }, [])

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
    setVisible(!visible)
  }

  const chatWindowContent = (
    <>
      {/* <div>This is chat bot</div> */}
      <div className="flex items-center justify-center w-96 h-96">
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
    </>
  )

  return (
    <div className="bg-blue-400">
      <Popover
        content={chatWindowContent}
        trigger="click"
        visible={visible}
        // getPopupContainer={()=>document.querySelector(".abc")}
        placement={"topRight"}
        className=""
      >
        <div className="bottom-6 right-6 absolute"
          onClick={handleBotVisibility}><PlusCircleFilled className="text-3xl text-red-400" />
        </div>
      </Popover>
    </div>
  );
};

export default ChatWindowAsWidgetPage;

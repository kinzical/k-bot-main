import * as React from "react";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import io from "socket.io-client";
import { wsApiService } from "../../../core/services/api/WSApi.service";
import KPInitLoader from "../../../ui/widgets/KPInitLoader";
import ChatWindowContainer from "../../containers/ChatWindowContainer";
import { botFacade } from "../../facades/Bot.facade";
import { Campaign } from "../../models/classes/campaign.classes";
import LinkExpiredPage from "../LinkExpiredPage";
import ResponseSubmittedPage from "../ResponseSubmittedPage";

type ChatWindowPageProps = {
  //
};

const ChatWindowPage: React.FC<ChatWindowPageProps> = () => {
  const [isValidChatRoom, setIsValidChatRoom] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [campaignDetails, setCampaignDetails] = useState({});
  const [responseSubmitted, setResponseSubmitted] = useState(false);
  const match: any = useRouteMatch();

  useEffect(() => {
    if (match && match.params && match.params.chatId) {
      verifyChatId(match.params.chatId);
    }
  }, [match]);

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

  return (
    <div className="flex items-center justify-center w-full h-screen">
      {isLoading ? (
        <KPInitLoader></KPInitLoader>
      ) : isValidChatRoom ? (
        <div className="flex justify-center w-full h-full p-0 lg:p-10">
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
  );
};

export default ChatWindowPage;

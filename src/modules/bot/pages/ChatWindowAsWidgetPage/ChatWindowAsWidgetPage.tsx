import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Popover } from "antd";
import * as React from "react";
import { useState } from "react";
import KPInitLoader from "../../../ui/widgets/KPInitLoader";
import ChatWindowContainer from "../../containers/ChatWindowContainer";
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

  const chatWindowContent = (
    <>
      <div>This is chat bot</div>
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
    </>
  )

  return (
    <div className="h-screen w-screen relative">
      <Popover
        content={chatWindowContent}
        trigger="click"
        visible={visible}
      >
        <div className="bottom-10 right-10 absolute z-10" 
        onClick={() => {
          setVisible(!visible)
        }}><PlusCircleFilled /></div>
      </Popover>
    </div>
  );
};

export default ChatWindowAsWidgetPage;

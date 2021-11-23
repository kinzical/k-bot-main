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
    <div className="">
      <Popover
        content={chatWindowContent}
        trigger="click"
        visible={visible}
        // getPopupContainer={()=>document.querySelector(".abc")}
        placement={"topRight"}
        className=""
      >
      <div className="bottom-6 right-6 absolute"
          onClick={() => {
            setVisible(!visible)
          }}><PlusCircleFilled/>
        </div>
      </Popover>
    </div>
  );
};

export default ChatWindowAsWidgetPage;

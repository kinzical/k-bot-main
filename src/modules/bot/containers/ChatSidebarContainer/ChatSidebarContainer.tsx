import * as React from "react";
import ChatSidebar from "../../presentations/ChatSidebar";

type ChatSidebarContainerProps = {
  campaignName: string;
  campaignStatus: string;
};

const ChatSidebarContainer: React.FC<any> = (
  props: ChatSidebarContainerProps
) => {
  const { campaignName, campaignStatus } = props;

  return (
    <div className="w-full h-full">
      <ChatSidebar
        campaignName={campaignName}
        campaignStatus={campaignStatus}
      ></ChatSidebar>
    </div>
  );
};

export default ChatSidebarContainer;

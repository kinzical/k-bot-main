import * as React from "react";
import KPImage from "../../../ui/widgets/KPImage";
import BotBackground from "./../../../../assets/images/jpg/bot_background.jpg";
import KaptivateLogo from "./../../../../assets/images/svg/kaptivate_header_logo.svg";

type ChatSidebarProps = {
  campaignName: string;
  campaignStatus: string;
};

const ChatSidebar: React.FC<any> = (props: ChatSidebarProps) => {
  const { campaignName, campaignStatus } = props;

  return (
    <div
      className="flex flex-col justify-between w-full h-full bg-white bg-repeat "
      style={{ backgroundImage: "url(" + BotBackground + ")" }}
    >
      <div className="flex flex-col items-center justify-center p-4 h-96">
        {campaignName && (
          <div className="mb-4 font-semibold text-center sm:text-xl">
            {campaignName}
          </div>
        )}
        {campaignStatus && (
          <div className="flex items-center justify-center">
            <div className="bg-green-500 w-3 h-3 rounded-full bg-opacity-90"></div>{" "}
            <div className="ml-2 font-semibold text-gray-500 text-base">
              Online
            </div>
          </div>
        )}
        {/*  {campaignStatus && (
          <span className="inline-block px-2 py-1 font-semibold uppercase border rounded-lg border-turquoisesea text-turquoisesea bg-wintersday ">
               {campaignStatus === "true" ? 'ACTIVE' : null}
          </span>
        )} */}
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="font-semibold text-gray-700">powered by:</div>
        <div>
          <KPImage className="w-32 h-32" src={KaptivateLogo}></KPImage>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;

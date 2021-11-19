import { DownloadOutlined, PaperClipOutlined } from "@ant-design/icons";
import * as React from "react";
import KPTimeTemplate from "../../../../ui/templates/KPTimeTemplate";
import { ActivityVM } from "../../../models/classes/activitity.classes";
import { MediaType } from "../../../models/enums/bot.enums";

type MediaUploadAnswerProps = {
  data: ActivityVM;
};

const MediaUploadAnswer: React.FC<MediaUploadAnswerProps> = (
  props: MediaUploadAnswerProps
) => {
  const { data } = props;
  const { answer } = data;
  return (
    <div className="flex justify-end w-full ">
      <div className="inline-block p-4 text-right text-white bg-international max-w-3/4 rounded-tl-3xl rounded-tr-xl rounded-br-3xl rounded-bl-3xl">
        <div className="mb-1 text-gray-300 text-tiny -mt-2">
          <KPTimeTemplate utc={false} time={answer.time}></KPTimeTemplate>
        </div>
        {answer.type !== MediaType.AUDIO &&
          answer.type !== MediaType.VIDEO &&
          answer.type !== MediaType.IMAGE && (
            <a
              href={answer.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center text-white "
            >
              <span className="mr-1 -mt-2">
                <PaperClipOutlined />
              </span>
              <span>{answer?.file?.name}</span>
              <span className="ml-2 -mt-1">
                <DownloadOutlined />
              </span>
            </a>
          )}
        {answer.type === MediaType.AUDIO && (
          <audio src={answer.url} controls className="w-72"></audio>
        )}
        {answer.type === MediaType.VIDEO && (
          <video src={answer.url} controls className=" w-72"></video>
        )}
        {answer.type === MediaType.IMAGE && (
          <img src={answer.url} alt="" className="h-72 w-56"></img>
        )}
      </div>
    </div>
  );
};

export default MediaUploadAnswer;

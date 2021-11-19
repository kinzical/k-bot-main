import * as React from "react";
import { useState } from "react";
import KPTimeTemplate from "../../../../ui/templates/KPTimeTemplate";
import KPSkipTextButton from "../../../../ui/widgets/buttons/KPSkipTextButton";
import KPSubmitButton from "../../../../ui/widgets/buttons/KPSubmitButton";
import KPMediaQuestion from "../../../../ui/widgets/KPMediaQuestion";
import KPMediaUpload from "../../../../ui/widgets/KPMediaUpload";
import KPRichTextEditor from "../../../../ui/widgets/KPRichTextEditor";
import { botFacade } from "../../../facades/Bot.facade";
import { ActivityVM } from "../../../models/classes/activitity.classes";
import {
  AnswerVM,
  MediaUploadAnswerVM,
} from "../../../models/classes/answer.classes";
import { BotConstants } from "../../../models/constants/bot.constants";

type MediaUploadQuestionProps = {
  data: ActivityVM;
  onSubmit: (data: any) => void;
  onQuestionSkipClick: (data: any) => void;
};

const MediaUploadQuestion: React.FC<MediaUploadQuestionProps> = (
  props: MediaUploadQuestionProps
) => {
  const { data, onSubmit, onQuestionSkipClick } = props;
  const question = data.question;
  const [file, setFile]: any = React.useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSkipQuestion = () => {
    onQuestionSkipClick(data);
  };

  const handleFileUpload = (file: File) => {
    setFile(file);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleOnUploadClick = () => {
    setIsUploading(true);
    const clientMemberId = botFacade.getCampaignDetails().clientMemberId;
    const candidateId = botFacade.getCampaignDetails().candidateId;
    const fileType = question.documentType === BotConstants.COMPARISON_DOC_TYPE ? BotConstants.DOC_TYPE : "";
    botFacade.uploadFile(file, clientMemberId, candidateId, fileType).then(
      (response: any) => {
        setIsUploading(false);
        if (response) {
          let answer: AnswerVM = {
            time: new Date().toString(),
          };
          let mediaUploadAnswer: MediaUploadAnswerVM = {
            ...answer,
            file: file,
            url: response.data.fileUrl,
            type: response.data.fileType
          };
          data.answer = mediaUploadAnswer;
          onSubmit(data);
        }
      },
      (error: any) => {
        setIsUploading(false);
      }
    );
  };

  return (
    <div className="w-full">
      <div
        className={
          "inline-block p-4 text-left max-w-3/4 rounded-tl-xl rounded-tr-3xl rounded-br-3xl rounded-bl-3xl " +
          (question.isError ? "bg-red-200" : "bg-white")
        }
      >
        <div className="mb-1 text-gray-500 text-tiny">
          <KPTimeTemplate time={question.time}></KPTimeTemplate>
        </div>
        <KPRichTextEditor value={question.text} />
        {question.allowMedia && !question.isError ? (
          <KPMediaQuestion
            mediaType={question.mediaType}
            mediaUrl={question.mediaSourceUrl}
          />
        ) : null}
      </div>

      {!data?.answer &&
        !data?.answer?.isResponseReceived &&
        data.question.isSkipped === false && (
          <div className="flex flex-col items-end justify-end w-full my-2 ">
            <div className="inline-block p-4 my-2 text-right max-w-3/4 bg-international rounded-tl-3xl rounded-tr-xl rounded-br-3xl rounded-bl-3xl">
              <KPMediaUpload
                file={file}
                onFileUpload={handleFileUpload}
                allowedMediaFormat={question.allowedFormat}
                onRemove={handleRemoveFile}
              ></KPMediaUpload>
            </div>
            <div className="flex justify-end w-full mb-0 mr-1">
              <KPSubmitButton
                onClick={handleOnUploadClick}
                label="Upload"
                disabled={isUploading || file === null}
              ></KPSubmitButton>
              {question.allowSkip && (
                <KPSkipTextButton
                  onClick={handleSkipQuestion}
                  disabled={isUploading}
                ></KPSkipTextButton>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default MediaUploadQuestion;

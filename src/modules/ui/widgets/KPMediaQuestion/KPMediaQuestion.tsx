import * as React from "react";
import { MediaType } from "../../../bot/models/enums/bot.enums";
import KPImage from "../KPImage";
import KPAudioPlayer from "../KPAudioPlayer";
import KPVideoPlayer from "../KPVideoPlayer";
type KPMediaQuestionProps = {
  mediaType: string;
  mediaUrl: string;
};

const KPMediaQuestion: React.FC<KPMediaQuestionProps> = (
  props: KPMediaQuestionProps
) => {
  const { mediaType, mediaUrl } = props;

  const getMediaQuestionType = (mediaType: string) => {
    return (
      <>
        {mediaType === MediaType.IMAGE ? <KPImage src={mediaUrl} preview={true} className="w-full h-48 pt-2 rounded-xl"/>: null}
        {mediaType === MediaType.AUDIO ? (
          <KPAudioPlayer src={mediaUrl} className="mt-2" />
        ) : null}
        {mediaType === MediaType.VIDEO ? (
          <KPVideoPlayer src={mediaUrl} className="mt-2"/>
        ) : null}
      </>
    );
  };

  return <>{getMediaQuestionType(mediaType)}</>;
};

export default KPMediaQuestion;

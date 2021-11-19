import * as React from "react";
import KPButton from "../buttons/KPButton";
import KPAudioMediaUpload from "../KPAudioMediaUpload";
import KPFileMediaUpload from "../KPFileMediaUpload";
import KPVideoMediaUpload from "../KPVideoMediaUpload";
import ChatAudio from "../../../../assets/images/svg/chat_audio.svg";
import ChatVideo from "../../../../assets/images/svg/chat_video.svg";
import { Tooltip } from "antd";
import {
  PlayerButtonStatus,
  SelectedButton,
  UploadFormat,
} from "../../../bot/models/enums/bot.enums";

type KPMediaUploadProps = {
  allowedMediaFormat?: string;
  onFileUpload: (file: File) => void;
  onRemove: () => void;
  file: File;
};

const KPMediaUpload: React.FC<KPMediaUploadProps> = (
  props: KPMediaUploadProps
) => {
  const { allowedMediaFormat, onFileUpload, file, onRemove } = props;
  const [selectedButton, setSelectedButton] = React.useState(
    SelectedButton.AUDIOVIDEO
  );
  const [buttonStatus, setButtonStatus] = React.useState(
    PlayerButtonStatus.START
  );

  const handleBackButton = () => {
    setSelectedButton(SelectedButton.AUDIOVIDEO);
    onRemove();
  };

  return (
    <div className="flex justify-between items-cente">
      {selectedButton === SelectedButton.AUDIOVIDEO && (
        <div className="flex justify-between items-cente">
          {!file && (
            <div>
              {allowedMediaFormat === UploadFormat.AUDIO ||
              allowedMediaFormat === UploadFormat.ANY ? (
                <Tooltip title="Audio Record">
                  <KPButton
                    className="mr-0.5 rounded-lg"
                    onClick={() => {
                      setSelectedButton(SelectedButton.AUDIO);
                      setButtonStatus(PlayerButtonStatus.START);
                    }}
                    icon={
                      <div className="flex justify-center items-center">
                        <img src={ChatAudio} alt="icon"></img>
                      </div>
                    }
                  >
                    {/* Audio Record */}
                  </KPButton>
                </Tooltip>
              ) : null}
              {allowedMediaFormat === UploadFormat.VIDEO ||
              allowedMediaFormat === UploadFormat.ANY ? (
                <Tooltip title="Video Record">
                  <KPButton
                    className="ml-0.5 rounded-lg"
                    onClick={() => {
                      setSelectedButton(SelectedButton.VIDEO);
                      setButtonStatus(PlayerButtonStatus.START);
                    }}
                    icon={
                      <div className="flex justify-center items-center">
                        <img src={ChatVideo} alt="icon"></img>
                      </div>
                    }
                  >
                    {/* Video Record */}
                  </KPButton>
                </Tooltip>
              ) : null}
            </div>
          )}

          <KPFileMediaUpload
            allowedMediaFormat={allowedMediaFormat}
            onFileUpload={onFileUpload}
            onRemove={onRemove}
            file={file}
            setSelectedButton={setSelectedButton}
            selectedButton={selectedButton}
          ></KPFileMediaUpload>
        </div>
      )}
      {selectedButton === SelectedButton.AUDIO && (
        <KPAudioMediaUpload
          onFileUpload={onFileUpload}
          onRemove={onRemove}
          handleBackButton={handleBackButton}
          buttonStatus={buttonStatus}
          setButtonStatus={setButtonStatus}
        />
      )}
      {selectedButton === SelectedButton.VIDEO && (
        <KPVideoMediaUpload
          onFileUpload={onFileUpload}
          onRemove={onRemove}
          handleBackButton={handleBackButton}
          buttonStatus={buttonStatus}
          setButtonStatus={setButtonStatus}
        />
      )}
    </div>
  );
};

export default KPMediaUpload;

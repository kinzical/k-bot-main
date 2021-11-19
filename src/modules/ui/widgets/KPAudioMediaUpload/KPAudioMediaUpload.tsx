import { message, Tooltip } from "antd";
import * as React from "react";
import KPButton from "../buttons/KPButton";
import KPSelect from "../KPSelect";
import { useReactMediaRecorder } from "react-media-recorder";
import {
  CaretRightOutlined,
  RedoOutlined,
  RollbackOutlined,
  SettingOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  FileName,
  FileType,
  MediaDevice,
  PlayerButtonStatus,
} from "../../../bot/models/enums/bot.enums";
import StartRecord from "../../../../assets/images/svg/start_record.svg"
import StopRecording from "../../../../assets/images/svg/stop_record.svg"
import ReRecord from "../../../../assets/images/svg/re_record.svg"

type KPAudioMediaUploadProps = {
  handleBackButton: () => void;
  buttonStatus: any;
  setButtonStatus: any;
  onFileUpload: (file: File) => void;
  onRemove: () => void;
};

const KPAudioMediaUpload: React.FC<KPAudioMediaUploadProps> = (
  props: KPAudioMediaUploadProps
) => {
  const {
    handleBackButton,
    buttonStatus,
    setButtonStatus,
    onFileUpload,
    onRemove,
  } = props;
  const [audioDevicesList, setAudioDevicesList] = React.useState([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = React.useState();
  const [showDeviceSelection, setShowDeviceSelection] = React.useState(true);
  const [shouldStartTimer, setShouldStartTimer] = React.useState<any>(false);
  const [audioTimeInterval, setAudioTimeInterval] =
    React.useState<NodeJS.Timeout>();
  const [timeString, setTimeString] = React.useState("00:00");
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    { audio: true }
  );

  React.useEffect(() => {
    if (mediaBlobUrl != null) {
      fetch(mediaBlobUrl)
        .then((res) => res.blob())
        .then((blob) => {
          let metadata = {
            type: FileType.AUDIO,
          };
          let file = new File([blob], FileName.AUDIOFILENAME, metadata);
          onFileUpload(file);
        });
    }
  }, [mediaBlobUrl]);

  React.useEffect(() => {
    try {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then((result: any) => {
          navigator.mediaDevices.enumerateDevices().then((res) => {
            const arr = res.filter(
              (x) => x.kind === MediaDevice.AUDIOINPUT
            ) as any;
            setAudioDevicesList(arr);
          });
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  React.useEffect(() => {
    if (shouldStartTimer) {
      let startTime = 0;
      setAudioTimeInterval(
        setInterval(() => {
          startTime++;
          let second = ("0" + (startTime % 60)).slice(-2);
          let minute = (
            "0" +
            (((startTime - (startTime % 60)) / 60) % 60)
          ).slice(-2);

          setTimeString(minute + ":" + second);
        }, 1000)
      );
    } else {
      if (audioTimeInterval === undefined) {
        return;
      }
      clearInterval(audioTimeInterval);
    }
  }, [shouldStartTimer]);

  React.useEffect(() => {
    if (timeString == "02:01") {
      setTimeString("02:00");
      message.warning("2 minutes time has been exceeded");
      stopAudioRecording();
    }
  }, [timeString]);

  const handleChangeAudioDevice = (event: any) => {
    setSelectedAudioDevice(event);
    setShowDeviceSelection(false);
  };

  const resetDeviceSelection = () => {
    setShowDeviceSelection(true);
    setButtonStatus(PlayerButtonStatus.START);
    setTimeString("00:00");
    setShouldStartTimer(false);
    onRemove();
  };

  const startAudioRecording = () => {
    setShouldStartTimer(true);
    startRecording();
    setButtonStatus(PlayerButtonStatus.STOP);
  };

  const stopAudioRecording = () => {
    stopRecording();
    setShouldStartTimer(false);
    setButtonStatus(PlayerButtonStatus.RE_RECORD);
  };

  const reRecordAudio = () => {
    setTimeString("00:00");
    setButtonStatus(PlayerButtonStatus.START);
    onRemove();
  };

  return (
    <div>
      {showDeviceSelection ? (
        <div>
          <div className="flex flex-row">
            <p className="mr-4 text-left text-white">Select Audio Device:</p>
            <KPSelect
              style={{
                width: "185px",
              }}
              placeholder="Select device"
              options={audioDevicesList?.map((audioDevice: any) => {
                return {
                  label: audioDevice.label,
                  value: audioDevice.label,
                };
              })}
              value={selectedAudioDevice}
              handleSelect={handleChangeAudioDevice}
              handleChange={handleChangeAudioDevice}
            ></KPSelect>
          </div>
          <Tooltip title="Reset Answer Type" placement="bottom">
            <KPButton
              onClick={handleBackButton}
              icon={<RollbackOutlined />}
              className="bg-transparent border-none text-white"
            ></KPButton>
          </Tooltip>
        </div>
      ) : null}
      {!showDeviceSelection ? (
        <div>
          <p className="text-white text-xs text-left">
            Recording can be upto 2 minutes
          </p>
          <div className="flex flex-row justify-between">
            <p className="text-left text-white">Recording</p>
            <div className="">
              <Tooltip title="Reset Audio Device" placement="top">
                <KPButton
                  onClick={resetDeviceSelection}
                  icon={<SettingOutlined />}
                  className="bg-transparent border-none text-white"
                ></KPButton>
              </Tooltip>
              <Tooltip title="Reset Answer Type" placement="top">
                <KPButton
                  onClick={handleBackButton}
                  icon={<RollbackOutlined />}
                  className="bg-transparent border-none text-white"
                ></KPButton>
              </Tooltip>
            </div>
          </div>
          <div className="">
            {buttonStatus !== PlayerButtonStatus.RE_RECORD && (
              <div className="border-2 w-72 h-20 rounded-lg">
                <div className="text-white m-1">{timeString}</div>
              </div>
            )}
            {buttonStatus === PlayerButtonStatus.START && (
              <Tooltip title="Record" placement="top">
                <KPButton
                  className="bg-transparent border-none text-white "
                  onClick={startAudioRecording}
                  // icon={<CaretRightOutlined />}
                  // <img src={StartRecord} className=""></img>
                  icon={
                    <div className="">
                      <img src={StartRecord} alt="icon"></img>
                    </div>
                  }
                ></KPButton>
              </Tooltip>
            )}
            {buttonStatus === PlayerButtonStatus.STOP && (
              <Tooltip title="Stop" placement="top">
                <KPButton
                  className="bg-transparent border-none text-white "
                  onClick={stopAudioRecording}
                  // icon={<StopOutlined />}
                  icon={
                    <div className="">
                      <img src={StopRecording} alt="icon"></img>
                    </div>
                  }
                ></KPButton>
              </Tooltip>
            )}
            {buttonStatus === PlayerButtonStatus.RE_RECORD && (
              <div className="">
                <audio src={mediaBlobUrl || ""} controls></audio>
                <Tooltip title="Re-Record" placement="top">
                  <KPButton
                    className="bg-international border-none text-white "
                    onClick={reRecordAudio}
                    // icon={<RedoOutlined />}
                    icon={
                      <div className="">
                        <img src={ReRecord} alt="icon"></img>
                      </div>
                    }
                  ></KPButton>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default KPAudioMediaUpload;

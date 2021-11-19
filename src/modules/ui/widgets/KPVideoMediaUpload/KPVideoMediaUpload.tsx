import { message, Tooltip } from "antd";
import * as React from "react";
import KPButton from "../buttons/KPButton";
import KPSelect from "../KPSelect";
import { useReactMediaRecorder } from "react-media-recorder";
import Webcam from "react-webcam";
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

type KPVideoMediaUploadProps = {
  handleBackButton: () => void;
  buttonStatus: any;
  setButtonStatus: any;
  onFileUpload: (file: File) => void;
  onRemove: () => void;
};

const KPVideoMediaUpload: React.FC<KPVideoMediaUploadProps> = (
  props: KPVideoMediaUploadProps
) => {
  const {
    handleBackButton,
    buttonStatus,
    setButtonStatus,
    onFileUpload,
    onRemove,
  } = props;
  const [videoDeviceList, setVideoDeviceList] = React.useState([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = React.useState();
  const [audioDeviceList, setAudioDeviceList] = React.useState([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = React.useState();
  const [showDeviceSelection, setShowDeviceSelection] = React.useState(true);
  const [shouldStartTimer, setShouldStartTimer] = React.useState<any>(false);
  const [videoTimeInterval, setVideoTimeinterval] =
    React.useState<NodeJS.Timeout>();
  const [timeString, setTimeString] = React.useState("00:00");
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    { video: true }
  );

  React.useEffect(() => {
    if (mediaBlobUrl != null) {
      fetch(mediaBlobUrl)
        .then((res) => res.blob())
        .then((blob) => {
          let metadata = {
            type: FileType.VIDEO,
          };
          let file = new File([blob], FileName.VIDEOFILENAME, metadata);
          onFileUpload(file);
        });
    }
  }, [mediaBlobUrl]);

  React.useEffect(() => {
    try {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true,
        })
        .then((result: any) => {
          navigator.mediaDevices.enumerateDevices().then((res) => {
            const arr = res.filter(
              (x) => x.kind === MediaDevice.VIDEOINPUT
            ) as any;
            setVideoDeviceList(arr);
          });
          navigator.mediaDevices.enumerateDevices().then((res) => {
            const arr = res.filter(
              (x) => x.kind === MediaDevice.AUDIOINPUT
            ) as any;
            setAudioDeviceList(arr);
          });
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  React.useEffect(() => {
    if (shouldStartTimer) {
      let startTime = 0;
      setVideoTimeinterval(
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
      if (videoTimeInterval === undefined) {
        return;
      }
      clearInterval(videoTimeInterval);
    }
  }, [shouldStartTimer]);

  React.useEffect(() => {
    if (timeString == "02:01") {
      setTimeString("02:00");
      message.warning("2 minutes time has been exceeded");
      customStopRecording();
    }
  }, [timeString]);

  const handleChangeVideoDevice = (event: any) => {
    setSelectedVideoDevice(event);
    localStorage.setItem("selectedVideoDevice", event);
    if (selectedAudioDevice !== undefined) {
      setShowDeviceSelection(false);
    }
  };

  const handleChangeAudioDevice = (event: any) => {
    setSelectedAudioDevice(event);
    localStorage.setItem("selectedAudioDevice", event);
    if (selectedVideoDevice !== undefined) {
      setShowDeviceSelection(false);
    }
  };

  const resetDeviceSelection = () => {
    setShowDeviceSelection(true);
    setButtonStatus(PlayerButtonStatus.START);
    setTimeString("00:00");
    setShouldStartTimer(false);
    onRemove();
  };

  const customStartRecording = () => {
    setShouldStartTimer(true);
    startRecording();
    setButtonStatus(PlayerButtonStatus.STOP);
  };

  const customStopRecording = () => {
    stopRecording();
    setShouldStartTimer(false);
    setButtonStatus(PlayerButtonStatus.RE_RECORD);
  };

  const customReRecording = () => {
    setTimeString("00:00");
    setButtonStatus(PlayerButtonStatus.START);
    onRemove();
  };

  return (
    <div>
      {showDeviceSelection ? (
        <div>
          <div className="flex flex-row mb-4">
            <p className="text-left mr-4 text-white">Select Video Device :</p>
            <KPSelect
              style={{
                width: "185px",
              }}
              placeholder="Select Video Device"
              options={videoDeviceList.map((videoDevice: any) => ({
                label: videoDevice.label,
                value: videoDevice.label,
              }))}
              value={selectedVideoDevice}
              handleSelect={handleChangeVideoDevice}
              handleChange={handleChangeVideoDevice}
            ></KPSelect>
          </div>
          <div className="flex flex-row">
            <p className="mr-4 text-left text-white">Select Audio Device :</p>
            <KPSelect
              style={{
                width: "185px",
              }}
              placeholder="Select Audio Device"
              options={audioDeviceList?.map((audioDevice: any) => {
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
              className="bg-international border-none text-white"
            ></KPButton>
          </Tooltip>
        </div>
      ) : null}
      {!showDeviceSelection ? (
        <div>
          <div className="text-white text-xs text-left">
            Recording can be upto 2 minutes
          </div>
          <div className="flex items-center justify-between">
            <div className="text-white">Recording</div>
            <div className="">
              <Tooltip title="Reset Video Devices" placement="top">
                <KPButton
                  onClick={resetDeviceSelection}
                  icon={<SettingOutlined />}
                  className="mr-1 bg-transparent border-none text-white"
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
              <div>
                <div className="text-white">{timeString}</div>
                <Webcam audio={false} className="w-72 rounded-lg" />
              </div>
            )}
            {buttonStatus === PlayerButtonStatus.START && (
              <Tooltip title="Record" placement="top">
                <KPButton
                  className=" bg-transparent border-none text-white "
                  onClick={customStartRecording}
                  // icon={<CaretRightOutlined />}
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
                  onClick={customStopRecording}
                  // icon={<StopOutlined />}
                  icon={
                    <div className="">
                      <img src={StopRecording} alt="icon"></img>
                    </div>
                  }
                ></KPButton>
              </Tooltip>
            )}
            <div>
              {buttonStatus === PlayerButtonStatus.RE_RECORD && (
                <div>
                  <div className="text-white">{timeString}</div>
                  <div className="">
                    <div className="">
                      <video
                        className="w-72 rounded-lg"
                        src={mediaBlobUrl || ""}
                        controls
                      />
                      <Tooltip title="Re-Record" placement="top">
                        <KPButton
                          className="bg-transparent border-none text-white "
                          // icon={<RedoOutlined />}
                          icon={
                            <div className="">
                              <img src={ReRecord} alt="icon"></img>
                            </div>
                          }
                          onClick={customReRecording}
                        ></KPButton>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default KPVideoMediaUpload;

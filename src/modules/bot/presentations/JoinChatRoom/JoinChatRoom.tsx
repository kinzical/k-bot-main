import * as React from "react";
import { Input } from "antd";
import KPImage from "../../../ui/widgets/KPImage";
import KaptivateLogo from "./../../../../assets/images/svg/kaptivate_header_logo.svg";
import KPButton from "../../../ui/widgets/buttons/KPButton";

type JoinChatRoomProps = {
  value: string;
  onChange: (value: string) => void;
  onHandleJoinRoom: () => void;
};

const JoinChatRoom: React.FC<JoinChatRoomProps> = (
  props: JoinChatRoomProps
) => {
  const { value, onChange, onHandleJoinRoom } = props;

  const handleOnChange = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex items-center justify-center w-full mb-10">
        <KPImage height={100} width={200} src={KaptivateLogo}></KPImage>
      </div>
      <div className="flex flex-col items-center w-full h-1/6">
        <div className="flex items-center justify-center w-full">
          <Input
            className="h-12 rounded-3xl max-w-2xl"
            placeholder="Chat room id e.g. ODgwMDI="
            value={value}
            onChange={handleOnChange}
            onPressEnter={onHandleJoinRoom}
          ></Input>
        </div>
        <div className="flex items-center justify-center w-full mt-6">
          <KPButton
            type="primary"
            className="flex items-center justify-center rounded-full p-2 h-10 w-32"
            onClick={onHandleJoinRoom}
          >
            Join Room
          </KPButton>
          {/* <div className="rounded-full py-3 px-6 bg-purple-600 hover:bg-purple-500 text-white cursor-pointer" onClick={onHandleJoinRoom}>Join Room</div> */}
        </div>
      </div>
    </div>
  );
};

export default JoinChatRoom;

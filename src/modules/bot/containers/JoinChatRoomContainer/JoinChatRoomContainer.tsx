import { message } from "antd";
import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { botFacade } from "../../facades/Bot.facade";
import JoinChatRoom from "../../presentations/JoinChatRoom";

type JoinChatRoomContainerProps = {
  //
};

const JoinChatRoomContainer: React.FC<JoinChatRoomContainerProps> = () => {
  const [roomId, setRoomId] = useState("");
  const history = useHistory();

  const handleOnChange = (value: string) => {
    setRoomId(value);
  };

  const handleJoinRoom = () => {
    if (roomId !== "") {
      botFacade.verifyChatId(roomId).then(
        (response: any) => {
          const socketUrl = response?.data?.data?.verifyChatId?.url;
          const room_id = response?.data?.data?.verifyChatId?.room_id;
          const errors = response?.data?.errors;
          const status = response?.data?.data?.verifyChatId?.status;

          if (errors && errors[0] && errors[0].statusCode === 511) {
            message.error("Your response is already submitted.");
            return;
          }

          if (status === "0") {
            message.error("Sorry! provided room id is expired");
            return;
          }

          if (room_id && socketUrl) {
            // room id is valid
            history.replace("/bot/" + roomId);
          } else {
            // room id not valid
            message.error("Provided room id is not valid");
          }
        },
        (error: any) => {}
      );
    } else {
      message.error("Please provide room id.");
    }
  };
  return (
    <div className="w-screen h-screen">
      <JoinChatRoom
        value={roomId}
        onChange={handleOnChange}
        onHandleJoinRoom={handleJoinRoom}
      ></JoinChatRoom>
    </div>
  );
};

export default JoinChatRoomContainer;

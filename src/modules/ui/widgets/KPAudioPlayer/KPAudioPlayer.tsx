import * as React from "react";
import ReactAudioPlayer from "react-audio-player";

// type KPAudioPlayerProps = {
//   src: string;
// };

const KPAudioPlayer: React.FC<any> = (props: any) => {
  return <ReactAudioPlayer {...props} controls />;
};

export default KPAudioPlayer;

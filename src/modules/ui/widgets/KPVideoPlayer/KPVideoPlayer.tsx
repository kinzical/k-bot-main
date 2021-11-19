import * as React from "react";
import ReactPlayer from "react-player";

type KPVideoPlayerProps = {
  src: string;
};

const KPVideoPlayer: React.FC<any> = ({ src }: KPVideoPlayerProps) => {
  return <ReactPlayer url={src} controls width="100%" height="100%" />;
};

export default KPVideoPlayer;

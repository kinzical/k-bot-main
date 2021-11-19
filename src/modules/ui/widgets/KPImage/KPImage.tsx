import { Image } from "antd";
import * as React from "react";
import "./KPImage.less";

const KPImage: React.FC<any> = (props: any) => {
  return  <Image {...props} preview={props.preview ? true : false}></Image>;
};

export default KPImage;

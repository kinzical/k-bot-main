import { CheckCircleOutlined } from "@ant-design/icons";
import * as React from "react";
import KPImage from "../../../ui/widgets/KPImage";
import KaptivateLogo from "./../../../../assets/images/svg/kaptivate_header_logo.svg";

type ResponseSubmittedPageProps = {};

const ResponseSubmittedPage: React.FC<ResponseSubmittedPageProps> = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex items-center justify-center w-full h-1/4">
          <KPImage height={100} width={200} src={KaptivateLogo}></KPImage>
        </div>
        <div className="flex items-center justify-center w-full h-1/6">
          <div className="flex flex-col items-center justify-center">
            <label className="pb-4 text-xl font-semibold">Thank You!</label>
            <label className="flex items-center text-2xl font-normal">
            <CheckCircleOutlined className="mr-2 -mt-1 text-3xl text-green-400" />Your response is already submitted!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseSubmittedPage;

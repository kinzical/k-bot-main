import * as React from "react";
import Brand from "../../../core/presentations/Brand";
import KPImage from "../../../ui/widgets/KPImage";
import KaptivateLogo from "./../../../../assets/images/svg/kaptivate_header_logo.svg";

type LinkExpiredPageProps = {
  //
};

const LinkExpiredPage: React.FC<LinkExpiredPageProps> = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex items-center justify-center w-full h-1/4">
          <KPImage height={150} width={300} src={KaptivateLogo}></KPImage>
        </div>
        <div className="flex items-center justify-center w-full h-1/6">
          <div className="flex flex-col items-center justify-center">
            <label className="pb-4 text-lg font-semibold">
              Sorry! the link is expired
            </label>
            <label className="font-normal">
              We will get in touch with you for more opportunities in future.
            </label>
            <label className="font-normal">We wish you all the best.</label>
          </div>
        </div>
        <div className="flex justify-center w-full h-auto">
          <Brand image={KaptivateLogo}></Brand>
        </div>
      </div>
    </div>
  );
};

export default LinkExpiredPage;

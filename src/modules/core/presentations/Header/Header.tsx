import * as React from "react";
import Brand from "../Brand";
import KaptivateLogo from "./../../../../assets/images/svg/kaptivate_header_logo.svg";

type HeaderProps = {
  campaignName: string;
  campaignStatus: string;
};

const Header: React.FC<any> = (props: HeaderProps) => {
  const { campaignName, campaignStatus } = props;

  return (
    <div className="sticky top-0 flex justify-center w-full">
      <div className="flex items-center justify-between w-full h-16 px-3 bg-white">
        <div>
          <Brand image={KaptivateLogo}></Brand>
        </div>
        <div>
          {/* <div className="flex items-center justify-end">
            {campaignStatus && (
              <span className="inline-block px-2 py-1 font-semibold uppercase border rounded-lg text-tiny border-turquoisesea text-turquoisesea bg-wintersday ">
                {campaignStatus === "true" ? 'ACTIVE' : null}
              </span>
            )}
          </div> */}
          {campaignStatus && (
            <div className="flex items-center justify-end">
              <div className="bg-green-500 w-2 h-2 rounded-full bg-opacity-90"></div>{" "}
              <div className="ml-1 font-semibold text-gray-500 text-xs">
                Online
              </div>
            </div>
          )}
          {campaignName && (
            <div className="mt-0.5 sm:text-lg font-semibold">
              {campaignName}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

import * as React from "react";
import Header from "../../presentations/Header";

type HeaderContainerProps = {
  campaignName: string;
  campaignStatus: string;
};

const HeaderContainer: React.FC<any> = (props: HeaderContainerProps) => {

  const { campaignName, campaignStatus } = props;

  return <Header campaignName={campaignName} campaignStatus={campaignStatus}></Header>;
};

export default HeaderContainer;

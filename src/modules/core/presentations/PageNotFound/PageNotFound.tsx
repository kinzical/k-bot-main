import * as React from "react";
import PageNotFoundImage from "../../../../assets/images/svg/404.svg";

const PageNotFound: React.FC<any> = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-5">
      <img src={PageNotFoundImage} alt="" />
      <span className="flex flex-col text-xl text-center">
        <h1>Sorry!</h1>
        <p>Page not found</p>
      </span>
    </div>
  );
};

export default PageNotFound;

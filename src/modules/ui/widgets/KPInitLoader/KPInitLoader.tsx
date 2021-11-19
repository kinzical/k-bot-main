import * as React from "react";

const KPInitLoader: React.FC<any> = () => {
  return (
    <div className="flex items-center justify-center w-screen h-full bg-gray-100 ">
      <span className="absolute inline-flex bg-blue-400 rounded-full opacity-50 animate-ping-new delay-1 h-7 w-7"></span>
      <span className="relative inline-flex w-5 h-5 bg-blue-500 rounded-full"></span>
    </div>
  );
};

export default KPInitLoader;

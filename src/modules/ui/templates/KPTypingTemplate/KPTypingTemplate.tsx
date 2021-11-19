import * as React from "react";

type KPTypingTemplateProps = {
  //
};

const KPTypingTemplate: React.FC<KPTypingTemplateProps> = () => {
  return (
    <div>
      <div className="m-4">
        <div
          className={
            "inline-block p-4 text-left max-w-3/4 w-24 rounded-tl-xl rounded-tr-3xl rounded-br-3xl rounded-bl-3xl bg-white"
          }
        >
          <div className="flex items-center justify-center">
            <span className="dot-typing"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPTypingTemplate;

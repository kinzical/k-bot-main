import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import * as React from "react";

type KPSkipButtonProps = {
  onClick: () => void;
};

const KPSkipButton: React.FC<KPSkipButtonProps> = (
  props: KPSkipButtonProps
) => {
  const { onClick } = props;

  return (
    <Tooltip title="Skip">
      <Button
        onClick={onClick}
        shape="circle"
        size="large"
        className="flex items-center justify-center ml-2"
      >
        <ArrowRightOutlined />
      </Button>
    </Tooltip>
  );
};

export default KPSkipButton;

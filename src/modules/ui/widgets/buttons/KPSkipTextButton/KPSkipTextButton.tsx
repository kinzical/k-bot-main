import { Button } from "antd";
import * as React from "react";

type KPSkipTextButtonProps = {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const KPSkipTextButton: React.FC<KPSkipTextButtonProps> = (
  props: KPSkipTextButtonProps
) => {
  const { onClick, disabled = false, className = "ml-2 text-black bg-yellow-200 border-0 rounded-lg" } =
    props;
  return (
    <Button disabled={disabled} onClick={onClick} size="large" className={className}>
      Skip
    </Button>
  );
};

export default KPSkipTextButton;

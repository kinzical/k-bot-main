import { Button, Form } from "antd";
import * as React from "react";

type KPSubmitButtonProps = {
  onClick?: () => void;
  className?: string;
  label?: string;
  disabled?: boolean;
};

const KPSubmitButton: React.FC<any> = (props: KPSubmitButtonProps) => {
  const { onClick, className = "text-white bg-blueraspberry border-0 rounded-lg", label = "Submit", disabled = false } = props;

  if (onClick) {
    return (
      <Button onClick={onClick} size="large" className={className} disabled={disabled}>
        {label}
      </Button>
    );
  }

  return (
    <Form.Item className="mb-0">
      <Button htmlType="submit" size="large" className={className} disabled={disabled}>
        {label}
      </Button>
    </Form.Item>
  );
};

export default KPSubmitButton;

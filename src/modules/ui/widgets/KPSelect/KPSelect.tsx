import * as React from "react";
import { Select } from "antd";
const { Option } = Select;

const KPSelect: React.FC<any> = (props: any) => {
  const {
    defaultValue,
    style,
    handleChange,
    options,
    value,
    placeholder,
    showSearch,
    filterOption,
    disabled,
    handleSelect
  } = props;
  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      placeholder={placeholder}
      style={style}
      onChange={handleChange}
      showSearch={showSearch}
      filterOption={filterOption}
      disabled={disabled}
      onSelect={handleSelect}
    >
      {options.map((option: any, index: number) => {
        return (
          <Option value={option.value} disabled={option.disabled} key={index}>
            {option.label}
          </Option>
        );
      })}
    </Select>
  );
};

export default KPSelect;

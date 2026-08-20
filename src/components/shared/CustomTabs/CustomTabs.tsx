import { useState } from "react";

type TabItem = {
  label: string;
  value: string;
};

type CustomTabsProps = {
  Tabs: TabItem[];
  onChange?: (value: string) => void;
};

const CustomTabs = ({ Tabs, onChange = () => {} }: CustomTabsProps) => {
  const [state, setState] = useState("0");

  const changeRadio = (val: string) => {
    onChange(val);
    setState(val);
  };

  return (
    <div id="custom-radio-tabs" className="flex bg-[#fafafa] text-[#999] rounded-[20px] py-[5.5px]">
      {Tabs?.map((val, index) => {
        return (
          <div key={index}>
            <input
              type="radio"
              className="hidden"
              id={`input-${val.label}`}
              name="tabs_type"
              value={val.value}
              onChange={(e) => {
                changeRadio(e.target.value);
              }}
            />
            <label htmlFor={`input-${val.label}`} className={`${state === val.value ? "active" : ""}`}>
              {val.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default CustomTabs;

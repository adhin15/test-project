import { useEffect, useState } from "react";

const CustomTabs = (props: any) => {
  const { Tabs, onChange = () => {} } = props;
  const [state, setState] = useState("0");

  const changeRadio = (val: any) => {
    onChange(val);
    setState(val);
  };

  return (
    <div id="custom-radio-tabs" className="flex bg-[#fafafa] text-[#999] rounded-[20px] py-[5.5px]">
      {Tabs?.map((val: any, index: any) => {
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

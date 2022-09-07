import React from "react";
import MonthPicker from "./MonthPicker";

export default {
  title: "ds-react/Monthpicker",
  component: MonthPicker,
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    },
  },
};

export const Default = (props) => {
  return (
    <div style={{ height: "20rem" }}>
      <MonthPicker />
    </div>
  );
};

export const dropdownCaption = (props) => {
  return (
    <div style={{ height: "20rem" }}>
      <MonthPicker
        dropdownCaption
        fromDate={new Date()}
        toDate={new Date("Sep 27 2032")}
      />
    </div>
  );
};

/**
 * 
 export const DisabledMonths = (props) => {
   return (
     <div style={{ height: "20rem" }}>
       <MonthPicker
         disabled={[new Date("Feb 3 2022"), new Date("Mar 4 2022")]}
       />
     </div>
   );
 };
 
 */

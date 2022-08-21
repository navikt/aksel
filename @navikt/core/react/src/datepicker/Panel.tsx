import cl from "clsx";
import React, { forwardRef } from "react";

export interface DatePickerPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
}

export const DatePickerPanel = forwardRef<HTMLDivElement, DatePickerPanelProps>(
  ({ children, className, open, ...rest }, ref) => (
    <div
      {...rest}
      ref={ref}
      className={cl("navds-datepicker__panel", className, {
        "navds-datepicker__panel--open": open,
      })}
    >
      <table className="navds-datepicker__table">
        <thead>
          <tr>
            <td className="navds-datepicker__td">Ma</td>
            <td className="navds-datepicker__td">Ti</td>
            <td className="navds-datepicker__td">On</td>
            <td className="navds-datepicker__td">To</td>
            <td className="navds-datepicker__td">Fr</td>
            <td className="navds-datepicker__td">Lø</td>
            <td className="navds-datepicker__td">Sø</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {[...new Array(7)].map((_, y) => (
              <td className="navds-datepicker__td">
                <button className="navds-datepicker__td-button">{y + 1}</button>
              </td>
            ))}
          </tr>
          <tr>
            {[...new Array(7)].map((_, y) => (
              <td className="navds-datepicker__td">
                <button className="navds-datepicker__td-button">{y + 8}</button>
              </td>
            ))}
          </tr>
          <tr>
            {[...new Array(7)].map((_, y) => (
              <td className="navds-datepicker__td">
                <button className="navds-datepicker__td-button">
                  {y + 15}
                </button>
              </td>
            ))}
          </tr>
          <tr>
            {[...new Array(7)].map((_, y) => (
              <td className="navds-datepicker__td">
                <button className="navds-datepicker__td-button">
                  {y + 22}
                </button>
              </td>
            ))}
          </tr>
          <tr>
            {[...new Array(3)].map((_, y) => (
              <td className="navds-datepicker__td">
                <button className="navds-datepicker__td-button">
                  {y + 29}
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
);

export default DatePickerPanel;

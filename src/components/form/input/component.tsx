import { memo } from "react";
import classNames from "classnames";

// Styles
import "./styles.css";

// Types
import { InputProps } from "@/types";

const InputField: React.FC<InputProps> = ({
  isDisabled,
  label,
  name,
  placeholder,
  register,
  error,
}: InputProps): JSX.Element => {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input
        aria-label={label}
        className={classNames("input-field", {
          "input-field-error": error,
        })}
        disabled={isDisabled}
        placeholder={placeholder}
        {...register(name)}
      />
    </div>
  );
};

export default memo(InputField);

import { memo } from "react";
import classNames from "classnames";

type InputFieldProps = {
  isDisabled?: boolean;
  label: string;
  name: string;
  placeholder: string;
  register: any;
  error: any;
};

const InputField: React.FC<InputFieldProps> = ({
  isDisabled,
  label,
  name,
  placeholder,
  register,
  error,
}: InputFieldProps): JSX.Element => {
  return (
    <div className="flex flex-col justify-center align-start w-full">
      <label className="font-semibold text-gray-50">{label}</label>
      <input
        aria-label={label}
        className={classNames(
          "rounded-md px-4 py-2 border focus:outline-none focus:border-gray-900",
          {
            "border-red-900": error,
          }
        )}
        disabled={isDisabled}
        placeholder={placeholder}
        {...register(name)}
      />
    </div>
  );
};

export default memo(InputField);

import { memo } from "react";

type SelectFieldProps = {
  isDisabled?: boolean;
  label: string;
  name: string;
  options: string[];
  register: any;
  error: any;
};

const SelectField: React.FC<SelectFieldProps> = ({
  isDisabled,
  label,
  name,
  options,
  register,
  error,
}: SelectFieldProps): JSX.Element => {
  return (
    <div className="flex flex-col justify-center align-start">
      <label className="font-semibold text-gray-800">{label}</label>
      <select
        aria-label={name}
        className="border border-gray-300 rounded-md px-2 py-1"
        disabled={isDisabled}
        {...register(name)}
      >
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-900">{error.message}</span>}
    </div>
  );
};

export default memo(SelectField);

import { memo } from "react";

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
    <div className="flex flex-col justify-center align-start">
      <label className="font-semibold text-gray-800">{label}</label>
      <input
        aria-label={label}
        className="border border-gray-300 rounded-md px-2 py-1"
        disabled={isDisabled}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <span className="text-xs text-red-900">{error.message}</span>}
    </div>
  );
};

export default memo(InputField);

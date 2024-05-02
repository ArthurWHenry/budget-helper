import { Dispatch, Fragment, memo, SetStateAction, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import classNames from "classnames";

type SelectFieldProps = {
  isDisabled?: boolean;
  label: string;
  name: string;
  options: any[];
  selected: { label: string; value: number };
  setSelected: Dispatch<SetStateAction<{ label: string; value: number }>>;
};

const SelectField: React.FC<SelectFieldProps> = ({
  selected,
  setSelected,
  isDisabled,
  label,
  name,
  options,
}: SelectFieldProps): JSX.Element => {
  return (
    <div className="flex flex-col justify-center align-start w-full">
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <div className="relative w-full">
            <label className="font-semibold text-gray-900">{label}</label>
            <Listbox.Button className="flex justify-between items-center px-4 py-2 border rounded-md bg-white text-left min-w-32 w-full">
              {selected.label}
              {open ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-50 mt-1 overflow-hidden border rounded-md bg-white shadow min-w-32 w-full">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option}
                    as={Fragment}
                  >
                    {({ active, selected }) => (
                      <li
                        className={classNames(
                          "flex px-4 py-2 gap-2 items-center justify-between cursor-pointer select-none transition duration-150 ease-linear hover:bg-gray-500 hover:text-white",
                          active
                            ? "bg-gray-500 text-gray-0"
                            : "bg-gray-50 text-gray-900"
                        )}
                      >
                        {option.label}
                        {selected && <CheckIcon className="h-5 w-5" />}
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default memo(SelectField);

import { Fragment, memo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import classNames from "classnames";

// Styles
import "./styles.css";

// Types
import { SelectProps } from "@/types";

const Select: React.FC<SelectProps> = ({
  selected,
  setSelected,
  isDisabled,
  label,
  name,
  options,
}: SelectProps): JSX.Element => {
  return (
    <div className="select-container">
      <Listbox
        disabled={isDisabled}
        name={name}
        onChange={setSelected}
        value={selected}
      >
        {({ open }) => (
          <div className="relative w-full">
            <label className="select-label">{label}</label>
            <Listbox.Button className="select-button">
              {selected.label}
              <ChevronDownIcon
                className={classNames("h-5 w-5 text-gray-900", {
                  "rotate-180 transform": open,
                })}
              />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="select-options">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option}
                    as={Fragment}
                  >
                    {({ active, selected }) => (
                      <li
                        className={classNames(
                          "select-option",
                          active
                            ? "select-option-active"
                            : "select-option-inactive"
                        )}
                      >
                        {option.label}
                        {selected && <CheckIcon className="select-icon" />}
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

export default memo(Select);

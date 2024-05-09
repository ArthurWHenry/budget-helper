import { memo } from "react";
import { Resetter, useRecoilValue, useResetRecoilState } from "recoil";
import { TrashIcon } from "@heroicons/react/24/solid";

// Atoms
import { dataState } from "@/atoms";

// Styles
import "./styles.css";

// Types
import { Expense } from "@/types";

const ClearAction: React.FC = () => {
  // State
  const resetData: Resetter = useResetRecoilState(dataState);

  // Selectors
  const data: Expense[] = useRecoilValue<Expense[]>(dataState);

  // Handlers
  const handleClearData = () => {
    resetData();
  };

  // Helpers
  const isDisabled: boolean = data.length === 0;

  return (
    <button
      className="clear-action-button"
      disabled={isDisabled}
      onClick={(): void => handleClearData()}
    >
      <TrashIcon className="button-icon" />
    </button>
  );
};

export default memo(ClearAction);

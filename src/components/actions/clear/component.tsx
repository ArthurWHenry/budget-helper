import { memo } from "react";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { TrashIcon } from "@heroicons/react/24/solid";

// Atoms
import { clearDialogState, expensesDataState } from "@/atoms";

// Styles
import "./styles.css";

// Types
import { Expense } from "@/types";

const ClearAction: React.FC = () => {
  // State
  const setClearDialogOpen: SetterOrUpdater<boolean> =
    useSetRecoilState<boolean>(clearDialogState);

  // Selectors
  const data: Expense[] = useRecoilValue<Expense[]>(expensesDataState);

  // Handlers
  const handleClearData = () => {
    setClearDialogOpen(true);
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

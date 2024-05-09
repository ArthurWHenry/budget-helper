import { memo } from "react";
import { Resetter, useRecoilState, useResetRecoilState } from "recoil";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import toast from "react-hot-toast";

// Atoms
import { clearDialogState, dataState } from "@/atoms";

const ClearDialog: React.FC = () => {
  // State
  const [isOpen, setIsOpen] = useRecoilState<boolean>(clearDialogState);
  const resetData: Resetter = useResetRecoilState(dataState);

  // Handlers
  const handleClearData = () => {
    resetData();
    setIsOpen(false);
    toast.success("Data cleared successfully");
  };

  return (
    <Transition appear show={isOpen}>
      <Dialog
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={(): void => setIsOpen(false)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="w-full max-w-md rounded-xl bg-gray-50 p-6 border shadow ">
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-gray-900"
                >
                  Clear data
                </DialogTitle>
                <p className="text-gray-900">
                  Are you sure you want to clear the data?
                </p>
                <div className="flex justify-end gap-2 mt-2 items-center">
                  <Button
                    className="bg-red-600 text-gray-50 px-2 py-1 rounded-md transition duration-150 hover:opacity-70"
                    onClick={(): void => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-gray-600 px-2 py-1 rounded-md text-gray-50 transition duration-150 hover:opacity-70"
                    onClick={(): void => handleClearData()}
                  >
                    Clear
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default memo(ClearDialog);

import { memo } from "react";

const Header: React.FC = () => {
  return (
    <nav className="flex max-w-4xl mx-auto">
      <h1 className="text-lg font-bold text-gray-900 py-4 px-2">
        💸 Budget Helper
      </h1>
    </nav>
  );
};

export default memo(Header);

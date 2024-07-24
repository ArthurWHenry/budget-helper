import { memo } from "react";

// Styles
import "./styles.css";

const Header: React.FC = () => {
  return (
    <nav className="nav-container">
      <h1 data-cy="nav-title" className="nav-title">
        💸 Budget Helper
      </h1>
    </nav>
  );
};

export default memo(Header);

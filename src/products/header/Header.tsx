import React from "react";
import "./header.css";

interface HeaderProps {
  toggleFilters: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleFilters }) => {
  return (
    <div className="products-topbar">
      <div className="filters-bar">
        <button className="filter-button" onClick={toggleFilters}>
          Filters
        </button>
        <button className="filter-button">Sort by</button>
      </div>
      <div className="view-as-bar">
        <button className="view-as-button">View as</button>
      </div>
    </div>
  );
};

export default Header;

import { useState } from "react";

function Sidebar({ onSelectView }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sidebar-wrapper">
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {isOpen && (
        <div className="sidebar">
          <button onClick={() => onSelectView("home")}>Home</button>
          <button onClick={() => onSelectView("favorites")}>Favorites</button>
          <button onClick={() => onSelectView("watched")}>Watched</button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;

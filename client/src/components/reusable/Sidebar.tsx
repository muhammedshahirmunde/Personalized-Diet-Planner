import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { HiChartPie } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router";

interface SidebarProps {
  onSelect: (section: string) => void;
  activeSection: string;
}

export function Sidebar({ onSelect, activeSection }: SidebarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  const itemClass =
    "flex items-center gap-3 px-4 py-3 text-white hover:bg-blue-700 cursor-pointer transition";
  const activeClass = "bg-blue-700";

  return (
    <div className="bg-blue-600 text-white sm:w-64 w-full">
      {/* Hamburger for mobile */}
      <div className="sm:hidden flex justify-between items-center px-4 py-3 bg-blue-700">
        <span className="text-lg font-semibold">Menu</span>
        <button onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu size={24} />
        </button>
      </div>

      {/* Sidebar content */}
      <div
        className={`flex-col mt-4 sm:flex ${
          isOpen ? "flex" : "hidden"
        } sm:mt-0 sm:h-full`}
      >
        <div
          className={`${itemClass} ${
            activeSection === "dashboard" ? activeClass : ""
          }`}
          onClick={() => onSelect("dashboard")}
        >
          <HiChartPie />
          <span>Dashboard</span>
        </div>

        <div
          className={`${itemClass} ${
            activeSection === "accounts" ? activeClass : ""
          }`}
          onClick={() => onSelect("accounts")}
        >
          <HiChartPie />
          <span>View Accounts</span>
        </div>

        <div className={itemClass} onClick={handleLogout}>
          <CiLogout size={20} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
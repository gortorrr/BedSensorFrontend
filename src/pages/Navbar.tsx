import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { GoHome } from "react-icons/go";
import {
  FaHospital,
  FaChevronUp,
  FaChevronDown,
  FaUserInjured,
  FaUserCog,
} from "react-icons/fa";
import { GrSettingsOption } from "react-icons/gr";
import { MdOutlineSensors } from "react-icons/md";
import { RiHospitalFill } from "react-icons/ri";
import { VscBellDot } from "react-icons/vsc";
import { IoLogOut } from "react-icons/io5";

interface MenuItem {
  name: string;
  link?: string;
  icon: React.ElementType;
  submenus?: MenuItem[];
}

interface User {
  name: string;
  role: string;
  profilePic: string;
}

interface NavbarProps {
  setUser: (user: User | null) => void;
  setIsOnline: (status: boolean) => void;
  user: User | null;
}

const menus: MenuItem[] = [
  { name: "หน้าหลัก", link: "/", icon: GoHome },
  { name: "โรงพยาบาล", link: "/", icon: FaHospital },
  {
    name: "จัดการ",
    icon: GrSettingsOption,
    submenus: [
      { name: "เซนเซอร์", link: "/sensor-management", icon: MdOutlineSensors },
      { name: "ผู้ป่วย", link: "/patient-management", icon: FaUserInjured },
      { name: "ผู้ใช้งานระบบ", link: "/", icon: FaUserCog },
      { name: "จัดการสถานที่", link: "/bed-management", icon: RiHospitalFill },
      { name: "ประวัติการแจ้งเตือน", link: "/", icon: VscBellDot },
    ],
  },
];

const Navbar: React.FC<NavbarProps> = ({ setUser, setIsOnline, user }) => {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const userData = {
      name: "User1",
      role: "พยาบาล",
      profilePic: "/src/assets/Male User.png",
    };
    setUser(userData);
    setIsOnline(true);

    //navigation to login
    navigate("/login");
  };

  const handleLogout = () => {
    setUser(null);
    setIsOnline(false);
  };

  return (
    <div
      id="navbar"
      className={`flex flex-col bg-[#2E5361] min-h-screen ${
        open ? "w-72" : "w-16"
      } duration-500 text-white px-4 sticky top-0 z-20 h-16`}
    >
      <div
        id="navbar-header"
        className="py-4 px-1 flex justify-between items-center"
      >
        {/* User Profile */}
        <div
          id="navbar-user-profile"
          className="flex items-center gap-2 relative"
        >
          {user ? (
            <>
              {open && (
                <img
                  id="navbar-user-avatar"
                  src={user.profilePic}
                  alt="User Profile"
                  className="w-15 h-15 cursor-pointer absolute left-0 transition-transform hover:scale-110"
                />
              )}
              {open && (
                <div id="navbar-user-info" className="ml-16">
                  <p id="navbar-user-name" className="text-sm font-semibold">
                    {user.name}
                  </p>
                  <div className="flex">
                    <p className="text-xs text-gray-400 pr-1">ตำแหน่ง:</p>
                    <p id="navbar-user-role" className="text-xs text-gray-400">
                      {user.role}
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <button
              id="navbar-login-button"
              onClick={handleLogin}
              className="text-sm text-white hover:scale-105 transition-transform cursor-pointer"
            >
              เข้าสู่ระบบ
            </button>
          )}
        </div>

        {/* Toggle Button */}
        <div id="navbar-toggle" className="py-3">
          <HiMenu
            id="navbar-toggle-button"
            size={26}
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav id="navbar-menu" className="mt-4 flex flex-col gap-4 relative">
        {menus.map((menu, index) =>
          menu.submenus ? (
            <div key={index} id={`menu-group-${menu.name}`}>
              <div
                id={`menu-toggle-${menu.name}`}
                className="flex items-center text-lg gap-3.5 font-medium p-2 hover:bg-[#879EA4] rounded-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                onClick={() => setExpanded(!expanded)}
              >
                <div className="transition-transform hover:scale-110">
                  {React.createElement(menu?.icon, { size: "25" })}
                </div>
                <h2
                  style={{ transitionDelay: `${index + 3}00ms` }}
                  className={`whitespace-pre duration-500 ${
                    !open ? "opacity-0 translate-x-28 overflow-hidden" : ""
                  }`}
                >
                  {menu?.name}
                </h2>
                <div className="ml-auto">
                  {open &&
                    (expanded ? (
                      <FaChevronUp size={20} />
                    ) : (
                      <FaChevronDown size={20} />
                    ))}
                </div>
              </div>
              <div
                id={`submenu-container-${menu.name}`}
                className={`transition-all ${
                  expanded ? "max-h-full opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden duration-300 ml-6 font-medium p-2`}
              >
                {menu.submenus.map((sub, i) => (
                  <Link
                    id={`submenu-link-${sub.name}`}
                    key={i}
                    to={sub.link!}
                    className="flex items-center gap-3.5 px-3 text-lg p-2 hover:bg-[#879EA4] rounded-md transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <sub.icon
                      size={25}
                      className="transition-transform hover:scale-110"
                    />
                    <h2
                      style={{ transitionDelay: `${index + 3}00ms` }}
                      className={`whitespace-pre duration-500 ${
                        !open ? "opacity-0 translate-x-28 overflow-hidden" : ""
                      }`}
                    >
                      {sub?.name}
                    </h2>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              id={`menu-link-${menu.name}`}
              key={index}
              to={menu.link!}
              className="flex items-center text-lg gap-3.5 font-medium p-2 hover:bg-[#879EA4] rounded-md transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="transition-transform hover:scale-110">
                {React.createElement(menu?.icon, { size: "25" })}
              </div>
              <h2
                style={{ transitionDelay: `${index + 3}00ms` }}
                className={`whitespace-pre duration-500 ${
                  !open ? "opacity-0 translate-x-28 overflow-hidden" : ""
                }`}
              >
                {menu?.name}
              </h2>
            </Link>
          )
        )}
      </nav>

      {/* Logout Button */}
      <div id="navbar-logout" className="py-1 border-gray-700 mt-auto flex-col">
        <button
          id="logout-button"
          onClick={handleLogout}
          className="flex items-center w-full text-lg gap-3.5 font-medium hover:bg-[#879EA4] rounded-md p-2 
            transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <div className="transition-transform hover:scale-110">
            {React.createElement(IoLogOut, { size: "35" })}
          </div>
          <h2
            className={`whitespace-pre duration-500 ${
              !open ? "opacity-0 translate-x-28 overflow-hidden" : ""
            }`}
          >
            ออกจากระบบ
          </h2>
        </button>
      </div>
    </div>
  );
};

export default Navbar;

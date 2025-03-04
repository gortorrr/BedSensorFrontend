import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { GoHome } from "react-icons/go";
import { FaHospital, FaChevronUp, FaChevronDown, FaUserInjured, FaUserCog } from "react-icons/fa";
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

const menus: MenuItem[] = [
  { name: "หน้าหลัก", link: "/", icon: GoHome },
  { name: "โรงพยาบาล", link: "/", icon: FaHospital },
  {
    name: "จัดการ",
    icon: GrSettingsOption,
    submenus: [
      { name: "เซนเซอร์", link: "/", icon: MdOutlineSensors },
      { name: "ผู้ป่วย", link: "/", icon: FaUserInjured },
      { name: "ผู้ใช้งานระบบ", link: "/", icon: FaUserCog },
      { name: "อาคาร", link: "/", icon: RiHospitalFill },
      { name: "ประวัติการแจ้งเตือน", link: "/", icon: VscBellDot },
    ],
  },
];

const Navbar: React.FC = () => {
const [open, setOpen] = useState(true);
const [expanded, setExpanded] = useState(false);

  return (
    <div className={`flex flex-col  bg-[#2E5361] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-white px-4`}>
      <div className="py-4 px-4 flex justify-between items-center">
        {/* User Profile */}
        <div className="flex items-center gap-2">
          {open && <div className="w-10 h-10 bg-gray-600 rounded-full"></div>}
          {open && (
            <div>
              <p className="text-sm font-semibold">User1</p>
              <p className="text-xs text-gray-400">ตำแหน่ง: พยาบาล</p>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <div className="py-3 ">
          <HiMenu size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-4 flex flex-col gap-4 relative overflow-y-auto">
        {menus.map((menu, index) =>
          menu.submenus ? (
            <div key={index}>
              <div
                className="flex items-center text-lg gap-3.5 font-medium p-2 hover:bg-[#879EA4] rounded-md"
                onClick={() => setExpanded(!expanded)}
              >
                <div>{React.createElement(menu?.icon, {size: "25"})}</div>
                <h2
                  style={{
                    transitionDelay: `${index + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${!open ? "opacity-0 translate-x-28 overflow-hidden" : ""}`}
                >
                  {menu?.name}
                </h2>
                <div className="ml-auto">
                  {expanded ? (
                    <FaChevronUp size={20} />
                  ) : (
                    <FaChevronDown size={20} />
                  )}
                </div>
              </div>
              <div
                className={`transition-all ${expanded ? "max-h-auto opacity-100" : "max-h-0 opacity-0"} overflow-hidden duration-300 ml-6 font-medium p-2`}
              >
                {menu.submenus.map((sub, i) => (
                  <Link key={i} to={sub.link!} className="flex items-center gap-3.5 px-3 text-lg p-2 hover:bg-[#879EA4] rounded-md">
                    <sub.icon size={25} />
                    <h2
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre duration-500 ${!open ? "opacity-0 translate-x-28 overflow-hidden" : ""}`}
                    >
                      {sub?.name}
                    </h2>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link key={index} to={menu.link!} className="flex items-center text-lg gap-3.5 font-medium p-2 hover:bg-[#879EA4] rounded-md">
              <div>{React.createElement(menu?.icon, {size: "25"})}</div>
              <h2
                style={{
                  transitionDelay: `${index + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${!open ? "opacity-0 translate-x-28 overflow-hidden" : ""}`}
              >
                {menu?.name}
              </h2>
            </Link>
          )
        )}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-gray-700 mt-auto ">
        <Link to="/" className="flex items-center text-lg gap-3.5 font-medium p-2 hover:bg-[#879EA4] rounded-md ">
        <div >{React.createElement(IoLogOut, {size: "35"})}</div>
          <h2 className={`whitespace-pre duration-500 ${!open ? "opacity-0 translate-x-28 overflow-hidden" : ""}`}>ออกจากระบบ</h2>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

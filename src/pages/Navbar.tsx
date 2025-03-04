import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { GoHome } from "react-icons/go";
import { FaHospital } from "react-icons/fa";
import { GrSettingsOption } from "react-icons/gr";

const Navbar: React.FC = () => {
    const menus = [
        { name:"หน้าหลัก", link:'/', icon: GoHome},
        { name:"โรงพยาบาล", link:'/', icon: FaHospital},
        { name:"จัดการ", link:'/', icon: GrSettingsOption},
    ];
    const [open, setOpen] = useState(true);
    return (
        
        <div className={`bg-[#2E5361] min-h-screen ${open ? 'w-72':'w-16'} duration-500 text-white px-4`}>
            <div className="py-3 flex justify-end">
                <HiMenu size={26} className="cursor-pointer" onClick={()=>setOpen(!open)} />
            </div>
            <div className="mt-4 flex flex-col gap-4 relative">
                {menus?.map((menu,i)=>(
                    <Link to={menu?.link} key={i} className="flex items-center text-lg gap-3.5 font-medium p-2 hover:bg-[#879EA4] rounded-md">
                        <div>{React.createElement(menu?.icon, {size: "25"})}</div>
                        <h2 
                            style={{
                                transitionDelay: `${i + 3}00ms`,
                            }}
                            className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>
                            {menu?.name}
                        </h2>
                        
                    </Link> 
                ))}
            </div>
        </div>
    )
};

export default Navbar;
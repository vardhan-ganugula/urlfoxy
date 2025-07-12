import React from "react";
import Logo from "../assets/imgs/logo-sm.webp";
import { NavLink,Link } from "react-router-dom";
import { defaultSidebarLinks as sideNavLinks } from "../constants/sidebarLinks";
import { IoMdLogOut } from "react-icons/io";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {
  return (
    <aside className="w-[250px] h-screen flex flex-col bg-zinc-950 pt-5">
      <div className="w-full h-full p-1 flex flex-col gap-5">
        <div className="">
          <h4 className="text-2xl font-extrabold flex gap-2 uppercase pl-5">
            <img src={Logo} className="w-10 h-10" />{" "}
            <span className="mt-1.5 -ml-1">UClip</span>
          </h4>
        </div>
        <div className="flex-grow flex justify-between flex-col py-5">
          <div className="flex-grow">
            <ul className="flex flex-col gap-3 text-md">
              {sideNavLinks.map((itm, idx) => (
                <li className="inline-block rounded-lg hover:bg-white hover:text-black text-white p-2 cursor-pointer pl-3">
                  <NavLink to={itm.link} key={idx} className={
                    ({isActive}) => (isActive ? 'pl-4 before:absolute before:contents-[*] before:h-6 before:rounded-4xl hover:before:bg-blue-600 before:w-1 before:bg-white before:left-0 relative before:top-0' : '') + ' flex gap-2' 
                  } >
                    {React.createElement(itm.icon, {
                      size: 20,
                      style: {
                        marginTop: '2px'
                      }
                    })}
                    {itm.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-2 ">
              <hr className="bg-zinc-900" />
              <div className="mt-2">
                <Link to='/settings' className="flex gap-5 hover:bg-white p-2 rounded-lg text-white hover:text-black">
                  <IoSettingsOutline size={20} className="mt-0.5" />
                  Settings
                </Link>
                <Link to='/logout' className="flex gap-5 hover:bg-white p-2 rounded-lg text-white hover:text-black">
                  <IoMdLogOut size={20} className="mt-0.5" />
                  LogOut
                </Link>
              </div>
              <div>

              </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

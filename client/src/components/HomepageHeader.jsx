import Button from "./Button";
import { HomePageNavLinks } from "../constants/navlinks";
import { NavLink } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";

const HomepageHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [initialDragPoint, setInitialDragPoint] = useState(null);
  const [finalDragPoint, setFinalDragPoint] = useState(null);
  const handleTouchStart = (e) => {
    setInitialDragPoint(e.targetTouches[0].clientY);
  };
  const handleTouchStop = (e) => {
    const diff = finalDragPoint - initialDragPoint;
    if(diff> 0){
      setMenuOpen(false)
    }
  }
  const handleTouchMove = (e) => {
    setFinalDragPoint(e.targetTouches[0].clientY)
  }
  const toggleMenuBar = () => {
    setMenuOpen((prev) => !prev);
  };
  return (
    <header className={`bg-black text-white`}>
      <nav className="w-full p-3 flex justify-center items-center">
        <div
          className="w-full md:w-[80%] border-1 px-5 md:px-10 flex justify-between items-center border-zinc-800 p-3
            rounded-full bg-zinc-900 
          "
        >
          <div className="text-2xl font-bold">UCLIP</div>
          <div className="flex gap-3 md:gap-10 items-center">
            <ul className="gap-5 mr-10 border-r border-primary pr-5 hidden md:flex">
              {HomePageNavLinks.map((link, idx) => (
                <li key={idx}>
                  <NavLink
                    to={link.link}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary underline underline-offset-4 decoration-wavy"
                        : "text-neutral-400 "
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="flex flex-col md:hidden">
              <button onClick={toggleMenuBar}>
                <CiMenuBurger size={25} />
              </button>
            </div>
            <Button variant="glowy" bolded="true">
              Login
            </Button>
          </div>
        </div>
        <div
          className={`block md:hidden fixed w-full bg-zinc-900  min-h-[20%] rounded-t-3xl left-0 z-100 p-6 transition-all duration-500 ${menuOpen ? 'bottom-0':'-bottom-[100%]'}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchStop}
        >
          <div className="rounded-full w-[30%] mx-auto bg-white h-1 mb-5"></div>
          <ul className="grid grid-cols-2 gap-2 flex-col w-full">
            {HomePageNavLinks.map((link, idx) => (
              <li key={idx}>
                <NavLink
                  to={link.link}
                  className={({ isActive }) =>
                    (isActive ? "bg-primary" : "bg-neutral-800") +
                    " w-full block p-3 rounded text-bold"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HomepageHeader;

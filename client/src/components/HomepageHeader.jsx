import Button from "./Button";
import { HomePageNavLinks } from "../constants/navlinks";
import { NavLink } from "react-router-dom";

const HomepageHeader = () => {
  return (
    <header className="bg-black text-white">
      <nav className="w-full p-3 flex justify-center items-center">
        <div
          className="w-[80%] border-1 px-10 flex justify-between items-center border-zinc-800 p-3
            rounded-full
          "
        >
          <div className="text-2xl font-bold">Logo</div>
          <div className="flex gap-10 items-center">
            <ul className="flex gap-5 mr-10 border-r border-primary pr-5">
              {HomePageNavLinks.map((link, idx) => (
                <li key={idx}>
                  <NavLink
                    to={link.link}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary underline underline-offset-4 decoration-wavy"
                        : ""
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Button variant="default" bolded="true">
              {" "}
              Login{" "}
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HomepageHeader;

import splash from "../assets/imgs/splash.png";
import Stats from "../assets/imgs/stats2.webp";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
const InfoBlock = () => {
  const navigate = useNavigate();
  return (
    <section className="flex my-5 justify-center bg-black py-5">
      <div className="relative h-auto lg:min-w-[1000px] lg:w-[50%] bg-zinc-900 rounded w-[95%] flex items-center justify-center">
        <div className="w-full flex items-center md:flex-row flex-col md:h-[400px] p-5 md:px-10 gap-5">
          <div className="md:w-1/2 h-full">
            <img src={Stats} className="w-full h-full object-contain" alt="" />
          </div>
          <div className="h-full p-5 flex justify-center items-start text-white flex-col">
            <h4 className="text-lg md:text-4xl">
              See how can <b>UCLIP</b>
            </h4>
            <h4 className="text-lg md:text-4xl text-blue-500">help your business</h4>
            <p className="mt-2 mb-5 text-sm md:text-sm text-justify text-zinc-400">
              All the products you need to build brand connections, manage links
              and QR Codes, and connect with audiences everywhere in a single
              unified platform.
            </p>
            <Button color="#fff" onClick={() => navigate("/login")}>
              Start for free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoBlock;

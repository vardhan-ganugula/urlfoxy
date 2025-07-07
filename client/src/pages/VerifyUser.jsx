import HomepageHeader from "../components/HomepageHeader";
import Footer from "../components/Footer";
import UCat from "../assets/imgs/uclip-cat.webp";
import { GiToken } from "react-icons/gi";
import { useParams } from "react-router-dom";
import axios from "../libs/axios.lib";
import {toast} from 'react-hot-toast';
import { useEffect } from "react";

const VerifyPage = () => {
    const { verifyToken } = useParams();

  useEffect(() => {
    const toastId = toast.loading('Validating');
    const handleVerifyUser = async () => {
      try {
        const result = await axios.put('/auth/verify-user', {
          token: verifyToken
        });
        toast.success(result.data.message);

      } catch (error) {
        console.log(error)
        const errorMessage = error?.response?.data?.message || error?.request?.statusText ||error?.message || 'Something Went Wrong';
        toast.error(errorMessage);
      } finally {
        toast.dismiss(toastId);
      }
    };

    handleVerifyUser();
    return () => {
      toast.dismiss(toastId);
    };
  }, [verifyToken]);

  return (
    <>
      <HomepageHeader />
      <main className=" md:pb-[300px] h-[80vh] min-h-[1000px] md:h-[110vh] bg-black w-full md:pt-24 ">
        <div className="md:w-[90%] lg:w-[70%] mx-auto h-full bg-zinc-950 border border-zinc-900 flex items-center md:flex-row flex-col w-full gap-4 justify-start rounded-lg p-2 overflow-hidden ">
          <div className="hidden md:block md:w-1/2 w-full shrink-0 rounded-lg bg-zinc-900 md:h-full p-10 ">
            <h2 className="text-white text-5xl font-bold">
              Welcome <span className="text-blue-600">User</span>
            </h2>
            <div className="w-2/3 h-2/3 mx-auto mt-18">
              <img
                src={UCat}
                alt="uclip login page"
                className="w-full h-full object-contain hue-rotate-30"
              />
            </div>
          </div>
          <div className="md:w-1/2 w-full md:h-full relative">
            <div className="absolute -right-3 -top-3 bg-blue-400 opacity-45 h-[340px] w-[340px] rounded-full blur-[90px]"></div>
            <div className="rounded-lg absolute top-0 left-0 backdrop-blur-[200px] h-full w-full text-white">
              <div className="w-2/3 mx-auto mt-28">
                <h4 className="font-bold text-3xl uppercase">Verify User</h4>
                <div className="mt-5">

                    <div className="w-full inline-flex bg-white/5 px-5 py-3 rounded-md">
                      <label htmlFor="token" className="w-8 py-2">
                        <GiToken />
                      </label>
                      <input
                        type="text"
                        className="inline-block grow outline-none ring-0 text-white bg-transparent focus:bg-transparent autofill:text-white autofill:bg-transparent text-sm placeholder:tracking-wider"
                        placeholder="your token address"
                        autoComplete="false"
                        id="token"
                        value={verifyToken}
                        disabled
                      />
                    </div>

                
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default VerifyPage;

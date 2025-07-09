import UCat from "../assets/imgs/uclip-cat.webp";
import { MdOutlineMail } from "react-icons/md";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import DefaultLayout from "../layouts/DefaultLayout.jsx";
import { useForgotPasswordMutation } from "../store/apis/index.js";

const ForgotPasswordPage = () => {
  const forgotPasswordSchema = z.object({
    email: z.string().email({
      message: "Invalid Email",
    }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const [forgotTrigger] = useForgotPasswordMutation();
  const handleLogin = useCallback(
    async (data) => {
      const toastId = toast.loading("Request Processing");
      forgotTrigger(data)
        .unwrap()
        .then((info) => {
          console.log(info)
          if(info.status == 'error'){
            toast.error(info.message);
          }else{
            toast.success(info.message);
          }
        })
        .catch((err) => {
          if (err.originalStatus == 429) {
            toast.error("To many requests");
          } else {
            console.log(err)
            toast.error(err.data.error);
          }
        })
        .finally(() => {
          toast.dismiss(toastId);
        });
    },
    [forgotTrigger]
  );
  return (
    <DefaultLayout>
      <main className=" md:pb-[300px] h-[80vh]  md:h-[110vh] bg-black w-full md:pt-24 ">
        <div className="md:w-[90%] lg:w-[70%] mx-auto h-full bg-zinc-950 border border-zinc-900 flex items-center md:flex-row flex-col w-full gap-4 justify-start rounded-lg p-2 overflow-hidden ">
          <div className="hidden md:block md:w-1/2 w-full shrink-0 rounded-lg bg-zinc-900 md:h-full p-10 ">
            <h2 className="text-white text-5xl font-bold">
              Forgot <span className="text-blue-600">Password</span>
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
                <h4 className="font-bold text-3xl uppercase">
                  Send Reset Email
                </h4>
                <div className="">
                  <form
                    className="flex w-full flex-col mt-18 gap-2"
                    onSubmit={handleSubmit(handleLogin)}
                  >
                    <div className="w-full inline-flex bg-white/5 px-5 py-3 rounded-md">
                      <label htmlFor="email" className="w-8 py-2">
                        <MdOutlineMail />
                      </label>
                      <input
                        type="text"
                        className="inline-block grow outline-none ring-0 text-white bg-transparent focus:bg-transparent autofill:text-white autofill:bg-transparent text-sm placeholder:tracking-wider"
                        placeholder="your email address"
                        autoComplete="email"
                        id="email"
                        {...register("email")}
                      />
                    </div>
                    <p className="text-red-500">
                      {errors.email && errors.email.message}
                    </p>
                    <button
                      disabled={isSubmitting}
                      className={`rounded px-2 w-28 text-sm py-3 mt-2 hover:bg-blue-700 text-white  ${
                        isSubmitting
                          ? "cursor-not-allowed bg-blue-900"
                          : " bg-blue-600 cursor-pointer"
                      } disabled:bg-blue-900`}
                      type="submit"
                    >
                      Send Email
                    </button>
                  </form>
                </div>
                <div className="mt-14 text-zinc-300 text-sm flex justify-between">
                  <div>
                    don't you have account?{" "}
                    <Link to="/register" className="text-sky-400">
                      Register
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default ForgotPasswordPage;

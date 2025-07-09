import UCat from "../assets/imgs/uclip-cat.webp";
import { MdOutlineMail } from "react-icons/md";
import { PiPassword } from "react-icons/pi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth.schema";
import { toast } from "react-hot-toast";
import axios from "../libs/axios.lib.js";
import { useDispatch } from "react-redux";
import {
  authFailure,
  authSuccess,
  authRequest,
} from "../store/slices/auth.slice.js";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout.jsx";

const LoginPage = () => {
  const [isVisiblePassword, setVisiblePassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = useCallback(async (data) => {
    const toastId = toast.loading("Authenticating...");
    dispatch(authRequest());
    try {
      const result = await axios.post("/auth/login", data);
      const userData = result.data;
      toast.success("Login Success");
      dispatch(authSuccess(userData.data));
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Something Went Wrong";
      toast.error(errorMessage);
      dispatch(authFailure(errorMessage));
    } finally {
      toast.dismiss(toastId);
    }
  }, []);
  return (
    <>
      <DefaultLayout>
        <main className=" md:pb-[300px] h-[80vh] min-h-[1000px] md:h-[110vh] bg-black w-full md:pt-24 ">
          <div className="md:w-[90%] lg:w-[70%] mx-auto h-full bg-zinc-950 border border-zinc-900 flex items-center md:flex-row flex-col w-full gap-4 justify-start rounded-lg p-2 overflow-hidden ">
            <div className="hidden md:block md:w-1/2 w-full shrink-0 rounded-lg bg-zinc-900 md:h-full p-10 ">
              <h2 className="text-white text-5xl font-bold">
                Login to <span className="text-blue-600">UCLIP</span>
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
                  <h4 className="font-bold text-3xl uppercase">Welcome Back</h4>
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
                      <div className="w-full inline-flex bg-white/5 px-5 py-3 rounded-md gap-2 relative">
                        <label htmlFor="password" className="w-6 py-2">
                          <PiPassword />
                        </label>
                        <input
                          type={isVisiblePassword ? "text" : "password"}
                          className="inline-block grow outline-none ring-0 text-sm overflow-y-auto placeholder:tracking-wider"
                          placeholder="your secure password"
                          id="password"
                          {...register("password")}
                        />
                        <span
                          className="w-4 py-2 cursor-pointer"
                          onClick={() => setVisiblePassword((prev) => !prev)}
                        >
                          {isVisiblePassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                      <p className="text-red-500">
                        {errors.password && errors.password.message}
                      </p>
                      <button
                        disabled={isSubmitting}
                        className={`rounded px-2 w-24 py-2   mt-5 hover:bg-blue-700 text-white  ${
                          isSubmitting
                            ? "cursor-not-allowed bg-blue-400"
                            : " bg-blue-600 cursor-pointer"
                        } `}
                        type="submit"
                      >
                        Login
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
                    <div>
                      forgot your password?{" "}
                      <Link to="/forgot-password" className="text-green-400">
                        Reset
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </DefaultLayout>
    </>
  );
};

export default LoginPage;

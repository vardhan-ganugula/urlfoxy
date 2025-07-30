import React, { useCallback, useState } from "react";
import { useGetUserProfileQuery } from "../store/apis";
import Loader from "./Loader";
import Button from "./Button";
import { format } from "date-fns";
import UserSessions from "./UserSessions";
const ProfileBlock = () => {
  const { data, isLoading } = useGetUserProfileQuery();
  const [username, setUsername] = useState(data.user.username || 'platform user');
  const handleUpdateUsername = useCallback(() => {
    
  }, [])
  if (isLoading) {
    return <Loader />;
  }
  
  return (
    <section className="flex flex-col gap-5 overflow-hidden">
      <div className="bg-zinc-900 rounded border border-amber-500">
        <div className="flex justify-between p-2 border-b border-zinc-700 grow-0 ">
          <div className="flex gap-3 p-2 justify-start items-center">
            <span className="h-9 inline-block grow-0 w-1.5 bg-amber-500"></span>
            <span>Profile</span>
          </div>
          {!isLoading && (
            <div className="text-zinc-500 text-sm pt-1">
              Last Updated :{" "}
              {format(
                new Date(data?.user?.updatedAt),
                "MMMM/dd/yyyy HH:MM:SS"
              )}{" "}
            </div>
          )}
        </div>
        <div className="p-10">
          <form onSubmit={handleUpdateUsername}>
            <div className="text-zinc-300 grid grid-cols-2 p-5 gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="username" className="capitalize">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="border rounded border-zinc-700 px-2 py-2"
                  value={username || ""}
                  onChange={(e)=> {setUsername(e.target.value)}}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="capitalize">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="border rounded border-zinc-700 px-2 py-2"
                  readOnly
                  value={data?.user?.email || ""}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="userType" className="capitalize">
                  Type
                </label>
                <input
                  type="text"
                  disabled
                  id="userType"
                  className="border rounded cursor-not-allowed border-zinc-700 px-2 py-2"
                  value={data?.user?.userType || ""}
                />
              </div>
              <div className="flex items-end justify-between ">
                <button type="submit" className="bg-amber-600 hover:bg-amber-700 px-3 py-2 cursor-pointer rounded">
                  submit{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-zinc-800 rounded border border-amber-500 overflow-hidden grow max-h-1/2">
          <UserSessions />
      </div>
    </section>
  );
};

export default ProfileBlock;

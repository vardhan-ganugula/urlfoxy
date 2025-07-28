import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { useGetUserProfileQuery } from "../store/apis";
import { useNavigate } from "react-router-dom";
import ProfileBlock from "../components/ProfileBlock";
import Domains from "../components/Domains";

const Settings = () => {
  const { data, isLoading, isError } = useGetUserProfileQuery();
  const [currentOption, setCurrentOption] = useState(0);
  const profileOptions = [
    {
      name: "Profile",
      component: <ProfileBlock />,
    },
    {
      name: "Credits",
      component: <Loader bgColor="green" height="400" width="400" />,
    },
    {
      name: "Domains",
      component : <Domains />
    }
  ];
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [navigate, isError]);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <DashboardLayout>
      <div className="w-full h-full pt-28 p-10">
        <div className="flex gap-10 w-full p-2">
          <div className="w-[300px] h-fit bg-zinc-800 rounded flex gap-3 items-center flex-col py-5">
            <div className="rounded-full overflow-hidden">
              <img
                src={data?.user?.profileURL}
                alt=""
                className="w-[120px] h-[120px] aspect-square object-cover"
              />
            </div>
            <div>{data?.user?.username || "Platform User"}</div>
            <div className="p-[1px] w-full bg-zinc-600"></div>
            <div className="py-1 w-full">
              <ul className="flex w-full flex-col gap-3">
                {
                    profileOptions.map((current, idx) => (
                        <li key={idx} onClick={() => setCurrentOption(idx)} className={`w-full block py-3 pl-10 relative before:contents-[*] before:absolute before:h-full before:w-1 cursor-pointer before:bg-amber-500 before:left-0 before:top-0 ${currentOption === idx && 'bg-amber-800/30'}`}>
                            {current.name}
                        </li>
                    ))
                }
              </ul>
            </div>
          </div>
          <div className="flex-grow shrink-0 p-2 rounded">
            {
                profileOptions[currentOption].component
            }
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

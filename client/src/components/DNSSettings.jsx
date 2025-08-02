import React from "react";
import Button from "./Button";

const DNSSettings = ({
  onNext
}) => {
  return (
    <section className="w-full bg-zinc-900 rounded-lg border border-zinc-700 flex flex-col mb-5">
      <div className="px-6 py-4 border-b border-zinc-700 flex-shrink-0">
        <h2 className="text-lg font-semibold text-white relative">
          <span className="w-[5px] absolute h-full bg-primary"></span>
          <span className="pl-3">DNS Settings</span>
        </h2>
        <p className="text-sm text-zinc-400">Point your domain with our server</p>
      </div>
      <div className="border-b border-zinc-700">
        <table className="w-full">
          <thead className="bg-zinc-800/50 sticky top-0 border-b border-zinc-900">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">
                Content
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">
                TTL 
              </th>
            </tr>
          </thead>
          <tbody>

              <tr
             
                className="hover:bg-zinc-800/50 transition-colors duration-200 font-mono"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-200">
                  TXT
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-200">
                  @ / subdomain
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-200 flex pl-10">
                  vn-verify=******
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-200">
                  auto
                </td>
              </tr>

              <tr
             
                className="hover:bg-zinc-800/50 transition-colors duration-200 font-mono"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-200">
                  CNAME
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-200">
                  @ / subdomain
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-200 flex pl-10">
                  {
                    import.meta.env.VITE_CLIENT_URL
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-200">
                  auto
                </td>
              </tr>

          </tbody>
          
        </table>
      </div>
      <div className="px-6 py-4 flex justify-between text-zinc-400 flex-shrink-0">
        <span>move to next step</span>
        <span>
          <Button variant="squared" onClick={() => onNext()}>Next</Button>
        </span>
      </div>
    </section>
  );
};

export default React.memo(DNSSettings);

import React from 'react'
import { useGetAllDomainsQuery } from '../store/apis/domains';
import toast from 'react-hot-toast';
import Loader from "./Loader";

const DomainTable = () => {
    const { data: domains, isLoading, isError } = useGetAllDomainsQuery();
      if (isLoading) {
        return <Loader />;
      }
      if (isError) {
        toast.error("Unable to fetch domains");
      }
      function getBadge(valid){
        return (<span className={`inline-block px-2 py-1 rounded-full border text-xs ${valid? 'text-green-500 border-green-500 bg-green-500/10' : 'text-red-500 border-red-500 bg-red-500/10' }`}> {valid ? 'active' : 'inactive'}</span>)
      }
  return (
    <section className="w-full bg-zinc-900 rounded-lg border border-zinc-700 flex flex-col mb-5">
        <div className="px-6 py-4 border-b border-zinc-700 flex-shrink-0">
          <h2 className="text-lg font-semibold text-white relative">
            <span className="w-[5px] absolute h-full bg-primary"></span>
            <span className="pl-3">Domains</span>
          </h2>
          <p className="text-sm text-zinc-400">Manage your domains</p>
        </div>
        <div>
          <table className="w-full">
            <thead className="bg-zinc-800/50 sticky top-0 border-b border-zinc-900">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">
                  Domain Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">
                  SSL
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">
                  Verification Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">
                  DNS Token
                </th>
              </tr>
            </thead>
            <tbody>
              {domains?.map((domainRecord) => (
                <tr key={domainRecord._id} className="hover:bg-zinc-800/50 transition-colors duration-200 font-mono">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-200">
                    {domainRecord.domain}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-200">
                    {getBadge(domainRecord.sslEnabled)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-200 flex pl-10">
                    {getBadge(domainRecord.verified)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-200">
                    {domainRecord.dnsVerifyToken}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
  )
}

export default React.memo(DomainTable);
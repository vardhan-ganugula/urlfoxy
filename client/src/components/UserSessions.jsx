import React from 'react'
import { useGetUserSessionsQuery, useTerminateSessionMutation } from '../store/apis'
import Loader from './Loader';

const UserSessions = () => {
    const {isLoading, data} = useGetUserSessionsQuery();
    
    const [terminateSession] = useTerminateSessionMutation();
    if(isLoading){
        return <Loader />
    }
    const sessiondata = data?.data || [];
    const handleTerminateSession = (sessionId) => {
        // Handle session termination logic
        console.log(sessionId)
        terminateSession(sessionId)
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status) => {
        const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
        if (status) {
            return `${baseClasses} bg-green-900/20 text-green-400 border border-green-500/30`;
        } else {
            return `${baseClasses} bg-red-900/20 text-red-400 border border-red-500/30`;
        }
    };

    const getDeviceIcon = (device) => {
        if (device?.toLowerCase().includes('mobile') || device?.toLowerCase().includes('android') || device?.toLowerCase().includes('iphone')) {
            return '📱';
        } else if (device?.toLowerCase().includes('tablet') || device?.toLowerCase().includes('ipad')) {
            return '📱';
        } else {
            return '💻';
        }
    };

    return (
        <div className='w-full h-full bg-zinc-900 rounded-lg shadow-2xl border border-zinc-700 flex flex-col'>
            {/* Fixed Header */}
            <div className="px-6 py-4 border-b border-zinc-700 flex-shrink-0">
                <h2 className="text-lg font-semibold text-white">Active Sessions</h2>
                <p className="text-sm text-zinc-400 mt-1">Manage your active login sessions across devices</p>
            </div>
            
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-auto min-h-0">
                <div className="min-h-full">
                    <table className='w-full'>
                        <thead className='bg-zinc-800/50 sticky top-0 z-10'>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                                    Created At
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                                    Device
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                                    IP Address
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-zinc-900 divide-y divide-zinc-700 w-[400px] overflow-y-auto">
                            {sessiondata && sessiondata.length > 0 ? (
                                sessiondata.map((session, index) => (
                                    <tr key={session.id || index} className="hover:bg-zinc-800/50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-200">
                                            {formatDate(session.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-200">
                                            <div className="flex items-center">
                                                <span className="mr-2 text-lg">{getDeviceIcon(session.device)}</span>
                                                <div>
                                                    <div className="font-medium text-white">{session.device || 'Unknown Device'}</div>
                                                    <div className="text-xs text-zinc-400">{session.browser || 'Unknown Browser'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={getStatusBadge(session.valid)}>
                                                {session.valid ? 'active' : 'inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300 font-mono">
                                            {session.ipAddress || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {session.valid ? (
                                                <button 
                                                    onClick={() => handleTerminateSession(session._id)}
                                                    className="inline-flex items-center px-3 py-1 border border-red-500/50 text-sm font-medium rounded-md text-red-400 bg-red-900/20 hover:bg-red-900/40 hover:border-red-500/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-zinc-900 transition-colors duration-200"
                                                >
                                                    Terminate
                                                </button>
                                            ) : (
                                                <span className="text-zinc-500 text-sm">Expired</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <div className="text-zinc-400">
                                            <div className="text-4xl mb-4">🔒</div>
                                            <h3 className="text-lg font-medium text-white mb-2">No active sessions</h3>
                                            <p className="text-sm text-zinc-400">You don't have any active sessions at the moment.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Fixed Footer */}
            {sessiondata && sessiondata.length > 0 && (
                <div className="px-6 py-3 bg-zinc-800/30 border-t border-zinc-700 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-zinc-300">
                            Showing <span className="font-medium text-white">{sessiondata.length}</span> session{sessiondata.length !== 1 ? 's' : ''}
                        </div>
                        <div className="text-xs text-zinc-500">
                            Sessions automatically expire after 1 day of inactivity
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserSessions
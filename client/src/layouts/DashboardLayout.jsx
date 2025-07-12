import React from 'react'
import Sidebar from '../components/Sidebar'

export const DashboardLayout = ({children}) => {
  return (
    <>
        <div className='w-screen h-screen flex bg-zinc-900 text-white'>
            <Sidebar/>
            <main className='flex-grow '>
                {
                    children
                }
            </main>
        </div>
    </>
  )
}

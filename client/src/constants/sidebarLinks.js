import { IoHomeOutline , IoUnlinkOutline,IoGlobeOutline,IoFolderOutline   } from "react-icons/io5";
import { RiChat1Line } from "react-icons/ri";
import { SiGoogleanalytics } from "react-icons/si";
import { LuPlus } from "react-icons/lu";

export const defaultSidebarLinks = [
    {
        name: 'Dashboard',
        link: '/dashboard',
        icon: IoHomeOutline 
    },
    {
        name: 'Create',
        link: '/create-link',
        icon: LuPlus 
    },
    {
        name: 'Domains',
        link: '/domains',
        icon: IoGlobeOutline
    },
    {
        name: 'Groups',
        link: '/groups',
        icon: IoFolderOutline
    },
    {
        name: 'Help',
        link: '/support',
        icon: RiChat1Line
    },{
        name: 'Analytics',
        link: 'analytics',
        icon: SiGoogleanalytics
    }
]
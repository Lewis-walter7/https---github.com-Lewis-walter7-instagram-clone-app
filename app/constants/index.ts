'use client'

import { GoHome,GoSearch,GoHomeFill,GoReport} from 'react-icons/go'
import { MdOutlineExplore,MdExplore } from 'react-icons/md'
import { BsCameraVideo,BsFillCameraVideoFill,BsBookmark, BsMoonFill} from 'react-icons/bs'
import { RiMessengerLine } from "react-icons/ri"
import { AiOutlineHeart,AiOutlinePlusSquare } from "react-icons/ai"
import { BiUserCircle, BiSolidUserCircle} from "react-icons/bi"
import { FaFacebookMessenger } from 'react-icons/fa'
import { FcLike } from 'react-icons/fc'
import { HiCog } from 'react-icons/hi'
import { LuActivitySquare } from 'react-icons/lu'



export const menuitems = [
    {
        name: 'Home',
        icon: GoHome,
        href: '/home',
        activeIcon: GoHomeFill
    },
    {
        name: 'Search',
        icon: GoSearch,
        activeIcon: GoSearch
    },
    {
        name: 'Explore',
        icon: MdOutlineExplore,
        href: '/explore',
        activeIcon: MdExplore
    },
    {
        name: 'Reels',
        icon: BsCameraVideo,
       // href: `/reels/:${reelId}`,
        activeIcon: BsFillCameraVideoFill
    },
    {
        name: 'Messages',
        icon: RiMessengerLine,
        href: '/direct',
        activeIcon: FaFacebookMessenger
    },
    {
        name: 'Notifications',
        icon: AiOutlineHeart,
        activeIcon: FcLike
    },
    {
        name: 'Create',
        icon: AiOutlinePlusSquare,
        activeIcon: AiOutlinePlusSquare
    },
    {
        name: 'Profile',
        icon: BiUserCircle,
        // href: '/profile/:id',
        activeIcon: BiSolidUserCircle
    }
]

export const items = [
    {
        icon: HiCog,
        name: "Settings",
        href: '/settings'
    },
    {
        icon: LuActivitySquare,
        name: "Your Activity",
        href: '/activity'
    },
    {
        icon: BsBookmark,
        name: "Saved",
        href: '/settings'
    },
    {
        icon: BsMoonFill,
        name: "Switch apperance",
        href: '/settings'
    },
    {
        icon:GoReport,
        name: "Report a problem",
        href: '/settings'
    }
]

export const bottomappbaritems = [
    {
        name: 'Home',
        icon: GoHome,
        href: '/home',
        activeIcon: GoHomeFill
    },
    {
        name: 'Search',
        icon: GoSearch,
        href: '/explore',
        activeIcon: GoSearch
    },
    {
        name: 'Reels',
        icon: BsCameraVideo,
        href: '/reels/:id',
        activeIcon: BsFillCameraVideoFill
    },
    {
        name: 'Messages',
        icon: RiMessengerLine,
        href: '/direct',
        activeIcon: FaFacebookMessenger
    },
    {
        name: 'Create',
        icon: AiOutlinePlusSquare,
        activeIcon: AiOutlinePlusSquare
    },
    {
        name: 'Profile',
        icon: BiUserCircle,
        href: '/profile/:id',
        activeIcon: BiSolidUserCircle
    }
]
import React from 'react'

//icons
import * as FaIcons from 'react-icons/fa'   //trash can 
import * as MdIcons from 'react-icons/md'   //battery icons
import * as RiIcons from 'react-icons/ri'   //up & down arrows
import * as HiIcons from 'react-icons/hi'   //HiViewBoards

export const SidebarData = [
    {
        title: 'Pedals',
        endpoint: 'Pedal',
        icon: <MdIcons.MdCreate />, //PLACEHOLDER!
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpen: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
            searchBar: 'Select a pedal',
            item: 'pedal',
            button: 'Add Pedal'
            }
        ]
    },
    {
        title: 'Pedalboards',
        endpoint: 'Pedalboard',
        icon: <HiIcons.HiViewBoards />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpen: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
            searchBar: 'Select a pedalboard',
            item: 'pedalboard',
            button: 'Add Pedalboard'
            }
        ]
    },
    {
        title: 'Power Supplies',
        endpoint: 'PowerSupply',
        icon: <MdIcons.MdBatteryCharging90 />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpen: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
            searchBar: 'Select a power supply',
            item: 'power supply',
            button: 'Add Power Supply'
            }
        ]
    },
    {
        title: 'Clear Canvas',
        icon: <FaIcons.FaTrashAlt />
    }
]
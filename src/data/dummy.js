import React from 'react';
import { FaDna, FaBacteria } from 'react-icons/fa';
import { VscRemoteExplorer } from "react-icons/vsc";
import { MdOutlineStackedBarChart } from 'react-icons/md';

export const links = [
  {
    title: 'AQUAGAR',
    links: [
      {
        name: 'AAReporting',
        icon: <MdOutlineStackedBarChart />,
      },
      {
        name: 'remote',
        icon: <VscRemoteExplorer />,
      }
    ],
  },
  {
    title: 'Lab funs',
    links: [    {
      name: 'roboflowupload',
      icon: <FaDna /> ,
    },
      {
      name: 'colonycounting',
      icon: <FaBacteria />,
    },
    {
      name: 'sequencing',
      icon: <FaDna /> ,
    }
  ]
  }
];

export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];
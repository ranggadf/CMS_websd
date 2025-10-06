/* eslint-disable @next/next/no-img-element */
"use client"

import React, { use, useContext, useEffect, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';

interface Sidebar {
    sidebar_id: number;
    label: string;
    to_path: string;
    status: number;
}
const AppMenu = () => {
    const [sidebar, setSidebar] = useState<Sidebar[]>([]);
    const { layoutConfig } = useContext(LayoutContext);
    const [status, setStatus] = useState();

    useEffect(() => {
        const fetchSidebar = async () => {
            try {
                const cookies = document.cookie.split(';');
                const userInfoCookie = cookies.find(cookie => cookie.trim().startsWith('user-info='));

                if (userInfoCookie) {
                    const userInfo = userInfoCookie.split('=')[1];
                    const user = JSON.parse(userInfo);
                    setStatus(user.status)
                    const userId = user.id
                    const response = await axios.get(API_ENDPOINTS.SIDEBAR(userId));
                    setSidebar(response.data.sidebars);
                } else {
                    console.error('User info not found in cookies');
                }
            } catch (error) {
                console.error('There was an error fetching the sidebar!', error);
            }
        };
        fetchSidebar();
    }, []);

    const model: AppMenuItem[] = [
        {
            label: 'Dashboard',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        ...(sidebar.some(item => item.status === 2 && item.sidebar_id === 1) ? [{
            label: 'Data Debitur',
            items: sidebar
                .filter(item => item.status === 2 && item.sidebar_id === 1)
                .map(item => ({
                    label: item.label,
                    icon: 'pi pi-fw pi-file',
                    to: item.to_path
                }))
        }] : []),
        ...(sidebar.some(item => item.status === 2 && item.sidebar_id === 7) ? [{
            label: 'Pengajuan Kredit',
            items: sidebar
                .filter(item => item.status === 2 && item.sidebar_id === 7)
                .map(item => ({
                    label: item.label,
                    icon: 'pi pi-fw pi-file',
                    to: item.to_path
                }))
        }] : []),
        ...(sidebar.some(item => item.status === 2 && item.sidebar_id >= 10) ? [{
            label: 'List Pengajuan',
            items: sidebar
                .filter(item => item.status === 2 && item.sidebar_id >= 10)
                .map(item => ({
                    label: item.label,
                    icon: 'pi pi-fw pi-file',
                    to: item.to_path
                }))
        }] : []),
    ];
    const modelAdmin: AppMenuItem[] = [
        {
            label: 'Dashboard',
            items: [{ label: 'Admin Dashboard', icon: 'pi pi-fw pi-home', to: '/admin/' }]
        },
        ...(sidebar.some(item => item.status === 2 && item.sidebar_id > 7) ? [{
            label: 'Master',
            items: sidebar
                .filter(item => item.status === 2 && item.sidebar_id > 7)
                .map(item => ({
                    label: item.label,
                    icon: 'pi pi-fw pi-file',
                    to: item.to_path
                }))
        }] : []),
        ...(sidebar.some(item => item.status === 2 && item.sidebar_id === 1) ? [{
            label: 'Data Debitur',
            items: sidebar
                .filter(item => item.status === 2 && item.sidebar_id === 1)
                .map(item => ({
                    label: item.label,
                    icon: 'pi pi-fw pi-file',
                    to: item.to_path
                }))
        }] : []),
        ...(sidebar.some(item => item.status === 2 && item.sidebar_id === 7) ? [{
            label: 'Pengajuan Kredit',
            items: sidebar
                .filter(item => item.status === 2 && item.sidebar_id === 7)
                .map(item => ({
                    label: item.label,
                    icon: 'pi pi-fw pi-file',
                    to: item.to_path
                }))
        }] : [])
    ];

    return (
        <MenuProvider>
            {status === 2 || status === 3 ? (
                <ul className="layout-menu">
                    {model.map((item, i) => {
                        return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                    })}
                </ul>
            ) :
                <ul className="layout-menu">
                    {modelAdmin.map((item, i) => {
                        return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                    })}
                </ul>
            }
        </MenuProvider>
    );
};

export default AppMenu;

'use client'

import AdminLayoutDesktop from "./AdminLayoutDesktop";
import AdminLayoutMobile from "./AdminLayoutMobile";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AdminLayout = (props) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        getActiveMenuFromUrl()
    }, [pathname]);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 1024);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const menuItems = [
        {
            id: 1, name: 'Overview', href: '/dashboard/overview/total-sales',
            children: [
                { id: 1001, name: 'Total Sales', href: '/dashboard/overview/total-sales' },
                { id: 1002, name: 'Booking Count', href: '/dashboard/overview/booking-count' },
                { id: 1003, name: 'Average Booking Value', href: '/dashboard/overview/average-booking-value' },
                { id: 1004, name: 'Gross / Net Profit', href: '/dashboard/overview/gross-net-profit' },
            ]
        },
        {
            id: 2, name: 'Example 2', href: '/dashboard/overview/total-sales',
            children: [
                { id: 2001, name: 'some text', href: '/dashboard/overview/total-sales' },
                { id: 2002, name: 'some text 2', href: '/dashboard/overview/booking-count' },
            ]
        },
    ];

    const getActiveMenuFromUrl = () => {
        let menuItemChildren = [];
        for (let i = 0; i < menuItems.length; i++) {
            menuItemChildren.push(...menuItems[i]?.children)
        };
        let selectedMenuItemId = menuItemChildren?.find(menuItemChild => pathname.includes(menuItemChild?.href))?.id;
        setSelectedMenuItem(selectedMenuItemId);
    };

    return isDesktop
        ? <AdminLayoutDesktop menuItems={menuItems} selectedMenuItem={selectedMenuItem}>{props?.children}</AdminLayoutDesktop>
        : <AdminLayoutMobile menuItems={menuItems} selectedMenuItem={selectedMenuItem}>{props?.children}</AdminLayoutMobile>
}

export default AdminLayout;
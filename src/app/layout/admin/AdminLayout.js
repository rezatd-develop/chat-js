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
            id: 1, name: 'نگاه اجمالی', href: '/dashboard/overview/all-charts',
            children: [
                { id: 1001, name: 'شاخص ها', href: '/dashboard/overview/all-charts' },
                { id: 1002, name: 'مجموع فروش', href: '/dashboard/overview/total-sales' },
                { id: 1003, name: 'تعداد رزرو ها', href: '/dashboard/overview/booking-count' },
                { id: 1004, name: 'تخفیف ها', href: '/dashboard/overview/discounts' },
            ]
        },
        {
            id: 2, name: 'مقایسه شاخص ها', href: '/dashboard/products-statics/services',
            children: [
                { id: 2001, name: 'خدمات', href: '/dashboard/products-statics/services' },
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
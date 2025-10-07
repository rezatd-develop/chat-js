'use client';

import CuButton from "@/app/components/button/CuButton";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const AdminLayoutDesktop = (props) => {
    const [persianDateTime, setPersianDateTime] = useState("");
    const router = useRouter();

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "full",
                timeStyle: "medium",
            });
            setPersianDateTime(formatter.format(now));
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const exitUserClicked = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userFullName');
        router.push('/login')
    };

    return (
        <div dir="rtl" className="d-flex min-vh-100 bg-light">
            <div
                className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
                style={{ width: "280px", minHeight: "100vh" }}
            >
                <a href="/" className="text-white text-decoration-none mb-3">
                    <span className="fs-4 fw-bold">مرکز مدیریت</span>
                </a>

                <hr className="border-secondary" />

                <ul className="nav nav-pills flex-column mb-auto ">
                    {props?.menuItems?.map((item) => (
                        <div key={item?.id}>
                            <li className="nav-item">
                                <Link
                                    href={item?.href}
                                    className="nav-link text-white fw-semibold "
                                >
                                    {item?.name}
                                </Link>
                            </li>
                            {item?.children?.map((child) => (
                                <li key={child?.id} className="me-4">
                                    <Link
                                        href={child?.href}
                                        className={clsx(
                                            "nav-link",
                                            props?.selectedMenuItem === child?.id
                                                ? "active bg-primary"
                                                : "text-white"
                                        )}
                                    >
                                        {child?.name}
                                    </Link>
                                </li>
                            ))}
                        </div>
                    ))}
                </ul>
            </div>

            <div className="flex-grow-1 d-flex flex-column">
                <div className="bg-dark d-flex p-3 justify-content-between align-items-center">
                    <div className="d-flex gap-2">
                        <CuButton
                            variant="contained"
                            size="large"
                            onClick={() => router.push('/dashboard/files/upload')}
                            color="primary"
                        >
                            تغییر فایل اکسل
                        </CuButton>
                        <CuButton
                            variant="contained"
                            size="large"
                            onClick={() => router.push('/dashboard/files/upload')}
                            color="warning"
                        >
                            آپلود فایل
                        </CuButton>
                    </div>

                    <div className="d-flex align-items-center text-white">
                        <div className="text-end">
                            <div>
                                {localStorage.getItem('userFullName')}، خوش آمدید
                            </div>
                            <small className="text-white-50">{persianDateTime}</small>
                        </div>
                        <i class="bi bi-box-arrow-right fs-3 text-white me-3 cursor-pointer"
                            onClick={exitUserClicked}
                        ></i>
                    </div>
                </div>
                <div className="flex-grow-1 overflow-auto p-4">
                    {props?.children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayoutDesktop;

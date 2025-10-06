'use client';
import CuButton from "@/app/components/button/CuButton";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const AdminLayoutDesktop = (props) => {
    const user = {
        firstName: "مهدی",
        lastName: "رضایی",
        avatar: "https://github.com/mdo.png",
    };
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

    return (
        <div dir="rtl" className="w-100 vh-100 bg-light d-flex">
            <div
                className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100"
                style={{ width: "280px" }}
            >
                <a href="/" className="text-white text-decoration-none">
                    <span className="fs-4 fw-bold">مرکز مدیریت</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    {props?.menuItems?.map((item) => (
                        <div key={item?.id}>
                            <li className="nav-item">
                                <Link
                                    href={item?.href}
                                    className="nav-link text-white"
                                    aria-current="page"
                                >
                                    {item?.name}
                                </Link>
                            </li>
                            {item?.children?.map((child) => (
                                <li key={child?.id}>
                                    <Link
                                        href={child?.href}
                                        className={clsx(
                                            props?.selectedMenuItem === child?.id && "active",
                                            "nav-link text-white"
                                        )}
                                    >
                                        {child?.name}
                                    </Link>
                                </li>
                            ))}
                        </div>
                    ))}
                </ul>
                <hr />
                <div className="dropdown">
                    <div className="d-flex align-items-center text-white text-decoration-none">
                        <img
                            src={user.avatar}
                            alt="avatar"
                            width="32"
                            height="32"
                            className="rounded-circle ms-2"
                        />
                        <strong className="ms-2">
                            {user.firstName} {user.lastName}
                        </strong>
                    </div>
                </div>
            </div>

            <div className="w-100">
                <div className="bg-dark d-flex p-3 justify-content-between align-items-center">
                    <div className="d-flex gap-2">
                        <div>
                            <CuButton
                                variant="contained"
                                size="large"
                                onClick={() => router.push('/dashboard/files/upload')}
                                color="primary"
                            >
                                تغییر فایل اکسل
                            </CuButton>
                        </div>
                        <div>
                            <CuButton
                                variant="contained"
                                size="large"
                                onClick={() => router.push('/dashboard/files/upload')}
                                color="warning"
                            >
                                آپلود فایل
                            </CuButton>
                        </div>
                    </div>

                    <div className="d-flex align-items-center text-white">
                        <img
                            src={user.avatar}
                            alt="avatar"
                            width="40"
                            height="40"
                            className="rounded-circle ms-2"
                        />
                        <div className="text-end">
                            <div>
                                {user.firstName} {user.lastName}، خوش آمدید
                            </div>
                            <small className="text-white">{persianDateTime}</small>
                        </div>
                    </div>
                </div>

                {props?.children}
            </div>
        </div>
    );
};

export default AdminLayoutDesktop;

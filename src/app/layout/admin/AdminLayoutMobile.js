'use client'
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

const AdminLayoutMobile = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div dir="rtl" className="w-100 vh-100 bg-light">
            <div className="d-md-none d-flex justify-content-between align-items-center bg-dark text-white p-2">
                <button
                    className="btn btn-outline-light"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <i className="bi bi-list fs-2"></i>
                </button>
                <span className="fw-bold">Management Center</span>
            </div>


            <div className={clsx(
                "bg-dark text-white p-3 d-flex flex-column h-100",
                "position-fixed top-0",
                "transition-all",
                isOpen ? "end-0" : "end-100",
                "d-md-block",
            )}
                style={{ width: "280px", zIndex: 1050 }}
            >
                <a href="/" className="text-white text-decoration-none d-none d-md-block mb-3">
                    <span className="fs-4 fw-bold">Management Center</span>
                </a>
                <hr className="d-none d-md-block" />

                <ul className="nav nav-pills flex-column mb-auto">
                    <button
                        className="btn btn-outline-light"
                        style={{ width: 'fit-content' }}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <i className="bi bi-arrow-right"></i>
                    </button>
                    {props?.menuItems?.map(item =>
                        <div key={item?.id}>
                            <li className="nav-item me-1">
                                <Link href={item?.href}
                                    className="nav-link text-white" aria-current="page">
                                    {item?.name}
                                </Link>
                            </li>
                            {item?.children?.map(child =>
                                <li key={child?.id}>
                                    <Link href={child?.href}
                                        className={clsx(props?.selectedMenuItem === child?.id && 'active', "nav-link text-white me-3")}>
                                        {child?.name}
                                    </Link>
                                </li>
                            )}
                        </div>
                    )}
                </ul>

                <hr />
                <div className="dropdown">
                    <div className="d-flex align-items-center text-white text-decoration-none">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle ms-2" />
                        <strong className="ms-2">mdo</strong>
                    </div>
                </div>
            </div>
            <div className="w-100">{props?.children}</div>
        </div>
    );
};

export default AdminLayoutMobile;

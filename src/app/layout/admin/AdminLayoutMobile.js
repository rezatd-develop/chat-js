'use client'
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AdminLayoutMobile = (props) => {
    const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

    const exitUserClicked = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userFullName');
        router.push('/login')
    };

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
                            <li className="nav-item">
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
                <i class="bi bi-box-arrow-right fs-3 text-white me-3 cursor-pointer"
                    onClick={exitUserClicked}
                ></i>
            </div>
            <div className="w-100">{props?.children}</div>
        </div>
    );
};

export default AdminLayoutMobile;

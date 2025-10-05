import clsx from "clsx";
import Link from "next/link";

const AdminLayoutDesktop = (props) => {

    return <div dir="rtl" className="w-100 vh-100 bg-light d-flex">
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100" style={{ width: " 280px" }} >
            <a href="/" className="text-white text-decoration-none">
                <span className="fs-4 fw-bold">Management Center</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                {props?.menuItems?.map(item =>
                    <div key={item?.id}>
                        <li className="nav-item">
                            <Link href={item?.href}
                                className="nav-link text-white" aria-current="page">
                                <svg className="bi me-1" width="16" height="16"></svg>
                                {item?.name}
                            </Link>
                        </li>
                        {item?.children?.map(child =>
                            <li key={child?.id}>
                                <Link href={child?.href}
                                    className={clsx(props?.selectedMenuItem === child?.id && 'active', "nav-link text-white")}>
                                    <svg className="bi me-3" width="16" height="16"></svg>
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
        <div>{props?.children}</div>
    </div>
};

export default AdminLayoutDesktop;
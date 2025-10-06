"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import CuDialog from "../components/dialog/CuDialog";
import { DaAuthSignUp } from "../services/apis/auth/authServices";

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: ""
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchSignUp();
    };

    async function fetchSignUp() {
        try {
            const data = await DaAuthSignUp(formData);

            if (data?.hasError) {
                setErrorMessage(data?.message);
                setShowErrorDialog(true);
            } else {
            }
        } catch (err) {
            setErrorMessage(err.message || err);
            setShowErrorDialog(true);
        }
    };

    return (
        <div
            dir="rtl"
            className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center mb-4">ثبت نام کاربر جدید</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                            نام
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="form-control text-end"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="نام خود را وارد کنید"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                            نام خانوادگی
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="form-control text-end"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="نام خانوادگی خود را وارد کنید"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            نام کاربری
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control text-end"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="نام کاربری خود را وارد کنید"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                            شماره تماس
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="form-control text-end"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="شماره تماس خود را وارد کنید"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            رمز عبور
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control text-end"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="رمز عبور خود را وارد کنید"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        ثبت نام
                    </button>
                </form>
            </div>
            <CuDialog
                isOpen={showErrorDialog}
                dialogHeader='خطا'
                dialogContent={errorMessage}
                handleClose={() => setShowErrorDialog(false)}
            />
        </div>
    );
}

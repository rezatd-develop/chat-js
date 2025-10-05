'use client'

export const isDesktop = () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= 1024;
};

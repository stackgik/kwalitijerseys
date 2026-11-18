"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartEditContext";

const BodyScrollLock = () => {
    const { editingItem } = useCart();
    console.log(editingItem);

    useEffect(() => {
        if (!editingItem) return;

        const html = document.documentElement;
        html.style.overflow = "hidden";

        return () => {
            html.style.overflow = "";
        };
    }, [editingItem]);

    return null;
};

export default BodyScrollLock;
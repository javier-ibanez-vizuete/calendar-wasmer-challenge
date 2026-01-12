import classNames from "classnames";
import { useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
};

export function Modal({
    isOpen = false,
    onClose,
    title = "Event Title",
    description = "Event description",
}: ModalProps) {
    const { theme } = useTheme();

    const baseModalContainerConfig = useMemo(
        () =>
            classNames("bg-primary pl-4 relative z-50 rounded-md shadow-xl overflow-hidden", {
                "bg-primary": theme === "light",
                "bg-primary-dark": theme !== "light",
            }),
        [theme]
    );

    const baseModalContentConfig = useMemo(
        () =>
            classNames("flex flex-col items-center justify-center w-80 h-60", {
                "bg-secondary": theme === "light",
                "bg-secondary-dark": theme !== "light",
            }),
        [theme]
    );

    if (!isOpen) return null;
    return (
        <div className="flex justify-center items-center fixed inset-0 z-40">
            <div className="backdrop-blur-[2px] fixed inset-0" />
            <div className={baseModalContainerConfig}>
                <div className={baseModalContentConfig}>
                    <button
                        className="absolute text-text-color/70 hover:text-text-color cursor-pointer top-4 right-4 text-2xl hover:scale-125 p-0 transition-all ease-in-out duration-500"
                        onClick={onClose}
                    >
                        X
                    </button>
                    <h1>{title}</h1>
                    <h5>{description}</h5>
                </div>
            </div>
        </div>
    );
}

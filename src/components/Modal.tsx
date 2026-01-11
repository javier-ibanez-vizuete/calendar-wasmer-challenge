type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
};

export function Modal({
    isOpen = true,
    onClose,
    title = "Event Title",
    description = "Event description",
}: ModalProps) {
    if (!isOpen) return null;
    return (
        <div className="flex justify-center items-center fixed inset-0 z-40">
            <div className="backdrop-blur-xs fixed inset-0" />
            <div className="bg-accent-background pl-8 realtive z-50">
                <div className="bg-white flex">
                    <div className="flex flex-col relative items-center justify-center min-w-80 min-h-80">
                        <button
                            className="absolute top-4 right-4 text-2xl hover:scale-125 transition-all ease-in-out duration-300"
                            onClick={onClose}
                        >
                            X
                        </button>
                        <h1>{title}</h1>
                        <h5>{description}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

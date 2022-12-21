import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react"

export type IToastProp = {
    position?: IToastPosition,
    onInit: (e: IToastHandler) => void;
};
export type IToastHandler = {
    Info: (title: string, content: any, timeout?: number) => void;
    Success: (title: string, content: any, timeout?: number) => void;
    Error: (title: string, content: any, timeout?: number) => void;
    Warning: (title: string, content: any, timeout?: number) => void;
};

type IToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
type IToastType = 'error' | 'success' | 'warning' | 'info';
type IToastInfo = {
    id: string;
    title: string;
    type?: IToastType;
    content: any;
    timeout?: number;
    timer?: number;
    className?: string;
};
export const Toast = (prop: IToastProp) => {
    const [toasts, setToasts] = useState<IToastInfo[]>([]);

    useEffect(() => {

    }, [toasts]);

    if (prop.onInit) {
        prop.onInit({
            Info: (title: string, content: any, timeout: 5000) => { createAlert('info', title, content, timeout) },
            Success: (title: string, content: any, timeout: 5000) => { createAlert('success', title, content, timeout) },
            Error: (title: string, content: any, timeout: 5000) => { createAlert('error', title, content, timeout) },
            Warning: (title: string, content: any, timeout: 5000) => { createAlert('warning', title, content, timeout) },
        } as IToastHandler);
    }

    const createAlert = (type: IToastType, title: string, content: any, timeout: 5000) => {
        if (!timeout) timeout = 5000;
        const id = "toaster_" + Math.random().toString().replace(".", "");
        const className = getClass(type);

        const toastInfo: IToastInfo = { type, title, content, id, timeout, className };
        if (timeout > 0) {
            toastInfo.timer = setTimeout(() => {
                document.getElementById(id)?.remove();
            }, timeout);
        }
        setToasts([...toasts, toastInfo]);

    }

    const getClass = (type: IToastType) => {
        if (type == 'success') return 'bg-green-100 border border-green-200 text-green-500'
        if (type == 'warning') return 'bg-yellow-100 border border-yellow-200 text-sm text-gray-100'
        if (type == 'error') return 'bg-red-100 border border-red-200 text-sm text-red-500'
        return 'bg-white border border-white-200 text-white-500';
    }

    const getPosition = () => {
        if (prop.position == 'top-left') return 'top-0 left-0';
        if (prop.position == 'top-right') return 'top-0 right-0';

        if (prop.position == 'bottom-left') return 'bottom-0 left-0';
        if (prop.position == 'bottom-center') return 'bottom-0 left-1/2 -translate-x-1/2';
        if (prop.position == 'bottom-right') return 'bottom-0 right-0';

        return 'top-0 left-1/2 -translate-x-1/2';
    }
    return <>
        <div className={"absolute " + getPosition()}>
            {toasts.length > 0 ? toasts.map((obj, i) => (
                <div key={i} id={obj.id} className={"max-w-xs animate-in fade-in zoom-in m-2 rounded-md shadow-lg " + obj.className} role="alert">
                    <div className="flex p-2">
                        <div className="flex-shrink-0">
                            {obj.type == 'success' ? (<>
                                <svg className="h-4 w-4   mt-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </svg>
                            </>) : null}
                            {obj.type == 'warning' ? (
                                <>
                                    <svg className="h-4 w-4   mt-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z" transform="translate(0 0)" />
                                        <rect x="15" y="8" width="2" height="11" />
                                        <path d="M16,22a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,16,22Z" transform="translate(0 0)" />
                                        <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" style={{ fill: 'none' }} width="32" height="32" />
                                    </svg>
                                </>
                            ) : null}
                            {obj.type == 'error' ? (
                                <>
                                    <svg className="h-4 w-4   mt-1" width="16px" height="16px" viewBox="0 0 24 24" role="img"
                                        xmlns="http://www.w3.org/2000/svg" aria-labelledby="errorIconTitle" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="currentColor">
                                        <path d="M12 8L12 13" />
                                        <line x1="12" y1="16" x2="12" y2="16" />
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                </>
                            ) : null}
                            {obj.type == 'info' ? (
                                <>
                                    <svg className="h-4 w-4   mt-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg>
                                </>
                            ) : null}
                        </div>
                        <div className="ml-3">
                            <h3 className="font-normal  text-current ">
                                {obj.title}
                            </h3>
                            <p className="text-xs  text-current ">
                                {obj.content}
                            </p>
                        </div>
                        <div className="ml-10">
                            <button type="button" onClick={e => {
                                clearTimeout(obj.timer);
                                document.getElementById(obj.id)?.remove();
                            }} className="inline-flex flex-shrink-0 justify-center items-center h-2 w-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none text-sm " >
                                <span className="sr-only">Close</span>
                                <svg className="w-3.5 h-3.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )) : null}

        </div>
    </>

}; 
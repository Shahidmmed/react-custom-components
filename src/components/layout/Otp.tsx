import { ReactEventHandler, useState } from "react";

type IProp = {
    length?: number;
    onChange?: (otp: string) => void;
};
export const Otp: React.FC<IProp> = ({ ...prop }) => {
    const [otp, setOtp] = useState<string[]>([]);

    const otpLength = new Array(prop.length ?? 6).fill(0);

    const focusInOut = (e: any) => {
        var inp = e.target as HTMLInputElement;
        if ((inp.attributes.getNamedItem("type"))?.value == "text") {
            inp.setAttribute("type", "password");
        } else {
            inp.setAttribute("type", "text");
        }
    }

    const onOtpInputKeyUp = (e: any) => {
        if (e.code == "Backspace" || e.keyCode == 37) {
            e.target.value = "";
            var prev = (e.target as HTMLDivElement)?.parentElement?.previousElementSibling?.querySelector('input');
            if (prev) prev.focus()
        } else {
            var next = (e.target as HTMLDivElement)?.parentElement?.nextElementSibling?.querySelector('input')
            if (next) next.focus();

            if (next == null) (document.querySelector("#input-05") as HTMLInputElement).blur();
        }
    }

    const onOtpInputChange = (e: any) => {
        const { dataset, value } = e.target;

        let currOtp = [...otp];
        currOtp[dataset.index] = value;
        setOtp(currOtp);
        if (prop?.onChange) prop?.onChange(currOtp.join(''));
    }
    return <>
        <div className="otp-input flex flex-auto">
            {Array.from(Array(prop.length).keys()).map(x => (
                <div className="p-2" key={x}>
                    <input type="password"
                        id={"input-0" + x} value={otp[x]} data-index={x}
                        onFocus={focusInOut} onBlur={focusInOut} onKeyUp={onOtpInputKeyUp} onChange={onOtpInputChange} maxLength={1} minLength={1}
                        className="form-control block w-full text-center px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                </div>
            ))}
        </div>
    </>;
};
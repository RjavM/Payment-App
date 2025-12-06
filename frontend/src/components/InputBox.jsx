

import { useState } from "react";

export const InputBox = ({label, placeholder, onChange, type = "text", value}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";
    const inputType = isPasswordField && !showPassword ? "password" : "text";

    return (
        <>
            <div className="text-md font-roboto font-md text-left pb-1 pl-4 pt-2.5"> 
                {label}
            </div>
            <div className="relative w-5/6 ml-4">
                <input
                    type={isPasswordField ? inputType : type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="font-roboto w-full px-2 py-1 pl-4 rounded border border-black-500 outline-slate-500 pr-10"
                />
                {isPasswordField && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                )}
            </div>
        </>
    );
}

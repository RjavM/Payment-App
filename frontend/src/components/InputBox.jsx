

import { useMemo, useState } from "react";

export const InputBox = ({
    label,
    placeholder,
    onChange,
    type = "text",
    value,
    id,
    helperText = "",
    error = ""
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";
    const inputType = isPasswordField && !showPassword ? "password" : "text";
    const generatedId = useMemo(() => {
        if (id) return id;
        if (!label) return undefined;
        return label.toLowerCase().replace(/\s+/g, "-");
    }, [id, label]);
    const helperId = helperText || error ? `${generatedId}-helper` : undefined;

    return (
        <div className="flex flex-col gap-1 w-full">
            {label && (
                <label
                    htmlFor={generatedId}
                    className="text-sm font-medium text-slate-600 pl-1"
                >
                    {label}
                </label>
            )}
            <div className="relative w-full">
                <input
                    id={generatedId}
                    type={isPasswordField ? inputType : type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    aria-invalid={Boolean(error)}
                    aria-describedby={helperId}
                    className={`w-full rounded-xl border px-4 py-3 text-sm shadow-sm transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 ${
                        error ? "border-red-400" : "border-slate-200"
                    } ${isPasswordField ? "pr-12" : ""}`}
                />
                {isPasswordField && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 text-sm font-semibold text-brand-600 hover:text-brand-800"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                )}
            </div>
            {(helperText || error) && (
                <p
                    id={helperId}
                    className={`text-xs pl-1 ${
                        error ? "text-red-500" : "text-slate-500"
                    }`}
                >
                    {error || helperText}
                </p>
            )}
        </div>
    );
}

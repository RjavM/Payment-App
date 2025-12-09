const VARIANT_STYLES = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-200",
    secondary: "bg-white text-brand-700 border border-brand-200 hover:text-brand-900 hover:border-brand-400 focus-visible:ring-brand-100",
    ghost: "bg-transparent text-slate-700 hover:text-brand-600 focus-visible:ring-slate-200",
    destructive: "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-200"
};

export const Button = ({
    label,
    onClick,
    type = "button",
    variant = "primary",
    className = "",
    disabled = false
}) => {
    const variantClass = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;
    const stateClass = disabled ? "opacity-60 cursor-not-allowed" : "";
    const composedClass = [
        "inline-flex items-center justify-center rounded-lg px-5 py-3 text-base font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
        "w-full sm:w-auto",
        variantClass,
        stateClass,
        className
    ].filter(Boolean).join(" ");

    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={composedClass}
        >
            {label}
        </button>
    );
}

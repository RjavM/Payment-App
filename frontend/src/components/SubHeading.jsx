export const SubHeading = ({ label, className = "" }) => {
    return (
        <p className={`text-base text-slate-500 max-w-2xl ${className}`}>
            {label}
        </p>
    );
}

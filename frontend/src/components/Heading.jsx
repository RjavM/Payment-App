export const Heading = ({ label, className = "" }) => {
    return (
        <h1 className={`text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight ${className}`}>
            {label}
        </h1>
    );
}   

import { Link } from "react-router-dom"

export const BottomWarning = ({label, to, LinkText}) => {
    return <div className="py-2 text-sm text-center text-slate-500">
        <span>{label}</span>
        <Link className="pl-1 font-semibold text-brand-600 hover:text-brand-800" to={to}>
            {LinkText}
        </Link>
    </div>
}

import { Link } from "react-router-dom"

export const BottomWarning = ({label, to, LinkText}) => {
    return <div className="font-roboto py-2 text-sm flex justify-center">
        <div>
            {label}
        </div>
        <Link className="pointer underline hover:font-bold pl-1 cursor-pointer" to={to}>
            {LinkText}
        </Link>
    </div>
}
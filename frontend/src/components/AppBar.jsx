import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PaymeLogo from './payme.svg';

export const AppBar = ({ user }) => {
    const displayName = user ? `${user.firstname} ${user.lastname}` : "Guest";
    const initial = user?.firstname?.[0]?.toUpperCase() || user?.lastname?.[0]?.toUpperCase() || "U";
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const handleLogout = () => {
        setMenuOpen(false);
        localStorage.removeItem("token");
        navigate("/signin", { replace: true });
    };

    return (
        <div className="shadow h-14 flex justify-between px-4 sm:px-6 relative">
            <div className="flex flex-col justify-center h-full font-roboto">
                <Link to={"/Dashboard"}>
                    <img src={PaymeLogo} alt="PayMe" className="h-9 hover:cursor-pointer" />
                </Link>
            </div>
            <div className='flex'>
                <div className='flex flex-col justify-center h-full mr-4'>
                    Hello,&nbsp;<span className="font-semibold">{displayName}</span>
                </div>
                <button
                    type="button"
                    onClick={toggleMenu}
                    className='rounded-full h-12 w-12 bg-slate-200 flex justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
                >
                    <div className='flex flex-col justify-center h-full text-xl '>
                        {initial}
                    </div>
                </button>
                {menuOpen && (
                    <div className="absolute right-4 top-16 bg-white border border-slate-200 rounded-md shadow-md w-40 z-10">
                        <button
                            onClick={() => {
                                setMenuOpen(false);
                                navigate("/Dashboard");
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-slate-100"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

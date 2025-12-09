import { Link } from 'react-router-dom';
import PaymeLogo from './payme.svg';

export const LoginTopBar = () => {
    return <div className="border-b border-slate-100 bg-white/80 backdrop-blur py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
            <div className="flex items-center gap-3">
                <Link to={"/"}>
                    <img src={PaymeLogo} alt="PayMe" className="h-10 hover:opacity-90" />
                </Link>
                <div>
                    <p className="text-sm font-semibold text-slate-900">PayMe</p>
                    <p className="text-xs text-slate-500">Modern payments</p>
                </div>
            </div>
            <Link to="/signin" className="text-sm text-slate-500 hover:text-brand-600">
                Need help?
            </Link>
        </div>
    </div>
}

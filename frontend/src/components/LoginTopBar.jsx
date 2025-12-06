import { Link } from 'react-router-dom';
import PaymeLogo from './payme.svg';

export const LoginTopBar = () => {
    return <div className="shadow h-14 flex justify-center pl-6 pr-6">
        <div className="flex flex-col justify-center h-full ml-4 font-roboto">
            <Link to={"/"}>
                <img src={PaymeLogo} alt="PayMe" className="h-9 hover:cursor-pointer" />
            </Link>
        </div>
    </div>
}

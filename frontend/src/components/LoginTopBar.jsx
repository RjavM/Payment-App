import { Link } from 'react-router-dom';
import PaytmImage from './paytm-image.png';

export const LoginTopBar = () => {
    return <div className="shadow h-14 flex justify-center pl-6 pr-6">
        <div className="flex flex-col justify-center h-full ml-4 font-roboto">
            <Link to={"/"}><img src={PaytmImage} alt="PayTM" className="h-10 mx-auto hover:cursor-pointer"></img></Link>
        </div>
    </div>
}
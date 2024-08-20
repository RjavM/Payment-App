import { Link } from 'react-router-dom';
import PaytmImage from './paytm-image.png';

export const AppBar = () => {
    return <div className="shadow h-14 flex justify-between pl-6 pr-6">
        <div className="flex flex-col justify-center h-full ml-4 font-roboto">
            <Link to={"/"}><img src={PaytmImage} alt="PayTM" className="h-10 mx-auto hover:cursor-pointer"></img></Link>
        </div>
        <div className='flex'>
            <div className='flex flex-col justify-center h-full mr-4'>
                Hello, 
            </div>
            <div className='rounded-full h-12 w-12 bg-slate-200 flex justify-center'>
                <div className='flex flex-col justify-center h-full text-xl '>
                    U
                </div>
            </div>
        </div>
    </div>
}
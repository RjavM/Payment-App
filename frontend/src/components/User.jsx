
export const User = ({user, label, onClick}) => {
    return <div className="flex justify-between">
            <div className="flex items-center space-x-4">
                <div className='rounded-full h-12 w-12 bg-slate-200 flex justify-center'>
                        <div className='flex flex-col justify-center h-full text-xl '>
                            {user.firstname[0]}
                        </div>
                </div>
                <div className="text-xl font-roboto">
                    {user.firstName} {user.lastName}
                </div>
            </div>
            <div>
                <button onClick={onClick} type="button" className="font-roboto text-white bg-gray-800 hover:bg-slate-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{label}</button>
            </div>
        </div>
}
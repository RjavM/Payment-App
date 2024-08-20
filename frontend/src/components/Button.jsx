

export const Button = ({label, onClick}) => {
    return <div className="font-roboto">
        <button onClick={onClick} type="button" className="w-5/6 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring- font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2  dark:focus:ring-gray-700 dark:border-gray-700">{label}</button>
    </div>
}
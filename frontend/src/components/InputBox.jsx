

export const InputBox = ({label, placeholder, onChange}) => {
    return <>
        <div className="text-md font-roboto font-md text-left pb-1 pl-4 pt-2.5"> 
            {label}
        </div>
        <input onChange={onChange} placeholder={placeholder} className=" font-roboto w-5/6 px-2 py-1 pl-4 rounded border border-black-500 outline-slate-500"></input>
    </>
}
import { User } from "./User"
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useEffect} from "react"


export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();

    useEffect(() => { 
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
        .then(res => {
            setUsers(res.data.user)
        })
        
    }, [filter])

    return <div className="pl-10">
        <div className="font-bold font-roboto mt-6 text-2xl justify-center">
            Users
        </div>
        <div className="my-2 pr-3">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} label={"Send Money"} onClick={() => {navigate("/send?id="+user._id+"&name=" + user.firstName)}}/>)}
        </div>
    </div>
}
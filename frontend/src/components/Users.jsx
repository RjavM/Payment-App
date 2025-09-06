import { User } from "./User"
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useEffect} from "react"


export const Users = ({ onTransferSuccess }) => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => { 
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setUsers(res.data.user || []);
            } catch (error) {
                if (error.response?.status === 401) {
                    setError("Please sign in to view users");
                    navigate("/signin");
                } else if (error.response?.status === 500) {
                    setError("Server error. Please try again later.");
                } else {
                    setError("Failed to load users");
                }
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUsers();
    }, [filter, navigate])

    return <div className="pl-10">
        <div className="font-bold font-roboto mt-6 text-2xl justify-center">
            Users
        </div>
        <div className="my-2 pr-3">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
            </div>
        )}
        
        {loading && (
            <div className="text-center py-4">
                <div className="text-lg">Loading users...</div>
            </div>
        )}
        
        {!loading && !error && users.length === 0 && (
            <div className="text-center py-4 text-gray-500">
                No users found
            </div>
        )}
        
        {!loading && !error && users.length > 0 && (
            <div>
                {users.map(user => <User user={user} label={"Send Money"} onClick={() => {navigate("/send?id="+user._id+"&name=" + user.firstname)}}/>)}
            </div>
        )}
    </div>
}
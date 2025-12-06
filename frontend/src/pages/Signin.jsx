import { BottomWarning } from "../components/BottomWarning.jsx"
import { Button } from "../components/Button.jsx"
import { Heading } from "../components/Heading.jsx"
import { InputBox } from "../components/InputBox.jsx"
import { SubHeading } from "../components/SubHeading.jsx"
import { useState } from "react"
import axios from 'axios'
import { LoginTopBar } from "../components/LoginTopBar.jsx"
import { useNavigate } from "react-router-dom"
import { API_ENDPOINTS, handleApiError } from "../config/api.js"




export const Signin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    return <>
        <LoginTopBar />
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-md bg-white w-80 text-center">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your information to sign in."} />
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}
                    <InputBox onChange={(e) => {
                        setUsername(e.target.value)
                        console.log(e.target.value);
                    }} label={"Email"} placeholder={"JohnDoe@email.com"} />
                    <InputBox 
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            console.log(e.target.value);
                        }} 
                        label={"Password"} 
                        placeholder={"ExamplePass@123"} 
                    />
                    <div className="pt-4">
                        <Button onClick={async() => {
                            setError("");
                            setLoading(true);
                            
                            try {
                                const res = await axios.post(API_ENDPOINTS.SIGNIN, {
                                    username,
                                    password
                                });
                                
                                if (res.data.token) {
                                    localStorage.setItem("token", res.data.token);
                                    navigate("/Dashboard");
                                } else {
                                    setError("Sign in failed. Please try again.");
                                }
                            } catch (error) {
                                const errorInfo = handleApiError(error);
                                setError(errorInfo.message);
                            } finally {
                                setLoading(false);
                            }
                        }} label={loading ? "Signing in..." : "Sign in"} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} LinkText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    </>

}

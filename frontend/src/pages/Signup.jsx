import { BottomWarning } from "../components/BottomWarning.jsx"
import { Button } from "../components/Button.jsx"
import { Heading } from "../components/Heading.jsx"
import { InputBox } from "../components/InputBox.jsx"
import { SubHeading } from "../components/SubHeading.jsx"
import { useState } from 'react'
import axios from 'axios'
import { LoginTopBar } from "../components/LoginTopBar.jsx"
import { useNavigate } from "react-router-dom"




export const Signup = () => {

    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
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
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your information to create an account."} />
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}
                    <InputBox onChange={(e) => {
                        setfirstname(e.target.value);
                    }} label={"First Name"} placeholder={"John"} /> {console.log(firstname)}
                    <InputBox onChange={(e) => {
                        setlastname(e.target.value);
                    }} label={"Last Name"} placeholder={"Doe"} />{console.log(lastname)}
                    <InputBox onChange={(e) => {
                        setUsername(e.target.value);
                    }} label={"Email"} placeholder={"JohnDoe@email.com"} />{console.log(username)}
                    <InputBox onChange={(e) => {
                        setPassword(e.target.value);
                    }} label={"Password"} placeholder={"ExamplePass@123"} />{console.log(password)}
                    <div className="pt-4">
                        <Button onClick={async() => {
                            setError("");
                            setLoading(true);
                            
                            // Basic validation
                            if (!firstname || !lastname || !username || !password) {
                                setError("All fields are required");
                                setLoading(false);
                                return;
                            }
                            
                            if (password.length < 6) {
                                setError("Password must be at least 6 characters long");
                                setLoading(false);
                                return;
                            }
                            
                            try {
                                const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                    username,
                                    firstname,
                                    lastname,
                                    password
                                });
                                
                                if (res.data.token) {
                                    localStorage.setItem("token", res.data.token);
                                    navigate("/Dashboard");
                                } else {
                                    setError("Sign up failed. Please try again.");
                                }
                            } catch (error) {
                                if (error.response?.data?.msg) {
                                    setError(error.response.data.msg);
                                } else if (error.response?.status === 400) {
                                    setError("Invalid input. Please check your information.");
                                } else if (error.response?.status === 500) {
                                    setError("Server error. Please try again later.");
                                } else {
                                    setError("Network error. Please check your connection.");
                                }
                            } finally {
                                setLoading(false);
                            }
                        }} label={loading ? "Creating account..." : "Sign up"} />
                    </div>
                    <BottomWarning label={"Already have an account?"} LinkText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    </>

}
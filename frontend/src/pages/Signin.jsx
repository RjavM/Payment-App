import { BottomWarning } from "../components/BottomWarning.jsx"
import { Button } from "../components/Button.jsx"
import { Heading } from "../components/Heading.jsx"
import { InputBox } from "../components/InputBox.jsx"
import { SubHeading } from "../components/SubHeading.jsx"
import { useState } from "react"
import axios from 'axios'
import { LoginTopBar } from "../components/LoginTopBar.jsx"
import { useNavigate } from "react-router-dom"




export const Signin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <>
        <LoginTopBar />
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-md bg-white w-80 text-center">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your information to sign in."} />
                    <InputBox onChange={(e) => {
                        setUsername(e.target.value)
                        console.log(e.target.value);
                    }} label={"Email"} placeholder={"JohnDoe@email.com"} />
                    <InputBox onChange={(e) => {
                        setPassword(e.target.value)
                        console.log(e.target.value);
                    }} label={"Password"} placeholder={"ExamplePass@123"} />
                    <div className="pt-4">
                        <Button onClick={async() => {
                            const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                username,
                                password
                            });
                            console.log(res.data.token);
                            localStorage.setItem("token", res.data.token)
                            navigate("/Dashboard");
                        }} label={"Sign in"} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} LinkText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    </>

}
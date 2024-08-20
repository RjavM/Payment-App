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

    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    return <>
        <LoginTopBar />
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-md bg-white w-80 text-center">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your information to create an account."} />
                    <InputBox onChange={(e) => {
                        setfirstName(e.target.value);
                    }} label={"First Name"} placeholder={"John"} /> {console.log(firstName)}
                    <InputBox onChange={(e) => {
                        setlastName(e.target.value);
                    }} label={"Last Name"} placeholder={"Doe"} />{console.log(lastName)}
                    <InputBox onChange={(e) => {
                        setUsername(e.target.value);
                    }} label={"Email"} placeholder={"JohnDoe@email.com"} />{console.log(username)}
                    <InputBox onChange={(e) => {
                        setPassword(e.target.value);
                    }} label={"Password"} placeholder={"ExamplePass@123"} />{console.log(password)}
                    <div className="pt-4">
                        <Button onClick={async() => {
                            const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                username,
                                firstName,
                                lastName,
                                password
                            });
                            localStorage.setItem("token", res.data.token)
                            navigate("/Dashboard");
                        }} label={"Sign up"} />
                    </div>
                    <BottomWarning label={"Already have an account?"} LinkText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    </>

}
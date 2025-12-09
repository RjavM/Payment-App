import { BottomWarning } from "../components/BottomWarning.jsx";
import { Button } from "../components/Button.jsx";
import { Heading } from "../components/Heading.jsx";
import { InputBox } from "../components/InputBox.jsx";
import { SubHeading } from "../components/SubHeading.jsx";
import { useState } from "react";
import axios from "axios";
import { LoginTopBar } from "../components/LoginTopBar.jsx";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS, handleApiError } from "../config/api.js";

const SIGNIN_FEATURES = [
    "Real-time fraud monitoring",
    "Instant notifications on every transfer",
    "Customizable spending controls"
];

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
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
    };

    return (
        <>
            <LoginTopBar />
            <div className="bg-gradient-to-br from-surface via-white to-surface py-12">
                <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
                    <div className="hidden rounded-3xl bg-slate-900/95 p-10 text-white shadow-2xl md:block">
                        <p className="text-sm uppercase tracking-[0.3em] text-white/70">
                            Welcome back
                        </p>
                        <h2 className="mt-4 text-4xl font-semibold">
                            Jump right into your secure dashboard.
                        </h2>
                        <p className="mt-4 text-white/70">
                            Pay bills, reimburse teammates, and review insights from anywhere in the world.
                        </p>
                        <div className="mt-8 space-y-4 text-sm text-white/80">
                            {SIGNIN_FEATURES.map((feature, index) => (
                                <div key={feature} className="flex items-center gap-3">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-100 bg-white/90 p-8 backdrop-blur">
                        <div className="space-y-2 text-center md:text-left">
                            <Heading label="Sign in to PayMe" className="text-3xl" />
                            <SubHeading label="We missed you! Enter your credentials to continue." />
                        </div>

                        {error && (
                            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        <div className="mt-6 space-y-4">
                            <InputBox
                                label="Email"
                                placeholder="you@company.com"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                helperText="Use the email you signed up with."
                            />
                            <InputBox
                                type="password"
                                label="Password"
                                placeholder="**********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                helperText="Minimum 6 characters"
                            />
                        </div>

                        <div className="mt-6">
                            <Button
                                onClick={handleSubmit}
                                label={loading ? "Signing in..." : "Sign in"}
                                disabled={loading}
                                className="w-full"
                            />
                        </div>

                        <div className="mt-6">
                            <BottomWarning label="Don't have an account?" LinkText="Sign up" to="/signup" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

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

export const Signup = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setError("");
        setLoading(true);

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
            const res = await axios.post(API_ENDPOINTS.SIGNUP, {
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
                <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
                    <div className="rounded-3xl border border-slate-100 bg-white/90 p-8 backdrop-blur">
                        <div className="space-y-2 text-center md:text-left">
                            <Heading label="Create your PayMe account" />
                            <SubHeading label="Join thousands of teams moving money with confidence." />
                        </div>

                        {error && (
                            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <InputBox
                                label="First name"
                                placeholder="Jordan"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                            <InputBox
                                label="Last name"
                                placeholder="Lopez"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>

                        <div className="mt-4 space-y-4">
                            <InputBox
                                label="Email"
                                placeholder="you@company.com"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                helperText="We'll use this to send receipts and notifications."
                            />
                            <InputBox
                                type="password"
                                label="Password"
                                placeholder="Create a strong password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                helperText="At least 6 characters"
                            />
                        </div>

                        <div className="mt-6">
                            <Button
                                onClick={handleSubmit}
                                label={loading ? "Creating account..." : "Create account"}
                                disabled={loading}
                                className="w-full"
                            />
                        </div>

                        <div className="mt-6">
                            <BottomWarning label="Already have an account?" LinkText="Sign in" to="/signin" />
                        </div>
                    </div>

                    <div className="hidden flex-col gap-6 rounded-3xl bg-slate-900/95 p-10 text-white shadow-2xl md:flex">
                        <p className="pill bg-white/10 text-white">Why teams choose PayMe</p>
                        <ul className="space-y-5 text-white/80">
                            <li>- Shoulder-to-shoulder onboarding from our success team</li>
                            <li>- Unlimited transfers with advanced approval routing</li>
                            <li>- Real-time compliance monitoring and audit logs</li>
                        </ul>
                        <div className="rounded-2xl bg-white/10 p-6">
                            <p className="text-sm uppercase tracking-wide text-white/60">
                                Customer spotlight
                            </p>
                            <p className="mt-3 text-xl font-semibold">
                                "PayMe cut our reimbursement cycle from weeks to minutes."
                            </p>
                            <p className="mt-4 text-sm text-white/60">- Kelvin, Director of Ops</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

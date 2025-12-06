
import { Link } from "react-router-dom";
import { Button } from "../components/Button.jsx";
import { Heading } from "../components/Heading.jsx";
import { SubHeading } from "../components/SubHeading.jsx";
import PaymeLogo from "../components/payme.svg";

export const LandingPage = () => {
    return (
        <div className="bg-slate-300 h-screen flex flex-col">
            {/* Header */}
            <div className="shadow h-14 flex justify-between pl-6 pr-6 bg-white">
                <div className="flex flex-col justify-center h-full ml-4 font-roboto">
                    <img src={PaymeLogo} alt="PayMe" className="h-12" />
                </div>
                <div className='flex items-center space-x-4'>
                    <Link to="/signin">
                        <Button label="Sign In" />
                    </Link>
                    <Link to="/signup">
                        <Button label="Sign Up" />
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-4xl mx-auto px-8">
                    <Heading label="Welcome to PayMe" />
                    <SubHeading label="Your trusted digital wallet for seamless money transfers" />
                    
                    <div className="mt-8 space-y-4">
                        <div className="grid md:grid-cols-3 gap-6 mt-12">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-2">Fast Transfers</h3>
                                <p className="text-gray-600">Send money instantly to anyone, anywhere</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                                <p className="text-gray-600">Bank-grade security for all your transactions</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
                                <p className="text-gray-600">Track your balance and transaction history</p>
                            </div>
                        </div>
                        
                        <div className="mt-12 space-x-4">
                            <Link to="/signup">
                                <Button label="Get Started" />
                            </Link>
                            <Link to="/signin">
                                <Button label="Sign In" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-white py-4 text-center text-gray-600">
                <p>&copy; 2024 PayMe. All rights reserved.</p>
            </div>
        </div>
    );
}

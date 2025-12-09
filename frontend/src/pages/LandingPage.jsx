
import { Link } from "react-router-dom";
import { Button } from "../components/Button.jsx";
import { Heading } from "../components/Heading.jsx";
import { SubHeading } from "../components/SubHeading.jsx";
import PaymeLogo from "../components/payme.svg";

const FEATURES = [
    {
        title: "Instant transfers",
        description: "Move money in seconds with 24/7 real-time rails.",
        iconLabel: "FT"
    },
    {
        title: "Bank-grade security",
        description: "Multi-factor auth, biometric unlock, and end-to-end encryption.",
        iconLabel: "SEC"
    },
    {
        title: "Smart insights",
        description: "Get automatic categorization, alerts, and budgeting tips.",
        iconLabel: "IQ"
    }
];

const TESTIMONIALS = [
    { quote: "PayMe keeps our distributed team reimbursed instantly.", author: "Taylor - Ops Lead" },
    { quote: "The UX is clean, fast, and works on every device.", author: "Mara - Product Manager" }
];

export const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-surface via-white to-surface">
            <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/90 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                    <div className="flex items-center space-x-3">
                        <img src={PaymeLogo} alt="PayMe" className="h-10" />
                        <span className="text-lg font-semibold text-slate-900">PayMe</span>
                    </div>
                    <nav className="hidden gap-8 text-sm text-slate-500 md:flex">
                        <span>Features</span>
                        <span>Security</span>
                        <span>Support</span>
                    </nav>
                    <div className="flex items-center gap-3">
                        <Link to="/signin">
                            <Button label="Sign in" variant="ghost" className="w-auto" />
                        </Link>
                        <Link to="/signup">
                            <Button label="Create account" className="w-auto" />
                        </Link>
                    </div>
                </div>
            </header>

            <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16">
                <section className="grid items-center gap-12 md:grid-cols-2">
                    <div className="space-y-6 text-center md:text-left">
                        <div className="pill bg-brand-50 text-brand-700 mx-auto md:mx-0">
                            New - Modern payments for teams
                        </div>
                        <Heading label="A digital wallet you look forward to using." />
                        <SubHeading label="Send, request, and manage money with real-time security insights and gorgeous visuals built for modern teams." />
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link to="/signup" className="sm:w-auto w-full">
                                <Button label="Get started for free" className="w-full" />
                            </Link>
                            <Link to="/signin" className="sm:w-auto w-full">
                                <Button label="I already have an account" variant="secondary" className="w-full" />
                            </Link>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 md:justify-start">
                            <div>
                                <p className="text-2xl font-semibold text-slate-900">3M+</p>
                                <p>Transactions secured</p>
                            </div>
                            <div>
                                <p className="text-2xl font-semibold text-slate-900">4.9/5</p>
                                <p>User satisfaction</p>
                            </div>
                        </div>
                    </div>
                        <div className="relative">
                        <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white/80 p-6 backdrop-blur">
                            <div className="flex flex-col gap-6">
                                <div>
                                    <p className="text-sm text-slate-500">Available balance</p>
                                    <p className="text-4xl font-semibold text-slate-900">$12,845.22</p>
                                </div>
                                <div className="grid gap-4">
                                    <div className="rounded-2xl bg-brand-50 p-4">
                                        <p className="text-sm text-brand-600">Incoming transfer</p>
                                        <p className="text-lg font-semibold text-brand-900">+ $1,250.00</p>
                                        <p className="text-xs text-brand-700">Today - from Leah</p>
                                    </div>
                                    <div className="rounded-2xl bg-slate-900 p-4 text-white">
                                        <p className="text-sm text-white/70">Recurring payout</p>
                                        <p className="text-lg font-semibold">$2,400.00</p>
                                        <p className="text-xs text-white/60">Due in 2 days</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 w-48 -translate-x-1/2 rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-lg">
                            <p className="text-xs uppercase tracking-wide text-slate-500">Security</p>
                            <p className="text-sm font-semibold text-slate-900">Bank-grade TLS + biometric sign in</p>
                        </div>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-100 bg-white/70 p-8 backdrop-blur">
                    <div className="grid gap-8 md:grid-cols-3">
                        {FEATURES.map(({ title, description, iconLabel }) => (
                            <div key={title} className="rounded-2xl border border-slate-100 p-6">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-xs font-semibold tracking-wide text-brand-700">
                                    {iconLabel}
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                                <p className="mt-2 text-slate-500">{description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="grid gap-6 md:grid-cols-2">
                    {TESTIMONIALS.map(({ quote, author }) => (
                        <div key={author} className="rounded-3xl border border-slate-100 bg-white/80 p-6 backdrop-blur">
                            <p className="text-lg text-slate-700">&ldquo;{quote}&rdquo;</p>
                            <p className="mt-4 text-sm font-semibold text-slate-900">{author}</p>
                        </div>
                    ))}
                </section>
            </main>

            <footer className="border-t border-slate-100 bg-white py-6 text-center text-sm text-slate-500">
                &copy; {new Date().getFullYear()} PayMe. All rights reserved.
            </footer>
        </div>
    );
}

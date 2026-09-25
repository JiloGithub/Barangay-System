import { Head, Link ,usePage} from '@inertiajs/react'
import {
    Users,
    FileText,
    ClipboardList,
    Megaphone,
    ArrowRight,
    Shield,
} from 'lucide-react'

export default function Welcome({ laravelVersion, phpVersion }) {
    const { auth } = usePage().props
    const features = [
        {
            title: 'Resident Records',
            desc: 'Manage household and individual resident information in one place.',
            icon: Users,
        },
        {
            title: 'Document Requests',
            desc: 'Process clearances, certificates, and permits efficiently.',
            icon: FileText,
        },
        {
            title: 'Blotter Reports',
            desc: 'Record and track incidents and community complaints.',
            icon: ClipboardList,
        },
        {
            title: 'Announcements',
            desc: 'Publish and broadcast updates to the entire community.',
            icon: Megaphone,
        },
    ]

    return (
        <>
            <Head title="Welcome | Barangay Management System" />

            <div className="min-h-screen bg-neutral-50 text-black antialiased">
                {/* Header */}
                <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 shadow-sm backdrop-blur">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black shadow-sm">
                                <Shield className="h-5 w-5" strokeWidth={2.5} />
                            </div>
                            <div className="leading-tight">
                                <p className="text-base font-bold tracking-tight">
                                    Barangay Management
                                </p>
                                <p className="text-[10px] uppercase tracking-[0.25em] text-black/50">
                                    System
                                </p>
                            </div>
                        </div>

                        <nav className="flex items-center gap-6">
                            {auth?.user ? (
                                <Link
                                    href="/dashboard"
                                    className="rounded-lg border border-black bg-black px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-black hover:shadow-lg"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-sm font-medium text-black/70 transition-colors duration-200 hover:text-black"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="rounded-lg border border-black bg-black px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-black hover:shadow-lg"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero */}
                <main>
                    <section className="container mx-auto px-6 py-24 text-center md:py-32">
                        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-black/50">
                            Official Portal
                        </p>

                        <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
                            Barangay
                            <br />
                            Management System
                        </h1>

                        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-black/70">
                            A centralized platform for resident records, document
                            requests, barangay clearances, blotter reports, and
                            community announcements.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/dashboard"
                                className="group inline-flex items-center gap-2 rounded-lg border border-black bg-black px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-black hover:shadow-xl"
                            >
                                Get Started
                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/about"
                                className="rounded-lg border border-black bg-white px-8 py-3 font-semibold text-black shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-lg"
                            >
                                Learn More
                            </Link>
                        </div>
                    </section>

                    {/* Divider */}
                    <div className="container mx-auto px-6">
                        <div className="h-px w-full bg-black/10" />
                    </div>

                    {/* Features */}
                    <section className="container mx-auto px-6 py-20 md:py-28">
                        <div className="mb-12 text-center">
                            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
                                Everything you need
                            </h2>
                            <p className="mx-auto max-w-xl text-black/60">
                                Built to simplify daily barangay operations.
                            </p>
                        </div>

                        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature) => {
                                const Icon = feature.icon
                                return (
                                    <div
                                        key={feature.title}
                                        className="group rounded-2xl border border-black/10 bg-white p-8 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-black hover:bg-black hover:text-white hover:shadow-2xl"
                                    >
                                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-neutral-50 shadow-sm transition-colors duration-200 group-hover:border-white/20 group-hover:bg-white/10">
                                            <Icon
                                                className="h-6 w-6"
                                                strokeWidth={2}
                                            />
                                        </div>
                                        <h3 className="mb-3 text-lg font-bold">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed opacity-70">
                                            {feature.desc}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="container mx-auto px-6 pb-24">
                        <div className="rounded-3xl border border-black bg-black px-8 py-20 text-center text-white shadow-2xl md:py-24">
                            <h2 className="mx-auto mb-4 max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
                                Ready to serve your community better?
                            </h2>
                            <p className="mx-auto mb-10 max-w-xl text-white/70">
                                Sign in to access the barangay dashboard and manage
                                records, requests, and reports.
                            </p>

                            <Link
                                href={auth?.user ? '/dashboard' : '/login'}
                                className="group inline-flex items-center gap-2 rounded-lg border border-white bg-white px-8 py-3 font-semibold text-black shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-xl"
                            >
                                {auth?.user ? 'Go to Dashboard' : 'Sign In'}
                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="border-t border-black/10 bg-white shadow-inner">
                    <div className="container mx-auto px-6 py-8">
                        <div className="flex flex-col items-center justify-between gap-4 text-sm text-black/60 md:flex-row">
                            <p>
                                © {new Date().getFullYear()} Barangay Management
                                System
                            </p>
                            <p className="text-xs uppercase tracking-widest">
                                Laravel v{laravelVersion} · PHP v{phpVersion}
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
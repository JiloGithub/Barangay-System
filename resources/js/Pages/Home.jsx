import { Head, Link, usePage } from '@inertiajs/react'
import {
    Users,
    FileText,
    ClipboardList,
    Megaphone,
    LogOut,
    LayoutDashboard,
    Settings,
    ArrowRight,
} from 'lucide-react'

export default function Dashboard() {
    const { auth } = usePage().props

    const stats = [
        { label: 'Total Residents', value: '1,248', icon: Users, change: '+12 this month' },
        { label: 'Pending Requests', value: '23', icon: FileText, change: '5 urgent' },
        { label: 'Open Blotters', value: '7', icon: ClipboardList, change: '2 new today' },
        { label: 'Announcements', value: '14', icon: Megaphone, change: '3 scheduled' },
    ]

    const quickActions = [
        { label: 'Add Resident', href: '/residents/create', icon: Users },
        { label: 'New Request', href: '/requests/create', icon: FileText },
        { label: 'File Blotter', href: '/blotters/create', icon: ClipboardList },
        { label: 'Post Announcement', href: '/announcements/create', icon: Megaphone },
    ]

    const recentActivity = [
        { id: 1, text: 'New resident registered: Maria Santos', time: '5 min ago' },
        { id: 2, text: 'Barangay clearance approved for Juan Cruz', time: '22 min ago' },
        { id: 3, text: 'Blotter report filed: Noise complaint', time: '1 hour ago' },
        { id: 4, text: 'Announcement published: Barangay assembly', time: '3 hours ago' },
    ]

    return (
        <>
            <Head title="Dashboard | Barangay Management System" />

            <div className="min-h-screen bg-neutral-50 text-black antialiased">
                {/* Header */}
                <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 shadow-sm backdrop-blur">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black font-bold shadow-sm">
                                B
                            </div>
                            <div className="leading-tight">
                                <p className="text-base font-bold tracking-tight">
                                    Barangay Management
                                </p>
                                <p className="text-[10px] uppercase tracking-[0.25em] text-black/50">
                                    Dashboard
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden text-right md:block">
                                <p className="text-sm font-medium">{auth?.user?.name}</p>
                                <p className="text-xs text-black/50">{auth?.user?.email}</p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-neutral-100 font-semibold shadow-sm">
                                {auth?.user?.name?.charAt(0)?.toUpperCase() ?? '?'}
                            </div>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="inline-flex items-center gap-2 rounded-lg border border-black bg-black px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-black hover:shadow-lg"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-6 py-10">
                    {/* Welcome */}
                    <div className="mb-10">
                        <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
                            Welcome back, {auth?.user?.name?.split(' ')[0] ?? 'User'}
                        </h1>
                        <p className="text-black/60">
                            Here's what's happening in your barangay today.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon
                            return (
                                <div
                                    key={stat.label}
                                    className="group rounded-2xl border border-black/10 bg-white p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-black hover:shadow-xl"
                                >
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-neutral-50 shadow-sm transition-colors duration-200 group-hover:border-black/20 group-hover:bg-black group-hover:text-white">
                                            <Icon className="h-6 w-6" strokeWidth={2} />
                                        </div>
                                    </div>
                                    <p className="mb-1 text-sm font-medium text-black/60">
                                        {stat.label}
                                    </p>
                                    <p className="mb-2 text-3xl font-bold tracking-tight">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs text-black/40">{stat.change}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Quick Actions */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-md">
                                <div className="mb-6 flex items-center gap-3">
                                    <LayoutDashboard className="h-5 w-5" />
                                    <h2 className="text-lg font-bold">Quick Actions</h2>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {quickActions.map((action) => {
                                        const Icon = action.icon
                                        return (
                                            <Link
                                                key={action.label}
                                                href={action.href}
                                                className="group flex items-center justify-between rounded-xl border border-black/10 bg-neutral-50 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:bg-black hover:text-white hover:shadow-lg"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Icon className="h-5 w-5" strokeWidth={2} />
                                                    <span className="text-sm font-medium">
                                                        {action.label}
                                                    </span>
                                                </div>
                                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="lg:col-span-1">
                            <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-md">
                                <div className="mb-6 flex items-center gap-3">
                                    <ClipboardList className="h-5 w-5" />
                                    <h2 className="text-lg font-bold">Recent Activity</h2>
                                </div>
                                <ul className="space-y-5">
                                    {recentActivity.map((item) => (
                                        <li
                                            key={item.id}
                                            className="border-b border-black/5 pb-4 last:border-0 last:pb-0"
                                        >
                                            <p className="mb-1 text-sm leading-snug">
                                                {item.text}
                                            </p>
                                            <p className="text-xs text-black/40">
                                                {item.time}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Footer Action */}
                    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-md">
                        <div className="flex items-center gap-3">
                            <Settings className="h-5 w-5 text-black/60" />
                            <p className="text-sm text-black/60">
                                Manage your account settings and preferences.
                            </p>
                        </div>
                        <Link
                            href="/settings/profile"
                            className="rounded-lg border border-black bg-white px-5 py-2 text-sm font-medium text-black shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-lg"
                        >
                            Go to Settings
                        </Link>
                    </div>
                </main>
            </div>
        </>
    )
}
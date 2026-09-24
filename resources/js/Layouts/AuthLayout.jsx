import { Head, Link, usePage } from '@inertiajs/react'
import { useState } from 'react'
import {
    Users,
    FileText,
    ClipboardList,
    Megaphone,
    LogOut,
    LayoutDashboard,
    Settings,
    ArrowRight,
    Menu,
    X,
    UserCog,
    BarChart3,
} from 'lucide-react'

export default function AuthLayout({title,children}) {
    const { auth } = usePage().props
    const [sidebarOpen, setSidebarOpen] = useState(false)

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

    const navItems = [
        { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Residents', href: '/residents', icon: Users },
        { label: 'Requests', href: '/requests', icon: FileText },
        { label: 'Blotters', href: '/blotters', icon: ClipboardList },
        { label: 'Announcements', href: '/announcements', icon: Megaphone },
        { label: 'Reports', href: '/reports', icon: BarChart3 },
        { label: 'Settings', href: '/settings/profile', icon: Settings },
    ]

    const isActive = (href) => {
        if (typeof window !== 'undefined') {
            return window.location.pathname === href || window.location.pathname.startsWith(href + '/')
        }
        return false
    }

    return (
        <>
            <Head title={title}/>

            <div className="min-h-screen bg-neutral-50 text-black antialiased">
                {/* Mobile overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-black/10 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    <div className="flex h-full flex-col">
                        {/* Sidebar header */}
                        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
                            <Link href="/dashboard" className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black font-bold shadow-sm">
                                    B
                                </div>
                                <div className="leading-tight">
                                    <p className="text-sm font-bold tracking-tight">
                                        Barangay
                                    </p>
                                    <p className="text-[10px] uppercase tracking-[0.25em] text-black/50">
                                        Management
                                    </p>
                                </div>
                            </Link>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="rounded-lg p-1.5 hover:bg-neutral-100 lg:hidden"
                                aria-label="Close sidebar"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const active = isActive(item.href)
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${active
                                                ? 'bg-black text-white shadow-md'
                                                : 'text-black/70 hover:bg-neutral-100 hover:text-black'
                                            }`}
                                    >
                                        <Icon className="h-5 w-5" strokeWidth={2} />
                                        <span>{item.label}</span>
                                    </Link>
                                )
                            })}
                        </nav>

                        {/* Sidebar footer - user info */}
                        <div className="border-t border-black/10 p-4">
                            <div className="mb-3 flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-neutral-100 text-sm font-semibold shadow-sm">
                                    {auth?.user?.name?.charAt(0)?.toUpperCase() ?? '?'}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium">
                                       {auth?.user?.name}
                                    </p>
                                    <p className="truncate text-xs text-black/50">
                                        {auth?.user?.email}
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-black bg-black px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-black hover:shadow-lg"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Main content area */}
                <div className="lg:pl-64">
                    {/* Header */}
                    <header className="sticky top-0 z-30 border-b border-black/10 bg-white/90 shadow-sm backdrop-blur">
                        <div className="flex items-center justify-between px-6 py-4">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="rounded-lg p-2 hover:bg-neutral-100 lg:hidden"
                                    aria-label="Open sidebar"
                                >
                                    <Menu className="h-5 w-5" />
                                </button>
                                <div className="leading-tight">
                                    <p className="text-base font-bold tracking-tight">
                                        Dashboard
                                    </p>
                                    <p className="text-[10px] uppercase tracking-[0.25em] text-black/50">
                                        Overview
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
                            </div>
                        </div>
                    </header>

                    <main className="px-6 py-10">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}
import { Head, Link, usePage, useForm } from '@inertiajs/react'
import { useState } from 'react'
import AuthLayout from '../Layouts/AuthLayout'
import {
    Users,
    FileText,
    ClipboardList,
    Megaphone,
    LayoutDashboard,
    ArrowRight,
    BarChart3,
    UserPlus,
    Loader2,
    X,
} from 'lucide-react'

export default function Dashboard() {
    const { auth } = usePage().props
    const [showResidentModal, setShowResidentModal] = useState(false)

    const stats = [
        { label: 'Total Residents', value: '1,248', icon: Users, change: '+12 this month' },
        { label: 'Pending Requests', value: '23', icon: FileText, change: '5 urgent' },
        { label: 'Open Blotters', value: '7', icon: ClipboardList, change: '2 new today' },
        { label: 'Announcements', value: '14', icon: Megaphone, change: '3 scheduled' },
    ]

    const quickActions = [
        { label: 'Add Resident', onClick: () => setShowResidentModal(true), icon: Users },
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
        <AuthLayout title="Dashboard">

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
                                const content = (
                                    <>
                                        <div className="flex items-center gap-3">
                                            <Icon className="h-5 w-5" strokeWidth={2} />
                                            <span className="text-sm font-medium">
                                                {action.label}
                                            </span>
                                        </div>
                                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                                    </>
                                )

                                const className =
                                    'group flex items-center justify-between rounded-xl border border-black/10 bg-neutral-50 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:bg-black hover:text-white hover:shadow-lg'

                                return action.onClick ? (
                                    <button
                                        key={action.label}
                                        type="button"
                                        onClick={action.onClick}
                                        className={`${className} text-left`}
                                    >
                                        {content}
                                    </button>
                                ) : (
                                    <Link
                                        key={action.label}
                                        href={action.href}
                                        className={className}
                                    >
                                        {content}
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

            {/* Create Resident Modal */}
            {showResidentModal && (
                <CreateResidentModal onClose={() => setShowResidentModal(false)} />
            )}
        </AuthLayout>
    )
}

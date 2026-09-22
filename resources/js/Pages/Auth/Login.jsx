import { Head, Link, useForm } from '@inertiajs/react'
import { useEffect } from 'react'

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    useEffect(() => {
        return () => {
            reset('password')
        }
    }, [])

    const submit = (e) => {
        e.preventDefault()
        post('/login')
    }

    return (
        <>
            <Head title="Log in | Barangay Management System" />

            <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6 py-12">
                <div className="w-full max-w-md">
                    {/* Logo / Header */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-black font-bold text-xl shadow-sm">
                            B
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-black">
                            Welcome back
                        </h1>
                        <p className="mt-2 text-sm text-black/60">
                            Sign in to access the Barangay Management System.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-lg">
                        {/* Session Status */}
                        {status && (
                            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-1.5 block text-sm font-medium text-black"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    autoComplete="username"
                                    autoFocus
                                    required
                                    className="w-full rounded-lg border border-black/20 bg-white px-4 py-2.5 text-sm text-black shadow-sm transition-colors duration-200 placeholder:text-black/40 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                                    placeholder="juan@barangay.gov.ph"
                                />
                                {errors.email && (
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <div className="mb-1.5 flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-black"
                                    >
                                        Password
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href="/forgot-password"
                                            className="text-xs font-medium text-black/60 underline underline-offset-4 transition hover:text-black"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    autoComplete="current-password"
                                    required
                                    className="w-full rounded-lg border border-black/20 bg-white px-4 py-2.5 text-sm text-black shadow-sm transition-colors duration-200 placeholder:text-black/40 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center gap-3">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                    className="h-4 w-4 cursor-pointer rounded border-black/30 text-black focus:ring-2 focus:ring-black/20 focus:ring-offset-0"
                                />
                                <label
                                    htmlFor="remember"
                                    className="cursor-pointer text-sm text-black/70"
                                >
                                    Remember me
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg border border-black bg-black px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-black hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        {/* Register Link */}
                        <div className="mt-6 text-center text-sm text-black/60">
                            Don't have an account?{' '}
                            <Link
                                href="/register"
                                className="font-medium text-black underline underline-offset-4 transition hover:text-black/70"
                            >
                                Register
                            </Link>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <p className="mt-6 text-center text-xs text-black/40">
                        Authorized personnel only. All activity is logged.
                    </p>
                </div>
            </div>
        </>
    )
}
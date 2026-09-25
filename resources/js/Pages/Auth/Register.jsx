import { Head, Link, useForm } from '@inertiajs/react';


export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const submit = (e) => {
        e.preventDefault();


        
        post('/register', {
            onSuccess: () => reset(),
        })
    }

    return (
        <>
            <Head title="Register | Barangay Management System" />

            <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6 py-12">
                <div className="w-full max-w-md">
                    {/* Logo / Header */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-black font-bold text-xl shadow-sm">
                            B
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-black">
                            Create an account
                        </h1>
                        <p className="mt-2 text-sm text-black/60">
                            Register to access the Barangay Management System.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-lg">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-1.5 block text-sm font-medium text-black"
                                >
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    autoComplete="name"
                                    
                                    className="w-full rounded-lg border border-black/20 bg-white px-4 py-2.5 text-sm text-black shadow-sm transition-colors duration-200 placeholder:text-black/40 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                                    placeholder="Juan Dela Cruz"
                                />
                                {errors.name && (
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

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
                                <label
                                    htmlFor="password"
                                    className="mb-1.5 block text-sm font-medium text-black"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    autoComplete="new-password"
                                    
                                    className="w-full rounded-lg border border-black/20 bg-white px-4 py-2.5 text-sm text-black shadow-sm transition-colors duration-200 placeholder:text-black/40 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="mb-1.5 block text-sm font-medium text-black"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                    autoComplete="new-password"
                                    
                                    className="w-full rounded-lg border border-black/20 bg-white px-4 py-2.5 text-sm text-black shadow-sm transition-colors duration-200 placeholder:text-black/40 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                                    placeholder="••••••••"
                                />
                                {errors.password_confirmation && (
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg border border-black bg-black px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-black hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? 'Creating account...' : 'Create Account'}
                            </button>
                        </form>

                        {/* Login Link */}
                        <div className="mt-6 text-center text-sm text-black/60">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="font-medium text-black underline underline-offset-4 transition hover:text-black/70"
                            >
                                Log in
                            </Link>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <p className="mt-6 text-center text-xs text-black/40">
                        By registering, you agree to the barangay's data privacy policy.
                    </p>
                </div>
            </div>
        </>
    )
}
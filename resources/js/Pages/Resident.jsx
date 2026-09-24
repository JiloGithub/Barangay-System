import { Head, Link, usePage, useForm, router } from '@inertiajs/react'
import { useState } from 'react'
import AuthLayout from '../Layouts/AuthLayout'
import {
    UserPlus,
    Loader2,
    Eye,
    Pencil,
    Trash2,
    Search,
    X,
} from 'lucide-react'

export default function Residents({ residents = [] }) {
    const [modalOpen, setModalOpen] = useState(false)
    const [editingResident, setEditingResident] = useState(null)
    const [viewingResident, setViewingResident] = useState(null)
    const [deletingResident, setDeletingResident] = useState(null)
    const [search, setSearch] = useState('')

    const filtered = residents.filter((r) => {
        const q = search.toLowerCase()
        return (
            `${r.firstname} ${r.middlename ?? ''} ${r.lastname}`
                .toLowerCase()
                .includes(q) ||
            (r.contact_no ?? '').toLowerCase().includes(q) ||
            (r.occupation ?? '').toLowerCase().includes(q)
        )
    })

    const openAdd = () => {
        setEditingResident(null)
        setModalOpen(true)
    }

    const openEdit = (resident) => {
        setEditingResident(resident)
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
        setEditingResident(null)
    }

    const confirmDelete = () => {
        if (!deletingResident) return
        router.delete(`/residents/${deletingResident.id}`, {
            onFinish: () => setDeletingResident(null),
        })
    }

    return (
        <AuthLayout title="Residents">

            {/* Page title + Add */}
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="mb-1 text-3xl font-bold tracking-tight md:text-4xl">
                        Residents
                    </h1>
                    <p className="text-black/60">
                        Manage all registered residents in your barangay.
                    </p>
                </div>
                <button
                    onClick={openAdd}
                    className="inline-flex items-center gap-2 rounded-lg border border-black bg-black px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-black hover:shadow-lg"
                >
                    <UserPlus className="h-4 w-4" />
                    Add Resident
                </button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, contact, or occupation..."
                        className="w-full rounded-lg border border-black/10 bg-white py-2.5 pl-10 pr-3 text-sm shadow-sm placeholder:text-black/30 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-black/10 bg-neutral-50 text-xs uppercase tracking-wider text-black/60">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Name</th>
                                <th className="px-6 py-3 font-semibold">Gender</th>
                                <th className="px-6 py-3 font-semibold">Birthday</th>
                                <th className="px-6 py-3 font-semibold">Civil Status</th>
                                <th className="px-6 py-3 font-semibold">Contact</th>
                                <th className="px-6 py-3 font-semibold">Occupation</th>
                                <th className="px-6 py-3 text-right font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                            {filtered.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-6 py-10 text-center text-sm text-black/50"
                                    >
                                        No residents found.
                                    </td>
                                </tr>
                            )}
                            {filtered.map((r) => (
                                <tr
                                    key={r.id}
                                    className="transition-colors duration-150 hover:bg-neutral-50"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-neutral-100 text-xs font-semibold shadow-sm">
                                                {r.firstname?.charAt(0)?.toUpperCase()}
                                                {r.lastname?.charAt(0)?.toUpperCase()}
                                            </div>
                                            <div className="leading-tight">
                                                <p className="font-medium">
                                                    {r.firstname}{' '}
                                                    {r.middlename ? `${r.middlename} ` : ''}
                                                    {r.lastname}
                                                </p>
                                                <p className="text-xs text-black/50">
                                                    {r.email || '—'}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 capitalize">
                                        {r.gender || '—'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {r.birthday || '—'}
                                    </td>
                                    <td className="px-6 py-4 capitalize">
                                        {r.civil_status?.replace('_', ' ') || '—'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {r.contact_no || '—'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {r.occupation || '—'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setViewingResident(r)}
                                                className="rounded-lg border border-black/10 bg-white p-2 text-black/70 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:text-black hover:shadow-md"
                                                aria-label="View"
                                                title="View"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => openEdit(r)}
                                                className="rounded-lg border border-black/10 bg-white p-2 text-black/70 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:text-black hover:shadow-md"
                                                aria-label="Edit"
                                                title="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => setDeletingResident(r)}
                                                className="rounded-lg border border-red-200 bg-white p-2 text-red-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-red-600 hover:bg-red-600 hover:text-white hover:shadow-md"
                                                aria-label="Delete"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add / Edit Modal */}
            {modalOpen && (
                <ResidentModal resident={editingResident} onClose={closeModal} />
            )}

            {/* View Modal */}
            {viewingResident && (
                <ViewResidentModal
                    resident={viewingResident}
                    onClose={() => setViewingResident(null)}
                />
            )}

            {/* Delete Confirmation */}
            {deletingResident && (
                <DeleteConfirmModal
                    resident={deletingResident}
                    onCancel={() => setDeletingResident(null)}
                    onConfirm={confirmDelete}
                />
            )}
        </AuthLayout>
    )
}

/* ---------------- Add / Edit Modal ---------------- */
function ResidentModal({ resident, onClose }) {
    const isEdit = !!resident

    const { data, setData, post, put, processing, errors, reset } = useForm({
        firstname: resident?.firstname ?? '',
        middlename: resident?.middlename ?? '',
        lastname: resident?.lastname ?? '',
        birthday: resident?.birthday ?? '',
        gender: resident?.gender ?? '',
        civil_status: resident?.civil_status ?? '',
        contact_no: resident?.contact_no ?? '',
        email: resident?.email ?? '',
        occupation: resident?.occupation ?? '',
    })

    const submit = (e) => {
        e.preventDefault()
        const options = {
            onSuccess: () => {
                reset()
                onClose()
            },
        }
        if (isEdit) {
            put(`/residents/${resident.id}`, options)
        } else {
            post('/residents', options)
        }
    }

    const field =
        'w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm shadow-sm transition-colors duration-200 placeholder:text-black/30 focus:border-black focus:outline-none focus:ring-1 focus:ring-black'
    const label = 'mb-1.5 block text-xs font-medium text-black/70'
    const error = 'mt-1 text-xs text-red-600'

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-black/10 bg-white shadow-2xl">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-white/95 px-6 py-4 backdrop-blur">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-neutral-50 shadow-sm">
                            <UserPlus className="h-5 w-5" strokeWidth={2} />
                        </div>
                        <div className="leading-tight">
                            <h2 className="text-base font-bold tracking-tight">
                                {isEdit ? 'Edit Resident' : 'Add New Resident'}
                            </h2>
                            <p className="text-[10px] uppercase tracking-[0.25em] text-black/50">
                                Resident Record
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1.5 hover:bg-neutral-100"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={submit} className="px-6 py-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className={label}>First Name *</label>
                            <input
                                type="text"
                                value={data.firstname}
                                onChange={(e) => setData('firstname', e.target.value)}
                                className={field}
                                placeholder="Juan"
                            />
                            {errors.firstname && <p className={error}>{errors.firstname}</p>}
                        </div>
                        <div>
                            <label className={label}>Last Name *</label>
                            <input
                                type="text"
                                value={data.lastname}
                                onChange={(e) => setData('lastname', e.target.value)}
                                className={field}
                                placeholder="Dela Cruz"
                            />
                            {errors.lastname && <p className={error}>{errors.lastname}</p>}
                        </div>
                        <div>
                            <label className={label}>Middle Name</label>
                            <input
                                type="text"
                                value={data.middlename}
                                onChange={(e) => setData('middlename', e.target.value)}
                                className={field}
                                placeholder="Santos"
                            />
                            {errors.middlename && <p className={error}>{errors.middlename}</p>}
                        </div>
                        <div>
                            <label className={label}>Birthday *</label>
                            <input
                                type="date"
                                value={data.birthday}
                                onChange={(e) => setData('birthday', e.target.value)}
                                className={field}
                            />
                            {errors.birthday && <p className={error}>{errors.birthday}</p>}
                        </div>
                        <div>
                            <label className={label}>Gender *</label>
                            <select
                                value={data.gender}
                                onChange={(e) => setData('gender', e.target.value)}
                                className={field}
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {errors.gender && <p className={error}>{errors.gender}</p>}
                        </div>
                        <div>
                            <label className={label}>Civil Status *</label>
                            <select
                                value={data.civil_status}
                                onChange={(e) => setData('civil_status', e.target.value)}
                                className={field}
                            >
                                <option value="">Select status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="widowed">Widowed</option>
                                <option value="separated">Separated</option>
                            </select>
                            {errors.civil_status && (
                                <p className={error}>{errors.civil_status}</p>
                            )}
                        </div>
                        <div>
                            <label className={label}>Contact Number *</label>
                            <input
                                type="text"
                                value={data.contact_no}
                                onChange={(e) => setData('contact_no', e.target.value)}
                                className={field}
                                placeholder="0912 345 6789"
                            />
                            {errors.contact_no && <p className={error}>{errors.contact_no}</p>}
                        </div>
                        <div>
                            <label className={label}>Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={field}
                                placeholder="juan@example.com"
                            />
                            {errors.email && <p className={error}>{errors.email}</p>}
                        </div>
                        <div className="sm:col-span-2">
                            <label className={label}>Occupation *</label>
                            <input
                                type="text"
                                value={data.occupation}
                                onChange={(e) => setData('occupation', e.target.value)}
                                className={field}
                                placeholder="e.g. Teacher, Farmer, Vendor"
                            />
                            {errors.occupation && <p className={error}>{errors.occupation}</p>}
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-black/10 pt-5 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-black/10 bg-white px-5 py-2 text-sm font-medium text-black shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:shadow-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-black bg-black px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-black hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                            {processing
                                ? 'Saving...'
                                : isEdit
                                  ? 'Update Resident'
                                  : 'Save Resident'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

/* ---------------- View Modal ---------------- */
function ViewResidentModal({ resident, onClose }) {
    const rows = [
        { label: 'First Name', value: resident.firstname },
        { label: 'Middle Name', value: resident.middlename },
        { label: 'Last Name', value: resident.lastname },
        { label: 'Birthday', value: resident.birthday },
        { label: 'Gender', value: resident.gender },
        { label: 'Civil Status', value: resident.civil_status?.replace('_', ' ') },
        { label: 'Contact Number', value: resident.contact_no },
        { label: 'Email', value: resident.email },
        { label: 'Occupation', value: resident.occupation },
    ]

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-black/10 bg-white shadow-2xl">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-white/95 px-6 py-4 backdrop-blur">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-neutral-100 font-semibold shadow-sm">
                            {resident.firstname?.charAt(0)?.toUpperCase()}
                            {resident.lastname?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="leading-tight">
                            <h2 className="text-base font-bold tracking-tight">
                                {resident.firstname} {resident.lastname}
                            </h2>
                            <p className="text-[10px] uppercase tracking-[0.25em] text-black/50">
                                Resident Details
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1.5 hover:bg-neutral-100"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="px-6 py-6">
                    <dl className="divide-y divide-black/5">
                        {rows.map((row) => (
                            <div key={row.label} className="grid grid-cols-3 gap-4 py-3">
                                <dt className="text-xs font-medium uppercase tracking-wider text-black/50">
                                    {row.label}
                                </dt>
                                <dd className="col-span-2 text-sm capitalize">
                                    {row.value || '—'}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}

/* ---------------- Delete Confirmation ---------------- */
function DeleteConfirmModal({ resident, onCancel, onConfirm }) {
    const [processing, setProcessing] = useState(false)

    const handleConfirm = () => {
        setProcessing(true)
        onConfirm()
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onCancel}
            />
            <div className="relative z-10 w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-2xl">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 shadow-sm">
                        <Trash2 className="h-5 w-5" />
                    </div>
                    <div className="leading-tight">
                        <h2 className="text-base font-bold tracking-tight">
                            Delete Resident
                        </h2>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-black/50">
                            This action cannot be undone
                        </p>
                    </div>
                </div>

                <p className="mb-6 text-sm text-black/70">
                    Are you sure you want to delete{' '}
                    <span className="font-semibold text-black">
                        {resident.firstname} {resident.lastname}
                    </span>
                    ? All associated records may be affected.
                </p>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg border border-black/10 bg-white px-5 py-2 text-sm font-medium text-black shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:shadow-md"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={processing}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-600 bg-red-600 px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-red-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                        {processing ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    )
}
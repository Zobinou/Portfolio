export default function AdminLoading() {
    return (
        <div className="p-6 lg:p-10">
            <div className="h-8 w-48 animate-pulse rounded bg-text-secondary/10" />
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-28 animate-pulse rounded-2xl bg-text-secondary/10" />
                ))}
            </div>
        </div>
    )
}
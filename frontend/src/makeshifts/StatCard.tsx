const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center gap-5">
        <div className="bg-white/5 p-4 rounded-2xl">
            {icon}
        </div>
        <div>
            <p className="text-gray-400 text-sm font-medium">{label}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
    </div>
);

export default StatCard
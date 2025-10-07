export default function ChartCard({ title, children }) {
    return (
        <div className="card shadow-sm p-3 rounded-4 h-100">
            <h5 className="text-center mb-3">{title}</h5>
            {children}
        </div>
    );
}

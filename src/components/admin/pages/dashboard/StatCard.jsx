

// src/pages/admin/dashboard/StatCard.jsx
export default function StatCard({ title, value, subtitle, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border border-[#333333] rounded-lg p-6 bg-white hover:shadow-md transition hover:bg-[#F5F5F5]"
    >
      <h3 className="text-sm text-[#333333] mb-1">{title}</h3>
      <p className="text-3xl font-bold text-[#000000]">{value}</p>
      {subtitle && (
        <p className="mt-2 text-sm text-[#333333]">{subtitle}</p>
      )}
    </div>
  )
}
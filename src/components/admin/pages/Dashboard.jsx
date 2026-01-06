const stats = [
  { label: 'Total Explorers', value: 1240 },
  { label: 'Opportunities', value: 87 },
  { label: 'Pending Approvals', value: 14 },
  { label: 'Active Missions', value: 32 },
]

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="bg-orange p-4 rounded shadow"
          >
            <p className="text-sm">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

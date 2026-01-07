// src/pages/admin/dashboard/AdminDashboard.jsx
import { useNavigate } from 'react-router-dom'
import StatCard from './StatCard'

export default function AdminDashboard() {
  const navigate = useNavigate()

  const stats = {
    opportunities: { total: 24, pending: 5 },
    applications: { total: 132, pending: 18 },
    explorers: { total: 87, blocked: 3 },
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#000000] mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Opportunities"
          value={stats.opportunities.total}
          subtitle={`${stats.opportunities.pending} pending approval`}
          onClick={() => navigate('/admin/opportunities')}
        />

        <StatCard
          title="Total Applications"
          value={stats.applications.total}
          subtitle={`${stats.applications.pending} pending review`}
          onClick={() => navigate('/admin/applications')}
        />

        <StatCard
          title="Total Explorers"
          value={stats.explorers.total}
          subtitle={`${stats.explorers.blocked} blocked`}
          onClick={() => navigate('/admin/explorers')}
        />
      </div>
    </div>
  )
}

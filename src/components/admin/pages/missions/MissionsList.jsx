const mockMissions = [
  { id: 1, title: 'Complete Profile', status: 'Active' },
  { id: 2, title: 'Apply to Opportunity', status: 'Completed' },
]

export default function MissionsList() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Missions</h2>

      <ul className="space-y-3">
        {mockMissions.map(mission => (
          <li
            key={mission.id}
            className="p-4 bg-charcoal rounded"
          >
            <p className="font-semibold">{mission.title}</p>
            <p className="text-sm">Status: {mission.status}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

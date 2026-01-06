const mockExplorers = [
  { id: 1, name: 'Ali Khan', email: 'ali@example.com' },
  { id: 2, name: 'Sara Ahmed', email: 'sara@example.com' },
]

export default function ExplorersList() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Explorers</h2>

      <div className="space-y-4">
        {mockExplorers.map(user => (
          <div
            key={user.id}
            className="p-4 bg-orange rounded shadow"
          >
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

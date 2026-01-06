export default function Topbar() {
  // TEMP: mock admin user
  const user = {
    name: 'Admin',
    role: 'admin',
  }

  return (
    <header className="h-16 bg-white border-b border-black flex items-center justify-between px-6">
      <h1 className="font-semibold text-lg">
        Admin Control Panel
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm">
          {user.name}
        </span>
      </div>
    </header>
  )
}

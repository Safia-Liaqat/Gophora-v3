import { NavLink, Outlet } from 'react-router-dom'

export default function PlatformSettings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black mb-6">
        Platform Settings
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-[#333333] mb-6">
        <NavLink
          to="categories"
          className={({ isActive }) =>
            `pb-2 ${
              isActive
                ? 'border-b-2 border-[#FF4F00] text-black'
                : 'text-[#333333]'
            }`
          }
        >
          Categories
        </NavLink>

        <NavLink
          to="skills"
          className={({ isActive }) =>
            `pb-2 ${
              isActive
                ? 'border-b-2 border-[#FF4F00] text-black'
                : 'text-[#333333]'
            }`
          }
        >
          Skills
        </NavLink>

        <NavLink
          to="opportunity"
          className={({ isActive }) =>
            `pb-2 ${
              isActive
                ? 'border-b-2 border-[#FF4F00] text-black'
                : 'text-[#333333]'
            }`
          }
        >
          Opportunity Rules
        </NavLink>
      </div>

      <Outlet />
    </div>
  )
}

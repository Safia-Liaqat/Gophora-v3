import { useState } from 'react'

export default function OpportunitySettings() {
  const [settings, setSettings] = useState({
    allowFeatured: true,
    allowApplications: true,
    maxTags: 10,
    defaultStatus: 'Pending',
  })

  const update = (key, value) =>
    setSettings(prev => ({ ...prev, [key]: value }))

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-lg font-semibold text-black">
        Opportunity Rules
      </h2>

      {/* Default Status */}
      <div>
        <label className="block text-sm mb-1 text-black">
          Default Opportunity Status
        </label>
        <select
          className="border border-[#333333] p-2 w-full"
          value={settings.defaultStatus}
          onChange={e => update('defaultStatus', e.target.value)}
        >
          <option>Pending</option>
          <option>Approved</option>
        </select>
      </div>

      {/* Max Tags */}
      <div>
        <label className="block text-sm mb-1 text-black">
          Max Tags per Opportunity
        </label>
        <input
          type="number"
          min={1}
          max={20}
          className="border border-[#333333] p-2 w-full"
          value={settings.maxTags}
          onChange={e => update('maxTags', Number(e.target.value))}
        />
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={settings.allowFeatured}
            onChange={e => update('allowFeatured', e.target.checked)}
          />
          <span className="text-black">Enable Featured Opportunities</span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={settings.allowApplications}
            onChange={e => update('allowApplications', e.target.checked)}
          />
          <span className="text-black">Enable Applications</span>
        </label>
      </div>
    </div>
  )
}

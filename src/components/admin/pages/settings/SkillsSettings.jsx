import { useState } from 'react'

const initialSkills = [
  { id: 1, name: 'React', active: true },
  { id: 2, name: 'FastAPI', active: true },
  { id: 3, name: 'Tailwind', active: true },
]

export default function SkillsSettings() {
  const [skills, setSkills] = useState(initialSkills)
  const [newSkill, setNewSkill] = useState('')

  const addSkill = () => {
    if (!newSkill.trim()) return

    setSkills(prev => [
      ...prev,
      { id: Date.now(), name: newSkill, active: true },
    ])
    setNewSkill('')
  }

  const toggleSkill = id => {
    setSkills(prev =>
      prev.map(skill =>
        skill.id === id ? { ...skill, active: !skill.active } : skill
      )
    )
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-lg font-semibold mb-4 text-black">
        Skills / Tags
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          className="border border-[#333333] p-2 flex-1"
          placeholder="New skill"
          value={newSkill}
          onChange={e => setNewSkill(e.target.value)}
        />
        <button
          onClick={addSkill}
          className="px-4 bg-[#FF4F00] text-white rounded"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {skills.map(skill => (
          <div
            key={skill.id}
            className="flex justify-between items-center border border-[#333333] p-3 rounded"
          >
            <span className="text-black">{skill.name}</span>
            <button
              onClick={() => toggleSkill(skill.id)}
              className={`px-3 py-1 text-sm rounded ${
                skill.active
                  ? 'bg-[#FF4F00] text-white'
                  : 'bg-[#333333] text-white'
              }`}
            >
              {skill.active ? 'Active' : 'Inactive'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

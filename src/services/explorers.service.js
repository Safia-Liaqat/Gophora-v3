// services/explorers.service.js
import api from './api'

export const explorersService = {
  getAll: async () => {
    // later: return api.get('/admin/explorers')
    return Promise.resolve([
      {
        id: 1,
        name: 'Ali Khan',
        email: 'ali@example.com',
        skills: ['React', 'Node'],
        education: 'BS Computer Science',
        experience: '1 year',
        applicationsCount: 3,
        status: 'Active',
      },
      {
        id: 2,
        name: 'Sara Ahmed',
        email: 'sara@example.com',
        skills: ['UI/UX', 'Figma'],
        education: 'BDes',
        experience: '2 years',
        applicationsCount: 1,
        status: 'Blocked',
      },
    ])
  },

  updateStatus: async (id, status) => {
    // later: api.patch(`/admin/explorers/${id}`, { status })
    return Promise.resolve()
  },
}

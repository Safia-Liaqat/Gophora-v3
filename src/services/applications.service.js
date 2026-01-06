import { applicationsMock } from '../components/admin/pages/applications/applications.mock'

let applications = [...applicationsMock]

export const applicationsService = {
  getByOpportunity(opportunityId) {
    return Promise.resolve(
      applications.filter(a => a.opportunityId === opportunityId)
    )
  },

  updateStatus(id, status) {
    applications = applications.map(a =>
      a.id === id ? { ...a, status } : a
    )
    return Promise.resolve()
  },

  updateNotes(id, adminNotes) {
    applications = applications.map(a =>
      a.id === id ? { ...a, adminNotes } : a
    )
    return Promise.resolve()
  },
}

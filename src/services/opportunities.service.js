// Mock service layer — replace with FastAPI later

export const opportunitiesService = {
  getAll: async () => {
    return Promise.resolve([])
  },

  create: async (data) => {
    return Promise.resolve({
      ...data,
      id: Date.now(),
    })
  },

  update: async (id, data) => {
    return Promise.resolve({ id, ...data })
  },

  updateStatus: async (id, status) => {
    return Promise.resolve({ id, status })
  },

  archive: async (id) => {
    return Promise.resolve(true)
  },
}

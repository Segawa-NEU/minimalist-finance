import Vue from 'vue'
export default function (resourceName, resourceValidator) {
  if (!resourceName || typeof resourceName !== 'string') {
    console.error('resourceName was not set')
  }
  if (!resourceValidator || typeof resourceValidator !== 'function') {
    console.error('resourceValidator was not set')
  }
  return Vue.observable({
    resourceName: resourceName,
    resourceValidator: resourceValidator,
    state: {
      axios: null,
      resources: null,
      initialized: false
    },
    initialize (axios) {
      let self = this
      return new Promise((resolve, reject) => {
        // State Nullification
        self.state.axios = null
        self.state.resources = null
        self.state.initialized = false

        // Argument Validation
        if (!axios || typeof axios !== 'function') {
          reject(new Error('axios was not set'))
        }

        // Assignment
        self.state.axios = axios

        // Resource Fetch
        self.state.axios.get('/api/' + self.resourceName).then((response) => {
          // ResourceValidation
          if (!Array.isArray(response.data) || !response.data.every((resource) => self.resourceValidator(resource))) {
            self.state.axios = null
            self.resourceName = null
            reject(new Error('resource validation failed'))
          }

          // Initialization Resolution
          self.state.resources = response.data
          self.state.initialized = true
          resolve(self.state.resources)
        })
      })
    },
    fetchAll () {
      let self = this
      return new Promise((resolve, reject) => {
        // Initialization Check
        if (!self.state.initialized) {
          reject(new Error('store uninitialized'))
        }

        // Resource Fetch
        self.state.axios.get('/api/' + self.resourceName).then((response) => {
          // ResourceValidation
          if (!Array.isArray(response.data) || !response.data.every((resource) => self.resourceValidator(resource))) {
            self.state.initialized = false
            reject(new Error('resource validation failed'))
          }

          // Resource Assignment
          self.state.resources = response.data
          resolve(self.state.resources)
        }).catch((error) => {
          // Axios Error Handling
          reject(error)
        })
      })
    },
    create (resource) {
      let self = this
      return new Promise((resolve, reject) => {
        // Initialization Check
        if (!self.state.initialized) {
          reject(new Error('store uninitialized'))
        }

        // Resource Validation
        if (!self.resourceValidator(resource, false)) {
          reject(new Error('resource validation failed'))
        }

        // API Request
        self.state.axios.post('/api/' + self.resourceName, resource).then((response) => {
          // Resource Validation
          if (!self.resourceValidator(response.data)) {
            reject(new Error('resource validation failed'))
          }

          // Duplicate Check
          if (self.state.resources.some((resource) => resource === response.data)) {
            self.state.initialized = false
            reject(new Error('duplicate resource'))
          }

          // Resource Assignment
          self.state.resources.push(response.data)
          resolve(response.data)
        }).catch((error) => {
          // Axios Error Handling
          reject(error)
        })
      })
    },
    findByPk (pk) {
      let self = this
      return new Promise((resolve, reject) => {
        if (!pk) {
          reject(new Error('pk is not defined'))
        }
        if (!self.state.resources.some((resource) => resource.id === pk)) {
          reject(new Error('resource with such pk does not exists'))
        }
        resolve(self.state.resources.find((resource) => resource.id === pk))
      })
    },
    firstOrNull (condition) {
      let self = this
      return new Promise((resolve, reject) => {
        // Initialization Check
        if (!self.state.initialized) {
          reject(new Error('store uninitialized'))
        }

        // Resource Search
        if (self.state.resources.filter(condition).lenth !== 0) {
          resolve(self.state.resources.filter(condition)[0])
        } else {
          resolve(null)
        }
      })
    },
    filter (condition) {
      let self = this
      return new Promise((resolve, reject) => {
        // Initialization Check
        if (!self.state.initialized) {
          reject(new Error('store uninitialized'))
        }

        // Resource Search
        resolve(self.state.resources.filter(condition))
      })
    },
    all () {
      let self = this
      return new Promise((resolve, reject) => {
        // Initialization Check
        if (!self.state.initialized) {
          reject(new Error('store uninitialized'))
        }

        // Resource Search
        resolve(self.state.resources)
      })
    },
    update (updated) {
      let self = this
      return new Promise((resolve, reject) => {
        // Initialization Check
        if (!self.state.initialized) {
          reject(new Error('store uninitialized'))
        }

        // Resource Validation
        if (!self.resourceValidator(updated)) {
          reject(new Error('resource validation failed'))
        }

        // Resource Existence Check
        if (!self.state.resources.some((resource) => resource.id === updated.id)) {
          reject(new Error('resource does not exist'))
        }

        return self.state.axios.put('/api/' + self.resourceName, updated).then((response) => {
          // Resource Validation
          if (!self.resourceValidator(response.data)) {
            reject(new Error('resource validation failed'))
          }
          return response.data
        }).then((dbUpdated) => {
          // Resource Replacement
          let prevResource = self.state.resources.find((resource) => resource.id === dbUpdated.id)
          let index = self.state.resources.indexOf(prevResource)
          self.state.resources[index] = dbUpdated
          resolve(self.state.resources[index])
        })
      }).catch((error) => {
        // Error Handling
        throw error
      })
    },
    deleteByPk (pk) {
      let self = this
      return new Promise((resolve, reject) => {
        self.findByPk(pk).then((resource) => {
          return self.delete(resource)
        }).then((result) => {
          resolve(result)
        })
      })
    },
    delete (resource) {
      let self = this
      return new Promise((resolve, reject) => {
        // Initialization Check
        if (!self.state.initialized) {
          reject(new Error('store uninitialized'))
        }

        // Resource Existence Check
        if (!self.state.resources.includes(resource)) {
          reject(new Error('resource does not exist'))
        }

        // Resource Validation
        if (!self.resourceValidator(resource)) {
          self.initialized = false
          reject(new Error('resource validation failed'))
        }

        // API Request
        self.state.axios.delete('/api/' + self.resourceName, { params: { id: resource.id } }).then((response) => {
          // Resource Deletion
          self.state.resources = self.state.resources.filter((toDelete) => resource !== toDelete)
          resolve(true)
        }).catch((error) => {
          // Axios Error Handling
          reject(error)
        })
      })
    }
  })
}

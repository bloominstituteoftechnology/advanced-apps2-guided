import axios from 'axios'

export default () => {
  return axios.create({
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  })
}

// whomever uses this module


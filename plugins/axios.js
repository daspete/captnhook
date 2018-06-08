import * as axios from 'axios'

let options = {}

if (process.server) {
    options.baseURL = `${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
}

export default axios.create(options)

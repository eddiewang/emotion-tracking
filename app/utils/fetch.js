import axios from 'axios';

const BASE_URL = '/api'

export function postRequest(url, body, cb) {
  return new Promise((resolve, reject) => {
    axios({
      url: BASE_URL + url,
      method: 'POST',
      data: body,
      timeout: 20000,
    })
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      cb(error)
    });
  });
}

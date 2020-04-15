import { getStorageData } from '.';
import ENV from '../../ENV';

const BASE_IP = ENV.url_api;

// serializeForUri({ param0: 'value 0', param1: 'value:1' }) ===
// 'param0=value%200&param1=value%3A1'
function serializeForUri(obj = {}) {
  return Object
    .keys(obj)
    .map((key) => `${encodeURI(key)}=${encodeURI(obj[key])}`)
    .join('&');
}

async function call(URL, data, method) {
  const token = await getStorageData('token');
  const headers = {
    authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const requestData = {
      body: data && JSON.stringify(data),
      headers,
      method,
    };
    const response = await fetch(`${BASE_IP}/${URL}`, requestData);
    const res = await response.json();

    return { isSuccess: true, ...res };
  } catch (error) {
    return { error, isSuccess: false };
  }
}

export function get(dispatch, URL, params = {}) {
  const queryParams = serializeForUri(params);
  const url = `${URL}?${queryParams}`;

  return call(url, null, 'GET');
}

export function post(URL, data, formData = false) {
  return call(URL, data, 'POST', formData);
}

export function put(URL, data, formData = false) {
  return call(URL, data, 'PUT', formData);
}

export function del(URL) {
  return call(URL, null, 'DEL');
}

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
    const controller = new AbortController();

    const options = {
      body: data && JSON.stringify(data),
      headers,
      method,
      signal: controller.signal,
    };
    const timeId = setTimeout(() => controller.abort(), 8000);
    const request = await fetch(`${BASE_IP}/${URL}`, options);

    clearTimeout(timeId);

    if (token && request.status === 401) {
      // TODO: refresh token || log out
      throw new Error('401');
    }

    const response = await request.json();
    return { isSuccess: response.isValid, ...response };
  } catch (error) {
    return { error, isSuccess: false };
  }
}

export function get(URL, params = {}) {
  const queryParams = serializeForUri(params);
  const url = `${URL}?${queryParams}`;

  return call(url, null, 'GET');
}

export function post(URL, data, formData = false) {
  return call(URL, data, 'POST', formData);
}

export function PUT(URL, data, formData = false) {
  return call(URL, data, 'PUT', formData);
}

export function del(URL) {
  return call(URL, null, 'DEL');
}

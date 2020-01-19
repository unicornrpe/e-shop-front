import axios from 'axios';
import { isServer, ServerVars } from '../environment';
import qs from 'qs';
import urlJoin from 'proper-url-join';
export const ApiUrl = 'http://localhost:3000';

let AuthToken;

if (isServer && ServerVars.isProdDev) {
  axios.interceptors.request.use(function(config) {
    console.log(`${config.method.toUpperCase()} ${config.url}`);
    return config;
  });
}

const GetUrl = (url, options) => {
  // if (options.baseUrl) {
  //   return urlJoin(options.baseUrl, url);
  // }
  return urlJoin(ApiUrl, url);
};

const GetHeaders = options => {
  let headers = {};
  if (isServer && options.cookies) {
    headers.Cookie = options.cookies;
  }
  return headers;
};

export const SetAuthToken = token => {
  AuthToken = token;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const GetAuthToken = token => {
  return AuthToken;
};

export const UnsetAuthToken = () => {
  AuthToken = undefined;
  axios.defaults.headers.common['Authorization'] = '';
};

export const Get = (url, data, options = {}) =>
  axios
    .get(GetUrl(url, options) + (data ? '?' + encodeQueryParams(data) : ''), {
      headers: GetHeaders(options)
    })
    .then(response => response.data)
    .catch(serverErrorHandler);

export const Post = (url, data = {}, options = {}) => {
  //console.log(44444,url);
  return axios
    .post(GetUrl(url, options), data, {
      headers: GetHeaders(options)
    })
    .then(response => response.data)
    .catch(serverErrorHandler);
};

export const Put = (url, data = {}, options = {}) =>
  axios
    .put(GetUrl(url, options), data, {
      headers: GetHeaders(options)
    })
    .then(response => response.data)
    .catch(serverErrorHandler);

export const Delete = (url, data = {}, options = {}) =>
  axios
    .delete(GetUrl(url, options), data, {
      headers: GetHeaders(options)
    })
    .then(response => response.data)
    .catch(serverErrorHandler);

export const Echo = (data, to = 500) =>
  new Promise(resolve => setTimeout(() => resolve(data), to));

function encodeQueryParams(obj) {
  return qs.stringify(obj);
  // return Object.keys(obj)
  //   .map(function(k) {
  //     return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
  //   })
  //   .join('&');
}

function serverErrorHandler(error) {
  throw (error && error.response && error.response.data) || {
    message: 'Error. Please try again.',
    details: {
      code: error && error.code
    }
  };
}

export const delay = milliseconds =>
  new Promise(res => setTimeout(res, milliseconds));

export class ApiService {
  constructor({ hostUrl = '/', cookies }) {
    let apiUrl = urlJoin(hostUrl, '/api/client');
    this.get = (urlPath, data, options) => {
      return Get(urlPath, data, {
        baseUrl: apiUrl,
        cookies,
        ...options
      });
    };
    this.post = (urlPath, data, options) =>
      Post(urlPath, data, {
        baseUrl: apiUrl,
        cookies,
        ...options
      });
    this.put = (urlPath, data, options) =>
      Put(urlPath, data, {
        baseUrl: apiUrl,
        cookies,
        ...options
      });
    this.delete = (urlPath, data, options) =>
      Delete(urlPath, data, {
        baseUrl: apiUrl,
        cookies,
        ...options
      });
  }
}

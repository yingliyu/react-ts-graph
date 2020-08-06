import instance from './axios';
import { message } from 'antd';
import qs from 'qs';

export function AppPost(url, data) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data)
      .then(res => {
        if (res.data.code === 200) {
          resolve(res.data.data);
        } else {
          reject(res.data.msg);
        }
      })
      .catch(err => {
        message.error(err, 1000);
        reject(err);
      });
  });
}

export function AppGet(url, data) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: {
          ...data,
        },
        paramsSerializer: params => {
          return qs.stringify(params, { indices: false });
        },
      })
      .then(res => {
        if (res.data.code === 200) {
          resolve(res.data.data);
        } else {
          reject(res.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error(err, 1000);
        reject(err);
      });
  });
}

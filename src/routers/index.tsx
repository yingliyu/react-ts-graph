import React from 'react';
import loadable from '@loadable/component';
const Home = loadable(() => import('../pages/home'), {
  fallback: <div>加载中...</div>,
});
const NotFound = loadable(() => import('../pages/not-found'), {
  fallback: <div>加载中...</div>,
});

export default [
  {
    name: '首页',
    path: '/',
    exact: true,
    component: Home,
  },

  {
    name: 'Not Found',
    path: '/404',
    exact: true,
    component: NotFound,
  },
];

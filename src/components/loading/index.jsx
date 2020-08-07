import React from 'react'
import { Spin } from 'antd'
import styles from './index.module.less'
export default function Loading() {
  return (
    <div className={styles['loading-mask']}>
      <Spin tip="loading..." />
    </div>
  )
}

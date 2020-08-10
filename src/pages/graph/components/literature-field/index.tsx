import React from 'react'
import css from './index.module.less'
import Title from '../title'
import Bar from '../../../../components/charts/bar'
const LiteratureField = () => {

  return <div className={css['literature-field']}>

    <Title title='文献领域分布' />
    <Bar></Bar>
  </div>
}

export default LiteratureField
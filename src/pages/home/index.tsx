import React from 'react';
import { Link } from 'react-router-dom';
import css from './index.module.less';
const Home: React.FC = (props) => {
    return (
        <div className={css['home-page-wrapper']}>
            <h2>欢迎使用上海人工智能研发资源图谱！ </h2>
            <Link to="/graph?q=李飞飞&id=1"> Graph (默认专家：李飞飞)</Link>
        </div>
    );
};
export default Home;

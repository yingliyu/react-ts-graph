import React from 'react';
import { Link } from 'react-router-dom';
import css from './index.module.less';
const Home: React.FC = (props) => {
    return (
        <div className={css['home-page-wrapper']}>
            <h2>欢迎使用上海人工智能研发资源图谱！ </h2>
            <Link to="/graph?q=李飞飞 null&id=f7c1fd353bb04c949ef1747e96ca76ed&type=0&gid=ORGN1100088318">
                Graph (默认专家：李飞飞)
            </Link>
        </div>
    );
};
export default Home;

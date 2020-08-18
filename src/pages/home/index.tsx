import React from 'react';
import { Link } from 'react-router-dom';
import css from './index.module.less';
const Home: React.FC = (props) => {
    return (
        <div className={css['home-page-wrapper']}>
            <h2>Welcome Here ... </h2>
            <Link to="/graph">To Graph</Link>
            {/* <svg>
                <line
                    fill="red"
                    stroke="#23cbff"
                    strokeWidth="2px"
                    x1="12"
                    y1="12"
                    x2="166"
                    y2="60"
                />
                <path
                    id="edgepath_33"
                    stroke="orange"
                    strokeWidth="15"
                    strokeOpacity="0.5"
                    d="M 12 12 L 166 60"
                />
                <filter
                    name="就职"
                    width="1"
                    height="1"
                    x="0"
                    y="0"
                    rx="5"
                    ry="5"
                    id="edgefilter_33"
                    display=""
                >
                    <feFlood flood-color="orange"></feFlood>
                    <feComposite in="SourceGraphic" operator="xor"></feComposite>
                </filter>
                <text fill="#23cbff">
                    <textPath href="#edgepath_33" startOffset="0%">
                        就职d开发机构看了几分代理机构
                    </textPath>
                </text>
            </svg> */}
        </div>
    );
};
export default Home;

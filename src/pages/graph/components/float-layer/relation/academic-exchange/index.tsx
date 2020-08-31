import React from 'react';
import css from './index.module.less';
// 学术交流关系浮层

export default function AcademicLayer() {
    return (
        <div className={css['academic-exahange']}>
            该刊刊发哲学社会科学最近研究成果，为改革开放和社会主义现代化建设服务，为
            构建社会主义和谐社会服务，为党和政府决策服务。每月5日出版，每期192页，38万字；
            每年刊发社科学术研究成果500篇左右，已步入全国名刊大刊行列。
            本刊为社会科学学术理论刊物。刊登社会科学领域各学科的学术论文，
            注重对建设中国特色社会主义的理论与实践的研究探讨。
        </div>
    );
}

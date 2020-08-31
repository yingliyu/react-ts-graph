import React from 'react';
import { List, Tooltip } from 'antd';
import css from './index.module.less';
export default function RPaperLayer() {
    const listData = [];
    for (let i = 0; i < 10; i++) {
        listData.push({
            href: 'http://ant.design',
            title: `ant design partxx a design rmsportal language ${i}`,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description: '期刊名xxx a design language for background applications.',
            content: '摘要：We supply a series of design principles, practical patterns .'
        });
    }
    return (
        <div className={css['paper-layer']}>
            <List
                itemLayout="vertical"
                footer={null}
                dataSource={listData}
                renderItem={(item) => (
                    <List.Item key={item.title}>
                        <List.Item.Meta
                            avatar={null}
                            title={
                                <div className={css['paper-head']}>
                                    <Tooltip placement="right" title={item.title}>
                                        <span className={css['paper-titile']}>{item.title}</span>
                                    </Tooltip>
                                    <small>2020-02-20</small>
                                </div>
                            }
                            description={
                                <Tooltip placement="right" title={item.description}>
                                    {item.description}
                                </Tooltip>
                            }
                        />
                        <Tooltip placement="right" title={item.content}>
                            <div className={css['paper-abstract']}>{item.content}</div>
                        </Tooltip>
                    </List.Item>
                )}
            ></List>
        </div>
    );
}

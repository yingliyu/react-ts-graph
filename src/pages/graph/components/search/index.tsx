import React from 'react';
import { Select, Radio, Button, Spin, Icon, message } from 'antd';
import { IExampleData } from '../../../../models/search';
import useSize from '../../../../hooks/size';
import css from './index.module.less';

const { Option } = Select;

interface ISearch {
    width: number;
    height: number;
    value: string;
    showExample: boolean;
    exampleList: IExampleData[];
    activeExampleId: string;
    refSelect: any;
    suggestInfo: any;
    showExampleHandle: any;
    exampleClickHandle: any;
    examplePageHandle: any;
    setShowExample: any;
    fetchSuggest: any;
    selectSuggestWordHandle: any;
}
export default function Search(props: ISearch) {
    console.log(props);

    const {
        width,
        height,
        value,
        showExample,
        exampleList,
        activeExampleId,
        refSelect,
        suggestInfo,
        showExampleHandle,
        exampleClickHandle,
        examplePageHandle,
        fetchSuggest,
        selectSuggestWordHandle,
        setShowExample
    } = props;

    return (
        <div className={css['search-wrapper']}>
            <Select
                ref={refSelect}
                showSearch
                autoFocus={true}
                value={value}
                placeholder="请输入搜索词并在下拉菜单选择知识图谱"
                notFoundContent={
                    suggestInfo.loading ? <Spin size="small" /> : '无关联知识图谱，请重新输入'
                }
                filterOption={false}
                onSearch={(value) => fetchSuggest(value)}
                onChange={(value: any) => selectSuggestWordHandle(value)}
                style={{ width: width, height: height }}
                showArrow={false}
                defaultActiveFirstOption={true}
            >
                {suggestInfo.list.length &&
                    suggestInfo.list.map((item: any) => (
                        <Option
                            key={item.entityId}
                            value={JSON.stringify({
                                entityName: item.entityName,
                                entityId: item.entityId,
                                entityType: item.entityType ? item.entityType : ''
                            })}
                        >
                            {item.entityName + (item.orgName ? ' ' + item.orgName : '')}
                        </Option>
                    ))}
            </Select>
            <span className={css['example-btn']} onClick={showExampleHandle}>
                示例
                <Icon key="search_icon" className={css['search-icon']} type="search" />
            </span>
            {/* 展示所有示例 */}
            <div
                id="examples-words"
                className={[
                    `${css['examples-wrapper']}`,
                    `${showExample ? css['show-example'] : ''}`
                ].join(' ')}
            >
                <section className={css['expert-words']}>
                    {exampleList.map((item, index) => {
                        return (
                            <Button
                                className={item.entityId === activeExampleId ? css['active'] : ''}
                                key={item.entityName + '_' + index}
                                onClick={(e) => exampleClickHandle(item, e)}
                            >
                                {item.entityName}
                            </Button>
                        );
                    })}
                </section>
                <div className={css['example-footer']}>
                    <Button type="primary" onClick={examplePageHandle}>
                        换一组
                    </Button>
                    <Button id="close-btn" onClick={() => setShowExample(false)}>
                        关闭
                    </Button>
                </div>
            </div>
        </div>
    );
}

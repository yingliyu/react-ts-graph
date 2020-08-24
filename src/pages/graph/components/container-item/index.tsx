import React, { ReactNode } from 'react';
import Title from '../../components/title';
interface ContainerItemProps {
    width: number;
    height: number;
    borderRadius: number;
    backgroundColor: string;
    marginTop?: number;
    marginLeft?: number;
    title?: string;
    borderColor?: string;
    children: ReactNode | string;
}
// 容器组件
const ContainerItem = (props: ContainerItemProps) => {
    const {
        title,
        borderColor,
        width,
        height,
        marginTop,
        marginLeft,
        borderRadius,
        backgroundColor,
        children
    } = props;
    return (
        <div
            style={{
                width: width,
                height: height,
                backgroundColor: backgroundColor,
                borderRadius: borderRadius,
                marginTop: `${marginTop ? marginTop : 0}px`,
                marginLeft: `${marginLeft ? marginLeft : 0}px`,
                borderColor: borderColor ? `${borderColor}px` : 'transparent'
            }}
        >
            {title ? <Title title={title ? title : ''} /> : ''}
            {children}
        </div>
    );
};

export default ContainerItem;

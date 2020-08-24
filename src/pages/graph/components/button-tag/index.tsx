import React, { ReactNode } from 'react';
import css from './index.module.less';
interface ButtonTagProps {
    width: number;
    height: number;
    marginLeft: number;
    backgroundColor: string;
    borderRadius: number;
    label?: string;
    borderColor?: string;
    children: ReactNode;
}
const ButtonTag = (props: ButtonTagProps) => {
    const {
        label,
        borderColor,
        width,
        height,
        marginLeft,
        borderRadius,
        backgroundColor,
        children
    } = props;
    return (
        <div className={css['title']}>
            {label}
            {children}
        </div>
    );
};

export default ButtonTag;

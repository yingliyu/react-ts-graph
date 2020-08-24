import React, { useEffect, useState } from 'react';

export default function useSize() {
    const [size, setSize] = useState({
        done: false,
        inputWidth: 480,
        inputHeight: 48,
        kgWidth: 1100,
        kgHeight: 900,
        kgGraphCenterNodeR: 85,
        kgGraphSmallNodeR: 40,
        kgNodeR: [150, 80, 60, 50, 40, 30],
        kgNodeFontSize: [22, 18, 16, 14, 13, 12],
        commonW: 370,
        commonH: 180,
        subjectDistH: 265,
        hotWordsH: 280,
        liteFieldDistH: 180,
        highCitedH: 142
    });

    useEffect(() => {
        const calcSize = () => {
            console.log('width * height = ', `${window.screen.width}*${window.screen.height}`);
            // calc size
            const screenWidth = window.screen.width;
            if (screenWidth <= 1280) {
                setSize({
                    done: true,
                    inputWidth: 380,
                    inputHeight: 35,
                    kgWidth: 720,
                    kgHeight: 680,
                    kgGraphCenterNodeR: 45,
                    kgGraphSmallNodeR: 25,
                    kgNodeR: [150, 80, 60, 50, 40, 30],
                    kgNodeFontSize: [22, 18, 16, 14, 13, 12],
                    commonW: 270,
                    commonH: 130,
                    subjectDistH: 190,
                    hotWordsH: 205,
                    liteFieldDistH: 130,
                    highCitedH: 102
                });
            } else if (screenWidth <= 1440) {
                setSize({
                    done: true,
                    inputWidth: 380,
                    inputHeight: 35,
                    kgWidth: 1100,
                    kgHeight: 900,
                    kgGraphCenterNodeR: 85,
                    kgGraphSmallNodeR: 45,
                    kgNodeR: [150, 80, 60, 50, 40, 30],
                    kgNodeFontSize: [22, 18, 16, 14, 13, 12],
                    commonW: 270,
                    commonH: 130,
                    subjectDistH: 190,
                    hotWordsH: 205,
                    liteFieldDistH: 130,
                    highCitedH: 102
                });
            } else {
                setSize({ ...size, done: true });
            }
        };
        calcSize();
    }, []);

    return size;
}

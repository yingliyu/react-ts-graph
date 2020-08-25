import React, { useEffect, useState } from 'react';

export default function useSize() {
    const [size, setSize] = useState({
        done: false,
        inputWidth: 480,
        inputHeight: 48,
        kgWidth: 1100,
        kgHeight: 930,
        kgGraphCenterNodeR: 85,
        kgGraphSmallNodeR: 40,
        kgAssNodeR: [85, 40],
        kgNodeR: [150, 80, 60, 50, 40, 30],
        kgAssNodeFontSize: [24, 16],
        commonW: 370,
        commonH: 180,
        subjectDistH: 265,
        hotWordsH: 280,
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
                    kgAssNodeR: [45, 25],
                    kgNodeR: [150, 80, 60, 50, 40, 30],
                    kgAssNodeFontSize: [16, 12],
                    commonW: 270,
                    commonH: 130,
                    subjectDistH: 190,
                    hotWordsH: 205,
                    highCitedH: 102
                });
            } else if (screenWidth <= 1440) {
                setSize({
                    done: true,
                    inputWidth: 420,
                    inputHeight: 40,
                    kgWidth: 805,
                    kgHeight: 780,
                    kgGraphCenterNodeR: 67,
                    kgGraphSmallNodeR: 40,
                    kgAssNodeR: [70, 30],
                    kgNodeR: [150, 80, 60, 50, 40, 30],
                    kgAssNodeFontSize: [18, 12],
                    commonW: 300,
                    commonH: 147,
                    subjectDistH: 215,
                    hotWordsH: 231,
                    highCitedH: 117
                });
            } else {
                setSize({ ...size, done: true });
            }
        };
        calcSize();
    }, []);

    return size;
}

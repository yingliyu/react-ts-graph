import React, { useEffect } from 'react';

export default function useHide(ref: HTMLElement) {
    console.log(ref);
    useEffect(() => {
        ref &&
            window.addEventListener('click', function (event: any) {
                if (!(ref as HTMLElement).contains(event.target)) {
                    ref.style.display = 'none';
                } else {
                    ref.style.display = 'block';
                }
            });
    });
}

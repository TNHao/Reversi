import React, { useEffect, useState } from 'react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

export default function CountDown({ thinkingTime = 60 }) {
    const [countDown, setCountDown] = useState(thinkingTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDown - 1);
        }, 1000);

        if (countDown === 0) {
            clearInterval(interval);
            // alert('Bạn đã thua');
        }

        return () => clearInterval(interval);
    }, [countDown]);

    return (
        <CircularProgress value={countDown / 60 * 100} size='150px' color='green.400'>
            <CircularProgressLabel>{countDown}s</CircularProgressLabel>
        </CircularProgress>
    )
}

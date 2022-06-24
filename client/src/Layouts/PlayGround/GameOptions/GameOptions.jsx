import { Stack, VStack, Button, Text, Heading, Box, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';
import StopButton from './StopButton/StopButton'
import TieButton from './TieButton/TieButton'
import { socket } from '../../../Services';
import { useNavigate } from 'react-router-dom';

export default function GameOptions() {
    const roomId = localStorage.getItem('roomId');
    const thinkingTime = JSON.parse(localStorage.getItem('data')).thinkingTime;
    let pauseTime = JSON.parse(localStorage.getItem('data')).pauseTime;
    const pausePeriod = JSON.parse(localStorage.getItem('data')).pausePeriod;
    let color = localStorage.getItem('color');
    let [turn, setTurn] = useState('blue');
    let from = -1, to = -1;
    const [countDown, setCountDown] = useState(0);
    let [isCountDown, setIsCountDown] = useState(false);
    let [isPause, setPause] = useState(false);
    let [isGetPause, setGetPause] = useState(false);
    const navigate = useNavigate();

    socket.on('move', (data) => {
        console.log('chang turn', data);
        if (data.from !== from && data.to !== to) {
            from = data.from;
            to = data.to;
            if (turn === 'blue') {
                setTurn('red');
            } else {
                setTurn('blue');
            }
            setCountDown(thinkingTime);
        }
        console.log('turn', turn);
    });

    socket.on('start', () => {
        console.log('start');
        setIsCountDown(true);
        setCountDown(thinkingTime);
    })

    socket.on('pause', () => {
        console.log('pause');
        setPause(true);
        setCountDown(pausePeriod);
    })

    socket.on('stopPause', () => {
        console.log('stopPause');
        setPause(false);
        setGetPause(false);
        setCountDown(thinkingTime);
    })

    function startCountDown() {
        socket.emit('start', {id: socket.id});
    }

    function startPause() {
        if (pauseTime > 0 && isCountDown) {
            pauseTime = pauseTime - 1;
            setGetPause(true);
            socket.emit('pause', {id: socket.id});
        }
    }

    function stopPause() {  
        socket.emit('stopPause', {id: socket.id});
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDown - 1);
        }, 1000);

        if (countDown === 0) {
            clearInterval(interval);
            if (isPause && isGetPause) {
                socket.emit('stopPause', {id: socket.id});
                // setPause(false);
                // setGetPause(false);
                // setCountDown(thinkingTime);
            } else if (isCountDown) {
                const turn = localStorage.getItem('turn');
                if (turn === color) {
                    alert('Hết thời gian, bạn đã thua!');
                    socket.emit('del', {id: socket.id});
                } else {
                    alert('Hết thời gian, đối thủ đã thua!');
                }
                navigate('/');
            }
        }

        return () => clearInterval(interval);
    }, [countDown]);

    return (
        <VStack flexGrow={1} spacing={10}>
            <Heading
                w={'100%'}
                mt="8"
                textAlign={'center'}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                lineHeight={'110%'}>
                Phòng chơi {' '}
                <Text color={'green.400'}>
                    {roomId}
                </Text>
            </Heading>
            <Stack direction='row' spacing={20}>
                <Text fontSize={28}>
                    Màu của bạn: {' '}
                    <Text as={'span'} color={'green.400'}>
                        {color}
                    </Text>
                </Text>
                <Text fontSize={28}>
                    Lượt đi: {' '}
                    <Text as={'span'} color={'green.400'}>
                        {turn}
                    </Text>
                </Text>
                {/* <Button colorScheme='teal' variant='solid' _focus={{ boxShadow: "none" }}>
                    Player 1
                </Button>
                <Button colorScheme='teal' variant='outline' _focus={{ boxShadow: "none" }}>
                    Player 2
                </Button> */}
            </Stack>
            {
                (isPause)
                ?
                <Text fontSize={28}>
                    Tạm dừng
                </Text>
                :
                <></>
            }
            {
                (color === 'blue' && !isCountDown)
                ?
                <Button colorScheme='teal' variant='solid' onClick={startCountDown}>
                    Bắt đầu
                </Button>
                :
                <></>
            }
            {/* <CountDown/> */}
            {
                (!isPause)
                ?
                <CircularProgress value={countDown / thinkingTime * 100} size='150px' color='green.400'>
                    <CircularProgressLabel>{countDown}s</CircularProgressLabel>
                </CircularProgress>
                :
                <CircularProgress value={countDown / pausePeriod * 100} size='150px' color='green.400'>
                    <CircularProgressLabel>{countDown}s</CircularProgressLabel>
                </CircularProgress>
            }
            {/* <CircularProgress value={40} size='150px' color='green.400'>
                <CircularProgressLabel>40%</CircularProgressLabel>
            </CircularProgress> */}
            {/* <Button w={'50%'}>
                Mời người chơi
            </Button> */}
            <Stack direction='row' spacing={4}>
                {
                    (!isPause)
                    ?
                    <Button colorScheme='teal' variant='solid' onClick={startPause}>
                        Tạm dừng
                    </Button>
                    :
                    <>
                        {
                            (isGetPause)
                            ?
                            <Button colorScheme='teal' variant='solid' onClick={stopPause}>
                                Tiếp tục
                            </Button>
                            :
                            <></>
                        }
                    </>
                }
                <TieButton />
                <StopButton />
            </Stack>
        </VStack>
    )
}

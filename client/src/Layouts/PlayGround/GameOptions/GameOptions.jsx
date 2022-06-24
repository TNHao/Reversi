import { Stack, VStack, Button, Text, Heading, Box, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import React, { useState } from 'react';
import StopButton from './StopButton/StopButton'
import TieButton from './TieButton/TieButton'
import CountDown from './CountDown/CountDown'
import { socket } from '../../../Services';

export default function GameOptions() {
    const roomId = localStorage.getItem('roomId');
    let color = localStorage.getItem('color');
    let [turn, setTurn] = useState('blue');
    let from = -1, to = -1;
    const [isPlaying, setIsPlaying] = useState(false);
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
        }
        setIsPlaying(true);
        console.log('turn', turn);
    });

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
                    Your color: {' '}
                    <Text as={'span'} color={'green.400'}>
                        {color}
                    </Text>
                </Text>
                <Text fontSize={28}>
                    Turn of: {' '}
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
            {isPlaying === true ? (<CountDown/>) : (<div></div>)}
            {/* <CircularProgress value={40} size='150px' color='green.400'>
                <CircularProgressLabel>40%</CircularProgressLabel>
            </CircularProgress> */}
            {/* <Button w={'50%'}>
                Mời người chơi
            </Button> */}
            <Stack direction='row' spacing={4}>
                <Button colorScheme='teal' variant='solid'>
                    Tạm dừng
                </Button>
                <TieButton />
                <StopButton />
            </Stack>
        </VStack>
    )
}

import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../../Services'
import GameBoard from './GameBoard/GameBoard'
import GameOptions from './GameOptions/GameOptions'

export default function PlayGround(data) {
    const navigate = useNavigate();
    let lostId = '';

    useEffect(() => {
        socket.on('lost', (data) => {
            if (data.lostId !== lostId) {
                lostId = data.lostId;
                navigate('/');
                alert('Đối thủ bị mất kết nối, ván cờ kết thúc!');
            }
        })
    });

    return (
        <>
            <HStack p={10}>
                <GameBoard/>
                <GameOptions />
            </HStack>
        </>
    )
}

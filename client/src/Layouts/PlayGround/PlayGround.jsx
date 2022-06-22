import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import GameBoard from './GameBoard/GameBoard'
import GameOptions from './GameOptions/GameOptions'

export default function PlayGround(data) {
    const roomId = localStorage.getItem('roomId');
    return (
        <>
            <Heading
                w={'100%'}
                mt="8"
                textAlign={'center'}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                lineHeight={'110%'}>
                Phòng chơi {' '}
                <Text as={'span'} color={'green.400'}>
                    {roomId}
                </Text>
            </Heading>
            <HStack p={10}>
                <GameBoard/>
                <GameOptions />
            </HStack>
        </>
    )
}

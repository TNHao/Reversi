import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import GameBoard from './GameBoard/GameBoard'
import GameOptions from './GameOptions/GameOptions'

export default function PlayGround(data) {
    return (
        <>
            <HStack p={10}>
                <GameBoard/>
                <GameOptions />
            </HStack>
        </>
    )
}

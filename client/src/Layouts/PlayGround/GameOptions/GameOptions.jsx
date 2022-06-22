import { Stack, VStack, Button, Box, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import React from 'react'
import StopButton from './StopButton/StopButton'
import TieButton from './TieButton/TieButton'

export default function GameOptions() {
    return (
        <VStack flexGrow={1} spacing={10}>
            <Stack direction='row' spacing={20}>
                <Button colorScheme='teal' variant='solid' _focus={{ boxShadow: "none" }}>
                    Player 1
                </Button>
                <Button colorScheme='teal' variant='outline' _focus={{ boxShadow: "none" }}>
                    Player 2
                </Button>
            </Stack>
            <CircularProgress value={40} size='150px' color='green.400'>
                <CircularProgressLabel>40%</CircularProgressLabel>
            </CircularProgress>
            <Button w={'50%'}>
                Mời người chơi
            </Button>
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

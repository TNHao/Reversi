import { Button, Collapse, Stack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import CreateRoom from './CreateRoom/CreateRoom';
import JoinRoom from './JoinRoom/JoinRoom';
import RandomRoom from './RandomRoom/RandomRoom';

export default function PlayOptions() {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Stack spacing={6} direction={'column'}>
            <Button
                onClick={onToggle}
                rounded={'full'}
                m={'auto'}
                w={'200px'}
                px={8}
                py={6}
                colorScheme={'orange'}
                bg={'orange.400'}
                fontSize={'2xl'}
                _hover={{ bg: 'orange.500' }}>
                Bắt đầu chơi
            </Button>
            <Collapse in={isOpen} style={{overflow: 'visible !important'}} animateOpacity>
                <Stack direction={['column', 'row']} spacing='50px'>
                    <RandomRoom />
                    <CreateRoom />
                    <JoinRoom />
                </Stack>
            </Collapse>
        </ Stack>
    )
}

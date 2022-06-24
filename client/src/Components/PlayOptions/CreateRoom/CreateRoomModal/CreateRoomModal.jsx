import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../../../Services';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Button,
    HStack,
    Box,
    NumberInputField,
    NumberInput,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from '@chakra-ui/react'

const numInput = (name, onChangeFn, value) => {
    return (
        <NumberInput value={value} onChange={onChangeFn(name)}>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    )
}

export default function CreateRoomModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [state, setState] = useState({
        size: 5,
        differential: 0,
        thinkingTime: 60,
        minimumPiecesToLose: 0,
        pauseTime: 2,
        pausePeriod: 120
    });
    const navigate = useNavigate();

    const handleChange =
        (name) =>
            ({ target }) => {
                setState((s) => ({
                    ...s,
                    [name]: Number(target.value),
                }));
            };

    useEffect(() =>{
        socket.on('room.create.res', (data) => {
            console.log(data);
            if (data.status === "success") {
                localStorage.setItem('data', JSON.stringify(data.data));
                localStorage.setItem('color', 'blue');
                localStorage.setItem('roomId', data.roomId);
                navigate('/play');
            }
        });
    });

    const handleOnJoinBtnClick = () => {
        socket.emit('room.create', {
            id: socket.id,
            name: 'H',
            data: state,
        })
        console.log(state);
    }

    return (
        <>
            <Button
                onClick={onOpen}
                w={'full'}
                bg={'orange.400'}
                color={'white'}
                rounded={'xl'}
                boxShadow={'0 5px 20px 0px rgb(0 0 0 / 43%)'}
                _hover={{
                    bg: 'orange.500',
                }}
                _focus={{
                    bg: 'orange.500',
                }}>
                Tạo phòng
            </Button>

            <Modal
                isOpen={isOpen}
                size={'xl'}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={'center'}>Tạo phòng chơi mới</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {/* <FormControl isRequired>
                            <FormLabel>Tên phòng chơi</FormLabel>
                            <Input value={state.name} onChange={handleChange('name')} />
                        </FormControl> */}
                        <FormControl isRequired mt={3}>
                            <FormLabel>Thời gian suy nghĩ</FormLabel>
                            <Input value={state.thinkingTime} onChange={handleChange('thinkingTime')} />
                        </FormControl>
                        <FormControl isRequired mt={3}>
                            <FormLabel>Số quân cờ tối thiểu khi xét thua</FormLabel>
                            <Input value={state.minimumPiecesToLose} onChange={handleChange('minimumPiecesToLose')} />
                        </FormControl>
                        <HStack mt={3}>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>Kích thước bàn cờ</FormLabel>
                                    <Input value={state.size} onChange={handleChange('size')} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>Số quân chênh lệch</FormLabel>
                                    <Input value={state.differential} onChange={handleChange('differential')} />
                                </FormControl>
                            </Box>
                        </HStack>
                        <HStack mt={3}>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>Số lần tạm dừng</FormLabel>
                                    <Input value={state.pauseTime} onChange={handleChange('pauseTime')} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>Thời gian tạm dừng</FormLabel>
                                    <Input value={state.pausePeriod} onChange={handleChange('pausePeriod')} />
                                </FormControl>
                            </Box>
                        </HStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleOnJoinBtnClick}>
                            Tham gia
                        </Button>
                        <Button onClick={onClose}>Hủy</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
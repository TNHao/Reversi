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
                T???o ph??ng
            </Button>

            <Modal
                isOpen={isOpen}
                size={'xl'}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={'center'}>T???o ph??ng ch??i m???i</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {/* <FormControl isRequired>
                            <FormLabel>T??n ph??ng ch??i</FormLabel>
                            <Input value={state.name} onChange={handleChange('name')} />
                        </FormControl> */}
                        <FormControl isRequired mt={3}>
                            <FormLabel>Th???i gian suy ngh??</FormLabel>
                            <Input value={state.thinkingTime} onChange={handleChange('thinkingTime')} />
                        </FormControl>
                        <FormControl isRequired mt={3}>
                            <FormLabel>S??? qu??n c??? t???i thi???u khi x??t thua</FormLabel>
                            <Input value={state.minimumPiecesToLose} onChange={handleChange('minimumPiecesToLose')} />
                        </FormControl>
                        <HStack mt={3}>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>K??ch th?????c b??n c???</FormLabel>
                                    <Input value={state.size} onChange={handleChange('size')} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>S??? qu??n ch??nh l???ch</FormLabel>
                                    <Input value={state.differential} onChange={handleChange('differential')} />
                                </FormControl>
                            </Box>
                        </HStack>
                        <HStack mt={3}>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>S??? l???n t???m d???ng</FormLabel>
                                    <Input value={state.pauseTime} onChange={handleChange('pauseTime')} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>Th???i gian t???m d???ng</FormLabel>
                                    <Input value={state.pausePeriod} onChange={handleChange('pausePeriod')} />
                                </FormControl>
                            </Box>
                        </HStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleOnJoinBtnClick}>
                            Tham gia
                        </Button>
                        <Button onClick={onClose}>H???y</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
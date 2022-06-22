import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
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
    Button
} from '@chakra-ui/react'

export default function JoinRoomModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [idInput, setIdInput] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('room.join.res', (data) => {
            console.log(data);
            if (data.status === "success") {
                localStorage.setItem('data', JSON.stringify(data.data));
                localStorage.setItem('color', 'red');
                localStorage.setItem('roomId', data.roomId);
                navigate('/play');
            }
        });
    });

    const handleOnJoinBtnClick = () => {
        socket.emit('room.join', { id: socket.id, roomId: idInput , name: 'H'})
        console.log(idInput);
    }

    const handleOnChange = ({target}) => {
        setIdInput(target.value)
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
                Tham gia
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Nhập ID phòng chơi</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>ID phòng</FormLabel>
                            <Input value={idInput} onChange={handleOnChange} placeholder='Ex: 100152' />
                        </FormControl>
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
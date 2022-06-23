import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../../../Services';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button,
    AlertDialogCloseButton
} from '@chakra-ui/react'

export default function StopButton() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate();
    let closeId = '';

    function generateId() {
        let id = Math.floor(Math.random() * (999999999 - 100000000) + 100000000);
        return id.toString();
    };

    useEffect(() => {
        socket.on('close', (data) => {
            if (data.closeId !== closeId)
            {
                closeId = data.closeId;
                navigate('/');
                alert('Đối thủ xin thua, ván cờ kết thúc!');
            }
        })
    }, []);

    function handleClose() {
        socket.emit('close', {id: socket.id, closeId: generateId()});
        onClose();
        navigate('/');
        alert("Xin thua thành công, ván cờ kết thúc!");
    }

    return (
        <>
            <Button onClick={onOpen} colorScheme='red' variant='solid'>Xin dừng</Button>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Xin dừng?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Bạn có chắc chắn muốn kết thúc trận đấu? Bạn sẽ thua cuộc nếu tiếp tục.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button colorScheme='red' mr={3} onClick={handleClose}>
                            Có
                        </Button>
                        <Button ref={cancelRef} onClick={onClose}>
                            Hủy
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
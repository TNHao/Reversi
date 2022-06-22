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

export default function TieButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    // const { isOpen:isOpen0, onOpen:onOpen0, onClose:onClose0 } = useDisclosure();
    const cancelRef = React.useRef();
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('tie.res', (data) => {
            if (data.status === 'success') {
                navigate('/');
                alert("Xin hòa thành công, ván chơi kết thúc!");
            }
        });

        socket.on('tie', () => {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Đối thủ xin hòa trận đấu, bạn có đồng ý?")) {
                console.log('tie tie');
                socket.emit('tie.res', {id: socket.id});
                navigate('/');
            }
        })
    }, []);

    function handleTie() {
        socket.emit('tie', {id: socket.id});
        onClose();
        alert("Yêu cầu xin hòa đã được gửi đi!");
    }

    // function handleTieRes() {
    //     socket.emit('tie.res', {id: socket.id});
    //     onClose0();
    // }

    return (
        <>
            <Button onClick={onOpen} colorScheme='yellow' variant='solid'>Xin hòa</Button>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Xin hòa?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Bạn có chắc chắn xin hòa trận đấu?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button colorScheme='red' mr={3} onClick={handleTie}>
                            Có
                        </Button>
                        <Button ref={cancelRef} onClick={onClose}>
                            Hủy
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {/* <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose0}
                isOpen={isOpen0}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Xin hòa?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Đối thủ xin hòa trận đấu?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button colorScheme='red' mr={3} onClick={handleTieRes}>
                            Đồng ý
                        </Button>
                        <Button ref={cancelRef} onClick={onClose0}>
                            Từ chối
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> */}
        </>
    )
}
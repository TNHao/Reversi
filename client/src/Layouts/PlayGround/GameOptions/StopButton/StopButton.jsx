import React from 'react'
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
                        <Button colorScheme='red' mr={3}>
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
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

export default function TieButton() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

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
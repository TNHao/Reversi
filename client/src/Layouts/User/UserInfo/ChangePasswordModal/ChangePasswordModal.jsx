import React from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    useDisclosure,
    FormLabel,
    Input
} from '@chakra-ui/react';

export default function ChangePasswordModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen} colorScheme={'red'}>Đổi mật khẩu</Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Đổi mật khẩu</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired>
                            <FormLabel>Mật khẩu cũ</FormLabel>
                            <Input />
                        </FormControl>

                        <FormControl isRequired mt={4}>
                            <FormLabel>Mật khẩu mới</FormLabel>
                            <Input />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Nhập lại mật khẩu mới</FormLabel>
                            <Input />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Lưu thay đổi
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
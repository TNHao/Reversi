import { InfoIcon } from '@chakra-ui/icons';
import {
    Box, Button, Center, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent,
    PopoverHeader, PopoverTrigger, Stack, Text, useColorModeValue
} from '@chakra-ui/react';
import CreateRoomModal from './CreateRoomModal/CreateRoomModal';


export default function CreateRoom() {
    return (
        <Center py={6}>
            <Box
                w={'300px'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <Stack
                    textAlign={'right'}
                    p={6}
                    color={useColorModeValue('gray.800', 'white')}
                    align={'center'}>
                    <Box
                        align={'right'}
                        w={'100%'}
                    >
                        <Popover autoFocus={true} placement='bottom-end'>
                            <PopoverTrigger>
                                <Button> <InfoIcon /> </Button>
                            </PopoverTrigger>
                            <PopoverContent textAlign={'left'}>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Bạn muốn sự tự do?</PopoverHeader>
                                <PopoverBody>Hệ thống cho phép bạn tạo phòng chơi với quy định của riêng mình. Bạn có thể mời người khác cùng chơi ở chế độ này.</PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Box>

                    <Text textAlign={'center'} fontSize={'4xl'} fontWeight={800}>
                        Phòng chơi mới
                    </Text>
                </Stack>

                <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                    <CreateRoomModal />
                </Box>
            </Box>
        </Center>
    );
}
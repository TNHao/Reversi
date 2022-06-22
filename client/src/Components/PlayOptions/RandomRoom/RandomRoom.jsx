import { InfoIcon } from '@chakra-ui/icons';
import {
    Box, Button, Center, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent,
    PopoverHeader, PopoverTrigger, Stack, Text, useColorModeValue
} from '@chakra-ui/react';


export default function RandomRoom() {
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
                                <PopoverHeader>Cảm thấy may mắn?</PopoverHeader>
                                <PopoverBody>Hệ thống sẽ chọn cho bạn người chơi ngẫu nhiên với quy định do họ tự điều chỉnh.</PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Box>

                    <Text textAlign={'center'} fontSize={'4xl'} fontWeight={800}>
                        Phòng chơi <br /> ngẫu nhiên
                    </Text>
                </Stack>

                <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                    <Button
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
                </Box>
            </Box>
        </Center>
    );
}
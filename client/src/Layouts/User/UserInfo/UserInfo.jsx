import React from 'react';
import { Box, Stack, FormControl, FormLabel, Input, HStack, Checkbox, Text, Divider, Button } from '@chakra-ui/react';
import ChangePasswordModal from './ChangePasswordModal/ChangePasswordModal';

export default function UserInfo() {
    return (
        <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            borderRadius={{ base: 'none', sm: 'xl' }}

        >
            <Stack spacing="6" w={'50%'} mx={'auto'}>
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input disabled value={"yyy"} fontWeight={800} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input disabled value={"xxxx@gmail.com"} fontWeight={800} />
                </FormControl>
                <ChangePasswordModal />
            </Stack>
        </Box>
    )
}

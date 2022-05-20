import { Button, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import UserInfo from '../UserInfo/UserInfo'

export default function UserProfile() {
    return (
        <>
            <HStack textAlign={"center"} my={8}>
                <Button ml={10} position={'absolute'}>Trở về</Button>
                <Heading
                    w={'100%'}
                    fontWeight={600}
                    fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}>
                    Hi, {' '}
                    <Text as={'span'} color={'green.400'}>
                        Trần Nhật Hào
                    </Text>
                </Heading>
            </HStack>
            <Tabs>
                <TabList>
                    <Tab>Thông tin cá nhân</Tab>
                    <Tab>Lịch sử trận đấu</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <UserInfo />
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

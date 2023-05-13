import { Link } from "react-router-dom"
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem,MenuList, Tab, TabList, Tabs, Text } from "@chakra-ui/react"

import { theme } from "../main"

import LoginLinksWrapper from "./LoginLinksWrapper"
import LoginWrapper from "./LoginWrapper"
import { Image } from '@chakra-ui/react'
import style from './Navbar.module.css'

const Navbar = () => (
        <>
            <Tabs>
                <TabList justifyContent='center' display='flex' alignItems='center'>
                    <LoginLinksWrapper>
                        <Tab><Link to={'/myaccount'}>Moje konto</Link></Tab>
                        <Tab><Link to={'/addlist'}>Dodaj listę</Link></Tab>
                        
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                Moje listy
                            </MenuButton>
                            <MenuList>
                                <MenuItem><Link to={'/mylists'}>Wszystkie</Link></MenuItem>
                                <MenuItem><Link to={'/toaccept'}>Do zaakceptowania</Link></MenuItem>
                            </MenuList>
                        </Menu>
                        <Tab><Link to={'/todo'}>Listy do realizacji</Link></Tab>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                Zatwierdzone
                            </MenuButton>
                            <MenuList>
                                <MenuItem><Link to={'/approved'}>Przez odbiorcę</Link></MenuItem>
                                <MenuItem><Link to={'/myapproved'}>Przeze mnie</Link></MenuItem>
                            </MenuList>
                        </Menu>
                        <Link to={'/archived'}><Button colorScheme='red'>Archiwum</Button></Link>
                    </LoginLinksWrapper>
                    <LoginWrapper>
                        <Tab><Link to={'/login'}>Zaloguj się</Link></Tab>
                        <Tab><Link to={'/signup'}>Zarejestruj się</Link></Tab>
                        <Tab><Link to={'/faq'}>FAQ</Link></Tab>
                    </LoginWrapper>
                </TabList>
            <Link to={'/'}>
                <Text
                    fontSize={theme.fontSizes.l}
                    fontWeight={theme.fontWeight.max}
                    mt={9} mb={2}
                    className={style.navbarTitleContainer}
                >
                    
                        <Image width='190px' src='../../public/dont.png' alt='dont' className={style.navbarImg} />
                        GoToShop
                    
                    
                </Text>
            </Link>
            {/* <Text
                fontSize={theme.fontSizes.m}
                fontWeight={theme.fontWeight.mid}
                mb={9}
            >
                Dobre zakupy
            </Text> */}
            </Tabs>
        </>
    )

export default Navbar
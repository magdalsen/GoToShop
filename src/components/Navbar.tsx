import { Tabs, TabList, Tab, Text, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { ChevronDownIcon } from '@chakra-ui/icons'
import { theme } from "../main"
import { Link } from "react-router-dom"
import LoginLinksWrapper from "./LoginLinksWrapper"
import LoginWrapper from "./LoginWrapper"

const Navbar = () => {
    return (
        <>
            <Tabs>
                <TabList justifyContent='center'>
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
                >
                    Shopping maker
                </Text>
            </Link>
            <Text
                fontSize={theme.fontSizes.m}
                fontWeight={theme.fontWeight.mid}
                mb={9}
            >
                Zrób komuś zakupy lub poproś o nie!
            </Text>
            </Tabs>
        </>
    )
}

export default Navbar
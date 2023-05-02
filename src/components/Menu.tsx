import { Tabs, TabList, Tab, Text } from "@chakra-ui/react"
import { theme } from "../main"
import { Link } from "react-router-dom"
import LoginLinksWrapper from "./LoginLinksWrapper"
import LoginWrapper from "./LoginWrapper"

const Menu = () => {
    return (
        <>
            <Tabs>
                <TabList justifyContent='center'>
                    <LoginLinksWrapper>
                        <Tab><Link to={'/myaccount'}>Moje konto</Link></Tab>
                        <Tab><Link to={'/mylists'}>Moje listy</Link></Tab>
                        <Tab><Link to={'/addlist'}>Dodaj listę</Link></Tab>
                    </LoginLinksWrapper>
                    <LoginWrapper>
                        <Tab><Link to={'/login'}>Zaloguj się</Link></Tab>
                        <Tab><Link to={'/signup'}>Zarejestruj się</Link></Tab>
                    </LoginWrapper>
                    <Tab><Link to={'/faq'}>FAQ</Link></Tab>
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

export default Menu
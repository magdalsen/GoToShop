import { Tabs, TabList, Tab, Text } from "@chakra-ui/react"
import { theme } from "../main"
import { Link } from "react-router-dom"

const Menu = () => {
    return (
        <>
            <Tabs>
                <TabList justifyContent='center' width="100vw">
                    <Tab><Link to={'/login'}>Zaloguj się</Link></Tab>
                    <Tab><Link to={'/signup'}>Zarejestruj się</Link></Tab>
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
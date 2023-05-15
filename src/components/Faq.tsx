import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";

const styles = { bg: 'blueviolet', color: 'white' };

const Faq = () => (
        <>
        <Accordion defaultIndex={[0]} allowMultiple width='500px'>
            <AccordionItem>
                <h2>
                <AccordionButton _expanded={styles}>
                    <Box as="span" flex='1' textAlign='left'>
                    Na czym polega GoToShop?
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                Polega na wzajemnej - zazwyczaj sąsiedzkiej - pomocy w robieniu zakupów. Możesz poszukać adresu, który jest w Twojej
                okolicy i przy okazji robienia swoich zakupów - zrealizować listę zakupów sąsiada lub znajomego.
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2>
                <AccordionButton _expanded={styles}>
                    <Box as="span" flex='1' textAlign='left'>
                    Jaka jest idea?
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                Jest kilka myśli przewodnich: oszczędność czasu, otrzymanie napiwku w wielkości zdefiniowanej przez odbiorcę zakupów,
                poznanie sąsiadów lub osób mieszkających w Twojej okolicy.
                </AccordionPanel>
            </AccordionItem>
            </Accordion>
        </>
    )

export default Faq
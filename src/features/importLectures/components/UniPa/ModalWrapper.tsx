import { CalendarIcon, SearchIcon } from "@chakra-ui/icons";
import {
    Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box,
    ExpandedIndex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader,
    ModalOverlay, Text, useToast
} from "@chakra-ui/react";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import { FaCaretDown, FaPollH } from "react-icons/fa";
import { API_FETCH_UNIPA_URL, FetchFromUnipaResponse } from "../../../../pages/api/unipa/fetch";
import ResultTabs from "./ResultTabs";
import SearchTabs from "./SearchTabs";

const oidCurriculum = /oidCurriculum=(\d{4,})/;
const onlyDigits = /^\d{4,}$/

export const UnipaLabel = () => <>
    <Image
        src={"/images/UniPa.svg"}
        alt={""}
        width={25}
        height={25}
    />
    <Text ml={"1em"}> UniPa</Text>
</>


const ModalFromUnipa: React.FC<{ isOpen: boolean, onClose: () => void, onOpen: () => void }> = ({ isOpen, onClose, onOpen }) => {
    const [url, setUrl] = useState("")
    const [data, setResponse] = useState(undefined as unknown as FetchFromUnipaResponse)
    const toast = useToast()
    const [tabOpens, setOpenTabs] = useState([0] as ExpandedIndex)

    const fetchFromUnipa = async (input: string): Promise<FetchFromUnipaResponse> => {
        let oid: string
        if (input.match(onlyDigits)) {
            oid = input
        } else {
            const matches = input.match(oidCurriculum) as RegExpMatchArray
            oid = matches[1]
        }
        let result: FetchFromUnipaResponse = { error: "la richiesta non è andata a buon fine" }
        try {
            result = await (await fetch(`${API_FETCH_UNIPA_URL}?oidCurriculum=${oid}`, {
                method: 'GET',
            })).json() as FetchFromUnipaResponse

        } catch {
            if (!navigator.onLine) {
                toast({
                    title: 'Offline',
                    description: "Non puoi importare le materie senza una connessione ad Internet",
                    status: 'info',
                    duration: 1500,
                    isClosable: false,
                    position: "top",
                    variant: "top-accent"
                })
            }
            else {
                toast({
                    title: 'Oops',
                    description: "Qualcosa è andato storto... riprova più tardi",
                    status: 'error',
                    duration: 1500,
                    isClosable: true,
                    position: "top",
                    variant: "left-accent"
                })
            }
        }
        finally {
            return result
        }
    }


    useEffect(() => {
        if (url !== ""
            && (url.match(oidCurriculum) !== null
                || url.match(onlyDigits) !== null)) {
            // if URL is valid
            console.log("Fetching " + url)
            fetchFromUnipa(url).then(value => {
                if ("error" in value) {
                    return
                }
                setResponse(value);
                setOpenTabs([1])
            })
        }
    }, [url]
    )

    return (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    UniPa
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <Accordion mt={"1em"} allowMultiple allowToggle index={tabOpens}
                        onChange={setOpenTabs}>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='center' fontSize={"xl"}>
                                        <SearchIcon pr={2} />Cerca
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel>
                                <SearchTabs setUrl={setUrl} />
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem isDisabled={data === undefined}>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='center' fontSize={"xl"}>
                                        <CalendarIcon /> Risultati
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel>
                                <ResultTabs result={data} closeModal={onClose} />
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalFromUnipa
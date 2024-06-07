import { Button, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { FaCloudDownloadAlt } from "react-icons/fa"

const SyncToTelegram: React.FC = () => {
    const { isOpen: isOpenUnipa, onOpen: onOpenUnipa, onClose: onCloseUnipa } = useDisclosure()

    return <>
        <Menu isLazy={true}>
            <MenuButton as={Button} leftIcon={<FaCloudDownloadAlt />}
                size="sm"
                fontSize="md"
                variant="outline"
            >
                Importa Materie
            </MenuButton>
            <MenuList>
                <MenuItem onClick={onOpenUnipa} isDisabled={true}>
                    <UnipaLabel />
                </MenuItem>
            </MenuList>
        </Menu>
        <ModalFromUnipa onOpen={onOpenUnipa} isOpen={isOpenUnipa} onClose={onCloseUnipa} />
    </>
}

export default React.memo(ImportLecture)
import { useColorModeValue } from '@chakra-ui/color-mode';
import { InfoIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import {
  Popover, PopoverArrow, PopoverBody,
  PopoverCloseButton,
  PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger
} from '@chakra-ui/popover';
import { Center, HStack, Radio, RadioGroup, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { borderColor } from '../../../theme';
import { editAverageBonus, editPreference, IAverageBonus, selectFinalBonus } from '../preferencesDuck';

const InfoAverageBonusPopover = React.memo(() => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const openPopover = () => setPopoverOpen(true);
  const closePopover = () => setPopoverOpen(false);
  const greenInfoColor = useColorModeValue('green.600', 'green.300');

  return (
    <Popover isOpen={isPopoverOpen} onClose={closePopover} placement="top">
      <PopoverTrigger>
        <div>
          <InfoIcon
            color={greenInfoColor}
            boxSize="0.8em"
            aria-label="Pulsante per informazioni aggiuntive sul Bonus di Profitto"
            focusable={true}
            onClick={openPopover}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader textAlign="center">
          Cosa è il Bonus di Profitto?
        </PopoverHeader>
        <PopoverBody fontSize="sm">
          Il <strong>Bonus di Profitto</strong> è un punteggio aggiunto al voto
          finale in base alla media <i>M</i>
        </PopoverBody>
        <PopoverFooter fontSize="sm">
          Controlla il regolamento del tuo CdL, o chiedi ai tuoi rappresentanti, per ulteriori dettagli
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
});

const FinalThesisBonusPopover = React.memo(() => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const openPopover = () => setPopoverOpen(true);
  const closePopover = () => setPopoverOpen(false);
  const greenInfoColor = useColorModeValue('green.600', 'green.300');

  return (
    <Popover isOpen={isPopoverOpen} onClose={closePopover} placement="top">
      <PopoverTrigger>
        <div>
          <InfoIcon
            color={greenInfoColor}
            boxSize="0.8em"
            aria-label="Pulsante per informazioni aggiuntive sulla Prova Finale"
            focusable={true}
            onClick={openPopover}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader textAlign="center">
          Valutazione in base alla prova finale
        </PopoverHeader>
        <PopoverBody fontSize="sm">
          La valutazione della prova finale viene aggiunta al voto finale, dopo aver calcolato la media.
          Inserisci il valore manualmente con l'apposito slider
        </PopoverBody>
        <PopoverFooter fontSize="sm">
          Controlla il regolamento del tuo CdL, o chiedi ai tuoi rappresentanti, per ulteriori dettagli
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
});

const SingleInput: React.FC<IAverageBonus> = React.memo(({ label, id, value, ...props }) => {
  const cellWidth = useBreakpointValue({ base: '8em', md: '9em' });
  const dispatch = useAppDispatch()

  const setValue = (id: string, value: number) => {
    dispatch(editAverageBonus({
      id,
      key: "value",
      value,
    }))
  };
  return (
    <SimpleGrid
      w={cellWidth}
      {...props}
      templateColumns={'min-content min-content'}
      justifyContent="center"
      //   justifyItems="center"
      textAlign="center"
      alignItems="center"
      border="1px"
      borderColor={borderColor}
      borderRadius="md"
      py={1}
      my={1}
    >
      <Input
        type="number"
        id={'abc' + id}
        size="sm"
        name={id}
        value={value}
        min={0}
        fontSize="md"
        variant="flushed"
        placeholder="0"
        onChange={e =>
          setValue(e.target.name, Math.abs(e.target.valueAsNumber))
        }
        onClick={e => (e.target as HTMLInputElement).select()}
        w="2em"
        textAlign="center"
      />
      <Text
        as="label"
        colorScheme="whatsapp"
        htmlFor={'abc' + id}
        mx={2}
        children={label}
      />
    </SimpleGrid>
  );
})

function FinalBonusComponent({
  ...props
}) {
  const { averageBonus, whatToSum, finalThesis } = useAppSelector(selectFinalBonus)
  const appDispatch = useAppDispatch()
  const [temporarySliderValue, setTemporarySliderValue] = useState(finalThesis)

  const toggleRadio = () => {
    if (whatToSum === "averageBonus") {
      appDispatch(editPreference({
        key: "whatToSum",
        value: "finalThesis"
      }))
    }
    else {
      appDispatch(editPreference({
        key: "whatToSum",
        value: "averageBonus"
      }))
    }
  }

  const endOfSliding = (value: number) => {
    appDispatch(editPreference({
      key: "finalThesis",
      value: value
    }))
  }

  return (
    <Box
      {...props}
      as="fieldset"
      border="1px"
      borderColor={borderColor}
      borderRadius="xl"
      p={1}
      display={"grid"}
      gridTemplateColumns={"1fr"}
    >
      <RadioGroup
        onChange={toggleRadio}
        value={whatToSum}
      >
        <HStack
          m={"auto"}
          justifyContent="space-evenly"
        >
          <HStack>
            <Radio value={"averageBonus"} name={"averageBonus"} spacing={1}>Bonus di Profitto</Radio>
            <InfoAverageBonusPopover />
          </HStack>
          <HStack>
            <Radio value={"finalThesis"} name={"finalThesis"} spacing={1}>Prova Finale</Radio>
            <FinalThesisBonusPopover />
          </HStack>
        </HStack>
      </RadioGroup>
      {
        whatToSum === "averageBonus" ? <Flex
          wrap="wrap"
          justifyContent="space-evenly"
        >
          {[...Array(12)].map((_, i) => <SingleInput {...averageBonus[i]} key={averageBonus[i].id} />)}
        </Flex> : <Center>
          <Slider
            colorScheme="teal"
            aria-label='slider-ex-1' defaultValue={0} min={0} max={10} step={0.1} my={"2em"} maxWidth={"80%"} value={temporarySliderValue} onChange={setTemporarySliderValue} onChangeEnd={endOfSliding} >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
              <SliderThumb boxSize={6}>
                <Text fontSize={"xs"} textColor={"black"}>{temporarySliderValue}</Text>
              </SliderThumb>
            </Slider>
        </Center>
      }

    </Box>
  );
}

export default FinalBonusComponent;

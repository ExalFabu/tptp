import { SimpleGrid, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { batch } from 'react-redux';
import Footer from '../common/Footer';
import Header from '../common/Header';
import Average from '../features/average/Average';
import { dangerouslySetAllOptions, IOptions } from '../features/average/averageDuck';
import { dangerouslySetAllLectures, ILecture } from '../features/lectures/lectureDuck';
import LectureTable from '../features/lectures/LectureTable';
import { dangerouslySetAllPreferences, IAverageBonus, IPreferences } from '../features/preferences/preferencesDuck';
import PreferencesTab from '../features/preferences/PreferencesTab';
import { exactWidth } from '../theme';
import { useAppDispatch } from './hooks';
import { setDebug, useBackButton, useClosingBehavior, useInitData, useViewport } from '@tma.js/sdk-react';



const TPTP: React.FC = () => {
  const dispatch = useAppDispatch()
  const toast = useToast()
  setDebug(true)

  useEffect(() => {
    // Migrate from previous localStoage data
    const lectures = localStorage.getItem("lectures")
    const avBonus = localStorage.getItem("averageBonus")
    const pref = localStorage.getItem("options")
    const finalAverage = localStorage.getItem("finalAverage")
    if (lectures !== null && avBonus !== null && pref !== null && finalAverage !== null) {
      localStorage.removeItem("lectures")
      localStorage.removeItem("averageBonus")
      localStorage.removeItem("options")
      localStorage.removeItem("finalAverage")
      const previousStoredLectures = (JSON.parse(lectures)) as ILecture[]
      const previousStoredAverageBonus = JSON.parse(avBonus) as IAverageBonus[]
      const previousStoredPreferences: IPreferences = {
        whatToSum: "averageBonus",
        finalThesis: 0,
        ...JSON.parse(pref) as Omit<IPreferences, "whatToSum" | "finalThesis">
      }
      previousStoredPreferences.averageBonus = previousStoredAverageBonus
      const previousStoredOptions = JSON.parse(finalAverage) as IOptions
      console.log("Migrating from previous version... this should happen only once")
      batch(() => {
        dispatch(dangerouslySetAllLectures(previousStoredLectures));
        dispatch(dangerouslySetAllOptions(previousStoredOptions));
        dispatch(dangerouslySetAllPreferences(previousStoredPreferences))
      })
    }

  }, [])

  useEffect(() => {
    if (window.location.pathname.match(/\/?(\w|\d){10,}/) !== null) {
      toast({
        title: "Link obsoleto",
        description: "Il link che hai utilizzato è obsoleto, per importare le materie usa la funzionalità in alto a destra",
        status: 'info',
        duration: 5000,
        isClosable: true,
        position: "top-left",
        variant: "top-accent"
      })
      window.history.replaceState("", "", window.location.href.replace(window.location.pathname, ""))
    }
  }, [])

  // TELEGRAM 

  const initData = useInitData()
  const vp = useViewport()
  const bb = useBackButton()
  const closingBehavior = useClosingBehavior()
  const [welcomeToastShown, setWelcomeToastShown] = useState(false)


  useEffect(() => {
    const user = initData?.user
    if (user && !welcomeToastShown) {
      let name = user.firstName + user.lastName
      toast({
        description: `Bentornato, ${name}`,
        position: "bottom",
        variant: "top-accent",
        duration: 1500,
        status: "success",
        size: "sm"
      })
      setWelcomeToastShown(true);
    }
    if (vp) {
      console.log("TG, expanding")
      vp.expand()
    }
    if (bb) {
      bb.hide()
    }
    if (closingBehavior) {
      closingBehavior.disableConfirmation()
    }
  }, [initData, vp, bb, closingBehavior])

  return (
    <>
      <SimpleGrid
        templateAreas={{
          base: `
                  "Header"
                  "LectureTable"
                  "Average"
                  "PreferencesTab"
                  `,
          xl: `
                "Header Header"
                "LectureTable Average"
                "LectureTable PreferencesTab"
                `,
        }}
        justifyItems="center"
        alignItems="start"
        templateRows={{ xl: '120px 120px 1fr' }}
        rowGap={2}
        columnGap={2}
        justifyContent="center"
        mt={"1em"}
      >
        <Header gridArea="Header" w={exactWidth} />
        <LectureTable gridArea="LectureTable" w={exactWidth} />
        <Average gridArea="Average" />
        <PreferencesTab gridArea="PreferencesTab" />
      </SimpleGrid>
      <Footer />
    </>
  );
}

export default TPTP;

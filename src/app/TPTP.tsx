import { SimpleGrid, useToast } from '@chakra-ui/react';
import { BackButton, ClosingBehavior, InitData, MiniApp, Popup, Viewport, isTMA, setDebug, useBackButton, useClosingBehavior, useInitData, useMiniApp, usePopup, useViewport } from '@tma.js/sdk-react';
import { useCallback, useEffect, useState } from 'react';
import { batch } from 'react-redux';
import Footer from '../common/Footer';
import Header from '../common/Header';
import Average from '../features/average/Average';
import { IOptions, dangerouslySetAllOptions } from '../features/average/averageDuck';
import LectureTable from '../features/lectures/LectureTable';
import { ILecture, dangerouslySetAllLectures } from '../features/lectures/lectureDuck';
import PreferencesTab from '../features/preferences/PreferencesTab';
import { IAverageBonus, IPreferences, dangerouslySetAllPreferences } from '../features/preferences/preferencesDuck';
import { exactWidth } from '../theme';
import { useAppDispatch } from './hooks';
import { retrieveFromBackend, saveToBackend } from '../features/telegram/telegramDuck';
import { IAppState, persistConfig, persistor } from './store';
import getStoredState from 'redux-persist/es/getStoredState';


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
  let initData: InitData | undefined = undefined;
  let miniApp: MiniApp | undefined = undefined;
  let vp: Viewport | undefined = undefined;
  let bb: BackButton | undefined = undefined;
  let closingBehavior: ClosingBehavior | undefined = undefined;
  let popup: Popup | undefined = undefined

  try { initData = useInitData() } catch (e) { console.error("Error while initializing TG data") }
  try { miniApp = useMiniApp() } catch (e) { console.error("Error while initializing TG data") }
  try { vp = useViewport() } catch (e) { console.error("Error while initializing TG data") }
  try { bb = useBackButton() } catch (e) { console.error("Error while initializing TG data") }
  try { closingBehavior = useClosingBehavior() } catch (e) { console.error("Error while initializing TG data") }
  try { popup = usePopup() } catch (e) { console.error("Error while initializing TG data") }

  const [telegramInitted, setTelegramInitted] = useState(false)

  const onBackClick = useCallback(async () => {
    if (!popup) return
    if (popup.isOpened) return;
    const btnId = await popup.open({
      title: "TPTP",
      message: "Vuoi salvare i dati?",
      buttons: [
        {
          id: "KO",
          text: "Esci senza salvare",
          type: "destructive"
        },
        {
          id: "OK",
          type: "ok"
        },
        {
          id: "STAY",
          type: "cancel"
        }
      ]
    });
    console.log("OnBackClick", btnId)
    if(btnId === "KO") {
      return miniApp?.close()
    }
    else if (btnId === "STAY" || btnId === null) {
      return;
    }
    const res = await getStoredState(persistConfig) as IAppState
    await saveToBackend(res)
    miniApp?.close()
  }, [popup])


  useEffect(() => {
    const initTelegram = async () => {
      const tma = await isTMA()
      if (!tma || telegramInitted) return null;

      const value = await retrieveFromBackend()
      let welcome = "Benvenuto"
      if (value) {
        const { lectures, options, preferences } = value
        batch(() => {
          dispatch(dangerouslySetAllLectures(lectures));
          dispatch(dangerouslySetAllOptions(options));
          dispatch(dangerouslySetAllPreferences(preferences))
        })
        welcome = "Bentornato"
      }
      const user = initData?.user
      if (user && !telegramInitted) {
        let name = user.firstName + user.lastName
        toast({
          description: `${welcome}, ${name}`,
          position: "bottom",
          variant: "top-accent",
          duration: 2500,
          status: "success",
          size: "sm"
        })
      }
      setTelegramInitted(true);
    }
    initTelegram();
  }, [])

  useEffect(() => {
    if (vp) {
      console.log("TG, expanding")
      vp.expand()
    }

    if (bb) {
      bb.show()
      bb.on("click", async () => {
        console.log("clickeeeeddd", popup)
        onBackClick();
      })
    }
    if (closingBehavior) {
      closingBehavior.enableConfirmation()
    }
  }, [vp, bb, closingBehavior])

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

import { LaunchParams, isTMA, retrieveLaunchParams } from "@tma.js/sdk-react";
import { IAppState } from "../../app/store";
import { PayloadAction, Reducer, createSlice } from "@reduxjs/toolkit";

export interface ITelegramSettings {
    saved: boolean
}

export const createInitialTelegramSettings = (): ITelegramSettings => {
    return {
        saved: false
    }
}

export const retrieveFromBackend = async (): Promise<IAppState | null> => {
    const tma = await isTMA()
    if (!tma) return null;
    let launchParams: LaunchParams;
    try {
        launchParams = retrieveLaunchParams()
    } catch (e) {
        console.error("Error while building launchParams, probably not in TG environment")
        return null;
    }
    if (launchParams == null) return null;
    const { initDataRaw } = launchParams;
    try {
        const result = await fetch(
            "/api/data",
            {
                method: "GET",
                headers: {
                    Authorization: `tma ${initDataRaw}`
                }
            }
        )
        if (result.ok) {
            const body = await result.json() as IAppState
            console.log(body);
            return body;
        }
    } catch (e) {
        console.error("Error while fetching", e)
    }
    return null;
}

export const saveToBackend = async (state: IAppState): Promise<void> => {
    const tma = await isTMA()
    if (!tma) return;

    let launchParams: LaunchParams;
    try {
        launchParams = retrieveLaunchParams()
    } catch (e) {
        console.error("Error while building launchParams", e)
        return;
    }
    if (launchParams == null) return;
    const { initDataRaw } = launchParams;
    try {
        const result = await fetch(
            "/api/data",
            {
                method: "PUT",
                headers: {
                    Authorization: `tma ${initDataRaw}`
                },
                body: JSON.stringify({ state })
            }
        )
        return
    } catch (e) {
        console.error("Error while fetching", e)
    }
    return;
}


const telegramSlice = createSlice({
    name: 'telegram',
    initialState: createInitialTelegramSettings,
    reducers: {
        save: (current, action: PayloadAction<void>): ITelegramSettings => {
            return {
                saved: true
            }
        },
        invalidate: (current, action: PayloadAction<void>): ITelegramSettings => {
            return {
                saved: false,
            }
        }
    },
});

export default telegramSlice.reducer;


export const reducers = {
    retrieveFromBackend,
    saveToBackend
}

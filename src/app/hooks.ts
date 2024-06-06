import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, IAppState } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<IAppState> = useSelector

import { useEffect, useState } from 'react';
import { TelegramWebApps } from 'telegram-webapps-types';

/**
 * Hook to get the initial data from the Telegram Web Apps API already parsed.
 * @example
 * const { hash } = useTelegramInitData();
 * console.log({ hash });
 */
function useTelegramInitData() {
    const [data, setData] = useState<TelegramWebApps.WebAppInitData>({});

    useEffect(() => {
        const firstLayerInitData = Object.fromEntries(
            new URLSearchParams(window.Telegram.WebApp.initData)
        );

        const initData: Record<string, string> = {};

        for (const key in firstLayerInitData) {
            try {
                initData[key] = JSON.parse(firstLayerInitData[key]);
            } catch {
                initData[key] = firstLayerInitData[key];
            }
        }

        setData(initData);
    }, []);

    return data;
}

export default useTelegramInitData;
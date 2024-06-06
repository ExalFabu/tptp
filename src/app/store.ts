import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import averageReducer, {
  createInitialAverage,
  IOptions
} from '../features/average/averageDuck';
import lecturesReducer, {
  createEmptyLecture,
  ILecture
} from '../features/lectures/lectureDuck';
import preferencesReducer, {
  createInitialPreferences,
  IPreferences
} from '../features/preferences/preferencesDuck';

export interface IAppState {
  lectures: ILecture[];
  preferences: IPreferences;
  options: IOptions;
}

const persistConfig: PersistConfig<IAppState> = {
  key: 'TPTP',
  storage,
  version: 0,
};
const rootReducer = combineReducers({
  lectures: lecturesReducer,
  preferences: preferencesReducer,
  options: averageReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialStorageState: IAppState = {
  lectures: [createEmptyLecture()],
  preferences: createInitialPreferences(),
  options: createInitialAverage(),
};

const logger = createLogger({
  level: 'info',
});

export const store = configureStore({
  reducer: persistedReducer,
  preloadedState: initialStorageState,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
    // .concat(logger);
  },
});

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

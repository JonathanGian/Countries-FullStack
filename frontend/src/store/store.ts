import { configureStore } from '@reduxjs/toolkit';
import testReducer from './slices/testSlice';
import countriesReducer from './slices/countriesSlice';
import weatherReducer from './slices/weatherSlice';

export const store = configureStore({
  reducer: {
    test: testReducer,
    countries: countriesReducer,
    weather : weatherReducer
  },
  
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       // Ignore these action types
  //       ignoredActions: ['test/fetchTestData/rejected'],
  //     },
  //   }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
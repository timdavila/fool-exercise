import { configureStore } from '@reduxjs/toolkit'
import watchlistReducer from './watchListSlice'

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
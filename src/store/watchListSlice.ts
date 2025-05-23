import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Instrument } from '~types/quotes'

interface WatchlistState {
  instruments: Instrument[]
}

const initialState: WatchlistState = {
  instruments: [],
}

const watchListSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    setWatchlist: (state, action: PayloadAction<Instrument[]>) => {
      state.instruments = action.payload
    },
    watchInstrument: (state, action: PayloadAction<Instrument>) => {
      const exists = state.instruments.some(i => i.instrumentId === action.payload.instrumentId)
      if (!exists) {
        state.instruments.push(action.payload)
      }
    },
    unWatchInstrument: (state, action: PayloadAction<Instrument>) => {
      state.instruments = state.instruments.filter(i => i.instrumentId !== action.payload.instrumentId)
    },
    toggleWatchingInstrument: (state, action: PayloadAction<Instrument>) => {
      const exists = state.instruments.some(i => i.instrumentId === action.payload.instrumentId)
      if (exists) {
        state.instruments = state.instruments.filter(i => i.instrumentId !== action.payload.instrumentId)
      } else {
        state.instruments.push(action.payload)
      }
    }
  },
})

export const {
  setWatchlist,
  watchInstrument,
  unWatchInstrument,
  toggleWatchingInstrument
} = watchListSlice.actions

export default watchListSlice.reducer

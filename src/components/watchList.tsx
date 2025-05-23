'use client'

import useWatchedCompanies from 'src/hooks/useWatchedCompanies'
import WatchListSkeleton from './loading/watchListSkeleton'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { setWatchlist, unWatchInstrument } from '../store/watchListSlice'
import WatchButton from './ui/watchButton'
import CompanyLink from './ui/companyLink'
import { Instrument } from '~types/quotes'
import { getRealtimeQuotes } from '~data/services/quotes-service'

export default function WatchList(){
  const dispatch = useDispatch()
  const watchlist = useSelector((state: RootState) => state.watchlist.instruments)
  const { data: initialData, loading, error } = useWatchedCompanies()
  const [enrichedWatchlist, setEnrichedWatchlist] = useState([])

  useEffect(() => {
    const quotes = getRealtimeQuotes(watchlist.map(instrument => instrument.instrumentId))
    const updated = watchlist.map(instrument => {
      // const quote = quotes[instrument.instrumentId] // if we were using a real API
      // Simulate a quote for demo purposes instead
      const keys = Object.keys(quotes)
      const randomKey = keys[Math.floor(Math.random() * keys.length)]
      const quote = quotes[randomKey]

      return {
        ...instrument,
        currentPrice: quote.current_price,
        priceChange: quote.change,
        percentChange: quote.percent_change,
      }
    })
    setEnrichedWatchlist(updated)
  }, [watchlist])

  useEffect(() => {
    if (initialData?.instruments.length) {
      const timer = setTimeout(() => {
        dispatch(setWatchlist(initialData.instruments))
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [initialData, dispatch])

  const handleUnwatchInstrument = (instrument: Instrument) => {
    dispatch(unWatchInstrument(instrument))
  }

  if (loading || watchlist === null) {
    return <WatchListSkeleton />
  }

  if (error) {
    return <div>Error loading watch list</div>
  }

  return (
    <div style={{ maxHeight: '200px', overflowY: 'auto'}}>
      {(!watchlist.length ? (
        <div>No watched companies yet</div>
      ) : (
      <table className="w-full mb-12px">
      <thead>
        <tr>
        <th className="px-4 py-2">Symbol</th>
        <th className="px-4 py-2">Name</th>
        <th className="px-4 py-2">Price</th>
        <th className="px-4 py-2">Change</th>
        <th className="px-4 py-2">Change %</th>
        <th className="px-4 py-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        {enrichedWatchlist.map(instrument => (
          <tr key={instrument.instrumentId} className="text-center">
            <td className="px-4 py-2">
            <CompanyLink symbol={instrument.symbol} />
            </td>
            <td className="px-4 py-2">{instrument.name}</td>
            <td className="px-4 py-2">{instrument.currentPrice}</td>
            <td className="px-4 py-2">{instrument.priceChange}</td>
            <td className="px-4 py-2">{instrument.percentChange}</td>
            <td className="px-4 py-2">
            <WatchButton 
              instrumentId={instrument.instrumentId}
              includeText={false}
              isCurrentlyWatching={true}
              toggleWatching={() => handleUnwatchInstrument(instrument)}
            />
            </td>
          </tr>
        ))}
      </tbody>
      </table>
      ))}
    </div>
  )
}
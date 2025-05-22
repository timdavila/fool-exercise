'use client'

import useWatchedCompanies from 'src/hooks/useWatchedCompanies'
import WatchListSkeleton from './loading/watchListSkeleton'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { setWatchlist, unWatchInstrument } from '../store/watchListSlice'
import WatchButton from './ui/watchButton'
import CompanyLink from './ui/companyLink'
import { Instrument } from '~types/quotes'

const WatchList = () => {
  const dispatch = useDispatch()
  const watchlist = useSelector((state: RootState) => state.watchlist.instruments)
  const { data: initialData, loading, error } = useWatchedCompanies()

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
        {watchlist.map(instrument => (
          <tr key={instrument.instrumentId} className="text-center">
            <td className="px-4 py-2">
            <CompanyLink symbol={instrument.symbol} />
            </td>
            <td className="px-4 py-2">{instrument.name}</td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2"></td>
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

export default WatchList
'use client'

import useWatchedCompanies from 'src/hooks/useWatchedCompanies'
import WatchListSkeleton from './loading/watchListSkeleton'
import {useEffect, useState} from 'react'
import {Instrument} from '~types/quotes'
import WatchButton from './ui/watchButton'
import CompanyLink from './ui/companyLink'

const WatchList = () => {
  const { data, loading, error } = useWatchedCompanies()
  const [watchList, setWatchList] = useState<Instrument[] | null>(null)

  useEffect(() => {
    if (data) {
      setWatchList(data?.instruments);
    }
  }, [data])

  if (loading || watchList === null) {
    return <WatchListSkeleton />
  }

  if (error) {
    return <div>Error loading watch list</div>
  }

  return (
    <div style={{ maxHeight: '200px', overflowY: 'auto'}}>
      {(!watchList.length ? (
        <div>No watched companies yet</div>
      ) : (
      <table className="table-auto">
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
        {watchList.map(watch => (
          <tr key={watch.instrumentId} className="text-center">
            <td className="px-4 py-2">
            <CompanyLink symbol={watch.symbol} />
            </td>
            <td className="px-4 py-2">{watch.name}</td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2">
            <WatchButton 
              instrumentId={watch.instrumentId} 
              includeText={false}
              isCurrentlyWatching={true}
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
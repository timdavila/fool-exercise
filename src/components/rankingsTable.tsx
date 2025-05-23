'use client'
import Link from "next/link"
import {Ranking} from "~types/rankings";
import {formatPercent} from "~utils/formatters";
import WatchButton from "./ui/watchButton";
import CompanyLink from "./ui/companyLink";
import { toggleWatchingInstrument } from '../store/watchListSlice'
import { Instrument } from "~types/quotes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../store'

type RankingsProps = {
  rankings: Ranking[]
}
const RankingsTable = ({ rankings }: RankingsProps) => {
  const watchlist = useSelector((state: RootState) => state.watchlist.instruments)
  const dispatch = useDispatch()

  const handleToggleInstrument = (instrument: Instrument) => {
    dispatch(toggleWatchingInstrument(instrument))
  }
  
  return (
    <table className="w-full mb-12px">
      <thead>
      <tr>
        <th>Rank</th>
        <th>Symbol</th>
        <th>Name</th>
        <th>Sector</th>
        <th>Alien CEO %</th>
        <th>Watch</th>
      </tr>
      </thead>
      <tbody>
      {rankings.map(ranking => {
        const isWatched = watchlist.some(
          watched => watched.instrumentId === ranking.instrument.instrumentId
        )
        return (
        <tr key={ranking.currentRank.value} className="text-center">
          <td>{ranking.currentRank.value}</td>
          <td>
            <CompanyLink symbol={ranking.instrument.symbol} />
          </td>
          <td>{ranking.instrument.name}</td>
          <td>{ranking.instrument.sector}</td>
          <td>{formatPercent(ranking.instrument.quantScore.value)}</td>
            <td>
              <WatchButton 
              instrumentId={ranking.instrument.instrumentId} 
              includeText={false}
              isCurrentlyWatching={isWatched}
              toggleWatching={() => handleToggleInstrument(ranking.instrument)}
              />
            </td>
        </tr>
      )})}
      </tbody>
    </table>
  )
}

export default RankingsTable

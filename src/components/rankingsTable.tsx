'use client'
import Link from "next/link"
import {Ranking} from "~types/rankings";
import {formatPercent} from "~utils/formatters";
import WatchButton from "./ui/watchButton";
import CompanyLink from "./ui/companyLink";
import { watchInstrument } from '../store/watchListSlice'
import { Instrument } from "~types/quotes";
import { useDispatch } from "react-redux";

type RankingsProps = {
  rankings: Ranking[]
}
const RankingsTable = ({ rankings }: RankingsProps) => {
  const dispatch = useDispatch()

  const handleToggleInstrument = (instrument: Instrument) => {
    // Logic to toggle the watch status of the instrument
    dispatch(watchInstrument(instrument))
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
      {rankings.map(ranking => (
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
              toggleWatching={() => handleToggleInstrument(ranking.instrument)}
              />
            </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default RankingsTable

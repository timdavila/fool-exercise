'use client'

type WatchButtonProps = {
  instrumentId: number
  isCurrentlyWatching?: boolean
  includeText?: boolean
  toggleWatching: (instrumentId: number) => void
}

const WatchButton = ({ instrumentId, isCurrentlyWatching = false, includeText = false, toggleWatching }: WatchButtonProps) => {
  const text = includeText ? isCurrentlyWatching ? 'Watching' : 'Watch' : ''
  const indicator = isCurrentlyWatching ? '-' : '+'
  const textColor = isCurrentlyWatching ? 'text-red-500' : 'text-green-500'

  return (
    <button onClick={() => toggleWatching(instrumentId)} className="px-8 hover:font-bold">
      <span className={textColor}>{text} {indicator}</span>
    </button>
  )
}

export default WatchButton
'use client'

import { useEffect, useState } from 'react'
import WatchButton from "~components/ui/watchButton"
import ArticlesService from "~data/services/article-service"
import apolloServerClient from "~lib/apollo-server-client"
import CompanyLink from "~components/ui/companyLink"
import { toggleWatchingInstrument } from '../../../store/watchListSlice'
import { Instrument } from "~types/quotes"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../../../store'

function ArticlePage({ params }: { params: { path: string } }) {
  const { path } = params
  const [article, setArticle] = useState<any | null>(null)
  const dispatch = useDispatch()
  const watchlist = useSelector((state: RootState) => state.watchlist.instruments)

  useEffect(() => {
    const fetchArticle = async () => {
      const client = await apolloServerClient()
      const articlesService = new ArticlesService(client)
      const fetchedArticle = await articlesService.getArticleByPath(path)
      setArticle(fetchedArticle)
    }

    fetchArticle()
  }, [path])

  if (!article) {
    return <div className="text-slate-300 p-8">Loading article...</div>
  }

  const recommendedInstrument = article.recommendations?.[0]?.instrument
  const recommendedInstrumentId = recommendedInstrument?.instrument_id

  const isWatched = watchlist.some(
    watched => watched.instrumentId === recommendedInstrumentId
  )

  const handleToggleInstrument = () => {
    if (!recommendedInstrument) return
    dispatch(toggleWatchingInstrument({
      instrumentId: recommendedInstrument.instrument_id,
      exchange: recommendedInstrument.exchange,
      symbol: recommendedInstrument.symbol
    } as Instrument))
  }

  const processBody = (content: string) => {
    const parts: (JSX.Element | string)[] = []
    let lastIndex = 0
    const regex = /\(([A-Z]+): ([A-Z]+)\)/g
    let match: RegExpExecArray | null

    while ((match = regex.exec(content)) !== null) {
      const [fullMatch, exchange, symbol] = match
      const precedingText = content.slice(lastIndex, match.index)
      if (precedingText) {
        parts.push(precedingText)
      }
      parts.push(
        <CompanyLink key={match.index} exchange={exchange} symbol={symbol} />
      )
      lastIndex = regex.lastIndex
    }

    const remainingText = content.slice(lastIndex)
    if (remainingText) {
      parts.push(remainingText)
    }

    return parts.map((part, i) => {
      if (typeof part === 'string') {
        return (
          <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
        )
      }
      return part // JSX element
    })
  }

  return (
    <div className="bg-gradient-to-r from-black via-slate-900 to-black p-8 font-mono text-slate-300 border-l-4 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.3)] rounded-r-lg">
      <h1 className="text-3xl font-bold mb-6 flex items-center justify-between">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          {article.headline}
        </span>
        {recommendedInstrumentId && (
          <WatchButton
            isCurrentlyWatching={isWatched}
            toggleWatching={handleToggleInstrument}
            instrumentId={recommendedInstrumentId}
          />
        )}
      </h1>

      <p className="text-cyan-300 text-lg mb-6 leading-relaxed">
        {article.promo}
      </p>

      <div className="text-slate-300 leading-relaxed bg-slate-900/50 p-6 rounded-lg border border-cyan-500/30">
        <div>{processBody(article.body)}</div>
      </div>
    </div>
  )
}

export default ArticlePage

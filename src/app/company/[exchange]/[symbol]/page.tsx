import {useQuery} from "@apollo/client"
import {GET_COMPANY_DATA} from "~data/queries"
import apolloServerClient from "~lib/apollo-server-client"
import {Instrument, Quote, QuoteFundamentals} from "~types/quotes"
import CompanyHeader, {CompanyHeaderProps} from "../../_components/companyHeader"
import CompanyData, {CompanyDataProps} from "../../_components/companyData"
import { formatPercent, formatCurrency, formatSimplifiedNumber } from "~utils/formatters"

async function CompanyPage({
  params,
}: {
  params: {symbol: string, exchange: string}
}) {
  const {exchange, symbol} = params
  const client = await apolloServerClient()
  const {data: companyQuery} = await client.query({
    query: GET_COMPANY_DATA,
  })

  // Normally would have generate types, but force it here
  const instrumentData = companyQuery.instrument.instrument as Instrument
  const quoteData = instrumentData.quote as Quote
  const quoteFundamentals = companyQuery.instrument.instrument.quoteFundamentals as QuoteFundamentals

  const headerData: CompanyHeaderProps = {
    instrument: instrumentData,
    currency: quoteData.currentPrice.currencyCode,
    price: quoteData.currentPrice.amount,
    change: quoteData.priceChange.amount,
    lastUpdate: quoteData.lastTradeDate,
  }
  const companyData: CompanyDataProps = {
    dailyChangePct: formatPercent(quoteData.percentChange),
    dailyChangeAmount: formatCurrency(quoteData.priceChange.amount),
    dailyRangeMin: formatCurrency(companyQuery.instrument.instrument.quote.dailyRange.min.amount),
    dailyRangeMax: formatCurrency(companyQuery.instrument.instrument.quote.dailyRange.max.amount),
    yearRangeMin: formatCurrency(companyQuery.instrument.instrument.quote.fiftyTwoWeekRange.min.amount),
    yearRangeMax: formatCurrency(companyQuery.instrument.instrument.quote.fiftyTwoWeekRange.max.amount),
    beta: quoteData.beta5y,
    marketCap: formatSimplifiedNumber(quoteData.marketCap.amount),
    employees: formatSimplifiedNumber(quoteFundamentals.dynamic.numberOfEmployees.data[0].value),
    marketCapPerEmployee: formatSimplifiedNumber(quoteFundamentals.dynamic.marketCapPerEmployee.data[0].value),
    grossMargin: formatSimplifiedNumber(quoteData.grossMargin),
    ceo: quoteFundamentals.dynamic.ceo.data[0].value
  }
  return (
    <div>
      <CompanyHeader {...headerData} />
      <CompanyData {...companyData} />
    </div>
  )
}

export default CompanyPage


export type CompanyDataProps  = {
  dailyChangePct: string,
  dailyChangeAmount: string,
  dailyRangeMin: string,
  dailyRangeMax: string,
  yearRangeMin: string,
  yearRangeMax: string,
  beta: number,
  marketCap: string,
  employees: string,
  marketCapPerEmployee: string,
  grossMargin: string,
  ceo: string
}

const CompanyData = ({dailyChangePct, dailyChangeAmount, dailyRangeMin, dailyRangeMax, yearRangeMin, yearRangeMax, beta, marketCap, employees, marketCapPerEmployee, grossMargin, ceo} : CompanyDataProps) => {
  return (
    <div className="bg-gradient-to-r from-black via-slate-900 to-black p-6 font-mono text-slate-300 border-l-4 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
      <dl className="grid grid-cols-2 gap-6">
        <div>
          <dt className="text-cyan-400 mb-1">Daily Change</dt>
          <dd className="text-blue-400">{dailyChangePct} | {dailyChangeAmount}</dd>
        </div>
        
        <div>
          <dt className="text-cyan-400 mb-1">Daily Range</dt>
          <dd>{dailyRangeMin} - {dailyRangeMax}</dd>
        </div>
        
        <div>
          <dt className="text-cyan-400 mb-1">52-Week Range</dt>
          <dd>{yearRangeMin} - {yearRangeMax}</dd>
        </div>
        
        <div>
          <dt className="text-cyan-400 mb-1">Beta (Volatility)</dt>
          <dd>{beta} <span className="text-red-400">High</span></dd>
        </div>
        
        <div>
          <dt className="text-cyan-400 mb-1">Market Cap</dt>
          <dd>{marketCap}</dd>
        </div>
        
        <div>
          <dt className="text-cyan-400 mb-1">Employees</dt>
          <dd>{employees}</dd>
        </div>
        
        <div>
          <dt className="text-cyan-400 mb-1">Market Cap / Employee</dt>
          <dd>${marketCapPerEmployee}</dd>
        </div>
        
        <div>
          <dt className="text-cyan-400 mb-1">Gross Margin</dt>
          <dd>{grossMargin}</dd>
        </div>
        
        <div>
          <dt className="text-cyan-400 mb-1">CEO</dt>
          <dd>{ceo}</dd>
        </div>
      </dl>
    </div>
  )
}

export default CompanyData
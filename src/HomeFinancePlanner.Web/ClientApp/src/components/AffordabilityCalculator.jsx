import { useState } from 'react';
import { fetchAffordability } from '../api/homesApi.js';

const initialProfile = {
  currentSavings: 15000,
  monthlySavingsContribution: 800,
  annualGrossIncome: 95000,
  monthlyDebtPayments: 350,
  targetDownPaymentPercent: 0.2,
  loanTermYears: 30,
  annualInterestRate: 0.065,
};

const currency = (n) =>
  n == null ? '—' : n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function AffordabilityCalculator() {
  const [zip, setZip] = useState('04101');
  const [profile, setProfile] = useState(initialProfile);
  const [results, setResults] = useState(null);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const updateField = (field) => (e) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      const data = await fetchAffordability(zip, profile);
      setResults(data);
      setStatus('idle');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  return (
    <section className="calculator">
      <form className="entry-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="zip">Zip code</label>
          <input id="zip" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="04101" />
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="savings">Current savings</label>
            <input id="savings" type="number" value={profile.currentSavings} onChange={updateField('currentSavings')} />
          </div>
          <div className="field">
            <label htmlFor="monthlySavings">Saved per month</label>
            <input id="monthlySavings" type="number" value={profile.monthlySavingsContribution} onChange={updateField('monthlySavingsContribution')} />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="income">Annual gross income</label>
            <input id="income" type="number" value={profile.annualGrossIncome} onChange={updateField('annualGrossIncome')} />
          </div>
          <div className="field">
            <label htmlFor="debt">Other monthly debt</label>
            <input id="debt" type="number" value={profile.monthlyDebtPayments} onChange={updateField('monthlyDebtPayments')} />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="downPct">Down payment %</label>
            <input id="downPct" type="number" step="0.01" value={profile.targetDownPaymentPercent} onChange={updateField('targetDownPaymentPercent')} />
          </div>
          <div className="field">
            <label htmlFor="rate">Interest rate</label>
            <input id="rate" type="number" step="0.001" value={profile.annualInterestRate} onChange={updateField('annualInterestRate')} />
          </div>
        </div>

        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Working it out…' : 'Run the numbers'}
        </button>

        {status === 'error' && <p className="error">{errorMessage}</p>}
      </form>

      {results && (
        <ol className="ledger">
          {results.map((r) => (
            <li key={r.homeId} className={`ledger-row ${r.looksAffordable ? 'is-affordable' : 'is-stretch'}`}>
              <div className="ledger-row-main">
                <span className="address">{r.address}</span>
                <span className="price">{currency(r.listPrice)}</span>
              </div>
              <dl className="ledger-details">
                <div>
                  <dt>Down payment</dt>
                  <dd>{currency(r.requiredDownPayment)} in {r.monthsToDownPayment} mo</dd>
                </div>
                <div>
                  <dt>Est. monthly payment</dt>
                  <dd>{currency(r.estimatedTotalMonthlyPayment)}</dd>
                </div>
                <div>
                  <dt>Debt-to-income after</dt>
                  <dd>{(r.debtToIncomeRatioAfterPurchase * 100).toFixed(1)}%</dd>
                </div>
                {r.cheapestNearbyRent != null && (
                  <div>
                    <dt>Cheapest nearby rent</dt>
                    <dd>
                      {currency(r.cheapestNearbyRent)}
                      {r.monthlySavingsIfRentingInstead > 0 && (
                        <> — renting saves {currency(r.monthlySavingsIfRentingInstead)}/mo</>
                      )}
                    </dd>
                  </div>
                )}
              </dl>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

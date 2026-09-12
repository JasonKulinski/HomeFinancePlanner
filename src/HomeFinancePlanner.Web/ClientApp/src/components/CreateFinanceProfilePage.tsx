import { useState, SubmitEvent, ChangeEvent } from 'react'
import { createFinanceProfile, type CreateFinanceProfileRequest } from '../api/financeProfilesApi'

type ProfileFormData = {
	name: string
	currentSavings: number
	monthlySavingsContribution: number
	annualGrossIncome: number
	monthlyDebtPayments: number
	targetDownPaymentPercent: number
	loanTermYears: number
	annualInterestRate: number
}

const initialProfile: ProfileFormData = {
	name: '',
	currentSavings: 15000,
	monthlySavingsContribution: 800,
	annualGrossIncome: 95000,
	monthlyDebtPayments: 350,
	targetDownPaymentPercent: 0.2,
	loanTermYears: 30,
	annualInterestRate: 0.065,
}

export default function CreateFinanceProfilePage() {
	const [profile, setProfile] = useState(initialProfile)
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

	const updateField = (field: keyof ProfileFormData) => (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value
		setProfile((prev) => ({ ...prev, [field]: value }))
	}

	const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!profile.name.trim()) {
			setErrorMessage('Please enter a profile name')
			return
		}

		setStatus('loading')
		setErrorMessage('')
		setSuccessMessage('')

		try {
			const request: CreateFinanceProfileRequest = {
				name: profile.name,
				currentSavings: profile.currentSavings,
				monthlySavingsContribution: profile.monthlySavingsContribution,
				annualGrossIncome: profile.annualGrossIncome,
				monthlyDebtPayments: profile.monthlyDebtPayments,
				targetDownPaymentPercent: profile.targetDownPaymentPercent,
				loanTermYears: profile.loanTermYears,
				annualInterestRate: profile.annualInterestRate,
			}

			const savedProfile = await createFinanceProfile(request)
			setStatus('success')
			setSuccessMessage(`Profile "${savedProfile.name}" created successfully!`)

			// Reset form after 2 seconds
			setTimeout(() => {
				setProfile(initialProfile)
				setSuccessMessage('')
				setStatus('idle')
			}, 2000)
		} catch (err: any) {
			setStatus('error')
			setErrorMessage(err.message)
		}
	}

	return (
		<section className='form-section'>
			<h2>Create Your Financial Profile</h2>
			<p style={{ color: '#5c5640', marginBottom: '20px' }}>
				Enter your name and financial information to create a complete profile.
			</p>

			<form className='entry-form' onSubmit={handleSubmit}>
				{/* Profile Name */}
				<div className='field'>
					<label htmlFor='profile-name'>Profile Name *</label>
					<input
						id='profile-name'
						type='text'
						value={profile.name}
						onChange={updateField('name')}
						placeholder='Enter your name or profile name'
						disabled={status === 'loading'}
						required
					/>
				</div>

				{/* Savings Section */}
				<div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--paper-line)' }}>
					<h3 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '16px' }}>Current Savings</h3>
					<div className='field-row'>
						<div className='field'>
							<label htmlFor='current-savings'>Current Savings</label>
							<input
								id='current-savings'
								type='number'
								value={profile.currentSavings}
								onChange={updateField('currentSavings')}
								disabled={status === 'loading'}
							/>
						</div>
						<div className='field'>
							<label htmlFor='monthly-savings'>Monthly Savings</label>
							<input
								id='monthly-savings'
								type='number'
								value={profile.monthlySavingsContribution}
								onChange={updateField('monthlySavingsContribution')}
								disabled={status === 'loading'}
							/>
						</div>
					</div>
				</div>

				{/* Income & Debt Section */}
				<div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--paper-line)' }}>
					<h3 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '16px' }}>Income & Debt</h3>
					<div className='field-row'>
						<div className='field'>
							<label htmlFor='annual-income'>Annual Gross Income</label>
							<input
								id='annual-income'
								type='number'
								value={profile.annualGrossIncome}
								onChange={updateField('annualGrossIncome')}
								disabled={status === 'loading'}
							/>
						</div>
						<div className='field'>
							<label htmlFor='monthly-debt'>Monthly Debt Payments</label>
							<input
								id='monthly-debt'
								type='number'
								value={profile.monthlyDebtPayments}
								onChange={updateField('monthlyDebtPayments')}
								disabled={status === 'loading'}
							/>
						</div>
					</div>
				</div>

				{/* Mortgage Terms Section */}
				<div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--paper-line)' }}>
					<h3 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '16px' }}>Mortgage Terms</h3>
					<div className='field-row'>
						<div className='field'>
							<label htmlFor='down-payment-pct'>Down Payment %</label>
							<input
								id='down-payment-pct'
								type='number'
								step='0.01'
								value={profile.targetDownPaymentPercent}
								onChange={updateField('targetDownPaymentPercent')}
								disabled={status === 'loading'}
							/>
						</div>
						<div className='field'>
							<label htmlFor='loan-term'>Loan Term (years)</label>
							<input
								id='loan-term'
								type='number'
								value={profile.loanTermYears}
								onChange={updateField('loanTermYears')}
								disabled={status === 'loading'}
							/>
						</div>
						<div className='field'>
							<label htmlFor='interest-rate'>Annual Interest Rate</label>
							<input
								id='interest-rate'
								type='number'
								step='0.001'
								value={profile.annualInterestRate}
								onChange={updateField('annualInterestRate')}
								disabled={status === 'loading'}
							/>
						</div>
					</div>
				</div>

				{/* Submit Button */}
				<button
					type='submit'
					disabled={status === 'loading' || !profile.name.trim()}
					className='submit-btn'
					style={{ marginTop: '24px' }}
				>
					{status === 'loading' ? 'Saving Profile...' : 'Save Profile'}
				</button>
			</form>

			{errorMessage && (
				<div className='error-message' style={{ marginTop: '16px' }}>
					{errorMessage}
				</div>
			)}

			{successMessage && (
				<div className='success-message' style={{ marginTop: '16px' }}>
					{successMessage}
				</div>
			)}
		</section>
	)
}

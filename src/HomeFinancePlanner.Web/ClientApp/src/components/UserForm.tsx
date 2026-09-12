import { useState, SubmitEvent } from 'react'
import { createFinanceProfile } from '../api/financeProfilesApi'

export default function UserForm() {
	const [name, setName] = useState('')
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

	const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!name.trim()) {
			setErrorMessage('Please enter a name')
			return
		}

		setStatus('loading')
		setErrorMessage('')
		setSuccessMessage('')

		try {
			const profile = await createFinanceProfile({ name })
			setStatus('success')
			setSuccessMessage(`Finance profile "${profile.name}" created successfully!`)
			setName('')
			// Reset success message after 3 seconds
			setTimeout(() => {
				setSuccessMessage('')
				setStatus('idle')
			}, 3000)
		} catch (err: any) {
			setStatus('error')
			setErrorMessage(err.message)
		}
	}

	return (
		<section className='form-section'>
			<h2>Create Finance Profile</h2>
			<form className='entry-form' onSubmit={handleSubmit}>
				<div className='field'>
					<label htmlFor='name'>Profile Name</label>
					<input
						id='name'
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='Enter profile name'
						disabled={status === 'loading'}
					/>
				</div>

				<button
					type='submit'
					disabled={status === 'loading' || !name.trim()}
					className='submit-btn'
				>
					{status === 'loading' ? 'Creating...' : 'Create Profile'}
				</button>
			</form>

			{errorMessage && (
				<div className='error-message'>
					{errorMessage}
				</div>
			)}

			{successMessage && (
				<div className='success-message'>
					{successMessage}
				</div>
			)}
		</section>
	)
}

import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import Form from './components/Form'
import Table from './components/Table'
import './index.scss'

const App: FC = () => {
	const [data, setData] = useState<
		{
			firstName: string
			lastName: string
			email: string
			phone: string
			dob: string
			id: number
		}[]
	>([])
	const [isLoading, setLoading] = useState<boolean>(true)
	const [page, setPage] = useState<number>(1)

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true)
				const response = await axios.get(`http://localhost:3000/posts?page=${page}`)
				setData(prevData => [...prevData, ...response.data])
				setPage(prevPage => prevPage + 1)
				setLoading(false)
			} catch (error) {
				console.log('Error fetching data:', error)
				setLoading(false)
			}
		}

		fetchData()
	}, [])
	const handleScroll = () => {
		if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
			return
		}
		fetchData()
	}
	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<>
			<div className='table'>
				{data.map(value => (
					<Table
						key={value.id}
						firstName={value.firstName}
						lastName={value.lastName}
						email={value.email}
						phone={value.phone}
						dob={value.dob}
					/>
				))}
				{isLoading && <p>Loading more...</p>} {}
			</div>
			<Form />
		</>
	)
}

export default App
function fetchData() {
	throw new Error('Function not implemented.')
}

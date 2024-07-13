import type { FC } from 'react'
import './component.scss'

interface TableProps {
	firstName: string
	lastName: string
	email: string
	phone: string
	dob: string
}

const Table: FC<TableProps> = ({ firstName, lastName, email, phone, dob }) => {
	return (
		<div className='table'>
			<table className='th'>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Date of Birth</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{firstName}</td>
						<td>{lastName}</td>
						<td>{email}</td>
						<td>{phone}</td>
						<td>{dob}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
export default Table

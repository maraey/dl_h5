import {request} from '@/utils/request.js'
export function addEmployee(data) {
	return request({
		url: 'role/add',
		method: 'POST',
		data
	})
}

export function editEmployee(data) {
	return request({
		url: 'role/edit',
		method: 'POST',
		data
	})
}
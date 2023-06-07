import {request} from '@/utils/request.js'
export function addAgency(data) {
	return request({
		url: 'role/add',
		method: 'POST',
		data
	})
}

export function editAgency(data) {
	return request({
		url: 'role/edit',
		method: 'POST',
		data
	})
}
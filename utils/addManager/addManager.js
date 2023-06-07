import {request} from '@/utils/request.js'
export function addManager(data) {
	return request({
		url: 'role/add',
		method: 'POST',
		data
	})
}
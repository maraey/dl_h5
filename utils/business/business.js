import {request} from '@/utils/request.js'
export function userList(data) {
	return request({
		url: 'role/userList',
		method: 'POST',
		data
	})
}
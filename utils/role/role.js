import {request} from '@/utils/request.js'
export function userList(data) {
	return request({
		url: 'marketer/index',
		method: 'POST',
		data
	})
}
export function userDetail(data) {
	return request({
		url: 'marketer/detail',
		method: 'POST',
		data
	})
}

export function userDelete(data) {
	return request({
		url: 'role/delete',
		method: 'POST',
		data
	})
}
export function editUser(data) {
	return request({
		url: 'role/edit',
		method: 'POST',
		data
	})
}
export function statDevice(data) {
	return request({
		url: 'role/statDevice',
		method: 'POST',
		data
	})
}

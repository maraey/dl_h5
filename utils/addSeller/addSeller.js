import {request} from '@/utils/request.js'
export function addSeller(data) {
	return request({
		url: 'seller/add',
		method: 'POST',
		data
	})
}
export function editSeller(data) {
	return request({
		url: 'seller/edit',
		method: 'POST',
		data
	})
}
export function fileUpload(data) {
	return request({
		url: 'seller/fileUpload',
		headers:{
			'content-type': 'application/x-www-form-urlencoded',
		},
		method: 'POST',
		data
	})
}
export function roleList(data) {
	return request({
		url: 'role/selectList',
		method: 'POST',
		data
	})
}

export function detail(data) {
	return request({
		url: 'seller/detail',
		method: 'POST',
		data
	})
}

export function billing(data) {
	return request({
		url: 'seller/billing',
		method: 'POST',
		data
	})
}
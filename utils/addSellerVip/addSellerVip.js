import {request} from '@/utils/request.js'
export function addSellerVip(data) {
	return request({
		url: 'special/add',
		method: 'POST',
		data
	})
}

export function searchUser(data) {
	return request({
		url: 'special/searchUser',
		method: 'POST',
		data
	})
}

export function searchShop(data) {
	return request({
		url: 'special/searchShop',
		method: 'POST',
		data
	})
}
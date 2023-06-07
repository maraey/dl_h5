import {request} from '@/utils/request.js'
export function specialList(data) {
	return request({
		url: 'vip/index',
		method: 'POST',
		data
	})
}

export function shopInfo(data) {
	return request({
		url: 'special/shopInfo',
		method: 'POST',
		data
	})
}

export function userShops(data) {
	return request({
		url: 'special/userShops',
		method: 'POST',
		data
	})
}

export function editShops(data) {
	return request({
		url: 'special/edit',
		method: 'POST',
		data
	})
}

export function deleteShop(data) {
	return request({
		url: 'special/deleteShop',
		method: 'POST',
		data
	})
}



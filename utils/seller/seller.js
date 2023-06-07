import {request} from '@/utils/request.js'
export function sellerList(data) {
	return request({
		url: 'store/index',
		method: 'POST',
		data
	})
}

export function view(data) {
	return request({
		url: 'seller/view',
		method: 'POST',
		data
	})
}

export function detail(data) {
	return request({
		url: 'store/detail',
		method: 'POST',
		data
	})
}

export function deleteVip(data) {
	return request({
		url: 'special/delete',
		method: 'POST',
		data
	})
}

export function deleteSeller(data) {
	return request({
		url: 'seller/delete',
		method: 'POST',
		data
	})
}
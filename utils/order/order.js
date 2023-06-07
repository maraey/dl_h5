import {request} from '@/utils/request.js'
export function orderList(data) {
	return request({
		url: 'order/orderList',
		method: 'POST',
		data
	})
}

export function orderDetail(data) {
	return request({
		url: 'order/detail',
		method: 'POST',
		data
	})
}

export function endOrder(data) {
	return request({
		url: 'order/endOrder',
		method: 'POST',
		data
	})
}
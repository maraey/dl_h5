import {request} from '@/utils/request.js'
export function brokerageLog(data) {
	return request({
		url: 'user/brokerageLog',
		method: 'POST',
		data
	})
}

export function serverInfo(data) {
	return request({
		url: 'user/serverInfo',
		method: 'POST',
		data
	})
}

export function cancellation(data) {
	return request({
		url: 'user/cancellation',
		method: 'POST',
		data
	})
}
import {request} from '@/utils/request.js'
export function statSeller(data) {
	return request({
		url: 'index/statSeller',
		method: 'POST',
		data
	})
}

export function statBranch(data) {
	return request({
		url: 'index/statBranch',
		method: 'POST',
		data
	})
}


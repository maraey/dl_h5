import {request} from '@/utils/request.js'
export function statSeller(data) {
	return request({
		url: 'index/statStore',
		method: 'POST',
		data
	})
}

export function statBranch(data) {
	return request({
		url: 'index/statSub',
		method: 'POST',
		data
	})
}


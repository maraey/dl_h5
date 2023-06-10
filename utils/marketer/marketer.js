import {request} from '@/utils/request.js'
export function marketerList(data) {
	return request({
		url: 'marketer/index',
		method: 'POST',
		data
	})
}

export function marketerDetail(data) {
	return request({
		url: 'marketer/detail',
		method: 'POST',
		data
	})
}

export function marketerDevice(data) {
	return request({
		url: 'marketer/device',
		method: 'POST',
		data
	})
}

export function addAgent(data) {
	return request({
		url: 'marketer/addAgent',
		method: 'POST',
		data
	})
}

export function addBd(data) {
	return request({
		url: 'marketer/addBd',
		method: 'POST',
		data
	})
}

export function addManager(data) {
	return request({
		url: 'marketer/addManager',
		method: 'POST',
		data
	})
}

export function addIntroducer(data) {
	return request({
		url: 'marketer/addIntroducer',
		method: 'POST',
		data
	})
}

export function marketerEdit(data) {
	return request({
		url: 'marketer/edit',
		method: 'POST',
		data
	})
}

export function marketerDelete(data) {
	return request({
		url: 'marketer/delete',
		method: 'POST',
		data
	})
}
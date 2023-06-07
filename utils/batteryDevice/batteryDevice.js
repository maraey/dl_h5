import {request} from '@/utils/request.js'
export function deviceList(data) {
	return request({
		url: 'powerbankDevice/index',
		method: 'POST',
		data
	})
}

export function detail(data) {
	return request({
		url: 'device/detail',
		method: 'POST',
		data
	})
}

export function openAllLock(data) {
	return request({
		url: 'device/openAllLock',
		method: 'POST',
		data
	})
}

export function restart(data) {
	return request({
		url: 'device/restart',
		method: 'POST',
		data
	})
}

export function setFault(data) {
	return request({
		url: 'device/setFault',
		method: 'POST',
		data
	})
}

export function openLock(data) {
	return request({
		url: 'device/openLock',
		method: 'POST',
		data
	})
}

export function volume(data) {
	return request({
		url: 'device/volume',
		method: 'POST',
		data
	})
}

export function bindUser(data) {
	return request({
		url: 'device/bindAgency',
		method: 'POST',
		data
	})
}

export function unbindAgency(data) {
	return request({
		url: 'device/unbindAgency',
		method: 'POST',
		data
	})
}

export function bindSellerName(data) {
	return request({
		url: 'device/bindSeller',
		method: 'POST',
		data
	})
}

export function unbindSeller(data) {
	return request({
		url: 'device/unbindSeller',
		method: 'POST',
		data
	})
}

export function bindAgency(data) {
	return request({
		url: 'device/bindAgency',
		method: 'POST',
		data
	})
}

export function bindSeller(data) {
	return request({
		url: 'device/bindSeller',
		method: 'POST',
		data
	})
}
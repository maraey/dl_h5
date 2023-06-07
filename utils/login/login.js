import {request} from '@/utils/request.js'
export function login(data) {
	return request({
		url: 'Auth/login',
		method: 'POST',
		data
	})
}
export function captcha(data) {
	return request({
		url: 'auth/captcha',
		method: 'GET',
		data
	})
}
export function sms(data) {
	return request({
		url: 'auth/sms',
		method: 'POST',
		data
	})
}
export function forgotPassword(data) {
	return request({
		url: 'auth/forgotPassword',
		method: 'POST',
		data
	})
}
export function version(data) {
	return request({
		url: 'auth/version',
		method: 'POST',
		data
	})
}
export function setlang(data) {
	return request({
		url: 'index/setlang',
		method: 'POST',
		data
	})
}
export function registerSms(data) {
	return request({
		url: 'auth/registerSms',
		method: 'POST',
		data
	})
}
export function register(data) {
	return request({
		url: 'auth/register',
		method: 'POST',
		data
	})
}
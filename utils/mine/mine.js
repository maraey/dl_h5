import {request} from '@/utils/request.js'
export function index(data={}){
	return request({
		url:'user/index',
		method:'GET',
		data
	})
}
export function logout(data={}){
	return request({
		url:'auth/logout',
		method:'GET',
		data
	})
}
export function changePassword(data){
	return request({
		url:'user/password',
		method:'POST',
		data
	})
}
export function userList(data){
	return request({
		url:'marketer/index',
		method:'POST',
		data
	})
}
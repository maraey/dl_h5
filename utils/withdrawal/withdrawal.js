import {request} from '@/utils/request.js'
export function withdrawalAccount(data={}){
	return request({
		url:'user/withdrawalAccount',
		method:'GET',
		data
	})
}
export function addWithdrawalAccount(data={}){
	return request({
		url:'user/accountAdd',
		method:'POST',
		data
	})
}
export function editWithdrawalAccount(data={}){
	return request({
		url:'user/accountEdit',
		method:'POST',
		data
	})
}
export function applyWithdrawalAccount(data={}){
	return request({
		url:'user/withdrawalApply',
		method:'POST',
		data
	})
}
export function withdrawalLog(data={}){
	return request({
		url:'user/withdrawalLog',
		method:'GET',
		data
	})
}
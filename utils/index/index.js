import {request} from '@/utils/request.js'
export function index(data={}){
	return request({
		url:'Index/index',
		method:'GET',
		data
	})
}
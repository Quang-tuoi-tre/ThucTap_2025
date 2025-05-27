import axiosInstance from "../axios/axiosConfig"


export const orderApi = {

    postOrder:(data:any, token:string)=>{
        return axiosInstance({
            url:'/v1/customer/order',
            method:'post',
            data,
            headers:{
                'token:':`${token}`
            }
        })
    }
}
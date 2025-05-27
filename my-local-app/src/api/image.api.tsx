import axiosInstance from "../axios/axiosConfig"

export const imgApi ={
    image:(data:any)=>{
        return axiosInstance({
            url:'/v1/customer/image/upload',
            method:'post',
            data,
        });
    }   
    }
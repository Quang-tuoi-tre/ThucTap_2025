import axiosInstance from "../axios/axiosConfig";

export const featuredCategory ={
    getCate:( token:string,isHighlight?: boolean)=>{
        return axiosInstance({
            url:'/v1/customer/productCategory/highlight',
            method:'get',
            headers:{
            'token':`${token}`
            },
            params: {
            isHighlight: isHighlight
            }
        });
    }   
    }
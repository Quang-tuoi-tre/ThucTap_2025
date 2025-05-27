import axiosInstance from "../axios/axiosConfig";

export const productApi ={
    getProduct:( token:string)=>{
        return axiosInstance({
            url:'/v1/customer/product',
            method:'get',
            headers:{
            'token':`${token}`
            }
        });
    },
    getDetailProduct:(token:string, productId:string)=>{
        return axiosInstance({
            url: `/v1/customer/product/${productId}`,
            method:'get',
            headers:{
                'token':`${token}`
            }
        });
    }   
}
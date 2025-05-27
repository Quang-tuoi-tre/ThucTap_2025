import axiosInstance from "../axios/axiosConfig";

// export interface BannerQuery {
//   page?: number;
//   limit?: number;
//   search?: string;
//   isLink?: boolean;
//   bannerLayoutPageIds?: number[];
// }

export const bannerApi ={
    getBanner:( token:string)=>{
        return axiosInstance({
            url:'/v1/customer/banner',
            method:'get',
            headers:{
            'token':`${token}`
            }
            
        });
    }   
    }

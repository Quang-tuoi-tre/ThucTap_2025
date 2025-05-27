import axiosInstance from "../axios/axiosConfig";

export interface Customer {
  
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string;
  dob: string;
  address: string;
  gender: string;
  phone: string;
  password: string;
 
}

export interface Login{
  phone: string,
  password: string
}




export const authApi = {
  register: (data: any) => {
    return axiosInstance({
      url: '/v1/customer/auth/register',
      method: 'post',
      data, 
    });
   
  },
   login: (data:any)=>{
      return axiosInstance({
        url:'/v1/customer/auth/login',
        method:'post',
        data,
      });
    },
    getprofile:(token:string)=>{
    return axiosInstance({
      url:'/v1/customer/auth/profile',
      method:'get',
      headers:{
        'token':`${token}`
      }
    });
  },
  updateProfile:(token:string,data:any)=>{
    return axiosInstance({
      url:'/v1/customer/auth/profile',
      method:'patch',
      headers:{
        'token':`${token}`
      },
      data
    });
  }
  
  
};

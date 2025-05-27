import { makeAutoObservable, runInAction } from "mobx";
import { authApi } from "../../api/auth.api";


interface Profile {
  fullName?: string;
  phone?: string;
  address?: string;
}

class OrderStore {
  profile: Profile = {};  
  isLoadingProfile = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchProfile = async (token: string) => {
    this.isLoadingProfile = true;
    try {
      const res = await authApi.getprofile(token);
      runInAction(() => {
        this.profile = res.data.data || {}; 
        this.isLoadingProfile=false
      });
    } catch (error) {
        console.log('Error is:', error);
        
      runInAction(() => {
        this.isLoadingProfile = false;
        this.profile = {};
      });
    } finally {
      runInAction(() => {
        this.isLoadingProfile = false;
      });
    }
  };
}

export const orderStore = new OrderStore();


// setOrderDetails(details: Order[]) {
//         this.order = details;
//     }
//     createOrder = async (token:string)=>{
//         this.loading=true;
//         try{
//             const response = await orderApi.postOrder({
//                 details: this.order
//             },token);
//             console.log("Đon hàng gửi đi thành công là:", response);
            
//         }catch(error){
//             console.log("error is:", error);
            
//         }finally{
//             this.loading=false
//         }
    // }
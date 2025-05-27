import { makeAutoObservable, runInAction } from "mobx";
import { featuredCategory } from "../../api/productCategory.api";

class FeaturedCategoryStore {
    category =[];
    fetching = false

    constructor(){
        makeAutoObservable(this)
    }

    fetchFeaturedCategory = async (token: string) =>{
        this.fetching = true;
        try{
            const response = await featuredCategory.getCate(token, true)
            runInAction(()=>{
                this.category = response.data.data.productCategories || []
                this.fetching=false
            });
        }catch(error){
            runInAction(()=>{
                this.fetching = false
            });
            console.log("Error load cate is:", error);
            
        }
    }
}

export const featuredCategoryStore = new FeaturedCategoryStore();
import { makeAutoObservable, runInAction } from "mobx";
import { featuredCategory } from "../../api/productCategory.api";

interface Product {
  id: string;
  name: string;
  finalPrice: number;
  image: string;
}

interface Category {
  id: string;
  name: string;
  products: Product[];
}

class ProductListStore{
    products: Product[]=[]
    categoryName:string =''
    loading:boolean =false

    sortOrder: "asc" | "desc" | undefined = undefined;

    constructor(){
        makeAutoObservable(this)
    }

    setSortOrder = (order: "asc" | "desc" | undefined) => {
        this.sortOrder = order;
  };

    get sortedProducts() {
        if (!this.sortOrder) return this.products;

        const sorted = [...this.products];
        if (this.sortOrder === "asc") {
        sorted.sort((a, b) => a.finalPrice - b.finalPrice);
        } else if (this.sortOrder === "desc") {
        sorted.sort((a, b) => b.finalPrice - a.finalPrice);
        }
        return sorted;
    }

    fetchListProduct = async(token:string, categoryId:string | undefined) =>{
        this.loading=true
        if(!categoryId){
            this.products= []
            this.loading=false
        }
        try{
            const response= await featuredCategory.getCate(token)
            const categories: Category[] = response.data.data.productCategories || [];
        
            const selectedCategory = categories.find(
            (c) => c.id.toString() === categoryId
            );

            runInAction(()=>{
                if(selectedCategory){
                    this.products = selectedCategory.products|| []
                    this.categoryName=selectedCategory.name
                    this.sortOrder = undefined; 
                }else{
                    this.products=[]
                    this.categoryName="Can't find category"
                }
                this.loading=false
            });
        }catch(error){
            console.log("Error is", error);
        }
    }

}

export const productListStore= new ProductListStore();
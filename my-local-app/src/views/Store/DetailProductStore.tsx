    import { makeAutoObservable, runInAction } from "mobx"
    import { productApi } from "../../api/product.api"
import { featuredCategory } from "../../api/productCategory.api";

    class DetailProductStore{
        product : any =null
        loading:boolean=false
        relatedProducts: any[] = [];
        loadingRelated: boolean = false;


        constructor(){
            makeAutoObservable(this)
        }
        

       fetchDetailProduct = async (token: string, productId: string | undefined) => {
            this.loading = true;
            try {
                const response = await productApi.getDetailProduct(token, productId!);
                runInAction(() => {
                this.product = response.data.data;
                this.loading = false;
                });

                // Lấy đúng categoryId từ productCategory.id
                const categoryId = this.product?.productCategory?.id;

                if (categoryId) {
                this.fetchRelatedProducts(token, categoryId, this.product.id);
                } else {
                runInAction(() => {
                    this.relatedProducts = [];
                });
                }
            } catch (error) {
                runInAction(() => {
                this.loading = false;
                this.relatedProducts = [];
                });
                console.log("Error fetching product detail:", error);
            }
            };


         fetchRelatedProducts = async (
            token: string,
            categoryId: string,
            currentProductId: string
            ) => {
            this.loadingRelated = true;
            try {
                const response = await featuredCategory.getCate(token);
                const categories = response.data.data.productCategories || [];

                const category = categories.find((c: any) => c.id === categoryId);
                runInAction(() => {
                if (category && category.products) {
                    this.relatedProducts = category.products.filter(
                    (p: any) => p.id !== currentProductId
                    );
                } else {
                    this.relatedProducts = [];
                }
                this.loadingRelated = false;
                });
            } catch (error) {
                runInAction(() => {
                this.relatedProducts = [];
                this.loadingRelated = false;
                });
                console.log("Error fetching related products:", error);
            }
            };
    }
    export const detailProductStore = new DetailProductStore()
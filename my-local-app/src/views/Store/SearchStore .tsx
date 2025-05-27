import { makeAutoObservable, runInAction } from "mobx";
import { productApi } from "../../api/product.api";

interface Product {
  name: string;
  finalPrice: number;
  image: string;
}

class SearchStore {
  products: Product[] = [];
  options: { value: string }[] = [];
  loading: boolean = false;
  value: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  fetchProducts = async (token: string) => {
    this.loading = true;
    try {
      const res = await productApi.getProduct(token);
      runInAction(() => {
        this.products = res.data.data.products || [];
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.error("Lỗi lấy sản phẩm:", error);
    }
  };

  setValue = (val: string) => {
    this.value = val;
    if (!val) {
      this.options = [];
      return;
    }
    const filtered = this.products
      .filter((p) => p.name.toLowerCase().startsWith(val.toLowerCase()))
      .map((p) => ({ value: p.name }));
    this.options = filtered;
  };
}

export const searchStore = new SearchStore();

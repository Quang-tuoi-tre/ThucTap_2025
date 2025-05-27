import { makeAutoObservable, runInAction } from "mobx";
import { productApi } from "../../api/product.api";

interface Product {
  id: string;
  name: string;
  image: string;
  finalPrice: number;
}

class SearchResultStore {
  products: Product[] = [];
  loading: boolean = false;
  sortOrder: "asc" | "desc" | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
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

  fetchProducts = async (token: string, productName: string | undefined) => {
    if (!productName) {
      this.products = [];
      return;
    }

    this.loading = true;
    try {
      const res = await productApi.getProduct(token);
      const allProducts: Product[] = res.data.data.products || [];
      const filtered = allProducts.filter((p) =>
        p.name.toLowerCase().includes(productName.toLowerCase())
      );
      runInAction(() => {
        this.products = filtered;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.products = [];
        this.loading = false;
      });
      console.error("Error fetching products:", error);
    }
  };
}

export const searchResultStore = new SearchResultStore();


/* \/\*[\s\S]*?\*\/ */

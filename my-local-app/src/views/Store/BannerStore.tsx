import { makeAutoObservable, runInAction } from "mobx";
import { bannerApi } from "../../api/banner.api";

interface Banner{
    id: string;
  title:string;
  image:string
}

class BannerStore {
  banners:Banner[]= [];
  fetching = false;
  count =0

  constructor() {
    makeAutoObservable(this);
  }

  increase(){
    this.count++
  }

  fetchBanners = async (token: string) => {
    this.fetching = true;
    try {
      const res = await bannerApi.getBanner(token);
      runInAction(() => {
        this.banners = res.data.data.banners || [];
        this.fetching = false;
      });
    } catch (error) {
      runInAction(() => {
        this.fetching = false;
      });
      console.error("Failed to load banners", error);
    }
  };
}

export const bannerStore = new BannerStore();

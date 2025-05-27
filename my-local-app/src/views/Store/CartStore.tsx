import { makeAutoObservable } from "mobx";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

class CartStore {
  items: CartItem[] = [];
  token: string | null=null;

  constructor() {
    makeAutoObservable(this);
  }

    setToken(token:string|null){
    this.token=token
    if(token){
      this.loadFromLocalStorage()
    }else{
      this.items=[]
    }
  }

  addItem(product: any) {
    const existingItem = this.items.find(item => item.id === product.id);
    if (!existingItem) {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.finalPrice,
        quantity: 1,
        image: product.image,
      });
    }
    this.saveToLocalStorage()
  }

  saveToLocalStorage(){
    if(!this.token) return;
    localStorage.setItem(`cart_items_${this.token}`, JSON.stringify(this.items));
  }

  loadFromLocalStorage(){
    if(!this.token) return
    const data = localStorage.getItem(`cart_items_${this.token}`);
    if(data){
      this.items=JSON.parse(data)
    }else{
      this.items=[]
    }
  }
  get itemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateQuantity(id:number,quantity:number){
    const item = this.items.find((i)=>(i.id===id))
    if(item){
      item.quantity=quantity;
      this.saveToLocalStorage();
    }
  }

  removeItem(id:number){
    this.items=this.items.filter((i)=>(i.id!==id))
    this.saveToLocalStorage()
  }

    clear() {
    if (!this.token) return;
    this.items = [];
    this.saveToLocalStorage();
  }
}

export const cartStore = new CartStore();

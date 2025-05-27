
import './styles/App.css'
import { CustomHookPage1 } from './views/Hooks/CustomHooks/CustomHookPage1';
import { OnSubmitandOnChange } from './views/EventHandle/OnSubmitandOnChange';
import { KeyPressComponent } from './views/EventHandle/KeyPressComponent';
import { ReactRouterPage } from './views/ReactRouter/ReactRouterPage';
import { MobxPage } from './views/Store/MobxPage';
import { UseRefPage } from './views/Hooks/BasicHooks/UseRefPage';
import { UseEffectPage } from './views/Hooks/BasicHooks/UseEffectPage';
import { UseCallPagePage } from './views/Hooks/BasicHooks/UseCallBackPage';
import { ConsumerPage } from './views/Hooks/BasicHooks/UseContext/ConsumerPage';
import { UseReducerPage } from './views/Hooks/BasicHooks/UseReducerPage';
import { AxiosPage } from './views/Axios/AxiosPage';
// import { LoginPage } from './views/auth/loginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Sử dụng BrowserRouter
import { Navbar } from './components/Navbaritem';
import { RegisterPage } from './views/auth/RegisterPage';
import { LoginPage } from './views/auth/LoginPage';
import { ProfilePage } from './views/auth/ProfilePage';
import { HomePage } from './views/HomePage';
import { ListProductPage } from './views/products/ListProductPage';
import { SearchResultPage } from './views/products/SearchResultPage';
import { DetailProductPage } from './views/products/DetailProductPage';
import { CartPage } from './views/CartPage';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { cartStore } from './views/Store/CartStore';
import { OrderPage } from './views/OrderPage';





export function App2() {
  return(
    <div>
      <h1>TailwindCSS</h1>
    <button className='bg-slate-400 text-white p-11 rounded '>
      Hello World
    </button>
    <h1 className='text-3xl font-bold underline'>
      Hello world!
    </h1>
    </div>
  )
}

export const App3 = observer(() => {
   useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      cartStore.setToken(token)
    }
   },[])

  return (
    <Router>
      <Navbar />
      <div className="p-4 form1">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/" element={<HomePage/>} />
          <Route path="/category/:categoryId" element={<ListProductPage />} />  
          <Route path="/search/:productName" element={<SearchResultPage />} /> 
          <Route path="/product/:productId" element={<DetailProductPage />} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/order" element={<OrderPage/>} />
        </Routes>
      </div>
    </Router>
  );
});


// export function ShoppingCart() {
//   const cartRef = useRef(0); // Sử dụng useRef để lưu trữ số lượng giỏ hàng
//   const [cart, setCart] = useState(0); // Dùng useState để quản lý UI (hiển thị)

//   const handleAddToCart = () => {
//     cartRef.current += 1; // Cập nhật giá trị trong cartRef mà không trigger re-render
//     setCart(cartRef.current); // Cập nhật UI để hiển thị số lượng
//   };

//   return (
//     <div>
//       <h1>Shopping Cart</h1>
//       <p>Items in cart (useState): {cart}</p>
//       <p>Items in cart (useRef): {cartRef.current}</p>
//       <button onClick={handleAddToCart}>Add to Cart</button>
//     </div>
//   );
// }

export function App(){
  return(
    <div>
       
       <h1 className='alert'> CustomHook khác</h1>
       <CustomHookPage1 />
      <hr/>

      <h1 className='alert'>Event: onChange và onSubmit</h1>
      <OnSubmitandOnChange />
      <hr />
      
      <h1>Event: onKeyDown</h1>
      <KeyPressComponent />
      <hr />
      
      <h1>React Router</h1>
      <ReactRouterPage />
      <hr />
      
      <h1>Mobx Page</h1>
      <MobxPage />
      <hr />
      
      <h1>Use Ref Page</h1>
      <UseRefPage />
      <hr />
      
      <h1>UseEffect Page</h1>
      <UseEffectPage />
      <hr />
      
      <h1>UseCallback Page</h1>
      <UseCallPagePage />
      <hr />
      
      <h1>Use Context Page</h1>
      <ConsumerPage />
      <hr />

      <h1>UseReducer Page</h1>
      <UseReducerPage />
      <hr />

      
      <h1>Axios Page</h1>
      <AxiosPage />
      <hr />
    </div>
  )
}


import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';


const PRICE_PER_ITEM = 5;
export function Cart(){
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handeClick = () => {
    setQuantity(quantity + 1);
  }

  useEffect(() => {
    setTotalPrice(quantity * PRICE_PER_ITEM); // Cập nhật tổng giá khi quantity thay đổi
  }, [quantity]); // Chỉ chạy lại khi quantity thay đổi 

  const handeClick2 = () => {
    setQuantity(0);
    setTotalPrice(0);
  }

  return(
    <div>
      <button onClick={handeClick}>Thêm vào giỏ hàng</button>
      <p>Số lượng: {quantity}</p>
      <h1>Tổng giá: {totalPrice}</h1>
      <button onClick={handeClick2}>Xóa giỏ hàng</button>
    </div>
  )

}

// import React, { useState } from 'react';
// import { authApi, type Customer } from '../../api/auth.api';
// import {Button} from 'antd'
// import { Inputfield } from '../../components/inputitem';
// import { useNavigate  } from 'react-router-dom';

// interface CustomerForm extends Customer{
//     confirmPassword:string
// }

// export const RegisterPage = () => {
//   // Quản lý trạng thái cho form
//   const [formData, setFormData] = useState<CustomerForm>(
//     {
    
//     email: '',
//     firstName: '',
//     lastName: '',
//     fullName: '',
//     avatar: '',
//     dob: '',
//     address: '',
//     gender: '',
//     phone: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const [loading, setLoading] = useState(false); // Trạng thái đang tải
//   const [error, setError] = useState<string | null>(null);
//   const [message, setMeassage] = useState<string | null>(null);

//     const navigate = useNavigate();  

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       //"name":"Quang"
//       [name]: value,
//     });
//     // setFormData((prevData) => {
//     //   const updatedData = { ...prevData, [name]: value };

//     //   if (name === 'firstName' || name === 'lastName') {
//     //     updatedData.fullName = `${updatedData.firstName} ${updatedData.lastName}`;
//     //   }

//     //   return updatedData;
//     // });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     //có file hay không, lấy file đầu tiên hoặc rỗng
//     const file = e.target.files ? e.target.files[0] : null;
//     //nếu có
//     if (file) {
//       //gọi thư viện 
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({
//           ...formData,
//           //avatar thành chuỗi
//           avatar: reader.result as string,
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//     const validatePhone = () => {
//     const { phone } = formData;
//     const phoneRegex = /^0\d{9}$/; // kiểm tra sdt
//     if (!phone) {
//       setError("Phone number cannot be empty.");
//       return false;
//     }
//     if (!phoneRegex.test(phone)) {
//       setError("Phone number must be valid and contain 10 digits.");
//       return false;
//     }
//     return true;
//   };


//   const validatePassword = () => {
//     const { password, confirmPassword } = formData;
//     if (!password) {
//       setError("Password cannot be empty.");
//       return false;
//     }
//     if (password.length < 8) {
//       setError("Password must be at least 8 characters long.");
//       return false;
//     }
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
//     if (!passwordRegex.test(password)) {
//       setError("Password must contain at least one uppercase letter, one lowercase letter, and one number.");
//       return false;
//     }
//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Form submitted. FormData:', formData); // Log formData
//     setLoading(true);
//     setError(null);

//     const isPhoneValid = validatePhone();
//     const isPasswordValid = validatePassword(); 
    

//     if (!isPhoneValid || !isPasswordValid) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const { ...dataToSend } = formData;
//       const response = await authApi.register({
//         customer: dataToSend,
//         refCustomerId: 0,
//       });

//       console.log("API response:", response);  
//       setMeassage("Registration successful! Redirecting...");
//       navigate('/login');
//       setFormData({
//         email: '',
//         firstName: '',
//         lastName: '',
//         fullName: '',
//         avatar: '',
//         dob: '',
//         address: '',
//         gender: '',
//         phone: '',
//         password: '',
//         confirmPassword: ''
//       });



//     } catch (errors: unknown) {
//       if (errors instanceof Error) {
//         setError(errors.message || 'Đã có lỗi');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//   return(
//     <div className='max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg'>
//       <div className='text-3xl font-semibold text-center mb-6'>Register Page</div>
//       <form onSubmit={handleSubmit} >
//         <Inputfield
//           type='email'
//           label='Email:'
//           name='email'
//           value={formData.email}
//           required
//           onChange={handleChange}
//           placeholder1='Enter your email ...'
//         />  
//         <Inputfield
//           type='text'
//           label='First Name:'
//           name='firstName'
//           value={formData.firstName}
//           required
//           onChange={handleChange}
//           placeholder1='Enter your first name ...'
//         />
        
//         <Inputfield
//           type='text'
//           label='Last Name:'
//           name='lastName'
//           value={formData.lastName}
//           required
//           onChange={handleChange}
//           placeholder1='Enter your last name...'
//         />
    
//         <Inputfield
//           type='text'
//           label='Full Name:'
//           name='fullName'
//           value={formData.fullName}
//           required
//           onChange={handleChange}
//           placeholder1='Enter your full name...'
//         />
//         <div className="mb-4">
//           <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
//             Avatar:
//           </label>
//           <input
//             type="file"
//             name='avatar'
//             onChange={handleFileChange}
//             accept="image/*"
//             className='mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
//           />
//         </div>
//          {formData.avatar && (
//           <div className="mb-4 mt-4">
//             <img
//               src={formData.avatar}
//               alt="Avatar"
//               className="w-40 h-36 border-2 border-gray-300"
//             />
//           </div>
//         )}

//         <Inputfield
//           type='date'
//           label='Date of Birth:'
//           name='dob'
//           value={formData.dob}
//           required
//           onChange={handleChange}
//           placeholder1='Enter your Date of Birth...'
//         />
        
//         <Inputfield
//           type='text'
//           label='Address:'
//           name='address'
//           value={formData.address}
//           required
//           onChange={handleChange}
//           placeholder1='Enter your Address...'
//         />
//             <div className="mb-4">
//           <label htmlFor="gender" className='block text-sm font-medium text-gray-700'>
//             Gender:
//           </label>
//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//         </div>
        
//         <Inputfield
//           type='text'
//           label='Phone:'
//           name='phone'
//           value={formData.phone}
//           required
//           onChange={handleChange}
//           placeholder1='Enter your Phone...'
//         />
        
//           <Inputfield
//           type='password'
//           label='Password:'
//           name='password'
//           value={formData.password}
//           required
//           onChange={handleChange}
//           placeholder1='Enter your Password...'
//         />
        
//          <Inputfield
//           type='password'
//           label='Confirm Password:'
//           name='confirmPassword'
//           value={formData.confirmPassword}
//           required
//           onChange={handleChange}
//           placeholder1='Enter your Confirm Password...'
//         />
//         <Button 
//         htmlType="submit"
//         type="primary"
//         loading={loading}
//         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" 
//         disabled={loading}
//          >Register</Button>
//       </form>
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//       {message && <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4 text-center">{message}</p>}
//     </div>
//   )
// }

//Đăng nhập

// import { useState } from "react";
// import { authApi } from "../../api/auth.api";
// import { Button } from "antd";
// import { InputItem } from "../../components/FormItem";

// export function LoginPage(){
//     const [formData, setFormData] = useState({
//     phone:'',
//     password:''
//   });

//   const [loading, setLoading] = useState(false); // Trạng thái đang tải
//   const [error, setError] = useState<string | null>(null);
//   const [message, setMeassage] = useState<string | null>(null);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//       const { name, value } = e.target;
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     };

// const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Form submitted. FormData:', formData); // Log formData
//     setLoading(true);
//     setError(null);
//     try{
//     const response = await authApi.login(formData);
//     console.log("API response:", response);  
//     const token = response.data.token; // 
//       localStorage.setItem('authToken', token);  
//       setMeassage("Login successful! Redirecting...");
//       setFormData({
        
//         phone: '',
//         password: ''
//       });

//     } catch (errors: unknown) {
//       if (errors instanceof Error) {
//         setError(errors.message || 'Đã có lỗi');
//       }
//     } finally {
//       setLoading(false);
//     }
// };

//  return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
//       <div className="text-3xl font-semibold text-center mb-6">Login Page</div>
//       <form onSubmit={handleSubmit}>
  
//         <InputItem
//             type='text'
//             label='Phone:'
//             name='phone'
//             value={formData.phone}
//             required
//             onChange={handleChange}
//             placeholder1='Enter your Phone...'
//         />

        
//         <InputItem
//             type='password'
//             label='Password:'
//             name='password'
//             value={formData.password}
//             required
//             onChange={handleChange}
//             placeholder1='Enter your Password...'
//         />

//         <Button 
//           htmlType="submit"
//           type="primary"
//           loading={loading}
//           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" 
//           disabled={loading}
//         >
//           Login
//         </Button>
//       </form>

//       {error && <p className="text-red-500 mt-4">{error}</p>}
//       {message && <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4 text-center">{message}</p>}
//     </div>
//   );

//   }



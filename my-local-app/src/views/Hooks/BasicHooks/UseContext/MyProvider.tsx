// import React, { createContext, useState } from 'react';

// // Tạo MyContext
// export const MyContext = createContext();


// // MyProvider để cung cấp context cho các component con
// export const MyProvider = ({ children }) => {
//   // Khởi tạo state user với thông tin mặc định
//   const [user, setUser] = useState({

//     name: 'Alice',
//     email: 'alice2@example.com'
//   });


  

//   return (
//     // Cung cấp MyContext cho các component con
//     <MyContext.Provider value={{ user,setUser }}>
//       {children}
//     </MyContext.Provider>
//   );
// };
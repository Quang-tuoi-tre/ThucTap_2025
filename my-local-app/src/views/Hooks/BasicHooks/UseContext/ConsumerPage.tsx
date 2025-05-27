import { createContext, useContext, useState } from 'react';
import React from 'react';

// Định nghĩa kiểu cho ThemeContext
interface ThemeContextType {
  theme: string;
  name: string;
}

// Cung cấp giá trị mặc định cho ThemeContext
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [theme, setTheme] = useState('light');
  const [name] = useState("Quang");

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, name }}>
      {children}
      <label>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={onchange}
        />
        Use dark mode       
      </label>
    </ThemeContext.Provider>
  );
}

function UserProfile() {
  const { theme, name } = useContext(ThemeContext)!; // Dùng ! để TypeScript hiểu rằng context đã được cung cấp

  const className = 'panel-' + theme;
  const classname1 = 'button-' + theme;

  return (
    <div>
      <h1 className={className}>User Profile</h1>
      <button className={classname1}>Tổng</button>
      <p>Tên là: {name}</p>
    </div>
  );
}

export function ConsumerPage() {
  return (
    <UserProvider>
      <UserProfile />
    </UserProvider>
  );
}


// const ThemeContext = createContext(null);
// const CurrentUserContext = createContext(null);

// export function ConsumerPage() {
//   const [theme, setTheme] = useState('light');
//   return (
//     <MyProviders theme={theme} setTheme={setTheme}>
//       <WelcomePanel />
//       <label>
//         <input
//           type="checkbox"
//           checked={theme === 'dark'}
//           onChange={(e) => {
//             setTheme(e.target.checked ? 'dark' : 'light')
//           }}
//         />
//         Use dark mode
//       </label>
//     </MyProviders>
//   );
// }

// function MyProviders({ children, theme, setTheme }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [age, setAge] = useState(0);
//   return (
//     <ThemeContext.Provider value={theme}>
//       <CurrentUserContext.Provider
//         value={{
//           currentUser,
//           setCurrentUser,
//           age,
//           setAge
          
//         }}
//       >
//         {children}
//       </CurrentUserContext.Provider>
//     </ThemeContext.Provider>
//   );
// }

// function WelcomePanel({ children }) {
//   const {currentUser} = useContext(CurrentUserContext);
//   return (
//     <Panel title="Xin chào" >

//       {currentUser !== null ?
//         <Greeting /> :
//         <LoginForm />
//       }
//     </Panel>
//   );
// }

// function Greeting() {
//   const {currentUser} = useContext(CurrentUserContext);
//   return (
//     <p>You logged in as {currentUser.name}.</p>
//   )
// }

// function LoginForm() {
//   const {setCurrentUser,setAge,age} = useContext(CurrentUserContext);
  
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const canLogin = firstName !== '' && lastName !== '';
//   const theme = useContext(ThemeContext);
//   const className = 'input-' + theme;
//   return (
//     <>
//       <label>
//         First name:
//         <input className={className} 
//           value={firstName}
//           onChange={e => setFirstName(e.target.value)}
//         />
//       </label>
//       <label>
//         Last name:
//         <input className={className}
//         required
//           value={lastName}
//           onChange={e => setLastName(e.target.value)}
//         />
//       </label>
//       <h1>Đếm tuổi:{age}</h1>
//       <Button onClick={() => setAge(age=>age + 1)}>Tăng tuổi

//       </Button>
//       <Button
//         disabled={!canLogin}
//         onClick={() => {
//           setCurrentUser({
//             name: firstName + ' ' + lastName
//           });
//         }}
//       >
//         Log in
//       </Button>
//       {!canLogin && <i>Fill in both fields.</i>}
//     </>
//   );
// }

// function Panel({ title, children }) {
//   const theme = useContext(ThemeContext);

//   const className = 'panel-' + theme;
//   return (
//     <section className={className}>
//       <h1 className={className}>{title}</h1>
      
//       {children}
//     </section>
//   )
// }

// function Button({ children, disabled, onClick }) {
//   const theme = useContext(ThemeContext);
//   const className = 'button-' + theme;
//   return (
//     <button
//       className={className}
//       disabled={disabled}
//       onClick={onClick}
//     >
//       {children}
//     </button>
//   );
// }

//type,props,children

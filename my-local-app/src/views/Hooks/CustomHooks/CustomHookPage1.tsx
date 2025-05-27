import { useFormInput } from "./UseFormInput.tsx";

import React from 'react'

export function CustomHookPage1() {
  const user = useFormInput("", 'email');
  const email = useFormInput("", 'email');
  const password=useFormInput("", 'email')

  // Hàm reset giá trị input về giá trị ban đầu
  
   
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-500">Custom Hook</h1>

      <label>
        User:
        <input {...user} className="input-dark" />
      </label>
      <br />

      <label>
        Email:
        <input {...email} className="input-dark" />
      </label>
      <br />

      <label>
        Password:
        <input
          {...password}
          type="password"
            className="input-dark"
        />
      </label>

      <p>
        {/* <b>Good morning, User:  {user.inputprops.value} Email:  {email.inputprops.value} Mật khẩu: {password.inputprops.value}</b> */}
      </p>
    </div>
  );
}

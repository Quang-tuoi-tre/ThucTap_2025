import React, { useState } from 'react';


export const OnSubmitandOnChange = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,  // Cập nhật giá trị tương ứng với name của input
    });
    console.log('Name:', value); 
  }

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,  
    });
    console.log('Email:', value); // Ghi log dữ liệu form mỗi khi thay đổi
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn chặn reload trang khi submit form

    console.log('Form Submitted:', formData);
    alert(`Name: ${formData.name}, Email: ${formData.email}`);

    setFormData({
      name: '',
      email: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input className='border-2 border-gray-300 p-2 rounded'
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input className='border-2 border-gray-300 p-2 rounded'
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange1}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

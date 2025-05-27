import React from 'react'

interface ContactItemProp{
  name:string
  email:string
  phone:string
}

export function ContactItem({ name, email, phone }:ContactItemProp) {
  return (
    <div className="contact-item">
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
    </div>
  );
}
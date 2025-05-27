import React from 'react';
import { ContactItem } from '../../../components/ContactItem';
export function ContactPage() {
  return (
    <div>
      <h1>Contact Page</h1>
      <p>If you have any questions, feel free to reach out!</p>
        <ContactItem name="John Doe" email="quanggat890@gmail.com" phone="123-456-7890" />
    </div>
  );
}
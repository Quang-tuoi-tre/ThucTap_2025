import { useFormInput } from './UseFormInput';
import React from 'react';
export  function CustomHooksPage() {
  const firstNameProps = useFormInput('Quang');
  const lastNameProps = useFormInput('Hồ');

// const [firstName, setFirstName] = useState('Quang');
// const [lastName, setLastName] = useState('Hồ');

//   useEffect(() => {
//     const handleChange = (e) => {
//       if (e.target.name === 'firstName') {
//         setFirstName(e.target.value);
//       } else if (e.target.name === 'lastName') {
//         setLastName(e.target.value);
//       }
//     }
//     console.log('First name:', firstNameProps.value);
//     console.log('Last name:', lastNameProps.value);
//   }, [firstNameProps.value, lastNameProps.value]);
  return (
    <>
      <label>
        First name:
        <input {...firstNameProps} className="input-dark"/>
      </label>
      <label>
        Last name:
        <input {...lastNameProps} className="input-dark" />
      </label>
      <p><b>Good morning, {firstNameProps.inputprops.value} {lastNameProps.inputprops.value}.</b></p>
    </>
    
  );
}



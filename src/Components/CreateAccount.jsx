import React, { useRef } from 'react'; // useRef is a hook that allows us to reference an element in the DOM
import Card from './Card';
import { UserContext } from './Context';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';




export default function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [button, setButton] = React.useState(false);
  const ctx = React.useContext(UserContext);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();


  
  function validate(field, label) {
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  
  
  
  function checkCreateAccountFields(e) {
    let element = e.target.id;
    let value = e.target.value;
    if (element === 'name' && value === '') {
      setStatus('Error: Please enter a valid name');
      setTimeout(() => setStatus(''), 3000);
      return
    }
    if (element === 'email' && value === '') {
      setStatus('Error: Please enter an email address');
      setTimeout(() => setStatus(''), 3000);
      return;
    }
    if (element === 'password' && value === '') {
      setStatus('Error: Please enter a password');
      setTimeout(() => setStatus(''), 3000);
      return;
    }
  }

  
  
  function EnableButtonIfAllFieldsArePopulated() {
    if (nameRef.current.value !== "" && emailRef.current.value !== "" & passwordRef.current.value !== "") {
      setButton(true);
    }
    else {
      setButton(false);
    }
  }


  
  
  function handleCreate() {
    if (name.trim() !== '' && email !== '' && password !== '') { setButton(true); }
    console.log(name, email, password);
    if (!validate(name, 'name')) return;
    setName(name.trim());
    if (!isNaN(name)) {
      setStatus('Error: name can only contain letters');
      setTimeout(() => setStatus(''), 3000);
      return;
    }
    if (!validate(email, 'email')) return;
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      setStatus('Error: email must be in the format of name@name.com');
      setTimeout(() => setStatus(''), 3000);
      return;
    }
    if (!validate(password, 'password')) return;
    if (password.length < 8) {
      setStatus('Error: password must be at least 8 characters');
      setTimeout(() => setStatus(''), 3000);
      return;
    }
    const randomBalance = Math.floor(Math.random() * 101) + 50;  // Generates random whole number between 50 and 150
    if (!validate(button, 'button')) return;
    ctx.users.push({ name, email, password, balance: randomBalance });
    setShow(false);
  }




  function clearForm() {
    setName('');
    setEmail('');
    setPassword('');
    setButton(false);
    setShow(true);
  }




  return (
    <Card
      bgcolor="dark"
      txtcolor="white"
      header="Create Account"
      status={status}
      body={show ? (
        <>
          <form>
            Name<br /><input
              type="input"
              ref={nameRef}
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={e => { setName(e.currentTarget.value); EnableButtonIfAllFieldsArePopulated() }}
              onBlur={checkCreateAccountFields} /><br />
            Email address<br /><input
              type="input"
              ref={emailRef}
              className="form-control" id="email"
              placeholder="Enter email"
              value={email}
              onChange={e => { setEmail(e.currentTarget.value.trim()); EnableButtonIfAllFieldsArePopulated() }}
              onBlur={checkCreateAccountFields} /><br />
            Password<br /><input
              type="password"
              ref={passwordRef}
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={e => { setPassword(e.currentTarget.value.trim()); EnableButtonIfAllFieldsArePopulated() }}
              onBlur={checkCreateAccountFields}
              autoComplete="name, email, new-password"  // Add this line
            /><br />

            <button type="submit" className="btn btn-light" disabled={!button} onClick={handleCreate}>Create Account</button>
          </form>
        </>
      ) : (
        <>
          <h5>Success</h5>
          <button
            type="submit"
            className="btn btn-light"
            onClick={clearForm}>Add another account
          </button>
        </>
      )}
    />
  );
};
import React from 'react';
import Card from './Card';
import { UserContext } from './Context';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [button, setButton] = React.useState(false);
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function checkCreateAccountFields(e) {
    if (name.trim() && email && password) {
      setButton(true);
    } else {
      setButton(false);

      let element = e.target.id;
      if (element === 'name' && name === '') {
        setStatus('Error: Please enter a valid name');
        setTimeout(() => setStatus(''), 3000);
      }

      if (element === 'email' && email === '') {
        setStatus('Error: Please enter an email address');
        setTimeout(() => setStatus(''), 3000);

      }
      if (element === 'password' && password === '') {
        setStatus('Error: Please enter a password');
        setTimeout(() => setStatus(''), 3000);
        return;
      }
    }
  }


  function handleCreate() {
    console.log(name, email, password);
    if (!validate(name, 'name')) return;
    setName(name.trim());
    if (!isNaN(name)) {
        setStatus('Error: name can only contain letters');
        setTimeout(() => setStatus(''), 3000);
        return;
    }


    // if (!/^[a-zA-Z]+$/.test(name)) {
    //   setStatus('Error: name can only contain letters');
    //   setTimeout(() => setStatus(''), 3000);
    //   return;
    // }

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
    if (!validate(button, 'button')) return;
    ctx.users.push({ name, email, password, balance: 100 });
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
      bgcolor="secondary"
      txtcolor="white"
      header="Create Account"
      status={status}
      body={show ? (
        <>
          Name<br /><input
            type="input"
            style={{ backgroundColor: 'lightgray' }}
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={e => setName(e.currentTarget.value)}
            onBlur={checkCreateAccountFields} /><br />
          Email address<br /><input
            type="input"
            style={{ backgroundColor: 'lightgray' }}
            className="form-control" id="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value.trim())}
            onBlur={checkCreateAccountFields} /><br />
          Password<br /><input
            type="password"
            style={{ backgroundColor: 'lightgray' }}
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value.trim())}
            onBlur={checkCreateAccountFields} /><br />
          <button type="submit" className="btn btn-light" disabled={!button} onClick={handleCreate}>Create Account</button>
        </>
      ) : (
        <>
          <h5>Success</h5><button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
        </>
      )}
    />
  );
};
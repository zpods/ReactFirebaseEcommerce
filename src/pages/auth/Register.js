import React, { useState } from "react";
import CustomPopover from "../../components/utilities/CustomPopover";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import styles from './auth.module.css';


const Register = () => {

    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const emailInput = document.getElementById('email');
        const userEmail = emailInput.value;        
        let result = userEmail.search(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
        if(result < 0){
            emailInput.placeholder = "Podaj adres email!";
            setAnchorEl(event.currentTarget);
            setMessage("Użyj prawidłowego adresu email!");
        }else{   
            setMessage("");        
            setAnchorEl(event.currentTarget);
            const config = {
                url: process.env.REACT_APP_SHOP_REDIRECT_TO_REGISTER_URL,
                handleCodeInApp: true
            }
            auth.sendSignInLinkToEmail(userEmail, config)
            .then(() => {
              window.localStorage.setItem('emailForSignIn', userEmail);
              setMessage(`Link rejestracyjny wysłany na email ${userEmail}!`);
              setEmail("");
              setTimeout(()=>{
                setMessage('');
                navigate('/');
              },2000);
            })
            .catch((error) => {
                console.log(error.message)
                setMessage('Błąd!');
            });
        }     
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const registerForm = () => {
        return (
            <form onSubmit={handleSubmit} className="{styles.input">
                <input id="email" type="text" 
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                autoFocus
                ></input>              
                    {  
                    message && <CustomPopover id={id} message={message} open={open} anchorEl={anchorEl} handleClose={handleClose} />
                    }
                <button type="submit" onSubmit={ (event) => handleSubmit(event)} className="btn btn-success my-3 p-3 w-25">Register</button>
            </form>
        );
    }

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}                    
                </div>
            </div>
       </div>
    );
};

export default Register;
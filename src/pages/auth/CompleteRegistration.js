import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setLoggedInOrOut } from "../../store/slices/authSlice";
import CustomPopover from "../../components/utilities/CustomPopover";
import { auth } from '../../firebaseConfig';
import styles from './auth.module.css';


const CompleteRegistration = ({ history }) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [anchorEl, setAnchorEl] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordConfirmed, setPasswordConfirmed] = useState("");
    const [passwordConfirmedSentToFirebase, setPasswordConfirmedSentToFirebase] = useState("");
    const emailSaveInLocalstorage = window.localStorage.getItem('emailForSignIn');

    const confirmPassword  = (event) => {
        let regularExpression = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        let checkPassFillRules = passwordOne.search(regularExpression);
        if(checkPassFillRules < 0){
            setAnchorEl(event.currentTarget);
            setMessage('Hasło powinno zawierać jedną małą litere, jedną dużą litere, jedną cyfrę, jeden znak specjalny, i być co najmniej 8 zanków długie')
        }else{
            if(passwordOne !== passwordConfirmed){
                setAnchorEl(event.currentTarget);
                setMessage("Hasła nie pasują do siebie!")
            }else{
                setPasswordConfirmedSentToFirebase(passwordConfirmed);
                setAnchorEl(event.currentTarget);
                setMessage("Hało ustawione!")
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();        
        try {
            confirmPassword(event);
            const result = await auth.signInWithEmailLink(
                emailSaveInLocalstorage,
                window.location.href
            );
            if(result.user.emailVerified){
                // remove email
                window.localStorage.removeItem('emailForSignIn');
                // get user token
                let user = auth.currentUser;
                await user.updatePassword(passwordConfirmedSentToFirebase);
                // set token in redux store
                const token = await user.getIdTokenResult();
                dispatch(setToken(token));
                dispatch(setLoggedInOrOut(true));            
                // redirect to home
                setTimeout(()=>{
                    navigate('/');
                }, 2000);                
            }
        } catch(error) {
            setMessage('Błąd, prawdopodobnie hasło zostało już ustawione wcześniej');
        }
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const completeRegistrationForm = () => {
        return (
            <form onSubmit={handleSubmit} className="{styles.input">
                <input id="email" type="email" 
                className={styles.input}
                value={emailSaveInLocalstorage || ""}
                readOnly
                ></input>
                <input id="password" type="password" 
                value={passwordOne}
                className={styles.input}
                onChange={(e) => {setPasswordOne(e.target.value)}}
                
                placeholder="Enter your Password"
                
                required
                autoFocus
                ></input> 
                <input id="password-confirm" type="password"
                 value={passwordConfirmed || ""}
                className={styles.input}
                onChange={(e) => { setPasswordConfirmed(e.target.value)}}
                placeholder="Confirm your Password "
                
                required
                ></input>        
                    
                <button type="submit" onSubmit={(event) => handleSubmit(event)} className="btn btn-success my-3 p-3 w-25">Register</button>
            </form>
        );
    }

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {completeRegistrationForm()}
                    <CustomPopover id={id} message={message} open={open} anchorEl={anchorEl} handleClose={handleClose} />
                </div>
            </div>
       </div>
    );
}

export default CompleteRegistration;
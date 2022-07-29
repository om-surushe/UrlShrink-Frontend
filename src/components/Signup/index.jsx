import styles from './styles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error,setError] = useState("");

    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const url = "http://localhost:3000/api/users";
            const {data: res} = await axios.post(url,data);
            navigate('/login')
            console.log(res.message);
        } catch (error) {
            if (error.response && 
                error.response.status >= 400 &&
                error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    }

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <Link to="/login">
                        <button type='button' className={styles.white_btn}>
                            Sign In
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder='Your Name'
                            name='name'
                            onChange={handleChange}
                            value={data.name}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder='Your Email'
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder='Your Password'
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg} > {error}</div>}
                        <button type='submit' className={styles.green_btn} >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;
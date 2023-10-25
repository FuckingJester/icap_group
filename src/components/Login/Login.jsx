import {useState} from 'react'
import styles from './Login.module.css'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { setLogin } from '../../store/slices/login.slice'

let MySwal = withReactContent(Swal)

const Login = () => {
    
    const dispatch = useDispatch()
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (user, pass) => {
        try {
            const response = await fetch('https://technical-task-api.icapgroupgmbh.com/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: user, password: pass })
            });

            const data = await response.json();
            console.log(data)

            if (response.status === 200) {
              dispatch(setLogin())
              MySwal.fire({
                icon: 'success',
                title: <i>Авторизація успішна!</i>,
                confirmButtonText: <i>Ок</i>})
          } else {
            MySwal.fire({
              icon: 'error',
              title: <i>Помилка авторизації</i>,
              confirmButtonText: <i>Спробуйте ще раз</i>
            })
          }
            
        } catch (error) {
            console.error('Помилка під час виконання запиту', error);
        }
    };

    return (
      <div className={styles.login}>
        <h1>Авторизація</h1>
        <div className={styles.login__container}>
            <form className={styles.login__form}> 
                <div>
                    <input 
                    className={styles.login__input} 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value) }
                    placeholder='Користувач'
                    type='text'/>
                </div>
                <div>
                    <input 
                    className={styles.login__input} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value) }
                    placeholder='Пароль' 
                    type="password"
                    />
                </div>
                <button onClick={(e) => {
                  e.preventDefault()
                  handleLogin(username,password)}
                  }>Увійти</button>
            </form> 
        </div>
      </div>
    );
  };
  

export default Login
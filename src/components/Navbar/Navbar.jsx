import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from '../../store/slices/login.slice';
import { useEffect } from 'react';


export default function Navbar() {
  const isAuth = useSelector(state => state.login.auth)
  const dispatch = useDispatch()

  useEffect(()=>{
    isAuth
  },[isAuth])
  return (
    <div className={styles.navbar} >
        <div className={styles.navbar__left}>
            <Link to={"/"}>
              <h1 className={styles.navbar__logo}>Головна</h1>
            </Link>
        </div>
        <div className={styles.navbar__right}>
            {!isAuth && <div className={styles.navbar__item}><Link to={'/login'}>Увійти</Link></div>}
            {isAuth && <div className={styles.navbar__item} onClick={() => dispatch(setLogout())}>Вийти</div>}
        </div>
    </div>
  )
}

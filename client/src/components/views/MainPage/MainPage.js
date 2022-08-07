import React, { useEffect } from 'react'
import axios from 'axios'
import Auth from '../../../hoc/auth';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function MainPage() {
  let naviate = useNavigate();

  useEffect(() => {
    axios.get('/api/test') //get request를 보냄.
      .then(response => console.log(response.data)) // response를 출력.
  }, [])

  return (
    <div>
      <Header />
      <h2>시작 페이지</h2>
      {/* <div>
        <Footer />
      </div> */}
    </div>
  )
}

export default Auth(MainPage, null);
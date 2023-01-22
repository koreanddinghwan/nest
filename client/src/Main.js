import { useEffect, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

export default function Main() {
  const [login, setLogin] = useState({
    stat: false,
    id: '',
    profile: '',
  })

  const onGoogleLogin = (e) => {
    console.log('evemt')
    window.location.href = 'http://localhost:3000/api/auth/google/login'
  }

  useEffect(() => {
    async function refreshSilent() {
      console.log('post refresh token')
      //refresh with cookie
      try {
        const res = await fetch(
          'http://localhost:3000/api/auth/refresh_silent',
          {
            method: 'GET',
            // mode: 'cors',
            //credentials true로 해야 header의 cookie가 전송됩니다.
            credentials: 'include',
          }
        )
        console.log(
          'res:',
          res.json().then((data) => {
            console.log(data)
          })
        )
      } catch (e) {
        console.log('error', e.message)
      }
    }
    refreshSilent()
    //cleanup fnc
    return () => {
      console.log('cleanup')
    }
  }, [])

  if (login.stat === false)
    return (
      <div>
        <h3>로그인 테스트</h3>
        <ul>
          <button onClick={onGoogleLogin}>구글 로그인</button>
        </ul>
      </div>
    )
  else {
    return (
      <div>
        <div>{login.id}</div>
      </div>
    )
  }
}

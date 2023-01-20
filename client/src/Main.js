import { useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

export default function Main() {
  const [login, setLogin] = useState({
    stat: false,
    id: '',
    profile: '',
  })

  useLayoutEffect(() => {
    console.log('post refresh token')
    return () => {
      console.log('cleanup')
    }
  })

  return (
    <div>
      <h3>로그인 테스트</h3>
      <ul>
        <Header login={login} />
      </ul>
    </div>
  )
}

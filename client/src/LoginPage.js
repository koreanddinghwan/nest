import { useLayoutEffect } from 'react'

function LoginPage() {
  const onGoogleLogin = (e) => {
    console.log('evemt')
    window.location.href = 'http://localhost:3000/api/auth/google/login'
  }

  const refreshSilent = async () => {
    console.log('post refresh token')
    //refresh with cookie
    try {
      const res = await fetch('http://localhost:3000/api/auth/refresh_silent', {
        method: 'Get',
        mode: 'no-cors',
        //credentials true로 해야 header의 cookie가 전송됩니다.
        credentials: 'include',
      })
      console.log('res:', res.body)
    } catch (e) {
      console.log('error')
    }
  }

  useLayoutEffect(() => {
    refreshSilent()
    //cleanup fnc
    return () => {
      console.log('cleanup')
    }
  })

  return (
    <div>
      <button onClick={onGoogleLogin}>구글 로그인</button>
    </div>
  )
}

export default LoginPage

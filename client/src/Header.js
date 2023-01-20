import { Link } from 'react-router-dom'

export default function Header(props) {
  if (props.login.stat === false)
    return (
      <Link to="/LoginPage">
        <li>로그인페이지로 이동</li>
      </Link>
    )
  else
    return (
      <div>
        <div>{props.login.id}</div>
        <img alt="profile" src={props.login.profile}></img>
      </div>
    )
}

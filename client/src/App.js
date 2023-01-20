import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import LoginPage from './LoginPage'
import Main from './Main'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/LoginPage" element={<LoginPage />}></Route>
          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

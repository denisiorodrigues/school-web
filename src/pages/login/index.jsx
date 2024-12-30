import React, { useState } from 'react'
import './styles.css'
import { ContactRound  } from 'lucide-react'
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from "react-router";
import api from '../../services/api'
// import { useHistory } from 'react-router-dom'


export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let navigate = useNavigate()

  // const history = useHistory()
  async function handleLogin(e) {
    e.preventDefault()

    const data = {
      email, password
    }
    
    try {
      const response = await api.post('/api/Account/login', data)

      // console.log(response)
      localStorage.setItem('email', email)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('expiration', response.data.expiration)
      
      // return redirect("/students");
      navigate('/students')
      // history.push('/students')
    } catch (error) {
      alert('Falha no login, tente novamente')
      console.error(error)
    }
  }

  return (
    <div className='login-container'>
        <section className='form'>
            <ContactRound size={45} id='img1'/>
            <form onSubmit={handleLogin}>
                <h1>Cadastro de Alunos</h1>
                <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}/>
                <button className='button' type="submit">Login</button>
            </form>
        </section>
    </div>
  )
}
import React from 'react'
import './styles.css'
import { ContactRound  } from 'lucide-react'

export default function Login() {
  return (
    <div className='login-container'>
        <section className='form'>
            <ContactRound size={45} id='img1'/>
            <form action="">
                <h1>Cadastro de Alunos</h1>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Senha" />
                <button className='button' type="submit">Login</button>
            </form>
        </section>
    </div>
  )
}
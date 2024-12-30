import React, { useState } from 'react';
import './styles.css';
import { UserPlus, Undo2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import api from '../../services/api';

export default function NewStudent() {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState(null)

    const token = localStorage.getItem('token')

    const authorization = {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }

    async function createStudent() {
        const data = {
            name, email, age
        }

        try {
            await api.post(`/api/Student/`, data, authorization)
            navigate('/students')
        } catch (error) {
            alert('Falha ao cadastrar aluno, tente novamente')
            console.error(error)
        }
    }

    return (
        <div className='new-student-container'>
            <div className='content'>
                <section className='form'>
                    <UserPlus size={105} color='#17202a'/>
                    <h1>Adicionar novo aluno</h1>
                    <Link className='back-link' to="/students">
                        <Undo2 size={25} color='#17202a'/>
                        Voltar
                    </Link>
                </section>
                <form action="">
                    <input type="name" placeholder="Nome" onChange={e => setName(e.target.value)}/>
                    <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    <input type="number" placeholder="Idade" onChange={e => setAge(e.target.value)}/>
                    <button className='button' type="submit" onClick={createStudent}>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
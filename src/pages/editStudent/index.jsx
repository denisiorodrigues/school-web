import React, { useEffect, useState } from 'react';
import './styles.css';
import { Undo2, PencilRuler } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

export default function EditStudent() {

    const navigate = useNavigate()

    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState(0)

    const { studentId } = useParams();

    const  token = localStorage.getItem('token')

    const authorization = {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        getStudent()
        console.log('Use effet executado')
    }, [studentId])

    async function getStudent() {
        try {
            const response = await api.get(`/api/Student/${studentId}`, authorization)
            setId(response.data.id)
            setName(response.data.name)
            setEmail(response.data.email)
            setAge(response.data.age)
        } catch (error) {
            alert('Falha ao buscar aluno, tente novamente')
            console.error(error)
        }
    }

    async function updateStudent(event) {
        event.preventDefault();
        const data = {
            id, name, email, age
        }

        try {
            await api.put(`/api/Student/${id}`, data, authorization)
            navigate('/students', { replace: true })
        } catch (error) {
            alert('Falha ao atualizar aluno, tente novamente')
            console.error(error)
        }
    }

    return (
        <div className='new-student-container'>
            <div className='content'>
                <section className='form'>
                    <PencilRuler size={105} color='#17202a'/>
                    <h1>Edita Aluno</h1>
                    <Link className='back-link' to="/students">
                        <Undo2 size={25} color='#17202a'/>
                        Voltar
                    </Link>
                </section>
                <form action="" onSubmit={updateStudent}>
                    <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)}/>
                    <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="number" placeholder="Idade" value={age} onChange={e => setAge(e.target.value)}/>
                    <button className='button' type="submit">Atualizar</button>
                </form>
            </div>
        </div>
    )
}
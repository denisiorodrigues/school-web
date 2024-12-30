import React, { useEffect, useState } from 'react'
import './styles.css'
import { BookLock, LogOut, Search, PencilRuler, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import api from '../../services/api';


export default function Students() {
    const [students, setStudents] = useState([])
    const [filteredStudents, setFilteredStudents] = useState([])

    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    
    const navigate = useNavigate()

    const authorization = {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        api.get('/api/Student', authorization)
        .then(response => {
            setStudents(response.data)
            setFilteredStudents(response.data)
        }, token)
    }, [])

    async function logout() {
        try {
            localStorage.clear()
            localStorage.removeItem('token')
            authorization.headers = ''
            navigate('/')
        } catch (error) {
            alert('Falha ao sair, tente novamente')
            console.error(error)
        }
    }

    async function editStudent(id) {
        try {
            navigate(`/students/edit/${id}`, {replace: true})
        } catch (error) {
            alert('Falha ao editar aluno, tente novamente')
            console.error(error)          
        }
    }

    async function deleteStudent(id) {
        try {
            if(window.confirm('Deseja realmente deletar este aluno?')) {
                await api.delete(`/api/Student/${id}`, authorization)
                const result = students.filter(student => student.id !== id)
                setStudents(result)
                setFilteredStudents(result)
            }
        } catch (error) {
            alert('Falha ao deletar aluno, tente novamente')
            console.error(error)
        }
    } 

    async function searchStudent(name) {
        if(name.length) {
            const filteredData = students.filter(student => student.name.includes(name))
            setFilteredStudents(filteredData)
        } else {
            setFilteredStudents(students)
        }
    }

    return (
        <div className='student-container'>
            <header>
                <BookLock size={45}/>
                <span>Bem-vindo, <strong>{email}</strong>!</span>
                <Link className='button' to="new">Novo Aluno</Link>
                <button className='button' type="submit" onClick={logout}> 
                    <LogOut size={25} color='#17202a'/>
                    {/* <span className='button-icon'>Sair</span> */}
                </button>
            </header>
            <form action="">
                <input type="text" placeholder='Buscar por nome' onChange={(element) => searchStudent(element.target.value)}/>
                {/* <button type='button' className='button'>
                    <Search className='button-icon'/>
                    <span className='button-icon'>Buscar</span>

                </button> */}
            </form>
            <h1>Relação de Alunos</h1>

            <ul className="">
                {filteredStudents.map((student) => (
                <li key={student.id}>
                    <b>Nome:</b> {student.name} <br /><br />
                    <b>E-mail:</b> {student.email} <br /><br />
                    <b>Idade:</b> {student.age} <br /><br />
                    {/* <Link to={`edit/${student.id}`}>
                        <PencilRuler  size={25} color='#17202a'/>
                    </Link> */}
                    <button type='button' onClick={() => editStudent(student.id)}>
                        <PencilRuler  size={25} color='#17202a'/>
                    </button>
                    <button type='button' onClick={() => deleteStudent(student.id)}>
                        <Trash2 size={25} color='#17202a'/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    )
}
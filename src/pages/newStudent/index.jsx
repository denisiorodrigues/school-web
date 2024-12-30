import React from 'react';
import './styles.css';
import { UserPlus, Undo2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewStudent() {
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
                    <input type="name" placeholder="Nome" />
                    <input type="email" placeholder="Email" />
                    <input type="number" placeholder="Idade" />
                    <button className='button' type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
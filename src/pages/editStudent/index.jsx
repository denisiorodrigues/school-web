import React from 'react';
import './styles.css';
import { Undo2, PencilRuler } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function EditStudent() {

    const { studentId } = useParams();

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
                <form action="">
                    <input type="name" placeholder="Nome" />
                    <input type="email" placeholder="Email" />
                    <input type="number" placeholder="Idade" />
                    <button className='button' type="submit">Atualizar</button>
                </form>
            </div>
        </div>
    )
}
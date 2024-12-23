import React from 'react'
// import 'boostrap/dist/css/bootstrap.min.css'
import './App.css'
// import axios from 'axios'
// import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { NotebookPen } from 'lucide-react'

function App() {
  return (
    <>
      <div className=''>
        <br/>
        <h3>Cadastro de Alunos</h3>
        <header>
          <NotebookPen size={90}/>
          <button className='btn btn-success'>Incluir Novo Aluno</button>
        </header>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Idade</th>
              <th>Operação</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  )
}

export default App

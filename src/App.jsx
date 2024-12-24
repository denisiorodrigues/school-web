import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { NotebookPen } from 'lucide-react'
import axios from 'axios';

function App() {
  const baseURL = 'http://localhost:5259/api/student'

  const [data, setData] = useState([])

  const getStudents = async () => {
    await axios.get(baseURL)
    .then(response => setData(response.data))
    .catch(error => console.log(error))
  }

  useEffect(() => { 
    getStudents();
  });

  return (
    <div className='App'>
      <br/>
      <h3>Cadastro de Alunos</h3>
      <header>
        <NotebookPen size={90}/>
        <button className='btn btn-success'>Incluir Novo Aluno</button>
      </header>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Idade</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
         {data.map(student => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.age}</td>
            <td>
              <button className='btn btn-primary'>Editar</button> {"  "}
              <button className='btn btn-danger'>Excluir</button> {"  "}
            </td>
          </tr>
         ))}
        </tbody>
      </table>
    </div>
  )
}

export default App

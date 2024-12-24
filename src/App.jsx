import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { NotebookPen } from 'lucide-react'
import axios from 'axios';

function App() {
  const baseURL = 'http://localhost:5259/api/student'

  const [data, setData] = useState([])
  const [student, setStudent] = useState({
    id: '',
    name: '',
    email: '',
    age: ''
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);

  const handleChange = e => {
    const {name, value} = e.target;
    setStudent({
      ...student,
      [name]: value
    });
    console.log(student);
  }

  const getStudents = async () => {
    await axios.get(baseURL)
    .then(response => setData(response.data))
    .catch(error => console.log(error))
  }

  const postStudents = async () => {
    delete student.id;
    student.age = parseInt(student.age);
    await axios.post(baseURL, student)
    .then(response => { 
      setData(data.concat(response.data));
      openCloseModal();
    })
    .catch(error => console.log(error))
  }

  const putStudent = async () => {
    
    console.log('PUT Student', student)

    await axios.put(baseURL + '/'+ student.id, student)
    .then(response => {
      var newData = response.data;
      data.map(stud => {
        if(student.id === stud.id) {
          stud.name = newData.name;
          stud.email = newData.email;
          stud.age = newData.age;
        }
      });
      setData(data);
      openCloseEditModal();
    })
  }

  const openCloseModal = () => {
    setModalIsOpen(!modalIsOpen);
  }

  const openCloseEditModal = () => {
    setModalEditIsOpen(!modalEditIsOpen);
  }

  const selectStudent = (student, option) => {
    setStudent(student);
    (option === 'edit') ? openCloseEditModal() : alert('Excluir');
  };

  useEffect(() => { 
    getStudents();
  });

  return (
    <div className='App'>
      <br/>
      <h3>Cadastro de Alunos</h3>
      <header>
        <NotebookPen size={90}/>
        <button className='btn btn-success' onClick={ () => openCloseModal() }>Incluir Novo Aluno</button>
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
              <button className='btn btn-primary' onClick={ () => selectStudent(student, "edit") }>Editar</button> {"  "}
              <button className='btn btn-danger' onClick={ () => selectStudent(student, "delete") }>Excluir</button> {"  "}
            </td>
          </tr>
         ))}
        </tbody>
      </table>

      <Modal isOpen={modalIsOpen}>
        <ModalHeader>Incluir Alunos</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Nome: </label>
            <br />
            <input type="text" className='form-control' name="name" onChange={handleChange}/>
            <br />
            <label>E-mail: </label>
            <br />
            <input type="text" className='form-control' name="email" onChange={handleChange}/>
            <br />
            <label>Idade</label>
            <br />
            <input type="text" className='form-control' name="age" onChange={handleChange}/>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={ () => postStudents() }>Incluir</button>{"    "}
          <button className='btn btn-danger' onClick={ () => openCloseModal() }>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditIsOpen}>
        <ModalHeader>Editar Aluno</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>ID: </label>
            <br />
            <input type="text" readOnly className='form-control' value={student && student.id}/>
            <br />
            <label>Nome: </label>
            <br />
            <input type="text" className='form-control' name="name" value={student && student.name} onChange={handleChange}/>
            <br />
            <label>E-mail: </label>
            <br />
            <input type="text" className='form-control' name="email" value={student && student.email} onChange={handleChange}/>
            <br />
            <label>Idade</label>
            <br />
            <input type="text" className='form-control' name="age" value={student && student.age} onChange={handleChange}/>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={ () => putStudent() }>Salvar</button>{"    "}
          <button className='btn btn-danger' onClick={ () => openCloseEditModal() }>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default App

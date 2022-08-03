import { useState, useEffect } from 'react'
import './styles.css'
import { Card } from '../../components/card'
function Home() {
  const [studentName, setStudentName ] = useState('insira nome aqui')
 /* studentName é onde eu vou guardar o conteudo do estado
 e depois a função que atualiza esse estado */
  const [students, setStudents] = useState([]) /* cria um array para futuras inserções */

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }) 
      /* retorna a data atual em que o input sera feito */

    }
    setStudents(prevState => [...prevState, newStudent])
    /* muito simples toda vez que setStudents for chamado para criar um novo newStudent
    ele vai criar um novo estado, mais o estado anterior
    o... ou spread operator e para assegurar que todos os vetores continuem irmãos no 
    mesmo nivel do vtor  */
  }
  /* toda vez que chamarmos essa funçção ele vai criar um novo objeto 
  que vai ter 2 propriedades, o name que vamos pegar do estado
  StudentName que ta armazenando o conteúdo atual do input
  e time que vamos pegar do horario atual
  
  e depois que o objeto é montado nos adicionamos ao estado setStudents*/
  const [user, setUser] = useState({
    name: '',
    avatar:'',
  })
  useEffect(()=>{
    /* corpo do useEffect, ações que queremos que execute */

    /* fetch('https://api.github.com/users/YuukiSnowRG')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }) */
    async function handleAsyncUseEffect(){
      const response = await fetch('https://api.github.com/users/YuukiSnowRG');
      const data = await response.json();
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }
    handleAsyncUseEffect()
  },[
    /* dependencias, quais são os estados que o useEffect depende 
    se colocarmos aqui um estado, toda vez que um estado for
    atualizado o useEffect vai ser executado tambem*/
  ]);
 /*o useEffect é executado assim que a nossa interface é renderizada  */

  return (
    <div className='container'>
      <header>
        <h1> Lista de Presença </h1>
          <div>
            <strong>{user.name}</strong>
            <img src={user.avatar} alt="foto de perfil" srcset="" />
          </div>
        
      </header>
      
      <input 
      type="text" 
      placeholder='Digite nome...'
      onChange={e => setStudentName(e.target.value)} /> 
      {/* toda vez q há uma mudança ele retorna um e(evento) 
      e entao ele retorna o valor atual que ta dentro do input quando ele muda
      e entao esse valor é passado pro handleNameChange/setStudentName*/}
      <input 
      type="button" 
      value="Adicionar"
      onClick={handleAddStudent} />
      {
        students.map(student => <Card 
        key={student.time}
        name={student.name} 
        time={student.time} 
        age={student.age} />) 
        /* usa o map para percorrer cada um dos valores dentro da array students
        cada estudante vai ser armazenado em student em cada volta da nossa estrutura de repetição
        ou seja em cada aplicação do map
        
        colocamos nosso componente card para rodar nele e mudamos as propriedades para acessar propriedades
        que serão inputadas pelo cliente/usuario/estudante*/
        
      }
    </div>
  )
}

export default Home

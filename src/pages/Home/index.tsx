import { useState, useEffect } from 'react'
import './styles.css'
import { Card, CardProps } from '../../components/card'

type ProfileResponse = {
  name: string;
  avatar_url : string;
}
type User = {
  name: string;
  avatar: string;
}
/*Tipando a resposta do github */
function Home() {
  const [studentName, setStudentName ] = useState('insira nome aqui')
 /* studentName é onde eu vou guardar o conteudo do estado
 e depois a função que atualiza esse estado 
 aqui é usado para guardar o input no input text*/
  const [students, setStudents] = useState<CardProps[]>([]) 
  /* students é o estado atual setstudents a função
  que atualiza o estado  
  o students é a lista atual com todos os newStudent adicionados
  aqui o students é feito para chamarmos o map nele na parte html abaixo*/

  function handleAddStudent(){
    /* o handleAddStudent é activado quando o input button é apertado
    ele cria um student do template newStudent e adiciona a lista de arrays com a função setStudents */
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
    da const newStudent
    ele vai criar um novo estado, mais o estado anterior
    o... ou spread operator e para assegurar que todos os vetores continuem irmãos no 
    mesmo nivel do vetor  */
  }
  /* toda vez que chamarmos essa função ele vai criar um novo objeto 
  que vai ter 2 propriedades, o name que vamos pegar do estado
  StudentName que ta armazenando o conteúdo atual do input
  e time que vamos pegar do horario atual
  
  e depois que o objeto é montado nos adicionamos ao estado com setStudents*/
  const [user, setUser] = useState<User>({} as User)
    /* aqui tipamos que o user é do tipo User
    que começa com um objeto vazio com template User */

  useEffect(()=>{
    /* corpo do useEffect, ações que queremos que execute */
    
    /*      Versao fetch sincrona
     fetch('https://api.github.com/users/YuukiSnowRG')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }) */ 
          /* Versão asincrona */
    async function handleAsyncUseEffect(){
      const response = await fetch('https://api.github.com/users/YuukiSnowRG');
      const data = await response.json() as ProfileResponse;
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
            <img src={user.avatar} alt="foto de perfil" srcSet="" />
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
        time={student.time} />) 
        /* usa o map para percorrer cada um dos valores dentro da array students
        cada estudante vai ser armazenado em student em cada volta da nossa estrutura de repetição
        ou seja em cada aplicação do map
        
        ou seja cada vez que adicionarmos um estudante ele vai ser adicionado a lista students
        e  cada student vira um card com key name e time

        colocamos nosso componente card para rodar nele e mudamos as propriedades para acessar propriedades
        que serão inputadas pelo cliente/usuario/estudante*/
        
      }
    </div>
  )
}

export default Home

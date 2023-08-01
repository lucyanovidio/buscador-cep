import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';

import api from './services/api';

function App() {
  const [input, setInput] = useState("");
  // desestruturando o array useState(""). Criando a váriavel input e a função setInput que vai atualizar o conteúdo de input toda vez que chamarmos. A princípio, é só uma variável qualquer, sem referencia. Ela passa a ser algum componente quando referenciamos lá no input dizendo que onChange={e => setInput(e.target.value)}. Daí, passa a ser como se ele tivesse pegando o document.querySelector("input"). A ideia é pra pegar o input.value, o "estado" atual do componente input. E eu setei inicialmente ele como "" pra declarar, poderia ser qqr coisa, como "TESTE 123", mas isso apareceria lá no input (pq eu disse q value={input} lá na tag input). É uma forma de capturar o que tem lá, o "estado" como falamos aqui no react.
  const [cep, setCep] = useState({}); 
  // aqui agt cria um estado para o cep tbm, mas para colocar o que a api retornar, e por isso agt seta inicialmente como um objeto vazio, pq ela retorna um obj. Vai passar a ser o que recebemos da api quando eu digo setCep(response.data);

  // função assíncrona pq vamos fazer uma req http aqui dentro, e isso pode demorar um cadinho
  async function handleSearch(e) {
    e.preventDefault(); // adicionei um form pra fazer a função do enter pra ir. Mas como eu poderia pegar um elemento e fazer de outra forma, passando evento de keydown? teria q fazer um outro useState ou tem outra forma de pegar o elemento? faz igual no vanilla, com querySelector?

    if (input === "") {
      alert("Preencha algum CEP");
      return;
    }

    try {
      // o que é await é o que eu quero que ele espere, que é justamente a req
      const response = await api.get(`${input}/json`) // REPARE QUE ELE JÁ PASSA A baseURL, daí agt só passa os parâmetros, o cep q a pessoa digitar e o json (formato de retorno)
      console.log(response);
      setCep(response.data);
      setInput(""); // input.value = "";
    } catch (error) {
      alert("ops erro ao buscar");
      console.log("Deu erro, bro: " + error)
      setInput(""); // input.value = "";
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <form>
          <input 
            type="text" 
            placeholder="Digite seu CEP" 
            value={input}
            onChange={e => setInput(e.target.value)} // atribuindo ao input o que a pessoa digitar a cada mudança
          />
          <button className="buttonSearch" onClick={handleSearch}>
            {/* repare que não colocamos () */}
            <FiSearch size={25} color="#fff" />
          </button>
        </form>
      </div>

      {/* SE cep retornar algo (ter length maior que 0) ele vai mostrar o main. É a associação de and que estamos fazendo. Dava pra fazer um ternário tbm, como fiz no complemento.  Quero dizer aqui que só vai mostrar o main depois do usuário ter pesquisado algo */}
      {/* Usamos Object.keys porque para um array só usariamos o length direto (caso cep fosse um array, seria cep.length), mas como cep é um objeto, usamos o Object.keys ("propriedades do objeto") para retornar em um array as propriedades de cep listadas, e só então usamos o length */}

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>Rua: {cep.logradouro}</span>

          {Object.keys(cep.complemento) !== "" ? (<span>Complemento: {cep.complemento}</span>) : ""}

          <span>Bairro: {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}


    </div>
  );
}

export default App;
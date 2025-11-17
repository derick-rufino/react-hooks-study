# 🎣 Guia Completo de React Hooks

> Um guia prático e acessível para estudantes que querem dominar React Hooks

---

## 📚 Índice

1. [O que são React Hooks?](#o-que-são-react-hooks)
2. [Regras dos Hooks](#regras-dos-hooks)
3. [Hooks Básicos](#hooks-básicos)
   - [useState](#1-usestate)
   - [useEffect](#2-useeffect)
   - [useContext](#3-usecontext)
4. [Hooks Adicionais](#hooks-adicionais)
   - [useReducer](#4-usereducer)
   - [useCallback](#5-usecallback)
   - [useMemo](#6-usememo)
   - [useRef](#7-useref)
5. [Hooks Avançados](#hooks-avançados)
   - [useLayoutEffect](#8-uselayouteffect)
   - [useImperativeHandle](#9-useimperativehandle)
6. [Custom Hooks](#custom-hooks)
7. [Boas Práticas](#boas-práticas)
8. [Recursos Adicionais](#recursos-adicionais)

---

## O que são React Hooks?

**React Hooks** são funções especiais que permitem você "enganchar" (hook into) funcionalidades do React em componentes funcionais. Antes dos Hooks (introduzidos no React 16.8), você precisava usar componentes de classe para ter acesso a estado e métodos de ciclo de vida.

### Por que usar Hooks?

✅ **Código mais simples**: Componentes funcionais são mais fáceis de ler e escrever  
✅ **Reutilização de lógica**: Você pode criar hooks personalizados para compartilhar lógica entre componentes  
✅ **Menos confusão**: Não precisa lidar com `this` ou entender binding de métodos  
✅ **Melhor organização**: Agrupa lógica relacionada ao invés de espalhá-la pelos métodos de ciclo de vida

---

## Regras dos Hooks

⚠️ **IMPORTANTE**: Você deve seguir estas regras ao usar hooks:

1. **Chame Hooks apenas no nível superior**

   - ❌ Não chame dentro de loops, condições ou funções aninhadas
   - ✅ Chame no topo do seu componente funcional

2. **Chame Hooks apenas em funções React**
   - ✅ Em componentes funcionais
   - ✅ Em custom hooks personalizados
   - ❌ Em funções JavaScript comuns

```javascript
// ❌ ERRADO
function MeuComponente() {
  if (algumCondicao) {
    const [count, setCount] = useState(0); // Não faça isso!
  }
}

// ✅ CORRETO
function MeuComponente() {
  const [count, setCount] = useState(0); // Sempre no topo!

  if (algumCondicao) {
    // Faça algo com o estado aqui
  }
}
```

---

## Hooks Básicos

### 1. useState

**O que faz?** Adiciona estado (memória) ao seu componente funcional.

**Quando usar?** Quando você precisa que o componente "lembre" de alguma informação entre renderizações (como um contador, texto de input, se um modal está aberto, etc).

**Como funciona?**

- Recebe um valor inicial
- Retorna um array com 2 itens: [valorAtual, funçãoParaAtualizá-lo]
- Quando você chama a função de atualização, o React re-renderiza o componente com o novo valor

```javascript
import { useState } from "react";

function Contador() {
  // Declaração: [nomeDoEstado, funçãoSetNomeDoEstado] = useState(valorInicial)
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Você clicou {count} vezes</p>
      <button onClick={() => setCount(count + 1)}>Clique aqui</button>
    </div>
  );
}
```

**Exemplo prático - Formulário:**

```javascript
function FormularioLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrarMe, setLembrarMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, senha, lembrarMe });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Senha"
      />
      <label>
        <input
          type="checkbox"
          checked={lembrarMe}
          onChange={(e) => setLembrarMe(e.target.checked)}
        />
        Lembrar de mim
      </label>
      <button type="submit">Entrar</button>
    </form>
  );
}
```

**💡 Dica importante:** Quando o novo estado depende do anterior, use a forma de função:

```javascript
// ✅ BOM - Usa a forma de função
setCount((prevCount) => prevCount + 1);

// ⚠️ Pode causar bugs em atualizações rápidas
setCount(count + 1);
```

---

### 2. useEffect

**O que faz?** Permite você executar "efeitos colaterais" (side effects) em componentes funcionais. Pense nele como uma combinação de `componentDidMount`, `componentDidUpdate` e `componentWillUnmount` das classes.

**Quando usar?**

- Buscar dados de uma API
- Inscrever-se em eventos (WebSocket, scroll, resize)
- Manipular o DOM diretamente
- Configurar timers (setTimeout, setInterval)
- Sincronizar com sistemas externos

**Como funciona?**

- Roda após a renderização do componente
- Pode retornar uma função de "limpeza" (cleanup)
- Aceita um array de dependências que controla quando ele deve rodar novamente

```javascript
import { useState, useEffect } from "react";

function ExemploBasico() {
  const [count, setCount] = useState(0);

  // Roda após TODA renderização
  useEffect(() => {
    document.title = `Você clicou ${count} vezes`;
  });

  return <button onClick={() => setCount(count + 1)}>Clique aqui</button>;
}
```

**Array de Dependências - Muito Importante! 🎯**

```javascript
// Roda após TODA renderização
useEffect(() => {
  console.log("Rodou!");
});

// Roda apenas UMA VEZ (quando o componente monta)
useEffect(() => {
  console.log("Montou!");
}, []); // Array vazio = sem dependências

// Roda quando 'count' mudar
useEffect(() => {
  console.log("Count mudou:", count);
}, [count]); // Roda quando count muda

// Roda quando 'count' OU 'name' mudarem
useEffect(() => {
  console.log("Count ou name mudou");
}, [count, name]);
```

**Exemplo prático - Buscar dados de API:**

```javascript
function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Função assíncrona dentro do useEffect
    async function buscarUsuarios() {
      try {
        setCarregando(true);
        const resposta = await fetch("https://api.exemplo.com/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch (erro) {
        setErro(erro.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarUsuarios();
  }, []); // Array vazio = busca apenas uma vez

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <ul>
      {usuarios.map((usuario) => (
        <li key={usuario.id}>{usuario.nome}</li>
      ))}
    </ul>
  );
}
```

**Função de Limpeza (Cleanup):**

```javascript
function Cronometro() {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    // Configurar o intervalo
    const intervalo = setInterval(() => {
      setSegundos((prev) => prev + 1);
    }, 1000);

    // Função de limpeza - roda quando o componente desmonta
    // ou antes de rodar o effect novamente
    return () => {
      clearInterval(intervalo);
      console.log("Limpou o intervalo!");
    };
  }, []); // Roda apenas uma vez

  return <p>Segundos: {segundos}</p>;
}
```

**Outro exemplo - Event Listener:**

```javascript
function TamanhoJanela() {
  const [largura, setLargura] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setLargura(window.innerWidth);
    };

    // Adicionar listener
    window.addEventListener("resize", handleResize);

    // Remover listener quando desmontar (cleanup)
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <p>Largura da janela: {largura}px</p>;
}
```

---

### 3. useContext

**O que faz?** Permite você compartilhar dados entre componentes sem precisar passar props manualmente por cada nível da árvore (evita "prop drilling").

**Quando usar?**

- Tema da aplicação (dark/light mode)
- Informações do usuário logado
- Idioma/localização
- Configurações globais

**Como funciona?**

1. Cria um Context com `createContext()`
2. Envolve os componentes com um Provider
3. Usa `useContext()` para acessar o valor em qualquer componente filho

**Exemplo prático - Tema:**

```javascript
import { createContext, useContext, useState } from "react";

// 1. Criar o Context
const TemaContext = createContext();

// 2. Criar um Provider component
function TemaProvider({ children }) {
  const [tema, setTema] = useState("claro");

  const alternarTema = () => {
    setTema(tema === "claro" ? "escuro" : "claro");
  };

  const valor = {
    tema,
    alternarTema,
  };

  return <TemaContext.Provider value={valor}>{children}</TemaContext.Provider>;
}

// 3. Criar um hook personalizado para facilitar o uso
function useTema() {
  const contexto = useContext(TemaContext);
  if (!contexto) {
    throw new Error("useTema deve ser usado dentro de TemaProvider");
  }
  return contexto;
}

// 4. Usar nos componentes
function Botao() {
  const { tema, alternarTema } = useTema();

  return (
    <button
      onClick={alternarTema}
      style={{
        background: tema === "claro" ? "#fff" : "#333",
        color: tema === "claro" ? "#333" : "#fff",
      }}
    >
      Tema: {tema}
    </button>
  );
}

function App() {
  return (
    <TemaProvider>
      <div>
        <h1>Minha Aplicação</h1>
        <Botao />
      </div>
    </TemaProvider>
  );
}
```

**Exemplo mais completo - Autenticação:**

```javascript
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const login = async (email, senha) => {
    setCarregando(true);
    try {
      const resposta = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      const dados = await resposta.json();
      setUsuario(dados.usuario);
    } catch (erro) {
      console.error("Erro no login:", erro);
    } finally {
      setCarregando(false);
    }
  };

  const logout = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

// Usar no componente
function PerfilUsuario() {
  const { usuario, logout } = useAuth();

  if (!usuario) {
    return <p>Você não está logado</p>;
  }

  return (
    <div>
      <h2>Olá, {usuario.nome}!</h2>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

---

## Hooks Adicionais

### 4. useReducer

**O que faz?** Uma alternativa ao `useState` para gerenciar estados mais complexos. Funciona como o Redux em miniatura.

**Quando usar?**

- Estado tem lógica complexa com múltiplas sub-valores
- O próximo estado depende do anterior
- Você tem múltiplas ações que modificam o estado
- Quer centralizar a lógica de atualização do estado

**Como funciona?**

- Define um reducer (função que recebe estado e ação, retorna novo estado)
- Usa `dispatch` para enviar ações que modificam o estado
- Similar ao padrão Redux

```javascript
import { useReducer } from "react";

// 1. Definir o reducer
function contadorReducer(estado, acao) {
  switch (acao.type) {
    case "INCREMENTAR":
      return { count: estado.count + 1 };
    case "DECREMENTAR":
      return { count: estado.count - 1 };
    case "RESETAR":
      return { count: 0 };
    case "SOMAR":
      return { count: estado.count + acao.valor };
    default:
      throw new Error(`Ação desconhecida: ${acao.type}`);
  }
}

function Contador() {
  // 2. Usar o reducer
  const [estado, dispatch] = useReducer(contadorReducer, { count: 0 });

  return (
    <div>
      <p>Contador: {estado.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENTAR" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENTAR" })}>-1</button>
      <button onClick={() => dispatch({ type: "SOMAR", valor: 10 })}>
        +10
      </button>
      <button onClick={() => dispatch({ type: "RESETAR" })}>Resetar</button>
    </div>
  );
}
```

**Exemplo mais complexo - Lista de Tarefas:**

```javascript
function tarefasReducer(estado, acao) {
  switch (acao.type) {
    case "ADICIONAR":
      return [
        ...estado,
        {
          id: Date.now(),
          texto: acao.texto,
          concluida: false,
        },
      ];
    case "ALTERNAR":
      return estado.map((tarefa) =>
        tarefa.id === acao.id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      );
    case "REMOVER":
      return estado.filter((tarefa) => tarefa.id !== acao.id);
    case "EDITAR":
      return estado.map((tarefa) =>
        tarefa.id === acao.id ? { ...tarefa, texto: acao.texto } : tarefa
      );
    default:
      return estado;
  }
}

function ListaTarefas() {
  const [tarefas, dispatch] = useReducer(tarefasReducer, []);
  const [input, setInput] = useState("");

  const adicionarTarefa = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch({ type: "ADICIONAR", texto: input });
      setInput("");
    }
  };

  return (
    <div>
      <form onSubmit={adicionarTarefa}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nova tarefa..."
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <input
              type="checkbox"
              checked={tarefa.concluida}
              onChange={() => dispatch({ type: "ALTERNAR", id: tarefa.id })}
            />
            <span
              style={{
                textDecoration: tarefa.concluida ? "line-through" : "none",
              }}
            >
              {tarefa.texto}
            </span>
            <button
              onClick={() => dispatch({ type: "REMOVER", id: tarefa.id })}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**useState vs useReducer - Quando usar cada um?**

| useState                                 | useReducer                        |
| ---------------------------------------- | --------------------------------- |
| Estado simples (número, string, boolean) | Estado complexo (objetos, arrays) |
| Poucas atualizações                      | Muitos tipos de ações             |
| Lógica simples                           | Lógica complexa                   |
| Estado independente                      | Estados inter-relacionados        |

---

### 5. useCallback

**O que faz?** Memoriza (guarda na memória) uma função para que ela não seja recriada a cada renderização.

**Quando usar?**

- Passar funções como props para componentes filhos otimizados (que usam `React.memo`)
- Quando a função é uma dependência de outro hook (useEffect, useMemo)
- Performance em listas grandes

**⚠️ Importante:** Não use `useCallback` em todo lugar! Use apenas quando necessário para otimização.

```javascript
import { useState, useCallback } from "react";

function Pai() {
  const [count, setCount] = useState(0);
  const [outraCoisa, setOutraCoisa] = useState(0);

  // ❌ SEM useCallback - função é recriada toda renderização
  const handleClick = () => {
    console.log("Clicou!");
  };

  // ✅ COM useCallback - função só é recriada se count mudar
  const handleClickMemoizado = useCallback(() => {
    console.log("Clicou! Count:", count);
  }, [count]); // Só recria se count mudar

  return (
    <div>
      <p>Count: {count}</p>
      <ComponenteFilho onClick={handleClickMemoizado} />
      <button onClick={() => setOutraCoisa(outraCoisa + 1)}>
        Mudar outra coisa (não recria handleClickMemoizado)
      </button>
    </div>
  );
}

// Componente otimizado que só re-renderiza se as props mudarem
const ComponenteFilho = React.memo(({ onClick }) => {
  console.log("ComponenteFilho renderizou");
  return <button onClick={onClick}>Clique aqui</button>;
});
```

**Exemplo prático - Lista otimizada:**

```javascript
function ListaProdutos() {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: "Notebook" },
    { id: 2, nome: "Mouse" },
    { id: 3, nome: "Teclado" },
  ]);

  // Memoriza a função de remover
  const removerProduto = useCallback((id) => {
    setProdutos((prev) => prev.filter((p) => p.id !== id));
  }, []); // Array vazio pois usa a forma funcional de setProdutos

  return (
    <ul>
      {produtos.map((produto) => (
        <ItemProduto
          key={produto.id}
          produto={produto}
          onRemover={removerProduto}
        />
      ))}
    </ul>
  );
}

const ItemProduto = React.memo(({ produto, onRemover }) => {
  console.log("Renderizou:", produto.nome);
  return (
    <li>
      {produto.nome}
      <button onClick={() => onRemover(produto.id)}>Remover</button>
    </li>
  );
});
```

---

### 6. useMemo

**O que faz?** Memoriza o **resultado** de um cálculo custoso para evitar recalculá-lo em toda renderização.

**Quando usar?**

- Cálculos pesados (ordenação, filtragem de arrays grandes)
- Criação de objetos/arrays que seriam recriados a cada render
- Otimizar performance quando necessário

**⚠️ Importante:** Como `useCallback`, não use `useMemo` prematuramente! Só use quando tiver problemas de performance reais.

```javascript
import { useState, useMemo } from "react";

function ListaNumeros() {
  const [numeros, setNumeros] = useState([1, 2, 3, 4, 5]);
  const [multiplicador, setMultiplicador] = useState(1);
  const [outroEstado, setOutroEstado] = useState(0);

  // ❌ SEM useMemo - calcula toda renderização
  const soma = numeros.reduce((acc, n) => acc + n, 0);

  // ✅ COM useMemo - só recalcula quando numeros mudar
  const somaMemorizada = useMemo(() => {
    console.log("Calculando soma...");
    return numeros.reduce((acc, n) => acc + n, 0);
  }, [numeros]); // Só recalcula se numeros mudar

  return (
    <div>
      <p>Soma: {somaMemorizada}</p>
      <button onClick={() => setOutroEstado(outroEstado + 1)}>
        Mudar outro estado (não recalcula soma)
      </button>
    </div>
  );
}
```

**Exemplo prático - Filtrar lista grande:**

```javascript
function ListaUsuarios({ usuarios }) {
  const [termoBusca, setTermoBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState("nome");

  // Memoriza a lista filtrada e ordenada
  const usuariosFiltrados = useMemo(() => {
    console.log("Filtrando e ordenando...");

    let resultado = usuarios.filter((usuario) =>
      usuario.nome.toLowerCase().includes(termoBusca.toLowerCase())
    );

    resultado.sort((a, b) => {
      if (ordenacao === "nome") {
        return a.nome.localeCompare(b.nome);
      } else if (ordenacao === "idade") {
        return a.idade - b.idade;
      }
      return 0;
    });

    return resultado;
  }, [usuarios, termoBusca, ordenacao]); // Recalcula apenas quando essas deps mudarem

  return (
    <div>
      <input
        type="text"
        value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)}
        placeholder="Buscar usuário..."
      />
      <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
        <option value="nome">Ordenar por nome</option>
        <option value="idade">Ordenar por idade</option>
      </select>

      <ul>
        {usuariosFiltrados.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nome} - {usuario.idade} anos
          </li>
        ))}
      </ul>
      <p>Total: {usuariosFiltrados.length} usuários</p>
    </div>
  );
}
```

**useCallback vs useMemo:**

```javascript
// useCallback memoriza a FUNÇÃO
const minhaFuncao = useCallback(() => {
  return a + b;
}, [a, b]);

// useMemo memoriza o RESULTADO da função
const resultado = useMemo(() => {
  return a + b;
}, [a, b]);

// Na verdade, useCallback é um atalho para useMemo de função:
useCallback(fn, deps) === useMemo(() => fn, deps);
```

---

### 7. useRef

**O que faz?** Cria uma referência mutável que persiste durante todo o ciclo de vida do componente, sem causar re-renderização quando muda.

**Quando usar?**

- Acessar elementos DOM diretamente
- Armazenar valores que precisam persistir mas não devem causar re-render
- Guardar valores de intervalos/timeouts
- Armazenar valores anteriores

**Como funciona?**

- Retorna um objeto com propriedade `.current`
- Alterar `.current` NÃO causa re-renderização
- Mantém o mesmo objeto entre renderizações

```javascript
import { useRef, useEffect } from "react";

function InputComFoco() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focar o input quando o componente montar
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" placeholder="Já estou focado!" />;
}
```

**Exemplo - Acessar propriedades DOM:**

```javascript
function VideoPlayer() {
  const videoRef = useRef(null);

  const play = () => {
    videoRef.current.play();
  };

  const pause = () => {
    videoRef.current.pause();
  };

  const reiniciar = () => {
    videoRef.current.currentTime = 0;
  };

  return (
    <div>
      <video ref={videoRef} src="video.mp4" />
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reiniciar}>Reiniciar</button>
    </div>
  );
}
```

**Exemplo - Guardar valor anterior:**

```javascript
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function Contador() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div>
      <p>Atual: {count}</p>
      <p>Anterior: {previousCount}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  );
}
```

**Exemplo - Timer sem causar re-render:**

```javascript
function Cronometro() {
  const [segundos, setSegundos] = useState(0);
  const [rodando, setRodando] = useState(false);
  const intervalRef = useRef(null);

  const iniciar = () => {
    setRodando(true);
    intervalRef.current = setInterval(() => {
      setSegundos((s) => s + 1);
    }, 1000);
  };

  const parar = () => {
    setRodando(false);
    clearInterval(intervalRef.current);
  };

  const resetar = () => {
    parar();
    setSegundos(0);
  };

  useEffect(() => {
    // Limpar intervalo quando desmontar
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h1>Tempo: {segundos}s</h1>
      {!rodando ? (
        <button onClick={iniciar}>Iniciar</button>
      ) : (
        <button onClick={parar}>Parar</button>
      )}
      <button onClick={resetar}>Resetar</button>
    </div>
  );
}
```

**useState vs useRef:**

| useState                          | useRef                            |
| --------------------------------- | --------------------------------- |
| Causa re-renderização quando muda | NÃO causa re-renderização         |
| Para dados que afetam a UI        | Para valores "ocultos" do usuário |
| Valores aparecem na tela          | Valores usados internamente       |
| Ex: contador visível              | Ex: ID de timeout                 |

---

## Hooks Avançados

### 8. useLayoutEffect

**O que faz?** Idêntico ao `useEffect`, mas roda **sincronamente** após mudanças no DOM, antes do navegador pintar a tela.

**Quando usar?**

- Medir elementos DOM
- Fazer mudanças visuais antes da tela ser pintada
- Evitar "flickering" (piscar)

**⚠️ Cuidado:** Bloqueia atualizações visuais. Use `useEffect` na maioria dos casos.

```javascript
import { useLayoutEffect, useRef, useState } from "react";

function Tooltip({ children }) {
  const targetRef = useRef();
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    // Mede a altura ANTES de pintar
    const { height } = targetRef.current.getBoundingClientRect();
    setTooltipHeight(height);
  }, []);

  return (
    <div ref={targetRef}>
      {children}
      {/* Posiciona tooltip com base na medida */}
      <div style={{ top: tooltipHeight + 10 }}>Tooltip aqui</div>
    </div>
  );
}
```

**useEffect vs useLayoutEffect:**

```
Renderizar → useLayoutEffect → Pintar tela → useEffect

Use useEffect: 99% dos casos
Use useLayoutEffect: quando precisa medir/modificar DOM antes de mostrar
```

---

### 9. useImperativeHandle

**O que faz?** Personaliza o valor exposto ao componente pai quando usa `ref`.

**Quando usar?**

- Criar APIs customizadas para componentes
- Expor métodos específicos ao invés de todo o elemento DOM
- Bibliotecas de componentes

```javascript
import { forwardRef, useImperativeHandle, useRef } from "react";

const InputCustomizado = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    // Expor apenas métodos específicos
    focar: () => {
      inputRef.current.focus();
    },
    limpar: () => {
      inputRef.current.value = "";
    },
    obterValor: () => {
      return inputRef.current.value;
    },
  }));

  return <input ref={inputRef} {...props} />;
});

function Formulario() {
  const inputRef = useRef();

  const handleSubmit = () => {
    const valor = inputRef.current.obterValor();
    console.log("Valor:", valor);
    inputRef.current.limpar();
  };

  return (
    <div>
      <InputCustomizado ref={inputRef} placeholder="Digite algo" />
      <button onClick={handleSubmit}>Enviar</button>
      <button onClick={() => inputRef.current.focar()}>Focar Input</button>
    </div>
  );
}
```

---

## Custom Hooks

**O que são?** Hooks personalizados que você mesmo cria para reutilizar lógica entre componentes.

**Regra importante:** O nome DEVE começar com "use" (ex: `useAlgumaCoisa`)

**Exemplo 1 - useLocalStorage:**

```javascript
import { useState, useEffect } from "react";

function useLocalStorage(chave, valorInicial) {
  // Buscar valor inicial do localStorage
  const [valor, setValor] = useState(() => {
    try {
      const item = window.localStorage.getItem(chave);
      return item ? JSON.parse(item) : valorInicial;
    } catch (erro) {
      console.error(erro);
      return valorInicial;
    }
  });

  // Salvar no localStorage quando o valor mudar
  useEffect(() => {
    try {
      window.localStorage.setItem(chave, JSON.stringify(valor));
    } catch (erro) {
      console.error(erro);
    }
  }, [chave, valor]);

  return [valor, setValor];
}

// Usar o hook
function App() {
  const [nome, setNome] = useLocalStorage("nome", "");
  const [idade, setIdade] = useLocalStorage("idade", 0);

  return (
    <div>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Seu nome"
      />
      <input
        type="number"
        value={idade}
        onChange={(e) => setIdade(Number(e.target.value))}
        placeholder="Sua idade"
      />
      <p>Os dados são salvos automaticamente!</p>
    </div>
  );
}
```

**Exemplo 2 - useFetch:**

```javascript
function useFetch(url) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarDados() {
      try {
        setCarregando(true);
        const resposta = await fetch(url);
        if (!resposta.ok) {
          throw new Error("Erro na requisição");
        }
        const json = await resposta.json();
        setDados(json);
        setErro(null);
      } catch (erro) {
        setErro(erro.message);
        setDados(null);
      } finally {
        setCarregando(false);
      }
    }

    buscarDados();
  }, [url]);

  return { dados, carregando, erro };
}

// Usar o hook
function ListaUsuarios() {
  const {
    dados: usuarios,
    carregando,
    erro,
  } = useFetch("https://api.exemplo.com/usuarios");

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <ul>
      {usuarios.map((usuario) => (
        <li key={usuario.id}>{usuario.nome}</li>
      ))}
    </ul>
  );
}
```

**Exemplo 3 - useDebounce:**

```javascript
function useDebounce(valor, delay) {
  const [valorDebounced, setValorDebounced] = useState(valor);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValorDebounced(valor);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [valor, delay]);

  return valorDebounced;
}

// Usar o hook - busca só depois que usuário parar de digitar
function BuscaUsuario() {
  const [termoBusca, setTermoBusca] = useState("");
  const termoDebounced = useDebounce(termoBusca, 500); // 500ms de delay

  useEffect(() => {
    if (termoDebounced) {
      // Faz a busca apenas quando o usuário parar de digitar
      console.log("Buscando:", termoDebounced);
      // fetch(`/api/buscar?q=${termoDebounced}`)
    }
  }, [termoDebounced]);

  return (
    <input
      value={termoBusca}
      onChange={(e) => setTermoBusca(e.target.value)}
      placeholder="Buscar usuário..."
    />
  );
}
```

**Exemplo 4 - useWindowSize:**

```javascript
function useWindowSize() {
  const [tamanho, setTamanho] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setTamanho({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return tamanho;
}

// Usar
function ResponsiveComponent() {
  const { width } = useWindowSize();

  return (
    <div>
      <p>Largura: {width}px</p>
      {width < 768 ? <MobileMenu /> : <DesktopMenu />}
    </div>
  );
}
```

---

## Boas Práticas

### ✅ DO (Faça)

1. **Sempre use hooks no topo do componente**

```javascript
function MeuComponente() {
  const [state, setState] = useState(0); // ✅ Topo
  const ref = useRef(); // ✅ Topo

  // ... resto do código
}
```

2. **Nomeie custom hooks começando com "use"**

```javascript
function useDados() {
  // ✅ Bom
  // ...
}
```

3. **Inclua todas as dependências no array de dependências**

```javascript
useEffect(() => {
  console.log(count, name);
}, [count, name]); // ✅ Incluiu todas
```

4. **Use a forma funcional quando o novo estado depende do anterior**

```javascript
setCount((prevCount) => prevCount + 1); // ✅ Bom
```

5. **Crie custom hooks para reutilizar lógica**

```javascript
function useAuth() {
  // ✅ Reutilizável
  // lógica de autenticação
  return { user, login, logout };
}
```

### ❌ DON'T (Não faça)

1. **Não chame hooks dentro de condições**

```javascript
// ❌ Errado
if (condicao) {
  const [state, setState] = useState(0);
}
```

2. **Não chame hooks em loops**

```javascript
// ❌ Errado
for (let i = 0; i < 10; i++) {
  useEffect(() => {});
}
```

3. **Não omita dependências do array**

```javascript
// ❌ Errado - usa count mas não declara
useEffect(() => {
  console.log(count);
}, []); // Falta count!
```

4. **Não use useCallback/useMemo prematuramente**

```javascript
// ❌ Desnecessário para cálculos simples
const soma = useMemo(() => a + b, [a, b]);
```

5. **Não chame hooks em funções regulares**

```javascript
// ❌ Errado
function calcular() {
  const [value, setValue] = useState(0); // Hooks só em componentes!
}
```

### 🎯 Dicas de Performance

1. **Mova estado para baixo** - Mantenha estado o mais próximo possível de onde é usado
2. **Componentes pesados? Use React.memo** - Evite re-renders desnecessários
3. **Listas grandes? Use useCallback nas funções passadas como props**
4. **Cálculos pesados? Use useMemo**
5. **Evite criar objetos/arrays novos em cada render**

```javascript
// ❌ Cria novo objeto toda renderização
function Componente() {
  const config = { tema: "dark", idioma: "pt" };
  return <OutroComponente config={config} />;
}

// ✅ Memoriza o objeto
function Componente() {
  const config = useMemo(
    () => ({
      tema: "dark",
      idioma: "pt",
    }),
    []
  );
  return <OutroComponente config={config} />;
}

// ✅ Ou melhor ainda, mova para fora do componente
const CONFIG = { tema: "dark", idioma: "pt" };
function Componente() {
  return <OutroComponente config={CONFIG} />;
}
```

---

## Recursos Adicionais

### 📖 Documentação Oficial

- [React Hooks - Documentação Oficial](https://react.dev/reference/react)
- [Hooks API Reference](https://react.dev/reference/react/hooks)
- [Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning)

### 🎥 Tutoriais Recomendados

- [All React Hooks Explained 2025](https://www.youtube.com/watch?v=xfKYYRE6-TQ) - PedroTech
- [React Hooks Course](https://www.youtube.com/watch?v=LlvBzyy-558) - freeCodeCamp

### 📝 Artigos Importantes

- [Understanding useMemo and useCallback](https://www.joshwcomeau.com/react/usememo-and-usecallback/)
- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
- [When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)

### 🛠️ Ferramentas Úteis

- [ESLint Plugin React Hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) - Detecta erros nos hooks
- [React DevTools](https://react.dev/learn/react-developer-tools) - Debug de hooks

### 💡 Bibliotecas de Custom Hooks

- [usehooks.com](https://usehooks.com/) - Coleção de custom hooks
- [react-use](https://github.com/streamich/react-use) - Biblioteca com 100+ hooks
- [ahooks](https://ahooks.js.org/) - Hooks para React

---

## 🎓 Checklist de Estudos

Use este checklist para acompanhar seu progresso:

- [ ] Entendi o conceito básico de Hooks
- [ ] Sei usar `useState` para gerenciar estado
- [ ] Sei usar `useEffect` para efeitos colaterais
- [ ] Entendo o array de dependências do useEffect
- [ ] Sei criar funções de cleanup no useEffect
- [ ] Sei usar `useContext` para compartilhar dados
- [ ] Entendo quando usar `useReducer` ao invés de `useState`
- [ ] Sei a diferença entre `useMemo` e `useCallback`
- [ ] Sei usar `useRef` para referências DOM e valores persistentes
- [ ] Criei meu primeiro custom hook
- [ ] Entendo as regras dos hooks
- [ ] Sei otimizar componentes com React.memo e hooks de performance

---

## 🤝 Contribuindo

Este é um guia de estudos pessoal, mas sugestões são bem-vindas! Se encontrar erros ou quiser adicionar exemplos, sinta-se à vontade para contribuir.

---

## 📄 Licença

Este guia é de uso livre para estudos. Compartilhe e aprenda! 🚀

---

**Feito com ❤️ para estudantes de React**

_Última atualização: Novembro 2025_

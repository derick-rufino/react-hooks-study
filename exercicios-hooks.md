# 🎯 Exercícios Práticos de React Hooks

> Desafios progressivos para dominar React Hooks através da prática

---

## 📖 Como usar este guia

- **Progressão**: Os exercícios vão do mais simples ao mais complexo
- **Aprenda fazendo**: Não há código completo aqui; você deve implementar as soluções
- **Dicas úteis**: Cada exercício tem orientações e sugestões, não soluções prontas
- **Boas práticas**: Siga as recomendações da documentação oficial do React
- **Pesquise**: Use a [documentação oficial](https://react.dev) quando tiver dúvidas

**Dica geral**: Comece criando componentes na pasta `src/components/` e importe-os no `App.jsx` para testar.

---

## 🟢 Nível Iniciante

### Exercício 1: Contador Simples (useState)

**Objetivo**: Criar um componente de contador que permite incrementar, decrementar e resetar um valor.

**Requisitos**:

- Crie um componente `Contador.jsx`
- Use `useState` para armazenar o valor do contador (comece em 0)
- Adicione três botões: "Incrementar", "Decrementar" e "Resetar"
- Mostre o valor atual na tela

**Desafios extras**:

- Adicione um botão para incrementar em +5 ou +10
- Não permita valores negativos (o decrementar deve parar em 0)
- Adicione um input para o usuário definir quanto quer incrementar/decrementar

**Dicas**:

- Lembre-se da sintaxe: `const [valor, setValor] = useState(0)`
- Use funções como `onClick={() => setValor(valor + 1)}`
- Para evitar valores negativos, use uma condicional antes de atualizar

**O que você aprende**: Conceito básico de estado, como React re-renderiza componentes, atualização de estado

---

### Exercício 2: Formulário de Cadastro (useState)

**Objetivo**: Criar um formulário que captura nome, email e senha do usuário.

**Requisitos**:

- Crie um componente `FormularioCadastro.jsx`
- Use `useState` para cada campo (nome, email, senha)
- Vincule cada input ao seu respectivo estado (controlled components)
- Ao clicar em "Cadastrar", mostre os dados no console
- Limpe o formulário após o cadastro

**Desafios extras**:

- Adicione uma validação simples (email deve conter "@", senha mínimo 6 caracteres)
- Mostre mensagens de erro abaixo de cada campo inválido
- Desabilite o botão "Cadastrar" enquanto os campos estão inválidos

**Dicas**:

- Cada input precisa de `value={estado}` e `onChange={(e) => setEstado(e.target.value)}`
- Para checkbox/radio: use `checked={estado}` e `onChange={(e) => setEstado(e.target.checked)}`
- Crie um estado separado para mensagens de erro (ex: `const [erros, setErros] = useState({})`)

**O que você aprende**: Controlled components, gerenciamento de múltiplos estados, validação básica

---

### Exercício 3: Relógio Digital (useEffect)

**Objetivo**: Criar um relógio que mostra a hora atual e atualiza a cada segundo.

**Requisitos**:

- Crie um componente `Relogio.jsx`
- Use `useState` para armazenar a hora atual
- Use `useEffect` para criar um `setInterval` que atualiza a cada 1 segundo
- Mostre a hora no formato HH:MM:SS
- **IMPORTANTE**: Limpe o intervalo quando o componente desmontar

**Desafios extras**:

- Adicione botões para pausar/continuar o relógio
- Mostre também a data atual
- Formate a hora de forma bonita (ex: "14:05:03" ao invés de "14:5:3")

**Dicas**:

- Para obter a hora: `new Date().toLocaleTimeString('pt-BR')`
- Use `setInterval` dentro do `useEffect`
- **Retorne** uma função de cleanup: `return () => clearInterval(intervalId)`
- Array de dependências vazio `[]` para rodar apenas uma vez

**O que você aprende**: Ciclo de vida de componentes, cleanup de efeitos, timers em React

---

### Exercício 4: Lista de Tarefas com Filtro (useState + useEffect)

**Objetivo**: Criar uma lista de tarefas (todo list) com busca/filtro.

**Requisitos**:

- Crie um componente `ListaTarefas.jsx`
- Use `useState` para armazenar o array de tarefas
- Adicione um input para adicionar novas tarefas
- Mostre todas as tarefas em uma lista
- Adicione um input de busca que filtra as tarefas em tempo real
- Botão para remover cada tarefa

**Desafios extras**:

- Marque tarefas como concluídas (riscado)
- Salve as tarefas no `localStorage` (use `useEffect` para ler/salvar)
- Contador de tarefas pendentes vs concluídas
- Ordene alfabeticamente

**Dicas**:

- Cada tarefa pode ser um objeto: `{ id: Date.now(), texto: '...', concluida: false }`
- Para filtrar: `tarefas.filter(t => t.texto.includes(termoBusca))`
- `localStorage.setItem('tarefas', JSON.stringify(tarefas))` para salvar
- `localStorage.getItem('tarefas')` para carregar (dentro de `useEffect`)

**O que você aprende**: Arrays em estado, manipulação de listas, persistência de dados, filtros

---

### Exercício 5: Tema Claro/Escuro (useContext)

**Objetivo**: Criar um sistema de tema que pode ser alternado entre claro e escuro.

**Requisitos**:

- Crie um `TemaContext.jsx` com `createContext()`
- Crie um componente `TemaProvider` que envolve a aplicação
- Use `useState` dentro do Provider para controlar o tema atual
- Crie um hook personalizado `useTema()` para facilitar o uso
- Crie componentes `Cabecalho`, `Conteudo` e `Rodape` que usam o tema
- Adicione um botão que alterna o tema

**Desafios extras**:

- Salve a preferência de tema no `localStorage`
- Adicione mais temas (ex: "azul", "verde")
- Aplique estilos CSS diferentes para cada tema

**Dicas**:

- Estrutura do Provider: `<TemaContext.Provider value={{ tema, alternarTema }}>`
- No hook: `const contexto = useContext(TemaContext)`
- Validação: `if (!contexto) throw new Error('useTema deve estar dentro de TemaProvider')`
- Aplique estilos inline ou classes CSS condicionalmente

**O que você aprende**: Context API, prop drilling (e como evitar), hooks personalizados

---

## 🟡 Nível Intermediário

### Exercício 6: Carrinho de Compras (useReducer)

**Objetivo**: Criar um carrinho de compras com várias ações (adicionar, remover, alterar quantidade).

**Requisitos**:

- Crie um componente `CarrinhoCompras.jsx`
- Use `useReducer` ao invés de `useState`
- Implemente ações: ADICIONAR_ITEM, REMOVER_ITEM, ALTERAR_QUANTIDADE, LIMPAR_CARRINHO
- Mostre a lista de produtos no carrinho
- Calcule e exiba o total

**Desafios extras**:

- Não permita quantidade zero ou negativa
- Incremente quantidade se o item já existe no carrinho
- Adicione um botão "Finalizar Compra" que limpa o carrinho
- Mostre uma mensagem quando o carrinho estiver vazio

**Dicas**:

- Estrutura do reducer: `function carrinhoReducer(estado, acao) { switch(acao.type) {...} }`
- Estado inicial pode ser um array vazio: `useReducer(reducer, [])`
- Cada item: `{ id, nome, preco, quantidade }`
- Para calcular total: `carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0)`

**O que você aprende**: Gerenciamento de estado complexo, padrão reducer, lógica centralizada

---

### Exercício 7: Campo de Busca Otimizado (useCallback + React.memo)

**Objetivo**: Criar uma busca com lista grande sem re-renderizar itens desnecessariamente.

**Requisitos**:

- Crie um componente `Busca.jsx` e `ItemLista.jsx`
- Gere uma lista com 1000+ itens (pode ser mock data)
- Use `useState` para o termo de busca
- Filtre a lista baseado no termo
- Use `React.memo` no `ItemLista` para evitar re-renders
- Use `useCallback` na função de remoção de item

**Desafios extras**:

- Adicione um debounce na busca (aguarde 300ms após o usuário parar de digitar)
- Mostre quantos itens foram encontrados
- Destaque o termo de busca nos resultados (em negrito ou cor diferente)

**Dicas**:

- `React.memo(ItemLista)` envolve o componente filho
- `const remover = useCallback((id) => {...}, [])` — array vazio pois não depende de variáveis externas
- Para gerar mock: `Array.from({length: 1000}, (_, i) => ({id: i, nome: \`Item \${i}\`}))`
- Abra o React DevTools e veja os re-renders sendo evitados

**O que você aprende**: Otimização de performance, memorização, quando (não) usar `useCallback`

---

### Exercício 8: Dashboard com Cálculos Pesados (useMemo)

**Objetivo**: Criar um painel com estatísticas que recalcula apenas quando necessário.

**Requisitos**:

- Crie um componente `Dashboard.jsx`
- Tenha uma lista de transações (receitas e despesas)
- Calcule: total de receitas, total de despesas, saldo, maior transação
- Use `useMemo` para memorizar esses cálculos
- Adicione filtros (por mês, por tipo) que NÃO devem forçar recálculo se não mudarem os dados

**Desafios extras**:

- Adicione um gráfico simples (pode usar asteriscos/barras em ASCII)
- Permita adicionar novas transações
- Mostre média de gastos por dia/semana
- Use `console.log` para verificar quando os cálculos rodam

**Dicas**:

- Estrutura de transação: `{ id, tipo: 'receita'|'despesa', valor, data, descricao }`
- `const total = useMemo(() => transacoes.reduce(...), [transacoes])`
- Coloque `console.log` dentro do `useMemo` para ver quando recalcula
- Compare com uma versão SEM `useMemo` para sentir a diferença

**O que você aprende**: Quando usar (e quando não usar) `useMemo`, performance, cálculos derivados

---

### Exercício 9: Player de Vídeo Controlado (useRef)

**Objetivo**: Criar controles customizados para um elemento `<video>` HTML.

**Requisitos**:

- Crie um componente `VideoPlayer.jsx`
- Use `useRef` para referenciar o elemento `<video>`
- Implemente botões: Play, Pause, Stop (volta ao início), Velocidade (0.5x, 1x, 1.5x, 2x)
- Mostre tempo atual e duração total
- Barra de progresso (pode ser visual básica)

**Desafios extras**:

- Arrastar a barra de progresso para navegar no vídeo
- Volume controlável
- Tela cheia
- Atalhos de teclado (espaço = play/pause, setas = avançar/voltar)

**Dicas**:

- `const videoRef = useRef(null)` e `<video ref={videoRef} .../>`
- Métodos: `videoRef.current.play()`, `.pause()`, `.currentTime = 0`
- Propriedades: `videoRef.current.duration`, `.currentTime`, `.playbackRate`
- Para atualizar tempo: use `setInterval` ou evento `onTimeUpdate` do vídeo

**O que você aprende**: Manipulação direta do DOM, refs, quando usar ref vs estado

---

### Exercício 10: Modal Acessível (useId + useRef)

**Objetivo**: Criar um componente de modal seguindo boas práticas de acessibilidade.

**Requisitos**:

- Crie um componente `Modal.jsx` reutilizável
- Use `useId` para gerar IDs únicos para título e descrição
- Foque automaticamente no botão "Fechar" quando o modal abrir (`useRef` + `useEffect`)
- Feche o modal ao pressionar ESC
- Bloqueie scroll da página enquanto modal está aberto
- Use `aria-labelledby` e `aria-describedby` corretamente

**Desafios extras**:

- Retorne o foco ao elemento que abriu o modal quando fechar
- Trap focus dentro do modal (Tab não deve sair dele)
- Feche ao clicar fora do conteúdo (no overlay)
- Anime entrada/saída

**Dicas**:

- IDs: `const titleId = useId()` e `aria-labelledby={titleId}`
- Foco: `const btnRef = useRef(); useEffect(() => { btnRef.current?.focus() }, [aberto])`
- ESC: Adicione event listener no `useEffect` com `document.addEventListener('keydown', ...)`
- Scroll: `document.body.style.overflow = 'hidden'` (não esqueça de limpar!)

**O que você aprende**: Acessibilidade (a11y), IDs únicos, gerenciamento de foco, event listeners

---

## 🔴 Nível Avançado

### Exercício 11: Drag and Drop com Refs (useRef + useLayoutEffect)

**Objetivo**: Criar um componente que pode ser arrastado pela tela.

**Requisitos**:

- Crie um componente `Draggable.jsx`
- Use `useRef` para referenciar o elemento arrastável
- Implemente `onMouseDown`, `onMouseMove`, `onMouseUp`
- Calcule e atualize a posição (x, y) durante o arrasto
- Use `useLayoutEffect` para posicionar antes da pintura da tela

**Desafios extras**:

- Limite o arrasto à área da tela (não deixe sair do viewport)
- Suporte a múltiplos elementos arrastáveis
- Adicione "snap to grid" (alinhar a uma grade)
- Salve a posição no `localStorage`

**Dicas**:

- Use `position: absolute` no CSS
- Calcule delta: `const deltaX = e.clientX - posicaoInicial.x`
- `useLayoutEffect` garante que a posição é aplicada antes de renderizar
- Remova listeners no cleanup: `return () => { window.removeEventListener(...) }`

**O que você aprende**: Manipulação avançada de DOM, useLayoutEffect vs useEffect, eventos de mouse

---

### Exercício 12: Input Customizado com API Controlada (useImperativeHandle + forwardRef)

**Objetivo**: Criar um input que expõe métodos específicos ao componente pai.

**Requisitos**:

- Crie um componente `InputAvancado.jsx` com `forwardRef`
- Use `useImperativeHandle` para expor métodos: `focar()`, `limpar()`, `obterValor()`, `validar()`
- No componente pai, use uma ref para chamar esses métodos
- Adicione validação interna (ex: email, CPF, telefone)
- Mostre ícone de válido/inválido

**Desafios extras**:

- Adicione máscara de formatação automática (ex: CPF: 000.000.000-00)
- Anime a validação (shake quando inválido)
- Suporte a diferentes tipos de validação configuráveis via props
- Exponha também um método `setValor()`

**Dicas**:

- `const InputAvancado = forwardRef((props, ref) => {...})`
- `useImperativeHandle(ref, () => ({ focar: () => inputRef.current.focus() }))`
- Validação pode ser regex: `/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/` para email
- Use uma lib como `react-input-mask` apenas como referência, implemente você mesmo

**O que você aprende**: Refs em componentes customizados, APIs imperativas, forwardRef

---

### Exercício 13: Sistema de Notificações (useReducer + useContext + Custom Hook)

**Objetivo**: Criar um sistema global de notificações (toasts) reutilizável em toda aplicação.

**Requisitos**:

- Crie um `NotificacaoContext.jsx` com Provider
- Use `useReducer` para gerenciar array de notificações
- Ações: ADICIONAR_NOTIFICACAO, REMOVER_NOTIFICACAO
- Crie um hook `useNotificacao()` que retorna `{ sucesso, erro, info, aviso }`
- Componente `Notificacoes.jsx` que renderiza as notificações
- Auto-remover após 5 segundos

**Desafios extras**:

- Diferentes estilos para sucesso/erro/info/aviso
- Animação de entrada/saída
- Permitir notificações sem auto-close (com botão X)
- Posição configurável (top-right, bottom-left, etc)
- Limitar número máximo de notificações simultâneas

**Dicas**:

- Estrutura: `{ id: Date.now(), tipo: 'sucesso', mensagem: '...', duracao: 5000 }`
- No hook: `const adicionar = (mensagem, tipo) => dispatch({ type: 'ADICIONAR', payload: {...} })`
- Use `setTimeout` dentro de um `useEffect` para auto-remover
- Limpe o timeout no cleanup se a notificação for removida manualmente

**O que você aprende**: Arquitetura de contexto + reducer, hooks personalizados avançados, gerenciamento global

---

### Exercício 14: Histórico de Navegação (useTransition + useState)

**Objetivo**: Criar uma navegação entre abas que mantém responsividade mesmo com conteúdo pesado.

**Requisitos**:

- Crie um componente `Abas.jsx` com várias abas (pelo menos 3)
- Uma das abas deve ter conteúdo "pesado" (lista de 10.000+ itens)
- Use `useTransition` para marcar a mudança de aba como não urgente
- Mostre um indicador de loading enquanto a transição está pendente
- A troca de abas deve parecer instantânea para o usuário

**Desafios extras**:

- Adicione mais abas com diferentes tipos de conteúdo pesado
- Use `startTransition` para outras operações pesadas (ordenação, filtros)
- Compare com versão SEM `useTransition` para sentir a diferença
- Adicione debounce em campos de busca dentro das abas

**Dicas**:

- `const [isPending, startTransition] = useTransition()`
- Envolva a mudança de estado: `startTransition(() => { setAbaAtiva(novaAba) })`
- Renderize conteúdo apenas da aba ativa (renderização condicional)
- Mock de dados pesados: `Array.from({length: 10000}, (_, i) => ({...}))`

**O que você aprende**: Concurrent Rendering, transições, UX responsiva, priorização de atualizações

---

### Exercício 15: Busca com Valor Adiado (useDeferredValue)

**Objetivo**: Implementar busca em lista gigante sem travar a digitação.

**Requisitos**:

- Crie um componente `BuscaAvancada.jsx`
- Lista de 50.000+ itens mockados
- Input de busca que atualiza imediatamente o estado
- Use `useDeferredValue` para adiar o filtro pesado da lista
- Mostre a quantidade de resultados encontrados
- Indique visualmente quando o filtro está sendo processado

**Desafios extras**:

- Compare performance com e sem `useDeferredValue`
- Adicione múltiplos campos de busca (nome, categoria, preço)
- Implemente busca fuzzy (aceita erros de digitação)
- Destaque termos encontrados nos resultados

**Dicas**:

- `const [termoBusca, setTermoBusca] = useState('')`
- `const termoAdiado = useDeferredValue(termoBusca)`
- Filtre usando `termoAdiado`, não `termoBusca`
- `const isPending = termoBusca !== termoAdiado` para indicador de loading
- Use `Array.filter()` ou `Array.reduce()` para busca

**O que você aprende**: Diferença entre `useTransition` e `useDeferredValue`, otimização de busca, UX fluida

---

### Exercício 16: Integração com Store Externa (useSyncExternalStore)

**Objetivo**: Criar um hook customizado que sincroniza com uma store externa (simulate um mini-Redux).

**Requisitos**:

- Crie um arquivo `store.js` com uma store simples (objeto com subscribers)
- Implemente `subscribe()` e `getSnapshot()` na store
- Use `useSyncExternalStore` para criar um hook `useStore()`
- Teste com múltiplos componentes lendo e atualizando a store
- Garanta que todos os componentes se atualizam quando a store muda

**Desafios extras**:

- Adicione suporte a seletores (ler apenas parte da store)
- Implemente middleware (logger, persist)
- Suporte a ações assíncronas
- Integre com `localStorage` para persistência

**Dicas**:

- Store básica: `{ state: {}, subscribers: new Set(), subscribe(fn), setState(newState) }`
- No hook: `useSyncExternalStore(store.subscribe, store.getSnapshot)`
- `subscribe` deve retornar função de unsubscribe: `return () => subscribers.delete(fn)`
- Para seletores: `useSyncExternalStore(subscribe, () => selector(getSnapshot()))`

**O que você aprende**: Integração com bibliotecas externas, concorrência, stores globais, padrões avançados

---

### Exercício 17: Estilos Dinâmicos com CSS-in-JS (useInsertionEffect)

**Objetivo**: Criar um sistema básico de CSS-in-JS que injeta estilos sem FOUC (flash of unstyled content).

**Requisitos**:

- Crie um hook `useEstilo(cssString)` que injeta CSS dinamicamente
- Use `useInsertionEffect` para garantir que estilos são injetados antes da renderização
- Gere classes únicas automaticamente
- Retorne o nome da classe para usar no componente
- Remova os estilos quando o componente desmontar

**Desafios extras**:

- Suporte a pseudo-classes (`:hover`, `:focus`)
- Suporte a media queries
- Cache de estilos (mesmos estilos = mesma classe)
- Prefixos vendor automáticos

**Dicas**:

- `useInsertionEffect` é específico para CSS-in-JS libs
- Insira via: `const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style)`
- Gere classe única: `const className = \`css-\${Math.random().toString(36).slice(2, 9)}\``
- Cleanup: `return () => document.head.removeChild(style)`

**O que você aprende**: `useInsertionEffect`, manipulação de `<head>`, CSS-in-JS, timing de estilos

---

### Exercício 18: Formulário com Ações Assíncronas (useActionState - React 19)

**Objetivo**: Criar um formulário moderno que usa Actions do React 19.

**Requisitos**:

- Crie um componente `FormularioContato.jsx`
- Use `useActionState` para gerenciar submissão assíncrona
- Simule uma API call (aguarde 2 segundos)
- Mostre estado de pending enquanto envia
- Exiba mensagem de sucesso/erro do servidor
- Reset automático do form após sucesso

**Desafios extras**:

- Desabilite botão e inputs durante pending
- Adicione validação que roda no servidor (simule)
- Implemente retry automático em caso de erro
- Mostre barra de progresso durante envio

**Dicas**:

- `const [state, formAction, isPending] = useActionState(submitAction, null)`
- Action: `async function submitAction(prevState, formData) { await apiCall(); return result; }`
- Use `formData.get('campoNome')` para ler valores
- `<form action={formAction}>` conecta o form à action
- State retornado pode conter `{ sucesso: true, mensagem: '...' }`

**O que você aprende**: React 19 Actions, formulários modernos, gerenciamento de async, UX de loading

---

### Exercício 19: Componente de Botão Inteligente (useFormStatus - React 19)

**Objetivo**: Criar um botão reutilizável que detecta automaticamente o estado do form pai.

**Requisitos**:

- Crie um componente `BotaoSubmit.jsx` usando `useFormStatus`
- O botão deve se desabilitar automaticamente quando o form está em pending
- Mostre texto diferente durante pending ("Enviando..." ao invés de "Enviar")
- Use este botão em diferentes forms sem passar props manualmente
- Adicione ícone de loading

**Desafios extras**:

- Suporte a diferentes variantes (primário, secundário, perigo)
- Anime o botão durante pending (pulse, spinner)
- Feedback tátil em mobile (vibração)
- Acessibilidade (aria-busy, aria-disabled)

**Dicas**:

- `const { pending } = useFormStatus()` — hook do react-dom
- Este hook SÓ funciona dentro de um `<form>` que usa Actions
- `<button type="submit" disabled={pending}>{pending ? 'Enviando...' : 'Enviar'}</button>`
- Spinner CSS: pode usar border-radius + animation rotate

**O que você aprende**: Hooks de react-dom, composição de componentes, design systems

---

### Exercício 20: Atualizações Otimistas em Lista (useOptimistic - React 19)

**Objetivo**: Criar uma lista de comentários com feedback instantâneo ao adicionar/remover.

**Requisitos**:

- Crie um componente `ListaComentarios.jsx`
- Use `useOptimistic` para mostrar comentários imediatamente ao adicionar
- Simule uma API que demora 2-3 segundos para responder
- Se a API falhar, reverta o comentário otimista
- Marque visualmente comentários que estão "pendentes"

**Desafios extras**:

- Suporte a edição otimista
- Remoção otimista
- "Curtir" otimista (incrementa contador antes da API)
- Múltiplas ações otimistas simultâneas
- Filas de ações (se o usuário fizer várias ações rápidas)

**Dicas**:

- `const [comentariosOtimistas, adicionarOtimista] = useOptimistic(comentarios)`
- Dentro da action: `adicionarOtimista({ id: 'temp', texto: '...', pending: true })`
- Após sucesso da API: atualize o estado real com resposta do servidor
- React reverte automaticamente o estado otimista para o real
- Marque visualmente: `<li style={{ opacity: comentario.pending ? 0.5 : 1 }}>`

**O que você aprende**: UI otimista, UX responsiva, gerenciamento de estado temporário, tratamento de erros

---

### Exercício 21: Sistema de Analytics (useEffectEvent - React 19.2)

**Objetivo**: Criar um sistema de tracking que não causa re-execução desnecessária de effects.

**Requisitos**:

- Crie um hook `useAnalytics()` que envia eventos para uma API fake
- Use `useEffectEvent` para separar a lógica de envio dos effects
- Rastreie: pageview, cliques, tempo na página
- Envie eventos mesmo quando props/state mudam, sem re-configurar tudo
- Exemplo: ao conectar chat, envie evento com tema atual, mas não reconecte se tema mudar

**Desafios extras**:

- Debounce de eventos (não envie duplicatas em 1 segundo)
- Queue de eventos offline (envie quando conectar)
- Batch de eventos (envie múltiplos de uma vez)
- Configuração global de analytics

**Dicas**:

- `const enviarEvento = useEffectEvent((evento, dados) => { api.track(evento, dados); })`
- No effect: `useEffect(() => { socket.on('connected', () => enviarEvento('conectado', tema)); }, [socketUrl])`
- `tema` não precisa estar nas dependências pois `useEffectEvent` sempre tem valor atual
- Evita reconexões desnecessárias só porque tema mudou

**O que você aprende**: Separação de concerns, closures em effects, quando usar `useEffectEvent`

---

### Exercício 22: Carregamento com Suspense (use API - React 19)

**Objetivo**: Implementar carregamento de dados usando a nova API `use()`.

**Requisitos**:

- Crie um componente `ListaProdutos.jsx` que usa `use()` para ler uma Promise
- Envolva com `<Suspense fallback={<Loading />}>`
- Simule uma API que retorna lista de produtos
- Implemente cache básico (não recarregue se já tem dados)
- Erro boundaries para tratar falhas

**Desafios extras**:

- Carregamento paralelo de múltiplos recursos
- Prefetch de dados (carregar antes do usuário navegar)
- Fallback progressivo (mostra partes incrementalmente)
- Retry automático em caso de erro

**Dicas**:

- `const produtos = use(promiseProdutos)` — React suspende até resolver
- Promise deve vir de fora do componente (não crie com `useState`)
- Cache simples: `const cache = new Map(); function getCachedPromise(url) {...}`
- Erro boundary: `class ErrorBoundary extends React.Component {...}`
- Suspense: `<Suspense fallback={<Spinner />}><Comp /></Suspense>`

**O que você aprende**: Suspense, carregamento assíncrono declarativo, streaming, error boundaries

---

## 🎓 Exercício Final: Aplicação Completa

### Exercício 23: Dashboard de Finanças Pessoais

**Objetivo**: Criar uma aplicação completa que usa múltiplos hooks em conjunto.

**Funcionalidades Obrigatórias**:

1. **Autenticação** (Context + useState)

   - Login/logout
   - Proteção de rotas

2. **Gerenciamento de Transações** (useReducer)

   - Adicionar receita/despesa
   - Categorias
   - Datas

3. **Filtros e Busca** (useDeferredValue)

   - Por categoria, data, valor
   - Busca por descrição

4. **Dashboard** (useMemo)

   - Gráficos de resumo
   - Cálculos de totais

5. **Notificações** (Context + Custom Hook)

   - Alertas de gastos
   - Confirmações de ações

6. **Persistência** (useEffect + localStorage)

   - Salvar dados localmente
   - Sincronização

7. **Tema** (Context)

   - Claro/escuro
   - Preferência salva

8. **Acessibilidade** (useId + refs)
   - Navegação por teclado
   - Screen reader friendly

**Desafios Extras**:

- Export/import de dados (JSON, CSV)
- Gráficos com library (recharts, chart.js)
- PWA (funciona offline)
- Metas de gastos e alertas
- Categorias customizáveis
- Multi-moeda

**O que você aprende**: Arquitetura de aplicação real, integração de múltiplos hooks, boas práticas, organização de código

---

## 📋 Checklist de Progresso

Marque conforme completar:

**Nível Iniciante**:

- [ ] Exercício 1: Contador Simples
- [ ] Exercício 2: Formulário de Cadastro
- [ ] Exercício 3: Relógio Digital
- [ ] Exercício 4: Lista de Tarefas com Filtro
- [ ] Exercício 5: Tema Claro/Escuro

**Nível Intermediário**:

- [ ] Exercício 6: Carrinho de Compras
- [ ] Exercício 7: Campo de Busca Otimizado
- [ ] Exercício 8: Dashboard com Cálculos
- [ ] Exercício 9: Player de Vídeo
- [ ] Exercício 10: Modal Acessível

**Nível Avançado**:

- [ ] Exercício 11: Drag and Drop
- [ ] Exercício 12: Input Customizado
- [ ] Exercício 13: Sistema de Notificações
- [ ] Exercício 14: Histórico de Navegação
- [ ] Exercício 15: Busca com Valor Adiado
- [ ] Exercício 16: Integração com Store Externa
- [ ] Exercício 17: Estilos Dinâmicos
- [ ] Exercício 18: Formulário com Actions
- [ ] Exercício 19: Botão Inteligente
- [ ] Exercício 20: Atualizações Otimistas
- [ ] Exercício 21: Sistema de Analytics
- [ ] Exercício 22: Carregamento com Suspense

**Projeto Final**:

- [ ] Exercício 23: Dashboard de Finanças

---

## 💡 Dicas Gerais de Estudo

1. **Não pule níveis**: A progressão é intencional
2. **Consulte a documentação**: Sempre que tiver dúvida, leia a doc oficial
3. **Experimente**: Teste variações, quebre coisas, veja o que acontece
4. **Debugue**: Use React DevTools para inspecionar estado e props
5. **Refatore**: Depois de funcionar, melhore o código
6. **Compartilhe**: Mostre suas soluções, peça feedback
7. **Pratique**: Faça cada exercício pelo menos 2 vezes em dias diferentes

---

## 🔗 Recursos Recomendados

- [React Docs](https://react.dev) - Documentação oficial
- [React DevTools](https://react.dev/learn/react-developer-tools) - Extensão para browser
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Se quiser adicionar tipos
- [MDN Web Docs](https://developer.mozilla.org/) - Referência JavaScript/DOM

---

**Boa sorte nos estudos! 🚀**

_Lembre-se: O objetivo não é ter todas as respostas, mas aprender a encontrá-las._

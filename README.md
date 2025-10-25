# Animação de Fundo: Rede Neural Generativa

Este documento detalha o funcionamento do componente de animação de fundo interativo, `NeuralBackground.tsx`, utilizado neste projeto. A animação não é apenas um elemento visual passivo, mas uma simulação dinâmica que evolui e interage com o usuário, representando o conceito de uma inteligência artificial em constante aprendizado.

## Tecnologias Utilizadas

- **React:** Para a estruturação de componentes da interface.
- **Next.js:** Como framework principal da aplicação.
- **Three.js:** Para a criação e renderização de toda a cena 3D, incluindo a rede, partículas e animações de câmera.

---

## Funcionalidades e Algoritmos de Simulação

A animação é composta por várias camadas de lógica que, juntas, criam uma experiência dinâmica e orgânica.

### 1. Visualização da Rede

A base da animação é uma rede neural representada em um espaço 3D.

- **Neurônios:** São representados por esferas ciano (`THREE.Mesh` com `SphereGeometry`). A simulação começa com uma população inicial de 40 neurônios, distribuídos aleatoriamente em uma grande esfera invisível.
- **Conexões:** Linhas ciano (`THREE.Line`) que conectam neurônios próximos. A rede começa com um potencial máximo de conexões (qualquer neurônio a uma distância de até 70 unidades é conectado), formando uma teia densa e complexa desde o início.

### 2. Tráfego de Dados e Rastro de Neon

Para dar vida à rede, partículas de dados viajam entre os neurônios.

- **Partículas:** Pequenas esferas rosa (`0xff00ff`) que se movem ao longo das linhas de conexão.
- **Efeito de Rastro (Ghost Trail):** Para criar um efeito de "rastro de neon" de forma performática, utilizamos uma técnica de renderização clássica. O renderizador é configurado para não limpar a tela a cada frame (`autoClear = false`). Em vez disso, um "véu" preto e semi-transparente é desenhado sobre a cena a cada quadro. O resultado é que os objetos dos frames anteriores desvanecem lentamente, fazendo com que as partículas rosa deixem uma cauda suave e luminosa, como um cometa.

### 3. Algoritmo de Crescimento Generativo (Crescimento por Dados)

Este é o principal algoritmo da simulação, que faz a rede evoluir.

- **Gatilho por Atividade:** O crescimento da rede não é baseado em tempo, mas sim na atividade interna. Cada neurônio possui um contador (`userData.dataReceived`) que rastreia quantos pacotes de dados ele recebeu.
- **Criação de Novos Neurônios:** Quando o contador de um neurônio atinge um determinado limiar (`spawnThreshold`), ele "se reproduz", gerando um novo neurônio em uma posição aleatória próxima a si mesmo.
- **Integração à Rede:** Assim que um novo neurônio é criado, a função `updateNetwork()` é chamada para recalcular todas as conexões da rede, integrando o novo membro e formando novas linhas com seus vizinhos.

### 4. Algoritmo de Dificuldade Progressiva

Para simular uma "curva de aprendizado" e evitar um crescimento exponencial infinito, o custo para criar novos neurônios aumenta com o tempo.

- **Limiar Dinâmico:** O `spawnThreshold` não é fixo. Ele começa em **100**.
- **Incremento de Custo:** A cada novo neurônio gerado, o valor do limiar para a próxima criação **aumenta em 10**. O primeiro neurônio custa 100 pacotes, o segundo 110, o terceiro 120, e assim por diante. Isso faz com que a expansão da rede seja rápida no início, mas se torne mais "cara" e rara à medida que a rede fica mais complexa.

### 5. Controle de População e Performance

Para garantir a estabilidade da animação a longo prazo, um mecanismo de ciclo de vida foi implementado.

- **Limite Máximo:** A rede tem um limite máximo de **150 neurônios** (`MAX_NEURONS`).
- **Reciclagem (FIFO):** Quando a rede atinge o limite e um novo neurônio precisa ser criado, o **neurônio mais antigo** é automaticamente removido da cena (usando `Array.shift()` para um comportamento de fila). Seus recursos (geometria e material) são liberados da memória para evitar vazamentos.
- **Equilíbrio Dinâmico:** Isso cria um estado de equilíbrio onde a rede está sempre se renovando, com neurônios antigos morrendo e novos nascendo, sem nunca sobrecarregar o sistema.

### 6. Interatividade com o Usuário

A animação responde a interações do usuário de duas formas:

- **Rotação por Scroll:** A rede neural rotaciona suavemente no eixo Y de acordo com a posição da barra de rolagem da página, criando um efeito de parallax. A leitura do scroll é otimizada com uma função `throttle` para não sobrecarregar o navegador.
- **Ciclo de Zoom Interativo:**
  1. **Zoom In:** Ao clicar em um card de serviço, a página dispara um evento global (`zoomToRandomNeuron`). A animação de fundo ouve este evento, pausa a rotação pelo scroll, escolhe um neurônio aleatório, o destaca (aumentando seu tamanho e mudando sua cor para branco) e anima a câmera em um zoom rápido em sua direção.
  2. **Zoom Out:** Ao fechar o modal de detalhes do serviço, a página dispara um segundo evento (`zoomOut`). A animação ouve este evento, retorna o neurônio destacado ao seu estado original e anima a câmera de volta à sua posição inicial imersiva (`z: 40`), reativando a rotação por scroll.

---

## Estrutura do Componente

O arquivo `NeuralBackground.tsx` contém toda a lógica da simulação. Suas partes principais são:

- **`useEffect`:** Hook principal do React que inicializa a cena 3D, os neurônios iniciais, os ouvintes de eventos (scroll, resize, zoom) e a lógica de limpeza para evitar vazamentos de memória.
- **`spawnNeuron()`:** Função interna que cria uma nova instância de um neurônio.
- **`updateNetwork()`:** Função que recalcula e redesenha todas as conexões da rede. É chamada no início e sempre que um novo neurônio é gerado.
- **`animate()`:** O coração da animação. É um loop (`requestAnimationFrame`) que atualiza a posição das partículas, a rotação da câmera, o estado do zoom e renderiza a cena a cada frame.
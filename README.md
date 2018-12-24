Para o desenvolvimento desse projeto foi utilizado o Angular em sua versão 6.

<h3>Instalação</h3>

É necessário que o NodeJS esteja instalado.

Após a instalação do NodeJS, clone o projeto e execute o comando:

<code>npm install -g</code>

Depois da instação concluída, execute o projeto através do comando:

<code>ng serve --o</code>

<h3>Execução do Problema</h3>

<b>Entradas</b>

(Etapa 1): Informe as coordenadas finais da malha no formato (X,Y) onde X e Y são valores numéricos.

(Etapa 2): Informe as coordenadas e as direções iniciais das sondas 1 e 2 respectivamente, onde X e Y são valores numéricos.

(Etapa 3): Devem ser informadas a lista de comandos para as sondas 1 e 2 respectivamente, onde os mesmos são strings.

(Etapa 4): Ocorre a simulação dos movimentos, onde cada uma das sondas são controladas em sequencia.

<b>Saídas</b>

No processo de simulação, é apresentado a malha inicial com as coordenadas e o sentido de cadas uma das sondas, conforme definido inicialmente (destacadas em azul), logo abaixo, é representado a situação final da malha após a movimentação das sondas, bem como, todos os movimentos realizados conforme a lista de entradas definida na Etapa 3 e com base nas coordenadas e direções definidas na Etapa 2 (destacadas em verde).

<b>Validações</b>

O sistema valida a informação de dados apenas numéricos para os campos de coordenadas;
Para os campos de lista de comandos o sistema permite a inserção apenas de valores em forma de string;
A aplicação também realiza a validação para saber se as coordendas informadas para as sondas, estão dentro do tamanho definido para a malha;

OBS: As validações realizadas pelo sistema podem ser vistos através do console do navegador!

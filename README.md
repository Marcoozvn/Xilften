<p align="center">
  <a href="" rel="noopener">     
 <img height=150px src="https://drive.google.com/uc?export=view&id=1p33hb4K1mLQXiaHG38nmje8z-P4BOw6j" alt="Xilften"></a>
</p>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Marcoozvn/Xilften">
  
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Marcoozvn/Xilften">
  
  <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/Marcoozvn/Xilften">
  
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Marcoozvn/Xilften">

</div>

---

Xilften (perdão pelo trocadilho) é uma aplicação para recomendação de filmes criada no intuito de aprender e aplicar conceitos/tecnologias como:
+ React + Redux + Context API
+ Filas + Redis + Background Jobs
+ Recomendação de filmes usando Filtragem Colaborativa
+ Docker

Foi usado um [dataset](https://grouplens.org/datasets/movielens/100k/) do MovieLens com cerca de 100.000 avaliações de 1.000 usuários em 1.700 filmes para criar uma base para a recomendação. Ao avaliar um filme, a recomendação para o usuário é refinada por meio de *filtragem colaborativa* ([veja](https://lamfo-unb.github.io/2018/09/29/Sistemas-de-Recomenda%C3%A7%C3%A3o-usando-Collaborative-Filtering/)). A recomendação para os usuários é recalculada diariamente para refletir o estado atual da base de dados. Os refinamentos são colocados em fila no *Redis* e processados em *background jobs*.

![GIF](https://drive.google.com/uc?export=view&id=1NeXgy3a8HhLXomRu0cisRgKYyMhMOl8P)

## Rodando a aplicação

### Com Docker

No diretório raiz da aplicação, execute:

1. `docker-compose build`
2. `docker-compose up`

### Sem Docker

Caso queira executar sem o Docker, você deverá instalar o *Node, Redis, MongoDB* na sua máquina. Após isso, 
1. Certifique-se de que o Redis e o Mongo estejam em execução
2. Na pasta `Backend`:
   - Crie um arquivo `.env`, usando como base o `.env.sample` e preenchendo os valores de porta, senha e host do redis e mongo, além do secret
   - Execute `npm install`
   - Em seguida, `npm run dev`
3. Na pasta `xilften`, execute: `npm install` e `npm run start`

## Acessando a aplicação 

Após isso, a aplicação estará disponível no endereço `http://localhost:3000`. A api estará escutando a porta `3333`. Para acessar a página de monitoramento dos *Jobs*, acesse `http://localhost:3333/admin/queues`.

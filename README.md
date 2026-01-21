# Workshop: Smart SENAI - Arquitetura Web Moderna

Bem-vindo ao workshop prático. Este projeto simula um sistema de monitoramento escolar distribuído.

## Estrutura do Projeto
- **/backend-core**: API Laravel (Gestão de Usuários e Salas) - SQL.
- **/backend-analytics**: API Python/Flask (Ingestão de Sensores IoT) - NoSQL.
- **/frontend-dashboard**: Next.js (Visualização de Dados).

## Pré-requisitos
- Docker & Docker Compose
- Node.js (LTS)
- Python 3.10+
- PHP 8.2+ & Composer

## 🚀 Passo 1: Subir a Infraestrutura
Na raiz do projeto, execute:

```bash
docker-compose up -d
```

### Como testar esta parte agora:

1.  Certifique-se de que o Docker Desktop está rodando.
2.  No terminal, dentro da pasta `workshop-senai-smart`, rode:
    `docker-compose up -d`
3.  Aguarde baixar as imagens e iniciar.
4.  Abra seu navegador em `http://localhost:8081`.
    * Se pedir login, use `admin` / `pass` (padrão do mongo-express) ou tente acessar direto. Se a página carregar, o MongoDB está vivo.
5.  Se tiver um cliente MySQL (DBeaver, Workbench), tente conectar em `localhost:3306` com usuário `senai_user` e senha `password`.
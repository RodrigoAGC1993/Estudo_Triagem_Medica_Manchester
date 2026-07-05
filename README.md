# 🏥 Sistema de Triagem Médica — Protocolo de Manchester

Sistema web interativo para triagem de pacientes baseado no Protocolo de Manchester, com algoritmo de pontuação para recomendação de especialidade médica e detecção de emergências.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 📋 Visão Geral

Este projeto consiste em uma aplicação web que otimiza o atendimento em unidades de saúde, direcionando pacientes para a especialidade médica mais adequada com base em uma análise inteligente de seus sintomas e sinais vitais.

A ferramenta visa:
- Reduzir o tempo de espera
- Melhorar a eficiência do fluxo de pacientes
- Identificar e priorizar casos urgentes rapidamente

---

## 🚀 Funcionalidades

### Coleta Estruturada de Dados
- Formulário organizado em seções: identificação, queixa principal, sinais vitais e checklist de sintomas

### Indicadores de Sinais Vitais em Tempo Real
- Classificação automática da **Pressão Arterial** (7ª Diretriz Brasileira de Hipertensão)
- Classificação automática da **Temperatura Corporal** (Manuais MSD)
- Feedback visual instantâneo com cores (verde, amarelo, vermelho)

### Sistema de Sintomas Completo (80+ sintomas)
- Gerais / Constitucionais
- Neurológicos (baseado em AVC — gov.br/saude)
- Cardiovasculares (baseado em Hipertensão — gov.br/saude)
- Respiratórios (baseado em Asma — gov.br/saude)
- Otorrinolaringológicos
- Gastrointestinais (baseado em Doenças Diarreicas, Hepatites)
- Musculoesqueléticos
- Dermatológicos (baseado em Hanseníase, Herpes)
- Saúde Mental (baseado em Depressão — gov.br/saude)
- Endócrinos / Metabólicos (baseado em Diabetes — gov.br/saude)
- Infectologia / Arboviroses (baseado em Dengue, Chikungunya)
- Nefrológicos / Urinários (baseado em Doenças Renais)
- Oftalmológicos
- Hematológicos (baseado em Doença Falciforme)
- Sintomas específicos por gênero (Ginecológicos / Urológicos)

### Detecção de Emergências (Red Flags)
- Suspeita de **AVC** (confusão mental + fraqueza unilateral + alteração da fala)
- Suspeita de **Infarto** (dor no peito + falta de ar + sudorese fria)
- **Crise Hipertensiva** com sinais neurológicos
- **Dengue Grave** (febre + dor retro-ocular + sangramento)
- **Crise Respiratória** com cianose
- **Convulsão**
- **Hipertermia Grave** (>41°C)
- Alerta de **saúde mental** → CVV 188

### Regras Combinadas de Doenças
- Dengue clássica e grave
- Chikungunya
- Diabetes mellitus
- Asma / Crise asmática
- Hipertensão sintomática
- Depressão
- Hepatites virais
- Hanseníase
- Doença renal crônica

### Interface Profissional e Responsiva
- Design limpo e adaptável a diferentes tamanhos de tela
- Resultado com classificação visual por cor (verde, amarelo, vermelho pulsante)

---

## 📚 Fundamentação Teórica

| Tema | Fonte |
|------|-------|
| Doenças e Sintomas | [Ministério da Saúde — Saúde de A a Z](https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z) |
| Pressão Arterial | 7ª Diretriz Brasileira de Hipertensão Arterial |
| Temperatura Corporal | Manuais MSD (Versão Profissional) |
| Classificação de Risco | Protocolo de Manchester (versão simplificada) |
| AVC | [gov.br/saude — AVC](https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/avc) |
| Dengue | [gov.br/saude — Dengue](https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dengue) |
| Hipertensão | [gov.br/saude — Hipertensão](https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/h/hipertensao) |
| Asma | [gov.br/saude — Asma](https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/asma) |

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|------------|-----|
| HTML5 | Estruturação semântica do formulário |
| CSS3 | Estilização, responsividade (Flexbox/Grid) |
| JavaScript (ES6) | Lógica de negócios, avaliação e resultados |

**Sem dependências externas** — funciona diretamente no navegador.

---

## ⚡ Como Executar

```bash
# 1. Clone o repositório
git clone https://github.com/RodrigoAGC1993/Estudo_Triagem_Medica_Manchester.git

# 2. Acesse a pasta
cd Estudo_Triagem_Medica_Manchester

# 3. Abra no navegador
start index.html
```

Ou simplesmente abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Edge).

---

## 📁 Estrutura do Projeto

```
Estudo_Triagem_Medica_Manchester/
├── index.html      # Estrutura do formulário e interface
├── style.css       # Estilização e responsividade
├── script.js       # Lógica de triagem e algoritmo de pontuação
├── README.md       # Documentação principal
├── COMO_USAR.md    # Guia de uso detalhado
└── Readme.me       # Resumo acadêmico original
```

---

## 🔮 Próximos Passos

- [ ] Integração com Banco de Dados (armazenar triagens para análise)
- [ ] Autenticação de Usuários (perfis para profissionais e pacientes)
- [ ] Geração de Relatório PDF (resumo da triagem para prontuário)
- [ ] Machine Learning (refinar algoritmo com dados reais)
- [ ] Classificação por cores do Manchester (vermelho, laranja, amarelo, verde, azul)
- [ ] Histórico de triagens realizadas
- [ ] API REST para integração com outros sistemas

---

## ⚠️ Cláusula de Responsabilidade

> Este sistema foi concebido como uma **ferramenta de apoio acadêmico** para demonstrar como a tecnologia pode auxiliar o processo de triagem. **Não substitui, em hipótese alguma, o julgamento clínico de um profissional de saúde qualificado.**
>
> Em caso de emergência, ligue **SAMU 192** ou **Bombeiros 193**.
>
> Se precisar de apoio emocional, ligue **CVV 188** (24h).

---

## 👤 Autor

**Rodrigo AGR / AD**

---

## 📄 Licença

Este projeto é de uso acadêmico e educacional.

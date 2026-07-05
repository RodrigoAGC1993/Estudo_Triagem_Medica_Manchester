# 📖 Como Usar — Sistema de Triagem Médica

Guia completo de utilização do Sistema de Triagem Médica baseado no Protocolo de Manchester.

---

## 🖥️ Requisitos

- Navegador moderno (Google Chrome, Firefox, Microsoft Edge, Safari)
- Nenhuma instalação adicional necessária
- Funciona offline (todos os arquivos são locais)

---

## 🚀 Iniciando o Sistema

1. Abra o arquivo `index.html` no seu navegador
2. O formulário de triagem será carregado automaticamente
3. Preencha os campos na ordem apresentada

---

## 📝 Passo a Passo da Triagem

### 1️⃣ Identificação do Paciente

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| Nome Completo | Nome do paciente | Maria Silva |
| Idade | Idade em anos | 45 |
| Gênero | Masculino ou Feminino | Feminino |
| Queixa Principal | Motivo da consulta | Dor de cabeça há 3 dias |

> **Nota:** Ao selecionar o gênero, sintomas específicos (ginecológicos ou urológicos) serão exibidos automaticamente.

---

### 2️⃣ Sinais Vitais

#### Pressão Arterial
- **Formato:** Sistólica/Diastólica (ex: `120/80`)
- O sistema classifica automaticamente:

| Faixa | Classificação | Cor |
|-------|--------------|-----|
| < 90/60 | Hipotensão | 🔵 Azul |
| < 120/80 | Ótima | 🟢 Verde |
| 120-129/80-84 | Normal | 🟢 Verde |
| 130-139/85-89 | Pré-hipertensão | 🟡 Amarelo |
| 140-159/90-99 | Hipertensão Est. 1 | 🟡 Amarelo |
| 160-179/100-109 | Hipertensão Est. 2 | 🔴 Vermelho |
| ≥ 180/110 | Crise Hipertensiva | 🔴 Vermelho |

#### Temperatura Corporal
- **Formato:** Valor em °C (ex: `36.5` ou `36,5`)
- Aceita tanto ponto quanto vírgula como separador decimal

| Faixa | Classificação | Cor |
|-------|--------------|-----|
| < 35°C | Hipotermia | 🔵 Azul |
| 36.1 - 37.2°C | Normal | 🟢 Verde |
| 37.3 - 37.7°C | Febril / Subfebril | 🟡 Amarelo |
| 37.8 - 39.4°C | Febre | 🟡 Amarelo |
| 39.5 - 40.9°C | Febre Alta | 🔴 Vermelho |
| ≥ 41°C | Hipertermia Grave | 🔴 Vermelho |

---

### 3️⃣ Seleção de Sintomas

Marque todos os sintomas que o paciente apresenta. Os sintomas estão organizados em categorias:

| Categoria | Ícone | Exemplos |
|-----------|-------|----------|
| Gerais | 🌡️ | Febre, calafrios, fadiga |
| Neurológicos | 🧠 | Dor de cabeça, tontura, convulsão |
| Cardiovasculares | ❤️ | Dor no peito, palpitações |
| Respiratórios | 🫁 | Tosse, chiado, falta de ar |
| Ouvido/Nariz/Garganta | 👂 | Dor de ouvido, rouquidão |
| Gastrointestinais | 🫃 | Náusea, dor abdominal, diarreia |
| Musculoesqueléticos | 🦴 | Dor nas costas, articulações |
| Dermatológicos | 🩹 | Manchas, coceira, lesões |
| Saúde Mental | 🧘 | Ansiedade, tristeza, insônia |
| Endócrinos | ⚖️ | Sede excessiva, ganho de peso |
| Infectologia | 🦟 | Manchas no corpo, sangramento |
| Nefrológicos | 🫘 | Dor lombar, urina escura |
| Oftalmológicos | 👁️ | Dor ocular, olho vermelho |
| Hematológicos | 🩸 | Palidez, hematomas |

> **Dica:** Quanto mais sintomas relevantes você marcar, mais precisa será a recomendação.

---

### 4️⃣ Resultado da Triagem

Após clicar em **"Realizar Triagem"**, o sistema exibirá um dos seguintes resultados:

#### 🟢 Resultado Normal (verde)
- Especialidade recomendada com base na pontuação dos sintomas
- Não há sinais de urgência

#### 🟡 Resultado de Atenção (amarelo)
- Especialidade recomendada
- Há sinais de alerta (febre alta ou PA elevada) que indicam procurar atendimento em breve

#### 🔴 Resultado de EMERGÊNCIA (vermelho pulsante)
- Situação de risco identificada
- Instruções para acionar serviço de emergência (SAMU 192)
- O sistema identifica condições como AVC, infarto, crise hipertensiva, dengue grave, etc.

---

## 🔍 Como o Algoritmo Funciona

### Sistema de Pontuação
Cada sintoma atribui pontos a uma ou mais especialidades médicas. A especialidade com maior pontuação é recomendada.

```
Exemplo:
- Febre → +2 Clínico Geral, +1 Pneumologista
- Tosse → +2 Pneumologista, +1 Otorrino, +1 Clínico Geral
- Chiado no peito → +3 Pneumologista

Resultado: Pneumologista (7 pontos) ← Recomendado
```

### Regras de Urgência (Red Flags)
Antes da pontuação, o sistema verifica combinações perigosas:
- Se detectadas → resultado de EMERGÊNCIA (ignora pontuação)
- Se não detectadas → calcula pontuação normalmente

### Regras Combinadas de Doenças
Combinações específicas de sintomas ativam bônus de pontuação para simular o raciocínio clínico:

| Combinação | Suspeita | Bônus |
|------------|----------|-------|
| Febre + dor atrás dos olhos + dor muscular | Dengue | +5 Infectologista |
| Febre + dor articular + manchas | Chikungunya | +4 Infectologista |
| Sede + fome + urina frequente | Diabetes | +5 Endocrinologista |
| Chiado + falta de ar + tosse | Asma | +4 Pneumologista |
| Tristeza + perda interesse + insônia | Depressão | +4 Psiquiatra |
| Icterícia + urina escura | Hepatite | +5 Hepatologista |
| Manchas dormentes + formigamento | Hanseníase | +4 Dermatologista |

---

## ⚠️ Situações de Emergência Detectadas

O sistema identifica automaticamente as seguintes emergências:

| Condição | Sintomas Combinados | Ação |
|----------|-------------------|------|
| AVC | Confusão mental + fraqueza unilateral ou alteração da fala | SAMU 192 |
| Infarto | Dor no peito + falta de ar + sudorese fria | SAMU 192 |
| Crise Hipertensiva | PA ≥180/110 + cefaleia/visão turva/confusão | Pronto-Socorro |
| Dengue Grave | Febre + dor retro-ocular + dor muscular + sangramento | Pronto-Socorro |
| Crise Respiratória | Falta de ar + chiado + cianose | Pronto-Socorro |
| Convulsão | Qualquer episódio convulsivo | SAMU 192 |
| Hipertermia | Temperatura ≥ 41°C | Pronto-Socorro |
| Risco Suicida | Pensamentos sobre morte | CVV 188 / CAPS |

---

## 📱 Responsividade

O sistema se adapta automaticamente a diferentes telas:
- **Desktop:** Layout em 2 colunas, sintomas em grid
- **Tablet:** Layout adaptado, sintomas em colunas menores
- **Celular:** Layout em 1 coluna, sintomas em tela cheia

---

## 🔧 Personalização

### Adicionar novos sintomas
No arquivo `script.js`, adicione entradas no objeto `mapaDePontos`:

```javascript
'novo_sintoma': { 'Especialidade': pontos, 'OutraEspecialidade': pontos }
```

E adicione o checkbox correspondente no `index.html`:

```html
<label class="checkbox-label">
    <input type="checkbox" name="sintomas" value="novo_sintoma"> Descrição do Sintoma
</label>
```

### Adicionar nova regra de urgência
No arquivo `script.js`, adicione uma verificação na função `checarUrgencias()`:

```javascript
if (sintomas.includes('sintoma1') && sintomas.includes('sintoma2')) {
    return {
        especialidade: 'Emergência',
        observacao: 'Descrição da urgência.',
        urgente: true
    };
}
```

### Adicionar regra combinada de doença
Na função `recomendarEspecialidade()`, após o mapa de pontos:

```javascript
if (sintomas.includes('sintoma1') && sintomas.includes('sintoma2')) {
    scores['Especialidade'] = (scores['Especialidade'] || 0) + 5;
}
```

---

## 📞 Números de Emergência

| Serviço | Telefone |
|---------|----------|
| SAMU | 192 |
| Bombeiros | 193 |
| CVV (apoio emocional) | 188 |
| Disque Saúde (SUS) | 136 |

---

## ❓ Perguntas Frequentes

**P: O sistema substitui um médico?**
R: Não. É uma ferramenta de apoio acadêmico. A decisão final é sempre do profissional de saúde.

**P: Preciso de internet para usar?**
R: Não. O sistema funciona 100% offline após o download.

**P: Posso usar em dispositivos móveis?**
R: Sim. O design é responsivo e funciona em celulares e tablets.

**P: Os dados são armazenados?**
R: Não. Nenhum dado é salvo ou enviado para servidores. Tudo é processado localmente no navegador.

**P: Como foi definida a lista de doenças?**
R: Baseada no portal oficial do Ministério da Saúde — [Saúde de A a Z](https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z).

---

## 📄 Referências

- [Ministério da Saúde — Saúde de A a Z](https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z)
- [gov.br/saude — Dengue](https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dengue)
- [gov.br/saude — AVC](https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/avc)
- [gov.br/saude — Hipertensão](https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/h/hipertensao)
- [gov.br/saude — Asma](https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/asma)
- [gov.br/saude — Diabetes](https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/diabetes)
- 7ª Diretriz Brasileira de Hipertensão Arterial
- Manuais MSD — Versão para Profissionais de Saúde
- Protocolo de Manchester — Classificação de Risco

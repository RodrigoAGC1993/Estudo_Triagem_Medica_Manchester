/**
 * Módulo de Testes de Conhecimento — Triagem Médica
 * 
 * Baseado em:
 * - Harrison — Princípios de Medicina Interna, 22ª ed.
 * - Protocolo de Manchester — Sistema de Triagem
 * - Sepsis-3 (JAMA, 2016)
 * - Ministério da Saúde — Saúde de A a Z
 * - 7ª Diretriz Brasileira de Hipertensão Arterial
 */

document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initQuiz();
});

// ============================================================
// NAVEGAÇÃO POR ABAS
// ============================================================
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
        });
    });
}

// ============================================================
// BANCO DE QUESTÕES
// ============================================================
const quizBank = [
    // === URGÊNCIAS / RED FLAGS ===
    {
        category: 'urgencia',
        question: 'Paciente com febre, rigidez de nuca e fotofobia. Qual a principal suspeita diagnóstica?',
        options: ['Enxaqueca', 'Meningite bacteriana', 'Sinusite aguda', 'Crise hipertensiva'],
        correct: 1,
        explanation: 'A tríade febre + rigidez de nuca + fotofobia é clássica de meningite bacteriana (Harrison, Cap. Meningite). Rigidez nucal é o sinal patognomônico de irritação meníngea.'
    },
    {
        category: 'urgencia',
        question: 'Quais são os critérios do qSOFA para rastreamento de sepse (Sepsis-3)?',
        options: [
            'Febre > 38°C, leucocitose, taquicardia',
            'PAS ≤ 100 mmHg, FR ≥ 22 irpm, alteração mental (Glasgow < 15)',
            'Hipotermia, bradicardia, oligúria',
            'PCR elevada, procalcitonina alta, hemoculturas positivas'
        ],
        correct: 1,
        explanation: 'O qSOFA (quick SOFA) utiliza 3 critérios clínicos à beira-leito: PAS ≤ 100 mmHg, FR ≥ 22 irpm e alteração do nível de consciência. Se ≥ 2 critérios, alto risco de sepse (JAMA 2016, Sepsis-3).'
    },
    {
        category: 'urgencia',
        question: 'Paciente com edema súbito de face e lábios, urticária generalizada e estridor. Qual o diagnóstico e conduta imediata?',
        options: [
            'Angioedema hereditário — anti-histamínico',
            'Anafilaxia — adrenalina intramuscular',
            'Crise de pânico — benzodiazepínico',
            'Edema de Quincke — corticoide oral'
        ],
        correct: 1,
        explanation: 'Edema de face/lábios + urticária + estridor configura anafilaxia com risco de obstrução de vias aéreas (Harrison). O tratamento de primeira linha é adrenalina IM (0,3-0,5 mg) imediatamente.'
    },
    {
        category: 'urgencia',
        question: 'Na cetoacidose diabética, qual padrão respiratório é característico?',
        options: [
            'Respiração de Cheyne-Stokes',
            'Respiração de Kussmaul',
            'Respiração de Biot',
            'Respiração apneústica'
        ],
        correct: 1,
        explanation: 'A respiração de Kussmaul (respiração profunda e rápida) é uma compensação respiratória da acidose metabólica na cetoacidose diabética (Harrison). Outros sinais: hálito cetônico, desidratação, confusão.'
    },
    {
        category: 'urgencia',
        question: 'Paciente com febre alta, petéquias disseminadas e rebaixamento do nível de consciência. Qual a principal hipótese?',
        options: [
            'Dengue hemorrágica',
            'Meningococcemia',
            'Púrpura trombocitopênica imune',
            'Vasculite leucocitoclástica'
        ],
        correct: 1,
        explanation: 'Febre + petéquias/púrpura + alteração mental sugere meningococcemia — infecção fulminante por Neisseria meningitidis com alta mortalidade (Harrison). Requer antibioticoterapia empírica imediata.'
    },

    // === CARDIOVASCULAR ===
    {
        category: 'cardiovascular',
        question: 'Segundo Harrison, a avaliação inicial de dor torácica aguda deve considerar 3 categorias. Quais são?',
        options: [
            'Isquemia miocárdica, causas cardiopulmonares e causas não-cardiopulmonares',
            'Dor visceral, dor somática e dor referida',
            'Origem cardíaca, origem muscular e origem psicogênica',
            'Dor típica, dor atípica e dor funcional'
        ],
        correct: 0,
        explanation: 'Harrison (22ª ed., Cap. 15) classifica dor torácica aguda em: (1) isquemia miocárdica, (2) outras causas cardiopulmonares (doença miopericárdica, emergências aórticas e condições pulmonares), e (3) causas não-cardiopulmonares.'
    },
    {
        category: 'cardiovascular',
        question: 'Qual a classificação de uma pressão arterial de 155/95 mmHg segundo a 7ª Diretriz Brasileira de Hipertensão Arterial?',
        options: [
            'Normal',
            'Pré-hipertensão',
            'Hipertensão Estágio 1',
            'Hipertensão Estágio 2'
        ],
        correct: 2,
        explanation: 'Hipertensão Estágio 1: PAS 140-159 e/ou PAD 90-99 mmHg (7ª Diretriz Brasileira). O valor 155/95 se enquadra nesta faixa.'
    },
    {
        category: 'cardiovascular',
        question: 'Paciente com dor torácica, palpitações e tontura. Além de IAM, qual diagnóstico deve ser considerado?',
        options: [
            'Crise de ansiedade',
            'Arritmia grave (taquiarritmia)',
            'Espasmo esofágico',
            'Costocondrite'
        ],
        correct: 1,
        explanation: 'Dor torácica + palpitações + tontura pode indicar arritmia grave (taquicardia ventricular, fibrilação atrial rápida) com risco de parada cardiorrespiratória (Harrison, Cap. Arritmias).'
    },
    {
        category: 'cardiovascular',
        question: 'Qual a diferença entre urgência hipertensiva e emergência hipertensiva segundo Harrison?',
        options: [
            'Urgência tem PA > 180/120 sem sintomas; emergência tem PA > 200/130',
            'Urgência tem PA elevada sem lesão de órgão-alvo; emergência tem lesão de órgão-alvo',
            'Urgência requer internação; emergência requer UTI',
            'Não há diferença — são sinônimos'
        ],
        correct: 1,
        explanation: 'Harrison diferencia: urgência hipertensiva = PA muito elevada SEM lesão de órgão-alvo; emergência hipertensiva = PA elevada COM lesão de órgão-alvo (encefalopatia, dissecção aórtica, edema pulmonar, IRA).'
    },
    {
        category: 'cardiovascular',
        question: 'Na insuficiência cardíaca descompensada, quais são os sinais clássicos de congestão?',
        options: [
            'Hipotensão, bradicardia, pele fria',
            'Dispneia, edema de MMII, estertores pulmonares, turgência jugular',
            'Febre, taquicardia, sudorese',
            'Dor torácica, síncope, cianose'
        ],
        correct: 1,
        explanation: 'Os sinais de congestão na IC incluem: dispneia (principalmente ao esforço e ortopneia), edema periférico, estertores crepitantes e turgência jugular (Harrison, Cap. Insuficiência Cardíaca).'
    },

    // === NEUROLÓGICO ===
    {
        category: 'neurologico',
        question: 'Qual é a janela terapêutica para trombólise intravenosa no AVC isquêmico?',
        options: [
            'Até 1 hora',
            'Até 4,5 horas do início dos sintomas',
            'Até 12 horas',
            'Até 24 horas'
        ],
        correct: 1,
        explanation: 'A janela para trombólise IV com alteplase é de até 4,5 horas do início dos sintomas (Harrison, Cap. Doenças Cerebrovasculares). "Time is brain" — cada minuto sem reperfusão, milhões de neurônios morrem.'
    },
    {
        category: 'neurologico',
        question: 'Paciente com cefaleia súbita "a pior da vida", rigidez de nuca e vômitos. Qual a principal hipótese?',
        options: [
            'Enxaqueca com aura',
            'Hemorragia subaracnoidea',
            'Cefaleia tensional',
            'Meningite viral'
        ],
        correct: 1,
        explanation: 'Cefaleia em "trovoada" (thunderclap headache) — início abrupto, máxima intensidade em segundos — com rigidez nucal sugere hemorragia subaracnoidea (Harrison). TC de crânio sem contraste é o primeiro exame.'
    },
    {
        category: 'neurologico',
        question: 'Quais sinais compõem a escala de Cincinnati para AVC pré-hospitalar?',
        options: [
            'Pupilas, reflexos, força muscular',
            'Assimetria facial, queda de braço, alteração de fala',
            'Nível de consciência, padrão respiratório, resposta pupilar',
            'Pressão arterial, frequência cardíaca, glicemia'
        ],
        correct: 1,
        explanation: 'A Escala de Cincinnati avalia 3 sinais: (1) assimetria facial, (2) queda de braço (drift) e (3) alteração de fala. Um sinal positivo gera 72% de probabilidade de AVC; três sinais, > 85% (Harrison).'
    },
    {
        category: 'neurologico',
        question: 'Harrison classifica a síncope em diferentes categorias. Qual tem maior risco de morte súbita?',
        options: [
            'Síncope neurocardiogênica (vasovagal)',
            'Síncope situacional (tosse, micção)',
            'Síncope cardíaca (arritmia ou causa estrutural)',
            'Síncope ortostática'
        ],
        correct: 2,
        explanation: 'A síncope de origem cardíaca (arritmias ventriculares, estenose aórtica, cardiomiopatia hipertrófica) tem o maior risco de morte súbita (Harrison). Sempre requer investigação cardiológica urgente.'
    },
    {
        category: 'neurologico',
        question: 'No exame neurológico de meningite, o que é o sinal de Kernig?',
        options: [
            'Flexão involuntária dos MMII ao flexionar o pescoço',
            'Dor e resistência à extensão do joelho com quadril fletido a 90°',
            'Rigidez ao girar a cabeça lateralmente',
            'Abolição do reflexo fotomotor'
        ],
        correct: 1,
        explanation: 'O sinal de Kernig é positivo quando há dor/resistência ao estender o joelho com o quadril fletido a 90° (Harrison, Cap. Meningite). Junto com o sinal de Brudzinski, indica irritação meníngea.'
    },

    // === RESPIRATÓRIO ===
    {
        category: 'respiratorio',
        question: 'Segundo Harrison, 97% dos pacientes com embolia pulmonar apresentarão pelo menos um de quais sintomas?',
        options: [
            'Febre, calafrios ou sudorese',
            'Dispneia, taquipneia ou dor torácica pleurítica',
            'Tosse, hemoptise ou chiado',
            'Síncope, hipotensão ou cianose'
        ],
        correct: 1,
        explanation: '97% dos pacientes com TEP terão pelo menos um dos seguintes: dispneia (73%), taquipneia (54%) ou dor torácica pleurítica (44%). A tríade clássica completa é rara (Harrison, Cap. TEP).'
    },
    {
        category: 'respiratorio',
        question: 'Paciente com dor em panturrilha, edema unilateral e dispneia súbita. Qual a sequência fisiopatológica?',
        options: [
            'Celulite → bacteremia → pneumonia',
            'TVP → embolia pulmonar',
            'Insuficiência venosa → edema → atelectasia',
            'Tromboflebite superficial → linfedema'
        ],
        correct: 1,
        explanation: 'Dor em panturrilha com edema unilateral sugere TVP (trombose venosa profunda); quando associada a dispneia, indica possível TEP (o trombo migrou para a circulação pulmonar). Harrison recomenda investigação urgente.'
    },
    {
        category: 'respiratorio',
        question: 'Qual é o significado clínico da cianose central?',
        options: [
            'Indica vasoconstrição periférica (mãos frias)',
            'Indica SpO2 abaixo de ~85% com hipoxemia significativa',
            'Indica anemia grave (Hb < 7 g/dL)',
            'É um sinal normal em extremidades frias'
        ],
        correct: 1,
        explanation: 'Cianose central (lábios, língua) indica dessaturação significativa — geralmente SpO2 < 85% e PaO2 < 50 mmHg (Harrison). Requer oxigênio suplementar e investigação urgente da causa.'
    },
    {
        category: 'respiratorio',
        question: 'Paciente asmático com "tórax silencioso" (ausência de sibilos) durante crise. O que isso indica?',
        options: [
            'Melhora da obstrução — resolução da crise',
            'Obstrução grave — fluxo aéreo insuficiente para gerar sibilos',
            'Pneumotórax associado',
            'Broncoespasmo leve sem significado clínico'
        ],
        correct: 1,
        explanation: 'O "tórax silencioso" em crise asmática é um sinal de extrema gravidade — indica obstrução tão severa que não há fluxo aéreo suficiente para produzir sibilos (Harrison). Requer intubação iminente.'
    },
    {
        category: 'respiratorio',
        question: 'Estridor é um som respiratório que indica:',
        options: [
            'Obstrução de vias aéreas inferiores (bronquíolos)',
            'Obstrução de vias aéreas superiores (laringe/traqueia)',
            'Derrame pleural',
            'Consolidação pulmonar (pneumonia)'
        ],
        correct: 1,
        explanation: 'Estridor é um som de alta frequência, predominantemente inspiratório, que indica obstrução de vias aéreas superiores — laringe ou traqueia (Harrison). Causas: corpo estranho, edema, tumor, anafilaxia.'
    },

    // === INFECTOLOGIA ===
    {
        category: 'infecto',
        question: 'Quais são os sinais de alarme da dengue que indicam risco de evolução para forma grave?',
        options: [
            'Febre alta > 39°C por mais de 5 dias',
            'Dor abdominal intensa, vômitos persistentes, sangramento mucoso, letargia',
            'Exantema maculopapular no 3º dia',
            'Cefaleia e mialgia intensa'
        ],
        correct: 1,
        explanation: 'Sinais de alarme na dengue: dor abdominal intensa e contínua, vômitos persistentes, acúmulo de líquidos, sangramento de mucosas, letargia/agitação, hepatomegalia > 2cm e aumento rápido do hematócrito (Ministério da Saúde).'
    },
    {
        category: 'infecto',
        question: 'Na diferenciação clínica entre dengue e chikungunya, qual sintoma é mais marcante na chikungunya?',
        options: [
            'Dor retro-orbital',
            'Artralgia intensa e debilitante (pode cronificar)',
            'Sangramento gengival',
            'Exantema petequial'
        ],
        correct: 1,
        explanation: 'A chikungunya se distingue pela artralgia intensa, simétrica, que pode persistir por meses a anos (fase crônica), diferente da dengue onde a mialgia predomina (Harrison/Ministério da Saúde).'
    },
    {
        category: 'infecto',
        question: 'Qual a definição de sepse segundo o Sepsis-3 (2016)?',
        options: [
            'Infecção + 2 critérios de SIRS',
            'Disfunção orgânica ameaçadora da vida causada por resposta desregulada à infecção',
            'Bacteremia com febre > 38,5°C',
            'Choque séptico com necessidade de vasopressor'
        ],
        correct: 1,
        explanation: 'Sepsis-3 (JAMA 2016) define sepse como "disfunção orgânica ameaçadora da vida causada por resposta desregulada do hospedeiro à infecção". Abandona os critérios SIRS como definidores e usa o SOFA score.'
    },
    {
        category: 'infecto',
        question: 'Paciente com febre, manchas dormentes na pele e espessamento de nervos periféricos. Qual a doença?',
        options: [
            'Lúpus eritematoso',
            'Hanseníase (doença de Hansen)',
            'Esclerose múltipla',
            'Vitiligo'
        ],
        correct: 1,
        explanation: 'Manchas com alteração de sensibilidade + espessamento neural são patognomônicos de hanseníase (Mycobacterium leprae). O Ministério da Saúde reforça que é uma doença curável com tratamento poliquimioterápico.'
    },
    {
        category: 'infecto',
        question: 'Qual parâmetro laboratorial é mais útil para diferenciar infecção bacteriana de viral?',
        options: [
            'Hemoglobina',
            'Procalcitonina (PCT)',
            'Plaquetas',
            'Creatinina'
        ],
        correct: 1,
        explanation: 'A procalcitonina eleva-se preferencialmente em infecções bacterianas e permanece baixa em virais (Harrison). PCR também é útil, mas menos específica. PCT auxilia na decisão de iniciar/suspender antibióticos.'
    },

    // === ENDÓCRINO ===
    {
        category: 'endocrino',
        question: 'Quais são os 4P\'s clássicos do diabetes mellitus descompensado?',
        options: [
            'Palidez, palpitação, pressão, peso',
            'Poliúria, polidipsia, polifagia e perda de peso',
            'Prurido, parestesia, ptose, paralisia',
            'Palpitação, palidez, poliúria, ptose'
        ],
        correct: 1,
        explanation: 'Os 4P\'s do diabetes: Poliúria (excesso de urina), Polidipsia (sede intensa), Polifagia (fome excessiva) e Perda de peso inexplicada (Harrison, Cap. Diabetes Mellitus).'
    },
    {
        category: 'endocrino',
        question: 'Na tempestade tireoidiana (crise tireotóxica), qual a mortalidade mesmo com tratamento?',
        options: [
            '< 1%',
            '8-25%',
            '50-70%',
            '> 90%'
        ],
        correct: 1,
        explanation: 'A tempestade tireoidiana tem mortalidade de 8-25% mesmo com tratamento adequado (Harrison). Apresenta-se com febre alta, taquicardia/arritmia, confusão mental e sintomas GI. É uma emergência endocrinológica.'
    },
    {
        category: 'endocrino',
        question: 'Paciente com hipotensão, fadiga crônica, hiperpigmentação cutânea e náusea. Qual a suspeita?',
        options: [
            'Hipotireoidismo',
            'Insuficiência adrenal (Doença de Addison)',
            'Diabetes tipo 2',
            'Síndrome de Cushing'
        ],
        correct: 1,
        explanation: 'A tríade hipotensão + hiperpigmentação + fadiga é clássica da insuficiência adrenal primária (Doença de Addison). A hiperpigmentação ocorre pelo excesso de ACTH estimulando melanócitos (Harrison, Cap. Adrenal).'
    },
    {
        category: 'endocrino',
        question: 'Qual a diferença entre cetoacidose diabética (CAD) e estado hiperglicêmico hiperosmolar (EHH)?',
        options: [
            'CAD tem glicemia > 600; EHH tem glicemia < 300',
            'CAD predomina no DM1 com cetose; EHH predomina no DM2 sem cetose significativa',
            'São condições idênticas com nomenclaturas diferentes',
            'CAD tem alcalose; EHH tem acidose'
        ],
        correct: 1,
        explanation: 'CAD: mais comum no DM1, com acidose e cetose (pH < 7,3, cetonas +++). EHH: mais comum no DM2, sem cetose significativa, com hiperosmolalidade e desidratação extrema (Harrison). Ambos são emergências.'
    },
    {
        category: 'endocrino',
        question: 'Paciente com ganho de peso, intolerância ao frio, constipação e bradicardia. Qual exame confirma o diagnóstico?',
        options: [
            'Hemograma completo',
            'TSH e T4 livre',
            'Glicemia de jejum',
            'Cortisol sérico matinal'
        ],
        correct: 1,
        explanation: 'Os sintomas sugerem hipotireoidismo. O diagnóstico é confirmado por TSH elevado + T4 livre baixo (hipotireoidismo primário) (Harrison, Cap. Tireoide). TSH é o exame de rastreamento mais sensível.'
    },

    // === GASTROINTESTINAL ===
    {
        category: 'gastrointestinal',
        question: 'Na avaliação de abdome agudo, o que significa "abdome em tábua"?',
        options: [
            'Distensão abdominal por gases',
            'Rigidez involuntária da parede abdominal por peritonite',
            'Dor à palpação superficial',
            'Ascite tensa'
        ],
        correct: 1,
        explanation: '"Abdome em tábua" refere-se à rigidez muscular involuntária e generalizada — indica peritonite por irritação do peritônio (perfuração visceral, por exemplo). É indicação cirúrgica de emergência (Harrison, Cap. Abdome Agudo).'
    },
    {
        category: 'gastrointestinal',
        question: 'Qual a localização clássica da dor na apendicite aguda e sua migração?',
        options: [
            'Inicia no epigástrio e migra para hipocôndrio esquerdo',
            'Inicia periumbilical e migra para fossa ilíaca direita',
            'Inicia no flanco direito e migra para região lombar',
            'Inicia difusa e permanece difusa'
        ],
        correct: 1,
        explanation: 'A dor da apendicite tipicamente inicia periumbilical (dor visceral) e depois migra para a fossa ilíaca direita (ponto de McBurney — dor parietal) (Harrison, Cap. Apendicite). Esta migração é altamente sugestiva.'
    },
    {
        category: 'gastrointestinal',
        question: 'Paciente com icterícia, urina escura (colúria) e fezes claras (acolia). Qual o padrão?',
        options: [
            'Icterícia hemolítica (pré-hepática)',
            'Icterícia obstrutiva (pós-hepática)',
            'Icterícia hepatocelular',
            'Síndrome de Gilbert'
        ],
        correct: 1,
        explanation: 'Icterícia + colúria + acolia = padrão obstrutivo (colestático). Indica obstrução biliar (cálculo, tumor de cabeça de pâncreas, colangiocarcinoma) impedindo a bilirrubina de chegar ao intestino (Harrison).'
    },
    {
        category: 'gastrointestinal',
        question: 'Na pancreatite aguda, qual é o sinal de Cullen?',
        options: [
            'Dor em barra no abdome superior',
            'Equimose periumbilical (sangramento retroperitoneal)',
            'Rebote positivo em FID',
            'Distensão abdominal com timpanismo'
        ],
        correct: 1,
        explanation: 'O sinal de Cullen é equimose periumbilical que indica hemorragia retroperitoneal — visto na pancreatite necro-hemorrágica grave. O sinal de Grey-Turner é equimose nos flancos, com o mesmo significado (Harrison).'
    },
    {
        category: 'gastrointestinal',
        question: 'Paciente com diarreia sanguinolenta, dor abdominal em cólica e perda de peso crônica. Qual a principal hipótese?',
        options: [
            'Síndrome do intestino irritável',
            'Doença inflamatória intestinal (retocolite ulcerativa ou Crohn)',
            'Gastroenterite viral',
            'Intolerância à lactose'
        ],
        correct: 1,
        explanation: 'Diarreia com sangue + dor abdominal + perda de peso crônica é o padrão clássico de doença inflamatória intestinal (Harrison). A retocolite ulcerativa causa diarreia mucossanguinolenta; o Crohn pode afetar qualquer segmento do TGI.'
    },

    // === PROTOCOLO DE MANCHESTER ===
    {
        category: 'manchester',
        question: 'No Protocolo de Manchester, quais são as 5 categorias de classificação de risco por cores?',
        options: [
            'Branco, azul, verde, amarelo, vermelho',
            'Vermelho (emergência), laranja (muito urgente), amarelo (urgente), verde (pouco urgente), azul (não urgente)',
            'Preto, vermelho, amarelo, verde, branco',
            'Vermelho, amarelo, verde, azul, cinza'
        ],
        correct: 1,
        explanation: 'O Protocolo de Manchester classifica em 5 níveis: Vermelho (emergência, 0 min), Laranja (muito urgente, 10 min), Amarelo (urgente, 60 min), Verde (pouco urgente, 120 min) e Azul (não urgente, 240 min).'
    },
    {
        category: 'manchester',
        question: 'Paciente classificado como "Laranja" no Protocolo de Manchester deve ser atendido em até:',
        options: [
            '0 minutos (imediato)',
            '10 minutos',
            '60 minutos',
            '120 minutos'
        ],
        correct: 1,
        explanation: 'A classificação Laranja (muito urgente) determina atendimento em até 10 minutos. Exemplos: dor torácica aguda, comprometimento vascular de membro, déficit neurológico agudo.'
    },
    {
        category: 'manchester',
        question: 'No Protocolo de Manchester, qual é o discriminador-chave que define classificação VERMELHA (emergência)?',
        options: [
            'Dor moderada com mais de 24h de evolução',
            'Comprometimento de via aérea, choque ou inconsciência',
            'Febre acima de 38°C',
            'Sangramento nasal autolimitado'
        ],
        correct: 1,
        explanation: 'Classificação Vermelha (emergência) = risco de morte iminente. Discriminadores: obstrução de via aérea, respiração inadequada, choque, convulsão ativa, inconsciência (Protocolo de Manchester).'
    },
    {
        category: 'manchester',
        question: 'Em qual cor do Manchester se enquadra um paciente com dor intensa (8-10/10) mas sem sinais de gravidade vital?',
        options: [
            'Vermelho — emergência',
            'Laranja — muito urgente',
            'Amarelo — urgente',
            'Verde — pouco urgente'
        ],
        correct: 1,
        explanation: 'Dor intensa (severa) é um discriminador "Laranja" (muito urgente) no Protocolo de Manchester, mesmo sem outros sinais de gravidade — atendimento em até 10 minutos.'
    },
    {
        category: 'manchester',
        question: 'Qual dos seguintes pacientes seria classificado como VERDE (pouco urgente) no Manchester?',
        options: [
            'Paciente com dor torácica de início há 1 hora',
            'Paciente com febre 38.5°C, coriza e tosse há 3 dias, estável',
            'Paciente com cefaleia súbita intensa',
            'Paciente com confusão mental aguda'
        ],
        correct: 1,
        explanation: 'Paciente com quadro viral estável (febre baixa, coriza, tosse), sem sinais de alarme, é classificado como Verde (pouco urgente) — atendimento em até 120 minutos (Manchester).'
    }
];

// ============================================================
// DEFINIÇÃO DOS TESTES (agrupamentos de questões)
// ============================================================
const quizSets = [
    {
        id: 'urgencias-harrison',
        title: 'Urgências e Emergências',
        description: 'Red flags e sinais de alarme — Harrison',
        category: 'urgencia',
        icon: '🚨',
        questionCount: 5
    },
    {
        id: 'cardiovascular-harrison',
        title: 'Sistema Cardiovascular',
        description: 'IAM, TEP, arritmias e crises hipertensivas',
        category: 'cardiovascular',
        icon: '❤️',
        questionCount: 5
    },
    {
        id: 'neurologico-harrison',
        title: 'Neurologia e AVC',
        description: 'AVC, meningite, síncope e sinais neurológicos',
        category: 'neurologico',
        icon: '🧠',
        questionCount: 5
    },
    {
        id: 'respiratorio-harrison',
        title: 'Sistema Respiratório',
        description: 'TEP, asma grave, insuficiência respiratória',
        category: 'respiratorio',
        icon: '🫁',
        questionCount: 5
    },
    {
        id: 'infecto-harrison',
        title: 'Infectologia e Sepse',
        description: 'Dengue, sepse, meningococcemia e hanseníase',
        category: 'infecto',
        icon: '🦟',
        questionCount: 5
    },
    {
        id: 'endocrino-harrison',
        title: 'Endocrinologia',
        description: 'Diabetes, tireoide, adrenal e emergências metabólicas',
        category: 'endocrino',
        icon: '⚖️',
        questionCount: 5
    },
    {
        id: 'gastrointestinal-harrison',
        title: 'Gastrointestinal e Abdome Agudo',
        description: 'Apendicite, pancreatite, DII e peritonite',
        category: 'gastrointestinal',
        icon: '🫃',
        questionCount: 5
    },
    {
        id: 'manchester-protocolo',
        title: 'Protocolo de Manchester',
        description: 'Classificação de risco, cores e discriminadores',
        category: 'manchester',
        icon: '🏥',
        questionCount: 5
    }
];

// ============================================================
// LÓGICA DO QUIZ
// ============================================================
let currentQuiz = null;
let currentQuestionIndex = 0;
let currentQuestions = [];
let userAnswers = [];

function initQuiz() {
    renderQuizList('all');

    // Filtro por categorias
    document.querySelectorAll('.quiz-cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.quiz-cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderQuizList(btn.dataset.category);
        });
    });

    // Botão próxima questão
    document.getElementById('quiz-next-btn').addEventListener('click', nextQuestion);

    // Botões de resultado
    document.getElementById('quiz-retry-btn').addEventListener('click', retryQuiz);
    document.getElementById('quiz-back-btn').addEventListener('click', backToList);
}

function renderQuizList(category) {
    const listEl = document.getElementById('quiz-list');
    const filtered = category === 'all' ? quizSets : quizSets.filter(q => q.category === category);

    listEl.innerHTML = filtered.map(quiz => `
        <div class="quiz-card" data-quiz-id="${quiz.id}">
            <div class="quiz-card-icon">${quiz.icon}</div>
            <div class="quiz-card-content">
                <h3>${quiz.title}</h3>
                <p>${quiz.description}</p>
                <span class="quiz-card-meta">${quiz.questionCount} questões</span>
            </div>
            <button class="quiz-start-btn" data-quiz-id="${quiz.id}">Iniciar →</button>
        </div>
    `).join('');

    listEl.querySelectorAll('.quiz-start-btn').forEach(btn => {
        btn.addEventListener('click', () => startQuiz(btn.dataset.quizId));
    });

    // Mostrar lista, esconder quiz ativo
    document.getElementById('quiz-list').classList.remove('hidden');
    document.getElementById('quiz-active').classList.add('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
}

function startQuiz(quizId) {
    const quizSet = quizSets.find(q => q.id === quizId);
    if (!quizSet) return;

    currentQuiz = quizSet;
    currentQuestionIndex = 0;
    userAnswers = [];

    // Filtrar e embaralhar questões da categoria
    const categoryQuestions = quizBank.filter(q => q.category === quizSet.category);
    currentQuestions = shuffleArray(categoryQuestions).slice(0, quizSet.questionCount);

    // Mostrar quiz, esconder lista
    document.getElementById('quiz-list').classList.add('hidden');
    document.getElementById('quiz-active').classList.remove('hidden');
    document.getElementById('quiz-result').classList.add('hidden');

    renderQuestion();
}

function renderQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    const total = currentQuestions.length;

    // Progress
    document.getElementById('quiz-progress-text').textContent = `Questão ${currentQuestionIndex + 1} de ${total}`;
    document.getElementById('quiz-progress-fill').style.width = `${((currentQuestionIndex + 1) / total) * 100}%`;

    // Questão
    document.getElementById('quiz-question').textContent = question.question;

    // Opções (embaralhar ordem mas manter referência do correto)
    const optionsEl = document.getElementById('quiz-options');
    const optionIndices = [...Array(question.options.length).keys()];
    const shuffledIndices = shuffleArray(optionIndices);

    optionsEl.innerHTML = shuffledIndices.map(idx => `
        <button class="quiz-option-btn" data-index="${idx}">
            <span class="option-letter">${String.fromCharCode(65 + shuffledIndices.indexOf(idx))}</span>
            ${question.options[idx]}
        </button>
    `).join('');

    optionsEl.querySelectorAll('.quiz-option-btn').forEach(btn => {
        btn.addEventListener('click', () => selectAnswer(parseInt(btn.dataset.index)));
    });

    // Esconder feedback e botão próxima
    document.getElementById('quiz-feedback').classList.add('hidden');
    document.getElementById('quiz-next-btn').classList.add('hidden');
}

function selectAnswer(selectedIndex) {
    const question = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;

    userAnswers.push({ questionIndex: currentQuestionIndex, selected: selectedIndex, correct: isCorrect });

    // Destacar resposta correta/incorreta
    const optionBtns = document.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => {
        btn.disabled = true;
        const idx = parseInt(btn.dataset.index);
        if (idx === question.correct) {
            btn.classList.add('correct');
        } else if (idx === selectedIndex && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });

    // Feedback
    const feedbackEl = document.getElementById('quiz-feedback');
    feedbackEl.className = `quiz-feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
    feedbackEl.innerHTML = `
        <strong>${isCorrect ? '✅ Correto!' : '❌ Incorreto'}</strong>
        <p>${question.explanation}</p>
    `;
    feedbackEl.classList.remove('hidden');

    // Botão próxima
    const nextBtn = document.getElementById('quiz-next-btn');
    nextBtn.textContent = currentQuestionIndex < currentQuestions.length - 1 ? 'Próxima Questão →' : 'Ver Resultado';
    nextBtn.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        renderQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-active').classList.add('hidden');
    document.getElementById('quiz-result').classList.remove('hidden');

    const correctCount = userAnswers.filter(a => a.correct).length;
    const total = currentQuestions.length;
    const percent = Math.round((correctCount / total) * 100);

    let grade, gradeClass;
    if (percent >= 80) { grade = 'Excelente!'; gradeClass = 'grade-excellent'; }
    else if (percent >= 60) { grade = 'Bom!'; gradeClass = 'grade-good'; }
    else if (percent >= 40) { grade = 'Regular'; gradeClass = 'grade-regular'; }
    else { grade = 'Precisa Estudar Mais'; gradeClass = 'grade-poor'; }

    document.getElementById('quiz-result-title').textContent = `${currentQuiz.icon} ${currentQuiz.title}`;
    document.getElementById('quiz-result-title').className = gradeClass;
    document.getElementById('quiz-result-score').innerHTML = `
        <span class="score-number ${gradeClass}">${correctCount}/${total}</span> — ${grade} (${percent}%)
    `;

    // Detalhes
    const detailsEl = document.getElementById('quiz-result-details');
    detailsEl.innerHTML = userAnswers.map((ans, i) => {
        const q = currentQuestions[i];
        return `
            <div class="result-item ${ans.correct ? 'result-correct' : 'result-incorrect'}">
                <span class="result-icon">${ans.correct ? '✅' : '❌'}</span>
                <span class="result-text">${q.question.substring(0, 80)}...</span>
            </div>
        `;
    }).join('');
}

function retryQuiz() {
    startQuiz(currentQuiz.id);
}

function backToList() {
    currentQuiz = null;
    currentQuestions = [];
    userAnswers = [];
    const activeCategory = document.querySelector('.quiz-cat-btn.active');
    renderQuizList(activeCategory ? activeCategory.dataset.category : 'all');
}

// Utilidade
function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

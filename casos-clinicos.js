/**
 * Casos Clínicos Simulados — Raciocínio Clínico Integrado
 * 
 * O estudante recebe um cenário completo e deve:
 * 1. Classificar o risco (Manchester)
 * 2. Fazer hipótese diagnóstica
 * 3. Definir a conduta inicial
 */

document.addEventListener('DOMContentLoaded', function() {
    initCasosClinicos();
});

const casosClinicos = [
    {
        id: 'caso1',
        title: 'Dor Torácica no Jovem',
        difficulty: 'Intermediário',
        icon: '💔',
        scenario: 'Homem, 55 anos, tabagista, hipertenso em uso de Losartana. Chega à emergência com dor retroesternal em aperto há 40 minutos, irradiando para braço esquerdo e mandíbula. Sudorese profusa e náusea. PA: 90/60 mmHg, FC: 110 bpm, SpO2: 94%.',
        vitals: { pa: '90/60', fc: '110', fr: '22', spo2: '94%', temp: '36.2°C' },
        questions: [
            {
                question: 'Qual a classificação de risco (Manchester)?',
                options: ['🟢 Verde — Pouco urgente', '🟡 Amarelo — Urgente', '🟠 Laranja — Muito urgente', '🔴 Vermelho — Emergência'],
                correct: 3,
                explanation: 'Dor torácica + instabilidade hemodinâmica (PAS 90) = Classificação VERMELHA (emergência). Atendimento imediato.'
            },
            {
                question: 'Qual a principal hipótese diagnóstica?',
                options: ['DRGE com esofagite', 'IAM com Supra ST (IAMCSST) com choque cardiogênico', 'Pneumotórax espontâneo', 'Crise de pânico'],
                correct: 1,
                explanation: 'Dor anginosa típica (retroesternal, aperto, irradiação MSE e mandíbula) + fatores de risco (tabagismo, HAS, homem > 50) + instabilidade hemodinâmica = IAM com provável choque cardiogênico.'
            },
            {
                question: 'Qual a conduta imediata prioritária?',
                options: ['Omeprazol IV + dieta zero', 'AAS + ECG 12 derivações + Reperfusão (angioplastia primária)', 'Benzodiazepínico + observação', 'Rx tórax + alta com Dipirona'],
                correct: 1,
                explanation: 'AAS 300mg mastigado + ECG em ≤ 10 minutos. Se supra ST: ativar protocolo de reperfusão (angioplastia primária em < 90 min). Volume cauteloso (instável) + noradrenalina se choque. Balão intra-aórtico se refratário.'
            }
        ]
    },
    {
        id: 'caso2',
        title: 'Febre e Confusão no Idoso',
        difficulty: 'Avançado',
        icon: '🦠',
        scenario: 'Mulher, 78 anos, diabética, trazida por familiares com "confusão" há 12h. Tinha queixa de disúria há 3 dias. Ao exame: desorientada no tempo e espaço, PA: 85/50 mmHg, FC: 120 bpm, FR: 26 irpm, T: 38.9°C, SpO2: 91% em AA. Extremidades frias e mosqueadas.',
        vitals: { pa: '85/50', fc: '120', fr: '26', spo2: '91%', temp: '38.9°C' },
        questions: [
            {
                question: 'O qSOFA desta paciente é:',
                options: ['0 (nenhum critério)', '1 (um critério)', '2 (dois critérios)', '3 (três critérios)'],
                correct: 3,
                explanation: 'PAS ≤ 100 ✓, FR ≥ 22 ✓, Alteração mental (Glasgow < 15) ✓ = qSOFA 3/3. Altíssimo risco de sepse com disfunção orgânica.'
            },
            {
                question: 'Qual o diagnóstico mais provável?',
                options: ['AVC isquêmico', 'Choque séptico de foco urinário', 'Cetoacidose diabética', 'Hipotireoidismo grave'],
                correct: 1,
                explanation: 'ITU (disúria prévia) → sepse (qSOFA 3) → choque séptico (hipotensão + sinais de hipoperfusão: extremidades frias e mosqueadas). Foco urinário é o mais comum em idosas.'
            },
            {
                question: 'Qual a conduta nas primeiras horas (Surviving Sepsis Campaign)?',
                options: [
                    'Antibiótico oral + retorno em 48h',
                    'Ressuscitação volêmica (30mL/kg) + antibiótico IV na 1ª hora + lactato + hemoculturas',
                    'TC de crânio + tPA intravenoso',
                    'Insulina IV + reposição de potássio'
                ],
                correct: 1,
                explanation: 'Bundle da 1ª hora (SSC): Medir lactato, hemoculturas antes do ATB, antibiótico IV empírico de amplo espectro em ≤ 1h, cristaloide 30mL/kg se hipotensão/lactato ≥ 4. Se refratário ao volume: Noradrenalina (alvo PAM ≥ 65).'
            }
        ]
    },
    {
        id: 'caso3',
        title: 'Cefaleia Súbita Intensa',
        difficulty: 'Intermediário',
        icon: '🧠',
        scenario: 'Mulher, 42 anos, previamente hígida. Apresenta cefaleia de início súbito ("estalo") enquanto se exercitava, descrita como "a pior dor de cabeça da minha vida". Vômitos em jato. PA: 180/100, FC: 88, rigidez de nuca ao exame. Glasgow 14 (confusa mas obedece comandos).',
        vitals: { pa: '180/100', fc: '88', fr: '18', spo2: '98%', temp: '36.8°C' },
        questions: [
            {
                question: 'Qual a principal hipótese diagnóstica?',
                options: ['Enxaqueca com aura', 'Hemorragia Subaracnoidea (HSA)', 'Cefaleia tensional', 'Meningite viral'],
                correct: 1,
                explanation: 'Cefaleia "thunderclap" (pior da vida, início em segundos) + rigidez de nuca + vômitos + HAS reativa = HSA até prova contrária. Causa mais comum: ruptura de aneurisma cerebral.'
            },
            {
                question: 'Qual exame deve ser solicitado PRIMEIRO?',
                options: ['RM de crânio com gadolínio', 'TC de crânio SEM contraste', 'Punção lombar imediata', 'Eletroencefalograma'],
                correct: 1,
                explanation: 'TC sem contraste tem sensibilidade > 95% para HSA nas primeiras 6h (detecta sangue no espaço subaracnoide). Se TC normal + alta suspeita: PL (xantocromia confirma). RM é menos sensível na fase aguda.'
            },
            {
                question: 'Qual medicamento é fundamental para prevenir vasoespasmo na HSA confirmada?',
                options: ['Dexametasona', 'Nimodipino', 'Heparina', 'Manitol'],
                correct: 1,
                explanation: 'Nimodipino 60mg VO 4/4h por 21 dias — reduz vasoespasmo cerebral (principal causa de morbimortalidade tardia na HSA). Controle de PA (PAS < 160 antes do tratamento do aneurisma). Neurocirurgia para clipagem ou embolização.'
            }
        ]
    },
    {
        id: 'caso4',
        title: 'Dispneia + Edema na Gestante',
        difficulty: 'Avançado',
        icon: '🤰',
        scenario: 'Mulher, 28 anos, 34 semanas de gestação, primigesta. Apresenta dispneia progressiva há 2 dias, edema de MMII e face, PA: 170/110, FC: 100, proteinúria +++ na fita, cefaleia frontal + escotomas visuais. Reflexos patelares exaltados (+++/++++). Peso aumentou 4kg na última semana.',
        vitals: { pa: '170/110', fc: '100', fr: '22', spo2: '96%', temp: '36.5°C' },
        questions: [
            {
                question: 'Qual o diagnóstico?',
                options: ['ICC descompensada', 'Pré-eclâmpsia grave / Iminência de eclâmpsia', 'Pneumonia na gestação', 'TEP gestacional'],
                correct: 1,
                explanation: 'PA ≥ 160/110 + proteinúria + edema + cefaleia + escotomas + hiperreflexia em gestante > 20 semanas = Pré-eclâmpsia grave com sinais de iminência de eclâmpsia (convulsão iminente).'
            },
            {
                question: 'Qual medicamento é prioritário para prevenir a eclâmpsia?',
                options: ['Furosemida IV', 'Sulfato de Magnésio (MgSO4)', 'Diazepam IV', 'Captopril VO'],
                correct: 1,
                explanation: 'MgSO4 (esquema Zuspan ou Pritchard) é a droga de escolha para profilaxia e tratamento de eclâmpsia. Anti-hipertensivo: Hidralazina IV ou Nifedipino VO (IECA e BRA são CONTRAINDICADOS na gestação). Planejar parto.'
            },
            {
                question: 'Qual a conduta obstétrica definitiva na pré-eclâmpsia grave com IG > 34 semanas?',
                options: ['Repouso + observação até 40 semanas', 'Resolução da gestação (parto)', 'Apenas anti-hipertensivo e alta', 'Corticoide e aguardar 37 semanas'],
                correct: 1,
                explanation: 'Na pré-eclâmpsia grave com ≥ 34 semanas: resolução da gestação (parto) é o tratamento definitivo, após estabilização materna com MgSO4 + anti-hipertensivo. Antes de 34 semanas: avaliar corticoide para maturação fetal.'
            }
        ]
    },
    {
        id: 'caso5',
        title: 'Dor Abdominal + Defesa',
        difficulty: 'Básico',
        icon: '🫃',
        scenario: 'Homem, 22 anos, previamente hígido. Dor abdominal que iniciou periumbilical há 12h e migrou para fossa ilíaca direita. Náusea, um episódio de vômito, inapetência. T: 37.8°C, FC: 92, PA: 125/80. Ao exame: defesa em FID, Blumberg positivo, sinal de Rovsing positivo.',
        vitals: { pa: '125/80', fc: '92', fr: '18', spo2: '99%', temp: '37.8°C' },
        questions: [
            {
                question: 'Qual o diagnóstico mais provável?',
                options: ['Gastroenterite aguda', 'Apendicite aguda', 'Cólica renal direita', 'Diverticulite'],
                correct: 1,
                explanation: 'Dor periumbilical → FID (migração clássica) + náusea + febre baixa + Blumberg + (McBurney) + Rovsing positivo = Apendicite aguda. Idade jovem e quadro clínico típico.'
            },
            {
                question: 'Qual exame confirmatório e qual o achado esperado?',
                options: [
                    'Endoscopia: úlcera perfurada',
                    'TC abdome: apêndice > 6mm, borramento de gordura periapendicular',
                    'Rx abdome: níveis hidroaéreos',
                    'USG renal: cálculo ureteral'
                ],
                correct: 1,
                explanation: 'TC de abdome é o padrão-ouro: apêndice dilatado (> 6mm), espessamento parietal, borramento de gordura ao redor, +/- apendicolito. USG pode ser usada em jovens/gestantes (sensibilidade menor).'
            },
            {
                question: 'Qual a conduta definitiva?',
                options: [
                    'Antibiótico oral + alta',
                    'Apendicectomia (laparoscópica de preferência)',
                    'Observação com jejum por 72h',
                    'Colonoscopia diagnóstica'
                ],
                correct: 1,
                explanation: 'Apendicectomia (preferencialmente laparoscópica) é o tratamento definitivo. Antibiótico profilático pré-operatório. Se apendicite complicada (abscesso): drenar + ATB, cirurgia em 6-8 semanas (apendicectomia de intervalo).'
            }
        ]
    }
];

// ============================================================
// LÓGICA
// ============================================================
let currentCase = null;
let caseQuestionIndex = 0;
let caseAnswers = [];

function initCasosClinicos() {
    renderCasesList();
}

function renderCasesList() {
    const listEl = document.getElementById('cases-list');
    if (!listEl) return;

    listEl.innerHTML = casosClinicos.map(c => `
        <div class="case-card">
            <div class="case-card-icon">${c.icon}</div>
            <div class="case-card-content">
                <h3>${c.title}</h3>
                <span class="case-difficulty case-diff-${c.difficulty.toLowerCase()}">${c.difficulty}</span>
            </div>
            <button class="case-start-btn" data-case-id="${c.id}">Iniciar Caso →</button>
        </div>
    `).join('');

    listEl.querySelectorAll('.case-start-btn').forEach(btn => {
        btn.addEventListener('click', () => startCase(btn.dataset.caseId));
    });

    listEl.classList.remove('hidden');
    document.getElementById('cases-active').classList.add('hidden');
}

function startCase(caseId) {
    currentCase = casosClinicos.find(c => c.id === caseId);
    if (!currentCase) return;
    caseQuestionIndex = 0;
    caseAnswers = [];

    document.getElementById('cases-list').classList.add('hidden');
    const activeEl = document.getElementById('cases-active');
    activeEl.classList.remove('hidden');
    renderCaseScenario();
}

function renderCaseScenario() {
    const activeEl = document.getElementById('cases-active');
    activeEl.innerHTML = `
        <div class="case-container">
            <button class="case-back-btn" onclick="renderCasesList()">← Voltar</button>
            <div class="case-scenario">
                <h3>${currentCase.icon} ${currentCase.title}</h3>
                <div class="case-scenario-text">
                    <p>${currentCase.scenario}</p>
                </div>
                <div class="case-vitals">
                    <span>PA: <strong>${currentCase.vitals.pa}</strong></span>
                    <span>FC: <strong>${currentCase.vitals.fc}</strong></span>
                    <span>FR: <strong>${currentCase.vitals.fr}</strong></span>
                    <span>SpO2: <strong>${currentCase.vitals.spo2}</strong></span>
                    <span>T: <strong>${currentCase.vitals.temp}</strong></span>
                </div>
            </div>
            <div id="case-question-area"></div>
        </div>
    `;
    renderCaseQuestion();
}

function renderCaseQuestion() {
    const area = document.getElementById('case-question-area');
    const q = currentCase.questions[caseQuestionIndex];

    area.innerHTML = `
        <div class="case-q-box">
            <p class="case-q-number">Questão ${caseQuestionIndex + 1} de ${currentCase.questions.length}</p>
            <p class="case-q-text">${q.question}</p>
            <div class="case-options">
                ${q.options.map((opt, idx) => `
                    <button class="case-option-btn" data-idx="${idx}">${opt}</button>
                `).join('')}
            </div>
            <div id="case-feedback" class="case-feedback hidden"></div>
            <button id="case-next" class="case-next-btn hidden">Próxima →</button>
        </div>
    `;

    area.querySelectorAll('.case-option-btn').forEach(btn => {
        btn.addEventListener('click', () => selectCaseAnswer(parseInt(btn.dataset.idx)));
    });
}

function selectCaseAnswer(idx) {
    const q = currentCase.questions[caseQuestionIndex];
    const isCorrect = idx === q.correct;
    caseAnswers.push(isCorrect);

    const btns = document.querySelectorAll('.case-option-btn');
    btns.forEach(btn => {
        btn.disabled = true;
        const i = parseInt(btn.dataset.idx);
        if (i === q.correct) btn.classList.add('correct');
        else if (i === idx && !isCorrect) btn.classList.add('incorrect');
    });

    const feedback = document.getElementById('case-feedback');
    feedback.className = `case-feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
    feedback.innerHTML = `<strong>${isCorrect ? '✅ Correto!' : '❌ Incorreto'}</strong><p>${q.explanation}</p>`;
    feedback.classList.remove('hidden');

    const nextBtn = document.getElementById('case-next');
    nextBtn.textContent = caseQuestionIndex < currentCase.questions.length - 1 ? 'Próxima →' : 'Ver Resultado';
    nextBtn.classList.remove('hidden');
    nextBtn.onclick = () => {
        caseQuestionIndex++;
        if (caseQuestionIndex < currentCase.questions.length) {
            renderCaseQuestion();
        } else {
            showCaseResult();
        }
    };
}

function showCaseResult() {
    const correct = caseAnswers.filter(a => a).length;
    const total = caseAnswers.length;
    const percent = Math.round((correct / total) * 100);
    let grade, cls;
    if (percent === 100) { grade = 'Excelente! Conduta perfeita.'; cls = 'grade-excellent'; }
    else if (percent >= 66) { grade = 'Bom raciocínio clínico!'; cls = 'grade-good'; }
    else { grade = 'Revise os protocolos.'; cls = 'grade-poor'; }

    const activeEl = document.getElementById('cases-active');
    activeEl.innerHTML = `
        <div class="case-container case-result-box">
            <h3>${currentCase.icon} ${currentCase.title} — Resultado</h3>
            <p class="case-score ${cls}">${correct}/${total} — ${grade} (${percent}%)</p>
            <div class="case-result-actions">
                <button class="case-retry-btn" onclick="startCase('${currentCase.id}')">↺ Refazer</button>
                <button class="case-back-final-btn" onclick="renderCasesList()">← Outros Casos</button>
            </div>
        </div>
    `;
}

/**
 * Simulador de Plantão — Casos multi-etapas com revelação progressiva
 * Inspirado no SimulaMax, sem IA — lógica de árvore de decisões
 */
document.addEventListener('DOMContentLoaded', function() { initPlantao(); });

// ============================================================
// BANCO DE CASOS DO PLANTÃO
// ============================================================
const plantaoCases = [
{
    id: 'iam_plantao',
    title: 'Dor Torácica no Homem de 58 anos',
    difficulty: 'Intermediário',
    specialty: 'Cardiologia / Emergência',
    icon: '💔',
    steps: [
        {
            type: 'info',
            title: '📋 Chamado',
            text: 'São 23h. Você é o plantonista da emergência. A recepção avisa: "Homem de 58 anos, com dor no peito forte, está suando muito."'
        },
        {
            type: 'choice',
            title: '🩺 Primeira Ação',
            text: 'O paciente chega carregado pela esposa, pálido e sudoreico. O que você faz PRIMEIRO?',
            options: [
                { text: 'Pedir para esperar na fila de triagem', points: -2, feedback: '❌ Paciente com dor torácica + instabilidade = prioridade ZERO. Nunca esperar fila.' },
                { text: 'Colocar no leito de emergência + monitor + O2 + acesso venoso', points: 3, feedback: '✅ Correto! ABCDE: garantir via aérea, monitorar, acesso venoso. É a primeira ação.' },
                { text: 'Pedir Rx de tórax e exames de sangue', points: 0, feedback: '⚠️ Exames são importantes, mas ANTES de pedir exames você precisa estabilizar e monitorar o paciente.' },
                { text: 'Dar Dipirona para dor e observar', points: -1, feedback: '❌ Dor torácica não é para analgésico simples. Pode ser infarto — precisa de ECG imediato.' }
            ]
        },
        {
            type: 'info',
            title: '📊 Sinais Vitais',
            text: 'PA: 95/60 mmHg | FC: 110 bpm | FR: 22 irpm | SpO2: 93% | Temp: 36.4°C\n\nPaciente refere dor retroesternal em aperto há 45 minutos, irradiação para braço esquerdo. Sudorese profusa. Tabagista 30 anos, HAS em uso de Losartana.'
        },
        {
            type: 'choice',
            title: '📈 ECG — O que solicitar agora?',
            text: 'O monitor mostra taquicardia sinusal. Qual exame é PRIORITÁRIO neste momento?',
            options: [
                { text: 'ECG de 12 derivações (deve sair em < 10 min)', points: 3, feedback: '✅ Exato! ECG em até 10 minutos da chegada é o padrão-ouro para definir se há supra de ST (IAMCSST).' },
                { text: 'Rx de tórax', points: 0, feedback: '⚠️ Rx é útil, mas o ECG é MAIS URGENTE — define se precisa de cateterismo emergencial.' },
                { text: 'TC de tórax com contraste', points: -1, feedback: '❌ TC é para suspeita de TEP ou dissecção, não para IAM. ECG primeiro.' },
                { text: 'Ecocardiograma', points: 1, feedback: '⚠️ Eco é útil, mas o ECG é mais rápido e define conduta imediata. Eco pode ser feito depois.' }
            ]
        },
        {
            type: 'info',
            title: '📈 Resultado do ECG',
            text: '⚠️ ECG mostra: Supradesnivelamento de ST em V1-V4 (parede anterior) + Infradesnivelamento recíproco em D2, D3, aVF.\n\nTroponina de entrada: 5x o limite superior.\n\nDiagnóstico: IAMCSST anterior.'
        },
        {
            type: 'choice',
            title: '💊 Conduta Imediata',
            text: 'Confirmado IAMCSST. Qual conjunto de medicamentos deve ser dado AGORA?',
            options: [
                { text: 'AAS 300mg VO + Clopidogrel 600mg + Heparina + preparar cateterismo', points: 3, feedback: '✅ Perfeito! Dupla antiagregação + anticoagulação + reperfusão (angioplastia primária < 90min). Padrão-ouro.' },
                { text: 'Apenas AAS e aguardar cardiologista', points: 1, feedback: '⚠️ AAS está certo, mas esperar é perder tempo. O clock está correndo — porta-balão < 90 min.' },
                { text: 'Trombólise com tenecteplase imediatamente', points: 2, feedback: '⚠️ Trombólise é alternativa SE não houver hemodinâmica disponível em 120 min. Se há cateterismo, angioplastia primária é preferível.' },
                { text: 'Anti-inflamatório + opioide para dor + alta', points: -3, feedback: '❌ Gravíssimo erro. IAMCSST é emergência — alta significaria morte provável. Cateterismo de urgência!' }
            ]
        },
        {
            type: 'choice',
            title: '🏥 Reperfusão',
            text: 'Seu hospital tem hemodinâmica 24h. Meta de tempo porta-balão é:',
            options: [
                { text: '< 90 minutos', points: 3, feedback: '✅ Correto! A meta é porta-balão < 90 min (ESC/AHA guidelines). Cada minuto de atraso = mais miocárdio perdido.' },
                { text: '< 6 horas', points: 0, feedback: '❌ 6 horas é o limite máximo, não a meta. Meta é < 90 min (idealmente < 60 min).' },
                { text: '< 24 horas', points: -1, feedback: '❌ 24h é tarde demais para reperfusão primária. O benefício diminui drasticamente após 12h.' },
                { text: 'Não há meta de tempo definida', points: -2, feedback: '❌ Existe sim! Porta-balão < 90 min é uma das métricas mais importantes em cardiologia de emergência.' }
            ]
        },
        {
            type: 'info',
            title: '✅ Desfecho',
            text: '🎉 O paciente foi para a hemodinâmica em 75 minutos. Angioplastia primária com stent em artéria descendente anterior com sucesso. Evolui estável em UTI coronariana. Alta em 5 dias com dupla antiagregação, betabloqueador, IECA e estatina.'
        }
    ]
},
{
    id: 'sepse_plantao',
    title: 'Idosa Confusa com Febre',
    difficulty: 'Avançado',
    specialty: 'Emergência / Infectologia',
    icon: '🦠',
    steps: [
        {
            type: 'info',
            title: '📋 Chamado',
            text: 'Sábado, 14h. Ambulância traz mulher de 72 anos, diabética, com "confusão" há 1 dia. Filha relata que mãe estava com "ardência para urinar" há 5 dias e não procurou médico.'
        },
        {
            type: 'choice',
            title: '🩺 Avaliação Inicial',
            text: 'Paciente chega sonolenta, abrindo olhos ao chamado. Pele mosqueada, extremidades frias. O que avaliar PRIMEIRO?',
            options: [
                { text: 'ABCDE + sinais vitais + glicemia capilar', points: 3, feedback: '✅ Correto! Sempre ABCDE primeiro. Glicemia capilar é obrigatória em todo rebaixamento (excluir hipoglicemia).' },
                { text: 'Pedir TC de crânio para descartar AVC', points: 0, feedback: '⚠️ TC pode ser necessária depois, mas a prioridade é estabilizar. Sem ABCDE primeiro, o paciente pode deteriorar.' },
                { text: 'Exame de urina e urocultura', points: 1, feedback: '⚠️ Importantíssimos para o diagnóstico, mas coleta de culturas vem DEPOIS da estabilização inicial.' },
                { text: 'Chamar a família para mais informações', points: -1, feedback: '❌ Anamnese complementar é válida, mas paciente instável = estabilizar ANTES de colher história.' }
            ]
        },
        {
            type: 'info',
            title: '📊 Sinais Vitais e Glasgow',
            text: 'PA: 78/45 mmHg | FC: 125 bpm | FR: 28 irpm | SpO2: 90% AA | Temp: 39.2°C\nGlasgow: 12 (O3V4M5) | Glicemia: 280 mg/dL\n\nqSOFA: PAS ≤100 ✓ | FR ≥22 ✓ | Glasgow <15 ✓ = 3/3'
        },
        {
            type: 'choice',
            title: '🔬 Diagnóstico Sindrômico',
            text: 'Com qSOFA 3/3, febre, foco urinário provável e sinais de hipoperfusão (mosqueamento, extremidades frias), qual o diagnóstico?',
            options: [
                { text: 'Choque séptico de foco urinário', points: 3, feedback: '✅ Correto! Infecção (ITU não tratada) + disfunção orgânica (confusão, hipotensão) + hipoperfusão = choque séptico. Bundle da 1ª hora!' },
                { text: 'Cetoacidose diabética', points: 0, feedback: '⚠️ Glicemia 280 não é tão alta para CAD (geralmente >300-400) e o quadro é dominado por sepse. Mas monitorar.' },
                { text: 'AVC hemorrágico', points: -1, feedback: '❌ AVC não justifica febre + mosqueamento + hipotensão + foco urinário. O quadro é séptico.' },
                { text: 'Reação alérgica', points: -2, feedback: '❌ Não há histórico de exposição a alérgeno e o padrão é infeccioso (febre + foco).' }
            ]
        },
        {
            type: 'choice',
            title: '💊 Bundle da 1ª Hora (Surviving Sepsis Campaign)',
            text: 'Você confirmou choque séptico. Quais ações devem ser feitas NA PRIMEIRA HORA?',
            options: [
                { text: 'Lactato + hemoculturas + ATB empírico IV + cristaloide 30mL/kg', points: 3, feedback: '✅ Perfeito! Bundle hora-1 (SSC 2021): medir lactato, colher culturas ANTES do ATB, antibiótico IV em ≤1h, volume 30mL/kg se hipotensão/lactato≥4.' },
                { text: 'TC de abdome + parecer da infectologia + antibiótico oral', points: -2, feedback: '❌ Sepse não espera TC nem parecer. ATB deve ser IV (não oral) e em ≤1 hora. Cada hora de atraso aumenta mortalidade em 7%.' },
                { text: 'Apenas soro fisiológico e aguardar exames', points: 0, feedback: '⚠️ Volume está certo, mas sem antibiótico a infecção continua progredindo. Precisa de ATB empírico imediato.' },
                { text: 'Noradrenalina imediata + vasopressina', points: 1, feedback: '⚠️ Vasopressores são indicados SE a hipotensão persistir APÓS volume adequado (30mL/kg). Primeiro: volume + ATB.' }
            ]
        },
        {
            type: 'choice',
            title: '💉 Antibiótico Empírico',
            text: 'Para sepse de foco urinário em idosa diabética, qual antibiótico empírico é mais adequado?',
            options: [
                { text: 'Piperacilina-Tazobactam ou Meropenem (amplo espectro)', points: 3, feedback: '✅ Em sepse/choque séptico com foco urinário em diabética: cobrir gram-negativos (incluindo ESBL). Pipe-Tazo ou Carbapenem são adequados. Descalonar após cultura.' },
                { text: 'Amoxicilina 500mg VO', points: -2, feedback: '❌ Oral é inadequado em choque séptico. Precisa ser IV e de amplo espectro.' },
                { text: 'Azitromicina IV', points: -1, feedback: '❌ Azitromicina cobre atípicos respiratórios, não é boa para foco urinário (gram-negativos).' },
                { text: 'Cefalexina VO', points: -2, feedback: '❌ Oral + espectro estreito = inadequado para choque séptico.' }
            ]
        },
        {
            type: 'info',
            title: '📊 Evolução (2h depois)',
            text: 'Após 2L de SF + Meropenem IV + O2 por máscara:\nPA: 88/55 (ainda hipotenso pós-volume). Lactato: 6,2 (elevado). Diurese: 15mL/h (oligúria).\n\nHipotensão refratária à volume.'
        },
        {
            type: 'choice',
            title: '⚡ Próximo Passo',
            text: 'Hipotensão persistente após ressuscitação volêmica adequada. O que fazer?',
            options: [
                { text: 'Iniciar Noradrenalina (alvo PAM ≥ 65 mmHg)', points: 3, feedback: '✅ Correto! Choque séptico refratário a volume → vasopressor (noradrenalina 1ª linha). Alvo: PAM ≥ 65. Acesso central idealmente.' },
                { text: 'Dar mais 3L de soro rapidamente', points: -1, feedback: '❌ Hipervolemia causa edema pulmonar. Já recebeu 30mL/kg — se não respondeu, é hora de vasopressor.' },
                { text: 'Parar tudo e chamar a família para decisão', points: -2, feedback: '❌ Paciente em choque precisa de tratamento imediato. Comunicar a família é importante, mas não substitui a ação médica.' },
                { text: 'Trocar o antibiótico (pode ser resistente)', points: 0, feedback: '⚠️ A cultura ainda não saiu (leva 48-72h). Trocar ATB agora é prematuro. O problema imediato é hemodinâmico → vasopressor.' }
            ]
        },
        {
            type: 'info',
            title: '✅ Desfecho',
            text: '🎉 Noradrenalina iniciada, PAM subiu para 68 mmHg. Transferida para UTI. Urocultura: E. coli ESBL — Meropenem mantido. Desmame de vasopressor em 48h. Alta da UTI em 5 dias. Alta hospitalar em 10 dias com orientações.'
        }
    ]
},
{
    id: 'dispneia_plantao',
    title: 'Jovem com Falta de Ar Súbita',
    difficulty: 'Intermediário',
    specialty: 'Pneumologia / Emergência',
    icon: '🫁',
    steps: [
        {
            type: 'info',
            title: '📋 Chamado',
            text: 'Terça-feira, 10h. Mulher de 32 anos chega andando na emergência, muito dispneica, segurando o peito do lado direito. Relata que a dor começou há 2h, de repente, enquanto trabalhava no escritório.'
        },
        {
            type: 'choice',
            title: '🩺 Anamnese Dirigida',
            text: 'A paciente consegue falar frases curtas. Qual pergunta é MAIS IMPORTANTE agora?',
            options: [
                { text: 'Usou anticoncepcional? Fez viagem longa? Cirurgia recente? Dor na perna?', points: 3, feedback: '✅ Excelente! Em mulher jovem + dispneia súbita + dor pleurítica: fatores de risco para TEP (ACO, imobilização, TVP) são a pergunta-chave.' },
                { text: 'Tem alergia a algum medicamento?', points: 0, feedback: '⚠️ Importante para tratamento futuro, mas não ajuda no diagnóstico agora.' },
                { text: 'Já fez cirurgia plástica?', points: -1, feedback: '❌ Irrelevante neste momento. Foco nas causas de dispneia aguda.' },
                { text: 'Tem histórico de ansiedade?', points: -1, feedback: '❌ Ansiedade é diagnóstico de EXCLUSÃO. Com dor pleurítica + dispneia súbita, é preciso descartar TEP e pneumotórax primeiro.' }
            ]
        },
        {
            type: 'info',
            title: '📊 Dados Coletados',
            text: 'PA: 118/72 | FC: 112 bpm | FR: 24 | SpO2: 92% AA | Temp: 36.8°C\n\nHistória: Uso de ACO (anticoncepcional) há 8 anos. Viagem de ônibus (6h) há 10 dias. Nega cirurgias. Nega dor em panturrilha, mas refere leve inchaço na perna direita há 3 dias que "achou normal".\n\nExame: pulmões limpos, leve edema em MID.'
        },
        {
            type: 'choice',
            title: '🧮 Probabilidade Clínica',
            text: 'Com base nos dados, qual escore aplicar e qual a probabilidade de TEP?',
            options: [
                { text: 'Wells para TEP: ACO(+1,5) + FC>100(+1,5) + sinais TVP(+3) + TEP provável(+3) = 9 → ALTA probabilidade', points: 3, feedback: '✅ Correto! Wells > 6 = alta probabilidade. Não precisa de D-dímero — vai direto para AngioTC.' },
                { text: 'CURB-65 para pneumonia', points: -2, feedback: '❌ CURB-65 é para pneumonia. Aqui não há febre, tosse produtiva nem infiltrado. O quadro é de TEP.' },
                { text: 'HEART Score para dor torácica', points: -1, feedback: '❌ HEART é para síndrome coronariana. Dor pleurítica em jovem com FR para TEV não é coronariana.' },
                { text: 'Wells: baixa probabilidade, pedir D-dímero', points: -1, feedback: '❌ Com ACO + viagem + sinais de TVP + FC>100 + TEP provável, o Wells é ALTO. D-dímero não é necessário.' }
            ]
        },
        {
            type: 'choice',
            title: '🔬 Exame Confirmatório',
            text: 'Wells ALTO. Qual exame solicitar?',
            options: [
                { text: 'AngioTC de tórax (angiografia por TC)', points: 3, feedback: '✅ Correto! Wells alto → AngioTC direto (sensibilidade > 95%). Não precisa de D-dímero como intermediário.' },
                { text: 'D-dímero', points: 0, feedback: '⚠️ D-dímero é para probabilidade BAIXA/INTERMEDIÁRIA. Com Wells ALTO, D-dímero positivo não confirma (é inespecífico) e negativo é raro.' },
                { text: 'Rx de tórax apenas', points: -1, feedback: '❌ Rx é frequentemente normal na TEP (ou mostra achados inespecíficos). AngioTC é o padrão-ouro.' },
                { text: 'Cintilografia V/Q', points: 1, feedback: '⚠️ Alternativa se AngioTC não disponível ou contraindicada (alergia a contraste, IR grave). Mas AngioTC é preferível.' }
            ]
        },
        {
            type: 'info',
            title: '📈 Resultado da AngioTC',
            text: '⚠️ AngioTC: Falha de enchimento (trombo) em artéria pulmonar direita (lobar) + artéria segmentar do lobo inferior direito.\n\nDoppler de MMII: TVP em veia femoral superficial direita.\n\nDiagnóstico confirmado: TEP submaciça + TVP proximal.'
        },
        {
            type: 'choice',
            title: '💊 Tratamento',
            text: 'TEP submaciça (sem choque, mas com VD dilatado ao eco). Qual o tratamento?',
            options: [
                { text: 'Anticoagulação plena: Enoxaparina 1mg/kg 12/12h SC → transição para DOAC', points: 3, feedback: '✅ Correto! TEP submaciça sem choque: anticoagulação plena. Trombólise reservada para TEP maciça (com choque). DOACs (rivaroxabana/apixabana) são alternativas.' },
                { text: 'Trombólise sistêmica com alteplase', points: 0, feedback: '⚠️ Trombólise é para TEP MACIÇA (com instabilidade hemodinâmica). Submaciça: anticoagulação. Trombólise pode ser considerada se deteriorar.' },
                { text: 'AAS + Clopidogrel (como no infarto)', points: -2, feedback: '❌ Antiplaquetários não tratam TEP. O trombo venoso requer anticoagulação (heparina → anticoagulante oral).' },
                { text: 'Apenas observação + meias de compressão', points: -2, feedback: '❌ TEP confirmada sem anticoagulação = risco de morte. Anticoagulação é obrigatória.' }
            ]
        },
        {
            type: 'info',
            title: '✅ Desfecho',
            text: '🎉 Enoxaparina iniciada + transição para Rivaroxabana 15mg 12/12h por 21 dias, depois 20mg/dia. Suspensão do anticoncepcional oral. Investigação de trombofilia programada. Alta em 3 dias. Anticoagulação por mínimo 3 meses.'
        }
    ]
}
];

// ============================================================
// LÓGICA DO SIMULADOR
// ============================================================
let currentPlantao = null;
let plantaoStep = 0;
let plantaoScore = 0;
let plantaoMaxScore = 0;
let plantaoTimer = null;
let plantaoSeconds = 0;

function initPlantao() {
    renderPlantaoList();
}

function renderPlantaoList() {
    const container = document.getElementById('plantao-content');
    if (!container) return;

    container.innerHTML = `
        <div class="plt-header">
            <h2>🚑 Simulador de Plantão</h2>
            <p>Assuma o papel do médico plantonista. Casos revelados passo a passo — tome decisões e receba pontuação.</p>
        </div>
        <div class="plt-stats" id="plt-stats"></div>
        <div class="plt-list">
            ${plantaoCases.map(c => `
                <div class="plt-card">
                    <div class="plt-card-icon">${c.icon}</div>
                    <div class="plt-card-content">
                        <h3>${c.title}</h3>
                        <div class="plt-card-meta">
                            <span class="plt-specialty">${c.specialty}</span>
                            <span class="plt-diff plt-diff-${c.difficulty.toLowerCase()}">${c.difficulty}</span>
                        </div>
                    </div>
                    <button class="plt-start-btn" data-case-id="${c.id}">Iniciar Plantão →</button>
                </div>
            `).join('')}
        </div>
    `;

    container.querySelectorAll('.plt-start-btn').forEach(btn => {
        btn.addEventListener('click', () => startPlantao(btn.dataset.caseId));
    });

    renderPlantaoStats();
}

function renderPlantaoStats() {
    const el = document.getElementById('plt-stats');
    if (!el) return;
    const stats = JSON.parse(localStorage.getItem('plantao_stats') || '{}');
    const totalCases = Object.keys(stats).length;
    if (totalCases === 0) { el.innerHTML = ''; return; }

    const avgScore = Math.round(Object.values(stats).reduce((a,b) => a + b.percent, 0) / totalCases);
    el.innerHTML = `
        <div class="plt-stats-box">
            <span>📊 Casos completados: <strong>${totalCases}</strong></span>
            <span>🎯 Média de acerto: <strong>${avgScore}%</strong></span>
        </div>
    `;
}

function startPlantao(caseId) {
    currentPlantao = plantaoCases.find(c => c.id === caseId);
    if (!currentPlantao) return;
    plantaoStep = 0;
    plantaoScore = 0;
    plantaoMaxScore = 0;
    plantaoSeconds = 0;

    // Timer
    if (plantaoTimer) clearInterval(plantaoTimer);
    plantaoTimer = setInterval(() => { plantaoSeconds++; updateTimer(); }, 1000);

    renderPlantaoStep();
}

function updateTimer() {
    const el = document.getElementById('plt-timer');
    if (el) {
        const min = Math.floor(plantaoSeconds / 60).toString().padStart(2,'0');
        const sec = (plantaoSeconds % 60).toString().padStart(2,'0');
        el.textContent = `⏱️ ${min}:${sec}`;
    }
}

function renderPlantaoStep() {
    const container = document.getElementById('plantao-content');
    const step = currentPlantao.steps[plantaoStep];

    const progressPercent = ((plantaoStep + 1) / currentPlantao.steps.length) * 100;

    let stepHtml = `
        <div class="plt-active">
            <div class="plt-top-bar">
                <button class="plt-quit-btn" onclick="quitPlantao()">✕ Sair</button>
                <span id="plt-timer">⏱️ 00:00</span>
                <span class="plt-step-count">Etapa ${plantaoStep + 1}/${currentPlantao.steps.length}</span>
            </div>
            <div class="plt-progress"><div class="plt-progress-fill" style="width:${progressPercent}%"></div></div>
            <h3 class="plt-step-title">${step.title}</h3>
    `;

    if (step.type === 'info') {
        stepHtml += `
            <div class="plt-info-box">
                <p>${step.text.replace(/\n/g, '<br>')}</p>
            </div>
            <button class="plt-next-btn" onclick="nextPlantaoStep()">Continuar →</button>
        `;
    } else if (step.type === 'choice') {
        stepHtml += `
            <div class="plt-question-box">
                <p>${step.text}</p>
            </div>
            <div class="plt-options" id="plt-options">
                ${step.options.map((opt, i) => `
                    <button class="plt-option-btn" data-idx="${i}">${opt.text}</button>
                `).join('')}
            </div>
            <div id="plt-feedback" class="plt-feedback hidden"></div>
            <button id="plt-continue" class="plt-next-btn hidden" onclick="nextPlantaoStep()">Continuar →</button>
        `;
    }

    stepHtml += '</div>';
    container.innerHTML = stepHtml;
    updateTimer();

    // Event listeners for choices
    if (step.type === 'choice') {
        container.querySelectorAll('.plt-option-btn').forEach(btn => {
            btn.addEventListener('click', () => selectPlantaoOption(parseInt(btn.dataset.idx)));
        });
    }
}

function selectPlantaoOption(idx) {
    const step = currentPlantao.steps[plantaoStep];
    const option = step.options[idx];
    const maxPoints = Math.max(...step.options.map(o => o.points));

    plantaoScore += Math.max(0, option.points);
    plantaoMaxScore += maxPoints;

    // Disable all buttons
    document.querySelectorAll('.plt-option-btn').forEach((btn, i) => {
        btn.disabled = true;
        const opt = step.options[i];
        if (opt.points === maxPoints) btn.classList.add('plt-best');
        if (i === idx && opt.points < maxPoints) btn.classList.add('plt-chosen');
    });

    // Show feedback
    const fb = document.getElementById('plt-feedback');
    fb.innerHTML = `<p>${option.feedback}</p>`;
    fb.className = `plt-feedback ${option.points >= maxPoints ? 'plt-fb-good' : option.points >= 0 ? 'plt-fb-ok' : 'plt-fb-bad'}`;
    fb.classList.remove('hidden');

    document.getElementById('plt-continue').classList.remove('hidden');
}

function nextPlantaoStep() {
    plantaoStep++;
    if (plantaoStep < currentPlantao.steps.length) {
        renderPlantaoStep();
    } else {
        endPlantao();
    }
}

function endPlantao() {
    if (plantaoTimer) clearInterval(plantaoTimer);
    const percent = plantaoMaxScore > 0 ? Math.round((plantaoScore / plantaoMaxScore) * 100) : 0;

    // Save stats
    const stats = JSON.parse(localStorage.getItem('plantao_stats') || '{}');
    stats[currentPlantao.id] = { percent, time: plantaoSeconds, date: new Date().toLocaleDateString('pt-BR') };
    localStorage.setItem('plantao_stats', JSON.stringify(stats));

    let grade, cls;
    if (percent >= 85) { grade = '⭐ Excelente! Conduta de especialista.'; cls = 'grade-excellent'; }
    else if (percent >= 60) { grade = '👍 Bom desempenho!'; cls = 'grade-good'; }
    else if (percent >= 40) { grade = '📖 Regular — revise os protocolos.'; cls = 'grade-regular'; }
    else { grade = '⚠️ Precisa estudar mais este tema.'; cls = 'grade-poor'; }

    const min = Math.floor(plantaoSeconds / 60);
    const sec = plantaoSeconds % 60;

    const container = document.getElementById('plantao-content');
    container.innerHTML = `
        <div class="plt-result">
            <h3>${currentPlantao.icon} ${currentPlantao.title}</h3>
            <div class="plt-result-score ${cls}">${percent}%</div>
            <p class="plt-result-grade">${grade}</p>
            <p class="plt-result-time">Tempo: ${min}min ${sec}s</p>
            <div class="plt-result-actions">
                <button class="plt-retry-btn" onclick="startPlantao('${currentPlantao.id}')">↺ Refazer</button>
                <button class="plt-back-btn" onclick="renderPlantaoList()">← Outros Casos</button>
            </div>
        </div>
    `;
}

function quitPlantao() {
    if (plantaoTimer) clearInterval(plantaoTimer);
    renderPlantaoList();
}

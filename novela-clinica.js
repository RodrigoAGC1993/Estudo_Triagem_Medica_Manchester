/**
 * Novela Clínica — Casos com múltiplas rotas e desfechos
 * Estilo "Visual Novel / Choose Your Own Adventure"
 * Cada decisão ramifica a história para caminhos diferentes
 */
document.addEventListener('DOMContentLoaded', function() { initNovela(); });

// ============================================================
// CASO 1: DOR TORÁCICA — ÁRVORE DE DECISÕES
// ============================================================
const novelaCases = [
{
    id: 'novela_iam',
    title: 'O Taxista com Dor no Peito',
    icon: '💔',
    description: 'Sexta à noite. Um homem de 55 anos chega ao PS apertando o peito. Cada decisão sua muda o destino dele.',
    endings: 4,
    nodes: {
        'start': {
            type: 'narrative',
            text: '🌙 Sexta-feira, 23h40. Você acabou de assumir o plantão da emergência.\n\nUm taxista de 55 anos entra pela porta apoiado na esposa. Está pálido, suando frio, com a mão no peito.\n\n"Doutor, tá doendo muito aqui... já faz uns 40 minutos... parece que tem um elefante sentado no meu peito."',
            vitals: { fc: 105, pas: 95, pad: 58, spo2: 93, fr: 22 },
            next: 'first_action'
        },
        'first_action': {
            type: 'choice',
            text: 'O taxista está diante de você. A enfermeira olha esperando sua ordem. O que você faz?',
            options: [
                { text: '🛏️ "Leito de emergência! Monitor, O2, acesso — agora!"', next: 'correct_start', points: 3 },
                { text: '📋 "Pode aguardar na triagem, vou atender por ordem de chegada"', next: 'wait_triage', points: -3 },
                { text: '💊 "Dá um Buscopan e observa 30 minutos"', next: 'buscopan_error', points: -2 }
            ]
        },

        // === ROTA CORRETA ===
        'correct_start': {
            type: 'narrative',
            text: '✅ Você colocou o paciente no leito de emergência. Monitor conectado: FC 105, PA 95/58, SpO2 93%.\n\nAcesso venoso obtido. O2 cateter nasal 3L.\n\nA enfermeira pergunta: "Doutor, peço o quê agora?"',
            vitals: { fc: 105, pas: 95, pad: 58, spo2: 94, fr: 20 },
            next: 'ecg_decision'
        },
        'ecg_decision': {
            type: 'choice',
            text: 'Paciente no monitor, estável por enquanto. Próximo passo:',
            options: [
                { text: '📈 "ECG de 12 derivações AGORA — em menos de 10 minutos"', next: 'ecg_done', points: 3 },
                { text: '🩸 "Colhe sangue completo e espera o resultado"', next: 'delay_labs', points: 0 },
                { text: '📷 "Rx de tórax primeiro, depois vemos"', next: 'rx_delay', points: 0 }
            ]
        },
        'ecg_done': {
            type: 'narrative',
            text: '📈 ECG em 7 minutos. Você olha o traçado e sente o estômago afundar:\n\n⚠️ SUPRA DE ST em V1, V2, V3, V4 — parede anterior.\nInfra recíproco em D2, D3, aVF.\n\nÉ um IAMCSST. Artéria descendente anterior. O clock está correndo.',
            vitals: { fc: 110, pas: 90, pad: 55, spo2: 93, fr: 22 },
            next: 'iam_confirmed'
        },
        'iam_confirmed': {
            type: 'choice',
            text: '⏱️ Infarto confirmado. Seu hospital tem hemodinâmica 24h. O que fazer agora?',
            options: [
                { text: '💊 AAS 300mg + Clopidogrel 600mg + Heparina + Ativa hemodinâmica para cateterismo', next: 'cath_lab', points: 3 },
                { text: '💉 Trombólise com Tenecteplase (porta-agulha < 30min)', next: 'thrombolysis', points: 2 },
                { text: '⏳ "Vamos esperar a troponina para confirmar antes de agir"', next: 'wait_troponin', points: -2 },
                { text: '🏠 "Pode não ser nada grave, marca um teste ergométrico amanhã"', next: 'discharge_death', points: -5 }
            ]
        },

        // Rota ideal: cateterismo
        'cath_lab': {
            type: 'narrative',
            text: '🏃 Equipe de hemodinâmica ativada em 12 minutos. AAS mastigado, clopidogrel dado, heparina correndo.\n\nVocê acompanha o paciente até a sala.\n\n⏱️ Tempo porta-balão: 68 minutos.\n\nAngioplastia primária: stent em Descendente Anterior com sucesso. Fluxo TIMI 3 restaurado.',
            vitals: { fc: 78, pas: 118, pad: 72, spo2: 97, fr: 16 },
            next: 'ending_best'
        },
        'ending_best': {
            type: 'ending',
            title: '⭐ MELHOR DESFECHO — Paciente Salvo',
            text: 'O taxista acorda na UTI coronariana no dia seguinte. Aperta sua mão e diz: "Obrigado, doutor. Minha esposa disse que se não fosse rápido..."\n\nAlta em 4 dias. Stent patente. Fração de ejeção preservada (52%). Retorna ao trabalho em 30 dias.\n\nVocê salvou uma vida com decisões rápidas e corretas.',
            grade: 'excellent',
            lesson: 'LIÇÃO: No IAMCSST, cada minuto conta. A meta porta-balão < 90 min é o que separa vida de morte. AAS + dupla antiagregação + anticoagulação + reperfusão = padrão-ouro.'
        },

        // Rota alternativa: trombólise
        'thrombolysis': {
            type: 'narrative',
            text: '💉 Você optou por trombólise. Tenecteplase baseada no peso, bolus IV. Porta-agulha: 25 minutos.\n\n30 minutos depois: dor melhorou 70%, supra de ST reduzindo. Critérios de reperfusão presentes.',
            vitals: { fc: 85, pas: 108, pad: 68, spo2: 96, fr: 18 },
            next: 'ending_good'
        },
        'ending_good': {
            type: 'ending',
            title: '✅ BOM DESFECHO — Trombólise Eficaz',
            text: 'A trombólise funcionou. Paciente transferido para hospital com hemodinâmica para angiografia em 24h (estratégia fármaco-invasiva).\n\nCateterismo no dia seguinte: lesão residual de 40% em DA, sem necessidade de stent neste momento.\n\nAlta em 6 dias. FE 48% (leve disfunção).',
            grade: 'good',
            lesson: 'LIÇÃO: Quando não há hemodinâmica disponível < 120 min, trombólise é alternativa válida (porta-agulha < 30 min). Depois: transferir para coronariografia em 3-24h.'
        },

        // Rota parcial: esperou troponina
        'wait_troponin': {
            type: 'narrative',
            text: '⏳ Você esperou a troponina (resultado em 1h30). Enquanto isso o paciente piorou:\n\nPA caiu para 78/45. FC subiu para 130. Sudorese profusa. Agitação.\n\n"Doutor... tô sentindo que vou morrer..."',
            vitals: { fc: 130, pas: 78, pad: 45, spo2: 88, fr: 28 },
            next: 'late_decision'
        },
        'late_decision': {
            type: 'choice',
            text: '🚨 Paciente em choque cardiogênico! Troponina voltou: 50x o normal. Delta T agora: 2h30. O que fazer?',
            options: [
                { text: '🏃 Cateterismo DE EMERGÊNCIA agora (melhor tarde que nunca)', next: 'late_cath', points: 2 },
                { text: '💀 "Não há mais o que fazer..."', next: 'give_up_death', points: -5 }
            ]
        },
        'late_cath': {
            type: 'ending',
            title: '⚠️ DESFECHO REGULAR — Sobreviveu com Sequelas',
            text: 'Cateterismo de resgate. Stent em DA + balão intra-aórtico por choque.\n\n48h em UTI com noradrenalina. Evolui com insuficiência cardíaca: FE 28%.\n\nAlta em 15 dias com IC classe III. Precisa de marcapasso-desfibrilador (CDI). Aposentado por invalidez.\n\nO atraso custou metade do coração dele.',
            grade: 'regular',
            lesson: 'LIÇÃO: Esperar troponina quando o ECG já mostra SUPRA ST é erro grave. O ECG define conduta imediata no IAMCSST — troponina confirma depois, mas NÃO deve atrasar reperfusão.'
        },
        'give_up_death': {
            type: 'ending',
            title: '💀 PIOR DESFECHO — Óbito por Omissão',
            text: 'O paciente evoluiu para parada cardiorrespiratória em FV.\n\nRCP por 40 minutos sem retorno de circulação espontânea.\n\nÓbito às 01h35.\n\nA esposa chora na sala de espera. O prontuário mostrará que havia um SUPRA ST não tratado a tempo.',
            grade: 'death',
            lesson: 'LIÇÃO: Desistir de um paciente com IAM que ainda tem pulso é inadmissível. Mesmo em choque, cateterismo de resgate + suporte hemodinâmico podem salvar.'
        },

        // === ROTA DO ERRO: MANDOU ESPERAR NA TRIAGEM ===
        'wait_triage': {
            type: 'narrative',
            text: '📋 Você mandou esperar. O taxista senta na cadeira da triagem...\n\n15 minutos depois, a enfermeira grita:\n\n"DOUTOR! O senhor da dor no peito desmaiou!"',
            vitals: { fc: 40, pas: 60, pad: 30, spo2: 75, fr: 8 },
            next: 'collapse_choice'
        },
        'collapse_choice': {
            type: 'choice',
            text: '🚨 Paciente no chão, inconsciente, bradicárdico. Monitor: ritmo irregular → FV. Parada cardiorrespiratória!',
            options: [
                { text: '🫀 Iniciar RCP + Desfibrilação + Adrenalina (protocolo ACLS)', next: 'resuscitation', points: 2 },
                { text: '📞 "Chamem o cardiologista, não sei o que fazer!"', next: 'panic_death', points: -3 }
            ]
        },
        'resuscitation': {
            type: 'narrative',
            text: '⚡ Desfibrilação 200J → Retorno de ritmo sinusal após 2º choque.\n\nAdrenalina + Amiodarona. RCE (retorno de circulação espontânea) após 8 minutos.\n\nPaciente intubado, sedado. ECG pós-PCR: Supra ST V1-V4.',
            vitals: { fc: 95, pas: 85, pad: 52, spo2: 92, fr: 14 },
            next: 'post_arrest_decision'
        },
        'post_arrest_decision': {
            type: 'choice',
            text: 'Paciente pós-PCR com SUPRA ST. Indicação de cateterismo pós-parada?',
            options: [
                { text: '🏃 Sim! Cateterismo imediato pós-PCR (guideline recomenda)', next: 'ending_survived_arrest', points: 3 },
                { text: '⏳ Aguardar 72h para ver evolução neurológica', next: 'ending_brain_damage', points: 0 }
            ]
        },
        'ending_survived_arrest': {
            type: 'ending',
            title: '⚠️ DESFECHO RUIM — Sobreviveu mas com Danos',
            text: 'Cateterismo: DA 100% ocluída → stent com sucesso.\n\nMas o paciente ficou 8 min em PCR. Encefalopatia hipóxica leve. Confusão por 5 dias. Recupera parcialmente.\n\nAlta em 20 dias. FE 30%. Déficit de memória permanente. Não pode mais dirigir (aposentadoria).\n\nSe tivesse sido atendido imediatamente, nada disso teria acontecido.',
            grade: 'poor',
            lesson: 'LIÇÃO: Dor torácica NUNCA espera fila. 15 minutos de atraso = PCR evitável. O triagista deve classificar como VERMELHO e encaminhar imediatamente ao médico.'
        },
        'ending_brain_damage': {
            type: 'ending',
            title: '💀 DESFECHO PÉSSIMO — Dano Cerebral Irreversível',
            text: 'Sem cateterismo precoce, o paciente reinfarta na UTI.\n\nSegunda PCR — desta vez, anóxia prolongada.\n\nSobrevive em estado vegetativo. Família decide por cuidados paliativos após 30 dias.\n\nUma cadeia de erros: não triou → parou → ressuscitou → não reperfundiu a tempo.',
            grade: 'death',
            lesson: 'LIÇÃO: Pós-PCR com SUPRA ST = cateterismo imediato (não esperar). A causa da PCR foi o IAM — tratar a causa é prioridade.'
        },
        'panic_death': {
            type: 'ending',
            title: '💀 ÓBITO — Desespero e Inação',
            text: 'Enquanto espera o cardiologista (que estava em casa), o paciente permaneceu em FV sem desfibrilação.\n\nApós 10 minutos em FV não tratada: assistolia irreversível.\n\nÓbito às 00h05.\n\nTempo entre chegada e morte: 25 minutos. Uma vida perdida por falta de ação básica (desfibrilação).',
            grade: 'death',
            lesson: 'LIÇÃO: FV é ritmo chocável. Desfibrilação em < 3 minutos tem > 70% de chance de RCE. Esperar especialista para desfibrilar é perder a janela. TODO médico de plantão deve saber usar o desfibrilador.'
        },

        // === ROTA DO ERRO: BUSCOPAN ===
        'buscopan_error': {
            type: 'narrative',
            text: '💊 Você prescreveu Buscopan. A enfermeira faz, mas a dor não melhora.\n\n20 minutos depois: paciente ainda com dor, agora mais pálido.\n\nA enfermeira, preocupada, resolve fazer um ECG por conta própria. Te mostra o resultado.',
            vitals: { fc: 115, pas: 88, pad: 52, spo2: 91, fr: 24 },
            next: 'nurse_ecg'
        },
        'nurse_ecg': {
            type: 'choice',
            text: '📈 A enfermeira te mostra o ECG: SUPRA ST em V1-V4. "Doutor, isso é infarto, né?"\n\nDelta T agora: 1h20 (60 min de dor + 20 min perdidos com Buscopan). O que você faz?',
            options: [
                { text: '😰 "Tem razão! AAS + Clopidogrel + Heparina + Cateterismo URGENTE!"', next: 'recover_from_error', points: 2 },
                { text: '🤷 "Não sei interpretar ECG direito, chama o cardio"', next: 'call_cardio_late', points: -1 }
            ]
        },
        'recover_from_error': {
            type: 'ending',
            title: '⚠️ DESFECHO ACEITÁVEL — Recuperou do Erro',
            text: 'Você corrigiu o rumo. Cateterismo em porta-balão de 95 min (acima da meta mas ainda dentro da janela).\n\nStent em DA com sucesso. Paciente na UTI 3 dias. FE 42% (disfunção leve-moderada).\n\nAlta em 7 dias. Sequelar pequena. Poderia ter sido perfeito se não tivessem perdido 20 min com Buscopan.\n\nVocê aprendeu: dor torácica ≠ "gases". ECG em 10 min. SEMPRE.',
            grade: 'regular',
            lesson: 'LIÇÃO: Dor torácica com fatores de risco NUNCA é abordada com antiespasmódico. ECG de 12 derivações em < 10 min é mandatório. Perder 20 min pode custar miocárdio — ou uma vida.'
        },
        'call_cardio_late': {
            type: 'ending',
            title: '💀 DESFECHO RUIM — Atraso Fatal',
            text: 'Cardiologista demora 40 min para chegar. Ao chegar, paciente em edema agudo de pulmão.\n\nCateterismo de emergência — porta-balão: 2h15.\n\nPaciente evolui para choque cardiogênico. Balão intra-aórtico. FE 20%.\n\nSobrevive, mas com IC terminal. Lista de transplante cardíaco. A vida como taxista acabou.',
            grade: 'poor',
            lesson: 'LIÇÃO: Todo médico plantonista deve saber interpretar ECG básico (supra ST). Depender de especialista para decisões de emergência custa vidas. ECG com supra = reperfusão imediata.'
        },

        // Rotas de atraso parcial
        'delay_labs': {
            type: 'narrative',
            text: '🩸 Sangue colhido. Resultado em 1h30 (troponina, hemograma, bioquímica).\n\nEnquanto esperava, a enfermeira pergunta: "Doutor, não faz o ECG antes?"\n\nVocê percebe que esqueceu. Pede ECG agora (40 min depois da chegada).',
            vitals: { fc: 112, pas: 88, pad: 52, spo2: 92, fr: 22 },
            next: 'delayed_ecg'
        },
        'delayed_ecg': {
            type: 'narrative',
            text: '📈 ECG mostra SUPRA ST V1-V4. Infarto confirmado.\n\nMas perderam-se 40 minutos. Delta T total: 1h20.',
            vitals: { fc: 115, pas: 85, pad: 50, spo2: 91, fr: 24 },
            next: 'iam_confirmed'
        },
        'rx_delay': {
            type: 'narrative',
            text: '📷 Rx de tórax: normal (como esperado no IAM — Rx não mostra infarto).\n\nTempo perdido: 25 minutos. Enfermeira sugere ECG.',
            vitals: { fc: 108, pas: 90, pad: 55, spo2: 93, fr: 21 },
            next: 'ecg_done'
        },

        // === ROTA CATASTRÓFICA: DÁ ALTA ===
        'discharge_death': {
            type: 'ending',
            title: '💀 ÓBITO — Negligência Absoluta',
            text: 'Você mandou o taxista para casa com diagnóstico de "azia".\n\nNo caminho, dentro do táxi da esposa, ele teve parada cardíaca fulminante.\n\nMorto ao chegar no próximo hospital. ECG do SAMU: FV sobre SUPRA ST.\n\nInquérito aberto. Processo por negligência. CRM cassado.\n\nUma vida perdida. Uma carreira destruída. Uma família despedaçada.',
            grade: 'death',
            lesson: 'LIÇÃO: Dor torácica em homem > 50 com fatores de risco JAMAIS recebe alta sem ECG + troponina no mínimo. "Pode não ser nada" não é conduta médica — é loteria com a vida do paciente.'
        }
    }
}
];

// ============================================================
// LÓGICA DO MOTOR DE NOVELA
// ============================================================
let currentNovela = null;
let novelaPath = [];
let novelaScore = 0;
let novelaVitals = {};
let novelaVitalInterval = null;

function initNovela() {
    renderNovelaList();
}

function renderNovelaList() {
    const container = document.getElementById('novela-content');
    if (!container) return;

    container.innerHTML = `
        <div class="nv-header">
            <h2>🎭 Novela Clínica</h2>
            <p>Cada decisão muda o destino do paciente. Múltiplos caminhos. Múltiplos desfechos. Suas escolhas têm consequências reais.</p>
            <div class="nv-endings-info">🎬 Descubra todos os finais possíveis!</div>
        </div>
        <div class="nv-list">
            ${novelaCases.map(c => `
                <div class="nv-card">
                    <div class="nv-card-icon">${c.icon}</div>
                    <div class="nv-card-content">
                        <h3>${c.title}</h3>
                        <p>${c.description}</p>
                        <span class="nv-endings-badge">🎬 ${c.endings} finais possíveis</span>
                    </div>
                    <button class="nv-start-btn" data-id="${c.id}">Começar →</button>
                </div>
            `).join('')}
        </div>
    `;

    container.querySelectorAll('.nv-start-btn').forEach(btn => {
        btn.addEventListener('click', () => startNovela(btn.dataset.id));
    });
}

function startNovela(id) {
    currentNovela = novelaCases.find(c => c.id === id);
    if (!currentNovela) return;
    novelaPath = [];
    novelaScore = 0;
    renderNovelaNode('start');
}

function renderNovelaNode(nodeId) {
    const node = currentNovela.nodes[nodeId];
    if (!node) return;
    novelaPath.push(nodeId);

    const container = document.getElementById('novela-content');

    // Update vitals if present
    if (node.vitals) {
        novelaVitals = { ...node.vitals };
    }

    // Build vital monitor
    const vitalsHtml = buildNovelaVitals();

    if (node.type === 'ending') {
        stopNovelaVitals();
        const gradeClass = node.grade === 'excellent' ? 'nv-end-excellent' : node.grade === 'good' ? 'nv-end-good' : node.grade === 'regular' ? 'nv-end-regular' : node.grade === 'poor' ? 'nv-end-poor' : 'nv-end-death';
        container.innerHTML = `
            <div class="nv-scene">
                <div class="nv-ending ${gradeClass}">
                    <h3>${node.title}</h3>
                    <div class="nv-ending-text">${node.text.replace(/\n/g,'<br>')}</div>
                    <div class="nv-lesson"><strong>📖 O que aprender:</strong><br>${node.lesson}</div>
                </div>
                <div class="nv-ending-actions">
                    <button class="nv-retry-btn" onclick="startNovela('${currentNovela.id}')">↺ Tentar Outro Caminho</button>
                    <button class="nv-back-btn" onclick="renderNovelaList()">← Voltar</button>
                </div>
                <div class="nv-path-info">📍 Seu caminho: ${novelaPath.length} decisões tomadas</div>
            </div>
        `;
        saveNovelaEnding(node.grade);
        return;
    }

    let contentHtml = '';
    if (node.type === 'narrative') {
        contentHtml = `
            <div class="nv-narrative">${node.text.replace(/\n/g,'<br>')}</div>
            <button class="nv-continue-btn" onclick="renderNovelaNode('${node.next}')">Continuar →</button>
        `;
    } else if (node.type === 'choice') {
        contentHtml = `
            <div class="nv-question">${node.text}</div>
            <div class="nv-choices">
                ${node.options.map((opt, i) => `
                    <button class="nv-choice-btn" data-next="${opt.next}" data-points="${opt.points || 0}">${opt.text}</button>
                `).join('')}
            </div>
        `;
    }

    container.innerHTML = `
        <div class="nv-scene">
            <div class="nv-top">
                <button class="nv-quit-btn" onclick="renderNovelaList()">✕</button>
                <span class="nv-case-title">${currentNovela.icon} ${currentNovela.title}</span>
            </div>
            ${vitalsHtml}
            ${contentHtml}
        </div>
    `;

    // Bind choice buttons
    container.querySelectorAll('.nv-choice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const pts = parseInt(btn.dataset.points) || 0;
            novelaScore += pts;
            renderNovelaNode(btn.dataset.next);
        });
    });

    startNovelaVitals();
}

function buildNovelaVitals() {
    if (!novelaVitals.fc) return '';
    const fcClass = novelaVitals.fc > 120 || novelaVitals.fc < 50 ? 'vital-danger' : novelaVitals.fc > 100 ? 'vital-warning' : 'vital-normal';
    const paClass = novelaVitals.pas < 90 || novelaVitals.pas > 180 ? 'vital-danger' : novelaVitals.pas < 100 ? 'vital-warning' : 'vital-normal';
    const spo2Class = novelaVitals.spo2 < 90 ? 'vital-danger' : novelaVitals.spo2 < 94 ? 'vital-warning' : 'vital-normal';

    return `
        <div class="nv-vitals">
            <span class="${fcClass}">FC: <strong>${novelaVitals.fc}</strong></span>
            <span class="${paClass}">PA: <strong>${novelaVitals.pas}/${novelaVitals.pad}</strong></span>
            <span class="${spo2Class}">SpO2: <strong>${novelaVitals.spo2}%</strong></span>
            <span>FR: <strong>${novelaVitals.fr}</strong></span>
        </div>
    `;
}

function startNovelaVitals() {
    stopNovelaVitals();
    novelaVitalInterval = setInterval(() => {
        novelaVitals.fc += Math.round((Math.random() - 0.5) * 4);
        novelaVitals.fc = Math.max(0, Math.min(200, novelaVitals.fc));
        const el = document.querySelector('.nv-vitals');
        if (el) el.outerHTML = buildNovelaVitals();
    }, 3000);
}

function stopNovelaVitals() {
    if (novelaVitalInterval) clearInterval(novelaVitalInterval);
}

function saveNovelaEnding(grade) {
    const endings = JSON.parse(localStorage.getItem('novela_endings') || '{}');
    if (!endings[currentNovela.id]) endings[currentNovela.id] = [];
    if (!endings[currentNovela.id].includes(grade)) {
        endings[currentNovela.id].push(grade);
    }
    localStorage.setItem('novela_endings', JSON.stringify(endings));
}

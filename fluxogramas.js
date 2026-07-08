/**
 * Fluxogramas de Decisão Clínica + Condutas Iniciais
 * 
 * Algoritmos interativos tipo "se/então" com conduta ABCDE
 * Fontes: Harrison, Protocolo de Manchester, ACLS/ATLS
 */

document.addEventListener('DOMContentLoaded', function() {
    initFluxogramas();
});

const fluxogramas = [
    {
        id: 'dor_toracica',
        title: 'Dor Torácica Aguda',
        icon: '💔',
        description: 'Algoritmo de decisão para dor no peito na emergência',
        nodes: [
            { id: 0, question: 'O paciente está instável hemodinamicamente? (PAS < 90, alteração consciência, sinais de choque)', yes: 1, no: 2 },
            { id: 1, type: 'result', severity: 'danger', title: '🚨 EMERGÊNCIA — Estabilizar (ABCDE)', conduct: 'A: Assegurar via aérea. B: O2 alto fluxo se SpO2<94%. C: Acesso venoso calibroso, SF 0,9% 500mL rápido. Monitoração + ECG imediato. Considerar: IAM c/ choque (angioplastia primária), TEP maciço (trombólise), tamponamento (pericardiocentese), pneumotórax hipertensivo (punção 2º EIC).' },
            { id: 2, question: 'ECG mostra supradesnivelamento de ST (supra ST) ou BRE novo?', yes: 3, no: 4 },
            { id: 3, type: 'result', severity: 'danger', title: '⚠️ IAMCSST — Ativar Protocolo de Reperfusão', conduct: 'AAS 300mg VO mastigado + Clopidogrel 300-600mg + Heparina. Meta: porta-balão < 90min (angioplastia primária) ou porta-agulha < 30min (trombólise com tenecteplase se sem acesso a hemodinâmica). Morfina se dor refratária. Nitrato SL (contraindicado se PAS<90 ou uso de sildenafil).' },
            { id: 4, question: 'Dor é pleurítica (piora ao respirar) + dispneia + fatores de risco para TEP (imobilização, pós-op, TVP prévia)?', yes: 5, no: 6 },
            { id: 5, type: 'result', severity: 'warning', title: '⚡ Suspeita de TEP — Investigar', conduct: 'Wells score para estratificação. Se alta probabilidade: AngioTC de tórax. Se baixa/intermediária: D-dímero primeiro. Se confirmado TEP: Heparina plena (enoxaparina 1mg/kg 12/12h ou HNF). Se TEP maciço com instabilidade: trombólise sistêmica.' },
            { id: 6, question: 'Dor "rasgante", início abrupto, migratória, PA diferente entre os braços?', yes: 7, no: 8 },
            { id: 7, type: 'result', severity: 'danger', title: '🚨 Suspeita de Dissecção de Aorta', conduct: 'AngioTC de tórax/abdome URGENTE. Controle de PA (alvo PAS 100-120): Labetalol IV ou nitroprussiato + betabloqueador. NÃO anticoagular. NÃO trombolisar. Cirurgia cardiovascular de urgência se tipo A (aorta ascendente).' },
            { id: 8, question: 'Dor piora ao deitar e melhora sentado para frente? Atrito pericárdico?', yes: 9, no: 10 },
            { id: 9, type: 'result', severity: 'warning', title: '⚡ Provável Pericardite', conduct: 'ECG: supra ST difuso + infra PR. Ecocardiograma (avaliar derrame). Tratamento: AINEs (ibuprofeno 600mg 8/8h) + Colchicina 0,5mg 12/12h por 3 meses. Se tamponamento (hipotensão + turgência jugular + abafamento bulhas): pericardiocentese de emergência.' },
            { id: 10, type: 'result', severity: 'success', title: '✅ SCASSST / Dor não-cardíaca — Investigar', conduct: 'Troponina seriada (0h e 3h). Se troponina positiva: IAMSSST → internação + dupla antiagregação + anticoagulação + estratégia invasiva precoce. Se troponina negativa + HEART ≤ 3: considerar alta com seguimento. Se HEART 4-6: observação + teste provocativo.' }
        ]
    },
    {
        id: 'dispneia_aguda',
        title: 'Dispneia Aguda',
        icon: '🫁',
        description: 'Avaliação e conduta na falta de ar aguda',
        nodes: [
            { id: 0, question: 'SpO2 < 92% ou sinais de insuficiência respiratória (uso de musculatura acessória, cianose, incapacidade de falar)?', yes: 1, no: 2 },
            { id: 1, type: 'result', severity: 'danger', title: '🚨 INSUFICIÊNCIA RESPIRATÓRIA — ABCDE', conduct: 'A: Via aérea pérvia? Estridor = obstrução → considerar intubação. B: O2 alto fluxo (máscara com reservatório 15L/min). Se não melhorar: VNI (CPAP/BiPAP). Se falha VNI ou Glasgow ≤ 8: IOT + VM. C: Acesso venoso. Rx tórax portátil + gasometria.' },
            { id: 2, question: 'Sibilos difusos + expiração prolongada + história de asma/DPOC?', yes: 3, no: 4 },
            { id: 3, type: 'result', severity: 'warning', title: '⚡ Crise Asmática / Exacerbação DPOC', conduct: 'Salbutamol 400-800mcg (4-8 puffs) via espaçador ou nebulização (2,5-5mg). Repetir a cada 20min nas primeiras 2 horas. Ipratrópio 40-80mcg associado. Corticoide sistêmico: Prednisona 40-60mg VO (ou Metilprednisolona 125mg IV se grave). Se grave: MgSO4 2g IV em 20min.' },
            { id: 4, question: 'Estertores crepitantes bilaterais + ortopneia + edema MMII + turgência jugular?', yes: 5, no: 6 },
            { id: 5, type: 'result', severity: 'danger', title: '⚠️ Edema Agudo de Pulmão (IC descompensada)', conduct: 'Posição sentada (Fowler). O2 + VNI (CPAP 10cmH2O). Furosemida 40-80mg IV. Nitroglicerina IV se PAS > 110. Morfina 2-4mg IV se ansiedade/dispneia refratária (com cautela). Monitorar diurese. BNP + Eco + Rx tórax.' },
            { id: 6, question: 'Início súbito + dor pleurítica + taquicardia + fatores de risco para TVP?', yes: 7, no: 8 },
            { id: 7, type: 'result', severity: 'warning', title: '⚡ Suspeita de TEP', conduct: 'Mesma conduta do fluxograma de dor torácica: Wells score → D-dímero ou AngioTC conforme probabilidade. Anticoagulação empírica se alta suspeita enquanto confirma diagnóstico.' },
            { id: 8, question: 'Febre + tosse produtiva + estertores focais (crepitações localizadas)?', yes: 9, no: 10 },
            { id: 9, type: 'result', severity: 'warning', title: '⚡ Pneumonia — CURB-65 para decidir internação', conduct: 'CURB-65 para estratificar. Se ambulatorial: Amoxicilina 500mg 8/8h VO (ou Azitromicina se alérgico). Se internação: Ampicilina + Azitromicina IV, ou Levofloxacino 750mg IV. Colher escarro + hemoculturas. O2 para SpO2 ≥ 94%.' },
            { id: 10, type: 'result', severity: 'success', title: '✅ Outras causas — Investigar', conduct: 'Considerar: Pneumotórax (Rx tórax, MV abolido unilateral → drenagem), Anemia grave (hemograma → transfusão se Hb < 7), Acidose metabólica (gasometria → Kussmaul = DKA), Ansiedade (diagnóstico de exclusão). Rx tórax + ECG + Gasometria em todos.' }
        ]
    },
    {
        id: 'cefaleia_aguda',
        title: 'Cefaleia Aguda na Emergência',
        icon: '🧠',
        description: 'Red flags e decisão em cefaleia — quando é emergência?',
        nodes: [
            { id: 0, question: 'Cefaleia de início "thunderclap" (atingiu pico em segundos-minutos)? Ou "a pior cefaleia da vida"?', yes: 1, no: 2 },
            { id: 1, type: 'result', severity: 'danger', title: '🚨 Suspeita de HSA — TC crânio imediata', conduct: 'TC crânio SEM contraste (sensibilidade ~95% nas primeiras 6h). Se TC normal + alta suspeita: Punção lombar (xantocromia). Se HSA confirmada: Nimodipino 60mg 4/4h VO + controle de PA + Neurocirurgia URGENTE (clipagem ou embolização). Repouso absoluto.' },
            { id: 2, question: 'Febre + rigidez de nuca + alteração mental ou fotofobia?', yes: 3, no: 4 },
            { id: 3, type: 'result', severity: 'danger', title: '🚨 Suspeita de Meningite — ATB empírica IMEDIATA', conduct: 'NÃO atrasar antibiótico por exames! Ceftriaxona 2g IV + Dexametasona 10mg IV (antes ou junto do ATB). Se > 50 anos ou imunossuprimido: + Ampicilina (Listeria). TC crânio antes da PL apenas se déficit focal ou papiledema. Colher hemoculturas antes do ATB se possível sem atraso.' },
            { id: 4, question: 'Déficit neurológico focal novo (hemiparesia, afasia, anisocoria)?', yes: 5, no: 6 },
            { id: 5, type: 'result', severity: 'danger', title: '⚠️ Possível Lesão Intracraniana — Neuroimagem urgente', conduct: 'TC crânio SEM contraste (excluir hemorragia, tumor, abscesso). Se AVC isquêmico: avaliar trombólise (janela 4,5h). Se tumor com HIC: Dexametasona 10mg IV + Neurocirurgia. Se abscesso: ATB empírica + drenagem.' },
            { id: 6, question: 'Papiledema ao fundo de olho ou sinais de hipertensão intracraniana (vômitos em jato, piora matinal)?', yes: 7, no: 8 },
            { id: 7, type: 'result', severity: 'warning', title: '⚡ Hipertensão Intracraniana — Investigar', conduct: 'TC/RM de crânio com contraste. NÃO fazer PL sem imagem antes (risco de herniação). Se hidrocefalia: derivação ventricular. Se pseudotumor cerebri (Hipertensão Intracraniana Idiopática): Acetazolamida + perda de peso.' },
            { id: 8, question: 'Idade > 50 anos + cefaleia temporal nova + claudicação mandibular + VHS elevado?', yes: 9, no: 10 },
            { id: 9, type: 'result', severity: 'warning', title: '⚡ Arterite Temporal — Corticoide antes da biópsia', conduct: 'Prednisona 60-80mg/dia VO (ou Metilprednisolona IV se amaurose). Solicitar VHS, PCR. Biópsia de artéria temporal (pode ser feita até 2 semanas após início do corticoide). URGÊNCIA: se alteração visual → risco de cegueira irreversível.' },
            { id: 10, type: 'result', severity: 'success', title: '✅ Cefaleia Primária provável — Tratar', conduct: 'Sem red flags: enxaqueca (Sumatriptano 50-100mg VO ou Dipirona/AINEs) ou cefaleia tensional (Paracetamol/AINEs). Orientar sinais de alarme. Encaminhar Neurologia se cefaleia crônica diária ou refratária. Considerar cefaleia medicamentosa se uso excessivo de analgésicos.' }
        ]
    },
    {
        id: 'rebaixamento_consciencia',
        title: 'Rebaixamento de Consciência',
        icon: '😵',
        description: 'Abordagem ao paciente com alteração do nível de consciência',
        nodes: [
            { id: 0, question: 'Via aérea pérvia? Paciente respira adequadamente?', yes: 2, no: 1 },
            { id: 1, type: 'result', severity: 'danger', title: '🚨 Via Aérea Comprometida — IOT', conduct: 'A: Aspirar secreções + cânula de Guedel. Se Glasgow ≤ 8: Intubação Orotraqueal (sequência rápida). B: Ventilação mecânica. C: Acesso venoso + monitoração + glicemia capilar IMEDIATA. Posição de recuperação se vômitos e não intubar.' },
            { id: 2, question: 'Glicemia capilar < 60 mg/dL?', yes: 3, no: 4 },
            { id: 3, type: 'result', severity: 'danger', title: '⚠️ Hipoglicemia — Corrigir AGORA', conduct: 'Glicose 50% — 40-60mL IV push (ou Glucagon 1mg IM se sem acesso). Reavaliar em 5-10min. Se etilista crônico: Tiamina 100mg IV ANTES da glicose (prevenir Wernicke). Investigar causa (insulina exógena, sulfonilureia, sepse, insuficiência hepática).' },
            { id: 4, question: 'Déficit neurológico focal (assimetria pupilar, hemiplegia)?', yes: 5, no: 6 },
            { id: 5, type: 'result', severity: 'danger', title: '🚨 Causa Estrutural — Neuroimagem urgente', conduct: 'TC crânio SEM contraste imediata. Causas: AVC hemorrágico, isquêmico extenso, tumor com efeito de massa, abscesso. Se herniação (anisocoria + postura): Manitol 20% 1g/kg IV rápido + hiperventilação transitória + Neurocirurgia.' },
            { id: 6, question: 'Febre presente? Sinais meníngeos?', yes: 7, no: 8 },
            { id: 7, type: 'result', severity: 'danger', title: '⚠️ Infecção SNC — Meningite/Encefalite', conduct: 'Mesma conduta do fluxograma de cefaleia para meningite: Ceftriaxona + Dexametasona empíricos. Se suspeita de encefalite herpética (convulsões, alteração comportamental): + Aciclovir 10mg/kg IV 8/8h.' },
            { id: 8, type: 'result', severity: 'warning', title: '⚡ Causas Metabólicas/Tóxicas — Investigar', conduct: 'Gasometria (acidose?), eletrólitos (Na, K, Ca), ureia/creatinina, amônia, toxicológico. Causas comuns: intoxicação exógena (lavagem + carvão se < 1h), encefalopatia hepática (lactulose), uremia (diálise), hipercapnia (DPOC), estado pós-ictal (observar).' }
        ]
    }
];

// ============================================================
// RENDERIZAÇÃO
// ============================================================
function initFluxogramas() {
    renderFlowList();
}

function renderFlowList() {
    const listEl = document.getElementById('flow-list');
    if (!listEl) return;

    listEl.innerHTML = fluxogramas.map(flow => `
        <div class="flow-card">
            <div class="flow-card-icon">${flow.icon}</div>
            <div class="flow-card-content">
                <h3>${flow.title}</h3>
                <p>${flow.description}</p>
            </div>
            <button class="flow-start-btn" data-flow-id="${flow.id}">Iniciar →</button>
        </div>
    `).join('');

    listEl.querySelectorAll('.flow-start-btn').forEach(btn => {
        btn.addEventListener('click', () => startFlowchart(btn.dataset.flowId));
    });

    listEl.classList.remove('hidden');
    document.getElementById('flow-active').classList.add('hidden');
}

let currentFlowData = null;

function startFlowchart(flowId) {
    currentFlowData = fluxogramas.find(f => f.id === flowId);
    if (!currentFlowData) return;

    document.getElementById('flow-list').classList.add('hidden');
    const activeEl = document.getElementById('flow-active');
    activeEl.classList.remove('hidden');
    renderFlowNode(0);
}

function renderFlowNode(nodeId) {
    const node = currentFlowData.nodes.find(n => n.id === nodeId);
    const activeEl = document.getElementById('flow-active');

    if (node.type === 'result') {
        activeEl.innerHTML = `
            <div class="flow-container">
                <button class="flow-back-btn" onclick="renderFlowList()">← Voltar aos Fluxogramas</button>
                <h3 class="flow-title">${currentFlowData.icon} ${currentFlowData.title}</h3>
                <div class="flow-result flow-result-${node.severity}">
                    <h4>${node.title}</h4>
                    <div class="flow-conduct">
                        <h5>💊 Conduta Inicial:</h5>
                        <p>${node.conduct}</p>
                    </div>
                </div>
                <button class="flow-restart-btn" onclick="startFlowchart('${currentFlowData.id}')">↺ Recomeçar Fluxograma</button>
            </div>
        `;
    } else {
        activeEl.innerHTML = `
            <div class="flow-container">
                <button class="flow-back-btn" onclick="renderFlowList()">← Voltar aos Fluxogramas</button>
                <h3 class="flow-title">${currentFlowData.icon} ${currentFlowData.title}</h3>
                <div class="flow-question-box">
                    <p class="flow-question">${node.question}</p>
                    <div class="flow-buttons">
                        <button class="flow-yes-btn" onclick="renderFlowNode(${node.yes})">✅ Sim</button>
                        <button class="flow-no-btn" onclick="renderFlowNode(${node.no})">❌ Não</button>
                    </div>
                </div>
            </div>
        `;
    }
}

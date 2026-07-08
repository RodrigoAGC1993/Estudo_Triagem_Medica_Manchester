/**
 * Calculadoras Clínicas — Escores de Apoio à Decisão
 * 
 * Escores implementados:
 * - Escala de Coma de Glasgow (GCS)
 * - qSOFA (Sepsis-3)
 * - Wells — TEP (Embolia Pulmonar)
 * - Wells — TVP (Trombose Venosa Profunda)
 * - CURB-65 (Pneumonia)
 * - CHA₂DS₂-VASc (Risco de AVC na FA)
 * - HEART Score (Dor Torácica)
 * - NEWS (National Early Warning Score)
 */

document.addEventListener('DOMContentLoaded', function() {
    initCalculadoras();
});

// ============================================================
// DEFINIÇÃO DAS CALCULADORAS
// ============================================================
const calculadoras = [
    {
        id: 'glasgow',
        title: 'Escala de Coma de Glasgow (GCS)',
        icon: '🧠',
        description: 'Nível de consciência — abertura ocular, resposta verbal e motora',
        category: 'Neurologia',
        equipment: ['👁️ Observação clínica (sem equipamento especial)', '🗣️ Estímulo verbal/doloroso (para testar respostas)'],
        fields: [
            {
                label: 'Abertura Ocular',
                id: 'glasgow_eye',
                options: [
                    { value: 4, text: '4 — Espontânea' },
                    { value: 3, text: '3 — Ao estímulo verbal' },
                    { value: 2, text: '2 — À pressão/dor' },
                    { value: 1, text: '1 — Nenhuma' }
                ]
            },
            {
                label: 'Resposta Verbal',
                id: 'glasgow_verbal',
                options: [
                    { value: 5, text: '5 — Orientada' },
                    { value: 4, text: '4 — Confusa' },
                    { value: 3, text: '3 — Palavras inapropriadas' },
                    { value: 2, text: '2 — Sons incompreensíveis' },
                    { value: 1, text: '1 — Nenhuma' }
                ]
            },
            {
                label: 'Resposta Motora',
                id: 'glasgow_motor',
                options: [
                    { value: 6, text: '6 — Obedece comandos' },
                    { value: 5, text: '5 — Localiza dor' },
                    { value: 4, text: '4 — Flexão normal (retirada)' },
                    { value: 3, text: '3 — Flexão anormal (decorticação)' },
                    { value: 2, text: '2 — Extensão (descerebração)' },
                    { value: 1, text: '1 — Nenhuma' }
                ]
            }
        ],
        calculate: function(values) {
            const total = values.glasgow_eye + values.glasgow_verbal + values.glasgow_motor;
            let interpretation = '';
            let severity = '';
            if (total >= 13) { interpretation = 'TCE Leve'; severity = 'success'; }
            else if (total >= 9) { interpretation = 'TCE Moderado'; severity = 'warning'; }
            else if (total >= 4) { interpretation = 'TCE Grave'; severity = 'danger'; }
            else { interpretation = 'TCE Gravíssimo'; severity = 'danger'; }

            let notes = '';
            if (total <= 8) notes = '⚠️ Glasgow ≤ 8 = indicação de intubação orotraqueal para proteção de via aérea.';
            if (total === 3) notes = '⚠️ Pior prognóstico. Avaliar morte encefálica se causa definida.';

            return { score: total, max: 15, interpretation, severity, notes };
        },
        reference: 'Teasdale & Jennett, 1974. Atualizado em 2014 com escala de pupilas.'
    },
    {
        id: 'qsofa',
        title: 'qSOFA (Quick SOFA)',
        icon: '🦠',
        description: 'Rastreio rápido de sepse à beira-leito — Sepsis-3 (JAMA 2016)',
        category: 'Emergência / Infectologia',
        equipment: ['💉 Aparelho de pressão (esfigmomanômetro)', '⏱️ Relógio (contar frequência respiratória)', '🧠 Avaliação do nível de consciência (Glasgow)'],
        fields: [
            {
                label: 'Pressão Arterial Sistólica ≤ 100 mmHg?',
                id: 'qsofa_pa',
                options: [{ value: 0, text: 'Não' }, { value: 1, text: 'Sim' }]
            },
            {
                label: 'Frequência Respiratória ≥ 22 irpm?',
                id: 'qsofa_fr',
                options: [{ value: 0, text: 'Não' }, { value: 1, text: 'Sim' }]
            },
            {
                label: 'Alteração do Nível de Consciência (Glasgow < 15)?',
                id: 'qsofa_gcs',
                options: [{ value: 0, text: 'Não' }, { value: 1, text: 'Sim' }]
            }
        ],
        calculate: function(values) {
            const total = values.qsofa_pa + values.qsofa_fr + values.qsofa_gcs;
            let interpretation, severity, notes;
            if (total >= 2) {
                interpretation = 'qSOFA Positivo — Alto risco de sepse';
                severity = 'danger';
                notes = '⚠️ qSOFA ≥ 2: alta suspeita de sepse. Iniciar ressuscitação volêmica + colher culturas + antibiótico empírico na 1ª hora. Calcular SOFA completo.';
            } else if (total === 1) {
                interpretation = 'qSOFA Negativo — Monitorar';
                severity = 'warning';
                notes = 'Um critério positivo isolado: manter vigilância. Reavaliar se deterioração clínica.';
            } else {
                interpretation = 'qSOFA Negativo — Baixo risco';
                severity = 'success';
                notes = 'Sem critérios qSOFA. Baixo risco de sepse pelo escore, mas manter avaliação clínica.';
            }
            return { score: total, max: 3, interpretation, severity, notes };
        },
        reference: 'Singer M, et al. JAMA 2016;315(8):801-810. (Sepsis-3)'
    },
    {
        id: 'wells_tep',
        title: 'Score de Wells — TEP',
        icon: '🫁',
        description: 'Probabilidade clínica de Embolia Pulmonar',
        category: 'Pneumologia / Emergência',
        equipment: ['📋 Anamnese detalhada (histórico clínico)', '❤️ Monitor cardíaco ou oxímetro (FC)', '🦵 Exame físico dos membros inferiores (sinais de TVP)'],
        fields: [
            { label: 'Sinais/sintomas clínicos de TVP?', id: 'wells_tvp', options: [{ value: 0, text: 'Não' }, { value: 3, text: 'Sim (+3)' }] },
            { label: 'TEP é o diagnóstico mais provável?', id: 'wells_likely', options: [{ value: 0, text: 'Não' }, { value: 3, text: 'Sim (+3)' }] },
            { label: 'FC > 100 bpm?', id: 'wells_fc', options: [{ value: 0, text: 'Não' }, { value: 1.5, text: 'Sim (+1,5)' }] },
            { label: 'Imobilização > 3 dias ou cirurgia nas últimas 4 semanas?', id: 'wells_imob', options: [{ value: 0, text: 'Não' }, { value: 1.5, text: 'Sim (+1,5)' }] },
            { label: 'TVP/TEP prévio?', id: 'wells_prev', options: [{ value: 0, text: 'Não' }, { value: 1.5, text: 'Sim (+1,5)' }] },
            { label: 'Hemoptise?', id: 'wells_hemo', options: [{ value: 0, text: 'Não' }, { value: 1, text: 'Sim (+1)' }] },
            { label: 'Neoplasia ativa (tratamento nos últimos 6 meses)?', id: 'wells_neo', options: [{ value: 0, text: 'Não' }, { value: 1, text: 'Sim (+1)' }] }
        ],
        calculate: function(values) {
            const total = values.wells_tvp + values.wells_likely + values.wells_fc + values.wells_imob + values.wells_prev + values.wells_hemo + values.wells_neo;
            let interpretation, severity, notes;
            if (total > 6) { interpretation = 'Alta probabilidade de TEP'; severity = 'danger'; notes = '⚠️ Alta probabilidade (>6): AngioTC de tórax indicada. Considerar anticoagulação empírica enquanto aguarda exame.'; }
            else if (total >= 2) { interpretation = 'Probabilidade intermediária'; severity = 'warning'; notes = 'Solicitar D-dímero. Se positivo → AngioTC. Se D-dímero negativo: TEP improvável.'; }
            else { interpretation = 'Baixa probabilidade de TEP'; severity = 'success'; notes = 'Solicitar D-dímero. Se negativo: TEP excluído com segurança. Se positivo: AngioTC.'; }
            return { score: total, max: 12.5, interpretation, severity, notes };
        },
        reference: 'Wells PS, et al. Thromb Haemost 2000;83(3):416-420.'
    },
    {
        id: 'curb65',
        title: 'CURB-65',
        icon: '🫁',
        description: 'Gravidade de Pneumonia Adquirida na Comunidade — define local de tratamento',
        category: 'Pneumologia',
        equipment: ['💉 Aparelho de pressão', '⏱️ Relógio (frequência respiratória)', '🧪 Exame de sangue (ureia)', '🧠 Avaliação mental (orientação tempo/espaço)'],
        fields: [
            { label: 'Confusão mental (AMTS ≤ 8)?', id: 'curb_c', options: [{ value: 0, text: 'Não' }, { value: 1, text: 'Sim' }] },
            { label: 'Ureia > 50 mg/dL (> 7 mmol/L)?', id: 'curb_u', options: [{ value: 0, text: 'Não' }, { value: 1, text: 'Sim' }] },
            { label: 'Frequência Respiratória ≥ 30 irpm?', id: 'curb_r', options: [{ value: 0, text: 'Não' }, { value: 1, text: 'Sim' }] },
            { label: 'PA: Sistólica < 90 ou Diastólica ≤ 60 mmHg?', id: 'curb_b', options: [{ value: 0, text: 'Não' }, { value: 1, text: 'Sim' }] },
            { label: 'Idade ≥ 65 anos?', id: 'curb_65', options: [{ value: 0, text: 'Não' }, { value: 1, text: 'Sim' }] }
        ],
        calculate: function(values) {
            const total = values.curb_c + values.curb_u + values.curb_r + values.curb_b + values.curb_65;
            let interpretation, severity, notes;
            if (total >= 4) { interpretation = 'Pneumonia grave — UTI'; severity = 'danger'; notes = '⚠️ Mortalidade ~30%. Internação em UTI. Antibioticoterapia IV de amplo espectro. Considerar vasopressores.'; }
            else if (total === 3) { interpretation = 'Pneumonia grave — Internação hospitalar'; severity = 'danger'; notes = 'Mortalidade ~17%. Internação + antibiótico IV. Avaliar necessidade de UTI.'; }
            else if (total === 2) { interpretation = 'Moderada — Internação breve ou hospital-dia'; severity = 'warning'; notes = 'Mortalidade ~9%. Considerar internação curta ou supervisão ambulatorial intensificada.'; }
            else { interpretation = 'Leve — Tratamento ambulatorial'; severity = 'success'; notes = 'Mortalidade < 3%. Tratamento domiciliar com antibiótico oral. Reavaliação em 48h.'; }
            return { score: total, max: 5, interpretation, severity, notes };
        },
        reference: 'Lim WS, et al. Thorax 2003;58(5):377-382. British Thoracic Society.'
    },
    {
        id: 'cha2ds2vasc',
        title: 'CHA₂DS₂-VASc',
        icon: '❤️',
        description: 'Risco de AVC em pacientes com Fibrilação Atrial — indicação de anticoagulação',
        category: 'Cardiologia',
        equipment: ['📋 Prontuário médico / Anamnese (histórico de doenças)', '🫀 Ecocardiograma (para FE, se disponível)'],
        fields: [
            { label: 'Insuficiência Cardíaca Congestiva (ou FE < 40%)?', id: 'cha_c', options: [{ value: 0, text: 'Não' }, { value: 1, text: 'Sim (+1)' }] },
            { label: 'Hipertensão Arterial?', id: 'cha_h', options: [{ value: 0, text: 'Não' }, { value: 1, text: 'Sim (+1)' }] },
            { label: 'Idade ≥ 75 anos?', id: 'cha_a2', options: [{ value: 0, text: 'Não' }, { value: 2, text: 'Sim (+2)' }] },
            { label: 'Diabetes Mellitus?', id: 'cha_d', options: [{ value: 0, text: 'Não' }, { value: 1, text: 'Sim (+1)' }] },
            { label: 'AVC/AIT/Tromboembolismo prévio?', id: 'cha_s2', options: [{ value: 0, text: 'Não' }, { value: 2, text: 'Sim (+2)' }] },
            { label: 'Doença vascular (IAM prévio, DAP, placa aórtica)?', id: 'cha_v', options: [{ value: 0, text: 'Não' }, { value: 1, text: 'Sim (+1)' }] },
            { label: 'Idade 65-74 anos?', id: 'cha_a', options: [{ value: 0, text: 'Não' }, { value: 1, text: 'Sim (+1)' }] },
            { label: 'Sexo feminino?', id: 'cha_sc', options: [{ value: 0, text: 'Não' }, { value: 1, text: 'Sim (+1)' }] }
        ],
        calculate: function(values) {
            const total = values.cha_c + values.cha_h + values.cha_a2 + values.cha_d + values.cha_s2 + values.cha_v + values.cha_a + values.cha_sc;
            let interpretation, severity, notes;
            if (total >= 2) { interpretation = 'Alto risco — Anticoagulação recomendada'; severity = 'danger'; notes = 'Anticoagulação oral indicada (DOACs preferidos sobre warfarina na FA não-valvar). Risco anual de AVC significativo.'; }
            else if (total === 1) { interpretation = 'Risco moderado — Considerar anticoagulação'; severity = 'warning'; notes = 'Anticoagulação deve ser considerada (especialmente se o fator não for sexo feminino isolado). Discutir risco-benefício.'; }
            else { interpretation = 'Baixo risco — Sem anticoagulação'; severity = 'success'; notes = 'Score 0 em homem (ou 1 se apenas sexo feminino): não requer anticoagulação. Reavaliar se novos fatores de risco.'; }
            return { score: total, max: 9, interpretation, severity, notes };
        },
        reference: 'Lip GY, et al. Chest 2010;137(2):263-272. ESC Guidelines 2020.'
    },
    {
        id: 'heart',
        title: 'HEART Score',
        icon: '💔',
        description: 'Estratificação de risco em dor torácica na emergência — evento cardíaco adverso em 6 semanas',
        category: 'Cardiologia / Emergência',
        equipment: ['📋 Anamnese (característica da dor)', '📈 Eletrocardiograma (ECG 12 derivações)', '🧪 Exame de sangue (troponina)', '📋 Histórico de fatores de risco (DM, HAS, tabagismo, colesterol, família)'],
        fields: [
            {
                label: 'História (anamnese)',
                id: 'heart_h',
                options: [
                    { value: 0, text: '0 — Pouco suspeita (atípica)' },
                    { value: 1, text: '1 — Moderadamente suspeita' },
                    { value: 2, text: '2 — Altamente suspeita (típica anginosa)' }
                ]
            },
            {
                label: 'ECG',
                id: 'heart_e',
                options: [
                    { value: 0, text: '0 — Normal' },
                    { value: 1, text: '1 — Alteração inespecífica de repolarização' },
                    { value: 2, text: '2 — Desvio ST significativo' }
                ]
            },
            {
                label: 'Idade',
                id: 'heart_a',
                options: [
                    { value: 0, text: '0 — < 45 anos' },
                    { value: 1, text: '1 — 45-64 anos' },
                    { value: 2, text: '2 — ≥ 65 anos' }
                ]
            },
            {
                label: 'Fatores de Risco (DM, HAS, tabagismo, dislipidemia, obesidade, HF)',
                id: 'heart_r',
                options: [
                    { value: 0, text: '0 — Nenhum fator' },
                    { value: 1, text: '1 — 1-2 fatores' },
                    { value: 2, text: '2 — ≥ 3 fatores ou DAC conhecida' }
                ]
            },
            {
                label: 'Troponina',
                id: 'heart_t',
                options: [
                    { value: 0, text: '0 — Normal' },
                    { value: 1, text: '1 — 1-3x o limite superior' },
                    { value: 2, text: '2 — > 3x o limite superior' }
                ]
            }
        ],
        calculate: function(values) {
            const total = values.heart_h + values.heart_e + values.heart_a + values.heart_r + values.heart_t;
            let interpretation, severity, notes;
            if (total >= 7) { interpretation = 'Alto risco — Evento cardíaco ~50-65%'; severity = 'danger'; notes = '⚠️ Internação + estratégia invasiva precoce (cateterismo). Anticoagulação + dupla antiagregação.'; }
            else if (total >= 4) { interpretation = 'Risco intermediário — Evento ~12-16%'; severity = 'warning'; notes = 'Internação para observação + troponina seriada. Considerar teste provocativo ou cateterismo conforme evolução.'; }
            else { interpretation = 'Baixo risco — Evento ~1-2%'; severity = 'success'; notes = 'Candidato a alta precoce da emergência com seguimento ambulatorial. Considerar teste provocativo eletivo.'; }
            return { score: total, max: 10, interpretation, severity, notes };
        },
        reference: 'Six AJ, et al. Neth Heart J 2008;16(6):191-196. Validado em >10.000 pacientes.'
    },
    {
        id: 'news',
        title: 'NEWS2 (National Early Warning Score)',
        icon: '📊',
        description: 'Detecção precoce de deterioração clínica — utilizado na ronda de enfermagem',
        category: 'Cuidados Críticos',
        equipment: ['💉 Aparelho de pressão', '🌡️ Termômetro', '⏱️ Relógio (FC e FR)', '🫁 Oxímetro de pulso (SpO2)', '🧠 Avaliação do nível de consciência'],
        fields: [
            {
                label: 'Frequência Respiratória (irpm)',
                id: 'news_rr',
                options: [
                    { value: 3, text: '≤ 8' },
                    { value: 1, text: '9-11' },
                    { value: 0, text: '12-20' },
                    { value: 2, text: '21-24' },
                    { value: 3, text: '≥ 25' }
                ]
            },
            {
                label: 'SpO2 (%)',
                id: 'news_spo2',
                options: [
                    { value: 3, text: '≤ 91' },
                    { value: 2, text: '92-93' },
                    { value: 1, text: '94-95' },
                    { value: 0, text: '≥ 96' }
                ]
            },
            {
                label: 'Suplemento de O2?',
                id: 'news_o2',
                options: [{ value: 0, text: 'Não (ar ambiente)' }, { value: 2, text: 'Sim' }]
            },
            {
                label: 'Temperatura (°C)',
                id: 'news_temp',
                options: [
                    { value: 3, text: '≤ 35,0' },
                    { value: 1, text: '35,1-36,0' },
                    { value: 0, text: '36,1-38,0' },
                    { value: 1, text: '38,1-39,0' },
                    { value: 2, text: '≥ 39,1' }
                ]
            },
            {
                label: 'Pressão Arterial Sistólica (mmHg)',
                id: 'news_sbp',
                options: [
                    { value: 3, text: '≤ 90' },
                    { value: 2, text: '91-100' },
                    { value: 1, text: '101-110' },
                    { value: 0, text: '111-219' },
                    { value: 3, text: '≥ 220' }
                ]
            },
            {
                label: 'Frequência Cardíaca (bpm)',
                id: 'news_hr',
                options: [
                    { value: 3, text: '≤ 40' },
                    { value: 1, text: '41-50' },
                    { value: 0, text: '51-90' },
                    { value: 1, text: '91-110' },
                    { value: 2, text: '111-130' },
                    { value: 3, text: '≥ 131' }
                ]
            },
            {
                label: 'Nível de Consciência',
                id: 'news_avpu',
                options: [
                    { value: 0, text: 'Alerta' },
                    { value: 3, text: 'Confuso / Voz / Dor / Irresponsivo (qualquer novo)' }
                ]
            }
        ],
        calculate: function(values) {
            const total = values.news_rr + values.news_spo2 + values.news_o2 + values.news_temp + values.news_sbp + values.news_hr + values.news_avpu;
            let interpretation, severity, notes;
            if (total >= 7) { interpretation = 'Risco ALTO — Resposta de emergência'; severity = 'danger'; notes = '⚠️ Score ≥ 7: alerta vermelho. Avaliação médica urgente (minutos). Considerar UTI. Monitoração contínua.'; }
            else if (total >= 5) { interpretation = 'Risco MÉDIO — Resposta urgente'; severity = 'warning'; notes = 'Score 5-6: alerta laranja. Revisão médica imediata. Aumentar frequência de monitoração. Considerar escalonamento.'; }
            else if (total >= 1) { interpretation = 'Risco BAIXO'; severity = 'success'; notes = 'Score 1-4: monitoração habitual (mínimo 12/12h). Alertar se score individual 3 em qualquer parâmetro.'; }
            else { interpretation = 'Score 0 — Monitoração de rotina'; severity = 'success'; notes = 'Todos os parâmetros normais. Manter monitoração de rotina conforme protocolo institucional.'; }
            return { score: total, max: 20, interpretation, severity, notes };
        },
        reference: 'Royal College of Physicians, 2017. NEWS2 — National Early Warning Score.'
    }
];

// ============================================================
// LÓGICA DE RENDERIZAÇÃO
// ============================================================
function initCalculadoras() {
    renderCalcList();
}

function renderCalcList() {
    const listEl = document.getElementById('calc-list');
    if (!listEl) return;

    listEl.innerHTML = calculadoras.map(calc => `
        <div class="calc-card" data-calc-id="${calc.id}">
            <div class="calc-card-icon">${calc.icon}</div>
            <div class="calc-card-content">
                <h3>${calc.title}</h3>
                <p>${calc.description}</p>
                <span class="calc-card-category">${calc.category}</span>
                <div class="calc-card-equip">
                    <strong>Necessário:</strong> ${calc.equipment.join(' • ')}
                </div>
            </div>
            <button class="calc-open-btn" data-calc-id="${calc.id}">Calcular →</button>
        </div>
    `).join('');

    listEl.querySelectorAll('.calc-open-btn').forEach(btn => {
        btn.addEventListener('click', () => openCalculadora(btn.dataset.calcId));
    });

    listEl.classList.remove('hidden');
    document.getElementById('calc-active').classList.add('hidden');
}

function openCalculadora(calcId) {
    const calc = calculadoras.find(c => c.id === calcId);
    if (!calc) return;

    document.getElementById('calc-list').classList.add('hidden');
    const activeEl = document.getElementById('calc-active');
    activeEl.classList.remove('hidden');

    activeEl.innerHTML = `
        <div class="calc-form-container">
            <button class="calc-back-btn" id="calc-back">← Voltar</button>
            <div class="calc-form-header">
                <span class="calc-form-icon">${calc.icon}</span>
                <h3>${calc.title}</h3>
                <p>${calc.description}</p>
                <div class="calc-equip-box">
                    <strong>🩺 Você vai precisar de:</strong>
                    <ul>${calc.equipment.map(e => `<li>${e}</li>`).join('')}</ul>
                </div>
                <small class="calc-ref">📖 ${calc.reference}</small>
            </div>
            <form id="calc-form" class="calc-form">
                ${calc.fields.map(field => `
                    <div class="calc-field">
                        <label>${field.label}</label>
                        <select name="${field.id}" required>
                            <option value="">Selecione...</option>
                            ${field.options.map(opt => `<option value="${opt.value}">${opt.text}</option>`).join('')}
                        </select>
                    </div>
                `).join('')}
                <button type="submit" class="calc-submit-btn">Calcular Score</button>
            </form>
            <div id="calc-result" class="calc-result hidden"></div>
        </div>
    `;

    document.getElementById('calc-back').addEventListener('click', renderCalcList);

    document.getElementById('calc-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const values = {};
        let allFilled = true;
        calc.fields.forEach(field => {
            const val = formData.get(field.id);
            if (val === '' || val === null) { allFilled = false; }
            values[field.id] = parseFloat(val) || 0;
        });

        if (!allFilled) { return; }

        const result = calc.calculate(values);
        const resultEl = document.getElementById('calc-result');
        resultEl.className = `calc-result calc-result-${result.severity}`;
        resultEl.innerHTML = `
            <div class="calc-score-display">
                <span class="calc-score-number">${result.score}</span>
                <span class="calc-score-max">/ ${result.max}</span>
            </div>
            <h4>${result.interpretation}</h4>
            <p class="calc-notes">${result.notes}</p>
        `;
        resultEl.classList.remove('hidden');
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

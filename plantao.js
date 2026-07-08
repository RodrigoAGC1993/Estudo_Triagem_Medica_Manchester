/**
 * Simulador de Plantão — Casos multi-etapas com revelação progressiva
 * Monitor de sinais vitais animado + Deterioração + Desfechos alternativos
 * Inspirado em Body Interact e SimulaMax
 */
document.addEventListener('DOMContentLoaded', function() { initPlantao(); });

// ============================================================
// SISTEMA DE SINAIS VITAIS DINÂMICOS
// ============================================================
let vitalSigns = { fc: 80, pas: 120, pad: 80, spo2: 98, fr: 16, temp: 36.5 };
let vitalInterval = null;
let deteriorationLevel = 0; // 0=estável, 1=alerta, 2=crítico, 3=PCR
let deteriorationTimer = null;
const DETERIORATION_INTERVAL = 45000; // 45s sem responder → piora

function startVitalMonitor(initialVitals) {
    vitalSigns = { ...initialVitals };
    deteriorationLevel = 0;
    updateVitalDisplay();
    if (vitalInterval) clearInterval(vitalInterval);
    vitalInterval = setInterval(() => {
        // Leve variação natural (simulação)
        vitalSigns.fc += Math.round((Math.random() - 0.5) * 3);
        vitalSigns.pas += Math.round((Math.random() - 0.5) * 2);
        vitalSigns.spo2 += Math.round((Math.random() - 0.5) * 0.5);
        // Clampar valores
        vitalSigns.fc = Math.max(30, Math.min(200, vitalSigns.fc));
        vitalSigns.pas = Math.max(50, Math.min(250, vitalSigns.pas));
        vitalSigns.spo2 = Math.max(60, Math.min(100, vitalSigns.spo2));
        updateVitalDisplay();
    }, 2000);
}

function stopVitalMonitor() {
    if (vitalInterval) clearInterval(vitalInterval);
    if (deteriorationTimer) clearTimeout(deteriorationTimer);
}

function deterioratePatient() {
    deteriorationLevel++;
    if (deteriorationLevel === 1) {
        // Alerta - piora leve
        vitalSigns.fc += 15;
        vitalSigns.pas -= 10;
        vitalSigns.spo2 -= 3;
        showDeteriorationAlert('⚠️ O paciente está piorando! Seus sinais vitais estão se deteriorando.');
    } else if (deteriorationLevel === 2) {
        // Crítico
        vitalSigns.fc += 25;
        vitalSigns.pas -= 20;
        vitalSigns.spo2 -= 8;
        vitalSigns.fr += 8;
        showDeteriorationAlert('🚨 CRÍTICO! O paciente está em franca deterioração! Tome uma decisão AGORA!');
    } else if (deteriorationLevel >= 3) {
        // PCR
        vitalSigns.fc = 0;
        vitalSigns.pas = 0;
        vitalSigns.pad = 0;
        vitalSigns.spo2 = 0;
        showDeteriorationAlert('💀 PARADA CARDIORRESPIRATÓRIA! O paciente parou — demora excessiva na conduta.');
        plantaoScore = Math.max(0, plantaoScore - 5);
    }
    updateVitalDisplay();
}

function applyDecisionToVitals(points) {
    // Decisão boa → estabiliza; decisão ruim → piora
    if (points >= 3) {
        vitalSigns.fc = Math.max(60, vitalSigns.fc - 10);
        vitalSigns.pas = Math.min(130, vitalSigns.pas + 10);
        vitalSigns.spo2 = Math.min(99, vitalSigns.spo2 + 3);
        if (deteriorationLevel > 0) deteriorationLevel--;
    } else if (points <= -1) {
        vitalSigns.fc += 10;
        vitalSigns.pas -= 8;
        vitalSigns.spo2 -= 2;
        deteriorationLevel = Math.min(2, deteriorationLevel + 1);
    }
    updateVitalDisplay();
}

function startDeteriorationClock() {
    if (deteriorationTimer) clearTimeout(deteriorationTimer);
    deteriorationTimer = setTimeout(() => {
        deterioratePatient();
        // Se não parou, agenda próxima deterioração mais rápida
        if (deteriorationLevel < 3) {
            deteriorationTimer = setTimeout(() => deterioratePatient(), 30000);
        }
    }, DETERIORATION_INTERVAL);
}

function resetDeteriorationClock() {
    if (deteriorationTimer) clearTimeout(deteriorationTimer);
    startDeteriorationClock();
}

function showDeteriorationAlert(msg) {
    const el = document.getElementById('plt-deterioration-alert');
    if (el) {
        el.textContent = msg;
        el.className = `plt-deterioration-alert plt-det-${deteriorationLevel}`;
        el.classList.remove('hidden');
        setTimeout(() => el.classList.add('hidden'), 5000);
    }
}

function updateVitalDisplay() {
    const el = document.getElementById('plt-vitals-monitor');
    if (!el) return;

    const fcClass = vitalSigns.fc > 120 || vitalSigns.fc < 50 ? 'vital-danger' : vitalSigns.fc > 100 ? 'vital-warning' : 'vital-normal';
    const paClass = vitalSigns.pas < 90 || vitalSigns.pas > 180 ? 'vital-danger' : vitalSigns.pas < 100 ? 'vital-warning' : 'vital-normal';
    const spo2Class = vitalSigns.spo2 < 90 ? 'vital-danger' : vitalSigns.spo2 < 94 ? 'vital-warning' : 'vital-normal';
    const frClass = vitalSigns.fr > 24 || vitalSigns.fr < 8 ? 'vital-danger' : vitalSigns.fr > 20 ? 'vital-warning' : 'vital-normal';

    el.innerHTML = `
        <div class="vital-item ${fcClass}">
            <span class="vital-label">FC</span>
            <span class="vital-value">${vitalSigns.fc}</span>
            <span class="vital-unit">bpm</span>
        </div>
        <div class="vital-item ${paClass}">
            <span class="vital-label">PA</span>
            <span class="vital-value">${vitalSigns.pas}/${vitalSigns.pad}</span>
            <span class="vital-unit">mmHg</span>
        </div>
        <div class="vital-item ${spo2Class}">
            <span class="vital-label">SpO2</span>
            <span class="vital-value">${vitalSigns.spo2}</span>
            <span class="vital-unit">%</span>
        </div>
        <div class="vital-item ${frClass}">
            <span class="vital-label">FR</span>
            <span class="vital-value">${vitalSigns.fr}</span>
            <span class="vital-unit">irpm</span>
        </div>
    `;
}

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
    initialVitals: { fc: 110, pas: 95, pad: 60, spo2: 93, fr: 22, temp: 36.4 },
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
    initialVitals: { fc: 125, pas: 78, pad: 45, spo2: 90, fr: 28, temp: 39.2 },
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
    initialVitals: { fc: 112, pas: 118, pad: 72, spo2: 92, fr: 24, temp: 36.8 },
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
},
// === CASO 4: CETOACIDOSE DIABÉTICA ===
{
    id: 'cad_plantao',
    title: 'Adolescente com Confusão e Respiração Rápida',
    difficulty: 'Intermediário',
    specialty: 'Endocrinologia / Emergência',
    icon: '⚖️',
    initialVitals: { fc: 118, pas: 100, pad: 60, spo2: 97, fr: 30, temp: 37.0 },
    steps: [
        { type: 'info', title: '📋 Chamado', text: 'Domingo, 8h. Mãe traz adolescente de 16 anos, magra, que está "estranha" desde ontem. Queixa de muita sede, urinando muito, e hoje amanheceu confusa. Mãe sentiu "cheiro estranho" na respiração.' },
        { type: 'choice', title: '🩺 Primeira Avaliação', text: 'A paciente está sonolenta, respira profundamente e rápido (Kussmaul). Hálito com odor frutado. Qual exame imediato à beira-leito?',
            options: [
                { text: 'Glicemia capilar (dextro)', points: 3, feedback: '✅ Correto! Glicemia capilar em < 1 minuto. Hálito cetônico + Kussmaul + poliúria = CAD até prova contrária. Dextro é imediato.' },
                { text: 'TC de crânio', points: -1, feedback: '❌ TC é para AVC/lesão estrutural. O quadro aponta para causa metabólica (CAD). Dextro primeiro.' },
                { text: 'Rx de tórax', points: 0, feedback: '⚠️ Rx pode ser útil depois, mas não é a prioridade. Glicemia capilar é o teste-chave aqui.' },
                { text: 'Eletroencefalograma', points: -2, feedback: '❌ EEG é para epilepsia. Não se aplica aqui. O quadro é metabólico.' }
            ]
        },
        { type: 'info', title: '📊 Resultados', text: 'Glicemia capilar: 480 mg/dL (!!)\nGasometria: pH 7,18 | HCO3: 8 | pCO2: 18\nCetonúria: ++++\nK+: 5,8 mEq/L\n\nDiagnóstico: Cetoacidose Diabética (CAD) grave\n(pH < 7,2 + glicemia > 250 + cetose)' },
        { type: 'choice', title: '💊 Tratamento Inicial', text: 'CAD grave confirmada. O que fazer PRIMEIRO?',
            options: [
                { text: 'Hidratação IV agressiva: SF 0,9% — 1-1,5L na 1ª hora', points: 3, feedback: '✅ Correto! A prioridade número 1 na CAD é VOLUME. Pacientes perdem 5-10L de líquido. SF 0,9% 1-1,5L na primeira hora, depois 250-500mL/h.' },
                { text: 'Insulina Regular em bolus IV 20 unidades', points: 0, feedback: '⚠️ Insulina é fundamental, mas NÃO em bolus alto e NÃO antes do volume. Hidratação primeiro → insulina em infusão contínua depois (0,1U/kg/h).' },
                { text: 'Bicarbonato de sódio IV', points: -1, feedback: '❌ Bicarbonato só é indicado se pH < 6,9 (acidose extrema). pH 7,18 não requer. A correção vem com insulina + hidratação.' },
                { text: 'Gluconato de cálcio IV (K+ elevado)', points: 1, feedback: '⚠️ K+ 5,8 é elevado, mas na CAD o potássio total corporal está DEPLETADO (sai da célula pela acidose). Ao corrigir pH, K+ vai cair. Monitorar, mas volume+insulina resolvem.' }
            ]
        },
        { type: 'choice', title: '💉 Insulinoterapia', text: 'Após 1h de hidratação, PA melhorou (110/70). Quando e como iniciar insulina?',
            options: [
                { text: 'Insulina Regular IV contínua: 0,1 U/kg/hora (após confirmar K+ > 3,3)', points: 3, feedback: '✅ Perfeito! Infusão contínua de insulina Regular. Meta: baixar glicemia 50-70 mg/dL/hora. Só iniciar se K+ > 3,3 (repor K antes se necessário).' },
                { text: 'Insulina NPH subcutânea 20U', points: -2, feedback: '❌ NPH é insulina basal de ação lenta. Na CAD grave, precisa ser IV contínua para controle preciso. SC é para depois da resolução.' },
                { text: 'Metformina 850mg VO', points: -3, feedback: '❌ Metformina é CONTRAINDICADA na CAD (risco de acidose lática). Além disso, paciente confusa não deve receber VO.' },
                { text: 'Sem insulina — apenas soro resolve', points: -2, feedback: '❌ Hidratação sozinha não resolve cetose. Insulina é essencial para interromper a lipólise e cetogênese.' }
            ]
        },
        { type: 'choice', title: '🔬 Monitoramento', text: 'A paciente está recebendo SF + Insulina IV. Com que frequência monitorar glicemia e K+ nas primeiras horas?',
            options: [
                { text: 'Glicemia a cada 1h + K+ a cada 2h', points: 3, feedback: '✅ Correto! Glicemia horária (ajustar velocidade da insulina), eletrólitos a cada 2-4h. Meta: queda de 50-70mg/dL/h.' },
                { text: 'Glicemia a cada 6h', points: -1, feedback: '❌ Muito espaçado. Na CAD grave a glicemia muda rapidamente — pode causar hipoglicemia se não monitorar de perto.' },
                { text: 'Apenas 1 controle após 12h', points: -2, feedback: '❌ Perigoso. Paciente em CAD pode ter hipo/hipercalemia fatal se não monitorada de perto.' },
                { text: 'Não precisa repetir — já tem o diagnóstico', points: -3, feedback: '❌ Gravíssimo. O tratamento da CAD requer monitoramento intensivo contínuo até resolução (pH > 7,3, HCO3 > 18, glicemia < 200).' }
            ]
        },
        { type: 'info', title: '✅ Desfecho', text: '🎉 Após 12h: pH 7,35, HCO3 16, glicemia 180. Cetose resolvendo. Transição para insulina SC (basal-bolus). Paciente é DM1 não diagnosticada — primeiro episódio. Encaminhada para endocrinologia + educação em diabetes.' }
    ]
},
// === CASO 5: ANAFILAXIA ===
{
    id: 'anafilaxia_plantao',
    title: 'Reação Alérgica Grave Após Almoço',
    difficulty: 'Básico',
    specialty: 'Emergência / Alergologia',
    icon: '🫁',
    initialVitals: { fc: 130, pas: 80, pad: 50, spo2: 88, fr: 28, temp: 36.8 },
    steps: [
        { type: 'info', title: '📋 Chamado', text: 'Terça-feira, 13h. Homem de 35 anos chega carregado por colegas de trabalho. Estava almoçando no restaurante quando "inchou todo" e começou a sentir falta de ar. Histórico de alergia a camarão (não sabia que tinha no prato).' },
        { type: 'choice', title: '🩺 Primeira Ação', text: 'Paciente com edema de lábios e língua, urticária generalizada, estridor inspiratório e PA 80/50. O que fazer PRIMEIRO?',
            options: [
                { text: 'Adrenalina 0,3-0,5mg IM na coxa (face lateral)', points: 3, feedback: '✅ CORRETO! Adrenalina IM é a PRIMEIRA e mais importante ação na anafilaxia. Não há contraindicação absoluta. Deve ser dada IMEDIATAMENTE.' },
                { text: 'Anti-histamínico IV (difenidramina)', points: 0, feedback: '⚠️ Anti-histamínico é adjuvante, não tratamento de primeira linha. Não reverte broncoespasmo nem choque. Adrenalina primeiro!' },
                { text: 'Corticoide IV (hidrocortisona)', points: 0, feedback: '⚠️ Corticoide previne reação bifásica (horas depois), mas leva 4-6h para agir. Não é a primeira ação — adrenalina é.' },
                { text: 'Observar por 15 min e reavaliar', points: -3, feedback: '❌ PERIGOSO! Anafilaxia com estridor e hipotensão pode evoluir para PCR em minutos. Adrenalina IMEDIATA salva vidas.' }
            ]
        },
        { type: 'choice', title: '💉 Via e Dose da Adrenalina', text: 'Qual a via CORRETA para adrenalina na anafilaxia (paciente adulto, NÃO em PCR)?',
            options: [
                { text: 'IM (intramuscular) na face lateral da coxa — 0,3 a 0,5mg (1:1000)', points: 3, feedback: '✅ Correto! Adrenalina 1:1000 IM no vasto lateral da coxa. Pode repetir a cada 5-15 min se necessário. Via IV só em choque refratário (diluída, em bomba).' },
                { text: 'IV push 1mg (como na PCR)', points: -3, feedback: '❌ PERIGOSO! 1mg IV push é dose de PCR. Em paciente com pulso, causa arritmia fatal. Na anafilaxia com pulso: IM 0,3-0,5mg.' },
                { text: 'Subcutânea no braço — 0,1mg', points: -1, feedback: '❌ Via SC tem absorção lenta e imprevisível. IM na coxa é superior (absorção rápida pelo músculo vasto lateral).' },
                { text: 'Nebulização com adrenalina', points: 1, feedback: '⚠️ Adrenalina nebulizada ajuda no estridor (edema laríngeo) como complemento, mas NÃO substitui a IM sistêmica.' }
            ]
        },
        { type: 'info', title: '📊 Resposta (3 min após adrenalina IM)', text: 'PA: 95/62 (melhorando) | FC: 115 (descendo) | SpO2: 91% com O2\nEstridor diminuiu mas persiste leve. Urticária ainda presente. Paciente mais alerta.' },
        { type: 'choice', title: '💊 Próximos Passos', text: 'Adrenalina dada, melhora parcial. O que fazer agora?',
            options: [
                { text: 'Volume IV (SF 1-2L) + Corticoide IV + Anti-histamínico + Monitorar (repetir adrenalina se piora)', points: 3, feedback: '✅ Correto! Pós-adrenalina: volume para hipotensão, corticoide para prevenir fase bifásica, anti-H1 para urticária. Observar mínimo 6-12h.' },
                { text: 'Alta imediata com prescrição de anti-alérgico oral', points: -3, feedback: '❌ Jamais! Anafilaxia tem risco de reação bifásica (retorno dos sintomas em 4-12h). Observação mínima de 6h — idealmente 12-24h.' },
                { text: 'Apenas anti-histamínico e observar', points: 0, feedback: '⚠️ Anti-histamínico ajuda na urticária, mas sem volume + corticoide + plano de repetir adrenalina, o paciente está subprotegido.' },
                { text: 'Intubação imediata (profilática)', points: -1, feedback: '⚠️ Estridor está melhorando — não há indicação de IOT profilática agora. Só se piorar ou não responder à 2ª dose de adrenalina.' }
            ]
        },
        { type: 'choice', title: '📋 Orientação de Alta', text: 'Paciente estável após 12h de observação. O que orientar na alta?',
            options: [
                { text: 'Prescrever caneta de adrenalina autoinjetável + encaminhar alergista + orientar evitar camarão', points: 3, feedback: '✅ Perfeito! Toda anafilaxia requer: (1) caneta de epinefrina para emergência, (2) encaminhamento ao alergista, (3) identificação e evitação do gatilho, (4) plano de ação escrito.' },
                { text: 'Apenas evitar camarão, sem medicamento', points: 0, feedback: '⚠️ Evitar o alérgeno é crucial, mas exposição acidental acontece. Sem adrenalina autoinjetável, o próximo episódio pode ser fatal.' },
                { text: 'Nenhuma orientação — cura total', points: -2, feedback: '❌ Alergia com anafilaxia é para a vida toda. Sem plano de emergência, mortalidade no próximo episódio é elevada.' },
                { text: 'Prescrever corticoide de uso contínuo', points: -1, feedback: '❌ Corticoide crônico NÃO previne anafilaxia e tem efeitos colaterais graves. O correto é adrenalina autoinjetável + evitação.' }
            ]
        },
        { type: 'info', title: '✅ Desfecho', text: '🎉 Paciente recebe alta com caneta de epinefrina autoinjetável + placa de identificação de alergia + encaminhamento ao alergista. Orientado sobre reação cruzada com crustáceos. Família treinada para uso da caneta.' }
    ]
},
// === CASO 6: AVC ISQUÊMICO ===
{
    id: 'avc_plantao',
    title: 'Idoso com Boca Torta e Braço Fraco',
    difficulty: 'Avançado',
    specialty: 'Neurologia / Emergência',
    icon: '🧠',
    initialVitals: { fc: 88, pas: 185, pad: 100, spo2: 96, fr: 18, temp: 36.6 },
    steps: [
        { type: 'info', title: '📋 Chamado', text: 'Segunda, 9h15. Esposa liga desesperada: "Meu marido acordou normal, mas às 8h30 ficou com a boca torta e não levanta o braço esquerdo." Homem 68 anos, hipertenso, diabético, FA conhecida mas não usa anticoagulante ("esquece").' },
        { type: 'choice', title: '⏱️ Informação Crítica', text: 'Paciente chega às 9h30. Qual é a pergunta MAIS IMPORTANTE para definir conduta?',
            options: [
                { text: 'Que horas exatamente começaram os sintomas? (delta T)', points: 3, feedback: '✅ Essencial! O "time zero" (início dos sintomas) define se o paciente é candidato a trombólise (até 4,5h) ou trombectomia (até 24h em casos selecionados). Neste caso: 8h30 → delta T = 1h.' },
                { text: 'Qual remédio de pressão toma?', points: 0, feedback: '⚠️ Importante para histórico, mas NÃO define a conduta imediata. O tempo desde o início é a informação-chave.' },
                { text: 'Já teve AVC antes?', points: 1, feedback: '⚠️ Relevante, mas não muda a urgência agora. Time is brain — defina o delta T primeiro.' },
                { text: 'Tem plano de saúde?', points: -2, feedback: '❌ Irrelevante na emergência. O atendimento é prioridade absoluta independente de plano.' }
            ]
        },
        { type: 'info', title: '📊 Exame Neurológico Rápido', text: 'NIHSS: 14 pontos (AVC moderado-grave)\n• Desvio do olhar para direita\n• Hemianopsia esquerda\n• Paralisia facial esquerda\n• Hemiplegia esquerda (MSD força 0)\n• Hemihipoestesia esquerda\n• Disartria\n\nDelta T: 1 hora (dentro da janela!)' },
        { type: 'choice', title: '🔬 Exame URGENTE', text: 'Qual exame é OBRIGATÓRIO antes de decidir trombólise?',
            options: [
                { text: 'TC de crânio SEM contraste (excluir hemorragia)', points: 3, feedback: '✅ Correto! TC sem contraste em < 25 min da chegada. Objetivo: excluir hemorragia. Se não há sangramento → candidato a trombólise. Não precisa esperar resultado de lab para fazer TC.' },
                { text: 'RM de crânio com difusão', points: 1, feedback: '⚠️ RM é mais sensível para AVC isquêmico, mas DEMORA MAIS e não está disponível 24h em todos os hospitais. TC é mais rápida e suficiente para excluir hemorragia.' },
                { text: 'Angiografia cerebral', points: 0, feedback: '⚠️ Angiografia (AngioTC) é útil para trombectomia, mas primeiro precisa da TC simples para excluir sangramento. Pode ser feita junto.' },
                { text: 'Eletroencefalograma', points: -2, feedback: '❌ EEG não tem papel no AVC agudo. TC de crânio é o exame-chave.' }
            ]
        },
        { type: 'info', title: '📈 TC de Crânio', text: '✅ TC sem contraste: NÃO mostra hemorragia. Hipodensidade sutil em território de ACM direita (isquemia hiperaguda).\n\nGlicemia: 145 mg/dL | INR: 1,1 | Plaquetas: 195.000\n\nPaciente ELEGÍVEL para trombólise IV! (< 4,5h, sem contraindicações)' },
        { type: 'choice', title: '💊 Trombólise', text: 'TC sem sangramento, dentro da janela (1h), sem contraindicações. Qual trombolítico e qual a meta de tempo porta-agulha?',
            options: [
                { text: 'Alteplase (rtPA) 0,9mg/kg IV — meta porta-agulha < 60 min (ideal < 45 min)', points: 3, feedback: '✅ Correto! Alteplase 0,9mg/kg (máx 90mg): 10% em bolus + 90% em 1 hora. Meta: porta-agulha < 60 min. Cada 15 min de atraso = pior prognóstico.' },
                { text: 'Heparina IV em dose plena', points: -2, feedback: '❌ Heparina NÃO é trombolítico e é CONTRAINDICADA nas primeiras 24h pós-trombólise (risco de hemorragia). Alteplase é o correto.' },
                { text: 'AAS 300mg + Clopidogrel 300mg', points: -1, feedback: '❌ Antiagregantes são contraindicados nas primeiras 24h pós-trombólise. E não substituem a trombólise em AVC agudo com janela aberta.' },
                { text: 'Tenecteplase 0,25mg/kg IV em bolus único', points: 2, feedback: '⚠️ Tenecteplase está sendo estudada para AVC e mostra resultados promissores (especialmente pré-trombectomia), mas alteplase ainda é o padrão aprovado na maioria dos guidelines.' }
            ]
        },
        { type: 'choice', title: '📊 Controle de PA', text: 'PA antes da trombólise: 185/100. Qual a conduta pressórica?',
            options: [
                { text: 'Baixar PA para < 185/110 ANTES da trombólise (labetalol ou nicardipina IV)', points: 3, feedback: '✅ Correto! PA deve estar < 185/110 para iniciar trombólise e < 180/105 nas 24h seguintes. Labetalol 10-20mg IV ou Nicardipina em bomba.' },
                { text: 'Não mexer na pressão — é hipertensão permissiva', points: -1, feedback: '❌ Hipertensão permissiva (até 220/120) é para quem NÃO recebe trombólise. Se vai trombolisar, PA deve estar < 185/110 para reduzir risco de hemorragia.' },
                { text: 'Nitroprussiato de sódio em bomba (baixar agressivamente para 120/80)', points: -2, feedback: '❌ Queda agressiva da PA no AVC agudo piora a isquemia (reduz perfusão da penumbra). Meta é < 185/110, não normalizar.' },
                { text: 'Captopril 25mg sublingual', points: -1, feedback: '❌ Sublingual tem absorção errática. Na emergência hipertensiva pré-trombólise, usar IV (labetalol, nicardipina) para controle preciso.' }
            ]
        },
        { type: 'info', title: '✅ Desfecho', text: '🎉 Trombólise com alteplase administrada em 52 min (porta-agulha). PA controlada com labetalol. Após 1h: paciente já movimenta MSD parcialmente. NIHSS caiu de 14 → 6. Internado em U-AVC. 24h: TC controle sem hemorragia. Iniciado AAS + anticoagulação para FA. Alta em 7 dias com NIHSS 2 (sequela mínima).' }
    ]
},
// === CASO 7: PNEUMOTÓRAX HIPERTENSIVO ===
{
    id: 'pneumotorax_plantao',
    title: 'Trauma Torácico com Choque',
    difficulty: 'Avançado',
    specialty: 'Cirurgia / Emergência',
    icon: '🫁',
    initialVitals: { fc: 135, pas: 75, pad: 40, spo2: 82, fr: 32, temp: 36.2 },
    steps: [
        { type: 'info', title: '📋 Chamado', text: 'Sábado, 22h. SAMU traz motociclista de 28 anos, colisão com poste. Capacete fragmentado. Consciente mas muito agitado e cianótico. Respiração laboriosa. Taquicárdico. Enfisema subcutâneo palpável à direita.' },
        { type: 'choice', title: '🩺 ABCDE — Via Aérea e Respiração', text: 'Paciente cianótico, SpO2 82%, traqueia DESVIADA para esquerda, murmúrio vesicular ABOLIDO à direita, turgência jugular bilateral. Diagnóstico?',
            options: [
                { text: 'Pneumotórax hipertensivo à direita', points: 3, feedback: '✅ Correto! Tríade clássica: hipotensão + turgência jugular + MV abolido unilateral + traqueia desviada contralateral = pneumotórax hipertensivo. Diagnóstico CLÍNICO — não esperar Rx!' },
                { text: 'Hemotórax maciço', points: 1, feedback: '⚠️ Hemotórax causa MV abolido e hipotensão, mas não causa turgência jugular nem desvio de traqueia (exceto se muito grande). O quadro é mais compatível com pneumotórax hipertensivo.' },
                { text: 'Tamponamento cardíaco', points: 0, feedback: '⚠️ Tamponamento causa hipotensão + turgência, mas NÃO causa MV abolido unilateral nem desvio de traqueia. Além disso, enfisema subcutâneo = ar no tórax.' },
                { text: 'Pneumonia bilateral', points: -2, feedback: '❌ Pneumonia não causa este quadro agudo pós-trauma. O contexto é traumático com sinais claros de ar sob pressão no tórax.' }
            ]
        },
        { type: 'choice', title: '⚡ Conduta IMEDIATA', text: 'Pneumotórax hipertensivo diagnosticado clinicamente. O que fazer AGORA?',
            options: [
                { text: 'Descompressão com agulha no 2º EIC linha hemiclavicular direita → seguida de drenagem torácica', points: 3, feedback: '✅ CORRETO! Punção descompressiva IMEDIATA (agulha 14G no 2º EIC) — ouvir o ar escapar. É tratamento de EMERGÊNCIA. Depois: drenagem torácica em selo d\'água (5º EIC linha axilar média).' },
                { text: 'Pedir Rx de tórax para confirmar antes de agir', points: -3, feedback: '❌ NUNCA esperar Rx no pneumotórax hipertensivo! Paciente pode parar em minutos. O diagnóstico é CLÍNICO e o tratamento é IMEDIATO.' },
                { text: 'Intubação + ventilação com pressão positiva', points: -2, feedback: '❌ Ventilar com pressão positiva SEM descomprimir = MATA o paciente (aumenta o pneumotórax). Descomprimir PRIMEIRO, depois intubar se necessário.' },
                { text: 'Volume IV e vasopressores', points: -1, feedback: '❌ Hipotensão aqui é MECÂNICA (ar comprimindo o coração). Volume não resolve. Descomprimir o tórax resolve a hemodinâmica.' }
            ]
        },
        { type: 'info', title: '📊 Pós-descompressão', text: 'Após punção no 2º EIC: jato de ar audível!\nPA: 100/65 (subindo!) | FC: 110 (descendo) | SpO2: 92% (melhorando)\nTraqueia retornando à linha média.\n\nDrenagem torácica em selo d\'água inserida no 5º EIC. Débito: ar contínuo + 200mL de sangue.' },
        { type: 'choice', title: '🔍 Avaliação Secundária', text: 'Tórax estabilizado. No exame secundário: paciente confuso (Glasgow 13), pupilas isocóricas, otorragia à direita, escoriações em face. O que mais investigar?',
            options: [
                { text: 'TC de crânio (TCE associado — capacete fragmentado + confusão + otorragia)', points: 3, feedback: '✅ Correto! Capacete fragmentado + confusão + otorragia (sangue no ouvido) = fratura de base de crânio até prova contrária. TC de crânio obrigatória.' },
                { text: 'Apenas observar — já está melhor', points: -2, feedback: '❌ Trauma de alta energia com confusão e otorragia sugere TCE. Sem TC, pode perder hemorragia intracraniana.' },
                { text: 'Rx de coluna cervical apenas', points: 1, feedback: '⚠️ Rx cervical é importante em politrauma, mas a prioridade com confusão + otorragia é TC de crânio (pode incluir cervical no mesmo corte).' },
                { text: 'Alta após drenagem estável', points: -3, feedback: '❌ Paciente politraumatizado com dreno torácico + TCE provável = internação em centro de trauma. Alta é inconcebível.' }
            ]
        },
        { type: 'info', title: '✅ Desfecho', text: '🎉 TC crânio: fratura de osso temporal + pequeno hematoma epidural que não requer cirurgia (observação). Dreno torácico retirado em 3 dias. Alta em 7 dias sem sequelas. Encaminhado para reabilitação.' }
    ]
},
// === CASO 8: CRISE ASMÁTICA GRAVE ===
{
    id: 'asma_plantao',
    title: 'Criança de 8 Anos com Chiado e Cianose',
    difficulty: 'Intermediário',
    specialty: 'Pediatria / Emergência',
    icon: '👶',
    initialVitals: { fc: 145, pas: 95, pad: 55, spo2: 86, fr: 40, temp: 36.9 },
    steps: [
        { type: 'info', title: '📋 Chamado', text: 'Quarta, 20h. Mãe traz criança de 8 anos, asmática conhecida, com crise há 3 horas. Usou bombinha em casa "várias vezes" sem melhora. A criança está sentada, inclinada para frente, usando musculatura acessória. Lábios discretamente arroxeados.' },
        { type: 'choice', title: '🩺 Classificação da Crise', text: 'SpO2 86%, FR 40, retração intercostal, fala palavras isoladas (não frases), cianose. Qual a classificação?',
            options: [
                { text: 'Crise asmática GRAVE / Quase fatal (near-fatal)', points: 3, feedback: '✅ Correto! SpO2 < 90% + fala apenas palavras + cianose + uso de acessória = crise grave/quase fatal. Classificação que muda completamente a conduta.' },
                { text: 'Crise leve — apenas bombinha e observação', points: -3, feedback: '❌ Perigosíssimo! SpO2 86% com cianose é gravíssimo. "Crise leve" seria SpO2 > 95%, fala frases normais, sem tiragem.' },
                { text: 'Crise moderada — nebulização e alta', points: -2, feedback: '❌ Moderada seria SpO2 90-95% com fala parcial. Esta criança tem SpO2 86% e cianose — é grave, risco de IOT.' },
                { text: 'Não é asma — é engasgo', points: -2, feedback: '❌ Criança asmática conhecida + chiado + crise progressiva = asma. Engasgo seria súbito, sem história prévia.' }
            ]
        },
        { type: 'choice', title: '💊 Tratamento Imediato', text: 'Crise grave. Qual a combinação de tratamentos da PRIMEIRA HORA?',
            options: [
                { text: 'O2 alto fluxo + Salbutamol nebulização contínua (ou 4-8 puffs a cada 20min) + Ipratrópio + Corticoide sistêmico IV', points: 3, feedback: '✅ Correto! Na crise grave: O2 (alvo SpO2 > 94%), beta-2 agonista dose alta (salbutamol nebulização ou puffs repetidos), ipratrópio associado, e corticoide sistêmico (metilprednisolona IV ou prednisolona VO) na primeira hora.' },
                { text: 'Apenas bombinha com espaçador 2 puffs e observar', points: -2, feedback: '❌ 2 puffs é dose para crise LEVE. Na crise grave: dose alta repetida (4-8 puffs a cada 20 min ou nebulização contínua) + múltiplos medicamentos.' },
                { text: 'Antibiótico IV (pode ser pneumonia)', points: -1, feedback: '❌ Sem febre e com história clara de asma, antibiótico não é prioridade. Broncoespasmo requer broncodilatador, não ATB.' },
                { text: 'Intubação imediata', points: 0, feedback: '⚠️ IOT pode ser necessária SE não responder ao tratamento máximo. Mas primeiro tenta-se o tratamento medicamentoso intensivo. IOT em asmático é arriscada (hiperinsuflação).' }
            ]
        },
        { type: 'choice', title: '⚡ Sem Melhora (30 min depois)', text: 'Após 3 nebulizações + corticoide: SpO2 89%, criança exausta, "tórax silencioso" (sibilos sumiram). O que significa e o que fazer?',
            options: [
                { text: 'Tórax silencioso = GRAVÍSSIMO (sem fluxo aéreo). Sulfato de Magnésio IV + preparar IOT', points: 3, feedback: '✅ Correto! "Tórax silencioso" não é melhora — é obstrução tão severa que não há fluxo para gerar sibilo. MgSO4 25-50mg/kg IV em 20 min. Se não melhorar: IOT + VM + cetamina.' },
                { text: 'Sibilos sumiram = melhorou! Reduzir tratamento.', points: -3, feedback: '❌ ERRO FATAL! Desaparecimento de sibilos em paciente ainda dispneico = broncoespasmo tão grave que não passa ar. É o estágio pré-PCR.' },
                { text: 'Trocar para aminofilina IV', points: 1, feedback: '⚠️ Aminofilina é alternativa em casos refratários, mas MgSO4 é preferido (menos efeitos adversos). Pode ser tentado se MgSO4 falhar.' },
                { text: 'Alta com corticoide oral — vai melhorar em casa', points: -3, feedback: '❌ Gravíssimo! Criança em insuficiência respiratória com tórax silencioso receber alta = óbito provável. Necessita IOT se não melhorar.' }
            ]
        },
        { type: 'info', title: '✅ Desfecho', text: '🎉 MgSO4 IV administrado. Após 20 min: sibilos retornam (bom sinal — tem fluxo!), SpO2 sobe para 93%. Mantida nebulização contínua em UTI pediátrica. Em 12h: SpO2 97% em ar ambiente. Alta em 3 dias com plano de manejo da asma + espaçador + consulta pneumopediátrica agendada.' }
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

    // Vital signs monitor
    startVitalMonitor(currentPlantao.initialVitals);
    startDeteriorationClock();

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
            <div class="plt-vitals-monitor" id="plt-vitals-monitor"></div>
            <div id="plt-deterioration-alert" class="plt-deterioration-alert hidden"></div>
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
    updateVitalDisplay();

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

    // Aplicar consequência nos sinais vitais
    applyDecisionToVitals(option.points);
    resetDeteriorationClock();

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
    resetDeteriorationClock();
    if (plantaoStep < currentPlantao.steps.length) {
        renderPlantaoStep();
    } else {
        endPlantao();
    }
}

function endPlantao() {
    if (plantaoTimer) clearInterval(plantaoTimer);
    stopVitalMonitor();
    const percent = plantaoMaxScore > 0 ? Math.round((plantaoScore / plantaoMaxScore) * 100) : 0;

    // Save stats
    const stats = JSON.parse(localStorage.getItem('plantao_stats') || '{}');
    stats[currentPlantao.id] = { percent, time: plantaoSeconds, date: new Date().toLocaleDateString('pt-BR') };
    localStorage.setItem('plantao_stats', JSON.stringify(stats));

    let grade, cls, outcome;
    if (percent >= 85) {
        grade = '⭐ Excelente! Conduta de especialista.';
        cls = 'grade-excellent';
        outcome = '🎉 Paciente estabilizado e encaminhado com sucesso. Boa evolução clínica.';
    } else if (percent >= 60) {
        grade = '👍 Bom desempenho!';
        cls = 'grade-good';
        outcome = '✅ Paciente sobreviveu, mas houve atraso em algumas condutas. Evolução com complicações menores.';
    } else if (percent >= 40) {
        grade = '📖 Regular — revise os protocolos.';
        cls = 'grade-regular';
        outcome = '⚠️ Paciente evoluiu com complicações significativas devido a erros na conduta. Tempo prolongado de internação.';
    } else {
        grade = '⚠️ Paciente evoluiu mal.';
        cls = 'grade-poor';
        outcome = '💀 Condutas inadequadas levaram a deterioração grave. Em cenário real, este paciente teria risco elevado de óbito.';
    }

    const min = Math.floor(plantaoSeconds / 60);
    const sec = plantaoSeconds % 60;

    const container = document.getElementById('plantao-content');
    container.innerHTML = `
        <div class="plt-result">
            <h3>${currentPlantao.icon} ${currentPlantao.title}</h3>
            <div class="plt-result-score ${cls}">${percent}%</div>
            <p class="plt-result-grade">${grade}</p>
            <div class="plt-outcome ${cls}">${outcome}</div>
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
    stopVitalMonitor();
    renderPlantaoList();
}

/**
 * Novelas Clínicas Extras — 16 casos adicionais
 * Temas: emergências, clínica médica, pediatria, ginecologia, cenários especiais
 * Todas com 4 opções equalizadas por decisão
 */

const novelaCasesExtra = [
// ===================================================================
// CASO 5: POLITRAUMA — MOTOCICLISTA
// ===================================================================
{
    id: 'novela_politrauma',
    title: 'O Motociclista na Rodovia',
    icon: '🏍️',
    description: 'Madrugada. SAMU traz motociclista de 30 anos, colisão a 80km/h. Fraturas múltiplas, instável. Você tem minutos.',
    endings: 3,
    nodes: {
        'start': {
            type: 'narrative',
            text: '🚨 Sábado, 2h. Rádio do SAMU: "Politrauma, motociclista 30 anos, colisão com caminhão. Glasgow 12, PA 85/50, FC 130. Fratura exposta de fêmur D. Deformidade em hemitórax E. Sem colar cervical — equipe colocou no local. ETA 5 min."\n\nVocê prepara a sala de trauma.',
            vitals: { fc: 130, pas: 85, pad: 50, spo2: 89, fr: 28 },
            next: 'primary_survey'
        },
        'primary_survey': {
            type: 'choice',
            text: 'Paciente chega. Consciente mas agitado, cianótico, taquicárdico. Deformidade em hemitórax esquerdo com crepitação. Sequência de avaliação:',
            options: [
                { text: 'ABCDE do trauma: A (via aérea com proteção cervical) → B (ventilação: inspeção, percussão, ausculta bilateral) → C (circulação: 2 acessos calibrosos + tipagem)', next: 'abcde_correct', points: 3 },
                { text: 'Rx de tórax AP + bacia + coluna cervical lateral (série trauma) → avaliar fraturas → definir condutas baseado nos exames de imagem', next: 'xray_delay', points: 0 },
                { text: 'FAST (USG à beira-leito) → hemoperitônio? → se positivo, laparotomia exploradora imediata sem mais exames', next: 'fast_first', points: 1 },
                { text: 'Acesso venoso central (subclávia) + SVD + monitorização invasiva (PAM) → reposição volêmica guiada por PVC antes de qualquer intervenção', next: 'central_line_delay', points: -1 }
            ]
        },
        'abcde_correct': {
            type: 'narrative',
            text: 'A: Via aérea pérvia, colar cervical mantido. Fala frases curtas.\nB: MV abolido em hemitórax E + timpanismo + turgência jugular + traqueia desviando para D.\n\n⚠️ PNEUMOTÓRAX HIPERTENSIVO à esquerda!',
            vitals: { fc: 135, pas: 78, pad: 42, spo2: 84, fr: 32 },
            next: 'pneumothorax_action'
        },
        'pneumothorax_action': {
            type: 'choice',
            text: 'Pneumotórax hipertensivo diagnosticado clinicamente (MV abolido E + timpanismo + turgência jugular + desvio traqueal). PA 78/42, SpO2 84%. Conduta:',
            options: [
                { text: 'Toracocentese descompressiva com jelco 14G no 2º espaço intercostal na linha hemiclavicular esquerda → seguida de drenagem torácica em selo d\'água no 5º EIC', next: 'decompression_done', points: 3 },
                { text: 'Drenagem torácica definitiva no 5º EIC linha axilar média E com dreno 36Fr — sem toracocentese prévia (resolve de vez)', next: 'decompression_done', points: 2 },
                { text: 'Rx de tórax portátil para confirmar diagnóstico antes de qualquer procedimento invasivo — evitar iatrogenias em paciente instável', next: 'xray_delay_pnx', points: -2 },
                { text: 'Intubação orotraqueal em sequência rápida + ventilação com pressão positiva + PEEP 10 cmH2O para expandir pulmão colapsado', next: 'intubation_disaster', points: -3 }
            ]
        },
        'decompression_done': {
            type: 'narrative',
            text: '✅ Jato de ar audível na descompressão! PA sobe para 95/60 em 2 min. SpO2: 92%.\n\nDrenagem torácica inserida: 400mL de sangue + ar contínuo.\n\nC: Dois acessos periféricos calibrosos. Tipagem + prova cruzada. SF 1L aquecido em bolus.\nHb à beira-leito: 7,2.\nFAST: líquido livre em espaço hepatorrenal (Morrison +).',
            vitals: { fc: 118, pas: 95, pad: 60, spo2: 93, fr: 24 },
            next: 'hemorrhage_management'
        },
        'hemorrhage_management': {
            type: 'choice',
            text: 'Pós-descompressão: FAST positivo (líquido em Morrison) + Hb 7,2 + PA 95/60 (respondeu parcialmente ao volume) + fratura exposta de fêmur D. Conduta para o sangramento:',
            options: [
                { text: 'Protocolo de transfusão maciça (CH:PFC:PLQ 1:1:1) + ácido tranexâmico 1g IV + manter reposição + reavaliação em 15 min — se instável: laparotomia', next: 'ending_politrauma_good', points: 3 },
                { text: 'Laparotomia exploradora imediata (FAST positivo = cirurgia) + fixação externa do fêmur no mesmo ato + transfusão intraoperatória', next: 'ending_politrauma_good', points: 2 },
                { text: 'TC de abdome com contraste para definir fonte do sangramento (baço? fígado?) antes de decidir cirurgia — paciente respondeu ao volume', next: 'ending_politrauma_regular', points: 0 },
                { text: 'Concentrado de hemácias 2U + cristaloide 3L + reavaliar FAST em 1h — fratura de fêmur justifica a Hb baixa sem necessidade de cirurgia abdominal', next: 'ending_politrauma_poor', points: -1 }
            ]
        },
        'ending_politrauma_good': {
            type: 'ending',
            title: '⭐ BOM DESFECHO — Damage Control',
            text: 'Protocolo de transfusão maciça + ácido tranexâmico. PA estabiliza. Laparotomia: laceração esplênica grau III → esplenectomia.\n\nFêmur: fixação externa provisória. Paciente na UTI, aquecido, coagulopatia corrigida.\n\nSegundo tempo cirúrgico em 48h: fixação interna definitiva do fêmur. Alta em 18 dias.',
            grade: 'excellent',
            lesson: 'LIÇÃO: No politrauma com choque hemorrágico: (1) ABCDE rigoroso, (2) descomprimir pneumotórax ANTES de volume, (3) transfusão maciça 1:1:1 + ácido tranexâmico nas primeiras 3h, (4) cirurgia de damage control se instável. FAST positivo + instabilidade = centro cirúrgico.'
        },
        'ending_politrauma_regular': {
            type: 'ending',
            title: '⚠️ DESFECHO REGULAR — Atraso na TC',
            text: 'TC mostrou laceração esplênica grau IV + hemoperitônio volumoso. Mas durante a TC (30 min), PA caiu para 70/40.\n\nLaparotomia de emergência. Esplenectomia + packing hepático. Coagulopatia instalada (tríade letal: hipotermia + acidose + coagulopatia).\n\nUTI 12 dias. Re-intervenção por sangramento. Alta em 30 dias com complicações.',
            grade: 'regular',
            lesson: 'LIÇÃO: Paciente instável com FAST positivo NÃO vai para TC — vai para o centro cirúrgico. TC é para paciente ESTÁVEL (respondeu ao volume e PA se mantém). A TC pode matar o instável no corredor da radiologia.'
        },
        'ending_politrauma_poor': {
            type: 'ending',
            title: '💀 DESFECHO RUIM — Subestimou o Sangramento',
            text: 'Você considerou que a Hb baixa era apenas pela fratura. Mas FAST positivo indica sangramento intra-abdominal ativo.\n\nEm 45 min: PA irrecuperável, 75/35. Tríade letal instalada. Coagulopatia de consumo.\n\nLaparotomia tardia: sangramento difuso (coagulopático). Packing sem controle. PCR na mesa cirúrgica.\n\nÓbito por choque hemorrágico não controlado.',
            grade: 'death',
            lesson: 'LIÇÃO: FAST positivo em paciente instável = sangramento abdominal até prova contrária — não é "só a fratura". Fratura de fêmur perde ~1,5L, mas não causa FAST positivo. A combinação exige transfusão maciça + cirurgia.'
        },
        'xray_delay': {
            type: 'narrative',
            text: 'Rx solicitados. Técnico de radiologia leva 12 min para posicionar e disparar. Enquanto isso, SpO2 cai para 80%. PA: 72/38.\n\nVocê percebe que o paciente está morrendo enquanto espera um exame.',
            vitals: { fc: 140, pas: 72, pad: 38, spo2: 80, fr: 34 },
            next: 'pneumothorax_action'
        },
        'fast_first': {
            type: 'narrative',
            text: 'FAST revela líquido livre em Morrison. Mas enquanto faz o USG, percebe: MV abolido à E + turgência jugular. O pneumotórax hipertensivo ainda não foi tratado!\n\nPA caindo: 75/40.',
            vitals: { fc: 138, pas: 75, pad: 40, spo2: 82, fr: 30 },
            next: 'pneumothorax_action'
        },
        'central_line_delay': {
            type: 'narrative',
            text: 'Tentativa de acesso central em paciente agitado com coagulopatia — 15 min perdidos + hematoma local. Sem acesso central.\n\nPaciente deteriora. SpO2: 82%. Você percebe o pneumotórax.',
            vitals: { fc: 140, pas: 70, pad: 35, spo2: 82, fr: 33 },
            next: 'pneumothorax_action'
        },
        'xray_delay_pnx': {
            type: 'narrative',
            text: 'Enquanto espera Rx, PA cai para 65/30. SpO2: 76%. Paciente perde consciência.\n\nEquipe intervém: descompressão de emergência. Jato de ar. PA recupera para 85/50.\n\nMas 8 minutos de hipotensão + hipóxia causaram dano renal e cerebral.',
            vitals: { fc: 125, pas: 85, pad: 50, spo2: 88, fr: 26 },
            next: 'hemorrhage_management'
        },
        'intubation_disaster': {
            type: 'ending',
            title: '💀 ÓBITO — Ventilação Positiva sem Descomprimir',
            text: 'Ventilação com pressão positiva em pneumotórax hipertensivo NÃO drenado = CATASTROFE.\n\nO ar sob pressão se acumula ainda mais → colapso cardiovascular total → AESP → PCR.\n\nRCP sem sucesso. O pneumotórax cresceu com cada ventilação. Óbito em 3 minutos.',
            grade: 'death',
            lesson: 'LIÇÃO: NUNCA ventilar com pressão positiva um pneumotórax hipertensivo não drenado. Cada ventilação PIORA o pneumotórax. DESCOMPRIMIR PRIMEIRO, depois intubar se necessário. Sequência: agulha → dreno → tubo.'
        }
    }
},
// ===================================================================
// CASO 6: INTOXICAÇÃO POR MEDICAMENTOS
// ===================================================================
{
    id: 'novela_intoxicacao',
    title: 'A Estudante que Não Acordava',
    icon: '💊',
    description: 'Domingo de manhã. Colega de quarto encontra estudante de 22 anos inconsciente com frascos de remédio vazios ao lado. Glasgow 6.',
    endings: 3,
    nodes: {
        'start': {
            type: 'narrative',
            text: '☀️ Domingo, 9h. A colega de república liga pro SAMU: "Ela não acorda! Tem uns frascos de remédio aqui vazio... Clonazepam e Amitriptilina. Ela tava triste esses dias..."\n\nPaciente chega: feminino, 22 anos, Glasgow 6 (O1V2M3). Pupilas midriáticas. FC 130. PA 90/55. ECG: QRS alargado (160ms) + QTc 550ms.',
            vitals: { fc: 130, pas: 90, pad: 55, spo2: 91, fr: 8 },
            next: 'initial_approach'
        },
        'initial_approach': {
            type: 'choice',
            text: 'Paciente em coma (Glasgow 6), FR 8/min, midríase bilateral, QRS alargado. Abordagem inicial:',
            options: [
                { text: 'IOT por sequência rápida (Glasgow ≤ 8 + FR 8) + Bicarbonato de sódio 8,4% 1-2 mEq/kg IV (QRS alargado por tricíclico) + acesso + monitor', next: 'correct_intox', points: 3 },
                { text: 'Flumazenil 0,2mg IV a cada 1 min até despertar (antídoto de benzodiazepínico) + O2 por máscara + monitoração cardíaca contínua', next: 'flumazenil_error', points: -2 },
                { text: 'Lavagem gástrica com SNG (descontaminação) + carvão ativado 50g por SNG + IOT após se não melhorar em 30 min', next: 'gastric_path', points: 1 },
                { text: 'Naloxona 0,4mg IV (excluir opioides) + Glicose 50% 40mL IV (excluir hipoglicemia) + Tiamina 100mg IV + observação em 15 min', next: 'empiric_path', points: 1 }
            ]
        },
        'correct_intox': {
            type: 'narrative',
            text: '✅ IOT realizada sem intercorrências. Bicarbonato de sódio: QRS estreitou de 160ms → 110ms em 10 min.\n\nPA melhora: 100/62. Carvão ativado 50g por SNG (ingesta < 2h — ainda pode ajudar).\n\nExames: paracetamol sérico normal, lítio normal. Screening toxicológico: BZD (+++) + antidepressivo tricíclico (+).',
            vitals: { fc: 105, pas: 105, pad: 65, spo2: 99, fr: 14 },
            next: 'icu_management'
        },
        'icu_management': {
            type: 'choice',
            text: 'Paciente intubada, estável, QRS melhorou com bicarbonato. Na UTI. Qual manejo contínuo?',
            options: [
                { text: 'Bicarbonato de sódio em infusão contínua (manter pH 7,45-7,55) + monitorização cardíaca 48h + avaliação psiquiátrica após despertar + assistente social', next: 'ending_intox_best', points: 3 },
                { text: 'Hemodiálise de urgência para remover tricíclico e benzodiazepínico do sangue + bicarbonato + extubação precoce em 6h', next: 'ending_intox_regular', points: -1 },
                { text: 'Suspender bicarbonato (QRS já melhorou) + sedação com midazolam contínuo + extubação quando Glasgow ≥ 8 + alta psiquiátrica em 24h', next: 'ending_intox_regular', points: 0 },
                { text: 'Fisostigmina 1-2mg IV lento (antídoto anticolinérgico — reverte midríase e taquicardia do tricíclico) + manter IOT + monitor', next: 'ending_intox_regular', points: -1 }
            ]
        },
        'ending_intox_best': {
            type: 'ending',
            title: '⭐ MELHOR DESFECHO — Estabilização + Suporte Psiquiátrico',
            text: 'Bicarbonato mantido 24h. QRS normalizou em 18h. Extubada em 36h — acorda confusa, depois lúcida.\n\nAvaliação psiquiátrica: episódio depressivo maior + tentativa de suicídio. Internada em enfermaria psiquiátrica com consentimento.\n\nAlta em 10 dias com acompanhamento ambulatorial + troca de antidepressivo (ISRS em vez de tricíclico).\n\nVida salva. Tratamento psiquiátrico adequado iniciado.',
            grade: 'excellent',
            lesson: 'LIÇÃO: Intoxicação por tricíclico: (1) IOT se Glasgow ≤ 8, (2) Bicarbonato é o ANTÍDOTO do QRS alargado (bloqueia canais de sódio), (3) Manter pH alcalino por 24-48h, (4) Flumazenil é CONTRAINDICADO se co-ingesta de tricíclico (risco de convulsão), (5) Toda tentativa de suicídio precisa de avaliação psiquiátrica ANTES da alta.'
        },
        'ending_intox_regular': {
            type: 'ending',
            title: '⚠️ DESFECHO REGULAR — Complicações Evitáveis',
            text: 'Manejo subótimo levou a complicações: arritmia ventricular (TV) requerendo cardioversão, ou convulsão por fisostigmina/flumazenil.\n\nPaciente sobrevive após internação prolongada (8 dias UTI). Sem sequela neurológica permanente.\n\nAvaliação psiquiátrica realizada, mas com atraso.',
            grade: 'regular',
            lesson: 'LIÇÃO: Tricíclicos NÃO são dialisáveis (alta ligação proteica + volume de distribuição grande). Fisostigmina é controversa e pode causar bradicardia/convulsão. Flumazenil em co-ingesta com tricíclico = convulsão (baixa limiar convulsivo). Suspender bicarbonato cedo = re-alargamento do QRS.'
        },
        'flumazenil_error': {
            type: 'narrative',
            text: '⚠️ Flumazenil 0,2mg IV... Paciente apresenta CONVULSÃO TÔNICO-CLÔNICA GENERALIZADA!\n\nFlumazenil reverteu o efeito protetor anticonvulsivante do benzodiazepínico, mas o tricíclico (pró-convulsivante) ficou livre.\n\nConvulsão → aspiração → broncoespasmo → SpO2 cai para 75%.',
            vitals: { fc: 145, pas: 80, pad: 45, spo2: 75, fr: 6 },
            next: 'post_seizure_intox'
        },
        'post_seizure_intox': {
            type: 'choice',
            text: 'Convulsão pós-flumazenil + aspiração + insuficiência respiratória. SpO2 75%. Conduta de resgate:',
            options: [
                { text: 'IOT imediata (sequência rápida) + aspiração traqueal + Bicarbonato de sódio IV (QRS alargado) + Diazepam 10mg IV se nova crise', next: 'ending_intox_regular', points: 3 },
                { text: 'Máscara laríngea + Fenitoína 20mg/kg IV para prevenir novas crises + adrenalina nebulizada para broncoespasmo', next: 'ending_intox_regular', points: 0 },
                { text: 'BVM (ambu) + Midazolam 15mg IM + Atropina 1mg IV para bradicardia + transferência para outro hospital', next: 'ending_intox_poor', points: -1 },
                { text: 'Novas doses de Flumazenil (titular até acordar completamente) + O2 100% por máscara com reservatório + decúbito lateral', next: 'ending_intox_poor', points: -3 }
            ]
        },
        'ending_intox_poor': {
            type: 'ending',
            title: '💀 DESFECHO RUIM — Encefalopatia Pós-Anóxica',
            text: 'Manejo tardio da via aérea + convulsões repetidas causaram hipóxia prolongada (SpO2 < 80% por > 8 min).\n\nPaciente intubada eventualmente, mas evolui com encefalopatia hipóxica. Glasgow pós-sedação: 8T.\n\nRM de crânio: lesão difusa em substância branca. Sequela neurológica permanente.',
            grade: 'death',
            lesson: 'LIÇÃO: Flumazenil é ABSOLUTAMENTE CONTRAINDICADO quando há co-ingesta de tricíclicos ou substâncias pró-convulsivantes. Precipita convulsões refratárias. O ECG (QRS alargado) já indicava tricíclico — flumazenil nunca deveria ter sido dado.'
        },
        'gastric_path': {
            type: 'narrative',
            text: 'Lavagem gástrica + carvão administrados. Mas com Glasgow 6, a paciente aspirou conteúdo gástrico durante o procedimento (sem IOT prévia!).\n\nTosse + broncoespasmo + infiltrado aspirativo. SpO2 caiu para 82%.\n\nVocê percebe: deveria ter intubado ANTES da lavagem.',
            vitals: { fc: 125, pas: 88, pad: 52, spo2: 82, fr: 10 },
            next: 'post_seizure_intox'
        },
        'empiric_path': {
            type: 'narrative',
            text: 'Naloxona: sem resposta (não é opioide). Glicose: glicemia 95 (normal). Tiamina dada.\n\n15 min se passaram. QRS no monitor: agora 180ms (alargando!). PA: 82/48. Pupilas fixas midriáticas.\n\nVocê identifica: é intoxicação por tricíclico! Precisa de bicarbonato e IOT.',
            vitals: { fc: 135, pas: 82, pad: 48, spo2: 88, fr: 7 },
            next: 'icu_management'
        }
    }
},
// ===================================================================
// CASO 7: EDEMA AGUDO DE PULMÃO
// ===================================================================
{
    id: 'novela_eap',
    title: 'O Pedreiro que Não Respira',
    icon: '🫁',
    description: 'Homem de 62 anos, hipertenso e diabético, acorda às 4h da manhã sentado na cama sem conseguir respirar. Espuma rosada na boca.',
    endings: 3,
    nodes: {
        'start': {
            type: 'narrative',
            text: '🌙 Quinta, 4h15. SAMU traz homem de 62 anos, pedreiro, com dispneia intensa que começou há 1h.\n\nSentado na maca, inclinado para frente, suando, lábios cianóticos. Espuma rosada saindo pela boca. Não consegue completar frases.\n\nHistória: HAS há 15 anos, DM2, parou remédios há 3 meses ("não tinha dinheiro"). PA: 220/130. Estertores crepitantes bilaterais até ápice.',
            vitals: { fc: 125, pas: 220, pad: 130, spo2: 78, fr: 36 },
            next: 'eap_action'
        },
        'eap_action': {
            type: 'choice',
            text: 'Edema agudo de pulmão hipertensivo. SpO2 78%, PA 220/130, estertores bilaterais, espuma rosada. Intervenção IMEDIATA:',
            options: [
                { text: 'Posição sentada (Fowler) + VNI com CPAP 10cmH2O + Nitroglicerina IV 5mcg/min com titulação + Furosemida 40-80mg IV', next: 'eap_correct', points: 3 },
                { text: 'IOT em sequência rápida + ventilação mecânica protetora + Nitroprussiato de sódio 0,5mcg/kg/min + Furosemida 120mg IV', next: 'eap_intubation', points: 1 },
                { text: 'O2 por cateter nasal 5L/min + Captopril 25mg SL + Furosemida 40mg IV + Morfina 3mg IV + observação por 30 min', next: 'eap_suboptimal', points: 0 },
                { text: 'SF 0,9% 500mL IV rápido (hipoperfusão pela taquicardia) + Dobutamina 5mcg/kg/min + Furosemida 20mg IV + posição supina', next: 'eap_volume_error', points: -3 }
            ]
        },
        'eap_correct': {
            type: 'narrative',
            text: '✅ CPAP colocada: SpO2 sobe de 78% → 89% em 5 min. Paciente tolera.\n\nNitroglicerina IV titulada: PA cai de 220/130 → 170/100 em 15 min.\n\nFurosemida: diurese 200mL na primeira hora.\n\nPaciente respira melhor. Tira a máscara para falar: "Tô melhorando, doutor..."',
            vitals: { fc: 100, pas: 165, pad: 95, spo2: 93, fr: 24 },
            next: 'eap_investigation'
        },
        'eap_investigation': {
            type: 'choice',
            text: 'Paciente estabilizado com VNI + nitro + furosemida. PA 165/95. SpO2 93%. Investigação da causa da descompensação:',
            options: [
                { text: 'ECG 12 derivações (excluir IAM como gatilho) + Troponina + BNP + Ecocardiograma (avaliar FE e valvopatias) + Função renal + eletrólitos', next: 'ending_eap_best', points: 3 },
                { text: 'TC de tórax com contraste (excluir TEP como causa da dispneia) + D-dímero + Angiotomografia de aorta + RM cardíaca', next: 'ending_eap_regular', points: 0 },
                { text: 'Rx de tórax apenas (confirmar EAP) + hemograma + glicemia + alta com receita de anti-hipertensivos em 6h se melhorar', next: 'ending_eap_regular', points: -1 },
                { text: 'Cateterismo cardíaco urgente (possível SCA como gatilho) + BIA profilático + transferência para UTI coronariana', next: 'ending_eap_regular', points: -1 }
            ]
        },
        'ending_eap_best': {
            type: 'ending',
            title: '⭐ MELHOR DESFECHO — Causa Identificada e Tratada',
            text: 'ECG: sem supra ST (não é IAM). BNP: 1.800 (muito elevado). Eco: FE 30%, hipocinesia difusa — cardiomiopatia dilatada não diagnosticada previamente.\n\nCausa da descompensação: abandono de anti-hipertensivos → crise hipertensiva → EAP.\n\nAlta em 5 dias com: Carvedilol + Ramipril + Furosemida + Espironolactona + Atorvastatina. Encaminhado ao SUS para seguimento de IC.',
            grade: 'excellent',
            lesson: 'LIÇÃO: EAP hipertensivo: (1) Sentar paciente, (2) VNI/CPAP é o que mais impacta na melhora imediata, (3) Vasodilatador (nitro IV) para reduzir pós-carga, (4) Diurético (furosemida), (5) SEMPRE investigar causa da descompensação (IAM? Abandono de medicação? Valvopatia?). Morfina não é mais rotina (piora prognóstico).'
        },
        'ending_eap_regular': {
            type: 'ending',
            title: '⚠️ DESFECHO REGULAR — Manejo Incompleto',
            text: 'Paciente melhorou clinicamente mas a investigação foi insuficiente ou excessiva.\n\nSem eco: IC não diagnosticada → sem tratamento otimizado → reinterna em 30 dias.\nOU: exames desnecessários (TC/cateterismo) em paciente sem indicação → custos + riscos de contraste.',
            grade: 'regular',
            lesson: 'LIÇÃO: No EAP, após estabilização: ECG (excluir IAM), troponina, BNP, eco, função renal. TC/cateterismo só com indicação específica (suspeita de TEP ou SCA com supra). Alta sem investigação = reinternação garantida.'
        },
        'eap_intubation': {
            type: 'narrative',
            text: 'IOT realizada. VM protetora. Nitroprussiato iniciado.\n\nPA cai rápido (220 → 140 em 10 min com nitroprussiato). Mas o paciente já está intubado — poderia ter evitado IOT com VNI.\n\nComplicação: extubação difícil em 48h (edema laríngeo pós-IOT). Permanece 5 dias intubado.',
            vitals: { fc: 95, pas: 145, pad: 88, spo2: 99, fr: 14 },
            next: 'eap_investigation'
        },
        'eap_suboptimal': {
            type: 'narrative',
            text: 'O2 cateter nasal não é suficiente para SpO2 78% em EAP grave. SpO2 sobe apenas para 84%.\n\nCaptopril SL: efeito imprevisível, demora 15 min.\n\nMorfina: depressão respiratória em paciente já com FR de 36 — FR cai para 12, mas consciência também cai (Glasgow 12 → 9).\n\nVocê percebe que precisa de VNI ou IOT.',
            vitals: { fc: 110, pas: 190, pad: 110, spo2: 84, fr: 12 },
            next: 'eap_action'
        },
        'eap_volume_error': {
            type: 'ending',
            title: '💀 DESFECHO CATASTRÓFICO — Volume em EAP',
            text: 'SF 500mL em paciente com edema pulmonar = DESASTRE.\n\nO volume extra inundou ainda mais os alvéolos. SpO2 caiu para 65%. Espuma rosada profusa.\n\nIOT de emergência — via aérea cheia de secreção. Aspiração prolongada. VM difícil (pulmões encharcados).\n\nPaciente evolui para SDRA + falência multiorgânica. Óbito em 72h na UTI.\n\nVolume é o tratamento do CHOQUE, não do EAP — são opostos!',
            grade: 'death',
            lesson: 'LIÇÃO: EAP = excesso de líquido nos pulmões. Dar VOLUME é o contrário do que precisa. Tratamento: TIRAR líquido (diurético) + REDISTRIBUIR (vasodilatador) + OXIGENAR (VNI/CPAP). Dobutamina só se choque cardiogênico com PA baixa — NÃO com PA 220!'
        }
    }
},
// ===================================================================
// CASO 8: HEMORRAGIA DIGESTIVA ALTA
// ===================================================================
{
    id: 'novela_hda',
    title: 'O Etilista que Vomitou Sangue',
    icon: '🩸',
    description: 'Homem de 48 anos, etilista crônico, chega vomitando sangue vivo em grande volume. Está pálido e taquicárdico. Você tem que parar o sangramento.',
    endings: 3,
    nodes: {
        'start': {
            type: 'narrative',
            text: '🚨 Sexta, 21h. Emergência lotada. Homem de 48 anos chega vomitando sangue vivo (hematêmese volumosa ~500mL). Etilista pesado há 20 anos. Abdome globoso (ascite?). Aranhas vasculares no tórax. Icterícia leve.\n\n"Doutor, já vomitei sangue 4 vezes hoje..."',
            vitals: { fc: 118, pas: 88, pad: 52, spo2: 94, fr: 22 },
            next: 'hda_initial'
        },
        'hda_initial': {
            type: 'choice',
            text: 'Hematêmese volumosa em paciente cirrótico. PA 88/52, FC 118 (classe III de choque). Abordagem inicial:',
            options: [
                { text: 'Dois acessos calibrosos (14-16G) + Cristaloide aquecido + Tipagem sanguínea + CH O- se Hb < 7 + Terlipressina 2mg IV + IOT se rebaixamento + EDA em até 12h', next: 'hda_correct', points: 3 },
                { text: 'Acesso central (jugular interna) + PVC para guiar reposição + SF 3L rápido + Omeprazol 80mg IV bolus + EDA assim que disponível (pode ser amanhã)', next: 'hda_delay', points: 0 },
                { text: 'Sonda nasogástrica (lavagem com SF gelado para localizar sangramento) + Passagem de balão de Sengstaken-Blakemore de emergência + Octreotide 50mcg IV bolus', next: 'hda_balloon', points: 1 },
                { text: 'Ácido tranexâmico 1g IV + Vitamina K 10mg IV + Plasma fresco congelado 4U + concentrado de plaquetas 1U + EDA eletiva em 48h', next: 'hda_delay', points: -1 }
            ]
        },
        'hda_correct': {
            type: 'narrative',
            text: '✅ Dois acessos calibrosos. Cristaloide 1L + CH 2U O- (Hb: 6,2). Terlipressina 2mg IV (vasoconstrição esplâncnica).\n\nCeftriaxona 1g IV (profilaxia de PBE no cirrótico com HDA — reduz mortalidade!).\n\nPaciente estabiliza: PA 100/62. EDA solicitada para as próximas 6h.',
            vitals: { fc: 100, pas: 102, pad: 62, spo2: 96, fr: 18 },
            next: 'eda_findings'
        },
        'eda_findings': {
            type: 'choice',
            text: 'EDA realizada: Varizes esofágicas de grosso calibre com sinais vermelhos ("red spots") + coágulo aderido em uma variz (F2 com cherry red spots). Conduta endoscópica:',
            options: [
                { text: 'Ligadura elástica das varizes (LEV) — método de escolha para hemostasia + erradicação. Aplicar em todas as varizes com sangramento recente', next: 'ending_hda_best', points: 3 },
                { text: 'Escleroterapia com etanolamina 2% intravariceal em todas as varizes visíveis + Omeprazol IV 8mg/h contínuo pós-procedimento', next: 'ending_hda_good', points: 1 },
                { text: 'Hemostasia com hemoclipes metálicos na variz sangrante + injeção de adrenalina 1:10.000 perivariceal + segunda endoscopia em 48h', next: 'ending_hda_regular', points: -1 },
                { text: 'Apenas documentação endoscópica + manter Terlipressina 5 dias + TIPS (shunt portossistêmico) como tratamento definitivo em 72h', next: 'ending_hda_regular', points: 0 }
            ]
        },
        'ending_hda_best': {
            type: 'ending',
            title: '⭐ MELHOR DESFECHO — Hemostasia + Prevenção',
            text: 'Ligadura elástica: 6 bandas aplicadas. Sangramento controlado. Sem ressangramento.\n\nTerlipressina mantida por 5 dias. Ceftriaxona por 7 dias. Propranolol iniciado (profilaxia secundária).\n\nAlta em 7 dias. Encaminhado para programa de erradicação de varizes (LEV seriada) + abstinência alcoólica + hepatologista.',
            grade: 'excellent',
            lesson: 'LIÇÃO: HDA variceal no cirrótico: (1) Ressuscitar (cristaloide restritivo + CH se Hb < 7), (2) Terlipressina/Octreotide (vasoconstrição esplâncnica), (3) ATB profilático (Ceftriaxona — reduz PBE e mortalidade!), (4) EDA em 12h com LEV (ligadura > escleroterapia), (5) Propranolol após estabilização (prevenção secundária).'
        },
        'ending_hda_good': {
            type: 'ending',
            title: '✅ BOM DESFECHO — Escleroterapia Eficaz',
            text: 'Escleroterapia controlou sangramento. Porém: mais complicações locais que LEV (úlceras esofágicas, febre, dor retroesternal).\n\nRessangramento menor em 48h — nova EDA com LEV complementar.\n\nAlta em 10 dias. Resultado final bom, mas com mais morbidade que LEV como primeira linha.',
            grade: 'good',
            lesson: 'LIÇÃO: Escleroterapia é alternativa se LEV não disponível, mas tem mais complicações (úlceras, mediastinite, estenose). LEV é padrão-ouro para hemostasia + erradicação de varizes esofágicas. Hemoclipes não são indicados para varizes (são para úlceras).'
        },
        'ending_hda_regular': {
            type: 'ending',
            title: '⚠️ DESFECHO REGULAR — Ressangramento',
            text: 'Abordagem inadequada na EDA. Hemoclipes soltam de varizes (parede fina e mole). TIPS sem indicação de emergência neste caso.\n\nRessangramento volumoso em 24h. Necessidade de balão de Sengstaken-Blakemore + TIPS de resgate.\n\nPaciente sobrevive, mas com encefalopatia hepática pós-TIPS + internação prolongada (25 dias).',
            grade: 'regular',
            lesson: 'LIÇÃO: Hemoclipes são para úlceras (Forrest I-II), NÃO para varizes. TIPS é resgate (falha de 2 EDA ou sangramento incontrolável), não primeira linha. Balão de Sengstaken = medida temporária (máx 24h) como ponte para tratamento definitivo.'
        },
        'hda_delay': {
            type: 'narrative',
            text: 'Abordagem lenta. Enquanto tenta acesso central ou espera exames, paciente vomita mais 400mL de sangue.\n\nPA cai para 72/40. Glasgow cai para 11. Paciente aspira sangue.\n\nIOT de emergência. Sangue na traqueia.',
            vitals: { fc: 135, pas: 72, pad: 40, spo2: 82, fr: 8 },
            next: 'hda_initial'
        },
        'hda_balloon': {
            type: 'narrative',
            text: 'SNG com lavagem confirma sangue ativo. Balão de Sengstaken posicionado — hemostasia temporária obtida.\n\nMas balão é ponte (máx 24h). Paciente precisa de EDA definitiva.\n\nTerlipressina iniciada. PA estabiliza.',
            vitals: { fc: 105, pas: 98, pad: 58, spo2: 94, fr: 20 },
            next: 'eda_findings'
        }
    }
},
// ===================================================================
// CASO 9: PNEUMONIA GRAVE NO IDOSO
// ===================================================================
{
    id: 'novela_pneumonia',
    title: 'O Avô com Febre e Confusão',
    icon: '🤒',
    description: 'Homem de 78 anos trazido pela família com febre, tosse produtiva e confusão mental há 24h. CURB-65 alto — UTI ou enfermaria?',
    endings: 3,
    nodes: {
        'start': { type: 'narrative', text: '🏥 Terça, 11h. Idoso de 78 anos, aposentado, DPOC leve. Febre 38.9°C há 3 dias + tosse com catarro amarelado. Desde ontem "não reconhece a família". Estertores em base D.', vitals: { fc: 105, pas: 105, pad: 58, spo2: 90, fr: 28 }, next: 'pneu_severity' },
        'pneu_severity': {
            type: 'choice',
            text: 'CURB-65: Confusão(+1) + Ureia 58(+1) + FR 28(+1) + PA 105/58(0) + Idade 78(+1) = 4. Onde internar?',
            options: [
                { text: 'UTI (CURB-65 ≥ 4 = mortalidade ~30%) + hemoculturas + ATB IV amplo espectro na 1ª hora', next: 'pneu_uti', points: 3 },
                { text: 'Enfermaria com Ceftriaxona 1g/dia IV + Azitromicina 500mg/dia IV + O2 suplementar', next: 'pneu_enfermaria', points: 1 },
                { text: 'Tratamento ambulatorial: Amoxicilina-Clavulanato 875mg VO 12/12h + retorno em 48h', next: 'pneu_home', points: -2 },
                { text: 'Observação em emergência 24h: Levofloxacino 750mg IV + alta se afebril', next: 'pneu_enfermaria', points: 0 }
            ]
        },
        'pneu_uti': {
            type: 'choice',
            text: 'UTI. Hemoculturas colhidas. ATB empírico para PAC grave:',
            options: [
                { text: 'Ceftriaxona 2g/dia IV + Azitromicina 500mg/dia IV (cobre pneumococo + atípicos)', next: 'ending_pneu_best', points: 3 },
                { text: 'Piperacilina-Tazobactam 4,5g 6/6h + Vancomicina 15mg/kg 12/12h (cobertura MRSA + Pseudomonas)', next: 'ending_pneu_regular', points: -1 },
                { text: 'Meropenem 1g 8/8h + Levofloxacino 750mg/dia + Fluconazol 400mg/dia', next: 'ending_pneu_regular', points: -1 },
                { text: 'Amoxicilina-Clavulanato 1,2g 8/8h IV + Claritromicina 500mg 12/12h IV', next: 'ending_pneu_best', points: 2 }
            ]
        },
        'ending_pneu_best': { type: 'ending', title: '⭐ MELHOR DESFECHO', text: 'ATB correto. Hemocultura: S. pneumoniae sensível. Melhora em 48h. Alta em 7 dias. Vacinação pneumocócica atualizada.', grade: 'excellent', lesson: 'PAC grave: betalactâmico + macrolídeo. Só escalonar para Pipe-Tazo/Vancomicina se fatores de risco para MDR (hospitalização recente, ATB prévio, bronquiectasias).' },
        'ending_pneu_regular': { type: 'ending', title: '⚠️ REGULAR — ATB Excessivo', text: 'Espectro amplo demais causou nefrotoxicidade (Vancomicina) ou diarreia por C. difficile. Internação prolongada (15 dias). Recupera com complicações.', grade: 'regular', lesson: 'Não sobre-tratar PAC comunitária. MRSA/Pseudomonas só com fatores de risco específicos. Mais amplo ≠ melhor.' },
        'pneu_enfermaria': { type: 'narrative', text: 'Enfermaria. CURB-65=4 deveria ir para UTI. À noite: SpO2 82%, PA 85/45. Transferido tardiamente para UTI.', vitals: { fc: 120, pas: 85, pad: 45, spo2: 82, fr: 32 }, next: 'pneu_uti' },
        'pneu_home': { type: 'ending', title: '💀 ÓBITO — Alta Inadequada', text: 'Idoso confuso com CURB-65=4 recebeu alta. Não toma medicação. 48h: choque séptico em casa. SAMU: óbito na chegada.', grade: 'death', lesson: 'CURB-65 ≥ 4 = mortalidade 30%. Confusão em idoso com infecção = disfunção orgânica. NUNCA alta.' }
    }
},
// ===================================================================
// CASO 10: FIBRILAÇÃO ATRIAL COM RVR
// ===================================================================
{
    id: 'novela_fa',
    title: 'A Aposentada com Coração Disparado',
    icon: '💓',
    description: 'Mulher de 72 anos com palpitação intensa há 6h. FC 165. Irregular. Está ficando sem fôlego. Controlar a frequência ou cardioverter?',
    endings: 3,
    nodes: {
        'start': { type: 'narrative', text: '🏥 Quarta, 16h. Mulher 72 anos. Palpitação + dispneia há 6h. ECG: ritmo irregularmente irregular, FC 165, sem ondas P. FA com RVR. HAS + DM2. Primeira vez com arritmia.', vitals: { fc: 165, pas: 138, pad: 85, spo2: 93, fr: 22 }, next: 'fa_control' },
        'fa_control': {
            type: 'choice',
            text: 'FA com RVR. Paciente sintomática mas estável (PA 138/85, Glasgow 15, sem choque). Controle de frequência:',
            options: [
                { text: 'Metoprolol 5mg IV lento a cada 5 min (até 3 doses) — alvo FC < 110 + monitorização + avaliar anticoagulação', next: 'fa_controlled', points: 3 },
                { text: 'Cardioversão elétrica sincronizada 120-200J sob sedação — FA sintomática com > 48h sem ECO-TE/anticoagulação prévia', next: 'fa_cve_avc', points: -2 },
                { text: 'Amiodarona 150mg IV em 10 min + manutenção 1mg/min — cardioversão farmacológica + controle de FC', next: 'fa_controlled', points: 1 },
                { text: 'Digoxina 0,5mg IV + Diltiazem 0,25mg/kg IV — controle duplo para FC mais rápido', next: 'fa_controlled', points: 0 }
            ]
        },
        'fa_controlled': {
            type: 'choice',
            text: 'FC controlada (108 bpm). CHA₂DS₂-VASc: idade 72(+1) + HAS(+1) + DM(+1) + sexo feminino(+1) = 4. Anticoagulação:',
            options: [
                { text: 'DOAC (Rivaroxabana 20mg/dia ou Apixabana 5mg 12/12h) — indicada com score ≥ 2 + checar função renal', next: 'ending_fa_best', points: 3 },
                { text: 'AAS 100mg/dia + Clopidogrel 75mg/dia — dupla antiagregação como alternativa com menor risco de sangramento', next: 'ending_fa_avc', points: -2 },
                { text: 'Warfarina 5mg/dia (alvo INR 2-3) + Enoxaparina SC como ponte até INR terapêutico', next: 'ending_fa_good', points: 1 },
                { text: 'Sem anticoagulação — primeiro cardioverter para sinusal. Se mantiver ritmo sinusal, não precisa anticoagular', next: 'ending_fa_avc', points: -2 }
            ]
        },
        'ending_fa_best': { type: 'ending', title: '⭐ MELHOR DESFECHO', text: 'DOAC iniciado. Metoprolol VO para manter FC < 110. Alta em 2 dias. Risco de AVC reduzido 70%. Seguimento com cardiologista.', grade: 'excellent', lesson: 'FA + CHA₂DS₂-VASc ≥ 2: anticoagulação obrigatória. DOACs > Warfarina na FA não-valvar. AAS NÃO substitui anticoagulação.' },
        'ending_fa_good': { type: 'ending', title: '✅ BOM — Warfarina é Válida', text: 'Warfarina com bridge de heparina. INR terapêutico em 5 dias. Funciona, mas requer controle frequente de INR. TTR precisa ser > 65%.', grade: 'good', lesson: 'Warfarina é alternativa válida mas inferior a DOACs em praticidade e segurança. TTR < 65% = sem benefício.' },
        'ending_fa_avc': { type: 'ending', title: '💀 AVC em 3 Meses', text: 'Sem anticoagulação adequada + FA + score 4. Em 3 meses: hemiparesia súbita. AVC cardioembólico. Sequela permanente.', grade: 'death', lesson: 'AAS NÃO protege contra AVC na FA. Reversão para sinusal NÃO elimina necessidade de anticoagular se score ≥ 2 (FA pode recorrer assintomática).' },
        'fa_cve_avc': { type: 'ending', title: '💀 AVC PÓS-CARDIOVERSÃO', text: 'CVE em FA > 48h sem anticoagulação/ECO-TE → trombo atrial deslocado → AVC isquêmico extenso. Hemiplegia + afasia.', grade: 'death', lesson: 'FA > 48h ou duração incerta: NÃO cardioverter sem ECO-TE negativo OU ≥ 3 semanas de anticoagulação. CVE mobiliza trombos.' }
    }
},
// ===================================================================
// CASO 11: CONVULSÃO FEBRIL NA CRIANÇA
// ===================================================================
{
    id: 'novela_conv_febril',
    title: 'O Bebê que Tremeu na Febre',
    icon: '👶',
    description: 'Menino de 18 meses com febre alta e crise convulsiva de 2 minutos. Primeiro episódio. Mãe desesperada. O que é grave e o que é benigno?',
    endings: 3,
    nodes: {
        'start': { type: 'narrative', text: '🏥 Segunda, 19h. Mãe entra correndo: "Meu filho tremeu todo, ficou duro, olhos reviraram!" Durou ~2 min, generalizado. Agora pós-ictal (sonolento). T 39.5°C, coriza há 1 dia. Vacinas em dia. Sem rigidez nuca, fontanela normotensa.', vitals: { fc: 145, pas: 90, pad: 55, spo2: 97, fr: 30 }, next: 'conv_classify' },
        'conv_classify': {
            type: 'choice',
            text: '18 meses, crise generalizada < 15 min, episódio único, sem déficit pós-ictal focal, fontanela normal. Classificação:',
            options: [
                { text: 'Convulsão febril SIMPLES (6m-5a, generalizada, <15min, única, sem déficit) — antitérmico + observação + orientação', next: 'conv_simple', points: 3 },
                { text: 'Provável meningite (febre + convulsão < 18m = PL obrigatória) — Ceftriaxona empírica + PL imediata', next: 'conv_meningitis', points: 1 },
                { text: 'Convulsão febril COMPLEXA (precisa EEG + RM + anticonvulsivante profilático)', next: 'conv_complex', points: -1 },
                { text: 'Debut epiléptico (primeiro episódio = início de epilepsia) — Fenobarbital 5mg/kg/dia + neuropediatria urgente', next: 'conv_complex', points: -1 }
            ]
        },
        'conv_simple': {
            type: 'choice',
            text: 'Convulsão febril simples. Criança desperta após 30 min, brinca, sem déficit neurológico. IVAS provável. Conduta:',
            options: [
                { text: 'Antitérmico + observação 4-6h + orientação detalhada aos pais sobre recorrência e sinais de alarme + alta se estável', next: 'ending_conv_best', points: 3 },
                { text: 'Hemograma + PCR + hemocultura + EAS + PL + Rx tórax + internação para investigação', next: 'ending_conv_regular', points: -1 },
                { text: 'Antitérmico + Diazepam retal prescrito para casa + Fenobarbital profilático 2 anos + neuro', next: 'ending_conv_regular', points: -1 },
                { text: 'Antitérmico + observação 2h + alta com orientação + retorno se sinais de alarme', next: 'ending_conv_best', points: 2 }
            ]
        },
        'ending_conv_best': { type: 'ending', title: '⭐ MELHOR DESFECHO', text: 'Criança observada, ativa, sem novos episódios. Pais orientados: convulsão febril simples é BENIGNA (3-5% das crianças), não causa epilepsia, pode recorrer (30%). Se > 5 min: SAMU.', grade: 'excellent', lesson: 'Convulsão febril SIMPLES > 12 meses com vacinas em dia e exame normal: NÃO precisa PL, NÃO precisa EEG, NÃO precisa anticonvulsivante. Orientação + antitérmico.' },
        'ending_conv_regular': { type: 'ending', title: '⚠️ SOBRE-INVESTIGAÇÃO', text: 'PL desnecessária (dor + risco em criança com exame normal > 12m) ou Fenobarbital crônico (sedação, déficit cognitivo) sem indicação. Criança medicalizada sem necessidade.', grade: 'regular', lesson: 'Saber NÃO fazer é tão importante quanto saber fazer. Fenobarbital profilático na convulsão febril simples NÃO é recomendado (risco > benefício).' },
        'conv_meningitis': { type: 'narrative', text: 'Raciocínio válido em < 12 meses. Mas: 18 meses + vacinas completas + fontanela normal + sem rigidez nuca = PL não obrigatória (AAP 2011). Observação vigilante.', vitals: { fc: 130, pas: 88, pad: 55, spo2: 98, fr: 26 }, next: 'conv_simple' },
        'conv_complex': { type: 'narrative', text: 'Reveja critérios: generalizada ✓ (<15min ✓, única ✓, sem déficit ✓) = SIMPLES, não complexa. Epilepsia = 2 crises NÃO PROVOCADAS. Febre = provocada.', vitals: { fc: 130, pas: 88, pad: 55, spo2: 98, fr: 26 }, next: 'conv_simple' }
    }
},
// ===================================================================
// CASO 12: GRAVIDEZ ECTÓPICA
// ===================================================================
{
    id: 'novela_ectopica',
    title: 'A Jovem com Dor e Atraso Menstrual',
    icon: '🩺',
    description: 'Mulher de 26 anos com dor em fossa ilíaca + atraso de 6 semanas + síncope. Útero vazio na USG. Bomba-relógio tubária.',
    endings: 3,
    nodes: {
        'start': { type: 'narrative', text: '🏥 Quinta, 14h. Mulher 26 anos, G1P0. Dor em baixo ventre E há 3h + sangramento vaginal escuro + atraso menstrual ~6 semanas. "Desmaiei no banheiro." PA 100/62, FC 98. Dor à mobilização cervical.', vitals: { fc: 98, pas: 100, pad: 62, spo2: 98, fr: 18 }, next: 'ect_workup' },
        'ect_workup': {
            type: 'choice',
            text: 'Mulher fértil + atraso menstrual + dor pélvica + síncope + dor à mobilização cervical. Primeiro exame:',
            options: [
                { text: 'Beta-hCG sérico quantitativo + USG transvaginal de urgência (obrigatório em mulher fértil com dor pélvica)', next: 'ect_confirmed', points: 3 },
                { text: 'TC de abdome e pelve com contraste IV para visualizar massa/líquido livre', next: 'ect_confirmed', points: 0 },
                { text: 'Teste de gravidez urinário + USG abdominal + encaminhar para ginecologia em 48h', next: 'ect_rupture', points: -2 },
                { text: 'Laparoscopia diagnóstica imediata (dor pélvica + síncope = abdome agudo ginecológico)', next: 'ect_treatment', points: 1 }
            ]
        },
        'ect_confirmed': { type: 'narrative', text: '🔬 Beta-hCG: 4.500. USG TV: útero VAZIO (beta > 2.000 sem saco = ectópica). Massa anexial E 3,2 cm. Líquido livre em fundo de saco.', vitals: { fc: 102, pas: 98, pad: 60, spo2: 98, fr: 18 }, next: 'ect_treatment' },
        'ect_treatment': {
            type: 'choice',
            text: 'Ectópica tubária íntegra. Beta 4.500. Massa 3,2cm. Líquido livre pequeno. PA estável. Hb 11,2. Conduta:',
            options: [
                { text: 'Laparoscopia com salpingostomia (preservar tuba) — abordagem cirúrgica minimamente invasiva', next: 'ending_ect_best', points: 3 },
                { text: 'Metotrexato 50mg/m² IM dose única — tratamento clínico (ectópica íntegra + estável + beta < 5.000 + sem BCF)', next: 'ending_ect_best', points: 2 },
                { text: 'Laparotomia com salpingectomia bilateral (retirar ambas tubas para evitar recorrência)', next: 'ending_ect_regular', points: -2 },
                { text: 'Conduta expectante: beta-hCG seriado 48/48h — pode resolver espontaneamente', next: 'ending_ect_rupture', points: -1 }
            ]
        },
        'ending_ect_best': { type: 'ending', title: '⭐ MELHOR DESFECHO — Tuba Preservada', text: 'Abordagem adequada. Tuba preservada. Beta em queda. Fertilidade futura: 60-70% de chance de gestação intrauterina.', grade: 'excellent', lesson: 'Ectópica íntegra + estável + beta < 5.000: MTX OU laparoscopia com salpingostomia. Preservar tuba em mulher com desejo reprodutivo.' },
        'ending_ect_regular': { type: 'ending', title: '⚠️ REGULAR — Excesso Cirúrgico', text: 'Salpingectomia BILATERAL sem indicação. Fertilidade natural eliminada. Paciente precisará de FIV para engravidar. Cirurgia desproporcional.', grade: 'regular', lesson: 'Salpingectomia bilateral só se: ectópica recorrente bilateral ou desejo de contracepção. Nunca como primeira abordagem em mulher jovem nulípara.' },
        'ending_ect_rupture': { type: 'ending', title: '💀 RUPTURA — Choque Hemorrágico', text: 'Expectante com beta 4.500 + líquido livre = RISCO. 36h depois: ruptura tubária. PA 70/40. Laparotomia de emergência. Salpingectomia + transfusão 4U. Quase morreu.', grade: 'death', lesson: 'Expectante só se beta < 1.000-1.500 + em queda + SEM líquido livre. Com beta 4.500 + líquido: intervenção obrigatória.' },
        'ect_rupture': { type: 'narrative', text: 'Encaminhada para gineco em 48h. 12h depois: dor intensa + PA 75/42. Ruptura tubária! SAMU traz de volta.', vitals: { fc: 130, pas: 75, pad: 42, spo2: 94, fr: 24 }, next: 'ect_treatment' }
    }
},
// === CASO 13: HIPOGLICEMIA GRAVE ===
{id:'novela_hipoglicemia',title:'O Caminhoneiro Desmaiado',icon:'🍬',description:'Diabético inconsciente no caminhão. Glicemia 28.',endings:3,nodes:{'start':{type:'narrative',text:'Caminhoneiro 58a, DM2 com insulina. Glasgow 7, sudorese, glicemia 28.',vitals:{fc:110,pas:155,pad:95,spo2:97,fr:18},next:'hypo_act'},'hypo_act':{type:'choice',text:'Inconsciente, glicemia 28 mg/dL. Conduta:',options:[{text:'Glicose 50% 40-60mL IV bolus + reavaliar em 5 min + glicemia seriada a cada 15 min por 24h (insulina Glargina dura 24h)',next:'hypo_ok',points:3},{text:'Glucagon 1mg IM (sem acesso venoso disponível) + decúbito lateral + SAMU para transporte + glicemia capilar em 15 min',next:'hypo_ok',points:2},{text:'Suco de laranja VO forçado na boca do paciente inconsciente + açúcar sublingual + aguardar despertar',next:'hypo_asp',points:-3},{text:'IOT (Glasgow 7) + Tiamina 100mg IV + Naloxona 0,4mg IV + TC crânio para investigar causa do coma',next:'hypo_ok',points:0}],},'hypo_ok':{type:'choice',text:'Glicose IV dada. Glasgow 14 em 3 min. Usa Glargina (24h ativa). Manutenção:',options:[{text:'SG 10% IV contínuo 100mL/h + glicemia capilar 1/1h por 12-24h + alimentação VO quando tolerar + ajustar insulina na alta',next:'end_hypo_best',points:3},{text:'Alimentação VO (lanche) + alta em 1h com orientação de reduzir insulina em casa + retorno se mal-estar',next:'end_hypo_reg',points:-1},{text:'Suspender TODA insulina definitivamente + Metformina 850mg 12/12h + alta + endocrinologista em 30 dias',next:'end_hypo_reg',points:-1},{text:'SG 5% 500mL + Hidrocortisona 100mg IV (pode ser crise addisoniana) + cortisol + ACTH + internação para investigação',next:'end_hypo_reg',points:0}],},'end_hypo_best':{type:'ending',title:'⭐ MELHOR DESFECHO',text:'SG 10% 18h, sem re-hipoglicemia. Glargina reduzida 20%. Orientação: nunca pular refeição com insulina. Alta 24h.',grade:'excellent',lesson:'Hipoglicemia grave: Glicose IV ou Glucagon IM (NUNCA VO em inconsciente). Insulina longa = monitorar 12-24h. Não suspender insulina — AJUSTAR dose.'},'end_hypo_reg':{type:'ending',title:'⚠️ REGULAR',text:'Alta precoce: re-hipoglicemia em 4h (Glargina dura 24h). Ou suspender insulina: hiperglicemia grave em 48h. Reinternação.',grade:'regular',lesson:'Glargina dura 24h+ → monitorar por período equivalente.'},'hypo_asp':{type:'ending',title:'💀 ASPIRAÇÃO',text:'VO em inconsciente = aspiração pulmonar. Pneumonia aspirativa + IOT + UTI.',grade:'death',lesson:'NUNCA dar VO em Glasgow < 10. Via parenteral obrigatória.'}}},
// === CASO 14: GRANDE QUEIMADO ===
{id:'novela_queimado',title:'O Eletricista com 40% SCQ',icon:'🔥',description:'Queimadura por arco elétrico. Face+tórax+braços. Pelo nasal chamuscado. Via aérea em risco.',endings:3,nodes:{'start':{type:'narrative',text:'Eletricista 35a, alta tensão. Queimaduras 2º/3º grau face+tórax+MMSS. SCQ 40%. Pelos nasais chamuscados. Rouquidão.',vitals:{fc:120,pas:105,pad:65,spo2:94,fr:24},next:'burn_air'},'burn_air':{type:'choice',text:'Grande queimado 40% SCQ + face + chamuscamento nasal + rouquidão progressiva. Prioridade:',options:[{text:'IOT PRECOCE antes do edema obstruir (queimadura face + sinais inalatórios = via aérea vai fechar em horas) + tubo 7,5-8,0',next:'burn_ok',points:3},{text:'O2 umidificado 100% + nebulização adrenalina + observar estridor — intubar apenas se estridor franco instalado',next:'burn_late',points:0},{text:'Analgesia com Morfina 10mg IV + resfriamento com SF gelado em toda SCQ + transferir para CTQ sem intubar',next:'burn_cold',points:-2},{text:'Cricotireoidostomia de emergência (via cirúrgica direto — não arriscar IOT difícil em face queimada)',next:'burn_ok',points:-1}]}, 'burn_ok':{type:'choice',text:'IOT feita. Reposição volêmica (Parkland): 4mL x 80kg x 40% = 12.800mL/24h. Distribuição:',options:[{text:'Ringer Lactato: metade em 8h (800mL/h) + metade em 16h seguintes — guiado por diurese 0,5-1mL/kg/h',next:'end_burn_best',points:3},{text:'SF 0,9% 3.000mL em 24h (manutenção padrão) + albumina 5% 500mL precoce para manter oncótica',next:'end_burn_reg',points:-1},{text:'Ringer Lactato 12.800mL nas primeiras 8h (todo volume rápido) + depois apenas manutenção',next:'end_burn_reg',points:-1},{text:'Ringer Lactato 25.600mL em 24h (dobrar Parkland por segurança) + Furosemida se edema',next:'end_burn_poor',points:-2}]},'end_burn_best':{type:'ending',title:'⭐ MELHOR DESFECHO',text:'IOT precoce + Parkland correto. Transferido CTQ 6h. Desbridamento 48h. Enxertia 7d. Reabilitação longa sem complicações vitais.',grade:'excellent',lesson:'Grande queimado: IOT PRECOCE se inalatória. Parkland: 4mL×kg×%SCQ (50% em 8h). Guiar por DIURESE. Não resfriar > 10% SCQ (hipotermia).'},'end_burn_reg':{type:'ending',title:'⚠️ REGULAR',text:'Volume insuficiente = IRA, ou distribuição errada = edema precoce + hipovolemia tardia.',grade:'regular',lesson:'METADE nas primeiras 8h. Insuficiente = IRA. Excessivo = síndrome compartimental.'},'end_burn_poor':{type:'ending',title:'💀 FLUID CREEP',text:'Dobrar Parkland: edema massivo, síndrome compartimental abdominal, edema pulmonar. Laparotomia descompressiva.',grade:'death',lesson:'Mais volume ≠ melhor. Parkland é limite superior. Seguir diurese.'},'burn_late':{type:'narrative',text:'2h depois: edema facial, língua inchada, estridor. IOT impossível pelo edema. Crico necessária.',vitals:{fc:135,pas:95,pad:55,spo2:78,fr:6},next:'burn_ok'},'burn_cold':{type:'narrative',text:'SF gelado em 40% SCQ = hipotermia (34.5°C). Piora coagulopatia. Via aérea edemaciando.',vitals:{fc:55,pas:85,pad:50,spo2:88,fr:10},next:'burn_air'}}},
// === CASO 15: PACIENTE AGITADO ===
{id:'novela_agitacao',title:'O Homem Furioso na Emergência',icon:'😡',description:'Homem 40a quebrando tudo. Pupilas dilatadas, sudorese, agressivo. Equipe em risco. Contenção + diagnóstico.',endings:3,nodes:{'start':{type:'narrative',text:'Sábado 23h. Homem ~40a, midríase, sudorese, taquicárdico, quebrou cadeira, agrediu enfermeiro. Cheiro de álcool.',vitals:{fc:125,pas:165,pad:100,spo2:97,fr:22},next:'agit_act'},'agit_act':{type:'choice',text:'Agitação psicomotora, potencialmente violento. PA 165/100, midríase, sudorese. Abordagem:',options:[{text:'Contenção verbal (voz firme, calma) → se falha: contenção física (5 pessoas) → Haloperidol 5mg + Midazolam 7,5mg IM',next:'agit_ok',points:3},{text:'Haloperidol 10mg IV direto sem diálogo + contenção mecânica 4 pontos + psiquiatria urgente',next:'agit_ok',points:0},{text:'Diazepam 10mg IV + Clorpromazina 50mg IM + chamar polícia para conduzir à delegacia',next:'agit_police',points:-2},{text:'Não intervir até cansar — é direito do paciente recusar atendimento. Isolar área e aguardar',next:'agit_wait',points:-1}]},'agit_ok':{type:'choice',text:'Paciente sedado e contido. Midríase + taquicardia + HAS + agitação. Investigar causa orgânica:',options:[{text:'Glicemia capilar + toxicológico urinário + TC crânio + eletrólitos + hemograma + ECG (QTc antes de mais Haloperidol)',next:'end_agit_best',points:3},{text:'Apenas psiquiatria — surto psicótico óbvio. Internar em enfermaria psiquiátrica + Haloperidol manutenção',next:'end_agit_reg',points:-1},{text:'Alta após sedação (6h) — intoxicação alcoólica que resolve sozinha',next:'end_agit_reg',points:-1},{text:'RM crânio + EEG + PL + sorologias (excluir encefalite autoimune)',next:'end_agit_best',points:1}]},'end_agit_best':{type:'ending',title:'⭐ MELHOR DESFECHO',text:'Toxicológico: cocaína (+). TC normal. ECG: QTc normal. Diagnóstico: intoxicação cocaína + álcool. 24h observação. CAPS AD na alta.',grade:'excellent',lesson:'Agitação: segurança primeiro → verbal → física → química. SEMPRE excluir causa orgânica (hipoglicemia! TCE! drogas!). ECG antes de repetir antipsicótico.'},'end_agit_reg':{type:'ending',title:'⚠️ REGULAR',text:'Sem investigação: TCE oculto não visto, ou IAM por cocaína não monitorado, ou hipoglicemia não corrigida.',grade:'regular',lesson:'Nunca rotular como psiquiátrico sem excluir orgânico. Dextro + TC + tóxico são obrigatórios.'},'agit_police':{type:'ending',title:'💀 DESFECHO RUIM',text:'Paciente preso. Na cela: convulsão. Sem atendimento. Óbito por status epilepticus.',grade:'death',lesson:'Agitação = emergência MÉDICA, não policial. Encaminhar para delegacia sem avaliação = negligência.'},'agit_wait':{type:'narrative',text:'10 min depois: arremessa extintor, fratura nariz de enfermeira. Incontrolável.',vitals:{fc:140,pas:175,pad:105,spo2:96,fr:24},next:'agit_act'}}},
// === CASO 16: REAÇÃO TRANSFUSIONAL ===
{id:'novela_transfusao',title:'O Sangue que Fez Mal',icon:'🩸',description:'Mulher pós-cirúrgica recebendo CH. 15 min depois: calafrios, febre, dor lombar, urina escura. Reação hemolítica.',endings:3,nodes:{'start':{type:'narrative',text:'Enfermaria cirúrgica. Mulher 45a pós-histerectomia, recebendo CH. 15 min após início: calafrios, febre 39°C, dor lombar, urina cor de coca-cola. PA 85/50.',vitals:{fc:118,pas:85,pad:50,spo2:95,fr:22},next:'transf_act'},'transf_act':{type:'choice',text:'Febre + calafrios + dor lombar + hipotensão + hemoglobinúria durante transfusão. Conduta:',options:[{text:'PARAR transfusão + manter acesso com SF + coletar amostras (paciente + bolsa) + Coombs + LDH + haptoglobina + bilirrubinas',next:'transf_ok',points:3},{text:'Reduzir velocidade pela metade + Dipirona 1g IV (provavelmente reação febril não hemolítica) + observar 30 min',next:'transf_slow',points:-2},{text:'Parar transfusão + Adrenalina 0,3mg IM (anafilaxia?) + anti-histamínico + corticoide IV',next:'transf_ok',points:0},{text:'Parar + devolver bolsa + reiniciar com nova bolsa de outro doador imediatamente sem investigar',next:'transf_ok',points:1}]},'transf_ok':{type:'choice',text:'Reação hemolítica aguda confirmada (Coombs +, haptoglobina indetectável, LDH 850). Incompatibilidade ABO (erro de etiqueta!). Manejo:',options:[{text:'Hidratação vigorosa SF (diurese > 1mL/kg/h) + monitorar coagulograma (CIVD) + função renal + se oligúria: Furosemida + UTI',next:'end_transf_best',points:3},{text:'Hemodiálise urgente (hipercalemia + IRA por hemólise) + exsanguineotransfusão parcial',next:'end_transf_reg',points:0},{text:'Corticoide alta dose + IVIg (como hemólise autoimune) + Rituximab se refratário',next:'end_transf_reg',points:-1},{text:'Plasmaférese + Eculizumab (complemento) + anticoagulação plena + troca de sangue',next:'end_transf_reg',points:-1}]},'end_transf_best':{type:'ending',title:'⭐ MELHOR DESFECHO',text:'Hidratação: diurese mantida. Sem CIVD. Hemólise resolve 48h. Nova transfusão com sangue CORRETO. Notificação ao banco. Revisão protocolo.',grade:'excellent',lesson:'Reação hemolítica: PARAR + hidratar (proteger rins) + monitorar CIVD. Causa mais comum: ERRO ADMINISTRATIVO (troca de etiqueta).'},'end_transf_reg':{type:'ending',title:'⚠️ REGULAR',text:'Tratamento excessivo (hemodiálise profilática sem IRA, corticoide sem indicação). IRA transitória resolve em 5d.',grade:'regular',lesson:'Hemólise ABO ≠ autoimune. Não usar imunossupressores. Suporte + hidratação = tratamento.'},'transf_slow':{type:'ending',title:'💀 CONTINUOU HEMÓLISE',text:'Reduzir velocidade NÃO resolve incompatibilidade ABO. Cada mL piora. Recebeu +200mL. CIVD + IRA. UTI 20 dias.',grade:'death',lesson:'NUNCA continuar transfusão com sinais hemolíticos. PARAR é a primeira ação. Cada mL = mais dano.'}}},
// === CASO 17: DPOC DESCOMPENSADA ===
{id:'novela_dpoc',title:'O Tabagista Azul que Não Para de Tossir',icon:'💨',description:'Homem 68a, DPOC grave, dispneia progressiva há 3 dias. Catarro purulento. SpO2 82%. Hipercapnia. VNI ou IOT?',endings:3,nodes:{'start':{type:'narrative',text:'Quarta 8h. Homem 68a, DPOC Gold IV, O2 domiciliar 2L. Piora 3 dias: catarro verde, dispneia em repouso, cianose. Gasometria: pH 7,28, pCO2 72, pO2 48, HCO3 32. Hipercapnia crônica agudizada.',vitals:{fc:105,pas:145,pad:85,spo2:82,fr:28},next:'dpoc_act'},'dpoc_act':{type:'choice',text:'DPOC exacerbado com acidose respiratória (pH 7,28 + pCO2 72). Cianótico, SpO2 82%. Conduta ventilatória:',options:[{text:'VNI (BiPAP: IPAP 12-15 / EPAP 5-8) + O2 controlado (alvo SpO2 88-92%) + Salbutamol + Ipratrópio nebulização + Prednisona 40mg VO + ATB se purulento',next:'dpoc_vni',points:3},{text:'IOT em sequência rápida + VM protetora (Vt 6mL/kg, PEEP 5) + Salbutamol via TOT + Metilprednisolona IV + Piperacilina-Tazobactam IV',next:'dpoc_iot',points:0},{text:'O2 alto fluxo 15L por máscara com reservatório (SpO2 82% precisa de muito O2) + corticoide + ATB + reavaliar em 2h',next:'dpoc_o2alto',points:-2},{text:'Aminofilina 240mg IV lento + Dexametasona 4mg IV + NBZ com Salbutamol 5mg + O2 cateter nasal 5L/min',next:'dpoc_vni',points:0}]},'dpoc_vni':{type:'narrative',text:'BiPAP iniciado. 30 min depois: pH subiu 7,28→7,32, pCO2 desceu 72→62. SpO2 89%. Paciente mais confortável. Tolera máscara.',vitals:{fc:95,pas:135,pad:80,spo2:89,fr:22},next:'dpoc_maint'},'dpoc_maint':{type:'choice',text:'VNI funcionando. pH melhorando. Tratamento adicional da exacerbação:',options:[{text:'Prednisona 40mg/dia VO 5 dias + Amoxicilina-Clavulanato (catarro purulento) + broncodilatadores horários + VNI contínua → intermitente',next:'end_dpoc_best',points:3},{text:'Metilprednisolona 125mg IV 3 dias + Levofloxacino 750mg IV + suspender VNI (já melhorou) + O2 cateter 3L',next:'end_dpoc_reg',points:0},{text:'Sem ATB (pode ser viral) + Prednisona 40mg + manter VNI + alta em 24h se melhorar',next:'end_dpoc_reg',points:1},{text:'Prednisona 40mg + Azitromicina 500mg/dia + suspender O2 domiciliar (paciente está retendo CO2 pelo O2)',next:'end_dpoc_reg',points:-1}]},'end_dpoc_best':{type:'ending',title:'⭐ MELHOR DESFECHO',text:'VNI evitou IOT. ATB + corticoide. Alta em 5 dias com O2 domiciliar ajustado. Espirometria ambulatorial + reabilitação pulmonar encaminhada.',grade:'excellent',lesson:'DPOC exacerbada com acidose respiratória: VNI é primeira linha (reduz IOT em 50%). O2 alvo 88-92% (NÃO normalizar — retiners crônicos perdem drive respiratório). ATB se ≥ 2: dispneia + purulência + volume.'},'end_dpoc_reg':{type:'ending',title:'⚠️ REGULAR',text:'Suspender VNI cedo: re-acidose. Ou O2 alto: piora hipercapnia (narcose por CO2). Ou sem ATB com catarro purulento: não resolve.',grade:'regular',lesson:'VNI deve ser mantida até pH > 7,35 estável. O2 em DPOC: NUNCA > 92% (risco de narcose). Catarro purulento = ATB.'},'dpoc_iot':{type:'narrative',text:'IOT realizada. VM. Paciente responde ao tratamento mas desmame difícil: 10 dias intubado. PAV (pneumonia associada à VM). Prolongamento da internação.',vitals:{fc:85,pas:130,pad:75,spo2:95,fr:12},next:'dpoc_maint'},'dpoc_o2alto':{type:'narrative',text:'O2 15L/min: SpO2 sobe para 98%! Mas em 30 min: paciente cada vez mais sonolento. Gasometria: pCO2 95! pH 7,18. NARCOSE por CO2! O2 excessivo suprimiu drive respiratório.',vitals:{fc:60,pas:170,pad:100,spo2:98,fr:8},next:'dpoc_act'}}},
// === CASO 18: TVP PÓS-OPERATÓRIA ===
{id:'novela_tvp',title:'A Perna Inchada Após a Cirurgia',icon:'🦵',description:'Mulher 52a, 5º dia pós-op de prótese de quadril. Perna esquerda inchada, quente e dolorosa. Suspeita de TVP.',endings:3,nodes:{'start':{type:'narrative',text:'5º pós-op de prótese total de quadril. Mulher 52a nota perna E inchada, quente, empastada. Dor em panturrilha. Sinal de Homans duvidoso. Diferença de circunferência: 4cm.',vitals:{fc:88,pas:130,pad:78,spo2:97,fr:16},next:'tvp_diag'},'tvp_diag':{type:'choice',text:'Suspeita de TVP em pós-operatório de ortopedia (alto risco). Investigação:',options:[{text:'Doppler venoso de MMII (USG com compressão) — primeiro exame se alta probabilidade clínica pré-teste',next:'tvp_confirmed',points:3},{text:'D-dímero quantitativo — se negativo exclui TVP mesmo em pós-operatório',next:'tvp_ddimer',points:-2},{text:'AngioTC de MMII com contraste para visualização direta do trombo + extensão exata',next:'tvp_confirmed',points:0},{text:'Venografia por cateterismo (padrão-ouro histórico) + anticoagulação apenas se confirmado',next:'tvp_confirmed',points:0}]},'tvp_confirmed':{type:'choice',text:'Doppler: trombo em veia femoral superficial E + veia poplítea (TVP proximal). Sem sinais de TEP. Tratamento:',options:[{text:'Anticoagulação plena: Enoxaparina 1mg/kg 12/12h SC → transição para DOAC (Rivaroxabana 15mg 12/12h por 21d, depois 20mg/dia). Mínimo 3 meses',next:'end_tvp_best',points:3},{text:'Filtro de veia cava inferior (prevenir TEP mecanicamente) + AAS 100mg/dia + meia elástica',next:'end_tvp_reg',points:-2},{text:'Heparina não fracionada IV (bolus 80U/kg + infusão 18U/kg/h, alvo TTPa 1,5-2,5x) → transição para Warfarina (INR 2-3) por 6 meses',next:'end_tvp_best',points:2},{text:'Trombólise com Alteplase direcionada por cateter (CDT) + anticoagulação posterior — dissolver trombo rapidamente para evitar síndrome pós-trombótica',next:'end_tvp_reg',points:0}]},'end_tvp_best':{type:'ending',title:'⭐ MELHOR DESFECHO',text:'Anticoagulação plena iniciada. Sem progressão. Em 2 semanas: edema resolvendo. 3 meses: Doppler controle com recanalização parcial. Investiga trombofilia (pós-op = fator provocador identificado).',grade:'excellent',lesson:'TVP proximal pós-op: anticoagulação plena por ≥ 3 meses. DOACs preferidos (Rivaroxabana/Apixabana). D-dímero é INÚTIL em pós-operatório (sempre elevado). Filtro de VCI só se contraindicação absoluta a anticoagulação.'},'end_tvp_reg':{type:'ending',title:'⚠️ REGULAR',text:'Filtro sem anticoagulação: TVP progride. Ou trombólise em TVP sem indicação (risco de sangramento pós-op). AAS não trata TVP.',grade:'regular',lesson:'Filtro de VCI: só se sangramento ativo impeditivo de anticoagulação. AAS não substitui anticoagulação para TEV. Trombólise: reservada para TVP iliofemoral maciça com isquemia de membro (phlegmasia).'},'tvp_ddimer':{type:'narrative',text:'D-dímero: 4.200 ng/mL (positivo). Mas em pós-operatório D-dímero é SEMPRE elevado — não tem valor diagnóstico. Exame inútil aqui. Tempo perdido. Pede Doppler.',vitals:{fc:88,pas:130,pad:78,spo2:97,fr:16},next:'tvp_confirmed'}}},
// === CASO 19: BRONQUIOLITE NO LACTENTE ===
{id:'novela_bronquiolite',title:'O Bebê de 4 Meses que Não Mama',icon:'🍼',description:'Lactente 4 meses com coriza→tosse→chiado→dificuldade para mamar. Tiragem subcostal. SpO2 90%. Inverno.',endings:3,nodes:{'start':{type:'narrative',text:'Inverno. Bebê 4 meses, previamente hígido. Coriza há 3 dias → tosse + chiado + recusa alimentar há 24h. Tiragem subcostal + batimento de asa nasal. SpO2 90% AA. FR 62.',vitals:{fc:160,pas:75,pad:45,spo2:90,fr:62},next:'bvl_class'},'bvl_class':{type:'choice',text:'Lactente 4m, inverno, IVAS → desconforto respiratório com sibilos. SpO2 90%, tiragem, recusa alimentar. Diagnóstico e conduta:',options:[{text:'Bronquiolite viral aguda MODERADA-GRAVE — O2 suplementar (alvo SpO2 ≥ 92%) + aspiração nasal + hidratação IV (não mama) + internação + monitoração',next:'bvl_ok',points:3},{text:'Crise de asma do lactente — Salbutamol nebulização 2,5mg a cada 20 min (3 doses) + Prednisolona 1mg/kg VO + reavaliar em 1h',next:'bvl_salb',points:0},{text:'Pneumonia bacteriana — Amoxicilina 50mg/kg/dia VO + Rx tórax + hemograma + PCR + internação',next:'bvl_atb',points:-1},{text:'Bronquiolite leve — aspiração nasal + soro nasal + orientação de sinais de alarme + alta com retorno em 24h',next:'bvl_alta',points:-2}]},'bvl_ok':{type:'choice',text:'Internado. O2 cateter nasal 1L (SpO2 93%). Aspiração nasal de alívio. Hidratação IV 80% da necessidade. Evolução em 12h:',options:[{text:'Manter suporte (O2 + hidratação + aspiração) + observar — bronquiolite é AUTOLIMITADA, tratamento é suportivo. Reavaliar de 4/4h',next:'end_bvl_best',points:3},{text:'Adrenalina nebulizada 3mL (1:1000) + Dexametasona 0,6mg/kg VO — pode reduzir tempo de internação em bronquiolite',next:'end_bvl_reg',points:0},{text:'Salbutamol nebulização 2,5mg + Ipratrópio 250mcg + Prednisolona 1mg/kg — protocolo de broncoespasmo',next:'end_bvl_reg',points:-1},{text:'Ceftriaxona 50mg/kg/dia IV (pode ter sobreinfecção bacteriana) + Oseltamivir 3mg/kg 12/12h (cobrir Influenza) + O2',next:'end_bvl_reg',points:-1}]},'end_bvl_best':{type:'ending',title:'⭐ MELHOR DESFECHO',text:'Suporte mantido. Pico do desconforto no 3º-4º dia de doença. Melhora progressiva. O2 suspenso dia 4. Volta a mamar dia 5. Alta dia 6. Sem complicações.',grade:'excellent',lesson:'Bronquiolite viral (VSR): SUPORTE é o tratamento. Evidência NÃO suporta: broncodilatador (pode piorar), corticoide (ineficaz), ATB (vírus), fisioterapia respiratória. O que funciona: O2 + hidratação + aspiração nasal + TEMPO.'},'end_bvl_reg':{type:'ending',title:'⚠️ REGULAR',text:'Medicamentos sem evidência: beta-2 causa taquicardia no lactente, corticoide não muda desfecho, ATB desnecessário (vírus). Efeitos adversos sem benefício.',grade:'regular',lesson:'AAP/NICE/SBP recomendam: NÃO usar broncodilatador de rotina, NÃO usar corticoide, NÃO usar ATB sem indicação. Adrenalina nebulizada: evidência fraca (pode tentar 1 dose — se não melhorar, suspender).'},'bvl_salb':{type:'narrative',text:'Salbutamol dado. Bebê fica mais taquicárdico (FC 180) sem melhora dos sibilos. Bronquiolite não responde a beta-2 como asma (fisiopatologia diferente: edema + muco, não broncoespasmo).',vitals:{fc:180,pas:70,pad:40,spo2:89,fr:65},next:'bvl_ok'},'bvl_atb':{type:'narrative',text:'Rx tórax: hiperinsuflação bilateral (padrão de bronquiolite). Hemograma: sem leucocitose. PCR normal. Não é bacteriana. ATB suspenso.',vitals:{fc:160,pas:75,pad:45,spo2:90,fr:62},next:'bvl_ok'},'bvl_alta':{type:'ending',title:'💀 ALTA INADEQUADA',text:'SpO2 90% + recusa alimentar + tiragem = MODERADA-GRAVE. Alta = risco de apneia em casa (< 6 meses). Retorna em 6h com SpO2 78%. IOT necessária.',grade:'death',lesson:'Bronquiolite com SpO2 < 92% + recusa alimentar + tiragem = INTERNAÇÃO. Lactentes < 3 meses ou prematuros têm risco de apneia. Nunca dar alta com SpO2 < 92%.'}}},
// === CASO 20: TRABALHO DE PARTO COM SOFRIMENTO FETAL ===
{id:'novela_sofrimento_fetal',title:'O Bebê em Perigo no Parto',icon:'👶',description:'Gestante 39 sem em trabalho de parto. CTG mostra desacelerações tardias repetidas. Líquido amniótico meconial. Decisões que salvam duas vidas.',endings:3,nodes:{'start':{type:'narrative',text:'Maternidade, 3h. Gestante 28a, 39 semanas, G2P1, em trabalho de parto (dilatação 5cm). CTG: linha de base 160 bpm + desacelerações tardias repetidas (nadir após contrações). Líquido amniótico meconial espesso à amniotomia.',vitals:{fc:95,pas:125,pad:78,spo2:98,fr:18},next:'sf_assess'},'sf_assess':{type:'choice',text:'CTG categoria III (desacelerações tardias repetidas + taquicardia fetal + variabilidade reduzida). Líquido meconial espesso. Dilatação 5cm. Conduta:',options:[{text:'Ressuscitação intrauterina (DLE + O2 + SF 500mL + suspender ocitocina) + reavaliar em 30 min — se não melhorar: cesárea de emergência',next:'sf_ressusc',points:3},{text:'Cesárea de emergência IMEDIATA (CTG categoria III = sofrimento fetal agudo, não esperar) + equipe neonatal na sala',next:'sf_cesarea',points:2},{text:'Manter condução do parto com ocitocina + amnioinfusão transcervical para diluir mecônio + monitoração contínua + parto vaginal',next:'sf_ocitocina',points:-2},{text:'Tocolítico (Terbutalina 0,25mg SC) para parar contrações + transferir para hospital terciário com UTI neonatal + corticoide para maturação',next:'sf_toco',points:-1}]},'sf_ressusc':{type:'narrative',text:'Ressuscitação intrauterina: DLE + suspendeu ocitocina + SF 500mL + O2 materno.\n\n30 min: CTG persiste com desacelerações tardias. Variabilidade mínima. pH fetal (couro cabeludo): 7,15 (acidemia).',vitals:{fc:92,pas:120,pad:75,spo2:99,fr:16},next:'sf_decision'},'sf_decision':{type:'choice',text:'Ressuscitação falhou. CTG mantém padrão patológico. pH fetal 7,15 (< 7,20 = acidemia). Dilatação agora 6cm. Conduta definitiva:',options:[{text:'Cesárea de emergência (categoria 1: decisão-nascimento < 30 min) + equipe neonatal + material de reanimação preparado',next:'end_sf_best',points:3},{text:'Fórcipe de alívio (dilatação 6cm = NÃO é total — impossível fórcipe!) + episiotomia ampla',next:'end_sf_reg',points:-2},{text:'Manter DLE + aumentar O2 para 10L + nova avaliação em 1h + pedir parecer de obstetrícia senior',next:'end_sf_reg',points:-1},{text:'Vácuo-extrator (ventosa) para acelerar período expulsivo + equipe neonatal + Kristeller (pressão fúndica)',next:'end_sf_reg',points:-2}]},'end_sf_best':{type:'ending',title:'⭐ MELHOR DESFECHO',text:'Cesárea em 22 min (decisão-nascimento). RN nasce deprimido (Apgar 4/7). Aspiração de mecônio realizada. Ventilação com pressão positiva. Recupera em 5 min. UTI neonatal 48h.\n\nAlta neonatal em 5 dias sem sequelas. Mãe bem.',grade:'excellent',lesson:'CTG categoria III que não responde a ressuscitação intrauterina em 30 min = cesárea URGENTE. Decisão-nascimento < 30 min. Fórcipe/vácuo só com dilatação TOTAL (10cm). Kristeller é PROSCRITO (risco de rotura uterina).'},'end_sf_reg':{type:'ending',title:'💀 DESFECHO RUIM',text:'Atraso na decisão ou tentativa de instrumentação com dilatação incompleta = desastre. RN nasce em asfixia grave (Apgar 1/3). Síndrome de aspiração meconial. Encefalopatia hipóxico-isquêmica. Hipotermia terapêutica.\n\nSequela neurológica provável.',grade:'death',lesson:'Fórcipe/vácuo com < 10cm de dilatação é CONTRAINDICADO. Kristeller é proibido pela OMS. CTG III persistente + pH < 7,20 = cesárea, não instrumentação.'},'sf_cesarea':{type:'narrative',text:'Cesárea imediata. Decisão-nascimento: 18 min. RN deprimido: Apgar 3/6. Aspiração mecônio. VPP. Recupera em 8 min.',vitals:{fc:88,pas:115,pad:72,spo2:99,fr:14},next:'end_sf_best'},'sf_ocitocina':{type:'narrative',text:'Manter ocitocina com CTG categoria III = AUMENTA sofrimento (mais contrações = menos perfusão placentária). Desacelerações pioram. FC fetal cai para 80 bpm sustentado (bradicardia). Emergência.',vitals:{fc:100,pas:130,pad:80,spo2:98,fr:18},next:'sf_decision'},'sf_toco':{type:'narrative',text:'Tocolítico em TP ativo com sofrimento fetal e 39 sem = sem indicação. Não precisa de corticoide (termo). Transferência demora 2h. CTG piora.',vitals:{fc:95,pas:125,pad:78,spo2:98,fr:16},next:'sf_decision'}}}
];



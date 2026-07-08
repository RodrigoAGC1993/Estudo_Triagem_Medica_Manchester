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
}
];


// Lotes 2, 3 e 4 serão adicionados em breve — placeholder para deploy parcial
// O sistema já reconhece os 4 primeiros casos extras.

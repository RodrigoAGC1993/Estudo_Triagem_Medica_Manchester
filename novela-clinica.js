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
},
// === NOVELA 2: A GRÁVIDA COM CONVULSÃO ===
{
    id: 'novela_eclampsia',
    title: 'A Grávida que Convulsionou',
    icon: '🤰',
    description: 'Madrugada na maternidade. Gestante de 34 semanas convulsiona. O que você faz define duas vidas — mãe e bebê.',
    endings: 3,
    nodes: {
        'start': {
            type: 'narrative',
            text: '🌙 Terça, 3h da madrugada. Você é o plantonista da maternidade.\n\nA enfermeira corre até você: "Doutor! A gestante do leito 4 está convulsionando!"\n\nVocê corre ao leito. Maria, 28 anos, 34 semanas de gestação, primigesta. Está em movimentos tônico-clônicos generalizados há ~1 minuto.',
            vitals: { fc: 130, pas: 190, pad: 120, spo2: 88, fr: 8 },
            next: 'seizure_action'
        },
        'seizure_action': {
            type: 'choice',
            text: '⚡ A paciente está convulsionando AGORA. Qual sua ação imediata?',
            options: [
                { text: '💉 Sulfato de Magnésio IV (4-6g em 20 min) — é eclâmpsia até prova contrária', next: 'mgso4_given', points: 3 },
                { text: '💊 Diazepam IV 10mg para parar a convulsão', next: 'diazepam_path', points: 1 },
                { text: '👶 Cesárea de emergência imediata (tirar o bebê agora)', next: 'immediate_csection', points: -1 },
                { text: '📞 Ligar para o neurologista (pode ser epilepsia)', next: 'call_neuro', points: -2 }
            ]
        },
        'mgso4_given': {
            type: 'narrative',
            text: '✅ Sulfato de Magnésio em bolus IV. Convulsão cessa em 2 minutos.\n\nVocê posiciona Maria em decúbito lateral esquerdo (descomprime a veia cava). O2 por máscara. A SpO2 sobe para 94%.\n\nPA pós-convulsão: 185/115. FC fetal: 90 bpm (bradicardia transitória — monitorar).',
            vitals: { fc: 105, pas: 175, pad: 110, spo2: 94, fr: 18 },
            next: 'post_seizure_mgso4'
        },
        'post_seizure_mgso4': {
            type: 'choice',
            text: 'Convulsão controlada com MgSO4. PA ainda 175/110. FC fetal recuperando (agora 120 bpm). Próximos passos?',
            options: [
                { text: '💊 Anti-hipertensivo (Hidralazina IV) + manter MgSO4 + planejar PARTO nas próximas horas', next: 'correct_management', points: 3 },
                { text: '🏠 Observar 24h e dar alta se melhorar', next: 'discharge_disaster', points: -3 },
                { text: '💉 Aumentar dose de MgSO4 para 10g (dobrar)', next: 'mgso4_overdose', points: -2 }
            ]
        },
        'correct_management': {
            type: 'narrative',
            text: '✅ Hidralazina 5mg IV. PA caiu para 155/95 em 20 min. MgSO4 em manutenção (1-2g/h).\n\nMonitoramento: reflexo patelar presente, diurese > 25 mL/h (MgSO4 seguro).\n\nExames: proteínas 24h = 4,2g, plaquetas 98.000 (caindo), TGO 180, LDH 850.\n\n⚠️ Critérios de HELLP parcial! Resolução da gestação indicada.',
            vitals: { fc: 88, pas: 148, pad: 92, spo2: 97, fr: 16 },
            next: 'delivery_decision'
        },
        'delivery_decision': {
            type: 'choice',
            text: 'Eclâmpsia + HELLP parcial + 34 semanas. O parto é o tratamento definitivo. Qual via?',
            options: [
                { text: '🏥 Cesárea assim que estabilizar (não esperar trabalho de parto)', next: 'ending_best_eclampsia', points: 3 },
                { text: '⏳ Indução de parto normal com ocitocina', next: 'ending_ok_eclampsia', points: 1 }
            ]
        },
        'ending_best_eclampsia': {
            type: 'ending',
            title: '⭐ MELHOR DESFECHO — Mãe e Bebê Salvos',
            text: 'Cesárea sob anestesia geral (contraindicado raquianestesia com plaquetas < 100.000). Bebê nasce com 2,1 kg, Apgar 6/8.\n\nRN vai para UTI neonatal — evolui bem, alta em 12 dias.\n\nMaria na UTI materna 48h. MgSO4 mantido por 24h pós-parto. Plaquetas normalizam em 5 dias. Alta em 7 dias.\n\nDecisão rápida e acertada salvou duas vidas.',
            grade: 'excellent',
            lesson: 'LIÇÃO: Eclâmpsia = MgSO4 primeiro (não diazepam). Tratamento definitivo = parto. HELLP com plaquetas < 100.000 = cesárea + cuidado com anestesia. MgSO4 mantém 24-48h pós-parto.'
        },
        'ending_ok_eclampsia': {
            type: 'ending',
            title: '✅ DESFECHO BOM — Com Complicações Menores',
            text: 'Indução com ocitocina. Trabalho de parto demorou 14 horas. Nesse período, plaquetas caíram para 65.000.\n\nParto vaginal eventualmente — bebê nasce com Apgar 5/7 (reanimação necessária).\n\nMaria teve sangramento pós-parto (atonia + plaquetopenia) — transfusão de 2 concentrados de hemácias + plaquetas.\n\nAmbos sobrevivem, mas com internação prolongada.',
            grade: 'good',
            lesson: 'LIÇÃO: Na HELLP com plaquetas caindo, indução pode ser arriscada (sangramento). Cesárea tende a ser mais segura e controlada. Cada hora com HELLP ativa piora o prognóstico.'
        },
        'diazepam_path': {
            type: 'narrative',
            text: '💊 Diazepam 10mg IV. Convulsão para... mas volta em 5 minutos (recorrente).\n\nDiazepam não trata a causa (eclâmpsia). Apenas sedação temporária.\n\nA enfermeira experiente sugere: "Doutor, não seria melhor Sulfato de Magnésio?"',
            vitals: { fc: 120, pas: 185, pad: 115, spo2: 90, fr: 14 },
            next: 'diazepam_choice'
        },
        'diazepam_choice': {
            type: 'choice',
            text: 'Convulsão recorrente apesar do diazepam. O que fazer?',
            options: [
                { text: '✅ Iniciar MgSO4 agora (deveria ter sido o primeiro)', next: 'late_mgso4', points: 2 },
                { text: '💊 Mais diazepam + fenitoína', next: 'ending_poor_eclampsia', points: -2 }
            ]
        },
        'late_mgso4': {
            type: 'narrative',
            text: 'MgSO4 iniciado (com atraso de 10 min). Convulsões cessam.\n\nMas o atraso causou hipóxia fetal: FC fetal caiu para 70 bpm por 5 min. Desaceleração prolongada.',
            vitals: { fc: 100, pas: 170, pad: 105, spo2: 93, fr: 18 },
            next: 'delivery_decision'
        },
        'ending_poor_eclampsia': {
            type: 'ending',
            title: '⚠️ DESFECHO RUIM — Sequelas Neonatais',
            text: 'Diazepam repetido + Fenitoína: convulsões controladas eventualmente, mas 15 min de atividade convulsiva total.\n\nDesaceleração fetal prolongada → cesárea de emergência.\n\nBebê nasce em asfixia (Apgar 2/4). Encefalopatia hipóxico-isquêmica. Hipotermia terapêutica.\n\nMaria sobrevive, mas o bebê terá sequelas neurológicas permanentes.',
            grade: 'poor',
            lesson: 'LIÇÃO: Na eclâmpsia, MgSO4 é SEMPRE primeira linha — não diazepam ou fenitoína. BZDs deprimem o feto e não previnem recorrência. MgSO4 tanto trata quanto previne novas crises.'
        },
        'immediate_csection': {
            type: 'ending',
            title: '⚠️ DESFECHO REGULAR — Pressa sem Estabilização',
            text: 'Cesárea imediata durante a convulsão. Extremamente arriscado:\n\n- Intubação difícil (paciente convulsionando + edema de via aérea na eclâmpsia)\n- Sangramento intraoperatório importante (sem controle pressórico)\n- Bebê nasce deprimido (Apgar 3/5) — reanimação prolongada\n\nAmbos sobrevivem, mas com complicações evitáveis. A mãe vai para UTI por 5 dias.',
            grade: 'regular',
            lesson: 'LIÇÃO: Eclâmpsia → PRIMEIRO estabilizar a mãe (MgSO4 + anti-hipertensivo) → DEPOIS parto. Operar durante convulsão ativa é perigoso para mãe e bebê. 15-20 min para estabilizar não prejudicam o feto na maioria dos casos.'
        },
        'call_neuro': {
            type: 'narrative',
            text: '📞 Você liga para o neurologista. Demora 25 min para atender.\n\nEnquanto espera, a paciente tem SEGUNDA convulsão. PA: 200/125. FC fetal: 60 bpm.\n\nA enfermeira, por conta própria, pede que o anestesista venha.',
            vitals: { fc: 140, pas: 200, pad: 125, spo2: 82, fr: 6 },
            next: 'neuro_disaster'
        },
        'neuro_disaster': {
            type: 'choice',
            text: '🚨 Paciente em status epilepticus eclâmptico. FC fetal 60 (sofrimento grave). O que fazer?',
            options: [
                { text: 'MgSO4 AGORA + cesárea de emergência após controle', next: 'ending_ok_eclampsia', points: 2 },
                { text: 'Continuar esperando o neurologista', next: 'ending_death_eclampsia', points: -5 }
            ]
        },
        'ending_death_eclampsia': {
            type: 'ending',
            title: '💀 DESFECHO CATASTRÓFICO — Óbito Fetal + Mãe em UTI',
            text: 'Neurologista chegou após 30 min. Nesse tempo: status eclâmptico prolongado.\n\nBCF inaudível — óbito fetal intrauterino.\n\nMaria evolui com coagulação intravascular disseminada (CIVD) + insuficiência renal aguda + edema cerebral.\n\nSobrevive após 15 dias de UTI com diálise. Bebê perdido.\n\nUma tragédia que MgSO4 nos primeiros minutos teria evitado.',
            grade: 'death',
            lesson: 'LIÇÃO: Eclâmpsia é diagnóstico OBSTÉTRICO, não neurológico. O plantonista da maternidade DEVE saber tratá-la sozinho. Esperar especialista em emergência obstétrica = morte. MgSO4 está na mão de todo obstetra.'
        },
        'discharge_disaster': {
            type: 'ending',
            title: '💀 ÓBITO — Alta Após Eclâmpsia',
            text: 'Você deu alta após "melhora" da convulsão. Maria voltou para casa.\n\n6 horas depois: nova convulsão em casa → queda → TCE + nova crise eclâmptica.\n\nSAMU encontra paciente em PCR. Cesárea perimortem no hospital. Bebê não sobrevive.\n\nMaria sobrevive com sequela neurológica grave (hemorragia intracraniana).\n\nProcesso criminal por negligência.',
            grade: 'death',
            lesson: 'LIÇÃO: NUNCA dar alta após eclâmpsia. A paciente precisa de MgSO4 por 24-48h PÓS-PARTO + monitoramento em UTI. Eclâmpsia pode recorrer até 48h após o parto.'
        },
        'mgso4_overdose': {
            type: 'ending',
            title: '⚠️ DESFECHO RUIM — Intoxicação por Magnésio',
            text: 'MgSO4 em dose excessiva (10g bolus) → intoxicação:\n\n- Reflexos patelares abolidos (primeiro sinal!)\n- Depressão respiratória (FR 6)\n- Hipotensão\n\nAntídoto: Gluconato de Cálcio 1g IV. Respiração retorna.\n\nMas durante a apneia, hipóxia fetal → cesárea de emergência. Bebê com Apgar baixo.\n\nAmbos sobrevivem com sequelas evitáveis.',
            grade: 'regular',
            lesson: 'LIÇÃO: MgSO4 dose correta: 4-6g bolus em 20min, manutenção 1-2g/h. Monitorar: reflexo patelar, FR > 12, diurese > 25mL/h. Se intoxicação: Gluconato de Cálcio é o antídoto. Dose excessiva mata por parada respiratória.'
        }
    }
},
// === NOVELA 3: A ICTERÍCIA MISTERIOSA ===
{
    id: 'novela_ictericia',
    title: 'A Professora que Ficou Amarela',
    icon: '🟡',
    description: 'Mulher de 42 anos, professora, chega ao PS com pele amarelada, confusão mental e dor abdominal. O fígado está falhando — mas por quê?',
    endings: 3,
    nodes: {
        'start': {
            type: 'narrative',
            text: '🏥 Segunda-feira, 15h. Pronto-socorro.\n\nCarla, 42 anos, professora de história. O marido a trouxe porque ela está "amarela e estranha" há 2 dias.\n\nEle conta: "Ela começou com dor na barriga, depois ficou amarela e hoje não está fazendo sentido no que fala."\n\nAo exame: icterícia ++++, confusa (Glasgow 13), abdome tenso em HCD, fígado não palpável.',
            vitals: { fc: 95, pas: 108, pad: 68, spo2: 97, fr: 18 },
            next: 'initial_workup'
        },
        'initial_workup': {
            type: 'choice',
            text: 'Icterícia aguda + encefalopatia + mulher jovem. Qual é seu raciocínio diagnóstico principal?',
            options: [
                { text: '🔬 Insuficiência Hepática Aguda (hepatite fulminante?) — pedir INR, transaminases, bilirrubinas URGENTE', next: 'liver_failure_path', points: 3 },
                { text: '🪨 Cálculo biliar com colangite (Charcot?) — pedir USG de vias biliares', next: 'biliary_path', points: 1 },
                { text: '🩸 Hemólise aguda — pedir hemograma + reticulócitos', next: 'hemolysis_path', points: 0 },
                { text: '🫘 Problema renal — pedir função renal', next: 'renal_wrong', points: -1 }
            ]
        },
        'liver_failure_path': {
            type: 'narrative',
            text: '🔬 Resultados em 1 hora:\n\n⚠️ INR: 4,8 (muito alargado!)\nTGO: 3.500 | TGP: 4.200 (transaminases muito elevadas)\nBilirrubina total: 18 mg/dL\nAlbumina: 2,8\nAmônia: 180 (elevada — explica a confusão)\n\nCritérios de Insuficiência Hepática Aguda: icterícia + coagulopatia (INR > 1,5) + encefalopatia em paciente SEM doença hepática prévia.',
            vitals: { fc: 92, pas: 105, pad: 65, spo2: 97, fr: 18 },
            next: 'cause_investigation'
        },
        'cause_investigation': {
            type: 'choice',
            text: 'Insuficiência hepática aguda confirmada. Precisa descobrir a CAUSA para tratar. O que investigar?',
            options: [
                { text: '💊 Perguntar sobre medicamentos/chás + dosar paracetamol sérico', next: 'paracetamol_found', points: 3 },
                { text: '🦠 Sorologias virais (hepatite A, B, C, E, CMV, EBV)', next: 'viral_negative', points: 2 },
                { text: '🫁 TC de tórax (pode ser câncer com metástase hepática)', next: 'wrong_ct', points: -1 }
            ]
        },
        'paracetamol_found': {
            type: 'narrative',
            text: '💊 Você pergunta sobre medicamentos. O marido lembra:\n\n"Ela teve dor de dente forte na semana passada. Tomou bastante daquele remédio de dor... Tylenol, acho. Disse que tomava de 4 em 4 horas..."\n\nVocê calcula: provavelmente > 10g/dia por 5 dias.\n\n🔬 Paracetamol sérico: 180 mcg/mL (TÓXICO!)\nNomograma de Rumack-Matthew: ZONA DE RISCO.',
            vitals: { fc: 88, pas: 102, pad: 62, spo2: 97, fr: 16 },
            next: 'nac_decision'
        },
        'nac_decision': {
            type: 'choice',
            text: 'Causa: hepatotoxicidade por paracetamol (acetaminofeno). Antídoto?',
            options: [
                { text: '💉 N-Acetilcisteína (NAC) IV protocolo de 21h + contato com centro de transplante', next: 'ending_best_liver', points: 3 },
                { text: '🩸 Plasmaférese de urgência', next: 'ending_ok_liver', points: 1 },
                { text: '⏳ Apenas observar — o fígado regenera sozinho', next: 'ending_death_liver', points: -3 }
            ]
        },
        'ending_best_liver': {
            type: 'ending',
            title: '⭐ MELHOR DESFECHO — Fígado Salvo',
            text: 'NAC IV iniciada imediatamente (150mg/kg em 1h → 50mg/kg em 4h → 100mg/kg em 16h).\n\nEm 48h: INR começa a cair (3,2 → 2,1 → 1,5). Transaminases em queda. Encefalopatia resolvendo.\n\nCarla recupera consciência no 3º dia. "O que aconteceu, doutor?"\n\nAlta em 10 dias com fígado recuperado. Orientação: NUNCA paracetamol > 4g/dia. Seguimento com hepatologista.',
            grade: 'excellent',
            lesson: 'LIÇÃO: Paracetamol é a causa Nº1 de insuficiência hepática aguda no mundo. Dose tóxica: > 7,5-10g/dia. NAC é o antídoto e funciona mesmo após 24h do início dos sintomas (benefício comprovado). Sempre perguntar sobre medicamentos em icterícia aguda!'
        },
        'ending_ok_liver': {
            type: 'ending',
            title: '✅ DESFECHO BOM — Mas Poderia Ser Mais Simples',
            text: 'Plasmaférese melhora o INR temporariamente, mas não trata a causa.\n\nApós insistência do hepatologista, NAC é iniciada (com 12h de atraso).\n\nCarla piora antes de melhorar — Glasgow cai para 10 — quase indicou transplante.\n\nRecupera em 14 dias. Processo mais longo e arriscado que o necessário.',
            grade: 'good',
            lesson: 'LIÇÃO: Na intoxicação por paracetamol, NAC é o antídoto ESPECÍFICO. Plasmaférese trata consequência (INR alto) mas não a causa. NAC precoce = recuperação mais rápida e menor risco de transplante.'
        },
        'ending_death_liver': {
            type: 'ending',
            title: '💀 ÓBITO — Fígado Não Regenera sem Tratamento',
            text: 'Sem NAC, a hepatotoxicidade progride inexoravelmente.\n\n48h: INR 8,5 | Glasgow 6 | Amônia 350.\n72h: Falência multiorgânica. Edema cerebral.\n\nCarla entra em coma. Critérios de King\'s College para transplante preenchidos — mas não há fígado disponível a tempo.\n\nÓbito no 5º dia por edema cerebral refratário.\n\nUm Tylenol que custou uma vida. Um antídoto barato (NAC) que não foi dado.',
            grade: 'death',
            lesson: 'LIÇÃO: Insuficiência hepática aguda por paracetamol SEM tratamento tem mortalidade > 90% em casos graves. NAC reduz mortalidade para < 10% se dada a tempo. É um antídoto barato, disponível em todo hospital. NUNCA "apenas observar" hepatite fulminante.'
        },
        'viral_negative': {
            type: 'narrative',
            text: '🦠 Sorologias solicitadas (resultado em 24-48h). Enquanto isso, você pergunta sobre medicamentos...\n\nO marido menciona o paracetamol. Você dosa: nível tóxico confirmado.',
            vitals: { fc: 90, pas: 105, pad: 65, spo2: 97, fr: 17 },
            next: 'nac_decision'
        },
        'biliary_path': {
            type: 'narrative',
            text: '🪨 USG de abdome: vias biliares de calibre normal. Sem cálculos. Fígado de tamanho normal com ecogenicidade heterogênea.\n\nNão é obstrução biliar. Mas os exames de sangue chegaram:\nINR 4,8 | TGO 3.500 | TGP 4.200\n\n⚠️ Isso é hepatite fulminante, não colangite!',
            vitals: { fc: 95, pas: 108, pad: 68, spo2: 97, fr: 18 },
            next: 'cause_investigation'
        },
        'hemolysis_path': {
            type: 'narrative',
            text: '🩸 Hemograma: Hb 11,5 (normal). Reticulócitos normais. LDH pouco elevada. Haptoglobina normal.\n\nNão é hemólise. Mas os exames hepáticos chegaram:\nINR 4,8 | TGO 3.500\n\nO problema é no fígado.',
            vitals: { fc: 95, pas: 108, pad: 68, spo2: 97, fr: 18 },
            next: 'cause_investigation'
        },
        'renal_wrong': {
            type: 'narrative',
            text: '🫘 Função renal: creatinina 1,8 (leve elevação — hepatorrenal?). Ureia 65.\n\nMas NÃO explica a icterícia. Exames hepáticos chegam:\nINR 4,8 | TGO 3.500\n\nVocê percebe: o problema é HEPÁTICO, não renal.',
            vitals: { fc: 98, pas: 105, pad: 65, spo2: 96, fr: 19 },
            next: 'cause_investigation'
        },
        'wrong_ct': {
            type: 'narrative',
            text: '📷 TC de tórax normal. 30 minutos perdidos.\n\nOs exames de sangue voltam:\nINR 4,8 | Paracetamol sérico: tóxico.\n\nVocê desperdiçou tempo com exame desnecessário.',
            vitals: { fc: 95, pas: 100, pad: 62, spo2: 96, fr: 18 },
            next: 'nac_decision'
        }
    }
},
// === NOVELA 4: O JOVEM COM FRAQUEZA SÚBITA ===
{
    id: 'novela_guillain',
    title: 'O Personal Trainer que Parou de Andar',
    icon: '🦵',
    description: 'Rapaz de 28 anos, atlético, acorda sem conseguir mexer as pernas. Está piorando hora a hora. Você precisa agir antes que a fraqueza chegue ao diafragma.',
    endings: 3,
    nodes: {
        'start': {
            type: 'narrative',
            text: '🏥 Quarta-feira, 7h. Emergência.\n\nRafael, 28 anos, personal trainer. Chega de cadeira de rodas empurrado pela namorada.\n\n"Doutor, ontem minhas pernas ficaram fracas. Hoje de manhã não consigo mais levantar. E os braços estão começando a ficar estranhos também..."\n\nEle menciona que teve uma diarreia forte há 2 semanas que durou 3 dias.',
            vitals: { fc: 72, pas: 125, pad: 78, spo2: 98, fr: 16 },
            next: 'neuro_exam'
        },
        'neuro_exam': {
            type: 'choice',
            text: 'Fraqueza ascendente + antecedente de infecção GI. O que avaliar PRIMEIRO no exame neurológico?',
            options: [
                { text: '🦵 Reflexos profundos (patelar, aquileu) + força muscular MMII e MMSS + sensibilidade', next: 'exam_results', points: 3 },
                { text: '🧠 TC de crânio urgente', next: 'ct_waste', points: -1 },
                { text: '📋 Apenas observar — deve ser estresse (é jovem e saudável)', next: 'observe_disaster', points: -3 }
            ]
        },
        'exam_results': {
            type: 'narrative',
            text: '🔍 Exame neurológico:\n\n• Força MMII: 2/5 bilateral (não vence gravidade)\n• Força MMSS: 4/5 (leve fraqueza proximal)\n• Reflexos patelares: AUSENTES bilateralmente\n• Reflexos aquileus: AUSENTES\n• Sensibilidade: em luva e bota (diminuída distalmente)\n• Pares cranianos: normais (por enquanto)\n\nPatrão: fraqueza ascendente + arreflexia + pós-infecção = ?',
            vitals: { fc: 75, pas: 122, pad: 75, spo2: 98, fr: 17 },
            next: 'diagnosis_choice'
        },
        'diagnosis_choice': {
            type: 'choice',
            text: 'Fraqueza ascendente + arreflexia + pós-infecção gastrointestinal (provavelmente Campylobacter). Diagnóstico?',
            options: [
                { text: '🧬 Síndrome de Guillain-Barré (polirradiculoneuropatia aguda)', next: 'gbs_correct', points: 3 },
                { text: '🦴 Hérnia de disco lombar bilateral', next: 'wrong_hernia', points: -1 },
                { text: '🧪 Hipocalemia grave (K+ baixo)', next: 'wrong_hypokalemia', points: 0 }
            ]
        },
        'gbs_correct': {
            type: 'narrative',
            text: '✅ Suspeita de Guillain-Barré confirmada clinicamente.\n\nVocê sabe que é uma emergência neurológica — a fraqueza pode ascender e atingir o DIAFRAGMA (insuficiência respiratória).\n\n❓ Pergunta crucial: Capacidade Vital Forçada (CVF) = qual o valor?',
            vitals: { fc: 78, pas: 120, pad: 75, spo2: 97, fr: 18 },
            next: 'cvf_decision'
        },
        'cvf_decision': {
            type: 'choice',
            text: 'Na Guillain-Barré, qual critério respiratório indica necessidade de intubação profilática?',
            options: [
                { text: '🫁 CVF < 20 mL/kg ou queda > 30% = UTI + preparar IOT (regra 20/30)', next: 'correct_monitoring', points: 3 },
                { text: '🫁 Só intubar quando SpO2 < 80%', next: 'late_intubation', points: -2 },
                { text: '💊 Não precisa monitorar respiração — SGB não afeta diafragma', next: 'wrong_no_resp', points: -3 }
            ]
        },
        'correct_monitoring': {
            type: 'narrative',
            text: '✅ CVF medida: 18 mL/kg (abaixo de 20!). Transferido para UTI.\n\nPressão inspiratória máxima: -25 cmH2O (normal > -30).\n\n⚠️ Critérios de IOT se aproximando. Diafragma comprometendo.\n\nVocê inicia tratamento e prepara a via aérea.',
            vitals: { fc: 82, pas: 130, pad: 80, spo2: 95, fr: 22 },
            next: 'treatment_choice'
        },
        'treatment_choice': {
            type: 'choice',
            text: 'Guillain-Barré com progressão respiratória. Qual tratamento ESPECÍFICO?',
            options: [
                { text: '💉 Imunoglobulina IV (IVIg) 0,4g/kg/dia por 5 dias OU Plasmaférese', next: 'ending_best_gbs', points: 3 },
                { text: '💊 Corticoide em dose alta (pulso de metilprednisolona)', next: 'ending_regular_gbs', points: -1 },
                { text: '💊 Antibiótico de amplo espectro (pode ser infecção)', next: 'ending_poor_gbs', points: -2 }
            ]
        },
        'ending_best_gbs': {
            type: 'ending',
            title: '⭐ MELHOR DESFECHO — Recuperação Completa',
            text: 'IVIg iniciada na UTI. IOT profilática no 2º dia (CVF caiu para 12 mL/kg).\n\nVentilação mecânica por 8 dias. IVIg completou ciclo de 5 dias.\n\nDia 10: força retornando em MMSS. Dia 14: extubado. Dia 21: movimenta MMII.\n\nAlta para reabilitação em 30 dias. Após 3 meses de fisio: volta a treinar normalmente.\n\nRafael volta à academia 6 meses depois. Recuperação neurológica completa.',
            grade: 'excellent',
            lesson: 'LIÇÃO: SGB é autolimitada MAS pode matar por insuficiência respiratória. IVIg ou plasmaférese aceleram recuperação. Monitorar CVF seriada (regra 20/30). IOT profilática ANTES de falência respiratória = melhor prognóstico. Corticoide NÃO funciona na SGB.'
        },
        'ending_regular_gbs': {
            type: 'ending',
            title: '⚠️ DESFECHO REGULAR — Tratamento Ineficaz',
            text: 'Corticoide NÃO funciona na Guillain-Barré (evidência de estudos randomizados — pode até piorar).\n\nEnquanto recebia metilprednisolona por 3 dias sem melhora, a fraqueza atingiu o diafragma.\n\nIOT de emergência (não profilática — mais arriscada). Pneumonia associada à VM.\n\nEventualmente recebe IVIg (com 5 dias de atraso). Recuperação lenta. Desmame da VM em 21 dias.\n\nSequela residual: fraqueza distal em pés. Não recupera 100%. Deambula com apoio.',
            grade: 'regular',
            lesson: 'LIÇÃO: Corticoides NÃO têm eficácia comprovada na SGB (diferente da CIDP crônica). IVIg ou plasmaférese são os únicos tratamentos eficazes. Atraso = recuperação pior e mais lenta.'
        },
        'ending_poor_gbs': {
            type: 'ending',
            title: '💀 DESFECHO RUIM — Complicações Graves',
            text: 'Antibiótico não trata SGB (não é infecção ativa — é autoimune pós-infecciosa).\n\nSem IVIg + sem monitoramento respiratório adequado:\n\nDia 3: Rafael para de respirar no leito de enfermaria. PCR por hipóxia.\n\nRessuscitado com sucesso, mas 6 min de anóxia. IOT pós-PCR. IVIg iniciada (tarde).\n\nSequelas motoras permanentes + encefalopatia hipóxica leve. Não volta a trabalhar.',
            grade: 'poor',
            lesson: 'LIÇÃO: SGB NÃO é infecção — é doença autoimune PÓS-infecciosa (anticorpos contra o próprio nervo). Antibiótico não ajuda. A maior ameaça é RESPIRATÓRIA — monitorar CVF de 4/4h na fase de progressão.'
        },
        'ct_waste': {
            type: 'narrative',
            text: '🧠 TC de crânio: completamente normal (esperado — SGB é periférica, não central).\n\n40 minutos perdidos. Enquanto isso, Rafael nota que os braços pioraram.\n\nVocê refaz o exame neurológico.',
            vitals: { fc: 78, pas: 125, pad: 78, spo2: 97, fr: 18 },
            next: 'exam_results'
        },
        'observe_disaster': {
            type: 'ending',
            title: '💀 ÓBITO — "É Jovem, Vai Melhorar Sozinho"',
            text: 'Você mandou Rafael para casa com "observação e repouso".\n\n12 horas depois: parou de respirar em casa dormindo. A namorada acordou e ele estava cianótico.\n\nSAMU chega. PCR por asfixia. Ressuscitação prolongada sem sucesso.\n\nÓbito por insuficiência respiratória não monitorada em Guillain-Barré não diagnosticada.\n\nO atleta de 28 anos morreu porque alguém achou que "jovens não adoecem de verdade".',
            grade: 'death',
            lesson: 'LIÇÃO: Idade jovem NÃO exclui doença grave. Fraqueza ascendente progressiva + arreflexia é Guillain-Barré até prova contrária. NUNCA dar alta com fraqueza inexplicada sem investigar. A paralisia diafragmática pode ocorrer em horas.'
        },
        'late_intubation': {
            type: 'narrative',
            text: '⏳ Você não monitorou a CVF. No dia seguinte, SpO2 cai abruptamente para 78%.\n\nIOT de emergência (difícil — paciente em insuficiência respiratória franca). Aspiração durante procedimento.\n\nPneumonia aspirativa + VM prolongada.',
            vitals: { fc: 130, pas: 90, pad: 55, spo2: 78, fr: 35 },
            next: 'treatment_choice'
        },
        'wrong_no_resp': {
            type: 'ending',
            title: '💀 DESFECHO CATASTRÓFICO — Apneia Noturna Fatal',
            text: 'Você afirmou que "SGB não afeta respiração". ERRADO.\n\n30% dos pacientes com SGB necessitam de VM. É a principal causa de morte na doença.\n\nRafael desenvolveu paralisia diafragmática durante a noite. Sem monitor nem CVF seriada, ninguém percebeu.\n\nPCR por asfixia às 4h da manhã. Óbito.',
            grade: 'death',
            lesson: 'LIÇÃO: SGB afeta SIM a respiração (30% precisam de ventilação mecânica). Monitorar CVF de 4/4h é obrigatório. Regra 20/30/40: CVF < 20 mL/kg OU PIMax < -30 OU queda > 30% = IOT. Desconhecer isso é letal.'
        },
        'wrong_hernia': {
            type: 'narrative',
            text: '🦴 Hérnia de disco não causa fraqueza bilateral simétrica com arreflexia global. Além disso, Rafael não tem dor lombar.\n\nRM de coluna: normal.\n\nTempo perdido. Você reavalia o quadro.',
            vitals: { fc: 78, pas: 125, pad: 78, spo2: 97, fr: 18 },
            next: 'diagnosis_choice'
        },
        'wrong_hypokalemia': {
            type: 'narrative',
            text: '🧪 K+ sérico: 4,2 mEq/L (normal). Não é hipocalemia.\n\nMas a fraqueza é REAL e progressiva. Arreflexia aponta para causa neurológica periférica.\n\nVocê reconsidra.',
            vitals: { fc: 78, pas: 125, pad: 78, spo2: 97, fr: 18 },
            next: 'diagnosis_choice'
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

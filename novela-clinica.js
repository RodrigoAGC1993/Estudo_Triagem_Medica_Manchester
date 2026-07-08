/**
 * Novela Clínica — Casos com múltiplas rotas e desfechos
 * Estilo "Visual Novel / Choose Your Own Adventure"
 * Cada decisão ramifica a história para caminhos diferentes
 */
document.addEventListener('DOMContentLoaded', function() {
    // Delay to ensure novelas-extra.js is loaded
    setTimeout(initNovela, 100);
});

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
    specialty: 'Cardiologia / Emergência',
    nodes: {
        'start': {
            type: 'narrative',
            text: '🌙 Sexta-feira, 23h40. Você acabou de assumir o plantão da emergência.\n\nUm taxista de 55 anos entra pela porta apoiado na esposa. Está pálido, suando frio, com a mão no peito.\n\n"Doutor, tá doendo muito aqui... já faz uns 40 minutos... parece que tem um elefante sentado no meu peito."\n\nTabagista 30 anos, hipertenso em uso irregular de Losartana. Nunca fez check-up.',
            vitals: { fc: 105, pas: 95, pad: 58, spo2: 93, fr: 22 },
            next: 'first_action'
        },
        'first_action': {
            type: 'choice',
            text: 'O paciente está diante de você, pálido e sudoreico. Qual abordagem inicial?',
            options: [
                { text: 'Analgesia imediata com Tramadol 100mg IV + Metoclopramida 10mg IV, depois avaliar com calma', next: 'nitrate_first', points: -1 },
                { text: 'Monitorização cardíaca + oximetria + acesso venoso periférico + ECG de 12 derivações em até 10 min', next: 'correct_start', points: 3 },
                { text: 'Solicitar hemograma, troponina, D-dímero, PCR, função renal e Rx de tórax PA — avaliar com resultados', next: 'labs_first', points: -1 },
                { text: 'Anamnese estruturada completa com revisão de sistemas + exame físico segmentar antes de qualquer conduta', next: 'anamnesis_delay', points: 0 }
            ]
        },
        'correct_start': {
            type: 'narrative',
            text: '✅ Leito de emergência. Monitor, O2, acesso venoso.\n\nECG de 12 derivações em 8 minutos: Supradesnivelamento de ST em V1-V4 (4 mm). Infra recíproco em parede inferior.\n\nÉ um IAMCSST de parede anterior. A artéria Descendente Anterior está ocluída.',
            vitals: { fc: 108, pas: 92, pad: 55, spo2: 94, fr: 20 },
            next: 'reperfusion_choice'
        },
        'reperfusion_choice': {
            type: 'choice',
            text: 'IAMCSST de parede anterior confirmado no ECG. Início dos sintomas há 50 minutos. Seu hospital dispõe de sala de hemodinâmica com equipe de sobreaviso. Conduta de reperfusão:',
            options: [
                { text: 'AAS 300mg + Clopidogrel 300mg + Enoxaparina SC + manter em observação na UCO com troponina seriada a cada 3h', next: 'conservative_path', points: -2 },
                { text: 'AAS 300mg + Ticagrelor 180mg + Heparina não-fracionada IV + ativar equipe de hemodinâmica para angioplastia primária', next: 'cath_primary', points: 3 },
                { text: 'AAS 300mg + Clopidogrel 600mg + Tenecteplase IV ajustada ao peso + encaminhar para coronariografia em 3-24h', next: 'thrombolysis_path', points: 1 },
                { text: 'AAS 300mg + Ticagrelor 180mg + Enoxaparina + Nitroglicerina IV contínua + betabloqueador VO → cateterismo eletivo em 48-72h', next: 'conservative_path', points: -1 }
            ]
        },
        'cath_primary': {
            type: 'choice',
            text: 'Hemodinâmica ativada. Paciente em preparo. PA 92/55 mmHg, FC 108 bpm. Enquanto aguarda transferência para a sala, qual prescrição adicional é adequada?',
            options: [
                { text: 'Metoprolol 5mg IV lento a cada 5 min até FC < 80 — reduzir consumo miocárdico de O2', next: 'betablocker_error', points: -2 },
                { text: 'Atorvastatina 80mg VO + manter Heparina não-fracionada conforme TTPa — sem betabloqueador por enquanto (PAS < 100)', next: 'cath_done_good', points: 3 },
                { text: 'Nitroglicerina 5mcg/min IV com titulação a cada 5 min para controle da dor — alvo PAS > 90', next: 'nitrate_hypotension', points: -1 },
                { text: 'Dobutamina 5mcg/kg/min IV para suporte inotrópico preventivo — PA limítrofe pode evoluir para choque', next: 'cath_done_delayed', points: 0 }
            ]
        },
        'cath_done_good': {
            type: 'narrative',
            text: '🏃 Cateterismo realizado. Porta-balão: 72 minutos.\n\nAchado: Oclusão trombótica aguda de DA proximal (100%). Stent farmacológico implantado. Fluxo TIMI 3 restaurado.\n\nECG pós-procedimento: resolução do supra ST > 70%.',
            vitals: { fc: 78, pas: 115, pad: 72, spo2: 97, fr: 15 },
            next: 'post_cath_management'
        },
        'post_cath_management': {
            type: 'choice',
            text: 'Angioplastia primária bem-sucedida. Stent farmacológico em DA. Paciente estável na UCO. Prescrição de prevenção secundária:',
            options: [
                { text: 'AAS 100mg/dia + Ticagrelor 90mg 12/12h por 12 meses + Metoprolol 25mg 12/12h + Ramipril 2,5mg/dia + Atorvastatina 80mg/dia', next: 'ending_excellent', points: 3 },
                { text: 'AAS 100mg/dia + Clopidogrel 75mg/dia por 3 meses + Anlodipino 5mg/dia + Sinvastatina 20mg/dia', next: 'ending_good_suboptimal', points: 0 },
                { text: 'AAS 100mg/dia + Ticagrelor 90mg 12/12h por 12 meses + Ramipril 2,5mg/dia + Rosuvastatina 40mg/dia (sem betabloqueador — FC normal agora)', next: 'ending_good_suboptimal', points: 1 },
                { text: 'AAS 100mg/dia + Ticagrelor 90mg 12/12h por 12 meses + Rivaroxabana 2,5mg 12/12h + Metoprolol 50mg + Atorvastatina 80mg', next: 'ending_bleeding', points: -1 }
            ]
        },
        'ending_excellent': {
            type: 'ending',
            title: '⭐ DESFECHO ÓTIMO — Conduta de Guidelines',
            text: 'O taxista recebe alta em 4 dias com:\n• Dupla antiagregação (AAS + Ticagrelor) por 12 meses\n• Metoprolol 50mg\n• Ramipril 5mg\n• Atorvastatina 80mg\n\nEcocardiograma: FE 52% (preservada graças à reperfusão precoce). Reabilitação cardíaca iniciada.\n\nRetorna ao trabalho em 45 dias. Parou de fumar.',
            grade: 'excellent',
            lesson: 'LIÇÃO: No IAMCSST, a cadeia ideal é: ECG em < 10 min → dupla antiagregação + anticoagulação → angioplastia primária < 90 min → prevenção secundária completa (AAS, P2Y12, beta-bloqueador, IECA, estatina alta potência). Cada elo da cadeia importa.'
        },
        'ending_good_suboptimal': {
            type: 'ending',
            title: '✅ BOM DESFECHO — Prevenção Secundária Subótima',
            text: 'Reperfusão foi boa, mas a prevenção secundária ficou aquém do ideal.\n\n6 meses depois: LDL ainda 145 mg/dL. Sem betabloqueador. Ecocardiograma: FE 48% (leve remodelamento).\n\nPaciente volta com angina aos esforços médios — necessita novo cateterismo que mostra reestenose intrastent.\n\nNova intervenção + otimização medicamentosa tardia.',
            grade: 'good',
            lesson: 'LIÇÃO: A angioplastia salva na aguda, mas a prevenção secundária define o longo prazo. Estatina de alta potência (meta LDL < 55), IECA (remodelamento) e beta-bloqueador (anti-arrítmico) reduzem mortalidade em 30% em 5 anos.'
        },
        'ending_bleeding': {
            type: 'ending',
            title: '⚠️ DESFECHO COM COMPLICAÇÃO — Sangramento',
            text: 'Tripla terapia (AAS + Ticagrelor + Warfarina) sem indicação de anticoagulação plena causou sangramento GI alto no 3º dia.\n\nHematêmese + queda de Hb para 6,5. Endoscopia: úlcera com sangramento ativo.\n\nTransfusão + suspensão do Ticagrelor → trombose de stent 48h depois → reinfarto.\n\nSobrevive com FE 30%. IC classe III.',
            grade: 'regular',
            lesson: 'LIÇÃO: Anticoagulação (warfarina/DOACs) só é indicada no IAM se houver motivo específico (FA, trombo em VE, TVP). Sem indicação = risco de sangramento sem benefício. Tripla terapia tem taxa de sangramento major de 15-20%.'
        },
        'betablocker_error': {
            type: 'narrative',
            text: '⚠️ Metoprolol IV com PA sistólica de 92 mmHg = hipotensão grave.\n\nPA caiu para 70/40. FC paradoxalmente subiu (reflexo). Paciente quase sincopa.\n\nVocê suspende e dá volume. Perdeu 12 minutos estabilizando iatrogenia.\n\nPA volta a 95/58 após 500mL de SF.',
            vitals: { fc: 115, pas: 95, pad: 58, spo2: 92, fr: 22 },
            next: 'cath_done_delayed'
        },
        'cath_done_delayed': {
            type: 'narrative',
            text: 'Cateterismo realizado com 15 min de atraso. Porta-balão: 95 minutos (acima da meta).\n\nStent em DA com sucesso, mas mais miocárdio perdido pelo atraso.',
            vitals: { fc: 82, pas: 110, pad: 68, spo2: 96, fr: 16 },
            next: 'post_cath_management'
        },
        'nitrate_hypotension': {
            type: 'narrative',
            text: '⚠️ Nitrato sublingual com PA 92/55 → PA caiu para 75/42. Pré-carga reduzida em paciente já hipotenso.\n\nInfarto de VD? Possível. Nitrato é contraindicado se suspeita de IAM de VD ou PAS < 90.\n\nVolume 500mL SF rápido. PA volta para 90/55.',
            vitals: { fc: 112, pas: 90, pad: 55, spo2: 92, fr: 22 },
            next: 'cath_done_delayed'
        },
        'thrombolysis_path': {
            type: 'narrative',
            text: '💉 Tenecteplase administrada. Porta-agulha: 28 min.\n\nMas seu hospital TEM hemodinâmica disponível. Guidelines recomendam angioplastia primária quando disponível em < 120 min — trombólise é alternativa quando NÃO há hemodinâmica.\n\n45 min depois: supra ST reduzido 50%. Critérios de reperfusão parciais. Pode ser reperfusão incompleta.',
            vitals: { fc: 90, pas: 105, pad: 65, spo2: 95, fr: 18 },
            next: 'post_lysis_decision'
        },
        'post_lysis_decision': {
            type: 'choice',
            text: 'Trombólise administrada há 90 minutos. Supra ST reduziu 50% (resolução parcial). Dor melhorou de 9/10 para 4/10. Conduta coronariográfica:',
            options: [
                { text: 'Coronariografia de rotina em 2-24h (estratégia fármaco-invasiva) — independente de sintomas residuais', next: 'ending_good_farmacoinvasiva', points: 3 },
                { text: 'Coronariografia apenas se houver falha de reperfusão (dor mantida + supra não resolveu > 50%)', next: 'ending_regular_rescue', points: 0 },
                { text: 'Alta hospitalar em 48h se troponina em queda + ECG estável — coronariografia ambulatorial em 30 dias', next: 'ending_regular_rescue', points: -1 },
                { text: 'Administrar segunda dose de Tenecteplase (50% da dose) para completar a reperfusão — depois coronariografia', next: 'ending_bleeding_lysis', points: -2 }
            ]
        },
        'ending_good_farmacoinvasiva': {
            type: 'ending',
            title: '✅ BOM DESFECHO — Estratégia Fármaco-Invasiva',
            text: 'Coronariografia em 18h pós-trombólise: lesão residual de 80% em DA. Stent implantado com sucesso.\n\nFE: 46% (disfunção leve — teria sido melhor com angioplastia primária inicial).\n\nAlta em 6 dias com terapia otimizada.',
            grade: 'good',
            lesson: 'LIÇÃO: Se o hospital tem hemodinâmica, angioplastia primária é SEMPRE superior à trombólise. Se trombólise foi feita (por falta de hemo), a coronariografia deve ocorrer em 2-24h (fármaco-invasiva), não apenas de resgate.'
        },
        'ending_regular_rescue': {
            type: 'ending',
            title: '⚠️ DESFECHO REGULAR — Oportunidade Perdida',
            text: 'Sem coronariografia precoce, a lesão residual causou reoclusão em 72h.\n\nDor torácica retorna + re-elevação ST → cateterismo de resgate.\n\nTrombose organizada = procedimento mais complexo. FE final: 35%.\n\nIC moderada. Limitação funcional permanente.',
            grade: 'regular',
            lesson: 'LIÇÃO: Trombólise resolve o coágulo agudo, mas frequentemente deixa placa residual. Coronariografia precoce (2-24h) trata a lesão de base. Esperar reoclusão = mais dano miocárdico irreversível.'
        },
        'ending_bleeding_lysis': {
            type: 'ending',
            title: '💀 COMPLICAÇÃO GRAVE — Hemorragia Intracraniana',
            text: 'Segunda dose de trombolítico é CONTRAINDICADA. Risco de sangramento multiplicado.\n\nPaciente desenvolve cefaleia súbita + rebaixamento → TC: hemorragia intracraniana.\n\nNeurocirurgia de emergência. Sobrevive com hemiparesia sequalar.\n\nUm IAM que virou AVC hemorrágico por iatrogenia.',
            grade: 'death',
            lesson: 'LIÇÃO: NUNCA repetir trombolítico. Se trombólise falha (sem critérios de reperfusão em 60-90 min), a conduta é ANGIOPLASTIA DE RESGATE, não re-lise. Repetir fibrinolítico = risco inaceitável de sangramento cerebral.'
        },
        'troponin_delay': {
            type: 'narrative',
            text: '⏳ Você decidiu esperar troponina seriada (resultado em 1h30).\n\nMas o ECG JÁ MOSTRA supra ST — troponina não muda a conduta no IAMCSST. O diagnóstico é eletrocardiográfico.\n\nEnquanto espera: dor piora, PA cai para 82/48.',
            vitals: { fc: 120, pas: 82, pad: 48, spo2: 90, fr: 24 },
            next: 'delayed_shock'
        },
        'delayed_shock': {
            type: 'choice',
            text: 'Paciente em choque cardiogênico (PA 82/48, FC 120, extremidades frias, livedo, oligúria). ECG mantém supra ST. Lactato 6,8. Conduta:',
            options: [
                { text: 'Noradrenalina 0,1mcg/kg/min IV + cateterismo de emergência + considerar balão intra-aórtico ou Impella', next: 'ending_shock_survived', points: 3 },
                { text: 'Dobutamina 10mcg/kg/min + Nitroglicerina IV para pós-carga + nova troponina em 6h para reavaliar', next: 'ending_shock_poor', points: -1 },
                { text: 'Tenecteplase IV (trombólise de resgate) + Noradrenalina + transferência para centro terciário', next: 'ending_shock_poor', points: 0 },
                { text: 'Cristaloide 30mL/kg em 1h (protocolo de sepse) + Dobutamina + reavaliar PA após volume', next: 'ending_shock_survived', points: 1 }
            ]
        },
        'ending_shock_survived': {
            type: 'ending',
            title: '⚠️ DESFECHO REGULAR — Sobreviveu com Sequela Importante',
            text: 'Cateterismo de emergência em choque. BIA (balão intra-aórtico) implantado. Noradrenalina.\n\nStent em DA — mas 2h30 de isquemia causou necrose extensa.\n\nFE: 25%. Necessita CDI (desfibrilador implantável). IC classe III.\n\nAposentado por invalidez. O atraso custou metade do coração.',
            grade: 'regular',
            lesson: 'LIÇÃO: No IAMCSST, troponina NÃO é necessária para decidir reperfusão — o ECG basta. Esperar lab em supra ST é erro de conceito que custa miocárdio. Troponina serve para IAMSSST (sem supra), não para IAMCSST.'
        },
        'ending_shock_poor': {
            type: 'ending',
            title: '💀 DESFECHO RUIM — Falência Cardíaca Terminal',
            text: 'Sem reperfusão mecânica imediata, o choque cardiogênico é refratário.\n\nDobutamina + nitro em paciente hipotenso: piora. Trombólise no choque: eficácia < 50%.\n\nEvolui para falência multiorgânica em 48h. Não é candidato a transplante de emergência (idade + comorbidades).\n\nÓbito na UTI. O que um cateterismo em < 90 min teria resolvido.',
            grade: 'death',
            lesson: 'LIÇÃO: Choque cardiogênico no IAM = cateterismo de EMERGÊNCIA (não trombólise, não inotrópicos isolados). BIA ou Impella como ponte. Mortalidade sem reperfusão mecânica: > 80%. Com angioplastia + suporte: ~50%.'
        },
        'conservative_path': {
            type: 'narrative',
            text: '⏳ Estratégia conservadora em IAMCSST: AAS + anticoagulação subcutânea + betabloqueador + nitro.\n\nMas IAMCSST não é IAMSSST! Não existe "estratégia conservadora" no supra ST — é reperfusão obrigatória.\n\n3h depois: dor persiste, ECG com supra mantido. Paciente instabiliza.',
            vitals: { fc: 118, pas: 85, pad: 50, spo2: 89, fr: 25 },
            next: 'delayed_shock'
        },
        'anamnesis_delay': {
            type: 'narrative',
            text: '📋 Você faz uma anamnese detalhada de 15 minutos. Exame físico completo. Tudo registrado no prontuário.\n\nEnquanto examina, a enfermeira nota que o paciente está mais pálido. Pede para verificar a PA: 85/50.\n\nSó agora você pede ECG. Resultado: supra ST V1-V4. Delta T agora: 55 min.',
            vitals: { fc: 112, pas: 85, pad: 50, spo2: 91, fr: 22 },
            next: 'reperfusion_choice'
        },
        'labs_first': {
            type: 'narrative',
            text: '🩸 D-dímero, troponina, hemograma e bioquímica solicitados. Rx de tórax pedido.\n\nResultados levam 1h20. Troponina: 25x o normal. Rx: normal.\n\nSó então você pede ECG: supra ST V1-V4. Delta T: 2h00.\n\nTempo precioso perdido. A necrose já progrediu significativamente.',
            vitals: { fc: 115, pas: 88, pad: 52, spo2: 91, fr: 23 },
            next: 'delayed_shock'
        },
        'nitrate_first': {
            type: 'narrative',
            text: '💊 Nitrato SL dado. PA cai de 95/58 para 78/45 — hipotensão! (Possível envolvimento de VD, ou pré-carga já muito baixa).\n\nMorfina 3mg IV. Dor melhora parcialmente, mas PA permanece baixa.\n\nVocê percebe que precisa de diagnóstico: pede ECG. Supra ST V1-V4. Delta T: 50 min.\n\nPA recupera com 300mL SF.',
            vitals: { fc: 110, pas: 92, pad: 55, spo2: 93, fr: 20 },
            next: 'reperfusion_choice'
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
    specialty: 'Obstetrícia / Emergência',
    nodes: {
        'start': {
            type: 'narrative',
            text: '🌙 Terça, 3h da madrugada. Você é o plantonista da maternidade.\n\nA enfermeira corre até você: "Doutor! A gestante do leito 4 está convulsionando!"\n\nVocê corre ao leito. Maria, 28 anos, 34 semanas de gestação, primigesta. Está em movimentos tônico-clônicos generalizados há ~1 minuto.',
            vitals: { fc: 130, pas: 190, pad: 120, spo2: 88, fr: 8 },
            next: 'seizure_action'
        },
        'seizure_action': {
            type: 'choice',
            text: 'Gestante de 34 semanas em crise convulsiva tônico-clônica generalizada. PA pré-ictal registrada: 190/120 mmHg. Conduta anticonvulsivante imediata:',
            options: [
                { text: 'Diazepam 10mg IV lento + Fenitoína 20mg/kg IV em 30 min (protocolo neurológico padrão para status epilepticus)', next: 'diazepam_path', points: 1 },
                { text: 'Sulfato de Magnésio 4g IV em 20 min (dose de ataque) + manutenção 1-2g/h em bomba de infusão contínua', next: 'mgso4_given', points: 3 },
                { text: 'Midazolam 15mg IM (face lateral da coxa) + Labetalol 20mg IV para controle pressórico simultâneo', next: 'diazepam_path', points: 0 },
                { text: 'Tiopental 3-5mg/kg IV para indução anestésica + intubação orotraqueal + cesárea de emergência imediata', next: 'immediate_csection', points: -1 }
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
            text: 'Convulsão controlada com MgSO4. PA atual: 175/110 mmHg. FC fetal: 120 bpm (recuperada). Exames: proteinúria 4,2g/24h, plaquetas 98.000, TGO 180, LDH 850. Próxima conduta:',
            options: [
                { text: 'Hidralazina 5mg IV a cada 20 min (alvo PAS 140-150) + manter MgSO4 + programar resolução da gestação (parto) nas próximas horas', next: 'correct_management', points: 3 },
                { text: 'Nifedipino 10mg VO a cada 30 min + manter MgSO4 + corticoide para maturação pulmonar fetal + postergar parto por 48h', next: 'correct_management', points: 1 },
                { text: 'Nitroprussiato de sódio IV 0,5mcg/kg/min + suspender MgSO4 (risco de hipotensão combinada) + cesárea em 2h', next: 'ending_poor_eclampsia', points: -1 },
                { text: 'Sulfato de Magnésio aumentar para 3g/h + Metildopa 500mg VO + monitoramento fetal contínuo + aguardar 72h para parto', next: 'mgso4_overdose', points: -2 }
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
            text: 'Eclâmpsia + HELLP parcial (plaquetas 98.000, TGO 180) + IG 34 semanas. PA controlada com Hidralazina. Decisão obstétrica:',
            options: [
                { text: 'Cesárea sob anestesia geral (plaquetas < 100.000 = contraindicação relativa a bloqueio neuroaxial) — resolução em até 2h', next: 'ending_best_eclampsia', points: 3 },
                { text: 'Indução de parto com Misoprostol 25mcg vaginal a cada 6h + ocitocina se necessário — via vaginal é menos invasiva', next: 'ending_ok_eclampsia', points: 1 },
                { text: 'Betametasona 12mg IM 2 doses (24/24h) para maturação pulmonar + cesárea após completar ciclo (48h)', next: 'ending_ok_eclampsia', points: 0 },
                { text: 'Transfusão de plaquetas para elevar > 100.000 + raquianestesia + cesárea programada em 12h', next: 'ending_poor_eclampsia', points: -1 }
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
            text: 'Convulsão recorrente (segunda crise em 5 minutos) apesar de benzodiazepínico. PA 185/115. FC fetal com desacelerações tardias. Conduta:',
            options: [
                { text: 'Sulfato de Magnésio 4g IV em 20 min + manutenção 1g/h — deveria ter sido a primeira escolha em eclâmpsia', next: 'late_mgso4', points: 3 },
                { text: 'Fenitoína 20mg/kg IV em 30 min (dose de ataque) + diazepam 10mg IV adicional se nova crise', next: 'ending_poor_eclampsia', points: -1 },
                { text: 'Propofol 2mg/kg IV para sedação profunda + intubação orotraqueal + cesárea de emergência imediata', next: 'immediate_csection', points: 0 },
                { text: 'Valproato de sódio 40mg/kg IV lento + Labetalol 20mg IV — pode ser epilepsia com gatilho gestacional', next: 'ending_poor_eclampsia', points: -2 }
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
            text: 'Status eclâmptico (3ª crise). PA 200/125. FC fetal 60 bpm persistente (bradicardia grave = sofrimento fetal agudo). SpO2 materna 82%. Conduta:',
            options: [
                { text: 'Sulfato de Magnésio 6g IV em 10 min (dose resgate) + O2 15L máscara + decúbito lateral esquerdo + cesárea após estabilização (15-20 min)', next: 'ending_ok_eclampsia', points: 3 },
                { text: 'Tiopental + Succinilcolina + IOT + Cesárea sob anestesia geral imediata (prioridade é tirar o bebê AGORA)', next: 'ending_ok_eclampsia', points: 1 },
                { text: 'Diazepam 20mg IV + Hidralazina 10mg IV + solicitar TC de crânio para excluir hemorragia antes de decidir via de parto', next: 'ending_death_eclampsia', points: -2 },
                { text: 'Fenobarbital 20mg/kg IV + Dexametasona 10mg IV + monitoramento contínuo — aguardar resolução espontânea das crises', next: 'ending_death_eclampsia', points: -2 }
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
    specialty: 'Hepatologia / Emergência',
    nodes: {
        'start': {
            type: 'narrative',
            text: '🏥 Segunda-feira, 15h. Pronto-socorro.\n\nCarla, 42 anos, professora de história. O marido a trouxe porque ela está "amarela e estranha" há 2 dias.\n\nEle conta: "Ela começou com dor na barriga, depois ficou amarela e hoje não está fazendo sentido no que fala."\n\nAo exame: icterícia ++++, confusa (Glasgow 13), abdome tenso em HCD, fígado não palpável.',
            vitals: { fc: 95, pas: 108, pad: 68, spo2: 97, fr: 18 },
            next: 'initial_workup'
        },
        'initial_workup': {
            type: 'choice',
            text: 'Mulher de 42 anos com icterícia aguda (2 dias), confusão mental (Glasgow 13), dor em hipocôndrio direito. Sem doença hepática prévia conhecida. Abordagem diagnóstica inicial:',
            options: [
                { text: 'Hemograma + reticulócitos + LDH + haptoglobina + bilirrubinas fracionadas — investigar hemólise como causa da icterícia', next: 'hemolysis_path', points: 0 },
                { text: 'USG de abdome superior com Doppler portal + bilirrubinas + FA/GGT — investigar obstrução biliar (coledocolitíase vs. tumor)', next: 'biliary_path', points: 1 },
                { text: 'INR + TGO/TGP + bilirrubinas + albumina + amônia sérica — investigar insuficiência hepática aguda (encefalopatia + icterícia)', next: 'liver_failure_path', points: 3 },
                { text: 'TC de abdome com contraste + CEA + CA 19-9 + alfafetoproteína — investigar neoplasia hepatobiliar ou metástase hepática', next: 'wrong_ct', points: -1 }
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
            text: 'Insuficiência hepática aguda confirmada (INR 4,8 + transaminases > 3.000 + encefalopatia hepática). Sem doença hepática prévia. Investigação etiológica prioritária:',
            options: [
                { text: 'Sorologias virais completas (anti-HAV IgM, HBsAg, anti-HBc IgM, anti-HCV, PCR HCV, anti-HEV IgM) + autoanticorpos (FAN, anti-músculo liso)', next: 'viral_negative', points: 2 },
                { text: 'Anamnese farmacológica detalhada (medicamentos, fitoterápicos, suplementos) + dosagem sérica de paracetamol (acetaminofeno) + nível de APAP', next: 'paracetamol_found', points: 3 },
                { text: 'Biópsia hepática transjugular (INR impede percutânea) + ceruloplasmina + cobre sérico e urinário (excluir Wilson)', next: 'viral_negative', points: 1 },
                { text: 'AngioTC de abdome com fase arterial e portal + Doppler de veias hepáticas (excluir Budd-Chiari) + ferritina sérica', next: 'wrong_ct', points: 0 }
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
            text: 'Causa confirmada: hepatotoxicidade por paracetamol (nível sérico tóxico no nomograma de Rumack-Matthew). INR 4,8, TGO 3.500, encefalopatia grau II. Tratamento:',
            options: [
                { text: 'N-Acetilcisteína (NAC) IV protocolo de 21h (150mg/kg em 1h → 50mg/kg em 4h → 100mg/kg em 16h) + contato com centro de transplante hepático', next: 'ending_best_liver', points: 3 },
                { text: 'Plasmaférese terapêutica (troca de 1,5 volemia) para remoção de toxinas + vitamina K 10mg IV + plasma fresco congelado para corrigir INR', next: 'ending_ok_liver', points: 1 },
                { text: 'Carvão ativado 1g/kg VO por SNG + Lactulose 30mL 8/8h para encefalopatia + dieta hipoproteica + monitoramento clínico em UTI', next: 'ending_death_liver', points: -1 },
                { text: 'Transplante hepático de emergência (listar MELD exceção) + suporte clínico intensivo enquanto aguarda — NAC tem pouca evidência após 24h', next: 'ending_ok_liver', points: 0 }
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
    specialty: 'Neurologia / Emergência',
    nodes: {
        'start': {
            type: 'narrative',
            text: '🏥 Quarta-feira, 7h. Emergência.\n\nRafael, 28 anos, personal trainer. Chega de cadeira de rodas empurrado pela namorada.\n\n"Doutor, ontem minhas pernas ficaram fracas. Hoje de manhã não consigo mais levantar. E os braços estão começando a ficar estranhos também..."\n\nEle menciona que teve uma diarreia forte há 2 semanas que durou 3 dias.',
            vitals: { fc: 72, pas: 125, pad: 78, spo2: 98, fr: 16 },
            next: 'neuro_exam'
        },
        'neuro_exam': {
            type: 'choice',
            text: 'Homem de 28 anos com fraqueza ascendente progressiva (MMII → MMSS em 24h) + gastroenterite há 2 semanas. Exame neurológico: o que priorizar?',
            options: [
                { text: 'Reflexos profundos (patelar, aquileu, bicipital) + graduação de força por segmentos + sensibilidade em dermátomos', next: 'exam_results', points: 3 },
                { text: 'TC de crânio sem contraste + TC de coluna total com reconstrução sagital (excluir compressão medular ou lesão central)', next: 'ct_waste', points: -1 },
                { text: 'Eletroneuromiografia de urgência (ENMG) + punção lombar com dosagem de proteínas no LCR', next: 'exam_results', points: 1 },
                { text: 'CK total + aldolase + TSH + eletrólitos (K+, Ca++, Mg++) — excluir miopatia inflamatória ou causa metabólica', next: 'wrong_hypokalemia', points: 0 }
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
            text: 'Achados: fraqueza flácida simétrica ascendente + arreflexia global + hipoestesia em bota e luva + antecedente de gastroenterite (possível Campylobacter) há 2 semanas. Diagnóstico mais provável:',
            options: [
                { text: 'Síndrome de Guillain-Barré (polirradiculoneuropatia desmielinizante inflamatória aguda — AIDP)', next: 'gbs_correct', points: 3 },
                { text: 'Mielite transversa aguda (inflamação medular pós-infecciosa — nível sensitivo + disfunção esfincteriana)', next: 'wrong_hernia', points: 0 },
                { text: 'Polineuropatia do doente crítico / neuropatia nutricional (deficiência de B1 pós-diarreia prolongada)', next: 'wrong_hypokalemia', points: -1 },
                { text: 'Miastenia gravis de início agudo (anticorpos anti-receptor de acetilcolina — fraqueza flutuante)', next: 'wrong_hypokalemia', points: -1 }
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
            text: 'Guillain-Barré confirmada clinicamente. Paciente internado. Qual parâmetro respiratório monitorar e qual o limiar para intubação profilática?',
            options: [
                { text: 'Capacidade Vital Forçada (CVF) seriada a cada 4-6h — intubação profilática se CVF < 20 mL/kg ou queda > 30% em 24h', next: 'correct_monitoring', points: 3 },
                { text: 'SpO2 contínua por oximetria — intubação apenas se SpO2 < 88% persistente apesar de O2 suplementar por cateter nasal', next: 'late_intubation', points: -1 },
                { text: 'Gasometria arterial seriada a cada 12h — intubação se PaCO2 > 50 mmHg ou PaO2 < 60 mmHg em ar ambiente', next: 'late_intubation', points: 0 },
                { text: 'Peak-flow (PFE) matinal e noturno — intubação se variabilidade > 20% ou PFE < 200 L/min (critério de asma grave)', next: 'wrong_no_resp', points: -2 }
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
            text: 'Guillain-Barré com progressão respiratória (CVF 18 mL/kg). Paciente na UTI, IOT preparada. Tratamento imunomodulador específico:',
            options: [
                { text: 'Imunoglobulina humana IV (IVIg) 0,4g/kg/dia por 5 dias consecutivos — inicia hoje', next: 'ending_best_gbs', points: 3 },
                { text: 'Metilprednisolona 1g IV/dia por 5 dias (pulsoterapia) — protocolo de doença desmielinizante autoimune', next: 'ending_regular_gbs', points: -1 },
                { text: 'Plasmaférese terapêutica (5 sessões em 10 dias, troca de 1 volemia/sessão) — remoção de autoanticorpos circulantes', next: 'ending_best_gbs', points: 2 },
                { text: 'Ciclofosfamida 1g/m² IV dose única + Prednisona 1mg/kg/dia VO — imunossupressão combinada para doença autoimune grave', next: 'ending_poor_gbs', points: -2 }
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
    // Merge cases from novelas-extra.js if loaded
    if (typeof novelaCasesExtra !== 'undefined') {
        novelaCases.push(...novelaCasesExtra);
    }
    renderNovelaList();
}

function renderNovelaList() {
    const container = document.getElementById('novela-content');
    if (!container) return;

    const endings = JSON.parse(localStorage.getItem('novela_endings') || '{}');
    const totalCases = novelaCases.length;
    const completedCases = Object.keys(endings).length;
    const totalEndings = novelaCases.reduce((sum, c) => sum + (c.endings || 3), 0);
    const unlockedEndings = Object.values(endings).reduce((sum, arr) => sum + arr.length, 0);

    // Novela do dia (baseada no dia do ano)
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const novelaDoDia = novelaCases[dayOfYear % novelaCases.length];

    // Categorias únicas
    const categories = ['Todas', ...new Set(novelaCases.map(c => c.specialty || 'Geral').map(s => s.split('/')[0].trim()))];

    container.innerHTML = `
        <div class="nv-header">
            <h2>🎭 Novelas Clínicas</h2>
            <p>Cada decisão muda o destino do paciente. Múltiplos caminhos e desfechos. Suas escolhas têm consequências reais.</p>
        </div>
        
        <!-- Progresso -->
        <div class="nv-progress-box">
            <div class="nv-progress-stats">
                <div class="nv-stat">
                    <span class="nv-stat-number">${completedCases}</span>
                    <span class="nv-stat-label">/ ${totalCases} casos jogados</span>
                </div>
                <div class="nv-stat">
                    <span class="nv-stat-number">${unlockedEndings}</span>
                    <span class="nv-stat-label">/ ${totalEndings} finais desbloqueados</span>
                </div>
            </div>
            <div class="nv-progress-bar">
                <div class="nv-progress-fill" style="width: ${Math.round((unlockedEndings / totalEndings) * 100)}%"></div>
            </div>
        </div>

        <!-- Novela do Dia -->
        <div class="nv-daily">
            <div class="nv-daily-badge">⭐ NOVELA DO DIA</div>
            <div class="nv-daily-card">
                <span class="nv-daily-icon">${novelaDoDia.icon}</span>
                <div class="nv-daily-info">
                    <h3>${novelaDoDia.title}</h3>
                    <p>${novelaDoDia.description}</p>
                </div>
                <button class="nv-start-btn" data-id="${novelaDoDia.id}">Jogar →</button>
            </div>
        </div>

        <!-- Filtros -->
        <div class="nv-filters" id="nv-filters">
            ${categories.map(cat => `<button class="nv-filter-btn ${cat === 'Todas' ? 'active' : ''}" data-cat="${cat}">${cat}</button>`).join('')}
        </div>

        <!-- Lista -->
        <div class="nv-list" id="nv-list-container"></div>
    `;

    renderNovelaCards('Todas', endings);

    // Filter listeners
    container.querySelectorAll('.nv-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('.nv-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderNovelaCards(btn.dataset.cat, endings);
        });
    });

    // Daily card start
    container.querySelector('.nv-daily-card .nv-start-btn').addEventListener('click', () => startNovela(novelaDoDia.id));
}

function renderNovelaCards(category, endings) {
    const listEl = document.getElementById('nv-list-container');
    if (!listEl) return;

    let filtered = novelaCases;
    if (category !== 'Todas') {
        filtered = novelaCases.filter(c => (c.specialty || 'Geral').includes(category));
    }

    listEl.innerHTML = filtered.map(c => {
        const caseEndings = endings[c.id] || [];
        const completed = caseEndings.length > 0;
        const bestGrade = caseEndings.includes('excellent') ? '⭐' : caseEndings.includes('good') ? '✅' : caseEndings.includes('regular') ? '⚠️' : caseEndings.includes('death') ? '💀' : '';
        return `
            <div class="nv-card ${completed ? 'nv-card-completed' : ''}">
                <div class="nv-card-icon">${c.icon}</div>
                <div class="nv-card-content">
                    <h3>${c.title} ${bestGrade}</h3>
                    <p>${c.description}</p>
                    <div class="nv-card-meta">
                        <span class="nv-endings-badge">🎬 ${c.endings} finais</span>
                        ${completed ? `<span class="nv-unlocked-badge">🔓 ${caseEndings.length} desbloqueado${caseEndings.length > 1 ? 's' : ''}</span>` : ''}
                    </div>
                </div>
                <button class="nv-start-btn" data-id="${c.id}">${completed ? 'Rejogar →' : 'Começar →'}</button>
            </div>
        `;
    }).join('');

    listEl.querySelectorAll('.nv-start-btn').forEach(btn => {
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

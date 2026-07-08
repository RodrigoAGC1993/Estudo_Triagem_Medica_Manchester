/**
 * Guia de Sintomas — Diagnóstico Diferencial
 * 
 * Estilo inspirado em: MSD Manuals — Sintomas
 * https://www.msdmanuals.com/pt/profissional/symptoms
 * 
 * Fontes:
 * - Harrison — Princípios de Medicina Interna, 22ª ed.
 * - Manuais MSD para Profissionais de Saúde
 * - Ministério da Saúde — Saúde de A a Z
 */

document.addEventListener('DOMContentLoaded', function() {
    initSintomasGuide();
});

// ============================================================
// BANCO DE DADOS DE SINTOMAS
// ============================================================
const sintomasDatabase = [
    // === GERAL ===
    {
        system: 'Geral',
        icon: '🌡️',
        gender: 'all',
        symptom: 'Febre',
        description: 'Temperatura corporal ≥ 37,8°C (oral) ou ≥ 38°C (retal)',
        causes: [
            { name: 'Infecções bacterianas', details: 'Pneumonia, ITU, meningite, endocardite, abscessos' },
            { name: 'Infecções virais', details: 'IVAS, dengue, COVID-19, mononucleose, hepatites' },
            { name: 'Doenças autoimunes', details: 'LES, artrite reumatoide, vasculites, Still do adulto' },
            { name: 'Neoplasias', details: 'Linfomas (febre de Pel-Ebstein), leucemias, carcinoma renal' },
            { name: 'Medicamentos', details: 'Antibióticos, anticonvulsivantes, febre por drogas' },
            { name: 'TEP/TVP', details: 'Febre baixa associada a tromboembolismo venoso' }
        ],
        redFlags: ['Rigidez de nuca', 'Petéquias/púrpura', 'Hipotensão', 'Confusão mental', 'Imunossupressão'],
        approach: 'Febre aguda (<7 dias): provável infecção. FOD (>3 semanas): investigar neoplasias, doenças autoimunes, infecções ocultas. qSOFA para rastreio de sepse.',
        reference: 'Harrison, Cap. Febre e Febre de Origem Desconhecida'
    },
    {
        system: 'Geral',
        icon: '🌡️',
        gender: 'all',
        symptom: 'Fadiga',
        description: 'Cansaço persistente desproporcional ao esforço, sem melhora com repouso',
        causes: [
            { name: 'Anemia', details: 'Ferropriva, megaloblástica, doença crônica' },
            { name: 'Hipotireoidismo', details: 'TSH elevado, T4L baixo, ganho de peso' },
            { name: 'Depressão', details: 'Fadiga + anedonia + alteração de sono/apetite' },
            { name: 'Diabetes mellitus', details: 'Fadiga + poliúria + polidipsia' },
            { name: 'Insuficiência cardíaca', details: 'Fadiga + dispneia + edema' },
            { name: 'Insuficiência adrenal', details: 'Fadiga + hipotensão + hiperpigmentação' },
            { name: 'Neoplasias ocultas', details: 'Perda de peso associada, sudorese noturna' },
            { name: 'Síndrome da fadiga crônica', details: 'Diagnóstico de exclusão, > 6 meses' }
        ],
        redFlags: ['Perda de peso inexplicada', 'Linfonodomegalia', 'Sudorese noturna', 'Febre persistente'],
        approach: 'Exames iniciais: hemograma, TSH, glicemia, função renal/hepática, VHS/PCR. Se red flags: investigar neoplasia.',
        reference: 'Harrison, Cap. Fadiga; MSD Manual — Fadiga'
    },
    {
        system: 'Geral',
        icon: '🌡️',
        gender: 'all',
        symptom: 'Perda de Peso Involuntária',
        description: 'Perda ≥ 5% do peso corporal em 6-12 meses sem intenção',
        causes: [
            { name: 'Neoplasias malignas', details: 'Pulmão, pâncreas, estômago, linfomas — causa mais comum em idosos' },
            { name: 'Doenças GI', details: 'Doença celíaca, DII, pancreatite crônica, má absorção' },
            { name: 'Endocrinopatias', details: 'Hipertireoidismo, diabetes descompensado, insuficiência adrenal' },
            { name: 'Infecções crônicas', details: 'TB, HIV, endocardite, abscessos ocultos' },
            { name: 'Psiquiátricas', details: 'Depressão, anorexia nervosa, demência avançada' },
            { name: 'Insuficiência cardíaca', details: 'Caquexia cardíaca em IC avançada' }
        ],
        redFlags: ['Idade > 60 anos', 'Tabagismo', 'Linfonodomegalia', 'Sangue oculto nas fezes', 'Massa palpável'],
        approach: 'Investigação: hemograma, bioquímica, TSH, PCR, LDH, sangue oculto, Rx tórax, TC abdome. Considerar endoscopia se sintomas GI.',
        reference: 'Harrison, Cap. Perda de Peso Involuntária'
    },
    {
        system: 'Geral',
        icon: '🌡️',
        gender: 'all',
        symptom: 'Síncope',
        description: 'Perda transitória de consciência com recuperação espontânea',
        causes: [
            { name: 'Neurocardiogênica (vasovagal)', details: 'Mais comum; desencadeada por dor, ortostatismo prolongado, emoção' },
            { name: 'Cardíaca — Arritmias', details: 'TV, FV, bradiarritmias, QT longo — MAIOR RISCO DE MORTE' },
            { name: 'Cardíaca — Estrutural', details: 'Estenose aórtica, CMHO, TEP maciço, tamponamento' },
            { name: 'Ortostática', details: 'Desidratação, anti-hipertensivos, neuropatia autonômica' },
            { name: 'Neurológica', details: 'Roubo da subclávia, hipersensibilidade do seio carotídeo' }
        ],
        redFlags: ['Síncope durante esforço', 'Sem pródromos', 'Sopro cardíaco', 'Histórico familiar de morte súbita', 'ECG anormal'],
        approach: 'ECG em todos. Se red flags: ecocardiograma, Holter, teste de esforço. Síncope de esforço em jovem = afastar CMHO/arritmia.',
        reference: 'Harrison, Cap. Síncope'
    },

    // === PULMONAR E CARDIOVASCULAR ===
    {
        system: 'Pulmonar e Cardiovascular',
        icon: '❤️‍🔥',
        gender: 'all',
        symptom: 'Dor Torácica',
        description: 'Desconforto ou dor na região do tórax — avaliação inicial deve excluir causas fatais',
        causes: [
            { name: 'Síndrome Coronariana Aguda', details: 'Dor opressiva, irradiação MSE/mandíbula, sudorese, dispneia' },
            { name: 'Dissecção de Aorta', details: 'Dor "rasgante", início abrupto, migratória, PA assimétrica' },
            { name: 'Embolia Pulmonar', details: 'Dor pleurítica + dispneia súbita + taquicardia; TVP prévia' },
            { name: 'Pneumotórax', details: 'Dor súbita + dispneia; MV abolido unilateral' },
            { name: 'Pericardite', details: 'Dor pleurítica que melhora sentado, piora deitado; atrito pericárdico' },
            { name: 'DRGE / Espasmo esofágico', details: 'Dor em queimação, relação com alimentação, melhora com antiácido' },
            { name: 'Musculoesquelética', details: 'Dor reprodutível à palpação, piora com movimento' }
        ],
        redFlags: ['Dor em repouso > 20 min', 'Sudorese + palidez', 'Hipotensão', 'Dispneia súbita', 'PA diferente nos braços', 'História de TVP'],
        approach: 'Harrison: 3 categorias — isquemia miocárdica, cardiopulmonares, não-cardiopulmonares. ECG em 10 min, troponina seriada. Descartar as 5 causas fatais.',
        reference: 'Harrison 22ª ed., Cap. 15 — Dor Torácica'
    },
    {
        system: 'Pulmonar e Cardiovascular',
        icon: '❤️‍🔥',
        gender: 'all',
        symptom: 'Dispneia',
        description: 'Sensação subjetiva de falta de ar ou dificuldade para respirar',
        causes: [
            { name: 'Insuficiência Cardíaca', details: 'Ortopneia, DPN, edema MMII, B3, estertores basais' },
            { name: 'Asma / DPOC', details: 'Sibilos, hiperexpansão torácica, tabagismo' },
            { name: 'Embolia Pulmonar', details: 'Dispneia súbita + dor pleurítica + fatores de risco para TVP' },
            { name: 'Pneumonia', details: 'Febre + tosse produtiva + estertores crepitantes focais' },
            { name: 'Pneumotórax', details: 'Início agudo, timpanismo, MV abolido unilateral' },
            { name: 'Anemia grave', details: 'Dispneia ao esforço + palidez + taquicardia' },
            { name: 'Ansiedade', details: 'Hiperventilação + parestesias + sem hipoxemia — diagnóstico de exclusão' }
        ],
        redFlags: ['SpO2 < 92%', 'Cianose', 'Uso de musculatura acessória', 'Incapacidade de completar frases', 'Estridor', 'Tórax silencioso'],
        approach: 'SpO2, gasometria, Rx tórax, ECG, BNP (se suspeita de IC), D-dímero (se suspeita TEP). Avaliar aguda vs. crônica.',
        reference: 'Harrison, Cap. Dispneia; MSD Manual — Dispneia'
    },
    {
        system: 'Pulmonar e Cardiovascular',
        icon: '❤️‍🔥',
        gender: 'all',
        symptom: 'Palpitações',
        description: 'Percepção anormal dos batimentos cardíacos — rápidos, fortes ou irregulares',
        causes: [
            { name: 'Extrassístoles (benignas)', details: 'Sensação de "falhas", isoladas, pioram com cafeína/stress' },
            { name: 'Fibrilação atrial', details: 'Ritmo irregularmente irregular; risco de AVC' },
            { name: 'Taquicardia supraventricular', details: 'Início/término abruptos, FC 150-250, jovens' },
            { name: 'Taquicardia ventricular', details: 'QRS alargado, pode levar a PCR — EMERGÊNCIA' },
            { name: 'Hipertireoidismo', details: 'Palpitações + perda de peso + tremor + intolerância ao calor' },
            { name: 'Ansiedade', details: 'Contexto de pânico, sem alteração no ECG' },
            { name: 'Anemia', details: 'Taquicardia compensatória por Hb baixa' }
        ],
        redFlags: ['Síncope associada', 'Dor torácica', 'Dispneia', 'FC > 150 bpm', 'Cardiopatia prévia', 'Morte súbita familiar'],
        approach: 'ECG de repouso em todos. Holter 24-72h se sintomas intermitentes. Ecocardiograma se cardiopatia suspeita. TSH, Hb.',
        reference: 'Harrison, Cap. Palpitações; MSD Manual — Palpitações'
    },
    {
        system: 'Pulmonar e Cardiovascular',
        icon: '❤️‍🔥',
        gender: 'all',
        symptom: 'Hemoptise',
        description: 'Expectoração de sangue proveniente das vias aéreas inferiores',
        causes: [
            { name: 'Bronquite / Bronquiectasias', details: 'Causa mais comum; tosse crônica, escarro purulento' },
            { name: 'Neoplasia pulmonar', details: 'Tabagista > 40 anos, perda de peso, hemoptise recorrente' },
            { name: 'Embolia Pulmonar', details: 'Hemoptise + dispneia + dor pleurítica' },
            { name: 'Tuberculose', details: 'Febre vespertina, sudorese noturna, perda de peso, cavitação em Rx' },
            { name: 'Pneumonia necrosante', details: 'Febre alta + escarro hemoptoico + infiltrado' },
            { name: 'Estenose mitral', details: 'Sopro diastólico, FA, congestão pulmonar' }
        ],
        redFlags: ['Volume > 200 mL/24h (hemoptise maciça)', 'Instabilidade hemodinâmica', 'Insuficiência respiratória', 'Tabagista > 40 anos'],
        approach: 'Rx tórax em todos. TC tórax + broncoscopia se hemoptise inexplicada. Hemoptise maciça = emergência com risco de asfixia.',
        reference: 'Harrison, Cap. Hemoptise; MSD Manual — Hemoptise'
    },
    {
        system: 'Pulmonar e Cardiovascular',
        icon: '❤️‍🔥',
        gender: 'all',
        symptom: 'Edema',
        description: 'Acúmulo de líquido no interstício, causando inchaço — pode ser localizado ou generalizado',
        causes: [
            { name: 'Insuficiência cardíaca', details: 'Edema bilateral MMII + dispneia + ortopneia + turgência jugular' },
            { name: 'Insuficiência renal', details: 'Edema facial matinal + oligúria + HAS + proteinúria' },
            { name: 'Síndrome nefrótica', details: 'Proteinúria > 3,5g/dia + hipoalbuminemia + edema generalizado' },
            { name: 'Cirrose hepática', details: 'Ascite + edema MMII + icterícia + eritema palmar' },
            { name: 'TVP', details: 'Edema UNILATERAL + dor em panturrilha + empastamento' },
            { name: 'Insuficiência venosa', details: 'Edema bilateral vespertino + varizes + dermatite ocre' },
            { name: 'Medicamentos', details: 'BCC (anlodipino), AINEs, corticoides' }
        ],
        redFlags: ['Edema unilateral agudo (TVP)', 'Dispneia + edema (IC descompensada)', 'Anasarca', 'Oligúria'],
        approach: 'Bilateral: avaliar albumina, creatinina, BNP, função hepática. Unilateral: Doppler venoso para excluir TVP.',
        reference: 'Harrison, Cap. Edema; MSD Manual — Edema'
    },

    // === NEUROLOGIA ===
    {
        system: 'Neurologia',
        icon: '🧠',
        gender: 'all',
        symptom: 'Cefaleia',
        description: 'Dor de cabeça — diferenciação entre primária (benigna) e secundária (potencialmente grave)',
        causes: [
            { name: 'Enxaqueca', details: 'Unilateral, pulsátil, 4-72h, foto/fonofobia, náusea' },
            { name: 'Cefaleia tensional', details: 'Bilateral, em pressão, leve-moderada, sem náusea' },
            { name: 'Cefaleia em salvas', details: 'Periorbital unilateral, intensa, 15-180 min, lacrimejamento, rinorreia' },
            { name: 'HSA (Hemorragia Subaracnoidea)', details: '"Pior cefaleia da vida", início thunderclap, rigidez nuca' },
            { name: 'Meningite', details: 'Cefaleia + febre + rigidez nuca + fotofobia' },
            { name: 'Hipertensão intracraniana', details: 'Cefaleia matinal + vômitos em jato + papiledema' },
            { name: 'Arterite temporal', details: 'Idade > 50, cefaleia temporal, claudicação mandibular, VHS elevado' }
        ],
        redFlags: ['Início thunderclap (segundos)', 'Pior cefaleia da vida', 'Febre + rigidez nuca', 'Déficit neurológico novo', 'Idade > 50 anos (primeira cefaleia)', 'Papiledema'],
        approach: 'Red flags → TC crânio sem contraste (HSA). Se TC normal + suspeita HSA → punção lombar. Febre + rigidez → tratar meningite empiricamente.',
        reference: 'Harrison, Cap. Cefaleia; MSD Manual — Abordagem ao Paciente com Cefaleia'
    },
    {
        system: 'Neurologia',
        icon: '🧠',
        gender: 'all',
        symptom: 'Tontura e Vertigem',
        description: 'Tontura = sensação inespecífica; Vertigem = ilusão de movimento rotacional',
        causes: [
            { name: 'VPPB (Vertigem Posicional Paroxística Benigna)', details: 'Vertigem breve ao mudar posição, Dix-Hallpike positivo' },
            { name: 'Neurite vestibular', details: 'Vertigem intensa contínua, pós-viral, sem perda auditiva' },
            { name: 'Doença de Ménière', details: 'Vertigem episódica + hipoacusia flutuante + zumbido + plenitude auricular' },
            { name: 'AVC de fossa posterior', details: 'Vertigem + ataxia + disartria + diplopia — EMERGÊNCIA' },
            { name: 'Hipotensão ortostática', details: 'Tontura ao levantar, melhora ao deitar' },
            { name: 'Pré-síncope cardíaca', details: 'Quase-desmaio + palpitações + palidez' }
        ],
        redFlags: ['Déficit neurológico focal', 'Disartria ou disfagia', 'Ataxia de marcha', 'Nistagmo vertical', 'Cefaleia intensa', 'Perda auditiva súbita'],
        approach: 'Diferenciar periférica (VPPB, neurite) vs. central (AVC). HINTS test: se qualquer sinal central → neuroimagem urgente.',
        reference: 'Harrison, Cap. Tontura e Vertigem; MSD Manual — Tontura e Vertigem'
    },
    {
        system: 'Neurologia',
        icon: '🧠',
        gender: 'all',
        symptom: 'Fraqueza Muscular',
        description: 'Redução da força muscular — diferenciar de fadiga, que é sensação de cansaço sem perda de força',
        causes: [
            { name: 'AVC', details: 'Fraqueza aguda unilateral + alteração de fala/face — EMERGÊNCIA' },
            { name: 'Síndrome de Guillain-Barré', details: 'Fraqueza ascendente, simétrica, pós-infecção, arreflexia' },
            { name: 'Miastenia gravis', details: 'Fraqueza flutuante, piora ao fim do dia, ptose, diplopia' },
            { name: 'Compressão medular', details: 'Fraqueza abaixo da lesão + alteração de esfíncteres — URGÊNCIA' },
            { name: 'Miopatias inflamatórias', details: 'Fraqueza proximal + CK elevada (dermatomiosite, polimiosite)' },
            { name: 'Hipocalemia', details: 'Fraqueza generalizada + câimbras + K+ < 3,5' },
            { name: 'Esclerose Lateral Amiotrófica', details: 'Fraqueza + fasciculações + sinais de neurônio motor superior e inferior' }
        ],
        redFlags: ['Início agudo', 'Padrão unilateral (AVC)', 'Progressão ascendente rápida (GBS)', 'Disfunção de esfíncteres', 'Insuficiência respiratória'],
        approach: 'Localizar a lesão: NMS (espasticidade, hiperreflexia) vs. NMI (atrofia, fasciculações, hiporeflexia) vs. junção (flutuação) vs. músculo (proximal, CK).',
        reference: 'Harrison, Cap. Fraqueza e Paralisia; MSD Manual — Fraqueza'
    },

    // === GASTROINTESTINAL ===
    {
        system: 'Gastrointestinal',
        icon: '🫃',
        gender: 'all',
        symptom: 'Dor Abdominal',
        description: 'Dor na região do abdome — classificar em visceral, parietal ou referida',
        causes: [
            { name: 'Apendicite', details: 'Dor periumbilical → FID, náusea, febre baixa, sinal de McBurney' },
            { name: 'Colecistite', details: 'Dor em HCD, pós-prandial (gordura), Murphy positivo, febre' },
            { name: 'Pancreatite', details: 'Dor epigástrica em faixa, irradiação dorsal, vômitos, lipase ↑↑↑' },
            { name: 'Obstrução intestinal', details: 'Dor em cólica + distensão + vômitos + parada de gases' },
            { name: 'Úlcera perfurada', details: 'Dor súbita epigástrica + abdome em tábua + pneumoperitônio' },
            { name: 'Isquemia mesentérica', details: 'Dor desproporcional ao exame + FA + idoso + acidose lática' },
            { name: 'Diverticulite', details: 'Dor em FIE + febre + alteração do hábito intestinal, > 40 anos' },
            { name: 'ITU / Cólica renal', details: 'Dor em flanco + disúria + hematúria' }
        ],
        redFlags: ['Abdome rígido', 'Hipotensão/taquicardia', 'Defesa involuntária', 'Sangue no reto', 'Dor desproporcional ao exame', 'Vômito fecaloide'],
        approach: 'Abdome agudo cirúrgico = descompressão dolorosa + rigidez + instabilidade. Exames: hemograma, lipase, Rx abdome, TC se necessário.',
        reference: 'Harrison, Cap. Dor Abdominal; MSD Manual — Dor Abdominal Aguda'
    },
    {
        system: 'Gastrointestinal',
        icon: '🫃',
        gender: 'all',
        symptom: 'Disfagia',
        description: 'Dificuldade para engolir — orofaríngea (transferência) vs. esofágica (trânsito)',
        causes: [
            { name: 'Carcinoma esofágico', details: 'Disfagia progressiva para sólidos → líquidos, perda de peso, > 50 anos' },
            { name: 'Estenose péptica', details: 'Histórico de DRGE crônica, disfagia para sólidos' },
            { name: 'Acalásia', details: 'Disfagia para sólidos E líquidos, regurgitação, perda de peso' },
            { name: 'Esofagite eosinofílica', details: 'Jovens com impactação alimentar, atopia' },
            { name: 'AVC / Doença neuromuscular', details: 'Disfagia orofaríngea + engasgo + aspiração' },
            { name: 'Anel/Membrana', details: 'Disfagia intermitente para sólidos grandes (Anel de Schatzki)' }
        ],
        redFlags: ['Progressão rápida', 'Perda de peso', 'Idade > 50 anos', 'Odinofagia', 'Anemia ferropriva'],
        approach: 'Endoscopia digestiva alta é o exame de escolha. Se disfagia orofaríngea: videodeglutograma. Progressão rápida = excluir neoplasia.',
        reference: 'Harrison, Cap. Disfagia; MSD Manual — Disfagia'
    },
    {
        system: 'Gastrointestinal',
        icon: '🫃',
        gender: 'all',
        symptom: 'Icterícia',
        description: 'Coloração amarelada de pele/mucosas por bilirrubina > 2,5 mg/dL',
        causes: [
            { name: 'Hepatite viral/alcoólica', details: 'Icterícia + AST/ALT elevadas + fadiga + hepatomegalia' },
            { name: 'Coledocolitíase', details: 'Icterícia + dor em HCD + colúria + acolia — padrão obstrutivo' },
            { name: 'Câncer de cabeça de pâncreas', details: 'Icterícia indolor + perda de peso + vesícula de Courvoisier' },
            { name: 'Colangite', details: 'Tríade de Charcot: febre + icterícia + dor em HCD — EMERGÊNCIA' },
            { name: 'Hemólise', details: 'BI elevada, LDH alta, haptoglobina baixa, reticulocitose' },
            { name: 'Cirrose', details: 'Icterícia crônica + ascite + varizes + eritema palmar + INR alargado' },
            { name: 'Síndrome de Gilbert', details: 'BI isolada, benigna, exacerbada por jejum/estresse' }
        ],
        redFlags: ['Colangite (Charcot/Reynolds)', 'Icterícia + coagulopatia (insuficiência hepática)', 'Icterícia indolor progressiva (neoplasia)', 'Encefalopatia hepática'],
        approach: 'Diferenciar: pré-hepática (BI↑, hemólise), hepática (AST/ALT↑), pós-hepática (BD↑, FA/GGT↑). USG de vias biliares como 1º exame se obstrutiva.',
        reference: 'Harrison, Cap. Icterícia; MSD Manual — Icterícia em Adultos'
    },

    // === GENITURINÁRIO ===
    {
        system: 'Geniturinário',
        icon: '🫘',
        gender: 'all',
        symptom: 'Disúria',
        description: 'Dor ou queimação ao urinar',
        causes: [
            { name: 'Cistite (ITU baixa)', details: 'Mulheres: disúria + polaciúria + urgência, sem febre' },
            { name: 'Pielonefrite', details: 'Disúria + febre + dor lombar + Giordano positivo' },
            { name: 'Uretrite / ISTs', details: 'Corrimento uretral, relação sexual desprotegida' },
            { name: 'Vaginite', details: 'Disúria "externa" + corrimento + prurido' },
            { name: 'Prostatite', details: 'Disúria + dor perineal + febre + próstata dolorosa ao toque' },
            { name: 'Cálculo ureteral', details: 'Disúria + hematúria + dor em cólica lombar irradiando para virilha' }
        ],
        redFlags: ['Febre alta + dor lombar (pielonefrite)', 'Retenção urinária', 'Hematúria macroscópica', 'Imunossupressão', 'Gravidez'],
        approach: 'EAS + urinocultura. Mulher jovem com cistite não complicada: tratamento empírico. Febre = pielonefrite até prova contrária.',
        reference: 'Harrison, Cap. Infecções do Trato Urinário; MSD — Disúria'
    },
    {
        system: 'Geniturinário',
        icon: '🫘',
        gender: 'all',
        symptom: 'Hematúria',
        description: 'Presença de sangue na urina — macro ou microscópica (≥3 hemácias/campo)',
        causes: [
            { name: 'ITU / Cistite', details: 'Hematúria + disúria + polaciúria' },
            { name: 'Litíase renal', details: 'Hematúria + dor lombar em cólica' },
            { name: 'Neoplasia (bexiga, rim)', details: 'Hematúria indolor em > 40 anos — ALERTA' },
            { name: 'Glomerulonefrite', details: 'Hematúria dismórfica + proteinúria + cilindros hemáticos' },
            { name: 'Hiperplasia prostática', details: 'Hematúria + jato fraco + noctúria, homem > 50 anos' },
            { name: 'Trauma', details: 'Pós-traumática, exercício intenso' },
            { name: 'Anticoagulação', details: 'Hematúria por RNI supraterapêutico — mas investigar causa subjacente' }
        ],
        redFlags: ['Idade > 40 anos + hematúria indolor', 'Coágulos na urina', 'Perda de peso', 'Tabagismo', 'Retenção urinária aguda'],
        approach: 'EAS, urinocultura, citologia urinária. Hematúria indolor em > 40 anos: cistoscopia + imagem (TC) para excluir neoplasia.',
        reference: 'Harrison, Cap. Hematúria; MSD Manual — Hematúria Isolada'
    },

    // === GINECOLÓGICO ===
    {
        system: 'Ginecológico e Obstétrico',
        icon: '🩺',
        gender: 'female',
        symptom: 'Sangramento Vaginal Anormal',
        description: 'Sangramento fora do período menstrual, excessivo ou pós-menopausa',
        causes: [
            { name: 'Miomas uterinos', details: 'Sangramento menstrual abundante + útero aumentado' },
            { name: 'Disfunção hormonal (SUA-O)', details: 'Anovulação: sangramento irregular, comum em extremos reprodutivos' },
            { name: 'Pólipos endometriais', details: 'Sangramento intermenstrual, pós-menopausa' },
            { name: 'Neoplasia (colo/endométrio)', details: 'Sangramento pós-coito (colo), pós-menopausa (endométrio)' },
            { name: 'Complicações de gravidez', details: 'Ectópica, ameaça de aborto, mola — βhCG obrigatório' },
            { name: 'Coagulopatias', details: 'Doença de von Willebrand — menorragia desde menarca' }
        ],
        redFlags: ['Sangramento pós-menopausa', 'Instabilidade hemodinâmica', 'βhCG positivo + dor (ectópica)', 'Massa cervical visível'],
        approach: 'βhCG em toda mulher em idade fértil. Pós-menopausa: USG transvaginal + biópsia endometrial. Sangramento agudo abundante: hemograma + hemostasia.',
        reference: 'Harrison, Cap. Sangramento Uterino; MSD — Sangramento Vaginal'
    },

    // === ORELHA, NARIZ E GARGANTA ===
    {
        system: 'Orelha, Nariz e Garganta',
        icon: '👂',
        gender: 'all',
        symptom: 'Dor de Garganta',
        description: 'Odinofagia — dor na faringe, frequente na atenção primária',
        causes: [
            { name: 'Faringite viral', details: 'Mais comum (70-85%); coriza, tosse, conjuntivite associadas' },
            { name: 'Faringite estreptocócica', details: 'Exsudato tonsilar + febre + adenopatia cervical + SEM tosse (Centor)' },
            { name: 'Mononucleose infecciosa', details: 'Faringite + linfadenopatia generalizada + esplenomegalia + linfócitos atípicos' },
            { name: 'Abscesso peritonsilar', details: 'Odinofagia intensa + trismo + desvio de úvula + voz abafada' },
            { name: 'Epiglotite', details: 'Odinofagia + estridor + sialorreia + posição de tripé — EMERGÊNCIA' },
            { name: 'DRGE', details: 'Globo faríngeo + pigarreio + rouquidão' }
        ],
        redFlags: ['Estridor', 'Sialorreia', 'Trismo', 'Desvio de úvula', 'Disfagia para saliva', 'Toxemia sistêmica'],
        approach: 'Critérios de Centor/McIsaac para decisão de ATB. Trismo/desvio de úvula → TC cervical (abscesso). Estridor → via aérea protegida ANTES de examinar.',
        reference: 'Harrison, Cap. Faringite; MSD Manual — Dor de Garganta'
    },

    // === OFTALMOLÓGICO ===
    {
        system: 'Olho',
        icon: '👁️',
        gender: 'all',
        symptom: 'Olho Vermelho',
        description: 'Hiperemia ocular — desde conjuntivites benignas até glaucoma agudo',
        causes: [
            { name: 'Conjuntivite viral', details: 'Hiperemia difusa + lacrimejamento + secreção aquosa, bilateral' },
            { name: 'Conjuntivite bacteriana', details: 'Secreção purulenta + pálpebras grudadas + unilateral' },
            { name: 'Conjuntivite alérgica', details: 'Prurido intenso + lacrimejamento + quemose' },
            { name: 'Glaucoma agudo de ângulo fechado', details: 'Dor intensa + halos coloridos + pupila fixa/midriática + olho pétreo — EMERGÊNCIA' },
            { name: 'Uveíte anterior', details: 'Dor + fotofobia + hiperemia periquerática + miose' },
            { name: 'Ceratite', details: 'Dor + fotofobia + úlcera corneana visível + uso de lentes de contato' },
            { name: 'Hemorragia subconjuntival', details: 'Mancha vermelha localizada, indolor, benigna, resolve em 2 semanas' }
        ],
        redFlags: ['Dor ocular intensa', 'Baixa acuidade visual', 'Fotofobia', 'Pupila fixa', 'Olho "pétreo"', 'Uso de lentes de contato + dor'],
        approach: 'Olho vermelho + dor + BAV = encaminhar oftalmologista urgente. Medir PIO se suspeita de glaucoma. Fluoresceína para detectar úlcera.',
        reference: 'Harrison, Cap. Distúrbios do Olho; MSD Manual — Olho Vermelho'
    },

    // === PELE ===
    {
        system: 'Pele',
        icon: '🩹',
        gender: 'all',
        symptom: 'Prurido Generalizado',
        description: 'Coceira difusa — pode indicar doença sistêmica quando sem lesão cutânea primária',
        causes: [
            { name: 'Dermatite / Eczema', details: 'Prurido + lesões eritematosas + escoriações' },
            { name: 'Colestase', details: 'Prurido + icterícia + FA/GGT elevadas, piora à noite' },
            { name: 'Insuficiência renal crônica', details: 'Prurido urêmico, sem lesão primária, diálise' },
            { name: 'Doenças hematológicas', details: 'Policitemia vera (prurido aquagênico), linfoma de Hodgkin' },
            { name: 'Hipertireoidismo', details: 'Prurido + pele quente + tremor + perda de peso' },
            { name: 'Parasitose (escabiose)', details: 'Prurido noturno + lesões em espaços interdigitais + pápulas' },
            { name: 'Medicamentos', details: 'Opioides, antibióticos, AINEs — reação adversa' }
        ],
        redFlags: ['Prurido sem lesão cutânea primária (sistêmico)', 'Linfonodomegalia', 'Perda de peso', 'Icterícia', 'Sudorese noturna'],
        approach: 'Sem lesão cutânea visível: investigar causa sistêmica — hemograma, função renal, função hepática, TSH, LDH, Rx tórax.',
        reference: 'Harrison, Cap. Prurido; MSD Manual — Prurido'
    },

    // ============================================================
    // SINTOMAS ESPECÍFICOS — FEMININO
    // ============================================================
    {
        system: 'Ginecológico e Obstétrico',
        icon: '🩺',
        gender: 'female',
        symptom: 'Dor Pélvica',
        description: 'Dor na região inferior do abdome/pelve — pode ser aguda (emergência) ou crônica',
        causes: [
            { name: 'Gravidez ectópica', details: 'Dor + atraso menstrual + sangramento vaginal — EMERGÊNCIA CIRÚRGICA' },
            { name: 'Torção de ovário', details: 'Dor aguda unilateral, náusea, massa palpável — EMERGÊNCIA' },
            { name: 'Doença inflamatória pélvica (DIP)', details: 'Dor bilateral + febre + corrimento + dor à mobilização cervical' },
            { name: 'Endometriose', details: 'Dor cíclica (menstrual) + dispareunia + infertilidade' },
            { name: 'Cisto ovariano roto/hemorrágico', details: 'Dor aguda unilateral, meio do ciclo, resolução espontânea' },
            { name: 'Miomas uterinos', details: 'Dor + sangramento abundante + útero aumentado' },
            { name: 'Cistite / ITU', details: 'Dor suprapúbica + disúria + polaciúria' }
        ],
        redFlags: ['βhCG positivo + dor (ectópica)', 'Instabilidade hemodinâmica', 'Peritonismo', 'Febre alta + toxemia (abscesso tubo-ovariano)'],
        approach: 'βhCG em TODA mulher em idade fértil com dor pélvica. USG transvaginal. Dor + βhCG positivo + instabilidade = ectópica rota até prova contrária.',
        reference: 'Harrison, Cap. Dor Pélvica; MSD — Dor Pélvica no Início da Gravidez'
    },
    {
        system: 'Ginecológico e Obstétrico',
        icon: '🩺',
        gender: 'female',
        symptom: 'Corrimento Vaginal',
        description: 'Secreção vaginal anormal em quantidade, cor, odor ou consistência',
        causes: [
            { name: 'Vaginose bacteriana', details: 'Corrimento acinzentado, odor de peixe (aminas), pH > 4,5, clue cells' },
            { name: 'Candidíase vulvovaginal', details: 'Corrimento branco grumoso + prurido intenso + eritema vulvar' },
            { name: 'Tricomoníase', details: 'Corrimento esverdeado, espumoso + odor + disúria — IST' },
            { name: 'Cervicite (Clamídia/Gonococo)', details: 'Corrimento mucopurulento cervical + sangramento pós-coito' },
            { name: 'Corpo estranho', details: 'Corrimento fétido intenso, comum em crianças' },
            { name: 'Neoplasia cervical', details: 'Corrimento sanguinolento crônico + sangramento pós-coito' }
        ],
        redFlags: ['Febre + dor pélvica (DIP)', 'Sangramento pós-coito', 'Corrimento em pré-púbere', 'Massa cervical palpável'],
        approach: 'Exame especular + pH vaginal + teste de aminas (Whiff) + microscopia a fresco. Tratar parceiro se IST. Rastreio cervical (Papanicolaou) se indicado.',
        reference: 'Harrison, Cap. ISTs e Vaginites; MSD — Corrimento Vaginal'
    },
    {
        system: 'Ginecológico e Obstétrico',
        icon: '🩺',
        gender: 'female',
        symptom: 'Amenorreia',
        description: 'Ausência de menstruação — primária (nunca menstruou aos 15 anos) ou secundária (ausência > 3 meses)',
        causes: [
            { name: 'Gravidez', details: 'Causa mais comum de amenorreia secundária — sempre excluir primeiro' },
            { name: 'SOP (Síndrome do Ovário Policístico)', details: 'Oligomenorreia + hiperandrogenismo + ovários policísticos' },
            { name: 'Hiperprolactinemia', details: 'Galactorreia + amenorreia — excluir prolactinoma' },
            { name: 'Insuficiência ovariana prematura', details: 'FSH elevado < 40 anos, sintomas de menopausa' },
            { name: 'Hipotálamo funcional', details: 'Estresse, exercício excessivo, perda de peso, anorexia nervosa' },
            { name: 'Hipotireoidismo', details: 'TSH elevado pode causar hiperprolactinemia secundária' },
            { name: 'Síndrome de Asherman', details: 'Sinéquias intrauterinas pós-curetagem' }
        ],
        redFlags: ['Cefaleia + alteração visual (tumor hipofisário)', 'Virilização rápida (tumor adrenal/ovariano)', 'Amenorreia primária + ausência de caracteres sexuais'],
        approach: 'βhCG primeiro. Depois: FSH, LH, estradiol, prolactina, TSH. Se hirsutismo: testosterona, DHEA-S, 17-OH-progesterona.',
        reference: 'Harrison, Cap. Amenorreia; MSD — Amenorreia'
    },
    {
        system: 'Ginecológico e Obstétrico',
        icon: '🩺',
        gender: 'female',
        symptom: 'Mastalgia (Dor na Mama)',
        description: 'Dor mamária — pode ser cíclica (hormonal) ou não cíclica',
        causes: [
            { name: 'Mastalgia cíclica', details: 'Bilateral, difusa, piora na fase lútea, melhora com menstruação — benigna' },
            { name: 'Mastalgia não cíclica', details: 'Unilateral, focal, pode ser musculoesquelética (parede torácica)' },
            { name: 'Mastite / Abscesso', details: 'Dor + calor + eritema + febre — comum na lactação' },
            { name: 'Fibroadenoma', details: 'Nódulo móvel, liso, indolor ou levemente doloroso, jovens' },
            { name: 'Câncer de mama', details: 'Raro apresentar-se com dor isolada, mas investigar se nódulo + retração' },
            { name: 'Medicamentos', details: 'ACO, TRH, antidepressivos, espironolactona' }
        ],
        redFlags: ['Nódulo palpável + retração de pele', 'Descarga papilar sanguinolenta unilateral', 'Linfonodomegalia axilar', 'Pele em "casca de laranja"'],
        approach: 'Mastalgia cíclica bilateral = tranquilização. Nódulo: mamografia/USG conforme idade. > 40 anos: mamografia. < 30: USG primeiro.',
        reference: 'Harrison, Cap. Doenças da Mama; MSD — Massas Mamárias'
    },
    {
        system: 'Ginecológico e Obstétrico',
        icon: '🩺',
        gender: 'female',
        symptom: 'Dismenorreia (Cólica Menstrual)',
        description: 'Dor pélvica em cólica associada à menstruação',
        causes: [
            { name: 'Dismenorreia primária', details: 'Sem patologia orgânica; excesso de prostaglandinas; início na adolescência' },
            { name: 'Endometriose', details: 'Dor progressiva ao longo dos anos + dispareunia + infertilidade' },
            { name: 'Adenomiose', details: 'Útero aumentado e amolecido + sangramento abundante + dor, > 35 anos' },
            { name: 'Miomas submucosos', details: 'Sangramento irregular + útero aumentado' },
            { name: 'DIU (cobre)', details: 'Piora de cólica e sangramento nos primeiros meses de uso' },
            { name: 'Estenose cervical', details: 'Pós-conização, acúmulo de sangue (hematometra)' }
        ],
        redFlags: ['Dor progressivamente pior ao longo dos anos', 'Infertilidade associada', 'Dispareunia profunda', 'Massa pélvica'],
        approach: 'Primária: AINEs + ACO. Refratária: investigar com USG/RM para endometriose/adenomiose. Laparoscopia se forte suspeita e imagem inconclusiva.',
        reference: 'Harrison, Cap. Endometriose; MSD — Dismenorreia'
    },

    // ============================================================
    // SINTOMAS ESPECÍFICOS — MASCULINO
    // ============================================================
    {
        system: 'Urológico Masculino',
        icon: '♂️',
        gender: 'male',
        symptom: 'Dor Escrotal Aguda',
        description: 'Dor no escroto/testículo de início agudo — pode ser emergência cirúrgica',
        causes: [
            { name: 'Torção testicular', details: 'Dor súbita, intensa, testículo elevado/horizontalizado, reflexo cremastérico ausente — EMERGÊNCIA (6h)' },
            { name: 'Epididimite', details: 'Dor gradual + edema epididimário + febre + disúria; sinal de Prehn positivo' },
            { name: 'Orquite', details: 'Pós-caxumba ou IST, testículo edemaciado e doloroso' },
            { name: 'Torção de apêndice testicular', details: 'Dor no polo superior, "blue dot sign", mais comum em meninos' },
            { name: 'Hérnia inguinal encarcerada', details: 'Massa inguinal irredutível + dor + sinais obstrutivos' },
            { name: 'Trauma escrotal', details: 'Histórico claro, excluir ruptura testicular com USG' }
        ],
        redFlags: ['Dor < 6h de evolução (torção)', 'Testículo elevado/horizontalizado', 'Reflexo cremastérico ausente', 'Náusea/vômito intenso'],
        approach: 'Torção testicular = emergência cirúrgica. Se dúvida: USG com Doppler (ausência de fluxo = torção). Não atrasar cirurgia por exames se alta suspeita.',
        reference: 'Harrison, Cap. Dor Escrotal; MSD — Dor Escrotal'
    },
    {
        system: 'Urológico Masculino',
        icon: '♂️',
        gender: 'male',
        symptom: 'Sintomas Urinários Obstrutivos (LUTS)',
        description: 'Jato fraco, hesitação, gotejamento terminal, esforço miccional — sintomas do trato urinário inferior',
        causes: [
            { name: 'Hiperplasia Prostática Benigna (HPB)', details: 'Homem > 50 anos, jato fraco + noctúria + esvaziamento incompleto' },
            { name: 'Câncer de próstata', details: 'Geralmente assintomático precoce; PSA elevado + nódulo ao toque' },
            { name: 'Estenose uretral', details: 'Pós-traumática ou pós-infecciosa, jato muito fino/bifurcado' },
            { name: 'Prostatite crônica', details: 'Dor perineal + LUTS + desconforto pós-ejaculatório' },
            { name: 'Bexiga neurogênica', details: 'Diabetes, lesão medular, esclerose múltipla' },
            { name: 'Medicamentos', details: 'Anticolinérgicos, descongestionantes, opioides' }
        ],
        redFlags: ['Retenção urinária aguda', 'Hematúria', 'PSA muito elevado', 'Perda de peso', 'Dor óssea (metástase)'],
        approach: 'Toque retal + PSA + EAS + USG (resíduo pós-miccional). IPSS score para quantificar sintomas. HPB: alfa-bloqueadores ± inibidores de 5α-redutase.',
        reference: 'Harrison, Cap. HPB e Câncer de Próstata; MSD — LUTS'
    },
    {
        system: 'Urológico Masculino',
        icon: '♂️',
        gender: 'male',
        symptom: 'Disfunção Erétil',
        description: 'Incapacidade persistente de atingir ou manter ereção suficiente para relação sexual satisfatória',
        causes: [
            { name: 'Vascular (aterosclerose)', details: 'Causa mais comum > 40 anos; FR: DM, HAS, tabagismo, dislipidemia' },
            { name: 'Diabetes mellitus', details: 'Neuropatia + vasculopatia; prevalência de 35-75% em diabéticos' },
            { name: 'Medicamentos', details: 'Anti-hipertensivos (BB, tiazídicos), antidepressivos (ISRS), espironolactona' },
            { name: 'Hipogonadismo', details: 'Testosterona baixa + diminuição da libido + fadiga + perda muscular' },
            { name: 'Psicogênica', details: 'Ereção matinal preservada, situacional, início abrupto, jovens' },
            { name: 'Neurológica', details: 'Pós-prostatectomia, lesão medular, neuropatia' },
            { name: 'Doença de Peyronie', details: 'Curvatura peniana + placa palpável + dor à ereção' }
        ],
        redFlags: ['Marcador de doença cardiovascular (mesmos FR)', 'Hipogonadismo com ginecomastia', 'Início abrupto em jovem (psicogênica vs. medicamento)'],
        approach: 'Glicemia, perfil lipídico, testosterona total (manhã). Pode ser o primeiro sinal de doença cardiovascular. iPDE5 (sildenafil) como 1ª linha terapêutica.',
        reference: 'Harrison, Cap. Disfunção Sexual Masculina; MSD — Disfunção Erétil'
    },
    {
        system: 'Urológico Masculino',
        icon: '♂️',
        gender: 'male',
        symptom: 'Ginecomastia',
        description: 'Aumento benigno do tecido mamário masculino — pode ser uni ou bilateral',
        causes: [
            { name: 'Fisiológica', details: 'Neonatal, puberal (até 70% dos adolescentes) ou senil — transitória' },
            { name: 'Medicamentos', details: 'Espironolactona, cetoconazol, digitálicos, antiandrógenos, maconha, esteroides' },
            { name: 'Hipogonadismo', details: 'Klinefelter, hipogonadismo secundário, orquiectomia' },
            { name: 'Hipertireoidismo', details: 'Aumento da SHBG → relação estrógeno/andrógeno elevada' },
            { name: 'Cirrose hepática', details: 'Metabolismo reduzido de estrógenos + SHBG elevada' },
            { name: 'Tumor testicular', details: 'Ginecomastia + massa testicular + βhCG elevado — INVESTIGAR' },
            { name: 'Tumor adrenal', details: 'Feminização + ginecomastia rápida — raro' }
        ],
        redFlags: ['Ginecomastia unilateral dura (excluir Ca mama masculino)', 'Massa testicular palpável', 'Crescimento rápido', 'Dor intensa'],
        approach: 'Exames: testosterona, estradiol, LH, FSH, βhCG, função hepática/tireoidiana. Massa testicular → USG escrotal. Ginecomastia puberal: observação por 6-12 meses.',
        reference: 'Harrison, Cap. Ginecomastia; MSD — Ginecomastia'
    },
    {
        system: 'Urológico Masculino',
        icon: '♂️',
        gender: 'male',
        symptom: 'Hematospermia',
        description: 'Presença de sangue no sêmen — geralmente benigna e autolimitada',
        causes: [
            { name: 'Idiopática', details: 'Causa mais comum (especialmente em < 40 anos), resolução espontânea' },
            { name: 'Prostatite / Vesiculite', details: 'Dor perineal + LUTS + febre — infecção de próstata/vesículas' },
            { name: 'ISTs', details: 'Clamídia, gonococo — corrimento associado' },
            { name: 'Câncer de próstata', details: 'Raro como causa isolada, mas investigar se > 40 anos + PSA elevado' },
            { name: 'Anticoagulação', details: 'Pacientes em uso de warfarina/DOACs' },
            { name: 'Biópsia prostática recente', details: 'Causa iatrogênica comum — pode durar semanas' }
        ],
        redFlags: ['Idade > 40 anos com episódios recorrentes', 'Sintomas urinários associados', 'PSA elevado', 'Perda de peso'],
        approach: 'Em < 40 anos com episódio isolado: tranquilização + EAS/urinocultura. Em > 40 ou recorrente: PSA + USG transretal + considerar cistoscopia.',
        reference: 'Harrison, Cap. Hematospermia; MSD — Hematospermia'
    }
];

// ============================================================
// RENDERIZAÇÃO DO GUIA
// ============================================================
let currentGender = 'all';

function initSintomasGuide() {
    renderFilteredGuide();

    // Filtro por gênero
    document.querySelectorAll('.sg-gender-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sg-gender-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentGender = btn.dataset.gender;
            renderFilteredGuide();
        });
    });

    // Busca por texto
    const searchInput = document.getElementById('sintomas-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            renderFilteredGuide();
        });
    }
}

function renderFilteredGuide() {
    const searchInput = document.getElementById('sintomas-search');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    let filtered = sintomasDatabase;

    // Filtro por gênero: 'all' mostra tudo, 'male' mostra all+male, 'female' mostra all+female
    if (currentGender === 'male') {
        filtered = filtered.filter(s => s.gender === 'all' || s.gender === 'male');
    } else if (currentGender === 'female') {
        filtered = filtered.filter(s => s.gender === 'all' || s.gender === 'female');
    }

    // Filtro por texto
    if (query.length > 0) {
        filtered = filtered.filter(s =>
            s.symptom.toLowerCase().includes(query) ||
            s.system.toLowerCase().includes(query) ||
            s.description.toLowerCase().includes(query) ||
            s.causes.some(c => c.name.toLowerCase().includes(query) || c.details.toLowerCase().includes(query))
        );
    }

    renderSintomasGuide(filtered);
}

function renderSintomasGuide(data) {
    const container = document.getElementById('sintomas-guide-content');
    if (!container) return;

    // Agrupar por sistema
    const groups = {};
    data.forEach(item => {
        if (!groups[item.system]) {
            groups[item.system] = { icon: item.icon, items: [] };
        }
        groups[item.system].items.push(item);
    });

    let html = '';
    for (const system in groups) {
        const group = groups[system];
        html += `
            <div class="sg-system-group">
                <div class="sg-system-header" data-toggle="system">
                    <span class="sg-system-icon">${group.icon}</span>
                    <h3>${system}</h3>
                    <span class="sg-count">${group.items.length} sintoma${group.items.length > 1 ? 's' : ''}</span>
                    <span class="sg-chevron">▼</span>
                </div>
                <div class="sg-system-body">
                    ${group.items.map(item => renderSymptomCard(item)).join('')}
                </div>
            </div>
        `;
    }

    if (data.length === 0) {
        html = '<p class="sg-no-results">Nenhum sintoma encontrado. Tente outro termo de busca.</p>';
    }

    container.innerHTML = html;

    // Toggle de grupos (sistema)
    container.querySelectorAll('.sg-system-header').forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            header.classList.toggle('collapsed');
            body.classList.toggle('collapsed');
        });
    });

    // Toggle de cards individuais
    container.querySelectorAll('.sg-card-header').forEach(cardHeader => {
        cardHeader.addEventListener('click', () => {
            const card = cardHeader.closest('.sg-card');
            card.classList.toggle('expanded');
        });
    });
}

function renderSymptomCard(item) {
    return `
        <div class="sg-card">
            <div class="sg-card-header">
                <h4>${item.symptom}</h4>
                <p class="sg-card-desc">${item.description}</p>
                <span class="sg-card-chevron">▶</span>
            </div>
            <div class="sg-card-body">
                <div class="sg-section">
                    <h5>📋 Diagnóstico Diferencial</h5>
                    <div class="sg-causes-list">
                        ${item.causes.map(c => `
                            <div class="sg-cause">
                                <strong>${c.name}</strong>
                                <span>${c.details}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="sg-section sg-redflags">
                    <h5>🚨 Red Flags (Sinais de Alarme)</h5>
                    <div class="sg-flags-list">
                        ${item.redFlags.map(f => `<span class="sg-flag">${f}</span>`).join('')}
                    </div>
                </div>
                <div class="sg-section">
                    <h5>🩺 Abordagem</h5>
                    <p>${item.approach}</p>
                </div>
                <div class="sg-reference">
                    📖 ${item.reference}
                </div>
            </div>
        </div>
    `;
}

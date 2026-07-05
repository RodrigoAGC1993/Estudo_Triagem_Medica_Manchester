/**
 * Sistema de Triagem Médica - Baseado no Protocolo de Manchester
 * Fonte oficial: Ministério da Saúde - Saúde de A a Z
 * https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z
 * 
 * ATENÇÃO: Este sistema é apenas uma ferramenta de apoio acadêmico.
 * Não substitui o julgamento clínico de um profissional de saúde.
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('triagem-form');
    document.getElementById('genero').addEventListener('change', toggleGenderSymptoms);
    document.getElementById('pressao').addEventListener('input', avaliarPressao);
    document.getElementById('temperatura').addEventListener('input', avaliarTemperatura);
    document.getElementById('idade').addEventListener('input', () => {
        avaliarPressao();
        avaliarTemperatura();
    });
    form.addEventListener('submit', handleFormSubmit);
});

function toggleGenderSymptoms() {
    const container = document.getElementById('sintomas-especificos-container');
    const titulo = document.getElementById('genero-titulo');
    const sintomasFemininos = document.getElementById('sintomas-femininos');
    const sintomasMasculinos = document.getElementById('sintomas-masculinos');
    const selectedGender = document.getElementById('genero').value;

    container.classList.toggle('hidden', !selectedGender);
    sintomasFemininos.classList.toggle('hidden', selectedGender !== 'feminino');
    sintomasMasculinos.classList.toggle('hidden', selectedGender !== 'masculino');

    if (selectedGender === 'feminino') titulo.textContent = 'Sintomas Ginecológicos / Urinários';
    if (selectedGender === 'masculino') titulo.textContent = 'Sintomas Urológicos / Genitais';
}

function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dados = {
        sintomas: formData.getAll('sintomas'),
        pressao: formData.get('pressao'),
        temperatura: formData.get('temperatura'),
        idade: parseInt(formData.get('idade')) || 0,
    };
    const [sistolica, diastolica] = dados.pressao.split('/').map(Number);
    const temperatura = parseFloat((dados.temperatura || '').replace(',', '.'));
    const recomendacao = recomendarEspecialidade(dados.sintomas, sistolica, diastolica, temperatura, dados.idade);
    displayResult(recomendacao);
}

function displayResult(recomendacao) {
    const resultadoDiv = document.getElementById('resultado');
    const especialidadeP = document.getElementById('especialidade');
    const observacaoP = document.getElementById('observacao');
    const tituloResultado = document.getElementById('resultado-titulo');

    especialidadeP.textContent = recomendacao.especialidade;
    observacaoP.textContent = recomendacao.observacao;

    resultadoDiv.className = 'hidden';
    if (recomendacao.urgente) {
        resultadoDiv.classList.add('danger');
        tituloResultado.textContent = "⚠️ RECOMENDAÇÃO URGENTE:";
    } else if (recomendacao.alerta) {
        resultadoDiv.classList.add('warning');
        tituloResultado.textContent = "⚡ ATENÇÃO — Procure Atendimento:";
    } else {
        resultadoDiv.classList.add('success');
        tituloResultado.textContent = "✅ Especialidade Recomendada:";
    }
    resultadoDiv.classList.remove('hidden');
}

function avaliarPressao() {
    const paInput = document.getElementById('pressao').value;
    const paIndicator = document.getElementById('pa-indicator');
    const [s, d] = paInput.split('/').map(Number);

    if (isNaN(s) || isNaN(d)) { paIndicator.textContent = ''; return; }

    // Classificação conforme 7ª Diretriz Brasileira de Hipertensão Arterial
    let c = { text: 'Ótima', className: 'success' };
    if (s >= 180 || d >= 110) c = { text: 'Hipertensão Estágio 3 (Crise)', className: 'danger' };
    else if (s >= 160 || d >= 100) c = { text: 'Hipertensão Estágio 2', className: 'danger' };
    else if (s >= 140 || d >= 90) c = { text: 'Hipertensão Estágio 1', className: 'warning' };
    else if (s >= 130 || d >= 85) c = { text: 'Pré-hipertensão', className: 'warning' };
    else if (s >= 120 || d >= 80) c = { text: 'Normal', className: 'success' };
    else if (s < 90 || d < 60) c = { text: 'Hipotensão', className: 'info' };

    paIndicator.textContent = c.text;
    paIndicator.className = `indicator ${c.className}`;
}

function avaliarTemperatura() {
    const tempInput = document.getElementById('temperatura').value.replace(',', '.');
    const temperatura = parseFloat(tempInput);
    const tempIndicator = document.getElementById('temp-indicator');

    if (isNaN(temperatura)) { tempIndicator.textContent = ''; return; }

    // Classificação conforme Manuais MSD
    let c = { text: 'Normal', className: 'success' };
    if (temperatura >= 41) c = { text: 'Hipertermia Grave', className: 'danger' };
    else if (temperatura >= 39.5) c = { text: 'Febre Alta', className: 'danger' };
    else if (temperatura >= 37.8) c = { text: 'Febre', className: 'warning' };
    else if (temperatura >= 37.3) c = { text: 'Febril / Subfebril', className: 'warning' };
    else if (temperatura < 35) c = { text: 'Hipotermia', className: 'info' };

    tempIndicator.textContent = c.text;
    tempIndicator.className = `indicator ${c.className}`;
}

// ============================================================
// REGRAS DE URGÊNCIA (Red Flags)
// Baseado em: Protocolo de Manchester + Ministério da Saúde
// ============================================================
function checarUrgencias(sintomas, sistolica, diastolica, temperatura, idade) {

    // AVC - Fonte: gov.br/saude - Acidente Vascular Cerebral
    // Sinais: confusão mental, alteração fala, fraqueza unilateral, visão turva, cefaleia súbita
    if (sintomas.includes('confusao_mental') && (sintomas.includes('fraqueza_unilateral') || sintomas.includes('alteracao_fala'))) {
        return {
            especialidade: 'EMERGÊNCIA — Suspeita de AVC (SAMU 192)',
            observacao: 'Sinais sugestivos de Acidente Vascular Cerebral. Ligue imediatamente para o SAMU 192 ou Bombeiros 193. O tempo é crítico para o tratamento.',
            urgente: true
        };
    }

    // Convulsão
    if (sintomas.includes('convulsao')) {
        return {
            especialidade: 'EMERGÊNCIA — Pronto-Socorro (SAMU 192)',
            observacao: 'Convulsão requer atendimento de emergência imediato. Acione o SAMU 192.',
            urgente: true
        };
    }

    // Infarto / Síndrome Coronariana Aguda
    if (sintomas.includes('dor_peito') && (sintomas.includes('falta_ar') || sintomas.includes('sudorese_fria'))) {
        return {
            especialidade: 'EMERGÊNCIA — Suspeita de Infarto (SAMU 192)',
            observacao: 'Dor no peito associada a falta de ar e/ou sudorese fria pode indicar infarto agudo do miocárdio. Acione o SAMU 192 imediatamente.',
            urgente: true
        };
    }

    if (sintomas.includes('dor_peito')) {
        return {
            especialidade: 'URGÊNCIA — Cardiologista / Emergência',
            observacao: 'Dor ou aperto no peito é um sinal de alerta que requer avaliação médica imediata para descartar causas graves como infarto.',
            urgente: true
        };
    }

    // Crise Hipertensiva - Fonte: gov.br/saude - Hipertensão
    if ((sistolica >= 180 || diastolica >= 110) && (sintomas.includes('dor_cabeca') || sintomas.includes('visao_turva') || sintomas.includes('confusao_mental'))) {
        return {
            especialidade: 'EMERGÊNCIA — Crise Hipertensiva (Pronto-Socorro)',
            observacao: 'Pressão arterial em nível de crise com sintomas neurológicos. Requer atendimento imediato — risco de AVC.',
            urgente: true
        };
    }

    // Desmaio/Síncope
    if (sintomas.includes('desmaio_sincope')) {
        return {
            especialidade: 'URGÊNCIA — Pronto-Socorro',
            observacao: 'A perda de consciência (desmaio) deve sempre ser investigada em um serviço de emergência.',
            urgente: true
        };
    }

    // Dengue Grave - Fonte: gov.br/saude - Dengue
    // Sinais de alarme: dor abdominal intensa, vômitos frequentes, tontura/desmaio, sangramento
    if (sintomas.includes('febre') && sintomas.includes('dor_retro_ocular') && sintomas.includes('dor_muscular') &&
        (sintomas.includes('sangramento') || sintomas.includes('dor_abdominal'))) {
        return {
            especialidade: 'URGÊNCIA — Suspeita de Dengue Grave (Pronto-Socorro)',
            observacao: 'Febre com dor atrás dos olhos, dor muscular e sinais de alarme (sangramento/dor abdominal intensa) sugerem dengue com risco de gravidade. Procure atendimento imediato.',
            urgente: true
        };
    }

    // Hipertermia Grave
    if (temperatura >= 41) {
        return {
            especialidade: 'EMERGÊNCIA — Hipertermia Grave (Pronto-Socorro)',
            observacao: 'Temperatura acima de 41°C é uma emergência médica. Resfrie o corpo e procure atendimento imediato.',
            urgente: true
        };
    }

    // Dificuldade respiratória grave (possível crise asmática grave)
    // Fonte: gov.br/saude - Asma
    if (sintomas.includes('falta_ar') && sintomas.includes('chiado_peito') && sintomas.includes('cianose')) {
        return {
            especialidade: 'EMERGÊNCIA — Crise Respiratória (Pronto-Socorro)',
            observacao: 'Dificuldade respiratória com chiado e cianose (lábios/extremidades roxos) indica insuficiência respiratória. Procure emergência imediatamente.',
            urgente: true
        };
    }

    return null;
}

// ============================================================
// SISTEMA DE PONTUAÇÃO POR ESPECIALIDADE
// Referências: Ministério da Saúde - Saúde de A a Z
// https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z
// ============================================================
function recomendarEspecialidade(sintomas, sistolica, diastolica, temperatura, idade) {
    const urgencia = checarUrgencias(sintomas, sistolica, diastolica, temperatura, idade);
    if (urgencia) return urgencia;

    if (sintomas.length === 0) {
        return {
            especialidade: 'Nenhum sintoma selecionado',
            observacao: 'Por favor, marque os sintomas que você está sentindo para receber uma recomendação.',
            urgente: false
        };
    }

    // Mapa de pontuação expandido com doenças do portal gov.br/saude
    const mapaDePontos = {
        // === Sintomas Gerais / Constitucionais ===
        'febre': { 'Clínico Geral / Infectologista': 2, 'Pneumologista': 1 },
        'calafrios': { 'Clínico Geral / Infectologista': 2 },
        'cansaco_fadiga': { 'Clínico Geral / Infectologista': 1, 'Endocrinologista': 1, 'Reumatologista': 1 },
        'perda_peso': { 'Endocrinologista': 2, 'Oncologista': 2, 'Clínico Geral / Infectologista': 1 },
        'sudorese_noturna': { 'Clínico Geral / Infectologista': 2, 'Oncologista': 2 },
        'sudorese_fria': { 'Cardiologista': 3, 'Clínico Geral / Infectologista': 1 },
        'ganglios_inchados': { 'Clínico Geral / Infectologista': 2, 'Oncologista / Hematologista': 2 },
        'mal_estar_geral': { 'Clínico Geral / Infectologista': 1 },

        // === Neurológicos (Fonte: gov.br/saude - AVC) ===
        'dor_cabeca': { 'Neurologista': 2, 'Clínico Geral / Infectologista': 1 },
        'tontura_vertigem': { 'Neurologista': 2, 'Otorrinolaringologista': 1, 'Cardiologista': 1 },
        'formigamento_dormencia': { 'Neurologista': 3 },
        'visao_turva': { 'Neurologista': 2, 'Oftalmologista': 2 },
        'convulsao': { 'Neurologista': 5 },
        'desmaio_sincope': { 'Cardiologista': 2, 'Neurologista': 2 },
        'insonia': { 'Psiquiatra / Psicólogo': 1, 'Neurologista': 1 },
        'confusao_mental': { 'Neurologista': 4, 'Geriatra': 1 },
        'alteracao_fala': { 'Neurologista': 5 },
        'fraqueza_unilateral': { 'Neurologista': 5 },
        'perda_equilibrio': { 'Neurologista': 3, 'Otorrinolaringologista': 2 },
        'tremores': { 'Neurologista': 3 },
        'perda_memoria': { 'Neurologista': 3, 'Geriatra': 2 },

        // === Cardiovasculares (Fonte: gov.br/saude - Hipertensão, AVC) ===
        'dor_peito': { 'Cardiologista': 5 },
        'palpitacoes': { 'Cardiologista': 3 },
        'falta_ar': { 'Cardiologista': 2, 'Pneumologista': 2 },
        'edema_membros': { 'Cardiologista': 2, 'Nefrologista': 2 },
        'zumbido_ouvido': { 'Otorrinolaringologista': 2, 'Cardiologista': 1 },

        // === Respiratórios (Fonte: gov.br/saude - Asma, Covid-19) ===
        'tosse': { 'Pneumologista': 2, 'Otorrinolaringologista': 1, 'Clínico Geral / Infectologista': 1 },
        'tosse_com_sangue': { 'Pneumologista': 4, 'Oncologista': 2 },
        'chiado_peito': { 'Pneumologista': 3 },
        'dor_garganta': { 'Otorrinolaringologista': 2, 'Clínico Geral / Infectologista': 1 },
        'nariz_entupido_coriza': { 'Otorrinolaringologista': 1, 'Alergista': 1 },
        'espirros_frequentes': { 'Alergista': 2, 'Otorrinolaringologista': 1 },
        'respiracao_rapida': { 'Pneumologista': 3, 'Cardiologista': 1 },
        'cianose': { 'Pneumologista': 4, 'Cardiologista': 3 },
        'dor_toracica_respirar': { 'Pneumologista': 3, 'Cardiologista': 2 },

        // === Otorrinolaringológicos ===
        'dor_ouvido': { 'Otorrinolaringologista': 2 },
        'perda_audicao': { 'Otorrinolaringologista': 3 },
        'secrecao_ouvido': { 'Otorrinolaringologista': 3 },
        'rouquidao': { 'Otorrinolaringologista': 2 },

        // === Gastrointestinais (Fonte: gov.br/saude - Doenças Diarreicas, Cólera) ===
        'nausea_vomito': { 'Gastroenterologista': 2, 'Clínico Geral / Infectologista': 1 },
        'dor_abdominal': { 'Gastroenterologista': 2, 'Cirurgião': 1 },
        'diarreia': { 'Gastroenterologista': 2, 'Clínico Geral / Infectologista': 1 },
        'diarreia_sanguinolenta': { 'Gastroenterologista': 3, 'Clínico Geral / Infectologista': 2, 'Proctologista': 1 },
        'constipacao': { 'Gastroenterologista': 2 },
        'azia_refluxo': { 'Gastroenterologista': 3 },
        'sangue_fezes': { 'Gastroenterologista': 3, 'Proctologista': 2, 'Oncologista': 1 },
        'ictericia': { 'Gastroenterologista / Hepatologista': 4, 'Clínico Geral / Infectologista': 2 },
        'distensao_abdominal': { 'Gastroenterologista': 2 },
        'dificuldade_engolir': { 'Gastroenterologista': 3, 'Otorrinolaringologista': 2 },

        // === Musculoesqueléticos ===
        'dor_costas': { 'Ortopedista': 2, 'Reumatologista': 1 },
        'dor_muscular': { 'Ortopedista': 1, 'Reumatologista': 1, 'Clínico Geral / Infectologista': 1 },
        'dor_articulacoes': { 'Reumatologista': 2, 'Ortopedista': 1 },
        'inchaco_articular': { 'Reumatologista': 3 },
        'rigidez_matinal': { 'Reumatologista': 3 },
        'dor_retro_ocular': { 'Clínico Geral / Infectologista': 2, 'Oftalmologista': 1 },

        // === Dermatológicos (Fonte: gov.br/saude - Hanseníase, Herpes) ===
        'lesoes_pele': { 'Dermatologista': 3 },
        'coceira': { 'Dermatologista': 2, 'Alergista': 2 },
        'manchas_vermelhas': { 'Dermatologista': 2, 'Clínico Geral / Infectologista': 2 },
        'manchas_dormentes': { 'Dermatologista': 3, 'Clínico Geral / Infectologista': 2 },
        'vesiculas_bolhas': { 'Dermatologista': 3, 'Clínico Geral / Infectologista': 1 },
        'queda_cabelo': { 'Dermatologista': 2, 'Endocrinologista': 1 },
        'feridas_nao_cicatrizam': { 'Dermatologista': 2, 'Endocrinologista': 2, 'Oncologista': 1 },

        // === Saúde Mental (Fonte: gov.br/saude - Depressão) ===
        'ansiedade': { 'Psiquiatra / Psicólogo': 2 },
        'tristeza_apatia': { 'Psiquiatra / Psicólogo': 2 },
        'pensamentos_morte': { 'Psiquiatra / Psicólogo': 5 },
        'irritabilidade': { 'Psiquiatra / Psicólogo': 1, 'Endocrinologista': 1 },
        'perda_interesse': { 'Psiquiatra / Psicólogo': 2 },
        'alteracao_apetite': { 'Psiquiatra / Psicólogo': 1, 'Endocrinologista': 1 },

        // === Endócrinos / Metabólicos (Fonte: gov.br/saude - Diabetes) ===
        'sede_excessiva': { 'Endocrinologista': 3 },
        'fome_excessiva': { 'Endocrinologista': 3 },
        'urina_frequente': { 'Endocrinologista': 2, 'Urologista': 1 },
        'visao_embaçada': { 'Endocrinologista': 2, 'Oftalmologista': 2 },
        'cicatrizacao_lenta': { 'Endocrinologista': 2 },
        'ganho_peso_inexplicado': { 'Endocrinologista': 3 },
        'intolerancia_frio_calor': { 'Endocrinologista': 3 },

        // === Infectologia / Arboviroses (Fonte: gov.br/saude - Dengue, Chikungunya) ===
        'manchas_corpo': { 'Clínico Geral / Infectologista': 2, 'Dermatologista': 1 },
        'sangramento': { 'Clínico Geral / Infectologista': 3, 'Hematologista': 2 },
        'sangramento_nasal': { 'Otorrinolaringologista': 2, 'Hematologista': 1, 'Cardiologista': 1 },
        'dor_olhos': { 'Oftalmologista': 2, 'Clínico Geral / Infectologista': 1 },

        // === Nefrológicos / Urinários (Fonte: gov.br/saude - Doenças Renais) ===
        'dor_lombar': { 'Nefrologista': 2, 'Urologista': 2, 'Ortopedista': 1 },
        'urina_escura': { 'Nefrologista': 2, 'Gastroenterologista / Hepatologista': 2 },
        'urina_espumosa': { 'Nefrologista': 3 },

        // === Ginecológicos ===
        'colica_menstrual': { 'Ginecologista': 2 },
        'corrimento_vaginal': { 'Ginecologista': 2 },
        'alteracoes_mama': { 'Ginecologista / Mastologista': 3 },
        'dor_urinar': { 'Ginecologista': 1, 'Urologista': 2 },
        'sangramento_vaginal': { 'Ginecologista': 3 },
        'atraso_menstrual': { 'Ginecologista': 2 },

        // === Urológicos ===
        'dor_testicular': { 'Urologista': 3 },
        'dificuldade_urinar': { 'Urologista': 2 },
        'sangue_urina_esperma': { 'Urologista': 3 },
        'jato_urinario_fraco': { 'Urologista': 2 },

        // === Oftalmológicos (Fonte: gov.br/saude - Doenças Oculares) ===
        'dor_ocular': { 'Oftalmologista': 3 },
        'olho_vermelho': { 'Oftalmologista': 2 },
        'secrecao_ocular': { 'Oftalmologista': 2, 'Clínico Geral / Infectologista': 1 },
        'perda_visao_subita': { 'Oftalmologista': 5, 'Neurologista': 3 },

        // === Hematológicos (Fonte: gov.br/saude - Doença Falciforme) ===
        'palidez': { 'Hematologista': 2, 'Clínico Geral / Infectologista': 1 },
        'hematomas_espontaneos': { 'Hematologista': 3 },
        'sangramento_gengival': { 'Hematologista': 2, 'Odontologista': 1 },
    };

    const scores = {};
    sintomas.forEach(sintoma => {
        const especialidades = mapaDePontos[sintoma];
        if (especialidades) {
            for (const esp in especialidades) {
                scores[esp] = (scores[esp] || 0) + especialidades[esp];
            }
        }
    });

    // === REGRAS COMBINADAS DE DOENÇAS (baseadas no gov.br/saude) ===

    // DENGUE clássica: febre + dor retro-ocular + dor muscular/articular + manchas
    if (sintomas.includes('febre') && sintomas.includes('dor_retro_ocular') &&
        (sintomas.includes('dor_muscular') || sintomas.includes('dor_articulacoes'))) {
        scores['Clínico Geral / Infectologista'] = (scores['Clínico Geral / Infectologista'] || 0) + 5;
    }

    // CHIKUNGUNYA: febre + dor articular intensa + manchas vermelhas
    if (sintomas.includes('febre') && sintomas.includes('dor_articulacoes') &&
        (sintomas.includes('manchas_vermelhas') || sintomas.includes('manchas_corpo'))) {
        scores['Clínico Geral / Infectologista'] = (scores['Clínico Geral / Infectologista'] || 0) + 4;
        scores['Reumatologista'] = (scores['Reumatologista'] || 0) + 2;
    }

    // DIABETES: sede + fome + urina frequente + perda de peso
    if (sintomas.includes('sede_excessiva') && sintomas.includes('fome_excessiva') &&
        (sintomas.includes('urina_frequente') || sintomas.includes('perda_peso'))) {
        scores['Endocrinologista'] = (scores['Endocrinologista'] || 0) + 5;
    }

    // ASMA: chiado + falta de ar + tosse seca (Fonte: gov.br/saude - Asma)
    if (sintomas.includes('chiado_peito') && sintomas.includes('falta_ar') && sintomas.includes('tosse')) {
        scores['Pneumologista'] = (scores['Pneumologista'] || 0) + 4;
    }

    // HIPERTENSÃO sintomática: dor cabeça + tontura + zumbido + visão turva
    if (sintomas.includes('dor_cabeca') && sintomas.includes('tontura_vertigem') &&
        (sintomas.includes('zumbido_ouvido') || sintomas.includes('visao_turva'))) {
        scores['Cardiologista'] = (scores['Cardiologista'] || 0) + 3;
    }

    // DEPRESSÃO: tristeza + perda de interesse + insônia + fadiga
    if (sintomas.includes('tristeza_apatia') && sintomas.includes('perda_interesse') &&
        (sintomas.includes('insonia') || sintomas.includes('cansaco_fadiga'))) {
        scores['Psiquiatra / Psicólogo'] = (scores['Psiquiatra / Psicólogo'] || 0) + 4;
    }

    // HEPATITE: icterícia + fadiga + urina escura + dor abdominal
    if (sintomas.includes('ictericia') && (sintomas.includes('urina_escura') || sintomas.includes('cansaco_fadiga'))) {
        scores['Gastroenterologista / Hepatologista'] = (scores['Gastroenterologista / Hepatologista'] || 0) + 5;
    }

    // HANSENÍASE: manchas dormentes + formigamento
    if (sintomas.includes('manchas_dormentes') && sintomas.includes('formigamento_dormencia')) {
        scores['Dermatologista'] = (scores['Dermatologista'] || 0) + 4;
        scores['Clínico Geral / Infectologista'] = (scores['Clínico Geral / Infectologista'] || 0) + 3;
    }

    // DOENÇA RENAL: edema + urina espumosa + fadiga
    if (sintomas.includes('edema_membros') && sintomas.includes('urina_espumosa')) {
        scores['Nefrologista'] = (scores['Nefrologista'] || 0) + 5;
    }

    // === ALERTA para pensamentos suicidas ===
    if (sintomas.includes('pensamentos_morte')) {
        return {
            especialidade: 'Psiquiatra / CAPS — CVV: Ligue 188',
            observacao: 'Pensamentos sobre morte ou suicídio requerem acolhimento imediato. Ligue 188 (CVV - Centro de Valorização da Vida) ou procure o CAPS mais próximo. Você não está sozinho(a).',
            urgente: true
        };
    }

    // === Determinar melhor especialidade ===
    let melhorEspecialidade = 'Clínico Geral / Médico de Família';
    let maiorScore = 0;
    for (const esp in scores) {
        if (scores[esp] > maiorScore) {
            maiorScore = scores[esp];
            melhorEspecialidade = esp;
        }
    }

    // Se pontuação baixa e muitas especialidades envolvidas, encaminhar para clínico geral
    if (maiorScore < 3 && Object.keys(scores).length > 2) {
        melhorEspecialidade = 'Clínico Geral / Médico de Família';
    }

    // Verificar se há sinais de alerta (não emergência, mas atenção)
    let alerta = false;
    let observacaoExtra = '';

    // Febre alta
    if (temperatura >= 39.5 && temperatura < 41) {
        alerta = true;
        observacaoExtra = ' Temperatura elevada (febre alta) — procure atendimento em breve.';
    }

    // PA elevada
    if (sistolica >= 160 || diastolica >= 100) {
        alerta = true;
        observacaoExtra += ' Pressão arterial elevada (Hipertensão Est. 2+) — procure atendimento.';
    }

    return {
        especialidade: melhorEspecialidade,
        observacao: `Com base nos sintomas informados, a especialidade mais indicada é ${melhorEspecialidade}. Um profissional de saúde fará a avaliação completa.${observacaoExtra}`,
        urgente: false,
        alerta: alerta
    };
}

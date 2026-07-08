/**
 * Quando Procurar o Hospital? — Guia para Leigos
 * Cenários do dia a dia com orientação clara
 */
document.addEventListener('DOMContentLoaded', function() {
    renderQuandoIr();
});

const cenarios = [
    {
        titulo: 'Dor de Cabeça',
        icon: '🤕',
        normal: ['Dor leve a moderada', 'Melhora com analgésico', 'Relacionada a estresse ou má postura', 'Já teve antes e é igual'],
        hospital: ['Pior dor de cabeça da vida (nunca sentiu igual)', 'Veio de repente, como um "estalo"', 'Acompanhada de febre alta + pescoço duro', 'Com fraqueza de um lado do corpo ou fala enrolada', 'Após pancada na cabeça'],
        dica: 'Cefaleia nova e intensa em pessoa > 50 anos, ou qualquer dor de cabeça com sintomas neurológicos, exige avaliação de emergência.'
    },
    {
        titulo: 'Febre',
        icon: '🌡️',
        normal: ['Febre baixa (< 38,5°C) com resfriado', 'Melhora com antitérmico', 'Sem outros sintomas preocupantes', 'Duração < 3 dias'],
        hospital: ['Febre > 39,5°C que não cede com remédio', 'Febre + manchas roxas no corpo', 'Febre + pescoço duro + confusão', 'Febre + falta de ar intensa', 'Febre em bebê < 3 meses (sempre!)', 'Febre > 7 dias sem diagnóstico'],
        dica: 'Febre isolada geralmente é viral. Mas febre + sinais de alerta (manchas, confusão, falta de ar) indica infecção grave — não espere.'
    },
    {
        titulo: 'Dor no Peito',
        icon: '💔',
        normal: ['Pontada rápida que muda com respiração/posição', 'Dor ao apertar o local (muscular)', 'Após exercício intenso (sem outros sintomas)', 'Azia após comer muito'],
        hospital: ['Dor em aperto/peso que não passa (> 20 min)', 'Dor que irradia para braço esquerdo ou mandíbula', 'Dor + suor frio + falta de ar', 'Dor + desmaio ou quase-desmaio', 'Dor "rasgante" muito intensa nas costas'],
        dica: 'Dor no peito em aperto + suor frio = possível infarto. Ligue SAMU 192 imediatamente. Cada minuto conta.'
    },
    {
        titulo: 'Falta de Ar',
        icon: '😮‍💨',
        normal: ['Após exercício intenso (passa com repouso)', 'Ansiedade (com formigamento nas mãos)', 'Nariz entupido por gripe/resfriado'],
        hospital: ['Falta de ar em repouso', 'Lábios ou dedos ficando roxos', 'Não consegue completar uma frase', 'Início súbito sem motivo', 'Falta de ar + inchaço nas pernas', 'Falta de ar + dor no peito'],
        dica: 'Se você ou alguém não consegue falar uma frase inteira sem parar para respirar, é emergência. Ligue 192.'
    },
    {
        titulo: 'Dor na Barriga',
        icon: '🤢',
        normal: ['Cólica após comer algo estragado', 'Dor leve com gases', 'Cólica menstrual habitual', 'Melhora com remédio/evacuação'],
        hospital: ['Barriga dura como tábua', 'Dor intensa + suor frio + desmaio', 'Vômito com sangue (vermelho ou borra de café)', 'Fezes com sangue vivo ou pretas', 'Dor que começou no umbigo e foi para o lado direito embaixo', 'Barriga muito inchada + sem evacuar/eliminar gases há > 24h'],
        dica: 'Barriga rígida ("em tábua") = cirurgia provável. Sangue no vômito ou nas fezes = endoscopia urgente. Não tome anti-inflamatórios com dor abdominal forte.'
    },
    {
        titulo: 'Desmaio',
        icon: '😵',
        normal: ['Desmaiou por ficar muito tempo em pé no calor', 'Desmaiou ao ver sangue / agulha (emocional)', 'Recuperou rápido e ficou normal'],
        hospital: ['Desmaiou durante exercício físico', 'Desmaiou sem aviso prévio (sem "escurecer" antes)', 'Desmaiou + coração batendo estranho', 'Bateu a cabeça ao cair', 'Histórico de doença no coração', 'Não voltou ao normal em poucos minutos'],
        dica: 'Desmaio durante esforço físico em jovem pode indicar problema cardíaco grave. Sempre investigar. Desmaio com palpitação = cardiologista urgente.'
    },
    {
        titulo: 'Febre em Criança',
        icon: '👶',
        normal: ['Febre baixa + resfriado leve', 'Criança brinca normalmente mesmo com febre', 'Febre após vacina (24-48h)'],
        hospital: ['Bebê < 3 meses com qualquer febre', 'Criança prostrada (não brinca, não interage)', 'Febre + manchas roxas', 'Febre + convulsão', 'Febre + falta de ar / dificuldade para respirar', 'Febre > 5 dias seguidos', 'Criança não aceita líquidos / sinais de desidratação'],
        dica: 'Bebê < 3 meses com febre = sempre emergência (risco de infecção grave). Criança prostrada preocupa mais que o número no termômetro.'
    },
    {
        titulo: 'Alergia / Urticária',
        icon: '🤧',
        normal: ['Placas vermelhas com coceira, mas só na pele', 'Espirros e nariz escorrendo (rinite)', 'Melhora com anti-histamínico'],
        hospital: ['Inchaço de lábios, língua ou garganta', 'Dificuldade para respirar / engolir', 'Placas + falta de ar + tontura (anafilaxia!)', 'Após picada de abelha/vespa com mal-estar', 'Reação após medicamento ou alimento + falta de ar'],
        dica: 'Alergia na pele = anti-histamínico e observar. Alergia com inchaço de garganta ou falta de ar = ANAFILAXIA = SAMU 192 AGORA. Use adrenalina se disponível.'
    }
];

function renderQuandoIr() {
    const container = document.getElementById('quando-ir-content');
    if (!container) return;

    container.innerHTML = `
        <div class="qi-header">
            <h2>🏠 Quando Procurar o Hospital?</h2>
            <p>Guia prático para saber quando um sintoma é preocupante. Em caso de dúvida, sempre procure ajuda médica.</p>
            <div class="qi-emergency-banner">
                <strong>📞 EMERGÊNCIA — Ligue imediatamente:</strong>
                <span>SAMU <strong>192</strong> • Bombeiros <strong>193</strong></span>
            </div>
        </div>
        <div class="qi-scenarios">
            ${cenarios.map(c => `
                <div class="qi-card">
                    <div class="qi-card-title">${c.icon} ${c.titulo}</div>
                    <div class="qi-columns">
                        <div class="qi-col qi-normal">
                            <h5>✅ Provavelmente pode esperar se:</h5>
                            <ul>${c.normal.map(n => `<li>${n}</li>`).join('')}</ul>
                        </div>
                        <div class="qi-col qi-urgent">
                            <h5>🚨 Vá ao hospital se:</h5>
                            <ul>${c.hospital.map(h => `<li>${h}</li>`).join('')}</ul>
                        </div>
                    </div>
                    <div class="qi-tip">💡 ${c.dica}</div>
                </div>
            `).join('')}
        </div>
    `;
}

/**
 * Primeiros Socorros — O que fazer antes da ambulância chegar
 */
document.addEventListener('DOMContentLoaded', function() {
    renderPrimeirosSocorros();
});

const procedimentos = [
    {
        titulo: 'Posição Lateral de Segurança',
        icon: '🛌',
        quando: 'Pessoa inconsciente mas respirando (após desmaio, convulsão, intoxicação)',
        passos: [
            'Verifique se a pessoa respira (olhe o peito subir e descer)',
            'Ajoelhe-se ao lado dela',
            'Coloque o braço mais próximo de você em ângulo reto (L)',
            'Pegue a mão do outro braço e encoste no rosto dela (do seu lado)',
            'Puxe o joelho de cima dobrando-o',
            'Role a pessoa suavemente para o seu lado',
            'Ajuste a cabeça para manter a via aérea aberta (queixo para cima)',
            'Ligue 192 e aguarde monitorando a respiração'
        ],
        naoFazer: ['NÃO dê água ou comida para pessoa inconsciente', 'NÃO coloque de barriga para cima se estiver vomitando', 'NÃO coloque travesseiro (fecha via aérea)']
    },
    {
        titulo: 'Engasgo (Manobra de Heimlich)',
        icon: '🫁',
        quando: 'Pessoa consciente que não consegue tossir, falar ou respirar (obstrução total)',
        passos: [
            'Pergunte: "Você está engasgando?" — se acenar sim, aja!',
            'Fique atrás da pessoa',
            'Feche o punho e coloque acima do umbigo (abaixo do osso do peito)',
            'Segure o punho com a outra mão',
            'Faça compressões rápidas para dentro e para cima (em J)',
            'Repita até o objeto sair ou a pessoa desmaiar',
            'Se desmaiar → deite no chão e inicie RCP (compressões torácicas)'
        ],
        naoFazer: ['NÃO dê tapas nas costas se a pessoa for adulta e a obstrução for total', 'NÃO tente pegar o objeto com o dedo (pode empurrar mais fundo)', 'Em BEBÊS: 5 tapas nas costas + 5 compressões no peito (técnica diferente!)']
    },
    {
        titulo: 'Convulsão — O que fazer',
        icon: '⚡',
        quando: 'Pessoa tendo movimentos involuntários rítmicos, perda de consciência, rigidez',
        passos: [
            'Mantenha a calma — a maioria das convulsões para sozinha em 1-3 minutos',
            'Afaste objetos perigosos ao redor (móveis, objetos cortantes)',
            'Coloque algo macio sob a cabeça (casaco, almofada)',
            'Vire de lado se possível (evita engasgo com saliva/vômito)',
            'Marque o tempo — se > 5 minutos, ligue 192',
            'Após parar: coloque em posição lateral de segurança',
            'Fique com a pessoa até ela se recuperar completamente'
        ],
        naoFazer: ['NÃO segure a pessoa nem tente impedir os movimentos', 'NÃO coloque nada na boca (ela NÃO vai engolir a língua!)', 'NÃO jogue água', 'NÃO tente dar remédio durante a crise']
    },
    {
        titulo: 'Sangramento Intenso',
        icon: '🩸',
        quando: 'Corte profundo com sangue em jato ou que não para, ferimentos graves',
        passos: [
            'Use luvas se disponível (proteção)',
            'Pressione o ferimento com firmeza usando pano limpo/gaze',
            'Mantenha a pressão constante — NÃO fique tirando para olhar',
            'Se o pano encharcar, coloque outro POR CIMA (não remova o primeiro)',
            'Eleve o membro acima do coração (se possível)',
            'Se sangue em jato (arterial): pressione mais forte e ligue 192 imediato',
            'Deite a pessoa se ela ficar pálida/tonta (previne choque)'
        ],
        naoFazer: ['NÃO use torniquete a menos que seja um sangramento de membro com risco de vida', 'NÃO remova objetos cravados (estabilize-os no local)', 'NÃO lave ferimentos que estão sangrando muito (pressão primeiro)']
    },
    {
        titulo: 'Queimaduras',
        icon: '🔥',
        quando: 'Contato com fogo, líquido quente, produtos químicos, eletricidade',
        passos: [
            'Afaste a pessoa da fonte de calor/perigo',
            'Resfrie a queimadura com água corrente FRIA (não gelada) por 20 minutos',
            'Remova anéis, pulseiras e roupas frouxas da área (antes de inchar)',
            'Cubra com pano limpo úmido ou filme plástico (protege sem grudar)',
            'Se a queimadura for grande (> que a palma da mão), ligue 192',
            'Queimadura no rosto, mãos, pés, genitais ou articulações = hospital sempre'
        ],
        naoFazer: ['NÃO use pasta de dente, manteiga, borra de café ou pomada caseira', 'NÃO estoure bolhas', 'NÃO use gelo direto (causa mais dano)', 'NÃO remova roupas grudadas na pele queimada']
    },
    {
        titulo: 'Suspeita de AVC (Derrame)',
        icon: '🧠',
        quando: 'Aparecimento súbito de: fraqueza de um lado, fala enrolada, boca torta',
        passos: [
            'Use o teste SAMU — Sorriso (torto?), Abraço (um braço cai?), Música (fala enrolada?), Urgente (ligue 192!)',
            'Anote a HORA que os sintomas começaram (fundamental para o tratamento)',
            'Mantenha a pessoa deitada com a cabeça levemente elevada',
            'NÃO dê nada para comer, beber ou engolir',
            'Se a pessoa vomitar, vire-a de lado',
            'Não dê medicamentos (aspirina pode piorar se for hemorrágico)',
            'Ligue 192 imediatamente — tempo é cérebro!'
        ],
        naoFazer: ['NÃO espere os sintomas passarem (cada minuto = neurônios morrendo)', 'NÃO dê aspirina/AAS (pode ser hemorrágico)', 'NÃO deixe a pessoa dormir sem avaliação médica']
    },
    {
        titulo: 'Suspeita de Infarto',
        icon: '❤️',
        quando: 'Dor em aperto/peso no peito > 20 min, suor frio, falta de ar, dor no braço/mandíbula',
        passos: [
            'Ligue 192 (SAMU) imediatamente',
            'Sente a pessoa em posição confortável (geralmente semi-sentada)',
            'Afrouxe roupas apertadas',
            'Se a pessoa não for alérgica: AAS 300mg mastigado (se disponível)',
            'Se tiver nitrato sublingual prescrito: use conforme orientação médica prévia',
            'Mantenha a pessoa calma e imóvel',
            'Se parar de respirar: inicie massagem cardíaca (RCP)'
        ],
        naoFazer: ['NÃO espere passar', 'NÃO leve de carro se puder chamar SAMU (tem equipamento)', 'NÃO dê água ou comida']
    },
    {
        titulo: 'RCP (Massagem Cardíaca) — Adulto',
        icon: '🫀',
        quando: 'Pessoa que não responde E não respira (ou apenas "gasps")',
        passos: [
            'Confirme: chacoalhe os ombros e grite "Você está bem?"',
            'Se não responde: peça alguém ligar 192 e buscar um DEA',
            'Deite a pessoa de costas em superfície dura',
            'Coloque a base da mão no centro do peito (entre os mamilos)',
            'Mão sobre mão, braços esticados, ombros acima das mãos',
            'Comprima FUNDO (5-6 cm) e RÁPIDO (100-120x por minuto)',
            'Deixe o peito voltar completamente entre cada compressão',
            'Não pare até: a pessoa reagir, o SAMU chegar, ou você não aguentar mais',
            'Se chegar um DEA: ligue e siga as instruções por voz'
        ],
        naoFazer: ['NÃO perca tempo verificando pulso (leigos não são confiáveis nisso)', 'NÃO tenha medo de machucar — costelas quebradas são aceitáveis se salvar a vida', 'NÃO pare para dar respiração boca-a-boca se não souber — compressões contínuas salvam']
    }
];

function renderPrimeirosSocorros() {
    const container = document.getElementById('primeiros-socorros-content');
    if (!container) return;

    container.innerHTML = `
        <div class="ps-header">
            <h2>🩹 Primeiros Socorros</h2>
            <p>O que fazer enquanto a ajuda profissional não chega. Ações simples que podem salvar vidas.</p>
            <div class="ps-emergency-banner">
                <strong>Em toda emergência: LIGUE 192 (SAMU) ou 193 (Bombeiros) PRIMEIRO</strong>
            </div>
        </div>
        <div class="ps-list">
            ${procedimentos.map(p => `
                <div class="ps-card">
                    <div class="ps-card-title">${p.icon} ${p.titulo}</div>
                    <p class="ps-quando"><strong>Quando:</strong> ${p.quando}</p>
                    <div class="ps-passos">
                        <h5>✅ O que fazer (passo a passo):</h5>
                        <ol>${p.passos.map(s => `<li>${s}</li>`).join('')}</ol>
                    </div>
                    <div class="ps-nao-fazer">
                        <h5>❌ O que NÃO fazer:</h5>
                        <ul>${p.naoFazer.map(n => `<li>${n}</li>`).join('')}</ul>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

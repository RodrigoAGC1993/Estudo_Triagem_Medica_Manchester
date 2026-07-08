/**
 * Tooltips Automáticos — Liga termos técnicos ao Dicionário
 * 
 * Varre o conteúdo visível e sublinha termos que existem no dicionário,
 * mostrando a definição ao passar o mouse / tocar.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Aguarda o dicionário carregar
    setTimeout(initTooltips, 500);
});

function initTooltips() {
    if (typeof dicionarioTermos === 'undefined') return;

    // Observar mudanças de aba para reaplicar tooltips
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(applyTooltips, 300);
        });
    });

    applyTooltips();
}

function applyTooltips() {
    if (typeof dicionarioTermos === 'undefined') return;

    // Construir regex com todos os termos (ordenados por comprimento desc para match mais longo primeiro)
    const terms = dicionarioTermos
        .map(t => t.term)
        .sort((a, b) => b.length - a.length);

    const escapedTerms = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp('\\b(' + escapedTerms.join('|') + ')\\b', 'gi');

    // Elementos onde aplicar tooltips (excluir inputs, scripts, etc)
    const containers = document.querySelectorAll('.tab-content.active p, .tab-content.active span, .tab-content.active td, .tab-content.active li, .tab-content.active .flow-conduct p, .tab-content.active .quiz-feedback p, .tab-content.active .case-feedback p, .tab-content.active #observacao, .tab-content.active #especialidade');

    containers.forEach(el => {
        // Não reprocessar elementos já com tooltips
        if (el.dataset.tooltipped === 'true') return;
        // Não processar dentro de inputs/selects
        if (el.closest('form') && !el.closest('#resultado')) return;

        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            if (node.parentElement.closest('.tooltip-term')) continue; // já processado
            if (node.textContent.trim().length > 2) {
                textNodes.push(node);
            }
        }

        textNodes.forEach(textNode => {
            const text = textNode.textContent;
            if (!regex.test(text)) return;
            regex.lastIndex = 0; // reset regex

            const fragment = document.createDocumentFragment();
            let lastIndex = 0;
            let match;

            regex.lastIndex = 0;
            while ((match = regex.exec(text)) !== null) {
                // Texto antes do match
                if (match.index > lastIndex) {
                    fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
                }

                // Criar tooltip span
                const termData = dicionarioTermos.find(t => t.term.toLowerCase() === match[0].toLowerCase());
                if (termData) {
                    const span = document.createElement('span');
                    span.className = 'tooltip-term';
                    span.textContent = match[0];
                    span.setAttribute('data-tooltip', termData.simple);
                    span.setAttribute('aria-label', termData.simple);
                    span.setAttribute('tabindex', '0');
                    fragment.appendChild(span);
                } else {
                    fragment.appendChild(document.createTextNode(match[0]));
                }

                lastIndex = regex.lastIndex;
            }

            // Texto restante
            if (lastIndex < text.length) {
                fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
            }

            if (fragment.childNodes.length > 0) {
                textNode.parentNode.replaceChild(fragment, textNode);
            }
        });

        el.dataset.tooltipped = 'true';
    });
}

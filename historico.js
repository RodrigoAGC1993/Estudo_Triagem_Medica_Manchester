/**
 * Histórico de Triagens — Salva resultados no localStorage
 */

document.addEventListener('DOMContentLoaded', function() {
    renderHistorico();
});

function salvarTriagem(dados) {
    const historico = JSON.parse(localStorage.getItem('historico_triagens') || '[]');
    const entry = {
        id: Date.now(),
        data: new Date().toLocaleString('pt-BR'),
        nome: document.getElementById('nome')?.value || 'Não informado',
        idade: document.getElementById('idade')?.value || '–',
        resultado: dados.especialidade,
        observacao: dados.observacao,
        urgente: dados.urgente || false,
        alerta: dados.alerta || false
    };
    historico.unshift(entry);
    // Manter máximo 20 registros
    if (historico.length > 20) historico.pop();
    localStorage.setItem('historico_triagens', JSON.stringify(historico));
    renderHistorico();
}

function renderHistorico() {
    const container = document.getElementById('historico-container');
    if (!container) return;
    const historico = JSON.parse(localStorage.getItem('historico_triagens') || '[]');

    if (historico.length === 0) {
        container.innerHTML = '<p class="hist-empty">Nenhuma triagem realizada ainda. Os resultados aparecerão aqui após realizar uma triagem.</p>';
        return;
    }

    container.innerHTML = `
        <div class="hist-actions">
            <span class="hist-count">${historico.length} registro${historico.length > 1 ? 's' : ''}</span>
            <button class="hist-clear-btn" onclick="limparHistorico()">🗑️ Limpar Histórico</button>
        </div>
        <div class="hist-list">
            ${historico.map(h => `
                <div class="hist-card ${h.urgente ? 'hist-danger' : h.alerta ? 'hist-warning' : 'hist-success'}">
                    <div class="hist-card-header">
                        <span class="hist-date">${h.data}</span>
                        <span class="hist-name">${h.nome}, ${h.idade} anos</span>
                    </div>
                    <p class="hist-result">${h.resultado}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function limparHistorico() {
    if (confirm('Tem certeza que deseja apagar todo o histórico?')) {
        localStorage.removeItem('historico_triagens');
        renderHistorico();
    }
}

/* ui.js — manipulação da interface: estados, resultado, categorias e cópia */
(function (App) {
  const $ = App.$, state = App.state;
  const ICON_COPY = '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>';
  const ICON_CHECK = '<path d="M20 6 9 17l-5-5"/>';

  App.ui = {
    // Alterna entre 'loading' | 'error' | 'app'
    show(name) {
      ['loading', 'error', 'app'].forEach(id => $(id).classList.toggle('hidden', id !== name));
    },

    // Preenche um <select> com [[valor, rótulo], ...]
    fill(sel, entries, val) {
      sel.innerHTML = entries.map(([k, l]) => `<option value="${k}">${l}</option>`).join('');
      if (val) sel.value = val;
    },

    setOut(text) {
      $('out').textContent = text;
      state.lastText = text;
    },

    renderCats() {
      $('cats').innerHTML = Object.keys(App.config.UNITS)
        .map(k => `<button class="chip" aria-pressed="${k === state.cat}" data-c="${k}">${k}</button>`)
        .join('');
    },

    async copyResult() {
      const text = state.lastText;
      if (!text || text === '—') return;
      try { await navigator.clipboard.writeText(text); }
      catch {
        const t = document.createElement('textarea');
        t.value = text; document.body.appendChild(t); t.select();
        document.execCommand('copy'); t.remove();
      }
      const b = $('copy');
      b.classList.add('ok'); $('ico').innerHTML = ICON_CHECK;
      setTimeout(() => { b.classList.remove('ok'); $('ico').innerHTML = ICON_COPY; }, 1600);
    }
  };
})(window.App);

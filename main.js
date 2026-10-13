/* main.js — ponto de entrada: alternância de abas, eventos e inicialização */
(function (App) {
  const $ = App.$, state = App.state;

  // Despacha para o conversor da aba ativa
  App.convert = () => (state.mode === 'cur' ? App.currency.convert() : App.units.convert());

  function setMode(m) {
    state.mode = m;
    $('tab-cur').setAttribute('aria-selected', m === 'cur');
    $('tab-unit').setAttribute('aria-selected', m === 'unit');
    $('cats').classList.toggle('hidden', m !== 'unit');

    if (m === 'unit') { App.ui.show('app'); App.units.setup(); }
    else if (state.rates) { App.ui.show('app'); App.currency.setup(); }
    else App.currency.load();
  }

  function bindEvents() {
    $('tab-cur').onclick = () => setMode('cur');
    $('tab-unit').onclick = () => setMode('unit');
    $('cats').onclick = e => {
      const c = e.target.dataset.c; if (!c) return;
      state.cat = c; App.ui.renderCats(); App.units.setup();
    };
    $('retry').onclick = App.currency.load;

    const amount = $('amount');
    amount.addEventListener('input', e => { e.target.value = App.sanitize(e.target.value); App.convert(); });
    amount.addEventListener('blur', e => {
      const n = App.parse(e.target.value);
      if (!isNaN(n)) e.target.value = App.fmtNum(n, state.mode === 'cur' ? 2 : 6);
    });
    amount.addEventListener('focus', e => e.target.select());

    $('from').onchange = $('to').onchange = App.convert;
    $('swap').onclick = () => {
      const f = $('from').value;
      $('from').value = $('to').value; $('to').value = f;
      $('swap').classList.toggle('spin');
      App.convert();
    };
    $('copy').onclick = App.ui.copyResult;
  }

  bindEvents();
  App.ui.renderCats();
  App.currency.load();
})(window.App);

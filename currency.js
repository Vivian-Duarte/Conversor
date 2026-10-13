/* currency.js — busca de cotações (API) e conversão de moedas */
(function (App) {
  const $ = App.$, state = App.state, { API, LOC } = App.config;

  App.currency = {
    async load() {
      App.ui.show('loading');
      try {
        const r = await fetch(API);
        if (!r.ok) throw new Error(r.status);
        const d = await r.json();
        state.rates = { EUR: 1, ...d.rates };
        state.apiDate = d.date;
        state.fetchedAt = new Date();
        App.currency.setup();
        App.ui.show('app');
      } catch (e) {
        console.error(e);
        App.ui.show('error');
      }
    },

    setup() {
      const names = new Intl.DisplayNames([LOC], { type: 'currency' });
      const list = Object.keys(state.rates).sort().map(c => [c, `${c} — ${names.of(c) || c}`]);
      const f = $('from').value || 'USD', t = $('to').value || 'BRL';
      App.ui.fill($('from'), list, state.rates[f] ? f : 'USD');
      App.ui.fill($('to'), list, state.rates[t] ? t : 'BRL');
      App.convert();
    },

    convert() {
      const v = App.parse($('amount').value), f = $('from').value, t = $('to').value;
      if (isNaN(v)) return App.ui.setOut('—');

      const res = v / state.rates[f] * state.rates[t];
      const unit = state.rates[t] / state.rates[f];
      let txt;
      try { txt = new Intl.NumberFormat(LOC, { style: 'currency', currency: t }).format(res); }
      catch { txt = App.fmtNum(res, 2) + ' ' + t; }

      App.ui.setOut(txt);
      $('rate').innerHTML = `1 ${f} = <b>${App.fmtNum(unit, 4)} ${t}</b>`;
      const when = state.fetchedAt.toLocaleString(LOC, { dateStyle: 'short', timeStyle: 'short' });
      $('upd').innerHTML = `<span class="dot"></span>Cotação de ${new Date(state.apiDate + 'T12:00').toLocaleDateString(LOC)} · consultada em ${when}`;
    }
  };
})(window.App);

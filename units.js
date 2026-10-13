/* units.js — conversão de unidades (comprimento, peso, temperatura, volume) */
(function (App) {
  const $ = App.$, state = App.state;
  const toC = { C: v => v, F: v => (v - 32) * 5 / 9, K: v => v - 273.15 };
  const fromC = { C: v => v, F: v => v * 9 / 5 + 32, K: v => v + 273.15 };

  App.units = {
    setup() {
      const c = App.config.UNITS[state.cat];
      const entries = Object.entries(c.u).map(([k, v]) => [k, v[0]]);
      App.ui.fill($('from'), entries, entries[0][0]);
      App.ui.fill($('to'), entries, entries[1] ? entries[1][0] : entries[0][0]);
      App.convert();
    },

    convert() {
      const v = App.parse($('amount').value), f = $('from').value, t = $('to').value;
      const c = App.config.UNITS[state.cat];
      if (isNaN(v)) return App.ui.setOut('—');

      const res = c.temp ? fromC[t](toC[f](v)) : v * c.u[f][1] / c.u[t][1];
      App.ui.setOut(App.fmtNum(res, 6));
      $('rate').innerHTML = c.temp
        ? `Categoria: <b>${state.cat}</b>`
        : `1 ${f} = <b>${App.fmtNum(c.u[f][1] / c.u[t][1], 6)} ${t}</b>`;
      $('upd').innerHTML = `<span class="dot"></span>Conversão instantânea · sem internet`;
    }
  };
})(window.App);

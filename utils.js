/* utils.js — funções auxiliares (DOM, parsing e formatação) */
(function (App) {
  const LOC = App.config.LOC;

  App.$ = id => document.getElementById(id);

  // "1.234,56" ou "1234.56" -> número
  App.parse = s => {
    const n = parseFloat(String(s).replace(/\./g, '').replace(',', '.'));
    return isFinite(n) ? n : NaN;
  };

  // Mantém só dígitos, vírgula, ponto e um "-" inicial
  App.sanitize = s => {
    s = s.replace(/[^\d.,-]/g, '');
    const neg = s.startsWith('-');
    return (neg ? '-' : '') + s.replace(/-/g, '');
  };

  App.fmtNum = (n, max = 6) => new Intl.NumberFormat(LOC, { maximumFractionDigits: max }).format(n);
})(window.App);

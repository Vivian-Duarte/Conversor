/* config.js — constantes, dados de unidades e estado global */
window.App = window.App || {};

App.config = {
  API: 'https://api.frankfurter.dev/v1/latest?base=EUR',
  LOC: 'pt-BR',

  // Fator para a unidade-base de cada categoria (temperatura usa funções em units.js)
  UNITS: {
    'Comprimento': { u:{ m:['Metro (m)',1], km:['Quilômetro (km)',1000], cm:['Centímetro (cm)',.01], mm:['Milímetro (mm)',.001], mi:['Milha (mi)',1609.344], ft:['Pé (ft)',.3048], in:['Polegada (in)',.0254], yd:['Jarda (yd)',.9144] }},
    'Peso': { u:{ kg:['Quilograma (kg)',1], g:['Grama (g)',.001], mg:['Miligrama (mg)',1e-6], t:['Tonelada (t)',1000], lb:['Libra (lb)',.45359237], oz:['Onça (oz)',.028349523] }},
    'Temperatura': { temp:true, u:{ C:['Celsius (°C)'], F:['Fahrenheit (°F)'], K:['Kelvin (K)'] }},
    'Volume': { u:{ l:['Litro (L)',1], ml:['Mililitro (mL)',.001], m3:['Metro cúbico (m³)',1000], gal:['Galão US (gal)',3.785411784], cup:['Xícara US',.2365882365] }}
  }
};

// Estado compartilhado entre os módulos
App.state = {
  mode: 'cur',            // 'cur' | 'unit'
  cat: 'Comprimento',     // categoria ativa em Unidades
  rates: null,            // taxas da API (base EUR)
  apiDate: null,          // data da cotação informada pela API
  fetchedAt: null,        // momento da consulta
  lastText: ''            // último resultado (para copiar)
};

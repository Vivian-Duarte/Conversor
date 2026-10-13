# Conversor de Moedas e Unidades

Aplicação web minimalista para converter **moedas em tempo real** e **unidades de medida**. Feita com HTML, CSS e JavaScript puros, sem dependências, build ou servidor.

## Funcionalidades

- **Conversor de Moedas** com cotações da [Frankfurter API](https://frankfurter.dev) (dados do Banco Central Europeu).
- **Conversor de Unidades** com quatro categorias: Comprimento, Peso, Temperatura e Volume.
- Conversão instantânea enquanto o usuário digita.
- Botão de **inverter** origem e destino (ex.: USD ➔ BRL vira BRL ➔ USD).
- Botão de **copiar** o resultado, com feedback visual (ícone de check).
- Estados de **carregamento** (spinner e skeleton) e de **erro** (com botão "Tentar novamente").
- Data da cotação e horário da última consulta.
- Formatação de números e moedas com `Intl.NumberFormat` (pt-BR).
- Layout **mobile-first** e responsivo, com acessibilidade básica (`aria-label`, `aria-live`, `role="tablist"`).

## Como executar

1. Baixe a pasta completa, mantendo `css/` e `js/` ao lado do `index.html`.
2. Abra o `index.html` no navegador (duplo clique).

É necessária conexão com a internet apenas para a aba **Moedas**. A aba **Unidades** funciona offline.

> Os scripts são clássicos (sem `import`/`export`) para que o projeto funcione direto via `file://`, já que navegadores bloqueiam módulos ES em arquivos locais.

## Estrutura do projeto

```
conversor/
├── index.html          # Estrutura (markup)
├── README.md
├── css/
│   └── styles.css      # Estilos; cores definidas em variáveis no :root
└── js/
    ├── config.js       # API, idioma, tabela de unidades e estado global
    ├── utils.js        # parse, sanitize e formatação de números
    ├── ui.js           # Estados de tela, selects, resultado e botão copiar
    ├── currency.js     # Busca de cotações e conversão de moedas
    ├── units.js        # Conversão de unidades e temperatura
    └── main.js         # Abas, eventos e inicialização
```

### Ordem de carregamento dos scripts

Os módulos compartilham o objeto global `App` e dependem uns dos outros, então a ordem no `index.html` importa:

```
config.js → utils.js → ui.js → currency.js → units.js → main.js
```

## Personalização

### Cores

Edite as variáveis no topo de `css/styles.css`:

| Variável | Uso | Valor atual |
|---|---|---|
| `--bg` / `--card` | Fundo e cartão | `#FFFFFF` |
| `--ink` / `--ink2` | Textos principais | `#0B2A33` / `#123A45` |
| `--mute` | Textos secundários | `#5B7480` |
| `--line` | Bordas | `#D9E4E8` |
| `--g` / `--g2` | Cor primária e hover (azul petróleo) | `#0F5C6E` / `#0A4756` |
| `--gs` | Fundo suave de estados ativos | `#E6F1F4` |
| `--err` / `--errbg` | Mensagem de erro | `#B91C1C` / `#FEF2F2` |

### Adicionar uma unidade ou categoria

Em `js/config.js`, dentro de `UNITS`, cada unidade segue o formato `chave: ['Rótulo', fator]`, onde o fator é o valor da unidade na unidade-base da categoria:

```js
'Comprimento': { u: {
  m:  ['Metro (m)', 1],        // unidade-base
  km: ['Quilômetro (km)', 1000]
}}
```

Para uma nova categoria, adicione outra chave em `UNITS`. Categorias com conversão não linear, como a temperatura, usam `temp: true` e funções próprias em `js/units.js`.

### Trocar a API de câmbio

1. Altere a constante `API` em `js/config.js`.
2. Ajuste `load()` em `js/currency.js` para ler o novo formato de resposta. O código espera `rates` (taxas em relação ao EUR) e `date`.

## Observações

- A Frankfurter atualiza as cotações **uma vez por dia útil**. A data exibida na tela é a da cotação, não de um tick em tempo real. Para atualizações mais frequentes, considere a AwesomeAPI, que cobre menos moedas.
- As conversões entre moedas são feitas por taxa cruzada usando o EUR como base.
- Se a API estiver offline, a aba Moedas mostra o estado de erro e a aba Unidades continua funcionando.

## Tecnologias

HTML5 · CSS3 (variáveis, grid, flexbox) · JavaScript (ES6+) · `fetch` · `Intl.NumberFormat` · `Intl.DisplayNames`

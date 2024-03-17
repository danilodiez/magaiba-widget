// Variables for easy customization
const API_URL =
  "https://api.dexscreener.com/latest/dex/tokens/A6rSPi9JmJgVkW6BatsA6MjFYLseizPM2Fnt92coFjf4";
// Cambiar arriba por tu exchange preferido (belo, ripio, lemoncash, buenbit, satoshitango, decrypto, letsbit, bybit)

// Fetch the exchange rate from the API
async function fetchExchangeRate() {
  let req = new Request(API_URL);
  let apiData = await req.loadJSON();
  return apiData.pairs[0].priceUsd;
}

// Create the widget
async function createWidget(exchangeRate) {
  let widget = new ListWidget();
  widget.backgroundColor = new Color("#1E2328");

  let titleText = "MAGAIBA 🚀";
  let title = widget.addText(titleText);
  title.textColor = new Color("#2975CB");
  title.font = Font.boldSystemFont(20);

  let exchangeName = widget.addText("DEX-SCREENER"); // Capitalize the exchange name
  exchangeName.textColor = Color.gray();
  exchangeName.font = Font.systemFont(14);

  widget.addSpacer();

  let askText =
    "$" + exchangeRate.toLocaleString("en-US", { minimumFractionDigits: 2 });
  let ask = widget.addText(askText);
  ask.textColor = Color.white();
  ask.font = Font.boldSystemFont(20);

  const owned = 85300;
  const revenue = parseFloat(exchangeRate) * owned;
  let totalAskText = `$ ${revenue}`;
  let totalAsk = widget.addText(totalAskText);
  totalAsk.textColor = revenue > 130 ? Color.green() : Color.red();
  totalAsk.font = Font.systemFont(14); // Making the font size similar to the exchange name

  return widget;
}

// Main
if (config.runsInWidget) {
  let exchangeRate = await fetchExchangeRate();
  let widget = await createWidget(exchangeRate);
  Script.setWidget(widget);
  Script.complete();
} else {
  // For testing purposes
  let exchangeRate = await fetchExchangeRate();
  let widget = await createWidget(exchangeRate);
  widget.presentSmall();
}

<script lang="ts">
  import { onMount } from "svelte";
  import { currencies } from "../assets/currencies";
  import doubleArrowIcon from "../assets/double-arrow-svgrepo-com.svg";

  let firstSelectedCurrency = "RUB";
  let secondSelectedCurrency = "USD";

  let firstValue = 0;
  let secondValue = 0;

  let conversionRates = null;

  async function getExchangeRate(baseCurrency) {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/dd7edc540fcda14c6b5222a2/latest/${baseCurrency}`
    );
    const data = await response.json();
    const rates = data.conversion_rates;
    if (rates) {
      return rates;
    } else {
      throw new Error(`Could not get exchange rate for ${baseCurrency}`);
    }
  }

  function convertFirstCurrencyIntoSecond(amount) {
    if (isNaN(amount)) {
      return 0;
    }
    const exchangeRate = conversionRates[secondSelectedCurrency];
    return Number(amount) * exchangeRate;
  }

  function convertSecondCurrencyIntoFirst(amount) {
    if (isNaN(amount)) {
      return 0;
    }
    const exchangeRate = conversionRates[secondSelectedCurrency];
    return Number(amount) / exchangeRate;
  }

  onMount(async () => {
    conversionRates = await getExchangeRate(firstSelectedCurrency);
  });

  async function firstCurrencyChangeHandler(e) {
    conversionRates = await getExchangeRate(e.target?.value);
    secondValue = convertFirstCurrencyIntoSecond(firstValue);
  }

  async function secondCurrencyChangeHandler(e) {
    secondValue = convertFirstCurrencyIntoSecond(firstValue);
  }

  function changeFirstValueHandler(e) {
    secondValue = convertFirstCurrencyIntoSecond(e.target?.value);
  }

  function changeSecondValueHandler(e) {
    firstValue = convertSecondCurrencyIntoFirst(e.target?.value);
  }

  function firstInputFocusHandler() {
    if (!firstValue) {
      firstValue = null;
    }
  }

  function secondInputFocusHandler() {
    if (!secondValue) {
      secondValue = null;
    }
  }

  function firstInputFocusLostHandler() {
    if (!firstValue) {
      firstValue = 0;
    }
  }

  function secondInputFocusLostHandler() {
    if (!secondValue) {
      secondValue = 0;
    }
  }
</script>

<div class="currencySelectorsBlock">
  <select
    bind:value={firstSelectedCurrency}
    on:change={firstCurrencyChangeHandler}
  >
    {#each currencies as currency (currency)}
      <option value={currency}>
        {currency}
      </option>
    {/each}
  </select>
  <img src={doubleArrowIcon} class="double-arrow-icon" alt="" />
  <select
    bind:value={secondSelectedCurrency}
    on:change={secondCurrencyChangeHandler}
  >
    {#each currencies as currency (currency)}
      <option value={currency}>
        {currency}
      </option>
    {/each}
  </select>
</div>
<div class="inputBlock">
  <input
    bind:value={firstValue}
    on:input={changeFirstValueHandler}
    on:focus={firstInputFocusHandler}
    on:blur={firstInputFocusLostHandler}
  />
  <input
    bind:value={secondValue}
    on:input={changeSecondValueHandler}
    on:focus={secondInputFocusHandler}
    on:blur={secondInputFocusLostHandler}
  />
</div>

<style>
  .currencySelectorsBlock {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 12rem;
  }
  .double-arrow-icon {
    height: 30px;
  }
  .inputBlock {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 12rem;
  }
  input {
    width: 5rem;
  }
</style>

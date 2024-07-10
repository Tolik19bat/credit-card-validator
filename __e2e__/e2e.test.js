const puppeteer = require('puppeteer');

describe('Credit Card Validator E2E Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // Поставьте true, если не нужен видимый браузер
      slowMo: 50, // Замедляем на 50ms чтобы видеть взаимодействие
    });
    page = await browser.newPage();
    await page.goto('http://localhost:9000'); // Убедитесь, что это ваш локальный сервер
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Valid card number validation', async () => {
    await page.type('.card-validator-widget__input', '5586200023405365');
    await page.click('.card-validator-widget__btn');
    await page.waitForSelector('.card-validator-widget__message.valid'); // Ждем, пока сообщение появится
    const message = await page.$eval('.card-validator-widget__message', el => el.textContent);
    expect(message).toBe('The card is valid, MasterCard payment system.');
  });

  test('Invalid card number validation', async () => {
    await page.type('.card-validator-widget__input', '5586200023405366');
    await page.click('.card-validator-widget__btn');
    await page.waitForSelector('.card-validator-widget__message.invalid'); // Ждем, пока сообщение появится
    const message = await page.$eval('.card-validator-widget__message', el => el.textContent);
    expect(message).toBe('The card is not valid');
  });
});

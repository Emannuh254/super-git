const puppeteer = require("puppeteer");
const fs = require("fs");

// Function to generate random email and password
function generateRandomCredentials() {
  const randomStr = Math.random().toString(36).substring(2, 10);
  const email = `user${randomStr}@gmail.com`;
  const password = `Pass@${randomStr}`;
  return { email, password };
}

// Function to save credentials to a JSON file
function saveCredentials(creds) {
  fs.writeFileSync("creds.json", JSON.stringify(creds, null, 2));
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Go to the registration page
  await page.goto("https://236779.app/#/register?ic=228392", {
    waitUntil: "networkidle2",
  });

  const credentials = [];
  const { email, password } = generateRandomCredentials();

  try {
    // Fill in the email
    await page.type('input[name="email"]', email);

    // Fill in the password and confirm password
    await page.type('input[name="password"]', password);
    await page.type('input[name="confirmPassword"]', password);

    // Enter the invitation code
    await page.type('input[name="invitationCode"]', "830999");

    // Click the signup button
    await page.click("button.signup");

    // Wait for navigation or confirmation
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    // Save the email and password to the credentials array
    credentials.push({ email, password });
  } catch (error) {
    console.error("An error occurred during registration:", error);
  } finally {
    // Save credentials to creds.json
    saveCredentials(credentials);

    // Close the browser
    await browser.close();
  }
})();
const toggleMenu = () => {
  const nav = document.querySelector(".navbar ul");
  nav.classList.toggle("show-menu");
};

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("menu-toggle");
  btn.addEventListener("click", toggleMenu);
});

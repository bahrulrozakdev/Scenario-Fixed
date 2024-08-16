const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

// Fungsi utilitas untuk menunggu
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async function fullTest() {
  // Inisialisasi driver Chrome
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    // **Tes Pendaftaran**
    console.log("Memulai tes pendaftaran...");

    // Buka halaman register
    await driver.get("http://localhost/newscode/register.php"); // Ganti dengan URL yang sesuai

    // Isi username
    let usernameInput = await driver.findElement(By.id("username"));
    await usernameInput.sendKeys("newuser"); // Ganti dengan username yang sesuai

    // Isi email
    let emailInput = await driver.findElement(By.id("email"));
    await emailInput.sendKeys("newuser@example.com"); // Ganti dengan email yang sesuai

    // Isi password
    let passwordInput = await driver.findElement(By.id("password"));
    await passwordInput.sendKeys("password123"); // Ganti dengan password yang sesuai

    // Isi confirmation password
    let confirmationPasswordInput = await driver.findElement(
      By.id("confirmation_password")
    );
    await confirmationPasswordInput.sendKeys("password123"); // Ganti dengan confirmation password yang sesuai

    // Klik tombol Register
    // let registerButton = await driver.findElement(
    //   By.css('button[type="submit"]')
    // );
    // await registerButton.click();

    // await driver.wait(until.elementLocated(By.css('button.btn.btn-primary.mt-3')), 10000);

    const registerButton = await driver.findElement(By.css('button.btn.btn-primary.mt-3'));
    await driver.actions().move({ origin: registerButton }).click().perform();

    // Tunggu beberapa detik untuk memastikan pendaftaran selesai
    await sleep(2000); // Tunggu 2 detik

    // Verifikasi hasil pendaftaran
    let bodyText = await driver.findElement(By.css("body")).getText();
    if (bodyText.includes("Registrasi berhasil!")) {
      console.log("Registrasi berhasil!");
    } else if (bodyText.includes("Email sudah terdaftar!")) {
      console.log("Email sudah terdaftar!");
      return; // Jika email sudah terdaftar, hentikan tes
    } else {
      console.log("Registrasi gagal!");
      return; // Jika registrasi gagal, hentikan tes
    }

    // **Tes Login**
    console.log("Memulai tes login...");

    // Buka halaman login
    await driver.get("http://localhost/newscode/login.php"); // Ganti dengan URL yang sesuai

    // Isi email
    let loginEmailInput = await driver.findElement(By.id("email"));
    await loginEmailInput.sendKeys("newuser@example.com"); // Ganti dengan email yang sesuai

    // Isi password
    let loginPasswordInput = await driver.findElement(By.id("password"));
    await loginPasswordInput.sendKeys("password123"); // Ganti dengan password yang sesuai

    // Klik tombol Login
    // let loginButton = await driver.findElement(By.css('button[type="submit"]'));
    // await loginButton.click();

    const loginButton = await driver.findElement(By.css('button.btn.btn-primary'));
    await driver.actions().move({ origin: loginButton }).click().perform();


    // Tunggu beberapa detik untuk memastikan login selesai
    await sleep(2000); // Tunggu 2 detik

    // Tunggu redirect ke dashboard
    await driver.wait(until.urlContains("dashboard.php"), 10000); // Ganti dengan URL dashboard yang sesuai

    // **Tes Dashboard**
    console.log("Memulai tes dashboard...");

    // Tunggu hingga elemen berita muncul di halaman
    let newsContainer = await driver.findElement(By.css("#news-container"));
    await driver.wait(until.elementIsVisible(newsContainer), 15000); // Tunggu hingga container berita terlihat

    // Tunggu hingga berita dimuat
    await driver.wait(async function () {
      const newsCards = await driver.findElements(
        By.css("#news-container .card")
      );
      return newsCards.length > 0; // Pastikan ada setidaknya satu berita
    }, 15000); // Waktu tunggu 15 detik untuk memuat berita

    // Verifikasi ada di dashboard
    let headingText = await driver
      .findElement(By.css("section#home h2"))
      .getText();
    if (headingText === "Home") {
      console.log("Berada di halaman dashboard!");
    } else {
      console.log("Tidak berada di halaman dashboard!");
    }

    // Verifikasi adanya berita
    let newsCards = await driver.findElements(By.css("#news-container .card"));
    if (newsCards.length > 0) {
      console.log("Berita ditampilkan dengan benar di dashboard.");
    } else {
      console.log("Tidak ada berita yang ditampilkan di dashboard.");
    }

    // **Tes Navigasi ke Halaman About Us**
    console.log("Memulai tes navigasi ke About Us...");

    // Klik link "About Us"
    let aboutUsLink = await driver.findElement(By.linkText("About Us"));
    await aboutUsLink.click();

    // Tunggu beberapa detik untuk memastikan halaman About Us dimuat
    await sleep(2000); // Tunggu 2 detik

    // Verifikasi berada di halaman About Us
    await driver.wait(until.urlContains("about.php"), 10000); // Ganti dengan URL about yang sesuai

    // Verifikasi konten halaman About Us
    let aboutHeadingText = await driver
      .findElement(By.css("section#home h2"))
      .getText();
    if (aboutHeadingText === "About") {
      console.log("Berada di halaman About Us!");
    } else {
      console.log("Tidak berada di halaman About Us!");
    }

    let aboutContent = await driver.findElement(By.css("div.detail")).getText();
    if (aboutContent.includes("About Our Company")) {
      console.log("Konten halaman About Us ditampilkan dengan benar.");
    } else {
      console.log("Konten halaman About Us tidak ditampilkan dengan benar.");
    }

    // **Tes Navigasi ke Halaman Contact Us**
    console.log("Memulai tes navigasi ke Contact Us...");

    // Klik link "Contact Us"
    let contactUsLink = await driver.findElement(By.linkText("Contact Us"));
    await contactUsLink.click();

    // Tunggu beberapa detik untuk memastikan halaman Contact Us dimuat
    await sleep(2000); // Tunggu 2 detik

    // Verifikasi berada di halaman Contact Us
    await driver.wait(until.urlContains("contact.php"), 10000); // Ganti dengan URL contact yang sesuai

    // Verifikasi konten halaman Contact Us
    let contactHeadingText = await driver
      .findElement(By.css("section#home h2"))
      .getText();
    if (contactHeadingText === "Contact Us") {
      console.log("Berada di halaman Contact Us!");
    } else {
      console.log("Tidak berada di halaman Contact Us!");
    }

    // **Isi dan Kirim Formulir Kontak**
    console.log("Memulai tes formulir kontak...");

    // Isi username
    let contactUsernameInput = await driver.findElement(By.id("username"));
    await contactUsernameInput.sendKeys("tester"); // Ganti dengan nama pengguna yang sesuai

    // Isi email
    let contactEmailInput = await driver.findElement(By.id("email"));
    await contactEmailInput.sendKeys("tester@example.com"); // Ganti dengan email yang sesuai

    // Isi pesan
    let contactMessageInput = await driver.findElement(By.id("message"));
    await contactMessageInput.sendKeys("This is a test message."); // Ganti dengan pesan yang sesuai

    // Klik tombol Send Email
    let sendButton = await driver.findElement(By.css('button[type="submit"]'));
    await sendButton.click();

    // Tunggu beberapa detik untuk memastikan formulir dikirim
    await sleep(2000); // Tunggu 2 detik

    try {
      // Tunggu hingga alert muncul
      let alert = await driver.switchTo().alert();
      let alertMessage = await alert.getText();
      console.log("Pesan dari alert:", alertMessage);
      await alert.accept(); // Klik tombol OK pada alert

      // Melanjutkan ke logout setelah alert
      console.log("Melanjutkan ke logout...");

      // Klik tombol "Logout"
      let logoutButton = await driver.findElement(By.linkText("Logout"));
      await logoutButton.click();

      // Tunggu beberapa detik untuk memastikan logout selesai
      await sleep(2000); // Tunggu 2 detik

      // Verifikasi berada di halaman login setelah logout
      await driver.wait(until.urlContains("login.php"), 10000); // Ganti dengan URL login yang sesuai

      // Verifikasi apakah halaman login terlihat
      let loginHeadingText = await driver.findElement(By.css("h2")).getText();
      if (loginHeadingText === "Login") {
        console.log("Berhasil logout dan berada di halaman login!");
      } else {
        console.log("Gagal logout atau tidak berada di halaman login.");
      }
    } catch (err) {
      // Jika tidak ada alert, lanjutkan ke logout langsung
      console.log("Tidak ada alert, lanjutkan ke logout...");

      // Klik tombol "Logout"
      let logoutButton = await driver.findElement(By.linkText("Logout"));
      await logoutButton.click();

      // Tunggu beberapa detik untuk memastikan logout selesai
      await sleep(2000); // Tunggu 2 detik

      // Verifikasi berada di halaman login setelah logout
      // Verifikasi berada di halaman login setelah logout
      await driver.wait(until.urlContains("login.php"), 10000); // Ganti dengan URL login yang sesuai

      // Verifikasi apakah halaman login terlihat
      let loginHeadingText = await driver.findElement(By.css("h2")).getText();
      if (loginHeadingText === "Login") {
        console.log("Berhasil logout dan berada di halaman login!");
      } else {
        console.log("Gagal logout atau tidak berada di halaman login.");
      }
    }
  } finally {
    // Menutup driver
    await driver.quit();
  }
})();

// src/validators/tckn.ts
var DEFAULT_OPTIONS = {
  emptyError: "TCKN 11 haneli olmal\u0131d\u0131r",
  tooShortError: "TCKN 11 haneli olmal\u0131d\u0131r",
  tooLongError: "TCKN 11 haneli olmal\u0131d\u0131r",
  firstDigitZeroError: "Ge\xE7ersiz TC Kimlik No",
  invalidAlgorithmError: "Ge\xE7ersiz TC Kimlik No",
  notDigitsError: "TCKN sadece rakamlardan olu\u015Fmal\u0131d\u0131r"
};
function validateTCKN(tckn, options) {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const fail = (error) => ({
    isValid: false,
    error
  });
  if (!tckn) {
    return fail(opts.emptyError);
  }
  if (tckn.length > 11) {
    return fail(opts.tooLongError);
  }
  if (tckn.length < 11) {
    return fail(opts.tooShortError);
  }
  if (tckn[0] === "0") {
    return fail(opts.firstDigitZeroError);
  }
  if (!/^\d+$/.test(tckn)) {
    return fail(opts.notDigitsError);
  }
  const digits = tckn.split("").map(Number);
  let oddSum = 0;
  let evenSum = 0;
  for (let i = 0; i < 9; i++) {
    if (i % 2 === 0) {
      oddSum += digits[i];
    } else {
      evenSum += digits[i];
    }
  }
  let checkDigit1 = (oddSum * 7 - evenSum) % 10;
  if (checkDigit1 < 0) {
    checkDigit1 += 10;
  }
  if (checkDigit1 !== digits[9]) {
    return fail(opts.invalidAlgorithmError);
  }
  const sumOfFirstTen = digits.slice(0, 10).reduce((sum, digit) => sum + digit, 0);
  const checkDigit2 = sumOfFirstTen % 10;
  if (checkDigit2 !== digits[10]) {
    return fail(opts.invalidAlgorithmError);
  }
  return {
    isValid: true
  };
}

// src/validators/phone.ts
function cleanPhoneNumber(phone) {
  return phone.replace(/[\s\-\(\)\+]/g, "").replace(/^90/, "0");
}
function validateTurkishPhone(phone) {
  const fail = (message) => ({
    valid: false,
    formatted: null,
    message
  });
  if (!phone || phone.trim() === "") {
    return fail("Telefon numaras\u0131 bo\u015F olamaz");
  }
  const cleaned = cleanPhoneNumber(phone);
  if (!/^\d+$/.test(cleaned)) {
    return fail("Telefon numaras\u0131 sadece rakam i\xE7ermelidir");
  }
  if (cleaned.length < 11) {
    return fail("Telefon numaras\u0131 11 haneli olmal\u0131d\u0131r");
  }
  if (cleaned.length > 11) {
    return fail("Telefon numaras\u0131 11 haneden uzun olamaz");
  }
  if (cleaned[0] !== "0") {
    return fail("Telefon numaras\u0131 0 ile ba\u015Flamal\u0131d\u0131r");
  }
  if (cleaned[1] !== "5") {
    return fail("Sadece cep telefonu numaralar\u0131 kabul edilir (5XX)");
  }
  const formatted = `+90${cleaned.substring(1)}`;
  return {
    valid: true,
    formatted,
    message: "Ge\xE7erli telefon numaras\u0131"
  };
}

// src/validators/taxNo.ts
function cleanTaxNo(taxNo) {
  return taxNo.replace(/[\s\-]/g, "");
}
function formatTaxNo(taxNo) {
  if (taxNo.length !== 10) {
    return taxNo;
  }
  return `${taxNo.substring(0, 3)}-${taxNo.substring(3, 6)}-${taxNo.substring(
    6,
    9
  )}-${taxNo.substring(9)}`;
}
function formatTaxNoFunction(taxNo) {
  const cleaned = cleanTaxNo(taxNo);
  return formatTaxNo(cleaned);
}
function validateTaxNo(taxNo, options = {}) {
  const fail = (message) => ({
    valid: false,
    formatted: null,
    message,
    checksum: null
  });
  const failWithChecksum = (message) => ({
    valid: false,
    formatted: null,
    message,
    checksum: false
  });
  if (!taxNo || taxNo.trim() === "") {
    return fail("Vergi numaras\u0131 bo\u015F olamaz");
  }
  const cleaned = cleanTaxNo(taxNo);
  if (!/^\d+$/.test(cleaned)) {
    return fail("Vergi numaras\u0131 sadece rakam i\xE7ermelidir");
  }
  if (cleaned.length < 10) {
    return fail("Vergi numaras\u0131 10 haneli olmal\u0131d\u0131r");
  }
  if (cleaned.length > 10) {
    return fail("Vergi numaras\u0131 10 haneden uzun olamaz");
  }
  const isCorporate = options.isCorporate ?? false;
  if (!isCorporate && cleaned[0] === "0") {
    return fail("Vergi numaras\u0131 0 ile ba\u015Flayamaz");
  }
  const digits = cleaned.split("").map(Number);
  const tempValues = [];
  for (let i = 0; i < 9; i++) {
    const digit = digits[i];
    let value = (digit + (10 - i)) % 10;
    if (value === 9) {
      value = 0;
    }
    tempValues.push(value);
  }
  const total = tempValues.reduce((sum, value) => sum + value, 0);
  const checkDigit = (10 - total % 10) % 10;
  const checksumValid = checkDigit === digits[9];
  if (!checksumValid) {
    return failWithChecksum("Ge\xE7ersiz vergi numaras\u0131");
  }
  return {
    valid: true,
    formatted: formatTaxNo(cleaned),
    message: "Ge\xE7erli vergi numaras\u0131",
    checksum: true
  };
}

// src/validators/plate.ts
var CITY_CODES = {
  "01": "Adana",
  "02": "Ad\u0131yaman",
  "03": "Afyonkarahisar",
  "04": "A\u011Fr\u0131",
  "05": "Amasya",
  "06": "Ankara",
  "07": "Antalya",
  "08": "Artvin",
  "09": "Ayd\u0131n",
  "10": "Bal\u0131kesir",
  "11": "Bilecik",
  "12": "Bing\xF6l",
  "13": "Bitlis",
  "14": "Bolu",
  "15": "Burdur",
  "16": "Bursa",
  "17": "\xC7anakkale",
  "18": "\xC7ank\u0131r\u0131",
  "19": "\xC7orum",
  "20": "Denizli",
  "21": "Diyarbak\u0131r",
  "22": "Edirne",
  "23": "Elaz\u0131\u011F",
  "24": "Erzincan",
  "25": "Erzurum",
  "26": "Eski\u015Fehir",
  "27": "Gaziantep",
  "28": "Giresun",
  "29": "G\xFCm\xFC\u015Fhane",
  "30": "Hakkari",
  "31": "Hatay",
  "32": "Isparta",
  "33": "Mersin",
  "34": "\u0130stanbul",
  "35": "\u0130zmir",
  "36": "Kars",
  "37": "Kastamonu",
  "38": "Kayseri",
  "39": "K\u0131rklareli",
  "40": "K\u0131r\u015Fehir",
  "41": "Kocaeli",
  "42": "Konya",
  "43": "K\xFCtahya",
  "44": "Malatya",
  "45": "Manisa",
  "46": "Kahramanmara\u015F",
  "47": "Mardin",
  "48": "Mu\u011Fla",
  "49": "Mu\u015F",
  "50": "Nev\u015Fehir",
  "51": "Ni\u011Fde",
  "52": "Ordu",
  "53": "Rize",
  "54": "Sakarya",
  "55": "Samsun",
  "56": "Siirt",
  "57": "Sinop",
  "58": "Sivas",
  "59": "Tekirda\u011F",
  "60": "Tokat",
  "61": "Trabzon",
  "62": "Tunceli",
  "63": "\u015Eanl\u0131urfa",
  "64": "U\u015Fak",
  "65": "Van",
  "66": "Yozgat",
  "67": "Zonguldak",
  "68": "Aksaray",
  "69": "Bayburt",
  "70": "Karaman",
  "71": "K\u0131r\u0131kkale",
  "72": "Batman",
  "73": "\u015E\u0131rnak",
  "74": "Bart\u0131n",
  "75": "Ardahan",
  "76": "I\u011Fd\u0131r",
  "77": "Yalova",
  "78": "Karab\xFCk",
  "79": "Kilis",
  "80": "Osmaniye",
  "81": "D\xFCzce"
};
function normalizePlate(plate) {
  return plate.replace(/[\s\-]/g, "").trim().toUpperCase();
}
function parsePlate(plate) {
  const normalized = normalizePlate(plate);
  const cityCodeMatch = normalized.match(/^(\d{1,2})/);
  if (!cityCodeMatch) {
    return {
      cityCode: null,
      letters: null,
      numbers: null,
      error: "\u0130l kodu 2 rakamdan olu\u015Fmal\u0131d\u0131r"
    };
  }
  let cityCode = cityCodeMatch[1];
  if (cityCode.length === 1) {
    cityCode = `0${cityCode}`;
  }
  const remaining = normalized.substring(cityCodeMatch[0].length);
  const letterMatch = remaining.match(/^([A-ZÇĞİÖŞÜ]{1,10})/);
  if (!letterMatch) {
    return {
      cityCode,
      letters: null,
      numbers: null,
      error: "Plaka harf k\u0131sm\u0131 bulunamad\u0131"
    };
  }
  const letters = letterMatch[1];
  const numberMatch = remaining.substring(letters.length).match(/^(\d{1,10})/);
  if (!numberMatch) {
    return {
      cityCode,
      letters,
      numbers: null,
      error: "Plaka rakam k\u0131sm\u0131 bulunamad\u0131"
    };
  }
  const numbers = numberMatch[1];
  if (remaining.length !== letters.length + numbers.length) {
    return {
      cityCode,
      letters,
      numbers,
      error: "Plaka format\u0131 ge\xE7ersiz"
    };
  }
  return { cityCode, letters, numbers, error: null };
}
function getPlateType(letterLength, numberLength) {
  if (numberLength === 2 || numberLength === 3) {
    return "Motosiklet";
  }
  if (letterLength === 3) {
    return "Standart";
  }
  if (letterLength === 2) {
    return "Eski Tip";
  }
  if (letterLength === 1) {
    return "\xC7ok Eski Tip";
  }
  return "Bilinmeyen";
}
function validateTurkishPlate(plate) {
  const fail = (message) => ({
    valid: false,
    formatted: null,
    cityCode: null,
    cityName: null,
    letters: null,
    numbers: null,
    plateType: null,
    message
  });
  if (!plate || plate.trim() === "") {
    return fail("Plaka bo\u015F olamaz");
  }
  const parsed = parsePlate(plate);
  if (parsed.error) {
    return fail(parsed.error);
  }
  if (!parsed.cityCode || !parsed.letters || !parsed.numbers) {
    return fail("Plaka format\u0131 ge\xE7ersiz");
  }
  const { cityCode, letters, numbers } = parsed;
  if (!/^\d{2}$/.test(cityCode)) {
    return fail("\u0130l kodu 2 rakamdan olu\u015Fmal\u0131d\u0131r");
  }
  const cityCodeNum = parseInt(cityCode, 10);
  if (cityCodeNum < 1 || cityCodeNum > 81) {
    return fail("\u0130l kodu 01-81 aras\u0131 olmal\u0131d\u0131r");
  }
  const cityName = CITY_CODES[cityCode] || null;
  if (letters.length < 1 || letters.length > 3) {
    return fail("Harf k\u0131sm\u0131 1-3 karakter olmal\u0131d\u0131r");
  }
  const forbiddenLetters = ["\xC7", "\u011E", "\u0130", "\xD6", "\u015E", "\xDC", "Q", "W", "X"];
  for (const letter of letters) {
    if (forbiddenLetters.includes(letter)) {
      return fail(`Plakada kullan\u0131lamayan harf: ${letter}`);
    }
  }
  if (numbers.length < 2 || numbers.length > 4) {
    return fail("Rakam k\u0131sm\u0131 2-4 hane olmal\u0131d\u0131r");
  }
  const formatted = `${cityCode} ${letters} ${numbers}`;
  const plateType = getPlateType(letters.length, numbers.length);
  return {
    valid: true,
    formatted,
    cityCode,
    cityName,
    letters,
    numbers,
    plateType,
    message: "Ge\xE7erli plaka"
  };
}

// src/validators/iban.ts
var BANK_CODES = {
  "00001": "T.C. Ziraat Bankas\u0131",
  "00010": "T\xFCrkiye Cumhuriyeti Ziraat Bankas\u0131 A.\u015E.",
  "00012": "T\xFCrkiye Halk Bankas\u0131 A.\u015E.",
  "00015": "T\xFCrkiye Vak\u0131flar Bankas\u0131 T.A.O.",
  "00032": "T\xFCrk Ekonomi Bankas\u0131 A.\u015E.",
  "00046": "Akbank T.A.\u015E.",
  "00059": "\u015Eekerbank T.A.\u015E.",
  "00062": "T\xFCrkiye Garanti Bankas\u0131 A.\u015E.",
  "00061": "T\xFCrkiye \u0130\u015F Bankas\u0131 A.\u015E.",
  "00064": "T\xFCrkiye \u0130\u015F Bankas\u0131 A.\u015E. (Alternative)",
  "00067": "Yap\u0131 ve Kredi Bankas\u0131 A.\u015E.",
  "00091": "T\xFCrk Ekonomi Bankas\u0131 A.\u015E. (TEB)",
  "00096": "T\xFCrkiye Finans Kat\u0131l\u0131m Bankas\u0131 A.\u015E.",
  "00099": "ING Bank A.\u015E.",
  "00103": "Fibabanka A.\u015E.",
  "00108": "T\xFCrkiye Kalk\u0131nma Bankas\u0131 A.\u015E.",
  "00111": "QNB Finansbank A.\u015E.",
  "00123": "Odea Bank A.\u015E.",
  "00124": "Denizbank A.\u015E.",
  "00134": "Kuveyt T\xFCrk Kat\u0131l\u0131m Bankas\u0131 A.\u015E.",
  "00143": "Albaraka T\xFCrk Kat\u0131l\u0131m Bankas\u0131 A.\u015E.",
  "00146": "Vak\u0131f Kat\u0131l\u0131m Bankas\u0131 A.\u015E.",
  "00203": "Ziraat Kat\u0131l\u0131m Bankas\u0131 A.\u015E.",
  "00206": "QNB Finans Portf\xF6y Y\xF6netimi A.\u015E.",
  "00209": "Alternatif Bank A.\u015E."
};
function cleanIBAN(iban) {
  return iban.replace(/[\s\-]/g, "").toUpperCase();
}
function mod97(iban) {
  const rearranged = iban.substring(4) + iban.substring(0, 4);
  const numericString = rearranged.replace(/[A-Z]/g, (char) => {
    return (char.charCodeAt(0) - 55).toString();
  });
  let remainder = BigInt(0);
  for (let i = 0; i < numericString.length; i++) {
    remainder = (remainder * BigInt(10) + BigInt(numericString[i])) % BigInt(97);
  }
  return Number(remainder);
}
function calculateCheckDigit(bankCode, reserveDigit, accountNumber) {
  const ibanWithoutCheck = "TR00" + bankCode + reserveDigit + accountNumber;
  const remainder = mod97(ibanWithoutCheck);
  const checkDigit = 98 - remainder;
  return checkDigit.toString().padStart(2, "0");
}
function getBankName(bankCode) {
  return BANK_CODES[bankCode] || null;
}
function formatIBAN(iban) {
  const cleaned = cleanIBAN(iban);
  if (cleaned.length !== 26) {
    return iban;
  }
  return `${cleaned.substring(0, 4)} ${cleaned.substring(
    4,
    8
  )} ${cleaned.substring(8, 12)} ${cleaned.substring(
    12,
    16
  )} ${cleaned.substring(16, 20)} ${cleaned.substring(
    20,
    24
  )} ${cleaned.substring(24, 26)}`;
}
function validateTurkishIBAN(iban) {
  const fail = (message) => ({
    valid: false,
    formatted: null,
    bankCode: null,
    bankName: null,
    accountNumber: null,
    checkDigits: null,
    checksumValid: null,
    message
  });
  const failWithChecksum = (message, checkDigits2) => ({
    valid: false,
    formatted: null,
    bankCode: null,
    bankName: null,
    accountNumber: null,
    checkDigits: checkDigits2,
    checksumValid: false,
    message
  });
  if (!iban || iban.trim() === "") {
    return fail("IBAN bo\u015F olamaz");
  }
  const cleaned = cleanIBAN(iban);
  if (cleaned.length < 2 || !cleaned.startsWith("TR")) {
    if (!cleaned.startsWith("TR") && cleaned.length >= 2) {
      return fail("IBAN TR ile ba\u015Flamal\u0131d\u0131r");
    }
  }
  if (!cleaned.startsWith("TR")) {
    return fail("IBAN TR ile ba\u015Flamal\u0131d\u0131r");
  }
  if (cleaned.length !== 26) {
    return fail("IBAN 26 karakter olmal\u0131d\u0131r");
  }
  const remaining = cleaned.substring(2);
  if (!/^\d{24}$/.test(remaining)) {
    return fail("IBAN TR sonras\u0131 sadece rakam i\xE7ermelidir");
  }
  const checkDigits = cleaned.substring(2, 4);
  const bankCode = cleaned.substring(4, 9);
  const accountNumber = cleaned.substring(10, 26);
  const remainder = mod97(cleaned);
  const checksumValid = remainder === 1;
  if (!checksumValid) {
    return failWithChecksum("Ge\xE7ersiz IBAN", checkDigits);
  }
  const bankName = getBankName(bankCode);
  const formatted = formatIBAN(cleaned);
  return {
    valid: true,
    formatted,
    bankCode,
    bankName,
    accountNumber,
    checkDigits,
    checksumValid: true,
    message: "Ge\xE7erli IBAN"
  };
}

export { calculateCheckDigit, formatIBAN, formatTaxNoFunction, getBankName, validateTCKN, validateTaxNo, validateTurkishIBAN, validateTurkishPhone, validateTurkishPlate };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
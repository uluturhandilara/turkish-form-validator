export interface PlateValidationResult {
  valid: boolean;
  formatted: string | null;
  cityCode: string | null;
  cityName: string | null;
  letters: string | null;
  numbers: string | null;
  plateType: string | null;
  message: string;
}

const CITY_CODES: Record<string, string> = {
  "01": "Adana",
  "02": "Adıyaman",
  "03": "Afyonkarahisar",
  "04": "Ağrı",
  "05": "Amasya",
  "06": "Ankara",
  "07": "Antalya",
  "08": "Artvin",
  "09": "Aydın",
  "10": "Balıkesir",
  "11": "Bilecik",
  "12": "Bingöl",
  "13": "Bitlis",
  "14": "Bolu",
  "15": "Burdur",
  "16": "Bursa",
  "17": "Çanakkale",
  "18": "Çankırı",
  "19": "Çorum",
  "20": "Denizli",
  "21": "Diyarbakır",
  "22": "Edirne",
  "23": "Elazığ",
  "24": "Erzincan",
  "25": "Erzurum",
  "26": "Eskişehir",
  "27": "Gaziantep",
  "28": "Giresun",
  "29": "Gümüşhane",
  "30": "Hakkari",
  "31": "Hatay",
  "32": "Isparta",
  "33": "Mersin",
  "34": "İstanbul",
  "35": "İzmir",
  "36": "Kars",
  "37": "Kastamonu",
  "38": "Kayseri",
  "39": "Kırklareli",
  "40": "Kırşehir",
  "41": "Kocaeli",
  "42": "Konya",
  "43": "Kütahya",
  "44": "Malatya",
  "45": "Manisa",
  "46": "Kahramanmaraş",
  "47": "Mardin",
  "48": "Muğla",
  "49": "Muş",
  "50": "Nevşehir",
  "51": "Niğde",
  "52": "Ordu",
  "53": "Rize",
  "54": "Sakarya",
  "55": "Samsun",
  "56": "Siirt",
  "57": "Sinop",
  "58": "Sivas",
  "59": "Tekirdağ",
  "60": "Tokat",
  "61": "Trabzon",
  "62": "Tunceli",
  "63": "Şanlıurfa",
  "64": "Uşak",
  "65": "Van",
  "66": "Yozgat",
  "67": "Zonguldak",
  "68": "Aksaray",
  "69": "Bayburt",
  "70": "Karaman",
  "71": "Kırıkkale",
  "72": "Batman",
  "73": "Şırnak",
  "74": "Bartın",
  "75": "Ardahan",
  "76": "Iğdır",
  "77": "Yalova",
  "78": "Karabük",
  "79": "Kilis",
  "80": "Osmaniye",
  "81": "Düzce",
};

function normalizePlate(plate: string): string {
  return plate
    .replace(/[\s\-]/g, "")
    .trim()
    .toUpperCase();
}

function parsePlate(plate: string): {
  cityCode: string | null;
  letters: string | null;
  numbers: string | null;
  error: string | null;
} {
  const normalized = normalizePlate(plate);

  const cityCodeMatch = normalized.match(/^(\d{1,2})/);
  if (!cityCodeMatch) {
    return {
      cityCode: null,
      letters: null,
      numbers: null,
      error: "İl kodu 2 rakamdan oluşmalıdır",
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
      cityCode: cityCode,
      letters: null,
      numbers: null,
      error: "Plaka harf kısmı bulunamadı",
    };
  }

  const letters = letterMatch[1];
  const numberMatch = remaining.substring(letters.length).match(/^(\d{1,10})/);
  if (!numberMatch) {
    return {
      cityCode: cityCode,
      letters: letters,
      numbers: null,
      error: "Plaka rakam kısmı bulunamadı",
    };
  }

  const numbers = numberMatch[1];

  if (remaining.length !== letters.length + numbers.length) {
    return {
      cityCode: cityCode,
      letters: letters,
      numbers: numbers,
      error: "Plaka formatı geçersiz",
    };
  }

  return { cityCode, letters, numbers, error: null };
}

function getPlateType(letterLength: number, numberLength: number): string {
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
    return "Çok Eski Tip";
  }
  return "Bilinmeyen";
}

export function validateTurkishPlate(plate: string): PlateValidationResult {
  if (!plate || plate.trim() === "") {
    return {
      valid: false,
      formatted: null,
      cityCode: null,
      cityName: null,
      letters: null,
      numbers: null,
      plateType: null,
      message: "Plaka boş olamaz",
    };
  }

  const parsed = parsePlate(plate);

  if (parsed.error) {
    return {
      valid: false,
      formatted: null,
      cityCode: null,
      cityName: null,
      letters: null,
      numbers: null,
      plateType: null,
      message: parsed.error,
    };
  }

  if (!parsed.cityCode || !parsed.letters || !parsed.numbers) {
    return {
      valid: false,
      formatted: null,
      cityCode: null,
      cityName: null,
      letters: null,
      numbers: null,
      plateType: null,
      message: "Plaka formatı geçersiz",
    };
  }

  const { cityCode, letters, numbers } = parsed;

  if (!/^\d{2}$/.test(cityCode)) {
    return {
      valid: false,
      formatted: null,
      cityCode: null,
      cityName: null,
      letters: null,
      numbers: null,
      plateType: null,
      message: "İl kodu 2 rakamdan oluşmalıdır",
    };
  }

  const cityCodeNum = parseInt(cityCode, 10);
  if (cityCodeNum < 1 || cityCodeNum > 81) {
    return {
      valid: false,
      formatted: null,
      cityCode: null,
      cityName: null,
      letters: null,
      numbers: null,
      plateType: null,
      message: "İl kodu 01-81 arası olmalıdır",
    };
  }

  const cityName = CITY_CODES[cityCode] || null;

  if (letters.length < 1 || letters.length > 3) {
    return {
      valid: false,
      formatted: null,
      cityCode: null,
      cityName: null,
      letters: null,
      numbers: null,
      plateType: null,
      message: "Harf kısmı 1-3 karakter olmalıdır",
    };
  }

  const forbiddenLetters = ["Ç", "Ğ", "İ", "Ö", "Ş", "Ü", "Q", "W", "X"];
  for (const letter of letters) {
    if (forbiddenLetters.includes(letter)) {
      return {
        valid: false,
        formatted: null,
        cityCode: null,
        cityName: null,
        letters: null,
        numbers: null,
        plateType: null,
        message: `Plakada kullanılamayan harf: ${letter}`,
      };
    }
  }

  if (numbers.length < 2 || numbers.length > 4) {
    return {
      valid: false,
      formatted: null,
      cityCode: null,
      cityName: null,
      letters: null,
      numbers: null,
      plateType: null,
      message: "Rakam kısmı 2-4 hane olmalıdır",
    };
  }

  const formatted = `${cityCode} ${letters} ${numbers}`;
  const plateType = getPlateType(letters.length, numbers.length);

  return {
    valid: true,
    formatted: formatted,
    cityCode: cityCode,
    cityName: cityName,
    letters: letters,
    numbers: numbers,
    plateType: plateType,
    message: "Geçerli plaka",
  };
}

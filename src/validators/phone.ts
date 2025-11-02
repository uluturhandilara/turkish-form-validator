export interface PhoneValidationResult {
  valid: boolean;
  formatted: string | null;
  message: string;
}

function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[\s\-\(\)\+]/g, "").replace(/^90/, "0");
}

export function validateTurkishPhone(phone: string): PhoneValidationResult {
  if (!phone || phone.trim() === "") {
    return {
      valid: false,
      formatted: null,
      message: "Telefon numarası boş olamaz",
    };
  }

  const cleaned = cleanPhoneNumber(phone);

  if (!/^\d+$/.test(cleaned)) {
    return {
      valid: false,
      formatted: null,
      message: "Telefon numarası sadece rakam içermelidir",
    };
  }

  if (cleaned.length < 11) {
    return {
      valid: false,
      formatted: null,
      message: "Telefon numarası 11 haneli olmalıdır",
    };
  }

  if (cleaned.length > 11) {
    return {
      valid: false,
      formatted: null,
      message: "Telefon numarası 11 haneden uzun olamaz",
    };
  }

  if (cleaned[0] !== "0") {
    return {
      valid: false,
      formatted: null,
      message: "Telefon numarası 0 ile başlamalıdır",
    };
  }

  if (cleaned[1] !== "5") {
    return {
      valid: false,
      formatted: null,
      message: "Sadece cep telefonu numaraları kabul edilir (5XX)",
    };
  }

  const formatted = `+90${cleaned.substring(1)}`;

  return {
    valid: true,
    formatted: formatted,
    message: "Geçerli telefon numarası",
  };
}

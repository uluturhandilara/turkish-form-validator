export interface TaxNoValidationResult {
  valid: boolean;
  formatted: string | null;
  message: string;
  checksum: boolean | null;
}

export interface TaxNoValidationOptions {
  isCorporate?: boolean;
}

function cleanTaxNo(taxNo: string): string {
  return taxNo.replace(/[\s\-]/g, "");
}

function formatTaxNo(taxNo: string): string {
  if (taxNo.length !== 10) {
    return taxNo;
  }
  return `${taxNo.substring(0, 3)}-${taxNo.substring(3, 6)}-${taxNo.substring(
    6,
    9
  )}-${taxNo.substring(9)}`;
}

export function formatTaxNoFunction(taxNo: string): string {
  const cleaned = cleanTaxNo(taxNo);
  return formatTaxNo(cleaned);
}

export function validateTaxNo(
  taxNo: string,
  options: TaxNoValidationOptions = {}
): TaxNoValidationResult {
  const fail = (message: string): TaxNoValidationResult => ({
    valid: false,
    formatted: null,
    message,
    checksum: null,
  });

  const failWithChecksum = (message: string): TaxNoValidationResult => ({
    valid: false,
    formatted: null,
    message,
    checksum: false,
  });

  if (!taxNo || taxNo.trim() === "") {
    return fail("Vergi numarası boş olamaz");
  }

  const cleaned = cleanTaxNo(taxNo);

  if (!/^\d+$/.test(cleaned)) {
    return fail("Vergi numarası sadece rakam içermelidir");
  }

  if (cleaned.length < 10) {
    return fail("Vergi numarası 10 haneli olmalıdır");
  }

  if (cleaned.length > 10) {
    return fail("Vergi numarası 10 haneden uzun olamaz");
  }

  const isCorporate = options.isCorporate ?? false;

  if (!isCorporate && cleaned[0] === "0") {
    return fail("Vergi numarası 0 ile başlayamaz");
  }

  const digits = cleaned.split("").map(Number);

  const tempValues: number[] = [];

  for (let i = 0; i < 9; i++) {
    const digit = digits[i];
    let value = (digit + (10 - i)) % 10;
    if (value === 9) {
      value = 0;
    }
    tempValues.push(value);
  }

  const total = tempValues.reduce((sum, value) => sum + value, 0);

  const checkDigit = (10 - (total % 10)) % 10;

  const checksumValid = checkDigit === digits[9];

  if (!checksumValid) {
    return failWithChecksum("Geçersiz vergi numarası");
  }

  return {
    valid: true,
    formatted: formatTaxNo(cleaned),
    message: "Geçerli vergi numarası",
    checksum: true,
  };
}

interface ValidationResult {
    isValid: boolean;
    error?: string;
}
interface ValidateTCKNOptions {
    emptyError?: string;
    tooShortError?: string;
    tooLongError?: string;
    firstDigitZeroError?: string;
    invalidAlgorithmError?: string;
    notDigitsError?: string;
}
declare function validateTCKN(tckn: string, options?: ValidateTCKNOptions): ValidationResult;

interface PhoneValidationResult {
    valid: boolean;
    formatted: string | null;
    message: string;
}
declare function validateTurkishPhone(phone: string): PhoneValidationResult;

interface TaxNoValidationResult {
    valid: boolean;
    formatted: string | null;
    message: string;
    checksum: boolean | null;
}
interface TaxNoValidationOptions {
    isCorporate?: boolean;
}
declare function formatTaxNoFunction(taxNo: string): string;
declare function validateTaxNo(taxNo: string, options?: TaxNoValidationOptions): TaxNoValidationResult;

interface PlateValidationResult {
    valid: boolean;
    formatted: string | null;
    cityCode: string | null;
    cityName: string | null;
    letters: string | null;
    numbers: string | null;
    plateType: string | null;
    message: string;
}
declare function validateTurkishPlate(plate: string): PlateValidationResult;

interface IBANValidationResult {
    valid: boolean;
    formatted: string | null;
    bankCode: string | null;
    bankName: string | null;
    accountNumber: string | null;
    checkDigits: string | null;
    checksumValid: boolean | null;
    message: string;
}
declare function calculateCheckDigit(bankCode: string, reserveDigit: string, accountNumber: string): string;
declare function getBankName(bankCode: string): string | null;
declare function formatIBAN(iban: string): string;
declare function validateTurkishIBAN(iban: string): IBANValidationResult;

export { type IBANValidationResult, type PhoneValidationResult, type PlateValidationResult, type TaxNoValidationOptions, type TaxNoValidationResult, type ValidateTCKNOptions, type ValidationResult, calculateCheckDigit, formatIBAN, formatTaxNoFunction, getBankName, validateTCKN, validateTaxNo, validateTurkishIBAN, validateTurkishPhone, validateTurkishPlate };

import { describe, it, expect } from "vitest";
import { validateTurkishPlate } from "../plate";

describe("validateTurkishPlate", () => {
  it("should validate a correct standard plate", () => {
    const result = validateTurkishPlate("34 ABC 1234");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("34 ABC 1234");
    expect(result.cityCode).toBe("34");
    expect(result.cityName).toBe("İstanbul");
    expect(result.letters).toBe("ABC");
    expect(result.numbers).toBe("1234");
    expect(result.plateType).toBe("Standart");
  });

  it("should validate Ankara plate", () => {
    const result = validateTurkishPlate("06 ABC 4567");
    expect(result.valid).toBe(true);
    expect(result.cityCode).toBe("06");
    expect(result.cityName).toBe("Ankara");
    expect(result.plateType).toBe("Standart");
  });

  it("should validate old type plate (2 letters)", () => {
    const result = validateTurkishPlate("35 AB 1234");
    expect(result.valid).toBe(true);
    expect(result.cityCode).toBe("35");
    expect(result.cityName).toBe("İzmir");
    expect(result.letters).toBe("AB");
    expect(result.plateType).toBe("Eski Tip");
  });

  it("should validate very old type plate (1 letter)", () => {
    const result = validateTurkishPlate("16 A 5678");
    expect(result.valid).toBe(true);
    expect(result.cityCode).toBe("16");
    expect(result.cityName).toBe("Bursa");
    expect(result.letters).toBe("A");
    expect(result.plateType).toBe("Çok Eski Tip");
  });

  it("should validate motorcycle plate", () => {
    const result = validateTurkishPlate("34 ABC 12");
    expect(result.valid).toBe(true);
    expect(result.cityCode).toBe("34");
    expect(result.cityName).toBe("İstanbul");
    expect(result.numbers).toBe("12");
    expect(result.plateType).toBe("Motosiklet");
  });

  it("should validate plate without spaces", () => {
    const result = validateTurkishPlate("34ABC1234");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("34 ABC 1234");
  });

  it("should validate plate with dashes", () => {
    const result = validateTurkishPlate("34-ABC-1234");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("34 ABC 1234");
  });

  it("should validate plate with lowercase", () => {
    const result = validateTurkishPlate("34 abc 1234");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("34 ABC 1234");
    expect(result.letters).toBe("ABC");
  });

  it("should normalize single digit city code", () => {
    const result = validateTurkishPlate("6 ABC 123");
    expect(result.valid).toBe(true);
    expect(result.cityCode).toBe("06");
    expect(result.cityName).toBe("Ankara");
  });

  it("should reject invalid city code (00)", () => {
    const result = validateTurkishPlate("00 ABC 1234");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("İl kodu 01-81 arası olmalıdır");
  });

  it("should reject city code greater than 81", () => {
    const result = validateTurkishPlate("82 ABC 1234");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("İl kodu 01-81 arası olmalıdır");
  });

  it("should reject Turkish characters", () => {
    const result = validateTurkishPlate("34 ÇAĞ 1234");
    expect(result.valid).toBe(false);
    expect(result.message).toContain("kullanılamayan harf");
  });

  it("should reject Q, W, X letters", () => {
    const result = validateTurkishPlate("34 QWX 1234");
    expect(result.valid).toBe(false);
    expect(result.message).toContain("kullanılamayan harf");
  });

  it("should reject more than 3 letters", () => {
    const result = validateTurkishPlate("34 ABCD 1234");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Harf kısmı 1-3 karakter olmalıdır");
  });

  it("should reject less than 2 digits", () => {
    const result = validateTurkishPlate("34 ABC 1");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Rakam kısmı 2-4 hane olmalıdır");
  });

  it("should reject more than 4 digits", () => {
    const result = validateTurkishPlate("34 ABC 12345");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Rakam kısmı 2-4 hane olmalıdır");
  });

  it("should reject plate without city code", () => {
    const result = validateTurkishPlate("ABC 1234");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("İl kodu 2 rakamdan oluşmalıdır");
  });

  it("should reject empty string", () => {
    const result = validateTurkishPlate("");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Plaka boş olamaz");
  });

  it("should validate motorcycle plate with 3 digits", () => {
    const result = validateTurkishPlate("34 ABC 123");
    expect(result.valid).toBe(true);
    expect(result.plateType).toBe("Motosiklet");
  });
});

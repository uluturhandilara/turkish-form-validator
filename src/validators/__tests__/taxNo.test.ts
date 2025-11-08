import { describe, it, expect } from "vitest";
import { validateTaxNo, formatTaxNoFunction } from "../taxNo";

describe("validateTaxNo", () => {
  it("should validate a correct tax no with algorithm", () => {
    const result = validateTaxNo("1234567891");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("123-456-789-1");
    expect(result.checksum).toBe(true);
  });

  it("should validate number with spaces", () => {
    const result = validateTaxNo("123 456 7891");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("123-456-789-1");
  });

  it("should validate number with dashes", () => {
    const result = validateTaxNo("123-456-7891");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("123-456-789-1");
  });

  it("should reject number starting with 0", () => {
    const result = validateTaxNo("0123456789");
    expect(result.valid).toBe(false);
    expect(result.formatted).toBe(null);
    expect(result.message).toBe("Vergi numarası 0 ile başlayamaz");
  });

  it("should allow number starting with 0 when corporate flag is set", () => {
    const result = validateTaxNo("0000000005", { isCorporate: true });
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("000-000-000-5");
    expect(result.checksum).toBe(true);
  });

  it("should reject number that is too short", () => {
    const result = validateTaxNo("123456789");
    expect(result.valid).toBe(false);
    expect(result.formatted).toBe(null);
    expect(result.message).toBe("Vergi numarası 10 haneli olmalıdır");
  });

  it("should reject number that is too long", () => {
    const result = validateTaxNo("12345678901");
    expect(result.valid).toBe(false);
    expect(result.formatted).toBe(null);
    expect(result.message).toBe("Vergi numarası 10 haneden uzun olamaz");
  });

  it("should reject number with alphabetic characters", () => {
    const result = validateTaxNo("123456789X");
    expect(result.valid).toBe(false);
    expect(result.formatted).toBe(null);
    expect(result.message).toBe("Vergi numarası sadece rakam içermelidir");
  });

  it("should reject number with invalid checksum", () => {
    const result = validateTaxNo("1234567899");
    expect(result.valid).toBe(false);
    expect(result.formatted).toBe(null);
    expect(result.message).toBe("Geçersiz vergi numarası");
    expect(result.checksum).toBe(false);
  });

  it("should reject empty string", () => {
    const result = validateTaxNo("");
    expect(result.valid).toBe(false);
    expect(result.formatted).toBe(null);
    expect(result.message).toBe("Vergi numarası boş olamaz");
  });
});

describe("formatTaxNoFunction", () => {
  it("should format a 10-digit tax no", () => {
    const result = formatTaxNoFunction("1234567890");
    expect(result).toBe("123-456-789-0");
  });

  it("should format a tax no with spaces", () => {
    const result = formatTaxNoFunction("123 456 7890");
    expect(result).toBe("123-456-789-0");
  });

  it("should format a tax no with dashes", () => {
    const result = formatTaxNoFunction("123-456-7890");
    expect(result).toBe("123-456-789-0");
  });

  it("should return original if not 10 digits", () => {
    const result = formatTaxNoFunction("123456789");
    expect(result).toBe("123456789");
  });
});

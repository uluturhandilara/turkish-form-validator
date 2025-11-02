import { validateTurkishPhone } from "./src/validators/phone";

console.log("=== Turkish Phone Number Validation Tests ===\n");

console.log("Test 1: Valid mobile number (with spaces)");
const result1 = validateTurkishPhone("0532 123 45 67");
console.log("Result:", result1);
console.log("Valid?", result1.valid);
console.log("Formatted:", result1.formatted);
console.log("Message:", result1.message);
console.log("");

console.log("Test 2: Valid mobile number (with dashes)");
const result2 = validateTurkishPhone("0532-123-45-67");
console.log("Result:", result2);
console.log("Valid?", result2.valid);
console.log("Formatted:", result2.formatted);
console.log("Message:", result2.message);
console.log("");

console.log("Test 3: Valid mobile number (+90 prefix)");
const result3 = validateTurkishPhone("+905321234567");
console.log("Result:", result3);
console.log("Valid?", result3.valid);
console.log("Formatted:", result3.formatted);
console.log("Message:", result3.message);
console.log("");

console.log("Test 4: Valid mobile number (90 prefix)");
const result4 = validateTurkishPhone("90 532 123 45 67");
console.log("Result:", result4);
console.log("Valid?", result4.valid);
console.log("Formatted:", result4.formatted);
console.log("Message:", result4.message);
console.log("");

console.log("Test 5: Valid mobile number (with parentheses)");
const result5 = validateTurkishPhone("(0532) 123 45 67");
console.log("Result:", result5);
console.log("Valid?", result5.valid);
console.log("Formatted:", result5.formatted);
console.log("Message:", result5.message);
console.log("");

console.log("Test 6: Valid mobile number (plain format)");
const result6 = validateTurkishPhone("05321234567");
console.log("Result:", result6);
console.log("Valid?", result6.valid);
console.log("Formatted:", result6.formatted);
console.log("Message:", result6.message);
console.log("");

console.log("=== Invalid Number Tests ===\n");

console.log("Test 7: Number that is too short");
const result7 = validateTurkishPhone("0532 12 34");
console.log("Result:", result7);
console.log("Valid?", result7.valid);
console.log("Message:", result7.message);
console.log("");

console.log("Test 8: Number that is too long");
const result8 = validateTurkishPhone("053212345678");
console.log("Result:", result8);
console.log("Valid?", result8.valid);
console.log("Message:", result8.message);
console.log("");

console.log("Test 9: Landline number (starting with 0632)");
const result9 = validateTurkishPhone("0632 123 45 67");
console.log("Result:", result9);
console.log("Valid?", result9.valid);
console.log("Message:", result9.message);
console.log("");

console.log("Test 10: Number with alphabetic characters");
const result10 = validateTurkishPhone("abc def ghij");
console.log("Result:", result10);
console.log("Valid?", result10.valid);
console.log("Message:", result10.message);
console.log("");

console.log("Test 11: Empty string");
const result11 = validateTurkishPhone("");
console.log("Result:", result11);
console.log("Valid?", result11.valid);
console.log("Message:", result11.message);
console.log("");

console.log("Test 12: Number not starting with 0");
const result12 = validateTurkishPhone("53212345678");
console.log("Result:", result12);
console.log("Valid?", result12.valid);
console.log("Message:", result12.message);
console.log("");

console.log("Test 13: Number starting with 3 (fixed line area code)");
const result13 = validateTurkishPhone("03221234567");
console.log("Result:", result13);
console.log("Valid?", result13.valid);
console.log("Message:", result13.message);
console.log("");

console.log("Test 14: Mixed format with special characters");
const result14 = validateTurkishPhone("+90 532-123 45-67");
console.log("Result:", result14);
console.log("Valid?", result14.valid);
console.log("Formatted:", result14.formatted);
console.log("");

console.log("=== Tests Completed ===");

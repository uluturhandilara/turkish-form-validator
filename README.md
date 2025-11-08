# Turkish Form Validator 🇹🇷

<img width="806" height="410" alt="carbon" src="https://github.com/user-attachments/assets/0f056b0a-c3c2-4b35-a22f-49a337cbccc0" />

A comprehensive validation library for Turkish forms including TCKN, phone numbers, tax numbers, license plates, and IBAN validation.

## 📋 Features

- ✅ **TCKN Validation** - Validate Turkish National Identification Numbers
- ✅ **Phone Number Validation** - Validate Turkish mobile phone numbers with formatting
- ✅ **Tax Number Validation** - Validate Turkish tax numbers with checksum
- ✅ **License Plate Validation** - Validate Turkish vehicle license plates
- ✅ **IBAN Validation** - Validate Turkish IBAN numbers
- ✅ **TypeScript Support** - Full TypeScript definitions included
- ✅ **Zero Dependencies** - Lightweight with no external dependencies

## 🚀 Installation

```bash
npm install turkish-form-validator
```

or

```bash
yarn add turkish-form-validator
```

## 📖 Usage

### TCKN Validation

```typescript
import { validateTCKN } from "turkish-form-validator";

const result = validateTCKN("12345678950");
if (result.isValid) {
  console.log("Valid TCKN");
} else {
  console.log(result.error);
}
```

### Phone Number Validation

```typescript
import { validateTurkishPhone } from "turkish-form-validator";

const result = validateTurkishPhone("0532 123 45 67");
if (result.valid) {
  console.log("Valid phone:", result.formatted); // +905321234567
} else {
  console.log(result.message);
}
```

### Tax Number Validation

```typescript
import { validateTaxNo } from "turkish-form-validator";

const result = validateTaxNo("1234567890");
if (result.valid) {
  console.log("Valid tax number:", result.formatted);
} else {
  console.log(result.message);
}
```

For corporate (Ltd./A.Ş.) taxpayers, tax numbers can start with 0. To support these scenarios, you can pass `isCorporate: true` as the second parameter:

```typescript
const corporateResult = validateTaxNo("0000000005", { isCorporate: true });
```

### License Plate Validation

```typescript
import { validateTurkishPlate } from "turkish-form-validator";

const result = validateTurkishPlate("06 ABC 123");
if (result.valid) {
  console.log("Valid plate:", result.formatted);
  console.log("City:", result.cityName);
  console.log("Type:", result.plateType);
} else {
  console.log(result.message);
}
```

### IBAN Validation

```typescript
import { validateTurkishIBAN } from "turkish-form-validator";

const result = validateTurkishIBAN("TR330006100519786457841326");
if (result.valid) {
  console.log("Valid IBAN:", result.formatted);
  console.log("Bank:", result.bankName);
} else {
  console.log(result.message);
}
```

## 🎯 Framework Examples

### React Example

```tsx
import { useState } from "react";
import { validateTCKN } from "turkish-form-validator";

function TCKNInput() {
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = validateTCKN(e.target.value);
    if (!result.isValid) {
      setError(result.error || "");
    } else {
      setError("");
    }
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
```

### Vue 3 Example (Composition API)

```vue
<template>
  <div>
    <input v-model="phone" @input="validate" />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { validateTurkishPhone } from "turkish-form-validator";

const phone = ref("");
const error = ref("");

const validate = () => {
  const result = validateTurkishPhone(phone.value);
  error.value = result.valid ? "" : result.message;
};
</script>
```

### Angular Example

```typescript
import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { validateTCKN } from "turkish-form-validator";

@Component({
  selector: "app-tckn-input",
  template: `
    <input [formControl]="tcknControl" />
    <div *ngIf="tcknControl.invalid && tcknControl.dirty">
      {{ tcknControl.errors?.['tckn'] }}
    </div>
  `,
})
export class TCKNInputComponent {
  tcknControl = new FormControl("", [this.tcknValidator]);

  tcknValidator(control: FormControl) {
    const result = validateTCKN(control.value);
    return result.isValid ? null : { tckn: result.error };
  }
}
```

### Vanilla JavaScript Example

```javascript
import { validateTaxNo } from "turkish-form-validator";

document.getElementById("tax-input").addEventListener("input", (e) => {
  const result = validateTaxNo(e.target.value);
  const errorDiv = document.getElementById("error");

  if (result.valid) {
    errorDiv.textContent = "";
    errorDiv.style.display = "none";
  } else {
    errorDiv.textContent = result.message;
    errorDiv.style.display = "block";
  }
});
```

## Contact With

Dilara Uluturhan - [LinkedIn](https://www.linkedin.com/in/dilarauluturhan/) - dilarauluturhan@outlook.com

---

# Türkçe Form Doğrulayıcı 🇹🇷

## 📋 Özellikler

- ✅ **TCKN Validasyonu** - Türkiye Cumhuriyeti Kimlik Numarası doğrulama
- ✅ **Telefon Numarası Validasyonu** - Türk cep telefonu numaralarını formatlama ile doğrulama
- ✅ **Vergi Numarası Validasyonu** - Türk vergi numaralarını checksum ile doğrulama
- ✅ **Plaka Validasyonu** - Türk araç plakalarını doğrulama
- ✅ **IBAN Validasyonu** - Türk IBAN numaralarını doğrulama
- ✅ **TypeScript Desteği** - Tam TypeScript tanımları dahil
- ✅ **Sıfır Bağımlılık** - Harici bağımlılığı olmayan kütüphane

## 🚀 Kurulum

```bash
npm install turkish-form-validator
```

veya

```bash
yarn add turkish-form-validator
```

## 📖 Kullanım

### TCKN Validasyonu

```typescript
import { validateTCKN } from "turkish-form-validator";

const result = validateTCKN("12345678950");
if (result.isValid) {
  console.log("Geçerli TCKN");
} else {
  console.log(result.error);
}
```

### Telefon Numarası Validasyonu

```typescript
import { validateTurkishPhone } from "turkish-form-validator";

const result = validateTurkishPhone("0532 123 45 67");
if (result.valid) {
  console.log("Geçerli telefon:", result.formatted); // +905321234567
} else {
  console.log(result.message);
}
```

### Vergi Numarası Validasyonu

```typescript
import { validateTaxNo } from "turkish-form-validator";

const result = validateTaxNo("1234567890");
if (result.valid) {
  console.log("Geçerli vergi numarası:", result.formatted);
} else {
  console.log(result.message);
}
```

Kurumsal (Ltd./A.Ş.) mükellefler için vergi numaraları 0 ile başlayabilir. Bu senaryoları desteklemek için ikinci parametre olarak `isCorporate: true` gönderebilirsiniz:

```typescript
const corporateResult = validateTaxNo("0000000005", { isCorporate: true });
console.log(corporateResult.valid); // true
```

### Plaka Validasyonu

```typescript
import { validateTurkishPlate } from "turkish-form-validator";

const result = validateTurkishPlate("06 ABC 123");
if (result.valid) {
  console.log("Geçerli plaka:", result.formatted);
  console.log("İl:", result.cityName);
  console.log("Tip:", result.plateType);
} else {
  console.log(result.message);
}
```

### IBAN Validasyonu

```typescript
import { validateTurkishIBAN } from "turkish-form-validator";

const result = validateTurkishIBAN("TR330006100519786457841326");
if (result.valid) {
  console.log("Geçerli IBAN:", result.formatted);
  console.log("Banka:", result.bankName);
} else {
  console.log(result.message);
}
```

## 🎯 Framework Örnekleri

### React Örneği

```tsx
import { useState } from "react";
import { validateTCKN } from "turkish-form-validator";

function TCKNInput() {
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = validateTCKN(e.target.value);
    if (!result.isValid) {
      setError(result.error || "");
    } else {
      setError("");
    }
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
```

### Vue 3 Örneği (Composition API)

```vue
<template>
  <div>
    <input v-model="phone" @input="validate" />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { validateTurkishPhone } from "turkish-form-validator";

const phone = ref("");
const error = ref("");

const validate = () => {
  const result = validateTurkishPhone(phone.value);
  error.value = result.valid ? "" : result.message;
};
</script>
```

### Angular Örneği

```typescript
import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { validateTCKN } from "turkish-form-validator";

@Component({
  selector: "app-tckn-input",
  template: `
    <input [formControl]="tcknControl" />
    <div *ngIf="tcknControl.invalid && tcknControl.dirty">
      {{ tcknControl.errors?.['tckn'] }}
    </div>
  `,
})
export class TCKNInputComponent {
  tcknControl = new FormControl("", [this.tcknValidator]);

  tcknValidator(control: FormControl) {
    const result = validateTCKN(control.value);
    return result.isValid ? null : { tckn: result.error };
  }
}
```

### JavaScript Örneği

```javascript
import { validateTaxNo } from "turkish-form-validator";

document.getElementById("tax-input").addEventListener("input", (e) => {
  const result = validateTaxNo(e.target.value);
  const errorDiv = document.getElementById("error");

  if (result.valid) {
    errorDiv.textContent = "";
    errorDiv.style.display = "none";
  } else {
    errorDiv.textContent = result.message;
    errorDiv.style.display = "block";
  }
});
```

## İletişim Kuralım

Dilara Uluturhan - [LinkedIn](https://www.linkedin.com/in/dilarauluturhan/) - dilarauluturhan@outlook.com

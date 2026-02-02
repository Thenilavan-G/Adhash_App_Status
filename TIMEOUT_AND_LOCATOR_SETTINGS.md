# Timeout and Locator Settings - Current Configuration

## 📋 **Global Timeout Settings** (playwright.config.ts)

### Test Timeouts:
- **Test Timeout**: `600000ms` (10 minutes) - Maximum time one test can run
- **Action Timeout**: `60000ms` (60 seconds) - Maximum time each action can take
- **Navigation Timeout**: `60000ms` (60 seconds) - Maximum time for page navigation

### Other Settings:
- **Base URL**: `https://play.google.com`
- **Browser**: Chromium (using system Chrome)
- **Viewport**: 1920x1080
- **Parallel Execution**: Disabled (workers: 1)
- **Retries**: 0 (local), 2 (CI)

---

## 🎯 **Test-Specific Timeouts**

### AppStore Test (appstore.spec.ts):
```typescript
test.setTimeout(180000); // 3 minutes
```

### Unified Test (unified.spec.ts):
```typescript
test.setTimeout(600000); // 10 minutes
```

---

## 🔍 **Locator Settings and Selectors**

### **Play Store Page** (pages/PlayStorePage.ts)

#### Search Icon:
```typescript
this.searchIcon = page.locator(`xpath=${SELECTORS.searchIcon}`);
// Timeout: 10000ms (10 seconds)
await this.searchIcon.waitFor({ state: 'visible', timeout: 10000 });
```

#### Search Input:
```typescript
this.searchInput = page.locator(`xpath=${SELECTORS.searchInput}`);
// Timeout: 10000ms (10 seconds)
await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
```

#### Search Result Href:
```typescript
// Primary: XPath selector
const resultElement = this.page.locator(`xpath=${xpath}`);
await resultElement.waitFor({ state: 'visible', timeout: 5000 });

// Fallback 1: Package ID selector
const packageSelector = `a[href*="${expectedPackageId}"]`;
await packageElement.waitFor({ state: 'visible', timeout: 5000 });

// Fallback 2: First search result
const firstResult = this.page.locator('section a[href*="details?id="]').first();
await firstResult.waitFor({ state: 'visible', timeout: 5000 });
```

#### App Name Selectors (in priority order):
1. `h1[itemprop="name"]`
2. `h1.Fd93Bb`
3. `header h1`
4. `div[class*="title"] h1`
5. `h1`
- **Timeout**: 5000ms (5 seconds) per selector

---

### **App Store Page** (pages/AppStorePage.ts)

#### Search Click:
```typescript
this.searchClick = page.locator(`xpath=${APPSTORE_SELECTORS.searchClick}`);
// Timeout: 10000ms (10 seconds)
await this.searchClick.waitFor({ state: 'visible', timeout: 10000 });

// Fallback: Alternative selector
const altSearchButton = this.page.locator('a[aria-label*="Search"]').first();
```

#### Search Input:
```typescript
// Primary: XPath selector
const xpathInput = this.page.locator(`xpath=${APPSTORE_SELECTORS.searchInput}`);
await xpathInput.waitFor({ state: 'visible', timeout: 5000 });

// Fallback 1: Type selector
const altInput = this.page.locator('input[type="search"]').first();
await altInput.waitFor({ state: 'visible', timeout: 5000 });

// Fallback 2: Placeholder selector
const altInput2 = this.page.locator('input[placeholder*="Search"]').first();
await altInput2.waitFor({ state: 'visible', timeout: 5000 });
```

#### Search Result Href:
```typescript
// Primary: XPath selector
const resultElement = this.page.locator(`xpath=${xpath}`);
await resultElement.waitFor({ state: 'visible', timeout: 10000 });

// Fallback 1: App ID selector
const appIdSelector = `a[href*="${expectedAppId}"]`;
await appElement.waitFor({ state: 'visible', timeout: 10000 });

// Fallback 2: h2 > a structure
const firstResult = this.page.locator('h2 a[href*="apps.apple.com"]').first();
await firstResult.waitFor({ state: 'visible', timeout: 10000 });

// Fallback 3: Any app store link
const anyResult = this.page.locator('a[href*="apps.apple.com/"]').first();
await anyResult.waitFor({ state: 'visible', timeout: 10000 });
```

#### App Name Selectors (in priority order):
1. `h1.product-header__title`
2. `h1[class*="product-header"]`
3. `header h1`
4. `h1.app-header__title`
5. `h1`
- **Timeout**: 5000ms (5 seconds) per selector

---

## ⏱️ **Wait Delays in Tests**

### Unified Test (unified.spec.ts):
- After search: `await page.waitForTimeout(2000)` (2 seconds)
- Between platforms: `await page.waitForTimeout(2000)` (2 seconds)
- Between apps: `await page.waitForTimeout(2000)` (2 seconds)

### AppStore Test (appstore.spec.ts):
- Between searches: `await page.waitForTimeout(1000)` (1 second)

### Page Objects:
- After clicking search icon: `await page.waitForTimeout(1000)` (1 second)
- Before searching: `await page.waitForTimeout(2000)` (2 seconds)
- After search results: `await page.waitForTimeout(3000)` (3 seconds for App Store)
- After search results: `await page.waitForTimeout(2000)` (2 seconds for Play Store)
- Before getting result href: `await page.waitForTimeout(2000)` (2 seconds)

---

## 🎯 **Recommendations**

### Current Issues:
1. Tests are timing out or getting killed
2. Logo downloads are failing
3. Network timeouts (ETIMEDOUT) when installing Playwright browsers

### Suggested Improvements:
1. **Increase locator timeouts** from 5-10 seconds to 30-60 seconds for slow networks
2. **Add retry logic** for logo downloads
3. **Increase wait delays** between actions to allow pages to fully load
4. **Use `networkidle` wait state** more consistently
5. **Add error handling** for network timeouts


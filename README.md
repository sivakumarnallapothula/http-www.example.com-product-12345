# http-www.example.com-product-12345
BACK - END
## **Design Plan**

### **1. Requirements**
- **Input**: A list of e-commerce website domains (e.g., `example.com`, `anotherstore.com`).
- **Output**: A dictionary-like structure mapping each domain to a list of product URLs discovered.
  ```json
  {
      "example.com": [
          "https://example.com/product/123",
          "https://example.com/product/456"
      ],
      "anotherstore.com": [
          "https://anotherstore.com/item/789"
      ]
  }
  ```

---

### **2. Challenges and Solutions**
| **Challenge**                    | **Solution**                                                                                   |
|-----------------------------------|-----------------------------------------------------------------------------------------------|
| Website structure variability     | Use dynamic rules and heuristics to detect product pages (e.g., `/product/`, `/item/`, patterns in URLs). |
| JavaScript-heavy pages            | Use headless browsers (e.g., Playwright or Selenium) for JavaScript rendering when required.   |
| Pagination and infinite scroll    | Detect pagination patterns (e.g., `?page=`, `&start=`) and handle infinite scroll using dynamic loaders. |
| Performance and scalability       | Use asynchronous crawling (e.g., `aiohttp` or Scrapy) and distributed systems if needed.       |
| Duplicate URLs                   | Deduplicate URLs using hash maps or database-based checks.                                     |
| Politeness and compliance         | Respect `robots.txt`, avoid overloading servers, and implement rate limiting.                  |

---

### **3. Architecture**

#### **Components**
1. **Seed URL Generator**:
   - Generate seed URLs from the given domains, starting with the homepage or known category URLs.
   
2. **Crawler Engine**:
   - Fetch and parse pages using a framework like `Scrapy`, `aiohttp`, or a headless browser.
   - Identify product links based on heuristics and URL patterns.
   
3. **Content Parser**:
   - Extract links from `<a>` tags, deduplicate, and classify URLs (e.g., product vs non-product).
   
4. **Dynamic Content Renderer**:
   - Handle JavaScript-rendered pages using Playwright or Selenium.

5. **Output Formatter**:
   - Aggregate and store discovered URLs in JSON format or a database.

---

### **4. Implementation Steps**

#### **Step 1: Technology Setup**
- Use **Python** as the primary language.
- Libraries/Tools:
  - `Scrapy`: For efficient crawling and parsing.
  - `Playwright`/`Selenium`: For handling JavaScript-heavy websites.
  - `SQLite`/`PostgreSQL`: For storing discovered URLs (optional).

---

#### **Step 2: Crawling Workflow**

1. **Input**:
   - Accept a list of e-commerce domains (e.g., `example.com`, `anotherstore.com`).

2. **Seed URL Initialization**:
   - Start crawling from the homepage of each domain (e.g., `https://example.com`).
   - Optionally, use category pages if provided or detected.

3. **Crawling Logic**:
   - Parse the HTML content to extract all `<a>` tags.
   - Apply heuristics to identify product URLs (e.g., `/product/`, `/item/`, `/shop/`).
   - Follow links recursively to discover deeper pages.
   - Detect pagination links (e.g., `?page=`, `&start=`) and follow them to retrieve additional products.

4. **Dynamic Content Handling**:
   - If a page doesn’t load product links statically, render it using Playwright or Selenium.
   - Scroll to load additional content for infinite scrolling.

5. **Politeness and Throttling**:
   - Respect `robots.txt`.
   - Use rate limiting (e.g., 1 request per second) to avoid being blocked.

6. **Output**:
   - Store discovered product URLs for each domain in a dictionary or write them to a JSON file.

---

### **5. Implementation Code**

Here’s a sample implementation using **Scrapy**:

#### **File: `ecommerce_crawler.py`**
```python
import scrapy
from scrapy.crawler import CrawlerProcess
from urllib.parse import urljoin

class ProductURLSpider(scrapy.Spider):
    name = "product_url_spider"

    def __init__(self, domains=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.start_urls = [f"https://{domain}" for domain in domains]
        self.result = {}

    def parse(self, response):
        domain = response.url.split("/")[2]
        if domain not in self.result:
            self.result[domain] = []

        # Extract all links from the page
        links = response.css("a::attr(href)").getall()
        for link in links:
            full_url = urljoin(response.url, link)

            # Heuristic: Identify product URLs (adjust based on actual websites)
            if "/product/" in full_url or "/item/" in full_url or "shop" in full_url:
                if full_url not in self.result[domain]:
                    self.result[domain].append(full_url)

        # Follow links to crawl deeper (with depth control)
        for link in links:
            if domain in link:
                yield response.follow(link, callback=self.parse)

    def closed(self, reason):
        # Save results to a JSON file
        import json
        with open("product_urls.json", "w") as f:
            json.dump(self.result, f, indent=4)

# Running the Spider
if __name__ == "__main__":
    domains = ["example.com", "anotherstore.com"]  # Replace with your domains
    process = CrawlerProcess(settings={
        "LOG_LEVEL": "INFO",
        "USER_AGENT": "Mozilla/5.0 (compatible; E-commerceCrawler/1.0)"
    })
    process.crawl(ProductURLSpider, domains=domains)
    process.start()
```

---

### **6. Dynamic Content Handling**

If websites require JavaScript rendering, integrate **Playwright**:
```python
from playwright.sync_api import sync_playwright

def render_page(url):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url)
        content = page.content()
        browser.close()
        return content
```

Call `render_page(url)` to get dynamically loaded HTML before parsing it with Scrapy or BeautifulSoup.

---

### **7. Output Example**
The crawler will generate a `product_urls.json` file:
```json
{
    "example.com": [
        "https://example.com/product/123",
        "https://example.com/product/456"
    ],
    "anotherstore.com": [
        "https://anotherstore.com/item/789",
        "https://anotherstore.com/item/101"
    ]
}
```

---

### **8. Scalability Enhancements**
- Use **distributed crawling** with Scrapy + Scrapy-Redis.
- Deploy on cloud platforms (AWS, GCP) with Docker containers.
- Integrate a queue system (e.g., RabbitMQ) for task distribution.

FRONT - END


For simplicity, we'll use **React.js** for the frontend and CSS for styling. We will focus on the core functionality of customizing the Apple Watch (e.g., changing cases and bands) and replicating the seamless user experience.

---

### **Core Functionalities to Implement**
1. **Customization Options**:
   - **Case Customization**: Different case styles, materials, and colors.
   - **Band Customization**: Multiple band options with varying colors and materials.

2. **Real-time Updates**:
   - Instant updates to the watch preview as the user selects customization options.

3. **Responsive Design**:
   - Ensure the UI works well across devices and screen sizes.

4. **Pixel-Perfect Styling**:
   - Use CSS/SCSS for precise visual replication.

5. **Interactive Experience**:
   - Smooth animations and transitions for option selection.

---

### **Code Implementation**

#### **Step 1: Initialize React Project**
Create a new React project:
```bash
npx create-react-app apple-watch-studio-clone
cd apple-watch-studio-clone
npm start
```

Install dependencies:
```bash
npm install styled-components react-icons
```

---

#### **Step 2: Folder Structure**
Organize the project as follows:
```
src/
├── components/
│   ├── CaseSelector.js
│   ├── BandSelector.js
│   ├── WatchPreview.js
│   └── Customizer.js
├── assets/       # Store images for cases and bands
├── App.js
├── App.css
└── index.js
```

---

#### **Step 3: Watch Customizer Component**

##### **1. `App.js`**
This is the main entry point that renders the customization interface.

```jsx
import React from "react";
import Customizer from "./components/Customizer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Apple Watch Studio Clone</h1>
      </header>
      <Customizer />
    </div>
  );
}

export default App;
```

---

##### **2. `Customizer.js`**
Handles the layout and state management for customization.

```jsx
import React, { useState } from "react";
import WatchPreview from "./WatchPreview";
import CaseSelector from "./CaseSelector";
import BandSelector from "./BandSelector";

const Customizer = () => {
  const [selectedCase, setSelectedCase] = useState("silver");
  const [selectedBand, setSelectedBand] = useState("sport-black");

  return (
    <div className="customizer">
      <WatchPreview caseType={selectedCase} bandType={selectedBand} />
      <div className="selectors">
        <CaseSelector selectedCase={selectedCase} onCaseChange={setSelectedCase} />
        <BandSelector selectedBand={selectedBand} onBandChange={setSelectedBand} />
      </div>
    </div>
  );
};

export default Customizer;
```

---

##### **3. `WatchPreview.js`**
Displays a live preview of the watch based on the selected case and band.

```jsx
import React from "react";
import "./WatchPreview.css";

const WatchPreview = ({ caseType, bandType }) => {
  return (
    <div className="watch-preview">
      <img
        src={`/assets/cases/${caseType}.png`}
        alt={`${caseType} case`}
        className="watch-case"
      />
      <img
        src={`/assets/bands/${bandType}.png`}
        alt={`${bandType} band`}
        className="watch-band"
      />
    </div>
  );
};

export default WatchPreview;
```

---

##### **4. `CaseSelector.js`**
Allows the user to select a case style.

```jsx
import React from "react";
import "./CaseSelector.css";

const cases = [
  { id: "silver", name: "Silver Aluminum" },
  { id: "gold", name: "Gold Aluminum" },
  { id: "space-gray", name: "Space Gray Aluminum" },
];

const CaseSelector = ({ selectedCase, onCaseChange }) => {
  return (
    <div className="case-selector">
      <h3>Select Case</h3>
      <div className="options">
        {cases.map((caseOption) => (
          <div
            key={caseOption.id}
            className={`option ${selectedCase === caseOption.id ? "selected" : ""}`}
            onClick={() => onCaseChange(caseOption.id)}
          >
            <img
              src={`/assets/cases/${caseOption.id}.png`}
              alt={caseOption.name}
              className="case-thumbnail"
            />
            <span>{caseOption.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseSelector;
```

---

##### **5. `BandSelector.js`**
Allows the user to select a band.

```jsx
import React from "react";
import "./BandSelector.css";

const bands = [
  { id: "sport-black", name: "Sport Band - Black" },
  { id: "sport-white", name: "Sport Band - White" },
  { id: "sport-blue", name: "Sport Band - Blue" },
];

const BandSelector = ({ selectedBand, onBandChange }) => {
  return (
    <div className="band-selector">
      <h3>Select Band</h3>
      <div className="options">
        {bands.map((bandOption) => (
          <div
            key={bandOption.id}
            className={`option ${selectedBand === bandOption.id ? "selected" : ""}`}
            onClick={() => onBandChange(bandOption.id)}
          >
            <img
              src={`/assets/bands/${bandOption.id}.png`}
              alt={bandOption.name}
              className="band-thumbnail"
            />
            <span>{bandOption.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BandSelector;
```

---

#### **Step 4: Styling**

##### **`App.css`**
```css
.App {
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.App-header {
  background-color: #000;
  color: #fff;
  padding: 1rem;
}

.customizer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.selectors {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}
```

##### **`WatchPreview.css`**
```css
.watch-preview {
  position: relative;
  width: 300px;
  height: 300px;
}

.watch-case,
.watch-band {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

##### **`CaseSelector.css` & `BandSelector.css`**
```css
.options {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.option {
  text-align: center;
  cursor: pointer;
  padding: 0.5rem;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.option.selected {
  border-color: #007aff;
}

.case-thumbnail,
.band-thumbnail {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}
```

---

### **Step 5: Assets**
- Add images for cases and bands under the `/assets/cases` and `/assets/bands` directories.

---







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
from playwright.sync_api import sync_playwright

def render_page(url):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url)
        content = page.content()
        browser.close()
        return content

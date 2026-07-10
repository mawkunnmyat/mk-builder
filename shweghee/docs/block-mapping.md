# Section to WordPress Block Mapping

Industry-agnostic block names (`mk/*`) — reusable across food, retail, healthcare, and other sectors.

| Static Component | `data-block` | `src/` folder | Notes |
| --- | --- | --- | --- |
| `header` | `mk/brand-header` | `brand-header` | Logo + hotline + nav; child `mk/brand-nav-item` |
| `hero` | `mk/hero-banner-carousel` | `hero-banner-carousel` | Child `mk/hero-banner-slide` |
| `services-carousel` | `mk/image-card-carousel` | `image-card-carousel` | Child `mk/image-card-slide` |
| `why-choose-us` | `mk/numbered-features-grid` | `numbered-features-grid` | Child `mk/numbered-feature-item` |
| `product-categories` | `mk/category-card-grid` | `category-card-grid` | Child `mk/category-card` |
| `partners` | `mk/logo-showcase-section` | `logo-showcase-section` | Child `mk/logo-showcase-item` |
| `blog-news` | `mk/news-card-grid` | `news-card-grid` | Child `mk/news-card` |
| `testimonials` | `mk/review-carousel` | `review-carousel` | Child `mk/review-card` |
| `app-promo` | `mk/split-promo-section` | `split-promo-section` | Split layout CTA + features + image |
| `faq` | `mk/faq-accordion-section` | `faq-accordion-section` | Child `mk/faq-accordion-item`; FAQPage schema |
| `newsletter` | `mk/subscribe-bar` | `subscribe-bar` | Email subscribe strip + honeypot |
| `footer` | `mk/brand-footer` | `brand-footer` | Children: `brand-footer-info-card`, `brand-footer-column` |

## Legacy aliases (deprecated)

| Old `data-block` | New `data-block` |
| --- | --- |
| `farmart/header` | `mk/brand-header` |
| `farmart/hero-slider` | `mk/hero-banner-carousel` |
| `farmart/services-carousel` | `mk/image-card-carousel` |
| `farmart/why-choose-us` | `mk/numbered-features-grid` |
| `farmart/product-categories` | `mk/category-card-grid` |
| `farmart/partners` | `mk/logo-showcase-section` |
| `farmart/blog-news` | `mk/news-card-grid` |
| `farmart/testimonials` | `mk/review-carousel` |
| `farmart/app-promo` | `mk/split-promo-section` |
| `farmart/faq` | `mk/faq-accordion-section` |
| `farmart/newsletter-cta` | `mk/subscribe-bar` |
| `farmart/footer` | `mk/brand-footer` |

## Shop page blocks (unchanged — future phase)

| Static Component | `data-block` | Notes |
| --- | --- | --- |
| `shop-header` | `farmart/shop-header` | Utility bar, search, nav, cart |
| `breadcrumb` | `farmart/breadcrumb` | BreadcrumbList schema |
| `shop-hero` | `farmart/shop-hero-slider` | Shop promo slides |
| `shop-sidebar` | `farmart/shop-sidebar` | Categories accordion + recommendations |
| `featured-categories` | `farmart/featured-categories` | Category cards carousel |
| `daily-offers` | `farmart/daily-offers` | Product carousel |
| `best-sellers` | `farmart/best-sellers` | Product carousel |
| `shop-toolbar` | `farmart/shop-toolbar` | Sort, per-page, layout toggles |
| `product-grid` | `farmart/product-grid` | Woo loop + pagination |
| `product-card` | `farmart/product-card` | Shared inner card template |
| `shop-footer` | `farmart/shop-footer` | Contact, columns, newsletter |
| `back-to-top` | `farmart/back-to-top` | Fixed scroll control |

## Migration Checklist

1. Keep `data-block`, `data-list`, `data-item-id` on saved markup.
2. One block scaffold per row in the table above.
3. Port each `*.css` to block `style.scss`.
4. Port each `init*` to block `viewScript`.
5. Replace `home.mock.json` fields with block attributes.
6. Visual compare against reference URL per section.

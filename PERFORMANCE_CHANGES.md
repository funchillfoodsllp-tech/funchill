# Funchill Foods Performance Optimization Notes

UI/design was not intentionally changed. These changes are focused on PageSpeed/Lighthouse performance and accessibility.

## What changed

- Removed `.git` folder from the delivery ZIP to keep the website upload clean and lightweight.
- Removed unused heavy source PNG files from `img/process/` and `img/product/` because the live HTML uses WebP versions.
- Optimized and resized large WebP images while keeping the same filenames and visual layout.
- Added responsive image variants for hero/header images:
  - `hero-1-640.webp`, `hero-1-1200.webp`
  - `hero-2-640.webp`, `hero-2-1200.webp`
  - `hero-3-640.webp`, `hero-3-1200.webp`
  - `header-1-640.webp`, `header-1-1200.webp`
  - `about1-640.webp`, `about1-1200.webp`
- Added `srcset`, `sizes`, `width`, `height`, `decoding`, `fetchpriority`, and proper lazy/eager loading to images.
- Kept the first visible hero/header image high priority; below-fold images use lazy loading.
- Reduced page loader wait time so the hero becomes visible faster.
- Added `defer` to non-critical scripts.
- Added accessible labels for mobile menu buttons, carousel buttons, logo links, and back-to-top button.
- Added cache header files for common hosting providers:
  - `.htaccess` for Apache/Hostinger-style hosting
  - `_headers` for Netlify/Cloudflare Pages-style hosting
  - `vercel.json` for Vercel hosting

## Size result

- Original extracted folder: ~348 MB
- Optimized folder: ~33 MB
- Original image folder: ~114 MB
- Optimized image folder: ~4.6 MB

## Upload instruction

Upload the contents inside the `funchill` folder to your hosting/GitHub repository root.
Do not upload the old `.git` folder or unused original PNG files.

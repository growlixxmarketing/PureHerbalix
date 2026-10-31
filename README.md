# Pure Herbalix

A React + Vite storefront matching the supplied dark emerald and gold Stitch design.

## Run

- `npm install`
- `npm run dev`
- `npm test`
- `npm run build`

Production assets are written to `dist/` and can be hosted on any static web host. The Sites deployment is separate from the custom domain pureherbalix.com.

## Store behavior

Each individual oil is 50 AED. Bundles are explicitly created with the two-slot bundle selector, accept any pair including duplicate oils, and cost 90 AED. Adding two separate single items does not silently convert them to a bundle; the bag links back to the bundle builder. Quantities and bag contents persist in localStorage on the visitor’s browser.

WhatsApp checkout opens an itemized message addressed to +44 7511 683678. Customers must send that message and confirm availability, delivery fees and payment with the seller. No payment processing, inventory reservation, order database or customer account system is included.

Product information lives in src/products.js. Pricing and order calculations live in src/cart.js and have unit tests in src/cart.test.js. Site layout is src/main.jsx and src/style.css.

The original product cutouts and two AI-generated editorial compositions are optimized as WebP in public/images. Generated imagery is decorative; product details use the original provided bottle images. Animations respect prefers-reduced-motion. The design’s unverified scientific claims and fictional customer testimonials have been replaced with supplied product information and care FAQs.

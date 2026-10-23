# Hotel Shantam Regency website

React + Vite + Tailwind CSS website based on the hotel website PRD and the supplied visual reference.

## Run locally
1. Install Node.js (LTS).
2. Open this project folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite.

## Current build
- Responsive home page, room categories, events, facilities, restaurant, about, gallery, contact/enquiry form and guest policy notes.
- Fonts: IBM Plex Serif, Jim Nightshade, Tiro Devanagari Hindi, Updock and the supplied Spicy Rice font file.
- Palette: forest green, warm ivory, gold and dark text.
- Room and event enquiries include the requested fields.
- The demo enquiry form saves entries in browser localStorage only. It does NOT send leads to the hotel or provide secure admin access yet.
- Images from Unsplash are sample visuals. Replace them with hotel-owned/management-approved photographs before launch.
- Contact number, WhatsApp, official email, Google Maps pin, rates, timings, room amenities, event capacity/packages, reviews and policies must be verified by management before publication.
- Do not describe the booking form as real-time availability; the hotel confirms availability and rates manually.

## Remaining production work from the PRD
- Connect enquiry forms to a backend/database and notification email/WhatsApp workflow.
- Implement a secure authenticated `/admin` area and lead status tracking (New, Contacted, Follow-up, Converted, Lost). Do not expose an admin dashboard without authentication.
- Add approved menu, rates, room details, venue capacities, policies and verified reviews.
- Replace sample photos and configure production domain/hosting.

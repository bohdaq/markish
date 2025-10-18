# Marta Films - New York Content Creator

A modern, elegant static website for Marta Films, a New York-based content creator specializing in wedding and event videography.

## Features

- **Black & White Aesthetic**: Minimalist design with grayscale imagery
- **4 Main Sections**:
  - Hero section with compelling headline
  - About & Services overview
  - Portfolio showcase with 6 service categories
  - Contact form with comprehensive fields
- **Responsive Design**: Fully mobile-optimized
- **Modern UI**: Thin, sleek fonts (Cormorant Garamond & Montserrat)
- **Smooth Animations**: Fade-in effects and hover interactions

## Services Covered

1. Wedding Ceremony
2. Engagement Party
3. Anniversary Celebrations
4. Behind-the-Scenes Content
5. Bachelorette Party
6. Bridal Shower

## Contact Form Fields

The contact form includes all requested fields:
- First Name (required)
- Last Name (required)
- Email (required)
- Phone (required)
- Service Selection dropdown (required)
- Location for content creation (required)
- Preferred date with calendar picker (required)
- How did you hear about us dropdown (required)
- Message textarea (max 1000 characters)

## How to Use

### Option 1: Open Directly
Simply open `index.html` in your web browser.

### Option 2: Local Server (Recommended)
For the best experience, serve the site using a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Customization

### Images
Replace the Unsplash placeholder images with actual photos from @marta.films Instagram:
- Hero section: `.hero-image img`
- About section: `.about-image img`
- Portfolio grid: `.portfolio-item img` (6 images)

### Form Submission
The form currently simulates submission. To connect to a real backend:

1. Update the `contactForm` submit handler in `script.js`
2. Uncomment and modify the fetch API call
3. Point it to your backend endpoint

Example:
```javascript
await fetch('YOUR_API_ENDPOINT', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

### Colors
To adjust the black and white theme, modify CSS variables in `styles.css`:
```css
:root {
    --black: #000000;
    --white: #ffffff;
    --gray-light: #f5f5f5;
    --gray-medium: #cccccc;
    --gray-dark: #333333;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Design Inspiration

Inspired by:
- https://www.josevilla.com/the-book/
- https://digitalsbydelaney.com/kind-words
- https://sobridalsocial.com/

## Contact

For the actual Marta Films:
- Instagram: [@marta.films](https://www.instagram.com/marta.films/)
- Location: New York, NY
- Email: hello@martafilms.com

## License

© 2024 Marta Films. All rights reserved.

# Personal Portfolio Website

A beautiful, modern recreation of a personal portfolio website showcasing research, projects, design work, and personal art.

## Features

- 🎨 Soft gradient backgrounds with pink, purple, and blue tones
- 💫 Smooth animations and hover effects
- 📱 Fully responsive design
- 🎯 Clean, organized sections for research, projects, design, and art
- ✨ Personal aesthetic with decorative text elements

## Quick Start

### Option 1: Deploy to GitHub Pages (Recommended)

1. **Create a new repository** on GitHub (e.g., `username.github.io` or `portfolio`)

2. **Clone this repository** or copy the files to your local machine

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

### Option 2: Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The site will open at `http://localhost:3000`

## Setup Instructions

### 1. Install Node.js and npm

If you haven't already, install Node.js (which includes npm) from [nodejs.org](https://nodejs.org/)

### 2. Create React App

In your project directory, run:

```bash
npx create-react-app my-portfolio
cd my-portfolio
```

### 3. Install Required Dependencies

```bash
npm install lucide-react
npm install gh-pages --save-dev
```

### 4. Replace Files

- Replace `src/App.js` with the `portfolio.jsx` file
- Update `package.json` with the deployment scripts (see below)

### 5. Update package.json

Add these fields to your `package.json`:

```json
{
  "homepage": "https://yourusername.github.io/repository-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

Replace `yourusername` and `repository-name` with your GitHub username and repository name.

## Customization

### Personal Information

Update the following sections in `portfolio.jsx`:

1. **Header**: Change name and navigation links
2. **About Section**: Update introduction, contact info, and interests
3. **Research Section**: Add your research projects with descriptions and links
4. **Projects Section**: Showcase your technical projects
5. **Design Work**: Add your design portfolio pieces
6. **Personal Art**: Share your artwork and creative pieces

### Images

Replace the emoji placeholders with actual images:

```jsx
// Replace emoji placeholders like this:
<div className="text-6xl">👩‍💻</div>

// With actual images:
<img src="/path/to/image.jpg" alt="Description" className="w-full h-full object-cover" />
```

### Colors and Styling

The color scheme uses Tailwind CSS classes. Main color palette:
- Pink: `from-pink-50`, `pink-500`, etc.
- Purple: `from-purple-50`, `purple-500`, etc.
- Blue: `from-blue-50`, `blue-600`, etc.

Modify these in the className attributes to change the theme.

## Project Structure

```
my-portfolio/
├── public/
│   ├── index.html
│   └── images/           # Add your images here
├── src/
│   ├── App.js           # Main portfolio component
│   ├── index.js
│   └── index.css        # Global styles
├── package.json
└── README.md
```

## Deployment Options

### GitHub Pages (Free)

1. Push your code to GitHub
2. Run `npm run deploy`
3. Enable GitHub Pages in repository settings
4. Your site will be live at `https://yourusername.github.io/repository-name`

### Other Options

- **Netlify**: Drag and drop your `build` folder
- **Vercel**: Connect your GitHub repository
- **Custom Domain**: Configure DNS settings to point to your hosting provider

## Adding Real Images

1. Save your images in the `public/images/` directory
2. Reference them in the code:
   ```jsx
   <img src="/images/your-photo.jpg" alt="Description" />
   ```

## Icons

This project uses [Lucide React](https://lucide.dev/) for icons. Available icons include:
- Heart
- Sparkles
- Star
- Mail
- Linkedin
- And many more!

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Tips for Success

1. **Use High-Quality Images**: Optimize images for web (< 500KB each)
2. **Update Links**: Replace all `#` placeholders with real URLs
3. **Add Analytics**: Consider adding Google Analytics to track visitors
4. **SEO**: Update meta tags in `public/index.html` for better search visibility
5. **Mobile Testing**: Always test on different screen sizes

## License

This template is free to use for personal portfolios.

## Support

For questions or issues:
- React documentation: [reactjs.org](https://reactjs.org/)
- Tailwind CSS: [tailwindcss.com](https://tailwindcss.com/)
- GitHub Pages: [pages.github.com](https://pages.github.com/)

---

Made with 💜 for showcasing your amazing work!

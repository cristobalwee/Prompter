# Prompter

A modern, interactive AI prompt testing and comparison platform built with Next.js. Test and compare responses from multiple AI models including Claude, GPT-4, and others in real-time.

## 🚀 Features

- **Multi-Model Testing**: Compare responses from different AI models simultaneously
- **File Upload Support**: Upload images and documents to test multimodal capabilities
- **Real-time Comparison**: See responses from multiple models side-by-side
- **Modern UI**: Beautiful, responsive interface with animations
- **Model Selection**: Choose from various AI providers (Anthropic, OpenAI, Meta, Google)
- **Use Case Templates**: Pre-configured model combinations for different scenarios

## 🛠️ Tech Stack

- **Framework**: Next.js 13 with App Router
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: Framer Motion
- **Authentication**: Clerk (optional)
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd prompter
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Project Structure

```
prompter/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── responses/         # Responses page
├── components/            # React components
│   ├── layout/           # Layout components (header, footer)
│   ├── sections/         # Page sections (hero, models, pricing)
│   └── ui/              # Reusable UI components
├── lib/                  # Utility functions and data
│   ├── models.ts         # AI model definitions
│   └── utils.ts          # Utility functions
├── hooks/                # Custom React hooks
├── public/               # Static assets
│   ├── fonts/           # Custom fonts
│   └── images/          # Images and logos
└── tailwind.config.ts   # Tailwind CSS configuration
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables

Currently, the project doesn't require any environment variables for basic functionality. However, if you plan to integrate with AI APIs, you may need to add:

```env
# Optional: For AI API integrations
ANTHROPIC_API_KEY=your_anthropic_key
OPENAI_API_KEY=your_openai_key
```

### Build Configuration

The project is configured for static export (`output: 'export'` in `next.config.js`), making it suitable for deployment on static hosting platforms.

## 🎨 Customization

### Adding New AI Models

To add new AI models, edit `lib/models.ts`:

```typescript
{
  id: 'your-model-id',
  name: 'Your Model Name',
  provider: 'Provider Name',
  inputPrice: '$X.XX',
  outputPrice: '$X.XX',
  contextWindow: 'XXXk',
  description: 'Model description'
}
```

### Styling

The project uses Tailwind CSS with custom animations. Main styling files:
- `app/globals.css` - Global styles and custom CSS variables
- `tailwind.config.ts` - Tailwind configuration
- Component-specific styles in each component file

## 🚀 Deployment

### Static Export

The project is configured for static export. Build and deploy:

```bash
npm run build
```

The static files will be generated in the `out/` directory.

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The static export makes it compatible with:
- Netlify
- GitHub Pages
- AWS S3
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for beautiful icons

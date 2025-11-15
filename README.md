# Stack Stories

A modern, full-featured blog platform built with Next.js 14+, Supabase, and TypeScript. Create rich content with an integrated Tiptap editor, manage media uploads, and engage with readers through comments and social features.

---

## ✨ Features

### Core Functionality

- **Rich Text Editor**: Tiptap-powered markdown editor with AI assistance
- **Image Management**: Upload and manage post banners and user profile pictures
- **Authentication**: Secure user authentication and authorization via Supabase
- **Comments & Engagement**: Giscus integration for comments and post likes
- **Pagination**: Clean, responsive post browsing with pagination support
- **Responsive Design**: Mobile-first design with Tailwind CSS

### User Experience

- **GSAP Animations**: Smooth, professional page transitions and interactions
- **3D Elements**: Three.js integration for visual enhancements
- **Dark Mode Support**: Theme switching capabilities
- **SEO Optimized**: Server-side rendering for better search engine visibility

### Developer Features

- **TypeScript**: Fully typed for better developer experience
- **Unit Testing**: Jest test suite for reliable code
- **Schema Validation**: Zod for runtime type safety
- **Component Library**: Shadcn/UI components

---

## 🏗️ Architecture

Stack Stories follows a modern **Monolithic Next.js** architecture with **Supabase** as the backend platform.

### Current Architecture

- **Frontend**: Next.js 14+ with React Server Components
- **Backend**: Supabase (Authentication, Database, Storage)
- **Database**: PostgreSQL via Supabase
- **File Storage**: Supabase Storage buckets
- **Comments**: Giscus (GitHub Discussions-based)

### Future Roadmap

- **Analytics Dashboard**: Angular-based Microfrontend architecture
- **Premium Features**: Subscription system for exclusive content
- **Real-time Features**: Live notifications and updates

> **Note**: Spring Boot is used only for local development practice and is **not deployed in production**.

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Components**: Shadcn/UI
- **Animations**: GSAP
- **3D Graphics**: Three.js
- **Rich Text**: Tiptap
- **Validation**: Zod

### Backend & Services

- **BaaS**: Supabase
- **Database**: PostgreSQL
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Comments**: Giscus

### Development

- **Testing**: Jest
- **Linting**: ESLint
- **Formatting**: Prettier

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ahmed-Elgendy25/my-blog-post.git
   cd my-blog-post
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
blog-post-app/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Authentication routes
│   │   ├── signin/
│   │   └── signup/
│   ├── (home)/                   # Home and magazine routes
│   │   ├── magazine/
│   │   └── _components/
│   ├── create-article/           # Article creation
│   ├── shared/                   # Shared components
│   └── api/                      # API routes
├── components/                   # Reusable UI components
│   └── ui/                       # Shadcn/UI components
├── lib/                          # Utility libraries
│   └── supabase/                 # Supabase client setup
├── hooks/                        # Custom React hooks
├── constants/                    # Application constants
├── utils/                        # Utility functions
├── __tests__/                    # Test files
└── public/                       # Static assets
```

---

## 🧪 Testing

Run the test suite:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

---

## 🔑 Environment Variables

| Variable                               | Description                                  | Required |
| -------------------------------------- | -------------------------------------------- | -------- |
| `NEXT_PUBLIC_SUPABASE_URL`             | Your Supabase project URL                    | Yes      |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase anonymous key                       | Yes      |
| `SUPABASE_SERVICE_ROLE_KEY`            | Supabase service role key (server-side only) | Yes      |

---

## 📝 Key Features Explained

### Rich Text Editor

The Tiptap editor provides:

- Markdown support
- Image insertion
- Code blocks with syntax highlighting
- AI-powered content generation
- Real-time preview

### Authentication Flow

1. User signs up with email/password
2. Supabase handles email verification
3. Profile data stored in users table
4. Session managed via cookies

### Image Upload

- Profile images: Stored in `user-img` bucket
- Post banners: Stored in `posts` bucket
- Automatic image optimization
- CDN delivery via Supabase

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Ahmed Elgendy**

- GitHub: [@Ahmed-Elgendy25](https://github.com/Ahmed-Elgendy25)
- Repository: [my-blog-post](https://github.com/Ahmed-Elgendy25/my-blog-post)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Tiptap](https://tiptap.dev/)
- [GSAP](https://greensock.com/gsap/)
- [Giscus](https://giscus.app/)

# Stack Stories

A modern, full-featured blog platform built with Next.js 14+, Supabase, and TypeScript. Create rich content with an integrated Tiptap editor, manage media uploads, and engage with readers through comments and social features.

---

## ✨ Features

### Core Functionality

- **Rich Text Editor**: Tiptap-powered markdown editor with AI-assisted content generation
- **AI Content Generation**: Integrated Google Gemini LLM for intelligent content creation
- **Thumbnail Upload**: Upload custom thumbnails/banners for posts
- **Inline Image Upload**: Upload and embed images directly within post content
- **Content Parsing**: Automatic markdown to HTML conversion with rich formatting
- **Profile Picture Upload**: Upload custom profile pictures during sign-up and profile editing
- **Image Management**: Comprehensive media library for post banners and user avatars
- **Authentication**: Secure user authentication and authorization via Supabase
- **Comments & Engagement**: Giscus integration for comments and post likes
- **Social Sharing**: Share articles on social media platforms (Twitter, Facebook, LinkedIn, etc.)
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
- **Password Recovery**: Forgot password functionality for account recovery

> **Note**: Spring Boot is used only for local development practice and is **not deployed in production**.

---

## 🔄 Rendering Patterns

Stack Stories implements a hybrid rendering strategy using **Static Site Generation (SSG)** combined with **Incremental Static Regeneration (ISR)** to optimize performance, SEO, and content freshness.

### Overview

The application uses Next.js 14+ rendering patterns to balance static generation benefits with dynamic content updates:

- **Static Generation (SSG)**: Pages are pre-rendered at build time for optimal performance
- **Incremental Static Regeneration (ISR)**: Static pages automatically revalidate and regenerate with fresh content
- **On-Demand Generation**: Pages not pre-generated are created on first request and cached

### Implementation Details

#### 1. **Home Page** (`app/(home)/page.tsx`)

**Pattern**: SSG + ISR

```typescript
export const revalidate = 60; // Revalidate every 60 seconds
```

**Behavior**:

- Pre-rendered at build time with initial articles
- Automatically revalidates every 60 seconds
- Shows latest 4 articles without rebuild
- Provides instant load times with fresh content

**Benefits**:

- **Performance**: Static HTML served instantly
- **SEO**: Fully crawlable by search engines
- **Freshness**: Content updates every minute without deployment

---

#### 2. **Magazine Page** (`app/(home)/magazine/page.tsx`)

**Pattern**: SSG + ISR with Dynamic Parameters

```typescript
export const revalidate = 60;

export async function generateStaticParams() {
  // Pre-generate first 10 pages at build time
  return Array.from({ length: 10 }, (_, i) => ({
    page: String(i + 1),
  }));
}
```

**Behavior**:

- **Build Time**: Generates pages 1-10 statically
- **Runtime**: Pages 11+ generated on-demand when first accessed
- **Revalidation**: All pages refresh every 60 seconds
- **Caching**: On-demand pages cached after first request

**Benefits**:

- **Scalability**: Doesn't slow builds with hundreds of pages
- **Efficiency**: Most-visited pages (1-10) pre-built
- **Flexibility**: New pages generated automatically as content grows

---

#### 3. **Article Detail Page** (`app/(home)/magazine/[id]/page.tsx`)

**Pattern**: SSG + ISR with Database-Driven Parameters

```typescript
export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await supabaseRequest(async (supabase) => {
    const { data } = await supabase
      .from("posts")
      .select("id")
      .order("date", { ascending: false })
      .limit(100); // Most recent 100 posts

    return data || [];
  });

  return posts.map((post) => ({ id: post.id }));
}
```

**Behavior**:

- **Build Time**: Generates static HTML for 100 most recent articles
- **Runtime**: Older articles generated on-demand when accessed
- **Revalidation**: All article pages refresh every 60 seconds
- **Database Query**: Fetches post IDs at build time for static generation

**Benefits**:

- **SEO Optimization**: Most important content pre-rendered and indexed
- **Build Performance**: Limits build time by generating only recent posts
- **Complete Coverage**: All articles accessible via on-demand generation
- **Fresh Content**: Comments, likes, and updates appear within 60 seconds

---

### Rendering Flow

```mermaid
graph TD
    subgraph "Build Time (CI/CD)"
        Build[("🏗️ Build Process")]
        Home["Generate Home Page<br/>(Latest 4 articles)"]
        Mag1to10["Generate Magazine Pages<br/>(Pages 1-10)"]
        Top100["Generate Article Pages<br/>(100 most recent posts)"]

        Build --> Home
        Build --> Mag1to10
        Build --> Top100
    end

    subgraph "Runtime - First Request"
        UserReq1[("👤 User Requests<br/>Magazine Page 15")]
        Check1{"Page Exists<br/>in Cache?"}
        Generate1["⚡ Generate Page 15<br/>On-Demand"]
        Cache1["💾 Cache Generated Page"]
        Serve1["📄 Serve Page"]

        UserReq1 --> Check1
        Check1 -->|"No"| Generate1
        Check1 -->|"Yes"| Serve1
        Generate1 --> Cache1
        Cache1 --> Serve1
    end

    subgraph "Runtime - ISR Revalidation"
        Timer["⏱️ 60 Seconds Elapsed"]
        NextReq[("👤 Next Request")]
        ServeStale["📄 Serve Cached Page<br/>(Stale-While-Revalidate)"]
        Regen["🔄 Regenerate in Background"]
        UpdateCache["💾 Update Cache"]

        Timer --> NextReq
        NextReq --> ServeStale
        ServeStale --> Regen
        Regen --> UpdateCache
    end

    subgraph "Data Sources"
        DB[("🗄️ PostgreSQL<br/>Posts & Users")]
        Storage["📦 Supabase Storage<br/>Images"]

        Home -.-> DB
        Mag1to10 -.-> DB
        Top100 -.-> DB
        Generate1 -.-> DB
        Regen -.-> DB

        Home -.-> Storage
        Top100 -.-> Storage
        Generate1 -.-> Storage
        Regen -.-> Storage
    end

    style Build fill:#3b82f6,stroke:#1e40af,color:#fff
    style Home fill:#10b981,stroke:#059669,color:#fff
    style Mag1to10 fill:#10b981,stroke:#059669,color:#fff
    style Top100 fill:#10b981,stroke:#059669,color:#fff
    style Generate1 fill:#f59e0b,stroke:#d97706,color:#fff
    style Regen fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style DB fill:#22c55e,stroke:#16a34a,color:#fff
    style Storage fill:#06b6d4,stroke:#0891b2,color:#fff
```

### Performance Characteristics

| Page Type             | Build Time Generation | On-Demand Generation | Revalidation | Cache Strategy           |
| --------------------- | --------------------- | -------------------- | ------------ | ------------------------ |
| **Home**              | ✅ Always             | ❌ No                | 60s          | Stale-while-revalidate   |
| **Magazine (p1-10)**  | ✅ Yes                | ❌ No                | 60s          | Stale-while-revalidate   |
| **Magazine (p11+)**   | ❌ No                 | ✅ Yes               | 60s          | Generated on first visit |
| **Article (Top 100)** | ✅ Yes                | ❌ No                | 60s          | Stale-while-revalidate   |
| **Article (Older)**   | ❌ No                 | ✅ Yes               | 60s          | Generated on first visit |

### Key Benefits

#### 🚀 Performance

- **TTFB (Time to First Byte)**: < 100ms for pre-rendered pages
- **FCP (First Contentful Paint)**: < 1s with static HTML
- **No Database Queries**: On cached hits, zero database load
- **CDN Distribution**: Static assets served from edge locations

#### 🔍 SEO Optimization

- **Pre-rendered HTML**: Search engines crawl full content immediately
- **Dynamic Meta Tags**: Each page has unique title and description
- **Fresh Content**: Regular revalidation keeps content current for crawlers
- **100% Coverage**: All content accessible via static or on-demand generation

#### 💰 Cost Efficiency

- **Reduced Database Calls**: Cached pages serve thousands of users
- **Lower Server Load**: Static files don't require server processing
- **Bandwidth Optimization**: CDN caching reduces origin requests
- **Predictable Costs**: Build-time generation avoids per-request charges

#### 🔄 Content Freshness

- **60-Second Updates**: Changes appear within a minute
- **No Deployment Needed**: Content updates without rebuild
- **Stale-While-Revalidate**: Users always see content immediately
- **Background Regeneration**: Updates happen transparently

### Configuration Summary

```typescript
// All pages use this configuration
export const revalidate = 60; // ISR: Revalidate every 60 seconds

// Magazine pagination: Pre-generate 10 pages
export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({
    page: String(i + 1),
  }));
}

// Article pages: Pre-generate 100 most recent
export async function generateStaticParams() {
  const posts = await fetchRecentPosts(100);
  return posts.map((post) => ({ id: post.id }));
}
```

---

## 📐 C4 Architecture Diagrams

### Level 1: System Context Diagram

```mermaid
graph TB
    User[("👤 User<br/>(Reader/Author)")]

    subgraph "Stack Stories System"
        StackStories["Stack Stories<br/>Next.js Blog Platform"]
    end

    Supabase["☁️ Supabase<br/>(Auth, DB, Storage)"]
    Giscus["💬 Giscus<br/>(Comments & Likes)"]
    Gemini["🤖 Google Gemini<br/>(AI Content Generation)"]
    SpringBoot["🔧 Spring Boot<br/>(Dev Only)"]

    User -->|"Reads/Writes Posts<br/>Comments<br/>HTTPS"| StackStories
    StackStories -->|"Authentication<br/>Database Queries<br/>File Storage"| Supabase
    StackStories -->|"Load Comments<br/>Post Likes"| Giscus
    StackStories -->|"AI Content Generation"| Gemini
    StackStories -.->|"Dev API Calls<br/>(Local Only)"| SpringBoot

    style StackStories fill:#3b82f6,stroke:#1e40af,color:#fff
    style User fill:#10b981,stroke:#059669,color:#fff
    style Supabase fill:#22c55e,stroke:#16a34a,color:#fff
    style Giscus fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style Gemini fill:#f59e0b,stroke:#d97706,color:#fff
    style SpringBoot fill:#ef4444,stroke:#dc2626,color:#fff,stroke-dasharray: 5 5
```

### Level 2: Container Diagram

```mermaid
graph TB
    User[("👤 User")]

    subgraph "Stack Stories Application"
        NextApp["📱 Next.js Application<br/>(React, TypeScript)<br/>UI, Routing, SSR/ISR"]
        SupabaseClient["🔌 Supabase Client<br/>(JavaScript SDK)<br/>Auth & Data Operations"]
        TiptapEditor["✍️ Tiptap Editor<br/>(React Component)<br/>Rich Text Editing & Parsing"]
        ImageUploader["📸 Image Upload Module<br/>(Thumbnails & Inline Images)"]
        AIIntegration["🤖 AI Content Generator<br/>(Gemini LLM Integration)"]

        NextApp --> SupabaseClient
        NextApp --> TiptapEditor
        NextApp --> ImageUploader
        NextApp --> AIIntegration
        ImageUploader --> SupabaseClient
    end    subgraph "External Services"
        SupabaseCloud["☁️ Supabase Cloud"]
        PostgreSQL[("🗄️ PostgreSQL<br/>Database")]
        Storage["📦 Storage Buckets<br/>(Images & Files)"]
        Auth["🔐 Supabase Auth"]

        SupabaseCloud --> PostgreSQL
        SupabaseCloud --> Storage
        SupabaseCloud --> Auth
    end

    Giscus["💬 Giscus Widget"]
    Gemini["🤖 Gemini API"]

    User -->|"Visits Website"| NextApp
    SupabaseClient -->|"CRUD Operations<br/>Real-time Subscriptions"| SupabaseCloud
    NextApp -->|"Embed Comments"| Giscus
    NextApp -->|"Generate Content"| Gemini

    style NextApp fill:#3b82f6,stroke:#1e40af,color:#fff
    style SupabaseClient fill:#06b6d4,stroke:#0891b2,color:#fff
    style TiptapEditor fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style SupabaseCloud fill:#22c55e,stroke:#16a34a,color:#fff
    style User fill:#10b981,stroke:#059669,color:#fff
```

### Level 3: Component Diagram

```mermaid
graph TB
    subgraph "Next.js Application Components"
        subgraph "Presentation Layer"
            Pages["📄 Pages<br/>(Home, Magazine, Article)"]
            Layouts["🎨 Layouts<br/>(Auth, Home, Article)"]
            UIComponents["🧩 UI Components<br/>(Shadcn/UI)"]
        end

        subgraph "Feature Modules"
            AuthModule["🔐 Auth Module<br/>(Sign In/Up, Profile Picture)"]
            PostModule["📝 Post Module<br/>(Create, Edit, List)"]
            CommentModule["💬 Comment Module<br/>(Giscus Integration)"]
            EditorModule["✍️ Editor Module<br/>(Tiptap, Markdown Parser)"]
            UploadModule["📸 Upload Module<br/>(Thumbnails, Inline Images, Profiles)"]
            AIModule["🤖 AI Module<br/>(Gemini Content Generation)"]
        end

        subgraph "Data Layer"
            Actions["⚡ Server Actions<br/>(CRUD Operations)"]
            Schemas["📋 Zod Schemas<br/>(Validation)"]
            SupabaseLib["🔌 Supabase Lib<br/>(Client, Server, Request)"]
        end

        subgraph "API Routes"
            GeminiAPI["🤖 /api/gemini<br/>(AI Generation)"]
        end

        Pages --> Layouts
        Layouts --> UIComponents
        Pages --> AuthModule
        Pages --> PostModule
        Pages --> EditorModule
        PostModule --> Actions
        AuthModule --> Actions
        AuthModule --> UploadModule
        EditorModule --> Actions
        EditorModule --> UploadModule
        EditorModule --> AIModule
        AIModule --> GeminiAPI
        UploadModule --> Actions
        Actions --> Schemas
        Actions --> SupabaseLib
        PostModule --> CommentModule
    end

    SupabaseCloud[("☁️ Supabase")]
    GeminiService["🤖 Gemini API"]

    SupabaseLib -->|"Database & Storage"| SupabaseCloud
    GeminiAPI -->|"AI Requests"| GeminiService

    style Pages fill:#3b82f6,stroke:#1e40af,color:#fff
    style AuthModule fill:#10b981,stroke:#059669,color:#fff
    style PostModule fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style EditorModule fill:#f59e0b,stroke:#d97706,color:#fff
    style Actions fill:#06b6d4,stroke:#0891b2,color:#fff
    style SupabaseLib fill:#22c55e,stroke:#16a34a,color:#fff
```

### Level 4: Code Diagram - Post Module

```mermaid
graph TB
    subgraph "Post Module - Detailed Structure"
        subgraph "Components"
            PostHero["PostHero.tsx<br/>Main post display"]
            PostSection["PostSection.tsx<br/>Post list item"]
            PostDescription["PostDescription.tsx<br/>Metadata display"]
            MagazineCard["MagazineCard.tsx<br/>Grid card view"]
            ThumbnailUpload["ThumbnailUpload.tsx<br/>Banner image uploader"]
            ContentPreview["content-preview.tsx<br/>Markdown renderer"]
        end

        subgraph "Actions (Server)"
            GetPosts["GetPaginatedArticles.ts<br/>Fetch posts with pagination"]
            GetSpecific["GetSpecificPost.ts<br/>Fetch single post"]
            GetImages["GetImagesPost.ts<br/>Fetch post images"]
            GetUser["GetUserById.ts<br/>Fetch author info"]
            UploadImage["UploadImage.ts<br/>Upload inline images"]
            UploadBanner["UploadBanner.ts<br/>Upload post thumbnails"]
            FetchAI["FetchStreamedAI.ts<br/>Generate content via Gemini"]
        end        subgraph "Schema & Types"
            PostSchema["posts.model.ts<br/>Post type definitions"]
            PaginatedSchema["PaginatedArticles.ts<br/>Pagination types"]
        end

        subgraph "Supabase Integration"
            SupabaseRequest["supabaseRequest()<br/>Centralized request handler"]
            ServerClient["createClient()<br/>Server-side client"]
        end

        PostHero --> GetPosts
        PostHero --> GetUser
        PostSection --> PostDescription
        MagazineCard --> GetSpecific
        ThumbnailUpload --> UploadBanner
        ContentPreview --> GetImages

        GetPosts --> SupabaseRequest
        GetSpecific --> SupabaseRequest
        GetImages --> SupabaseRequest
        GetUser --> SupabaseRequest
        UploadImage --> SupabaseRequest
        UploadBanner --> SupabaseRequest
        FetchAI --> GeminiAPI

        SupabaseRequest --> ServerClient

        GetPosts --> PostSchema
        GetPosts --> PaginatedSchema
    end

    Database[("PostgreSQL<br/>posts table<br/>users table")]
    StorageBucket["Storage Bucket<br/>post images"]

    ServerClient -->|"SQL Queries<br/>Joins (posts + users)"| Database
    GetImages -->|"List & Download"| StorageBucket

    style PostHero fill:#3b82f6,stroke:#1e40af,color:#fff
    style GetPosts fill:#10b981,stroke:#059669,color:#fff
    style SupabaseRequest fill:#22c55e,stroke:#16a34a,color:#fff
    style Database fill:#8b5cf6,stroke:#7c3aed,color:#fff
```

### Data Flow - Create Article

```mermaid
sequenceDiagram
    actor User
    participant Editor as Tiptap Editor
    participant Parser as Markdown Parser
    participant AI as Gemini API
    participant ThumbUpload as Thumbnail Upload
    participant ImageUpload as Inline Image Upload
    participant Action as CreatePost Action
    participant Supabase as Supabase
    participant DB as PostgreSQL
    participant Storage as Storage Bucket

    User->>Editor: Start writing post
    User->>AI: Request AI-generated content
    AI-->>Editor: Stream generated text
    Editor->>Parser: Parse markdown to HTML
    Parser-->>Editor: Render formatted content
    User->>ImageUpload: Upload inline image
    ImageUpload->>Storage: Store in posts bucket
    Storage-->>ImageUpload: Return image URL
    ImageUpload-->>Editor: Insert image in content
    User->>ThumbUpload: Upload post thumbnail/banner
    ThumbUpload->>Storage: Store banner image
    Storage-->>ThumbUpload: Return banner URL
    User->>Editor: Submit complete post
    Editor->>Action: Call CreatePost()
    Action->>Supabase: Validate & authenticate
    Supabase->>DB: Insert post with parsed content
    DB-->>Supabase: Confirm insertion
    Supabase-->>Action: Return post ID & success
    Action-->>User: Redirect to published post
```

### Data Flow - Sign Up with Profile Picture

```mermaid
sequenceDiagram
    actor User
    participant SignUpForm as Sign Up Form
    participant ProfileUpload as Profile Picture Upload
    participant Action as SignupSubmission Action
    participant Supabase as Supabase
    participant Auth as Supabase Auth
    participant Storage as Storage Bucket
    participant DB as PostgreSQL (users table)

    User->>SignUpForm: Enter details (email, password, name)
    User->>ProfileUpload: Upload profile picture
    ProfileUpload->>ProfileUpload: Validate image (type, size)
    User->>SignUpForm: Submit registration
    SignUpForm->>Action: Call signupSubmit()
    Action->>Auth: Create auth account
    Auth-->>Action: Return user ID
    Action->>Storage: Upload profile image to user-img bucket
    Storage-->>Action: Return image URL
    Action->>DB: Insert user profile data
    DB-->>Action: Confirm user created
    Action-->>SignUpForm: Registration success
    SignUpForm-->>User: Redirect to sign in
```

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

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

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

## 👤 Author

**Ahmed Elgendy**

- GitHub: [@Ahmed-Elgendy25](https://github.com/Ahmed-Elgendy25)
- Repository: [my-blog-post](https://github.com/Ahmed-Elgendy25/my-blog-post)

---

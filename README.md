# Da Vinci Board Game - Frontend Developer Task

A modern React + TypeScript application built with Vite, featuring full CRUD operations for Users and Posts with a clean, responsive UI.

## 🔗 Links

- **Live Demo**: [https://davinciboardgame-task.vercel.app](https://davinciboardgame-task.vercel.app)
- **GitHub Repository**: [https://github.com/mburakaltiparmak/davinciboardgame_task](https://github.com/mburakaltiparmak/davinciboardgame_task)

## 👨‍💻 Developer

**Mehmet Burak Altıparmak**
- Email: mburakaltiparmak@gmail.com
- GitHub: [@mburakaltiparmak](https://github.com/mburakaltiparmak)
- Position: Frontend Developer Candidate for Da Vinci Board Game

## 📋 Project Overview

This project is a Phase 1 assessment task for the Frontend Developer position at Da Vinci Board Game. It demonstrates proficiency in modern React development, TypeScript, and creating intuitive user interfaces with full CRUD functionality.

### ✨ Features

- **User Management**: Complete CRUD operations for users
- **Post Management**: Full CRUD functionality for posts
- **Data Relationships**: Users and posts are connected via userId field
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI/UX**: Clean, intuitive interface with smooth interactions
- **Type Safety**: Full TypeScript implementation
- **Code Quality**: ESLint configuration with strict rules
- **Form Validation**: React Hook Form with Yup validation
- **Routing**: React Router v7 for navigation

## 🛠️ Technology Stack

- **Framework**: React 18.3.1
- **Language**: TypeScript 5.5.3
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **Routing**: React Router DOM 7.8.2
- **Forms**: React Hook Form 7.48.2
- **Validation**: Yup 1.4.0
- **Icons**: Lucide React 0.542.0
- **Linting**: ESLint 9.35.0
- **Code Formatting**: Prettier 3.6.2

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mburakaltiparmak/davinciboardgame_task.git
   cd davinciboardgame_task
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run type-check` - Run TypeScript type checking

## 🏗️ Project Structure

```
src/
├── api/                    # API configuration and functions
├── components/             # Reusable UI components
│   ├── ui/            # Shared components
│   ├── layout/            # Layout components
│   ├── posts/        # Post detail specific components
│   └── users/        # User detail specific components
├── hooks/                 # Custom React hooks
├── pages/                 # Page components
├── types/                 # TypeScript type definitions
└── main.tsx              # Application entry point
```

## 🔄 CRUD Operations

### Users
- **Create**: Add new users with complete profile information
- **Read**: View user lists and detailed user profiles
- **Update**: Edit user information including personal details, address, and company
- **Delete**: Remove users from the system

### Posts
- **Create**: Add new posts with title and content
- **Read**: Browse posts and view detailed post content
- **Update**: Edit post titles and content
- **Delete**: Remove posts from the system

### Data Relationships
- Posts are linked to users through the `userId` field
- User profiles display all posts created by that user
- Post details show author information

## 🎨 UI/UX Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Loading States**: Smooth loading indicators throughout the app
- **Error Handling**: User-friendly error messages and fallbacks
- **Confirmation Modals**: Delete confirmations to prevent accidental data loss
- **Form Validation**: Real-time form validation with helpful error messages
- **Modern Styling**: Clean, professional design with subtle animations

## 🔧 Code Quality

- **ESLint Configuration**: Strict linting rules for consistent code quality
- **TypeScript**: Full type safety throughout the application
- **Component Architecture**: Modular, reusable component structure
- **Custom Hooks**: Separated business logic into reusable hooks
- **Error Boundaries**: Graceful error handling and recovery

## 📊 Data Source

The application fetches sample data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/), a free fake API for testing and prototyping.

### API Endpoints Used:
- Users: `https://jsonplaceholder.typicode.com/users`
- Posts: `https://jsonplaceholder.typicode.com/posts`

## 🚀 Deployment

This project is deployed on Vercel and automatically deploys from the main branch.

**Live URL**: [https://davinciboardgame-task.vercel.app](https://davinciboardgame-task.vercel.app)

## 📝 Development Process

This project was developed as part of the Frontend Developer assessment for Da Vinci Board Game. The development focused on:

1. **Modern React Patterns**: Using functional components, hooks, and modern JavaScript features
2. **Type Safety**: Comprehensive TypeScript implementation
3. **User Experience**: Intuitive navigation and responsive design
4. **Code Quality**: Following best practices and maintaining clean, readable code
5. **Performance**: Optimized builds and efficient rendering

## 🤝 Contributing

This is an assessment project, but feedback and suggestions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is created specifically for the Da Vinci Board Game Frontend Developer assessment. All rights reserved.

---

**Note**: This project is part of a technical assessment for Da Vinci Board Game's Frontend Developer position. It demonstrates modern React development skills, TypeScript proficiency, and the ability to create user-friendly web applications with full CRUD functionality.
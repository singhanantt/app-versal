# Feedback Form Builder

A modern SaaS-style Feedback Form Builder built with **ReactJS, Vite, JavaScript, Tailwind CSS, and Context API**.

Users can customize feedback form screens and instantly preview changes inside a realistic mobile device mockup. The application is fully frontend-based and updates in real time without requiring any backend.

## Live Demo

🚀 Live Application: https://app-versal-tau.vercel.app/

## Features

### Content Customization

#### Initial Feedback Screen

* Custom Title
* Custom Subtitle

#### Feedback Screen

* Rating Type Selection

  * Stars (1–5)
  * Numbers (1–5)
* Dynamic Feedback Options

  * Add options
  * Delete options
* Additional Comment Toggle
* Custom Submit Button Text

#### Thank You Screen

* Upload Media

  * PNG
  * JPG
  * JPEG
  * GIF
  * Lottie JSON
* Custom Thank You Title
* Custom Thank You Subtitle
* Custom Button Text

### Style Customization

#### Colors

* Background Color
* Title Color
* Subtitle Color
* Button Color
* Button Text Color
* Selected Rating Color
* Unselected Rating Color

#### Typography

* Title Font Size
* Subtitle Font Size
* Title Font Weight
* Subtitle Font Weight

#### Layout Controls

* Border Radius
* Button Width
* Button Height

### Live Mobile Preview

* Real-time updates
* Mobile device mockup
* Screen navigation tabs

  * Initial Screen
  * Feedback Screen
  * Thank You Screen

## Tech Stack

* ReactJS
* Vite
* JavaScript
* Tailwind CSS
* React Context API
* useReducer
* Lottie React
* Lucide React

## Installation

Clone the repository:

```bash
git clone https://github.com/singhanantt/app-versal.git
```

Navigate to the project:

```bash
cd app-versal
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

```text
src/
├── components/
│   ├── MobilePreview.jsx
│   ├── InitialScreen.jsx
│   ├── FeedbackScreen.jsx
│   ├── ThankYouScreen.jsx
│   ├── ColorPicker.jsx
│   ├── SliderControl.jsx
│   └── DynamicOptions.jsx
│
├── context/
│   └── FormBuilderContext.jsx
│
├── pages/
│   └── Builder.jsx
│
├── App.jsx
└── main.jsx
```

## Highlights

* Fully responsive design
* Frontend-only architecture
* Context API state management
* Reusable React components
* Modern SaaS dashboard UI
* Sticky live preview panel
* Smooth interactions and transitions
* Real-time customization experience

## Author

**Anant Singh**

GitHub: https://github.com/singhanantt

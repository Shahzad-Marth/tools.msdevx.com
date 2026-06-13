# MS DevX Tools

A collection of **free, browser-based online tools** — calculators, converters, generators, text tools, health & finance utilities, and more. All tools run client-side with no data sent to servers.

🌐 **Live site:** [tools.msdevx.com](https://tools.msdevx.com)

---

## Tools

### Calculators
Age Calculator, Date Calculator, Date Difference, Percentage Calculator, GPA Calculator, CGPA to Percentage, BMI/BMR/TDEE calculators, Calorie & Macro calculators, Loan & EMI calculators, Tip Calculator, Budget Percentage Calculator, and more.

### Converters
Unit Converter (metric/imperial), Case Converter, Image to PDF, Merge PDF, Split PDF, PDF Compressor, PDF to Text, PDF to Images.

### Text Tools
Word Counter, Character Counter, JSON Formatter, Lorem Ipsum Generator, Text Diff Checker, Capitalize Text, Edit Counter, Reading Time Estimator.

### Security
Password Generator, Password Strength Checker.

### Health & Fitness
Sleep Calculator, Body Fat Calculator, Ideal Weight Calculator, Heart Rate Zone Calculator, Running Pace Calculator, Steps to Calories, Water Intake Calculator, Sugar Intake Calculator, Caffeine Calculator, One Rep Max Calculator, VO2 Max Estimator, Push-Up Calorie Calculator, Pregnancy Due Date Calculator, Breathing Exercise Tool, Meditation Timer, Intermittent Fasting Timer, Screen Time Break Reminder.

### Utilities
QR Code Generator, Countdown Timer, Exam Countdown Timer, Pomodoro Timer, Study Timer, Typing Speed Test, Random Decision Maker, Savings Goal Tracker, Time Zone Converter, Work Hours Calculator, Image Compressor, Life Age in Fun Units, Name Compatibility Calculator.

### Academic
GPA Calculator, CGPA to Percentage, Study Timer, Exam Countdown Timer.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router)
- **Language:** JavaScript (JSX)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) 3
- **Icons:** [Lucide React](https://lucide.dev/)
- **Search:** [Fuse.js](https://fusejs.io/)
- **PDF:** pdf-lib, pdfjs-dist
- **QR Codes:** [qrcode](https://github.com/soldair/node-qrcode)
- **Deployment:** Vercel

---

## Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev
# -> http://localhost:3000

# Production build
npm run build

# Start production server
npm start
```

---

## Project Structure

```
├── public/              # Static assets, OG images, icons
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/
│   │   ├── tools/       # Tool component implementations
│   │   ├── layout/      # Navbar, Footer, ThemeProvider
│   │   ├── blog/        # Blog components
│   │   ├── ui/          # Shared UI components
│   │   └── search/      # Search modal
│   └── data/
│       ├── registry/    # Tool/blog/category registries
│       └── blogContent/ # Blog post content
├── scripts/             # Build/generation scripts
└── playstore/           # Play Store listing assets
```

---

## License

[MIT](LICENSE) — Copyright (c) 2025 Khurram Shahzad

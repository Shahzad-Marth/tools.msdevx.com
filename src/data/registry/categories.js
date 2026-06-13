import { categories as baseCategories } from "./tools-data";
import { blogs } from "./blogs";
import { siteConfig } from "@/data/site";

const FEATURED_TOOLS_BY_CATEGORY = {
  "date-time": ["age-calculator", "date-calculator", "countdown-timer"],
  "finance": ["emi-calculator", "tip-calculator", "budget-percentage-calculator"],
  "converter": ["unit-converter"],
  "math": ["percentage-calculator", "random-decision-maker"],
  "health": ["sleep-calculator", "tdee-calculator", "bmr-calculator", "calories-burned-calculator"],
  "text": ["word-counter", "character-counter", "json-formatter"],
  "security": ["password-generator", "password-strength-checker"],
  "utilities": ["qr-code-generator", "typing-speed-test", "pomodoro-timer"],
  "academic": ["gpa-calculator", "cgpa-to-percentage"],
};

const ALT_SLUGS = {
  "date-time": "date-time-tools",
  "finance": "finance-tools",
  "converter": "converter-tools",
  "math": "math-tools",
  "health": "health-tools",
  "text": "text-tools",
  "security": "security-tools",
  "utilities": "utility-tools",
  "academic": "academic-tools",
};

const SEO_DESCRIPTIONS = {
  "date-time": "Date and time calculators for age, duration, schedules, and more.",
  "finance": "Financial calculators for loans, budgets, tips, and savings.",
  "converter": "Unit and measurement converters for everyday use.",
  "math": "Math calculators for percentages, random decisions, and more.",
  "health": "Health and fitness calculators for wellness tracking.",
  "text": "Text processing tools for writing, editing, and formatting.",
  "security": "Security tools for passwords and online safety.",
  "utilities": "General utility tools for daily tasks.",
  "academic": "Academic calculators for GPA, CGPA, and grades.",
};

const BLOG_CATEGORY_MAP = {
  "date-time": "Date & Time",
  "finance": "Finance",
  "math": "Math",
  "health": "Health",
  "text": "Text Tools",
  "security": "Security",
};

const LONG_DESCRIPTIONS = {
  "date-time": "Our collection of date and time calculators helps you manage schedules, track deadlines, and calculate durations with precision. Whether you need to find your exact age, calculate days between dates, set countdowns, or convert time zones, these tools provide instant, accurate results for personal and professional use.",
  "finance": "Take control of your finances with our free financial calculators. Calculate loan EMIs, compare loan options, split bills and tips, track savings goals, and analyze your budget distribution. Each tool is designed to give you clear, actionable insights without any signup or complex spreadsheets.",
  "converter": "Convert between units of length, weight, temperature, area, volume, speed, time, and digital storage with our fast unit converter. Whether you need metric to imperial conversions or specialized unit translations, get accurate results in real time.",
  "math": "Solve everyday math problems with our free calculators. Calculate percentages, make random decisions, and handle common mathematical operations. Each tool is built for simplicity — enter your numbers and get instant results.",
  "health": "Achieve your wellness goals with our comprehensive health and fitness calculators. Calculate your TDEE, BMR, body fat percentage, ideal weight, protein needs, calories burned during exercise, heart rate training zones, and more. Backed by validated formulas like Mifflin-St Jeor, Karvonen, and US Navy methods.",
  "text": "Edit, format, and analyze text with our free text processing tools. Count words and characters, convert text case, compare text differences, format JSON, generate placeholder text, and more. Essential tools for writers, developers, students, and SEO professionals.",
  "security": "Protect your online accounts with our security tools. Generate strong random passwords, check password strength with real-time feedback, and learn best practices for digital security. All processing happens locally in your browser — nothing is sent to any server.",
  "utilities": "Boost your productivity with our general utility tools. Generate QR codes, test your typing speed, stay focused with Pomodoro timers, track study sessions, manage exam countdowns, and take regular screen breaks. Practical tools for daily tasks.",
   "academic": "Excel in your studies with our academic calculators. Calculate your semester GPA and cumulative CGPA, convert CGPA to percentage using university-specific formulas from CBSE, VTU, Anna University, Mumbai University, and more.",
};

const GUIDE_CONTENT = {
  "date-time": "Date and time tools help you track, calculate, and plan around time. Use the Age Calculator to find exact age in years, months, and days. The Date Difference Calculator measures days between any two dates — useful for project deadlines, event planning, or countdowns. The Time Zone Converter helps schedule meetings across time zones. Work Hours Calculator tracks billable hours or shift times.",
  "finance": "Financial calculators put you in control of your money. The EMI Calculator shows monthly loan payments using principal, rate, and tenure inputs. Use the Tip Calculator to split bills fairly. The Savings Goal Tracker visualizes progress toward any savings target. Compare up to three loan offers side by side with the Loan Comparison Calculator. The Budget Percentage Calculator helps track spending using the 50/30/20 rule or custom categories.",
  "converter": "The Unit Converter handles length, weight, temperature, area, volume, speed, time, and digital storage. Select a category, choose source and target units, and enter your value — results update instantly. Common conversions include kilometers to miles, Celsius to Fahrenheit, kilograms to pounds, and MB to GB. All conversions use standard formulas and precise conversion factors.",
  "math": "Math tools solve everyday calculations instantly. The Percentage Calculator handles discounts, tips, tax rates, and percentage change between two values. The Random Decision Maker offers a Yes/No oracle, coin flip, custom list picker, and spinning wheel for unbiased decisions. Results are instant and client-side only.",
  "health": "Health calculators help track wellness metrics using validated formulas. The TDEE Calculator estimates daily calorie needs using the Mifflin-St Jeor equation. The BMR Calculator shows resting calorie burn. The Body Fat Calculator uses the US Navy circumference method. Heart Rate Zone Calculator applies the Karvonen formula for training zones. The Calories Burned Calculator uses MET values for over 60 activities. Always consult a healthcare provider before making medical decisions based on these estimates.",
  "text": "Text processing tools handle writing, editing, and formatting tasks. Word Counter and Character Counter provide live counts as you type. The Case Converter switches between lowercase, UPPERCASE, Title Case, and Sentence Case. JSON Formatter beautifies or minifies JSON with validation. The Text Diff Checker compares two texts side by side. Reading Time Estimator predicts how long a text takes to read at your preferred WPM.",
  "security": "Security tools help protect your online accounts. The Password Generator creates strong passwords with customizable length and character types. The Password Strength Checker analyzes password length, character variety, and common patterns to score security level. All processing happens locally in your browser — nothing is ever sent to any server.",
  "utilities": "Utility tools cover everyday digital tasks. The QR Code Generator creates QR codes for URLs, text, WiFi networks, emails, phone numbers, and SMS. Typing Speed Test measures WPM and accuracy with real-time feedback. The Pomodoro Timer helps maintain focus with customizable work/break intervals. Study Timer and Exam Countdown Timer help track academic sessions and deadlines.",
  "academic": "Academic calculators support students with grades and study planning. The GPA Calculator handles 4.0, 5.0, and 10.0 scales with semester and cumulative views. The CGPA to Percentage converter uses university-specific formulas from CBSE, VTU, Anna University, Mumbai University, KTU, MAKAUT, and more. The Study Timer tracks focused study sessions with pause/resume and daily history.",
};

const FAQS = {
  "date-time": [
    { q: "How do I calculate the exact difference between two dates?", a: "Use our Date Difference Calculator. Select a start and end date to see the duration in years, months, weeks, days, hours, minutes, and seconds. You can also toggle business days mode to exclude weekends." },
    { q: "How do I find my exact age?", a: "Enter your date of birth in the Age Calculator to see your precise age in years, months, days, hours, minutes, and seconds. The results update automatically as you change your birth date." },
    { q: "What is a good way to track time for work shifts?", a: "Our Work Hours Calculator lets you log clock-in and clock-out times, deduct breaks, and view total hours worked including overtime. You can track multiple days in a weekly view." },
    { q: "How do I set a countdown for an event?", a: "Use the Countdown Timer — enter a target date and time, optionally name your countdown, and watch the live ticker count down in days, hours, minutes, and seconds." },
    { q: "Can I compare times across different cities?", a: "Yes, the Time Zone Converter lets you add multiple cities, view live clocks with DST support, and find overlapping business hours for scheduling meetings across time zones." },
  ],
  "finance": [
    { q: "How is loan EMI calculated?", a: "EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n-1), where P is the loan amount, r is the monthly interest rate, and n is the number of monthly installments. Our calculator does this instantly." },
    { q: "How should I split a bill with friends?", a: "Use the Tip Calculator — enter the total bill, select a tip percentage, and set the number of people. You'll see the tip amount, total bill, and exactly how much each person should pay." },
    { q: "How do I compare two or more loan offers?", a: "The Loan Comparison Calculator lets you enter up to 3 loan offers side by side. Compare monthly payments, total interest, and total cost to find the most affordable option." },
    { q: "How do I set and track a savings goal?", a: "Enter your target savings amount and how much you can save monthly. The Savings Goal Tracker shows how many months you need to reach your goal and lets you adjust the timeline." },
    { q: "What is the 50/30/20 budget rule?", a: "The 50/30/20 rule allocates 50% of income to needs, 30% to wants, and 20% to savings. Our Budget Percentage Calculator visualizes your spending across any custom categories." },
  ],
  "converter": [
    { q: "How do I convert kilometers to miles?", a: "Select the Length category in our Unit Converter, choose kilometers as the source unit and miles as the target unit. Enter your value to get the instant conversion. 1 km = 0.621371 miles." },
    { q: "How do I convert Celsius to Fahrenheit?", a: "Select the Temperature category, choose Celsius as the source and Fahrenheit as the target. Enter the temperature. Formula: (°C × 9/5) + 32 = °F." },
    { q: "What units can I convert with this tool?", a: "Our Unit Converter supports 8+ categories: length, weight, temperature, area, volume, speed, time, and digital storage with instant live conversion." },
  ],
  "math": [
    { q: "How do I calculate a percentage of a number?", a: "Enter the total value and the percentage you want. For example, to find 20% of 80, enter 80 as the total and 20 as the percentage to get 16." },
    { q: "How do I use the Random Decision Maker?", a: "Choose from four modes: Yes/No Oracle, Coin Flip, Custom List Picker, or animated Spinning Wheel. Enter your options and get a random result instantly." },
    { q: "What is percentage change and how do I calculate it?", a: "Percentage change measures the difference between an old and new value: ((new - old) / old) × 100. A positive result means an increase, negative means a decrease." },
  ],
  "health": [
    { q: "What is TDEE and how is it calculated?", a: "TDEE (Total Daily Energy Expenditure) is the total calories you burn daily including activity. It's calculated using your BMR multiplied by an activity factor. Our calculator uses the Mifflin-St Jeor equation, one of the most accurate formulas." },
    { q: "What is BMR and why does it matter?", a: "BMR (Basal Metabolic Rate) is the calories your body burns at complete rest — essential functions like breathing, circulation, and cell production. It accounts for about 60-75% of your daily calorie burn." },
    { q: "How do I calculate my body fat percentage?", a: "Use our Body Fat Calculator with the US Navy circumference method. Measure your waist, neck, height (and hips for women), enter the values, and get your estimated body fat percentage, fat mass, and lean mass." },
    { q: "How much water should I drink per day?", a: "Water needs vary by weight, activity level, and climate. Our Water Intake Calculator personalizes your recommendation — typically 2-4 liters for most adults — shown in liters, milliliters, cups, and bottles." },
    { q: "What are heart rate training zones?", a: "Heart rate zones are five intensity ranges based on your maximum heart rate: warm-up (50-60%), fat burn (60-70%), cardio (70-80%), anaerobic (80-90%), and peak (90-100%). Our calculator uses the Karvonen method for precision." },
    { q: "How do I calculate my running pace?", a: "Enter your distance and total time into the Running Pace Calculator. You'll get your pace per km and per mile, speed in km/h and mph, plus estimated finish times for common race distances." },
    { q: "How many calories do I burn during exercise?", a: "Our Calories Burned Calculator uses MET (Metabolic Equivalent) values for 60+ activities. Enter your weight, duration, and activity type to see total calories burned, per-minute rate, and per-hour rate." },
    { q: "What is a one rep max and how is it calculated?", a: "One rep max (1RM) is the maximum weight you can lift for one repetition. Our calculator estimates it using four validated formulas (Epley, Brzycki, Lombardi, Lander) based on the weight and reps you can complete." },
  ],
  "text": [
    { q: "How do I count words and characters in a text?", a: "Paste your text into the Word Counter or Character Counter. Both provide live counts for words, characters, sentences, paragraphs, and lines as you type or paste." },
    { q: "How do I format and validate JSON?", a: "Paste your JSON into the JSON Formatter & Validator, then click Format to beautify with proper indentation or Minify to compress. Click Validate to check for syntax errors with detailed messages." },
    { q: "How can I compare two texts to see what changed?", a: "Use the Text Diff Checker — paste the original text on the left and the modified text on the right. Additions appear in green, removals in red, and unchanged content in neutral." },
    { q: "How do I convert text between different cases?", a: "The Case Converter lets you switch between lowercase, UPPERCASE, Title Case, Sentence Case, and tOGGLE cASE instantly. Type or paste your text and select the desired case." },
    { q: "How do I estimate how long it takes to read a text?", a: "Paste your text into the Reading Time Estimator. It calculates reading time based on word count and customizable WPM (words per minute, default 200)." },
  ],
  "security": [
    { q: "How do I create a strong password?", a: "Use the Password Generator to create secure passwords. Set the length (8-64 characters) and toggle character types: uppercase, lowercase, numbers, and symbols. Longer passwords with all character types are strongest." },
    { q: "How do I check if my password is secure?", a: "Type your password into the Password Strength Checker. It analyzes length, character variety, and common patterns, then displays a strength meter with specific feedback on how to improve it." },
    { q: "What makes a password strong?", a: "A strong password has at least 12 characters, includes uppercase and lowercase letters, numbers, and symbols, avoids common words and patterns, and is unique across different services." },
    { q: "Should I use a password manager?", a: "Yes — password managers generate and store strong, unique passwords for each of your accounts. Our Password Generator can create strong passwords that you can store in your preferred password manager." },
  ],
  "utilities": [
    { q: "How do I generate a QR code?", a: "Select your QR code type (URL, Text, Email, Phone, WiFi, or SMS), fill in the details, and click Generate. Download the QR code as a PNG image for printing or digital sharing." },
    { q: "How do I test my typing speed?", a: "Choose a difficulty level (easy, medium, or hard), click Start, and type the displayed text as accurately and quickly as possible. View your WPM score, accuracy percentage, and detailed stats at the end." },
    { q: "What is the Pomodoro technique?", a: "The Pomodoro technique alternates focused work sessions (typically 25 minutes) with short breaks (5 minutes). After 4 sessions, take a longer break (15-30 minutes). Our Pomodoro Timer automates this cycle." },
    { q: "How do I set up an exam countdown?", a: "Our Exam Countdown Timer lets you create multiple named countdown cards with theme colors. Set the exam date and time for each, and they persist in your browser across sessions." },
    { q: "What is the 20-20-20 rule for screen breaks?", a: "Every 20 minutes, look at something 20 feet away for 20 seconds to reduce digital eye strain. Our Screen Time Break Reminder can be set to any interval and includes eye care tips." },
  ],
  "academic": [
    { q: "How do I calculate my semester GPA?", a: "Use the GPA Calculator — add each course with its credit hours and letter grade. The calculator supports 4.0, 5.0, and 10.0 scales and shows your semester GPA and cumulative CGPA instantly." },
    { q: "How do I convert CGPA to percentage?", a: "Select your university or grading system, enter your CGPA, and get the equivalent percentage using the correct formula. Supports CBSE, VTU, Anna University, Mumbai University, KTU, MAKAUT, and more." },
    { q: "What is the difference between GPA and CGPA?", a: "GPA (Grade Point Average) typically refers to a single semester's average. CGPA (Cumulative Grade Point Average) is the overall average across all completed semesters." },
    { q: "How is CGPA calculated?", a: "CGPA is calculated by dividing the total grade points earned across all semesters by the total credit hours attempted. Each letter grade has a corresponding grade point value based on your institution's scale." },
  ],
};

const baseUrl = siteConfig.baseUrl;

const TOOL_SLUGS_BY_VIRTUAL_CATEGORY = {
  "fitness": [
    "tdee-calculator",
    "bmr-calculator",
    "body-fat-calculator",
    "ideal-weight-calculator",
    "protein-intake-calculator",
    "steps-to-calories-calculator",
    "calories-burned-calculator",
    "heart-rate-zone-calculator",
    "macro-calculator",
    "intermittent-fasting-timer",
    "running-pace-calculator",
    "one-rep-max-calculator",
    "vo2-max-estimator",
    "push-up-calorie-calculator",
  ],
  "productivity": [
    "pomodoro-timer",
    "study-timer",
    "exam-countdown-timer",
    "screen-time-break-reminder",
    "typing-speed-test",
    "countdown-timer",
    "work-hours-calculator",
  ],
  "student": [
    "gpa-calculator",
    "cgpa-to-percentage",
    "study-timer",
    "exam-countdown-timer",
    "word-counter",
    "character-counter",
    "reading-time-estimator",
    "lorem-ipsum-generator",
  ],
  "calculators": [
    "age-calculator", "date-calculator", "time-calculator", "work-hours-calculator",
    "emi-calculator", "percentage-calculator", "sleep-calculator", "tip-calculator",
    "loan-comparison-calculator", "budget-percentage-calculator", "tdee-calculator",
    "bmr-calculator", "body-fat-calculator", "ideal-weight-calculator",
    "protein-intake-calculator", "steps-to-calories-calculator",
    "calories-burned-calculator", "heart-rate-zone-calculator",
    "running-pace-calculator", "caffeine-calculator", "one-rep-max-calculator",
    "push-up-calorie-calculator", "pregnancy-due-date-calculator",
    "sugar-intake-calculator", "water-intake-calculator",
    "gpa-calculator", "cgpa-to-percentage", "name-compatibility-calculator",
  ],
  "generators": [
    "password-generator", "qr-code-generator", "lorem-ipsum-generator",
    "random-decision-maker", "password-strength-checker",
  ],
};

const VIRTUAL_CATEGORIES = [
  {
    id: "fitness",
    name: "Fitness",
    icon: "💪",
    title: "Fitness",
    slug: "fitness",
    altSlug: "fitness-tools",
    seoDescription: "Fitness and exercise calculators for workouts, strength, and training.",
    longDescription: "Maximize your workouts with our fitness calculators. Calculate your one rep max, track calories burned during exercise, find your optimal heart rate training zones, estimate VO₂ max, and plan your running pace. Whether you're a beginner or advanced athlete, these tools help you train smarter.",
    faqs: [
      { q: "How do I calculate my one rep max?", a: "Enter the weight you lifted and the number of reps completed. Our One Rep Max Calculator uses four validated formulas (Epley, Brzycki, Lombardi, Lander) to estimate your 1RM and includes a rep-max table for any rep target." },
      { q: "How many calories do I burn during a workout?", a: "Use the Calories Burned Calculator — select from 60+ activities, enter your weight and duration. Results use MET values for accuracy and include per-minute and per-hour rates." },
      { q: "What are the five heart rate training zones?", a: "The five zones are: warm-up (50-60% HRR), fat burn (60-70%), cardio (70-80%), anaerobic (80-90%), and peak (90-100%). Our Heart Rate Zone Calculator uses the Karvonen method for personalized zones." },
      { q: "How do I estimate my VO₂ max?", a: "Choose from three methods: resting heart rate, Cooper 12-minute run test, or 1.5-mile run. The VO₂ Max Estimator provides your fitness category based on ACSM norms by age and gender." },
      { q: "What is the difference between TDEE and BMR?", a: "BMR is the calories your body burns at complete rest. TDEE is your total daily calorie burn including all activity. Use our TDEE Calculator to find both and get personalized calorie targets for weight loss, maintenance, or muscle gain." },
    ],
    guideContent: "Fitness calculators help you train smarter. The TDEE Calculator shows daily calorie needs based on activity level. The One Rep Max Calculator estimates your maximum lift using four validated formulas (Epley, Brzycki, Lombardi, Lander). The Heart Rate Zone Calculator applies the Karvonen formula to define five training intensity zones. The Calories Burned Calculator uses MET values for over 60 exercises. Use these tools together to plan nutrition and training around your goals.",
    blogCategory: "Health",
    ogImage: "/assets/OG/OG.webp",
    featuredTools: ["tdee-calculator", "calories-burned-calculator", "heart-rate-zone-calculator", "one-rep-max-calculator"],
    toolSlugs: TOOL_SLUGS_BY_VIRTUAL_CATEGORY.fitness,
    seo: {
      title: "Fitness Tools & Calculators | MS DevX Tools",
      description: "Fitness and exercise calculators for workouts, strength, and training.",
      openGraph: {
        title: "Fitness Tools & Calculators | MS DevX Tools",
        description: "Fitness and exercise calculators for workouts, strength, and training.",
        url: `${baseUrl}/fitness-tools`,
        type: "website",
        images: [{ url: "/assets/OG/OG.webp", width: 1664, height: 928 }],
      },
    },
  },
  {
    id: "productivity",
    name: "Productivity",
    icon: "⚡",
    title: "Productivity",
    slug: "productivity",
    altSlug: "productivity-tools",
    seoDescription: "Productivity and time management tools for focus and efficiency.",
    longDescription: "Boost your focus and efficiency with our productivity tools. Use the Pomodoro Timer for deep work sessions, track study time, manage exam countdowns, take regular screen breaks, test your typing speed, and calculate work hours. Designed to help you get more done with less effort.",
    faqs: [
      { q: "How does the Pomodoro technique work?", a: "Work in focused 25-minute sessions followed by 5-minute breaks. After 4 sessions, take a longer 15-30 minute break. Our Pomodoro Timer automates this cycle with customizable durations and progress tracking." },
      { q: "How do I track my study sessions?", a: "The Study Timer lets you name each session, start/stop with pause/resume, and view your session history with daily focus stats — all saved to your browser." },
      { q: "What is the 20-20-20 rule?", a: "Every 20 minutes, look at something 20 feet away for 20 seconds to reduce eye strain. Our Screen Time Break Reminder can be set to any interval with customizable notifications." },
      { q: "How do I calculate my weekly work hours?", a: "Enter your clock-in and clock-out times for each shift, add break deductions, and the Work Hours Calculator shows total hours, regular time, and overtime." },
      { q: "How do I create multiple event countdowns?", a: "The Exam Countdown Timer allows multiple named cards with theme colors. Each countdown persists in your browser so you can track several deadlines at once." },
    ],
    guideContent: "Productivity tools help you manage time and focus. The Pomodoro Timer alternates focused work sessions with short breaks to maintain concentration. The Study Timer tracks named sessions with pause/resume and daily history. Use the Screen Time Break Reminder to reduce digital eye strain with customizable interval reminders. The Work Hours Calculator tracks clock-in/clock-out times with break deductions and overtime. The Typing Speed Test measures WPM and accuracy with difficulty levels and real-time feedback.",
    blogCategory: null,
    ogImage: "/assets/OG/OG.webp",
    featuredTools: ["pomodoro-timer", "study-timer", "countdown-timer", "work-hours-calculator"],
    toolSlugs: TOOL_SLUGS_BY_VIRTUAL_CATEGORY.productivity,
    seo: {
      title: "Productivity Tools & Calculators | MS DevX Tools",
      description: "Productivity and time management tools for focus and efficiency.",
      openGraph: {
        title: "Productivity Tools & Calculators | MS DevX Tools",
        description: "Productivity and time management tools for focus and efficiency.",
        url: `${baseUrl}/productivity-tools`,
        type: "website",
        images: [{ url: "/assets/OG/OG.webp", width: 1664, height: 928 }],
      },
    },
  },
  {
    id: "student",
    name: "Student",
    icon: "📚",
    title: "Student",
    slug: "student",
    altSlug: "student-tools",
    seoDescription: "Student tools for GPA, CGPA, study tracking, and writing.",
    longDescription: "Excel in your studies with our student tools. Calculate your semester GPA and cumulative CGPA, convert CGPA to percentage using university-specific formulas, track study sessions with timers, manage exam countdowns, count words and characters for essays, and estimate reading time for assignments.",
    faqs: [
      { q: "How do I calculate my semester GPA?", a: "Add each course with its credit hours and letter grade to the GPA Calculator. It supports 4.0, 5.0, and 10.0 scales and shows both semester GPA and cumulative CGPA." },
      { q: "How do I convert CGPA to percentage?", a: "Select your university (CBSE, VTU, Anna University, Mumbai University, and more), enter your CGPA, and get the percentage using the correct formula for your institution." },
      { q: "How do I track study time for multiple subjects?", a: "The Study Timer allows named sessions with pause/resume. Session history and daily stats are saved to your browser for ongoing progress tracking." },
      { q: "How do I count words and characters for an essay?", a: "Use the Word Counter or Character Counter — both provide live counts for words, characters, sentences, and paragraphs as you type or paste your text." },
      { q: "How do I set countdowns for my exams?", a: "The Exam Countdown Timer lets you create multiple countdown cards with theme colors for different exams. Each card persists in your browser." },
    ],
    guideContent: "Student tools help you manage grades, study time, and writing assignments. The GPA Calculator supports 4.0, 5.0, and 10.0 grading scales with semester and cumulative CGPA views. The CGPA to Percentage converter uses university-specific formulas from CBSE, VTU, Anna University, and more. Use the Study Timer to track focused sessions with daily history. Word Counter and Character Counter provide live counts for essays and assignments.",
    blogCategory: null,
    ogImage: "/assets/OG/OG.webp",
    featuredTools: ["gpa-calculator", "cgpa-to-percentage", "study-timer", "word-counter"],
    toolSlugs: TOOL_SLUGS_BY_VIRTUAL_CATEGORY.student,
    seo: {
      title: "Student Tools & Calculators | MS DevX Tools",
      description: "Student tools for GPA, CGPA, study tracking, and writing.",
      openGraph: {
        title: "Student Tools & Calculators | MS DevX Tools",
        description: "Student tools for GPA, CGPA, study tracking, and writing.",
        url: `${baseUrl}/student-tools`,
        type: "website",
        images: [{ url: "/assets/OG/OG.webp", width: 1664, height: 928 }],
      },
    },
  },
  {
    id: "calculators",
    name: "Calculators",
    icon: "🧮",
    title: "Calculators",
    slug: "calculators",
    altSlug: "calculator-tools",
    seoDescription: "Free online calculators for age, dates, health, finance, math, and more.",
    longDescription: "Browse our complete collection of free online calculators. Find tools for age calculation, date differences, health and fitness metrics, financial planning, math operations, academic grades, and everyday conversions. All calculators run instantly in your browser — no downloads, no signups.",
    faqs: [
      { q: "What types of calculators are available?", a: "We offer calculators across multiple categories: age and date calculators, health and fitness calculators (TDEE, BMR, body fat, heart rate), financial calculators (EMI, tips, loans), math calculators (percentages, random decisions), academic calculators (GPA, CGPA), and utility calculators (sleep, work hours, water intake)." },
      { q: "Are the calculator results accurate?", a: "Our calculators use standard, validated formulas including the Mifflin-St Jeor equation for BMR, the Karvonen formula for heart rate zones, and MET values for calorie burn estimates. Results are for informational purposes and should not replace professional advice." },
      { q: "Do these calculators save my data?", a: "No. All calculations happen entirely in your browser. Your inputs never leave your device. No data is stored, tracked, or shared." },
    ],
    guideContent: "Calculators help you get accurate results instantly without manual math. Use the Age Calculator for exact age in years, months, days, hours, minutes, and seconds. The TDEE Calculator estimates daily calorie needs using the Mifflin-St Jeor equation. The EMI Calculator shows monthly loan payments based on principal, rate, and tenure. The Percentage Calculator handles discounts, tips, tax rates, and percentage change. All results update in real time as you adjust inputs.",
    blogCategory: null,
    ogImage: "/assets/OG/OG.webp",
    featuredTools: ["age-calculator", "tdee-calculator", "emi-calculator", "percentage-calculator"],
    toolSlugs: TOOL_SLUGS_BY_VIRTUAL_CATEGORY.calculators,
    seo: {
      title: "Free Online Calculators | MS DevX Tools",
      description: "Free online calculators for age, dates, health, finance, math, and more. All calculations happen in your browser — private and instant.",
      openGraph: {
        title: "Free Online Calculators | MS DevX Tools",
        description: "Free online calculators for age, dates, health, finance, math, and more.",
        url: `${baseUrl}/calculator-tools`,
        type: "website",
        images: [{ url: "/assets/OG/OG.webp", width: 1664, height: 928 }],
      },
    },
  },
  {
    id: "generators",
    name: "Generators",
    icon: "⚙️",
    title: "Generators",
    slug: "generators",
    altSlug: "generator-tools",
    seoDescription: "Free online generators for passwords, QR codes, text, and random decisions.",
    longDescription: "Generate strong passwords, QR codes, placeholder text, and random decisions with our free online generators. Each tool is fast, private, and runs entirely in your browser.",
    faqs: [
      { q: "What generators are available?", a: "We offer a Password Generator for creating secure passwords with customizable length and character types, a QR Code Generator for URLs, text, WiFi, and contacts, a Lorem Ipsum Generator for placeholder text, and a Random Decision Maker for unbiased yes/no and custom choices." },
      { q: "Is the password generator secure?", a: "Yes. The Password Generator runs entirely in your browser. No data is sent to any server. You can customize character types and length up to 64 characters for maximum security." },
      { q: "Can I download generated QR codes?", a: "Yes. The QR Code Generator lets you download generated codes as PNG images for printing or digital sharing." },
    ],
    guideContent: "Generators create content on demand. The Password Generator builds strong passwords with customizable length and character sets for secure accounts. The QR Code Generator creates scannable codes for URLs, text, WiFi credentials, emails, phone numbers, and SMS. The Lorem Ipsum Generator produces placeholder text for design mockups and wireframes. The Random Decision Maker offers unbiased yes/no answers, coin flips, custom list picks, and a spinning wheel.",
    blogCategory: null,
    ogImage: "/assets/OG/OG.webp",
    featuredTools: ["password-generator", "qr-code-generator", "lorem-ipsum-generator", "random-decision-maker"],
    toolSlugs: TOOL_SLUGS_BY_VIRTUAL_CATEGORY.generators,
    seo: {
      title: "Free Online Generators | MS DevX Tools",
      description: "Free online generators for passwords, QR codes, text, and random decisions. All processing is local and private.",
      openGraph: {
        title: "Free Online Generators | MS DevX Tools",
        description: "Free online generators for passwords, QR codes, text, and random decisions.",
        url: `${baseUrl}/generator-tools`,
        type: "website",
        images: [{ url: "/assets/OG/OG.webp", width: 1664, height: 928 }],
      },
    },
  },
];

const baseMapped = baseCategories.map((cat) => ({
  ...cat,
  title: cat.name,
  slug: cat.id,
  altSlug: ALT_SLUGS[cat.id] || `${cat.id}-tools`,
  seoDescription: SEO_DESCRIPTIONS[cat.id] || `${cat.name} calculators and tools`,
  longDescription: LONG_DESCRIPTIONS[cat.id] || `Browse our collection of ${cat.name.toLowerCase()} calculators and tools.`,
  faqs: FAQS[cat.id] || [],
  guideContent: GUIDE_CONTENT[cat.id] || null,
  blogCategory: BLOG_CATEGORY_MAP[cat.id] || null,
  ogImage: "/assets/OG/OG.webp",
  featuredTools: FEATURED_TOOLS_BY_CATEGORY[cat.id] || [],
  seo: {
    title: `${cat.name} Tools & Calculators | MS DevX Tools`,
    description: SEO_DESCRIPTIONS[cat.id] || `${cat.name} calculators and tools`,
    openGraph: {
      title: `${cat.name} Tools & Calculators | MS DevX Tools`,
      description: SEO_DESCRIPTIONS[cat.id] || `${cat.name} calculators and tools`,
      url: `${baseUrl}/${ALT_SLUGS[cat.id] || `${cat.id}-tools`}`,
      type: "website",
      images: [{ url: "/assets/OG/OG.webp", width: 1664, height: 928 }],
    },
  },
}));

export const categories = [...baseMapped, ...VIRTUAL_CATEGORIES];

const allAltSlugs = categories.map((c) => c.altSlug);

export const getCategoryById = (id) => categories.find((c) => c.id === id);
export const getCategoryBySlug = (slug) => categories.find((c) => c.slug === slug);
export const getCategoryByAltSlug = (altSlug) => categories.find((c) => c.altSlug === altSlug);
export const getAllAltSlugs = () => allAltSlugs;
export const getCategoryBlogs = (catId) => {
  const cat = getCategoryById(catId);
  if (!cat || !cat.blogCategory) return [];
  return blogs.filter((b) => b.category === cat.blogCategory);
};
const RELATED_CATEGORY_MAP = {
  "date-time": ["utilities", "productivity", "math"],
  "finance": ["math", "academic", "utilities"],
  "converter": ["math", "utilities", "date-time"],
  "math": ["finance", "academic", "date-time"],
  "health": ["fitness", "utilities", "date-time"],
  "text": ["academic", "student", "security"],
  "security": ["utilities", "text", "productivity"],
  "utilities": ["date-time", "productivity", "security"],
  "academic": ["student", "math", "text"],
  "fitness": ["health", "utilities", "productivity"],
  "productivity": ["utilities", "date-time", "student"],
  "student": ["academic", "productivity", "text"],
  "calculators": ["math", "health", "finance"],
  "generators": ["security", "utilities", "text"],
};

export const getRelatedCategories = (catId) => {
  const related = RELATED_CATEGORY_MAP[catId] || [];
  const relatedCats = related.map((id) => categories.find((c) => c.id === id)).filter(Boolean);
  const remaining = categories.filter((c) => c.id !== catId && !related.includes(c.id));
  return [...relatedCats, ...remaining].slice(0, 8);
};


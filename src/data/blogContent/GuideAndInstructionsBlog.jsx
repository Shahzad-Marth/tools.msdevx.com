import Link from "next/link";
import { BlogCTA } from "@/components/ui";

export const GuideAndInstructionsBlog = {
  metaTitle: "Complete Guide & Instructions | MS DevX Tools",
  metaDescription: "Complete guide and instructions for using MS DevX Tools tools. Learn how to use calculators, AI tools, and get the most out of our free online utilities.",
  content: (
    <>
      <h1>Complete Guide & Instructions</h1>

      <p>
        Welcome to the complete guide for MS DevX Tools tools. This guide covers how to use
        all our calculators and utilities effectively.
      </p>

      <div className="highlight-box">
        <strong>All tools work instantly</strong> — just visit any tool page and start using it immediately. Your data is processed locally and never stored on our servers.
      </div>

      <h2>Getting Started</h2>
      <p>
        Our platform provides free, fast, and accurate tools for everyday calculations and AI-powered
        assistance. No registration required, no hidden fees — just powerful tools at your fingertips.
      </p>

      <h3>What You Can Do</h3>
      <ul>
        <li><strong>Calculate:</strong> Age, time, dates, work hours</li>
        <li><strong>Export Results:</strong> Save calculations and conversations</li>
        <li><strong>Mobile Friendly:</strong> Use on any device, anywhere</li>
      </ul>

      <h2>Calculator Tools Guide</h2>

      <BlogCTA title="?? Age Calculator" buttonText="Try Age Calculator ?" buttonHref="/tools/age-calculator">
        <p className="text-base opacity-70 mb-7">Calculate exact age in years, months, and days from birth date to current date.</p>
        <ol className="text-base opacity-70 mb-7 list-decimal list-inside">
          <li>Select your birth date</li>
          <li>Click "Calculate Age"</li>
          <li>View detailed results</li>
        </ol>
      </BlogCTA>

      <BlogCTA title="? Time Calculator" buttonText="Try Time Calculator ?" buttonHref="/tools/time-calculator">
        <p className="text-base opacity-70 mb-7">Calculate time differences between two times in hours, minutes, and seconds.</p>
        <ol className="text-base opacity-70 mb-7 list-decimal list-inside">
          <li>Enter start time</li>
          <li>Enter end time</li>
          <li>Click "Calculate"</li>
        </ol>
      </BlogCTA>

      <BlogCTA title="?? Date Calculator" buttonText="Try Date Calculator ?" buttonHref="/tools/date-calculator">
        <p className="text-base opacity-70 mb-7">Find the number of days between two dates or add/subtract days from a date.</p>
        <ol className="text-base opacity-70 mb-7 list-decimal list-inside">
          <li>Choose start date</li>
          <li>Choose end date</li>
          <li>Get instant results</li>
        </ol>
      </BlogCTA>

      <BlogCTA title="?? Work Hours Calculator" buttonText="Try Work Hours ?" buttonHref="/tools/work-hours-calculator">
        <p className="text-base opacity-70 mb-7">Track work hours, calculate overtime, and manage shift schedules.</p>
        <ol className="text-base opacity-70 mb-7 list-decimal list-inside">
          <li>Enter clock-in time</li>
          <li>Enter clock-out time</li>
          <li>View total hours & overtime</li>
        </ol>
      </BlogCTA>

      <BlogCTA title="Ready to Explore?" buttonText="Browse All Tools" buttonHref="/#tools">
        <p className="text-base opacity-70 mb-7">Browse all our free tools and calculators.</p>
      </BlogCTA>

      <h2>Troubleshooting & FAQ</h2>

      <p>
        <strong>Q: Are the tools really free?</strong><br />
        A: Yes! All tools are completely free with no hidden charges, registration, or limits.
      </p>

      <p>
        <strong>Q: Is my data private?</strong><br />
        A: Absolutely. Calculations are done locally in your browser. AI tools process data securely without storing it.
      </p>

      <p>
        <strong>Q: Can I use tools on mobile?</strong><br />
        A: Yes! All tools are fully responsive and work perfectly on smartphones and tablets.
      </p>

      <p>
        <strong>Q: Tool not working?</strong><br />
        A: Try refreshing the page, clearing your browser cache, or disabling ad blockers temporarily.
      </p>

      <h2>Additional Resources</h2>
      <p>
        <Link href="/blog">?? Visit our Blog</Link> for in-depth guides and tutorials for each tool.<br />
        <Link href="/contact">?? Contact Us</Link> for support or feature requests.
      </p>
    </>
  )
};


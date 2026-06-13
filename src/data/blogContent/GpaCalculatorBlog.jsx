import Link from "next/link";
import { BlogCTA } from "@/components/ui";

export const GpaCalculatorBlog = {
  metaTitle: "GPA Calculator: Calculate Semester & Cumulative GPA | MS DevX Tools",
  metaDescription: "Calculate your semester GPA and cumulative CGPA with our free GPA calculator. Supports 4.0, 5.0, and 10.0 grading scales. Add courses, credits, and letter grades.",
  content: (
    <>
      <h1>GPA Calculator: Calculate Semester & Cumulative GPA</h1>

      <p>
        Your Grade Point Average (GPA) is one of the most important numbers in your academic career.
        It determines eligibility for scholarships, graduate school admissions, internships, and even
        some job opportunities. A <strong><Link href="/tools/gpa-calculator">GPA Calculator</Link></strong>
        helps you compute your semester GPA and cumulative CGPA accurately by factoring in course
        credits and letter grades using your institution's grading scale.
      </p>

      <p>
        Understanding how GPA is calculated is essential for academic planning. Each course you take
        has a certain number of credit hours and a letter grade (A, B+, C, etc.). The letter grade
        corresponds to a grade point value on your school's scale (typically 4.0, 5.0, or 10.0).
        Your GPA is the weighted average of these grade points, where the weight is the credit hours.
        This means a 4-credit course affects your GPA more than a 1-credit course.
      </p>

      <p>
        Our GPA calculator supports three common grading scales — 4.0, 5.0, and 10.0 — making it
        suitable for universities worldwide. You can add multiple courses with names, credit hours,
        and letter grades, and the tool instantly computes your semester GPA. The cumulative GPA
        section lets you combine previous GPA data with your current semester to track your overall
        academic standing.
      </p>

      <h2>How to Use the GPA Calculator</h2>
      <p>The <Link href="/tools/gpa-calculator">GPA Calculator</Link> is designed for quick and accurate results:</p>
      <ol>
        <li><strong>Select your GPA scale</strong> — 4.0, 5.0, or 10.0 depending on your university's system.</li>
        <li><strong>Add your courses</strong> — enter the course name, credit hours, and letter grade for each course this semester.</li>
        <li><strong>View your semester GPA</strong> — the weighted average is calculated instantly as you add courses.</li>
        <li><strong>Track cumulative GPA</strong> — enter your previous GPA and total credits to see how this semester affects your overall CGPA.</li>
      </ol>

      <h2>Key Features</h2>
      <ul>
        <li><strong>Multiple Grading Scales</strong> — Supports 4.0, 5.0, and 10.0 point scales for international compatibility.</li>
        <li><strong>Semester GPA Calculation</strong> — Add unlimited courses with credit hours and letter grades for instant weighted GPA.</li>
        <li><strong>Cumulative CGPA Tracker</strong> — Combine previous academic data with current semester to calculate overall CGPA.</li>
        <li><strong>Course-by-Course Breakdown</strong> — See each course's grade points and contribution to your total GPA.</li>
        <li><strong>Real-Time Updates</strong> — GPA recalculates automatically as you add, edit, or remove courses.</li>
      </ul>

      <BlogCTA title="Try Our Free GPA Calculator" description="Calculate your semester GPA and cumulative CGPA. Supports 4.0, 5.0, and 10.0 scales. No signup needed." buttonText="Use GPA Calculator →" buttonHref="/tools/gpa-calculator" />

      <h2>FAQ</h2>
      <p><strong>Q: What is the difference between GPA and CGPA?</strong><br />A: GPA (Grade Point Average) typically refers to a single semester's average. CGPA (Cumulative Grade Point Average) is the average across all semesters completed. Our tool calculates both.</p>
      <p><strong>Q: How is weighted GPA different from unweighted GPA?</strong><br />A: Weighted GPA accounts for course difficulty (e.g., honors or AP courses may be on a 5.0 scale instead of 4.0). Our calculator uses the standard unweighted approach where all courses use the same scale.</p>
      <p><strong>Q: What letter grades does the calculator support?</strong><br />A: The calculator supports the full range from A+ to F, including plus/minus grades (B+, C-, etc.), with standard grade point values for each. Select your grade from the dropdown and the correct points are applied automatically.</p>

      <div style={{ marginTop: 40 }}>
        <h2>Related Guides</h2>
        <p>
          <Link href="/blog/cgpa-to-percentage">👉 CGPA to Percentage Converter Guide</Link><br />
          <Link href="/blog/percentage-calculator">👉 Percentage Calculator Guide</Link>
        </p>
      </div>
    </>
  )
};

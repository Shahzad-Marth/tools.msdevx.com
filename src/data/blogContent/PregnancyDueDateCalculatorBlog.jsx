import Link from "next/link";
import { BlogCTA } from "@/components/ui";

export const PregnancyDueDateCalculatorBlog = {
  metaTitle: "Pregnancy Due Date Calculator: Estimate Your Due Date | MS DevX Tools",
  metaDescription: "Calculate your estimated pregnancy due date using LMP, conception date, or ultrasound. Track your trimester, gestational age, and pregnancy milestones.",
  content: (
    <>
      <h1>Pregnancy Due Date Calculator: Estimate Your Due Date</h1>

      <p>
        Finding out your estimated due date is one of the first and most exciting milestones of
        pregnancy. Our <strong><Link href="/tools/pregnancy-due-date-calculator">Pregnancy Due Date Calculator</Link></strong>
        gives you three methods to estimate your due date, tracks your current trimester, and shows
        you the key milestones ahead — all in one place.
      </p>

      <h2>How a Due Date Is Calculated</h2>

      <p>
        A pregnancy is typically calculated as <strong>40 weeks (280 days)</strong> from the first
        day of your last menstrual period (LMP). This is known as Naegele's Rule and is the most
        common method used by healthcare providers.
      </p>

      <p>
        Only about 5% of babies arrive exactly on their due date. A full-term pregnancy ranges from
        37 to 42 weeks, so think of your due date as a target window rather than a specific day.
      </p>

      <h2>The Three Calculation Methods</h2>

      <h3>Last Menstrual Period (LMP)</h3>
      <p>
        The standard method. Due date = LMP + 280 days (40 weeks). This assumes a 28-day menstrual
        cycle with ovulation on day 14. If your cycle is longer or shorter, the due date may need
        adjustment — your healthcare provider will typically use ultrasound dating for confirmation.
      </p>

      <h3>Conception Date</h3>
      <p>
        If you know the exact date of conception (e.g., from fertility tracking or IVF), the due
        date is calculated as conception + 266 days (38 weeks). This is more accurate than LMP
        because it starts from the actual fertilization event.
      </p>

      <h3>Ultrasound Dating</h3>
      <p>
        First-trimester ultrasound (weeks 8-13) is the most accurate method for estimating due date,
        with a margin of error of ±5-7 days. The ultrasound measures the baby's crown-rump length
        and compares it to standard growth charts to determine gestational age.
      </p>

      <BlogCTA title="Find Your Due Date" buttonText="Use Due Date Calculator →" buttonHref="/tools/pregnancy-due-date-calculator">
        <p className="text-base opacity-70 mb-7">Estimate your due date using LMP, conception date, or ultrasound. Track your progress through pregnancy.</p>
      </BlogCTA>

      <h2>Pregnancy Trimesters at a Glance</h2>

      <p><strong>First Trimester (Weeks 1-13):</strong></p>
      <ul>
        <li>Week 2: Conception occurs</li>
        <li>Week 4: Missed period; pregnancy test positive</li>
        <li>Week 6: Baby's heart begins to beat</li>
        <li>Week 8-12: Morning sickness may peak; first prenatal visit</li>
        <li>Week 12: End of first trimester — risk of miscarriage drops significantly</li>
      </ul>

      <p><strong>Second Trimester (Weeks 14-27):</strong></p>
      <ul>
        <li>Week 16-20: Baby movements (quickening) often felt</li>
        <li>Week 18-22: Anatomy scan ultrasound</li>
        <li>Week 20-24: Gender can typically be determined</li>
        <li>Week 24-28: Glucose screening for gestational diabetes</li>
      </ul>

      <p><strong>Third Trimester (Weeks 28-40+):</strong></p>
      <ul>
        <li>Week 28-32: Baby gains weight rapidly; kicks become stronger</li>
        <li>Week 34-36: Baby often moves into head-down position</li>
        <li>Week 37: Early term — baby is considered full term at 39 weeks</li>
        <li>Week 40: Estimated due date</li>
        <li>Week 41-42: Post-term monitoring may begin</li>
      </ul>

      <h2>Understanding Gestational Age</h2>

      <p>
        Gestational age is measured in weeks and days, starting from the first day of your LMP
        (not from conception). A baby born at:
      </p>
      <ul>
        <li><strong>37-38 weeks:</strong> Early term</li>
        <li><strong>39-40 weeks:</strong> Full term (optimal)</li>
        <li><strong>41 weeks:</strong> Late term</li>
        <li><strong>42+ weeks:</strong> Post-term</li>
      </ul>

      <p>
        Babies born before 37 weeks are considered preterm and may require additional medical support.
        The calculator tracks your current week and shows your progress toward full term.
      </p>

      <h2>Common Due Date Questions</h2>

      <p><strong>Q: Can my due date change?</strong><br />A: Yes. Your due date may be adjusted based on early ultrasound measurements, especially if the ultrasound estimate differs from your LMP-based date by more than 5-7 days in the first trimester.</p>

      <p><strong>Q: What if I have irregular periods?</strong><br />A: If your cycles are irregular, the LMP method is less reliable. In this case, your provider will rely more heavily on ultrasound dating, which measures the baby's size independent of your cycle length.</p>

      <p><strong>Q: How is the due date different for IVF pregnancies?</strong><br />A: For IVF pregnancies, the due date is calculated from the embryo transfer date plus the age of the embryo at transfer. For example, a day-5 embryo transfer has a due date approximately 261 days from the transfer date.</p>

      <p><strong>Q: Am I really pregnant for 10 months?</strong><br />A: While 40 weeks equals approximately 9 calendar months and 1 week, pregnancy is always measured in weeks, not months. The misconception of a 10-month pregnancy comes from the difference between calendar months (4.3 weeks) and lunar months (4 weeks exactly).</p>

      <div style={{ marginTop: 40 }}>
        <h2>Pregnancy Health Tools</h2>
        <p>
          <Link href="/blog/water-intake-calculator">💧 Water Intake for Pregnancy Guide</Link><br />
          <Link href="/blog/sleep-calculator">😴 Sleep During Pregnancy Guide</Link><br />
          <Link href="/blog/protein-intake-calculator">🥩 Protein Needs During Pregnancy</Link><br />
          <Link href="/blog/bmr-calculator">🔥 BMR Changes During Pregnancy</Link>
        </p>
      </div>
    </>
  )
};

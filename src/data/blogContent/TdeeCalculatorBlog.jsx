import Link from "next/link";
import { BlogCTA } from "@/components/ui";

export const TdeeCalculatorBlog = {
  metaTitle: "TDEE Calculator: How to Calculate Your Daily Calorie Needs | MS DevX Tools",
  metaDescription: "Learn what TDEE is, how to calculate your total daily energy expenditure, BMR, and target calories for weight loss, maintenance, or muscle gain using the Mifflin-St Jeor equation.",
  content: (
    <>
      <h1>TDEE Calculator: Calculate Your Total Daily Energy Expenditure</h1>

      <p>
        Understanding how many calories your body burns each day is the foundation of any successful
        nutrition plan. Our <strong><Link href="/tools/tdee-calculator">TDEE calculator</Link></strong>
        uses the Mifflin-St Jeor equation to estimate your Basal Metabolic Rate (BMR) and then adjusts
        for your activity level to give you your Total Daily Energy Expenditure (TDEE) — the number of
        calories you need to maintain your current weight.
      </p>

      <h2>What Is TDEE?</h2>

      <p>
        Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in 24 hours.
        It includes everything from basic life-sustaining functions like breathing and circulation to
        exercise, daily movement, and even digesting food.
      </p>

      <p>
        Your TDEE is composed of four main components:
      </p>

      <ul>
        <li><strong>Basal Metabolic Rate (BMR)</strong> — 60-75% of TDEE. Calories burned at complete rest to keep your heart beating, lungs breathing, and cells functioning.</li>
        <li><strong>Thermic Effect of Food (TEF)</strong> — ~10% of TDEE. Calories burned digesting and absorbing nutrients.</li>
        <li><strong>Non-Exercise Activity Thermogenesis (NEAT)</strong> — 15-30% of TDEE. Calories burned through daily movement like walking, fidgeting, and standing.</li>
        <li><strong>Exercise Activity Thermogenesis (EAT)</strong> — 5-10% of TDEE. Calories burned through intentional exercise.</li>
      </ul>

      <h2>The Mifflin-St Jeor Equation</h2>

      <p>
        The Mifflin-St Jeor equation is widely regarded as the most accurate formula for estimating BMR
        in the general population:
      </p>

      <div className="highlight-box">
        <strong>Male:</strong> BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5<br />
        <strong>Female:</strong> BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161
      </div>

      <p>
        Once you have your BMR, multiply it by the appropriate activity factor to get your TDEE:
      </p>

      <ul>
        <li><strong>Sedentary:</strong> BMR × 1.2 (little or no exercise)</li>
        <li><strong>Lightly Active:</strong> BMR × 1.375 (1-3 days/week)</li>
        <li><strong>Moderately Active:</strong> BMR × 1.55 (3-5 days/week)</li>
        <li><strong>Very Active:</strong> BMR × 1.725 (6-7 days/week)</li>
        <li><strong>Extra Active:</strong> BMR × 1.9 (intense daily or physical job)</li>
      </ul>

      <h2>How to Use TDEE for Weight Goals</h2>

      <p>
        Once you know your TDEE, adjusting your calorie intake becomes straightforward:
      </p>

      <ul>
        <li><strong>Weight Maintenance:</strong> Eat at your TDEE. Your calorie intake matches your expenditure.</li>
        <li><strong>Weight Loss:</strong> Eat 250-500 calories below your TDEE. A deficit of ~500 calories per day leads to about 1 lb (0.5 kg) of fat loss per week.</li>
        <li><strong>Muscle Gain:</strong> Eat 250-500 calories above your TDEE. A moderate surplus supports muscle growth while minimizing fat gain.</li>
      </ul>

      <BlogCTA title="Calculate Your TDEE" buttonText="Use TDEE Calculator →" buttonHref="/tools/tdee-calculator">
        <p className="text-base opacity-70 mb-7">Get your personalized BMR, TDEE, target calories, and macro recommendations instantly.</p>
      </BlogCTA>

      <h2>Sample Calculation</h2>

      <p>
        Let us calculate the TDEE for a 30-year-old male who weighs 75 kg (165 lbs), is 175 cm (5'9") tall,
        and exercises 3-5 days per week:
      </p>

      <p>
        <strong>Step 1 — Calculate BMR:</strong><br />
        BMR = (10 × 75) + (6.25 × 175) − (5 × 30) + 5<br />
        BMR = 750 + 1093.75 − 150 + 5 = 1,699 kcal/day
      </p>

      <p>
        <strong>Step 2 — Calculate TDEE:</strong><br />
        TDEE = 1,699 × 1.55 (moderately active) = 2,633 kcal/day
      </p>

      <p>
        <strong>Step 3 — Set Target:</strong><br />
        For weight loss: 2,633 − 500 = 2,133 kcal/day<br />
        For muscle gain: 2,633 + 300 = 2,933 kcal/day
      </p>

      <h2>Important Factors That Affect TDEE</h2>

      <p>
        While the Mifflin-St Jeor equation provides an excellent starting point, several factors can
        influence your actual energy expenditure:
      </p>

      <ul>
        <li><strong>Muscle mass:</strong> More muscle increases your BMR since muscle tissue burns more calories than fat at rest.</li>
        <li><strong>Age:</strong> BMR naturally decreases with age due to hormonal changes and muscle loss.</li>
        <li><strong>Genetics:</strong> Some people naturally have faster or slower metabolisms.</li>
        <li><strong>Hormones:</strong> Thyroid function, stress hormones, and sex hormones all affect metabolic rate.</li>
        <li><strong>Sleep:</strong> Poor sleep can reduce BMR and disrupt hunger-regulating hormones.</li>
      </ul>

      <p>
        Use your TDEE as a starting point and adjust based on real-world results. If you are not losing
        weight on a 500-calorie deficit, you may need to reduce intake further or increase activity.
      </p>

      <h2>FAQ</h2>

      <p><strong>Q: How often should I recalculate my TDEE?</strong><br />A: Recalculate whenever your weight changes by 5-10 lbs (2-5 kg) or your activity level shifts. As you lose weight, your TDEE decreases because a lighter body requires fewer calories to maintain.</p>

      <p><strong>Q: Is the Mifflin-St Jeor equation accurate for everyone?</strong><br />A: It is the most accurate general-purpose equation, with an error margin of about ±10%. Athletes with very high muscle mass or individuals with metabolic conditions may need adjustments.</p>

      <p><strong>Q: Can I use TDEE for both cutting and bulking?</strong><br />A: Yes. For cutting (fat loss), create a deficit of 250-500 calories. For bulking (muscle gain), create a surplus of 250-500 calories. Track your progress over 2-3 weeks and adjust as needed.</p>

      <p><strong>Q: Should I eat back calories burned through exercise?</strong><br />A: No — your activity level selection already accounts for your exercise. The TDEE calculation includes your typical activity. Only adjust if your routine changes significantly.</p>

      <p><strong>Q: Does the type of food I eat affect TDEE?</strong><br />A: Slightly. Protein has a higher thermic effect (20-30% of its calories are burned during digestion) compared to carbs (5-10%) and fat (0-3%). A higher-protein diet can slightly increase your total daily energy expenditure.</p>

      <div style={{ marginTop: 40 }}>
        <h2>Related Guides</h2>
        <p>
          <Link href="/blog/water-intake-calculator">💧 Water Intake Calculator Guide</Link><br />
          <Link href="/blog/sleep-calculator">😴 Sleep Calculator Guide</Link><br />
          <Link href="/blog/guide-and-instructions">📖 Complete Guide & Instructions</Link>
        </p>
      </div>
    </>
  )
};

import Link from "next/link";
import { BlogCTA } from "@/components/ui";

export const BmrCalculatorBlog = {
  metaTitle: "BMR Calculator: Calculate Your Basal Metabolic Rate | MS DevX Tools",
  metaDescription: "Learn what BMR is, how to calculate it using the Mifflin-St Jeor equation, and how it affects weight management, diet planning, and overall health.",
  content: (
    <>
      <h1>BMR Calculator: Understand Your Basal Metabolic Rate</h1>

      <p>
        Your Basal Metabolic Rate (BMR) is the number of calories your body burns at complete rest — the
        energy required to keep your heart beating, lungs breathing, and cells functioning. It accounts for
        60-75% of your total daily energy expenditure (TDEE). Our <strong><Link href="/tools/bmr-calculator">BMR Calculator</Link></strong>
        uses the Mifflin-St Jeor equation, recognized as the most accurate formula for estimating BMR in the
        general population.
      </p>

      <h2>What Is BMR and Why Does It Matter?</h2>

      <p>
        Think of BMR as the baseline energy cost of staying alive. It is the minimum number of calories
        your body needs if you spent the entire day at rest. Understanding your BMR helps with:
      </p>

      <ul>
        <li><strong>Weight management:</strong> Knowing your BMR helps you set accurate calorie targets for loss, maintenance, or gain.</li>
        <li><strong>Metabolic health:</strong> Significant deviations from expected BMR can indicate thyroid issues or other metabolic conditions.</li>
        <li><strong>Diet planning:</strong> Your BMR determines the floor below which you should not drop your calorie intake without medical supervision.</li>
      </ul>

      <h2>The Mifflin-St Jeor Equation</h2>

      <p>
        Developed in 1990, this formula succeeded the older Harris-Benedict equation, which was found to
        overestimate BMR by 5-15%:
      </p>

      <div className="highlight-box">
        <strong>Male:</strong> BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5<br />
        <strong>Female:</strong> BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161
      </div>

      <p>
        The formula has an accuracy of approximately ±10% compared to indirect calorimetry — the gold
        standard for measuring BMR. For most people, this is accurate enough for effective diet and
        fitness planning.
      </p>

      <h2>Sample Calculation</h2>

      <p>Let us calculate the BMR for a 30-year-old male, 175 cm tall, weighing 75 kg:</p>

      <p>
        BMR = (10 × 75) + (6.25 × 175) - (5 × 30) + 5<br />
        BMR = 750 + 1093.75 - 150 + 5<br />
        BMR = 1,699 kcal/day (7,108 kJ/day)
      </p>

      <p>
        This means this individual burns about 1,699 calories per day at complete rest. With daily activity
        and exercise, their total energy expenditure will be significantly higher.
      </p>

      <h2>What Burns Your BMR?</h2>

      <p>
        Your resting energy is distributed across your organs roughly as follows:
      </p>
      <ul>
        <li><strong>Liver:</strong> ~27% — processing nutrients, detoxification, protein synthesis</li>
        <li><strong>Brain:</strong> ~19% — cognitive function, neural signaling</li>
        <li><strong>Heart:</strong> ~17% — pumping blood throughout the body</li>
        <li><strong>Skeletal Muscle:</strong> ~18% — maintaining posture and muscle tone</li>
        <li><strong>Kidneys:</strong> ~10% — filtering blood, regulating fluid balance</li>
        <li><strong>Other:</strong> ~9% — skin, bones, digestive tract, etc.</li>
      </ul>

      <h2>How BMR Changes With Age</h2>

      <p>
        BMR naturally declines with age, primarily due to the loss of muscle mass:
      </p>
      <ul>
        <li><strong>20s:</strong> Peak metabolic rate. Muscle mass is typically at its highest.</li>
        <li><strong>30s:</strong> BMR begins to decline by 1-2% per decade.</li>
        <li><strong>40s:</strong> Hormonal changes (particularly in women during perimenopause) can accelerate the decline.</li>
        <li><strong>50s+:</strong> Muscle loss (sarcopenia) becomes more significant without intervention.</li>
      </ul>

      <p>
        The good news: strength training can offset much of this decline by maintaining or building
        muscle mass at any age.
      </p>

      <BlogCTA title="Calculate Your BMR" buttonText="Use BMR Calculator →" buttonHref="/tools/bmr-calculator">
        <p className="text-base opacity-70 mb-7">Get your BMR in kcal and kJ, organ-level breakdown, TDEE estimates, and age comparison.</p>
      </BlogCTA>

      <h2>BMR vs. TDEE: Understanding Total Energy Needs</h2>

      <p>
        BMR and TDEE are related but distinct:
      </p>
      <ul>
        <li><strong>BMR (Basal Metabolic Rate):</strong> Calories at complete rest — 60-75% of TDEE.</li>
        <li><strong>TEF (Thermic Effect of Food):</strong> Calories burned digesting food — ~10% of TDEE.</li>
        <li><strong>NEAT (Non-Exercise Activity Thermogenesis):</strong> Daily movement like walking, fidgeting, standing — 15-30% of TDEE.</li>
        <li><strong>EAT (Exercise Activity Thermogenesis):</strong> Intentional exercise — 5-10% of TDEE.</li>
      </ul>

      <p>
        Your TDEE is BMR + TEF + NEAT + EAT. This is the number you use for weight management, not
        BMR alone. Multiply your BMR by 1.2 (sedentary) to 1.9 (very active) to estimate TDEE.
      </p>

      <h2>BMR and Weight Loss</h2>

      <p>
        When creating a calorie deficit for weight loss, your BMR serves as an important floor:
      </p>
      <ul>
        <li>Eating below your BMR for extended periods can trigger metabolic adaptation — your body slows down to conserve energy.</li>
        <li>A moderate deficit of 300-500 calories below TDEE (but above BMR) is sustainable and effective.</li>
        <li>Very low calorie diets (&lt;1,200 kcal/day for women, &lt;1,500 for men) should only be done under medical supervision.</li>
      </ul>

      <h2>FAQs</h2>

      <p><strong>Q: How accurate is the Mifflin-St Jeor equation?</strong><br />A: It has an accuracy of about ±10% for most people. Factors like muscle mass, genetics, and thyroid function can cause individual variation. For precise measurement, indirect calorimetry is the gold standard.</p>

      <p><strong>Q: Can I increase my BMR?</strong><br />A: Yes — the most effective way is to increase muscle mass through resistance training. Adequate protein intake, sleep, and hydration also support metabolic health. Some foods (like caffeine and protein) have a small thermic effect that temporarily increases metabolic rate.</p>

      <p><strong>Q: Does starvation mode exist?</strong><br />A: Yes — but it is often exaggerated. Prolonged severe calorie restriction can reduce BMR by 10-20% through metabolic adaptation. This is not true "starvation mode" where your body holds onto fat, but rather a reduction in energy output to match the reduced energy intake.</p>

      <p><strong>Q: Is BMR the same for identical twins?</strong><br />A: Not exactly. While genetics play a significant role, factors like muscle mass, diet, activity level, and even gut microbiome composition cause variations between individuals, including identical twins.</p>

      <p><strong>Q: Do women have lower BMR than men?</strong><br />A: On average, yes. Women typically have 5-10% lower BMR than men of the same height and weight due to higher average body fat percentage and lower muscle mass. However, individual variation is significant.</p>

      <div style={{ marginTop: 40 }}>
        <h2>Related Guides</h2>
        <p>
          <Link href="/blog/tdee-calculator">🔥 TDEE & Calorie Calculator Guide</Link><br />
          <Link href="/blog/body-fat-calculator">🧍 Body Fat Calculator Guide</Link><br />
          <Link href="/blog/calories-burned-calculator">🏃 Calories Burned Guide</Link><br />
          <Link href="/blog/protein-intake-calculator">🥩 Protein Intake Guide</Link>
        </p>
      </div>
    </>
  )
};

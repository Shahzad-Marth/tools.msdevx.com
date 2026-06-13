import Link from "next/link";
import { BlogCTA } from "@/components/ui";

export const MacroCalculatorBlog = {
  metaTitle: "Macro Calculator: How to Count Protein, Carbs & Fat | MS DevX Tools",
  metaDescription: "Calculate your daily macronutrient targets for fat loss, maintenance, or muscle gain. Learn how to set protein, carb, and fat ratios based on your goals.",
  content: (
    <>
      <h1>Macro Calculator: Your Complete Guide to Counting Macros</h1>

      <p>
        Macronutrients — protein, carbohydrates, and fats — are the three main energy sources your body
        needs to function. Unlike calorie counting alone, tracking macros gives you precise control over
        your body composition, energy levels, and performance. Our <strong><Link href="/tools/macro-calculator">Macro Calculator</Link></strong>
        gives you personalized gram targets based on your weight, activity level, and fitness goal.
      </p>

      <h2>What Are Macros?</h2>

      <p>
        Each macronutrient serves a distinct purpose:
      </p>
      <ul>
        <li><strong>Protein (4 kcal/g):</strong> Builds and repairs tissues, produces enzymes and hormones, supports immune function. The most satiating macro, making it crucial during fat loss.</li>
        <li><strong>Carbohydrates (4 kcal/g):</strong> The body&rsquo;s preferred energy source. Fuels the brain, muscles, and central nervous system. Especially important for high-intensity exercise.</li>
        <li><strong>Fat (9 kcal/g):</strong> Essential for hormone production (including testosterone), vitamin absorption (A, D, E, K), cell membrane health, and brain function.</li>
      </ul>

      <h2>How This Calculator Works</h2>

      <p>
        Your macro targets are calculated using this process:
      </p>
      <ol>
        <li><strong>Calculate BMR</strong> using the Mifflin-St Jeor equation (age, height, weight, gender).</li>
        <li><strong>Estimate TDEE</strong> by multiplying BMR by your activity factor (1.2-1.9).</li>
        <li><strong>Adjust for goal:</strong> Add or subtract calories for weight gain or loss.</li>
        <li><strong>Set protein</strong> based on your goal (1.5-2.2g per kg of body weight).</li>
        <li><strong>Set fat</strong> at a minimum of 0.8g per kg for hormonal health.</li>
        <li><strong>Fill remaining calories</strong> with carbohydrates for energy.</li>
      </ol>

      <h2>Macro Targets by Goal</h2>

      <p>
        The ideal macro split depends on your objective:
      </p>

      <h3>Fat Loss</h3>
      <ul>
        <li><strong>Protein:</strong> High (1.8-2.4 g/kg) — preserves muscle during a calorie deficit</li>
        <li><strong>Fat:</strong> Moderate (0.8-1.0 g/kg) — supports hormone function</li>
        <li><strong>Carbs:</strong> Lower — remaining calories for energy</li>
        <li>Typical split: 40% protein, 30% carbs, 30% fat</li>
      </ul>

      <h3>Maintenance</h3>
      <ul>
        <li><strong>Protein:</strong> Moderate (1.2-1.8 g/kg)</li>
        <li><strong>Fat:</strong> Moderate (0.8-1.0 g/kg)</li>
        <li><strong>Carbs:</strong> Moderate — remaining calories</li>
        <li>Typical split: 30% protein, 40% carbs, 30% fat</li>
      </ul>

      <h3>Muscle Gain</h3>
      <ul>
        <li><strong>Protein:</strong> High (1.6-2.2 g/kg)</li>
        <li><strong>Fat:</strong> Moderate (0.8-1.0 g/kg)</li>
        <li><strong>Carbs:</strong> Higher — supports training performance and recovery</li>
        <li>Typical split: 30% protein, 45% carbs, 25% fat</li>
      </ul>

      <BlogCTA title="Calculate Your Macros" buttonText="Use Macro Calculator →" buttonHref="/tools/macro-calculator">
        <p className="text-base opacity-70 mb-7">Get your personalized protein, carbs, and fat targets with per-meal breakdown and food examples.</p>
      </BlogCTA>

      <h2>Sample Calculation</h2>

      <p>For a 75 kg (165 lb) male, moderately active, aiming for maintenance:</p>
      <ul>
        <li><strong>TDEE:</strong> ~2,600 kcal</li>
        <li><strong>Protein:</strong> 75 × 1.5 = 113g (452 kcal, 17%)</li>
        <li><strong>Fat:</strong> 75 × 0.8 = 60g (540 kcal, 21%)</li>
        <li><strong>Carbs:</strong> (2600 - 452 - 540) / 4 = 402g (1,608 kcal, 62%)</li>
      </ul>

      <p>For the same person aiming for fat loss (2,100 kcal target):</p>
      <ul>
        <li><strong>Protein:</strong> 75 × 2.0 = 150g (600 kcal, 29%)</li>
        <li><strong>Fat:</strong> 75 × 0.8 = 60g (540 kcal, 26%)</li>
        <li><strong>Carbs:</strong> (2100 - 600 - 540) / 4 = 240g (960 kcal, 45%)</li>
      </ul>

      <h2>Tips for Hitting Your Macros</h2>

      <ul>
        <li><strong>Protein first:</strong> Plan each meal around a protein source, then add carbs and fat.</li>
        <li><strong>Weigh your food:</strong> A kitchen scale is the most accurate way to track macros.</li>
        <li><strong>Use a tracking app:</strong> MyFitnessPal, Cronometer, or MacroFactor make it easy.</li>
        <li><strong>Prep ahead:</strong> Meal prep ensures you hit your targets without daily guesswork.</li>
        <li><strong>Be flexible:</strong> Aim for ±5-10g of each macro. Perfection is not required.</li>
      </ul>

      <h2>Common Macro Mistakes</h2>

      <ul>
        <li><strong>Too little protein:</strong> The most common mistake. Prioritize protein at every meal.</li>
        <li><strong>Too little fat:</strong> Dropping fat below 0.6g/kg can harm hormone production.</li>
        <li><strong>Ignoring fiber:</strong> Fiber is a carb that you should prioritize — aim for 25-35g per day.</li>
        <li><strong>Not adjusting:</strong> If you are not seeing results after 2-3 weeks, adjust your intake by 100-200 calories.</li>
      </ul>

      <h2>FAQs</h2>

      <p><strong>Q: Do I need to count macros forever?</strong><br />A: No. Many people count macros for 4-12 weeks to learn portion sizes and food composition, then transition to intuitive eating while keeping the principles in mind.</p>

      <p><strong>Q: Can I eat any food as long as it fits my macros?</strong><br />A: The "IIFYM" (If It Fits Your Macros) approach works for flexibility, but micronutrient density still matters. Aim for 80% whole foods and 20% treats for optimal health.</p>

      <p><strong>Q: How often should I recalculate my macros?</strong><br />A: Recalculate when your weight changes by 5-10 lbs (2-5 kg) or your activity level changes significantly. Tracking trends over 2-3 weeks helps determine if adjustments are needed.</p>

      <p><strong>Q: Are there differences in how men and women should set macros?</strong><br />A: The core calculations are the same, but women may benefit from slightly higher fat intake during certain menstrual cycle phases. Some women also find higher carbs supportive in the luteal phase.</p>

      <p><strong>Q: What macros should I eat before and after a workout?</strong><br />A: Pre-workout: carbs for energy + moderate protein. Post-workout: protein for repair + carbs to replenish glycogen. Fat is less critical around workouts since it digests slowly.</p>

      <div style={{ marginTop: 40 }}>
        <h2>Related Guides</h2>
        <p>
          <Link href="/blog/tdee-calculator">🔥 TDEE & Calorie Calculator Guide</Link><br />
          <Link href="/blog/bmr-calculator">🔥 BMR Calculator Guide</Link><br />
          <Link href="/blog/protein-intake-calculator">🥩 Protein Intake Guide</Link><br />
          <Link href="/blog/body-fat-calculator">🧍 Body Fat Calculator Guide</Link>
        </p>
      </div>
    </>
  )
};

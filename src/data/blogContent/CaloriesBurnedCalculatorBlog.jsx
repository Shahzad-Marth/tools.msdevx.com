import Link from "next/link";
import { BlogCTA } from "@/components/ui";

export const CaloriesBurnedCalculatorBlog = {
  metaTitle: "Calories Burned Calculator: MET-Based Exercise Calorie Guide | MS DevX Tools",
  metaDescription: "Calculate calories burned for 60+ activities using MET values. Learn how intensity, duration, and body weight affect energy expenditure during exercise.",
  content: (
    <>
      <h1>Calories Burned Calculator: Understand Your Exercise Energy Expenditure</h1>

      <p>
        Knowing how many calories you burn during exercise is essential for weight management, performance
        tracking, and workout planning. Our <strong><Link href="/tools/calories-burned-calculator">Calories Burned Calculator</Link></strong>
        uses the MET (Metabolic Equivalent of Task) method to estimate energy expenditure for over 60
        different activities — from walking and running to swimming, sports, and household chores.
      </p>

      <h2>What Are METs?</h2>

      <p>
        MET stands for Metabolic Equivalent of Task. One MET is the energy you burn at rest — approximately
        1 kcal per kilogram of body weight per hour. When you exercise, your energy expenditure increases
        in proportion to the intensity of the activity:
      </p>

      <ul>
        <li><strong>1 MET</strong> — Sitting quietly, watching TV</li>
        <li><strong>2-3 METs</strong> — Light activities (slow walking, light housework)</li>
        <li><strong>3-6 METs</strong> — Moderate activities (brisk walking, leisurely cycling)</li>
        <li><strong>6-9 METs</strong> — Vigorous activities (jogging, swimming laps)</li>
        <li><strong>9+ METs</strong> — High-intensity activities (running, jumping rope, competitive sports)</li>
      </ul>

      <h2>The Formula</h2>

      <p>
        This calculator uses the standard MET formula from the Compendium of Physical Activities:
      </p>

      <div className="highlight-box">
        <strong>Calories = MET × 3.5 × weight(kg) / 200 × duration(minutes)</strong>
      </div>

      <p>
        The formula accounts for three key factors:
      </p>

      <ul>
        <li><strong>Intensity (MET value):</strong> How hard your body is working during the activity.</li>
        <li><strong>Body weight:</strong> Heavier individuals burn more calories because more mass is being moved.</li>
        <li><strong>Duration:</strong> Longer workouts burn more total calories, even at the same intensity.</li>
      </ul>

      <BlogCTA title="Calculate Your Calorie Burn" buttonText="Use Calories Burned Calculator →" buttonHref="/tools/calories-burned-calculator">
        <p className="text-base opacity-70 mb-7">Choose from 60+ activities and get your personalized calorie burn instantly.</p>
      </BlogCTA>

      <h2>Sample Calculations</h2>

      <p>Here is how many calories a 70 kg (154 lb) person burns in 30 minutes of different activities:</p>

      <ul>
        <li><strong>Slow walking (2 mph):</strong> ~74 calories (2.8 METs)</li>
        <li><strong>Moderate walking (3 mph):</strong> ~92 calories (3.5 METs)</li>
        <li><strong>Brisk walking (3.5 mph):</strong> ~113 calories (4.3 METs)</li>
        <li><strong>Jogging (5 mph):</strong> ~210 calories (8.0 METs)</li>
        <li><strong>Running (6 mph):</strong> ~257 calories (9.8 METs)</li>
        <li><strong>Moderate cycling:</strong> ~179 calories (6.8 METs)</li>
        <li><strong>Swimming laps:</strong> ~218 calories (8.3 METs)</li>
        <li><strong>Jumping rope (fast):</strong> ~323 calories (12.3 METs)</li>
        <li><strong>Weightlifting (moderate):</strong> ~131 calories (5.0 METs)</li>
        <li><strong>HIIT / CrossFit:</strong> ~249 calories (9.5 METs)</li>
      </ul>

      <h2>Why Weight Matters</h2>

      <p>
        Your body weight is the single most important factor in determining calorie burn during exercise.
        A heavier person burns more calories doing the same activity because their body must expend more
        energy to move. For example:
      </p>

      <ul>
        <li>A 60 kg (132 lb) person burns ~183 calories jogging for 30 minutes</li>
        <li>An 80 kg (176 lb) person burns ~244 calories doing the same jog</li>
        <li>A 100 kg (220 lb) person burns ~305 calories</li>
      </ul>

      <p>
        This is why weight-specific estimates are much more useful than generic "calories burned per
        activity" tables that assume a single body weight.
      </p>

      <h2>How to Maximize Calorie Burn</h2>

      <p>
        If your goal is to maximize calorie expenditure during your workouts, here are the most effective
        strategies:
      </p>

      <ol>
        <li><strong>Increase intensity:</strong> Doubling your MET value (e.g., from walking to running) doubles your per-minute calorie burn.</li>
        <li><strong>Increase duration:</strong> Longer workouts burn more total calories. A 60-minute moderate walk burns more than a 20-minute intense run.</li>
        <li><strong>Add resistance:</strong> Walking uphill, using weighted vests, or choosing activities like sled pushes increases energy demand.</li>
        <li><strong>Use compound movements:</strong> Exercises that engage multiple muscle groups (swimming, rowing, cross country skiing) burn more than isolated movements.</li>
        <li><strong>Reduce rest:</strong> Circuit training and HIIT keep your heart rate elevated throughout the session, increasing total calorie burn.</li>
      </ol>

      <h2>Limitations of MET-Based Estimation</h2>

      <p>
        While the MET method is the gold standard for population-level energy expenditure estimation, it
        has limitations:
      </p>

      <ul>
        <li><strong>Individual variation:</strong> Fitness level, muscle mass, and genetics all affect actual calorie burn.</li>
        <li><strong>Effort matters:</strong> The same activity can vary widely in intensity depending on how hard you push.</li>
        <li><strong>Afterburn effect:</strong> High-intensity exercise can elevate your metabolic rate for hours afterward (EPOC), which MET calculations do not fully capture.</li>
        <li><strong>Terrain and conditions:</strong> Wind, heat, cold, altitude, and surface type all affect energy expenditure.</li>
      </ul>

      <h2>FAQs</h2>

      <p><strong>Q: Do fitness trackers give more accurate readings?</strong><br />A: Fitness trackers combine MET data with heart rate and movement sensors, which can improve accuracy — especially for varied-intensity activities. However, studies show most trackers still have a 10-20% error margin. This calculator provides an excellent baseline.</p>

      <p><strong>Q: How many calories should I aim to burn per workout?</strong><br />A: This depends on your goals. For general health, 200-400 calories per session is a good target. For weight loss, aim for 400-600 calories per session, 4-5 times per week. Use your TDEE as a guide for how much of your deficit should come from exercise versus diet.</p>

      <p><strong>Q: Does the afterburn effect (EPOC) matter?</strong><br />A: Yes. High-intensity exercise can elevate your metabolic rate for 12-48 hours post-workout, adding 10-20% to your total calorie burn for the day. This is one reason HIIT and heavy strength training are so effective for body composition change.</p>

      <p><strong>Q: Can I lose weight by exercise alone?</strong><br />A: It is possible but challenging. Exercise without dietary changes typically produces modest weight loss (1-2 kg over several months) because increased appetite often compensates for the extra calorie burn. The most effective approach combines exercise with a moderate calorie deficit.</p>

      <div style={{ marginTop: 40 }}>
        <h2>Related Guides</h2>
        <p>
          <Link href="/blog/steps-to-calories-calculator">🚶 Steps to Calories Calculator Guide</Link><br />
          <Link href="/blog/tdee-calculator">🔥 TDEE & Calorie Calculator Guide</Link><br />
          <Link href="/blog/protein-intake-calculator">🥩 Protein Intake Guide</Link><br />
          <Link href="/blog/body-fat-calculator">🧍 Body Fat Calculator Guide</Link>
        </p>
      </div>
    </>
  )
};

# Survey: set up in 2 minutes

## 1. Create the form
1. Open https://script.google.com and create a **New project**.
2. Delete the sample code. Paste all of `create_survey_form.gs` and press **Save**.
3. In the function dropdown, pick `createJarSurvey` and press **Run**.
4. Allow the Forms and Sheets permissions. The warning says "Google hasn't verified this app": click **Advanced**, then **Go to project**. That's normal for your own script.
5. Open **Execution log**. It shows three links:
   - **SHARE link:** send this to students.
   - **Edit link:** tweak the wording or add your team name here.
   - **Responses sheet:** answers land here automatically.

## 2. Send it out (target: 60+ responses in 24–36 h)
Message to paste into WhatsApp groups, hostel groups, class groups and Instagram stories:

> Hey! 👋 We're researching how students save money for a national case competition at IIT ISM.
> 3-minute anonymous survey, and it would really help us: <SHARE LINK>
> Please forward to friends in other colleges too 🙏

Tips:
- Post in **at least 4–5 different groups** across colleges and cities, not just your own batch. Tier-2/3 friends matter: 60% of Jar's users are outside metros.
- Ask 3–4 friends in other colleges to forward it. That reduces "one-hostel" bias.
- Re-post once after about 12 hours.

## 3. Get the numbers
When responses are in, pick `summarizeResponses` in the function dropdown and press **Run**. A **Summary** tab appears in the responses sheet:
- **Top rows:** the headline numbers for slide 2 (e.g. "% of Jar users who open it monthly or less", "% whose last open was balance/withdraw", "% who'd use Goal Jars", "% who'd open 2–3×/week").
- **Below:** the % breakdown for every question.

You can re-run it anytime to refresh.

## 4. Put it on slide 2, honestly
- Replace one gold figure box (e.g. "6.8%") with your strongest number. Write it like this:
  **"__% of Jar users last opened the app only to check balance or withdraw"**, with the source line **[Primary survey, n=__ students, Sep 2026]**.
- Quote the sample size every time, and never extrapolate to all of India. Say "in our sample".
- If a result **contradicts** the deck (e.g. few people want Squad Jars), say so. Adjust the pitch, e.g. lead with solo Goal Jars. Judges reward honesty over a perfect story.

## What each question tests

| Question | Tests which deck assumption |
|---|---|
| Jar open frequency, last reason opened | Core insight: opens are only balance checks or withdrawals; baseline ~0.5 opens/week |
| Savings goal in next 6 months | Near-goal students are the priority segment |
| Likely to use (grid) | 20% Y1 adoption |
| Open 2–3×/week; open with notifications off | The mandate: meaningful, non-forced opens |
| Raise daily saving | +30% savings uplift |
| Squad size | 40% squad creators; reactivation via squads |
| Smallest weekly bonus | ₹25/adopter/yr boost budget |

## 5. Interviews (8 × 15 min)
Use the emails and handles people leave in the last question. Ask:
1. "Walk me through the last 3 times you opened any money app. Why each time?"
2. "Tell me about the last group trip or plan. How did you handle the money?"
3. "What would make you open a savings app on a Monday, without a notification?"

Note one quote per insight for the slides.

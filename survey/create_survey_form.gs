/**
 * CaseBlitz 2026 – Student savings survey (Google Form builder)
 *
 * HOW TO USE
 * 1. Go to https://script.google.com → New project → paste this whole file → Save.
 * 2. Select function `createJarSurvey` → Run → approve permissions (Forms + Sheets).
 * 3. Open View → Logs (or Execution log): copy the SHARE link and send it out.
 * 4. After you collect responses, select `summarizeResponses` → Run.
 *    A "Summary" tab appears in the linked Google Sheet with % for every question
 *    plus the headline numbers for slide 2.
 *
 * Each question is tagged with the model assumption it tests (see the comments).
 */

// Titles referenced by the summary step – keep in sync with the form.
const Q = {
  ROLE: 'What best describes you right now?',
  JAR_USE: 'Do you use the Jar app?',
  JAR_OPEN_FREQ: 'How often do you open the Jar app?',
  JAR_LAST_OPEN: 'What was the main reason you last opened Jar?',
  GOAL: 'In the next 6 months, what (if anything) are you saving toward?',
  CONCEPT_GRID: 'How likely would you be to use each of these?',
  OPEN_FREQ_NEW: 'If your savings app had these features, how often would you open it?',
  NO_NOTIF: 'Would you still open it for these features with app notifications turned OFF?',
  RAISE_SAVE: 'If you could see your goal filling up, would you increase your automatic daily saving to reach it faster?',
  SQUAD_SIZE: 'How many friends would you save with in a shared goal?',
  BOOST_MIN: 'What is the smallest weekly brand bonus that would make you check the app?',
};

function createJarSurvey() {
  const form = FormApp.create('Student Money & Savings Apps – 3-minute survey');
  form.setDescription(
    'Hi! We are students researching how young people save money and use savings apps, for a national case competition (CaseBlitz, IIT ISM Dhanbad).\n\n' +
    '• Takes about 3 minutes\n• Anonymous – we do not collect your name or email (the interview question at the end is optional)\n' +
    '• Not affiliated with Jar or any company\n\nThank you for helping!'
  );
  form.setProgressBar(true);
  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage('Thank you! Your answers really help our research. 🙌');

  const LIKERT = ['Definitely not', 'Probably not', 'Not sure', 'Probably', 'Definitely'];

  // ---------------- Section 1: About you ----------------
  form.addSectionHeaderItem().setTitle('About you');
  form.addMultipleChoiceItem().setTitle(Q.ROLE).setRequired(true)
    .setChoiceValues(['College student (UG)', 'College student (PG)', 'School student', 'Working (0–3 years)', 'Working (3+ years)']).showOtherOption(true);
  form.addMultipleChoiceItem().setTitle('Your age').setRequired(true)
    .setChoiceValues(['Under 18', '18–20', '21–23', '24–27', '28+']);
  form.addMultipleChoiceItem().setTitle('Where do you live most of the year?').setRequired(true)
    .setChoiceValues(['Metro city (Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad)', 'Other large city (tier-2)', 'Smaller city / town (tier-3 or below)']);
  // tests: student UPI frequency and ticket size [persona assumptions]
  form.addMultipleChoiceItem().setTitle('Roughly how many UPI payments do you make in a month?').setRequired(true)
    .setChoiceValues(['Less than 20', '20–50', '51–100', 'More than 100', 'I don’t use UPI']);
  form.addMultipleChoiceItem().setTitle('What is a typical UPI payment for you?').setRequired(true)
    .setChoiceValues(['Under ₹100', '₹100–300', '₹300–1,000', 'Over ₹1,000']);
  form.addMultipleChoiceItem().setTitle('How much money do you manage per month (pocket money, stipend, salary)?').setRequired(false)
    .setChoiceValues(['Under ₹3,000', '₹3,000–7,000', '₹7,000–15,000', '₹15,000–40,000', 'Over ₹40,000', 'Prefer not to say']);
  form.addCheckboxItem().setTitle('Which of these do you use to save or invest? (tick all)').setRequired(true)
    .setChoiceValues(['Jar', 'Gullak', 'Paytm Gold / Gold Coins', 'PhonePe or Google Pay gold', 'Groww / Zerodha / other investing app', 'Bank savings account / FD / RD', 'Cash at home / piggy bank', 'None']).showOtherOption(true);
  form.addMultipleChoiceItem().setTitle('Have you turned off notifications for any finance or payment app?').setRequired(true)
    .setChoiceValues(['Yes, for most of them', 'Yes, for some', 'No', 'Not sure']);
  const jarUse = form.addMultipleChoiceItem().setTitle(Q.JAR_USE).setRequired(true); // choices set at the end (branching)

  // ---------------- Section 2: Jar users ----------------
  const jarPage = form.addPageBreakItem().setTitle('Your experience with Jar');
  form.addCheckboxItem().setTitle('How do (or did) you save on Jar? (tick all)').setRequired(true)
    .setChoiceValues(['Round-off on UPI spends', 'Daily savings', 'Weekly or monthly savings', 'Buying gold manually / instant save', 'Not saving right now']);
  // tests: baseline opens/week (~0.5 assumed) – the North Star baseline
  form.addMultipleChoiceItem().setTitle(Q.JAR_OPEN_FREQ).setRequired(true)
    .setChoiceValues(['Daily', '2–3 times a week', 'About once a week', 'About once a month', 'Rarely / almost never']);
  // tests the core insight: are opens mostly balance checks and withdrawals?
  form.addMultipleChoiceItem().setTitle(Q.JAR_LAST_OPEN).setRequired(true)
    .setChoiceValues(['Check my balance', 'Withdraw / sell gold', 'Spin / rewards', 'Buy gold or save extra', 'A notification made me', 'Check the gold price', 'Don’t remember']).showOtherOption(true);
  form.addMultipleChoiceItem().setTitle('Have you ever withdrawn money from Jar?').setRequired(true)
    .setChoiceValues(['Yes – for something specific I wanted to buy', 'Yes – for an emergency / needed cash', 'No']);
  form.addScaleItem().setTitle('“I know roughly how much I have saved in Jar right now.”').setBounds(1, 5).setLabels('Strongly disagree', 'Strongly agree').setRequired(true);
  form.addCheckboxItem().setTitle('If you stopped using Jar, why? (skip if you still use it)').setRequired(false)
    .setChoiceValues(['Forgot about it', 'Needed the money', 'Didn’t see the point / no goal', 'Fees or gold price spread', 'Worried about safety of digital gold', 'Moved to another app']).showOtherOption(true);

  // ---------------- Section 3: Goals (everyone) ----------------
  const goalsPage = form.addPageBreakItem().setTitle('Your savings goals');
  // tests: goal-driven students segment [S1 priority] and trip-goal share
  form.addCheckboxItem().setTitle(Q.GOAL).setRequired(true)
    .setChoiceValues(['A trip with friends', 'A trip with family / solo', 'Phone, laptop or gadget', 'Fest, concert or event', 'Course, exam or coaching fee', 'Gift for someone', 'Emergency fund', 'Nothing specific – just saving', 'Not saving right now']).showOtherOption(true);
  form.addMultipleChoiceItem().setTitle('For group trips or plans, how do you usually handle money today?').setRequired(true)
    .setChoiceValues(['One person pays, others repay later', 'Split with Splitwise or a similar app', 'Everyone sends money to one person before the trip', 'Each person pays for themselves', 'I don’t really do group trips']).showOtherOption(true);
  form.addScaleItem().setTitle('How annoying is collecting / tracking money for group plans?').setBounds(1, 5).setLabels('Not at all', 'Very annoying').setRequired(true);

  // ---------------- Section 4: Concept test ----------------
  form.addPageBreakItem().setTitle('A new idea – quick reactions')
    .setHelpText(
      'Imagine your savings app (with automatic saving, like round-offs) added these:\n\n' +
      '① GOAL JARS – split your savings into named goals (e.g. “Goa trip”, “New phone”) and see progress as a % of each goal. Saving stays automatic – nothing extra to do.\n\n' +
      '② SQUAD JARS – save toward a shared goal (like a trip) with 2–5 friends. Everyone’s money stays in their own account; you only see each other’s progress %.\n\n' +
      '③ MONDAY BOOSTS – every Monday, brands (e.g. travel or event partners) offer small bonuses to your goal if you hit a milestone that week.\n\n' +
      '④ SUNDAY WRAP – a 1-minute weekly recap: what you saved automatically and how close you are to your goal.'
    );
  // tests: adoption assumption (20% Y1)
  form.addGridItem().setTitle(Q.CONCEPT_GRID).setRequired(true)
    .setRows(['① Goal Jars', '② Squad Jars (with friends)', '③ Monday Boosts', '④ Sunday Wrap'])
    .setColumns(LIKERT);
  // tests: 2–3 meaningful opens/week (the mandate)
  form.addMultipleChoiceItem().setTitle(Q.OPEN_FREQ_NEW).setRequired(true)
    .setChoiceValues(['Daily', '2–3 times a week', 'About once a week', 'About once a month', 'Rarely']);
  // tests: journey works without push notifications
  form.addMultipleChoiceItem().setTitle(Q.NO_NOTIF).setRequired(true)
    .setChoiceValues(['Yes', 'Maybe', 'No']);
  form.addMultipleChoiceItem().setTitle('Which ONE would most bring you back to the app each week?').setRequired(true)
    .setChoiceValues(['Monday Boosts (bonus money)', 'Squad updates from friends', 'Sunday Wrap (my progress)', 'Checking the gold price', 'None of these']);
  // tests: +30% savings uplift assumption
  form.addMultipleChoiceItem().setTitle(Q.RAISE_SAVE).setRequired(true)
    .setChoiceValues(['Yes – by ₹5–10 a day', 'Yes – by more than ₹10 a day', 'Maybe', 'No']);
  // tests: 40% squad creators / 1 reactivated member per squad
  form.addMultipleChoiceItem().setTitle(Q.SQUAD_SIZE).setRequired(true)
    .setChoiceValues(['I’d rather save alone', '1–2 friends', '3–4 friends', '5 or more']);
  // tests: boost subsidy (₹25/adopter/yr) and partner-funding logic
  form.addMultipleChoiceItem().setTitle(Q.BOOST_MIN).setRequired(true)
    .setChoiceValues(['₹10', '₹20', '₹50', '₹100 or more', 'A bonus wouldn’t make me check']);
  form.addCheckboxItem().setTitle('Any concerns about these features? (tick all)').setRequired(false)
    .setChoiceValues(['Friends seeing my savings', 'Pressure from friends to save', 'Too many notifications', 'Safety of digital gold', 'Hidden fees', 'Brands spamming me', 'No concerns']).showOtherOption(true);

  // ---------------- Section 5: Open-ended ----------------
  form.addPageBreakItem().setTitle('Last bit (optional)');
  form.addParagraphTextItem().setTitle('What would make you open a savings app every week – without being reminded?').setRequired(false);
  form.addTextItem().setTitle('Open to a 15-minute chat about how you save? Leave an email or Instagram handle (optional – only used to contact you for this research).').setRequired(false);

  // ---------------- Branching ----------------
  jarUse.setChoices([
    jarUse.createChoice('Yes, I use it now', jarPage),
    jarUse.createChoice('I used it before but stopped', jarPage),
    jarUse.createChoice('I installed it but never really saved', goalsPage),
    jarUse.createChoice('No, never used it', goalsPage),
  ]);

  // ---------------- Response sheet ----------------
  const ss = SpreadsheetApp.create('CaseBlitz survey – responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  PropertiesService.getScriptProperties().setProperties({ FORM_ID: form.getId(), SHEET_ID: ss.getId() });

  Logger.log('SHARE this link with students:  ' + form.shortenFormUrl(form.getPublishedUrl()));
  Logger.log('Edit the form:                  ' + form.getEditUrl());
  Logger.log('Responses sheet:                ' + ss.getUrl());
}

/** Writes a "Summary" tab: % per answer for every closed question + slide-2 headline numbers. */
function summarizeResponses() {
  const props = PropertiesService.getScriptProperties();
  const form = FormApp.openById(props.getProperty('FORM_ID'));
  const ss = SpreadsheetApp.openById(props.getProperty('SHEET_ID'));
  const T = FormApp.ItemType;
  const closed = [T.MULTIPLE_CHOICE, T.CHECKBOX, T.SCALE, T.LIST];

  const counts = {}, answered = {}, order = [];
  form.getItems().forEach((it) => {
    const type = it.getType();
    if (closed.indexOf(type) >= 0) { order.push(it.getTitle()); counts[it.getTitle()] = {}; answered[it.getTitle()] = 0; }
    if (type === T.GRID) it.asGridItem().getRows().forEach((r) => {
      const key = it.getTitle() + ' → ' + r; order.push(key); counts[key] = {}; answered[key] = 0;
    });
  });

  const responses = form.getResponses();
  const n = responses.length;
  const add = (key, v) => { counts[key][v] = (counts[key][v] || 0) + 1; };
  responses.forEach((resp) => resp.getItemResponses().forEach((ir) => {
    const item = ir.getItem(), title = item.getTitle(), a = ir.getResponse();
    if (item.getType() === T.GRID) {
      item.asGridItem().getRows().forEach((r, i) => {
        if (a[i]) { const key = title + ' → ' + r; answered[key]++; add(key, a[i]); }
      });
    } else if (counts[title]) {
      answered[title]++;
      (Array.isArray(a) ? a : [a]).forEach((v) => add(title, String(v)));
    }
  }));

  const pct = (key, answers) => {
    if (!answered[key]) return 'n/a';
    const c = answers.reduce((s, v) => s + (counts[key][v] || 0), 0);
    return Math.round((100 * c) / answered[key]) + '%  (' + c + '/' + answered[key] + ')';
  };
  const gridKey = (row) => Q.CONCEPT_GRID + ' → ' + row;
  const goalAny = () => {
    // % who ticked at least one concrete goal (not "Nothing specific" / "Not saving")
    let yes = 0, base = 0;
    responses.forEach((resp) => resp.getItemResponses().forEach((ir) => {
      if (ir.getItem().getTitle() !== Q.GOAL) return;
      base++;
      const a = ir.getResponse();
      if (a.some((v) => v !== 'Nothing specific – just saving' && v !== 'Not saving right now')) yes++;
    }));
    return base ? Math.round((100 * yes) / base) + '%  (' + yes + '/' + base + ')' : 'n/a';
  };

  const headline = [
    ['HEADLINE NUMBERS FOR SLIDE 2 / APPENDIX', ''],
    ['Total responses (n)', n],
    ['Students (UG + PG)', pct(Q.ROLE, ['College student (UG)', 'College student (PG)'])],
    ['Jar users (now or before)', pct(Q.JAR_USE, ['Yes, I use it now', 'I used it before but stopped'])],
    ['Jar users who open it monthly or less', pct(Q.JAR_OPEN_FREQ, ['About once a month', 'Rarely / almost never'])],
    ['Last Jar open was to check balance or withdraw', pct(Q.JAR_LAST_OPEN, ['Check my balance', 'Withdraw / sell gold'])],
    ['Have a concrete savings goal in next 6 months', goalAny()],
    ['Saving for a trip with friends', pct(Q.GOAL, ['A trip with friends'])],
    ['Would use Goal Jars (probably + definitely)', pct(gridKey('① Goal Jars'), ['Probably', 'Definitely'])],
    ['Would use Squad Jars (probably + definitely)', pct(gridKey('② Squad Jars (with friends)'), ['Probably', 'Definitely'])],
    ['Would open 2–3×/week or more', pct(Q.OPEN_FREQ_NEW, ['Daily', '2–3 times a week'])],
    ['Would open even with notifications OFF (yes)', pct(Q.NO_NOTIF, ['Yes'])],
    ['Would raise daily saving to hit goal faster', pct(Q.RAISE_SAVE, ['Yes – by ₹5–10 a day', 'Yes – by more than ₹10 a day'])],
    ['Would save with 1+ friends', pct(Q.SQUAD_SIZE, ['1–2 friends', '3–4 friends', '5 or more'])],
    ['A ₹20-or-less weekly bonus is enough to check', pct(Q.BOOST_MIN, ['₹10', '₹20'])],
  ];

  let sh = ss.getSheetByName('Summary');
  if (sh) sh.clear(); else sh = ss.insertSheet('Summary');
  sh.getRange(1, 1, headline.length, 2).setValues(headline);
  sh.getRange(1, 1).setFontWeight('bold');

  let row = headline.length + 2;
  sh.getRange(row, 1, 1, 4).setValues([['Question', 'Answer', 'Count', '% of those who answered']]).setFontWeight('bold');
  row++;
  const out = [];
  order.forEach((key) => {
    Object.keys(counts[key]).sort((a, b) => counts[key][b] - counts[key][a]).forEach((ans, i) => {
      out.push([i === 0 ? key : '', ans, counts[key][ans], answered[key] ? counts[key][ans] / answered[key] : 0]);
    });
  });
  if (out.length) {
    sh.getRange(row, 1, out.length, 4).setValues(out);
    sh.getRange(row, 4, out.length, 1).setNumberFormat('0%');
  }
  sh.autoResizeColumns(1, 4);
  Logger.log('Summary written (n=' + n + '): ' + ss.getUrl());
}

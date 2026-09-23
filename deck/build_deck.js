// CaseBlitz 2026 – Jar "Goal Jars" deck generator (pptxgenjs)
// Run: node build_deck.js  -> ../Jar_CaseBlitz_Deck.pptx
const pptxgen = require("pptxgenjs");
const React = require("react");
const RDS = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "Give every rupee a job: Jar Goal Jars";

// ---------- palette & type ----------
const P = "3B1C6E", P2 = "5B34A0", P3 = "9A7FD1", PL = "F1ECF9", PL2 = "DCCFF0";
const G = "F2B705", GD = "9A6A00", GL = "FFF3CC";
const INK = "1F1235", GREY = "5F5A70", LG = "E4E0EC", WHITE = "FFFFFF";
const RED = "C23B3B", REDL = "FBEAEA", GREEN = "1E7F52", GREENL = "E2F3EA";
const F = "Calibri";

// ---------- helpers ----------
const T = (s, text, o) => s.addText(text, Object.assign({ isTextBox: true, fontFace: F, margin: 0, color: INK, valign: "top", fontSize: 12 }, o));
const box = (s, x, y, w, h, fill, o = {}) => s.addShape(pres.shapes.ROUNDED_RECTANGLE, Object.assign({
  x, y, w, h, fill: { color: fill }, line: o.line ? { color: o.line, width: o.lw || 0.75 } : { color: fill, width: 0 }, rectRadius: o.r ?? 0.08,
}, o.shadow ? { shadow: { type: "outer", color: "000000", opacity: 0.12, blur: 6, offset: 2, angle: 90 } } : {}));
const rect = (s, x, y, w, h, fill) => s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: fill, width: 0 } });
const circle = (s, x, y, d, fill, o = {}) => s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: o.line ? { color: o.line, width: o.lw || 1 } : { color: fill, width: 0 } });
const hline = (s, x, y, w, color = LG, width = 1, dash) => s.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color, width, dashType: dash } });
const vline = (s, x, y, h, color = LG, width = 1) => s.addShape(pres.shapes.LINE, { x, y, w: 0, h, line: { color, width } });

const ICONS = {};
async function icon(name, color, px = 256) {
  const key = name + color;
  if (!ICONS[key]) {
    const svg = RDS.renderToStaticMarkup(React.createElement(fa[name], { color: "#" + color, size: px }));
    ICONS[key] = "image/png;base64," + (await sharp(Buffer.from(svg)).png().toBuffer()).toString("base64");
  }
  return ICONS[key];
}
async function iconCircle(s, name, x, y, d, bg, fg) {
  circle(s, x, y, d, bg);
  const pad = d * 0.25;
  s.addImage({ data: await icon(name, fg), x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad });
}

let pageNo = 0;
function header(s, kicker, title) {
  pageNo += 1;
  s.background = { color: WHITE };
  T(s, kicker, { x: 0.5, y: 0.3, w: 9, h: 0.28, fontSize: 11, bold: true, color: P2, charSpacing: 2 });
  T(s, title, { x: 0.5, y: 0.6, w: 12.3, h: 0.9, fontSize: 23, bold: true, color: INK, valign: "top" });
}
function footer(s, text, num = true) {
  T(s, text, { x: 0.5, y: 7.0, w: 11.6, h: 0.35, fontSize: 8, color: GREY, valign: "top" });
  if (num) T(s, String(pageNo), { x: 12.3, y: 7.0, w: 0.5, h: 0.3, fontSize: 9, color: GREY, align: "right", bold: true });
}
function progress(s, x, y, w, h, pct, bg = LG, fg = G) {
  box(s, x, y, w, h, bg, { r: h / 2 });
  if (pct > 0) box(s, x, y, Math.max(w * pct, h), h, fg, { r: h / 2 });
}
function jar(s, x, y, w, h, pct, body, fill, lid, outline) {
  box(s, x + w * 0.15, y, w * 0.7, h * 0.09, lid, { r: 0.04 });
  box(s, x, y + h * 0.11, w, h * 0.89, body, { r: 0.18, line: outline, lw: 1.5 });
  const ih = (h * 0.89 - 0.12) * pct;
  if (pct > 0) box(s, x + 0.06, y + h - 0.06 - ih, w - 0.12, ih, fill, { r: 0.14 });
}

(async () => {
  // =====================================================================
  // TITLE SLIDE (not counted)
  // =====================================================================
  {
    const s = pres.addSlide();
    s.background = { color: P };
    T(s, "CASEBLITZ 2026  ·  RECOMMENDATION MEMO TO JAR LEADERSHIP", { x: 0.8, y: 1.25, w: 7.6, h: 0.3, fontSize: 12, bold: true, color: G, charSpacing: 3 });
    T(s, "Give every rupee a job.", { x: 0.8, y: 1.75, w: 7.6, h: 1.0, fontSize: 48, bold: true, color: WHITE });
    T(s, "Turning Jar's silent savers into active users, without breaking the saving habit", { x: 0.8, y: 2.9, w: 6.8, h: 0.9, fontSize: 20, color: PL2 });
    T(s, [
      { text: "The recommendation: ", options: { bold: true, color: G } },
      { text: "Goal Jars with Squads, Monday Brand Boosts and a Sunday Wrap", options: { color: WHITE } },
    ], { x: 0.8, y: 4.15, w: 7.6, h: 0.5, fontSize: 14 });
    T(s, "Team HAVOC  ·  CV Raman University", { x: 0.8, y: 6.2, w: 6, h: 0.4, fontSize: 14, color: WHITE, bold: true });
    const jars = [[8.55, 0.58, "Rishikesh trip", "58%"], [10.05, 0.22, "New phone", "22%"], [11.55, 0.85, "Forever Jar", "long-term"]];
    for (const [x, pct, lab, v] of jars) {
      jar(s, x, 2.2, 1.15, 2.8, pct, "4A2A85", G, PL2, PL2);
      T(s, lab, { x: x - 0.2, y: 5.15, w: 1.55, h: 0.3, fontSize: 12, bold: true, color: WHITE, align: "center" });
      T(s, v, { x: x - 0.2, y: 5.45, w: 1.55, h: 0.3, fontSize: 11, color: G, align: "center" });
    }
  }

  // =====================================================================
  // 1 · EXECUTIVE SUMMARY
  // =====================================================================
  {
    const s = pres.addSlide();
    header(s, "01 · EXECUTIVE SUMMARY", "Give every rupee a job: Goal Jars give students 2–3 genuine reasons a week to open Jar, while saving stays 100% automatic");
    box(s, 0.5, 1.6, 12.3, 0.8, P);
    T(s, "THE PROBLEM IN ONE LINE", { x: 0.75, y: 1.7, w: 2.2, h: 0.6, fontSize: 10, bold: true, color: G, charSpacing: 1, valign: "middle" });
    T(s, "Jar automated every decision except the one it doesn't want users to make. Today the only meaningful in-app action is to withdraw.",
      { x: 3.0, y: 1.7, w: 9.6, h: 0.6, fontSize: 15, bold: true, color: WHITE, valign: "middle" });

    const cols = [
      { x: 0.5, ic: "FaSearch", h: "DIAGNOSIS", stat: "~12.5%", lab: "of 35M registered users save in a given month [D]", b: [
        "Value is delivered outside the app: round-off in the UPI app, silent AutoPay debit",
        "Balance shown in grams: ₹3 buys <0.3 mg; gold dips trigger the ostrich effect",
        "No goal, no squad, no decision: the only action left is “sell”, the topic of 56% of detailed 1–2★ Play Store reviews [S29]"] },
      { x: 4.685, ic: "FaBullseye", h: "RECOMMENDATION", stat: "0", lab: "extra steps added to the saving path", b: [
        "Goal Jars: split gold into named goals; the idle balance becomes a head start",
        "Squad Jars: friends save toward a shared trip, with no pooled money",
        "Monday Brand Boosts + Sunday Wrap create 2–3 meaningful opens a week"] },
      { x: 8.87, ic: "FaChartLine", h: "BUSINESS IMPACT", stat: "₹8.5 Cr", lab: "3-yr incremental net (base) · 52% ROI", b: [
        "Payback ~20 months; LTV/CAC 3.8×; break-even at 21% adoption",
        "Defends ~₹25 Cr/yr of student margin as payment apps copy the gold-on-every-payment mechanic",
        "North Star: Weekly Goal-Engaged Savers, 210k by month 12"] },
    ];
    for (const c of cols) {
      box(s, c.x, 2.6, 3.93, 3.7, PL);
      await iconCircle(s, c.ic, c.x + 0.25, 2.8, 0.5, P, WHITE);
      T(s, c.h, { x: c.x + 0.9, y: 2.8, w: 2.9, h: 0.5, fontSize: 13, bold: true, color: P, charSpacing: 1, valign: "middle" });
      T(s, c.stat, { x: c.x + 0.25, y: 3.45, w: 3.5, h: 0.6, fontSize: 32, bold: true, color: P2 });
      T(s, c.lab, { x: c.x + 0.25, y: 4.05, w: 3.5, h: 0.3, fontSize: 10.5, color: GREY, italic: true });
      T(s, c.b.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < c.b.length - 1, paraSpaceAfter: 5 } })),
        { x: c.x + 0.25, y: 4.45, w: 3.5, h: 1.8, fontSize: 11.5 });
    }
    box(s, 0.5, 6.42, 12.3, 0.48, GL);
    T(s, [
      { text: "The ask: ", options: { bold: true, color: GD } },
      { text: "approve an 8-week MVP + an 80-campus pilot. ≤₹1.6 Cr at risk; hard go/kill gates on engagement and auto-save volume.", options: {} },
    ], { x: 0.75, y: 6.42, w: 11.9, h: 0.48, fontSize: 12.5, valign: "middle" });
    footer(s, "[S] sourced · [D] derived from sourced data · [A] assumed; every assumption is listed in Appendix A1. Sources S1–S30 in Appendix A5. Validation plan in A6; Play Store review analysis (n = 6,000) in A7.");
  }

  // =====================================================================
  // 2 · DIAGNOSIS
  // =====================================================================
  {
    const s = pres.addSlide();
    header(s, "02 · RESEARCH & PROBLEM DIAGNOSIS", "There is no reason to open Jar: nothing visibly changes, nothing needs deciding and the savings have no purpose. Withdrawing is the only real action");
    // root
    box(s, 0.5, 1.62, 7.95, 0.5, P);
    T(s, "Why does a passive saver have no reason to open the app?", { x: 0.5, y: 1.62, w: 7.95, h: 0.5, fontSize: 13, bold: true, color: WHITE, align: "center", valign: "middle" });
    const bx = [0.5, 3.195, 5.89], bw = 2.56;
    vline(s, 4.475, 2.12, 0.18, P3, 1.5);
    hline(s, bx[0] + bw / 2, 2.3, bx[2] - bx[0], P3, 1.5);
    const branches = [
      { l: "A", t: "Nothing salient changes", sub: "visibility", leaves: [
        ["Value lives outside the app", "Round-off happens in the UPI app; AutoPay debits silently; gold is credited with no moment [S7]"],
        ["Wrong unit of progress", "₹3 buys <0.3 mg of gold [A: gold >₹10k/g]; grams mean nothing to a 20-year-old"],
        ["Bad news gets avoided", "Ostrich effect: investors log in less after losses [S25]; gold dips suppress opens"]] },
      { l: "B", t: "Nothing to do", sub: "actionability", leaves: [
        ["Automation removed decisions", "By design, saving needs zero input after setup"],
        ["The one high-value action destroys value", "Withdraw/sell is the only consequential in-app decision left; it is the #1 topic in reviews (32%) [S29]"],
        ["Low-value actions decay", "Spins already exist, yet only 1% of reviews mention them; Fello's prize model pivoted [S17][S29]"]] },
      { l: "C", t: "Nothing means anything", sub: "motivation", leaves: [
        ["No destination", "≤5% of reviews name any goal, yet 81% of Gen Z rank travel as the top priority [S20][S29]"],
        ["No social layer", "Saving is private, but student goals (trips, fests) are shared"],
        ["No goal-gradient pull", "Effort accelerates near a visible goal [S24]; Jar shows no goal to approach"]] },
    ];
    for (let i = 0; i < 3; i++) {
      const b = branches[i], x = bx[i];
      vline(s, x + bw / 2, 2.3, 0.15, P3, 1.5);
      box(s, x, 2.45, bw, 4.4, PL);
      circle(s, x + 0.15, 2.58, 0.42, G);
      T(s, b.l, { x: x + 0.15, y: 2.58, w: 0.42, h: 0.42, fontSize: 14, bold: true, color: INK, align: "center", valign: "middle" });
      T(s, [{ text: b.t, options: { bold: true, color: P, fontSize: 12.5, breakLine: true } }, { text: b.sub, options: { color: GREY, fontSize: 10, italic: true } }],
        { x: x + 0.65, y: 2.55, w: bw - 0.75, h: 0.55, valign: "middle" });
      b.leaves.forEach(([h, d], j) => {
        const y = 3.25 + j * 1.2;
        box(s, x + 0.12, y, bw - 0.24, 1.1, WHITE, { r: 0.06 });
        T(s, [{ text: `${b.l}${j + 1}  ${h}`, options: { bold: true, color: INK, fontSize: 10.5, breakLine: true } }, { text: d, options: { color: GREY, fontSize: 9.5 } }],
          { x: x + 0.22, y: y + 0.07, w: bw - 0.44, h: 0.98, paraSpaceAfter: 2 });
      });
    }
    // right column
    box(s, 8.7, 1.62, 4.1, 2.0, P);
    T(s, "CORE INSIGHT", { x: 8.9, y: 1.75, w: 3.7, h: 0.25, fontSize: 10, bold: true, color: G, charSpacing: 1 });
    T(s, "Jar automated every decision except the one it doesn't want users to make: withdraw.", { x: 8.9, y: 2.02, w: 3.75, h: 0.75, fontSize: 14.5, bold: true, color: WHITE });
    T(s, "So opening the app and growing savings pull in opposite directions. The fix is decisions that grow in value as the balance grows.", { x: 8.9, y: 2.8, w: 3.75, h: 0.75, fontSize: 10.5, color: PL2 });
    const tiles = [["6.8%", "of registered users saved monthly (Mar 2024) [D: S5]"], ["56%", "of detailed 1–2★ reviews are about withdrawing and getting back less (n = 408) [S29]"]];
    tiles.forEach(([v, l], i) => {
      const x = 8.7 + i * 2.1;
      box(s, x, 3.75, 2.0, 1.1, GL);
      T(s, v, { x: x + 0.15, y: 3.82, w: 1.75, h: 0.45, fontSize: 22, bold: true, color: GD });
      T(s, l, { x: x + 0.15, y: 4.27, w: 1.75, h: 0.55, fontSize: 9, color: INK });
    });
    box(s, 8.7, 4.98, 4.1, 1.87, WHITE, { line: LG });
    T(s, "WHAT IT IS NOT", { x: 8.9, y: 5.06, w: 3.7, h: 0.25, fontSize: 10, bold: true, color: RED, charSpacing: 1 });
    const nots = [["Trust or quality", "4.7★ from 112k ratings [S10]"], ["Missing gamification", "spins already exist [S7]"], ["Gen Z dislikes gold", "they see it as a digital asset [S22]"]];
    for (let i = 0; i < nots.length; i++) {
      const y = 5.4 + i * 0.44;
      s.addImage({ data: await icon("FaTimes", RED), x: 8.92, y: y + 0.06, w: 0.16, h: 0.16 });
      T(s, [{ text: nots[i][0] + ": ", options: { bold: true } }, { text: nots[i][1], options: { color: GREY } }], { x: 9.18, y, w: 3.55, h: 0.3, fontSize: 10, valign: "middle" });
    }
    footer(s, "S5 Deccan Chronicle (Mar 2024): 20M users, 1M txns/day, 22 saves/user-month → 1.36M savers = 6.8% [D]. S7 Jar site · S10 App Store · S13 Paytm Gold Coins · S17 Fello pivot · S20 Mintel · S22 WGC · S24 Kivetz et al. 2006 · S25 Sicherman et al. 2016 · S29 Play Store reviews, 30 Jul–22 Sep 2026 (Appendix A7).");
  }

  // =====================================================================
  // 3 · SEGMENT & OPTIONS
  // =====================================================================
  {
    const s = pres.addSlide();
    header(s, "03 · WHERE TO PLAY & WHAT TO BUILD", "Near-goal students are the lever, and Goal Jars beat six alternatives on fit, saving-safety and defensibility");
    T(s, "WHO MATTERS MOST", { x: 0.5, y: 1.6, w: 4.8, h: 0.3, fontSize: 11, bold: true, color: P2, charSpacing: 1 });
    // 2x2
    const mx = 0.95, my = 2.0, mw = 4.35, mh = 3.0;
    box(s, mx, my, mw, mh, PL, { r: 0.04 });
    vline(s, mx + mw / 2, my, mh, WHITE, 2); hline(s, mx, my + mh / 2, mw, WHITE, 2);
    // rotated label: box rotates about its centre, so centre it at x ≈ 0.72 (left of the matrix)
    T(s, "Engagement potential →", { x: 0.72 - mh / 2, y: my + mh / 2 - 0.14, w: mh, h: 0.28, fontSize: 9.5, color: GREY, rotate: 270, align: "center" });
    T(s, "Goal horizon →  (short … long)", { x: mx, y: my + mh + 0.05, w: mw, h: 0.25, fontSize: 9.5, color: GREY, align: "center" });
    const seg = [
      [mx + 0.35, my + 0.3, 0.75, G, "S1 Near-goal students ★", "1–6 mo goals: trip, phone, fest", mx + 1.18, my + 0.35],
      [mx + 0.45, my + 1.7, 0.5, P3, "S2 Goal-less students", "habit savers → give templates", mx + 1.02, my + 1.62],
      [mx + 2.45, my + 1.1, 0.5, PL2, "S3 Early-career", "Phase 3: SIP / insurance", mx + 3.0, my + 1.05],
      [mx + 2.75, my + 2.3, 0.45, LG, "S4 Tier-2/3 adults", "Nek, gold loans", mx + 3.25, my + 2.28],
    ];
    for (const [x, y, d, c, t, sub, tx, ty] of seg) {
      circle(s, x, y, d, c, { line: WHITE, lw: 1.5 });
      T(s, [{ text: t, options: { bold: true, breakLine: true, fontSize: 10.5 } }, { text: sub, options: { color: GREY, fontSize: 9 } }], { x: tx, y: ty, w: 2.1, h: 0.55 });
    }
    const facts = [
      ["FaUserGraduate", "1.75M active-saving students", " = 35M [S1] × 40% students [A] × 12.5% active [D]"],
      ["FaPlane", "81% of Gen Z rank travel most important", " [S20]: short, social, concrete goals"],
      ["FaExclamationTriangle", "Paytm now gives gold on every payment", " [S13]: Jar's moat must move from mechanic to meaning"],
    ];
    for (let i = 0; i < facts.length; i++) {
      const y = 5.5 + i * 0.47;
      await iconCircle(s, facts[i][0], 0.5, y, 0.38, P, WHITE);
      T(s, [{ text: facts[i][1], options: { bold: true } }, { text: facts[i][2], options: { color: GREY } }], { x: 1.0, y: y - 0.03, w: 4.4, h: 0.45, fontSize: 10, valign: "middle" });
    }
    // options matrix
    T(s, "SEVEN OPTIONS SCORED (1 = poor, 5 = best)", { x: 5.8, y: 1.6, w: 7, h: 0.3, fontSize: 11, bold: true, color: P2, charSpacing: 1 });
    const heat = { 5: [P2, WHITE], 4: [P3, WHITE], 3: [PL2, INK], 2: [PL, INK], 1: [WHITE, GREY] };
    const hdr = ["Option", "Impact", "Feasibility", "Fit to diagnosis", "Originality", "Saving-safe", "Defensible", "Total /30"];
    const opts = [
      ["A. Goal Jars + Squad Jars  ·  CORE", 5, 4, 5, 3, 5, 4],
      ["B. Brand Boosts  ·  LEVER", 4, 3, 4, 4, 5, 4],
      ["C. Sunday Wrap  ·  LEVER", 3, 5, 4, 3, 5, 2],
      ["D. Streaks + campus leagues", 3, 4, 2, 2, 4, 2],
      ["E. Campus gold-cashback", 3, 2, 3, 2, 5, 2],
      ["F. Bigger prize games / spins", 4, 3, 1, 1, 4, 1],
      ["G. Gold+ leasing yield", 2, 2, 2, 1, 5, 1],
    ];
    const rows = [hdr.map((h) => ({ text: h, options: { bold: true, color: WHITE, fill: { color: P }, fontSize: 9.5, align: "center", valign: "middle" } }))];
    opts.forEach((o, i) => {
      const total = o.slice(1).reduce((a, b) => a + b, 0);
      rows.push([
        { text: o[0], options: { bold: i < 3, color: INK, fill: { color: i < 3 ? GL : WHITE }, fontSize: 10, align: "left", valign: "middle" } },
        ...o.slice(1).map((v) => ({ text: String(v), options: { fill: { color: heat[v][0] }, color: heat[v][1], bold: true, align: "center", valign: "middle", fontSize: 11 } })),
        { text: String(total), options: { bold: true, color: i < 3 ? GD : GREY, fill: { color: i < 3 ? GL : WHITE }, align: "center", valign: "middle", fontSize: 13 } },
      ]);
    });
    s.addTable(rows, { x: 5.8, y: 1.95, w: 7.0, colW: [2.25, 0.62, 0.74, 0.72, 0.74, 0.64, 0.8, 0.49], rowH: [0.5, 0.44, 0.44, 0.44, 0.44, 0.44, 0.44, 0.44], fontFace: F, border: { type: "solid", pt: 1, color: WHITE }, margin: 0.05 });
    box(s, 5.8, 5.65, 7.0, 1.2, PL);
    T(s, [
      { text: "Why the others lose  ", options: { bold: true, color: P, breakLine: true } },
      { text: "D: ", options: { bold: true } }, { text: "streaks on automatic saving are unearned, so they're hollow (Duolingo works because users act [S26]).", options: { breakLine: true } },
      { text: "E/F: ", options: { bold: true } }, { text: "already copied (Paytm Gold Coins [S13]) or already in Jar (spins); Fello's prize economics failed [S17].", options: { breakLine: true } },
      { text: "G: ", options: { bold: true } }, { text: "Gullak already offers it [S15]; it raises regulatory exposure after SEBI's Nov-2025 advisory [S8] and creates no weekly reason to open.", options: {} },
    ], { x: 6.0, y: 5.72, w: 6.65, h: 1.08, fontSize: 9.5, paraSpaceAfter: 2 });
    footer(s, "Scoring: team judgment against the Slide 2 diagnosis; \"Saving-safe\" = no added friction or risk to automatic saving; \"Defensible\" = hard for PhonePe/GPay/Paytm to copy. S1 TechCrunch · S8 SEBI advisory · S13 Paytm · S15 Inc42 · S17 Fello · S20 Mintel · S26 Duolingo.");
  }

  // =====================================================================
  // 4 · RECOMMENDATION
  // =====================================================================
  {
    const s = pres.addSlide();
    header(s, "04 · STRATEGIC RECOMMENDATION", "Recommend Goal Jars with Squads, boosted by brands and recapped every Sunday, adding zero steps to saving");
    const phones = [
      { x: 0.5, cap: "① Goal Jars + Squads (core)" },
      { x: 3.07, cap: "② Monday Boost Drop (lever)" },
      { x: 5.64, cap: "③ Sunday Wrap (lever)" },
    ];
    const pw = 2.37, py = 1.95, ph = 4.95;
    for (const p of phones) {
      T(s, p.cap, { x: p.x, y: 1.58, w: pw, h: 0.3, fontSize: 11, bold: true, color: P, align: "center" });
      box(s, p.x, py, pw, ph, INK, { r: 0.28 });
    }
    // phone 1 screen
    {
      const x = 0.5 + 0.09, y = py + 0.09, w = pw - 0.18, h = ph - 0.18;
      box(s, x, y, w, h, WHITE, { r: 0.22 });
      box(s, x + w / 2 - 0.35, y + 0.07, 0.7, 0.1, INK, { r: 0.05 });
      T(s, "My Jars", { x: x + 0.15, y: y + 0.28, w: 1.5, h: 0.3, fontSize: 13, bold: true, color: P });
      const jars = [["Rishikesh trip · Squad of 4", 0.58, "₹2,320 of ₹4,000 · 1 wk ahead"], ["New phone", 0.22, "₹3,300 of ₹15,000"]];
      jars.forEach(([t, pct, sub], i) => {
        const cy = y + 0.7 + i * 1.02;
        box(s, x + 0.12, cy, w - 0.24, 0.92, PL);
        T(s, t, { x: x + 0.22, y: cy + 0.08, w: w - 0.44, h: 0.25, fontSize: 9.5, bold: true });
        progress(s, x + 0.22, cy + 0.38, w - 0.44, 0.16, pct);
        T(s, `${Math.round(pct * 100)}%  ·  ${sub}`, { x: x + 0.22, y: cy + 0.6, w: w - 0.44, h: 0.25, fontSize: 8, color: GREY });
      });
      const cy = y + 2.76;
      box(s, x + 0.12, cy, w - 0.24, 0.72, WHITE, { line: PL2 });
      T(s, [{ text: "Forever Jar (long-term)", options: { bold: true, breakLine: true, fontSize: 9.5 } }, { text: "₹1,850 in 24K gold · untouched", options: { fontSize: 8, color: GREY } }], { x: x + 0.22, y: cy + 0.1, w: w - 0.44, h: 0.55 });
      box(s, x + 0.12, y + 3.6, w - 0.24, 0.36, P, { r: 0.18 });
      T(s, "+ New jar  (12 templates)", { x: x + 0.12, y: y + 3.6, w: w - 0.24, h: 0.36, fontSize: 9.5, bold: true, color: WHITE, align: "center", valign: "middle" });
      T(s, "Idle balance seeds the first jar → 30% head start", { x: x + 0.15, y: y + 4.08, w: w - 0.3, h: 0.5, fontSize: 8, italic: true, color: GD, align: "center" });
    }
    // phone 2 screen
    {
      const x = 3.07 + 0.09, y = py + 0.09, w = pw - 0.18, h = ph - 0.18;
      box(s, x, y, w, h, WHITE, { r: 0.22 });
      box(s, x + w / 2 - 0.35, y + 0.07, 0.7, 0.1, INK, { r: 0.05 });
      T(s, "Boost Drop · Mon", { x: x + 0.15, y: y + 0.28, w: w - 0.3, h: 0.3, fontSize: 13, bold: true, color: P });
      box(s, x + 0.12, y + 0.7, w - 0.24, 1.5, GL);
      T(s, [{ text: "Hostel partner*", options: { bold: true, breakLine: true, fontSize: 9.5, color: GD } }, { text: "+₹20 gold to your Rishikesh Jar if the squad hits 50% by Sunday", options: { fontSize: 9.5 } }], { x: x + 0.22, y: y + 0.78, w: w - 0.44, h: 0.9 });
      box(s, x + 0.22, y + 1.75, w - 0.44, 0.34, P, { r: 0.17 });
      T(s, "Claim boost", { x: x + 0.22, y: y + 1.75, w: w - 0.44, h: 0.34, fontSize: 9.5, bold: true, color: WHITE, align: "center", valign: "middle" });
      box(s, x + 0.12, y + 2.32, w - 0.24, 0.9, PL);
      T(s, [{ text: "Bus partner*", options: { bold: true, breakLine: true, fontSize: 9.5, color: P } }, { text: "5% bonus when you redeem this jar for tickets", options: { fontSize: 9 } }], { x: x + 0.22, y: y + 2.4, w: w - 0.44, h: 0.75 });
      ["R", "K", "A", "M"].forEach((l, i) => {
        circle(s, x + 0.2 + i * 0.36, y + 3.42, 0.32, [P2, G, P3, GREEN][i]);
        T(s, l, { x: x + 0.2 + i * 0.36, y: y + 3.42, w: 0.32, h: 0.32, fontSize: 9, bold: true, color: WHITE, align: "center", valign: "middle" });
      });
      T(s, "Squad at 46%", { x: x + 0.2, y: y + 3.8, w: w - 0.4, h: 0.25, fontSize: 9, bold: true, color: P });
      T(s, "*illustrative partner categories; brand-funded", { x: x + 0.15, y: y + 4.18, w: w - 0.3, h: 0.4, fontSize: 7.5, italic: true, color: GREY, align: "center" });
    }
    // phone 3 screen (dark)
    {
      const x = 5.64 + 0.09, y = py + 0.09, w = pw - 0.18, h = ph - 0.18;
      box(s, x, y, w, h, P, { r: 0.22 });
      box(s, x + w / 2 - 0.35, y + 0.07, 0.7, 0.1, INK, { r: 0.05 });
      T(s, "Your week", { x: x + 0.15, y: y + 0.28, w: w - 0.3, h: 0.3, fontSize: 13, bold: true, color: WHITE });
      T(s, "₹236", { x: x + 0.15, y: y + 0.65, w: w - 0.3, h: 0.6, fontSize: 30, bold: true, color: G });
      T(s, "saved automatically: 14 chai round-offs + 7 daily saves", { x: x + 0.15, y: y + 1.28, w: w - 0.3, h: 0.45, fontSize: 9, color: PL2 });
      progress(s, x + 0.15, y + 1.85, w - 0.3, 0.18, 0.58, "4A2A85", G);
      T(s, "Rishikesh Jar 58% · 1 week ahead of plan", { x: x + 0.15, y: y + 2.1, w: w - 0.3, h: 0.4, fontSize: 9.5, bold: true, color: WHITE });
      T(s, "Gold price −₹12 this week; your saving still moved you +6%", { x: x + 0.15, y: y + 2.55, w: w - 0.3, h: 0.45, fontSize: 8.5, italic: true, color: PL2 });
      box(s, x + 0.15, y + 3.15, (w - 0.4) / 2, 0.36, WHITE, { r: 0.18 });
      T(s, "Keep plan", { x: x + 0.15, y: y + 3.15, w: (w - 0.4) / 2, h: 0.36, fontSize: 9, bold: true, color: P, align: "center", valign: "middle" });
      box(s, x + 0.25 + (w - 0.4) / 2, y + 3.15, (w - 0.4) / 2, 0.36, G, { r: 0.18 });
      T(s, "+₹10/day", { x: x + 0.25 + (w - 0.4) / 2, y: y + 3.15, w: (w - 0.4) / 2, h: 0.36, fontSize: 9, bold: true, color: INK, align: "center", valign: "middle" });
      T(s, "Share story ↗", { x: x + 0.15, y: y + 3.7, w: w - 0.3, h: 0.3, fontSize: 9, color: WHITE, align: "center", underline: true });
    }
    // right: zero friction
    const rx = 8.3, rw = 4.5;
    T(s, "ZERO-FRICTION PROOF", { x: rx, y: 1.58, w: rw, h: 0.3, fontSize: 11, bold: true, color: P2, charSpacing: 1 });
    const zf = [["Saving step", "With Goal Jars"], ["UPI spend detected", "Unchanged"], ["Round-off + daily save", "Unchanged"], ["UPI AutoPay debit", "Unchanged: no new mandate or KYC"], ["Gold credited", "Tagged to a jar by a one-time rule"], ["User never opens Goal Jars", "Identical experience (opt-in)"]];
    s.addTable(zf.map((r, i) => r.map((c, j) => ({ text: c, options: {
      bold: i === 0 || j === 1, color: i === 0 ? WHITE : j === 1 ? GREEN : INK, fill: { color: i === 0 ? P : i % 2 ? WHITE : PL }, fontSize: 10, valign: "middle" } }))),
      { x: rx, y: 1.95, w: rw, colW: [2.0, 2.5], rowH: 0.32, fontFace: F, border: { type: "solid", pt: 0.75, color: LG }, margin: 0.07 });
    T(s, "SAFE AND SMART BY DESIGN", { x: rx, y: 4.02, w: rw, h: 0.3, fontSize: 11, bold: true, color: P2, charSpacing: 1 });
    const safe = [
      ["FaLock", "No pooled money:", " each squad member owns their own gold, which avoids 'unauthorized collection' risk [S4]"],
      ["FaShieldAlt", "Asset-agnostic ledger:", " a jar can hold gold ETF or fund units if digital gold is restricted [S8]"],
      ["FaPiggyBank", "Forever Jar partition", " protects long-term savings (partitioning +72% savings [S23])"],
      ["FaGift", "Partner-funded boosts", " (Acorns model [S27]); Jar subsidy capped at ₹25/user/yr"],
      ["FaExchangeAlt", "Fixes the most painful moment:", " withdrawal, where users meet 3% GST + a 2–5% spread [S30], becomes goal redemption with a partner bonus"],
    ];
    for (let i = 0; i < safe.length; i++) {
      const y = 4.34 + i * 0.5;
      await iconCircle(s, safe[i][0], rx, y + 0.04, 0.4, PL, P);
      T(s, [{ text: safe[i][1], options: { bold: true } }, { text: safe[i][2], options: { color: GREY } }], { x: rx + 0.52, y, w: rw - 0.52, h: 0.52, fontSize: 9.5, valign: "middle" });
    }
    footer(s, "Extends existing Jar features (round-off, daily save, Nek, gifting, insurance); duplicates none. Redemption can route to Nek jewellery or gold gifting. S4 Entrackr · S8 SEBI advisory Nov 2025 · S23 Soman & Cheema 2011 · S27 Acorns Found Money · S30 digital gold charges explainer.");
  }

  // =====================================================================
  // 5 · USER JOURNEY
  // =====================================================================
  {
    const s = pres.addSlide();
    header(s, "05 · USER JOURNEY", "Riya opens Jar three times a week because she has decisions to make, not because notifications nag her");
    box(s, 0.5, 1.58, 12.3, 0.8, PL);
    circle(s, 0.65, 1.68, 0.6, P);
    T(s, "R", { x: 0.65, y: 1.68, w: 0.6, h: 0.6, fontSize: 20, bold: true, color: WHITE, align: "center", valign: "middle" });
    T(s, [{ text: "Riya Sharma, 20 · 2nd-year B.Com, Indore (tier-2)", options: { bold: true, fontSize: 13, breakLine: true } },
      { text: "~45 UPI payments/mo [A] · ₹480/mo auto-saved (round-offs ~₹180 + ₹10/day) [A] · ₹1,200 idle in Jar · opens Jar ~1×/month", options: { fontSize: 10, color: GREY } }],
      { x: 1.4, y: 1.66, w: 7.2, h: 0.65, valign: "middle" });
    box(s, 8.75, 1.68, 3.9, 0.6, G);
    T(s, [{ text: "GOAL  ", options: { bold: true } }, { text: "Rishikesh trip with 3 friends · ₹4,000 each · 12 wks", options: {} }], { x: 8.9, y: 1.68, w: 3.65, h: 0.6, fontSize: 10.5, valign: "middle", color: INK });

    const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"], dx = 1.95, dw = (12.8 - dx) / 7;
    days.forEach((d, i) => T(s, d, { x: dx + i * dw, y: 2.5, w: dw, h: 0.25, fontSize: 10, bold: true, color: GREY, align: "center" }));
    T(s, "WEEK 4", { x: 0.5, y: 2.5, w: 1.4, h: 0.25, fontSize: 10, bold: true, color: P2, charSpacing: 1 });
    T(s, "Background", { x: 0.5, y: 2.82, w: 1.4, h: 0.36, fontSize: 10, bold: true, color: GREY, valign: "middle" });
    box(s, dx, 2.82, 12.8 - dx, 0.36, GL, { r: 0.18 });
    T(s, "Round-offs + ₹20/day save flow automatically, every day. No open needed.", { x: dx, y: 2.82, w: 12.8 - dx, h: 0.36, fontSize: 10, color: GD, bold: true, align: "center", valign: "middle" });
    T(s, "Meaningful opens", { x: 0.5, y: 3.3, w: 1.4, h: 0.5, fontSize: 10, bold: true, color: P, valign: "top" });
    const cards = [
      { day: 0, x: 1.95, t: "MON · Boost Drop", r: [["Trigger", "weekly drop ritual"], ["Action", "claims +₹20 squad boost (45 s)"], ["Value", "free money toward the goal"], ["No push needed", "known ritual; reward expires Sunday"]] },
      { day: 2, x: 5.05, t: "WED · Squad moment", r: [["Trigger", "Kabir added ₹150; date poll open"], ["Action", "votes on dates, +₹50 top-up (2 min)"], ["Value", "real trip coordination: who's in, who's funded"], ["No push needed", "the plan lives here; friends discuss it on WhatsApp"]] },
      { day: 6, x: 12.8 - 2.95, t: "SUN · Sunday Wrap", r: [["Trigger", "weekly progress story"], ["Action", "sees ₹236 → 58%; keeps plan; shares (1 min)"], ["Value", "progress and pride: ahead of plan"], ["No push needed", "curiosity near the goal (goal gradient [S24])"]] },
    ];
    for (const c of cards) {
      const cx = dx + c.day * dw + dw / 2;
      circle(s, cx - 0.09, 3.3, 0.18, P);
      box(s, c.x, 3.55, 2.95, 1.95, WHITE, { line: PL2, lw: 1, shadow: true });
      T(s, c.t, { x: c.x + 0.15, y: 3.62, w: 2.65, h: 0.3, fontSize: 11.5, bold: true, color: P });
      T(s, c.r.flatMap(([k, v], i) => [
        { text: k + ": ", options: { bold: true, color: k === "No push needed" ? GREEN : INK } },
        { text: v, options: { color: INK, breakLine: i < c.r.length - 1 } }]), { x: c.x + 0.15, y: 3.95, w: 2.65, h: 1.5, fontSize: 9.5, paraSpaceAfter: 3 });
    }
    T(s, [{ text: "3", options: { fontSize: 28, bold: true, breakLine: true } }, { text: "meaningful opens", options: { fontSize: 10, bold: true, breakLine: true } }, { text: "0 forced", options: { fontSize: 10, italic: true } }],
      { x: 8.1, y: 3.85, w: 1.65, h: 1.3, color: GREEN, align: "center", valign: "middle" });

    // hook -> habit -> payoff
    T(s, "HOOK → HABIT → PAYOFF", { x: 0.5, y: 5.62, w: 4, h: 0.25, fontSize: 10.5, bold: true, color: P2, charSpacing: 1 });
    const bx0 = 0.5, bw0 = 7.3;
    progress(s, bx0, 5.95, bw0, 0.16, 1.0, LG, LG);
    progress(s, bx0, 5.95, bw0, 0.16, 0.58, LG, G);
    const ms = [[0.30, "W1: 30%", "Seeds jar with idle ₹1,200; invites 3 friends (1 dormant user reactivated)"], [0.58, "W4: 58%", "Rituals set; bumps save ₹10→₹20/day after the Wrap shows she's behind"], [1.0, "W12: 100%", "Redeems at partner (+5%), adds trip insurance; next jar in 1 tap"]];
    ms.forEach(([p, lab, d], i) => {
      const x = bx0 + bw0 * p;
      circle(s, x - 0.12, 5.91, 0.24, i === 2 ? GREEN : P);
      T(s, [{ text: lab + "  ", options: { bold: true, color: P } }, { text: d, options: { color: GREY } }], { x: bx0 + i * 2.5, y: 6.2, w: 2.3, h: 0.72, fontSize: 8.5, align: i === 2 ? "right" : "left" });
    });
    // forced vs meaningful
    const fv = [["Forced open (rejected)", "Goal Jar open (built)"], ["“Gold price changed!” push", "User returns for a decision"], ["Value to Jar only", "Money, coordination or progress for the user"], ["Dies with notifications off", "Survives: ritual + social + goal proximity"], ["Open → sell (hurts saving)", "Open → top-up (grows saving)"]];
    s.addTable(fv.map((r, i) => r.map((c, j) => ({ text: c, options: { bold: i === 0, color: i === 0 ? WHITE : j === 0 ? RED : GREEN, fill: { color: i === 0 ? (j === 0 ? RED : GREEN) : j === 0 ? REDL : GREENL }, fontSize: 9, valign: "middle" } }))),
      { x: 8.2, y: 5.6, w: 4.6, colW: [2.05, 2.55], rowH: 0.26, fontFace: F, border: { type: "solid", pt: 1, color: WHITE }, margin: 0.05 });
    footer(s, "Persona numbers are illustrative [A]: round-off ≈ ₹4 avg (uniform 0–9 to the nearest ₹10) × 45 payments; week-4 run-rate ~₹235/wk = ₹20/day + round-offs + boosts + optional top-ups. S24 Kivetz et al. 2006 (goal gradient, endowed progress).");
  }

  // =====================================================================
  // 6 · BUSINESS CASE
  // =====================================================================
  {
    const s = pres.addSlide();
    header(s, "06 · FINANCIAL ANALYSIS", "Base case returns ₹8.5 Cr net over three years with a ~20-month payback, and a pilot gate caps the downside at ₹1.6 Cr");
    // waterfall
    T(s, "3-YEAR INCREMENTAL VALUE, BASE CASE (₹ Cr)", { x: 0.5, y: 1.58, w: 6.3, h: 0.28, fontSize: 11, bold: true, color: P2, charSpacing: 1 });
    const wf = [["Savings uplift", 7.2, "up"], ["Partner commissions", 6.4, "up"], ["Churn reduction", 2.4, "up"], ["Reactivated savers", 8.7, "up"], ["Revenue", 24.8, "total"], ["Costs", -16.3, "down"], ["Net", 8.5, "net"]];
    const base = 4.3, scale = 2.05 / 24.8, bwid = 0.62, gap = 0.87, x0 = 0.75;
    let run = 0;
    wf.forEach(([lab, v, kind], i) => {
      const x = x0 + i * gap;
      let top, h, col;
      if (kind === "up") { top = base - (run + v) * scale; h = v * scale; run += v; col = P2; }
      else if (kind === "total") { top = base - v * scale; h = v * scale; col = P; }
      else if (kind === "down") { top = base - run * scale; h = -v * scale; run += v; col = RED; }
      else { top = base - v * scale; h = v * scale; col = GREEN; }
      rect(s, x, top, bwid, h, col);
      T(s, (v > 0 ? "" : "−") + Math.abs(v).toFixed(1), { x: x - 0.15, y: top - 0.27, w: bwid + 0.3, h: 0.25, fontSize: 10.5, bold: true, color: col, align: "center" });
      T(s, lab, { x: x - 0.14, y: base + 0.05, w: bwid + 0.28, h: 0.42, fontSize: 8.5, color: INK, align: "center", bold: kind !== "up" });
      if (i < wf.length - 1) hline(s, x + bwid, kind === "down" ? top + h : top, gap - bwid, P3, 0.75, "dash");
    });
    hline(s, 0.6, base, 6.2, LG, 1);
    T(s, "Not counted: ~₹25 Cr/yr of student margin defended against copycats [D]", { x: 0.5, y: 4.82, w: 6.3, h: 0.25, fontSize: 9, italic: true, color: GD });

    // tornado (native chart)
    T(s, "SENSITIVITY: CHANGE IN 3-YR NET VS BASE ₹8.5 CR", { x: 7.1, y: 1.58, w: 5.7, h: 0.28, fontSize: 11, bold: true, color: P2, charSpacing: 1 });
    const labels = ["Adoption (×0.5 / ×1.5)", "Take rate (2% / 4.7%)", "Reactivated per squad (0.3 / 1.5)", "Student share (30% / 45%)", "Savings uplift (15% / 45%)", "Partner redemption (10% / 30%)"];
    s.addChart(pres.charts.BAR, [
      { name: "Low case", labels, values: [-10.8, -6.1, -6.1, -5.4, -3.6, -3.2] },
      { name: "High case", labels, values: [10.8, 10.4, 4.4, 2.7, 3.6, 3.2] },
    ], {
      x: 7.0, y: 1.85, w: 5.8, h: 3.0, barDir: "bar", barGrouping: "stacked", barGapWidthPct: 45,
      chartColors: [RED, GREEN], showLegend: true, legendPos: "b", legendFontSize: 9, legendFontFace: F,
      showValue: true, dataLabelPosition: "inEnd", dataLabelFontSize: 8.5, dataLabelColor: WHITE, dataLabelFormatCode: "+0.0;-0.0", dataLabelFontFace: F,
      catAxisOrientation: "maxMin", catAxisLabelPos: "low", catAxisLabelFontSize: 9, catAxisLabelColor: INK, catAxisLabelFontFace: F, catAxisLineShow: false,
      valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" }, valAxisMinVal: -12, valAxisMaxVal: 12,
    });

    // bottom row: funnel
    T(s, "FUNNEL (BASE)", { x: 0.5, y: 5.12, w: 3.8, h: 0.25, fontSize: 10.5, bold: true, color: P2, charSpacing: 1 });
    const fun = [[4.0, P, "35M registered users [S1]"], [3.4, P2, "14M students [A: 40%]"], [2.8, P3, "1.75M active savers, Y1 [D: 12.5%]"], [2.2, PL2, "741k Goal Jar adopters, Y3 [A: 35%]"], [1.6, GL, "296k savers reactivated, Y3 [A]"]];
    fun.forEach(([w, c, t], i) => {
      box(s, 0.5, 5.42 + i * 0.3, w, 0.26, c, { r: 0.04 });
      T(s, t, { x: 0.6, y: 5.42 + i * 0.3, w: 4.2, h: 0.26, fontSize: 8.5, bold: true, color: i < 2 ? WHITE : INK, valign: "middle" });
    });
    // scenarios
    const sc = [["", "Bear", "Base", "Bull"], ["3-yr revenue", "₹3.6 Cr", "₹24.8 Cr", "₹96.4 Cr"], ["3-yr cost", "₹14.5 Cr", "₹16.3 Cr", "₹18.3 Cr"], ["3-yr net", "−₹10.9 Cr*", "₹8.5 Cr", "₹78.1 Cr"], ["ROI", "−75%", "52%", "428%"], ["LTV/CAC", "0.4×", "3.8×", "13.5×"]];
    s.addTable(sc.map((r, i) => r.map((c, j) => ({ text: c, options: {
      bold: i === 0 || j === 2 || j === 0, color: i === 0 ? WHITE : j === 2 ? P : INK, fill: { color: i === 0 ? (j === 2 ? P : P2) : j === 2 ? PL : WHITE }, fontSize: 9.5, align: j === 0 ? "left" : "center", valign: "middle" } }))),
      { x: 5.0, y: 5.12, w: 4.15, colW: [1.15, 1.0, 1.0, 1.0], rowH: 0.25, fontFace: F, border: { type: "solid", pt: 0.75, color: LG }, margin: 0.04 });
    T(s, "*Bear stacks every adverse input; the pilot gate stops it at ≤₹1.6 Cr spent", { x: 5.0, y: 6.67, w: 4.2, h: 0.25, fontSize: 8, italic: true, color: RED });
    // KPI tiles
    const kpi = [["52%", "3-yr ROI"], ["~20 mo", "payback"], ["3.8×", "LTV/CAC (₹367 / ₹96)"], ["21%", "break-even Y3 adoption"]];
    kpi.forEach(([v, l], i) => {
      const x = 9.4 + (i % 2) * 1.72, y = 5.12 + Math.floor(i / 2) * 0.9;
      box(s, x, y, 1.62, 0.8, i === 3 ? GL : PL);
      T(s, v, { x: x + 0.1, y: y + 0.05, w: 1.42, h: 0.42, fontSize: 19, bold: true, color: i === 3 ? GD : P, align: "center" });
      T(s, l, { x: x + 0.05, y: y + 0.47, w: 1.52, h: 0.28, fontSize: 8.5, color: GREY, align: "center" });
    });
    footer(s, "Inputs: 35M users [S1]; 40% students [A]; 12.5% active [D: S3, S5]; ₹400/mo saving [D: ~₹2,350 Cr gold GMV ÷ 4.4M savers]; +30% uplift [A: S23 found +72%; haircut >50%]; 3% take [A: below the 4.7% FY25 blended margin, S3]; partner 1.2 goals × 20% × ₹4,000 × 4% [A]; churn 55%→65% survival [A]; costs: build ₹3.0/1.8/1.8 Cr, marketing ₹2.5/2/2 Cr, boosts ₹25/12/8 per adopter [A]. Model: Appendix A1–A2.");
  }

  // =====================================================================
  // 7 · METRICS & ROLLOUT
  // =====================================================================
  {
    const s = pres.addSlide();
    header(s, "07 · KEY BUSINESS METRICS & ROLLOUT", "One North Star, four guardrails and one go/kill gate decide whether Goal Jars scale");
    box(s, 0.5, 1.58, 7.4, 0.95, P);
    T(s, [{ text: "NORTH STAR  ·  Weekly Goal-Engaged Savers (WGES)", options: { bold: true, color: WHITE, fontSize: 13, breakLine: true } },
      { text: "Auto-save active that week AND ≥2 meaningful goal sessions (claim, squad action, re-allocate, top-up, Wrap ≥5 s)", options: { color: PL2, fontSize: 9.5 } }],
      { x: 0.7, y: 1.63, w: 5.4, h: 0.85, valign: "middle" });
    T(s, [{ text: "210k", options: { bold: true, fontSize: 24, color: G, breakLine: true } }, { text: "by month 12", options: { fontSize: 9.5, color: WHITE } }], { x: 6.1, y: 1.63, w: 1.65, h: 0.85, align: "center", valign: "middle" });
    const rowsM = [
      { lab: "INPUTS", c: PL, tc: P, items: ["Adoption: 20% of active students", "Endowed start: ≥60% of jars", "Squads: 40% of jars, ≥2.5 invites", "Boost claims: ≥50% of adopters/wk", "Meaningful opens ≥2.5/wk (base ~0.5 [A])"] },
      { lab: "GUARDRAILS · must NOT move", c: REDL, tc: RED, items: ["Round-off / AutoPay opt-out ≤ +0.2pp vs control", "Auto-save ₹ per user: non-inferior (−2% margin)", "Forever Jar withdrawals ≤ control", "Notification opt-outs & uninstalls ≤ control"] },
      { lab: "BUSINESS", c: GREENL, tc: GREEN, items: ["+30% saving per adopter", "12-mo retention 55% → 65%", "≥1.0 reactivated saver per squad", "CAC ₹96 · LTV ₹367 · LTV/CAC ≥3×"] },
    ];
    rowsM.forEach((r, i) => {
      const y = 2.72 + i * 1.12;
      T(s, r.lab, { x: 0.5, y, w: 7.4, h: 0.25, fontSize: 10, bold: true, color: r.tc, charSpacing: 1 });
      const n = r.items.length, gapx = 0.1, w = (7.4 - gapx * (n - 1)) / n;
      r.items.forEach((t, j) => {
        box(s, 0.5 + j * (w + gapx), y + 0.28, w, 0.72, r.c);
        T(s, t, { x: 0.58 + j * (w + gapx), y: y + 0.3, w: w - 0.16, h: 0.68, fontSize: 9.5, bold: i === 1, color: INK, valign: "middle", align: "center" });
      });
    });
    box(s, 0.5, 6.1, 7.4, 0.78, WHITE, { line: PL2 });
    T(s, [{ text: "A/B design  ", options: { bold: true, color: P } },
      { text: "Cluster-randomise by campus (squads spill over): 40 treatment vs 40 matched control campuses, 8 weeks. One-sided non-inferiority tests on guardrails. Within treatment, a 3-arm boost test (partner-funded / Jar-funded / none) isolates the boost effect and its cost.", options: { color: INK } }],
      { x: 0.65, y: 6.13, w: 7.1, h: 0.72, fontSize: 9.5, valign: "middle" });

    // roadmap
    const rx = 8.25, rw = 4.55;
    T(s, "ROLLOUT", { x: rx, y: 1.58, w: rw, h: 0.28, fontSize: 11, bold: true, color: P2, charSpacing: 1 });
    const segs = ["Wk 0–8", "Wk 9–16", "M5–12", "Year 2"], sw = rw / 4;
    segs.forEach((t, i) => { box(s, rx + i * sw + 0.02, 1.9, sw - 0.04, 0.3, i % 2 ? PL : PL2, { r: 0.04 }); T(s, t, { x: rx + i * sw, y: 1.9, w: sw, h: 0.3, fontSize: 9, bold: true, color: P, align: "center", valign: "middle" }); });
    const ph = [[0, "Phase 0 · Build MVP", "jars, squads, Wrap, 3 partners"], [1, "Phase 1 · Pilot", "80-campus cluster RCT"], [2, "Phase 2 · Scale", "all students, 10–15 partners"], [3, "Phase 3 · Expand", "early-career + SIP/insurance"]];
    ph.forEach(([c, t, d], i) => {
      const y = 2.32 + i * 0.56;
      T(s, [{ text: t + "  ", options: { bold: true } }, { text: d, options: { color: GREY } }], { x: rx, y, w: rw, h: 0.24, fontSize: 9, valign: "middle" });
      box(s, rx + c * sw + 0.02, y + 0.27, sw - 0.04, 0.18, [P3, P2, P, GD][i], { r: 0.09 });
    });
    s.addShape(pres.shapes.DIAMOND, { x: rx + 2 * sw - 0.14, y: 2.32 + 0.56 + 0.22, w: 0.28, h: 0.28, fill: { color: G }, line: { color: INK, width: 1 } });
    box(s, rx, 4.6, rw, 2.28, GL);
    T(s, "GO / KILL GATE · WEEK 16", { x: rx + 0.2, y: 4.68, w: rw - 0.4, h: 0.3, fontSize: 11, bold: true, color: GD, charSpacing: 1 });
    const gates = ["Adopters ≥2.0 meaningful opens/week", "Adoption ≥12% within 8 weeks", "Auto-save volume non-inferior (≥ −2%)", "Round-off opt-out ≤ +0.2pp vs control"];
    for (let i = 0; i < gates.length; i++) {
      const y = 5.02 + i * 0.34;
      s.addImage({ data: await icon("FaCheckCircle", GREEN), x: rx + 0.2, y: y + 0.05, w: 0.2, h: 0.2 });
      T(s, gates[i], { x: rx + 0.5, y, w: rw - 0.7, h: 0.3, fontSize: 10, valign: "middle" });
    }
    T(s, [{ text: "Fail any gate → stop. ", options: { bold: true, color: RED } }, { text: "Maximum spend ≈ ₹1.6 Cr [A].", options: {} }], { x: rx + 0.2, y: 6.43, w: rw - 0.4, h: 0.35, fontSize: 10, valign: "middle" });
    footer(s, "Baselines marked [A] should be replaced with Jar internal data at kickoff. Targets derive from the Slide 6 base case: 210k WGES = 60% of 350k Y1 adopters.");
  }

  // =====================================================================
  // THANK YOU (not counted)
  // =====================================================================
  {
    const s = pres.addSlide();
    s.background = { color: P };
    T(s, "Thank you", { x: 0.8, y: 2.2, w: 8, h: 1.0, fontSize: 48, bold: true, color: WHITE });
    T(s, "Give every rupee a job, and students will have a reason to come back for it.", { x: 0.8, y: 3.3, w: 7.5, h: 0.9, fontSize: 20, color: PL2 });
    T(s, "Team HAVOC  ·  CV Raman University", { x: 0.8, y: 5.9, w: 6, h: 0.4, fontSize: 14, color: WHITE, bold: true });
    jar(s, 10.2, 2.0, 1.5, 3.4, 1.0, "4A2A85", G, PL2, PL2);
    T(s, "Goal reached", { x: 9.95, y: 5.55, w: 2.0, h: 0.3, fontSize: 12, bold: true, color: G, align: "center" });
  }

  // =====================================================================
  // APPENDIX
  // =====================================================================
  const appx = (kicker, title) => {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    T(s, kicker, { x: 0.5, y: 0.3, w: 9, h: 0.28, fontSize: 11, bold: true, color: P2, charSpacing: 2 });
    T(s, title, { x: 0.5, y: 0.6, w: 12.3, h: 0.5, fontSize: 20, bold: true, color: INK });
    return s;
  };
  const tbl = (s, data, o) => s.addTable(data.map((r, i) => r.map((c) => ({ text: String(c), options: {
    bold: i === 0, color: i === 0 ? WHITE : INK, fill: { color: i === 0 ? P : i % 2 ? WHITE : PL }, fontSize: o.fs || 9, valign: "middle" } }))),
    Object.assign({ fontFace: F, border: { type: "solid", pt: 0.5, color: LG }, margin: 0.05 }, o));

  // A1 assumptions
  {
    const s = appx("APPENDIX A1 · ASSUMPTIONS REGISTER", "Every assumption, its value and the logic behind it");
    tbl(s, [
      ["#", "Input", "Base (bear / bull)", "Tag", "Logic / source"],
      ["1", "Registered users", "35M", "S", "TechCrunch / Entrackr, FY25 [S1][S2]"],
      ["2", "Student share of users", "40% (30 / 45)", "A", "Problem statement: students are the “largest user base” → plurality"],
      ["3", "Monthly active saver ratio", "12.5%", "D", "Mar-24: 1M txns/day ÷ 22 saves = 1.36M savers / 20M (6.8%) × FY25 txn growth 3.21× ÷ user growth 1.75× [S3][S5]"],
      ["4", "Active saver growth", "10%/yr", "A", "Conservative vs +221% FY25 transaction growth [S3]"],
      ["5", "Goal Jar adoption, Y1/Y2/Y3", "20/30/35% (10/18/22; 25/40/45)", "A", "Share of active-saving students with ≥1 jar; break-even at 21% in Y3"],
      ["6", "Baseline saving per active student", "₹400/mo (300 / 500)", "D", "~₹2,350 Cr gold GMV (₹2,450 Cr less ~₹100 Cr Nek) ÷ ~4.4M savers ≈ ₹445; students lower [S1][S3]"],
      ["7", "Savings uplift from goals", "+30% (15 / 45)", "A", "Earmarking + partitioning +72% in an Indian field study [S23]; haircut >50% for digital, voluntary use"],
      ["8", "Jar take on gold purchases", "3% (2.5 / 4)", "A", "Below the 4.7% blended FY25 gross margin incl. Nek: (₹2,447.8 − ₹2,333.6 Cr) ÷ ₹2,447.8 Cr [S3]"],
      ["9", "Squad creators / reactivated per squad", "40% / 1.0 (0.5 / 1.5)", "A", "Avg squad of 4; ~1 member was dormant or new"],
      ["10", "Goals/yr · partner redemption · goal size · commission", "1.2 · 20% · ₹4,000 · 4%", "A", "Short student goals; typical Indian travel/e-com affiliate range 3–8%"],
      ["11", "Annual survival: base vs adopters", "55% → 65% (60 / 70)", "A", "Goal holders re-engage after rewards [S24]; ~5%/mo churn baseline"],
      ["12", "Reactivated saver survival", "60%/yr", "A", "Social commitment within the squad"],
      ["13", "Build / run cost", "₹3.0 / 1.8 / 1.8 Cr", "A", "10 FTE × ₹30L loaded in Y1; 6 FTE run"],
      ["14", "Marketing (campus ambassadors, content)", "₹2.5 / 2.0 / 2.0 Cr", "A", "~5% of FY25 ad spend of ₹48.5 Cr [S3]"],
      ["15", "Jar-funded boosts · variable cost", "₹25 / 12 / 8 · ₹6 per adopter", "A", "Partners fund the rest after the pilot (Acorns model [S27])"],
      ["16", "Pilot maximum loss", "≈ ₹1.6 Cr", "A", "4 months of the Y1 build budget plus pilot boosts and marketing"],
    ], { x: 0.5, y: 1.25, w: 12.3, colW: [0.35, 2.9, 2.2, 0.45, 6.4], rowH: 0.33, fs: 9 });
  }
  // A2 model
  {
    const s = appx("APPENDIX A2 · MODEL DETAIL (₹ CR)", "Base case by year, unit economics and scenario definitions");
    tbl(s, [
      ["Base case", "Y1", "Y2", "Y3", "3-yr"],
      ["Goal Jar adopters", "350k", "578k", "741k", "—"],
      ["New reactivated savers", "140k", "231k", "296k", "667k"],
      ["Revenue: savings uplift", "1.51", "2.49", "3.20", "7.2"],
      ["Revenue: partner commissions", "1.34", "2.22", "2.85", "6.4"],
      ["Revenue: churn reduction", "0.50", "0.83", "1.07", "2.4"],
      ["Revenue: reactivated savers", "1.01", "2.87", "4.86", "8.7"],
      ["Incremental net revenue", "4.37", "8.42", "11.97", "24.8"],
      ["Total cost", "6.58", "4.84", "4.84", "16.3"],
      ["Net", "−2.22", "+3.58", "+7.13", "+8.5"],
    ], { x: 0.5, y: 1.25, w: 6.3, colW: [2.7, 0.9, 0.9, 0.9, 0.9], rowH: 0.34, fs: 10 });
    tbl(s, [
      ["Unit economics (Y1 cohort)", "Value"],
      ["CAC per adopter (marketing + boost subsidy)", "₹96"],
      ["Net margin per adopter per year", "₹78"],
      ["Expected adopter life (1 ÷ (1 − 65%))", "2.9 yrs"],
      ["Squad reactivation value per adopter", "₹144"],
      ["LTV per adopter", "₹367"],
      ["LTV / CAC", "3.8×"],
      ["Y3 run-rate as % of FY25 operating revenue (₹208 Cr)", "5.8%"],
    ], { x: 7.2, y: 1.25, w: 5.6, colW: [4.3, 1.3], rowH: 0.34, fs: 10 });
    tbl(s, [
      ["Scenario", "Key inputs", "3-yr net", "ROI"],
      ["Bear", "30% students; adoption 10/18/22%; ₹300/mo; +15% uplift; 2.5% take; 0.5 reactivated/squad; 10% partner redemption", "−₹10.9 Cr (≤₹1.6 Cr after gate)", "−75%"],
      ["Base", "As in A1", "₹8.5 Cr", "52%"],
      ["Bull", "45% students; adoption 25/40/45%; ₹500/mo; +45% uplift; 4% take; 1.5 reactivated/squad; + early-career from Y2", "₹78.1 Cr", "428%"],
    ], { x: 0.5, y: 4.95, w: 12.3, colW: [0.9, 8.0, 2.4, 1.0], rowH: 0.42, fs: 9.5 });
    T(s, "Reproducible: model/jar_goal_jars_model.py", { x: 7.2, y: 4.2, w: 5.6, h: 0.3, fontSize: 9, italic: true, color: GREY });
  }
  // A3 competitors & analogues
  {
    const s = appx("APPENDIX A3 · COMPETITORS & ANALOGUES", "Round-off is being copied; goals, brand funding and user action are what worked elsewhere");
    tbl(s, [
      ["Player", "Round-off?", "Engagement hook", "Implication for Jar"],
      ["Paytm [S13]", "No; Gold Coins = 1% of every payment (2025)", "Rewards at payment", "The gold-on-every-payment mechanic is already copied"],
      ["PhonePe [S6][S14]", "Digital gold from ₹5; Jar-powered daily savings", "Payments utility", "Partner and potential rival"],
      ["Gullak [S15]", "Auto-save gold", "Gold+ leasing yield", "Yield ≠ weekly reason to open"],
      ["Spare8 [S16]", "Yes, round-up from ₹1", "Daily rewards", "Small ($770K pre-seed)"],
      ["Fello [S17]", "Gamified saving", "Games + prize pools", "Pivoted to advisory: prizes unsustainable"],
    ], { x: 0.5, y: 1.25, w: 12.3, colW: [1.7, 3.6, 2.4, 4.6], rowH: 0.36, fs: 9.5 });
    tbl(s, [
      ["Analogue", "Evidence", "Worked / failed · why"],
      ["Soman & Cheema 2011 [S23]", "Indian labourers: earmarking + 2 envelopes → +72% savings", "Worked: labels and partitions create meaning and a barrier to spending"],
      ["Kivetz et al. 2006 [S24]", "Pre-stamped cards complete faster; re-engagement after reward", "Worked: endowed progress and the goal gradient"],
      ["Duolingo [S26]", "DAU/MAU 34.7%; 10M+ users on 1-year streaks", "Worked because the user acts; automatic streaks would be hollow"],
      ["Acorns Found Money [S27]", "450+ brands invest 1–10% of purchases", "Worked: brand-funded saving"],
      ["Monzo Pots [S28]", "~350k new pots/month", "Worked: people want named buckets"],
      ["Sicherman et al. 2016 [S25]", "Investors check less after losses", "Risk: design around the ostrich effect"],
    ], { x: 0.5, y: 3.7, w: 12.3, colW: [2.6, 4.9, 4.8], rowH: 0.36, fs: 9.5 });
  }
  // A4 risks
  {
    const s = appx("APPENDIX A4 · RISK REGISTER", "Risks, likelihood, impact and mitigation");
    tbl(s, [
      ["Risk", "Likelihood", "Impact", "Mitigation"],
      ["Digital gold regulation (SEBI advisory, Nov 2025 [S8])", "Medium", "High", "Asset-agnostic jars (gold ETF / fund units via partner); boosts are marketing, never promised returns"],
      ["Pooled-money / unauthorized collection claims [S4]", "Low", "High", "No pooling: each member owns their own gold; the squad is a shared view only"],
      ["AUM drain when goals are redeemed", "Medium", "Medium", "Jar earns on flows; Forever Jar partition; carry-10%-forward default; next-goal prompt"],
      ["Reward-cost blowout (Fello precedent [S17])", "Low", "Medium", "Partner-funded boosts; Jar subsidy capped ₹25 → ₹8 per adopter per year"],
      ["Social pressure / privacy in squads", "Medium", "Medium", "Show % only; amounts private by default; leave anytime; no money leaderboards"],
      ["Copy by PhonePe / Paytm / GPay", "High", "Medium", "Squad network + campus partner density + speed; Jar is PhonePe's gold back-end, so co-opetition is possible"],
      ["Gold price dip mid-goal", "Medium", "Low", "Progress shown in goal units from contributions; price effect shown separately"],
      ["Students and debt", "—", "High", "No credit cross-sell to students; only insurance at goal checkout"],
    ], { x: 0.5, y: 1.25, w: 12.3, colW: [3.6, 1.1, 1.0, 6.6], rowH: 0.5, fs: 10 });
  }
  // A5 sources
  {
    const s = appx("APPENDIX A5 · SOURCES", "All data sources (accessed September 2026)");
    const src = [
      ["S1", "TechCrunch: Jar turns profitable (Sep 2025)", "https://techcrunch.com/2025/09/18/indian-fintech-jar-turns-profitable-by-helping-millions-save-in-gold/"],
      ["S2", "Entrackr: Jar FY25 ₹208 Cr operating revenue", "https://entrackr.com/news/jar-clocks-rs-208-cr-operating-revenue-in-fy25-turns-profitable-in-h2-10478229"],
      ["S3", "Inc42: Jar FY25 financials", "https://inc42.com/buzz/wealthtech-startup-jar-halves-fy25-loss-to-inr-50-5-cr/"],
      ["S4", "Entrackr: Unitary Fund round (Sep 2026)", "https://entrackr.com/exclusive/exclusive-jar-raises-small-fresh-funding-from-unitary-fund-12547515"],
      ["S5", "Deccan Chronicle: Jar 20M users (Mar 2024)", "https://www.deccanchronicle.com/news/digital-gold-savings-app-jar-surpasses-20-million-users-887517"],
      ["S6", "Tigerfeathers: The rise of Jar (Dec 2024)", "https://www.tigerfeathers.in/p/explaining-the-meteoric-growth-of"],
      ["S7", "Jar website", "https://www.myjar.app/"],
      ["S8", "MediaNama: SEBI digital gold warning (Nov 2025)", "https://www.medianama.com/2025/11/223-sebis-warning-digital-gold/"],
      ["S9", "Jar lending partners", "https://www.myjar.app/lending-partners"],
      ["S10", "Jar on the App Store", "https://apps.apple.com/in/app/jar-save-money-in-digital-gold/id1586776687"],
      ["S11", "Jar on Google Play", "https://play.google.com/store/apps/details?id=com.jar.app"],
      ["S12", "Unrelated 'Jar' goal-tracker app (other developer)", "https://apps.apple.com/us/app/jar-savings-goal-tracker/id6741083421"],
      ["S13", "Business Today: Paytm Gold Coins", "https://www.businesstoday.in/technology/news/story/paytm-rolls-out-gold-coins-letting-users-earn-digital-gold-on-every-payment-made-504019-2025-11-27"],
      ["S14", "PhonePe", "https://www.phonepe.com/"],
      ["S15", "Inc42: digital gold platforms", "https://inc42.com/startups/12-new-age-investment-platforms-fuelling-indias-digital-gold-rush/"],
      ["S16", "Indian Startup News: Spare8 pre-seed", "https://indianstartupnews.com/news/spare8-a-micro-investment-app-raises-770k-in-a-pre-seed-round-led-by-2am-vc/"],
      ["S17", "Jar vs Fello (Fello pivot)", "https://manikarthik.com/blog/jar-vs-fello/"],
      ["S18", "MediaNama: UPI August 2026", "https://www.medianama.com/2026/09/223-upi-transactions-august-2026/"],
      ["S19", "Worldline India Digital Payments Report", "https://worldline.com/en-in/home/main-navigation/resources/reports-and-insights/2025/worldline-india-digital-payments-report-1h-2025"],
      ["S20", "Mintel: Indian Gen Z", "https://www.mintel.com/press-centre/indian-gen-z-financially-savvy-socially-conscious-and-ready-to-travel/"],
      ["S21", "Outlook Money: Gen Z money mindset", "https://www.outlookmoney.com/personal-finance/gen-z-and-the-money-mindset-why-young-indians-are-rethinking-saving-spending-and-investing"],
      ["S22", "Business Today: WGC Swarnim Udaan 2047", "https://www.businesstoday.in/personal-finance/investment/story/indias-rs315-lakh-crore-gold-stock-could-power-the-economy-heres-how-gen-z-holds-the-key-547509-2026-08-06"],
      ["S23", "Soman & Cheema (2011), JMR", "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1732709"],
      ["S24", "Kivetz, Urminsky & Zheng (2006), JMR", "https://home.uchicago.edu/ourminsky/Goal-Gradient_Illusionary_Goal_Progress.pdf"],
      ["S25", "Sicherman et al. (2016), RFS", "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2339287"],
      ["S26", "Duolingo Q4 FY2024 shareholder letter", "https://investors.duolingo.com/static-files/99006c40-d8cf-41ca-b5b1-c5cb1fa5ba88"],
      ["S27", "Acorns Found Money partners", "https://frequentmiler.com/60-retailers-where-acorns-found-money-offers-the-highest-cashback/"],
      ["S28", "Monzo: customer saving goals (Pots)", "https://monzo.com/blog/2023/02/15/using-topic-modelling-to-understand-customer-saving-goals"],
      ["S29", "Jar Google Play reviews (6,000 newest, team analysis)", "https://play.google.com/store/apps/details?id=com.jar.app"],
      ["S30", "OroPocket: digital gold charges (GST, spreads)", "https://blog.oropocket.com/digital-gold-charges-in-india-explained-spreads-gst-storage-and-selling-fees/"],
    ];
    const half = Math.ceil(src.length / 2);
    [src.slice(0, half), src.slice(half)].forEach((col, ci) => {
      const runs = col.flatMap(([id, t, u], i) => [
        { text: id + "  ", options: { bold: true, color: P } },
        { text: t, options: { color: INK, hyperlink: { url: u } } },
        { text: "  " + new URL(u).hostname.replace(/^www\./, ""), options: { color: GREY, fontSize: 9, breakLine: i < col.length - 1 } },
      ]);
      T(s, runs, { x: 0.5 + ci * 6.2, y: 1.25, w: 6.0, h: 5.6, fontSize: 10.5, paraSpaceAfter: 5 });
    });
    T(s, "Titles are hyperlinked. Inc42 reports FY25 revenue gross (₹2,447.8 Cr); Jar/Entrackr report ₹208 Cr operating (net). Both are cited as such.", { x: 0.5, y: 6.95, w: 12.3, h: 0.3, fontSize: 8.5, italic: true, color: GREY });
  }

  // A6 validation plan
  {
    const s = appx("APPENDIX A6 · VALIDATION PLAN", "A 3-minute student survey and 8 interviews test the assumptions that move the case most");
    box(s, 0.5, 1.25, 3.6, 5.6, PL);
    T(s, "METHOD", { x: 0.7, y: 1.4, w: 3.2, h: 0.28, fontSize: 11, bold: true, color: P2, charSpacing: 1 });
    const method = [
      ["FaClipboardList", "Survey", "Anonymous Google Form, ~25 questions, 3 min. Jar users get an extra branch."],
      ["FaUsers", "Sample", "60+ students across 4–5 colleges; metro and tier-2/3 mix (60% of Jar users are outside metros [S1])."],
      ["FaComments", "Interviews", "8 × 15 min with volunteers from the survey."],
      ["FaBalanceScale", "Reading results", "Stated intent overstates behaviour, so intent is halved [A] before it is compared with model inputs."],
    ];
    for (let i = 0; i < method.length; i++) {
      const y = 1.8 + i * 1.02;
      await iconCircle(s, method[i][0], 0.7, y, 0.42, P, WHITE);
      T(s, [{ text: method[i][1], options: { bold: true, breakLine: true } }, { text: method[i][2], options: { color: GREY } }], { x: 1.25, y: y - 0.04, w: 2.7, h: 0.95, fontSize: 9.5 });
    }
    T(s, [{ text: "Interview prompts", options: { bold: true, color: P, breakLine: true } },
      { text: "1. Walk me through your last 3 money-app opens. Why each?", options: { breakLine: true } },
      { text: "2. How did you handle money on your last group trip?", options: { breakLine: true } },
      { text: "3. What would bring you to a savings app on a Monday, unprompted?", options: {} }],
      { x: 0.7, y: 5.85, w: 3.25, h: 0.95, fontSize: 9, paraSpaceAfter: 2 });

    const H = (t) => ({ text: t, options: { bold: true, color: WHITE, fill: { color: P }, fontSize: 9.5, valign: "middle" } });
    const C = (t, o = {}) => ({ text: t, options: Object.assign({ color: INK, fontSize: 9, valign: "middle" }, o) });
    const rowsV = [
      ["Core insight: opens are only balance checks or withdrawals", "Last reason you opened Jar", "≥50% of Jar users say balance or withdraw", "Rebuild the diagnosis around the reasons actually given"],
      ["Near-goal students are the lever", "Saving toward something in the next 6 months?", "≥60% name a concrete goal", "Lead with goal templates for goal-less savers (S2)"],
      ["20% Y1 adoption", "Would use Goal Jars (probably + definitely)", "≥40% stated intent (≈20% after halving)", "Cut adoption in the model; re-check break-even (21%)"],
      ["2–3 meaningful opens/week, no pushes", "Open frequency; would open with notifications off", "≥35% say 2–3×/week AND yes with notifications off", "Keep the Sunday Wrap; drop the Monday cadence"],
      ["Squads drive reactivation", "How many friends would you save with?", "≥40% choose 1+ friends", "Ship solo Goal Jars first; Squads in Phase 2"],
      ["+30% savings uplift", "Would you raise your daily saving to hit the goal?", "≥30% say yes", "Use the bear-case uplift (+15%)"],
      ["₹25/adopter/yr boost budget", "Smallest weekly bonus that makes you check", "≥50% say ₹20 or less", "Ask partners to fund larger boosts"],
    ];
    s.addTable([
      [H("Hypothesis (deck assumption)"), H("Survey question"), H("Passes if… [A]"), H("If it fails, we…")],
      ...rowsV.map((r, i) => r.map((c, j) => C(c, { bold: j === 0, fill: { color: i % 2 ? PL : WHITE }, color: j === 3 ? RED : INK }))),
    ], { x: 4.35, y: 1.25, w: 8.45, colW: [2.2, 2.2, 2.05, 2.0], rowH: [0.4, 0.66, 0.66, 0.66, 0.66, 0.66, 0.66, 0.66], fontFace: F, border: { type: "solid", pt: 0.75, color: LG }, margin: 0.06 });
    T(s, "Pass thresholds are team judgment [A]. Survey results replace the matching [A] tags in A1 before the pilot starts. The survey is ready as a Google Form. Early evidence without a survey: Play Store review analysis (A7) supports hypothesis 1.",
      { x: 4.35, y: 6.45, w: 8.45, h: 0.4, fontSize: 8.5, italic: true, color: GREY });
  }

  // A7 voice of the user (Play Store review analysis)
  {
    const s = appx("APPENDIX A7 · VOICE OF THE USER (NO SURVEY NEEDED)", "In 6,000 recent Play Store reviews, withdrawal is what users talk about; goals and spins barely appear");
    T(s, "SHARE OF DETAILED REVIEWS MENTIONING EACH THEME (%)", { x: 0.5, y: 1.2, w: 7.4, h: 0.28, fontSize: 10.5, bold: true, color: P2, charSpacing: 1 });
    const themes = ["Withdrawal / selling", "Got back less (GST, spread, charges)", "Trust / fraud fear", "Balance / gold price / returns", "Customer support", "Names a goal or purpose (upper bound)", "AutoPay / unexpected debits", "Spins / rewards", "Notifications / spam"];
    s.addChart(pres.charts.BAR, [
      { name: "1–2★ reviews (n = 408)", labels: themes, values: [44, 32, 28, 15, 12, 5, 4, 1, 1] },
      { name: "4–5★ reviews (n = 263)", labels: themes, values: [12, 3, 3, 3, 0, 6, 1, 1, 0] },
    ], {
      x: 0.4, y: 1.5, w: 7.6, h: 4.3, barDir: "bar", barGrouping: "clustered", barGapWidthPct: 40,
      chartColors: [RED, P3], showLegend: true, legendPos: "b", legendFontSize: 9.5, legendFontFace: F,
      showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 8.5, dataLabelColor: INK, dataLabelFontFace: F,
      catAxisOrientation: "maxMin", catAxisLabelFontSize: 9.5, catAxisLabelColor: INK, catAxisLabelFontFace: F,
      valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" }, valAxisMaxVal: 50,
    });
    const kp = [["56%", "of detailed 1–2★ reviews are about the withdrawal moment", RED, REDL], ["≤5%", "of detailed reviews name any goal or purpose", P, PL], ["1%", "mention spins or rewards", P, PL]];
    kp.forEach(([v, l, c, bg], i) => {
      const x = 8.3 + i * 1.53;
      box(s, x, 1.2, 1.45, 1.55, bg);
      T(s, v, { x: x + 0.08, y: 1.28, w: 1.29, h: 0.55, fontSize: 24, bold: true, color: c, align: "center" });
      T(s, l, { x: x + 0.08, y: 1.85, w: 1.29, h: 0.85, fontSize: 9, color: INK, align: "center" });
    });
    box(s, 8.3, 2.9, 4.5, 1.75, P);
    T(s, [{ text: "SO WHAT", options: { bold: true, color: G, fontSize: 10, charSpacing: 1, breakLine: true } },
      { text: "Withdrawal is the one moment Jar's value becomes visible, and it arrives as a loss: 3% GST plus a 2–5% spread [S30]. Goal Jars reframe that moment as goal redemption, with a partner bonus offsetting the spread.", options: { color: WHITE, fontSize: 10.5 } }],
      { x: 8.5, y: 2.98, w: 4.15, h: 1.6, paraSpaceAfter: 4 });
    box(s, 8.3, 4.8, 4.5, 1.0, GL);
    T(s, [{ text: "In users' words (Play Store, Aug–Sep 2026)", options: { bold: true, color: GD, fontSize: 9, breakLine: true } },
      { text: "“I saved ₹7,300 … when I tried to withdraw my money, I received only ₹6,600”", options: { italic: true, fontSize: 9.5, breakLine: true } },
      { text: "“Maine isme 11550 jama Keya tha badme nikal te time 10395 he aya”", options: { italic: true, fontSize: 9.5 } }],
      { x: 8.45, y: 4.86, w: 4.25, h: 0.9, paraSpaceAfter: 2 });
    box(s, 0.5, 6.0, 12.3, 0.85, PL);
    T(s, [{ text: "Method  ", options: { bold: true, color: P } },
      { text: "6,000 newest Google Play reviews of Jar (30 Jul–22 Sep 2026; the app has 2.0M ratings, 4.7★) [S29]. 80% are 5★ but mostly one-liners (median 2 words); the 684 detailed reviews (8+ words) were keyword-coded in English and Hinglish, with samples checked by hand. ", options: {} },
      { text: "Caveats  ", options: { bold: true, color: RED } },
      { text: "Reviewers skew towards complaints; not student-only; keyword coding is approximate (goal share is an upper bound). This is directional evidence, not a survey.", options: {} }],
      { x: 0.7, y: 6.05, w: 11.9, h: 0.75, fontSize: 9, valign: "middle" });
  }

  await pres.writeFile({ fileName: "../Jar_CaseBlitz_Deck.pptx" });
  console.log("written");
})();

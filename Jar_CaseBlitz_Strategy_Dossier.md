# Jar × CaseBlitz 2026: Strategy Dossier
**"Give every rupee a job": Goal Jars (with Squads), Brand Boosts and the Sunday Wrap**

Source of truth: CaseBlitz problem statement PDF. Model: `model/jar_goal_jars_model.py`. CS simulation: `model/confidence_score_sim.py`.
Tags: **[S]** = sourced (see numbered source list at the end) · **[D]** = derived from sourced numbers (logic shown) · **[A]** = assumed (logic shown).

---

## PHASE 1: RESEARCH FACT BASE

### 1.1 Jar: company facts
| Metric | Value | Tag |
|---|---|---|
| Registered users | 35M+ across 12,000 pin codes (FY25). The website claims "4–5 Cr+" | [S1][S2][S7] |
| First-time formal savers | >95% of users | [S1] |
| Tier-2/3 share | ~60% | [S1] |
| FY25 operating revenue (Jar-reported net) | ₹208 Cr, 9× YoY | [S1][S2] |
| FY25 gross revenue / total income | ₹2,450 Cr (FY24: ~₹56.9 Cr) | [S2][S3] |
| FY25 purchase of traded goods | ₹2,333.6 Cr, which implies a **~4.7% blended gross margin** incl. Nek jewellery | [S3] → [D] |
| FY25 ad & marketing / employee cost | ₹48.5 Cr / ₹71.4 Cr | [S3] |
| FY25 net loss | ₹50.5 Cr (₹35.3 Cr ex-ESOP), halved YoY. Profitable in Q4 FY25 and Q1 FY26 | [S1][S3] |
| Funding / valuation | $60M+ raised. Sept 2026: ₹29 Cr from Unitary Fund at ₹3,155 Cr post-money. A planned $100M WestBridge round fizzled | [S4] |
| Engagement datapoint (Mar 2024) | 20M users, >1M transactions/day, avg user saves ~22×/month | [S5] |
| **Monthly active savers (est.)** | Mar 2024: 1M × 30 ÷ 22 ≈ **1.36M = 6.8% of registered**. Scaled by FY25 txn growth (3.21×) ÷ user growth (1.75×) → **~12.5% of registered ≈ 4.4M** | [D] from S3, S5 |
| Nek jewellery | ₹100 Cr+ annual revenue; ~40% of revenue (Dec 2024) | [S1][S6] |
| Strategic fact | Jar powers the back-end of **PhonePe's daily gold savings** | [S6] |
| Behaviour | "Never had a day of net selling"; users buy *more* on gold price dips | [S6] |
| Regulatory | SEBI advisory, 8 Nov 2025: digital gold is **not a security**, not SEBI-regulated. Entrackr reports an FIR over "unauthorized money collection" | [S8][S4] |

**Jar's CURRENT features (do not duplicate):** Round-off (SMS-read UPI spends + UPI AutoPay) · Daily/Weekly/Monthly/Instant savings · 24K digital gold, coins/bars delivery · **Nek** jewellery · **Gold gifting** · **Spin-to-win / daily rewards** · Personal loans up to ₹5L via NBFCs (Kisetsu Saison, ABFL, Innofin) · **Jar UPI payments** (May 2025) · Insurance · Gold price alerts, calculators · Referrals · 9 languages [S1][S2][S7][S9][S10][S11].
**Not found in Jar today:** named/partitioned **goals**, **group/social saving**, **brand-funded goal boosts**, and a **weekly progress recap**. The App Store listing mentions none of these. The "Jar – Savings Goal Tracker" iOS app is by an unrelated developer [S10][S12]. ⚠️ *Verify in the live app before submission.*

### 1.2 Competitors: do they have round-off, and what is their hook?
| Player | Round-off? | Engagement hook | Implication |
|---|---|---|---|
| **Paytm** | Not round-off. Since Sept 2025, **Gold Coins worth 1% of value on every payment**, convertible to digital gold [S13] | Rewards inside the payment moment | **The "gold from every payment" mechanic has already been copied by a payments app.** Jar's moat cannot be the saving mechanic |
| **PhonePe** | Digital gold from ₹5; daily gold savings (Jar-powered back-end) [S6][S14] | Utility (payments), not saving | Partner and potential rival. Owns the payment moment |
| **Google Pay** | Digital gold buy/sell; no round-off found | Payments utility | Same threat class |
| **Gullak** | Auto-save gold; **Gold+ leasing ~5% extra yield** [S15] | Yield | Yield doesn't create weekly opens; regulatory risk |
| **Spare8** | **Yes**, round-up to gold from ₹1; daily rewards [S16] | Rewards | Small ($770K pre-seed) |
| **Fello** | Gamified saving (Tambola, cricket, prize pools up to ₹1 Cr); power users 20+ min/day → **pivoted to advisory because prize-pool economics were unsustainable** [S17] | Games | **Proof that engagement bought with prizes doesn't pay** |

### 1.3 Gen Z India behaviour
| Datapoint | Value | Tag |
|---|---|---|
| UPI, Aug 2026 | 24.51B txns/month, 791M/day, ATS ₹1,217 | [S18] |
| P2M average ticket (2025) | ₹592, falling as small cash spends go digital | [S19] |
| Gen Z priorities | Travel ranked most important by 81%, education 76%, gadgets/clothes 51% | [S20] |
| Gen Z saves | 93% save a portion of income; 91% say saving matters to reach goals | [S21] |
| Gen Z and gold | WGC *Swarnim Udaan 2047*: Gen Z increasingly treats gold as a financial asset and prefers digital | [S22] |
| Notification fatigue | 78% of Indians face repeated nagging notifications/pop-ups even after dismissing them | [S23] |
| Student UPI profile | ~45 UPI payments/month, small P2M tickets (chai, canteen, auto) | [A] no public student-specific dataset. **Validate with the primary survey (Appendix D)** |

### 1.4 Behavioural science and analogues
| Principle / analogue | Evidence | Worked or failed, and why |
|---|---|---|
| **Earmarking + partitioning** (mental accounting) | Indian day labourers: labelling savings for a purpose, and splitting it into 2 envelopes, raised savings **+72%**. A photo of their children on the envelope raised savings further [S24] | **Directly supports named, visual, partitioned Goal Jars** |
| **Goal-gradient / endowed progress** | Coffee cards: a 12-stamp card with 2 pre-filled completes faster than a blank 10-stamp card. Effort accelerates near the goal; after a reward, fast re-engagement [S25] | **Existing silent balance = endowed head start**. Short goals create repeated cycles |
| **Ostrich effect** | Investors log in less after markets fall [S26] | Gold dips → Jar opens drop. **Show progress in goal units, which keep rising because contributions continue** |
| **Variable rewards** | Jar spins, Fello games | Novelty decays without meaning. Fello's economics failed [S17] |
| Duolingo streaks | DAU/MAU 34.7% (Q4 '24); 10M+ users on 1-year streaks [S27] | **Worked because the user *does* the action**. An automatic saving streak isn't earned, so streaks on auto-save are hollow |
| Acorns "Found Money" | 450+ brands invest 1–10% of purchases into user portfolios [S28] | Worked for **brand-funded** saving. Template for Brand Boosts |
| Monzo Pots | ~350k new pots/month; ~5M unique pot names [S29] | Worked: users *want* named buckets |
| Qapital | Goal + rule-based saving, co-designed with Dan Ariely [S29] | Goals work; rule complexity limits mass appeal. Keep it one-tap |
| CRED | Rewards drive opens around a *bill-payment* utility | Works only when anchored on a real job-to-be-done |

---

## PHASE 2: DIAGNOSIS (25%)

### 2.1 Core insight (one line)
> **Jar automated every decision except the one it doesn't want users to make. Today the only consequential thing a user can do in the app is withdraw. So engagement and savings are pulling in opposite directions.**

*Non-obvious because* most teams will say "users forget the app". The sharper point: an open has value only if there is a decision to make. Jar has removed every decision except "sell". The fix is not more pushes. It is **decisions whose value grows as the balance grows**, so that engagement and AUM move together.

### 2.2 Root-cause tree (MECE): "Why is there no reason to open?"
A reason to open requires three things: **(A) something changed that I care about × (B) something I can do × (C) it matters to me.** Jar scores ~0 on each.

```
No reason to open Jar
├── A. NOTHING SALIENT CHANGES (visibility)
│   ├── A1 Value is delivered outside the app: round-off at the UPI app, debit via AutoPay, gold credited silently
│   ├── A2 The balance is in low-salience units: ₹3 buys <0.3 mg of gold [A: gold >₹10k/g]; grams mean nothing to a 20-year-old
│   └── A3 Negative moves are punished: ostrich effect [S26]; a gold dip reduces opens
├── B. NOTHING TO DO (actionability)
│   ├── B1 Automation removed all routine decisions (by design)
│   ├── B2 The remaining high-value action = withdraw (value-destroying)
│   └── B3 The remaining low-value actions = spins/rewards (novelty decays; Fello [S17])
└── C. IT DOESN'T MEAN ANYTHING (motivation)
    ├── C1 No destination: savings are an unlabelled pile, disconnected from student goals (trip, phone, fest) [S20]
    ├── C2 No social layer: saving is private; Gen Z goals are social (trips with friends)
    └── C3 No progress feedback in goal units, so no goal-gradient pull [S25]
```

### 2.3 What is NOT the cause (weak hypotheses ruled out)
| Hypothesis | Why rejected |
|---|---|
| Trust / product quality | 4.7★ from 112k ratings [S10]; "never a day of net selling" [S6] |
| Lack of gamification | Jar *already* has spins and daily rewards, and the problem persists. Fello shows prize-led engagement doesn't pay [S17] |
| Too few notifications | 78% already report nagging-notification fatigue [S23]. More pushes means more opt-outs |
| Gen Z dislikes gold | WGC: Gen Z is adopting gold as a digital financial asset [S22] |
| Savings too small to matter | Monzo shows people happily manage *small* named pots [S29]. The problem is meaning, not size |

### 2.4 Segmentation: who matters most
| Segment | Goal horizon | Balance | Engagement potential | Strategic value |
|---|---|---|---|---|
| **S1 Near-goal students (18–22)** ★ | 1–6 months (trip, phone, fest, laptop) | Low | **Highest**: short goal-gradient cycles; social goals | Future LTV; most exposed to a PhonePe/Paytm copy (they live in those apps) |
| S2 Goal-less student "habit savers" | None | Low | Medium: needs a goal suggested | Convert into S1 via templates |
| S3 Early-career (22–27) | 6–24 months | Medium | Medium | Cross-sell SIPs and insurance (Phase 3) |
| S4 Tier-2/3 non-student adults | Long / family | Medium | Low–medium | Nek jewellery, gold loans |

**Priority: S1 (+S2 via goal templates).** It is the mandate's target, it has the fastest goal cycles, and travel is Gen Z's #1 priority [S20]. Size: 35M × 40% students [A] × 12.5% active [D] ≈ **1.75M active-saving students**, plus ~12M dormant student accounts that squads can reactivate.

---

## PHASE 3: SOLUTION (25%)

### 3.1 Options scored (1–5; for "passive-saving safety", 5 = zero risk)
| Option | Impact | Feasibility | Fit to diagnosis | Originality | Passive-saving safety | Defensibility | **Total /30** |
|---|---|---|---|---|---|---|---|
| **A. Goal Jars + Squad Jars** (named, partitioned, shared goals) | 5 | 4 | 5 (A2, B, C1–C3) | 3 | 5 | 4 (squad network) | **26** |
| **B. Brand Boosts** (partner-funded goal top-ups and redemption) | 4 | 3 | 4 (B, C1) | 4 | 5 | 4 (2-sided network) | **24** |
| **C. Sunday Wrap** (weekly progress story, in goal units) | 3 | 5 | 4 (A1–A3, C3) | 3 | 5 | 2 | **22** |
| D. Savings streaks + campus leagues | 3 | 4 | 2 (auto streaks are unearned) | 2 | 4 | 2 | 17 |
| E. Campus merchant gold-cashback | 3 | 2 | 3 | 2 | 5 | 2 (Paytm Gold Coins exists [S13]) | 17 |
| F. Bigger prize games / spins 2.0 | 4 | 3 | 1 | 1 (duplicates spins) | 4 | 1 | 14 |
| G. Gold+ leasing yield | 2 | 2 | 2 | 1 (Gullak has it) | 5 | 1 | 13 |

**Decision: Core = A (Goal Jars incl. Squad Jars). Supporting levers = B (Brand Boosts) + C (Sunday Wrap).**
Extends existing features: Goal Jars sit on top of the *existing* round-off and daily-save engine. Redemption can route to *existing* Nek jewellery and gold gifting. Nothing duplicates spins.

### 3.2 What it is
1. **Goal Jars (core).** Split one gold balance into named, visual jars: "Rishikesh trip 🏔️", "iPhone fund", plus a default **Forever Jar** for long-term savings. Progress is shown in **goal units** ("64% of your trip · bus ticket covered"), not grams.
   - **Endowed start:** existing silent balance can seed the first jar, e.g. a 30% head start [S25].
   - **Squad Jars:** 2–6 friends save toward a shared goal. Each member's gold stays **in their own account** (no pooling). The squad sees % progress, a plan board (dates, budget per head) and nudges. **It replaces the "who has paid?" WhatsApp spreadsheet for trips.**
2. **Brand Boosts (lever 1).** Every Monday, 1–3 partner offers matched to your goal category unlock (e.g., hostel chain, bus platform, event ticketing: *illustrative target categories, not signed partners*).
   - Mechanic: "+₹20 gold to your trip jar if the squad hits 50% by Sunday" or "5% bonus if you redeem this jar with us." **Partners fund it as a CAC** (Acorns Found Money model [S28]).
   - Jar earns affiliate commission on redemption.
3. **Sunday Wrap (lever 2).** A weekly, Spotify-Wrapped-style card: "14 chai round-offs + 7 daily saves = ₹236 → Rishikesh Jar 58%, 1 week ahead of plan."
   - One actionable choice: re-allocate, bump daily save by ₹10, or do nothing.
   - Gold-price moves are framed in goal terms, which defuses the ostrich effect.

### 3.3 Proof it adds ZERO friction to saving
| Saving path step | Today | With Goal Jars |
|---|---|---|
| UPI spend detected (SMS) | ✓ | **Unchanged** |
| Round-off computed; daily save scheduled | ✓ | **Unchanged** |
| UPI AutoPay debit (no per-save approval) | ✓ | **Unchanged**. No new mandate, KYC or step |
| Gold credited | To the one balance | To the same balance, **tagged** to a jar by a one-time rule (default: all new saves → top-priority jar; no goal → Forever Jar) |
| User who never opens Goal Jars | — | **Identical experience.** The feature is 100% opt-in and additive |

### 3.4 MVP scope (8 weeks) and phased rollout
- **MVP:** solo and squad jars (≤6), endowed start, goal-unit progress, 12 goal templates (trip, phone, fest, laptop, gift, course), Sunday Wrap v1, home-screen widget, Boost engine with 3 pilot partners, Forever Jar partition.
- **Phase 1 pilot (wks 9–16):** cluster RCT on 80 campuses (~100k active-saving students).
  - **Go/kill gates:**
    - adopters ≥2.0 meaningful opens/week
    - adoption ≥12% within 8 weeks
    - auto-save volume non-inferior (≥ −2%)
    - round-off opt-out not up (≤ +0.2pp)
  - **Max downside if killed ≈ ₹1.6 Cr** [A: 4 months of the Y1 build budget plus pilot boosts and marketing].
- **Phase 2 scale (M5–M12):** all students; 10–15 partners; self-serve partner boost console; campus ambassadors.
- **Phase 3 (Y2):** early-career goals (bike, emergency fund); cross-sell SIPs and insurance at goal milestones. **No credit cross-sell to students.**

### 3.5 Partnership economics (per completed goal redeemed at a partner)
Goal ₹4,000 [A] × affiliate commission 4% [A: typical Indian travel/e-com affiliate range 3–8%] = **₹160 to Jar**. The partner funds the boost (~₹50–200) out of its CAC budget. That beats paid acquisition of a pre-funded, group-of-4 customer [A].

### 3.6 Risks and mitigations
| Risk | Mitigation |
|---|---|
| **Regulatory:** SEBI's Nov 2025 advisory; digital gold is unregulated [S8]; possible future restriction | Goal Jars are an **asset-agnostic ledger**. A jar can be backed by gold ETF / liquid-fund units via a partner if digital gold is restricted. Boosts are marketing, never promised returns. **This de-risks Jar's business beyond this case** |
| Pooled money / unauthorized collection (FIR precedent [S4]) | **No pooling.** Each member owns their own gold; the squad is a shared *view* |
| AUM drain from goal redemption | Jar earns on **flows** (buy spread, sell-side and affiliate), not AUM fees. Forever Jar partition (partitioning raises the barrier to dipping in [S24]). "Carry 10% forward" default; next-goal prompt (post-reward re-engagement [S25]) |
| Reward-cost blowout (Fello) | Partner-funded. Jar subsidy capped at ₹25/adopter/yr, falling to ₹8 by Y3 |
| Social pressure / privacy | Only % shown to the squad; amounts private by default; leave anytime; no money leaderboards |
| Copy by PhonePe/Paytm | Squad network effects + partner density on campuses + speed. Jar is PhonePe's gold back-end, so co-opetition is possible |
| Gold price dip mid-goal | Progress shown in goal units from contributions; price impact shown separately ("gold −₹12 this week") |

---

## PHASE 4: USER JOURNEY (20%)

**Persona: Riya Sharma, 20, 2nd-year B.Com, Indore (tier-2).** Pocket money ~₹6,000/month [A]; ~45 UPI payments/month (chai, canteen, auto, Swiggy) [A]. Round-offs ~₹180/month (45 × ~₹4 avg [A: uniform 0–9 → ~₹4.5]) + ₹10/day daily save = **~₹480/month**. Jar balance sitting silently: **₹1,200**. Opens Jar about once a month.
**Goal:** Rishikesh trip with 3 hostel friends in 12 weeks, ₹4,000 each.

### A typical week (week 4)
| Day | Trigger | Action | Value received | Why she opens *with notifications off* |
|---|---|---|---|---|
| **Mon night** | Weekly **Boost Drop** ritual (like Myntra/Nike "drops") | Claims "+₹20 gold if squad hits 50% by Sun" (45 sec) | Free money toward her goal | Known weekly ritual + an expiring, tangible reward |
| **Wed** | Squad activity: Kabir added ₹150; the date poll is open | Votes on dates, sees squad at 46%, taps an optional +₹50 top-up (2 min) | Real **trip coordination** (who's in, who's funded) | Friends discuss it on WhatsApp; the plan lives in Jar. **Social obligation + utility** |
| **Sun** | **Sunday Wrap** | Views "₹236 this week → 58%, 1 week ahead"; shares the story; keeps allocation (1 min) | Progress, pride, a shareable identity moment | Curiosity about progress (Strava-style); the goal is close (goal gradient) |
| Mon–Sun | *(none)* | Round-offs and daily save flow automatically | — | **Saving never needs an open** |

**Opens this week: 3 meaningful, 0 forced.**

### How the loop compounds
| Stage | What happens | Riya's numbers |
|---|---|---|
| **Wk 1: Hook** | Creates a jar and seeds it with her ₹1,200 → **30% on day 1** (endowed progress). Invites 3 friends (1 is a dormant Jar user → **reactivated**) | 30% |
| **Wk 4: Habit** | Monday/Wednesday/Sunday rituals set in. Bumps daily save ₹10 → ₹20 when the Wrap shows she's behind | ~₹235/wk incl. boosts and top-ups → 58% |
| **Wk 12: Payoff** | Goal hit. Redeems at the partner bus/hostel with a 5% bonus; adds trip insurance (existing Jar insurance). Post-trip card: "Trip funded by 540 chai round-offs" → shared → acquisition | 100%. Next jar: "Diwali gifts" in 1 tap |

### Meaningful opens vs forced opens
| Forced opens (what we reject) | Goal Jar opens (what we build) |
|---|---|
| Push says "Gold price changed!" | The user comes back for a decision (claim, vote, re-allocate) |
| Value to Jar, none to the user | Money, coordination or progress for the user |
| Dies with notifications off | Survives: weekly rituals + social + goal proximity |
| Engagement vs saving are opposed (the open → sell) | Engagement **raises** saving (a bump, a top-up) |

---

## PHASE 5: BUSINESS CASE (20%)

### 5.1 Funnel and revenue logic (base)
Registered 35M [S] → students 40% [A] → active savers 12.5% [D] = **1.75M** (+10%/yr [A]) → Goal Jar adoption **20% / 30% / 35%** in Y1–Y3 [A] → adopters **350k / 578k / 741k**.

| Revenue lever (per adopter/yr unless stated) | Formula | Base value |
|---|---|---|
| Incremental saving throughput | ₹400/mo [D: ~₹2,350 Cr gold GMV ÷ ~4.4M active ≈ ₹445; students lower] × 12 × 30% uplift [A: Soman & Cheema +72%, haircut >50%] × 3% take [A: below the 4.7% blended filings margin] | **₹43** |
| Partner redemption | 1.2 goals/yr [A] × 20% redeemed at partner [A] × ₹4,000 × 4% commission [A] | **₹38** |
| Lower churn | (65% − 55% annual survival [A]) × ₹4,800 × 3% | **₹14** |
| Squad reactivation | 40% of adopters create squads [A] × 1.0 reactivated saver each [A] × ₹144/yr margin (60% yearly survival [A]; half-year in the joining year) | cohort-based |

### 5.2 Three-year projection (₹ Cr; model output)
| Base | Y1 | Y2 | Y3 | **3-yr** |
|---|---|---|---|---|
| Adopters | 350k | 578k | 741k | |
| New reactivated savers | 140k | 231k | 296k | 667k |
| Revenue: savings uplift | 1.51 | 2.49 | 3.20 | 7.2 |
| Revenue: partner commissions | 1.34 | 2.22 | 2.85 | 6.4 |
| Revenue: churn reduction | 0.50 | 0.83 | 1.07 | 2.4 |
| Revenue: reactivated savers | 1.01 | 2.87 | 4.86 | 8.7 |
| **Incremental net revenue** | **4.37** | **8.42** | **11.97** | **24.8** |
| Costs: build/run (₹3.0/1.8/1.8 Cr) + marketing (₹2.5/2.0/2.0 Cr) + Jar-funded boosts (₹25/12/8 per adopter) + variable (₹6 per adopter) | 6.58 | 4.84 | 4.84 | **16.3** |
| **Net** | **−2.22** | **+3.58** | **+7.13** | **+8.5** |

**Base: 3-yr ROI 52% · payback ~20 months · Y3 run-rate ≈ 5.8% of FY25 operating revenue.**
**Unit economics (Y1 cohort):**
- **CAC ₹96** per adopter (marketing + boost subsidy ÷ adopters)
- **LTV ₹367** (₹78 net margin/yr after variable and boost costs × 2.9-yr life = ₹223, + ₹144 squad-reactivation value)
- **LTV/CAC ≈ 3.8×**

**Strategic value, not in ROI:** active-student margin at risk from a payments-app copy is 1.75M × ₹4,800 × 3% = **₹25 Cr/yr**. Paytm Gold Coins shows the threat is real [S13].

### 5.3 Scenarios
| | Bear (every adverse assumption at once) | **Base** | Bull (+ early-career in Y2–Y3) |
|---|---|---|---|
| Key inputs | 30% students; adoption 10/18/22%; ₹300/mo; +15% uplift; 2.5% take; 0.5 reactivated/squad | as above | 45% students; adoption 25/40/45%; ₹500/mo; +45% uplift; 4% take; 1.5 reactivated/squad |
| 3-yr revenue / cost | ₹3.6 / ₹14.5 Cr | ₹24.8 / ₹16.3 Cr | ₹96.4 / ₹18.3 Cr |
| 3-yr net · ROI | −₹10.9 Cr · −75% | **+₹8.5 Cr · 52%** | +₹78.1 Cr · 428% |
| LTV/CAC | 0.4× | **3.8×** | 13.5× |
| **Real outcome in the bear case** | The pilot gate fails, so the program is killed at **~₹1.6 Cr** (not ₹10.9 Cr) | | |

### 5.4 Sensitivity (3-yr net, one variable at a time; base = ₹8.5 Cr)
| Driver (low / high) | Low | High | Swing |
|---|---|---|---|
| **Adoption** (×0.5 / ×1.5) | −2.3 | 19.3 | **21.6** |
| **Take rate** (2% / 4.7%) | 2.4 | 18.9 | **16.5** |
| **Reactivated per squad** (0.3 / 1.5) | 2.4 | 12.9 | **10.5** |
| Student share (30% / 45%) | 3.1 | 11.2 | 8.1 |
| Savings uplift (15% / 45%) | 4.9 | 12.1 | 7.2 |
| Partner redemption (10% / 30%) | 5.3 | 11.7 | 6.4 |

**Break-even: Y3 adoption ≥21% of active-saving students (0.61× base).** That is the number the pilot must de-risk.

---

## PHASE 6: METRICS

**North Star Metric: Weekly Goal-Engaged Savers (WGES)** = users with auto-save active in the week **and** ≥2 meaningful goal sessions.
- **Meaningful session:** claim a boost, a squad action, a re-allocation, a top-up, or a Wrap viewed for ≥5s.
- **Baseline:** 0 (new feature).
- **Targets:** 60k by M4 (pilot) → **210k by M12** (60% of Y1 adopters) → 450k by M24.

| Type | Metric | Definition | Baseline | Target / timeline |
|---|---|---|---|---|
| Input | Goal Jar adoption | % of active-saving students with ≥1 jar | 0 | 12% at wk 8 → 20% at M12 |
| Input | Endowed-start rate | % of new jars seeded with the existing balance | 0 | ≥60% |
| Input | Squad formation / invites | % of jars shared; invites per squad | 0 | 40%; ≥2.5 |
| Input | Boost claim rate | % of adopters claiming ≥1 boost/week | 0 | ≥50% |
| Input | Wrap open rate | % of adopters viewing Sunday Wrap | 0 | ≥45% |
| Input | Meaningful opens/adopter/week | as defined above | ~0.5 [A: "occasionally", per the PS; confirm internally] | **≥2.5** |
| **Guardrail** | Round-off / AutoPay opt-out rate | 30-day mandate cancellations | Internal | **≤ +0.2pp vs control** |
| **Guardrail** | Auto-save volume per user | ₹ auto-saved per week | Internal | **Non-inferior (−2% margin)** |
| Guardrail | Forever Jar withdrawal rate | % of long-term balance sold per month | Internal | Not above control |
| Guardrail | Notification opt-out / uninstall | 30-day rate | Internal | Not above control |
| Guardrail | Jar-funded boost cost | ₹ per adopter per year | — | ≤₹25 Y1, ≤₹12 Y2 |
| Business | Incremental saving per adopter | Treatment vs control ₹/month | ₹400 [D] | +30% |
| Business | 12-month active-saver retention | Annual survival | 55% [A] | 65% |
| Business | Reactivated savers per squad | Dormant/new members saving ≥4×/month | 0 | ≥1.0 |
| Business | Partner revenue per completed goal | Commission ₹ | 0 | ≥₹160 |
| Business | CAC / LTV / LTV:CAC | as in Phase 5 | — | ₹96 / ₹367 / ≥3× |

**A/B test design:**
- **Setup:** cluster-randomise by campus, because squads spill over within a campus. 40 treatment vs 40 control campuses, matched on city tier, size and baseline saving. 8 weeks.
- **Primary test:** meaningful opens per week.
- **Guardrail tests:** one-sided non-inferiority on auto-save volume and opt-out.
- **Within treatment:** user-level 3-arm test of Boost funding (partner-funded / Jar-funded / none) to isolate the boost effect and its cost.
- **Staggered start:** campuses start in waves to control for exam-week seasonality.

---

## PHASE 7: SLIDE PLAN (7 content slides + appendix)
**Design direction:**
- Palette: Jar-like deep purple `#3B1C6E`, gold accent `#F2B705`, off-white `#FAF7F2`, one alert colour `#E4572E`, greys.
- Type: one sans family (Inter / Poppins). Minimum 12pt body.
- One message per slide: the action title is the "so what".
- Every number gets a tiny [S#]/[A] tag, with a footer source line.
- Consistent visual motif: jar icons filling up.

| # | Action title (the "so what") | Visual | Key numbers | Evidence |
|---|---|---|---|---|
| 1 | **Executive Summary:** "Give every rupee a job: Goal Jars turn 1.75M silent student savers into 2–3×/week users while saving stays automatic" | SCQA strip + 3 boxes (diagnosis / solution / impact) | 35M users; ~12.5% active; 2.5 opens/wk; ₹8.5 Cr 3-yr net, 52% ROI; LTV/CAC 3.8× | Must stand alone |
| 2 | **Diagnosis:** "The only meaningful action in Jar today is to withdraw" | MECE root-cause tree (A/B/C) + "what it's NOT" strip | <0.3 mg per ₹3; 6.8% → 12.5% active; Fello pivot; 78% notification fatigue | S5, S17, S23, S26 + primary survey results |
| 3 | **Where to play and what to build:** "Near-goal students are the lever; Goal Jars beat 6 alternatives" | Segment 2×2 (goal horizon × engagement potential) + scoring matrix | 81% rank travel #1; Paytm Gold Coins; scores 26/24/22 vs ≤17 | S13, S20, survey |
| 4 | **Recommendation:** "Goal Jars + Squads, boosted by brands, recapped every Sunday, with zero added steps to saving" | Product mock (3 phone screens) + zero-friction table + risk mini-table | +72% partitioning evidence; no pooling; asset-agnostic | S24, S25, S8 |
| 5 | **User journey:** "Riya opens Jar 3× a week because she has decisions to make, not notifications" | Week swimlane (Mon/Wed/Sun) + W1 → W4 → W12 progress bar + forced-vs-meaningful table | 30% endowed start; ₹235/wk; 12-wk payoff | Persona assumptions tagged |
| 6 | **Business case:** "₹8.5 Cr net in 3 years, payback in 20 months, downside capped at ₹1.6 Cr" | Revenue waterfall (4 levers) + bear/base/bull bars + tornado | ROI 52%; LTV/CAC 3.8×; break-even at 21% adoption; ₹25 Cr/yr protected | Model appendix |
| 7 | **Metrics and roadmap:** "One North Star, two hard guardrails, one pilot gate" | Metric tree (NSM → inputs → guardrails) + 3-phase Gantt with go/kill gates | WGES 210k by M12; opt-out ≤ +0.2pp; auto-save non-inferior | A/B design |

**Appendix:** A. Assumptions register (every [A]) · B. Model tables and sensitivity · C. Competitor and analogue tables · D. Primary research method and results · E. Risk register · F. Sources.

---

## PHASE 8: RED-TEAM

| Judge | Top 5 attacks | Fix applied / status |
|---|---|---|
| **Consultant** | 1. "All secondary research; where's the student voice?" 2. "The student share (40%) is a guess" 3. "Goal-savings is a known pattern (Monzo, Qapital). What's new?" 4. "Is the tree MECE?" 5. "Why not early-career first?" | 1. **Run the survey (n ≥ 60) + 8 interviews (Appendix D). OPEN, team must execute.** 2. Sensitivity shows the base holds at 30% (₹3.1 Cr net) ✔ 3. Novelty = Squads (no pooling) + brand-funded boosts + endowed start from the dormant balance + the "withdraw is the only action" insight ✔ 4. A/B/C = visibility / actionability / motivation, mutually exclusive ✔ 5. Mandate is students; shortest goal cycles ✔ |
| **PM** | 1. "Sunday Wrap is just a notification in disguise" 2. "Do squads create social pressure?" 3. "Doesn't the goal *end* in a withdrawal, killing AUM?" 4. "Is the MVP too big for 8 weeks?" 5. "Why won't PhonePe copy it in 3 months?" | 1. The Wrap lives in-app + widget; the metric counts only *meaningful* sessions ✔ 2. % only, private amounts, leave anytime ✔ 3. Jar earns on flows; Forever Jar partition; carry-forward and next-goal ✔ 4. Cut to solo/squad jars + Wrap + 3 partners; widget optional ✔ 5. Squad network + partner density + PhonePe is Jar's gold partner. **RESIDUAL: the feature is copyable; the moat is execution speed** |
| **Finance** | 1. "3% take rate: sourced?" 2. "30% uplift is heroic" 3. "Bear case loses ₹10.9 Cr" 4. "CAC ignores build cost" 5. "The Y3 ₹12 Cr is small vs ₹208 Cr revenue: why bother?" | 1. Derived below the 4.7% filings margin; tornado 2–4.7% ✔ 2. Haircut >50% off field evidence; sensitivity 15–45% ✔ 3. Stage-gated: real downside ₹1.6 Cr ✔ 4. Fully loaded ROI includes build; CAC is marginal (labelled) ✔ 5. Plus ₹25 Cr/yr protected + cross-sell optionality + a regulatory hedge ✔ **RESIDUAL: no Jar internal data; all Y2–Y3 numbers rest on assumptions** |

**Remaining weaknesses:**
- No primary data yet.
- Student share and active ratio can't be verified externally.
- The feature can be copied.
- Base-case upside is modest.
- The partner names are illustrative.

---

## PHASE 9: CONFIDENCE SCORE (derived)

### Step A: criterion scores (anchors: 3 = generic · 6 = solid · 8 = top-10% · 10 = exceptional)
**Penalty checks:**
- Every number is tagged → no −1 penalty on Business Impact.
- Goal Jars are not in Jar's current feature set → no cap on Solution.
- The journey works with notifications off → no cap on User Journey.
- The diagnosis has a non-obvious insight → no cap.

| Criterion (weight) | v1 (secondary research only) | Why | v2 (after fixes) | Why |
|---|---|---|---|---|
| Diagnosis (25%) | **7** | Non-obvious insight; MECE tree; derived active ratio; but zero primary research | **8** | + survey/interview evidence on slide 2. *Only if actually done* |
| Solution (25%) | **7** | Strong fit; zero friction proven; goals are a known pattern | **7.5** | + regulatory-proof design (no pooling, asset-agnostic), stage gates, moat logic |
| User Journey (20%) | **7.5** | 3 opens with trigger/action/value; W1–W12 compounding | **8** | + "why it works with notifications off" column, meaningful-open definition |
| Business Impact (20%) | **6** | Full model, but a negative bear case and a modest base | **7** | + capped downside, break-even adoption, protected revenue, tornado |
| Design (10%) | **6** | Plan only | **7.5** | + slide-by-slide spec. *Execution-dependent* |

### Step B: quality score
- **v1:** Q = (0.25×7 + 0.25×7 + 0.2×7.5 + 0.2×6 + 0.1×6) × 10 = **68.0**
- **v2:** Q = (0.25×8 + 0.25×7.5 + 0.2×8 + 0.2×7 + 0.1×7.5) × 10 = **76.25**

### Step C: the field [all assumed]
- **Teams:** Unstop registration counts for CaseBlitz weren't publicly findable. National IIT case competitions on Unstop typically draw ~1–3k registrations with ~20–30% submitting, so **N ≈ 400 submissions (range 250–800)**.
- **Competitor quality:** a mixture. 85% "typical" N(42, 8), since most teams are generic at ~3–5 per criterion; plus 15% "serious" N(62, 8) (IIM/IIT teams with consulting/PM experience).
- **Judging:** Round 1 = Q + judge noise N(0, 6), then top 8 shortlisted. Finals = Q + presentation noise N(0, 8).
- **Self-assessment bias:** our scores are self-graded, so results are shown with a −5 haircut too.
- **Percentile:** v1 ≈ 93–97th; v2 ≈ 98–99.4th.

### Step D: probabilities (Monte Carlo, 6,000 runs per cell; `confidence_score_sim.py`)
| | N=250 | N=400 | N=800 |
|---|---|---|---|
| **v1, Q=68** P(win) / P(top 3) | 2.1% / 9.3% | 0.7% / 3.8% | 0.2% / 1.1% |
| v1, Q=63 (−5 haircut) | 0.4% / 1.5% | 0.1% / 0.5% | — |
| **v2, Q=76.25** P(win) / P(top 3) | 18.2% / 47.6% | 12.8% / 34.9% | 6.2% / 19.7% |
| v2, Q=71.25 (−5 haircut) | 5.4% / 20.8% | 2.7% / 11.3% | 0.8% / 4.3% |

*Why a 99th-percentile entry still rarely wins:* in a field of ~400, the ~60 "serious" teams produce several entries that are as good or better. Judge and presentation noise (sd 6–8) is the same size as the quality gaps at the top.

### Step E: CS (range)
- **v1 (current plan, no primary research): P(win) 0.1–2% · P(top 3) 0.5–9%**
- **v2 (after fixes, central N=400): P(win) ~3–13% · P(top 3) ~11–35%**. Full range across N and haircut: P(top 3) 4–48%.

**Top 3 factors that raise it:**
1. The non-obvious "withdraw is the only action" insight, carried through every slide.
2. Behavioural evidence from **Indian** field data (Soman & Cheema) plus the Paytm Gold Coins threat. Few teams will find these.
3. Finance-judge-proof economics: stage-gated downside, break-even adoption, a fully tagged model.

**Top 3 factors that lower it:**
1. No primary user data yet.
2. Goal-savings is a familiar pattern, so an originality ceiling of ~7.5.
3. Base-case impact is modest vs Jar's scale, and design quality is still unexecuted.

### Step F: P(top 3) < 30% in v1, so apply these changes (built into v2)
1. **Primary research (≤48 h):**
   - Google Form survey to ≥60 students who use Jar or savings apps.
   - 8 × 15-minute interviews.
   - Report on slide 2: % with a named goal, open triggers, reaction to squads.
   - This is the single biggest lever (+1 Diagnosis ≈ +2.5 Q).
2. Stage-gated downside and a break-even adoption line on slide 6 (done in this dossier).
3. A "notifications-off" column and a meaningful-open definition on slide 5 (done).
4. Regulatory-proof design (no pooling, asset-agnostic ledger) on slide 4 (done).
5. **Design execution:** 3 phone-screen mockups, a waterfall and a tornado chart. No text walls.

**Before → after:** CS P(top 3) **0.5–9% → 11–35% (central)**. The residual gap to >30% in pessimistic fields depends on how well steps 1 and 5 are executed.

---

## APPENDIX D: Primary research kit (run before 27 Sep)
**Survey (≥60 students, 3 min):**
1. Do you use Jar / another savings app? (Y/N; which)
2. How often do you open it? (daily / weekly / monthly / rarely)
3. Last reason you opened it? (check balance / withdraw / spin / other)
4. What are you saving for in the next 6 months? (trip / phone / fest / course / nothing specific / other)
5. Would you save toward a trip *with friends* in one app? (1–5)
6. Would a brand adding ₹20–50 to your goal make you check weekly? (1–5)
7. Have you turned off notifications for finance apps? (Y/N)
8. Monthly UPI payments (approx.) and typical amount

**Interview prompts (8 × 15 min):** walk through your last 5 app opens; your last group-trip money coordination; what would make you open Jar on a Monday.
**Report** n, % and one quote per insight. Never extrapolate beyond the sample.

---

## SOURCES
- S1 TechCrunch, 18 Sep 2025: https://techcrunch.com/2025/09/18/indian-fintech-jar-turns-profitable-by-helping-millions-save-in-gold/
- S2 Entrackr, FY25 results: https://entrackr.com/news/jar-clocks-rs-208-cr-operating-revenue-in-fy25-turns-profitable-in-h2-10478229
- S3 Inc42, FY25 financials: https://inc42.com/buzz/wealthtech-startup-jar-halves-fy25-loss-to-inr-50-5-cr/
- S4 Entrackr, Unitary Fund round (Sep 2026): https://entrackr.com/exclusive/exclusive-jar-raises-small-fresh-funding-from-unitary-fund-12547515
- S5 Deccan Chronicle, 27 Mar 2024: https://www.deccanchronicle.com/news/digital-gold-savings-app-jar-surpasses-20-million-users-887517
- S6 Tigerfeathers, Dec 2024: https://www.tigerfeathers.in/p/explaining-the-meteoric-growth-of
- S7 Jar website: https://www.myjar.app/
- S8 SEBI advisory coverage, Nov 2025: https://www.medianama.com/2025/11/223-sebis-warning-digital-gold/ · https://www.newsonair.gov.in/sebi-warns-investors-against-unregulated-digital-gold-schemes
- S9 Jar lending partners: https://www.myjar.app/lending-partners
- S10 Jar App Store listing: https://apps.apple.com/in/app/jar-save-money-in-digital-gold/id1586776687
- S11 Jar Play Store listing: https://play.google.com/store/apps/details?id=com.jar.app
- S12 Unrelated "Jar – Savings Goal Tracker" (Metehan Gurgentepe): https://apps.apple.com/us/app/jar-savings-goal-tracker/id6741083421
- S13 Paytm Gold Coins: https://www.businesstoday.in/technology/news/story/paytm-rolls-out-gold-coins-letting-users-earn-digital-gold-on-every-payment-made-504019-2025-11-27 · https://paytm.com/blog/paytm-gold-coins/how-to-earn-paytm-gold-coins/
- S14 PhonePe: https://www.phonepe.com/
- S15 Gullak Gold+: https://inc42.com/startups/12-new-age-investment-platforms-fuelling-indias-digital-gold-rush/
- S16 Spare8: https://indianstartupnews.com/news/spare8-a-micro-investment-app-raises-770k-in-a-pre-seed-round-led-by-2am-vc/
- S17 Fello pivot: https://manikarthik.com/blog/jar-vs-fello/
- S18 UPI Aug 2026: https://www.medianama.com/2026/09/223-upi-transactions-august-2026/
- S19 Worldline India Digital Payments Report: https://worldline.com/en-in/home/main-navigation/resources/reports-and-insights/2025/worldline-india-digital-payments-report-1h-2025
- S20 Mintel Indian Gen Z: https://www.mintel.com/press-centre/indian-gen-z-financially-savvy-socially-conscious-and-ready-to-travel/
- S21 Outlook Money, Gen Z money mindset: https://www.outlookmoney.com/personal-finance/gen-z-and-the-money-mindset-why-young-indians-are-rethinking-saving-spending-and-investing
- S22 WGC *Swarnim Udaan 2047* coverage: https://www.businesstoday.in/personal-finance/investment/story/indias-rs315-lakh-crore-gold-stock-could-power-the-economy-heres-how-gen-z-holds-the-key-547509-2026-08-06
- S23 LocalCircles dark patterns survey: https://www.localcircles.com/a/press/page/ecommerce-dark-patterns-survey
- S24 Soman & Cheema (2011), JMR: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1732709
- S25 Kivetz, Urminsky & Zheng (2006), JMR: https://home.uchicago.edu/ourminsky/Goal-Gradient_Illusionary_Goal_Progress.pdf
- S26 Sicherman, Loewenstein, Seppi & Utkus (2016), RFS: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2339287
- S27 Duolingo shareholder letter Q4 FY2024: https://investors.duolingo.com/static-files/99006c40-d8cf-41ca-b5b1-c5cb1fa5ba88
- S28 Acorns Found Money: https://frequentmiler.com/60-retailers-where-acorns-found-money-offers-the-highest-cashback/
- S29 Monzo Pots data: https://monzo.com/blog/2023/02/15/using-topic-modelling-to-understand-customer-saving-goals

*Caveats:*
- Some figures came via secondary summaries of filings (Inc42 and Entrackr differ on the "operating revenue" definition: ₹208 Cr net vs ₹2,447.8 Cr gross). Cite both, as above.
- S21 and S23 were read from search summaries, and the S23 link is a different LocalCircles survey page. **Open these and confirm the exact figures before citing them on slides.**
- Re-check gold price, Jar features and user counts on submission day.

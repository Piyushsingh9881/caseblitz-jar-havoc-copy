"""Theme-code Jar Google Play reviews (keyword rules, English + Hinglish). Run: python analyze_reviews.py"""
import json, re, collections, random

R = json.load(open("jar_playstore_reviews.json", encoding="utf-8"))
SUB = [r for r in R if len((r["content"] or "").split()) >= 8]  # substantive reviews

THEMES = {
    "Withdrawal / selling": r"withdr|with draw|\bsell|\bsold|nikal|redeem|cash ?out|money back|payout|paise wapas|wapas",
    "Charges / spread / GST / got back less": r"\bgst\b|charge|deduct|spread|\btax|less (money|amount)|kam (paisa|paise|payment)|kami|kaat|cut kar|loss|nuksan|nuksaan|lose|lost|buy.{0,20}sell|sell.{0,20}buy|market (rate|price)|higher than",
    "AutoPay / unexpected debits": r"auto ?pay|auto ?debit|mandate|debited|paise cut|money cut|without (my )?permission|automatic(ally)? (cut|deduct)",
    "Balance / gold price / returns": r"balance|gold (rate|price)|\brate\b|return|profit|interest|value|gram",
    "Spins / rewards / cashback": r"\bspin|reward|cashback|cash back|coupon|scratch|\bprize|lucky|jackpot|\bwin\b|winning",
    "Notifications / spam": r"notification|spam|too many (messages|calls)|\bsms\b|irritat",
    "Customer support": r"customer (care|support|service)|support team|no (reply|response)|helpline|contact number|complain",
    "Trust / fraud fear": r"fraud|scam|fake|cheat|chor|thag|trust",
    "Habit / automatic / small amounts (praise)": r"habit|automatic|daily sav|every ?day|roz|\b(10|20|50) ?(rs|rupees|rupee|₹)|₹ ?(10|20|50)\b|small amount|chhot|thoda thoda|easy to save|bachat|save daily",
    "A goal / purpose named": r"\bgoal|target|\btrip|travel|wedding|marriage|shaadi|\bphone|laptop|bike|education|fees|emergency|future|dream|festival|diwali|gift|jewel|house|ghar",
}

def tag(text):
    t = (text or "").lower()
    return {k for k, rx in THEMES.items() if re.search(rx, t)}

rows = []
for r in SUB:
    rows.append((r, tag(r["content"])))

def pct(n, d): return f"{100*n/d:.0f}%" if d else "n/a"

n = len(SUB)
neg = [x for x in rows if x[0]["score"] <= 2]
pos = [x for x in rows if x[0]["score"] >= 4]
print(f"All reviews: {len(R)} (30 Jul–22 Sep 2026). Substantive (>=8 words): {n} | 1-2★: {len(neg)} | 4-5★: {len(pos)}\n")
print(f"{'Theme':45s} {'all subst.':>12s} {'1-2★':>10s} {'4-5★':>10s}")
for k in THEMES:
    a = sum(k in t for _, t in rows); b = sum(k in t for _, t in neg); c = sum(k in t for _, t in pos)
    print(f"{k:45s} {pct(a,n):>6s} ({a:3d}) {pct(b,len(neg)):>5s} ({b:3d}) {pct(c,len(pos)):>5s} ({c:3d})")

# withdrawal moment: among negative reviews, share mentioning withdrawal OR charges
wm = sum(bool({"Withdrawal / selling", "Charges / spread / GST / got back less"} & t) for _, t in neg)
print(f"\n1-2★ reviews about the withdrawal moment (withdrawal or charges/got-back-less): {pct(wm, len(neg))} ({wm}/{len(neg)})")
both = sum({"Withdrawal / selling", "Charges / spread / GST / got back less"} <= t for _, t in neg)
print(f"1-2★ reviews mentioning BOTH withdrawal and charges: {pct(both, len(neg))} ({both}/{len(neg)})")
g = sum("A goal / purpose named" in t for _, t in rows)
print(f"Substantive reviews naming any goal/purpose: {pct(g, n)} ({g}/{n})")
h = sum("Habit / automatic / small amounts (praise)" in t for _, t in pos)
print(f"4-5★ praising habit/automatic/small amounts: {pct(h, len(pos))} ({h}/{len(pos)})")
sp = sum("Spins / rewards / cashback" in t for _, t in rows)
print(f"Substantive reviews mentioning spins/rewards: {pct(sp, n)} ({sp}/{n})")

# samples for manual validation
random.seed(7)
for k in ["Withdrawal / selling", "Charges / spread / GST / got back less", "A goal / purpose named"]:
    ex = [r["content"] for r, t in rows if k in t]
    print(f"\n--- sample: {k} ---")
    for e in random.sample(ex, min(6, len(ex))): print(" •", e[:170].replace("\n", " "))

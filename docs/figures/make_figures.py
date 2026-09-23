"""Generates the README charts. Run from repo root: python docs/figures/make_figures.py
Numbers come from model/jar_goal_jars_model.py (base case), reviews/analyze_reviews.py
and model/confidence_score_sim.py (N ~ 250 submissions)."""
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

OUT = os.path.dirname(os.path.abspath(__file__))
PURPLE, PURPLE_L, CORAL, TEAL, GRAY, INK, MUTED = "#534AB7", "#AFA9EC", "#D85A30", "#0F6E56", "#B4B2A9", "#2C2C2A", "#5F5E5A"
plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 11, "axes.edgecolor": GRAY,
                     "axes.labelcolor": MUTED, "xtick.color": MUTED, "ytick.color": MUTED,
                     "figure.facecolor": "white", "axes.facecolor": "white"})


def clean(ax, keep_bottom=True):
    for side in ("top", "right", "left"):
        ax.spines[side].set_visible(False)
    ax.spines["bottom"].set_visible(keep_bottom)


# 1. Three-year value waterfall (base case, Rs crore)
def waterfall():
    steps = [("Savings\nuplift", 7.20), ("Partner\nfees", 6.41), ("Lower\nchurn", 2.40), ("Reactivated\nsavers", 8.74)]
    fig, ax = plt.subplots(figsize=(8, 4.2), dpi=200)
    run, x = 0.0, 0
    for label, v in steps:
        ax.bar(x, v, bottom=run, color=PURPLE, width=0.6)
        ax.text(x, run + v + 0.4, f"+{v:.1f}", ha="center", color=INK, fontsize=10)
        run += v; x += 1
    ax.bar(x, run, color="#3C3489", width=0.6); ax.text(x, run + 0.4, f"{run:.1f}", ha="center", color=INK, fontsize=10, weight="bold"); x += 1
    cost = 16.26  # exact model total; displays as 16.3
    ax.bar(x, cost, bottom=run - cost, color=CORAL, width=0.6); ax.text(x, run + 0.4, f"−{cost:.1f}", ha="center", color=CORAL, fontsize=10, weight="bold"); x += 1
    net = run - cost
    ax.bar(x, net, color=TEAL, width=0.6); ax.text(x, net + 0.4, f"{net:.1f}", ha="center", color=TEAL, fontsize=10, weight="bold")
    ax.set_xticks(range(7), [s[0] for s in steps] + ["Revenue", "Costs", "Net"], fontsize=9.5)
    ax.set_yticks([]); ax.set_ylim(0, 28); clean(ax)
    ax.set_title("3-year incremental value, base case (₹ crore)", loc="left", color=INK, fontsize=12)
    fig.text(0.01, 0.01, "ROI 52% · payback ~20 months · LTV/CAC 3.8× · pilot gate caps downside at ~₹1.6 Cr", color=MUTED, fontsize=8.5)
    fig.tight_layout(rect=(0, 0.04, 1, 1)); fig.savefig(os.path.join(OUT, "waterfall.png")); plt.close(fig)


# 2. Play Store review themes (share of detailed reviews)
def review_themes():
    themes = ["Withdrawal / selling", "Got back less (GST, spread)", "Trust / fraud fear", "Balance / gold price",
              "Customer support", "Names a goal (upper bound)", "AutoPay / unexpected debits", "Spins / rewards", "Notifications"]
    neg = [44, 32, 28, 15, 12, 5, 4, 1, 1]
    pos = [12, 3, 3, 3, 0, 6, 1, 1, 0]
    fig, ax = plt.subplots(figsize=(8, 4.6), dpi=200)
    y = range(len(themes))[::-1]
    ax.barh([i + 0.2 for i in y], neg, height=0.38, color=CORAL, label="1–2★ reviews (n = 408)")
    ax.barh([i - 0.2 for i in y], pos, height=0.38, color=PURPLE_L, label="4–5★ reviews (n = 263)")
    for i, a, b in zip(y, neg, pos):
        ax.text(a + 0.6, i + 0.2, f"{a}%", va="center", fontsize=8.5, color=INK)
        ax.text(b + 0.6, i - 0.2, f"{b}%", va="center", fontsize=8.5, color=MUTED)
    ax.set_yticks(list(y), themes, fontsize=9.5); ax.set_xticks([]); ax.set_xlim(0, 50); clean(ax, keep_bottom=False)
    ax.legend(frameon=False, fontsize=9, loc="lower right")
    ax.set_title("What detailed Jar reviews talk about (6,000 newest, Jul–Sep 2026)", loc="left", color=INK, fontsize=12)
    fig.tight_layout(); fig.savefig(os.path.join(OUT, "review_themes.png")); plt.close(fig)


# 3. Confidence score progression: P(top 3), range = self-score minus 5 .. self-score
def confidence():
    rows = [("First draft", 1.5, 9.3, GRAY), ("Final deck", 11.5, 34.2, GRAY),
            ("+ App reviews (now)", 18.3, 44.4, TEAL), ("+ Survey results (target)", 21.0, 47.7, PURPLE)]
    fig, ax = plt.subplots(figsize=(8, 3.2), dpi=200)
    for i, (lab, lo, hi, c) in enumerate(rows[::-1]):
        ax.barh(i, hi - lo, left=lo, height=0.45, color=c, alpha=0.85 if c != PURPLE else 0.55,
                hatch="//" if c == PURPLE else None, edgecolor=c)
        ax.text(hi + 1, i, f"{lo:.0f}–{hi:.0f}%", va="center", fontsize=9.5, color=INK)
    ax.set_yticks(range(len(rows)), [r[0] for r in rows[::-1]], fontsize=10)
    ax.set_xlim(0, 60); ax.set_xticks([0, 20, 40, 60], ["0%", "20%", "40%", "60%"]); clean(ax)
    ax.set_title("Estimated chance of a top-3 finish (~250 submissions)", loc="left", color=INK, fontsize=12)
    fig.text(0.01, 0.01, "Monte Carlo estimate; bars span self-score −5 to self-score. Illustrative, not a guarantee.", color=MUTED, fontsize=8.5)
    fig.tight_layout(rect=(0, 0.05, 1, 1)); fig.savefig(os.path.join(OUT, "confidence.png")); plt.close(fig)


if __name__ == "__main__":
    waterfall(); review_themes(); confidence()
    print("figures written to", OUT)

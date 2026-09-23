"""
Confidence Score (CS) of winning CaseBlitz - Monte Carlo.
Field model (ALL ASSUMED, see dossier Phase 9):
  - N submitted teams: 250 / 400 / 800 (Unstop national IIT case comps: ~1-3k registrations, 20-30% submit)
  - Competitor true quality Q (0-100): mixture 85% 'typical' N(42,8) + 15% 'serious' N(62,8)
  - Round 1 (written): judged score = Q + N(0, 6) judge noise; top 8 shortlisted
  - Finals (if any): Q + N(0, 8) presentation noise; highest wins
  - Our Q is self-assessed -> apply 0 / -5 point self-bias haircut
"""
import random, sys

def sim(our_q, n_teams, trials=20000, noise1=6, noise_f=8, shortlist=8, seed=7):
    rnd = random.Random(seed)
    win = top3 = sl = 0
    for _ in range(trials):
        field = [(rnd.gauss(62, 8) if rnd.random() < 0.15 else rnd.gauss(42, 8)) for _ in range(n_teams - 1)]
        r1 = [(q + rnd.gauss(0, noise1), q, i) for i, q in enumerate(field)]
        ours = (our_q + rnd.gauss(0, noise1), our_q, -1)
        ranked = sorted(r1 + [ours], reverse=True)[:shortlist]
        if any(t[2] == -1 for t in ranked):
            sl += 1
            fin = sorted(((q + rnd.gauss(0, noise_f), i) for _, q, i in ranked), reverse=True)
            pos = [i for _, i in fin].index(-1)
            win += pos == 0; top3 += pos < 3
    return sl / trials, win / trials, top3 / trials

def pct(our_q, trials=200000, seed=3):
    rnd = random.Random(seed)
    below = sum((rnd.gauss(62, 8) if rnd.random() < 0.15 else rnd.gauss(42, 8)) < our_q for _ in range(trials))
    return below / trials

if __name__ == "__main__":
    for label, q in [("v1 (before fixes)", float(sys.argv[1]) if len(sys.argv) > 1 else 69.0),
                     ("v2 (after fixes)", float(sys.argv[2]) if len(sys.argv) > 2 else 76.0)]:
        print(f"\n### {label}: self-scored Q = {q}")
        for hair in (0, 5):
            qq = q - hair
            print(f"  haircut -{hair} -> Q={qq:.1f}, field percentile {pct(qq)*100:.1f}")
            for n in (250, 400, 800):
                s, w, t = sim(qq, n, trials=6000)
                print(f"    N={n:<4} P(shortlist top8)={s*100:5.1f}%  P(win)={w*100:5.1f}%  P(top3)={t*100:5.1f}%")

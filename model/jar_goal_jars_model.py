"""
Jar 'Goal Jars' business case model (CaseBlitz 2026).
Every input is tagged SOURCED / DERIVED / ASSUMED. Run: python jar_goal_jars_model.py
All money in INR; outputs in Rs crore (1 Cr = 1e7).
"""
import copy, random, statistics

CR = 1e7

BASE = dict(
    registered_users=35e6,        # SOURCED: TechCrunch/Entrackr Sep-2025 (35M+ registered)
    student_share=0.40,           # ASSUMED: PS says Gen Z/students are Jar's "largest user base" -> plurality, 40%
    active_saver_ratio=0.125,     # DERIVED: Mar-2024 1M txns/day / 22 saves per user-month = 1.36M savers on 20M users (6.8%);
                                  #          x (FY25 txn growth 3.21x / user growth 1.75x) = 12.5%
    active_growth=0.10,           # ASSUMED: conservative vs +221% FY25 transaction growth (Inc42)
    adoption=[0.20, 0.30, 0.35],  # ASSUMED: % of active-saving students who create >=1 Goal Jar, Y1..Y3
    base_monthly_save=400,        # DERIVED: ~Rs2,350 Cr gold GMV / ~4.4M active savers = ~Rs445/mo blended; students lower -> 400
    savings_uplift=0.30,          # ASSUMED: Soman & Cheema (2011) earmarking+partitioning +72% in field; haircut >50% for digital/voluntary
    take_rate=0.03,               # ASSUMED: FY25 filings imply 4.7% blended gross margin incl. Nek jewellery; gold-only lower -> 3%
    squad_creator_share=0.40,     # ASSUMED: 40% of adopters create a Squad Jar (trip/fest goals dominate Gen Z intent; Mintel 81% rank travel #1)
    reactivated_per_squad=1.0,    # ASSUMED: avg squad of 4 -> ~1 member was dormant/new and becomes an active saver
    reactivated_survival=0.60,    # ASSUMED: yearly survival of reactivated savers
    goals_per_adopter=1.2,        # ASSUMED: short student goals (8-16 wk) -> >1 completion/yr
    partner_redeem_share=0.20,    # ASSUMED: share of completed goals redeemed at a Boost partner
    avg_goal_value=4000,          # ASSUMED: trip/gadget-accessory/fest goals for students
    affiliate_rate=0.04,          # ASSUMED: typical Indian travel/e-com affiliate commissions 3-8%
    retention_base=0.55,          # ASSUMED: annual survival of an active saver (approx 5%/mo churn)
    retention_adopter=0.65,       # ASSUMED: goal holders churn less (goal-gradient; Kivetz et al. 2006)
    build_cost=[3.0, 1.8, 1.8],   # ASSUMED Rs Cr: 10 FTE x Rs30L loaded Y1; 6 FTE run
    boost_subsidy=[25, 12, 8],    # ASSUMED Rs/adopter/yr Jar-funded; partners fund the rest after pilot
    marketing=[2.5, 2.0, 2.0],    # ASSUMED Rs Cr: campus ambassadors + content (~5% of FY25 ad spend Rs48.5 Cr, Inc42)
    variable_cost=6,              # ASSUMED Rs/adopter/yr infra + support
    early_career=False,           # Phase-3 expansion (bull only)
    ec_share=0.25, ec_adoption=[0, 0.10, 0.20],
)

def run(p):
    rows = []
    cohorts = []  # reactivated saver cohorts (count, age)
    for y in range(3):
        active_students = p["registered_users"] * p["student_share"] * p["active_saver_ratio"] * (1 + p["active_growth"]) ** y
        adopters = active_students * p["adoption"][y]
        if p["early_career"]:
            adopters += p["registered_users"] * p["ec_share"] * p["active_saver_ratio"] * (1 + p["active_growth"]) ** y * p["ec_adoption"][y]
        annual_save = p["base_monthly_save"] * 12
        r_uplift = adopters * annual_save * p["savings_uplift"] * p["take_rate"]
        r_partner = adopters * p["goals_per_adopter"] * p["partner_redeem_share"] * p["avg_goal_value"] * p["affiliate_rate"]
        r_retention = adopters * (p["retention_adopter"] - p["retention_base"]) * annual_save * p["take_rate"]
        new_react = adopters * p["squad_creator_share"] * p["reactivated_per_squad"]
        r_react = new_react * annual_save * p["take_rate"] * 0.5  # half-year in year of acquisition
        r_react += sum(c * annual_save * p["take_rate"] * p["reactivated_survival"] ** age for c, age in cohorts)
        cohorts = [(c, age + 1) for c, age in cohorts] + [(new_react, 1)]
        revenue = r_uplift + r_partner + r_retention + r_react
        cost = (p["build_cost"][y] * CR + p["marketing"][y] * CR
                + adopters * (p["boost_subsidy"][y] + p["variable_cost"]))
        rows.append(dict(year=y + 1, adopters=adopters, reactivated_new=new_react,
                         r_uplift=r_uplift / CR, r_partner=r_partner / CR, r_retention=r_retention / CR,
                         r_react=r_react / CR, revenue=revenue / CR, cost=cost / CR, net=(revenue - cost) / CR))
    tot_rev = sum(r["revenue"] for r in rows); tot_cost = sum(r["cost"] for r in rows)
    # payback: monthly linear within year
    cum, payback = 0.0, None
    for r in rows:
        for m in range(12):
            cum += r["net"] / 12
            if payback is None and cum >= 0 and (r["year"] > 1 or m > 0):
                payback = (r["year"] - 1) * 12 + m + 1
    # unit economics (Y1 cohort)
    y1 = rows[0]
    cac = (p["marketing"][0] * CR + y1["adopters"] * p["boost_subsidy"][0]) / y1["adopters"]
    annual_save = p["base_monthly_save"] * 12
    margin_per_adopter = (annual_save * p["savings_uplift"] * p["take_rate"]
                          + p["goals_per_adopter"] * p["partner_redeem_share"] * p["avg_goal_value"] * p["affiliate_rate"]
                          + (p["retention_adopter"] - p["retention_base"]) * annual_save * p["take_rate"]
                          - p["variable_cost"] - p["boost_subsidy"][1])
    life_adopter = 1 / (1 - p["retention_adopter"])
    life_react = 1 / (1 - p["reactivated_survival"])
    ltv = margin_per_adopter * life_adopter + p["squad_creator_share"] * p["reactivated_per_squad"] * annual_save * p["take_rate"] * life_react
    return dict(rows=rows, tot_rev=tot_rev, tot_cost=tot_cost, net=tot_rev - tot_cost,
                roi=(tot_rev - tot_cost) / tot_cost, payback=payback, cac=cac, ltv=ltv, ltv_cac=ltv / cac,
                protected=p["registered_users"] * p["student_share"] * p["active_saver_ratio"] * annual_save * p["take_rate"] / CR)

def scen(**kw):
    p = copy.deepcopy(BASE); p.update(kw); return p

BEAR = scen(student_share=0.30, adoption=[0.10, 0.18, 0.22], base_monthly_save=300, savings_uplift=0.15,
            take_rate=0.025, reactivated_per_squad=0.5, partner_redeem_share=0.10, affiliate_rate=0.03,
            retention_adopter=0.60)
BULL = scen(student_share=0.45, adoption=[0.25, 0.40, 0.45], base_monthly_save=500, savings_uplift=0.45,
            take_rate=0.04, reactivated_per_squad=1.5, partner_redeem_share=0.30, affiliate_rate=0.05,
            retention_adopter=0.70, early_career=True)

def fmt(res, name):
    print(f"\n=== {name} ===")
    print(f"{'Yr':<3}{'Adopters':>10}{'React.':>9}{'Uplift':>8}{'Partner':>8}{'Retain':>8}{'React':>8}{'Rev':>8}{'Cost':>8}{'Net':>8}")
    for r in res["rows"]:
        print(f"{r['year']:<3}{r['adopters']/1e3:>9.0f}k{r['reactivated_new']/1e3:>8.0f}k{r['r_uplift']:>8.2f}{r['r_partner']:>8.2f}"
              f"{r['r_retention']:>8.2f}{r['r_react']:>8.2f}{r['revenue']:>8.2f}{r['cost']:>8.2f}{r['net']:>8.2f}")
    print(f"3-yr revenue Rs{res['tot_rev']:.1f} Cr | cost Rs{res['tot_cost']:.1f} Cr | net Rs{res['net']:.1f} Cr | ROI {res['roi']*100:.0f}% | "
          f"payback {res['payback']} mo | CAC Rs{res['cac']:.0f} | LTV Rs{res['ltv']:.0f} | LTV/CAC {res['ltv_cac']:.1f}x | "
          f"student margin protected Rs{res['protected']:.1f} Cr/yr")

if __name__ == "__main__":
    for name, p in [("BEAR", BEAR), ("BASE", BASE), ("BULL", BULL)]:
        fmt(run(p), name)

    # Sensitivity (tornado) on 3-yr net, one-at-a-time, base -> low/high
    print("\n=== Sensitivity: 3-yr net (Rs Cr) ===")
    base_net = run(BASE)["net"]
    tests = {
        "adoption (x0.5 / x1.5)": (dict(adoption=[a * 0.5 for a in BASE["adoption"]]), dict(adoption=[a * 1.5 for a in BASE["adoption"]])),
        "savings uplift (15% / 45%)": (dict(savings_uplift=0.15), dict(savings_uplift=0.45)),
        "take rate (2% / 4.7%)": (dict(take_rate=0.02), dict(take_rate=0.047)),
        "reactivated per squad (0.3 / 1.5)": (dict(reactivated_per_squad=0.3), dict(reactivated_per_squad=1.5)),
        "partner redemption (10% / 30%)": (dict(partner_redeem_share=0.10), dict(partner_redeem_share=0.30)),
        "student share (30% / 45%)": (dict(student_share=0.30), dict(student_share=0.45)),
    }
    out = []
    for k, (lo, hi) in tests.items():
        out.append((k, run(scen(**lo))["net"], run(scen(**hi))["net"]))
    for k, lo, hi in sorted(out, key=lambda t: -(abs(t[2] - t[1]))):
        print(f"{k:<38} low {lo:>7.1f} | base {base_net:>6.1f} | high {hi:>7.1f} | swing {hi-lo:>6.1f}")
    # break-even adoption multiplier
    for m in [x / 100 for x in range(10, 101)]:
        if run(scen(adoption=[a * m for a in BASE["adoption"]]))["net"] >= 0:
            print(f"Break-even: 3-yr net >= 0 at {m:.2f}x base adoption (Y3 adoption {BASE['adoption'][2]*m*100:.0f}%)"); break

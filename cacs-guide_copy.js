/* ============================================================
 * CACS Paper 1 – Interactive Study Guide
 * 
 *
 * Usage:
 *   <!DOCTYPE html>
 *   <html lang="en">
 *   <head><meta charset="UTF-8"></head>
 *   <body><script src="cacs-guide.js"></script></body>
 *   </html>
 *
 * 
 * 
 * ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. Document meta (title + viewport) ---------- */
  function setMeta() {
    document.documentElement.setAttribute('lang', 'en');
    document.title = 'CACS Paper 1 – Interactive Study Guide';

    // <meta charset="UTF-8">
    if (!document.querySelector('meta[charset]')) {
      var mc = document.createElement('meta');
      mc.setAttribute('charset', 'UTF-8');
      document.head.appendChild(mc);
    }
    // <meta name="viewport" content="width=device-width, initial-scale=1.0">
    if (!document.querySelector('meta[name="viewport"]')) {
      var mv = document.createElement('meta');
      mv.setAttribute('name', 'viewport');
      mv.setAttribute('content', 'width=device-width, initial-scale=1.0');
      document.head.appendChild(mv);
    }
  }

  /* ---------- 2. Inject CSS (identical to original) ---------- */
  var CSS = `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#f0f4f8;color:#1a1a2e;font-size:16px;line-height:1.65}
nav{background:#0f172a;position:sticky;top:0;z-index:1000;box-shadow:0 2px 10px rgba(0,0,0,0.4)}
nav .brand{color:#fbbf24;text-align:center;padding:8px 10px 4px;font-size:1em;font-weight:700}
.tab-bar{display:flex;flex-wrap:wrap;justify-content:center;gap:4px;padding:6px 8px 8px}
.tab-btn{border:none;padding:7px 13px;border-radius:20px;cursor:pointer;font-size:.78em;font-weight:700;transition:all .2s;color:#fff;white-space:nowrap}
.tab-btn:hover{filter:brightness(1.15);transform:translateY(-1px)}
.tab-btn.active{box-shadow:0 0 0 3px rgba(255,255,255,0.4),0 3px 8px rgba(0,0,0,0.3);transform:translateY(-2px)}
.t-home{background:#4f46e5}.t-ch1{background:#7c3aed}.t-ch2{background:#1d4ed8}
.t-ch3{background:#0d9488}.t-ch4{background:#c2410c}.t-ch5{background:#15803d}
.t-ch6{background:#b91c1c}.t-flash{background:#6d28d9}.t-quiz{background:#be185d}
.tab-content{display:none;padding:20px;max-width:920px;margin:0 auto}
.tab-content.active{display:block}
.card{background:#fff;border-radius:12px;padding:20px;margin:14px 0;box-shadow:0 2px 8px rgba(0,0,0,0.07)}
.ch-header{border-radius:14px;padding:28px 22px;margin-bottom:18px;color:#fff;text-align:center}
.ch-header h2{font-size:1.6em;margin-bottom:8px}
.ch-header p{opacity:.9;font-size:.95em}
.concept-box{border-left:5px solid #4f46e5;background:#f5f3ff;border-radius:0 10px 10px 0;padding:16px;margin:12px 0}
.analogy-box{border-left:5px solid #f59e0b;background:#fffbeb;border-radius:0 10px 10px 0;padding:16px;margin:12px 0}
.tip-box{border-left:5px solid #10b981;background:#ecfdf5;border-radius:0 10px 10px 0;padding:16px;margin:12px 0}
.warning-box{border-left:5px solid #ef4444;background:#fef2f2;border-radius:0 10px 10px 0;padding:16px;margin:12px 0}
.case-box{background:#eff6ff;border:2px solid #3b82f6;border-radius:10px;padding:16px;margin:12px 0}
.case-box h4{color:#1d4ed8;margin-bottom:8px}
.icon-lbl{font-size:1em;font-weight:700;margin-bottom:6px}
h2{font-size:1.4em;margin-bottom:10px}
h3{font-size:1.1em;margin:14px 0 8px;color:#1a1a2e}
h4{font-size:1em;margin:8px 0 5px}
p{margin-bottom:9px}
ul,ol{padding-left:22px;margin-bottom:9px}
li{margin-bottom:4px}
.tbl{width:100%;border-collapse:collapse;margin:10px 0;font-size:.88em}
.tbl th{background:#1a1a2e;color:#fff;padding:9px 11px;text-align:left}
.tbl td{padding:8px 11px;border-bottom:1px solid #e5e7eb}
.tbl tr:nth-child(even) td{background:#f8faff}
.tbl tr:hover td{background:#e0e7ff}
.ex-box{background:#f0fdf4;border:2px dashed #22c55e;border-radius:10px;padding:15px;margin:12px 0}
.ex-box h4{color:#15803d;margin-bottom:8px}
.reveal-btn{background:#16a34a;color:#fff;border:none;padding:7px 18px;border-radius:20px;cursor:pointer;font-size:.85em;margin-top:8px;font-weight:600;transition:all .2s}
.reveal-btn:hover{background:#15803d;transform:translateY(-2px)}
.answer-box{display:none;background:#fff;border-radius:8px;padding:11px;margin-top:9px;border-left:4px solid #16a34a}
.answer-box.show{display:block;animation:fadeIn .3s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}
.acc{border:1px solid #e5e7eb;border-radius:10px;margin:10px 0;overflow:hidden}
.acc-head{background:#f8faff;padding:12px 16px;cursor:pointer;font-weight:700;display:flex;justify-content:space-between;align-items:center;transition:background .2s;font-size:.93em}
.acc-head:hover{background:#e0e7ff}
.acc-body{display:none;padding:15px 16px;border-top:1px solid #e5e7eb;background:#fff}
.acc-body.open{display:block;animation:fadeIn .25s ease}
.arr{transition:transform .3s;font-size:.8em}
.acc-head.open .arr{transform:rotate(180deg)}
.badge{display:inline-block;padding:2px 9px;border-radius:12px;font-size:.77em;font-weight:700;margin:2px}
.b-blue{background:#dbeafe;color:#1e40af}.b-green{background:#dcfce7;color:#166534}
.b-red{background:#fee2e2;color:#991b1b}.b-yellow{background:#fef9c3;color:#854d0e}
.b-purple{background:#ede9fe;color:#4c1d95}.b-orange{background:#ffedd5;color:#9a3412}
.fc-grid{
  display: grid !important;
  grid-template-columns: repeat(5, 1fr) !important;
  gap: 14px !important;
  margin: 12px 0;
}.fc{perspective:1000px;height:170px;cursor:pointer}
.fc-inner{position:relative;width:100%;height:100%;transition:transform .55s;transform-style:preserve-3d}
.fc.flipped .fc-inner{transform:rotateY(180deg)}
.fc-front,.fc-back{position:absolute;width:100%;height:100%;backface-visibility:hidden;border-radius:12px;display:flex;align-items:center;justify-content:center;padding:14px;text-align:center;box-shadow:0 3px 10px rgba(0,0,0,0.12)}
.fc-front{background:linear-gradient(135deg,#1e1b4b,#3730a3);color:#fff;font-weight:700;font-size:.93em}
.fc-back{background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;transform:rotateY(180deg);font-size:.82em;line-height:1.5}
.fc-num{position:absolute;top:7px;right:9px;font-size:.7em;opacity:.55}
.fc-controls{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0;align-items:center}
.fc-btn{background:#6d28d9;color:#fff;border:none;padding:8px 18px;border-radius:20px;cursor:pointer;font-size:.85em;font-weight:700;transition:all .2s}
.fc-btn:hover{background:#5b21b6;transform:translateY(-2px)}
.quiz-hero{background:linear-gradient(135deg,#831843,#be185d);color:#fff;border-radius:14px;padding:26px;text-align:center;margin-bottom:14px}
.quiz-hero h2{font-size:1.6em;margin-bottom:8px}
.q-card{background:#fff;border-radius:12px;padding:18px;margin:12px 0;box-shadow:0 2px 8px rgba(0,0,0,0.07);display:none}
.q-card.active{display:block;animation:fadeIn .3s ease}
.q-num{font-size:.76em;color:#6b7280;font-weight:700;text-transform:uppercase;margin-bottom:7px}
.q-text{font-weight:700;font-size:1em;margin-bottom:12px;line-height:1.5}
.q-scenario{background:#f0f9ff;border-left:4px solid #0ea5e9;border-radius:0 8px 8px 0;padding:11px;margin-bottom:12px;font-size:.88em;line-height:1.55}
.opts{display:flex;flex-direction:column;gap:8px}
.opt{display:flex;align-items:flex-start;gap:12px;padding:11px 16px;border:1.5px solid #d1d5db;border-radius:8px;cursor:pointer;transition:border-color .2s,background .2s;background:#fff;text-align:left;font-size:.91em;font-weight:400;width:100%}
.opt-letter{display:flex;align-items:center;justify-content:center;min-width:28px;height:28px;border-radius:50%;border:1.5px solid #9ca3af;font-weight:700;font-size:.85em;flex-shrink:0;color:#374151;transition:all .2s}
.opt-text{line-height:1.5;padding-top:2px;flex:1}
.opt:hover:not(.locked){border-color:#4f46e5;background:#f5f3ff}
.opt:hover:not(.locked) .opt-letter{border-color:#4f46e5;color:#4f46e5}
.opt.correct{background:#f0fdf4!important;border-color:#16a34a!important}
.opt.correct .opt-letter{background:#16a34a!important;border-color:#16a34a!important;color:#fff!important}
.opt.wrong{background:#fef2f2!important;border-color:#ef4444!important}
.opt.wrong .opt-letter{background:#ef4444!important;border-color:#ef4444!important;color:#fff!important}
.opt.show-correct{background:#f0fdf4!important;border-color:#16a34a!important}
.opt.show-correct .opt-letter{background:#16a34a!important;border-color:#16a34a!important;color:#fff!important}
.opt.locked{cursor:default}
.stmt-list{background:#f8faff;border-radius:8px;padding:12px 14px;margin:8px 0 10px;border:1px solid #e5e7eb}
.stmt-item{display:flex;gap:10px;padding:4px 0;font-size:.91em;line-height:1.5;align-items:flex-start}
.stmt-roman{font-weight:700;min-width:24px;color:#4f46e5;flex-shrink:0;padding-top:1px}
.which-correct{font-size:.88em;color:#6b7280;font-style:italic;margin:6px 0 12px}
.expl{display:none;background:#f0fdf4;border-left:4px solid #16a34a;border-radius:0 8px 8px 0;padding:11px;margin-top:9px;font-size:.86em;line-height:1.55}
.expl.show{display:block;animation:fadeIn .3s ease}
.q-progress{background:#e5e7eb;border-radius:10px;height:6px;margin:8px 0}
.q-fill{background:linear-gradient(90deg,#4f46e5,#be185d);border-radius:10px;height:100%;transition:width .4s}
.quiz-score{background:linear-gradient(135deg,#1e1b4b,#4f46e5);color:#fff;border-radius:14px;padding:30px;text-align:center;display:none}
.quiz-score h2{font-size:2.6em;margin-bottom:8px}
.qbtn{border:none;padding:9px 24px;border-radius:25px;cursor:pointer;font-size:.93em;font-weight:700;transition:all .2s;margin:5px}
.qbtn:hover{transform:translateY(-2px);filter:brightness(1.1)}
.home-hero{background:linear-gradient(135deg,#0f172a,#1e40af);color:#fff;border-radius:16px;padding:32px 20px;text-align:center;margin-bottom:16px}
.home-hero h1{font-size:1.9em;margin-bottom:10px}
.ch-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(235px,1fr));gap:11px;margin:14px 0}
.ch-card{border-radius:12px;padding:16px;color:#fff;cursor:pointer;transition:transform .2s;border:none;text-align:left}
.ch-card:hover{transform:translateY(-4px)}
.ch-card h3{font-size:.92em;margin-bottom:5px;font-weight:800}
.ch-card p{font-size:.78em;opacity:.9}
.ctbl{width:100%;border-collapse:collapse;font-size:.82em}
.ctbl th{padding:8px 7px;text-align:center;color:#fff;font-size:.8em}
.ctbl td{padding:8px 7px;border:1px solid #e5e7eb;text-align:center;vertical-align:top;line-height:1.4;font-size:.82em}
.ctbl tr:nth-child(even) td{background:#f8faff}
.ctbl .rh{background:#1a1a2e!important;color:#fff;font-weight:700;text-align:left;padding-left:10px}
@media(max-width:600px){
  .fc-grid,.ch-grid{
    grid-template-columns:1fr !important;
  }
}
/* ===== Aesthetic Upgrade Patch: added after original CSS ===== */
:root{
  --bg:#f6f8fc;
  --bg-soft:#eef4fb;
  --surface:rgba(255,255,255,0.88);
  --surface-strong:#ffffff;
  --text:#0f172a;
  --muted:#64748b;
  --primary:#5b5bd6;
  --secondary:#7c3aed;
  --accent:#0ea5e9;
  --success:#16a34a;
  --warning:#f59e0b;
  --danger:#ef4444;
  --border:rgba(148,163,184,0.24);
  --shadow:0 12px 30px rgba(15,23,42,0.08);
  --shadow-lg:0 20px 45px rgba(15,23,42,0.12);
  --radius:18px;
}

html{scroll-behavior:smooth}

body{
  font-family:'Inter','Segoe UI',Arial,sans-serif;
  color:var(--text);
  background:
    radial-gradient(circle at top left, rgba(124,58,237,0.10), transparent 28%),
    radial-gradient(circle at top right, rgba(14,165,233,0.12), transparent 24%),
    linear-gradient(180deg, #f8fbff 0%, #eef4fb 100%);
}

nav{
  background:rgba(15,23,42,0.86);
  backdrop-filter:blur(14px);
  -webkit-backdrop-filter:blur(14px);
  border-bottom:1px solid rgba(255,255,255,0.08);
  box-shadow:0 10px 30px rgba(15,23,42,0.18);
}

nav .brand{
  font-size:1.05em;
  letter-spacing:0.02em;
  padding:12px 10px 6px;
}

.tab-bar{gap:8px;padding:8px 10px 12px}

.tab-btn{
  border-radius:999px;
  padding:9px 15px;
  font-size:.8em;
  box-shadow:0 6px 18px rgba(15,23,42,0.14);
}

.tab-btn.active{
  box-shadow:0 0 0 3px rgba(255,255,255,0.35),0 10px 20px rgba(0,0,0,0.18);
}

.tab-content{
  max-width:1100px;
  padding:28px 20px 36px;
}

.card,.acc,.q-card,.quiz-score{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:var(--radius);
  box-shadow:var(--shadow);
  backdrop-filter:blur(8px);
  -webkit-backdrop-filter:blur(8px);
}

.card{padding:24px;margin:16px 0}

.ch-header,.home-hero,.quiz-hero{
  position:relative;
  overflow:hidden;
  border-radius:24px;
  box-shadow:var(--shadow-lg);
}

.home-hero{
  padding:40px 26px;
  text-align:center;
  background:
    radial-gradient(circle at top right, rgba(255,255,255,0.16), transparent 28%),
    linear-gradient(135deg,#111827 0%,#3730a3 55%,#0ea5e9 100%);
}

.home-hero::before{
  content:'';
  position:absolute;
  inset:auto -50px -60px auto;
  width:220px;
  height:220px;
  background:rgba(255,255,255,0.08);
  border-radius:50%;
}

.home-hero h1{
  font-size:2.1em;
  line-height:1.2;
  margin-bottom:10px;
}

.home-hero p{color:rgba(255,255,255,0.92)}

.hero-chip{
  display:inline-block;
  margin-bottom:14px;
  padding:7px 14px;
  border-radius:999px;
  background:rgba(255,255,255,0.14);
  border:1px solid rgba(255,255,255,0.22);
  font-size:.82em;
  font-weight:700;
  letter-spacing:.03em;
}

.hero-sub{
  max-width:760px;
  margin:0 auto 18px;
  font-size:1em;
}

.hero-stats{
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  gap:10px;
  margin:18px 0 14px;
}

.hero-stat{
  background:rgba(255,255,255,0.14);
  border:1px solid rgba(255,255,255,0.22);
  padding:8px 14px;
  border-radius:999px;
  font-size:.84em;
  font-weight:700;
}

.hero-actions{
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  gap:12px;
  margin-top:18px;
}

.hero-btn{
  border:none;
  border-radius:999px;
  padding:11px 18px;
  font-weight:800;
  cursor:pointer;
  transition:all .2s ease;
  font-size:.9em;
}

.hero-btn:hover{
  transform:translateY(-2px);
  filter:brightness(1.05);
}

.hero-btn.primary{background:#fff;color:#1e1b4b}
.hero-btn.secondary{background:rgba(255,255,255,0.14);color:#fff;border:1px solid rgba(255,255,255,0.24)}

.ch-grid{gap:14px;margin-top:18px}

.ch-card{
  border:none;
  border-radius:20px;
  padding:18px;
  min-height:135px;
  box-shadow:var(--shadow);
  position:relative;
  overflow:hidden;
}

.ch-card::after{
  content:'→';
  position:absolute;
  right:16px;
  bottom:12px;
  font-size:1.1em;
  opacity:.75;
}

.ch-card h3{font-size:1em;margin-bottom:8px}
.ch-card p{font-size:.83em;line-height:1.55}

.acc{overflow:hidden}
.acc-head{background:linear-gradient(180deg,#fbfdff 0%,#f3f7fc 100%);font-size:.95em;padding:15px 18px}
.acc-body{padding:18px;background:#fff}

.concept-box,.analogy-box,.tip-box,.warning-box,.case-box,.ex-box{
  border-radius:14px;
  padding:16px 18px;
}

.tbl,.ctbl{
  border-collapse:separate;
  border-spacing:0;
  overflow:hidden;
  border-radius:14px;
  border:1px solid #e2e8f0;
}

.tbl th,.ctbl th{font-size:.86em;letter-spacing:.02em}
.tbl td,.ctbl td{background:#fff}
.tbl tr:nth-child(even) td,.ctbl tr:nth-child(even) td{background:#f8fbff}

.reveal-btn,.fc-btn,.qbtn{
  border-radius:999px;
  font-weight:800;
  box-shadow:0 8px 20px rgba(37,99,235,0.15);
}

.answer-box{border-radius:12px;background:#f8fffb}
.fc{height:190px}
.fc-front,.fc-back{border-radius:18px;box-shadow:var(--shadow)}
.fc-front{background:linear-gradient(135deg,#1e1b4b,#4338ca,#7c3aed)}
.fc-back{background:linear-gradient(135deg,#4338ca,#7c3aed,#0ea5e9)}

.quiz-hero{
  background:
    radial-gradient(circle at top right, rgba(255,255,255,0.14), transparent 28%),
    linear-gradient(135deg,#831843,#be185d,#7c3aed);
}

.q-card{padding:22px}
.opt{border-radius:14px;padding:13px 16px;box-shadow:0 4px 12px rgba(15,23,42,0.03)}
.opt-letter{width:30px;min-width:30px;height:30px}

.study-plan h3{margin-bottom:14px}

.mini-steps{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:12px;
}

.mini-step{
  display:flex;
  gap:12px;
  align-items:flex-start;
  background:linear-gradient(180deg,#fff 0%,#f8fbff 100%);
  border:1px solid #e2e8f0;
  border-radius:16px;
  padding:14px;
}

.mini-step-num{
  width:32px;
  height:32px;
  min-width:32px;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:800;
  background:linear-gradient(135deg,#4f46e5,#7c3aed);
  color:#fff;
}

.mini-step p{
  margin:4px 0 0;
  color:var(--muted);
  font-size:.88em;
}

.focus-note{
  margin-top:14px;
  padding:14px 16px;
  border-radius:14px;
  background:linear-gradient(90deg,#eff6ff,#f5f3ff);
  border:1px solid #dbeafe;
  color:#334155;
}

@media(max-width:600px){
  .home-hero{padding:30px 18px}
  .home-hero h1{font-size:1.55em}
  .hero-actions{flex-direction:column;align-items:center}
  .hero-btn{width:100%;max-width:280px}
  .fc-grid,.ch-grid{grid-template-columns:1fr}
}

/* ===== FINAL THEME: Pastel Cute + Study Cafe Mix ===== */
:root{
  --pastel-cream:#fff8ed;
  --pastel-paper:#fffdf7;
  --pastel-pink:#ffd6e5;
  --pastel-lavender:#ddd6ff;
  --pastel-blue:#cdeeff;
  --pastel-mint:#d8f5df;
  --pastel-peach:#ffd8bd;
  --pastel-yellow:#fff0b8;
  --pastel-coffee:#9b6a4a;
  --pastel-cocoa:#5a4032;
  --pastel-text:#3f342e;
  --pastel-muted:#7f6c61;
  --pastel-border:rgba(155,106,74,0.16);
  --pastel-shadow:0 16px 36px rgba(94,64,44,0.10);
  --pastel-shadow-lg:0 26px 60px rgba(94,64,44,0.14);
}

/* Base page background: designed using CSS, no image file required */
html{
  scroll-behavior:smooth;
}

body{
  font-family:'Inter','Segoe UI',Arial,sans-serif;
  color:var(--pastel-text);
  font-size:17px;
  line-height:1.72;
  background:
    radial-gradient(circle at 9% 12%, rgba(255,214,229,0.62), transparent 18%),
    radial-gradient(circle at 86% 9%, rgba(221,214,255,0.58), transparent 20%),
    radial-gradient(circle at 18% 82%, rgba(216,245,223,0.54), transparent 22%),
    radial-gradient(circle at 88% 77%, rgba(205,238,255,0.58), transparent 22%),
    linear-gradient(135deg,#fff8ed 0%,#fff2df 42%,#f8ecff 100%);
  background-attachment:fixed;
  position:relative;
}

/* Subtle aesthetic pattern overlay */
body::before{
  content:"";
  position:fixed;
  inset:0;
  z-index:0;
  pointer-events:none;
  opacity:.52;
  background-image:
    radial-gradient(circle at 16px 16px, rgba(255,255,255,.62) 0 4px, transparent 4.5px),
    radial-gradient(circle at 62px 44px, rgba(155,106,74,.055) 0 3px, transparent 3.5px);
  background-size:92px 92px;
}

body::after{
  content:"";
  position:fixed;
  right:26px;
  bottom:24px;
  width:150px;
  height:150px;
  border-radius:50%;
  pointer-events:none;
  z-index:0;
  opacity:.22;
  background:
    radial-gradient(circle at 50% 42%, rgba(255,255,255,.8) 0 24px, transparent 25px),
    radial-gradient(circle at 50% 55%, rgba(255,216,189,.8) 0 54px, transparent 55px);
  filter:blur(.2px);
}

body > *{
  position:relative;
  z-index:1;
}

/* Navigation */
nav{
  background:rgba(82,58,47,0.86) !important;
  backdrop-filter:blur(18px);
  -webkit-backdrop-filter:blur(18px);
  border-bottom:1px solid rgba(255,255,255,0.18);
  box-shadow:0 14px 32px rgba(71,48,37,0.17);
}

nav .brand{
  color:#fff8ed !important;
  font-size:1.13em !important;
  letter-spacing:.025em;
  padding:13px 10px 7px !important;
}


.nav-top{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:12px;
  padding:8px 14px 2px;
  position:relative;
}

.nav-top .brand{
  padding:0 !important;
  flex:0 1 auto;
}

.nav-music-btn{
  position:absolute;
  right:16px;
  top:50%;
  transform:translateY(-50%);
  border:none;
  border-radius:999px;
  padding:7px 12px;
  font-size:.78em;
  font-weight:800;
  cursor:pointer;
  background:rgba(255,253,247,0.18);
  color:#fffdf7;
  border:1px solid rgba(255,255,255,0.24);
  box-shadow:0 8px 18px rgba(71,48,37,0.12);
  white-space:nowrap;
}

.nav-music-btn:hover{
  filter:brightness(1.08);
  transform:translateY(calc(-50% - 1px));
}

.tab-bar{
  gap:9px !important;
  padding:9px 12px 13px !important;
}

.tab-btn{
  border-radius:999px !important;
  padding:10px 16px !important;
  font-size:.84em !important;
  color:#fffdf7 !important;
  box-shadow:0 8px 18px rgba(71,48,37,0.14) !important;
}

.tab-btn:hover{
  filter:brightness(1.08) !important;
  transform:translateY(-2px) !important;
}

.tab-btn.active{
  box-shadow:0 0 0 3px rgba(255,255,255,0.42),0 12px 24px rgba(0,0,0,0.15) !important;
}

/* Pastel nav button colours */
.t-home{background:#ff9fbd !important}
.t-ch1{background:#b69df2 !important}
.t-ch2{background:#83c7ec !important}
.t-ch3{background:#8fd9a8 !important}
.t-ch4{background:#ffb17a !important}
.t-ch5{background:#f0c96d !important}
.t-ch6{background:#d79aa3 !important}
.t-flash{background:#a79be8 !important}
.t-quiz{background:#ff8fa8 !important}

/* Containers */
.tab-content{
  max-width:1160px !important;
  padding:32px 22px 42px !important;
}

.card,
.acc,
.q-card,
.quiz-score{
  background:rgba(255,253,247,0.90) !important;
  border:1px solid var(--pastel-border) !important;
  border-radius:24px !important;
  box-shadow:var(--pastel-shadow) !important;
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
}

.card{
  padding:26px !important;
  margin:18px 0 !important;
}

/* Hero section */
.home-hero{
  position:relative;
  overflow:hidden;
  border-radius:34px !important;
  padding:48px 30px !important;
  text-align:center;
  box-shadow:var(--pastel-shadow-lg) !important;
  background:
    radial-gradient(circle at 15% 18%, rgba(255,255,255,0.25), transparent 23%),
    radial-gradient(circle at 82% 14%, rgba(255,255,255,0.18), transparent 26%),
    linear-gradient(135deg,#ff9fbd 0%,#b69df2 38%,#8ed8f8 72%,#ffd8bd 100%) !important;
}

.home-hero::before{
  content:"";
  position:absolute;
  width:260px;
  height:260px;
  right:-82px;
  bottom:-88px;
  border-radius:50%;
  background:rgba(255,255,255,0.16);
}

.home-hero::after{
  content:"";
  position:absolute;
  width:190px;
  height:190px;
  left:-60px;
  top:-62px;
  border-radius:50%;
  background:rgba(255,255,255,0.13);
}

.home-hero h1{
  color:#fffdf7 !important;
  font-size:2.35em !important;
  line-height:1.16 !important;
  margin-bottom:12px !important;
  text-shadow:0 3px 18px rgba(75,48,40,0.15);
}

.home-hero p{
  color:rgba(255,253,247,0.96) !important;
  font-size:1.05em !important;
}

.hero-chip{
  display:inline-block;
  margin-bottom:15px;
  padding:8px 16px;
  border-radius:999px;
  background:rgba(255,255,255,0.20);
  border:1px solid rgba(255,255,255,0.30);
  color:#fffdf7;
  font-size:.9em;
  font-weight:850;
  letter-spacing:.025em;
}

.hero-chip::before{
  content:"☕ ";
}

.hero-sub{
  max-width:820px;
  margin:0 auto 20px;
  font-size:1.07em !important;
}

.hero-stats{
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  gap:12px;
  margin:20px 0 15px;
}

.hero-stat{
  background:rgba(255,255,255,0.20);
  border:1px solid rgba(255,255,255,0.30);
  color:#fffdf7;
  padding:9px 15px;
  border-radius:999px;
  font-size:.9em;
  font-weight:850;
}

.hero-actions{
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  gap:13px;
  margin-top:20px;
}

.hero-btn{
  border:none;
  border-radius:999px;
  padding:12px 20px;
  font-weight:850;
  cursor:pointer;
  transition:all .2s ease;
  font-size:.96em;
}

.hero-btn:hover{
  transform:translateY(-2px);
  filter:brightness(1.04);
}

.hero-btn.primary{
  background:#fffdf7 !important;
  color:#7c4e66 !important;
}

.hero-btn.secondary{
  background:rgba(255,255,255,0.18) !important;
  color:#fffdf7 !important;
  border:1px solid rgba(255,255,255,0.30) !important;
}

/* Music panel */
.music-panel{
  max-width:790px;
  margin:22px auto 0;
  padding:16px 18px;
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  align-items:center;
  gap:14px;
  border-radius:24px;
  background:rgba(255,255,255,0.20);
  border:1px solid rgba(255,255,255,0.32);
  color:#fffdf7;
}

.music-text{
  text-align:left;
  line-height:1.42;
  flex:1 1 360px;
}

.music-text strong{
  display:block;
  font-size:1.08em;
  color:#fffdf7;
}

.music-text span{
  display:block;
  font-size:.95em;
  opacity:.94;
}

.music-btn{
  border:none;
  border-radius:999px;
  padding:12px 18px;
  cursor:pointer;
  font-weight:850;
  font-size:.95em;
  background:#fffdf7;
  color:#7c4e66;
  box-shadow:0 9px 20px rgba(71,48,37,0.16);
  transition:all .2s ease;
}

.music-btn:hover{
  transform:translateY(-2px);
}

/* Chapter headers */
.ch-header,
.quiz-hero{
  border-radius:28px !important;
  box-shadow:var(--pastel-shadow-lg) !important;
  color:#fffdf7 !important;
}

.ch-header{
  background:
    radial-gradient(circle at top right, rgba(255,255,255,0.20), transparent 28%),
    linear-gradient(135deg,#ff9fbd,#b69df2,#8ed8f8) !important;
  padding:32px 24px !important;
}

.ch-header h2{
  font-size:1.85em !important;
}

.ch-header p{
  font-size:1.02em !important;
  color:rgba(255,253,247,.96) !important;
}

.quiz-hero{
  background:
    radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 28%),
    linear-gradient(135deg,#ff8fa8,#b69df2,#8ed8f8) !important;
}

/* Accordion */
.acc{
  overflow:hidden;
}

.acc-head{
  background:linear-gradient(180deg,#fffdf7 0%,#fff1f6 100%) !important;
  color:#4a3a35 !important;
  padding:17px 20px !important;
  font-size:1.03em !important;
}

.acc-head:hover{
  background:linear-gradient(180deg,#fff7fb 0%,#f3efff 100%) !important;
}

.acc-body{
  background:#fffdf7 !important;
  color:#3f342e !important;
  padding:20px !important;
}

/* Typography */
h2{font-size:1.55em !important}
h3{font-size:1.22em !important}
h4{font-size:1.08em !important}
p,li,td{
  font-size:1.02em;
}

/* Tables */
.tbl,
.ctbl{
  border-collapse:separate !important;
  border-spacing:0 !important;
  overflow:hidden !important;
  border-radius:18px !important;
  border:1px solid rgba(155,106,74,0.16) !important;
}

.tbl th,
.ctbl th{
  background:#7c6bcf !important;
  color:#fffdf7 !important;
  font-size:.95em !important;
  letter-spacing:.01em;
}

.tbl td,
.ctbl td{
  background:#fffdf7 !important;
  border-bottom:1px solid rgba(155,106,74,0.13) !important;
  color:#3f342e !important;
}

.tbl tr:nth-child(even) td,
.ctbl tr:nth-child(even) td{
  background:#fff6ed !important;
}

.tbl tr:hover td{
  background:#f3efff !important;
}

/* Content boxes */
.concept-box{
  background:#f4f0ff !important;
  border-left:6px solid #b69df2 !important;
  border-radius:0 18px 18px 0 !important;
}

.analogy-box{
  background:#fff0f6 !important;
  border-left:6px solid #ff9fbd !important;
  border-radius:0 18px 18px 0 !important;
}

.tip-box{
  background:#effbf2 !important;
  border-left:6px solid #8fd9a8 !important;
  border-radius:0 18px 18px 0 !important;
}

.warning-box{
  background:#fff1e8 !important;
  border-left:6px solid #ffb17a !important;
  border-radius:0 18px 18px 0 !important;
}

.case-box{
  background:#edf8ff !important;
  border:2px solid #8ed8f8 !important;
  border-radius:18px !important;
}

.case-box h4{
  color:#4f74a5 !important;
}

.ex-box{
  background:#fff8df !important;
  border:2px dashed #f0c96d !important;
  border-radius:18px !important;
}

.ex-box h4{
  color:#9a722f !important;
}

/* Buttons */
.reveal-btn,
.fc-btn,
.qbtn{
  border-radius:999px !important;
  font-weight:850 !important;
  font-size:.95em !important;
  box-shadow:0 9px 20px rgba(126,88,120,0.16) !important;
}

.reveal-btn{
  background:#ff8fa8 !important;
  color:#fffdf7 !important;
}

.reveal-btn:hover{
  background:#ee7e9c !important;
}

.answer-box{
  background:#fffdf7 !important;
  border-left:5px solid #ff8fa8 !important;
  border-radius:14px !important;
}

/* Chapter cards */
.ch-grid{
  gap:18px !important;
  margin-top:20px !important;
  grid-template-columns:repeat(auto-fill,minmax(260px,1fr)) !important;
}

.ch-card{
  color:#fffdf7 !important;
  min-height:160px !important;
  border:none !important;
  border-radius:28px !important;
  box-shadow:var(--pastel-shadow) !important;
  position:relative;
  overflow:hidden;
  padding:24px !important;
}

.ch-card::before{
  content:"";
  position:absolute;
  inset:0;
  background:
    radial-gradient(circle at top right, rgba(255,255,255,0.20), transparent 32%),
    linear-gradient(180deg,rgba(255,255,255,0.10),transparent);
  pointer-events:none;
}

.ch-card::after{
  content:"→";
  position:absolute;
  right:20px;
  bottom:17px;
  font-size:1.35em;
  opacity:.78;
}

.ch-grid .ch-card:nth-child(1){background:linear-gradient(135deg,#ff9fbd,#ffb0c7) !important;}
.ch-grid .ch-card:nth-child(2){background:linear-gradient(135deg,#b69df2,#c7b8ff) !important;}
.ch-grid .ch-card:nth-child(3){background:linear-gradient(135deg,#8ed8f8,#acdff6) !important;}
.ch-grid .ch-card:nth-child(4){background:linear-gradient(135deg,#ffb17a,#ffc99f) !important;}
.ch-grid .ch-card:nth-child(5){background:linear-gradient(135deg,#8fd9a8,#b9edc8) !important;}
.ch-grid .ch-card:nth-child(6){background:linear-gradient(135deg,#d79aa3,#e8b3bd) !important;}
.ch-grid .ch-card:nth-child(7){background:linear-gradient(135deg,#a79be8,#c5bdf6) !important;}
.ch-grid .ch-card:nth-child(8){background:linear-gradient(135deg,#ff8fa8,#ffc0cb) !important;}

.ch-card h3{
  color:#fffdf7 !important;
  font-size:1.22em !important;
  margin-bottom:10px !important;
  text-shadow:0 2px 14px rgba(74,48,40,.13);
}

.ch-card p{
  color:rgba(255,253,247,0.96) !important;
  font-size:1.02em !important;
  line-height:1.6 !important;
  font-weight:650 !important;
}

/* Study path */
.study-plan h3{
  color:#4a3a35 !important;
  margin-bottom:16px !important;
}

.mini-steps{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
  gap:14px;
}

.mini-step{
  display:flex;
  gap:14px;
  align-items:flex-start;
  background:linear-gradient(180deg,#fffdf7 0%,#fff0f6 100%) !important;
  border:1px solid rgba(155,106,74,0.14) !important;
  border-radius:20px !important;
  padding:16px !important;
}

.mini-step-num{
  width:38px !important;
  height:38px !important;
  min-width:38px !important;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:850;
  background:linear-gradient(135deg,#ff8fa8,#b69df2) !important;
  color:#fffdf7 !important;
}

.mini-step p{
  color:#7f6c61 !important;
  margin:5px 0 0 !important;
  font-size:.98em !important;
}

.focus-note{
  margin-top:16px !important;
  padding:16px 18px !important;
  border-radius:18px !important;
  background:linear-gradient(90deg,#fff0f6,#f4f0ff,#edf8ff) !important;
  border:1px solid rgba(155,106,74,0.14) !important;
  color:#4a3a35 !important;
}

/* Flashcards */
.fc{
  height:260px !important;
}

.fc-front,
.fc-back{
  border-radius:24px !important;
  box-shadow:var(--pastel-shadow) !important;
}

.fc-front{
  background:linear-gradient(135deg,#ff9fbd,#b69df2,#8ed8f8) !important;
  color:#fffdf7 !important;
  font-size:1.02em !important;
}

.fc-back{
  background:linear-gradient(135deg,#8fd9a8,#8ed8f8,#c7b8ff) !important;
  color:#fffdf7 !important;
  font-size:.86em !important;
  line-height:1.55 !important;
}
  
.fc-btn{
  background:#b69df2 !important;
  color:#fffdf7 !important;
}

/* Quiz */
.q-card{
  padding:24px !important;
}

.q-text{
  font-size:1.08em !important;
}

.opt{
  border-radius:18px !important;
  padding:15px 18px !important;
  border:1.5px solid rgba(155,106,74,0.15) !important;
  background:#fffdf7 !important;
  color:#3f342e !important;
  box-shadow:0 6px 16px rgba(94,64,44,0.04) !important;
  font-size:1em !important;
}

.opt:hover:not(.locked){
  border-color:#b69df2 !important;
  background:#f4f0ff !important;
}

.opt-letter{
  width:32px !important;
  min-width:32px !important;
  height:32px !important;
  border:1.5px solid #b69df2 !important;
  color:#6b59ad !important;
}

.opt.correct{
  background:#effbf2 !important;
  border-color:#8fd9a8 !important;
}

.opt.correct .opt-letter{
  background:#8fd9a8 !important;
  border-color:#8fd9a8 !important;
  color:#fff !important;
}

.opt.wrong{
  background:#fff1e8 !important;
  border-color:#ff9fbd !important;
}

.opt.wrong .opt-letter{
  background:#ff9fbd !important;
  border-color:#ff9fbd !important;
  color:#fff !important;
}

.opt.show-correct{
  background:#effbf2 !important;
  border-color:#8fd9a8 !important;
}

.opt.show-correct .opt-letter{
  background:#8fd9a8 !important;
  border-color:#8fd9a8 !important;
  color:#fff !important;
}

.expl{
  background:#effbf2 !important;
  border-left:5px solid #8fd9a8 !important;
  border-radius:0 14px 14px 0 !important;
}

.q-fill{
  background:linear-gradient(90deg,#ff8fa8,#b69df2,#8ed8f8,#8fd9a8) !important;
}

.quiz-score{
  background:linear-gradient(135deg,#ff8fa8,#b69df2,#8ed8f8) !important;
  color:#fffdf7 !important;
}

/* Mobile */
@media(max-width:600px){
  body{
    font-size:16px;
  }
  .home-hero{
    padding:34px 20px !important;
  }
  .home-hero h1{
    font-size:1.7em !important;
  }
  .hero-actions,
  .music-panel{
    flex-direction:column;
    align-items:center;
  }
  .music-text{
    text-align:center;
  }
  .hero-btn,
  .music-btn{
    width:100%;
    max-width:300px;
  }

  .nav-top{
    padding:10px 12px 4px;
    justify-content:space-between;
  }

  .nav-top .brand{
    text-align:left !important;
    font-size:1em !important;
    padding-right:8px !important;
  }

  .nav-music-btn{
    position:static;
    transform:none;
    font-size:.72em;
    padding:7px 10px;
    flex-shrink:0;
  }

  .nav-music-btn:hover{
    transform:translateY(-1px);
  }
  .fc-grid,
  .ch-grid{
    grid-template-columns:1fr !important;
  }
  .ch-card{
    min-height:148px !important;
  }
}

/* ===== FINAL FIX: Larger and Clearer Chapter Cards ===== */
.ch-card{
  min-height:175px !important;
  padding:30px 28px !important;
  display:flex !important;
  flex-direction:column !important;
  justify-content:center !important;
}

.ch-card h3{
  font-size:1.55em !important;
  font-weight:900 !important;
  line-height:1.25 !important;
  margin-bottom:14px !important;
  color:#3f342e !important;
  text-shadow:none !important;
  position:relative !important;
  z-index:2 !important;
}

.ch-card p{
  font-size:1.16em !important;
  font-weight:750 !important;
  line-height:1.55 !important;
  color:#4d4038 !important;
  text-shadow:none !important;
  opacity:1 !important;
  position:relative !important;
  z-index:2 !important;
}

.ch-card::after{
  color:#3f342e !important;
  font-size:1.65em !important;
  font-weight:900 !important;
  opacity:.85 !important;
  right:24px !important;
  bottom:20px !important;
}

.ch-card::before{
  background:rgba(255,255,255,0.32) !important;
}

.ch-grid .ch-card:nth-child(1){
  background:linear-gradient(135deg,#ffd1df,#ff9fbd) !important;
}

.ch-grid .ch-card:nth-child(2){
  background:linear-gradient(135deg,#ddd6ff,#b69df2) !important;
}

.ch-grid .ch-card:nth-child(3){
  background:linear-gradient(135deg,#cdeeff,#8ed8f8) !important;
}

.ch-grid .ch-card:nth-child(4){
  background:linear-gradient(135deg,#ffd8bd,#ffb17a) !important;
}

.ch-grid .ch-card:nth-child(5){
  background:linear-gradient(135deg,#d8f5df,#8fd9a8) !important;
}

.ch-grid .ch-card:nth-child(6){
  background:linear-gradient(135deg,#f5c7cf,#d79aa3) !important;
}

.ch-grid .ch-card:nth-child(7){
  background:linear-gradient(135deg,#d8d2ff,#a79be8) !important;
}

.ch-grid .ch-card:nth-child(8){
  background:linear-gradient(135deg,#ffc0cb,#ff8fa8) !important;
}

@media(max-width:600px){
  .ch-card{
    min-height:160px !important;
    padding:24px 22px !important;
  }

  .ch-card h3{
    font-size:1.35em !important;
  }

  .ch-card p{
    font-size:1.05em !important;
  }
}

/* ===== FINAL FIX: Rearranged Neutral Pastel Study Cafe Home ===== */

body{
  background:
    radial-gradient(circle at 10% 12%, rgba(221,214,255,0.42), transparent 20%),
    radial-gradient(circle at 88% 12%, rgba(205,238,255,0.38), transparent 22%),
    radial-gradient(circle at 18% 82%, rgba(216,245,223,0.30), transparent 20%),
    radial-gradient(circle at 92% 86%, rgba(255,240,184,0.26), transparent 22%),
    linear-gradient(135deg,#fbf6ef 0%,#f4efe8 46%,#eef4f8 100%) !important;
  color:#3f342e !important;
}

body::before{
  opacity:.28 !important;
}

nav{
  background:rgba(74,61,54,0.88) !important;
}

.t-home{background:#8d7cb8 !important}
.t-ch1{background:#7f9fc4 !important}
.t-ch2{background:#8aa6c2 !important}
.t-ch3{background:#88a89a !important}
.t-ch4{background:#d0a07a !important}
.t-ch5{background:#9ea986 !important}
.t-ch6{background:#b8948d !important}
.t-flash{background:#a093cb !important}
.t-quiz{background:#c58f77 !important}

.neutral-hero{
  padding:24px !important;
  text-align:left !important;
  background:
    linear-gradient(135deg, rgba(234,227,245,0.92) 0%, rgba(228,237,246,0.92) 55%, rgba(239,244,238,0.92) 100%) !important;
  color:#3f342e !important;
  border-radius:34px !important;
  box-shadow:0 22px 48px rgba(82,66,52,0.10) !important;
}

.neutral-hero::before,
.neutral-hero::after{
  display:none !important;
}

.top-strip-card,
.hero-intro-card,
.hero-tools-card{
  background:rgba(255,252,247,0.82) !important;
  border:1px solid rgba(181,158,140,0.18) !important;
  box-shadow:0 16px 34px rgba(82,66,52,0.08) !important;
  backdrop-filter:blur(14px);
  -webkit-backdrop-filter:blur(14px);
}

.top-strip-card{
  border-radius:28px;
  padding:18px 24px;
  margin-bottom:18px;
}

.strip-label{
  text-transform:uppercase;
  letter-spacing:.16em;
  font-size:.86em;
  color:#8a7569;
  font-weight:900;
  margin-bottom:6px;
}

.strip-title{
  color:#3f342e;
  font-size:1.22em;
  font-weight:950;
  letter-spacing:.04em;
  margin-bottom:14px;
}

.joyful-title{
  color:#6f5b47;
  font-size:1.18em;
  letter-spacing:.02em;
}

.strip-subtext{
  color:#6d5c52;
  font-size:.98em;
  line-height:1.55;
}

.team-strip-card{
  text-align:center;
}

.team-strip-card .strip-title{
  margin-bottom:16px;
}

.team-members{
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  gap:10px;
}

.team-members span{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:9px 16px;
  border-radius:999px;
  background:#fffdf8;
  border:1px solid rgba(181,158,140,0.18);
  color:#5f5149;
  font-size:.92em;
  font-weight:850;
}

.music-strip-card{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:18px;
}

.music-strip-left{
  flex:1 1 auto;
}

.music-strip-right{
  flex:0 0 auto;
}

.music-strip-card .music-btn{
  min-width:160px;
  padding:12px 18px !important;
  border-radius:999px !important;
  border:1px solid rgba(181,158,140,0.18) !important;
  background:linear-gradient(135deg,#efe0b1,#f2ceb0) !important;
  color:#5a4032 !important;
  font-size:.96em !important;
  font-weight:900 !important;
  box-shadow:0 8px 20px rgba(82,66,52,0.08) !important;
}

.music-strip-card .music-btn:hover{
  transform:translateY(-2px);
}

.neutral-main-grid{
  display:grid;
  grid-template-columns:minmax(0,1.25fr) minmax(320px,.75fr);
  gap:22px;
  align-items:stretch;
}

.hero-intro-card{
  border-radius:30px;
  padding:30px 30px 28px !important;
}

.hero-tools-card{
  border-radius:30px;
  padding:28px !important;
}

.neutral-hero .hero-chip{
  background:#fffdf8 !important;
  border:1px solid rgba(181,158,140,0.18) !important;
  color:#6f5b47 !important;
  box-shadow:0 8px 18px rgba(82,66,52,0.05) !important;
  margin-bottom:18px !important;
  font-size:.9em !important;
  text-shadow:none !important;
}

.neutral-hero .hero-chip::before{
  content:"" !important;
}

.neutral-hero h1{
  color:#3f342e !important;
  font-size:2.28em !important;
  line-height:1.12 !important;
  margin:0 0 18px !important;
  text-shadow:none !important;
  letter-spacing:-.02em;
}

.neutral-hero .hero-sub{
  color:#5f5149 !important;
  font-size:1.08em !important;
  line-height:1.68 !important;
  font-weight:650;
  max-width:820px;
  margin:0 0 22px !important;
}

.neutral-hero .hero-actions{
  justify-content:flex-start !important;
  gap:12px !important;
}

.neutral-hero .hero-btn{
  font-size:1em !important;
  padding:13px 20px !important;
}

.neutral-hero .hero-btn.primary{
  background:linear-gradient(135deg,#8d7cb8,#7f9fc4) !important;
  color:#fffdf8 !important;
  box-shadow:0 10px 22px rgba(88,83,132,0.18) !important;
}

.neutral-hero .hero-btn.secondary{
  background:#fffdf8 !important;
  color:#66574c !important;
  border:1px solid rgba(181,158,140,0.18) !important;
  box-shadow:0 8px 18px rgba(82,66,52,0.05) !important;
}

.hero-tools-card h2{
  color:#3f342e !important;
  font-size:1.42em !important;
  margin:0 0 6px !important;
}

.hero-tools-card p{
  color:#6d5c52 !important;
  margin:0 0 16px !important;
}

.clean-stats{
  display:grid !important;
  grid-template-columns:1fr !important;
  gap:12px !important;
  margin:0 !important;
}

.clean-stats .hero-stat{
  width:100%;
  display:flex !important;
  align-items:center;
  gap:12px;
  text-align:left;
  padding:14px 15px !important;
  border-radius:18px !important;
  background:#fffdf8 !important;
  border:1px solid rgba(181,158,140,0.18) !important;
  color:#3f342e !important;
  cursor:pointer;
  box-shadow:0 8px 18px rgba(82,66,52,0.05);
}

.clean-stats .hero-stat:hover{
  transform:translateY(-2px);
  background:#f8f5ef !important;
}

.stat-icon{
  width:40px;
  height:40px;
  border-radius:14px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:linear-gradient(135deg,#ece3d3,#dbe7ef);
  font-size:1.18em;
}

.clean-stats .hero-stat strong{
  display:block;
  color:#3f342e;
  font-size:1.02em;
  line-height:1.2;
}

.clean-stats .hero-stat small{
  display:block;
  color:#7f6c61;
  font-size:.86em;
  margin-top:3px;
}

/* Neutralise the chapter cards too */
.ch-card{
  border-radius:26px !important;
}

.ch-grid .ch-card:nth-child(1){background:linear-gradient(135deg,#b9c9dd,#89a6c1) !important;}
.ch-grid .ch-card:nth-child(2){background:linear-gradient(135deg,#c7d3df,#9eb1c5) !important;}
.ch-grid .ch-card:nth-child(3){background:linear-gradient(135deg,#b8d0c5,#8ea89e) !important;}
.ch-grid .ch-card:nth-child(4){background:linear-gradient(135deg,#efd2b9,#d7a47d) !important;}
.ch-grid .ch-card:nth-child(5){background:linear-gradient(135deg,#d6dfc8,#a5b08f) !important;}
.ch-grid .ch-card:nth-child(6){background:linear-gradient(135deg,#d9c6c0,#b6948d) !important;}
.ch-grid .ch-card:nth-child(7){background:linear-gradient(135deg,#d4ccdf,#a093cb) !important;}
.ch-grid .ch-card:nth-child(8){background:linear-gradient(135deg,#e6d2c2,#c58f77) !important;}

.ch-card h3{
  color:#3f342e !important;
}

.ch-card p{
  color:#4f433b !important;
}

.ch-card::after{
  color:#4b4038 !important;
}

@media(max-width:900px){
  .music-strip-card{
    flex-direction:column;
    align-items:flex-start;
  }

  .music-strip-right{
    width:100%;
  }

  .music-strip-card .music-btn{
    width:100%;
  }

  .neutral-main-grid{
    grid-template-columns:1fr;
  }
}

@media(max-width:600px){
  .neutral-hero{
    padding:18px !important;
  }

  .top-strip-card,
  .hero-intro-card,
  .hero-tools-card{
    padding:20px !important;
    border-radius:24px;
  }

  .team-members{
    flex-direction:column;
    align-items:stretch;
  }

  .team-members span{
    width:100%;
  }

  .neutral-hero h1{
    font-size:1.68em !important;
  }

  .neutral-hero .hero-sub{
    font-size:1em !important;
  }

  .neutral-hero .hero-actions{
    justify-content:center !important;
  }

  .neutral-hero .hero-btn{
    width:100%;
  }
}

/* ===== FINAL STRUCTURE FIX: Home Content Stays on Home, Chapters Stay Separate ===== */

/* Keep the top navigation visible on all pages */
nav{
  display:block !important;
  position:sticky !important;
  top:0;
  z-index:1000;
}

/* This is the critical tab separation rule */
.tab-content{
  display:none !important;
}

.tab-content.active{
  display:block !important;
}

/* Home content only displays when #home has active */
#home:not(.active){
  display:none !important;
}

#home.active{
  display:block !important;
}

/* Chapter/Flashcard/Quiz pages only display when active */
#ch1:not(.active),
#ch2:not(.active),
#ch3:not(.active),
#ch4:not(.active),
#ch5:not(.active),
#ch6:not(.active),
#flashcards:not(.active),
#quiz:not(.active){
  display:none !important;
}

#ch1.active,
#ch2.active,
#ch3.active,
#ch4.active,
#ch5.active,
#ch6.active,
#flashcards.active,
#quiz.active{
  display:block !important;
}

/* Add clean spacing below the fixed/sticky navigation */
#ch1, #ch2, #ch3, #ch4, #ch5, #ch6, #flashcards, #quiz{
  padding-top:28px !important;
}

/* ===== FINAL PATCH: Keep Provided Home Unchanged + Latest Other Page Fixes ===== */

/* Strict page separation */
.tab-content{
  display:none !important;
}

.tab-content.active{
  display:block !important;
}

#home:not(.active),
#ch1:not(.active),
#ch2:not(.active),
#ch3:not(.active),
#ch4:not(.active),
#ch5:not(.active),
#ch6:not(.active),
#flashcards:not(.active),
#quiz:not(.active){
  display:none !important;
}

#home.active,
#ch1.active,
#ch2.active,
#ch3.active,
#ch4.active,
#ch5.active,
#ch6.active,
#flashcards.active,
#quiz.active{
  display:block !important;
}

/* Keep top navigation visible */
nav{
  display:block !important;
  position:sticky !important;
  top:0;
  z-index:1000;
}

/* Chapter 1–6 title banners: neutral / professional */
#ch1 .ch-header{
  background:linear-gradient(135deg,#4f647a,#7d9ab8) !important;
}
#ch2 .ch-header{
  background:linear-gradient(135deg,#365b78,#6f8fac) !important;
}
#ch3 .ch-header{
  background:linear-gradient(135deg,#55786c,#85a398) !important;
}
#ch4 .ch-header{
  background:linear-gradient(135deg,#8f6b4f,#c49a76) !important;
}
#ch5 .ch-header{
  background:linear-gradient(135deg,#69765c,#98a486) !important;
}
#ch6 .ch-header{
  background:linear-gradient(135deg,#785f5a,#ad8d86) !important;
}

#ch1 .ch-header h2,
#ch2 .ch-header h2,
#ch3 .ch-header h2,
#ch4 .ch-header h2,
#ch5 .ch-header h2,
#ch6 .ch-header h2,
#ch1 .ch-header p,
#ch2 .ch-header p,
#ch3 .ch-header p,
#ch4 .ch-header p,
#ch5 .ch-header p,
#ch6 .ch-header p{
  color:#fffaf2 !important;
  text-shadow:0 2px 12px rgba(40,30,24,0.18) !important;
}

/* Quiz banner: neutral / professional */
#quiz .quiz-hero{
  background:
    radial-gradient(circle at top right, rgba(255,255,255,0.14), transparent 28%),
    linear-gradient(135deg,#5f6374,#7f8fa3,#b2947a) !important;
  color:#fffaf2 !important;
  box-shadow:0 20px 45px rgba(82,66,52,0.12) !important;
}

#quiz .quiz-hero h2,
#quiz .quiz-hero p{
  color:#fffaf2 !important;
  text-shadow:0 2px 12px rgba(40,30,24,0.18) !important;
}

/* Flashcards: muted professional colours, not too bright */
#flashcards .quiz-hero,
#flashcards .ch-header{
  background:
    radial-gradient(circle at top right, rgba(255,255,255,0.14), transparent 28%),
    linear-gradient(135deg,#5e6f82,#8d7f9f,#9cae9a) !important;
  color:#fffaf2 !important;
}

#flashcards .fc:nth-child(6n+1) .fc-front{background:linear-gradient(135deg,#536879,#7f98aa) !important;}
#flashcards .fc:nth-child(6n+2) .fc-front{background:linear-gradient(135deg,#5f786d,#8aa196) !important;}
#flashcards .fc:nth-child(6n+3) .fc-front{background:linear-gradient(135deg,#7a6d8f,#9a8eb1) !important;}
#flashcards .fc:nth-child(6n+4) .fc-front{background:linear-gradient(135deg,#8b715d,#b39478) !important;}
#flashcards .fc:nth-child(6n+5) .fc-front{background:linear-gradient(135deg,#67745a,#98a486) !important;}
#flashcards .fc:nth-child(6n+6) .fc-front{background:linear-gradient(135deg,#7a6260,#aa8d89) !important;}

#flashcards .fc:nth-child(6n+1) .fc-back{background:linear-gradient(135deg,#425363,#6d8495) !important;}
#flashcards .fc:nth-child(6n+2) .fc-back{background:linear-gradient(135deg,#4c635a,#788f84) !important;}
#flashcards .fc:nth-child(6n+3) .fc-back{background:linear-gradient(135deg,#5f5574,#84799a) !important;}
#flashcards .fc:nth-child(6n+4) .fc-back{background:linear-gradient(135deg,#705a49,#977b62) !important;}
#flashcards .fc:nth-child(6n+5) .fc-back{background:linear-gradient(135deg,#515c48,#7d896d) !important;}
#flashcards .fc:nth-child(6n+6) .fc-back{background:linear-gradient(135deg,#624f4d,#8b7471) !important;}

#flashcards .fc-front,
#flashcards .fc-back{
  color:#fffaf2 !important;
  text-shadow:0 2px 10px rgba(30,24,20,0.18) !important;
}

#flashcards .fc-btn{
  background:#8d7f9f !important;
  color:#fffaf2 !important;
  box-shadow:0 8px 18px rgba(82,66,52,0.10) !important;
}

#flashcards .fc-btn:hover{
  background:#746985 !important;
}

/* ===== FINAL STRICT FIX: Home Content Only on Home, Chapters Only Their Own Content ===== */

/* Only the selected tab is visible */
.tab-content{
  display:none !important;
}

.tab-content.active{
  display:block !important;
}

/* Home, chapter, flashcard, and quiz pages are fully separated */
#home:not(.active),
#ch1:not(.active),
#ch2:not(.active),
#ch3:not(.active),
#ch4:not(.active),
#ch5:not(.active),
#ch6:not(.active),
#flashcards:not(.active),
#quiz:not(.active){
  display:none !important;
}

#home.active,
#ch1.active,
#ch2.active,
#ch3.active,
#ch4.active,
#ch5.active,
#ch6.active,
#flashcards.active,
#quiz.active{
  display:block !important;
}

/* Home-only items stay hidden when any non-home page is active */
#ch1 .ch-grid,
#ch2 .ch-grid,
#ch3 .ch-grid,
#ch4 .ch-grid,
#ch5 .ch-grid,
#ch6 .ch-grid,
#flashcards .ch-grid,
#quiz .ch-grid,
#ch1 .study-plan,
#ch2 .study-plan,
#ch3 .study-plan,
#ch4 .study-plan,
#ch5 .study-plan,
#ch6 .study-plan,
#flashcards .study-plan,
#quiz .study-plan{
  display:none !important;
}

/* Top navigation remains available on every page */
nav{
  display:block !important;
  position:sticky !important;
  top:0;
  z-index:1000;
}

/* ===== FINAL ONLY FIX: Separate Home from Other Pages, Home Design Unchanged ===== */
.tab-content{
  display:none !important;
}

.tab-content.active{
  display:block !important;
}

#home:not(.active),
#ch1:not(.active),
#ch2:not(.active),
#ch3:not(.active),
#ch4:not(.active),
#ch5:not(.active),
#ch6:not(.active),
#flashcards:not(.active),
#quiz:not(.active){
  display:none !important;
}

#home.active,
#ch1.active,
#ch2.active,
#ch3.active,
#ch4.active,
#ch5.active,
#ch6.active,
#flashcards.active,
#quiz.active{
  display:block !important;
}

/* Defensive only: Home-only sections must not display inside non-Home tabs */
#ch1 .ch-grid, #ch2 .ch-grid, #ch3 .ch-grid, #ch4 .ch-grid, #ch5 .ch-grid, #ch6 .ch-grid,
#flashcards .ch-grid, #quiz .ch-grid,
#ch1 .study-plan, #ch2 .study-plan, #ch3 .study-plan, #ch4 .study-plan, #ch5 .study-plan, #ch6 .study-plan,
#flashcards .study-plan, #quiz .study-plan{
  display:none !important;
}

/* Keep top navigation usable */
nav{
  display:block !important;
  position:sticky !important;
  top:0;
  z-index:1000;
}

/* ===== FINAL FIX: Keep Chapter Pages Visible, Hide Only Home Blocks ===== */

/* Basic tab switching */
.tab-content{
  display:none !important;
}

.tab-content.active{
  display:block !important;
}

/* Keep navigation usable */
nav{
  display:block !important;
  position:sticky !important;
  top:0;
  z-index:1000;
}

/* Hide ONLY Home-specific sections if they accidentally appear inside Chapter 1–6 */
#ch1 .home-hero, #ch2 .home-hero, #ch3 .home-hero, #ch4 .home-hero, #ch5 .home-hero, #ch6 .home-hero,
#ch1 .neutral-hero, #ch2 .neutral-hero, #ch3 .neutral-hero, #ch4 .neutral-hero, #ch5 .neutral-hero, #ch6 .neutral-hero,
#ch1 .team-strip-card, #ch2 .team-strip-card, #ch3 .team-strip-card, #ch4 .team-strip-card, #ch5 .team-strip-card, #ch6 .team-strip-card,
#ch1 .music-strip-card, #ch2 .music-strip-card, #ch3 .music-strip-card, #ch4 .music-strip-card, #ch5 .music-strip-card, #ch6 .music-strip-card,
#ch1 .hero-main-grid, #ch2 .hero-main-grid, #ch3 .hero-main-grid, #ch4 .hero-main-grid, #ch5 .hero-main-grid, #ch6 .hero-main-grid,
#ch1 .hero-intro-card, #ch2 .hero-intro-card, #ch3 .hero-intro-card, #ch4 .hero-intro-card, #ch5 .hero-intro-card, #ch6 .hero-intro-card,
#ch1 .hero-tools-card, #ch2 .hero-tools-card, #ch3 .hero-tools-card, #ch4 .hero-tools-card, #ch5 .hero-tools-card, #ch6 .hero-tools-card,
#ch1 .study-plan, #ch2 .study-plan, #ch3 .study-plan, #ch4 .study-plan, #ch5 .study-plan, #ch6 .study-plan,
#ch1 .ch-grid, #ch2 .ch-grid, #ch3 .ch-grid, #ch4 .ch-grid, #ch5 .ch-grid, #ch6 .ch-grid{
  display:none !important;
}

/* Hide Home-specific sections if they accidentally appear inside Flashcards or Quiz */
#flashcards .home-hero, #flashcards .neutral-hero, #flashcards .team-strip-card, #flashcards .music-strip-card,
#flashcards .hero-main-grid, #flashcards .hero-intro-card, #flashcards .hero-tools-card, #flashcards .study-plan, #flashcards .ch-grid,
#quiz .home-hero, #quiz .neutral-hero, #quiz .team-strip-card, #quiz .music-strip-card,
#quiz .hero-main-grid, #quiz .hero-intro-card, #quiz .hero-tools-card, #quiz .study-plan, #quiz .ch-grid{
  display:none !important;
}

/* Hide Exam Quick Facts only if it is inside a non-Home page */
#ch1 .exam-quick-facts, #ch2 .exam-quick-facts, #ch3 .exam-quick-facts, #ch4 .exam-quick-facts, #ch5 .exam-quick-facts, #ch6 .exam-quick-facts,
#flashcards .exam-quick-facts, #quiz .exam-quick-facts{
  display:none !important;
}


/* ===== END-OF-CHAPTER QUIZ BANNER COLOURS ===== */
.chapter-end-quiz .quiz-hero{
  color:#fffaf2 !important;
  box-shadow:0 20px 45px rgba(82,66,52,0.12) !important;
}

.chapter-end-quiz.ch1 .quiz-hero{
  background:
    radial-gradient(circle at top right, rgba(255,255,255,0.14), transparent 28%),
    linear-gradient(135deg,#4f647a,#7d9ab8) !important;
}
.chapter-end-quiz.ch2 .quiz-hero{
  background:
    radial-gradient(circle at top right, rgba(255,255,255,0.14), transparent 28%),
    linear-gradient(135deg,#365b78,#6f8fac) !important;
}
.chapter-end-quiz.ch3 .quiz-hero{
  background:
    radial-gradient(circle at top right, rgba(255,255,255,0.14), transparent 28%),
    linear-gradient(135deg,#55786c,#85a398) !important;
}
.chapter-end-quiz.ch4 .quiz-hero{
  background:
    radial-gradient(circle at top right, rgba(255,255,255,0.14), transparent 28%),
    linear-gradient(135deg,#8f6b4f,#c49a76) !important;
}
.chapter-end-quiz.ch5 .quiz-hero{
  background:
    radial-gradient(circle at top right, rgba(255,255,255,0.14), transparent 28%),
    linear-gradient(135deg,#69765c,#98a486) !important;
}
.chapter-end-quiz.ch6 .quiz-hero{
  background:
    radial-gradient(circle at top right, rgba(255,255,255,0.14), transparent 28%),
    linear-gradient(135deg,#785f5a,#ad8d86) !important;
}

.chapter-end-quiz .quiz-hero h2,
.chapter-end-quiz .quiz-hero p{
  color:#fffaf2 !important;
  text-shadow:0 2px 12px rgba(40,30,24,0.18) !important;
}


/* ===== LANGUAGE TOGGLE: English / Mandarin ===== */
.lang-toggle-btn{
  position:absolute;
  right:142px;
  top:50%;
  transform:translateY(-50%);
  border:none;
  border-radius:999px;
  padding:7px 12px;
  font-size:.78em;
  font-weight:850;
  cursor:pointer;
  background:rgba(255,253,247,0.18);
  color:#fffdf7;
  border:1px solid rgba(255,255,255,0.24);
  box-shadow:0 8px 18px rgba(71,48,37,0.12);
  white-space:nowrap;
}
.lang-toggle-btn:hover{
  filter:brightness(1.08);
  transform:translateY(calc(-50% - 1px));
}
#google_translate_element{
  position:absolute;
  width:1px;
  height:1px;
  overflow:hidden;
  opacity:0;
  pointer-events:none;
}
.goog-te-banner-frame.skiptranslate,
.goog-te-gadget-icon,
.goog-logo-link,
.goog-te-gadget span{
  display:none !important;
}
body{
  top:0 !important;
}
iframe.goog-te-banner-frame{
  display:none !important;
}
@media(max-width:600px){
  .lang-toggle-btn{
    position:static;
    transform:none;
    font-size:.72em;
    padding:7px 10px;
    flex-shrink:0;
  }
  .lang-toggle-btn:hover{
    transform:translateY(-1px);
  }
}
`;

  function injectStyles() {
    var style = document.createElement('style');
    style.id = 'cacs-style';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  /* ---------- 3. Inject body HTML ---------- */
  var BODY_HTML = `<nav>
  <div class="nav-top">
    <div class="brand">🎓 CACS Paper 1 – Interactive Study Guide</div>
    <button class="lang-toggle-btn notranslate" id="languageToggleBtn" translate="no" onclick="toggleSiteLanguage()">🌐 中文</button>
    <button class="nav-music-btn music-control notranslate" id="globalMusicBtn" translate="no" onclick="toggleCafeMusic()">🎧 ▶ Music</button>
  </div>
  <div id="google_translate_element" class="notranslate" translate="no"></div>
  <audio id="cafeAudio" loop preload="none">
    <source src="focus-piano.mp3" type="audio/mpeg">
  </audio>
  <div class="tab-bar">
    <button class="tab-btn t-home active" onclick="showTab('home')">🏠 Home</button>
    <button class="tab-btn t-ch1" onclick="showTab('ch1')">Ch 1 – Wealth Mgmt</button>
    <button class="tab-btn t-ch2" onclick="showTab('ch2')">Ch 2 – PB Code</button>
    <button class="tab-btn t-ch3" onclick="showTab('ch3')">Ch 3 – Due Diligence</button>
    <button class="tab-btn t-ch4" onclick="showTab('ch4')">Ch 4 – Advisory</button>
    <button class="tab-btn t-ch5" onclick="showTab('ch5')">Ch 5 – Wealth Planning</button>
    <button class="tab-btn t-ch6" onclick="showTab('ch6')">Ch 6 – Ethics</button>
    <button class="tab-btn t-flash" onclick="showTab('flashcards')">🃏 Flashcards</button>
    <button class="tab-btn t-quiz" onclick="showTab('quiz')">📝 Quiz (50 Qs)</button>
  </div>
</nav>

<!-- HOME -->
<div id="home" class="tab-content active">
  <div class="home-hero neutral-hero">
    <div class="top-strip-card team-strip-card notranslate" translate="no">
      <div class="strip-label">Designed by</div>
      <div class="strip-title">GROUP 2</div>
      <div class="team-members">
        <span>ALLURI KANISH</span>
        <span>LIEW YAN XUAN</span>
        <span>NICOL ANAK ROLAND NGABONG</span>
        <span>RAJKUMAR RHENIUS</span>
      </div>
    </div>

    <div class="top-strip-card music-strip-card">
      <div class="music-strip-left">
        <div class="strip-label">Focus music</div>
        <div class="strip-title joyful-title">Soft piano for calm revision ☕</div>
        <div class="strip-subtext">A gentle study companion to help you stay focused, relaxed, and motivated.</div>
      </div>
      <div class="music-strip-right">
        <button class="music-btn music-control" id="homeMusicBtn" onclick="toggleCafeMusic()">▶ Play music</button>
      </div>
    </div>

    <div class="hero-main-grid neutral-main-grid">
      <div class="hero-intro-card">
        <div class="hero-chip">📖 Study now, shine later • small steps every day build big results</div>
        <h1>🏦 CACS Paper 1 Interactive Study Guide</h1>
        <p class="hero-sub">
          A structured revision hub for CACS Paper 1 — organised by chapter, supported with flashcards,
          quiz practice, and simple study tools to keep learning focused and enjoyable.
        </p>

        <div class="hero-actions">
          <button class="hero-btn primary" onclick="showTab('ch1')">Start Studying</button>
          <button class="hero-btn secondary" onclick="showTab('flashcards')">Open Flashcards</button>
          <button class="hero-btn secondary" onclick="showTab('quiz')">Try Practice Quiz</button>
        </div>
      </div>

      <div class="hero-tools-card">
        <h2>📚 Study Toolkit</h2>
        <p>Choose what you need for today’s revision.</p>

        <div class="hero-stats clean-stats">
          <button class="hero-stat" onclick="showTab('ch1')">
            <span class="stat-icon">📘</span>
            <span><strong>6 Chapters</strong><small>Structured notes</small></span>
          </button>
          <button class="hero-stat" onclick="showTab('flashcards')">
            <span class="stat-icon">🃏</span>
            <span><strong>50 Flashcards</strong><small>Quick memory check</small></span>
          </button>
          <button class="hero-stat" onclick="showTab('quiz')">
            <span class="stat-icon">📝</span>
            <span><strong>50 Quiz Questions</strong><small>Exam practice</small></span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="card study-plan">
    <h3>🗺️ Suggested Study Path</h3>
    <div class="mini-steps">
      <div class="mini-step">
        <div class="mini-step-num">1</div>
        <div>
          <strong>Learn the chapter</strong>
          <p>Read one chapter at a time and focus on the key laws, concepts, and examples.</p>
        </div>
      </div>

      <div class="mini-step">
        <div class="mini-step-num">2</div>
        <div>
          <strong>Test yourself quickly</strong>
          <p>Use the flashcards after each chapter to strengthen memory and reinforce key terms.</p>
        </div>
      </div>

      <div class="mini-step">
        <div class="mini-step-num">3</div>
        <div>
          <strong>Practice exam questions</strong>
          <p>Finish with the quiz to check understanding and identify weak areas before the exam.</p>
        </div>
      </div>
    </div>

    <div class="focus-note">
      💡 <strong>Study Tip:</strong> Aim to complete 1 chapter + 10 flashcards + 5 quiz questions each session.
    </div>
  </div>
  <div class="ch-grid">
    <button class="ch-card" style="background:linear-gradient(135deg,#7c3aed,#4f46e5)" onclick="showTab('ch1')"><h3>📊 Chapter 1</h3><p>Wealth Management overview, key laws, market misconduct, client types, AI status</p></button>
    <button class="ch-card" style="background:linear-gradient(135deg,#1d4ed8,#0369a1)" onclick="showTab('ch2')"><h3>📋 Chapter 2</h3><p>Private Banking Code of Conduct — CPD, mis-selling examples, disclosure rules</p></button>
    <button class="ch-card" style="background:linear-gradient(135deg,#0d9488,#0284c7)" onclick="showTab('ch3')"><h3>🔍 Chapter 3</h3><p>Client Due Diligence — KYC, AML/CFT, money laundering, PEPs, STR, CRS/FATCA</p></button>
    <button class="ch-card" style="background:linear-gradient(135deg,#c2410c,#d97706)" onclick="showTab('ch4')"><h3>💼 Chapter 4</h3><p>Client Advisory — account types, SIPs, SGX trading, suitability, record keeping</p></button>
    <button class="ch-card" style="background:linear-gradient(135deg,#15803d,#0d9488)" onclick="showTab('ch5')"><h3>🏛️ Chapter 5</h3><p>Wealth Planning — trusts, foundations, wills, life insurance, PICs, family offices</p></button>
    <button class="ch-card" style="background:linear-gradient(135deg,#b91c1c,#be185d)" onclick="showTab('ch6')"><h3>⚖️ Chapter 6</h3><p>Ethical Conduct — ethics vs compliance, fiduciary duty, conflicts of interest</p></button>
    <button class="ch-card" style="background:linear-gradient(135deg,#6d28d9,#4f46e5)" onclick="showTab('flashcards')"><h3>🃏 Flashcards (50)</h3><p>Flip cards to test key definitions and concepts from all chapters</p></button>
    <button class="ch-card" style="background:linear-gradient(135deg,#be185d,#9333ea)" onclick="showTab('quiz')"><h3>📝 Practice Quiz (50 Qs)</h3><p>All 50 official review questions with answers and explanations!</p></button>
  </div>
  <div class="card exam-quick-facts">
    <h3>📌 Exam Quick Facts</h3>
    <table class="tbl">
      <tr><th>Item</th><th>Detail</th></tr>
      <tr><td>Exam</td><td>CACS Paper 1 – Legislations, Regulations &amp; Industry Codes of Practice</td></tr>
      <tr><td>Administered by</td><td>IBF (Institute of Banking &amp; Finance), Singapore</td></tr>
      <tr><td>Key Regulator</td><td>MAS (Monetary Authority of Singapore)</td></tr>
      <tr><td>CPD Requirement</td><td>Minimum <strong>15 hours per year</strong></td></tr>
      <tr><td>Record Keeping</td><td>Minimum <strong>5 years</strong></td></tr>
      <tr><td>Settlement (SGX)</td><td><strong>T+2</strong> (trade date + 2 business days)</td></tr>
      <tr><td>Large Cash Threshold</td><td><strong>S$20,000</strong> triggers enhanced AML scrutiny</td></tr>
      <tr><td>AI opt-in</td><td>Eligible investors must actively <strong>opt in</strong> to AI status</td></tr>
    </table>
  </div>
</div>

<!-- CHAPTER 1 -->
<div id="ch1" class="tab-content">
  <div class="ch-header" style="background:linear-gradient(135deg,#7c3aed,#4f46e5)">
    <h2>📊 Chapter 1: Overview of Wealth Management</h2>
    <p>Learn who manages wealth, what laws govern them, types of banks, market misconduct, and client categories.</p>
  </div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">💡 1.1 What is Wealth Management? <span class="arr">▼</span></div>
  <div class="acc-body">
    <p>Wealth management combines <strong>financial planning, investment management, tax planning, and estate planning</strong> into a holistic service for wealthy clients and their families.</p>
    <div class="analogy-box"><div class="icon-lbl">🍕 Analogy</div><p>Regular banking = ordering from a menu. Wealth management = having a personal chef who designs everything — investments, tax, insurance, succession — just for you.</p></div>
    <h4>Key Laws Governing Wealth Management in Singapore</h4>
    <table class="tbl">
      <tr><th>Law</th><th>What it Covers</th></tr>
      <tr><td><strong>Securities &amp; Futures Act (SFA)</strong></td><td>Capital markets, securities trading, market misconduct, licensing dealers &amp; advisers</td></tr>
      <tr><td><strong>Financial Advisers Act (FAA)</strong></td><td>Financial advisers giving investment advice or arranging investment products</td></tr>
      <tr><td><strong>Banking Act</strong></td><td>Banks — deposits, lending, conduct of business</td></tr>
      <tr><td><strong>Trust Companies Act (TCA)</strong></td><td>Trust services in Singapore — requires a trust business licence</td></tr>
      <tr><td><strong>Insurance Act</strong></td><td>Insurance companies and life insurance products</td></tr>
      <tr><td><strong>Personal Data Protection Act (PDPA)</strong></td><td>Collection, use, and protection of personal data</td></tr>
    </table>
    <div class="tip-box"><div class="icon-lbl">🏛️ MAS — The Main Regulator</div><p>The <strong>Monetary Authority of Singapore (MAS)</strong> is both Singapore's central bank AND financial regulator. It supervises banks, insurers, securities firms, and financial advisers. SGX-ST (Singapore Exchange) also acts as a self-regulatory organisation for securities trading.</p></div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">🏦 1.2 Types of Financial Institutions <span class="arr">▼</span></div>
  <div class="acc-body">
    <table class="tbl">
      <tr><th>Type</th><th>Who They Serve</th><th>Deposits</th></tr>
      <tr><td><strong>Full Banks</strong></td><td>Everyone — retail &amp; wholesale</td><td>✅ Any amount, any currency</td></tr>
      <tr><td><strong>Wholesale Banks</strong></td><td>Corporations &amp; institutions (not retail)</td><td>✅ But NOT retail deposits under S$250,000</td></tr>
      <tr><td><strong>Merchant Banks</strong></td><td>Corporations &amp; institutions only</td><td>❌ Cannot take retail deposits at all</td></tr>
      <tr><td><strong>Finance Companies</strong></td><td>Retail customers (local focus)</td><td>✅ With more restrictions than banks</td></tr>
    </table>
    <div class="tip-box"><strong>Exam Fact:</strong> "Full banks are allowed to take deposits of any amount in any currency." ✅ TRUE — this is a common exam question!</div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">🚨 1.3 Market Misconduct — The Forbidden Acts <span class="arr">▼</span></div>
  <div class="acc-body">
    <p>The SFA prohibits several types of misconduct. Know ALL of these for the exam:</p>
    <table class="tbl">
      <tr><th>Offence</th><th>What it Means</th><th>Example</th></tr>
      <tr><td><strong>Insider Trading</strong></td><td>Using non-public, price-sensitive info to trade</td><td>Company director buys shares before announcing profits</td></tr>
      <tr><td><strong>False Trading</strong></td><td>Creating fake impression of active trading</td><td>Two parties trade the same stock back and forth</td></tr>
      <tr><td><strong>Market Manipulation</strong></td><td>Artificially influencing prices</td><td>Spreading false rumours to pump a stock price</td></tr>
      <tr><td><strong>Bucketing</strong></td><td>Broker pockets price difference, doesn't execute properly</td><td>Client orders at $1.00; broker fills at $1.05 and keeps $0.05</td></tr>
      <tr><td><strong>Front Running</strong></td><td>Broker trades for own account BEFORE client's large order</td><td>Broker buys 1,000 shares, then executes client's buy that will push price up</td></tr>
      <tr><td><strong>Securities Hawking</strong></td><td>Selling securities door-to-door or unsolicited</td><td>Cold-calling people randomly to sell investment products</td></tr>
      <tr><td><strong>Misrepresentation</strong></td><td>False or misleading statements to induce investment</td><td>Claiming a risky product is "capital guaranteed"</td></tr>
      <tr><td><strong>Falsification of Records</strong></td><td>Tampering with financial documents</td><td>Altering a term sheet to show false features</td></tr>
    </table>
    <div class="concept-box"><div class="icon-lbl">🔍 Insider Trading: Connected vs Unconnected Persons</div>
    <p><strong>Connected Persons</strong> (officers, substantial shareholders ≥5%, associates, people who receive info from connected persons) are <em>presumed</em> to know information is price-sensitive. Prosecution is easier.</p>
    <p><strong>Unconnected Persons</strong> (ordinary people who stumble on inside info) — prosecution must <em>prove</em> they knew the info was confidential and price-sensitive.</p></div>
    <div class="case-box"><h4>📖 Case: Front Running (Adviser Z)</h4>
    <p>Adviser Z knows his client plans to buy a large stake in ABC Co, which will push up the share price. Z places a personal buy order FIRST, then executes the client's order, profiting from the price increase.</p>
    <p>This is <strong>front running</strong> (also called parallel running). Z faces <strong>criminal prosecution AND regulatory penalties</strong>.</p></div>
    <div class="ex-box"><h4>✏️ Exercise: What Misconduct?</h4>
    <p>At a family dinner, a client adviser overhears that Corporation A is about to announce stellar results. He then recommends Corporation A shares to his client the next day. What offence has been committed?</p>
    <button class="reveal-btn" onclick="revealAnswer(this)">Reveal Answer</button>
    <div class="answer-box"><strong>Insider Trading.</strong> Even though the info was overheard (unconnected person), recommending a trade based on material non-public information is insider trading. The prosecution would need to prove the adviser knew the info was confidential and price-sensitive.</div></div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">👥 1.4 Client Segmentation &amp; Accredited Investors <span class="arr">▼</span></div>
  <div class="acc-body">
    <table class="tbl">
      <tr><th>Segment</th><th>Investable Assets</th><th>Focus</th></tr>
      <tr><td><strong>Mass Affluent</strong></td><td>S$200,000 – S$1 million</td><td>Investment growth, basic planning</td></tr>
      <tr><td><strong>High Net Worth (HNW)</strong></td><td>S$1 million – S$50 million</td><td>Sophisticated investments, tax &amp; estate planning</td></tr>
      <tr><td><strong>Ultra High Net Worth (UHNW)</strong></td><td>Above S$50 million</td><td>Family offices, complex structures, philanthropy</td></tr>
    </table>
    <div class="concept-box"><div class="icon-lbl">⭐ Accredited Investor (AI) — Individual Criteria (meet ONE)</div>
    <ul>
      <li>Net Personal Assets (NPA) &gt; S$2 million (primary residence capped at S$1M)</li>
      <li>Net Financial Assets &gt; S$1 million</li>
      <li>Income in last 12 months ≥ S$300,000</li>
    </ul>
    <p><strong>Corporation:</strong> Net assets &gt; S$10 million</p>
    <div class="warning-box"><strong>⚠️ KEY EXAM RULE:</strong> AI-eligible individuals do NOT automatically become AIs. They must actively <strong>"OPT IN"</strong>. They can also withdraw consent at any time by notifying the Covered Entity. This is tested EVERY exam!</div></div>
    <div class="ex-box"><h4>✏️ Exercise: Is Madam Susi an AI?</h4>
    <p>Madam Susi has a primary residence worth S$2M and owns shares in a PIC with net assets of US$5M (~S$6.7M). Your bank only deals with AIs. How do you assess her AI eligibility?</p>
    <button class="reveal-btn" onclick="revealAnswer(this)">Reveal Answer</button>
    <div class="answer-box"><strong>Assess the value of her shares in the PIC only.</strong> The PIC is a corporation — with net assets over S$10M equivalent, the PIC itself qualifies as an AI. As beneficial owner, Madam Susi's AI status is assessed through her shareholding in the PIC, not through the apartment value.</div></div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">🤝 1.5 Collaborative Relationships &amp; Team Roles <span class="arr">▼</span></div>
  <div class="acc-body">
    <table class="tbl">
      <tr><th>Role</th><th>What They Do</th></tr>
      <tr><td><strong>Relationship Manager (RM) / Client Adviser (CA)</strong></td><td>Main client contact; builds relationships; gives investment advice</td></tr>
      <tr><td><strong>Investment Consultant (IC)</strong></td><td>Provides specialist in-depth investment analysis and product recommendations</td></tr>
      <tr><td><strong>Assistant Relationship Manager (ARM)</strong></td><td>Supports the RM; handles admin and documentation</td></tr>
      <tr><td><strong>Team Leader</strong></td><td>Oversees the team; ensures quality service and compliance</td></tr>
    </table>
    <div class="tip-box"><strong>Multiple Principals:</strong> A Covered Person acting for more than one principal is generally NOT permitted, UNLESS (a) MAS approves, OR (b) the principals are related corporations. Both conditions provide exceptions.</div>
  </div></div>

  <!-- CHAPTER 1 QUIZ -->
  <div class="card chapter-end-quiz ch1">
    <div class="quiz-hero">
      <h2>📝 Chapter 1 Quiz — 8 Questions</h2>
      <p>Practice the key Chapter 1 sample questions before moving to Chapter 2.</p>
    </div>

    <div id="ch1-quiz-start-panel" style="text-align:center;padding:20px">
      <p style="font-size:1.1em;margin-bottom:16px">These 8 questions cover Accredited Investor status, regulated activities, market misconduct, multiple principals, and bank types.</p>
      <button class="qbtn" style="background:#7f9fc4;color:#fff;font-size:1.1em;padding:12px 32px" onclick="startChapter1Quiz()">🚀 Start Chapter 1 Quiz</button>
    </div>

    <div id="ch1-quiz-progress-bar" style="display:none">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <span id="ch1-q-counter" style="font-size:.88em;color:#6b7280;font-weight:700"></span>
        <span id="ch1-q-score-live" style="font-size:.88em;color:#16a34a;font-weight:700"></span>
      </div>
      <div class="q-progress"><div class="q-fill" id="ch1-qfill"></div></div>
    </div>

    <div id="ch1-quiz-questions"></div>

    <div style="text-align:center;margin:16px 0;display:none" id="ch1-quiz-nav">
      <button class="qbtn" id="ch1-nextBtn" style="background:#4f46e5;color:#fff" onclick="nextChapter1Question()">Next Question →</button>
    </div>

    <div class="quiz-score" id="ch1-quiz-score-panel">
      <h2 id="ch1-final-score"></h2>
      <p id="ch1-score-msg" style="font-size:1.1em;margin:10px 0 20px"></p>
      <button class="qbtn" style="background:#15803d;color:#fff" onclick="restartChapter1Quiz()">🔄 Restart Chapter 1 Quiz</button>
      <button class="qbtn" style="background:#4f46e5;color:#fff" onclick="showTab('ch2')">📘 Continue to Chapter 2</button>
    </div>
  </div>
</div>

<!-- CHAPTER 2 -->
<div id="ch2" class="tab-content">
  <div class="ch-header" style="background:linear-gradient(135deg,#1d4ed8,#0369a1)">
    <h2>📋 Chapter 2: Private Banking Code of Conduct</h2>
    <p>The rulebook for private bankers — covering competency, market conduct, advisory standards, disclosure, and professionalism.</p>
  </div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">📚 2.1 The PB Code — Overview &amp; CPD <span class="arr">▼</span></div>
  <div class="acc-body">
    <p>The <strong>Private Banking Code of Conduct (PB Code)</strong> applies to <strong>Covered Entities</strong> (banks) and <strong>Covered Persons</strong> (bank employees like RMs). It covers 5 key areas:</p>
    <table class="tbl">
      <tr><th>#</th><th>Area</th><th>Key Rule</th></tr>
      <tr><td>1</td><td>Competency &amp; CPD</td><td>Minimum <strong>15 CPD hours per year</strong>; pass relevant exams</td></tr>
      <tr><td>2</td><td>Market Conduct</td><td>Fair, transparent; no manipulation or mis-selling</td></tr>
      <tr><td>3</td><td>Client Advisory</td><td>KYC; give suitable advice; keep call reports</td></tr>
      <tr><td>4</td><td>Disclosure</td><td>Disclose fees, risks, capacity (principal vs agent)</td></tr>
      <tr><td>5</td><td>Professionalism</td><td>Be fit and proper; handle complaints properly</td></tr>
    </table>
    <div class="concept-box"><div class="icon-lbl">📅 CPD — Continuing Professional Development</div>
    <p>Every Covered Person must complete <strong>at least 15 CPD hours per year</strong>. These keep advisers updated on products, laws, and best practices.</p>
    <p>The PB Code also requires <strong>call reports</strong> — written records of all client meetings and investment discussions. These document advice given and maintain accountability.</p></div>
    <div class="concept-box"><div class="icon-lbl">⚠️ Vulnerable Clients</div>
    <p>Extra care is required for clients who are: (a) <strong>aged 62 or older</strong>, OR (b) <strong>not proficient in written or spoken English</strong>. Simpler language, more time to explain, and additional documentation are required.</p></div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">⚠️ 2.2 Mis-Selling Case Studies <span class="arr">▼</span></div>
  <div class="acc-body">
    <div class="case-box"><h4>Case 1: Xavier — Inadequate Risk Disclosure</h4><p>Xavier sold a high-risk structured product without properly explaining the downside risks. Client suffered losses and complained. Violation: <span class="badge b-red">Inadequate risk disclosure</span></p></div>
    <div class="case-box"><h4>Case 2: Hilda — Misrepresentation</h4><p>Hilda told her client the product had a "guaranteed return of 8%" when it didn't. Violation: <span class="badge b-red">Misrepresentation</span> — making false statements to induce investment.</p></div>
    <div class="case-box"><h4>Case 3: Kathy — Churning</h4><p>Kathy kept switching client investments between products, generating commissions for herself with no real benefit to the client. Violation: <span class="badge b-red">Churning</span></p></div>
    <div class="case-box"><h4>Case 4: Yanti — Unsuitable Product</h4><p>Yanti recommended a very high-risk investment to an elderly conservative client who wanted stable income only. Violation: <span class="badge b-red">Suitability failure</span> — product didn't match client profile.</p></div>
    <div class="case-box"><h4>Case 5: Cedric — Undisclosed Conflict of Interest</h4><p>Cedric recommended his bank's affiliated fund products without telling the client about the conflict. Violation: <span class="badge b-red">Failure to disclose conflict of interest</span></p></div>
    <div class="case-box"><h4>Case 6: Mr Loh — Conflict of Interest</h4><p>Mr Loh's RM recommended a company where the RM's family held shares — a personal financial interest in the recommendation. The RM should have disclosed this and recused himself.</p></div>
    <div class="ex-box"><h4>✏️ Exercise</h4>
    <p>An RM recommends a complex derivative to a 75-year-old client who said she only wants "safe fixed income." What violation has occurred, and what should the RM do?</p>
    <button class="reveal-btn" onclick="revealAnswer(this)">Reveal Answer</button>
    <div class="answer-box"><strong>Suitability violation (like Yanti's case).</strong> The product doesn't match the client's risk profile or objectives. The RM should have recommended a low-risk product consistent with the client's stated preference. KYC information must always drive product recommendations.</div></div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">📢 2.3 Disclosure Requirements <span class="arr">▼</span></div>
  <div class="acc-body">
    <div class="concept-box"><div class="icon-lbl">What Must Be Disclosed?</div>
    <ul>
      <li><strong>Capacity:</strong> Acting as <em>agent</em> (finding best deal for client) or <em>principal</em> (selling from own stock)? MUST be disclosed!</li>
      <li><strong>All fees and charges:</strong> Spreads, commissions, management fees — all must be explained clearly</li>
      <li><strong>Product risks:</strong> All material risks must be communicated</li>
      <li><strong>Conflicts of interest:</strong> Any relationship that could affect the advice</li>
      <li><strong>Affiliated products:</strong> If recommending own bank's products, disclose the affiliation</li>
    </ul></div>
    <div class="tip-box"><strong>Exam Key:</strong> Disclosing the <strong>capacity</strong> (whether the bank acts as principal or agent) is a critical disclosure requirement. This is tested in the review questions.</div>
    <div class="concept-box"><div class="icon-lbl">📞 Margin Accounts</div>
    <p>Margin accounts let clients borrow to invest — amplifying both gains AND losses. Advisers must ensure clients understand leverage risks and monitor accounts to issue margin calls when needed.</p></div>
    <div class="concept-box"><div class="icon-lbl">FATF Sound Practices (Private Banking)</div>
    <p>FATF recommends that private banks: accept only legally sourced funds; perform ECDD on high-risk clients; train staff on AML/CFT; and report suspicious transactions to authorities.</p></div>
  </div></div>
  <!-- CHAPTER 2 QUIZ -->
  <div class="card chapter-end-quiz ch2">
    <div class="quiz-hero">
      <h2>📝 Chapter 2 Quiz — 8 Questions</h2>
      <p>Practice the Chapter 2 sample questions before moving on.</p>
    </div>

    <div id="ch2-quiz-start-panel" style="text-align:center;padding:20px">
      <p style="font-size:1.1em;margin-bottom:16px">These 8 questions cover the key Chapter 2 exam-style topics, including case scenarios where relevant.</p>
      <button class="qbtn" style="background:#6f8fac;color:#fff;font-size:1.1em;padding:12px 32px" onclick="startChapterQuiz(2)">🚀 Start Chapter 2 Quiz</button>
    </div>

    <div id="ch2-quiz-progress-bar" style="display:none">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <span id="ch2-q-counter" style="font-size:.88em;color:#6b7280;font-weight:700"></span>
        <span id="ch2-q-score-live" style="font-size:.88em;color:#16a34a;font-weight:700"></span>
      </div>
      <div class="q-progress"><div class="q-fill" id="ch2-qfill"></div></div>
    </div>

    <div id="ch2-quiz-questions"></div>

    <div style="text-align:center;margin:16px 0;display:none" id="ch2-quiz-nav">
      <button class="qbtn" id="ch2-nextBtn" style="background:#4f46e5;color:#fff" onclick="nextChapterQuizQuestion(2)">Next Question →</button>
    </div>

    <div class="quiz-score" id="ch2-quiz-score-panel">
      <h2 id="ch2-final-score"></h2>
      <p id="ch2-score-msg" style="font-size:1.1em;margin:10px 0 20px"></p>
      <button class="qbtn" style="background:#15803d;color:#fff" onclick="restartChapterQuiz(2)">🔄 Restart Chapter 2 Quiz</button>
      <button class="qbtn" style="background:#4f46e5;color:#fff" onclick="showTab('ch3')">📘 Continue to Chapter 3</button>
    </div>
  </div>

</div>

<!-- CHAPTER 3 -->
<div id="ch3" class="tab-content">
  <div class="ch-header" style="background:linear-gradient(135deg,#0d9488,#0369a1)">
    <h2>🔍 Chapter 3: Client Due Diligence (CDD)</h2>
    <p>How banks verify clients, fight money laundering, and comply with international reporting — KYC, AML/CFT, STR, CRS, FATCA.</p>
  </div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">💰 3.1 Money Laundering — The 3 Stages <span class="arr">▼</span></div>
  <div class="acc-body">
    <div class="analogy-box"><div class="icon-lbl">🧺 What is Money Laundering?</div><p>Criminals "wash" dirty money (from illegal activities) through the financial system to make it look clean and legitimate — like washing muddy clothes until they look new.</p></div>
    <table class="tbl">
      <tr><th>Stage</th><th>Name</th><th>What Happens</th><th>Example</th></tr>
      <tr><td>1️⃣</td><td><strong>Placement</strong></td><td>Dirty money enters the financial system</td><td>Depositing drug sale cash into a bank account</td></tr>
      <tr><td>2️⃣</td><td><strong>Layering</strong></td><td>Moving money to obscure its origin</td><td>Transferring funds through multiple offshore accounts</td></tr>
      <tr><td>3️⃣</td><td><strong>Integration</strong></td><td>Clean money re-enters the economy legitimately</td><td>Buying real estate with laundered funds</td></tr>
    </table>
    <div class="warning-box"><strong>Terrorism Financing (TF)</strong> works differently — terrorists may use CLEAN money for violence. Even small, legitimate-looking transactions can be terrorism financing. Report ALL suspicious transactions!</div>
    <div class="concept-box"><div class="icon-lbl">🔫 Proliferation Financing (PF)</div><p>Financing the development of weapons of mass destruction. Red flags: deals with high-risk countries known for WMD programs, unusual trade routes, goods incompatible with the importing country's industry level, inconsistencies in trade documents.</p></div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">📋 3.2 KYC &amp; CDD Measures <span class="arr">▼</span></div>
  <div class="acc-body">
    <p>CDD must be performed when: opening a new account; unusual/suspicious transactions; doubts about existing information; cash transactions &gt; S$20,000.</p>
    <div class="concept-box"><div class="icon-lbl">Standard CDD — 6 Steps</div>
    <ol>
      <li><strong>Identify the client</strong> — name, DOB, nationality, ID number</li>
      <li><strong>Verify identity</strong> — passport, NRIC, official documents</li>
      <li><strong>Identify Beneficial Owners (BO)</strong> — who ultimately owns/controls the account? (threshold: &gt;25% stake)</li>
      <li><strong>Screen</strong> — check sanctions lists, adverse news, PEP lists</li>
      <li><strong>Source of Wealth (SOW)</strong> — how did the client make their money? Requires <strong>independent corroboration</strong></li>
      <li><strong>Purpose of account</strong> — why do they need this account?</li>
    </ol></div>
    <div class="warning-box"><div class="icon-lbl">⚠️ SOW Must Be INDEPENDENTLY Corroborated</div><p>Accepting what a client says about their wealth is NOT enough. Independent corroboration means getting confirmation from a senior officer like a <strong>CFO or HR Head</strong> of the client's company — NOT from the client themselves or their relatives.</p></div>
    <div class="case-box"><h4>📖 SOW Case: Mr Zee Too</h4>
    <p>Mr Zee Wan (client's cousin) offers to sign a company letter confirming Mr Zee Too's income. Is this acceptable?</p>
    <p>Answer: <strong>Only if there is also independent corroboration from a senior officer</strong> (e.g., HR Head or CFO). A letter from a cousin alone is not independent enough.</p></div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">🔴 3.3 Enhanced CDD &amp; PEPs <span class="arr">▼</span></div>
  <div class="acc-body">
    <p>ECDD is required for higher-risk situations:</p>
    <ul>
      <li>Politically Exposed Persons (PEPs) and their family/associates</li>
      <li>Clients from high-risk jurisdictions</li>
      <li>Complex multi-layered corporate structures</li>
      <li>Cash-intensive businesses</li>
      <li>Clients reluctant to provide information</li>
    </ul>
    <div class="concept-box"><div class="icon-lbl">🏛️ PEPs — Politically Exposed Persons</div>
    <p>PEPs hold (or held) prominent public positions — government ministers, judges, military generals, senior party officials. They pose higher corruption/money laundering risk.</p>
    <p><strong>PEP coverage extends to:</strong> immediate family (spouse, parents, children) AND close associates (business partners, close friends).</p>
    <p><strong>Foreign PEPs</strong> receive higher scrutiny than <strong>domestic PEPs</strong> in Singapore.</p></div>
    <div class="case-box"><h4>📖 PEP Case: Mr Zee Wan Becomes a Minister</h4>
    <p>Mr Zee Wan (existing client) is confirmed as a government minister. His cousin Mr Zee Too wants to open an account.</p>
    <p>Action: Invoke the <strong>PEP internal review process for BOTH</strong> Mr Zee Wan (now a PEP) AND Mr Zee Too (close associate — cousin). Both require ECDD.</p></div>
    <div class="ex-box"><h4>✏️ Exercise: EDD Trigger</h4>
    <p>A potential client wants to hold assets through 5 layers of offshore companies for "confidentiality." Does this trigger ECDD?</p>
    <button class="reveal-btn" onclick="revealAnswer(this)">Reveal Answer</button>
    <div class="answer-box"><strong>YES — major red flag!</strong> Complex structures with multiple layers of intervening companies are a classic ECDD trigger. The bank MUST understand the purpose of the structure BEFORE opening the account. Structures designed to obscure beneficial ownership are strong indicators of money laundering or tax evasion risk.</div></div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">🚨 3.4 STR, Wire Transfers, PDPA, CRS &amp; FATCA <span class="arr">▼</span></div>
  <div class="acc-body">
    <div class="concept-box"><div class="icon-lbl">🚨 Suspicious Transaction Reports (STR)</div>
    <p>Banks MUST report suspicious transactions to the <strong>Suspicious Transaction Reporting Office (STRO)</strong> under the CDSA and STRO legislation.</p>
    <p><strong>CRITICAL — No Tipping Off:</strong> After filing (or deciding to file) a STR, you MUST NEVER tell the client or anyone involved. Tipping off is a criminal offence! If a client asks about a delayed transaction while it's under compliance review, say "There are operational issues I'm looking into" — NEVER say "Your account is under investigation."</p></div>
    <div class="concept-box"><div class="icon-lbl">💸 Wire Transfer Rules</div>
    <p>All wire transfers must include <strong>originator information</strong> — sender's name, account number, and address. Missing or incomplete originator info = red flag for money laundering.</p></div>
    <div class="concept-box"><div class="icon-lbl">🌍 CRS &amp; FATCA — International Tax Reporting</div>
    <p><strong>CRS (Common Reporting Standard):</strong> Singapore banks automatically share account info with foreign tax authorities. Fights global tax evasion. If a client transfers assets to an offshore company to avoid reporting, this could be flagged under CRS.</p>
    <p><strong>FATCA:</strong> US law requiring foreign institutions to report US persons' accounts to the IRS.</p></div>
    <div class="concept-box"><div class="icon-lbl">🛡️ PDPA — 10 Obligations</div>
    <table class="tbl">
      <tr><th>Obligation</th><th>Meaning</th></tr>
      <tr><td>1. Consent</td><td>Get permission before collecting data</td></tr>
      <tr><td>2. Purpose Limitation</td><td>Only use data for the stated purpose</td></tr>
      <tr><td>3. Notification</td><td>Tell clients what data you collect and why</td></tr>
      <tr><td>4. Access &amp; Correction</td><td>Clients can view and correct their data</td></tr>
      <tr><td>5. Accuracy</td><td>Keep data accurate and updated</td></tr>
      <tr><td>6. Protection</td><td>Secure data from unauthorized access</td></tr>
      <tr><td>7. Retention Limitation</td><td>Don't keep data longer than needed</td></tr>
      <tr><td>8. Transfer Limitation</td><td>Standards apply when sending data overseas</td></tr>
      <tr><td>9. Data Breach Notification</td><td>Report breaches to PDPC (and MAS for banks)</td></tr>
      <tr><td>10. Accountability</td><td>Designate a Data Protection Officer</td></tr>
    </table>
    <div class="tip-box"><strong>Exam Key:</strong> If a bank accidentally emails a client's statement to the wrong person, it must report to BOTH <strong>MAS</strong> AND the <strong>PDPC</strong>.</div></div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">📢 3.5 Marketing, Cross-Border &amp; Introducers <span class="arr">▼</span></div>
  <div class="acc-body">
    <div class="concept-box"><div class="icon-lbl">Marketing &amp; Advertising Rules</div>
    <ul>
      <li>All marketing materials must be <strong>reviewed and approved by Legal &amp; Compliance</strong> before use</li>
      <li>Cannot use the word <strong>"independent"</strong> unless truly independent (no conflicts)</li>
      <li>Cannot state <strong>expected performance as a confirmed fact</strong> (e.g., "This fund WILL return 10%")</li>
      <li>Past performance references must be used with proper context</li>
    </ul></div>
    <div class="concept-box"><div class="icon-lbl">✈️ Cross-Border Activities</div>
    <p>Activities conducted in another country follow <strong>that country's rules</strong>. Providing investment advice to clients in another country (e.g., advising on a new REIT to clients in another country) = subject to that country's regulator's rules.</p></div>
    <div class="concept-box"><div class="icon-lbl">🤝 Introducers — What They Can &amp; Cannot Do</div>
    <table class="tbl">
      <tr><th>Introducers CAN</th><th>Introducers CANNOT</th></tr>
      <tr><td>Refer clients to the bank</td><td>Give investment advice</td></tr>
      <tr><td>Provide factual product information</td><td>Execute trades</td></tr>
      <tr><td>Receive introduction fees (disclosed)</td><td>Collect client funds</td></tr>
    </table></div>
  </div></div>
  <!-- CHAPTER 3 QUIZ -->
  <div class="card chapter-end-quiz ch3">
    <div class="quiz-hero">
      <h2>📝 Chapter 3 Quiz — 10 Questions</h2>
      <p>Practice the Chapter 3 sample questions before moving on.</p>
    </div>

    <div id="ch3-quiz-start-panel" style="text-align:center;padding:20px">
      <p style="font-size:1.1em;margin-bottom:16px">These 10 questions cover the key Chapter 3 exam-style topics, including case scenarios where relevant.</p>
      <button class="qbtn" style="background:#85a398;color:#fff;font-size:1.1em;padding:12px 32px" onclick="startChapterQuiz(3)">🚀 Start Chapter 3 Quiz</button>
    </div>

    <div id="ch3-quiz-progress-bar" style="display:none">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <span id="ch3-q-counter" style="font-size:.88em;color:#6b7280;font-weight:700"></span>
        <span id="ch3-q-score-live" style="font-size:.88em;color:#16a34a;font-weight:700"></span>
      </div>
      <div class="q-progress"><div class="q-fill" id="ch3-qfill"></div></div>
    </div>

    <div id="ch3-quiz-questions"></div>

    <div style="text-align:center;margin:16px 0;display:none" id="ch3-quiz-nav">
      <button class="qbtn" id="ch3-nextBtn" style="background:#4f46e5;color:#fff" onclick="nextChapterQuizQuestion(3)">Next Question →</button>
    </div>

    <div class="quiz-score" id="ch3-quiz-score-panel">
      <h2 id="ch3-final-score"></h2>
      <p id="ch3-score-msg" style="font-size:1.1em;margin:10px 0 20px"></p>
      <button class="qbtn" style="background:#15803d;color:#fff" onclick="restartChapterQuiz(3)">🔄 Restart Chapter 3 Quiz</button>
      <button class="qbtn" style="background:#4f46e5;color:#fff" onclick="showTab('ch4')">📘 Continue to Chapter 4</button>
    </div>
  </div>

</div>

<!-- CHAPTER 4 -->
<div id="ch4" class="tab-content">
  <div class="ch-header" style="background:linear-gradient(135deg,#c2410c,#d97706)">
    <h2>💼 Chapter 4: Client Advisory</h2>
    <p>Account types, investment products, suitability rules, SGX trading mechanics, pricing, and record keeping.</p>
  </div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">🏦 4.1 Types of Accounts <span class="arr">▼</span></div>
  <div class="acc-body">
    <table class="tbl">
      <tr><th>Account Type</th><th>Description</th><th>Key Point</th></tr>
      <tr><td><strong>Personal Account</strong></td><td>Individual client account</td><td>Simplest structure; client is the beneficial owner</td></tr>
      <tr><td><strong>Joint Account</strong></td><td>Two or more persons jointly</td><td>Both must give instructions unless "either/or" mandate. Divorce/disputes require Legal &amp; Compliance guidance!</td></tr>
      <tr><td><strong>PIC (Personal Investment Company)</strong></td><td>Client owns a company to hold investments</td><td>Tax benefits, confidentiality; bank must identify the beneficial owner</td></tr>
      <tr><td><strong>Trust Account</strong></td><td>Account held by trustees for beneficiaries</td><td>Trustee instructs the bank; detailed CDD on all trust parties required</td></tr>
      <tr><td><strong>Corporate / Institutional</strong></td><td>Companies, partnerships, funds</td><td>Must identify all directors, shareholders, and UBOs</td></tr>
      <tr><td><strong>Variable Capital Company (VCC)</strong></td><td>Singapore's fund vehicle</td><td>Can have multiple sub-funds; regulated by MAS</td></tr>
    </table>
    <div class="case-box"><h4>📖 Joint Account Divorce Case</h4>
    <p>A wife calls her RM saying she's getting divorced and wants all funds wired to her personal offshore account immediately. The husband is the other joint account holder.</p>
    <p>Action: <strong>Get guidance from Legal &amp; Compliance immediately.</strong> You cannot act on one party's instructions to liquidate a joint account in a divorce situation without proper authorization.</p></div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">📊 4.2 Investment Products — SIPs, CAR &amp; CKA <span class="arr">▼</span></div>
  <div class="acc-body">
    <div class="concept-box"><div class="icon-lbl">🎯 Specified Investment Products (SIPs)</div>
    <p>SIPs are complex investment products that require additional safeguards for retail investors because they are harder to understand:</p>
    <p><strong>Listed SIPs</strong> (traded on exchanges): ETFs leveraged/inverse, warrants, DLCs, futures</p>
    <p><strong>Unlisted SIPs</strong> (OTC): derivatives, structured products, contracts for differences</p></div>
    <div class="concept-box"><div class="icon-lbl">CAR vs CKA</div>
    <table class="tbl">
      <tr><th></th><th>CAR (Customer Account Review)</th><th>CKA (Customer Knowledge Assessment)</th></tr>
      <tr><td><strong>Used for</strong></td><td>Retail clients wanting unlisted SIPs at banks/brokers</td><td>Retail clients wanting listed SIPs at Capital Markets Services (CMS) licensees</td></tr>
      <tr><td><strong>Purpose</strong></td><td>Assess if client has knowledge/experience in SIPs</td><td>Same — assess knowledge/experience</td></tr>
      <tr><td><strong>If fail?</strong></td><td>Bank must warn client; client can still proceed</td><td>Same — warning given, client decides</td></tr>
    </table></div>
    <div class="concept-box"><div class="icon-lbl">🌏 Overseas-Listed Products</div>
    <p>When a bank recommends products listed on foreign exchanges, additional disclosures are required: the foreign exchange rate risk, different regulatory standards, and the fact that investor protection may differ from Singapore's rules.</p></div>
    <div class="concept-box"><div class="icon-lbl">📋 Product Due Diligence — Regulation 18B</div>
    <p>Before recommending any investment product, the bank must conduct due diligence to: understand the product thoroughly; understand all risks; assess suitability for the client segment; review if product features match client needs.</p></div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">📈 4.3 SGX-ST Trading Mechanics <span class="arr">▼</span></div>
  <div class="acc-body">
    <div class="concept-box"><div class="icon-lbl">🕐 Trading Hours &amp; Phases (Securities)</div>
    <table class="tbl">
      <tr><th>Phase</th><th>Time</th><th>What Happens</th></tr>
      <tr><td>Pre-Open</td><td>7:00am – 8:58am</td><td>Orders can be entered; matching occurs via auction</td></tr>
      <tr><td>Non-Cancel</td><td>8:58am – 9:00am</td><td>Orders CANNOT be cancelled; final matching for open</td></tr>
      <tr><td>Continuous Trading</td><td>9:00am – 5:00pm</td><td>Normal trading; orders matched continuously</td></tr>
      <tr><td>Pre-Close</td><td>5:00pm – 5:04pm</td><td>Auction for closing price</td></tr>
      <tr><td>Trade-at-Close</td><td>5:06pm</td><td>Trades executed at closing price</td></tr>
    </table></div>
    <div class="concept-box"><div class="icon-lbl">📋 Order Types</div>
    <table class="tbl">
      <tr><th>Order Type</th><th>What it Does</th></tr>
      <tr><td><strong>Limit Order</strong></td><td>Buy/sell at a specific price or better; won't execute if price not available</td></tr>
      <tr><td><strong>Market Order</strong></td><td>Buy/sell immediately at best available price</td></tr>
      <tr><td><strong>Market-to-Limit (MTL)</strong></td><td>Executes as market order; unfilled portion becomes a limit order</td></tr>
      <tr><td><strong>Stop Order</strong></td><td>Triggers when price reaches a level; then becomes market order</td></tr>
      <tr><td><strong>If-Touched Order</strong></td><td>Like stop but triggers in opposite direction</td></tr>
      <tr><td><strong>Special Share Only (SSO)</strong></td><td>Executes only in board lots (standard lot sizes)</td></tr>
    </table></div>
    <div class="concept-box"><div class="icon-lbl">FOK vs FAK</div>
    <p><strong>Fill or Kill (FOK):</strong> The entire order must be filled immediately — if not, the whole order is cancelled.</p>
    <p><strong>Fill and Kill (FAK):</strong> Whatever can be filled immediately IS filled; the remainder is cancelled (not a full cancellation).</p></div>
    <div class="concept-box"><div class="icon-lbl">📅 Settlement: T+2</div>
    <p>SGX securities settle <strong>T+2</strong> — 2 business days after the trade date. Buyers must have funds; sellers must have shares by settlement date.</p></div>
    <div class="concept-box"><div class="icon-lbl">💹 Pricing &amp; Best Execution</div>
    <ul>
      <li><strong>Best execution:</strong> Consider price, speed, and likelihood of execution</li>
      <li><strong>Price improvements:</strong> If you get a better price than agreed with the client, pass the benefit to the client — not keep it</li>
      <li><strong>No overcharging:</strong> Fees must not exceed the agreed fee schedule</li>
      <li><strong>Client orders first:</strong> Always execute client orders before your own (no front running!)</li>
    </ul></div>
    <div class="case-box"><h4>📖 Best Price Case</h4>
    <p>Client places order for a bond at all-in price of 102. Fee schedule says spread = 0.5. Bank executes at 100. What price should the client pay?</p>
    <p>Answer: <strong>100.5</strong> (execution price 100 + fee schedule spread 0.5). The better execution price (100 vs. 102 quoted) means the client gets price improvement — the savings should be passed to the client, not kept by the bank.</p></div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">📁 4.4 Record Keeping, Suitability &amp; PDPA <span class="arr">▼</span></div>
  <div class="acc-body">
    <div class="concept-box"><div class="icon-lbl">📁 Record Keeping — 5 Years</div>
    <p>All client records, transaction records, and correspondence must be kept for a minimum of <strong>5 years</strong>. This includes contract notes, account statements, KYC documents, and records of advice given.</p></div>
    <div class="concept-box"><div class="icon-lbl">🎯 Suitability Framework</div>
    <p>Before making any investment recommendation, the adviser must assess:</p>
    <ul>
      <li><strong>Risk tolerance</strong> — how much loss can the client handle?</li>
      <li><strong>Financial situation</strong> — income, assets, liabilities, liquidity needs</li>
      <li><strong>Investment objectives</strong> — growth, income, preservation?</li>
      <li><strong>Investment horizon</strong> — short-term or long-term?</li>
      <li><strong>Investment experience &amp; knowledge</strong> — has the client invested before?</li>
    </ul>
    <p>The adviser must <strong>review the client's TOTAL portfolio</strong> (all accounts), not just individual products in isolation.</p></div>
    <div class="concept-box"><div class="icon-lbl">📊 Client Non-Financial Information — Why It Matters</div>
    <p>Banks collect non-financial info to: identify beneficial owners; understand key family decision-makers; anticipate changes in tax residency that might affect investment strategy. All three purposes are valid reasons.</p></div>
    <div class="tip-box"><strong>Exam Key:</strong> MAS Fair Dealing guidance requires banks to: (a) offer suitable products, (b) have competent representatives, AND (d) handle complaints independently and promptly. These are the three key requirements.</div>
  </div></div>
  <!-- CHAPTER 4 QUIZ -->
  <div class="card chapter-end-quiz ch4">
    <div class="quiz-hero">
      <h2>📝 Chapter 4 Quiz — 10 Questions</h2>
      <p>Practice the Chapter 4 sample questions before moving on.</p>
    </div>

    <div id="ch4-quiz-start-panel" style="text-align:center;padding:20px">
      <p style="font-size:1.1em;margin-bottom:16px">These 10 questions cover the key Chapter 4 exam-style topics, including case scenarios where relevant.</p>
      <button class="qbtn" style="background:#c49a76;color:#fff;font-size:1.1em;padding:12px 32px" onclick="startChapterQuiz(4)">🚀 Start Chapter 4 Quiz</button>
    </div>

    <div id="ch4-quiz-progress-bar" style="display:none">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <span id="ch4-q-counter" style="font-size:.88em;color:#6b7280;font-weight:700"></span>
        <span id="ch4-q-score-live" style="font-size:.88em;color:#16a34a;font-weight:700"></span>
      </div>
      <div class="q-progress"><div class="q-fill" id="ch4-qfill"></div></div>
    </div>

    <div id="ch4-quiz-questions"></div>

    <div style="text-align:center;margin:16px 0;display:none" id="ch4-quiz-nav">
      <button class="qbtn" id="ch4-nextBtn" style="background:#4f46e5;color:#fff" onclick="nextChapterQuizQuestion(4)">Next Question →</button>
    </div>

    <div class="quiz-score" id="ch4-quiz-score-panel">
      <h2 id="ch4-final-score"></h2>
      <p id="ch4-score-msg" style="font-size:1.1em;margin:10px 0 20px"></p>
      <button class="qbtn" style="background:#15803d;color:#fff" onclick="restartChapterQuiz(4)">🔄 Restart Chapter 4 Quiz</button>
      <button class="qbtn" style="background:#4f46e5;color:#fff" onclick="showTab('ch5')">📘 Continue to Chapter 5</button>
    </div>
  </div>

</div>

<!-- CHAPTER 5 -->
<div id="ch5" class="tab-content">
  <div class="ch-header" style="background:linear-gradient(135deg,#15803d,#0d9488)">
    <h2>🏛️ Chapter 5: Wealth Transfers &amp; Succession Planning</h2>
    <p>How HNWIs pass on wealth — wills, trusts, foundations, life insurance, PICs, and family offices.</p>
  </div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">🎯 5.1 Why Succession Planning Matters <span class="arr">▼</span></div>
  <div class="acc-body">
    <p>Succession planning is about making sure wealth passes smoothly and efficiently to the next generation — minimizing tax, protecting assets, and ensuring the right people get the right assets.</p>
    <div class="concept-box"><div class="icon-lbl">Common Obstacles to Wealth Transfer</div>
    <ul>
      <li><strong>Domicile issues</strong> — where you legally "belong" affects which country's inheritance laws apply</li>
      <li><strong>Forced heirship laws</strong> — some countries (civil law) force you to leave a set % to certain family members, regardless of your wishes</li>
      <li><strong>Taxation</strong> — estate taxes, inheritance taxes, capital gains taxes differ by country</li>
      <li><strong>Personal risks</strong> — bankruptcy, divorce, lawsuit can erode wealth before transfer</li>
      <li><strong>Sovereignty risks</strong> — political instability in countries where assets are held</li>
    </ul></div>
    <div class="concept-box"><div class="icon-lbl">🏠 Domicile vs Tax Residence</div>
    <p><strong>Domicile</strong> = the country you are legally "from" (birthplace or chosen domicile). Affects which country's succession laws apply to your estate.</p>
    <p><strong>Tax Residence</strong> = the country where you pay taxes. Affects which country can tax your income and assets.</p>
    <p>A person can be tax-resident in one country but domiciled in another — important for international clients!</p></div>
    <div class="concept-box"><div class="icon-lbl">⚖️ Common Law vs Civil Law</div>
    <p><strong>Common Law</strong> (Singapore, UK, Australia): Strong freedom of testation — you can leave assets to whoever you choose. Trusts are well-recognized.</p>
    <p><strong>Civil Law</strong> (France, Germany, China): Forced heirship rules require specific shares for family members. Trusts may not be recognized; foundations are more common.</p></div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">🧰 5.2 The Wealth Transfer Toolkit <span class="arr">▼</span></div>
  <div class="acc-body">
    <table class="tbl">
      <tr><th>Tool</th><th>How it Works</th><th>Pros</th><th>Cons / Watch Out</th></tr>
      <tr><td><strong>Inter Vivos Gifts</strong></td><td>Give assets away while still alive</td><td>Immediate transfer; avoids probate; irrevocable</td><td>Cannot be taken back; 5-year rule — creditors can challenge if bankrupt within 5 years</td></tr>
      <tr><td><strong>Wills</strong></td><td>Legal document stating wishes after death</td><td>Simple; revocable (can be changed); clear instructions</td><td>Probate delays; assets frozen during probate; becomes public record</td></tr>
      <tr><td><strong>Joint Ownership</strong></td><td>Assets pass to surviving owner automatically</td><td>Simple; immediate transfer on death (survivorship)</td><td>Less control; no say in who gets it next</td></tr>
      <tr><td><strong>Life Insurance</strong></td><td>Death benefit paid to named beneficiary</td><td>Avoids probate; tax planning; guaranteed payout</td><td>Premiums; cost of insurance charges</td></tr>
      <tr><td><strong>PICs</strong></td><td>Personal Investment Company holds assets</td><td>Tax planning; confidentiality; easier to transfer shares</td><td>Setup costs; corporate governance requirements</td></tr>
      <tr><td><strong>Family Office</strong></td><td>Dedicated office manages family wealth</td><td>Professional management; family governance</td><td>High cost (single-family); less privacy (multi-family)</td></tr>
      <tr><td><strong>Trusts</strong></td><td>Settlor transfers assets to trustee for beneficiaries</td><td>Asset protection; confidentiality; avoids forced heirship</td><td>Complex; lose direct ownership; not recognized in civil law</td></tr>
      <tr><td><strong>Foundations</strong></td><td>Legal entity holds assets per charter/byelaws</td><td>Founder retains more control; beneficiaries need not be named; good for civil law countries</td><td>Not recognized in Singapore; uncertain tax treatment</td></tr>
    </table>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">🏰 5.3 Trusts — Everything You Need to Know <span class="arr">▼</span></div>
  <div class="acc-body">
    <div class="analogy-box"><div class="icon-lbl">🍎 Analogy: A Trust is Like a Safe</div><p>The <em>settlor</em> puts valuables in a safe (the trust) and gives the combination to a trusted friend (the <em>trustee</em>), with instructions to distribute the items to family members (the <em>beneficiaries</em>) according to specific rules. The settlor no longer owns what's in the safe — the trustee holds it for the beneficiaries.</p></div>
    <h4>Trust Components</h4>
    <table class="tbl">
      <tr><th>Party / Component</th><th>Role</th></tr>
      <tr><td><strong>Settlor</strong></td><td>Creates the trust; transfers assets into it; can reserve some powers</td></tr>
      <tr><td><strong>Trustee</strong></td><td>Legally owns and manages trust assets; must act in beneficiaries' best interests</td></tr>
      <tr><td><strong>Beneficiaries</strong></td><td>Receive benefits from the trust assets</td></tr>
      <tr><td><strong>Protector</strong></td><td>Oversees the trustee; can <strong>appoint or remove a trustee</strong> if they are ineffective</td></tr>
      <tr><td><strong>Investment Adviser / Manager</strong></td><td>Manages the investment portfolio within the trust</td></tr>
      <tr><td><strong>Asset Holding Company (AHC)</strong></td><td>Company owned by the trust to hold specific assets (e.g., real estate)</td></tr>
      <tr><td><strong>Letter of Wishes</strong></td><td>Settlor's non-binding guidance to the trustee on how to manage distributions</td></tr>
      <tr><td><strong>Governing Law</strong></td><td>The jurisdiction whose laws govern the trust (e.g., Singapore, Jersey)</td></tr>
    </table>
    <div class="concept-box"><div class="icon-lbl">Fixed Trust vs Discretionary Trust</div>
    <p><strong>Fixed Trust:</strong> Each beneficiary's share is predetermined (e.g., "Alice gets 60%, Bob gets 40%"). The trustee has no discretion.</p>
    <p><strong>Discretionary Trust:</strong> The trustee decides who gets what, and when. More flexible but requires more trust in the trustee.</p></div>
    <div class="concept-box"><div class="icon-lbl">✅ Benefits of a Trust</div>
    <ul>
      <li><strong>Asset protection</strong> — once transferred to trust, assets are generally protected from settlor's creditors (after 5 years)</li>
      <li><strong>Avoids forced heirship</strong> — trustee in Singapore does not have to follow civil law forced heirship rules</li>
      <li><strong>Confidentiality</strong> — unlike wills, trust contents are not public record</li>
      <li><strong>Continuity</strong> — trustee continues managing assets even if settlor dies or is incapacitated</li>
      <li><strong>Tax planning</strong> — can be structured to minimize estate and inheritance taxes</li>
      <li><strong>Custodianship and stewardship</strong> — professional management of assets for vulnerable beneficiaries</li>
    </ul></div>
    <div class="warning-box"><div class="icon-lbl">❌ Reasons Clients May NOT Want a Trust</div>
    <ul>
      <li>Unfamiliar with trust structures (especially civil law clients)</li>
      <li>Uncomfortable handing over legal ownership to a third party (trustee)</li>
      <li>Cannot find a suitable trustee</li>
      <li>Trust deeds are complex and expensive</li>
      <li>Prefer not to disclose beneficiaries</li>
      <li>Consider trusts not cost-effective</li>
    </ul></div>
    <div class="case-box"><h4>📖 Trust Case: Mr Xie</h4>
    <p>Mr Xie (Chinese national) sets up a Singapore trust with his wife and children as beneficiaries, transferring his Singapore properties. His timber company has a S$20M loan with Mr Xie as sole guarantor. If the company fails AFTER the trust has been established for 6 years, can creditors seize the trust assets?</p>
    <p>Answer: <strong>NO</strong> — because Mr Xie is <strong>no longer the legal owner</strong> of the trust assets. The trustee is the legal owner. After the 5-year challenge period has passed, creditors generally cannot claim trust assets.</p>
    <p>Additionally, Mr Xie can express his wishes about distributions to his wife and children through a <strong>Letter of Wishes</strong> — this is non-binding guidance to the trustee but gives him a say.</p></div>
    <div class="ex-box"><h4>✏️ Exercise: Settlor Powers</h4>
    <p>Can a settlor reserve full investment powers over trust assets for himself, or does he have to give them all to the trustee?</p>
    <button class="reveal-btn" onclick="revealAnswer(this)">Reveal Answer</button>
    <div class="answer-box"><strong>A settlor CAN reserve full investment powers for himself.</strong> This is a key feature distinguishing trusts from simpler structures. The settlor can retain control over investment decisions while the trustee handles administrative and distribution functions. This makes trusts attractive to clients who want asset protection but still want to manage their own investments.</div></div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">🏛️ 5.4 Foundations <span class="arr">▼</span></div>
  <div class="acc-body">
    <div class="concept-box"><div class="icon-lbl">What is a Foundation?</div>
    <p>A foundation is a <strong>distinct legal entity</strong> (unlike a trust) that holds assets according to its <strong>charter</strong> (constitution) and <strong>byelaws</strong>. Key difference from a trust: <strong>there is no separation of legal and beneficial ownership</strong> — the foundation itself owns all assets completely.</p>
    <p>Common jurisdictions: Monaco, Liechtenstein, Austria, Panama, Jersey, Seychelles, Labuan. Singapore does <strong>NOT</strong> currently recognise foundations.</p></div>
    <h4>Key Features</h4>
    <ul>
      <li>Established by a <strong>charter</strong>; run by a <strong>council</strong> (not a trustee)</li>
      <li>Funded by <strong>patrimony</strong> — the founder's initial capital contribution</li>
      <li>Founder can reserve extensive rights (more control than a trust settlor)</li>
      <li>Beneficiaries are NOT owners until assets are distributed</li>
      <li>Byelaws govern operations and may be kept private</li>
      <li>A foundation may have an <strong>advisor</strong> (similar to a trust protector)</li>
    </ul>
    <div class="concept-box"><div class="icon-lbl">Trust vs Foundation — Key Differences</div>
    <table class="tbl">
      <tr><th>Feature</th><th>Trust</th><th>Foundation</th></tr>
      <tr><td>Legal entity?</td><td>No (arrangement)</td><td>Yes (its own legal entity)</td></tr>
      <tr><td>Who owns assets?</td><td>Trustee (for beneficiaries)</td><td>The foundation itself</td></tr>
      <tr><td>Governing document</td><td>Trust deed</td><td>Charter + byelaws</td></tr>
      <tr><td>Manager</td><td>Trustee</td><td>Council</td></tr>
      <tr><td>Founder's control</td><td>Limited (settlor)</td><td>More extensive</td></tr>
      <tr><td>Beneficiaries named?</td><td>Usually yes</td><td>Need not be named</td></tr>
      <tr><td>Common law recognition</td><td>Strong</td><td>Limited</td></tr>
    </table></div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">🛡️ 5.5 Life Insurance for HNWIs <span class="arr">▼</span></div>
  <div class="acc-body">
    <h4>Key Insurance Terms</h4>
    <table class="tbl">
      <tr><th>Term</th><th>Meaning</th></tr>
      <tr><td><strong>Policy Owner</strong></td><td>Controls the policy; can modify, surrender, change beneficiaries</td></tr>
      <tr><td><strong>The Insured</strong></td><td>The person whose life is covered; underwriting is performed on them</td></tr>
      <tr><td><strong>Beneficiary</strong></td><td>Receives the death benefit. Can be revocable (easily changed) or irrevocable (needs beneficiary's consent to change)</td></tr>
      <tr><td><strong>Premium</strong></td><td>Payments into the policy. Single premium (once), multi-pay (set years), regular premium (every year)</td></tr>
      <tr><td><strong>Cost of Insurance (COI)</strong></td><td>Charges deducted monthly for the life coverage; affected by age, sex, health, smoking status</td></tr>
      <tr><td><strong>Death Benefit</strong></td><td>The amount paid to beneficiary upon insured's death</td></tr>
      <tr><td><strong>Underwriting</strong></td><td>Insurance company assesses risk: medical underwriting (health check) + financial underwriting (can they afford it?)</td></tr>
    </table>
    <h4>Types of Life Insurance for HNWIs</h4>
    <table class="tbl">
      <tr><th>Type</th><th>How it Works</th><th>HNWI Appeal</th></tr>
      <tr><td><strong>Whole Life</strong></td><td>Permanent coverage; fixed premiums; builds cash value</td><td>Low — limited flexibility, smaller coverage amounts</td></tr>
      <tr><td><strong>Jumbo Term Life</strong></td><td>Coverage for set period (e.g., 15 years); no cash value; very large death benefits (S$20M–S$50M+)</td><td>High for specific needs (e.g., business loans); pure protection</td></tr>
      <tr><td><strong>Universal Life (UL)</strong></td><td>Permanent coverage + investment component (credited interest rate); flexible premiums and coverage</td><td>High — flexibility, large coverage, transparency, guaranteed minimum crediting rates</td></tr>
      <tr><td><strong>Variable Universal Life (VUL)</strong></td><td>Like UL but policy value invested in fund/bond portfolios; more volatile</td><td>High — more control over investments, larger potential returns</td></tr>
      <tr><td><strong>PPLI (Private Placement Life Insurance)</strong></td><td>Like VUL but assets (including PIC shares) held within insurance wrapper; tax-deferred growth</td><td>Very High — control, tax planning, large coverage, transparency</td></tr>
      <tr><td><strong>Income / Annuity</strong></td><td>Provides regular, usually guaranteed income stream</td><td>Retirement planning; limited death benefit</td></tr>
    </table>
    <div class="concept-box"><div class="icon-lbl">🎯 Why Do HNWIs Need Life Insurance?</div>
    <ol>
      <li><strong>Wealth Planning &amp; Transfer:</strong> Guaranteed minimum sum for heirs even if markets fall</li>
      <li><strong>Estate Equalisation:</strong> When assets are illiquid (e.g., a business), insurance provides cash to equalize inheritance among heirs</li>
      <li><strong>Business Insurance:</strong> Key-man insurance protects the business if a key person dies; buy-sell agreements funded by insurance</li>
      <li><strong>Mortgage Repayment:</strong> Insurance pays off mortgages so property passes debt-free</li>
      <li><strong>Debt Protection:</strong> Pays off business or personal debt on unexpected death</li>
      <li><strong>Charitable Giving:</strong> Name a charity as beneficiary to leave a legacy</li>
    </ol></div>
    <div class="case-box"><h4>📖 Business Insurance Case: Mr Wong &amp; Mr Lee</h4>
    <p>Two equal partners in a restaurant business. Each takes out a life insurance policy on the OTHER'S life (cross-purchase). If one dies, the surviving partner uses the insurance proceeds to buy the deceased's shares from the heirs — retaining ownership while releasing value to the other family.</p></div>
    <div class="concept-box"><div class="icon-lbl">Singapore Life Insurance Rules</div>
    <p>Insurance companies are supervised by MAS under the Insurance Act. Financial intermediaries (brokers, advisers) who arrange life insurance must be licensed under the FAA. MAS only supervises Singapore-registered insurers; offshore policies have different protection rules.</p></div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">📊 5.6 Comparative Analysis of Wealth Planning Tools <span class="arr">▼</span></div>
  <div class="acc-body">
    <p>Table 5.7 from the textbook — how each tool performs against key planning needs:</p>
    <table class="ctbl">
      <tr>
        <th style="background:#1a1a2e">Planning Need</th>
        <th style="background:#7c3aed">Wills</th>
        <th style="background:#1d4ed8">Trusts</th>
        <th style="background:#0d9488">Foundations</th>
        <th style="background:#c2410c">Ltd Liability Co.</th>
      </tr>
      <tr><td class="rh">Tax</td><td>❌ Not effective (assets still with owner)</td><td>✅ Effective if owner not beneficiary &amp; irrevocable</td><td>✅ Effective if owner not beneficiary</td><td>⚠️ Tax shifts to company</td></tr>
      <tr><td class="rh">Inheritance Tax</td><td>❌ Not effective</td><td>✅ Trustee is legal owner</td><td>✅ Foundation is legal owner</td><td>❌ Not effective if owner is shareholder</td></tr>
      <tr><td class="rh">Business Risk / Asset Protection</td><td>❌ Assets with owner</td><td>✅ Effective if owner not a beneficiary</td><td>✅ Effective if owner not a beneficiary</td><td>✅ Usually effective</td></tr>
      <tr><td class="rh">Protect Vulnerable Beneficiary</td><td>❌ Not effective</td><td>✅ Effective</td><td>✅ Effective</td><td>⚠️ Limited</td></tr>
    </table>
  </div></div>
  <!-- CHAPTER 5 QUIZ -->
  <div class="card chapter-end-quiz ch5">
    <div class="quiz-hero">
      <h2>📝 Chapter 5 Quiz — 9 Questions</h2>
      <p>Practice the Chapter 5 sample questions before moving on.</p>
    </div>

    <div id="ch5-quiz-start-panel" style="text-align:center;padding:20px">
      <p style="font-size:1.1em;margin-bottom:16px">These 9 questions cover the key Chapter 5 exam-style topics, including case scenarios where relevant.</p>
      <button class="qbtn" style="background:#98a486;color:#fff;font-size:1.1em;padding:12px 32px" onclick="startChapterQuiz(5)">🚀 Start Chapter 5 Quiz</button>
    </div>

    <div id="ch5-quiz-progress-bar" style="display:none">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <span id="ch5-q-counter" style="font-size:.88em;color:#6b7280;font-weight:700"></span>
        <span id="ch5-q-score-live" style="font-size:.88em;color:#16a34a;font-weight:700"></span>
      </div>
      <div class="q-progress"><div class="q-fill" id="ch5-qfill"></div></div>
    </div>

    <div id="ch5-quiz-questions"></div>

    <div style="text-align:center;margin:16px 0;display:none" id="ch5-quiz-nav">
      <button class="qbtn" id="ch5-nextBtn" style="background:#4f46e5;color:#fff" onclick="nextChapterQuizQuestion(5)">Next Question →</button>
    </div>

    <div class="quiz-score" id="ch5-quiz-score-panel">
      <h2 id="ch5-final-score"></h2>
      <p id="ch5-score-msg" style="font-size:1.1em;margin:10px 0 20px"></p>
      <button class="qbtn" style="background:#15803d;color:#fff" onclick="restartChapterQuiz(5)">🔄 Restart Chapter 5 Quiz</button>
      <button class="qbtn" style="background:#4f46e5;color:#fff" onclick="showTab('ch6')">📘 Continue to Chapter 6</button>
    </div>
  </div>

</div>

<!-- CHAPTER 6 -->
<div id="ch6" class="tab-content">
  <div class="ch-header" style="background:linear-gradient(135deg,#b91c1c,#be185d)">
    <h2>⚖️ Chapter 6: Ethical Conduct</h2>
    <p>Why ethics matter in finance, the difference from compliance, fiduciary duties, and how to handle conflicts of interest.</p>
  </div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">💡 6.1 Ethics vs Compliance <span class="arr">▼</span></div>
  <div class="acc-body">
    <div class="analogy-box"><div class="icon-lbl">🚦 Analogy: Traffic Lights</div><p><strong>Compliance</strong> = stopping at a red light because there's a camera and you'll get fined. <strong>Ethics</strong> = stopping at a red light at 3am when there's no camera — because it's the right thing to do for everyone's safety.</p></div>
    <table class="tbl">
      <tr><th></th><th>Compliance</th><th>Ethics</th></tr>
      <tr><td><strong>Definition</strong></td><td>Meeting the letter of laws, rules, and regulations</td><td>Doing the right thing based on moral principles</td></tr>
      <tr><td><strong>Motivation</strong></td><td>Avoid sanctions, fines, imprisonment</td><td>Doing what's right for clients, society, and markets</td></tr>
      <tr><td><strong>Standard</strong></td><td>"Letter of the law"</td><td>"Spirit of the law"</td></tr>
      <tr><td><strong>Level</strong></td><td>Minimum required standard</td><td>Goes beyond minimum requirements</td></tr>
    </table>
    <div class="case-box"><h4>📖 Case: LIBOR/SIBOR Scandal</h4>
    <p>MAS investigated Singapore traders (2007–2011) who attempted to influence interbank rates (SIBOR, swap rates). MAS found no criminal behaviour — the traders were technically <em>compliant</em> with laws. But their conduct was clearly <strong>unethical</strong>. MAS said: "We expect banks to foster a culture of ethical conduct among ALL employees." About 75% of involved traders resigned or were dismissed.</p></div>
    <div class="concept-box"><div class="icon-lbl">Why Ethics Matter in Finance</div>
    <p>Finance products are <strong>intangible</strong> — unlike buying a car (you can see and test it), clients CANNOT evaluate financial advice quality directly. They rely entirely on their adviser's honesty and expertise. Without trust, the entire financial advisory industry breaks down. As Warren Buffett said: "It takes 20 years to build a reputation and five minutes to destroy it."</p></div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">🔧 6.2 The Ethical Framework <span class="arr">▼</span></div>
  <div class="acc-body">
    <div class="concept-box"><div class="icon-lbl">Figure 6.3 — The Ethical Framework for Financial Services Practitioners</div>
    <p>The framework has 5 components, all centred on the Representative:</p>
    <table class="tbl">
      <tr><th>Component</th><th>What it Means</th></tr>
      <tr><td><strong>Understand Products/Services</strong></td><td>Know the product thoroughly before recommending — understand all risks and features</td></tr>
      <tr><td><strong>Analyse Risks</strong></td><td>Assess all risks; ensure they fit the client's risk tolerance and financial capacity</td></tr>
      <tr><td><strong>Execute Solutions</strong></td><td>Formulate and execute solutions efficiently, transparently, and fairly</td></tr>
      <tr><td><strong>Serve Clients</strong></td><td>Always act in clients' best interests; never place self-interest first</td></tr>
      <tr><td><strong>Safeguard Reputation</strong></td><td>Carry out work professionally; recognise that unethical behaviour harms the firm and industry</td></tr>
    </table></div>
    <div class="concept-box"><div class="icon-lbl">Why Do People Act Unethically?</div>
    <p><strong>External factors:</strong> Client pressure to break rules; threat of losing a deal.</p>
    <p><strong>Internal factors:</strong></p>
    <ul>
      <li>Lack of knowledge or experience (doesn't know the rules)</li>
      <li>Deliberate acts for personal financial gain or recognition</li>
      <li>Peer pressure — supervisors or colleagues push unethical behaviour in a high-pressure sales culture</li>
    </ul></div>
    <div class="concept-box"><div class="icon-lbl">🔍 3 Threat Types to Ethical Behaviour</div>
    <table class="tbl">
      <tr><th>Threat</th><th>Description</th><th>Example</th></tr>
      <tr><td><strong>Self-Interest</strong></td><td>Personal monetary or non-monetary benefit clouds judgment</td><td>Recommending a product that pays higher commission rather than the best product for the client</td></tr>
      <tr><td><strong>Self-Review</strong></td><td>Inability to objectively review your own recommendations</td><td>An analyst approving their own investment recommendation without independent review</td></tr>
      <tr><td><strong>Influence</strong></td><td>Being pressured by clients, superiors, or colleagues</td><td>A junior RM pressured by a team leader to close a deal by any means necessary</td></tr>
    </table></div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">📋 6.3 Standards of Professional Conduct <span class="arr">▼</span></div>
  <div class="acc-body">
    <div class="concept-box"><div class="icon-lbl">6.5.1.1 Professionalism</div>
    <ul>
      <li><strong>Knowledge of the Law:</strong> Know and comply with all applicable laws (SFA, FAA); do not knowingly assist in violations</li>
      <li><strong>Independence &amp; Objectivity:</strong> Do not accept gifts or benefits that compromise independence; resist internal pressure when making recommendations</li>
      <li><strong>Misrepresentation:</strong> Never knowingly provide false information or omit material facts to induce investment decisions</li>
      <li><strong>Misconduct:</strong> No dishonesty, fraud, or conduct that damages professional reputation</li>
    </ul></div>
    <div class="case-box"><h4>📖 Misrepresentation Case: Adviser B</h4>
    <p>Adviser B needed to meet sales targets. He found no capital-guaranteed product for his client, so he altered a product term sheet by superimposing false information to make it appear capital-guaranteed. The client invested. This is <strong>criminal fraudulent misrepresentation</strong> — altering official documents is a criminal act.</p></div>
    <div class="concept-box"><div class="icon-lbl">6.5.1.2 Fiduciary Standards</div>
    <p>A <strong>fiduciary</strong> is someone who acts on behalf of another, placing the client's interests ABOVE their own. Two key fiduciary duties:</p>
    <ul>
      <li><strong>Duty of Loyalty, Prudence, and Care:</strong> Act with competence; provide quality advice; maintain expected standards of a professional</li>
      <li><strong>Duty of Fair Dealing and Good Faith:</strong> Follow client instructions promptly; act fairly and honestly even when no explicit contract exists</li>
    </ul></div>
    <div class="concept-box"><div class="icon-lbl">6.5.1.3 Duties to Clients</div>
    <ul>
      <li><strong>Loyalty, Prudence, and Care:</strong> Act in client's best interest; carry out client transactions before own</li>
      <li><strong>Fair Dealing and Good Faith:</strong> Provide timely execution; inform clients of any changes with justification; be transparent about communications</li>
      <li><strong>Suitability:</strong> Match product risk to client profile; understand client's financial situation and objectives; review suitability in the context of their TOTAL portfolio</li>
      <li><strong>Preservation of Confidentiality:</strong> Keep all client info (personal AND portfolio) confidential unless legally required to disclose, or client permits disclosure</li>
    </ul></div>
    <div class="concept-box"><div class="icon-lbl">6.5.1.4 Duties to Employers</div>
    <ul>
      <li><strong>Employer Responsibilities:</strong> Must provide clear conduct codes, training, remuneration policies, and whistleblowing procedures</li>
      <li><strong>Employee Responsibilities:</strong> Comply with employer's code of conduct; act in good faith; protect firm's reputation; remain <em>fit and proper</em> at all times</li>
      <li><strong>Whistleblowing:</strong> If you know of wrongdoing, you MUST report it. Staying silent when you know of wrongdoing = collusion. Report to appropriate authorities to protect market integrity.</li>
      <li><strong>When Leaving an Employer:</strong> No solicitation (cannot take client lists to new employer without permission); no misappropriation of trade secrets (broker relationship policies, trading strategies); confidentiality obligations continue after leaving</li>
      <li><strong>Additional Compensation:</strong> Cannot secretly arrange extra payments from clients without employer's knowledge and consent</li>
      <li><strong>Supervisors:</strong> Must ensure staff they supervise follow all laws and regulations. MAS places responsibility on board and senior management of CMS licence holders.</li>
    </ul></div>
  </div></div>

  <div class="acc"><div class="acc-head" onclick="toggleAcc(this)">⚡ 6.4 Conflicts of Interest <span class="arr">▼</span></div>
  <div class="acc-body">
    <div class="concept-box"><div class="icon-lbl">Types of Conflicts of Interest</div>
    <ul>
      <li><strong>Conflict against clients:</strong> Personal investments clash with client interests (e.g., front running); allocation favours some clients over others</li>
      <li><strong>Conflict against employer:</strong> Covered Person's family has interest in a deal the employer is working on; must declare and recuse</li>
      <li><strong>Cross-department conflicts (Chinese Walls):</strong> One department advises a company on fundraising while another advises private banking clients to buy. Information barriers (Chinese walls) prevent information flowing between departments.</li>
    </ul></div>
    <div class="concept-box"><div class="icon-lbl">Priority of Transactions</div>
    <p>Client orders ALWAYS come first. If a Covered Person wants to trade for their own account, they must execute ALL client orders first. Withholding a client's order to execute their own first is unethical and potentially criminal.</p></div>
    <div class="case-box"><h4>📖 Conflict Case 1: Adviser Z (Front Running)</h4>
    <p>Z knows his client plans to buy a large stake in ABC Co. Z buys shares for his own account FIRST, then executes the client's order, profiting from the price rise caused by the client's buy.</p>
    <p>This is <strong>front running / parallel running</strong> — acting in conflict at the client's expense. Z faces <strong>criminal prosecution AND regulatory punishment</strong>.</p></div>
    <div class="case-box"><h4>📖 Conflict Case 2: Adviser X (Affiliated Funds — Resolved)</h4>
    <p>X recommends hedge funds including two affiliated with her bank. She documents the affiliation, discloses it to the client, and the client chooses to invest in one of those funds anyway.</p>
    <p>This is a <strong>conflict that is properly resolved</strong> — the client made an informed decision with full disclosure. No violation occurs if conflicts are properly and prominently disclosed.</p></div>
    <div class="concept-box"><div class="icon-lbl">6 Steps to Understand Your Ethical Role</div>
    <ol>
      <li><strong>Put clients' interests first</strong> — their needs take priority over yours and the firm's</li>
      <li><strong>Integrity, competence, diligence, and respect</strong> — no conflicts; fair charges; attend training</li>
      <li><strong>Care and independent judgment</strong> — understand products; know client needs; observe best execution</li>
      <li><strong>Build trust; respect market conduct rules</strong> — maintain confidentiality; comply with whistleblowing procedures</li>
      <li><strong>Disassociate from the deal</strong> — be objective; don't take sides; advise client if their large order could impact the market</li>
      <li><strong>Seek Legal &amp; Compliance guidance when in doubt</strong> — communicate with supervisors; escalate ethical dilemmas</li>
    </ol></div>
    <div class="ex-box"><h4>✏️ Ethical Dilemma</h4>
    <p>J, a relationship manager, is under heavy pressure to meet his team's asset acquisition target. He is working on a large transaction and knows that recommending certain unsuitable products would close the deal. Should he recommend them?</p>
    <button class="reveal-btn" onclick="revealAnswer(this)">Reveal Answer</button>
    <div class="answer-box"><strong>NO.</strong> This is a classic ethical dilemma — the pressure to meet targets (self-interest + influence threats) vs. duty to the client. J's primary obligation is to the client. Recommending unsuitable products to meet targets is a suitability violation AND unethical. J should: document the dilemma, seek L&amp;C guidance, and recommend only suitable products. Losing the deal is better than losing professional integrity or facing regulatory action.</div></div>
  </div></div>
  <!-- CHAPTER 6 QUIZ -->
  <div class="card chapter-end-quiz ch6">
    <div class="quiz-hero">
      <h2>📝 Chapter 6 Quiz — 5 Questions</h2>
      <p>Practice the Chapter 6 sample questions before moving on.</p>
    </div>

    <div id="ch6-quiz-start-panel" style="text-align:center;padding:20px">
      <p style="font-size:1.1em;margin-bottom:16px">These 5 questions cover the key Chapter 6 exam-style topics, including case scenarios where relevant.</p>
      <button class="qbtn" style="background:#ad8d86;color:#fff;font-size:1.1em;padding:12px 32px" onclick="startChapterQuiz(6)">🚀 Start Chapter 6 Quiz</button>
    </div>

    <div id="ch6-quiz-progress-bar" style="display:none">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <span id="ch6-q-counter" style="font-size:.88em;color:#6b7280;font-weight:700"></span>
        <span id="ch6-q-score-live" style="font-size:.88em;color:#16a34a;font-weight:700"></span>
      </div>
      <div class="q-progress"><div class="q-fill" id="ch6-qfill"></div></div>
    </div>

    <div id="ch6-quiz-questions"></div>

    <div style="text-align:center;margin:16px 0;display:none" id="ch6-quiz-nav">
      <button class="qbtn" id="ch6-nextBtn" style="background:#4f46e5;color:#fff" onclick="nextChapterQuizQuestion(6)">Next Question →</button>
    </div>

    <div class="quiz-score" id="ch6-quiz-score-panel">
      <h2 id="ch6-final-score"></h2>
      <p id="ch6-score-msg" style="font-size:1.1em;margin:10px 0 20px"></p>
      <button class="qbtn" style="background:#15803d;color:#fff" onclick="restartChapterQuiz(6)">🔄 Restart Chapter 6 Quiz</button>
      <button class="qbtn" style="background:#4f46e5;color:#fff" onclick="showTab('flashcards')">🗂️ Continue to Flashcards</button>
    </div>
  </div>

</div>

<!-- FLASHCARDS -->
<div id="flashcards" class="tab-content">
  <div class="ch-header" style="background:linear-gradient(135deg,#6d28d9,#4f46e5)">
    <h2>🃏 Flashcards — 50 Key Concepts</h2>
    <p>Click any card to flip and reveal the answer. Test yourself across all 6 chapters!</p>
  </div>
  <div class="fc-controls">
    <button class="fc-btn" onclick="flipAll(true)">Flip All Open</button>
    <button class="fc-btn" onclick="flipAll(false)" style="background:#4f46e5">Reset All</button>
    <span id="fc-score" style="font-weight:700;color:#6d28d9;margin-left:10px"></span>
  </div>
  <div class="fc-grid" id="fcgrid"></div>
</div>

<!-- QUIZ -->
<div id="quiz" class="tab-content">
  <div class="quiz-hero">
    <h2>📝 Practice Quiz — 2 Sets × 50 Questions</h2>
    <p>Choose a question set first, then start in chapter order or shuffle the selected set.</p>
  </div>
  <div id="quiz-start-panel" style="text-align:center;padding:20px">
    <p style="font-size:1.1em;margin-bottom:16px">Select one 50-question practice set. Explanations are shown after each answer.</p>
    <div id="quiz-set-panel" style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-bottom:16px">
      <button class="qbtn" id="quiz-set1-btn" style="background:#8d7cb8;color:#fff;font-size:1.05em;padding:12px 28px" onclick="selectQuizSet('set1')">📘 Set 1 — 50 Questions</button>
      <button class="qbtn" id="quiz-set2-btn" style="background:#7f9fc4;color:#fff;font-size:1.05em;padding:12px 28px" onclick="selectQuizSet('set2')">📗 Set 2 — 50 Questions</button>
    </div>
    <div id="quiz-mode-panel" style="display:none">
      <p id="selected-quiz-set-label" style="font-size:1em;margin-bottom:12px;font-weight:800;color:#5f5149"></p>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px">
        <button class="qbtn" style="background:#be185d;color:#fff;font-size:1.1em;padding:12px 32px" onclick="startQuiz()">🚀 Start in Chapter Order</button>
        <button class="qbtn" style="background:#7f8fa3;color:#fff;font-size:1.1em;padding:12px 32px" onclick="startShuffledQuiz()">🔀 Shuffle Selected 50 Questions</button>
      </div>
    </div>
  </div>
  <div id="quiz-progress-bar" style="display:none">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
      <span id="q-counter" style="font-size:.88em;color:#6b7280;font-weight:700"></span>
      <span id="q-score-live" style="font-size:.88em;color:#16a34a;font-weight:700"></span>
    </div>
    <div class="q-progress"><div class="q-fill" id="qfill"></div></div>
  </div>
  <div id="quiz-questions"></div>
  <div style="text-align:center;margin:16px 0;display:none" id="quiz-nav">
    <button class="qbtn" id="nextBtn" style="background:#4f46e5;color:#fff" onclick="nextQuestion()">Next Question →</button>
  </div>
  <div class="quiz-score" id="quiz-score-panel">
    <h2 id="final-score"></h2>
    <p id="score-msg" style="font-size:1.1em;margin:10px 0 20px"></p>
    <button class="qbtn" style="background:#15803d;color:#fff" onclick="restartQuiz()">🔄 Restart Quiz</button>
    <button class="qbtn" style="background:#4f46e5;color:#fff" onclick="showTab('home')">🏠 Back to Home</button>
  </div>
</div>`;

  function injectBody() {
    document.body.innerHTML = BODY_HTML;
  }

  /* ---------- 4. App logic (tabs, accordions, flashcards, quiz) ---------- */
  function attachLogic() {
// TAB NAVIGATION
function showTab(id){
  document.querySelectorAll('.tab-content').forEach(function(t){
    t.classList.remove('active');
    t.style.display = 'none';
  });

  document.querySelectorAll('.tab-btn').forEach(function(b){
    b.classList.remove('active');
  });

  var target = document.getElementById(id);
  if(target){
    target.classList.add('active');
    target.style.display = 'block';
  }

  var btn = document.querySelector('.t-'+id.replace('flashcards','flash').replace('quiz','quiz'));
  if(btn){
    btn.classList.add('active');
  }

  window.scrollTo({top:0,behavior:'smooth'});
}

// ACCORDION
function toggleAcc(el){
  var body=el.nextElementSibling;
  var isOpen=body.classList.contains('open');
  body.classList.toggle('open',!isOpen);
  el.classList.toggle('open',!isOpen);
}

// REVEAL ANSWERS
function revealAnswer(btn){
  var ans=btn.nextElementSibling;
  ans.classList.add('show');
  btn.textContent='✅ Answer Revealed';
  btn.disabled=true;
  btn.style.background='#15803d';
}

// FLASHCARD DATA
var cards=[
  // Ch1
  {f:"What is the Securities and Futures Act (SFA)?",b:"Singapore law governing capital markets, securities trading, market misconduct, and licensing of dealers and advisers."},
  {f:"What is the Financial Advisers Act (FAA)?",b:"Singapore law governing financial advisers who give investment advice or arrange investment products."},
  {f:"What is Insider Trading?",b:"Trading securities based on material, non-public (price-sensitive) information. Connected persons are presumed to know. Connected = officers, substantial shareholders (≥5%), associates."},
  {f:"What is Front Running?",b:"A broker trades for their OWN account BEFORE executing a client's large order that they know will move the price. Criminal offence."},
  {f:"What is Bucketing?",b:"A broker pretends to execute a client's order but pockets the price difference instead. The order is not properly executed."},
  {f:"Accredited Investor — Individual criteria?",b:"Net Personal Assets >S$2M OR Net Financial Assets >S$1M OR Income ≥S$300,000 in past 12 months. Must actively OPT IN — not automatic!"},
  {f:"Accredited Investor — Corporation criteria?",b:"Net assets exceeding S$10 million (or equivalent). Assessed via most recent audited balance sheet."},
  {f:"What is Market Manipulation?",b:"Artificially influencing securities prices through false trades, rumours, or other deceptive means to create a false market impression."},
  {f:"What is Securities Hawking?",b:"Selling or offering securities in an unsolicited manner, door-to-door or by cold-calling. Prohibited under the SFA."},
  // Ch2
  {f:"What does CPD stand for and what is the minimum?",b:"Continuing Professional Development. Minimum 15 CPD hours per year for Covered Persons under the PB Code."},
  {f:"What is Churning?",b:"Excessive buying and selling of client investments to generate commissions for the adviser, with no real benefit to the client. This is mis-selling."},
  {f:"What must a bank disclose about its capacity?",b:"Whether it is acting as AGENT (finding best deal for client) or PRINCIPAL (selling from its own inventory). Must be disclosed prominently."},
  {f:"Who is a Vulnerable Client?",b:"A client aged 62 or older OR not proficient in written or spoken English. Extra care, simpler language, and additional documentation required."},
  {f:"What are Call Reports?",b:"Written records of all client meetings and investment discussions. Required under the PB Code. Documents advice given and maintains accountability."},
  // Ch3
  {f:"The 3 Stages of Money Laundering?",b:"1. PLACEMENT — dirty money enters the financial system. 2. LAYERING — money moved to hide its origin. 3. INTEGRATION — clean money re-enters the economy."},
  {f:"What is ECDD/EDD?",b:"Enhanced Customer Due Diligence — extra verification required for higher-risk clients (PEPs, complex structures, high-risk countries, cash-intensive businesses)."},
  {f:"What is a PEP?",b:"Politically Exposed Person — someone who holds or held a prominent public function (minister, judge, military general). PEP coverage also extends to immediate family and close associates."},
  {f:"What is the No Tipping Off rule?",b:"After filing (or deciding to file) a Suspicious Transaction Report (STR), you must NEVER tell the client or anyone involved. Tipping off is a CRIMINAL OFFENCE."},
  {f:"What is CRS?",b:"Common Reporting Standard — international agreement where banks automatically share account info with foreign tax authorities to combat tax evasion. Singapore participates."},
  {f:"What is FATCA?",b:"Foreign Account Tax Compliance Act — US law requiring foreign financial institutions to report accounts held by US persons to the IRS."},
  {f:"What is the PDPA Data Breach obligation?",b:"Banks must report data breaches to BOTH the MAS (banking regulator) AND the PDPC (Personal Data Protection Commission)."},
  {f:"What is SOW corroboration?",b:"Source of Wealth must be independently corroborated — e.g., confirmation from a CFO or HR Head. A client's own statement or a letter from their relative is NOT independent enough."},
  {f:"Who is the Beneficial Owner (BO)?",b:"The person who ultimately owns or controls an account. For corporate accounts, generally someone with >25% stake. Banks must identify and verify the BO."},
  {f:"What does STR stand for?",b:"Suspicious Transaction Report — must be filed with STRO (Suspicious Transaction Reporting Office) when transactions appear suspicious. No tipping off after filing!"},
  // Ch4
  {f:"What is a PIC Account?",b:"Personal Investment Company — a company owned by the client to hold investments. Provides tax benefits and confidentiality. Bank must identify the beneficial owner."},
  {f:"What is a SIP?",b:"Specified Investment Product — a complex product requiring additional safeguards for retail investors. Listed SIPs (ETFs, warrants, futures) and Unlisted SIPs (OTC derivatives, structured products)."},
  {f:"CAR vs CKA?",b:"CAR (Customer Account Review) = for retail clients wanting UNLISTED SIPs at banks. CKA (Customer Knowledge Assessment) = for retail clients wanting LISTED SIPs at CMS licensees."},
  {f:"SGX Settlement: T+2?",b:"Securities traded on SGX must settle T+2 — trade date plus 2 business days. Buyers need funds; sellers need shares by settlement date."},
  {f:"Fill or Kill (FOK) vs Fill and Kill (FAK)?",b:"FOK = entire order must fill immediately or it is all cancelled. FAK = whatever fills immediately is kept; the remainder is cancelled."},
  {f:"What is Best Execution?",b:"Getting the best possible result for clients when executing orders, considering: price, speed, and likelihood of execution. Client orders must ALWAYS come before the adviser's own orders."},
  {f:"How long must client records be kept?",b:"Minimum 5 years. Includes KYC documents, transaction records, contract notes, account statements, and records of advice given."},
  {f:"Price Improvement Rule?",b:"If a bank executes a trade at a better price than quoted to the client, the savings must be PASSED TO THE CLIENT — not kept by the bank."},
  // Ch5
  {f:"What is a Settlor?",b:"The person who creates a trust and transfers assets into it. Can reserve investment powers for themselves. Is no longer the legal owner of trust assets after transfer."},
  {f:"What is the role of a Trustee?",b:"Legally owns and manages trust assets on behalf of beneficiaries. Must act in beneficiaries' best interests at all times."},
  {f:"What is the role of a Protector in a trust?",b:"Oversees the trustee. Main role: appoint or REMOVE a trustee if the existing one is ineffective or not acting in beneficiaries' interests."},
  {f:"Fixed Trust vs Discretionary Trust?",b:"Fixed Trust = beneficiaries' shares predetermined (e.g., 60/40). Discretionary Trust = trustee decides who gets what and when. More flexibility with discretionary."},
  {f:"What is a Letter of Wishes?",b:"Non-binding guidance from the settlor to the trustee on how to manage distributions. Gives the settlor a say without giving legal instructions. NOT legally enforceable."},
  {f:"What is a Foundation?",b:"A distinct legal entity (unlike a trust) that owns assets per its charter and byelaws. Run by a Council. Founder can reserve more control than a trust settlor. Singapore does NOT recognise foundations."},
  {f:"What is PPLI?",b:"Private Placement Life Insurance — assets (including PIC shares) held within an insurance wrapper. Tax-deferred growth; used for wealth transfer and tax planning. High control and transparency for HNWIs."},
  {f:"Why is Jumbo Term Life used by HNWIs?",b:"For large death benefits (S$20M–S$50M+) for a set period — e.g., to repay a business loan if the owner dies. Pure protection, no cash value, but very large coverage amounts."},
  {f:"What is Estate Equalisation?",b:"Using life insurance proceeds to create additional cash to equalise the distribution of illiquid assets (like a family business) fairly among heirs."},
  {f:"What is the 5-year rule for trusts?",b:"Creditors can generally challenge assets transferred into a trust within 5 years if the transfer was made to defraud creditors. After 5 years, assets are typically protected."},
  // Ch6
  {f:"Ethics vs Compliance — key difference?",b:"Compliance = following the LETTER of the law (minimum standard, motivated by fear of penalties). Ethics = following the SPIRIT of the law (doing right because it's right, even when no one is watching)."},
  {f:"What is a Fiduciary?",b:"Someone who acts on behalf of another, placing the client's interests ABOVE their own. Bound by Duty of Loyalty/Prudence/Care AND Duty of Fair Dealing/Good Faith."},
  {f:"What is the Priority of Transactions rule?",b:"Client orders ALWAYS come first. Covered Persons must NOT trade for their own account until ALL client orders are completed. Violating this = front running = criminal offence."},
  {f:"What is whistleblowing?",b:"Reporting wrongdoing or unethical conduct to the appropriate authority. If you are aware of wrongdoing and stay silent, it can be construed as COLLUSION. Silence = potentially criminal."},
  {f:"What are the 3 threats to ethical behaviour?",b:"1. SELF-INTEREST — personal gain clouds judgment. 2. SELF-REVIEW — inability to objectively review own work. 3. INFLUENCE — pressure from clients, superiors, or colleagues."},
  {f:"When leaving an employer, what are 3 rules?",b:"1. NO SOLICITATION — cannot take client files to new employer without permission. 2. NO MISAPPROPRIATION of trade secrets (broker policies, trading strategies). 3. CONFIDENTIALITY continues — keep all previous employer's client info confidential."},
  {f:"What are Chinese Walls?",b:"Information barriers between departments to prevent conflicts of interest. E.g., a department advising a company on fundraising must not share information with the private banking department advising clients to buy that company's shares."},
  {f:"Main objective of the Ethical Framework?",b:"To SERVE THE BEST INTEREST OF CLIENTS — with integrity, using proper understanding of products and risks, executing solutions fairly and transparently, while safeguarding the firm's reputation."}
];

// RENDER FLASHCARDS
function renderFlashcards(){
  var g=document.getElementById('fcgrid');
  g.innerHTML='';
  cards.forEach(function(c,i){
    g.innerHTML+='<div class="fc" id="fc'+i+'" onclick="flipCard('+i+')">'
      +'<div class="fc-inner">'
      +'<div class="fc-front"><span class="fc-num">'+(i+1)+'/'+cards.length+'</span>'+c.f+'</div>'
      +'<div class="fc-back"><span class="fc-num">'+(i+1)+'/'+cards.length+'</span>'+c.b+'</div>'
      +'</div></div>';
  });
}
function flipCard(i){document.getElementById('fc'+i).classList.toggle('flipped');}
function flipAll(open){
  for(var i=0;i<cards.length;i++){
    var el=document.getElementById('fc'+i);
    if(el) el.classList.toggle('flipped',open);
  }
}


// CHAPTER 1 END-OF-CHAPTER QUIZ DATA (8 sample questions)

var chapterQuizData = {
  "1": [
    {q:"Which of the following best describes the purpose of the Private Banking Code of Conduct?",opts:["To regulate all retail banking activities in Singapore","To establish competency and market conduct standards for Covered Persons and Covered Entities","To replace MAS regulations governing financial institutions","To regulate only investment products sold to institutional investors"],ans:1,expl:"The PB Code focuses on competency and market conduct standards for Covered Persons and Covered Entities."},
    {q:"Which organisation serves as Singapore's central bank and integrated financial regulator?",opts:["SGX","CDP","MAS","SDIC"],ans:2,expl:"MAS functions as both Singapore's central bank and integrated financial regulator."},
    {q:"Which of the following activities would most likely constitute insider trading?",opts:["Purchasing shares based on publicly available annual reports","Purchasing shares after reading a newspaper article","Buying shares while possessing material non-public information","Buying shares based on technical analysis"],ans:2,expl:"Insider trading involves dealing while in possession of material information that is not generally available."},
    {q:"Under the SFA, a person in possession of inside information is prohibited from:",opts:["Conducting fundamental analysis","Purchasing government bonds","Communicating the information to another person likely to trade","Reviewing public company filings"],ans:2,expl:"The SFA prohibits communicating inside information where the recipient is likely to trade."},
    {q:"What is the primary objective of SGX RegCo?",opts:["Increasing SGX profitability","Managing client portfolios","Separating regulatory functions from SGX's commercial activities","Supervising all private banks"],ans:2,expl:"SGX RegCo was established to independently oversee regulatory functions."},
    {q:"Which statement regarding \"bucketing\" is correct?",opts:["It enhances market transparency","It ensures best execution","It involves taking the opposite side of a customer's order for profit","It is encouraged during volatile markets"],ans:2,expl:"Bucketing occurs when a broker takes the opposite side of a client's order rather than executing it properly."},
    {q:"Why is bucketing prohibited?",opts:["It increases market liquidity","It prevents client orders from receiving competitive execution","It reduces trading volume","It delays settlement"],ans:1,expl:"Bucketing deprives clients of competitive bids and offers and may deny best execution."},
    {q:"A person intentionally fails to disclose a material event required under SGX listing rules. This may constitute:",opts:["Front-running","False trading","Breach of continuous disclosure obligations","Wash trading"],ans:2,expl:"Issuers must disclose specified material information under listing requirements."},
    {q:"Which statement best describes a \"connected person\" for insider trading purposes?",opts:["Any retail investor","A customer of a listed company","An officer or substantial shareholder of a corporation","Any SGX member"],ans:2,expl:"Officers and substantial shareholders are examples of connected persons under insider trading provisions."},
    {q:"The settlement cycle for SGX securities trades is generally:",opts:["T+0","T+1","T+2","T+5"],ans:2,expl:"SGX securities transactions generally settle on a T+2 basis."},
    {q:"Which entity provides deposit insurance protection in Singapore?",opts:["MAS","SGX","CDP","SDIC"],ans:3,expl:"SDIC administers the Deposit Insurance Scheme."},
    {q:"A Covered Person carries out regulated activities on behalf of a CMSL holder as:",opts:["Depositor","Appointed Representative","Trustee","Sponsor"],ans:1,expl:"Individuals conducting regulated activities for CMSL holders are appointed representatives."},
    {q:"Which market misconduct offence involves creating a misleading appearance of active trading?",opts:["Insider trading","Continuous disclosure breach","False trading","Bucketing"],ans:2,expl:"False trading creates artificial market activity and misleads investors."},
    {q:"A person disseminates information that a share price will rise because of an illegal market-rigging transaction. This may breach:",opts:["Continuous disclosure rules","Dissemination of information about illegal transactions provisions","Deposit insurance rules","Trust law"],ans:1,expl:"Disseminating information linked to illegal transactions is prohibited."},
    {q:"Which SGX board generally caters to established companies with higher admission requirements?",opts:["Catalist","Mainboard","Growth Board","SME Board"],ans:1,expl:"Mainboard companies generally face higher admission standards."},
    {q:"Which of the following is NOT normally considered material non-public information?",opts:["Unannounced merger discussions","Pending profit warning","Publicly released annual report","Significant undisclosed litigation"],ans:2,expl:"Once publicly released, information is generally available to the market."},
    {q:"The term \"material effect\" in insider trading generally refers to information likely to:",opts:["Affect exchange operating hours","Influence investment decisions","Increase brokerage commissions","Delay settlement"],ans:1,expl:"Material information is information likely to influence investment decisions."},
    {q:"Which organisation performs clearing and settlement for SGX-listed securities?",opts:["MAS","CDP","SGX RegCo","SDIC"],ans:1,expl:"CDP performs securities clearing, settlement and custody functions."},
    {q:"Which of the following best describes a Wholesale Bank?",opts:["Accepts unrestricted retail deposits","Primarily serves wholesale and corporate banking clients","Operates as Singapore's central bank","Provides only fund management services"],ans:1,expl:"Wholesale Banks focus on wholesale banking activities and face restrictions compared with Full Banks."},
    {q:"Which statement best describes the responsibility of a Covered Entity?",opts:["It only supervises administrative staff.","It is responsible for ensuring regulatory compliance by its Covered Persons.","It only reports to shareholders.","It has no responsibility for representatives."],ans:1,expl:"Covered Entities are responsible for supervising and ensuring compliance by their representatives."}
  ],
  "2": [
    {q:"Which of the following best describes the primary purpose of the PB Code?",opts:["To replace MAS regulations","To provide minimum competency and market conduct standards for the private banking industry","To regulate all retail banking activities","To regulate only foreign private banks"],ans:1,expl:"The PB Code establishes industry standards relating to competency and market conduct for Covered Entities and Covered Persons."},
    {q:"The two key pillars of the PB Code are:",opts:["AML and KYC","Competency and Market Conduct","Product Knowledge and Sales","Compliance and Audit"],ans:1,expl:"The PB Code is structured around Competency and Market Conduct requirements."},
    {q:"A Covered Person receives material non-public information from a client. What should he do?",opts:["Inform selected clients","Trade immediately before the information becomes public","Maintain confidentiality and refrain from trading","Share the information with colleagues"],ans:2,expl:"Trading or communicating inside information is prohibited."},
    {q:"Which of the following is an example of a conflict of interest?",opts:["Recommending a product because it best suits the client","Recommending a product solely because it generates higher commissions","Updating a client's risk profile","Performing annual reviews"],ans:1,expl:"Personal gain should never override the client's interests."},
    {q:"Under the PB Code, Covered Persons should act:",opts:["In the best interests of themselves","In the best interests of their clients","In the best interests of product issuers","Only according to sales targets"],ans:1,expl:"Acting in the client's best interests is a core conduct principle."},
    {q:"Which statement regarding gifts and entertainment is MOST appropriate?",opts:["All gifts are prohibited","Gifts are acceptable only if not disclosed","Appropriate records should be maintained and reviewed","Expensive gifts are encouraged"],ans:2,expl:"Gifts and entertainment must be properly monitored and controlled."},
    {q:"Front-running occurs when a Covered Person:",opts:["Executes client orders quickly","Trades ahead of a client order for personal benefit","Reviews client portfolios","Updates risk profiles"],ans:1,expl:"Front-running places personal interests ahead of clients and is prohibited."},
    {q:"Which statement regarding client confidentiality is correct?",opts:["Client information may be disclosed freely within the industry","Client information should only be disclosed on a need-to-know basis or where legally required","Confidentiality ends when a transaction is completed","Client consent is never required"],ans:1,expl:"Confidentiality is a key professional obligation."},
    {q:"A Covered Person should maintain records of:",opts:["Only completed transactions","Significant client communications and transactions","Only complaints","Only verbal instructions"],ans:1,expl:"Proper documentation supports accountability and dispute resolution."},
    {q:"Before recommending a product, a Covered Entity should:",opts:["Focus only on potential returns","Understand product features and risks","Guarantee profits","Obtain MAS approval"],ans:1,expl:"Product understanding is necessary for suitability assessments."},
    {q:"Which of the following is an example of market misconduct?",opts:["Providing balanced investment advice","Insider trading","Conducting KYC reviews","Updating account information"],ans:1,expl:"Insider trading is a serious market misconduct offence."},
    {q:"Fees and charges should generally be disclosed:",opts:["After the transaction","Prior to or at the point of transaction","Only if requested","At year-end"],ans:1,expl:"Transparency requires timely disclosure."},
    {q:"A Covered Person becomes bankrupt. This may affect:",opts:["His fit and proper status","SGX membership","Deposit insurance coverage","Client tax obligations"],ans:0,expl:"Bankruptcy may raise concerns regarding fitness and propriety."},
    {q:"A Prohibition Order may be issued by MAS when an individual:",opts:["Changes employers","Misses a training session","Engages in serious misconduct","Takes annual leave"],ans:2,expl:"POs are used to protect the integrity of financial markets."},
    {q:"Which of the following best demonstrates fair dealing?",opts:["Hiding fees from clients","Recommending suitable products and disclosing key risks","Selling the highest commission products","Ignoring complaints"],ans:1,expl:"Fair dealing requires suitability and transparency."},
    {q:"The purpose of continuing professional development (CPD) is to:",opts:["Increase sales commissions","Maintain professional competency","Reduce compliance requirements","Avoid annual reviews"],ans:1,expl:"CPD ensures knowledge remains current."},
    {q:"Which of the following is an example of inappropriate conduct?",opts:["Keeping accurate records","Misrepresenting product features","Conducting KYC reviews","Following compliance procedures"],ans:1,expl:"Misrepresentation undermines informed decision-making."},
    {q:"Complaints handling should be:",opts:["Independent and prompt","Delayed until annual review","Handled only by relationship managers","Ignored if no financial loss occurred"],ans:0,expl:"Effective complaint management is part of good market conduct."},
    {q:"Cross-trades should be conducted:",opts:["Only if they benefit the Covered Person","With proper controls and in clients' best interests","Without documentation","At any price"],ans:1,expl:"Cross-trades require controls to prevent abuse."},
    {q:"The PB Code primarily promotes:",opts:["Aggressive selling","Professionalism and client trust","Reduced compliance","Guaranteed investment returns"],ans:1,expl:"The PB Code aims to strengthen professionalism and confidence in the private banking industry."}
  ],
  "3": [
    {q:"The primary objective of KYC is to:",opts:["Increase investment returns","Prevent misuse of financial institutions for criminal activities","Reduce transaction costs","Improve portfolio performance"],ans:1,expl:"KYC helps prevent money laundering, terrorism financing and other financial crimes."},
    {q:"The three stages of money laundering are:",opts:["Placement, Layering, Integration","Integration, Placement, Layering","Layering, Placement, Integration","Placement, Integration, Structuring"],ans:0,expl:"Placement, Layering, Integration is the correct sequence."},
    {q:"Which stage involves introducing illicit funds into the financial system?",opts:["Layering","Integration","Placement","Structuring"],ans:2,expl:"Placement is the initial introduction of illegal proceeds."},
    {q:"Layering primarily seeks to:",opts:["Generate investment returns","Conceal the source of funds","Pay taxes","Close accounts"],ans:1,expl:"Layering obscures the origin of criminal proceeds."},
    {q:"Integration occurs when:",opts:["Criminal proceeds re-enter the economy as apparently legitimate funds","Funds are first deposited","Accounts are opened","KYC is performed"],ans:0,expl:"Integration completes the laundering cycle."},
    {q:"A Politically Exposed Person (PEP) generally presents:",opts:["Lower AML risk","Higher AML/CFT risk","No additional risk","Only tax risk"],ans:1,expl:"PEPs require enhanced due diligence."},
    {q:"When a client becomes a PEP, the Covered Person should:",opts:["Ignore the change","Notify Compliance and follow internal review procedures","Close the account immediately","Remove all monitoring"],ans:1,expl:"Enhanced monitoring and review are required."},
    {q:"Which is an example of acceptable source of wealth evidence?",opts:["Client verbal assurance only","Independent documentation supporting wealth accumulation","Social media posts","Personal opinion"],ans:1,expl:"Source of wealth should be independently corroborated."},
    {q:"Tipping-off refers to:",opts:["Informing clients of investment opportunities","Alerting a client that they are under AML investigation","Updating risk profiles","Providing product brochures"],ans:1,expl:"Tipping-off is prohibited under AML laws."},
    {q:"Which is a red flag for money laundering?",opts:["Regular salary credits","Complex unexplained fund movements","Dividend payments","CPF contributions"],ans:1,expl:"Unusual transactions may indicate laundering activity."},
    {q:"Terrorism financing differs from money laundering because:",opts:["The source of funds may be legitimate","It always involves cash","It only occurs overseas","It is legal in some jurisdictions"],ans:0,expl:"Terrorist financing can involve legally obtained funds."},
    {q:"Under CRS, financial institutions report accounts held by:",opts:["Singapore citizens only","Foreign tax residents in participating jurisdictions","Corporate entities only","PEPs only"],ans:1,expl:"CRS facilitates international tax transparency."},
    {q:"Before marketing products overseas, a Covered Person should:",opts:["Proceed immediately","Consult Compliance regarding local regulations","Contact MAS for every trip","Obtain SGX approval"],ans:1,expl:"Cross-border activities may trigger foreign regulatory requirements."},
    {q:"An introducer under FAA-N02 may:",opts:["Provide investment recommendations","Give product advice","Refer clients but not advise on products","Manage portfolios"],ans:2,expl:"Introducers are restricted to introducing activities."},
    {q:"Proliferation financing relates to:",opts:["Tax evasion","Funding weapons of mass destruction activities","Insider trading","Market manipulation"],ans:1,expl:"PF concerns WMD-related financing."},
    {q:"Enhanced due diligence is most likely required for:",opts:["Low-risk retail clients","PEPs and higher-risk relationships","Employees","Depositors only"],ans:1,expl:"High-risk clients require additional scrutiny."},
    {q:"A client makes multiple small transfers to avoid reporting thresholds. This may indicate:",opts:["Diversification","Structuring","Hedging","Rebalancing"],ans:1,expl:"Structuring is a common AML red flag."},
    {q:"Targeted financial sanctions require financial institutions to:",opts:["Ignore sanctioned parties","Freeze relevant assets and report appropriately","Close all foreign accounts","Suspend KYC reviews"],ans:1,expl:"Sanctions compliance includes freezing designated assets."},
    {q:"Ongoing monitoring is intended to:",opts:["Replace KYC","Detect unusual and suspicious activities","Increase fees","Reduce documentation"],ans:1,expl:"Monitoring helps identify emerging risks."},
    {q:"Which statement best describes effective client due diligence?",opts:["Performed only when opening the account","Performed only for large accounts","A continuous process throughout the client relationship","Required only for PEPs"],ans:2,expl:"CDD is an ongoing obligation that extends beyond account opening."}
  ],
  "4": [
    {q:"A client's primary objective is capital preservation. Which recommendation is most appropriate?",opts:["Leveraged derivatives portfolio","Diversified portfolio of lower-risk investments","Concentrated small-cap equity portfolio","Cryptocurrency trading strategy"],ans:1,expl:"A diversified portfolio of lower-risk investments is more consistent with a capital preservation objective."},
    {q:"Which factor is most important when determining product suitability?",opts:["Client's favorite investment brand","Banker's sales target","Client's risk tolerance","Current market rumors"],ans:2,expl:"Risk tolerance is a key factor in determining whether an investment is suitable."},
    {q:"Before recommending a product, a banker should:",opts:["Understand the product's features and risks","Focus only on potential returns","Rely solely on marketing materials","Let the client conduct all research"],ans:0,expl:"Bankers must understand products before recommending them to clients."},
    {q:"Which factor is relevant to best execution?",opts:["Price","Speed","Likelihood of execution","All of the above"],ans:3,expl:"Best execution considers multiple factors including price, speed, and likelihood of execution."},
    {q:"A client wants to invest all assets into a single stock. What should the banker do?",opts:["Encourage diversification and explain the risks","Refuse the transaction immediately","Execute without discussion","Purchase additional shares for the client"],ans:0,expl:"Clients should be informed about concentration risks before making investment decisions."},
    {q:"A banker recommends a product mainly because it pays a higher commission. What is the main concern?",opts:["Settlement risk","Market risk","Conflict of interest","Currency risk"],ans:2,expl:"The banker's personal incentive may conflict with the client's best interests."},
    {q:"Why should advisory discussions be documented?",opts:["To satisfy marketing requirements","To create evidence of client interactions and recommendations","To increase sales","To reduce taxes"],ans:1,expl:"Documentation helps demonstrate that proper advice and disclosures were provided."},
    {q:"A client independently instructs the purchase of a stock without seeking advice. This is:",opts:["Advisory service","Discretionary management","Execution-only transaction","Estate planning"],ans:2,expl:"The investment decision was made solely by the client."},
    {q:"Client orders should be handled:",opts:["According to revenue generated","Based on personal relationships","Fairly and promptly","According to client age"],ans:2,expl:"All clients should be treated fairly regardless of their profitability."},
    {q:"What should be disclosed to clients?",opts:["Benefits only","Risks only","Material benefits and risks","Marketing information only"],ans:2,expl:"Clients require balanced information to make informed decisions."},
    {q:"When a bank acts as principal in a transaction, it should:",opts:["Hide the information","Disclose its role appropriately","Inform the client after settlement","Disclose only upon request"],ans:1,expl:"Clients should understand whether the bank acts as principal or agent."},
    {q:"A client appears confused about a structured product. What should the banker do?",opts:["Continue immediately","Provide additional explanation","Skip risk disclosures","Ask the client to sign first"],ans:1,expl:"Clients should understand material risks before investing."},
    {q:"Why are periodic portfolio reviews important?",opts:["To guarantee profits","To ensure investments remain suitable","To eliminate losses","To increase fees"],ans:1,expl:"Client circumstances and market conditions may change over time."},
    {q:"A client complaint should be:",opts:["Ignored if the banker disagrees","Logged and handled according to procedures","Deleted","Delayed indefinitely"],ans:1,expl:"Complaints should be managed fairly and promptly."},
    {q:"A joint account requires both signatures. One account holder requests a withdrawal without the other signature. What should the banker do?",opts:["Process immediately","Follow the account mandate","Ignore the request","Seek verbal confirmation only"],ans:1,expl:"Instructions must comply with the account mandate."},
    {q:"When comparing products, a banker should:",opts:["Highlight only advantages","Hide fees","Provide balanced information","Focus only on returns"],ans:2,expl:"Clients should receive balanced and accurate comparisons."},
    {q:"Which client information is most relevant for suitability?",opts:["Risk tolerance","Favorite sport","Passport color","Social media activity"],ans:0,expl:"Risk tolerance directly affects product suitability."},
    {q:"Which statement is true regarding structured products?",opts:["They are always low risk","They may contain complex risks","They guarantee profits","They do not contain derivatives"],ans:1,expl:"Structured products often involve complex payoff structures and risks."},
    {q:"Recommendations should primarily align with:",opts:["Bank revenue targets","Market rumors","Client objectives","Competitor strategies"],ans:2,expl:"Client objectives are fundamental to suitability."},
    {q:"Which action best reflects fair dealing?",opts:["Providing balanced information even if sales decrease","Concealing risks","Prioritizing commission income","Misleading clients"],ans:0,expl:"Fair dealing requires honesty, transparency, and acting in the client's interests."}
  ],
  "5": [
    {q:"What is the primary objective of estate planning?",opts:["Maximizing short-term investment returns","Ensuring efficient transfer of wealth upon death or incapacity","Avoiding all taxes","Increasing leverage"],ans:1,expl:"Estate planning helps ensure wealth is transferred according to the individual's wishes in an efficient and orderly manner."},
    {q:"What is the primary role of a trustee?",opts:["To own trust assets for personal benefit","To manage trust assets according to the trust deed","To replace beneficiaries","To provide investment advice only"],ans:1,expl:"A trustee holds legal title to trust assets and manages them according to the trust terms."},
    {q:"Who is the settlor of a trust?",opts:["The person who establishes the trust","The trustee","The beneficiary","The auditor"],ans:0,expl:"The settlor is the person who transfers assets into the trust and creates it."},
    {q:"Who benefits from trust assets?",opts:["Trustee","Regulator","Beneficiary","Relationship Manager"],ans:2,expl:"Beneficiaries are entitled to benefit from the trust according to its terms."},
    {q:"What is the purpose of a Letter of Wishes?",opts:["To legally replace a trust deed","To express the settlor's preferences to the trustee","To appoint beneficiaries automatically","To transfer legal ownership"],ans:1,expl:"A Letter of Wishes provides guidance to trustees but is generally not legally binding."},
    {q:"Forced heirship laws may:",opts:["Restrict how assets can be distributed upon death","Increase investment returns","Eliminate inheritance taxes","Replace wills automatically"],ans:0,expl:"Certain jurisdictions require portions of an estate to pass to specific family members."},
    {q:"Who generally holds legal ownership of trust assets?",opts:["Beneficiaries","Trustee","Settlor","Protector"],ans:1,expl:"The trustee holds legal title while beneficiaries have beneficial interests."},
    {q:"Why is tax residency important in succession planning?",opts:["It determines stock prices","It may affect tax obligations and planning strategies","It guarantees tax exemptions","It determines trustee fees"],ans:1,expl:"Different jurisdictions may impose different tax rules based on residency."},
    {q:"Which feature is associated with Universal Life Insurance?",opts:["Pure investment product","Life coverage combined with policy value accumulation","Guaranteed stock market returns","No death benefit"],ans:1,expl:"Universal Life Insurance combines life protection with value accumulation features."},
    {q:"Why may life insurance be useful in estate planning?",opts:["It guarantees inheritance","It provides liquidity to meet estate obligations","It eliminates probate","It avoids all taxes"],ans:1,expl:"Insurance proceeds can provide cash to settle estate expenses and obligations."},
    {q:"What is probate?",opts:["The legal process of validating a will","The creation of a trust","The transfer of shares","The liquidation of assets"],ans:0,expl:"Probate confirms the validity of a deceased person's will."},
    {q:"Cross-border succession planning may require consideration of:",opts:["Multiple legal systems","Weather conditions","Stock market indexes","Interest rates only"],ans:0,expl:"Different countries may have different inheritance and tax laws."},
    {q:"A family trust is commonly established to:",opts:["Preserve and manage family wealth","Increase leverage","Avoid all regulation","Replace insurance"],ans:0,expl:"Family trusts are often used for wealth preservation and succession planning."},
    {q:"What is a common function of a protector?",opts:["Managing trust investments daily","Supervising or replacing trustees under certain conditions","Becoming the sole beneficiary","Acting as tax auditor"],ans:1,expl:"Protectors may have oversight powers over trustees."},
    {q:"Why is succession planning important for family businesses?",opts:["To ensure business continuity","To reduce stock market volatility","To eliminate creditors","To avoid accounting requirements"],ans:0,expl:"Proper planning helps facilitate smooth transitions between generations."},
    {q:"A client transfers assets into a trust immediately after receiving legal claims from creditors. What is the primary concern?",opts:["Market risk","Fraudulent transfer concerns","Currency risk","Settlement risk"],ans:1,expl:"Transfers intended to defeat known creditors may be challenged legally."},
    {q:"What does a trust deed primarily do?",opts:["Establishes the trust's terms and conditions","Replaces a will","Eliminates taxes","Transfers company ownership automatically"],ans:0,expl:"The trust deed governs how the trust operates."},
    {q:"In a trust structure, beneficiaries generally have:",opts:["Legal ownership","Beneficial interests","Regulatory authority","Trustee powers"],ans:1,expl:"Beneficiaries enjoy the benefits of trust assets while trustees hold legal title."},
    {q:"Which document commonly allows another person to act on someone's behalf if they lose mental capacity?",opts:["Trust Deed","Share Certificate","Lasting Power of Attorney (LPA)","Insurance Policy"],ans:2,expl:"An LPA allows appointed persons to make decisions if mental capacity is lost."},
    {q:"When is the best time to begin succession planning?",opts:["After death","During a financial crisis","Early, before major issues arise","Only after retirement"],ans:2,expl:"Early planning provides greater flexibility and reduces potential complications later."}
  ],
  "6": [
    {q:"A relationship manager receives a call from a client's friend asking about the client's portfolio performance.",opts:["Provide general portfolio information only","Provide information if the caller sounds genuine","Refuse to disclose client information without proper authorization","Disclose information if the friend knows the account number"],ans:2,expl:"Client information must remain confidential and should only be disclosed with proper authorization."},
    {q:"A banker recommends an investment product because it generates a higher commission for him.",opts:["Acceptable if the product performs well","Acceptable if the client is wealthy","Creates a conflict of interest that must be managed","Not a concern if disclosed after the sale"],ans:2,expl:"Recommendations should prioritize the client's interests, not the banker's personal benefit."},
    {q:"Which behaviour best demonstrates integrity?",opts:["Providing balanced information even if it reduces sales","Hiding risks","Misrepresenting facts","Ignoring conflicts"],ans:0,expl:"Integrity requires honesty, transparency, and fair dealing with clients."},
    {q:"A banker exaggerates the expected return of a product to encourage investment.",opts:["Acceptable marketing practice","Ethical if competitors do the same","Potentially misleading and unethical","Permitted for Accredited Investors"],ans:2,expl:"Clients must receive accurate and balanced information when making investment decisions."},
    {q:"A client offers a banker an expensive luxury watch after a successful transaction.",opts:["Accept immediately","Accept secretly","Follow the bank's gifts and entertainment policy","Sell the watch and keep the money"],ans:2,expl:"Large gifts may create conflicts of interest and must be handled according to internal policies."},
    {q:"A banker learns confidential information that a listed company will soon be acquired.",opts:["Buy shares immediately","Tell family members to buy shares","Trade through a friend's account","Do not trade or disclose the information"],ans:3,expl:"Using material non-public information may constitute insider trading."},
    {q:"Two clients request allocation in a limited investment opportunity.",opts:["Allocate based on personal preference","Allocate based on friendship","Follow the bank's allocation policy fairly","Allocate to the wealthiest client only"],ans:2,expl:"Clients should be treated fairly and consistently."},
    {q:"A banker discovers an error in a client report.",opts:["Ignore the mistake","Correct it promptly and report if required","Delete the report permanently","Wait for the client to complain"],ans:1,expl:"Accurate records are essential for integrity and client trust."},
    {q:"A client asks about a product the banker does not understand.",opts:["Guess the answer","Provide inaccurate information confidently","Seek guidance before advising the client","Recommend the product anyway"],ans:2,expl:"Professionals should only advise within their competence."},
    {q:"A banker spreads unverified rumours about a listed company.",opts:["Acceptable if common in the market","Ethical if no profit is made","May contribute to market misconduct","Permitted among professionals"],ans:2,expl:"Unverified rumours can mislead investors and distort markets."},
    {q:"A client complains that fees were not explained properly.",opts:["Ignore the complaint","Tell the client to read the documents again","Follow complaint-handling procedures","Close the account immediately"],ans:2,expl:"Complaints must be addressed fairly and promptly."},
    {q:"A banker wishes to buy shares for his personal account.",opts:["Trade without informing anyone","Follow personal account dealing policies","Use a relative's account","Avoid all records of the transaction"],ans:1,expl:"Personal trading must comply with internal controls to prevent conflicts."},
    {q:"Which action best reflects acting in a client's best interest?",opts:["Recommending the most profitable product for the bank","Recommending a suitable product based on client needs","Recommending the newest product available","Recommending the most complex product"],ans:1,expl:"Client objectives and needs should guide recommendations."},
    {q:"Why is an ethical culture important in financial institutions?",opts:["To increase paperwork","To improve office appearance","To encourage responsible conduct and trust","To reduce training requirements"],ans:2,expl:"Ethical culture promotes integrity and protects clients and markets."},
    {q:"A banker accidentally receives another client's confidential file.",opts:["Read it out of curiosity","Share it with colleagues","Report the incident and follow procedures","Keep a copy for future reference"],ans:2,expl:"Confidential information must be protected and incidents properly managed."},
    {q:"A discretionary portfolio manager acts on behalf of clients.",opts:["May prioritize personal interests","Owes duties to act in clients' interests","Can ignore client objectives","Has no accountability for decisions"],ans:1,expl:"Portfolio managers must act with loyalty and care toward clients."},
    {q:"Which question should a banker ask before taking an action?",opts:["Will I get a larger bonus?","Will anyone notice?","Is it legal, ethical, and in the client's interest?","Can I avoid documentation?"],ans:2,expl:"Ethical decisions consider legality, fairness, and client interests."},
    {q:"An employee suspects serious misconduct within the bank.",opts:["Ignore it","Report it through approved whistleblowing channels","Discuss it publicly on social media","Inform clients immediately"],ans:1,expl:"Whistleblowing procedures help address misconduct appropriately."},
    {q:"Why is reputation important for private banks?",opts:["It affects trust and client confidence","It only affects marketing costs","It has no impact on business performance","It matters only to regulators"],ans:0,expl:"Trust is fundamental to private banking relationships."},
    {q:"Which statement best reflects ethical responsibility?",opts:["Do only what is profitable","Do only what is specifically required by law","Act honestly, fairly, and professionally at all times","Focus only on sales targets"],ans:2,expl:"Ethics extends beyond legal compliance and includes professional integrity, fairness, and accountability."}
  ]
};

function updateChapterQuizHeadings(){
  Object.keys(chapterQuizData).forEach(function(ch){
    var card = document.querySelector('.chapter-end-quiz.ch' + ch);
    if(!card) return;
    var count = chapterQuizData[ch].length;
    var title = card.querySelector('.quiz-hero h2');
    var intro = card.querySelector('.quiz-hero p');
    var startText = document.querySelector('#ch' + ch + '-quiz-start-panel p');
    if(title) title.textContent = 'Chapter ' + ch + ' Quiz — ' + count + ' Questions';
    if(intro) intro.textContent = 'Practice the Chapter ' + ch + ' questions before moving on.';
    if(startText) startText.textContent = 'These ' + count + ' questions cover the key Chapter ' + ch + ' exam-style topics.';
  });
}


var chapterQuizState = {};
Object.keys(chapterQuizData).forEach(function(ch){
  chapterQuizState[ch] = { currentQ:0, score:0, answered:false };
});
updateChapterQuizHeadings();

function safeChapterQuizHtml(value){
  return String(value == null ? '' : value)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;')
    .replace(/\n\n/g,'<br><br>')
    .replace(/\n/g,'<br>');
}

function chapterQuizEl(ch, suffix){
  return document.getElementById('ch' + ch + '-' + suffix);
}

function startChapterQuiz(ch){
  ch = String(ch);
  var state = chapterQuizState[ch];
  if(!state || !chapterQuizData[ch]) return;
  chapterQuizEl(ch,'quiz-start-panel').style.display='none';
  chapterQuizEl(ch,'quiz-progress-bar').style.display='block';
  chapterQuizEl(ch,'quiz-nav').style.display='block';
  chapterQuizEl(ch,'quiz-score-panel').style.display='none';
  state.currentQ=0;
  state.score=0;
  state.answered=false;
  renderChapterQuizQuestion(ch);
}

function renderChapterQuizQuestion(ch){
  ch = String(ch);
  var state = chapterQuizState[ch];
  var data = chapterQuizData[ch];
  if(!state || !data) return;

  var container=chapterQuizEl(ch,'quiz-questions');
  container.innerHTML='';
  var qd=data[state.currentQ];
  var isMulti=qd.multi===true;
  var opts=isMulti?qd.opts2:qd.opts;
  var ans=qd.ans;
  var optionLabels=isMulti?['i','ii','iii','iv']:['A','B','C','D'];

  var html='<div class="q-card active">';
  html+='<div class="q-num">Chapter '+ch+' — Question '+(state.currentQ+1)+' of '+data.length+'</div>';
  if(qd.sc){
    html+='<div class="q-scenario"><strong>Case scenario:</strong><br>'+safeChapterQuizHtml(qd.sc)+'</div>';
  }
  html+='<div class="q-text">'+safeChapterQuizHtml(qd.q)+'</div>';

  if(isMulti && qd.opts){
    html+='<div class="stmt-list">';
    qd.opts.forEach(function(s,i){
      var label='('+String.fromCharCode(97+i)+')';
      html+='<div class="stmt-item"><span class="stmt-roman">'+label+'</span><span>'+safeChapterQuizHtml(s)+'</span></div>';
    });
    html+='</div>';
    html+='<p class="which-correct">Which of the above statement(s) is/are correct?</p>';
  }

  html+='<div class="opts">';
  opts.forEach(function(o,i){
    html+='<button class="opt" onclick="selectChapterQuizAnswer('+ch+','+i+','+ans+')" data-idx="'+i+'">'
      +'<span class="opt-letter">'+optionLabels[i]+'</span>'
      +'<span class="opt-text">'+safeChapterQuizHtml(o)+'</span>'
      +'</button>';
  });
  html+='</div>';
  html+='<div class="expl" id="ch'+ch+'-expl">💡 <strong>Reason:</strong> '+safeChapterQuizHtml(qd.expl)+'</div>';
  html+='</div>';
  container.innerHTML=html;

  chapterQuizEl(ch,'q-counter').textContent='Question '+(state.currentQ+1)+'/'+data.length;
  chapterQuizEl(ch,'q-score-live').textContent='Score: '+state.score+'/'+state.currentQ;
  chapterQuizEl(ch,'qfill').style.width=((state.currentQ/data.length)*100)+'%';
  chapterQuizEl(ch,'nextBtn').style.display='none';
  state.answered=false;
}

function selectChapterQuizAnswer(ch, selected, correct){
  ch = String(ch);
  var state = chapterQuizState[ch];
  if(!state || state.answered) return;
  state.answered=true;

  var opts=document.querySelectorAll('#ch'+ch+'-quiz-questions .opt');
  opts.forEach(function(o){o.classList.add('locked')});
  if(selected===correct){
    opts[selected].classList.add('correct');
    state.score++;
  } else {
    opts[selected].classList.add('wrong');
    opts[correct].classList.add('show-correct');
  }
  document.getElementById('ch'+ch+'-expl').classList.add('show');
  chapterQuizEl(ch,'q-score-live').textContent='Score: '+state.score+'/'+(state.currentQ+1);
  chapterQuizEl(ch,'nextBtn').style.display='inline-block';
}

function nextChapterQuizQuestion(ch){
  ch = String(ch);
  var state = chapterQuizState[ch];
  var data = chapterQuizData[ch];
  if(!state || !data) return;
  state.currentQ++;
  if(state.currentQ>=data.length){
    showChapterQuizScore(ch);
  } else {
    renderChapterQuizQuestion(ch);
  }
}

function showChapterQuizScore(ch){
  ch = String(ch);
  var state = chapterQuizState[ch];
  var data = chapterQuizData[ch];
  if(!state || !data) return;
  chapterQuizEl(ch,'quiz-questions').innerHTML='';
  chapterQuizEl(ch,'quiz-nav').style.display='none';
  chapterQuizEl(ch,'quiz-progress-bar').style.display='none';
  chapterQuizEl(ch,'quiz-score-panel').style.display='block';

  chapterQuizEl(ch,'final-score').textContent=state.score+' / '+data.length;
  var pct=Math.round((state.score/data.length)*100);
  var msg=pct>=90?'Excellent — very strong chapter mastery.':
          pct>=70?'Good work — review the explanations for the questions you missed.':
          pct>=50?'Reasonable start — revisit the chapter notes and retry the quiz.':
                  'Review the chapter carefully, then attempt the quiz again.';
  chapterQuizEl(ch,'score-msg').textContent=msg;
  chapterQuizEl(ch,'qfill').style.width='100%';
}

function restartChapterQuiz(ch){
  ch = String(ch);
  var state = chapterQuizState[ch];
  if(!state) return;
  state.currentQ=0;
  state.score=0;
  state.answered=false;
  chapterQuizEl(ch,'quiz-score-panel').style.display='none';
  chapterQuizEl(ch,'quiz-start-panel').style.display='block';
  chapterQuizEl(ch,'quiz-progress-bar').style.display='none';
  chapterQuizEl(ch,'quiz-questions').innerHTML='';
  chapterQuizEl(ch,'quiz-nav').style.display='none';
}

/* Backward-compatible wrappers for the existing Chapter 1 buttons */
function startChapter1Quiz(){ startChapterQuiz(1); }
function selectChapter1Answer(selected,correct){ selectChapterQuizAnswer(1,selected,correct); }
function nextChapter1Question(){ nextChapterQuizQuestion(1); }
function restartChapter1Quiz(){ restartChapterQuiz(1); }


var originalQuizData=[
  {
    "ch": "Chapter 1",
    "sc": "Ms Tan wishes to open a private banking account. She owns:\n\nA primary residence worth S$4 million, with an outstanding mortgage of S$1 million;\nA second residential property worth S$1.2 million, fully paid;\nA securities portfolio worth S$800,000;\nCash deposits of S$300,000.\n\nYour Covered Entity is assessing whether she meets the net personal assets test for Accredited Investor status.",
    "q": "Which is the best approach?",
    "opts": [
      "Count the full net value of the primary residence, the second property, securities, and cash.",
      "Count only S$1 million from the net equity of the primary residence, together with the second property, securities, and cash.",
      "Exclude all residential properties and count only securities and cash.",
      "Count the gross value of all properties without deducting any mortgage."
    ],
    "ans": 1,
    "expl": "For AI assessment, the value attributable to the individual’s primary residence is capped, while other qualifying assets may also be counted."
  },
  {
    "ch": "Chapter 1",
    "sc": "Mr Lim, a Covered Person in a private bank, has been appointed to provide financial advisory services on collective investment schemes and bonds. A client asks him for a recommendation on a leveraged foreign exchange product.",
    "q": "What should Mr Lim do?",
    "opts": [
      "Recommend the product if he understands how it works.",
      "Recommend the product if the client signs a risk acknowledgement.",
      "Check whether he is authorised to advise on that product and escalate if needed.",
      "Provide a general view because the client is an Accredited Investor."
    ],
    "ans": 2,
    "expl": "A Covered Person may only act within the regulated activities and services for which he is authorised."
  },
  {
    "ch": "Chapter 1",
    "sc": "A Covered Person is employed by Bank A. He is invited to act as an appointed representative for an unrelated licensed fund manager during weekends. Both firms have given written approval.",
    "q": "Which statement is correct?",
    "opts": [
      "He may do so because both firms approved it.",
      "He may do so only if MAS approves or another recognised exception applies.",
      "He may do so because the second role is part-time.",
      "He may do so because both firms are MAS-regulated."
    ],
    "ans": 1,
    "expl": "Acting for more than one principal generally requires MAS approval, unless the principals are related corporations."
  },
  {
    "ch": "Chapter 1",
    "sc": "A Covered Person has never been convicted of any offence. However, he was recently censured by a foreign financial regulator for repeatedly providing misleading explanations to clients.",
    "q": "Which fit-and-proper criterion may be most directly affected?",
    "opts": [
      "Financial soundness.",
      "Competence and capability only.",
      "Honesty, integrity, and reputation.",
      "Capital adequacy."
    ],
    "ans": 2,
    "expl": "Regulatory censure for misleading conduct directly affects honesty, integrity, and reputation."
  },
  {
    "ch": "Chapter 1",
    "sc": "A Covered Person changes his residential address and passport number but informs HR only 20 days later.",
    "q": "Why is this problematic?",
    "opts": [
      "He must notify MAS directly within 7 days.",
      "The Covered Entity may not be able to meet its obligation to notify MAS within the required timeframe.",
      "Such changes are relevant only during annual reviews.",
      "Passport changes are never reportable."
    ],
    "ans": 1,
    "expl": "The Covered Person must inform the Covered Entity promptly so that the entity can make the required MAS notification."
  },
  {
    "ch": "Chapter 1",
    "sc": "A Covered Person tells a client that a bond issuer “will definitely receive a takeover offer next month,” even though he has no evidence and is merely repeating market rumours. The client buys the bond.",
    "q": "Which misconduct risk is most relevant?",
    "opts": [
      "Bucketing.",
      "Fraudulently inducing persons to deal in capital markets products.",
      "Cornering.",
      "False trading."
    ],
    "ans": 1,
    "expl": "Making a misleading or reckless statement to induce a transaction may amount to fraudulent inducement."
  },
  {
    "ch": "Chapter 1",
    "sc": "A trader enters repeated buy and sell orders through related accounts to create the impression that a thinly traded security has strong market interest, without any real change in economic ownership.",
    "q": "What is the clearest misconduct concern?",
    "opts": [
      "Insider trading.",
      "Bucketing.",
      "False trading and market rigging.",
      "Breach of client confidentiality."
    ],
    "ans": 2,
    "expl": "The conduct creates a false appearance of active trading."
  },
  {
    "ch": "Chapter 1",
    "sc": "",
    "q": "Which statement is most accurate?",
    "opts": [
      "Merchant banks may accept Singapore-dollar retail savings deposits freely.",
      "Wholesale banks may accept any Singapore-dollar deposits from any customer without threshold restrictions.",
      "Full banks are permitted to conduct the broadest range of deposit-taking activities among the three.",
      "All bank types have identical deposit-taking permissions."
    ],
    "ans": 2,
    "expl": "Full banks have the broadest deposit-taking permissions, unlike wholesale banks and merchant banks."
  },
  {
    "ch": "Chapter 2",
    "sc": "A 76-year-old client who is hard of hearing insists on proceeding with a complex structured note. He repeatedly asks the same questions, appears confused by the downside scenarios, and is accompanied by a nephew who keeps answering on his behalf.",
    "q": "What is the most appropriate response?",
    "opts": [
      "Proceed because the client is an Accredited Investor.",
      "Treat this as a potential vulnerable-client situation and apply enhanced care under internal procedures.",
      "Let the nephew decide because he appears familiar with the product.",
      "Decline the transaction immediately without further assessment."
    ],
    "ans": 1,
    "expl": "Age, possible comprehension difficulty, and third-party influence indicate potential vulnerability requiring additional safeguards."
  },
  {
    "ch": "Chapter 2",
    "sc": "After a product discussion conducted by phone, the Covered Person makes a brief handwritten note saying only: “Client interested in yield product. Follow up later.”",
    "q": "Why may this be inadequate?",
    "opts": [
      "Call reports are unnecessary if no transaction occurs.",
      "Records should be sufficiently clear to capture material discussion points and advice-related interactions.",
      "Only voice recordings matter, not written records.",
      "Private banks are not expected to document advisory interactions."
    ],
    "ans": 1,
    "expl": "The PB Code emphasises proper documentation and call reports for meaningful client interactions."
  },
  {
    "ch": "Chapter 2",
    "sc": "An offshore trust structure is proposed for a new client. The beneficial owner is identified, but the client refuses to explain why three intermediary holding companies are needed, saying it is “standard for privacy.”",
    "q": "What is the best course of action?",
    "opts": [
      "Proceed because the beneficial owner is known.",
      "Decline immediately in every case involving offshore entities.",
      "Seek to understand the commercial and legal rationale for the structure before deciding whether to proceed.",
      "Ignore the matter if the introducer is reputable."
    ],
    "ans": 2,
    "expl": "Complex structures without clear purpose may present tax evasion or AML red flags and require further inquiry."
  },
  {
    "ch": "Chapter 2",
    "sc": "A Covered Entity distributes a product brochure that explains potential returns extensively but places all principal-loss risks in small font at the end of a long appendix.",
    "q": "Which concern is most relevant?",
    "opts": [
      "Risks are disclosed somewhere, so there is no issue.",
      "Disclosures should be fair, balanced, and presented in a manner reasonably understandable to the client.",
      "Risks need not be highlighted to Accredited Investors.",
      "Only pricing needs to be disclosed clearly."
    ],
    "ans": 1,
    "expl": "Product disclosures should be fair and balanced, not technically present but practically obscured."
  },
  {
    "ch": "Chapter 2",
    "sc": "A private banker receives allocation in a limited investment opportunity. Instead of applying the bank’s allocation policy, he directs most of it to clients who generate the highest personal revenue for him.",
    "q": "Which principle is most clearly at risk?",
    "opts": [
      "Independent handling of client complaints.",
      "Good market conduct and fair treatment of clients.",
      "Tax transparency.",
      "Client confidentiality."
    ],
    "ans": 1,
    "expl": "Preferential treatment based on self-interest undermines fair market conduct."
  },
  {
    "ch": "Chapter 2",
    "sc": "A Covered Person is under internal investigation for forging a client’s signature on a transaction document. No final disciplinary outcome has yet been reached.",
    "q": "Which is the most appropriate view?",
    "opts": [
      "Reporting to MAS can only occur after criminal conviction.",
      "The matter may already be reportable if it falls within misconduct reporting obligations.",
      "Internal investigations are never reportable.",
      "The matter is only reportable if the client suffers financial loss."
    ],
    "ans": 1,
    "expl": "Certain investigations or misconduct matters may trigger MAS reporting obligations before final adjudication."
  },
  {
    "ch": "Chapter 2",
    "sc": "A client who normally operates a conservative investment account suddenly requests that large incoming transfers from multiple unrelated overseas companies be quickly invested and then liquidated into another currency.",
    "q": "What is the best interpretation?",
    "opts": [
      "It is a routine portfolio repositioning request.",
      "It is automatically prohibited.",
      "It presents potential unusual transaction and layering concerns requiring escalation or review.",
      "It can be processed if the client is longstanding."
    ],
    "ans": 2,
    "expl": "Unusual third-party inflows and rapid movement of funds may indicate AML red flags."
  },
  {
    "ch": "Chapter 2",
    "sc": "",
    "q": "A private bank works with a licensed External Asset Manager. Which statement is most accurate?",
    "opts": [
      "Because the EAM is licensed, the bank need not consider its tax-evasion and conduct standards.",
      "The bank should consider whether the EAM applies standards aligned with the relevant industry sound practices.",
      "The EAM assumes all compliance responsibilities, so the bank has none.",
      "Client due diligence may be skipped for accounts introduced by EAMs."
    ],
    "ans": 1,
    "expl": "Licensing does not remove the need to consider whether the EAM maintains appropriate control standards."
  },
  {
    "ch": "Chapter 3",
    "sc": "Mr Aditya is a foreign businessman seeking to open a private banking account through an offshore investment company. He states that his wealth came from selling a logistics business five years ago. Public records confirm the sale, but the stated sale price is unavailable. During onboarding, you also learn that his brother has recently become the deputy minister of transport in his home country.",
    "q": "Which evidence would be most useful to corroborate Mr Aditya’s source of wealth?",
    "opts": [
      "A self-declaration saying he was wealthy before the account opening.",
      "A letter from his personal assistant confirming the sale.",
      "Independent documentation such as sale agreements, audited accounts, tax documents, or reputable third-party evidence.",
      "A newspaper article confirming only that his company was “well known.”"
    ],
    "ans": 2,
    "expl": "Source of wealth should be supported by credible and preferably independent evidence."
  },
  {
    "ch": "Chapter 3",
    "sc": "Mr Aditya is a foreign businessman seeking to open a private banking account through an offshore investment company. He states that his wealth came from selling a logistics business five years ago. Public records confirm the sale, but the stated sale price is unavailable. During onboarding, you also learn that his brother has recently become the deputy minister of transport in his home country.",
    "q": "How should the political appointment of Mr Aditya’s brother be treated?",
    "opts": [
      "It is irrelevant because Mr Aditya is not a politician himself.",
      "It may trigger consideration of whether Mr Aditya falls within the bank’s PEP-related framework as a close family member or associated person.",
      "It requires immediate rejection of the account.",
      "It only matters if the brother becomes head of state."
    ],
    "ans": 1,
    "expl": "Close family links to a PEP may trigger PEP-related due diligence."
  },
  {
    "ch": "Chapter 3",
    "sc": "Mr Aditya is a foreign businessman seeking to open a private banking account through an offshore investment company. He states that his wealth came from selling a logistics business five years ago. Public records confirm the sale, but the stated sale price is unavailable. During onboarding, you also learn that his brother has recently become the deputy minister of transport in his home country.",
    "q": "Which action is most appropriate before account opening?",
    "opts": [
      "Complete onboarding without additional review because public records confirm the business existed.",
      "Conduct the ordinary AI assessment only.",
      "Assess both source-of-wealth corroboration and PEP-related risk before deciding on onboarding.",
      "Ask Mr Aditya to remove his brother from public office."
    ],
    "ans": 2,
    "expl": "Both wealth corroboration and political exposure risk are relevant."
  },
  {
    "ch": "Chapter 3",
    "sc": "A Singapore-based Covered Person travels to Country X and, during a client meeting there, recommends a Singapore fund to several prospects resident in Country X.",
    "q": "What is the principal compliance concern?",
    "opts": [
      "Whether the hotel venue was appropriate.",
      "Whether the activity breaches the foreign jurisdiction’s cross-border marketing or advisory rules.",
      "Whether the prospects are Singapore tax residents.",
      "Whether the fund pays dividends."
    ],
    "ans": 1,
    "expl": "Providing product advice abroad may be regulated under the foreign jurisdiction’s laws."
  },
  {
    "ch": "Chapter 3",
    "sc": "A banker slightly modifies an approved product slide deck by removing a page that explains downside risks, arguing that the client already understands them.",
    "q": "Which statement is correct?",
    "opts": [
      "This is acceptable for sophisticated clients.",
      "Unapproved modifications to marketing material may breach internal approval requirements and create misleading disclosure.",
      "Downside risks are optional if discussed orally.",
      "The banker may alter any document after passing CACS."
    ],
    "ans": 1,
    "expl": "Marketing materials should remain approved, accurate, and balanced."
  },
  {
    "ch": "Chapter 3",
    "sc": "A client asks why a transaction is delayed. The real reason is that Compliance is reviewing suspicious transaction concerns.",
    "q": "What is the most appropriate response?",
    "opts": [
      "“Compliance suspects money laundering.”",
      "“Your account has been reported to the authorities.”",
      "Provide a neutral operational explanation consistent with internal guidance, without disclosing suspicious transaction review.",
      "Refuse to speak to the client at all."
    ],
    "ans": 2,
    "expl": "The Covered Person must avoid tipping off the client."
  },
  {
    "ch": "Chapter 3",
    "sc": "A client originally declared that his account was for long-term investment. Three months later, the account receives frequent high-value third-party funds that are immediately remitted offshore.",
    "q": "What should the Covered Person do?",
    "opts": [
      "Ignore it because the account was properly opened.",
      "Reassess whether the activity is consistent with the stated purpose and escalate as appropriate.",
      "Ask Operations to process faster.",
      "Reclassify the account as retail."
    ],
    "ans": 1,
    "expl": "CDD is ongoing; material deviation from the account’s stated purpose requires review."
  },
  {
    "ch": "Chapter 3",
    "sc": "An introducer under a written arrangement tells a prospect: “This bond is definitely suitable for you and better than holding cash.”",
    "q": "What is the main issue?",
    "opts": [
      "Introducers may not receive fees.",
      "Introducers may not provide investment advice unless authorised.",
      "Introducers may never speak to clients.",
      "Bonds cannot be introduced."
    ],
    "ans": 1,
    "expl": "Introducers may refer or provide factual information, but not advice unless authorised."
  },
  {
    "ch": "Chapter 3",
    "sc": "A new client’s name produces a possible sanctions-screening match with similar birth date and nationality, though not an exact passport match.",
    "q": "What should happen?",
    "opts": [
      "Ignore it because the match is not exact.",
      "Escalate for resolution before proceeding, according to the institution’s screening process.",
      "Ask the client whether he is sanctioned and accept his answer.",
      "Open the account first and investigate later."
    ],
    "ans": 1,
    "expl": "Potential sanctions matches must be resolved before proceeding."
  },
  {
    "ch": "Chapter 3",
    "sc": "A client asks to transfer ownership of an offshore holding vehicle to a relative in another jurisdiction shortly after regulatory reporting deadlines are discussed.",
    "q": "What is the most appropriate response?",
    "opts": [
      "Treat it solely as a family succession matter.",
      "Consider whether there are tax transparency or reporting-related concerns and escalate if needed.",
      "Complete the transfer quickly because it is the client’s instruction.",
      "Decline all transfers involving relatives."
    ],
    "ans": 1,
    "expl": "Such restructuring may have tax transparency and evasion risk implications."
  },
  {
    "ch": "Chapter 4",
    "sc": "A retired client says his main objective is capital preservation and predictable income. The banker recommends a concentrated portfolio of high-volatility small-cap equities because “the upside is attractive.”",
    "q": "What is the clearest concern?",
    "opts": [
      "The recommendation may be unsuitable given the client’s stated objectives and risk profile.",
      "Small-cap equities are always prohibited.",
      "Retired clients may only hold deposits.",
      "The banker should have recommended more products, not fewer."
    ],
    "ans": 0,
    "expl": "Recommendations must be reasonably aligned with the client’s objectives and risk tolerance."
  },
  {
    "ch": "Chapter 4",
    "sc": "A client gives a market order to sell a thinly traded security. Before executing, the Covered Person delays the order to allow another preferred client to sell first at a better price.",
    "q": "What is the primary concern?",
    "opts": [
      "Better client relationship management.",
      "Failure to handle client orders fairly and promptly.",
      "Breach of tax rules.",
      "Portfolio diversification."
    ],
    "ans": 1,
    "expl": "Client orders should be processed fairly and promptly, not delayed to favour another client."
  },
  {
    "ch": "Chapter 4",
    "sc": "",
    "q": "Which factor is least relevant to best execution?",
    "opts": [
      "Likelihood of execution.",
      "Speed of execution.",
      "Client-specific instructions.",
      "The banker’s personal revenue target."
    ],
    "ans": 3,
    "expl": "Best execution concerns the client’s order outcome, not the banker’s compensation."
  },
  {
    "ch": "Chapter 4",
    "sc": "A joint account requires joint signatures for withdrawals. One account holder asks the bank to liquidate the portfolio and remit all cash urgently, claiming the other holder is “too busy to sign.”",
    "q": "What should the banker do?",
    "opts": [
      "Process it due to urgency.",
      "Follow the account mandate and seek appropriate internal guidance if necessary.",
      "Accept a verbal assurance.",
      "Call the other holder and ask casually if it is fine."
    ],
    "ans": 1,
    "expl": "Instructions must follow the account mandate."
  },
  {
    "ch": "Chapter 4",
    "sc": "A relationship manager sends one client’s detailed portfolio review to another client by mistake, but immediately recalls the email and is unsure whether it was opened.",
    "q": "What should happen?",
    "opts": [
      "Do nothing if the email was recalled.",
      "Follow the institution’s data-breach procedures and assess reporting obligations.",
      "Ask the unintended recipient to delete the message and close the matter.",
      "Wait for the client to complain."
    ],
    "ans": 1,
    "expl": "Even accidental disclosure may require formal data-breach assessment and reporting."
  },
  {
    "ch": "Chapter 4",
    "sc": "A Covered Entity sells a bond from its own inventory to a client but presents the trade as if it were merely matching a market order.",
    "q": "Why is this problematic?",
    "opts": [
      "The client must be told whether the bank acts as principal or agent.",
      "Inventory sales are prohibited.",
      "Bonds may only be sold by exchanges.",
      "The client does not need to understand trade capacity."
    ],
    "ans": 0,
    "expl": "Trade capacity can affect pricing, conflicts of interest, and disclosure."
  },
  {
    "ch": "Chapter 4",
    "sc": "A client asks about a structured note. The Covered Person explains the coupon mechanism but does not explain that early redemption or barrier events may significantly alter the client’s return.",
    "q": "What is the concern?",
    "opts": [
      "The bank gave too much information.",
      "The disclosure may be incomplete and fail to explain material product risks.",
      "Structured notes need no explanation to AIs.",
      "Only fees matter."
    ],
    "ans": 1,
    "expl": "Material risks and payoff conditions should be clearly explained."
  },
  {
    "ch": "Chapter 4",
    "sc": "A bank wants to borrow a client’s listed shares under a securities-lending arrangement. The client verbally agrees over lunch.",
    "q": "What is required?",
    "opts": [
      "Nothing further because the client is an AI.",
      "A written agreement covering the lending terms.",
      "A handwritten note by the banker only.",
      "Oral confirmation from two witnesses."
    ],
    "ans": 1,
    "expl": "Securities borrowing should be governed by a written agreement."
  },
  {
    "ch": "Chapter 4",
    "sc": "A client has two portfolios with the same bank: one discretionary growth mandate and one advisory income mandate. The banker reviews only the growth portfolio because it has the higher market value.",
    "q": "What is the concern?",
    "opts": [
      "Portfolio reviews should consider the overall relationship and relevant assets/liabilities, not arbitrarily focus only on one sleeve.",
      "Growth mandates should never be reviewed.",
      "Income mandates are irrelevant.",
      "The banker may choose any portfolio and ignore the rest."
    ],
    "ans": 0,
    "expl": "Review should reflect the client’s overall financial position and mandates."
  },
  {
    "ch": "Chapter 4",
    "sc": "A client complains that a product risk was not properly explained. The banker says, “I disagree, so I will not log the complaint.”",
    "q": "What is the concern?",
    "opts": [
      "Complaints should be handled independently, effectively, and promptly according to procedures.",
      "Only written complaints need attention.",
      "Complaints from AIs may be ignored.",
      "The banker may decide whether a complaint is valid before recording it."
    ],
    "ans": 0,
    "expl": "Fair-dealing expectations require proper complaint handling."
  },
  {
    "ch": "Chapter 5",
    "sc": "A client from a jurisdiction with forced heirship rules wants to leave all assets to one child and exclude the others entirely.",
    "q": "What is the key planning issue?",
    "opts": [
      "Market volatility.",
      "Potential conflict between succession wishes and local inheritance rules.",
      "Best execution.",
      "Securities settlement."
    ],
    "ans": 1,
    "expl": "Forced heirship laws may limit how freely a person can dispose of wealth."
  },
  {
    "ch": "Chapter 5",
    "sc": "A client says he is “Singapore-based” but spends 10 months each year living in another country where his children reside. He wants a trust set up immediately.",
    "q": "What should be clarified first?",
    "opts": [
      "His favourite bank.",
      "His tax residency and relevant cross-border planning implications.",
      "Whether he prefers paper statements.",
      "Whether his children own property."
    ],
    "ans": 1,
    "expl": "Trust and succession planning may be affected by tax residency."
  },
  {
    "ch": "Chapter 5",
    "sc": "",
    "q": "Which statement best describes a trustee?",
    "opts": [
      "A trustee holds legal title to trust assets and administers them according to the trust terms.",
      "A trustee is always the same person as the settlor.",
      "A trustee merely gives informal suggestions to beneficiaries.",
      "A trustee can ignore the trust deed."
    ],
    "ans": 0,
    "expl": "The trustee is the legal owner and administrator of trust assets."
  },
  {
    "ch": "Chapter 5",
    "sc": "A settlor wants to express a preference that his surviving spouse receive income support first, while maintaining trustee flexibility.",
    "q": "Which tool is most suitable?",
    "opts": [
      "A Letter of Wishes.",
      "A stock-borrowing agreement.",
      "An order book instruction.",
      "A margin call notice."
    ],
    "ans": 0,
    "expl": "A Letter of Wishes communicates the settlor’s preferences without binding the trustee in the same way as the trust deed."
  },
  {
    "ch": "Chapter 5",
    "sc": "A business owner transfers most of his assets into a trust after receiving a formal demand letter from creditors and says he wants to “shield everything immediately.”",
    "q": "What is the main concern?",
    "opts": [
      "The trust cannot own cash.",
      "The transfer may raise creditor-defrauding or fraudulent conveyance concerns.",
      "Trusts may only hold art.",
      "The beneficiaries must approve first."
    ],
    "ans": 1,
    "expl": "Transfers made to defeat known creditors may be vulnerable to challenge."
  },
  {
    "ch": "Chapter 5",
    "sc": "",
    "q": "Which feature is most associated with Universal Life Insurance?",
    "opts": [
      "Pure protection with no policy value.",
      "A long-term life cover structure with policy value affected by crediting or investment-related mechanics.",
      "Guaranteed equity outperformance.",
      "Automatic tax exemption in every jurisdiction."
    ],
    "ans": 1,
    "expl": "Universal life combines life coverage with policy value accumulation mechanics."
  },
  {
    "ch": "Chapter 5",
    "sc": "",
    "q": "A client has substantial illiquid family-company shares and expects estate taxes to arise upon death. Why may life insurance be useful?",
    "opts": [
      "To guarantee the share price rises.",
      "To provide liquidity for estate obligations without forcing asset sales.",
      "To eliminate all taxes automatically.",
      "To replace a will entirely."
    ],
    "ans": 1,
    "expl": "Insurance can help provide liquidity for succession-related obligations."
  },
  {
    "ch": "Chapter 5",
    "sc": "",
    "q": "A family trust settlor worries that the trustee may become unsuitable in the future. Which role may help address this?",
    "opts": [
      "Beneficiary.",
      "Protector with power to oversee or replace the trustee, where structured accordingly.",
      "Relationship manager.",
      "Product issuer."
    ],
    "ans": 1,
    "expl": "A protector may have oversight powers, including replacing a trustee."
  },
  {
    "ch": "Chapter 5",
    "sc": "A trust holds an investment property. The beneficiaries receive rental distributions, but the trustee holds title to the property.",
    "q": "Which statement is correct?",
    "opts": [
      "The beneficiaries are automatically the legal owners.",
      "The trustee is the legal owner; the beneficiaries have beneficial interests under the trust.",
      "The settlor remains legal owner forever.",
      "No one legally owns trust assets."
    ],
    "ans": 1,
    "expl": "Trusts separate legal ownership from beneficial enjoyment."
  },
  {
    "ch": "Chapter 6",
    "sc": "A banker joins a new private bank. He knows from confidential information at his old bank that a prospective client was previously under suspicion for serious financial-crime issues. The information is not public.",
    "q": "What is the most ethical response?",
    "opts": [
      "Reveal all details to the new bank’s Compliance department.",
      "Use the confidential information to warn colleagues informally.",
      "Avoid taking on the client while not disclosing confidential information or tipping off the client.",
      "Ignore the information entirely and onboard the client."
    ],
    "ans": 2,
    "expl": "He must avoid breaching prior confidentiality while also avoiding unethical onboarding of a client he knows may pose serious risk."
  },
  {
    "ch": "Chapter 6",
    "sc": "A banker recommends a fund issued by an affiliated entity because selling it earns a higher internal incentive, even though another suitable fund has lower fees and better liquidity.",
    "q": "Which ethical concern is most direct?",
    "opts": [
      "Failure to identify and manage conflicts of interest.",
      "Poor stationery use.",
      "Unauthorised cross-border marketing.",
      "Personal data loss."
    ],
    "ans": 0,
    "expl": "The banker’s personal or institutional incentive creates a conflict of interest that must be managed."
  },
  {
    "ch": "Chapter 6",
    "sc": "A product sheet shows “average annual return: 12%” based on simulated historical modelling, but the document does not disclose that the performance was not actually achieved by a live fund.",
    "q": "What is the concern?",
    "opts": [
      "Incorrect tax treatment.",
      "Misleading performance presentation.",
      "Failure to obtain insurance.",
      "Excessive call reporting."
    ],
    "ans": 1,
    "expl": "Back-tested or simulated results must be clearly disclosed."
  },
  {
    "ch": "Chapter 6",
    "sc": "A supplier bidding for a bank’s event contract offers a banker and his family a luxury weekend trip “to thank him for considering the proposal.”",
    "q": "What is the most appropriate reaction?",
    "opts": [
      "Accept because no contract has been signed yet.",
      "Decline and follow internal gifts, entertainment, conflict, and procurement policies.",
      "Accept if the supplier pays in cash.",
      "Accept because the banker is not in Compliance."
    ],
    "ans": 1,
    "expl": "The offer creates clear conflict and improper inducement concerns."
  },
  {
    "ch": "Chapter 6",
    "sc": "A Covered Person argues: “My job is only to maximise revenue; client interest matters only if regulations specifically require it.”",
    "q": "Which principle does this most clearly contradict?",
    "opts": [
      "Ethics requires acting in the best interests of clients and maintaining professional integrity.",
      "Ethics applies only to criminal conduct.",
      "Revenue maximisation always overrides client welfare.",
      "Ethical standards are irrelevant in private banking."
    ],
    "ans": 0,
    "expl": "The ethical framework centres on client interests, integrity, and professional conduct."
  }
];
var quizSets={
  set1:{label:'Set 1',data:originalQuizData},
  set2:{label:'Set 2',data:originalQuizData.slice()}
};
var selectedQuizSetId='set1';
var quizData=quizSets[selectedQuizSetId].data.slice();

var currentQ=0,score=0,answered=false;

function shuffleQuizQuestions(arr){
  var shuffled=arr.slice();
  for(var i=shuffled.length-1;i>0;i--){
    var j=Math.floor(Math.random()*(i+1));
    var temp=shuffled[i];
    shuffled[i]=shuffled[j];
    shuffled[j]=temp;
  }
  return shuffled;
}

function getSelectedQuizSet(){
  return quizSets[selectedQuizSetId] || quizSets.set1;
}

function selectQuizSet(setId){
  if(!quizSets[setId]) return;
  selectedQuizSetId=setId;
  var selectedSet=getSelectedQuizSet();
  var modePanel=document.getElementById('quiz-mode-panel');
  var label=document.getElementById('selected-quiz-set-label');
  var set1Btn=document.getElementById('quiz-set1-btn');
  var set2Btn=document.getElementById('quiz-set2-btn');

  if(label) label.textContent=selectedSet.label+' selected. Choose how you want to start.';
  if(modePanel) modePanel.style.display='block';
  if(set1Btn) set1Btn.style.boxShadow = setId==='set1' ? '0 0 0 3px rgba(255,255,255,.8),0 10px 22px rgba(88,83,132,.22)' : '';
  if(set2Btn) set2Btn.style.boxShadow = setId==='set2' ? '0 0 0 3px rgba(255,255,255,.8),0 10px 22px rgba(88,83,132,.22)' : '';
}

function beginQuizRun(shuffleMode){
  var selectedSet=getSelectedQuizSet();
  quizData=shuffleMode ? shuffleQuizQuestions(selectedSet.data) : selectedSet.data.slice();
  document.getElementById('quiz-start-panel').style.display='none';
  document.getElementById('quiz-progress-bar').style.display='block';
  document.getElementById('quiz-nav').style.display='block';
  document.getElementById('quiz-score-panel').style.display='none';
  currentQ=0;score=0;answered=false;
  renderQuestion();
}

function startQuiz(){
  beginQuizRun(false);
}

function startShuffledQuiz(){
  beginQuizRun(true);
}

function renderQuestion(){
  var container=document.getElementById('quiz-questions');
  container.innerHTML='';
  var qd=quizData[currentQ];
  var isMulti=qd.multi===true;
  var opts=isMulti?qd.opts2:qd.opts;
  var ans=isMulti?qd.ans2:qd.ans;
  var romans=['I','II','III','IV','V'];

  var html='<div class="q-card active">';
  html+='<div class="q-num">'+qd.ch+' — Question '+(currentQ+1)+' of '+quizData.length+'</div>';
  if(qd.sc) html+='<div class="q-scenario"><strong>Case scenario:</strong><br>'+qd.sc+'</div>';
  html+='<div class="q-text">'+qd.q+'</div>';
  if(isMulti && qd.opts){
    html+='<div class="stmt-list">';
    qd.opts.forEach(function(s,i){
      var clean=s.replace(/^\([a-d]\)\s*/,'');
      html+='<div class="stmt-item"><span class="stmt-roman">'+romans[i]+'.</span><span>'+clean+'</span></div>';
    });
    html+='</div>';
    html+='<p class="which-correct">Which of the above statement(s) is/are correct?</p>';
  }
  html+='<div class="opts">';
  opts.forEach(function(o,i){
    html+='<button class="opt" onclick="selectAnswer('+i+','+ans+')" data-idx="'+i+'">'
      +'<span class="opt-letter">'+String.fromCharCode(65+i)+'</span>'
      +'<span class="opt-text">'+o+'</span>'
      +'</button>';
  });
  html+='</div>';
  html+='<div class="expl" id="expl">💡 <strong>Reason:</strong> '+qd.expl+'</div>';
  html+='</div>';
  container.innerHTML=html;
  
  document.getElementById('q-counter').textContent='Question '+(currentQ+1)+'/'+quizData.length;
  document.getElementById('q-score-live').textContent='Score: '+score+'/'+(currentQ);
  document.getElementById('qfill').style.width=((currentQ/quizData.length)*100)+'%';
  document.getElementById('nextBtn').style.display='none';
  answered=false;
}

function selectAnswer(selected,correct){
  if(answered) return;
  answered=true;
  var opts=document.querySelectorAll('#quiz-questions .opt');
  opts.forEach(function(o){o.classList.add('locked')});
  if(selected===correct){
    opts[selected].classList.add('correct');
    score++;
  } else {
    opts[selected].classList.add('wrong');
    opts[correct].classList.add('show-correct');
  }
  document.getElementById('expl').classList.add('show');
  document.getElementById('q-score-live').textContent='Score: '+score+'/'+(currentQ+1);
  document.getElementById('nextBtn').style.display='inline-block';
}

function nextQuestion(){
  currentQ++;
  if(currentQ>=quizData.length){
    showScore();
  } else {
    renderQuestion();
  }
}

function showScore(){
  document.getElementById('quiz-questions').innerHTML='';
  document.getElementById('quiz-nav').style.display='none';
  document.getElementById('quiz-progress-bar').style.display='none';
  var panel=document.getElementById('quiz-score-panel');
  panel.style.display='block';
  var pct=Math.round((score/quizData.length)*100);
  document.getElementById('final-score').textContent=score+'/'+quizData.length+' ('+pct+'%)';
  var msg='';
  if(pct>=80) msg='🎉 Excellent! You are ready for the CACS Paper 1 exam!';
  else if(pct>=60) msg='👍 Good work! Review the chapters where you got questions wrong and try again.';
  else msg='📚 Keep studying! Go back to the chapter tabs and review the concepts, then try again.';
  document.getElementById('score-msg').textContent=msg;
  document.getElementById('qfill').style.width='100%';
}

function restartQuiz(){
  var selectedSet=getSelectedQuizSet();
  quizData=selectedSet.data.slice();
  currentQ=0;score=0;answered=false;
  document.getElementById('quiz-score-panel').style.display='none';
  document.getElementById('quiz-start-panel').style.display='block';
  document.getElementById('quiz-progress-bar').style.display='none';
  document.getElementById('quiz-questions').innerHTML='';
  document.getElementById('quiz-nav').style.display='none';
  var modePanel=document.getElementById('quiz-mode-panel');
  var label=document.getElementById('selected-quiz-set-label');
  var set1Btn=document.getElementById('quiz-set1-btn');
  var set2Btn=document.getElementById('quiz-set2-btn');
  if(modePanel) modePanel.style.display='none';
  if(label) label.textContent='';
  if(set1Btn) set1Btn.style.boxShadow='';
  if(set2Btn) set2Btn.style.boxShadow='';
}


function syncMusicButtons(){
  var audio=document.getElementById('cafeAudio');
  var buttons=document.querySelectorAll('.music-control');
  if(!audio || !buttons.length) return;

  buttons.forEach(function(btn){
    if(btn.id==='globalMusicBtn'){
      btn.textContent = audio.paused ? '🎧 ▶ Music' : '🎧 ⏸ Music';
      btn.setAttribute('aria-label', audio.paused ? 'Play study music' : 'Pause study music');
      btn.title = audio.paused ? 'Play study music' : 'Pause study music';
    } else {
      btn.textContent = audio.paused ? '▶ Play music' : '⏸ Pause music';
    }
  });
}

function toggleCafeMusic(){
  var audio=document.getElementById('cafeAudio');
  if(!audio) return;

  if(audio.paused){
    var playPromise=audio.play();
    if(playPromise !== undefined){
      playPromise.then(function(){
        syncMusicButtons();
      }).catch(function(){
        syncMusicButtons();
        alert('Music cannot start yet. Please make sure focus-piano.mp3 is in the same folder and click the button again.');
      });
    } else {
      syncMusicButtons();
    }
  } else {
    audio.pause();
    syncMusicButtons();
  }
}

// INIT
renderFlashcards();
syncMusicButtons();
var cafeAudio=document.getElementById('cafeAudio');
if(cafeAudio){
  cafeAudio.addEventListener('play', syncMusicButtons);
  cafeAudio.addEventListener('pause', syncMusicButtons);
  cafeAudio.addEventListener('ended', syncMusicButtons);
}

    // Expose handlers globally so inline onclick="" attributes work.
    

// SITE-WIDE LANGUAGE TOGGLE (English / Simplified Chinese)
var siteLanguage = 'en';
var googleTranslateScriptRequested = false;

function setGoogleTranslateCookie(targetLang){
  var value = targetLang === 'zh-CN' ? '/en/zh-CN' : '/en/en';
  document.cookie = 'googtrans=' + value + ';path=/';
  if(location.hostname){
    document.cookie = 'googtrans=' + value + ';path=/;domain=' + location.hostname;
  }
}

function updateLanguageToggleLabel(){
  var btn=document.getElementById('languageToggleBtn');
  if(btn){
    btn.textContent = siteLanguage === 'zh-CN' ? '🌐 English' : '🌐 中文';
  }
}

function applyGoogleTranslateLanguage(targetLang){
  var combo=document.querySelector('.goog-te-combo');
  if(!combo) return false;
  combo.value=targetLang;
  combo.dispatchEvent(new Event('change', {bubbles:true}));
  return true;
}

function ensureGoogleTranslateLoaded(){
  if(window.google && window.google.translate && document.querySelector('.goog-te-combo')) return;
  if(googleTranslateScriptRequested) return;
  googleTranslateScriptRequested=true;
  window.googleTranslateElementInit=function(){
    new google.translate.TranslateElement({
      pageLanguage:'en',
      includedLanguages:'en,zh-CN',
      autoDisplay:false,
      multilanguagePage:true
    }, 'google_translate_element');
    setTimeout(function(){
      if(siteLanguage==='zh-CN') applyGoogleTranslateLanguage('zh-CN');
    }, 500);
  };
  var gt=document.createElement('script');
  gt.type='text/javascript';
  gt.async=true;
  gt.src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.head.appendChild(gt);
}

function toggleSiteLanguage(){
  var target = siteLanguage === 'en' ? 'zh-CN' : 'en';
  siteLanguage = target;
  setGoogleTranslateCookie(target);
  ensureGoogleTranslateLoaded();

  var translated = applyGoogleTranslateLanguage(target);
  if(!translated){
    setTimeout(function(){ applyGoogleTranslateLanguage(target); }, 800);
    setTimeout(function(){ applyGoogleTranslateLanguage(target); }, 1600);
  }
  updateLanguageToggleLabel();
}

ensureGoogleTranslateLoaded();
updateLanguageToggleLabel();

    window.showTab        = showTab;
    window.toggleSiteLanguage = toggleSiteLanguage;
    window.toggleAcc      = toggleAcc;
    window.revealAnswer   = revealAnswer;
    window.flipCard       = flipCard;
    window.flipAll        = flipAll;
    window.startQuiz      = startQuiz;
    window.startShuffledQuiz = startShuffledQuiz;
    window.selectQuizSet = selectQuizSet;
    window.syncMusicButtons = syncMusicButtons;
    window.selectAnswer   = selectAnswer;
    window.nextQuestion   = nextQuestion;
    window.restartQuiz    = restartQuiz;
    window.renderFlashcards = renderFlashcards;
    window.toggleCafeMusic = toggleCafeMusic;
    window.startChapterQuiz = startChapterQuiz;
    window.selectChapterQuizAnswer = selectChapterQuizAnswer;
    window.nextChapterQuizQuestion = nextChapterQuizQuestion;
    window.restartChapterQuiz = restartChapterQuiz;
    window.startChapter1Quiz = startChapter1Quiz;
    window.selectChapter1Answer = selectChapter1Answer;
    window.nextChapter1Question = nextChapter1Question;
    window.restartChapter1Quiz = restartChapter1Quiz;
  }

  /* ---------- 5. Boot ---------- */
  function boot() {
    setMeta();
    injectStyles();
    injectBody();
    attachLogic();   // also runs renderFlashcards() at the end
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

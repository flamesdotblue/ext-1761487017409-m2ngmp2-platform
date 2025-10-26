import Spline from '@splinetool/react-spline';

export default function HeroSection() {
  return (
    <section className="relative h-[64vh] md:h-[72vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none" />

      <div className="relative z-10 h-full container mx-auto px-4 flex flex-col justify-end pb-10">
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Modern POS System
          </h1>
          <p className="mt-3 md:mt-4 text-slate-300 max-w-2xl">
            Fast, elegant, and secure point-of-sale for retail and service. Tap to add, swipe to pay, and close sales in seconds.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a href="#catalog" className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-4 py-2 text-sm font-medium hover:bg-slate-100 transition">
              Start Selling
            </a>
            <span className="text-xs text-slate-400">3D credit card • glass morphic • fintech</span>
          </div>
        </div>
      </div>
    </section>
  );
}

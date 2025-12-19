export function AboutPage() {
  return (
<div className="bg-slate-50 min-h-screen">
  {/* Hero Section */}
  <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
        About AutoDeal
      </h1>
      <p className="text-lg sm:text-xl max-w-2xl mx-auto opacity-90">
        Your smart companion to compare, explore, and choose the perfect car
        with confidence.
      </p>
    </div>
  </section>

  {/* Content Section */}
  <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Text */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Who We Are
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          AutoDeal is a car comparison platform designed to simplify your car
          buying journey. We bring together detailed specifications, pricing,
          and features of various car models in one place.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Whether you’re a first-time buyer or a car enthusiast, AutoDeal helps
          you make informed decisions without confusion or pressure.
        </p>
      </div>

      {/* Image / Illustration */}
      <div className="flex justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-sm w-full">
          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Why AutoDeal?
          </h3>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-center gap-2">
              ✅ Easy car comparison
            </li>
            <li className="flex items-center gap-2">
              ✅ Latest models & variants
            </li>
            <li className="flex items-center gap-2">
              ✅ Honest & clear information
            </li>
            <li className="flex items-center gap-2">
              ✅ Mobile-friendly experience
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  {/* Mission Section */}
  <section className="bg-white border-t">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h2 className="text-3xl font-bold text-slate-900 mb-4">
        Our Mission
      </h2>
      <p className="text-slate-700 max-w-3xl mx-auto leading-relaxed">
        Our mission is to make car buying simple, transparent, and enjoyable.
        AutoDeal empowers users with accurate data and smart comparisons so
        they can choose the right car without stress.
      </p>
    </div>
  </section>
</div>
  );
}





import { AdminCard } from './AdminCard';

export default function LeadershipSection() {
  return (
    <section className="py-20 px-4 bg-[#faf7f2]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2c2c2c] mb-4">
            Formation and Spiritual Direction
          </h2>
          <p className="text-[#6b6b6b] max-w-2xl mx-auto">
            In the spirit of Opus Dei, each member is guided through personal
            formation, spiritual direction, and a life centered on Christ in
            ordinary work.
          </p>
        </div>

        {/* Director */}
        <div className="flex justify-center mb-16">
          <AdminCard
            image="/public/mann-rentoy.jpg"
            name="Emmanuel Rentoy"
            title="Center Director"
            description="Provides overall direction and ensures the spirit of the Work is lived faithfully in the center."
          />
        </div>

        {/* Formation & Spiritual Guidance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-16">
          <AdminCard
            image="/public/berns-caasi.jpg"
            name="Bernard Caasi"
            title="Formation Coordinator"
            description="Oversees doctrinal and spiritual formation activities for members."
          />

          <AdminCard
            image="/public/william-ongsitco.jpg"
            name="William Ongsitco"
            title="Spiritual Director"
            description="Guides members in their prayer life, sacraments, and personal holiness."
          />
        </div>

        {/* Members */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <AdminCard
            image="/public/manny-palomo.jpg"
            name="Manny Palomo"
            title="Numerary"
            description="Lives celibacy and is fully available for apostolic work and formation."
          />
          <AdminCard
            image="/public/paul-argamoso.png"
            name="Paul Argamoso"
            title="Associate"
            description="Lives celibacy while remaining in their professional and family environment."
          />
          <AdminCard
            image="/public/john-yason.png"
            name="John Yason"
            title="Supernumerary"
            description="Usually married, striving for holiness in family life and professional work."
          />
        </div>
      </div>
    </section>
  );
}

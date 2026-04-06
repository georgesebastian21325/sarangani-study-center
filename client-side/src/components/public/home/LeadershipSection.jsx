import { AdminCard } from './AdminCard';

export default function LeadershipSection() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Our Leadership
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated administrators who guide our community with
            wisdom and devotion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-4xl mx-auto">
          <AdminCard
            image="/public/mann-rentoy.jpg"
            name="Emmanuel Rentoy"
            title="Director"
          />
          <AdminCard
            image="/public/berns-caasi.jpg"
            name="Bernard Caasi"
            title="Formation Coordinator"
          />
          <AdminCard
            image="/public/william-ongsitco.jpg"
            name="William Ongsitco"
            title="Member"
          />
          <AdminCard
            image="/public/manny-palomo.jpg"
            name="Manny Palomo"
            title="Member"
          />
          <AdminCard
            image="/public/paul-argamoso.png"
            name="Paul Argamoso"
            title="Member"
          />
          <AdminCard
            image="/public/john-yason.png"
            name="John Yason"
            title="Member"
          />
        </div>
      </div>
    </section>
  );
}

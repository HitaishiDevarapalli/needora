import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ROLES = [
  { name: 'customer', description: 'Regular customer seeking local services and products' },
  { name: 'merchant', description: 'Verified local business owner or shopkeeper' },
  { name: 'staff', description: 'Business staff or service operative' },
  { name: 'moderator', description: 'Community content and verification moderator' },
  { name: 'administrator', description: 'Super administrator with platform governance access' },
];

const SEED_CATEGORIES = [
  { name: 'Home Decor', slug: 'home-decor', description: 'Furniture, lights, modular kitchen, furnishings' },
  { name: 'Real Estate', slug: 'real-estate', description: 'Commercial plots, residential flats, land agents' },
  { name: 'Restaurants', slug: 'restaurants', description: 'Vegetarian thalis, biryani, sweets & savories' },
  { name: 'Home Cleaning', slug: 'home-cleaning', description: 'Deep cleaning, sofa shampooing, sanitization' },
  { name: 'Electrician & Repair', slug: 'electrician-repair', description: 'AC servicing, wiring, appliance repair' },
  { name: 'Beauty & Salon', slug: 'beauty-salon', description: 'Bridal makeup, hair styling, skin spa' },
  { name: 'Tuitions & Academics', slug: 'tuitions-academics', description: 'School tuition, competitive coaching' },
  { name: 'Health & Medical', slug: 'health-medical', description: 'Clinics, diagnostic centers, pharmacies' },
  { name: 'Automotive & Garage', slug: 'automotive-garage', description: 'Car detailing, bike service, puncture care' },
  { name: 'Packers & Movers', slug: 'packers-movers', description: 'Local relocation, household shifting' },
  { name: 'Event & Wedding', slug: 'event-wedding', description: 'Tent house, photography, catering' },
  { name: 'Jewellery & Fashion', slug: 'jewellery-fashion', description: 'Traditional gold, boutique tailoring' },
];

async function main() {
  console.log('🌱 Starting Needora database seed...');

  // Seed Roles
  for (const r of ROLES) {
    await prisma.role.upsert({
      where: { name: r.name },
      update: { description: r.description },
      create: r,
    });
  }
  console.log(`✓ Seeded ${ROLES.length} system roles`);

  // Seed Categories
  for (const cat of SEED_CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description },
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        status: 'active',
      },
    });
  }
  console.log(`✓ Seeded ${SEED_CATEGORIES.length} main categories`);

  console.log('🎉 Needora database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '../prisma/generated/prisma/client'

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    const existingCurrencies = await prisma.currency.findMany();

    if (existingCurrencies.length === 0) {
        const currencies = [
            { name: "Dollar", symbol: "$", code: 'USD', description: "United States Dollar" },
            { name: "Euro", symbol: "€", code: 'EUR', description: "Euro" },
            { name: "Rupee", symbol: "₹", code : 'INR', description: "Indian Rupee" }
        ];

        for (const currency of currencies) {
            await prisma.currency.create({
                data: currency
            });
        }

        console.log("Currencies seeded successfully.");
    } else {
        console.log("Currencies already exist. Skipping seeding.");
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
import prisma from "../lib/prisma.js";

try {
  const count = await prisma.analysis.count();

  console.log("✅ Database connected successfully!");
  console.log(`📊 Analysis records: ${count}`);
} catch (error) {
  console.error("❌ Database connection failed:");
  console.error(error.message);
} finally {
  await prisma.$disconnect();
}
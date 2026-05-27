const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'test90@gmail.com' }
    });
    if (user) {
      console.log(`Password for ${user.email} is: ${user.password}`);
    } else {
      console.log("User not found in the database!");
    }
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
main();

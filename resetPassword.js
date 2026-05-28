const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const user = await prisma.user.update({
      where: { email: 'test90@gmail.com' },
      data: { password: 'test123' }
    });
    console.log(`Successfully reset password for ${user.email} to: ${user.password}`);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
main();

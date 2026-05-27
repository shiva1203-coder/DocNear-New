const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log("Total users:", users.length);
    const targetUser = users.find(u => u.email === 'a.shivaganesh1203@gmail.com');
    if (targetUser) {
      console.log("User exists:", targetUser);
    } else {
      console.log("User does not exist.");
    }
  } catch (e) {
    console.error("DB Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}
main();

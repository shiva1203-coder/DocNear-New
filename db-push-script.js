const { execSync } = require('child_process');
const dbUrl = 'postgresql://postgres:meteBIGlO4ZLmyNZ@db.vpxeugzdtzoiszfjgeze.supabase.co:6543/postgres?sslmode=require&pgbouncer=true';
process.env.DATABASE_URL = dbUrl;

try {
  console.log('Running prisma db push...');
  const output = execSync('npx prisma db push', { stdio: 'inherit' });
  console.log('Success!');
} catch (error) {
  console.error('Failed to push schema:', error.message);
  process.exit(1);
}

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  try {
    console.log('🔍 Testing connection to Neon PostgreSQL...');
    console.log(`📍 Connection String: ${process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@')}`);
    console.log('');

    const client = await pool.connect();
    console.log('✅ Connection successful!');

    // Test query
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('⏰ Server time:', result.rows[0].current_time);
    console.log('📦 PostgreSQL version:', result.rows[0].pg_version.split(',')[0]);

    client.release();
    await pool.end();

    console.log('');
    console.log('✨ Database connection test passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('');
    console.error('💡 Troubleshooting:');
    console.error('   1. Check your .env file for correct DATABASE_URL');
    console.error('   2. Ensure Neon database is active (not suspended)');
    console.error('   3. Verify connection string format');
    console.error('   4. Check network/firewall settings');
    process.exit(1);
  }
}

testConnection();

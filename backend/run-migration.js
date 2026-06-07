const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function runMigration() {
  const client = await pool.connect();

  try {
    console.log('🚀 Starting database migration...');
    console.log('');

    // Read migration file
    const migrationPath = path.join(__dirname, 'src', 'migrations', 'init.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    console.log('📄 Reading migration file: init.sql');
    console.log('');

    // Execute migration
    console.log('⚙️  Executing migration...');
    await client.query(migrationSQL);

    console.log('✅ Migration completed successfully!');
    console.log('');

    // Verify tables
    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);

    console.log('📊 Tables created:');
    result.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });

    // Check sample data
    const userCount = await client.query('SELECT COUNT(*) as count FROM users');
    console.log('');
    console.log(`👥 Sample users inserted: ${userCount.rows[0].count}`);

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('');
    console.error('Error details:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();

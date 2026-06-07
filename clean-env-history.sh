#!/bin/bash

# Script untuk menghapus .env dari Git history
# WARNING: This will rewrite git history!

echo "🔒 Cleaning .env files from Git history..."
echo ""
echo "⚠️  WARNING: This will rewrite Git history!"
echo "    Make sure you have a backup and all team members are aware."
echo ""
read -p "Continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Aborted."
    exit 1
fi

echo ""
echo "📋 Step 1: Removing .env files from Git history..."

# Hapus .env dari history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch backend/.env frontend/.env" \
  --prune-empty --tag-name-filter cat -- --all

echo ""
echo "📋 Step 2: Cleaning up refs..."

# Hapus refs backup
git for-each-ref --format="delete %(refname)" refs/original | git update-ref --stdin

echo ""
echo "📋 Step 3: Running garbage collection..."

# Garbage collection
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo ""
echo "✅ Local cleanup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. ⚠️  GANTI PASSWORD NEON SEKARANG di https://console.neon.tech"
echo "   2. Update backend/.env dengan password baru"
echo "   3. Test koneksi: cd backend && npm run db:test"
echo "   4. Force push ke remote: git push origin --force --all"
echo "   5. Notify team members to re-clone repository"
echo ""
echo "⚠️  IMPORTANT: Credentials in old commits are still compromised!"
echo "   Change your Neon password immediately!"

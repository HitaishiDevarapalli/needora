import { runDatabaseIntegrationTests } from '../src/lib/__tests__/backend-integration.test.ts';

async function main() {
  console.log('===============================================================');
  console.log('🧪 NEEDORA DATABASE & BACKEND INTEGRATION TEST SUITE');
  console.log('===============================================================\n');

  const results = await runDatabaseIntegrationTests();

  let passedCount = 0;
  for (const r of results) {
    if (r.passed) {
      console.log(`✅ [PASS] ${r.requirement}`);
      console.log(`   └─ ${r.details}\n`);
      passedCount++;
    } else {
      console.log(`❌ [FAIL] ${r.requirement}`);
      console.log(`   └─ ${r.details}\n`);
    }
  }

  console.log('===============================================================');
  console.log(`Summary: ${passedCount} / ${results.length} Tests Passed`);
  console.log('===============================================================');
}

main().catch(console.error);

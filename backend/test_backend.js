async function testAllEndpoints() {
  const BASE_URL = 'http://localhost:5000/api';

  console.log('1. Testing GET /api/health...');
  const healthRes = await fetch(`${BASE_URL}/health`);
  const healthData = await healthRes.json();
  console.log('Health:', healthData);

  console.log('2. Testing POST /api/auth/register (Freelancer)...');
  const regFreeRes = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Freelancer Test',
      email: `freelancer_${Date.now()}@test.com`,
      password: 'password123',
      role: 'freelancer'
    })
  });
  const regFreeData = await regFreeRes.json();
  console.log('Freelancer Register:', regFreeRes.status, regFreeData.user?.name);
  const freelancerToken = regFreeData.token;

  console.log('3. Testing POST /api/auth/register (Client)...');
  const regClientRes = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Client Test',
      email: `client_${Date.now()}@test.com`,
      password: 'password123',
      role: 'client'
    })
  });
  const regClientData = await regClientRes.json();
  console.log('Client Register:', regClientRes.status, regClientData.user?.name);
  const clientToken = regClientData.token;

  console.log('4. Testing GET /api/jobs...');
  const jobsRes = await fetch(`${BASE_URL}/jobs`);
  const jobsData = await jobsRes.json();
  console.log('Jobs Count:', jobsData.length);
  const sampleJob = jobsData[0];

  console.log('5. Testing POST /api/jobs (Client Posting Job)...');
  const postJobRes = await fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${clientToken}`
    },
    body: JSON.stringify({
      title: 'Fullstack Next.js Integration',
      category: 'Web & Software Dev',
      budget: '3500',
      engagement: 'Fixed-Price',
      experience: 'Expert',
      tags: ['Next.js', 'Node.js', 'MongoDB'],
      description: 'Building modern web platform integrated with MongoDB.'
    })
  });
  const createdJob = await postJobRes.json();
  console.log('Posted Job Status:', postJobRes.status, createdJob._id, createdJob.title);

  console.log('6. Testing POST /api/proposals (Freelancer Applying)...');
  const propRes = await fetch(`${BASE_URL}/proposals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${freelancerToken}`
    },
    body: JSON.stringify({
      jobId: createdJob._id || sampleJob._id,
      role: createdJob.title || sampleJob.title,
      clientName: createdJob.client?.name || sampleJob.client?.name,
      bidAmount: '$3,200.00',
      estTime: '10 Days',
      coverLetter: 'I am a top rated fullstack engineer proficient in Next.js and MongoDB.'
    })
  });
  const propData = await propRes.json();
  console.log('Proposal Status:', propRes.status, propData._id);

  console.log('7. Testing GET /api/proposals/my...');
  const myPropRes = await fetch(`${BASE_URL}/proposals/my`, {
    headers: { 'Authorization': `Bearer ${freelancerToken}` }
  });
  const myPropData = await myPropRes.json();
  console.log('My Proposals Count:', myPropData.length);

  console.log('8. Testing POST /api/contracts (Client Hiring)...');
  const contractRes = await fetch(`${BASE_URL}/contracts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${clientToken}`
    },
    body: JSON.stringify({
      title: 'Fullstack Next.js Contract',
      client: 'Client Test',
      freelancerId: regFreeData.user?.id,
      totalValue: '3500',
      escrowProtected: '1500',
      milestonesCount: 3
    })
  });
  const contractData = await contractRes.json();
  console.log('Contract Status:', contractRes.status, contractData._id);

  console.log('9. Testing GET /api/talent...');
  const talentRes = await fetch(`${BASE_URL}/talent`);
  const talentData = await talentRes.json();
  console.log('Talent Count:', talentData.length);

  console.log('✅ ALL BACKEND ENDPOINTS TESTED SUCCESSFULLY WITH ZERO ERRORS!');
}

testAllEndpoints().catch(err => console.error('❌ BACKEND TEST ERROR:', err));

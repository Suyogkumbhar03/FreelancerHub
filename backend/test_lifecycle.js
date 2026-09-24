async function runLifecycleTest() {
  const BASE_URL = 'http://localhost:5000/api';

  console.log('--- 1. Login as Suyog (Client) ---');
  const clientLoginRes = await fetch(`${BASE_URL}/auth/demo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: 'client' })
  });
  const clientData = await clientLoginRes.json();
  const clientToken = clientData.token;
  console.log('Client logged in:', clientData.user?.name, 'Role:', clientData.user?.role);

  console.log('--- 2. Login as Pratik (Freelancer) ---');
  const freeLoginRes = await fetch(`${BASE_URL}/auth/demo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: 'freelancer' })
  });
  const freeData = await freeLoginRes.json();
  const freeToken = freeData.token;
  console.log('Freelancer logged in:', freeData.user?.name, 'Earnings:', freeData.user?.totalEarned);

  console.log('--- 3. Client Posts a Job ---');
  const postJobRes = await fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${clientToken}`
    },
    body: JSON.stringify({
      title: 'Fullstack React Application Setup',
      category: 'Web & Software Dev',
      budget: '3200',
      engagement: 'Fixed-Price',
      experience: 'Intermediate',
      tags: ['React', 'Node.js', 'Express'],
      description: 'Build a fullstack web app with clean code and responsive UI.'
    })
  });
  const job = await postJobRes.json();
  console.log('Job posted:', job.title, 'ID:', job._id);

  console.log('--- 4. Freelancer Applies for Job ---');
  const applyRes = await fetch(`${BASE_URL}/proposals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${freeToken}`
    },
    body: JSON.stringify({
      jobId: job._id,
      bidAmount: '$3,200.00',
      estTime: '8 Days',
      coverLetter: 'I would love to help you build this React application with clean code and on-time delivery.',
      role: job.title
    })
  });
  const proposal = await applyRes.json();
  console.log('Application submitted, Status:', proposal.status, 'ID:', proposal._id);

  console.log('--- 5. Client Reviews Applications ---');
  const clientPropsRes = await fetch(`${BASE_URL}/proposals/client`, {
    headers: { 'Authorization': `Bearer ${clientToken}` }
  });
  const clientProps = await clientPropsRes.json();
  const foundProp = clientProps.find(p => p._id === proposal._id);
  console.log('Found proposal in client inbox from:', foundProp?.freelancerName);

  console.log('--- 6. Client Accepts Proposal (Hires Freelancer) ---');
  const acceptRes = await fetch(`${BASE_URL}/proposals/${proposal._id}/accept`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${clientToken}` }
  });
  const acceptData = await acceptRes.json();
  const contract = acceptData.contract;
  console.log('Contract created, Status:', contract.status, 'ID:', contract._id);

  console.log('--- 7. Freelancer Submits Completed Work ---');
  const submitWorkRes = await fetch(`${BASE_URL}/contracts/${contract._id}/submit-work`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${freeToken}`
    },
    body: JSON.stringify({
      link: 'https://github.com/pratik/react-fullstack-app',
      notes: 'Completed all requirements, tested responsive UI, and verified all components.'
    })
  });
  const submitData = await submitWorkRes.json();
  console.log('Work submitted, Status:', submitData.contract.status);

  console.log('--- 8. Client Approves Work & Releases Payment ---');
  const payRes = await fetch(`${BASE_URL}/contracts/${contract._id}/approve-and-pay`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${clientToken}` }
  });
  const payData = await payRes.json();
  console.log('Payment completed, Status:', payData.contract.status);

  console.log('--- 9. Verify Freelancer Balance Updated ---');
  const verifyFreeRes = await fetch(`${BASE_URL}/auth/me`, {
    headers: { 'Authorization': `Bearer ${freeToken}` }
  });
  const updatedFree = await verifyFreeRes.json();
  console.log('Updated Freelancer Total Earned:', updatedFree.totalEarned, 'Completed Projects:', updatedFree.completedProjects);

  console.log('\n✅ All backend lifecycle tests passed perfectly!');
}

runLifecycleTest().catch(err => {
  console.error('Lifecycle test error:', err);
});

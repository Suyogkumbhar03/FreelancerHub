const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl || typeof envUrl !== 'string') {
    return 'http://localhost:5000/api';
  }
  const trimmed = envUrl.trim().replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

const BASE_URL = getBaseUrl();

// Helper for authorized headers
const authHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token ? { 'Authorization': `Bearer ${token}` } : {})
});

// Jobs API
export const apiFetchJobs = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/jobs${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
};

export const apiFetchMyJobs = async (token) => {
  const res = await fetch(`${BASE_URL}/jobs/my`, {
    headers: authHeaders(token)
  });
  if (!res.ok) throw new Error('Failed to fetch your jobs');
  return res.json();
};

export const apiCreateJob = async (jobData, token) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(jobData)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to post job');
  }
  return res.json();
};

// Talent API
export const apiFetchTalent = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/talent${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error('Failed to fetch talent');
  return res.json();
};

// Auth API
export const apiLogin = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
};

export const apiRegister = async (userDataOrName, email, password, role, companyName, title) => {
  let body;
  if (typeof userDataOrName === 'object' && userDataOrName !== null) {
    body = userDataOrName;
  } else {
    body = {
      name: userDataOrName,
      email,
      password,
      role,
      companyName,
      title
    };
  }

  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
};

export const apiDemoLogin = async (role) => {
  const res = await fetch(`${BASE_URL}/auth/demo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Demo login failed');
  return data;
};

export const apiGetMe = async (token) => {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: authHeaders(token)
  });
  if (!res.ok) throw new Error('Failed to fetch user profile');
  return res.json();
};

// Proposals API
export const apiFetchProposals = async (token) => {
  const res = await fetch(`${BASE_URL}/proposals`, {
    headers: authHeaders(token)
  });
  if (!res.ok) throw new Error('Failed to fetch proposals');
  return res.json();
};

export const apiFetchClientProposals = async (token) => {
  const res = await fetch(`${BASE_URL}/proposals/client`, {
    headers: authHeaders(token)
  });
  if (!res.ok) throw new Error('Failed to fetch client proposals');
  return res.json();
};

export const apiSubmitProposal = async (proposalData, token) => {
  const res = await fetch(`${BASE_URL}/proposals`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(proposalData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to submit proposal');
  return data;
};

export const apiAcceptProposal = async (proposalId, token) => {
  const res = await fetch(`${BASE_URL}/proposals/${proposalId}/accept`, {
    method: 'PUT',
    headers: authHeaders(token)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to accept proposal');
  return data;
};

export const apiRejectProposal = async (proposalId, token) => {
  const res = await fetch(`${BASE_URL}/proposals/${proposalId}/reject`, {
    method: 'PUT',
    headers: authHeaders(token)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to reject proposal');
  return data;
};

// Contracts API
export const apiFetchContracts = async (token) => {
  const res = await fetch(`${BASE_URL}/contracts`, {
    headers: authHeaders(token)
  });
  if (!res.ok) throw new Error('Failed to fetch contracts');
  return res.json();
};

export const apiSubmitContractWork = async (contractId, deliverables, token) => {
  const res = await fetch(`${BASE_URL}/contracts/${contractId}/submit-work`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(deliverables)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to submit work');
  return data;
};

export const apiApproveContractPayment = async (contractId, token) => {
  const res = await fetch(`${BASE_URL}/contracts/${contractId}/approve-and-pay`, {
    method: 'PUT',
    headers: authHeaders(token)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to approve work & pay');
  return data;
};

// Aliases for dashboard components
export const apiFetchMyProposals = apiFetchProposals;
export const apiFetchMyContracts = apiFetchContracts;

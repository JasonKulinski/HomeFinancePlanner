const BASE_URL = '/api/homes';

/** GET /api/homes?zip=04101 */
export async function fetchHomes(zip) {
  const res = await fetch(`${BASE_URL}?zip=${encodeURIComponent(zip)}`);
  if (!res.ok) throw new Error(`Failed to load homes (${res.status})`);
  return res.json();
}

/** POST /api/homes/affordability?zip=04101 */
export async function fetchAffordability(zip, financeProfile) {
  const res = await fetch(`${BASE_URL}/affordability?zip=${encodeURIComponent(zip)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(financeProfile),
  });
  if (!res.ok) throw new Error(`Failed to calculate affordability (${res.status})`);
  return res.json();
}

import type { NextConfig } from 'next';
import { withEve } from 'eve/next';

const nextConfig: NextConfig = {};

// Named-agent mount: routes live under /eve/agents/demo/eve/v1/*. The
// vercel.json `services` block makes withEve stand down from writing its own
// Build Output config; the platform builds the eve service natively.
export default withEve(nextConfig, { agents: { demo: './agents/demo' } });

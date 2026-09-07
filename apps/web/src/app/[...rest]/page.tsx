// Dynamic catch-all: every request invokes a function, so any URL gives the
// boot verdict — a rendered page, or FUNCTION_INVOCATION_FAILED with
// "Cannot find module 'next/setup-node-env'" in the runtime logs.
export const dynamic = 'force-dynamic';

export default async function Rest({
  params,
}: {
  params: Promise<{ rest: string[] }>;
}) {
  const { rest } = await params;
  return <main>function booted OK: /{rest.join('/')}</main>;
}

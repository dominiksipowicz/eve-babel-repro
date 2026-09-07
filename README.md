# withEve + @babel/core breaks Vercel Services

A Next.js app with `withEve()` deployed as Vercel Services. Adding
`@babel/core` anywhere in the install — here as a devDependency of
[`packages/lib`](./packages/lib/package.json), which nothing imports — makes
every function ship without `node_modules`. Every request then returns 500:

```
Cannot find module 'next/setup-node-env'
Require stack:
- /var/task/apps/web/___next_launcher.cjs
```

The build reports READY. `vercel build` locally produces a correct bundle —
the files are lost in cloud packaging only. Reproduces on the affected
production project; a fresh project on another team is not affected
(builder-cohort dependent).

Found in production by adding `@svgr/core` (icon codegen), which depends on
`@babel/core` — any package that pulls babel in transitively arms it.

| branch | difference | affected project |
|---|---|---|
| `main` | `@babel/core` present | ❌ all functions 500 |
| `no-babel` | removed | ✅ works |

## Repro

1. Vercel project with **Root Directory = `apps/web`**.
2. Deploy `main`, then `no-babel`.
3. Open any path. It either renders "function booted OK" or fails with the
   error above in the runtime logs.

```bash
bun install
bun run --cwd apps/web build   # local build is fine either way
vercel deploy --prod
```

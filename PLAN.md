# PLAN — Remote MCP server rewrite

## Goal

Move `@navikt/aksel-mcp` from a package-installed stdio server to a hosted HTTPS MCP server so the implementation can be updated independently of npm releases.

## Assumptions

- The server stays read-only and serves Aksel docs, icons, tokens, and migration metadata.
- No user-specific state is required at launch.
- Auth is not required for the first cut; if that changes later, the remote transport will still be the right base.

## Recommended shape

- **Deployment:** remote streamable-HTTP MCP server
- **Framework:** official TypeScript SDK (`@modelcontextprotocol/sdk`)
- **Tool design:** one tool per action (current surface is small)
- **Transport:** stateless HTTP at `/mcp`, plus a simple health endpoint
- **Platform manifest:** Nais app with `/isalive`, `/isready`, and `/metrics`

## Rewrite approach

1. **Split server creation from transport**
   - Extract the current tool/resource/prompt registration into a reusable server factory.
   - Keep the catalog of tools, resources, and prompts in one place.
   - Make transport the only thing that changes between local dev and hosted HTTP.

2. **Add a remote HTTP entrypoint**
   - Serve MCP over streamable HTTP instead of stdio.
   - Add `/isalive` and `/isready` for Nais health checks.
   - Add `/metrics` for Prometheus scraping.
   - Wire protocol/version handling and origin validation up front.

3. **Preserve the current MCP surface**
   - Keep the 4 tools and 4 resources behaviorally equivalent.
   - Keep prompt support in place even though it is currently empty.
   - Tighten annotations/descriptions so the hosted server is directory-ready if needed later.

4. **Remove npm as the update mechanism**
   - Package updates should stop being the deployment mechanism for runtime changes.
   - Treat the repo as source; build and deploy from the hosted service instead.
   - Keep the package only if it still helps local development or inspector-based debugging.

5. **Add deployment and runtime configuration**
   - Containerize or otherwise package the server for the target host.
   - Move environment-specific values to env vars.
   - Generate `.nais/app.yaml` with image placeholder, port 8080, resource requests/limits, and replicas.
   - Add CORS, bearer/OAuth hooks only if the deployment requires them.

   **note**: If you are missing context or undertanding for how NAIS works, reference docs here: https://github.com/nais/doc/tree/main/docs

6. **Verify the new server contract**
   - Check `initialize`, `tools/list`, and `tools/call` over HTTP.
   - Confirm resources still resolve correctly.
   - Smoke test with the MCP Inspector against the remote URL.

## Files likely to change

- `@navikt/aksel-mcp/src/index.ts`
- `@navikt/aksel-mcp/src/tools/*`
- `@navikt/aksel-mcp/src/resources/*`
- `@navikt/aksel-mcp/package.json`
- `.nais/app.yaml`
- New HTTP server entrypoint and deployment config

## Migration notes

- The current package is a stdio binary, so the hosted server should not depend on `bin` for runtime.
- The tool surface is small enough that we should keep dedicated tools instead of switching to search/execute.
- The rewrite should avoid changing the actual documentation/data returned unless the HTTP transport exposes a spec issue.

## Open question

- What is the target Nais namespace/team?
- Should the remote server stay public/read-only, or do we need Azure AD / TokenX / ingress restrictions now?

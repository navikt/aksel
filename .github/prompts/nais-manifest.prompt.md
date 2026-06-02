---
name: nais-manifest
description: Generer et produksjonsklart Nais-applikasjonsmanifest for Kubernetes-deployment
model: GPT-5.3-Codex
---

You are creating a Nais application manifest in `.nais/app.yaml` for deploying to Nav's Kubernetes platform.

## Required Configuration

Generate a complete Nais manifest with:

- **Application name and namespace**: Ask for team namespace if not provided
- **Container image**: Use `{{image}}` placeholder (replaced by CI/CD)
- **Port**: Default to 8080 unless specified
- **Prometheus metrics**: Enabled at `/metrics` endpoint

## Resources

```yaml
resources:
  requests:
    cpu: 50m
    memory: 256Mi
  limits:
    memory: 512Mi
```

## Observability

- **Prometheus scraping**: Enabled at `/metrics`
- **Logs**: Automatically sent to Grafana Loki via stdout/stderr
- **Tracing**: OpenTelemetry auto-instrumentation enabled

## Health Checks

```yaml
liveness:
  path: /isalive
  initialDelay: 5
  timeout: 1
readiness:
  path: /isready
  initialDelay: 5
  timeout: 1
```

## Optional Components

Ask user if they need:

1. **PostgreSQL database** (GCP Cloud SQL)

   ```yaml
   gcp:
     sqlInstances:
       - type: POSTGRES_15
         databases:
           - name: mydb
   ```

2. **Kafka topic configuration**

   ```yaml
   kafka:
     pool: nav-dev # or nav-prod
   ```

3. **Azure AD authentication**

   ```yaml
   azure:
     application:
       enabled: true
       tenant: nav.no
   ```

4. **TokenX for service-to-service auth**

   ```yaml
   tokenx:
     enabled: true
   ```

5. **Ingress/domain configuration**
   ```yaml
   ingresses:
     - https://myapp.intern.dev.nav.no
   ```

## Complete Example

```yaml
apiVersion: nais.io/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: team-namespace
  labels:
    team: team-namespace
spec:
  image: { { image } }
  port: 8080

  # Observability
  prometheus:
    enabled: true
    path: /metrics

  # Health checks
  liveness:
    path: /isalive
    initialDelay: 5
    timeout: 1
  readiness:
    path: /isready
    initialDelay: 5
    timeout: 1

  # Resources
  resources:
    requests:
      cpu: 50m
      memory: 256Mi
    limits:
      memory: 512Mi

  # Replicas
  replicas:
    min: 2
    max: 4
    cpuThresholdPercentage: 80

  # Database (optional)
  gcp:
    sqlInstances:
      - type: POSTGRES_15
        databases:
          - name: myapp-db

  # Kafka (optional)
  kafka:
    pool: nav-dev

  # Authentication (optional)
  azure:
    application:
      enabled: true
      tenant: nav.no

  tokenx:
    enabled: true

  # Ingress (optional)
  ingresses:
    - https://myapp.intern.dev.nav.no

  # Access policies (optional - for TokenX)
  accessPolicy:
    inbound:
      rules:
        - application: other-app
          namespace: other-namespace
    outbound:
      rules:
        - application: downstream-app
          namespace: downstream-namespace
```

## Follow-up

After generating the manifest, remind the user to:

1. Create health endpoints in their application:
   - GET `/isalive` - returns "Alive"
   - GET `/isready` - returns "Ready"
   - GET `/metrics` - returns Prometheus metrics

2. Ensure the application listens on the specified port (8080 by default)

3. Review the manifest and adjust resource limits based on actual usage

4. For production deployments, create a separate `.nais/app-prod.yaml` with production-specific values

## Forstå koden

After generating the manifest, explain:

1. **Resource-modellen** — Why `requests` vs `limits`, and why there's no CPU limit (only requests). What happens when a pod exceeds memory limits vs CPU requests?
2. **accessPolicy** — Why Nais defaults to deny-all networking. What breaks if you forget `outbound.rules` for a downstream service?
3. **Replicas og autoscaling** — Why `min: 2` (availability during deploys), and how `cpuThresholdPercentage` triggers scaling.
4. **Auth-valg** — The difference between Azure AD (machine-to-machine), TokenX (user context delegation), and ID-porten (citizen login). Which one fits your use case and why?

🔴 **Rød sone**: `accessPolicy` and auth configuration directly affect your application's security posture — understand the trust boundaries before deploying.

Still gjerne spørsmål om valgene over.

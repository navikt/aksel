## Dynamisk visning

Hvis alertstripene skal dukke opp dynamisk, for eksempel som en reaksjon på noe brukeren gjør, er det viktig at det allerede ligger et element på siden som har definert en såkalt "live region" hvor Alertstripene skal bli rendret i. Dette kan gjøres ved å gi container-elementet et `aria-live`-attributt med verdien `polite` eller `assertive`.

```html
<div aria-live="polite">
  <!-- her kommer det en Alertstripe når brukeren klikker på noe -->
</div>
```

Merk at `aria-live="assertive"` bør brukes varsomt og kun når det er nødvendig å få brukerens oppmerksomhet umiddelbart. Et alternativ er å gi konteiner-elementet et `role="alert"`-attributt, som er akkurat det samme som å sette `aria-live="assertive"` og `aria-atomic="true`.

## Mer informasjon

- [Using ARIA role=alert or Live Regions to Identify Errors (W3.org)](https://www.w3.org/TR/WCAG20-TECHS/ARIA19.html)
- [ARIA Live Regions (Mozilla Developer Network)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
- [Using the alert role (Mozilla Developer Network)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alert_role)
- [User Notifications (W3.org)](https://www.w3.org/WAI/tutorials/forms/notifications/)

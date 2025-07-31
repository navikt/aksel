import { BodyShort, BoxNew, HGrid, HStack, Heading } from "@navikt/ds-react";

type EmptyStateCardProps = {
  variant?: "default" | "questionmark";
  actionComponent?: React.ReactNode;
};

function EmptyStateCard({
  variant = "default",
  actionComponent,
}: EmptyStateCardProps) {
  return (
    <BoxNew
      asChild
      borderWidth="1"
      borderColor="neutral-subtleA"
      borderRadius="xlarge"
    >
      <HGrid
        padding="space-16"
        gap="space-12"
        columns={{ xs: "auto", md: "auto 1fr" }}
        align="center"
      >
        <HStack justify="center">
          {variant === "questionmark" ? (
            <EmptyStateImageQuestionmark />
          ) : (
            <EmptyStateImageSparkles />
          )}
        </HStack>
        <div>
          <Heading size="xsmall" level="3" spacing>
            Ingen treff på filteret ditt
          </Heading>
          <BodyShort size="small" spacing>
            Prøv å justere filteret ditt. Om du fortsatt sitter igjen tomhendt
            kan du opprette et issue på Github, eller kontakte oss på Slack så
            ser vi på det sammen.
          </BodyShort>
          {actionComponent && (
            <BoxNew marginBlock="space-24 0">{actionComponent}</BoxNew>
          )}
        </div>
      </HGrid>
    </BoxNew>
  );
}

function EmptyStateImageSparkles() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle
        cx="92.0352"
        cy="85.9491"
        r="40.622"
        transform="rotate(45 92.0352 85.9491)"
        stroke="var(--ax-bg-brand-blue-strong)"
        strokeWidth="6"
      />
      <path
        d="M66.2188 116.459L45.4316 137.246"
        stroke="var(--ax-bg-brand-blue-strong)"
        strokeWidth="6"
      />
      <path
        d="M45.4336 137.247L24.6465 158.034"
        stroke="var(--ax-bg-brand-blue-strong)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <circle
        cx="116.23"
        cy="137.484"
        r="38.2574"
        fill="var(--ax-bg-brand-blue-moderate-hover)"
      />
      <path
        d="M99.2726 127.081L111.364 141.461C111.833 142.018 112.09 142.723 112.09 143.451V157.908C112.09 159.616 113.474 161 115.181 161H117.543C119.251 161 120.635 159.616 120.635 157.909V143.465C120.635 142.729 120.897 142.016 121.376 141.457L133.643 127.1C135.357 125.093 133.931 122 131.292 122H101.639C99.0112 122 97.5815 125.07 99.2726 127.081Z"
        fill="var(--ax-bg-brand-blue-strong)"
      />
      <path
        d="M131.301 39.7158L142.121 24.2583"
        stroke="var(--ax-bg-brand-blue-strong)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M143.668 48.2176L175.356 25.8042"
        stroke="var(--ax-bg-brand-blue-strong)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M149.078 62.9022L173.037 56.7192"
        stroke="var(--ax-bg-brand-blue-strong)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M42.1016 29.3691V36.6061"
        stroke="var(--ax-bg-brand-blue-strong)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M42.1016 44.5015V51.7384"
        stroke="var(--ax-bg-brand-blue-strong)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M52.6289 40.5532L45.392 40.5532"
        stroke="var(--ax-bg-brand-blue-strong)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M38.1523 40.5532L30.9154 40.5532"
        stroke="var(--ax-bg-brand-blue-strong)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M172.719 99.7012V106.938"
        stroke="var(--ax-bg-brand-blue-strong)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M172.719 114.833V122.07"
        stroke="var(--ax-bg-brand-blue-strong)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M183.246 110.885L176.009 110.885"
        stroke="var(--ax-bg-brand-blue-strong)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M168.77 110.885L161.533 110.885"
        stroke="var(--ax-bg-brand-blue-strong)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EmptyStateImageQuestionmark() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M34.7626 108.638L31.4932 114.171C30.9625 115.069 30.9625 116.185 31.4932 117.083L34.7626 122.616C35.2776 123.488 36.2146 124.022 37.2269 124.022H44.1088C45.1323 124.022 46.078 123.476 46.5889 122.589L49.7766 117.056C50.2861 116.172 50.2861 115.083 49.7766 114.198L46.5889 108.665C46.078 107.778 45.1323 107.232 44.1088 107.232H37.2269C36.2146 107.232 35.2776 107.767 34.7626 108.638Z"
        fill="var(--ax-bg-brand-blue-moderate-pressed)"
      />
      <circle
        cx="99.0343"
        cy="29.5465"
        r="6.56944"
        fill="var(--ax-bg-brand-blue-moderate-pressed)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M70.9989 95.9112C86.9702 91.6317 96.4482 75.2152 92.1687 59.2439C87.8892 43.2726 71.4727 33.7945 55.5014 38.074C39.5301 42.3535 30.0521 58.77 34.3316 74.7413C38.6111 90.7126 55.0276 100.191 70.9989 95.9112ZM72.5518 101.707C91.7239 96.5696 103.101 76.8631 97.9643 57.691C92.8271 38.5189 73.1206 27.1413 53.9485 32.2785C34.7764 37.4156 23.3989 57.1221 28.536 76.2942C33.6731 95.4663 53.3797 106.844 72.5518 101.707Z"
        fill="var(--ax-bg-brand-blue-strong)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M116.475 135.774L82.3477 93.8154L87.0024 90.0295L121.129 131.989L116.475 135.774Z"
        fill="var(--ax-bg-brand-blue-strong)"
      />
      <path
        d="M168.895 48.3449C169.733 47.6852 170.972 48.1235 171.209 49.1633L173.954 61.217C174.208 62.3323 173.133 63.2897 172.054 62.9083L159.596 58.5024C158.518 58.121 158.283 56.7003 159.182 55.9927L168.895 48.3449Z"
        fill="var(--ax-bg-brand-blue-moderate-pressed)"
      />
      <path
        d="M121.718 67.3612C122.638 66.4419 124.128 66.442 125.047 67.3612L131.602 73.9158C132.521 74.835 132.521 76.3253 131.602 77.2445L125.047 83.7991C124.128 84.7183 122.638 84.7183 121.718 83.7991L115.164 77.2445C114.245 76.3253 114.245 74.835 115.164 73.9158L121.718 67.3612Z"
        fill="var(--ax-bg-brand-blue-moderate-pressed)"
      />
      <path
        d="M174.266 163.502L102.266 177.022L30.2656 163.502L38.2656 137.543L102.266 124.022L166.266 137.543L174.266 163.502Z"
        fill="url(#paint0_linear_271_5972)"
      />
      <path
        d="M101.876 142.252L109.446 169.331C109.455 169.363 109.483 169.386 109.516 169.388C117.361 169.924 125.242 169.268 132.89 167.442L133.19 167.371C133.228 167.362 133.249 167.32 133.234 167.284L126.421 151.134C123.718 144.727 123.878 137.47 126.861 131.188L127.289 130.286C128.765 127.179 129.434 123.75 129.237 120.316L128.162 101.661C128.037 99.4891 126.058 97.9037 123.912 98.2547C122.377 98.5055 120.852 97.7613 120.106 96.3979L119.488 95.2692C118.701 93.8337 116.984 93.1885 115.447 93.7513C114.17 94.219 112.737 93.8577 111.835 92.8406L110.977 91.8738C110.029 90.8065 108.437 90.6078 107.257 91.4094C106.06 92.2222 104.443 92.0055 103.503 90.906L102.678 89.9423C101.646 88.7352 100.012 88.2284 98.4772 88.6393C96.6739 89.1223 95.4198 90.7564 95.4198 92.6233V109.28C95.4198 111.266 94.347 113.097 92.6146 114.068C89.9256 115.575 89.0047 119.001 90.5757 121.653L99.5479 136.801C100.559 138.508 101.342 140.341 101.876 142.252Z"
        fill="var(--ax-bg-brand-blue-moderate-hover)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M65.3839 55.6342C64.474 54.6203 63.095 54.1644 61.7601 54.4363L61.4384 54.5018C59.383 54.9204 57.9062 56.7282 57.9062 58.8258V59.0841C57.9062 60.1886 57.0108 61.0841 55.9062 61.0841C54.8017 61.0841 53.9062 60.1886 53.9062 59.0841V58.8258C53.9062 54.8267 56.7215 51.3803 60.6402 50.5823L60.9619 50.5167C63.6875 49.9617 66.5031 50.8924 68.3609 52.9625C70.9908 55.893 71.039 60.3195 68.4735 63.3065L66.7373 65.328C66.4984 65.6061 66.2822 65.9029 66.0907 66.2154L65.7821 66.7191C64.526 68.7689 64.0709 71.2104 64.5041 73.5751C64.7031 74.6616 63.9836 75.7037 62.8971 75.9027C61.8106 76.1017 60.7685 75.3823 60.5695 74.2958C59.9588 70.9616 60.6005 67.5194 62.3714 64.6292L62.68 64.1256C62.983 63.6311 63.325 63.1617 63.7029 62.7218L65.4391 60.7003C66.6956 59.2374 66.672 57.0694 65.3839 55.6342Z"
        fill="var(--ax-bg-brand-blue-strong)"
      />
      <path
        d="M65.8586 80.6739C65.8586 82.1116 64.6931 83.277 63.2554 83.277C61.8178 83.277 60.6523 82.1116 60.6523 80.6739C60.6523 79.2363 61.8178 78.0708 63.2554 78.0708C64.6931 78.0708 65.8586 79.2363 65.8586 80.6739Z"
        fill="var(--ax-bg-brand-blue-strong)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.4414 163.287L34.5932 157.212L102.635 170.114L170.676 157.212L171.828 163.287L102.635 176.407L33.4414 163.287Z"
        fill="var(--ax-bg-brand-blue-strong-hover)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_271_5972"
          x1="112"
          y1="124"
          x2="102.266"
          y2="177.022"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--ax-bg-brand-blue-strong)" />
          <stop offset="1" stopColor="var(--ax-bg-brand-blue-strong-pressed)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export { EmptyStateCard };

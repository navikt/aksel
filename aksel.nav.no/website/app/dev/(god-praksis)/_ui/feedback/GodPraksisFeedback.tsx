import { BoxNew, HGrid, Show } from "@navikt/ds-react";
import { verifyUserLoggedIn } from "@/app/_auth/rcs";
import styles from "./GodPraksisFeedback.module.css";
import {
  GodPraksisFeedbackForm,
  GodPraksisFeedbackLogin,
} from "./GodPraksisFeedback.parts";

async function GodPraksisFeedback({ docId }: { docId: string }) {
  const auth = await verifyUserLoggedIn();

  return (
    <BoxNew
      borderRadius="large"
      borderWidth="1"
      borderColor="neutral-subtleA"
      background="raised"
      padding="space-24"
      marginBlock="space-48"
    >
      <HGrid
        gap={{ xs: "space-16", md: "space-64" }}
        columns={{ xs: 1, sm: "1fr min-content" }}
      >
        <div>
          {auth.ok ? (
            <GodPraksisFeedbackForm docId={docId} name={auth.user.name} />
          ) : (
            <GodPraksisFeedbackLogin />
          )}
        </div>
        <Show above="sm" asChild>
          <div className={styles.feedbackIllustration}>
            <svg
              width="81"
              height="81"
              viewBox="0 0 81 81"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="56.6904"
                y="0.754639"
                width="34.4325"
                height="34.4325"
                rx="1.88654"
                transform="rotate(45 56.6904 0.754639)"
                className={styles.feedbackIllustrationSquare}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M40.44 18.8796C41.4755 18.8796 42.315 19.7191 42.315 20.7546V34.978L47.8642 29.4288C48.5964 28.6966 49.7836 28.6966 50.5158 29.4288C51.248 30.161 51.248 31.3482 50.5158 32.0805L41.7658 40.8305C41.0336 41.5627 39.8464 41.5627 39.1142 40.8305L30.3642 32.0805C29.6319 31.3482 29.6319 30.161 30.3642 29.4288C31.0964 28.6966 32.2836 28.6966 33.0158 29.4288L38.565 34.978V20.7546C38.565 19.7191 39.4045 18.8796 40.44 18.8796ZM23.6991 22.5583C23.9838 21.8464 24.6733 21.3796 25.44 21.3796H32.94C33.9755 21.3796 34.815 22.2191 34.815 23.2546C34.815 24.2902 33.9755 25.1296 32.94 25.1296H26.7094L20.7094 40.1296H27.6449C29.302 40.1296 30.8169 41.0659 31.558 42.5481L33.926 47.2841C34.0319 47.4959 34.2483 47.6296 34.485 47.6296H46.3949C46.6316 47.6296 46.848 47.4959 46.9539 47.2841L49.3219 42.5481C50.063 41.0659 51.5779 40.1296 53.235 40.1296H60.1705L54.1705 25.1296H47.94C46.9044 25.1296 46.065 24.2902 46.065 23.2546C46.065 22.2191 46.9044 21.3796 47.94 21.3796H55.44C56.2066 21.3796 56.8961 21.8464 57.1808 22.5583L64.6651 41.2688C64.7167 41.3898 64.756 41.5173 64.7814 41.6497C64.8071 41.7823 64.818 41.9155 64.815 42.0472V58.2546C64.815 59.2902 63.9755 60.1296 62.94 60.1296H17.94C16.9044 60.1296 16.065 59.2902 16.065 58.2546V42.0472C16.0619 41.9156 16.0728 41.7825 16.0985 41.65C16.1238 41.5174 16.1632 41.3898 16.2148 41.2688L23.6991 22.5583ZM27.6449 43.8796C27.8816 43.8796 28.098 44.0134 28.2039 44.2251L30.5719 48.9612C31.313 50.4434 32.8279 51.3796 34.485 51.3796H46.3949C48.052 51.3796 49.5669 50.4434 50.308 48.9612L52.676 44.2251C52.7819 44.0134 52.9983 43.8796 53.235 43.8796H61.065V56.3796H19.815V43.8796H27.6449Z"
                fill="var(--ax-text-neutral)"
              />
            </svg>
          </div>
        </Show>
      </HGrid>
    </BoxNew>
  );
}
export { GodPraksisFeedback };

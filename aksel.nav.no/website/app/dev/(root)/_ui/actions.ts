"use server";

import {
  acceptCookiesAction,
  rejectCookiesAction,
} from "@/app/_ui/consent-banner/ConsentBanner.utils";

async function submitForm(formData: FormData) {
  if (formData.get("acceptedTracking") === "tracking_yes") {
    await acceptCookiesAction();
  } else if (formData.get("acceptedTracking") === "tracking_no") {
    await rejectCookiesAction();
  }
}

export { submitForm };

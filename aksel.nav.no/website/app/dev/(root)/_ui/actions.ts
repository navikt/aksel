"use server";

import {
  acceptCookies,
  rejectCookies,
} from "@/app/_ui/consent-banner/ConsentBanner.utils";

async function submitForm(formData: FormData) {
  if (formData.get("acceptedTracking") === "tracking_yes") {
    await acceptCookies();
  } else if (formData.get("acceptedTracking") === "tracking_no") {
    await rejectCookies();
  }
}

export { submitForm };

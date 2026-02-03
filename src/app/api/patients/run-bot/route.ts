import { NextResponse } from "next/server";
import { patients } from "../../patients/route";

export async function POST() {

  for (let i = 0; i < patients.length; i++) {

    if (patients[i].eligibilityStatus === "Pending") {

      // Delay (simulate bot processing)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      //  Dummy logic (replace later)
      const isEligible = Math.random() > 0.5;

      patients[i].eligibilityStatus = isEligible
        ? "Eligible"
        : "Not Eligible";
    }
  }
  return NextResponse.json({ message: "Bot Completed" });
}

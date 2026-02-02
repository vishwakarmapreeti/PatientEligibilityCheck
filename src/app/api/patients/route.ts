import { NextRequest, NextResponse } from "next/server";
import { Patient } from "../../../../types/patient";

interface PatientWithStatus extends Patient {
  status: string;
  eligibilityStatus: string;
}

let patients: PatientWithStatus[] = [];

export async function GET() {
  return NextResponse.json(patients);
}

export async function POST(request: NextRequest) {
  const body: Patient = await request.json();

  const newPatient: PatientWithStatus = {
    ...body,
    status: "Scheduled",
     eligibilityStatus: "Pending"
  };

  patients.push(newPatient);

  return NextResponse.json(newPatient);
}

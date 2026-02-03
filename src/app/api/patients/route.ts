import { NextRequest, NextResponse } from "next/server";
import { Patient } from "../../../../types/patient";
import { dummyPatients } from "../../../../data/dummyPatients";

interface PatientWithStatus extends Patient {
  status: string;
  eligibilityStatus: string;
}

/*  Convert Dummy Data to Proper Format */
export let patients: PatientWithStatus[] = dummyPatients.slice(0,5).map((patient) => ({
  ...patient,
  treatmentCategory: Array.isArray(patient.treatmentCategory)
    ? patient.treatmentCategory[0] // take first value only
    : patient.treatmentCategory,
  status: "Scheduled",
  eligibilityStatus: "Pending",
}));

/* ✅ GET API */
export async function GET() {
  return NextResponse.json(patients);
}

/* ✅ POST API */
export async function POST(request: NextRequest) {
  const body: Patient = await request.json();

  const newPatient: PatientWithStatus = {
    ...body,
    treatmentCategory: String(body.treatmentCategory), 
    status: "Scheduled",
    eligibilityStatus: "Pending",
  };

  patients.push(newPatient);

  return NextResponse.json(newPatient);
}

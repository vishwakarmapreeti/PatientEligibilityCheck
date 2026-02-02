import { NextRequest, NextResponse } from "next/server";
import { Patient } from "../../../../types/patient";

interface PatientWithStatus extends Patient {
  status: string;
  eligibilityStatus: string;
}

/* ✅ 5 Hardcoded Default Patients (Single treatmentCategory as STRING) */
let patients: PatientWithStatus[] = [
  {
    patientName: "Rahul Sharma",
    dob: "1988-05-14",
    patientId: "PAT001",
    policyNumber: "SUK12345",
    insuranceCompany: "Sukoon",
    treatmentCategory: "Cardiology",
    treatmentDate: "2025-01-10",
    hospital: "Apollo Hospital Mumbai",
    physician: "Dr. Amit Verma",
    status: "Scheduled",
    eligibilityStatus: "Pending",
  },
  {
    patientName: "Priya Mehta",
    dob: "1992-09-22",
    patientId: "PAT002",
    policyNumber: "SUK67890",
    insuranceCompany: "Tokkio",
    treatmentCategory: "Dental",
    treatmentDate: "2025-02-15",
    hospital: "Fortis Hospital Mulund",
    physician: "Dr. Sneha Kulkarni",
    status: "Scheduled",
    eligibilityStatus: "Pending",
  },
  {
    patientName: "Amit Patel",
    dob: "1979-03-18",
    patientId: "PAT003",
    policyNumber: "SUK12345",
    insuranceCompany: "Sukoon",
    treatmentCategory: "Orthopedic",
    treatmentDate: "2025-01-28",
    hospital: "Nanavati Max Hospital",
    physician: "Dr. Rajesh Nair",
    status: "Scheduled",
    eligibilityStatus: "Pending",
  },
  {
    patientName: "Neha Reddy",
    dob: "1995-11-05",
    patientId: "PAT004",
    policyNumber: "SUK67890",
    insuranceCompany: "Tokkio",
    treatmentCategory: "Neurology",
    treatmentDate: "2025-03-02",
    hospital: "Kokilaben Ambani Hospital",
    physician: "Dr. Kavita Rao",
    status: "Scheduled",
    eligibilityStatus: "Pending",
  },
  {
    patientName: "Vikram Singh",
    dob: "1983-07-30",
    patientId: "PAT005",
    policyNumber: "SUK12345",
    insuranceCompany: "Sukoon",
    treatmentCategory: "Surgery",
    treatmentDate: "2025-02-05",
    hospital: "Lilavati Hospital Bandra",
    physician: "Dr. Anil Kapoor",
    status: "Scheduled",
    eligibilityStatus: "Pending",
  },
];

/* ✅ GET API */
export async function GET() {
  return NextResponse.json(patients);
}

/* ✅ POST API */
export async function POST(request: NextRequest) {
  const body: Patient = await request.json();

  const newPatient: PatientWithStatus = {
    ...body,
    treatmentCategory: String(body.treatmentCategory), // 🔥 ensure string
    status: "Scheduled",
    eligibilityStatus: "Pending",
  };

  patients.push(newPatient);

  return NextResponse.json(newPatient);
}

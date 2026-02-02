"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Patient } from "../../../types/patient";
import Navbar from "../components/Navbar";
import { dummyPatients } from "../../../data/dummyPatients";
import "./createpatient.css";

export default function CreatePatient() {
    const router = useRouter();

    const [formData, setFormData] = useState<Patient>({
        patientName: "",
        dob: "",
        patientId: "",
        policyNumber: "",
        insuranceCompany: "",
        treatmentCategory: [],
        treatmentDate: "",
        hospital: "",
        physician: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name === "patientId") {
            const existingPatient = dummyPatients.find(
                (patient) => patient.patientId === value
            );

            if (existingPatient) {
                setFormData((prev) => ({
                    ...prev,
                    patientId: value,
                    patientName: existingPatient.patientName,
                    dob: existingPatient.dob,
                    policyNumber: existingPatient.policyNumber,
                }));
                return;
            }
        }

        // ✅ SPECIAL FIX FOR treatmentCategory
        if (name === "treatmentCategory") {
            setFormData((prev) => ({
                ...prev,
                treatmentCategory: [value], // convert string → array
            }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };



    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            console.log("Form Data:", formData);
            console.log("Type of treatmentCategory:", typeof formData.treatmentCategory);
            console.log(
                "Is Array?",
                Array.isArray(formData.treatmentCategory)
            );

            const res = await fetch("/api/patients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("Failed to create patient");
            }

            // Optional delay for UX (spinner / animation)
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setSuccessMessage(true);

            setTimeout(() => {
                setFormData({
                    patientName: "",
                    dob: "",
                    patientId: "",
                    policyNumber: "",
                    insuranceCompany: "",
                    treatmentCategory: [],
                    treatmentDate: "",
                    hospital: "",
                    physician: "",
                });

                setSuccessMessage(false);
                router.push("/");
            }, 2000);
        } catch (error) {
            console.error("Error creating patient:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="patient-form-wrapper">
                <div className="patient-form-container">
                    <div className="form-card-header">
                        <div className="header-badge">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                                <path d="M12 8v8M8 12h8" />
                            </svg>
                        </div>
                        <h1>Add New Patient</h1>
                        <p>Register patient information in the system</p>
                    </div>

                    {successMessage && (
                        <div className="success-alert">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>Patient record saved successfully!</span>
                        </div>
                    )}

                    <form className="patient-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-field full-width">
                                <label htmlFor="patientName">Full Name <span>*</span></label>
                                <input
                                    id="patientName"
                                    type="text"
                                    name="patientName"
                                    placeholder="John Doe"
                                    value={formData.patientName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-field">
                                <label htmlFor="dob">Date of Birth <span>*</span></label>
                                <input
                                    id="dob"
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="patientId">Patient ID <span>*</span></label>
                                <input
                                    id="patientId"
                                    type="text"
                                    name="patientId"
                                    placeholder="PAT001"
                                    value={formData.patientId}
                                    onChange={handleChange}
                                    required
                                />
                                <small>Try PAT001 or PAT002</small>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-field">
                                <label htmlFor="policyNumber">Policy Number <span>*</span></label>
                                <input
                                    id="policyNumber"
                                    type="text"
                                    name="policyNumber"
                                    placeholder="SUK12345"
                                    value={formData.policyNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="insuranceCompany">Insurance Company <span>*</span></label>
                                <select
                                    id="insuranceCompany"
                                    name="insuranceCompany"
                                    value={formData.insuranceCompany}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Company</option>
                                    <option>Tokkio</option>
                                    <option>Sukoon</option>
                                </select>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="form-row">
                            <div className="form-field">
                                <label htmlFor="treatmentCategory">Treatment Type <span>*</span></label>
                                <select
                                    id="treatmentCategory"
                                    name="treatmentCategory"

                                    value={formData.treatmentCategory[0] || ""}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option>Surgery</option>
                                    <option>Dental</option>
                                    <option>Cardiology</option>
                                    <option>Orthopedic</option>
                                    <option>Neurology</option>
                                    <option>Oncology</option>
                                    <option>Pediatrics</option>
                                    <option>Dermatology</option>
                                    <option>Gastroenterology</option>


                                </select>
                            </div>
                            <div className="form-field">
                                <label htmlFor="hospital">Healthcare Facility <span>*</span></label>
                                <select
                                    id="hospital"
                                    name="hospital"
                                    value={formData.hospital}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Hospital</option>
                                    <option>Apollo Hospital Mumbai</option>
                                    <option>Fortis Hospital Mulund</option>
                                    <option>Nanavati Max Hospital</option>
                                    <option>Kokilaben Ambani Hospital</option>
                                    <option>Lilavati Hospital Bandra</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-field">
                                <label htmlFor="treatmentDate">Treatment Date <span className="optional">(Optional)</span></label>
                                <input
                                    id="treatmentDate"
                                    type="date"
                                    name="treatmentDate"
                                    value={formData.treatmentDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="physician">Physician Name <span>*</span></label>
                                <input
                                    id="physician"
                                    type="text"
                                    name="physician"
                                    placeholder="Dr. Smith"
                                    value={formData.physician}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <span className="btn-spinner"></span>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                        <polyline points="17 21 17 13 7 13 7 21" />
                                        <polyline points="7 3 7 8 15 8" />
                                    </svg>
                                    Save Patient
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

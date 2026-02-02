"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Link from "next/link";
// import { Table } from "react-bootstrap";
import { Search } from "lucide-react";
import "./patienttable.css";

interface Patient {
  patientName: string;
  dob: string;
  patientId: string;
  policyNumber: string;
  insuranceCompany: string;
  treatmentCategory: string[];
  hospital: string;
  treatmentDate: string;
  status: string;
  eligibilityStatus: string;
}


const defaultPatients: Patient[] = [
  {
    patientName: "Rahul Sharma",
    dob: "1988-05-14",
    patientId: "PAT001",
    policyNumber: "SUK12345",
    insuranceCompany: "Sukoon",
    treatmentCategory: ["Cardiology"],
    hospital: "Apollo Hospital Mumbai",
    treatmentDate: "2025-01-10",
    status: "Scheduled",
    eligibilityStatus: "Pending",
  },
  {
    patientName: "Priya Mehta",
    dob: "1992-09-22",
    patientId: "PAT002",
    policyNumber: "SUK67890",
    insuranceCompany: "Tokkio",
    treatmentCategory: ["Dental"],
    hospital: "Fortis Hospital Mulund",
    treatmentDate: "2025-02-15",
    status: "Scheduled",
    eligibilityStatus: "Pending",
  },
  {
    patientName: "Amit Patel",
    dob: "1979-03-18",
    patientId: "PAT003",
    policyNumber: "SUK12345",
    insuranceCompany: "Sukoon",
    treatmentCategory: ["Orthopedic"],
    hospital: "Nanavati Max Hospital",
    treatmentDate: "2025-01-28",
    status: "Scheduled",
    eligibilityStatus: "Pending",
  },
  {
    patientName: "Neha Reddy",
    dob: "1995-11-05",
    patientId: "PAT004",
    policyNumber: "SUK67890",
    insuranceCompany: "Tokkio",
    treatmentCategory: ["Neurology"],
    hospital: "Kokilaben Ambani Hospital",
    treatmentDate: "2025-03-02",
    status: "Scheduled",
    eligibilityStatus: "Pending",
  },
  {
    patientName: "Vikram Singh",
    dob: "1983-07-30",
    patientId: "PAT005",
    policyNumber: "SUK12345",
    insuranceCompany: "Sukoon",
    treatmentCategory: ["Surgery"],
    hospital: "Lilavati Hospital Bandra",
    treatmentDate: "2025-02-05",
    status: "Scheduled",
    eligibilityStatus: "Pending",
  },
];

export default function Home() {
 const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const res = await fetch("/api/patients");
    const data = await res.json();
    setPatients(data);
  };

  /* 🔍 Search logic */
  const filteredPatients = patients.filter((patient) =>
    Object.values(patient).some((value) => {
      if (Array.isArray(value)) {
        return value
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }

      return String(value)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    })
  );


  /* 📄 Pagination logic */
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar />

      <div className="home-container">
        <div className="top-section">
          <h1>Hospital Patient Management</h1>

          <Link href="/create">
            <button className="create-btn">Create Patient</button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search patients..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {searchTerm && (
            <p className="search-results">
              Found {filteredPatients.length} patient
              {filteredPatients.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/*  Table */}
        <div className="table-container">
          {currentPatients.length > 0 ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>DOB</th>
                    <th>Patient ID</th>
                    <th>Policy Number</th>
                    <th>Insurance Company</th>
                    <th>Treatment Category</th>
                    <th>Hospital</th>
                    <th>Scheduled Treatment Date</th>
                    <th>Status</th>
                    <th>Eligibility Status</th>

                  </tr>
                </thead>

                <tbody>
                  {currentPatients.map((patient, index) => (
                    <tr key={index}>
                      <td>{patient.patientName}</td>
                      <td>{patient.dob}</td>
                      <td>{patient.patientId}</td>
                      <td>{patient.policyNumber}</td>
                      <td>{patient.insuranceCompany}</td>
                      <td>
                        {Array.isArray(patient.treatmentCategory)
                          ? patient.treatmentCategory.join(", ")
                          : patient.treatmentCategory}
                      </td>

                      <td>{patient.hospital}</td>
                      <td>{patient.treatmentDate}</td>
                      <td>
                        <span
                          className={`status-badge status-${patient.status
                            ?.toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {patient.status}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`eligibility-badge eligibility-${patient.eligibilityStatus
                            ?.toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {patient.eligibilityStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* 📄 Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>

                  <span className="pagination-info">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    className="pagination-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="no-data">
              {searchTerm
                ? "No patients found matching your search"
                : "No Patients Created Yet"}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

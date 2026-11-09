import { matchField, mapDetectedFields, resolveClientValue } from "../backend/src/matching.js";
import { dbInstance } from "../backend/src/database.js";

const client = dbInstance.getClientById("cli_technova_001");
console.log("Testing with client:", client.company.legal_name);

const testFields = [
  { id: "txtCin", name: "corporateIdentityNumber", label: "Corporate Identity Number (CIN)", type: "text" },
  { id: "comp_nm", name: "company_name", label: "Legal Name of Company", type: "text" },
  { id: "pincode", name: "reg_pin", label: "Registered Office Pin Code", type: "text" },
  { id: "auth_cap", name: "nominal_capital", label: "Authorized Share Capital", type: "number" },
  { id: "din_0", name: "txtDin_0", label: "Director DIN", rowIndex: 0, isInsideTable: true, section: "Particulars of Directors" },
  { id: "din_1", name: "txtDin_1", label: "Director DIN", rowIndex: 1, isInsideTable: true, section: "Particulars of Directors" },
  { id: "name_0", name: "txtDirectorName_0", label: "Director Full Name", rowIndex: 0, isInsideTable: true, section: "Particulars of Directors" },
  { id: "name_1", name: "txtDirectorName_1", label: "Director Full Name", rowIndex: 1, isInsideTable: true, section: "Particulars of Directors" }
];

const mappings = mapDetectedFields(testFields, client);

console.log("\n--- Mapping Results ---");
for (const m of mappings) {
  console.log(`[Tier ${m.tier} | Conf: ${(m.confidence * 100).toFixed(0)}%] ${m.domField.label} -> ${m.targetPath} = "${m.resolvedValue}" (${m.status})`);
}

const unmappedField = { id: "custom_random_xyz", name: "xyz", label: "Unrelated Random Input", type: "text" };
const unmappedRes = matchField(unmappedField);
console.log("\nUnmapped check:", unmappedRes.matched ? "FAIL" : "PASSED (correctly unmatched)");

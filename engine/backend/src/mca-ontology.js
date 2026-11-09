/**
 * MCA Ontology and Semantic Field Definitions
 * Maps corporate database fields to MCA V3 form patterns, regex rules, and aliases.
 */

export const FIELD_DEFINITIONS = [
  // --- Company Identification ---
  {
    path: "company.cin",
    label: "Corporate Identification Number (CIN)",
    type: "string",
    format: "cin",
    regex: "^[LUlu]{1}[0-9]{5}[A-Za-z]{2}[0-9]{4}[A-Za-z]{3}[0-9]{6}$|^[A-Za-z]{3}-[0-9]{4}$",
    aliases: [
      "cin", "corporateidentificationnumber", "corporateidentitynumber", "cin_llpin", 
      "llpin", "txtcin", "companycin", "cinno", "corporate_id", "regnumber", "company_cin",
      "companyCin", "corporateIdentityNumber", "companyIdentificationNumber"
    ],
    keywords: ["cin", "corporate id", "llpin", "identity number", "registration number", "company identification"],
    importance: 10
  },
  {
    path: "company.legal_name",
    label: "Company / LLP Legal Name",
    type: "string",
    aliases: [
      "company_name", "companyname", "legalname", "nameofcompany", "txtcompname",
      "txtcompanyname", "entityname", "name_of_company", "proposedname", "companylegalname"
    ],
    keywords: ["company name", "name of company", "entity name", "corporate name", "legal name"],
    importance: 10
  },
  {
    path: "company.roc_code",
    label: "ROC Code (Registrar of Companies)",
    type: "string",
    aliases: ["roc_code", "roccode", "registrarofcompanies", "roc", "txtroc", "jurisdictionroc"],
    keywords: ["roc", "registrar of companies", "roc code", "jurisdiction roc"],
    importance: 8
  },
  {
    path: "company.class_of_company",
    label: "Class of Company (Private / Public)",
    type: "dropdown",
    options: ["Private", "Public", "One Person Company", "LLP"],
    aliases: ["classofcompany", "companyclass", "class_of_company", "txtclass", "selectclass"],
    keywords: ["class of company", "company class", "public or private"],
    importance: 7
  },
  {
    path: "company.company_category",
    label: "Company Category",
    type: "dropdown",
    aliases: ["companycategory", "company_category", "categoryofcompany"],
    keywords: ["company category", "category of company", "limited by shares"],
    importance: 7
  },
  {
    path: "company.company_sub_category",
    label: "Company Sub-Category",
    type: "dropdown",
    aliases: ["companysubcategory", "company_sub_category", "subcategory"],
    keywords: ["sub-category", "sub category", "non-govt"],
    importance: 6
  },
  {
    path: "company.incorporation_date_formatted",
    label: "Date of Incorporation (DD/MM/YYYY)",
    type: "date",
    format: "date_dmy",
    aliases: [
      "incorporation_date", "incorporationdate", "dateofincorporation", "txtdoi", 
      "doi", "date_of_incorporation", "incorpdate", "dtincorporation"
    ],
    keywords: ["date of incorporation", "incorporation date", "doi"],
    importance: 9
  },
  {
    path: "company.email",
    label: "Company Registered Email Address",
    type: "email",
    format: "email",
    aliases: [
      "company_email", "companyemail", "emailid", "email_id", "txtemail", 
      "registeredemail", "officialemail", "email"
    ],
    keywords: ["company email", "official email", "registered email", "email address"],
    importance: 9
  },
  {
    path: "company.phone",
    label: "Company Telephone / Mobile",
    type: "phone",
    aliases: ["company_phone", "companyphone", "telephone", "telephoneno", "txtphone", "contactnumber"],
    keywords: ["telephone", "contact number", "phone number", "company phone"],
    importance: 7
  },
  {
    path: "company.pan",
    label: "Company PAN",
    type: "string",
    format: "pan",
    regex: "^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$",
    aliases: ["company_pan", "companypan", "pan", "panno", "txtpan", "permanentaccountnumber"],
    keywords: ["company pan", "permanent account number", "pan number", "pan of company"],
    importance: 9
  },
  {
    path: "company.tan",
    label: "Company TAN",
    type: "string",
    aliases: ["company_tan", "companytan", "tan", "tanno", "txttan", "taxdeductionaccountnumber"],
    keywords: ["tan", "tan number", "tax deduction account number"],
    importance: 8
  },
  {
    path: "company.authorized_capital",
    label: "Authorized Share Capital (INR)",
    type: "number",
    aliases: [
      "authorized_capital", "authorizedcapital", "authcap", "nominalcapital", 
      "txtauthcapital", "txtauthorizedcapital", "totalauthorizedcapital"
    ],
    keywords: ["authorized capital", "nominal capital", "authorized share capital"],
    importance: 8
  },
  {
    path: "company.paid_up_capital",
    label: "Paid-up Share Capital (INR)",
    type: "number",
    aliases: [
      "paid_up_capital", "paidupcapital", "paidcap", "txtpaidcapital", 
      "txtpaidupcapital", "totalpaidupcapital", "subscribedcapital"
    ],
    keywords: ["paid up capital", "paid-up capital", "subscribed capital"],
    importance: 8
  },

  // --- Registered Office Address ---
  {
    path: "company.registered_address.address_line_1",
    label: "Registered Address Line 1",
    type: "string",
    aliases: [
      "address_line_1", "addressline1", "addr1", "txtaddress1", "premisebuilding", 
      "line1", "address1", "street1", "registeredoffice1"
    ],
    keywords: ["address line 1", "registered office line 1", "building", "premise", "street"],
    importance: 8
  },
  {
    path: "company.registered_address.address_line_2",
    label: "Registered Address Line 2",
    type: "string",
    aliases: [
      "address_line_2", "addressline2", "addr2", "txtaddress2", "streetroad", 
      "line2", "address2", "street2", "locality"
    ],
    keywords: ["address line 2", "locality", "street", "landmark"],
    importance: 7
  },
  {
    path: "company.registered_address.city",
    label: "City / Town",
    type: "string",
    aliases: ["city", "towncity", "txtcity", "regcity", "citytown"],
    keywords: ["city", "town", "city name"],
    importance: 8
  },
  {
    path: "company.registered_address.district",
    label: "District",
    type: "string",
    aliases: ["district", "txtdistrict", "regdistrict"],
    keywords: ["district"],
    importance: 7
  },
  {
    path: "company.registered_address.state",
    label: "State / UT",
    type: "dropdown",
    aliases: ["state", "stateut", "txtstate", "selectstate", "regstate"],
    keywords: ["state", "union territory", "state of registered office"],
    importance: 8
  },
  {
    path: "company.registered_address.pin_code",
    label: "Pin Code / Postal Code",
    type: "string",
    format: "pincode",
    regex: "^[1-9]{1}[0-9]{5}$",
    aliases: ["pin_code", "pincode", "postalcode", "txtpincode", "zipcode", "zip", "pin"],
    keywords: ["pin code", "pincode", "postal code", "zip code"],
    importance: 9
  },
  {
    path: "company.registered_address.country",
    label: "Country",
    type: "dropdown",
    aliases: ["country", "selectcountry", "txtcountry", "nation"],
    keywords: ["country", "nation"],
    importance: 6
  },
  {
    path: "company.registered_address.police_station",
    label: "Jurisdiction Police Station",
    type: "string",
    aliases: ["police_station", "policestation", "jurisdictionpolicestation", "txtpolicestation"],
    keywords: ["police station", "jurisdiction police station"],
    importance: 6
  },

  // --- Financial Profile (AOC-4 / MGT-7) ---
  {
    path: "company.financial_profile.financial_year_start",
    label: "Financial Year Start Date",
    type: "date",
    aliases: ["fy_start", "financialyearfrom", "fystartdate", "periodfrom", "txtfyfrom"],
    keywords: ["financial year start", "fy from", "financial year from"],
    importance: 7
  },
  {
    path: "company.financial_profile.financial_year_end",
    label: "Financial Year End Date",
    type: "date",
    aliases: ["fy_end", "financialyearto", "fyenddate", "periodto", "txtfyto"],
    keywords: ["financial year end", "fy to", "financial year to"],
    importance: 7
  },
  {
    path: "company.financial_profile.agm_date",
    label: "Date of AGM (Annual General Meeting)",
    type: "date",
    aliases: ["agm_date", "dateofagm", "agmdate", "txtagmdate", "date_of_agm"],
    keywords: ["agm date", "date of agm", "annual general meeting date"],
    importance: 8
  },
  {
    path: "company.financial_profile.turnover",
    label: "Turnover / Revenue from Operations",
    type: "number",
    aliases: ["turnover", "revenuefromoperations", "totalrevenue", "grossturnover", "txtturnover"],
    keywords: ["turnover", "revenue from operations", "gross turnover", "total revenue"],
    importance: 8
  },
  {
    path: "company.financial_profile.net_profit",
    label: "Net Profit / Loss After Tax (PAT)",
    type: "number",
    aliases: ["net_profit", "profitaftertax", "pat", "netprofitloss", "txtnetprofit"],
    keywords: ["net profit", "profit after tax", "pat", "net profit or loss"],
    importance: 8
  },
  {
    path: "company.financial_profile.net_worth",
    label: "Net Worth of the Company",
    type: "number",
    aliases: ["net_worth", "networth", "shareholdersfunds", "txtnetworth"],
    keywords: ["net worth", "shareholders funds"],
    importance: 8
  },

  // --- Statutory Auditor Details ---
  {
    path: "company.auditor.name",
    label: "Statutory Auditor / Audit Firm Name",
    type: "string",
    aliases: ["auditor_name", "nameofauditor", "auditorfirmname", "auditfirm", "txtauditorname"],
    keywords: ["auditor name", "audit firm name", "statutory auditor"],
    importance: 7
  },
  {
    path: "company.auditor.firm_registration_number",
    label: "Auditor Firm Registration Number (FRN)",
    type: "string",
    aliases: ["firm_registration_number", "frn", "auditorfrn", "firmregno", "txtfrn"],
    keywords: ["frn", "firm registration number", "auditor frn"],
    importance: 8
  },
  {
    path: "company.auditor.membership_number",
    label: "Auditor Partner Membership Number",
    type: "string",
    aliases: ["auditor_membership_no", "membershipnumber", "auditormembership", "txtmembershipno"],
    keywords: ["membership number", "auditor membership", "partner membership"],
    importance: 7
  },

  // --- Director Array Patterns (Indexed & Relative) ---
  {
    path: "directors[INDEX].din",
    label: "Director Identification Number (DIN / DPIN)",
    type: "string",
    format: "din",
    regex: "^[0-9]{8}$",
    aliases: [
      "din", "directordin", "dindpin", "txtdin", "dpin", "director_din", 
      "dinno", "din_dpin", "directoridentificationnumber"
    ],
    keywords: ["din", "dpin", "director identification number", "director din"],
    is_array: true,
    array_field: "directors",
    importance: 10
  },
  {
    path: "directors[INDEX].name",
    label: "Director Full Name",
    type: "string",
    aliases: [
      "director_name", "directorname", "nameofdirector", "txtdirectorname", 
      "directorfullname", "signatoryname", "authorizedsignatoryname"
    ],
    keywords: ["director name", "name of director", "director full name", "signatory name"],
    is_array: true,
    array_field: "directors",
    importance: 10
  },
  {
    path: "directors[INDEX].father_name",
    label: "Director's Father's Name",
    type: "string",
    aliases: ["father_name", "fathername", "fathersname", "txtfathername", "directorfathername"],
    keywords: ["father's name", "father name", "father of director"],
    is_array: true,
    array_field: "directors",
    importance: 8
  },
  {
    path: "directors[INDEX].dob_formatted",
    label: "Director Date of Birth (DD/MM/YYYY)",
    type: "date",
    aliases: ["dob", "dateofbirth", "directordob", "txtdob", "directordateofbirth"],
    keywords: ["date of birth", "dob", "birth date"],
    is_array: true,
    array_field: "directors",
    importance: 8
  },
  {
    path: "directors[INDEX].gender",
    label: "Director Gender",
    type: "dropdown",
    options: ["Male", "Female", "Transgender"],
    aliases: ["gender", "directorgender", "selectgender"],
    keywords: ["gender", "sex"],
    is_array: true,
    array_field: "directors",
    importance: 7
  },
  {
    path: "directors[INDEX].nationality",
    label: "Director Nationality",
    type: "dropdown",
    aliases: ["nationality", "directornationality", "selectnationality"],
    keywords: ["nationality", "citizenship"],
    is_array: true,
    array_field: "directors",
    importance: 7
  },
  {
    path: "directors[INDEX].designation",
    label: "Director Designation",
    type: "dropdown",
    options: ["Managing Director", "Whole-time Director", "Director", "Independent Director", "Designated Partner", "Nominee Director"],
    aliases: ["designation", "directordesignation", "selectdesignation"],
    keywords: ["designation", "designation of director", "category of designation"],
    is_array: true,
    array_field: "directors",
    importance: 8
  },
  {
    path: "directors[INDEX].category",
    label: "Director Category (Promoter / Independent / Executive)",
    type: "dropdown",
    aliases: ["directorcategory", "categoryofdirector", "exec_nonexec", "director_category"],
    keywords: ["category of director", "promoter executive", "director category"],
    is_array: true,
    array_field: "directors",
    importance: 7
  },
  {
    path: "directors[INDEX].appointment_date_formatted",
    label: "Director Date of Appointment (DD/MM/YYYY)",
    type: "date",
    aliases: ["appointment_date", "appointmentdate", "dateofappointment", "txtdoa", "dtappointment"],
    keywords: ["appointment date", "date of appointment", "doa"],
    is_array: true,
    array_field: "directors",
    importance: 8
  },
  {
    path: "directors[INDEX].pan",
    label: "Director PAN",
    type: "string",
    format: "pan",
    regex: "^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$",
    aliases: ["director_pan", "directorpan", "dinpan", "txtdirectorpan"],
    keywords: ["director pan", "pan of director"],
    is_array: true,
    array_field: "directors",
    importance: 9
  },
  {
    path: "directors[INDEX].email",
    label: "Director Email Address",
    type: "email",
    format: "email",
    aliases: ["director_email", "directoremail", "txtdirectoremail"],
    keywords: ["director email", "email of director"],
    is_array: true,
    array_field: "directors",
    importance: 8
  },
  {
    path: "directors[INDEX].mobile",
    label: "Director Mobile Number",
    type: "phone",
    aliases: ["director_mobile", "directormobile", "directorphone", "txtdirectormobile"],
    keywords: ["director mobile", "mobile number of director"],
    is_array: true,
    array_field: "directors",
    importance: 8
  },
  {
    path: "directors[INDEX].address",
    label: "Director Residential Address",
    type: "string",
    aliases: ["director_address", "residentialaddress", "permanentaddress", "txtdirectoraddress"],
    keywords: ["residential address", "permanent address", "address of director"],
    is_array: true,
    array_field: "directors",
    importance: 8
  },

  // --- Practicing Professional (Certifier) ---
  {
    path: "practicing_professional.name",
    label: "Certifying Professional Name",
    type: "string",
    aliases: ["professional_name", "pcs_name", "pca_name", "txtprofessionalname", "certifiername"],
    keywords: ["professional name", "certifying professional", "pcs name", "pca name"],
    importance: 7
  },
  {
    path: "practicing_professional.membership_number",
    label: "Professional Membership Number",
    type: "string",
    aliases: ["professional_membership_number", "pcs_membership", "txtmembership", "professionalmembership"],
    keywords: ["membership number", "acs number", "fcs number", "aca number"],
    importance: 8
  },
  {
    path: "practicing_professional.certificate_of_practice_number",
    label: "Certificate of Practice (COP) Number",
    type: "string",
    aliases: ["cop_number", "certificateofpractice", "copno", "txtcopnumber", "cop"],
    keywords: ["cop number", "certificate of practice", "cop"],
    importance: 8
  }
];

/**
 * Known MCA Form Signatures for Automatic Form Profile Detection
 */
export const MCA_FORM_PROFILES = [
  {
    id: "mca_spice_plus_b",
    code: "SPICe+",
    name: "SPICe+ Part B (Integrated Company Incorporation)",
    description: "Form for incorporation of company, capital structure, registered office, PAN/TAN, DIN allotment",
    urlPatterns: ["spice", "incorporation", "form-spice"],
    signatureKeywords: ["spice", "application for incorporation", "part b", "capital structure", "subscriber", "moa", "aoa"],
    typicalFieldCount: 45
  },
  {
    id: "mca_dir_12",
    code: "DIR-12",
    name: "Form DIR-12 (Particulars of Appointment of Directors)",
    description: "Appointment, cessation or change in designation of directors and key managerial personnel",
    urlPatterns: ["dir-12", "dir12", "director-appointment"],
    signatureKeywords: ["dir-12", "dir12", "appointment of director", "particulars of appointment", "din", "cessation"],
    typicalFieldCount: 28
  },
  {
    id: "mca_aoc_4",
    code: "AOC-4",
    name: "Form AOC-4 (Filing Financial Statements and Disclosures)",
    description: "Annual filing of financial statements, balance sheet, profit & loss, auditor's report, CSR",
    urlPatterns: ["aoc-4", "aoc4", "financial-statements"],
    signatureKeywords: ["aoc-4", "aoc4", "balance sheet", "profit and loss", "financial year", "turnover", "csr"],
    typicalFieldCount: 52
  },
  {
    id: "mca_mgt_7",
    code: "MGT-7",
    name: "Form MGT-7 (Annual Return of Company)",
    description: "Annual return containing shareholding pattern, indebtedness, meetings, director particulars",
    urlPatterns: ["mgt-7", "mgt7", "annual-return"],
    signatureKeywords: ["mgt-7", "mgt7", "annual return", "shareholding pattern", "board meetings", "agm"],
    typicalFieldCount: 40
  },
  {
    id: "mca_inc_22",
    code: "INC-22",
    name: "Form INC-22 (Notice of Situation or Change of Registered Office)",
    description: "Filing verification and situation of registered office of company",
    urlPatterns: ["inc-22", "inc22", "registered-office"],
    signatureKeywords: ["inc-22", "inc22", "situation of registered office", "change of registered office", "police station"],
    typicalFieldCount: 18
  }
];

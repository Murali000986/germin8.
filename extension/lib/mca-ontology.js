/**
 * Germin8 Extension - MCA Ontology and Field Definitions
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

  // --- Financial Profile ---
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

  // --- Directors Array (Indexed) ---
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
    path: "directors[INDEX].designation",
    label: "Director Designation",
    type: "dropdown",
    aliases: ["designation", "directordesignation", "selectdesignation"],
    keywords: ["designation", "designation of director"],
    is_array: true,
    array_field: "directors",
    importance: 8
  },
  {
    path: "directors[INDEX].appointment_date_formatted",
    label: "Director Date of Appointment (DD/MM/YYYY)",
    type: "date",
    aliases: ["appointment_date", "appointmentdate", "dateofappointment", "txtdoa"],
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
  }
];

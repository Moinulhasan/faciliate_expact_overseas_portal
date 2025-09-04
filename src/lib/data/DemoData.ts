// export json data to be used in the DetailsPage component
const DemoData = [
  {
    id: 1,
    title: "Country We Serve Bangladesh",
    sub_title:
      "Our Job Placement Assistance service ensures you make informed decisions about your career abroad. Our process involves:",
    image: "/images/bd.png",
    list: [
      "<strong>Assessment of Skills and Interests:</strong> We start by understanding your career aspirations and preferences.",
      "<strong>Resume and Cover Letter Crafting:</strong> Tailoring your application materials to stand out in the competitive job market.",
      "<strong>Career Counseling:</strong> Providing insights into global job trends and opportunities.",
      "<strong>Interview Preparation:</strong> Mock sessions and tips to help you excel in interviews.",
      "<strong>Employer Connections:</strong> Leveraging our network to connect you with trusted employers.",
    ],
  },
];

const CountryListData = [
  {
    id: 1,
    name: "Saudi Arabia",
    slug: "saudi-arabia",
    image: "/images/saudi_arabia.png",
    details: [
      "Saudi Arabia is a major hub for skilled workers, and Facilitate Expat plays a vital role in providing top-tier talent for its industries. Our oil & gas recruitment services connect leading companies with certified professionals experienced in offshore drilling, pipeline construction, and petrochemical engineering.",
      "In the construction sector, we provide highly skilled laborers, including civil engineers, project managers, and heavy machinery operators, ensuring smooth operations on large-scale projects. Our healthcare staffing services help hospitals and medical institutions find experienced doctors, nurses, and technicians.",
      "For security services, we recruit personnel with specialized training in corporate and industrial security. Education and training professionals, including teachers and vocational trainers, are also sourced to support Saudi Arabia's growing educational sector.",
    ],
    list: [
      "Oil & Gas Recruitment",
      "Construction Workers",
      "Healthcare Staffing",
      "Security Jobs",
      "Education & Training",
    ],
    services: {
      "Oil & Gas Recruitment": {
        overview:
          "We specialize in providing skilled, semi-skilled, and unskilled manpower for the oil and gas sector in Saudi Arabia. Our recruitment solutions are designed to meet the high standards of the industry while ensuring compliance with Saudi labor laws and safety regulations.",
        expertise: [
          "Upstream Operations: Drilling crew, rig operators, geologists, and technical support staff.",
          "Midstream Operations: Pipeline construction teams, logistics support, and maintenance workers.",
          "Downstream Operations: Refinery technicians, engineers, welders, and safety officers.",
          "Support Roles: Administrative staff, drivers, and general laborers for site support.",
        ],
        keyFeatures: [
          "End-to-end recruitment — sourcing, screening, and trade testing.",
          "Fast and reliable visa processing and mobilization.",
          "Compliance with Saudi labor laws and industry safety standards.",
          "Skilled workforce trained for high-performance and safety compliance.",
          "Dedicated project coordinators to ensure smooth client communication.",
        ],
        whyChooseUs: [
          "Proven track record in bulk and specialized manpower supply.",
          "Wide network of qualified candidates across multiple trades.",
          "Commitment to quality, reliability, and timely deployment.",
          "Flexible contracts — short-term, project-based, or long-term staffing solutions.",
        ],
      },
      "Construction Workers": {
        overview:
          "We specialize in supplying skilled, semi-skilled, and unskilled construction workers for infrastructure, industrial, and commercial projects in Saudi Arabia. Our workforce solutions ensure quality, reliability, and compliance with Saudi labor laws and safety standards.",
        categories: [
          "Skilled Workers: Masons, carpenters, steel fixers, plumbers, electricians, and painters.",
          "Semi-Skilled Workers: Helpers, assistants, and general construction crew.",
          "Equipment Operators: Crane operators, forklift drivers, excavator operators, and heavy-vehicle drivers.",
          "Technical & Supervisory Roles: Site supervisors, foremen, safety officers, and quality inspectors.",
          "Support Staff: Cleaners, logistics workers, and camp support personnel.",
        ],
        keyFeatures: [
          "End-to-end recruitment and documentation support.",
          "Fast visa processing and timely deployment.",
          "Workers trained in safety protocols and site compliance.",
          "Flexible contracts — short-term projects, long-term assignments, or bulk hiring.",
          "Dedicated coordinators to ensure seamless communication with clients.",
        ],
        whyChooseUs: [
          "Extensive database of qualified and experienced candidates.",
          "Proven track record of supplying manpower for mega construction projects in Saudi Arabia.",
          "Strict adherence to quality and safety standards.",
          "Cost-effective and reliable recruitment solutions tailored to client needs.",
        ],
      },
      "Healthcare Staffing": {
        overview:
          "We provide qualified and certified healthcare professionals to meet demand in Saudi Arabia's hospitals, clinics, laboratories, and other medical facilities. Our solutions ensure highly skilled, certified, and reliable personnel to support academic excellence and workforce development initiatives, in compliance with Saudi education and labor regulations.",
        categories: [
          "Doctors & Specialists: General practitioners, surgeons, pediatricians, anesthetists, and other specialists.",
          "Nursing Staff: Registered nurses, critical care nurses, emergency nurses, and midwives.",
          "Allied Health Professionals: Pharmacists, lab technicians, radiologists, physiotherapists, and dieticians.",
          "Support Staff: Caregivers, paramedics, medical assistants, and hospital attendants.",
          "Administrative & Support Roles: Receptionists, medical secretaries, and billing staff.",
        ],
        keyFeatures: [
          "End-to-end recruitment and documentation assistance.",
          "Fast-track licensing and visa processing.",
          "Placement of experienced and MOH/SCFHS-approved candidates.",
          "Flexible solutions — full-time, contract, locum, or project-based staffing.",
          "24/7 support and dedicated account managers for client coordination.",
        ],
        whyChooseUs: [
          "Extensive database of qualified healthcare professionals.",
          "Experience in serving hospitals, clinics, and government health projects.",
          "Commitment to quality, compliance, and patient safety standards.",
          "Cost-effective and reliable staffing solutions tailored to client requirements.",
        ],
      },
      "Security Jobs": {
        overview:
          "We specialize in providing trained and reliable security personnel to meet the growing demand for commercial, industrial, and residential security services in Saudi Arabia. Our workforce is carefully vetted, trained, and compliant with Saudi regulations and safety standards, ensuring professional protection for every client.",
        categories: [
          "Corporate & Commercial Security: Office buildings, banks, and retail outlets.",
          "Industrial & Oilfield Security: Factories, refineries, and construction sites.",
          "Residential & Private Security: Housing complexes, gated communities, and personal security.",
          "Event & Crowd Management Staff: Public events, exhibitions, and VIP gatherings.",
          "Specialized Roles: CCTV operators, access control officers, and armed security (where applicable).",
        ],
        keyFeatures: [
          "Comprehensive background checks and medical screening.",
          "Workforce trained in customer service, conflict resolution, and emergency response.",
          "Fast and efficient visa processing and mobilization.",
          "Availability of short-term, long-term, and project-based contracts.",
          "Dedicated support for workforce management and client coordination.",
        ],
        whyChooseUs: [
          "Extensive network of trained and experienced security professionals.",
          "Proven track record of supplying staff for government, corporate, and industrial projects.",
          "Focus on professionalism, reliability, and cost-effective solutions.",
          "Compliance with Saudi labor and security regulations.",
        ],
      },
      "Education & Training": {
        overview:
          "We provide qualified and experienced education and training professionals to meet demand in Saudi Arabia's schools, universities, vocational institutes, and corporate training centers. Our solutions ensure highly skilled, certified, and reliable personnel to support academic excellence and workforce development initiatives, in compliance with Saudi education and labor regulations.",
        categories: [
          "Academic Educators: Primary, secondary, and higher education teachers.",
          "Subject Specialists: Mathematics, Science, English, IT, and Business.",
          "Vocational & Technical Trainers: Engineering, construction, healthcare, IT, and technical fields.",
          "Corporate & Soft Skills Trainers: Business communication, leadership, and management trainers.",
          "Administrative & Support Staff: Academic coordinators, librarians, lab assistants, and office staff.",
        ],
        keyFeatures: [
          "End-to-end recruitment and documentation assistance.",
          "Fast visa processing and timely deployment.",
          "Staff trained and certified per Saudi Ministry of Education requirements.",
          "Solutions for short-term, long-term, or contract-based placements.",
          "Dedicated project managers for client support and workforce monitoring.",
        ],
        whyChooseUs: [
          "Extensive network of qualified education and training professionals.",
          "Experience in supplying staff for public, private, and international institutions.",
          "Commitment to quality, reliability, and cultural compatibility.",
          "Cost-effective and tailored staffing solutions to meet specific project needs.",
        ],
      },
    },
  },
  {
    id: 2,
    name: "United Arab Emirates",
    slug: "uae",
    image: "/images/uae.png",
    details: [
      "The UAE is known for its thriving hospitality and tourism industry, and we provide highly trained professionals, including chefs, hotel managers, and customer service representatives, to maintain the high standards of service required in the country.",
      "Our IT & software development staffing solutions help businesses hire expert software engineers, cybersecurity specialists, and IT project managers. The booming construction industry in the UAE requires skilled laborers, including carpenters, welders, and civil engineers, who we recruit from Bangladesh to meet the demand.",
      "The banking and finance sector benefits from our talent pool of accountants, auditors, and financial analysts. Additionally, we offer engineering recruitment services, providing mechanical, electrical, and civil engineers to various industries.",
    ],
    list: [
      "Hospitality Recruitment",
      "IT & Software Development Staffing",
      "Construction Labor Supply",
      "Banking & Finance Professionals",
      "Engineering Recruitment",
    ],
    services: {
      "Hospitality Recruitment": {
        overview:
          "We specialize in providing skilled, semi-skilled, and entry-level professionals for the hospitality and tourism industry across the UAE. Our workforce solutions are designed to support hotels, resorts, restaurants, airlines, event management companies, and catering services, ensuring reliable staffing that meets both international standards and UAE labor laws.",
        categories: [
          "Front-of-House Staff: Receptionists, guest relations officers, concierge, and front desk executives.",
          "Food & Beverage (F&B) Staff: Waiters, baristas, bartenders, chefs, commis, kitchen assistants, and catering crew.",
          "Housekeeping & Maintenance: Room attendants, laundry staff, cleaners, and maintenance helpers.",
          "Supervisory & Managerial Roles: Restaurant supervisors, banquet managers, and operations coordinators.",
          "Specialized Roles: Event planners, tour guides, spa therapists, and airline ground staff.",
        ],
        keyFeatures: [
          "End-to-end recruitment, documentation, and visa processing.",
          "Supply of experienced and well-trained candidates familiar with UAE hospitality standards.",
          "Short-term, long-term, and project-based staffing solutions.",
          "Cultural and language compatibility for international guest interaction.",
          "Dedicated coordinators for smooth mobilization and workforce management.",
        ],
        whyChooseUs: [
          "Extensive database of trained hospitality professionals.",
          "Proven experience with luxury hotels, fine dining establishments, and tourism operators in the UAE.",
          "Commitment to quality, reliability, and compliance.",
          "Competitive, cost-effective staffing solutions tailored to client needs.",
        ],
      },
      "IT & Software Development Staffing": {
        overview:
          "We provide skilled IT and software development professionals to support businesses, startups, and enterprises across the UAE. Our staffing solutions are tailored to meet the growing demand for digital transformation, enterprise automation, and innovative tech solutions, ensuring highly qualified and reliable talent for both short-term projects and long-term placements.",
        categories: [
          "Software Development: Full-stack developers, backend & frontend developers, mobile app developers (iOS, Android, cross-platform), UI/UX designers and QA testers.",
          "Enterprise Solutions: ERP/CRM specialists (SAP, Oracle, Salesforce, Microsoft Dynamics), cloud engineers (AWS, Azure, Google Cloud), database administrators and analysts.",
          "Cybersecurity & Network Management: Network administrators, security analysts, SOC specialists, penetration testers and risk compliance officers.",
          "AI, Data & Emerging Tech: AI/ML engineers, data scientists, big data analysts, blockchain developers and IoT specialists.",
          "IT Support & Maintenance: System administrators, IT support staff, and helpdesk specialists.",
        ],
        keyFeatures: [
          "End-to-end recruitment and onboarding, including visa and relocation support.",
          "Access to certified professionals with experience in global technologies.",
          "Flexible contracts — project-based, long-term, or remote staffing.",
          "Workforce trained in UAE compliance, industry standards, and security protocols.",
          "Dedicated account managers for smooth coordination and support.",
        ],
        whyChooseUs: [
          "Large database of qualified IT professionals across multiple domains.",
          "Proven track record with tech firms, government entities, and global enterprises.",
          "Commitment to quality, efficiency, and cost-effective solutions.",
          "Expertise in matching the right talent with the right project to ensure success.",
        ],
      },
      "Construction Labor Supply": {
        overview:
          "We specialize in providing skilled, semi-skilled, and unskilled construction labor to meet the workforce demands of infrastructure, industrial, residential, and commercial projects across the UAE. Our manpower solutions ensure high-quality, reliable, and compliant staffing to support the country's rapid development while adhering to UAE labor laws and safety standards.",
        categories: [
          "Skilled Workers: Masons, carpenters, electricians, plumbers, painters, steel fixers, and tile setters.",
          "Semi-Skilled Workers: Helpers, assistants, and general site workers.",
          "Heavy Equipment Operators: Crane operators, excavator drivers, forklift operators, and heavy-vehicle drivers.",
          "Technical & Supervisory Roles: Site supervisors, foremen, quality controllers, and safety officers.",
          "Support & Maintenance Staff: Cleaners, camp maintenance, and material handlers.",
        ],
        keyFeatures: [
          "End-to-end recruitment and mobilization, including visa processing and documentation.",
          "Workforce trained in UAE construction safety and compliance standards.",
          "Flexible staffing options — short-term, long-term, or project-based assignments.",
          "Rapid mobilization for urgent or large-scale workforce requirements.",
          "Dedicated account managers for seamless client coordination and support.",
        ],
        whyChooseUs: [
          "Extensive database of qualified and experienced construction workers.",
          "Proven track record of supporting mega-projects and leading contractors in the UAE.",
          "Focus on quality, reliability, and cost-effectiveness.",
          "Full compliance with UAE labor laws and occupational health & safety standards.",
        ],
      },
      "Banking & Finance Professionals": {
        overview:
          "We provide qualified and experienced banking and finance professionals to support the growing demands of banks, financial institutions, investment firms, and fintech companies across the UAE. Our staffing solutions ensure highly skilled, reliable, and compliant professionals to meet dynamic industry requirements while adhering to UAE Central Bank regulations and financial standards.",
        categories: [
          "Banking Operations: Tellers, relationship managers, branch operations staff, and customer service officers.",
          "Finance & Accounting: Accountants, auditors, tax specialists, and payroll officers.",
          "Corporate & Investment Banking: Credit analysts, investment advisors, portfolio managers, and risk managers.",
          "Compliance & Risk Management: AML/KYC officers, compliance analysts, and internal control specialists.",
          "Fintech & Digital Banking: Digital banking specialists, payment system analysts, and data analysts.",
        ],
        keyFeatures: [
          "End-to-end recruitment and onboarding support, including visa processing and documentation.",
          "Access to certified professionals (CFA, ACCA, CPA, CMA, FRM, etc.).",
          "Flexible hiring solutions — contract, project-based, or permanent staffing.",
          "Workforce trained in UAE banking compliance and international financial standards.",
          "Dedicated account managers for smooth client coordination and workforce support.",
        ],
        whyChooseUs: [
          "Wide network of highly qualified financial professionals.",
          "Proven track record with leading banks, investment firms, and corporate finance teams in the UAE.",
          "Commitment to quality, reliability, and cost-effective staffing solutions.",
          "Expertise in matching the right talent with specialized roles to meet client requirements.",
        ],
      },
      "Engineering Recruitment": {
        overview:
          "We provide highly skilled and certified engineering professionals to meet the growing demands of construction, infrastructure, oil & gas, manufacturing, and technology projects across the UAE. Our staffing solutions ensure qualified, reliable, and compliant talent, supporting both short-term projects and long-term assignments while adhering to UAE labor laws and industry standards.",
        categories: [
          "Civil & Structural Engineering: Site engineers, structural designers, and project managers.",
          "Mechanical & Electrical Engineering (MEP): HVAC engineers, piping engineers, maintenance engineers, and MEP specialists.",
          "Oil & Gas & Petrochemical Engineering: Process engineers, drilling engineers, safety engineers, and offshore specialists.",
          "IT & Software Engineering: Software developers, systems engineers, and cloud engineers.",
          "Industrial & Manufacturing Engineering: Production engineers, quality control engineers, and automation specialists.",
        ],
        keyFeatures: [
          "End-to-end recruitment and mobilization, including visa and relocation support.",
          "Access to certified engineers (PE, PMP, RICS, or domain-specific certifications).",
          "Flexible staffing options — project-based, contract, or permanent placements.",
          "Workforce trained in UAE safety, quality, and compliance standards.",
          "Dedicated account managers for smooth deployment and support.",
        ],
        whyChooseUs: [
          "Extensive database of qualified engineers across multiple industries.",
          "Proven experience with mega-projects and multinational companies in the UAE.",
          "Commitment to timely delivery, cost-effectiveness, and quality staffing.",
          "Expertise in aligning the right talent with the right project requirements.",
        ],
      },
    },
  },
  {
    id: 3,
    name: "Qatar",
    slug: "qatar",
    image: "/images/qatar.png",
    details: [
      "Qatar's economy is driven by the petrochemical and gas industry, requiring specialized professionals such as process engineers, refinery technicians, and pipeline operators. We facilitate recruitment for these critical roles.",
      "We provide both skilled and unskilled labor recruitment services, supplying professionals ranging from electricians to general laborers. Our finance and administrative staffing services cater to the growing business ecosystem, connecting companies with expert accountants, HR professionals, and office managers.",
      "With an increasing number of infrastructure projects, we support Qatar's construction industry by hiring masons, site supervisors, and heavy vehicle drivers.",
    ],
    list: [
      "Petrochemical & Gas Industry Workers",
      "Skilled & Unskilled Labor Recruitment",
      "Finance & Administrative Staffing",
      "Construction Project Workers",
    ],
    services: {
      "Petrochemical & Gas Industry Workers": {
        overview:
          "We specialize in providing skilled, semi-skilled, and unskilled manpower for the petrochemical and gas industry in Qatar. Our staffing solutions support upstream, midstream, and downstream operations, ensuring clients receive highly trained and certified professionals while maintaining compliance with Qatar labor laws, HSE standards, and industry regulations.",
        categories: [
          "Upstream Operations: Drilling crews, rig operators, geologists, and field technicians.",
          "Midstream Operations: Pipeline construction teams, welders, and transportation coordinators.",
          "Downstream Operations: Refinery technicians, chemical engineers, process operators, and safety officers.",
          "Technical & Support Staff: QA/QC inspectors, maintenance staff, and instrumentation technicians.",
          "Support Roles: Drivers, helpers, camp maintenance, and logistics staff.",
        ],
        keyFeatures: [
          "End-to-end recruitment and mobilization, including visa processing and documentation.",
          "Access to certified professionals with global experience in petrochemical and gas sectors.",
          "Flexible contracts — project-based, shutdown operations, or long-term assignments.",
          "Workforce trained in Qatar Energy and international safety standards.",
          "Dedicated coordinators for real-time support and workforce management.",
        ],
        whyChooseUs: [
          "Extensive database of qualified petrochemical and gas industry workers.",
          "Proven track record in supporting mega-projects and multinational companies in Qatar.",
          "Commitment to quality, reliability, and cost-effective staffing solutions.",
          "Expertise in fast mobilization to meet critical project timelines.",
        ],
      },
      "Skilled & Unskilled Labor Recruitment": {
        overview:
          "We provide reliable, skilled, and unskilled labor to meet the growing workforce demands of construction, oil & gas, manufacturing, logistics, hospitality, and maintenance sectors in Qatar. Our recruitment process ensures qualified, safety-trained, and compliant workers, ready for both short-term projects and long-term assignments, following Qatar's labor laws and industry regulations.",
        categories: [
          "Skilled Workers: Electricians, plumbers, carpenters, masons, steel fixers, painters, and welders.",
          "Semi-Skilled & Unskilled Workers: General helpers, site assistants, and logistics support staff.",
          "Equipment Operators: Crane operators, forklift drivers, excavator operators, and heavy truck drivers.",
          "Technical & Supervisory Roles: Site engineers, supervisors, foremen, and quality inspectors.",
          "Support Staff: Cleaners, camp maintenance staff, and material handlers.",
        ],
        keyFeatures: [
          "End-to-end recruitment and mobilization, including work permits and documentation support.",
          "Pre-screened, trained, and experienced workforce ready for immediate deployment.",
          "Flexible staffing solutions — short-term, long-term, or project-based contracts.",
          "Workers trained in safety, operational compliance, and productivity standards.",
          "Dedicated coordinators for smooth communication and workforce management.",
        ],
        whyChooseUs: [
          "Proven track record in supplying manpower for major projects in Qatar.",
          "Strict adherence to quality, safety, and legal compliance.",
          "Cost-effective, customized staffing solutions to fit client needs.",
          "Dedicated coordinators for smooth communication and support throughout the project.",
        ],
      },
      "Finance & Administrative Staffing": {
        overview:
          "We specialize in providing qualified finance and administrative professionals to meet the workforce needs of corporate offices, government entities, financial institutions, and project-based operations in Qatar. Our staffing solutions ensure skilled, reliable, and compliant personnel to support both day-to-day operations and specialized financial tasks, adhering to Qatar labor regulations and industry standards.",
        categories: [
          "Finance & Accounting Staff: Accountants, auditors, payroll officers, and tax specialists.",
          "Banking & Financial Services Staff: Financial analysts, budget controllers, and treasury assistants.",
          "Administrative & Office Support: Executive assistants, office secretaries, receptionists, and document controllers.",
          "Senior & Specialist Roles: CFOs, finance managers, and senior administrators.",
          "Compliance & Risk Management: Relationship officers, compliance analysts, and investment assistants.",
        ],
        keyFeatures: [
          "End-to-end recruitment and onboarding, including documentation and work permit support.",
          "Access to certified professionals (CPA, CMA, ACCA, CFA, etc.).",
          "Flexible contracts — temporary, project-based, or permanent staffing.",
          "Candidates trained in Qatar labor laws, compliance, and industry best practices.",
          "Dedicated client coordinators to ensure smooth deployment and workforce support.",
        ],
        whyChooseUs: [
          "Extensive database of skilled finance and administrative professionals.",
          "Proven track record serving corporate, governmental, and multinational clients in Qatar.",
          "Cost-effective staffing solutions with a focus on quality and reliability.",
          "Expertise in matching the right talent to the right organizational needs.",
        ],
      },
      "Construction Project Workers": {
        overview:
          "We provide skilled, semi-skilled, and unskilled workers to meet the workforce needs of infrastructure, industrial, commercial, and residential construction projects across Qatar. Our staffing solutions ensure trained, reliable, and safety-compliant personnel, supporting on-time and quality project delivery while adhering to Qatar labor regulations and HSE standards.",
        categories: [
          "Skilled Workers: Masons, carpenters, electricians, plumbers, welders, steel fixers, and painters.",
          "Semi-Skilled Workers: General helpers, site assistants, and material handlers.",
          "Heavy Equipment Operators: Crane operators, excavator drivers, forklift operators, and truck drivers.",
          "Technical & Supervisory Roles: Site supervisors, foremen, engineers, and quality inspectors.",
          "Support & Maintenance Staff: Cleaners, camp maintenance, and logistics personnel.",
        ],
        keyFeatures: [
          "End-to-end recruitment and mobilization, including work permit and documentation support.",
          "Workforce trained in Qatar construction safety and compliance standards.",
          "Flexible staffing options — short-term, long-term, or project-based assignments.",
          "Rapid mobilization for urgent or large-scale workforce requirements.",
          "Dedicated account managers for seamless client coordination and support.",
        ],
        whyChooseUs: [
          "Extensive database of qualified and experienced construction workers.",
          "Proven track record of supporting mega-projects and leading contractors in Qatar.",
          "Focus on quality, reliability, and cost-effectiveness.",
          "Full compliance with Qatar labor laws and occupational health & safety standards.",
        ],
      },
    },
  },
  {
    id: 4,
    name: "Malaysia",
    slug: "malaysia",
    image: "/images/malaysia.png",
    details: [
      "Malaysia's agricultural sector relies on experienced farm workers, plantation managers, and harvest specialists, whom we recruit from Bangladesh.",
      "Our manufacturing industry staffing solutions help businesses hire skilled machine operators, factory workers, and supply chain managers.",
      "Domestic helpers, including caregivers and housekeepers, are placed with families and organizations needing home support.",
      "Additionally, our recruitment of IT and engineering professionals helps Malaysian firms maintain cutting-edge operations in technology and industrial design.",
    ],
    list: [
      "Agricultural Workers",
      "Manufacturing Industry Staffing",
      "Domestic Helpers",
      "Professional IT & Engineering Jobs",
    ],
  },
  {
    id: 5,
    name: "Romania",
    slug: "romania",
    image: "/images/romania.png",
    details: [
      "Romania's growing economy demands general laborers, including factory workers, warehouse staff, and logistics personnel. We provide healthcare professionals, including nurses and medical technicians, to hospitals and clinics.",
      "The construction industry in Romania is supported by our recruitment of skilled masons, steel fixers, and crane operators.",
      "Our IT & technical worker recruitment services help businesses hire software developers, IT specialists, and system administrators.",
    ],
    list: [
      "General Labor Recruitment",
      "Healthcare Professionals",
      "Construction Industry Staffing",
      "IT & Technical Workers",
    ],
  },
  {
    id: 6,
    name: "Bulgaria",
    slug: "bulgaria",
    image: "/images/bulgaria.png",
    details: [
      "Bulgaria's industrial and manufacturing sectors require a steady supply of skilled labor, including machinists, production line workers, and industrial supervisors.",
      "We recruit experienced agricultural workers for farming and food production industries.",
      "The construction and engineering sector benefits from our staffing of project managers, civil engineers, and skilled laborers.",
      "Security services are essential for businesses, and we provide trained security officers, bouncers, and personal protection specialists.",
    ],
    list: [
      "Manufacturing & Industrial Workers",
      "Agricultural Labor",
      "Construction & Engineering Experts",
      "Security & Protection Services",
    ],
  },
  {
    id: 7,
    name: "Poland",
    slug: "poland",
    image: "/images/poland.png",
    details: [
      "Poland's warehousing and logistics industry is expanding, requiring forklift operators, inventory managers, and logistics coordinators. Our recruitment services provide top talent for these roles.",
      "We also specialize in hiring IT and software development professionals, including frontend and backend developers, data analysts, and network administrators.",
      "The hospitality sector benefits from our recruitment of hotel staff, restaurant workers, and event coordinators.",
      "For construction projects, we supply bricklayers, plumbers, and construction supervisors to meet industry demands.",
    ],
    list: [
      "Warehouse & Logistics Staffing",
      "IT & Software Development Recruitment",
      "Hospitality & Hotel Staffing",
      "Construction Labor Supply",
    ],
  },
  {
    id: 9,
    name: "Moldova",
    slug: "moldova",
    image: "/images/moldova.png",
    details: [
      "Moldova's agriculture sector depends on laborers, greenhouse workers, and agricultural technicians. We recruit skilled industrial workers, including machine operators and production supervisors.",
      "Our IT & engineering staffing solutions provide experts in software development, network security, and electrical engineering.",
      "Financial institutions benefit from our recruitment of accountants, payroll specialists, and administrative professionals.",
    ],
    list: [
      "Agriculture & Farming Labor",
      "Skilled Industrial Workers",
      "IT & Engineering Jobs",
      "Financial & Administrative Staffing",
    ],
  },
  {
    id: 10,
    name: "Hungary",
    slug: "hungary",
    image: "/images/hungary.png",
    details: [
      "Hungary's industrial workforce relies on welders, factory workers, and machine operators. We recruit IT specialists, including programmers and cybersecurity experts, to support Hungary's digital economy.",
      "In the construction sector, we place civil engineers, project managers, and skilled laborers.",
      "Our medical recruitment services provide hospitals and clinics with experienced nurses, doctors, and healthcare administrators.",
    ],
    list: [
      "Industrial Workforce Staffing",
      "IT & Tech Industry Recruitment",
      "Construction & Civil Engineering",
      "Medical & Healthcare Professionals",
    ],
  },
  {
    id: 11,
    name: "Kuwait",
    slug: "kuwait",
    image: "/images/kuwait.svg",
    details: [
      "Kuwait's oil and gas sector requires specialized professionals including drilling engineers, refinery technicians, and safety officers. We provide comprehensive recruitment solutions for the energy industry.",
      "The construction industry in Kuwait benefits from our skilled labor supply including masons, electricians, and heavy equipment operators.",
      "Our healthcare staffing services connect hospitals and medical facilities with qualified doctors, nurses, and medical technicians.",
    ],
    list: [
      "Oil & Gas Professionals",
      "Construction Workers",
      "Healthcare Staffing",
      "Engineering Services",
    ],
    services: {
      "Oil & Gas Professionals": {
        overview:
          "We specialize in providing skilled professionals for Kuwait's oil and gas sector, ensuring compliance with local regulations and industry standards.",
        keyFeatures: [
          "End-to-end recruitment and mobilization",
          "Compliance with Kuwait oil industry standards",
          "Skilled workforce for drilling and refinery operations",
          "Fast visa processing and deployment",
        ],
        whyChooseUs: [
          "Extensive experience in Kuwait energy sector",
          "Qualified professionals with industry certifications",
          "Commitment to safety and quality standards",
          "Reliable and timely workforce delivery",
        ],
      },
      "Construction Workers": {
        overview:
          "We provide skilled construction workers for Kuwait's growing infrastructure and development projects.",
        keyFeatures: [
          "Skilled laborers and technicians",
          "Heavy equipment operators",
          "Safety-trained workforce",
          "Project-based staffing solutions",
        ],
        whyChooseUs: [
          "Proven track record in Kuwait construction",
          "Quality and safety compliance",
          "Flexible staffing options",
          "Cost-effective solutions",
        ],
      },
      "Healthcare Staffing": {
        overview:
          "We supply qualified healthcare professionals to Kuwait's hospitals and medical facilities.",
        keyFeatures: [
          "Licensed medical professionals",
          "Fast-track licensing support",
          "24/7 healthcare staffing",
          "Compliance with Kuwait health regulations",
        ],
        whyChooseUs: [
          "Extensive database of healthcare professionals",
          "Experience in Kuwait healthcare sector",
          "Quality and compliance focus",
          "Reliable staffing solutions",
        ],
      },
      "Engineering Services": {
        overview:
          "We provide engineering professionals for various sectors in Kuwait including oil & gas, construction, and manufacturing.",
        keyFeatures: [
          "Certified engineers and technicians",
          "Multi-sector expertise",
          "Project management support",
          "Technical consulting services",
        ],
        whyChooseUs: [
          "Qualified engineering professionals",
          "Multi-industry experience",
          "Technical excellence",
          "Project delivery expertise",
        ],
      },
    },
  },
  {
    id: 12,
    name: "Japan",
    slug: "japan",
    image: "/images/japan.png",
    details: [
      "Japan's technology sector demands highly skilled IT professionals including software developers, system engineers, and AI specialists. We provide top-tier talent for Japan's innovative industries.",
      "Manufacturing and automotive industries require precision workers, quality control specialists, and production engineers.",
      "Our healthcare recruitment services supply hospitals with experienced medical professionals and caregivers.",
    ],
    list: [
      "IT & Technology Professionals",
      "Manufacturing & Automotive",
      "Healthcare & Caregiving",
      "Engineering & Technical",
    ],
    services: {
      "IT & Technology Professionals": {
        overview:
          "We provide highly skilled IT professionals for Japan's technology sector, including software developers, system engineers, and AI specialists.",
        keyFeatures: [
          "Advanced technical skills and certifications",
          "Japanese language proficiency support",
          "Cultural integration assistance",
          "Long-term career development",
        ],
        whyChooseUs: [
          "Extensive network of tech professionals",
          "Experience in Japanese tech industry",
          "Cultural and language support",
          "Quality and innovation focus",
        ],
      },
      "Manufacturing & Automotive": {
        overview:
          "We supply skilled workers for Japan's precision manufacturing and automotive industries.",
        keyFeatures: [
          "Precision manufacturing specialists",
          "Quality control experts",
          "Automotive industry experience",
          "Safety and compliance training",
        ],
        whyChooseUs: [
          "Proven track record in Japanese manufacturing",
          "High-quality workforce",
          "Industry-specific expertise",
          "Reliable and efficient delivery",
        ],
      },
      "Healthcare & Caregiving": {
        overview:
          "We provide healthcare professionals and caregivers for Japan's aging population and healthcare sector.",
        keyFeatures: [
          "Licensed medical professionals",
          "Caregiving specialists",
          "Cultural sensitivity training",
          "Language support services",
        ],
        whyChooseUs: [
          "Extensive healthcare professional network",
          "Experience in Japanese healthcare system",
          "Cultural competency focus",
          "Quality patient care commitment",
        ],
      },
      "Engineering & Technical": {
        overview:
          "We supply engineering and technical professionals for various industries in Japan.",
        keyFeatures: [
          "Certified engineers and technicians",
          "Multi-industry expertise",
          "Technical consulting services",
          "Project management support",
        ],
        whyChooseUs: [
          "Qualified technical professionals",
          "Multi-sector experience",
          "Technical excellence",
          "Innovation and quality focus",
        ],
      },
    },
  },
  {
    id: 13,
    name: "Singapore",
    slug: "singapore",
    image: "/images/singapore.png",
    details: [
      "Singapore's financial sector requires banking professionals, financial analysts, and compliance officers. We provide qualified talent for the city-state's thriving financial industry.",
      "The technology sector benefits from our IT professionals including software developers, cybersecurity experts, and data scientists.",
      "Our hospitality and service industry recruitment supplies hotels, restaurants, and retail with skilled professionals.",
    ],
    list: [
      "Banking & Finance",
      "IT & Technology",
      "Hospitality & Services",
      "Healthcare Professionals",
    ],
  },
  {
    id: 14,
    name: "South Korea",
    slug: "south-korea",
    image: "/images/south_korea.svg",
    details: [
      "South Korea's technology and manufacturing sectors require skilled engineers, IT professionals, and production specialists. We provide comprehensive staffing solutions.",
      "The automotive and electronics industries benefit from our technical workforce including engineers, technicians, and quality control specialists.",
      "Our healthcare recruitment services supply hospitals and medical facilities with qualified medical professionals.",
    ],
    list: [
      "Technology & IT",
      "Manufacturing & Engineering",
      "Healthcare Services",
      "Automotive & Electronics",
    ],
  },
  {
    id: 15,
    name: "Italy",
    slug: "italy",
    image: "/images/italy.png",
    details: [
      "Italy's manufacturing and fashion industries require skilled workers including textile workers, fashion designers, and production specialists.",
      "The construction sector benefits from our skilled laborers including masons, carpenters, and civil engineers.",
      "Our hospitality recruitment services supply hotels, restaurants, and tourism with qualified professionals.",
    ],
    list: [
      "Manufacturing & Fashion",
      "Construction Workers",
      "Hospitality & Tourism",
      "Healthcare Professionals",
    ],
  },
  {
    id: 16,
    name: "Czech Republic",
    slug: "czech-republic",
    image: "/images/czech_republic.png",
    details: [
      "Czech Republic's automotive and manufacturing sectors require skilled workers including machine operators, engineers, and quality control specialists.",
      "The IT sector benefits from our software developers, system administrators, and cybersecurity professionals.",
      "Our healthcare recruitment services supply hospitals and medical facilities with qualified medical professionals.",
    ],
    list: [
      "Automotive & Manufacturing",
      "IT & Technology",
      "Healthcare Services",
      "Engineering & Technical",
    ],
  },
  {
    id: 17,
    name: "Slovakia",
    slug: "slovakia",
    image: "/images/slovakia.svg",
    details: [
      "Slovakia's automotive industry requires skilled workers including assembly line workers, quality control specialists, and maintenance technicians.",
      "The manufacturing sector benefits from our production workers, machine operators, and technical specialists.",
      "Our healthcare recruitment services supply hospitals and medical facilities with qualified medical professionals.",
    ],
    list: [
      "Automotive Industry",
      "Manufacturing Workers",
      "Healthcare Services",
      "Technical Specialists",
    ],
  },
  {
    id: 18,
    name: "Serbia",
    slug: "serbia",
    image: "/images/serbia.png",
    details: [
      "Serbia's manufacturing and construction sectors require skilled workers including factory workers, construction laborers, and technical specialists.",
      "The IT sector benefits from our software developers, system administrators, and IT support professionals.",
      "Our healthcare recruitment services supply hospitals and medical facilities with qualified medical professionals.",
    ],
    list: [
      "Manufacturing Workers",
      "Construction Labor",
      "IT & Technology",
      "Healthcare Services",
    ],
  },
  {
    id: 19,
    name: "North Macedonia",
    slug: "north-macedonia",
    image: "/images/north_macedonia.png",
    details: [
      "North Macedonia's manufacturing and textile industries require skilled workers including textile workers, machine operators, and quality control specialists.",
      "The construction sector benefits from our skilled laborers including masons, carpenters, and construction workers.",
      "Our healthcare recruitment services supply hospitals and medical facilities with qualified medical professionals.",
    ],
    list: [
      "Manufacturing & Textile",
      "Construction Workers",
      "Healthcare Services",
      "Technical Specialists",
    ],
  },
  {
    id: 20,
    name: "Belarus",
    slug: "belarus",
    image: "/images/belarus.png",
    details: [
      "Belarus's manufacturing and industrial sectors require skilled workers including factory workers, machine operators, and technical specialists.",
      "The IT sector benefits from our software developers, system administrators, and IT professionals.",
      "Our healthcare recruitment services supply hospitals and medical facilities with qualified medical professionals.",
    ],
    list: [
      "Manufacturing Workers",
      "IT & Technology",
      "Healthcare Services",
      "Industrial Specialists",
    ],
  },
  {
    id: 21,
    name: "Albania",
    slug: "albania",
    image: "/images/albania.png",
    details: [
      "Albania's construction and manufacturing sectors require skilled workers including construction laborers, factory workers, and technical specialists.",
      "The hospitality sector benefits from our hotel staff, restaurant workers, and service professionals.",
      "Our healthcare recruitment services supply hospitals and medical facilities with qualified medical professionals.",
    ],
    list: [
      "Construction Workers",
      "Manufacturing Labor",
      "Hospitality Services",
      "Healthcare Professionals",
    ],
  },
];
export { CountryListData, DemoData };

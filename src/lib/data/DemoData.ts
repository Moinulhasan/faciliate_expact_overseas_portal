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
  // 1. Saudi Arabia
  {
    id: 1,
    name: "Saudi Arabia",
    slug: "saudi-arabia",
    image: "/images/saudi_arabia.png",
    details: [
            "Saudi Arabia is a major hub for skilled workers, and Facilitate Expat Overseas Limited plays a vital role in providing top-tier talent for its industries. Our oil & gas recruitment services connect leading companies with certified professionals experienced in offshore drilling, pipeline construction, and petrochemical engineering.",
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
  // 2. United Arab Emirates
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
  // 3. Qatar
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
  // 4. Kuwait
  {
    id: 4,
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
  // 5. Japan
  {
    id: 5,
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
  },
  // 6. Singapore
  {
    id: 6,
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
    services: {
      "Banking & Finance": {
        overview:
          "We provide highly qualified banking and finance professionals aligned with MAS guidelines, ensuring compliance and performance for banks, corporates, and investment firms in Singapore.",
        categories: [
          "Banking Operations & Services: Customer service officers, relationship managers, branch staff",
          "Financial Analysis & Advisory: Financial analysts, investment advisors, portfolio managers",
          "Accounting & Compliance: Accountants, auditors, regulatory compliance officers",
          "Risk & Treasury Management: Risk analysts, credit officers, treasury specialists",
          "Specialized Roles: FinTech professionals, wealth managers, AML officers",
        ],
        keyFeatures: [
          "Tailored recruitment matching technical skills and industry expertise",
          "Pre-screened candidates for qualifications and regulatory compliance",
          "Flexible staffing — temporary, project-based, or permanent",
          "Compliance with Singapore labor and financial regulations",
        ],
        whyChooseUs: [
          "Extensive database of finance professionals",
          "Experience with banks, investment firms, and corporate finance teams",
          "Cost-effective, scalable manpower solutions",
          "Commitment to professionalism, confidentiality, and results",
        ],
      },
      "IT & Technology": {
        overview:
          "Skilled IT professionals for innovation, digital transformation, and operational resilience across Singapore, compliant with local standards.",
        categories: [
          "Software Engineering: Frontend, backend, full-stack developers",
          "Data & Cloud: Data scientists, cloud engineers, DevOps specialists",
          "IT Infrastructure & Support: Sysadmins, support engineers, network specialists",
          "Cybersecurity: Security analysts, pentesters, compliance officers",
          "Project & Product: Project managers, business analysts, scrum masters",
          "Specialized: AI/ML engineers, blockchain developers, automation experts",
        ],
        keyFeatures: [
          "Rigorous technical screening and certification verification",
          "Flexible models — contract, project-based, permanent",
          "Dedicated account managers for smooth delivery",
          "Compliance with Singapore labor and industry standards",
        ],
        whyChooseUs: [
          "Wide network across multiple tech domains",
          "Proven support for startups, SMEs, and MNCs",
          "Scalable, cost-effective delivery",
          "Focus on innovation and reliability",
        ],
      },
      "Hospitality & Services": {
        overview:
          "Customer-focused hospitality professionals for hotels, restaurants, events, and service businesses across Singapore.",
        categories: [
          "Front Office & Guest Services: Receptionists, concierge, guest relations",
          "Food & Beverage: Waiters, bartenders, baristas, banquet staff",
          "Culinary & Kitchen: Chefs, sous chefs, kitchen assistants, dishwashers",
          "Housekeeping & Facilities: Room attendants, janitors, maintenance",
          "Events & Entertainment: Event coordinators, banquet servers, setup crews",
          "Specialized: Spa therapists, fitness trainers, VIP service staff",
        ],
        keyFeatures: [
          "Training in service excellence, hygiene, and safety",
          "Seasonal, temporary, and permanent staffing",
          "On-site coordination for shift and quality management",
          "Compliance with Singapore hospitality regulations",
        ],
        whyChooseUs: [
          "Deep talent pool of trained hospitality staff",
          "Experience with hotels, restaurants, and venues",
          "Scalable, cost-effective solutions",
          "Strong commitment to guest experience",
        ],
      },
      "Healthcare Professionals": {
        overview:
          "Licensed healthcare professionals for hospitals, clinics, and long-term care facilities in Singapore, aligned with MOH standards.",
        categories: [
          "Doctors & Specialists: GPs, surgeons, anesthetists, consultants",
          "Nursing & Patient Care: Registered and enrolled nurses, nursing aides",
          "Allied Health: Physiotherapists, occupational therapists, radiographers",
          "Clinical & Lab Support: Medical technologists, lab assistants, phlebotomists",
          "Healthcare Support: Caregivers, healthcare assistants, patient service associates",
          "Specialized: Pharmacists, dental assistants, EMTs",
        ],
        keyFeatures: [
          "Credential verification and licensing compliance",
          "Flexible models — temporary, locum, contract, permanent",
          "Training in patient care, safety, and infection control",
          "Dedicated managers for smooth deployment",
        ],
        whyChooseUs: [
          "Extensive pool of licensed healthcare staff",
          "Experience across hospitals and private facilities",
          "Quality and compliance driven",
          "Patient safety and care focus",
        ],
      },
    },
  },
  // 7. South Korea
  {
    id: 7,
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
    services: {
      "Technology & IT": {
        overview:
          "Skilled technology professionals supporting innovation and digital transformation across South Korea.",
        categories: [
          "Software Engineering: Frontend, backend, full-stack",
          "Data & Cloud: Data analysts, cloud engineers, DevOps",
          "Infrastructure & Support: Sysadmins, IT support, network engineers",
          "Cybersecurity: Analysts, pentesters, compliance",
          "Project & Product: PMs, product owners, scrum masters",
          "Specialized: AI/ML, blockchain, AR/VR, automation",
        ],
        keyFeatures: [
          "Tailored recruitment and technical screening",
          "Flexible models — project, contract, permanent",
          "Bilingual support (English/Korean) where required",
          "Compliance with Korean labor regulations",
        ],
        whyChooseUs: [
          "Extensive tech talent network",
          "Experience with startups to MNCs",
          "Scalable, cost-effective delivery",
          "Focus on innovation and reliability",
        ],
      },
      "Manufacturing & Engineering": {
        overview:
          "Skilled, semi-skilled, and professional workers for Korea's manufacturing and engineering sectors.",
        categories: [
          "Production & Assembly: Operators, assemblers",
          "Skilled Trades: Welders, electricians, CNC operators",
          "Engineering & Design: Mechanical, electrical, civil",
          "Quality & Inspection: QA/QC inspectors, testers",
          "Maintenance & Support: Mechanics, plant techs",
          "Specialized: Automation, robotics, R&D support",
        ],
        keyFeatures: [
          "End-to-end recruitment and deployment",
          "Safety and lean manufacturing practices",
          "Temporary to permanent staffing models",
          "On-site coordination for productivity",
        ],
        whyChooseUs: [
          "Proven manufacturing staffing expertise",
          "Compliance and safety focus",
          "Rapid, scalable mobilization",
          "Reliable, high-quality workforce",
        ],
      },
      "Healthcare Services": {
        overview:
          "Licensed healthcare professionals supporting Korean hospitals and care facilities.",
        categories: [
          "Doctors & Specialists",
          "Nursing & Patient Care",
          "Allied Health",
          "Clinical & Laboratory Support",
          "Healthcare Support Staff",
          "Specialized: Pharmacists, dental assistants, EMTs",
        ],
        keyFeatures: [
          "Credential verification and licensing support",
          "Flexible models — locum, contract, permanent",
          "Training in patient care and infection control",
          "Dedicated deployment support",
        ],
        whyChooseUs: [
          "Large pool of licensed professionals",
          "Experience across care settings",
          "Quality and compliance driven",
          "Patient safety and care focus",
        ],
      },
      "Automotive & Electronics": {
        overview:
          "Skilled teams for automotive and electronics production, QA, and maintenance.",
        categories: [
          "Production & Assembly",
          "Skilled Trades & Technical",
          "Quality Control & Inspection",
          "Maintenance & Support",
          "Engineering & Design",
          "Specialized: Automation, PCB, R&D support",
        ],
        keyFeatures: [
          "Full-cycle recruitment and deployment",
          "Training in safety and lean practices",
          "Flexible staffing models",
          "On-site coordination and monitoring",
        ],
        whyChooseUs: [
          "Proven industry track record",
          "Scalable manpower solutions",
          "Quality and safety emphasis",
          "Reliable workforce delivery",
        ],
      },
    },
  },
  // 8. Malaysia
  {
    id: 8,
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
    services: {
      "Agricultural Workers": {
        overview:
          "Skilled, semi-skilled, and unskilled agricultural workforce for plantations, farms, aquaculture, and agribusinesses across Malaysia.",
        categories: [
          "Plantation & Farm: Harvesters, pruners, seeders, irrigation assistants",
          "Specialized: Greenhouse workers, pest control assistants, crop technicians",
          "Livestock & Poultry: Animal handlers, feeders, dairy assistants",
          "Aquaculture & Fisheries: Fish farm workers, hatchery assistants, processing staff",
          "Support & Maintenance: Equipment operators, drivers, general labor",
        ],
        keyFeatures: [
          "Recruitment, mobilization, documentation",
          "Training in techniques, safety, productivity",
          "Seasonal, contract, or permanent",
          "Rapid mobilization and coordination",
        ],
        whyChooseUs: [
          "Experienced agricultural staffing",
          "Support for plantations and farms",
          "Compliance and reliability",
          "Scalable, cost-effective solutions",
        ],
      },
      "Manufacturing Industry Staffing": {
        overview:
          "Skilled, semi-skilled, and unskilled manufacturing workforce for electronics, automotive, textiles, food processing, and heavy industries.",
        categories: [
          "Production & Assembly: Operators, assemblers, QC, packers",
          "Skilled Technicians: Maintenance, electricians, welders, fitters",
          "Supervisory & Technical: Team leaders, shift supervisors, planners, process engineers",
          "Support: Forklift, warehouse, logistics, helpers",
          "Quality & Safety: QA/QC inspectors, safety officers",
        ],
        keyFeatures: [
          "Recruitment, mobilization, documentation",
          "Training in safety, quality, compliance",
          "Flexible staffing — short/long-term, project-based",
          "On-site coordination and workforce management",
        ],
        whyChooseUs: [
          "Proven manufacturing staffing in Malaysia",
          "Quality, reliability, cost-effectiveness",
          "Rapid mobilization for urgent needs",
          "Compliance with Malaysian labor and H&S",
        ],
      },
      "Domestic Helpers": {
        overview:
          "Trained domestic helpers for households and private employers across Malaysia.",
        categories: [
          "Housekeeping & Cleaning",
          "Childcare Assistants",
          "Elderly & Special Care",
          "Cooking & Kitchen Staff",
          "Combined Domestic Services",
        ],
        keyFeatures: [
          "Recruitment, documentation, and placement",
          "Training in home management, safety, etiquette",
          "Live-in, live-out, short-term, long-term",
          "Verified and pre-screened personnel",
        ],
        whyChooseUs: [
          "Trusted domestic staffing",
          "Quality and reliability",
          "Tailored to household needs",
          "Ongoing support and coordination",
        ],
      },
      "Professional IT & Engineering Jobs": {
        overview:
          "Skilled IT and engineering professionals for corporate, technology, manufacturing, and infrastructure sectors in Malaysia.",
        categories: [
          "IT: Developers, network, cybersecurity, cloud, data, support",
          "Engineering: Civil, mechanical, electrical, structural",
          "Project Roles: PMs, site supervisors, design engineers",
          "Industrial: Process, quality, safety, maintenance",
        ],
        keyFeatures: [
          "Recruitment, mobilization, documentation",
          "Certified, experienced professionals",
          "Project, contract, permanent",
          "Training in standards and compliance",
        ],
        whyChooseUs: [
          "Large IT and engineering network",
          "Support across corporate and industrial sectors",
          "Quality, reliability, and value",
          "Right talent for the right role",
        ],
      },
    },
  },
  // 9. Italy
  {
    id: 9,
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
    services: {
      "Manufacturing & Fashion": {
        overview:
          "Skilled and professional workforce for Italy's manufacturing and fashion sectors, supporting production, design, quality, and logistics.",
        categories: [
          "Production & Assembly: Garment workers, pattern makers, machine operators",
          "Skilled Trades: Tailors, seamstresses, textile technicians, cutters",
          "Quality & Inspection: Inspectors, finishing, packaging",
          "Design & Development: Fashion designers, CAD designers, product developers",
          "Maintenance & Support: Machinery operators, maintenance, logistics",
          "Specialized: Textile engineers, embroidery specialists, sample makers",
        ],
        keyFeatures: [
          "Recruitment, screening, and deployment",
          "Training in production techniques and safety",
          "Temporary, seasonal, project, or permanent",
          "Compliance with Italian labor and industry standards",
        ],
        whyChooseUs: [
          "Deep pool of manufacturing/fashion professionals",
          "Experience across textile and luxury segments",
          "Scalable, cost-effective solutions",
          "Quality, reliability, and workforce excellence",
        ],
      },
      "Construction Workers": {
        overview:
          "Skilled, semi-skilled, and general construction labor for projects across Italy.",
        categories: [
          "Skilled: Masons, carpenters, electricians, plumbers, steel fixers",
          "Equipment: Crane, excavator, forklift, heavy machinery",
          "General Labor: Helpers, loaders, site maintenance",
          "Supervisory & Technical: Supervisors, safety, QA",
          "Specialized: Welders, painters, HVAC, scaffolding",
        ],
        keyFeatures: [
          "Safety compliance and site protocol training",
          "Short-term, long-term, project-based",
          "On-site coordination for productivity",
          "Compliance with Italian construction standards",
        ],
        whyChooseUs: [
          "Vetted, experienced construction workforce",
          "Support for residential, commercial, infrastructure",
          "Cost-effective, scalable delivery",
          "Reliability and safety focus",
        ],
      },
      "Hospitality & Tourism": {
        overview:
          "Customer-focused hospitality personnel for hotels, resorts, restaurants, and travel/tourism operations across Italy.",
        categories: [
          "Front Office & Guest Services",
          "Food & Beverage Services",
          "Housekeeping & Facility Management",
          "Tourism & Travel Support",
          "Events & Conference Support",
          "Specialized: Spa, fitness, VIP service",
        ],
        keyFeatures: [
          "Training in service, hygiene, safety, and etiquette",
          "Seasonal, temporary, or permanent placements",
          "On-site coordination and quality management",
          "Compliance with Italian hospitality regulations",
        ],
        whyChooseUs: [
          "Experienced hospitality professionals",
          "Strong presence across venues and regions",
          "Scalable and cost-efficient staffing",
          "Professionalism and guest experience focus",
        ],
      },
      "Healthcare Professionals": {
        overview:
          "Licensed and experienced healthcare staff for hospitals, clinics, and care facilities across Italy.",
        categories: [
          "Doctors & Specialists",
          "Nursing & Patient Care",
          "Allied Health",
          "Clinical & Laboratory Support",
          "Support Staff",
          "Specialized: Pharmacists, dental assistants, EMTs",
        ],
        keyFeatures: [
          "Credential verification and licensing",
          "Flexible models — locum, contract, permanent",
          "Training in patient care and infection control",
          "Dedicated deployment management",
        ],
        whyChooseUs: [
          "Large pool of licensed professionals",
          "Experience across public and private care",
          "Quality and compliance orientation",
          "Focus on patient safety and excellence",
        ],
      },
    },
  },
  // 10. Poland
  {
    id: 10,
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
    services: {
      "Warehouse & Logistics Staffing": {
        overview:
          "Skilled warehouse and logistics personnel supporting warehousing, distribution, and supply chain operations in Poland.",
        categories: [
          "Warehouse Operations: Pickers, packers, inventory clerks",
          "Material Handling: Forklift, reach truck, pallet jack operators",
          "Logistics & Distribution: Loaders, unloaders, dispatch coordinators",
          "Supervisory & Admin: Team leaders, shift supervisors, admins",
          "Specialized: Quality controllers, stock auditors, customs assistants",
        ],
        keyFeatures: [
          "Safety training and equipment handling",
          "Seasonal, short-term, and long-term contracts",
          "On-site coordination for productivity",
          "Compliance with Polish labor and H&S standards",
        ],
        whyChooseUs: [
          "Vetted, experienced logistics talent",
          "Experience across e-commerce, retail, manufacturing",
          "Scalable, cost-effective solutions",
          "Reliability and operational excellence",
        ],
      },
      "IT & Software Development Recruitment": {
        overview:
          "Highly skilled IT professionals for startups to enterprises in Poland.",
        categories: [
          "Software Engineering: Frontend, backend, full-stack",
          "Data & Cloud: Data analysts, cloud engineers, DevOps",
          "Infrastructure & Support: Sysadmins, support, network",
          "Project & Product: PMs, product owners, scrum masters",
          "Specialized: AI/ML, cybersecurity, QA testers",
        ],
        keyFeatures: [
          "Tailored recruitment and technical screening",
          "Flexible contracts — project or permanent",
          "Dedicated managers for coordination",
          "Compliance with Polish and EU standards",
        ],
        whyChooseUs: [
          "Large pool of qualified tech talent",
          "Expertise in niche and in-demand roles",
          "Fast, scalable delivery",
          "Quality, speed, and cost-efficiency",
        ],
      },
      "Hospitality & Hotel Staffing": {
        overview:
          "Professional hospitality teams for hotels, resorts, restaurants, and events in Poland.",
        categories: [
          "Front Office & Guest Services",
          "Food & Beverage Operations",
          "Culinary & Kitchen Support",
          "Housekeeping & Maintenance",
          "Event & Conference Support",
          "Specialized: Spa, fitness, VIP service",
        ],
        keyFeatures: [
          "Customer service, hygiene, and safety training",
          "Seasonal to permanent staffing models",
          "On-site coordination and shift management",
          "Compliance with local hospitality regulations",
        ],
        whyChooseUs: [
          "Experienced hospitality professionals",
          "Proven service across venues",
          "Scalable, cost-effective staffing",
          "Reliability and professionalism",
        ],
      },
      "Construction Labor Supply": {
        overview:
          "Skilled and general labor for construction projects across Poland.",
        categories: [
          "Skilled Workers: Masons, carpenters, steel fixers, electricians",
          "Equipment Operators: Crane, excavator, forklift",
          "General Labor: Helpers, loaders, site support",
          "Supervisory & Technical: Supervisors, safety, QA",
          "Specialized: Welders, plumbers, painters, drywall",
        ],
        keyFeatures: [
          "Safety protocols and site compliance",
          "Short-term, long-term, project-based",
          "On-site workforce coordination",
          "Compliance with Polish construction standards",
        ],
        whyChooseUs: [
          "Large, vetted construction talent pool",
          "Support for infrastructure to residential",
          "Cost-effective and scalable",
          "Emphasis on reliability and safety",
        ],
      },
    },
  },
  // 11. Czech Republic
  {
    id: 11,
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
    services: {
      "Automotive & Manufacturing": {
        overview:
          "Skilled and semi-skilled workforce for Czech automotive and manufacturing sectors, supporting production, QC, and maintenance.",
        categories: [
          "Production & Assembly: Operators, machine operators, general production",
          "Skilled Trades: Welders, electricians, mechanics, CNC operators",
          "Quality & Inspection: Inspectors, testers, calibration",
          "Maintenance & Support: Mechanics, plant technicians, robotics",
          "Engineering & Design: Mechanical, electrical, industrial",
          "Specialized: Automation, R&D support, process optimization",
        ],
        keyFeatures: [
          "Full-cycle recruitment and deployment",
          "Safety and lean manufacturing training",
          "Flexible models — temporary, project, permanent",
          "Compliance with Czech labor and H&S standards",
        ],
        whyChooseUs: [
          "Proven sector expertise",
          "Scalable manpower solutions",
          "Quality and safety driven",
          "Reliable workforce delivery",
        ],
      },
      "IT & Technology": {
        overview:
          "Qualified IT professionals for software engineering, infrastructure, cybersecurity, data, and emerging tech in the Czech Republic.",
        categories: [
          "Software Engineering",
          "Data & Cloud",
          "Infrastructure & Support",
          "Cybersecurity",
          "Project & Product",
          "Specialized: AI/ML, blockchain, automation",
        ],
        keyFeatures: [
          "Tailored recruitment and technical vetting",
          "Flexible contracts and placements",
          "Dedicated coordination and support",
          "Compliance with labor and IT standards",
        ],
        whyChooseUs: [
          "Extensive IT talent network",
          "Support for startups, SMEs, MNCs",
          "Scalable, cost-effective delivery",
          "Focus on innovation and reliability",
        ],
      },
      "Healthcare Services": {
        overview:
          "Licensed, experienced healthcare professionals supporting hospitals and care facilities across the Czech Republic.",
        categories: [
          "Doctors & Medical Specialists",
          "Nursing & Patient Care",
          "Allied Health",
          "Clinical & Laboratory Support",
          "Healthcare Support Staff",
          "Specialized: Pharmacists, dental assistants, EMTs",
        ],
        keyFeatures: [
          "Credential verification and licensing",
          "Temporary, locum, contract, permanent",
          "Training in patient care and infection control",
          "Deployment and workforce management",
        ],
        whyChooseUs: [
          "Large pool of licensed professionals",
          "Experience in public and private healthcare",
          "Quality and compliance orientation",
          "Patient safety and care excellence",
        ],
      },
      "Engineering & Technical": {
        overview:
          "Skilled engineering and technical staff supporting manufacturing, construction, infrastructure, and industrial projects in the Czech Republic.",
        categories: [
          "Mechanical & Electrical Engineering",
          "Civil & Structural Engineering",
          "Industrial & Manufacturing Engineering",
          "Technical Support & Drafting: CAD, drafters, documentation",
          "Quality & Safety Engineering",
          "Specialized: Automation, robotics, R&D",
        ],
        keyFeatures: [
          "Recruitment, screening, and placement",
          "Safety and technical standards training",
          "Flexible models — project, contract, permanent",
          "On-site coordination and performance monitoring",
        ],
        whyChooseUs: [
          "Certified, experienced professionals",
          "Proven support across sectors",
          "Cost-effective, scalable solutions",
          "Reliability and technical excellence",
        ],
      },
    },
  },
  // 12. Hungary
  {
    id: 12,
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
    services: {
      "Industrial Workforce Staffing": {
        overview:
          "Skilled, semi-skilled, and professional industrial workers supporting manufacturing, production, and industrial operations in Hungary.",
        categories: [
          "Production & Assembly: Operators, line workers",
          "Skilled Trades: Welders, electricians, fitters, CNC operators",
          "Maintenance & Equipment: Industrial mechanics, machinery operators, plant maintenance",
          "Quality & Inspection: QA inspectors, testing technicians, process auditors",
          "Engineering & Technical Support: Industrial and process engineers, R&D support",
        ],
        keyFeatures: [
          "Recruitment, screening, and workforce deployment",
          "Safety and industrial best practices training",
          "Flexible models — temp, contract, permanent",
          "On-site coordination and productivity monitoring",
        ],
        whyChooseUs: [
          "Extensive industrial talent pool",
          "Support across Hungary's industrial sectors",
          "Scalable, cost-effective staffing",
          "Quality, safety, and reliability",
        ],
      },
      "IT & Tech Industry Recruitment": {
        overview:
          "Qualified IT and technology professionals for software, infrastructure, cybersecurity, data, and emerging tech across Hungary.",
        categories: [
          "Software Engineering",
          "Data & Cloud",
          "Infrastructure & Support",
          "Cybersecurity",
          "Project & Product",
          "Specialized: AI/ML, blockchain, automation",
        ],
        keyFeatures: [
          "Tailored recruitment and technical vetting",
          "Flexible hiring models",
          "Dedicated account coordination",
          "Compliance with Hungarian labor and IT standards",
        ],
        whyChooseUs: [
          "Large network of IT professionals",
          "Proven delivery for startups to MNCs",
          "Scalable and cost-effective",
          "Innovation and reliability focus",
        ],
      },
      "Construction & Civil Engineering": {
        overview:
          "Skilled construction and civil engineering workforce supporting residential, commercial, and infrastructure projects in Hungary.",
        categories: [
          "Skilled Construction Workers",
          "Equipment & Machinery Operators",
          "General Labor & Site Support",
          "Civil Engineering Specialists",
          "Quality & Safety Staff",
          "Specialized: Welders, HVAC, painters, scaffolding",
        ],
        keyFeatures: [
          "Recruitment, screening, and deployment",
          "Training in site operations and safety",
          "Flexible staffing models",
          "Compliance with Hungarian standards",
        ],
        whyChooseUs: [
          "Qualified construction and engineering talent",
          "Support across diverse projects",
          "Cost-effective and scalable",
          "Reliability and safety-first",
        ],
      },
      "Medical & Healthcare Professionals": {
        overview:
          "Licensed and experienced healthcare professionals supporting hospitals, clinics, and long-term care facilities across Hungary.",
        categories: [
          "Doctors & Medical Specialists",
          "Nursing & Patient Care",
          "Allied Health",
          "Clinical & Laboratory Support",
          "Healthcare Support Staff",
          "Specialized: Pharmacists, dental assistants, EMTs",
        ],
        keyFeatures: [
          "Credential verification and licensing",
          "Flexible staffing — locum, contract, permanent",
          "Training in patient care and infection control",
          "Dedicated deployment and workforce management",
        ],
        whyChooseUs: [
          "Extensive healthcare professional network",
          "Experience across care settings",
          "Quality and compliance orientation",
          "Patient safety and care excellence",
        ],
      },
    },
  },
  // 13. Slovakia
  {
    id: 13,
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
    services: {
      "Automotive Industry": {
        overview:
          "Skilled, semi-skilled, and professional personnel for Slovakia's automotive sector across production, QC, maintenance, and engineering.",
        categories: [
          "Production & Assembly: Assembly line workers, operators",
          "Skilled Trades: Welders, electricians, mechanics, CNC operators",
          "Quality & Inspection: QA inspectors, testing technicians, calibration",
          "Maintenance & Support: Maintenance staff, industrial mechanics, robotics techs",
          "Engineering & Design: Mechanical, electrical, automotive engineers",
          "Specialized: Automation engineers, process optimization, R&D support",
        ],
        keyFeatures: [
          "End-to-end recruitment and deployment",
          "Safety and lean manufacturing training",
          "Flexible staffing models",
          "Compliance with Slovak labor and H&S standards",
        ],
        whyChooseUs: [
          "Large pool of automotive professionals",
          "Proven expertise in Slovakia's auto sector",
          "Scalable, cost-effective solutions",
          "Quality, safety, and reliability",
        ],
      },
      "Manufacturing Workers": {
        overview:
          "Skilled, semi-skilled, and general manufacturing workforce for production and operations across Slovakia.",
        categories: [
          "Production & Assembly",
          "Skilled Trades & Technical",
          "Quality Control & Inspection",
          "Maintenance & Support",
          "Engineering & Technical Support",
          "Specialized: Automation, robotics, safety",
        ],
        keyFeatures: [
          "Recruitment, screening, deployment",
          "Training in safety and best practices",
          "Temporary, project, or permanent",
          "On-site coordination and monitoring",
        ],
        whyChooseUs: [
          "Vetted, experienced manufacturing staff",
          "Compliance and safety focus",
          "Rapid mobilization",
          "Operational reliability",
        ],
      },
      "Healthcare Services": {
        overview:
          "Licensed and experienced healthcare personnel supporting hospitals and care facilities in Slovakia.",
        categories: [
          "Doctors & Medical Specialists",
          "Nursing & Patient Care",
          "Allied Health",
          "Clinical & Laboratory Support",
          "Healthcare Support Staff",
          "Specialized: Pharmacists, dental assistants, EMTs",
        ],
        keyFeatures: [
          "Credential verification and licensing",
          "Flexible staffing models",
          "Training in patient care and infection control",
          "Dedicated deployment support",
        ],
        whyChooseUs: [
          "Extensive healthcare talent pool",
          "Experience across care settings",
          "Quality and compliance",
          "Patient safety focus",
        ],
      },
      "Technical Specialists": {
        overview:
          "Highly skilled technical specialists supporting industrial, manufacturing, construction, and engineering projects in Slovakia.",
        categories: [
          "Engineering & Design: Mechanical, electrical, civil, industrial",
          "Industrial & Manufacturing: CNC operators, maintenance technicians, process engineers",
          "Quality & Safety: QA engineers, safety officers, inspection",
          "IT & Technical Support: System engineers, automation, support",
          "Project & Supervisory: Project engineers, supervisors, coordinators",
          "Specialized: Robotics, R&D, industrial automation",
        ],
        keyFeatures: [
          "Recruitment, screening, placement",
          "Training and standards compliance",
          "Project, contract, or permanent",
          "Performance monitoring and coordination",
        ],
        whyChooseUs: [
          "Certified technical specialists",
          "Cross-industry support",
          "Cost-effective and scalable",
          "Reliability and technical excellence",
        ],
      },
    },
  },
  // 14. Croatia (added)
  {
    id: 14,
    name: "Croatia",
    slug: "croatia",
    image: "/images/croatia.png",
    details: [
      "Croatia's tourism and hospitality sector requires skilled staff including hotel workers, restaurant personnel, and tour service professionals.",
      "The construction industry benefits from skilled laborers such as masons, electricians, and equipment operators.",
      "Manufacturing and logistics sectors require machine operators, warehouse staff, and quality control personnel.",
    ],
    list: [
      "Hospitality & Tourism",
      "Construction Workers",
      "Manufacturing & Logistics",
      "Healthcare Professionals",
    ],
  },
  // 15. Bulgaria
  {
    id: 15,
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
    services: {
      "Manufacturing & Industrial Workers": {
        overview:
          "We provide skilled, semi-skilled, and unskilled workers to meet manufacturing and industrial workforce demands across Bulgaria.",
        categories: [
          "Skilled: Machine operators, electricians, welders, technicians, assemblers",
          "Semi-Skilled & Helpers: Production assistants, general laborers, material handlers",
          "Heavy Equipment: Forklift, crane, machinery operators",
          "Supervisory & Technical: Team leaders, quality inspectors, process engineers",
          "Support Staff: Warehouse staff, logistics assistants, maintenance workers, cleaners",
        ],
        keyFeatures: [
          "Work permits and documentation support",
          "Safety, quality, and compliance training",
          "Flexible staffing models",
          "Rapid deployment for urgent needs",
        ],
        whyChooseUs: [
          "Qualified manufacturing workforce",
          "Experience supporting factories and production lines",
          "Cost-effective, reliable staffing",
          "Compliance with Bulgarian laws and H&S",
        ],
      },
      "Agricultural Labor": {
        overview:
          "Agricultural workers for farms, plantations, orchards, vineyards, and agro-industrial operations in Bulgaria.",
        categories: [
          "Field & Farm: Planters, harvesters, seeders, irrigation assistants",
          "Specialized: Greenhouse workers, horticulturists, crop technicians, pest control",
          "Livestock & Poultry: Handlers, feeders, dairy assistants",
          "Support & Maintenance: Equipment operators, drivers, warehouse assistants",
          "Aquaculture & Fisheries: Hatchery and processing staff (as required)",
        ],
        keyFeatures: [
          "End-to-end recruitment and mobilization",
          "Training in agricultural techniques and safety",
          "Seasonal, contract, or permanent placements",
          "Rapid mobilization for large-scale needs",
        ],
        whyChooseUs: [
          "Experienced agricultural labor pool",
          "Support for farms and agro-industrial operations",
          "Regulatory compliance and reliability",
          "Tailored solutions by project needs",
        ],
      },
      "Construction & Engineering Experts": {
        overview:
          "Skilled construction and engineering professionals for infrastructure, residential, commercial, and industrial projects in Bulgaria.",
        categories: [
          "Civil & Structural Engineers: Site, design, structural, PMs",
          "Mechanical & Electrical Engineers: MEP, maintenance, HVAC, electrical",
          "Construction Specialists: Foremen, QS, coordinators, supervisors",
          "Technical & Skilled Workers: Welders, masons, carpenters, electricians, plumbers, operators",
          "Support & Safety: Quality inspectors, safety officers, logistics",
        ],
        keyFeatures: [
          "Recruitment, documentation, and work permit assistance",
          "Access to certified and experienced professionals",
          "Flexible staffing options",
          "Training in standards, safety, and compliance",
        ],
        whyChooseUs: [
          "Database of qualified construction and engineering experts",
          "Experience with mega projects and leading contractors",
          "Quality, reliability, and cost-effective delivery",
          "Project-aligned talent matching",
        ],
      },
      "Security & Protection Services": {
        overview:
          "Trained and professional security personnel for corporate, industrial, residential, event, and government security in Bulgaria.",
        categories: [
          "Corporate & Commercial: Security officers, reception guards, access control",
          "Industrial & Facility: Supervisors, safety officers, asset protection",
          "Residential & Private: Community guards, bodyguards, personal protection",
          "Event & Crowd Management: Event officers, crowd control, VIP protection",
          "Specialized: CCTV operators, alarm response, emergency teams",
        ],
        keyFeatures: [
          "Background checks and documentation support",
          "Training in safety, emergency response, client protocols",
          "Short-term, long-term, or project-based",
          "Compliance with security regulations and labor laws",
        ],
        whyChooseUs: [
          "Vetted and trained personnel",
          "Experience across corporate, industrial, and events",
          "Professional and reliable services",
          "Cost-effective, tailored solutions",
        ],
      },
    },
  },
  // 16. Romania
  {
    id: 16,
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
    services: {
      "General Labor Recruitment": {
        overview:
          "Reliable skilled, semi-skilled, and unskilled labor for construction, manufacturing, logistics, agriculture, and industrial sectors in Romania.",
        categories: [
          "Skilled: Electricians, plumbers, carpenters, welders, masons, machine operators",
          "Semi-Skilled: Site assistants, helpers, general production",
          "Unskilled: Cleaners, warehouse assistants, general labor",
          "Support: Drivers, logistics, facility maintenance",
          "Supervisory: Team leaders, foremen, quality inspectors, safety officers",
        ],
        keyFeatures: [
          "End-to-end recruitment and mobilization",
          "Pre-screened and experienced workforce",
          "Flexible staffing — short/long-term or project-based",
          "Training in safety and operational compliance",
        ],
        whyChooseUs: [
          "Extensive database across multiple industries",
          "Experience with large-scale projects",
          "Quality and cost-effective solutions",
          "Rapid mobilization for urgent needs",
        ],
      },
      "Healthcare Professionals": {
        overview:
          "Qualified, certified healthcare professionals for hospitals, clinics, and care facilities in Romania.",
        categories: [
          "Doctors & Specialists",
          "Nursing & Patient Care",
          "Allied Health",
          "Support Staff",
          "Administrative & Management",
        ],
        keyFeatures: [
          "Onboarding including documentation and work permits",
          "Licensed and certified personnel",
          "Flexible placements — full-time, contract, locum",
          "Training in Romanian healthcare standards",
        ],
        whyChooseUs: [
          "Strong healthcare professional network",
          "Experience with public and private institutions",
          "Quality and compliance focus",
          "Tailored, cost-effective solutions",
        ],
      },
      "Construction Industry Staffing": {
        overview:
          "Skilled, semi-skilled, and unskilled workers for infrastructure, commercial, and residential projects in Romania.",
        categories: [
          "Skilled: Carpenters, masons, electricians, plumbers, welders, steel fixers, painters",
          "Semi-Skilled: General laborers, site assistants, material handlers",
          "Heavy Equipment: Crane, excavator, forklift, truck drivers",
          "Technical & Supervisory: Supervisors, engineers, quality inspectors",
          "Support & Maintenance: Cleaners, camp maintenance, logistics",
        ],
        keyFeatures: [
          "End-to-end recruitment and work permits",
          "Safety, quality, and compliance training",
          "Flexible staffing options",
          "Rapid deployment for urgent needs",
        ],
        whyChooseUs: [
          "Qualified and experienced construction workforce",
          "Support for mega-projects and contractors",
          "Cost-effective and reliable",
          "Compliance with Romanian laws and H&S",
        ],
      },
      "IT & Technical Workers": {
        overview:
          "Qualified IT and technical professionals supporting corporate, industrial, and infrastructure clients in Romania.",
        categories: [
          "IT: Developers, mobile, network, cybersecurity, cloud, data",
          "Technical & Engineering: Civil, mechanical, electrical, industrial",
          "Supervisory: Project supervisors, site engineers, QA",
          "Technicians: Electronics, machinery, process operations",
        ],
        keyFeatures: [
          "Work permit and documentation support",
          "Certified and experienced professionals",
          "Contract, project-based, or permanent models",
          "Training in standards, safety, and compliance",
        ],
        whyChooseUs: [
          "Large pool of skilled IT/technical workers",
          "Experience serving corporate and industrial clients",
          "Quality, reliability, and cost-effectiveness",
          "Effective skill-matching to project needs",
        ],
      },
    },
  },
  // 17. Moldova
  {
    id: 17,
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
    services: {
      "Agriculture & Farming Labor": {
        overview:
          "Skilled, semi-skilled, and general agricultural labor supporting farms, agribusinesses, and greenhouse operations across Moldova.",
        categories: [
          "Crop Cultivation & Harvesting: Planters, pickers, seasonal workers",
          "Greenhouse & Horticulture: Greenhouse assistants, floriculture, nursery",
          "Livestock & Dairy: Animal caretakers, milkers, feed handlers",
          "Equipment & Machinery: Tractor drivers, irrigation operators, maintenance",
          "Specialized: Agronomists, farm supervisors, quality inspectors",
        ],
        keyFeatures: [
          "Recruitment, vetting, placement",
          "Training in safety, crop handling, modern techniques",
          "Seasonal, short-term, long-term",
          "On-site coordination and productivity",
        ],
        whyChooseUs: [
          "Experienced agricultural staffing",
          "Support for farms and cooperatives",
          "Scalable, cost-effective solutions",
          "Regulatory compliance focus",
        ],
      },
      "Skilled Industrial Workers": {
        overview:
          "Qualified industrial workers supporting manufacturing, production, and maintenance operations across Moldova.",
        categories: [
          "Production & Assembly: Machine operators, line workers, assemblers",
          "Maintenance & Technical: Mechanics, electricians, maintenance techs",
          "Quality & Inspection: QA inspectors, testers, packaging controllers",
          "Warehouse & Logistics: Forklift, loaders, material handlers",
          "Specialized: CNC operators, welders, industrial painters",
        ],
        keyFeatures: [
          "Recruitment, assessment, and placement",
          "Safety procedures and equipment handling training",
          "Temporary, project, or permanent",
          "On-site coordination and performance monitoring",
        ],
        whyChooseUs: [
          "Vetted industrial workforce",
          "Support for small to large-scale operations",
          "Cost-effective and scalable",
          "Quality and productivity driven",
        ],
      },
      "IT & Engineering Jobs": {
        overview:
          "Skilled IT and engineering professionals for businesses and industry projects in Moldova.",
        categories: [
          "IT: Software developers, sysadmins, support",
          "Data & Cloud: Data analysts, cloud engineers, DevOps",
          "Engineering & Design: Mechanical, electrical, civil",
          "Project & Operations: PMs, process engineers, supervisors",
          "Specialized: AI/ML, cybersecurity, CAD, QA",
        ],
        keyFeatures: [
          "Tailored recruitment and skill-matching",
          "Technical assessments and background checks",
          "Contract, project-based, permanent",
          "Dedicated coordinators and compliance",
        ],
        whyChooseUs: [
          "Network of qualified IT/engineering talent",
          "Support for businesses and industrial projects",
          "Scalable, cost-effective staffing",
          "Focus on quality, innovation, and reliability",
        ],
      },
      "Financial & Administrative Staffing": {
        overview:
          "Skilled financial and administrative professionals supporting corporate, government, and institutional operations in Moldova.",
        categories: [
          "Finance & Accounting: Accountants, bookkeepers, payroll, auditors",
          "Banking & Financial Services: Analysts, loan officers, customer service",
          "Administrative & Office: Office assistants, receptionists, executive secretaries",
          "Management & Coordination: Office managers, coordinators, operations support",
          "Specialized: Tax consultants, compliance, procurement",
        ],
        keyFeatures: [
          "Recruitment, screening, and placement",
          "Verified qualifications and language skills",
          "Temporary, contract, permanent",
          "Scaling support for seasonal/project workloads",
        ],
        whyChooseUs: [
          "Qualified finance and admin professionals",
          "Corporate, governmental, and non-profit support",
          "Cost-effective and scalable",
          "Professionalism, accuracy, operational excellence",
        ],
      },
    },
  },
  // 18. Serbia
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
    services: {
      "Manufacturing Workers": {
        overview:
          "Skilled, semi-skilled, and general manufacturing workforce to support production and operations in Serbia.",
        categories: [
          "Production & Assembly: Operators, line workers",
          "Skilled Trades: Welders, electricians, fitters, CNC",
          "Quality & Inspection: QA inspectors, testers, packaging",
          "Maintenance & Support: Mechanics, plant technicians",
          "Engineering & Technical: Process and industrial engineers",
          "Specialized: Automation, robotics, safety",
        ],
        keyFeatures: [
          "End-to-end recruitment and deployment",
          "Training in safety and best practices",
          "Flexible models — temp, project, permanent",
          "On-site coordination and monitoring",
        ],
        whyChooseUs: [
          "Experienced manufacturing staffing",
          "Compliance with Serbian regulations",
          "Scalable and cost-effective",
          "Reliable workforce supply",
        ],
      },
      "Construction Labor": {
        overview:
          "Skilled, semi-skilled, and general construction labor for residential, commercial, and infrastructure projects in Serbia.",
        categories: [
          "Skilled Workers: Masons, carpenters, electricians, plumbers, steel fixers",
          "Equipment Operators: Crane, excavator, forklift, heavy machinery",
          "General Labor: Helpers, loaders, site maintenance",
          "Supervisory & Technical: Supervisors, safety, QA",
          "Specialized: Welders, painters, HVAC, scaffolding",
        ],
        keyFeatures: [
          "Safety and site protocol training",
          "Short-term, long-term, project-based",
          "On-site workforce coordination",
          "Compliance with Serbian construction standards",
        ],
        whyChooseUs: [
          "Large pool of vetted construction workers",
          "Support for diverse construction projects",
          "Cost-effective and scalable",
          "Reliability and safety focus",
        ],
      },
      "IT & Technology": {
        overview:
          "Qualified IT professionals for software, infrastructure, cybersecurity, data, and emerging tech roles across Serbia.",
        categories: [
          "Software Engineering",
          "Data & Cloud",
          "Infrastructure & Support",
          "Cybersecurity",
          "Project & Product",
          "Specialized: AI/ML, blockchain, automation",
        ],
        keyFeatures: [
          "Tailored recruitment and technical vetting",
          "Flexible contracts and placements",
          "Dedicated coordination and support",
          "Compliance with Serbian labor and IT standards",
        ],
        whyChooseUs: [
          "Extensive IT talent network",
          "Proven support for startups to MNCs",
          "Scalable, cost-effective delivery",
          "Focus on innovation and reliability",
        ],
      },
      "Healthcare Services": {
        overview:
          "Licensed and experienced healthcare professionals supporting hospitals and care facilities across Serbia.",
        categories: [
          "Doctors & Medical Specialists",
          "Nursing & Patient Care",
          "Allied Health",
          "Clinical & Laboratory Support",
          "Healthcare Support Staff",
          "Specialized: Pharmacists, dental assistants, EMTs",
        ],
        keyFeatures: [
          "Credential verification and licensing",
          "Flexible staffing models",
          "Training in patient care and infection control",
          "Dedicated deployment support",
        ],
        whyChooseUs: [
          "Large pool of licensed professionals",
          "Experience across care settings",
          "Quality and compliance orientation",
          "Patient safety and care excellence",
        ],
      },
    },
  },
  // 19. North Macedonia
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
    services: {
      "Manufacturing & Textile": {
        overview:
          "Skilled, semi-skilled, and professional workforce for manufacturing and textile operations across North Macedonia.",
        categories: [
          "Production & Assembly: Operators, line workers",
          "Textile & Garment: Seamstresses, tailors, cutters, pattern makers",
          "Quality & Finishing: Inspectors, finishing, packaging",
          "Maintenance & Technical: Equipment maintenance, technicians",
          "Engineering & Design Support: Textile engineers, CAD designers",
          "Specialized: Embroidery, sample makers, supervisors",
        ],
        keyFeatures: [
          "End-to-end recruitment and placement",
          "Training in production, quality, and safety",
          "Seasonal, project-based, or permanent",
          "Compliance with local labor standards",
        ],
        whyChooseUs: [
          "Experienced textile and manufacturing staffing",
          "Support across factories and workshops",
          "Scalable and cost-effective",
          "Quality, safety, and reliability",
        ],
      },
      "Construction Workers": {
        overview:
          "Skilled, semi-skilled, and general construction workers for residential, commercial, and infrastructure projects in North Macedonia.",
        categories: [
          "Skilled Workers: Masons, carpenters, electricians, plumbers, steel fixers",
          "Equipment Operators: Crane, excavator, forklift, heavy machinery",
          "General Labor: Helpers, loaders, site maintenance",
          "Supervisory & Technical: Supervisors, safety, QA",
          "Specialized: Welders, painters, HVAC, scaffolding",
        ],
        keyFeatures: [
          "Recruitment, screening, and deployment",
          "Safety protocols and site compliance",
          "Short-term, long-term, or project-based",
          "On-site coordination and productivity management",
        ],
        whyChooseUs: [
          "Large pool of vetted construction workers",
          "Support across diverse project types",
          "Cost-effective and scalable",
          "Reliability and safety focus",
        ],
      },
      "Healthcare Services": {
        overview:
          "Licensed and experienced healthcare professionals supporting hospitals and care facilities across North Macedonia.",
        categories: [
          "Doctors & Medical Specialists",
          "Nursing & Patient Care",
          "Allied Health",
          "Clinical & Laboratory Support",
          "Healthcare Support Staff",
          "Specialized: Pharmacists, dental assistants, EMTs",
        ],
        keyFeatures: [
          "Credential verification and licensing",
          "Flexible staffing models",
          "Training in patient care and infection control",
          "Deployment and workforce management",
        ],
        whyChooseUs: [
          "Extensive pool of licensed professionals",
          "Experience across care settings",
          "Quality and compliance orientation",
          "Patient safety and care excellence",
        ],
      },
      "Technical Specialists": {
        overview:
          "Highly skilled technical specialists supporting industrial, manufacturing, construction, and engineering projects in North Macedonia.",
        categories: [
          "Engineering & Design: Mechanical, electrical, civil, industrial",
          "Industrial & Manufacturing: CNC operators, maintenance technicians, process engineers",
          "Quality & Safety: QA engineers, safety officers, inspection",
          "IT & Technical Support: System engineers, automation, technical support",
          "Project & Supervisory: Project engineers, supervisors, site coordinators",
          "Specialized: Robotics, R&D, industrial automation",
        ],
        keyFeatures: [
          "Recruitment, screening, and placement",
          "Training and standards compliance",
          "Project, contract, or permanent",
          "Performance monitoring and coordination",
        ],
        whyChooseUs: [
          "Certified technical specialists",
          "Cross-industry project support",
          "Scalable and cost-effective",
          "Reliability and technical excellence",
        ],
      },
    },
  },
  // 20. Belarus
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
    services: {
      "Manufacturing Workers": {
        overview:
          "Skilled, semi-skilled, and general manufacturing workforce supporting production and operations across Belarus.",
        categories: [
          "Production & Assembly: Operators, line workers",
          "Skilled Trades: Welders, electricians, mechanics, CNC",
          "Quality & Inspection: QA inspectors, testers, packaging",
          "Maintenance & Support: Industrial mechanics, plant techs",
          "Engineering & Technical: Process and industrial engineers",
        ],
        keyFeatures: [
          "Full-cycle recruitment and deployment",
          "Safety and production best practices",
          "Flexible staffing models",
          "Compliance with Belarusian regulations",
        ],
        whyChooseUs: [
          "Experienced manufacturing staffing",
          "Support for diverse industries",
          "Scalable and cost-effective",
          "Reliable workforce supply",
        ],
      },
      "IT & Technology": {
        overview:
          "Qualified IT professionals for software, infrastructure, cybersecurity, data, and emerging tech in Belarus.",
        categories: [
          "Software Engineering",
          "Data & Cloud",
          "Infrastructure & Support",
          "Cybersecurity",
          "Project & Product",
          "Specialized: AI/ML, blockchain, automation",
        ],
        keyFeatures: [
          "Tailored recruitment and technical vetting",
          "Flexible contracts and placements",
          "Dedicated coordination and support",
          "Compliance with labor and IT standards",
        ],
        whyChooseUs: [
          "Extensive IT talent network",
          "Support for startups, SMEs, MNCs",
          "Scalable, cost-effective delivery",
          "Innovation and reliability focus",
        ],
      },
      "Healthcare Services": {
        overview:
          "Licensed and experienced healthcare professionals for hospitals and care facilities across Belarus.",
        categories: [
          "Doctors & Medical Specialists",
          "Nursing & Patient Care",
          "Allied Health",
          "Clinical & Laboratory Support",
          "Healthcare Support Staff",
          "Specialized: Pharmacists, dental assistants, EMTs",
        ],
        keyFeatures: [
          "Credential verification and licensing",
          "Flexible staffing models",
          "Training in patient care and infection control",
          "Dedicated deployment support",
        ],
        whyChooseUs: [
          "Licensed healthcare talent pool",
          "Experience across care settings",
          "Quality and compliance orientation",
          "Patient safety and care focus",
        ],
      },
      "Industrial Specialists": {
        overview:
          "Highly skilled industrial specialists for manufacturing, production, and industrial operations in Belarus.",
        categories: [
          "Engineering & Technical: Mechanical, electrical, civil, industrial",
          "Production & Process: CNC operators, machine technicians, process engineers",
          "Maintenance & Equipment: Industrial mechanics, machinery operators, plant maintenance",
          "Quality & Safety: QA engineers, safety officers, inspection",
          "Project & Supervisory: Project engineers, supervisors, site coordinators",
          "Specialized: Automation engineers, robotics techs, R&D support",
        ],
        keyFeatures: [
          "Recruitment, screening, and placement",
          "Training in safety and best practices",
          "Flexible models — project, contract, permanent",
          "On-site workforce coordination",
        ],
        whyChooseUs: [
          "Certified industrial specialists",
          "Cross-sector support",
          "Cost-effective and scalable",
          "Reliability and technical excellence",
        ],
      },
    },
  },
  // 21. Albania
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
    services: {
      "Construction Workers": {
        overview:
          "Skilled, semi-skilled, and general construction workers for residential, commercial, and infrastructure projects across Albania.",
        categories: [
          "Skilled: Masons, carpenters, electricians, plumbers, steel fixers",
          "Equipment & Machinery: Crane, excavator, forklift, heavy machinery",
          "General Labor: Helpers, loaders, site maintenance",
          "Supervisory & Technical: Supervisors, safety, QA",
          "Specialized: Welders, painters, HVAC, scaffolding",
        ],
        keyFeatures: [
          "Recruitment, screening, deployment",
          "Safety and site protocol training",
          "Short-term, long-term, or project-based",
          "Compliance with Albanian construction standards",
        ],
        whyChooseUs: [
          "Experienced construction workforce",
          "Support for diverse project types",
          "Scalable and cost-effective",
          "Reliability and safety focus",
        ],
      },
      "Manufacturing Labor": {
        overview:
          "Skilled, semi-skilled, and general manufacturing workforce supporting production and operations across Albania.",
        categories: [
          "Production & Assembly",
          "Skilled Trades & Technical",
          "Quality Control & Inspection",
          "Maintenance & Support",
          "Engineering & Technical Support",
          "Specialized: Automation, robotics, safety",
        ],
        keyFeatures: [
          "Recruitment, screening, and deployment",
          "Training in safety and best practices",
          "Flexible staffing models",
          "On-site coordination and monitoring",
        ],
        whyChooseUs: [
          "Qualified and experienced manufacturing staff",
          "Compliance with labor regulations",
          "Rapid mobilization",
          "Operational reliability",
        ],
      },
      "Hospitality Services": {
        overview:
          "Professional hospitality teams supporting hotels, resorts, restaurants, and tourism facilities across Albania.",
        categories: [
          "Hotel & Accommodation: Front desk, housekeeping, concierge, reception",
          "Food & Beverage: Chefs, cooks, waiters, bartenders, kitchen assistants",
          "Events & Banquets: Coordinators, banquet staff, catering",
          "Management & Supervisory: Hotel and restaurant managers, floor supervisors",
          "Tourism & Guest Services: Tour guides, guest relations, travel coordinators",
          "Specialized: Spa therapists, wellness instructors, entertainment",
        ],
        keyFeatures: [
          "Recruitment, training, and placement",
          "Seasonal, project-based, or permanent",
          "On-site coordination for quality service",
          "Compliance with hospitality standards",
        ],
        whyChooseUs: [
          "Experienced hospitality staffing",
          "Support for venues and tourism businesses",
          "Scalable and cost-effective",
          "Commitment to guest experience",
        ],
      },
      "Healthcare Professionals": {
        overview:
          "Licensed, trained healthcare professionals for hospitals, clinics, and care facilities across Albania.",
        categories: [
          "Doctors & Medical Specialists",
          "Nursing & Patient Care",
          "Allied Health",
          "Clinical & Laboratory Support",
          "Healthcare Support Staff",
          "Specialized: Pharmacists, dental assistants, EMTs",
        ],
        keyFeatures: [
          "Credential verification and licensing",
          "Flexible models — locum, contract, permanent",
          "Training in patient care and infection control",
          "Deployment and workforce management",
        ],
        whyChooseUs: [
          "Licensed healthcare talent pool",
          "Experience across care facilities",
          "Quality and compliance orientation",
          "Patient safety and care excellence",
        ],
      },
    },
  },
];
export { CountryListData, DemoData };

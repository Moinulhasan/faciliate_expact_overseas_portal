// export json data to be used in the DetailsPage component
const DemoData = [
    {
        id: 1,
        title: "Country We Serve Bangladesh",
        sub_title: "Our Job Placement Assistance service ensures you make informed decisions about your career abroad. Our process involves:",
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
        "id": 1,
        "name": "Saudi Arabia",
        "slug": "saudi-arabia",
        "image": "/images/saudi_arabia.png",
        "details": [
            "Saudi Arabia is a major hub for skilled workers, and Facilitate Expat Overseas Limited plays a vital role in providing top-tier talent for its industries. Our oil & gas recruitment services connect leading companies with certified professionals experienced in offshore drilling, pipeline construction, and petrochemical engineering.",
            "In the construction sector, we provide highly skilled laborers, including civil engineers, project managers, and heavy machinery operators, ensuring smooth operations on large-scale projects. Our healthcare staffing services help hospitals and medical institutions find experienced doctors, nurses, and technicians.",
            "For security services, we recruit personnel with specialized training in corporate and industrial security. Education and training professionals, including teachers and vocational trainers, are also sourced to support Saudi Arabia's growing educational sector."
        ],
        "list": [
            "Oil & Gas Recruitment",
            "Construction Workers",
            "Healthcare Staffing",
            "Security Jobs",
            "Education & Training"
        ]
    },
    {
        "id": 2,
        "name": "United Arab Emirates",
        "slug": "uae",
        "image": "/images/uae.png",
        "details": [
            "The UAE is known for its thriving hospitality and tourism industry, and we provide highly trained professionals, including chefs, hotel managers, and customer service representatives, to maintain the high standards of service required in the country.",
            "Our IT & software development staffing solutions help businesses hire expert software engineers, cybersecurity specialists, and IT project managers. The booming construction industry in the UAE requires skilled laborers, including carpenters, welders, and civil engineers, who we recruit from Bangladesh to meet the demand.",
            "The banking and finance sector benefits from our talent pool of accountants, auditors, and financial analysts. Additionally, we offer engineering recruitment services, providing mechanical, electrical, and civil engineers to various industries."
        ],
        "list": [
            "Hospitality Recruitment",
            "IT & Software Development Staffing",
            "Construction Labor Supply",
            "Banking & Finance Professionals",
            "Engineering Recruitment"
        ]
    },
    {
        "id": 3,
        "name": "Qatar",
        "slug": "qatar",
        "image": "/images/qatar.png",
        "details": [
            "Qatar's economy is driven by the petrochemical and gas industry, requiring specialized professionals such as process engineers, refinery technicians, and pipeline operators. We facilitate recruitment for these critical roles.",
            "We provide both skilled and unskilled labor recruitment services, supplying professionals ranging from electricians to general laborers. Our finance and administrative staffing services cater to the growing business ecosystem, connecting companies with expert accountants, HR professionals, and office managers.",
            "With an increasing number of infrastructure projects, we support Qatar's construction industry by hiring masons, site supervisors, and heavy vehicle drivers."
        ],
        "list": [
            "Petrochemical & Gas Industry Workers",
            "Skilled & Unskilled Labor Recruitment",
            "Finance & Administrative Staffing",
            "Construction Project Workers"
        ]
    },
    {
        "id": 4,
        "name": "Malaysia",
        "slug": "malaysia",
        "image": "/images/malaysia.png",
        "details": [
            "Malaysia's agricultural sector relies on experienced farm workers, plantation managers, and harvest specialists, whom we recruit from Bangladesh.",
            "Our manufacturing industry staffing solutions help businesses hire skilled machine operators, factory workers, and supply chain managers.",
            "Domestic helpers, including caregivers and housekeepers, are placed with families and organizations needing home support.",
            "Additionally, our recruitment of IT and engineering professionals helps Malaysian firms maintain cutting-edge operations in technology and industrial design."
        ],
        "list": [
            "Agricultural Workers",
            "Manufacturing Industry Staffing",
            "Domestic Helpers",
            "Professional IT & Engineering Jobs"
        ]
    },
    {
        "id": 5,
        "name": "Romania",
        "slug": "romania",
        "image": "/images/romania.png",
        "details": [
            "Romania's growing economy demands general laborers, including factory workers, warehouse staff, and logistics personnel. We provide healthcare professionals, including nurses and medical technicians, to hospitals and clinics.",
            "The construction industry in Romania is supported by our recruitment of skilled masons, steel fixers, and crane operators.",
            "Our IT & technical worker recruitment services help businesses hire software developers, IT specialists, and system administrators."
        ],
        "list": [
            "General Labor Recruitment",
            "Healthcare Professionals",
            "Construction Industry Staffing",
            "IT & Technical Workers"
        ]
    },
    {
        "id": 6,
        "name": "Bulgaria",
        "slug": "bulgaria",
        "image": "/images/bulgaria.png",
        "details": [
            "Bulgaria's industrial and manufacturing sectors require a steady supply of skilled labor, including machinists, production line workers, and industrial supervisors.",
            "We recruit experienced agricultural workers for farming and food production industries.",
            "The construction and engineering sector benefits from our staffing of project managers, civil engineers, and skilled laborers.",
            "Security services are essential for businesses, and we provide trained security officers, bouncers, and personal protection specialists."
        ],
        "list": [
            "Manufacturing & Industrial Workers",
            "Agricultural Labor",
            "Construction & Engineering Experts",
            "Security & Protection Services"
        ]
    },
    {
        "id": 7,
        "name": "Poland",
        "slug": "poland",
        "image": "/images/poland.png",
        "details": [
            "Poland's warehousing and logistics industry is expanding, requiring forklift operators, inventory managers, and logistics coordinators. Our recruitment services provide top talent for these roles.",
            "We also specialize in hiring IT and software development professionals, including frontend and backend developers, data analysts, and network administrators.",
            "The hospitality sector benefits from our recruitment of hotel staff, restaurant workers, and event coordinators.",
            "For construction projects, we supply bricklayers, plumbers, and construction supervisors to meet industry demands."
        ],
        "list": [
            "Warehouse & Logistics Staffing",
            "IT & Software Development Recruitment",
            "Hospitality & Hotel Staffing",
            "Construction Labor Supply"
        ]
    },
    {
        "id": 9,
        "name": "Moldova",
        "slug": "moldova",
        "image": "/images/moldova.png",
        "details": [
            "Moldova's agriculture sector depends on laborers, greenhouse workers, and agricultural technicians. We recruit skilled industrial workers, including machine operators and production supervisors.",
            "Our IT & engineering staffing solutions provide experts in software development, network security, and electrical engineering.",
            "Financial institutions benefit from our recruitment of accountants, payroll specialists, and administrative professionals."
        ],
        "list": [
            "Agriculture & Farming Labor",
            "Skilled Industrial Workers",
            "IT & Engineering Jobs",
            "Financial & Administrative Staffing"
        ]
    },
    {
        "id": 10,
        "name": "Hungary",
        "slug": "hungary",
        "image": "/images/hungary.png",
        "details": [
            "Hungary's industrial workforce relies on welders, factory workers, and machine operators. We recruit IT specialists, including programmers and cybersecurity experts, to support Hungary’s digital economy.",
            "In the construction sector, we place civil engineers, project managers, and skilled laborers.",
            "Our medical recruitment services provide hospitals and clinics with experienced nurses, doctors, and healthcare administrators."
        ],
        "list": [
            "Industrial Workforce Staffing",
            "IT & Tech Industry Recruitment",
            "Construction & Civil Engineering",
            "Medical & Healthcare Professionals"
        ]
    }
]
;

export { DemoData, CountryListData };
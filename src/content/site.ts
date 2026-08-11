import {
  Award,
  BookOpen,
  Building2,
  CalendarClock,
  CheckCircle2,
  FileText,
  GraduationCap,
  HeartHandshake,
  Landmark,
  LibraryBig,
  Mail,
  MapPin,
  NotebookTabs,
  ScrollText,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type ContentBlock =
  | { type: "intro"; text: string[] }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "cards"; items: { title: string; text: string; icon?: LucideIcon }[] }
  | { type: "list"; title?: string; items: string[] }
  | { type: "people"; title: string; groups: { heading: string; names: string[] }[] }
  | { type: "courses"; groups: { title: string; courses: { code: string; title: string; text: string; note?: string }[] }[] }
  | { type: "form" };

export type PageContent = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  image?: string;
  blocks: ContentBlock[];
};

export const site = {
  name: "NCBBC",
  fullName: "Northern Colorado Baptist Bible College",
  tagline: "His Last Command. Our First Priority.",
  url: "https://ncbbc.elijahdesent.com",
  phone: "303.659.3818",
  email: "help@ncbbc.org",
  admissionsEmail: "admissions@ncbbc.org",
  address: "13100 E 144th Ave, Brighton, CO 80601",
  map: "https://www.google.com/maps/search/?api=1&query=13100%20E%20144th%20Ave%20Brighton%20CO%2080601",
  elmwood: "https://www.elmwoodbaptist.org",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "President", href: "/from-the-president" },
  {
    label: "About",
    href: "/purpose---objectives",
    children: [
      { label: "Mission & Purpose", href: "/purpose---objectives" },
      { label: "Administration & Faculty", href: "/administration---faculty" },
      { label: "Doctrinal Statement", href: "/doctrinal-statement" },
    ],
  },
  {
    label: "Academics",
    href: "/bachelor-of-ministry",
    children: [
      { label: "Bachelor of Ministry", href: "/bachelor-of-ministry" },
      { label: "Master of Ministry", href: "/master-of-ministry" },
      { label: "Doctor of Ministry", href: "/doctor-of-ministry" },
      { label: "Course Descriptions", href: "/course-descriptions" },
      { label: "Academic Policies", href: "/academic-policies" },
    ],
  },
  {
    label: "Admissions",
    href: "/application",
    children: [
      { label: "Application", href: "/application" },
      { label: "Tuition & Fees", href: "/tuition---fees" },
      { label: "Student Info", href: "/student-info" },
    ],
  },
  { label: "Contact", href: "/contact-us" },
];

export const programs = [
  {
    title: "Bachelor of Ministry",
    degree: "B.Min.",
    slug: "bachelor-of-ministry",
    image: "/course-bible.jpg",
    status: "Open program",
    text: "A 120-credit program for students preparing for expanded responsibilities in local church leadership, missions, and ministry service.",
    stats: [
      ["120", "credit hours"],
      ["30", "video courses"],
      ["2 yrs", "church service"],
    ],
  },
  {
    title: "Master of Ministry",
    degree: "M.Min.",
    slug: "master-of-ministry",
    image: "/course-ministry.jpg",
    status: "Planned future program",
    text: "A graduate-level path for pastors, missionaries, and ministry leaders who want concentrated instruction for faithful local church service.",
    stats: [
      ["30", "credit hours"],
      ["10", "video courses"],
      ["2 yrs", "church service"],
    ],
  },
  {
    title: "Doctor of Ministry",
    degree: "D.Min.",
    slug: "doctor-of-ministry",
    image: "/course-study.jpg",
    status: "Planned future program",
    text: "A capstone professional program for seasoned ministers seeking advanced sharpening for leadership, service, and guided ministry projects.",
    stats: [
      ["30", "credit hours"],
      ["10", "video courses"],
      ["2 yrs", "church service"],
    ],
  },
];

export const homeFeatures = [
  {
    title: "Serious Bible Training",
    text: "Every program centers on Scripture, sound doctrine, and faithful service through the local New Testament church.",
    icon: BookOpen,
  },
  {
    title: "Self-Paced Online Study",
    text: "Video lectures let students complete coursework from home or office without the limits of a semester calendar.",
    icon: CalendarClock,
  },
  {
    title: "Local Church Service",
    text: "Students train while serving, with documented ministry involvement as part of the degree requirements.",
    icon: HeartHandshake,
  },
  {
    title: "Tuition-Free Courses",
    text: "NCBBC has chosen to offer all college courses free of charge to remove a practical barrier to Bible education.",
    icon: Award,
  },
];

export const pages: PageContent[] = [
  {
    slug: "from-the-president",
    title: "From the President",
    eyebrow: "Welcome",
    summary: "A letter from Dr. Gary L. Randall on NCBBC's purpose, doctrinal commitment, and online ministry-training format.",
    image: "/main-building.jpg",
    blocks: [
      {
        type: "intro",
        text: [
          "Welcome to Northern Colorado Baptist Bible College, an online Bible college dedicated to training serious-minded students with a heart for the Lord, for local church ministry, and to fulfill the Great Commission of the Lord Jesus Christ.",
          "The ministry is people, and at NCBBC our degree programs are focused to minister to people in and through the local New Testament Independent Baptist Church.",
          "Our program of study is streamlined and does not have semesters or years, allowing you the opportunity to work at your own pace on your own schedule from the privacy of your home or office.",
          "NCBBC is blessed with qualified instructors with many years of ministry experience. This greatly enhances each student's training here at NCBBC. All video lectures are online.",
          "Northern Colorado Baptist Bible College is a ministry of Elmwood Baptist Church and maintains a strong commitment to the King James Bible, sound doctrine, the Baptist distinctives, personal and ecclesiastical separation, conservative music, and personal evangelism.",
          "In Christ's service, Dr. Gary L. Randall, President",
        ],
      },
    ],
  },
  {
    slug: "purpose---objectives",
    title: "Mission & Purpose",
    eyebrow: "The Great Commission",
    summary: "NCBBC exists to train and equip serious Christian men and women to know, obey, and teach the whole counsel of God.",
    image: "/hero-campus.jpg",
    blocks: [
      {
        type: "intro",
        text: [
          "Northern Colorado Baptist Bible College exists to train and equip serious Christian men and women to know, obey, and teach the whole counsel of God through faithful service in the local New Testament church.",
          "\"Go ye therefore, and teach all nations... Teaching them to observe all things whatsoever I have commanded you.\" Matthew 28:19-20",
        ],
      },
      {
        type: "cards",
        items: [
          { title: "Scriptural Training", text: "Provide instruction rooted in the Word of God, affirming biblical authority and the proclamation of truth.", icon: ScrollText },
          { title: "Local Church Ministry", text: "Prepare students for effective Christian service within a local Independent Baptist church.", icon: Building2 },
          { title: "Life of Evangelism & Faith", text: "Encourage a life marked by gospel witness and faithful service.", icon: HeartHandshake },
          { title: "Spiritual Growth & Service", text: "Strengthen personal commitment to Christ and cultivate maturity in doctrine and ministry.", icon: CheckCircle2 },
        ],
      },
    ],
  },
  {
    slug: "administration---faculty",
    title: "Administration & Faculty",
    eyebrow: "Experienced Ministry Leadership",
    summary: "NCBBC instructors, guest instructors, administration, and trustees serve from decades of pastoral and ministry experience.",
    blocks: [
      {
        type: "people",
        title: "Leadership & Faculty",
        groups: [
          {
            heading: "NCBBC Instructors",
            names: ["Dr. Gary Randall", "Dr. Bruce Miller", "Dr. B.R. Lehman", "Dr. Jason Walker", "Dr. Josh Lehman", "Dr. Steve Manciagli", "Dr. Chris Clay", "Dr. Rick Lopez", "Dr. Malcolm Redman"],
          },
          {
            heading: "Guest Instructors",
            names: ["Mr. Larry Quinlan", "Mr. Abb Thomas", "Dr. Earl Jessup", "Mr. Ben Everson", "Evangelist Ken Lynch", "Mrs. Cordia Horner", "Mr. Jonathan Cloud", "Evangelist Paul Schwanke", "Dr. Shawn Foster"],
          },
          {
            heading: "Administration",
            names: ["President: Dr. Gary L. Randall", "Executive Vice President: Dr. B.R. Lehman", "Vice President of Curriculum Development: Dr. Jason Walker", "Vice President of Technical Development: Dr. Rick Lopez"],
          },
          {
            heading: "Trustees",
            names: ["Trustee Chairman: Dr. Tom Strohfus", "Vice Chairman: Mr. Brandon Powell", "Mr. Wayne Cooper", "Mr. Matt Ledman", "Dr. Steve Manciagli", "Mr. Daniel McEachern", "Mr. David Williams", "Mr. Jeff Chapman", "Mr. Joshua Fuller"],
          },
        ],
      },
    ],
  },
  {
    slug: "doctrinal-statement",
    title: "Doctrinal Statement",
    eyebrow: "Faith & Practice",
    summary: "As a ministry of Elmwood Baptist Church, NCBBC inherits the church's doctrinal positions and highlights key convictions.",
    image: "/study-desk.jpeg",
    blocks: [
      {
        type: "intro",
        text: [
          "As a ministry of Elmwood Baptist Church of Brighton, Colorado, all doctrinal positions of Northern Colorado Baptist Bible College are inherited from this church.",
          "Below is an abbreviated statement of faith highlighting key positions. For a full doctrinal statement, please visit Elmwood Baptist Church.",
        ],
      },
      {
        type: "cards",
        items: [
          { title: "Scriptures", text: "We believe in the verbal plenary inspiration of the Bible and in its preservation by God. The Bible is our sole authority in all matters of faith and practice.", icon: LibraryBig },
          { title: "God", text: "We believe there is one God, eternally existent in three persons: God the Father, God the Son, and God the Holy Spirit.", icon: ShieldCheck },
          { title: "Jesus Christ", text: "We believe in the deity, virgin birth, sinless life, atoning death, bodily resurrection, and ascension of the Lord Jesus Christ.", icon: CheckCircle2 },
          { title: "Salvation", text: "We believe salvation is the free gift of God, offered by grace alone and received through faith alone in Christ.", icon: HeartHandshake },
          { title: "The Church", text: "We believe in the local New Testament church as Christ's institution for fulfilling the Great Commission.", icon: Landmark },
          { title: "Christ's Return", text: "We affirm the visible, personal, imminent return of Jesus Christ prior to His millennial kingdom.", icon: ScrollText },
        ],
      },
    ],
  },
  {
    slug: "bachelor-of-ministry",
    title: "Bachelor of Ministry",
    eyebrow: "B.Min.",
    summary: "A practical 120-credit ministry degree for students preparing for pastoral ministry, missions, church leadership, and service.",
    image: "/course-bible.jpg",
    blocks: [
      {
        type: "intro",
        text: [
          "The Bachelor of Ministry program is intended for students preparing for expanded responsibilities in local church leadership and service, including pastoral ministry, missions, and other ministry roles.",
          "The B.Min. strengthens doctrinal clarity, develops ministry skill, and supports faithful service through a local church while the student studies.",
        ],
      },
      { type: "stats", items: [{ value: "120", label: "credit hours" }, { value: "30", label: "video courses" }, { value: "2 yrs", label: "Christian service" }] },
      {
        type: "list",
        items: [
          "A minimum of 2 years of Christian service in an Independent Baptist Church ministry must be fulfilled with written documentation from the pastor.",
          "Life experience credit with validation will be considered.",
        ],
      },
    ],
  },
  {
    slug: "master-of-ministry",
    title: "Master of Ministry",
    eyebrow: "M.Min. | Planned Future Program",
    summary: "An advanced ministry program for students who already possess undergraduate Bible training and desire further development.",
    image: "/course-ministry.jpg",
    blocks: [
      {
        type: "intro",
        text: [
          "The Master of Ministry is an advanced program for students who already possess undergraduate Bible training and desire further development for ministry effectiveness.",
          "It is designed for active pastors, missionaries, and ministry leaders who want concentrated instruction that strengthens preaching, teaching, leadership, and counseling within a local church setting.",
        ],
      },
      { type: "stats", items: [{ value: "30", label: "credit hours" }, { value: "10", label: "video courses" }, { value: "2 yrs", label: "Christian service" }] },
    ],
  },
  {
    slug: "doctor-of-ministry",
    title: "Doctor of Ministry",
    eyebrow: "D.Min. | Planned Future Program",
    summary: "A capstone professional program for seasoned ministers seeking advanced sharpening for leadership and service.",
    image: "/course-study.jpg",
    blocks: [
      {
        type: "intro",
        text: [
          "The Doctor of Ministry is a capstone professional program for seasoned ministers seeking advanced sharpening for leadership and service.",
          "Designed for those already engaged in ministry, the D.Min. focuses on strengthening the student's ability to apply Scripture to complex ministry responsibilities through advanced coursework and guided ministry projects.",
        ],
      },
      { type: "stats", items: [{ value: "30", label: "credit hours" }, { value: "10", label: "video courses" }, { value: "2 yrs", label: "Christian service" }] },
    ],
  },
  {
    slug: "academic-policies",
    title: "Academic Policies",
    eyebrow: "Policies & Procedures",
    summary: "NCBBC's academic schedule, graduation requirements, grading scale, and honors standards.",
    blocks: [
      {
        type: "cards",
        items: [
          { title: "Academic Schedule", text: "NCBBC does not operate on a semester or year system. Students working toward a degree may complete coursework at their own pace.", icon: CalendarClock },
          { title: "Graduation Requirements", text: "An earned degree requires successfully completing all required coursework and documented church ministry service.", icon: GraduationCap },
          { title: "Grading Scale", text: "A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: 59 and below. A student below 60 may retake the test, with grades averaged.", icon: NotebookTabs },
          { title: "Academic Honors", text: "Summa Cum Laude: 3.95-4.0 GPA, Magna Cum Laude: 3.75-3.94 GPA, Cum Laude: 3.5-3.74 GPA.", icon: Award },
        ],
      },
    ],
  },
  {
    slug: "academic-catalog",
    title: "Academic Catalog",
    eyebrow: "Catalog",
    summary: "Review programs, requirements, policies, course descriptions, admissions expectations, and student information in one place.",
    blocks: [
      {
        type: "cards",
        items: [
          { title: "Programs", text: "Bachelor of Ministry is available, with Master of Ministry and Doctor of Ministry planned as future programs.", icon: GraduationCap },
          { title: "Course Descriptions", text: "The curriculum includes doctrine, Baptist distinctives, Bible interpretation, biblical studies, local church ministry, pastoral electives, missions, church music, and more.", icon: BookOpen },
          { title: "Admissions", text: "Applicants must be born-again believers, members in good standing of an independent Baptist church, and recommended by their pastor.", icon: FileText },
        ],
      },
    ],
  },
  {
    slug: "course-descriptions",
    title: "Course Descriptions",
    eyebrow: "Curriculum",
    summary: "A clear overview of NCBBC courses in doctrine, Bible interpretation, local church ministry, pastoral ministry, missions, music, and electives.",
    blocks: [
      {
        type: "courses",
        groups: [
          {
            title: "Doctrinal Foundations & Baptist Distinctives",
            courses: [
              { code: "TH101", title: "Bible Doctrines I", text: "A foundational survey of core doctrines with emphasis on the authority and sufficiency of Scripture." },
              { code: "TH102", title: "Bible Doctrines II", text: "A continuation covering Christology, Pneumatology, Soteriology, Ecclesiology, and Eschatology.", note: "Prerequisite: Bible Doctrines I." },
              { code: "TH205", title: "Baptist History & Distinctives", text: "A study of Baptist identity, history, polity, ordinances, and conscience before God." },
              { code: "TH208", title: "Biblical Separation", text: "Instruction in personal holiness and ecclesiastical integrity." },
              { code: "TH215", title: "The King James Bible", text: "A doctrinal and historical study of inspiration, preservation, and the English Bible." },
              { code: "TH315", title: "Calvinism: A Biblical Evaluation", text: "A careful biblical evaluation of Calvinistic systems and salvation-related claims." },
            ],
          },
          {
            title: "Bible Interpretation & Biblical Studies",
            courses: [
              { code: "BI101", title: "Old Testament Survey", text: "An overview of Old Testament books, chronology, context, and major themes." },
              { code: "BI102", title: "New Testament Survey", text: "A survey of New Testament background, authorship, structure, and doctrinal themes." },
              { code: "BI213", title: "Methods of Bible Study", text: "A practical introduction to literal, grammatical, historical interpretation." },
              { code: "BI315", title: "Pastoral Epistles", text: "A verse-by-verse study of 1-2 Timothy and Titus." },
              { code: "BI401", title: "Pentateuch & OT Prophets", text: "An upper-level study of the Pentateuch and prophetic books.", note: "Prerequisites: Bible Doctrines II; New Testament Survey." },
            ],
          },
          {
            title: "Local Church Ministry",
            courses: [
              { code: "NT305", title: "Acts: The Church in Action", text: "A study of the beginning, expansion, and doctrinal formation of the New Testament church." },
              { code: "MI211", title: "Indigenous Church Planting", text: "Biblical principles and practical methods for planting and strengthening indigenous local churches." },
              { code: "PT111", title: "Biblical Evangelism", text: "Training in gospel clarity, personal responsibility, and practical evangelistic engagement." },
              { code: "PT341", title: "Christian Home: Marriage & Family", text: "A biblical study of marriage, family life, and spiritual leadership in the home." },
            ],
          },
          {
            title: "Elective Pools",
            courses: [
              { code: "PT201", title: "Homiletics I", text: "Fundamental preaching methods, sermon structure, preparation, and delivery." },
              { code: "PT202", title: "Homiletics II", text: "Advanced sermon development and pulpit delivery.", note: "Prerequisite: Homiletics I." },
              { code: "MI301", title: "Acts: Life of Paul", text: "A study of Paul's missionary journeys and ministry." },
              { code: "MU150", title: "Church Music Philosophy", text: "A comprehensive, scriptural philosophy of church music and worship." },
              { code: "NM202", title: "Women in Ministry", text: "A biblical study of the role of women in the home and local church." },
              { code: "NT406", title: "Romans", text: "An advanced exposition of sin, justification, sanctification, and grace." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "application",
    title: "Admission Process",
    eyebrow: "Apply",
    summary: "Start the admissions process for online Bible college training through NCBBC.",
    blocks: [
      {
        type: "intro",
        text: [
          "All who apply for admission must be born-again believers who desire to increase their proficiency in serving the Lord.",
          "Applicants must be members in good standing of an independent Baptist church and must have a positive recommendation from their pastor.",
          "Admission to Northern Colorado Baptist Bible College is not limited by biological sex, race, color, national or ethnic origin.",
        ],
      },
      {
        type: "list",
        title: "Application checklist",
        items: [
          "Complete the application for admission.",
          "Submit official transcript if applicable.",
          "Submit a required pastoral reference letter.",
          "Register for desired classes and submit selections for approval.",
          "Receive email confirmation after approved course registration is reviewed.",
        ],
      },
      { type: "form" },
    ],
  },
  {
    slug: "tuition---fees",
    title: "Tuition & Fees",
    eyebrow: "Financial Information",
    summary: "NCBBC has decided to offer all college courses free of charge to every student.",
    blocks: [
      {
        type: "intro",
        text: [
          "Under the Lord's leading and after much prayerful consideration, the administration of NCBBC has decided to offer all college courses free of charge to every student.",
          "The college is grateful for the opportunity to remove this financial barrier and make biblical education more accessible to those whom God has called to study His Word.",
        ],
      },
      {
        type: "stats",
        items: [
          { value: "$0", label: "course tuition" },
          { value: "Online", label: "video lectures" },
          { value: "Church", label: "service focus" },
        ],
      },
    ],
  },
  {
    slug: "student-info",
    title: "Student Info",
    eyebrow: "Conduct & Service",
    summary: "Students train while serving in a local church and are expected to maintain Christian standards of conduct.",
    blocks: [
      {
        type: "cards",
        items: [
          { title: "Christian Service", text: "Each student must be a saved, baptized member of an approved local church and participate weekly in at least one facet of local church ministry.", icon: HeartHandshake },
          { title: "Church Attendance", text: "All students must attend the weekly services, conferences, and revivals of the local church.", icon: Building2 },
          { title: "Student Conduct", text: "Students are expected to manifest the highest standards of Christian living as they train for ministry leadership.", icon: ShieldCheck },
        ],
      },
    ],
  },
  {
    slug: "contact-us",
    title: "Contact Us",
    eyebrow: "Brighton, Colorado",
    summary: "Reach Northern Colorado Baptist Bible College for admissions questions, program details, or campus correspondence.",
    blocks: [
      {
        type: "cards",
        items: [
          { title: "Phone", text: site.phone, icon: UsersRound },
          { title: "Email", text: site.email, icon: Mail },
          { title: "Address", text: site.address, icon: MapPin },
        ],
      },
      { type: "form" },
    ],
  },
];

export const pagesBySlug = Object.fromEntries(pages.map((page) => [page.slug, page]));

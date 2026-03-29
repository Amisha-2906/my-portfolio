import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { portfolioTable } from "@workspace/db";
import { UpdatePortfolioBody } from "@workspace/api-zod";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const DEFAULT_PORTFOLIO = {
  hero: {
    name: "Alex Johnson",
    title: "Senior Data Analyst",
    subtitle: "Turning complex data into strategic insights that drive business growth",
    location: "San Francisco, CA",
    email: "alex.johnson@email.com",
    phone: "+1 (415) 555-0192",
    linkedin: "https://linkedin.com/in/alexjohnson",
    github: "https://github.com/alexjohnson",
    profileImageUrl: "",
    resumeUrl: "",
  },
  about: {
    summary:
      "Data-driven analyst with 6+ years of experience transforming raw data into actionable business intelligence across Fortune 500 companies. Proven track record in building scalable analytics pipelines, developing executive dashboards, and leading cross-functional data initiatives that have collectively generated over $40M in business value.\n\nPassionate about using rigorous statistical methods and modern data tools to solve ambiguous, high-stakes business problems. I thrive at the intersection of business strategy and data engineering.",
    highlights: [
      "Led analytics for $120M product line at Google, reducing churn by 18% through cohort analysis",
      "Built automated reporting infrastructure saving 200+ analyst hours per quarter at Microsoft",
      "Published research on predictive modeling in supply chain optimization (cited 40+ times)",
      "Mentored team of 5 junior analysts; 3 promoted within 18 months",
    ],
  },
  skills: [
    {
      category: "Data Analysis & Statistics",
      items: ["Statistical Modeling", "A/B Testing", "Regression Analysis", "Time Series Forecasting", "Cohort Analysis", "Predictive Analytics"],
    },
    {
      category: "Programming & Querying",
      items: ["Python", "SQL", "R", "Pandas", "NumPy", "Scikit-learn", "dbt"],
    },
    {
      category: "Visualization & BI Tools",
      items: ["Tableau", "Power BI", "Looker", "D3.js", "Google Data Studio", "Matplotlib"],
    },
    {
      category: "Data Infrastructure",
      items: ["BigQuery", "Snowflake", "Redshift", "Apache Spark", "Airflow", "dbt", "AWS", "GCP"],
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Google",
      companyLogo: "",
      role: "Senior Data Analyst, Product Growth",
      location: "Mountain View, CA",
      startDate: "Jan 2022",
      endDate: "",
      current: true,
      description: "Lead analyst for the Google Workspace growth team, responsible for product analytics, experimentation, and strategic reporting for a 300M+ user product suite.",
      bullets: [
        "Designed and analyzed 40+ A/B experiments driving a 12% increase in feature adoption across Google Workspace",
        "Built end-to-end churn prediction model (AUC 0.89) that informed $8M retention marketing spend",
        "Partnered with PM and engineering to instrument new analytics events, reducing data gaps by 60%",
        "Delivered weekly executive dashboard to VP level stakeholders, synthesizing product health signals",
        "Mentored 3 junior analysts on SQL best practices and experimental design methodology",
      ],
      technologies: ["BigQuery", "Python", "Looker", "Tableau", "SQL", "dbt", "Apache Airflow"],
    },
    {
      id: "exp-2",
      company: "Microsoft",
      companyLogo: "",
      role: "Data Analyst, Business Intelligence",
      location: "Redmond, WA",
      startDate: "Jun 2019",
      endDate: "Dec 2021",
      current: false,
      description: "Core member of the Azure BI team, building analytics solutions and reporting infrastructure for Azure cloud services across North America.",
      bullets: [
        "Automated monthly financial reporting pipeline, reducing manual effort by 70% and improving accuracy",
        "Developed customer segmentation model identifying $12M in upsell opportunities for Azure Enterprise",
        "Created self-service analytics portal used by 150+ business users across Finance and Sales",
        "Reduced query costs by 45% through SQL optimization and data modeling improvements in Snowflake",
      ],
      technologies: ["Snowflake", "Power BI", "Python", "T-SQL", "Azure Data Factory", "Excel"],
    },
    {
      id: "exp-3",
      company: "Accenture",
      companyLogo: "",
      role: "Business Analyst",
      location: "New York, NY",
      startDate: "Jul 2017",
      endDate: "May 2019",
      current: false,
      description: "Management consulting analyst focused on data strategy and digital transformation engagements for Fortune 500 financial services and retail clients.",
      bullets: [
        "Delivered supply chain optimization analysis for $2B retail client, identifying 15% cost reduction opportunity",
        "Built financial forecasting models in Python and Excel that improved forecast accuracy by 20%",
        "Conducted market analysis and competitive benchmarking for 3 major strategic initiatives",
      ],
      technologies: ["Python", "Excel", "Tableau", "SQL", "PowerPoint"],
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Real-Time Churn Prediction Engine",
      description: "Designed and deployed a machine learning pipeline to predict enterprise customer churn 90 days in advance using behavioral signals, product usage metrics, and support interaction history.",
      impact: "Reduced annual churn by 18%, retaining $6.2M in ARR over 12 months",
      tools: ["Python", "Scikit-learn", "BigQuery", "Airflow", "Looker"],
      category: "Machine Learning",
      link: "",
      imageUrl: "",
    },
    {
      id: "proj-2",
      title: "Executive Analytics Dashboard Suite",
      description: "Built a suite of 12 interconnected Tableau dashboards providing real-time visibility into product KPIs, user acquisition funnels, and revenue performance for C-suite stakeholders.",
      impact: "Adopted by 50+ executives; reduced weekly reporting effort by 200+ hours per quarter",
      tools: ["Tableau", "SQL", "dbt", "Snowflake"],
      category: "Data Visualization",
      link: "",
      imageUrl: "",
    },
    {
      id: "proj-3",
      title: "A/B Testing Framework & Governance",
      description: "Architected a company-wide experimentation framework including Bayesian statistics methodology, experiment tracking system, and analyst guidelines for rigorous A/B test design.",
      impact: "Scaled experiment velocity 3x (12 to 40 experiments/quarter) while maintaining statistical rigor",
      tools: ["Python", "BigQuery", "Looker", "Google Sheets"],
      category: "Analytics Infrastructure",
      link: "",
      imageUrl: "",
    },
    {
      id: "proj-4",
      title: "Supply Chain Demand Forecasting",
      description: "Developed time-series forecasting models (ARIMA, Prophet, XGBoost ensemble) to predict SKU-level demand across 500+ products for a major retail client.",
      impact: "Improved forecast accuracy by 23%, reducing excess inventory costs by $4.1M annually",
      tools: ["Python", "Prophet", "XGBoost", "SQL", "Tableau"],
      category: "Forecasting",
      link: "",
      imageUrl: "",
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      degree: "Master of Science",
      field: "Data Science",
      startYear: "2015",
      endYear: "2017",
      gpa: "3.9 / 4.0",
      honors: "Summa Cum Laude",
    },
    {
      id: "edu-2",
      institution: "University of Michigan",
      degree: "Bachelor of Science",
      field: "Statistics & Economics",
      startYear: "2011",
      endYear: "2015",
      gpa: "3.7 / 4.0",
      honors: "Dean's List (6 semesters)",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Google Professional Data Engineer",
      issuer: "Google Cloud",
      date: "Mar 2023",
      credentialId: "GCP-PDE-2023-1847",
      url: "",
    },
    {
      id: "cert-2",
      name: "AWS Certified Data Analytics – Specialty",
      issuer: "Amazon Web Services",
      date: "Nov 2022",
      credentialId: "AWS-DAS-2022-9234",
      url: "",
    },
    {
      id: "cert-3",
      name: "Tableau Desktop Specialist",
      issuer: "Tableau / Salesforce",
      date: "Jun 2021",
      credentialId: "TDS-2021-44821",
      url: "",
    },
    {
      id: "cert-4",
      name: "Microsoft Certified: Data Analyst Associate",
      issuer: "Microsoft",
      date: "Jan 2021",
      credentialId: "MCA-DA-2021-3391",
      url: "",
    },
  ],
};

router.get("/portfolio", async (req, res) => {
  try {
    const rows = await db.select().from(portfolioTable).limit(1);
    if (rows.length === 0) {
      await db.insert(portfolioTable).values({ data: DEFAULT_PORTFOLIO });
      res.json(DEFAULT_PORTFOLIO);
      return;
    }
    const stored = rows[0].data as Record<string, unknown>;
    const merged = { ...DEFAULT_PORTFOLIO, ...stored };
    res.json(merged);
  } catch (err) {
    req.log.error({ err }, "Failed to get portfolio");
    res.status(500).json({ error: "Failed to get portfolio" });
  }
});

router.put("/portfolio", async (req, res) => {
  try {
    const parsed = UpdatePortfolioBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid portfolio data", details: parsed.error.issues });
      return;
    }

    const rows = await db.select().from(portfolioTable).limit(1);
    if (rows.length === 0) {
      const [inserted] = await db.insert(portfolioTable).values({ data: parsed.data }).returning();
      res.json(inserted.data);
    } else {
      const [updated] = await db
        .update(portfolioTable)
        .set({ data: parsed.data })
        .where(eq(portfolioTable.id, rows[0].id))
        .returning();
      res.json(updated.data);
    }
  } catch (err) {
    req.log.error({ err }, "Failed to update portfolio");
    res.status(500).json({ error: "Failed to update portfolio" });
  }
});

export default router;

import { useQueryClient } from "@tanstack/react-query";
import { 
  useGetPortfolio, 
  useUpdatePortfolio,
  getGetPortfolioQueryKey,
  type Portfolio
} from "@workspace/api-client-react";

export const defaultPortfolio: Portfolio = {
  hero: {
    name: "Alex Sterling",
    title: "Senior Data Analyst",
    subtitle: "Transforming complex datasets into actionable business intelligence for enterprise growth.",
    location: "San Francisco, CA",
    email: "alex.sterling@example.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  about: {
    summary: "I am a strategic data analyst with 6+ years of experience extracting insights from massive datasets. Specializing in predictive modeling, A/B testing, and executive dashboarding, I help Fortune 500 companies make data-driven decisions that increase revenue and optimize operations.",
    highlights: [
      "Driven $4.2M in annual cost savings through supply chain optimization models.",
      "Developed an automated reporting suite used daily by 200+ global stakeholders.",
      "Expertise in bridging the gap between technical data engineering and executive strategy."
    ]
  },
  skills: [
    { category: "Core Competencies", items: ["Data Modeling", "Statistical Analysis", "A/B Testing", "Financial Forecasting"] },
    { category: "Languages & Tools", items: ["Python", "SQL", "R", "Tableau", "PowerBI", "Snowflake", "dbt"] }
  ],
  experience: [
    {
      id: "exp-1",
      company: "TechNova Corp",
      role: "Lead Data Analyst",
      location: "San Francisco, CA",
      startDate: "2021-03",
      current: true,
      description: "Leading the product analytics team to drive user retention and engagement strategies.",
      bullets: [
        "Designed and implemented a churn prediction model with 89% accuracy.",
        "Led a team of 3 analysts to migrate all legacy reporting to Snowflake + Tableau.",
        "Partnered with product managers to launch 40+ successful experiments."
      ],
      technologies: ["Python", "SQL", "Tableau", "Snowflake"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Customer Lifetime Value Engine",
      description: "An automated pipeline that predicts LTV for new signups based on first-week behavior.",
      impact: "Increased marketing ROI by 24% by reallocating spend to high-LTV channels.",
      tools: ["Python", "scikit-learn", "BigQuery"],
      category: "Predictive Modeling",
      link: "https://github.com"
    },
    {
      id: "proj-2",
      title: "Global Supply Chain Dashboard",
      description: "Real-time visibility into inventory levels across 40+ international warehouses.",
      impact: "Reduced stockouts by 18% and optimized reorder points globally.",
      tools: ["PowerBI", "SQL", "Airflow"],
      category: "Visualization",
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      degree: "Master of Information and Data Science",
      field: "Data Science",
      startYear: "2018",
      endYear: "2020",
      gpa: "3.9"
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Data Analytics",
      issuer: "Amazon Web Services",
      date: "2022-11",
      credentialId: "AWS-DA-12345"
    }
  ]
};

export function usePortfolio() {
  const query = useGetPortfolio({
    query: {
      retry: false,
    }
  });

  // If the API returns 404 or fails, we provide a robust fallback so the user can still edit and save
  const data = query.data || defaultPortfolio;

  return {
    ...query,
    data,
    isInitialLoading: query.isLoading && !query.data
  };
}

export function useSavePortfolio() {
  const queryClient = useQueryClient();
  
  return useUpdatePortfolio({
    mutation: {
      onSuccess: () => {
        // Invalidate the cache to trigger a re-fetch and update UI
        queryClient.invalidateQueries({ queryKey: getGetPortfolioQueryKey() });
      }
    }
  });
}

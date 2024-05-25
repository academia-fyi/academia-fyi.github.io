import { column, defineTable, defineDb, NOW } from "astro:db";

const UniversityMetadata = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text({ unique: true }),
    slug: column.text({ unique: true }),
    website: column.text({ unique: true }),
    logo: column.text(),
    color: column.text(),
    lat: column.number(),
    lon: column.number(),
    founded: column.number(),
  },
});

const UniversityEndowment = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    date: column.date(),
    amount: column.number(),
    currency: column.text(),
    source: column.text(),
    universityID: column.number({
      name: "university_id",
      references: () => UniversityMetadata.columns.id,
    }),
  },
  indexes: [{ on: ["date", "universityID"], unique: true }],
});

const UniversityPopulation = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    date: column.date(),
    count: column.number(),
    unit: column.text(),
    universityID: column.number({
      name: "university_id",
      references: () => UniversityMetadata.columns.id,
    }),
  },
  indexes: [{ on: ["date", "unit", "universityID"], unique: true }],
});

const Salary = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    populationType: column.text({ name: "population_type" }),
    populationRank: column.text({ name: "population_rank" }),
    populationDepartment: column.text({ name: "population_department", }),
    date: column.date({ default: NOW }),
    compensationAmount: column.number({ name: "compensation_amount", }),
    compensationType: column.text({ name: "compensation_type", }),
    compensationCurrency: column.text({ name: "compensation_currency", }),
    // TODO support lists for sources, since some years might have multiple funding sources!
    compensationSource: column.text({ name: "compensation_source", }),
    email: column.text({ name: "user_email", }),
    gender: column.text({ name: "user_gender", optional: true, }),
    ethnicity: column.text({ name: "user_ethnicity", optional: true, }),
    education: column.text({ name: "user_education", optional: true, }),
    expectedHoursPerWeek: column.number({ name: "weekly_hours_expected", }),
    actualHoursPerWeek: column.number({ name: "weekly_hours_actual", }),
    yearsDedication: column.number({ name: "years_dedication", }),
    yearsExperience: column.number({ name: "years_experience", }),
    enhancedAnonymity: column.boolean({ name: "enhanced_anonymity", default: false }),
    union: column.text({ optional: true }),
    offerLetter: column.text({ name: "offer_letter", optional: true, }),
    universityID: column.number({
      name: "university_id",
      references: () => UniversityMetadata.columns.id,
    }),
  },
  indexes: [
    { on: ["date", "populationType", "email", "universityID"], unique: true },
  ],
});

export default defineDb({
  tables: {
    UniversityMetadata,
    UniversityEndowment,
    UniversityPopulation,
    Salary,
  },
});

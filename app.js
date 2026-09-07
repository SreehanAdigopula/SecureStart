const categories = [
  {
    name: "Account Security",
    questions: [
      {
        id: "twoFactor",
        text: "Do you use two-factor authentication on important accounts?",
        answers: [
          ["Yes, on all important accounts", 0],
          ["On some accounts", 1],
          ["No", 3],
          ["Not sure", 2]
        ]
      },
      {
        id: "separateAccounts",
        text: "Do different people have separate accounts?",
        answers: [
          ["Yes", 0],
          ["Mostly", 1],
          ["People share logins", 3],
          ["Not sure", 2]
        ]
      },
      {
        id: "passwordManager",
        text: "Do you use a password manager?",
        answers: [
          ["Yes", 0],
          ["Some people do", 1],
          ["No", 2],
          ["Not sure", 2]
        ]
      },
      {
        id: "passwordReuse",
        text: "Do you reuse passwords across multiple accounts?",
        answers: [
          ["No", 0],
          ["Sometimes", 2],
          ["Often", 3],
          ["Not sure", 2]
        ]
      }
    ]
  },
  {
    name: "Access Control",
    questions: [
      {
        id: "adminList",
        text: "Do you know who has admin access to key tools?",
        answers: [
          ["Yes", 0],
          ["Mostly", 1],
          ["No", 3],
          ["Not sure", 2]
        ]
      },
      {
        id: "removeAccess",
        text: "Do you remove access when someone leaves?",
        answers: [
          ["Always", 0],
          ["Sometimes", 2],
          ["Rarely", 3],
          ["Not sure", 2]
        ]
      },
      {
        id: "leastPrivilege",
        text: "Do you limit admin permissions to people who need them?",
        answers: [
          ["Yes", 0],
          ["Mostly", 1],
          ["No", 3],
          ["Not sure", 2]
        ]
      }
    ]
  },
  {
    name: "Data Protection",
    questions: [
      {
        id: "dataStored",
        text: "Do you store member, customer, or payment-related information?",
        answers: [
          ["No", 0],
          ["Yes, with a clear plan", 1],
          ["Yes, without a plan", 3],
          ["Not sure", 2]
        ]
      },
      {
        id: "dataLocation",
        text: "Do you know where important data is stored?",
        answers: [
          ["Yes", 0],
          ["Mostly", 1],
          ["No", 3],
          ["Not sure", 2]
        ]
      },
      {
        id: "backups",
        text: "Do you have a backup of important files?",
        answers: [
          ["Yes, tested recently", 0],
          ["Yes, but not tested", 1],
          ["No", 3],
          ["Not sure", 2]
        ]
      },
      {
        id: "sensitiveFiles",
        text: "Do you know who can access sensitive files?",
        answers: [
          ["Yes", 0],
          ["Mostly", 1],
          ["No", 3],
          ["Not sure", 2]
        ]
      }
    ]
  },
  {
    name: "Website and Domain Safety",
    questions: [
      {
        id: "domainOwner",
        text: "Do you know who owns or manages your domain name?",
        answers: [
          ["Yes", 0],
          ["Maybe", 1],
          ["No", 3],
          ["No website", 0]
        ]
      },
      {
        id: "https",
        text: "Is your website using HTTPS?",
        answers: [
          ["Yes", 0],
          ["No", 3],
          ["Not sure", 2],
          ["No website", 0]
        ]
      },
      {
        id: "websiteEditors",
        text: "Do you know who can edit your website?",
        answers: [
          ["Yes", 0],
          ["Mostly", 1],
          ["No", 3],
          ["No website", 0]
        ]
      }
    ]
  },
  {
    name: "Incident Readiness",
    questions: [
      {
        id: "hackedPlan",
        text: "Do you know what you would do if an account got hacked?",
        answers: [
          ["Yes, we have a plan", 0],
          ["Somewhat", 1],
          ["No", 3],
          ["Not sure", 2]
        ]
      },
      {
        id: "recoveryOptions",
        text: "Do key accounts have recovery emails or phone numbers set up?",
        answers: [
          ["Yes", 0],
          ["Some accounts", 1],
          ["No", 3],
          ["Not sure", 2]
        ]
      },
      {
        id: "trustedRecovery",
        text: "Do multiple trusted people know how to recover key accounts?",
        answers: [
          ["Yes", 0],
          ["One person does", 2],
          ["No", 3],
          ["Not sure", 2]
        ]
      }
    ]
  }
];

const recommendationBank = [
  {
    match: ["twoFactor", "recoveryOptions"],
    title: "Enable two-factor authentication",
    explanation: "Start with email, website, file storage, and payment accounts because those unlock everything else.",
    priority: "High",
    difficulty: "Easy",
    relatedCategory: "Account Security"
  },
  {
    match: ["separateAccounts"],
    title: "Stop sharing admin accounts",
    explanation: "Separate logins make it easier to remove access and understand who changed something.",
    priority: "High",
    difficulty: "Medium",
    relatedCategory: "Account Security"
  },
  {
    match: ["passwordManager", "passwordReuse"],
    title: "Use a password manager",
    explanation: "A password manager helps the team use unique passwords without memorizing them.",
    priority: "Medium",
    difficulty: "Easy",
    relatedCategory: "Account Security"
  },
  {
    match: ["adminList", "removeAccess", "leastPrivilege", "websiteEditors"],
    title: "Create an access owner list",
    explanation: "Keep a simple list of admins and review it after elections, staff changes, or volunteer turnover.",
    priority: "High",
    difficulty: "Easy",
    relatedCategory: "Access Control"
  },
  {
    match: ["dataStored", "dataLocation", "sensitiveFiles"],
    title: "Map where sensitive data lives",
    explanation: "Write down what data you store, where it sits, and who can open it.",
    priority: "High",
    difficulty: "Medium",
    relatedCategory: "Data Protection"
  },
  {
    match: ["backups"],
    title: "Create a basic backup plan",
    explanation: "Decide which files matter, copy them somewhere separate, and test that the copy opens.",
    priority: "Medium",
    difficulty: "Easy",
    relatedCategory: "Data Protection"
  },
  {
    match: ["domainOwner", "https"],
    title: "Document website ownership",
    explanation: "Know who controls the domain, hosting, website editor, and billing so the site does not get stranded.",
    priority: "Medium",
    difficulty: "Medium",
    relatedCategory: "Website and Domain Safety"
  },
  {
    match: ["hackedPlan", "trustedRecovery"],
    title: "Write a one-page incident plan",
    explanation: "List who to contact, how to recover accounts, and what to tell members or customers.",
    priority: "High",
    difficulty: "Easy",
    relatedCategory: "Incident Readiness"
  }
];

const riskLevels = [
  { label: "Low", max: 20 },
  { label: "Moderate", max: 45 },
  { label: "High", max: 70 },
  { label: "Critical", max: 100 }
];
const allowedRiskLevels = new Set(riskLevels.map((level) => level.label));
const categoryNames = new Set(categories.map((category) => category.name));

const resourceLibrary = {
  twoFactor: {
    title: "2FA setup guide",
    html: `
      <p>Use this when setting up two-factor authentication for email, website, payment, file storage, and social accounts.</p>
      <ol>
        <li>Start with the main email account. It usually controls password resets for everything else.</li>
        <li>Turn on an authenticator app or security key where possible.</li>
        <li>Save backup codes somewhere the organization can still reach after leadership changes.</li>
        <li>Repeat for website hosting, domain registrar, shared drives, payment tools, and social media.</li>
        <li>Document which trusted people can recover each account.</li>
      </ol>
    `,
    markdown: `# SecureStart 2FA Setup Guide

1. Start with the main email account.
2. Turn on an authenticator app or security key where possible.
3. Save backup codes somewhere the organization can reach after leadership changes.
4. Repeat for website hosting, domain registrar, shared drives, payment tools, and social media.
5. Document which trusted people can recover each account.
`
  },
  accessTracker: {
    title: "Access tracker template",
    html: `
      <p>Use this simple table to track who can administer important accounts.</p>
      <div class="template-table" role="table" aria-label="Access tracker template">
        <div role="row"><strong>Tool</strong><strong>Admin owner</strong><strong>Backup owner</strong><strong>Review date</strong></div>
        <div role="row"><span>Email</span><span></span><span></span><span></span></div>
        <div role="row"><span>Website</span><span></span><span></span><span></span></div>
        <div role="row"><span>Shared files</span><span></span><span></span><span></span></div>
        <div role="row"><span>Payment tool</span><span></span><span></span><span></span></div>
      </div>
    `,
    markdown: `# SecureStart Access Tracker

| Tool | Admin owner | Backup owner | Review date |
| --- | --- | --- | --- |
| Email |  |  |  |
| Website |  |  |  |
| Shared files |  |  |  |
| Payment tool |  |  |  |
| Social media |  |  |  |
`
  },
  backupChecklist: {
    title: "Backup checklist",
    html: `
      <p>Use this to decide what needs a backup and whether the backup is useful.</p>
      <ol>
        <li>List the files or records the organization cannot afford to lose.</li>
        <li>Choose a storage location separate from the everyday working folder.</li>
        <li>Decide who checks the backup and how often.</li>
        <li>Open a sample backup file once per month to confirm it works.</li>
        <li>Remove old access from backup folders when people leave.</li>
      </ol>
    `,
    markdown: `# SecureStart Backup Checklist

- Critical files or records:
- Backup location:
- Backup owner:
- Review schedule:
- Last test date:
- Who can access backups:
`
  },
  incidentPlan: {
    title: "Incident plan",
    html: `
      <p>Use this one-page plan before an account gets hacked.</p>
      <ol>
        <li>Identify who should be contacted first.</li>
        <li>List recovery paths for email, website, shared files, and payment tools.</li>
        <li>Write the first message you would send to members or customers.</li>
        <li>Decide who can pause payments, posts, or website updates if needed.</li>
        <li>After recovery, change passwords, review access, and save what happened.</li>
      </ol>
    `,
    markdown: `# SecureStart Incident Plan

First contact:
Backup contact:

Accounts to recover:
- Email:
- Website:
- Shared files:
- Payment tools:

Message to members or customers:

After recovery:
- Change affected passwords.
- Review admin access.
- Save notes about what happened.
`
  }
};

const state = {
  profile: null,
  answers: [],
  result: null,
  activeResource: null
};

const storageKey = "securestart-assessments";
const steps = {
  profile: document.querySelector("#profileStep"),
  checklist: document.querySelector("#checklistStep"),
  results: document.querySelector("#resultsStep")
};

document.addEventListener("DOMContentLoaded", () => {
  renderQuestions();
  renderSavedAssessments();
  bindEvents();
});

function bindEvents() {
  const hasWebsiteRadios = document.querySelectorAll('input[name="hasWebsite"]');
  hasWebsiteRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      document.querySelector("#websiteField").classList.toggle("hidden", radio.value !== "yes" || !radio.checked);
    });
  });

  document.querySelector("#profileForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    state.profile = {
      name: form.get("orgName").trim(),
      type: form.get("orgType"),
      size: form.get("orgSize"),
      hasWebsite: form.get("hasWebsite") === "yes",
      websiteUrl: form.get("websiteUrl").trim(),
      handlesSensitiveData: form.get("handlesData") === "yes"
    };
    showStep("checklist");
  });

  document.querySelector("#backToProfile").addEventListener("click", () => showStep("profile"));

  document.querySelector("#checklistForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const answers = collectAnswers(form);
    const totalQuestions = categories.flatMap((category) => category.questions).length;

    if (answers.length !== totalQuestions) {
      alert("Please answer every checklist question before viewing results.");
      return;
    }

    state.answers = answers;
    state.result = buildResult();
    saveAssessment(state.result);
    renderResults(state.result);
    renderSavedAssessments();
    showStep("results");
  });

  document.querySelector("#retakeButton").addEventListener("click", () => {
    state.answers = [];
    state.result = null;
    document.querySelector("#checklistForm").reset();
    showStep("profile");
  });

  document.querySelector("#downloadReport").addEventListener("click", () => {
    if (state.result) downloadReport(state.result);
  });

  document.querySelector("#clearHistory").addEventListener("click", () => {
    if (!getSavedAssessments().length) return;
    const confirmed = confirm("Clear saved SecureStart reports from this browser?");
    if (!confirmed) return;
    localStorage.removeItem(storageKey);
    renderSavedAssessments();
  });

  document.querySelectorAll("[data-resource]").forEach((button) => {
    button.addEventListener("click", () => openResource(button.dataset.resource));
  });

  document.querySelector("#closeResource").addEventListener("click", closeResource);
  document.querySelector("#closeResourceBottom").addEventListener("click", closeResource);
  document.querySelector("#downloadResource").addEventListener("click", downloadActiveResource);
  document.querySelector("#resourceModal").addEventListener("click", (event) => {
    if (event.target.id === "resourceModal") closeResource();
  });
}

function showStep(stepName) {
  Object.entries(steps).forEach(([name, element]) => {
    element.classList.toggle("active", name === stepName);
  });

  document.querySelectorAll("#stepList li").forEach((item) => {
    item.classList.toggle("active", item.dataset.stepLabel === stepName);
  });

  document.querySelector("#assessment").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderQuestions() {
  const container = document.querySelector("#questionGroups");
  container.innerHTML = categories
    .map((category) => {
      const questions = category.questions
        .map((question) => {
          const answers = question.answers
            .map(([label, points]) => {
              return `
                <label>
                  <input type="radio" name="${question.id}" value="${points}" data-label="${escapeHtml(label)}" required />
                  <span>${label}</span>
                </label>
              `;
            })
            .join("");

          return `
            <div class="question-card">
              <div class="question-title">${question.text}</div>
              <div class="answer-row">${answers}</div>
            </div>
          `;
        })
        .join("");

      return `
        <section class="question-category" aria-label="${category.name}">
          <h4>${category.name}</h4>
          ${questions}
        </section>
      `;
    })
    .join("");
}

function collectAnswers(form) {
  return categories.flatMap((category) => {
    return category.questions
      .map((question) => {
        const value = form.get(question.id);
        if (value === null) return null;
        const input = document.querySelector(`input[name="${question.id}"]:checked`);
        return {
          questionId: question.id,
          question: question.text,
          category: category.name,
          answer: input.dataset.label,
          riskPoints: Number(value)
        };
      })
      .filter(Boolean);
  });
}

function buildResult() {
  const rawRiskPoints = state.answers.reduce((sum, answer) => sum + answer.riskPoints, 0);
  const categoryDetails = buildCategoryDetails(state.answers, state.profile);
  const categoryScores = Object.fromEntries(
    Object.entries(categoryDetails).map(([category, detail]) => [category, detail.score])
  );
  const activeDetails = Object.values(categoryDetails).filter((detail) => detail.applicable);
  const weightedTotal = activeDetails.reduce((sum, detail) => sum + detail.score * detail.weight, 0);
  const totalWeight = activeDetails.reduce((sum, detail) => sum + detail.weight, 0);
  const totalScore = totalWeight ? Math.round(weightedTotal / totalWeight) : 0;
  const riskLevel = getRiskLevel(totalScore);
  const recommendations = getRecommendations(state.answers, state.profile, categoryScores);
  const profileInsights = getProfileInsights(state.profile, categoryScores);

  return {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    organization: state.profile,
    answers: state.answers,
    rawRiskPoints,
    totalScore,
    riskLevel,
    categoryScores,
    categoryDetails,
    recommendations,
    profileInsights,
    scoringSummary:
      "Each risk area is scored from 0 to 100 first, then the active areas are averaged. Website risk is skipped when an organization has no website. Data and access receive slightly more weight when the profile makes those risks more important.",
    createdAt: new Date().toISOString()
  };
}

function getRiskLevel(score) {
  return riskLevels.find((level) => score <= level.max).label;
}

function getRiskExplanation(level) {
  const explanations = {
    Low: "Your basics look healthy. Keep reviewing access and recovery details when people change roles.",
    Moderate: "You have a workable base, but a few preventable risks could create trouble during a busy week.",
    High: "Several habits could make account recovery, data protection, or admin control difficult after an incident.",
    Critical: "Your organization should fix the highest-risk basics soon, especially account protection and recovery planning."
  };
  return explanations[level];
}

function buildCategoryDetails(answers, profile) {
  return categories.reduce((details, category) => {
    const categoryAnswers = answers.filter((answer) => answer.category === category.name);
    const raw = categoryAnswers.reduce((sum, answer) => sum + answer.riskPoints, 0);
    const max = category.questions.reduce((sum, question) => {
      return sum + Math.max(...question.answers.map((answer) => answer[1]));
    }, 0);
    const applicable = isCategoryApplicable(category.name, profile);
    const weight = getCategoryWeight(category.name, profile);

    details[category.name] = {
      raw,
      max,
      score: max ? Math.round((raw / max) * 100) : 0,
      applicable,
      weight
    };
    return details;
  }, {});
}

function isCategoryApplicable(categoryName, profile) {
  if (categoryName === "Website and Domain Safety" && profile && !profile.hasWebsite) return false;
  return true;
}

function getCategoryWeight(categoryName, profile) {
  if (!profile) return 1;
  if (categoryName === "Data Protection" && profile.handlesSensitiveData) return 1.25;
  if (categoryName === "Access Control" && ["51-100", "100+"].includes(profile.size)) return 1.15;
  if (categoryName === "Website and Domain Safety" && profile.hasWebsite) return 1.1;
  return 1;
}

function getProfileInsights(profile, categoryScores) {
  const insights = [];

  if (!profile) return insights;

  if (profile.handlesSensitiveData) {
    insights.push("Because this organization handles customer or member data, data access and backup habits receive extra attention.");
  } else {
    insights.push("Because this organization does not report handling customer or member data, SecureStart focuses more on account access and recovery basics.");
  }

  if (profile.hasWebsite) {
    insights.push("Website ownership is included because the profile says this organization has a website.");
  } else {
    insights.push("Website risk is not included in the overall score because the profile says this organization has no website.");
  }

  if (["51-100", "100+"].includes(profile.size) && categoryScores["Access Control"] >= 25) {
    insights.push("Larger groups tend to change roles more often, so access review matters more for this profile.");
  }

  return insights;
}

function getRecommendations(answers, profile, categoryScores) {
  const riskyIds = answers.filter((answer) => answer.riskPoints >= 2).map((answer) => answer.questionId);
  const riskTriggered = recommendationBank
    .map((recommendation) => {
      const hits = recommendation.match.filter((id) => riskyIds.includes(id)).length;
      return { ...recommendation, hits };
    })
    .filter((recommendation) => recommendation.hits > 0)
    .sort((a, b) => b.hits - a.hits || priorityRank(a.priority) - priorityRank(b.priority))
    .map(({ hits, ...recommendation }) => recommendation);

  const profileTriggered = getProfileRecommendations(profile, categoryScores);
  return dedupeRecommendations([...riskTriggered, ...profileTriggered]).slice(0, 5);
}

function getProfileRecommendations(profile, categoryScores) {
  if (!profile) return [];
  const recommendations = [];

  if (profile.handlesSensitiveData && categoryScores["Data Protection"] >= 25) {
    recommendations.push({
      title: "Write a data handling note",
      explanation: "For member, customer, donor, or payment-related data, document what you store, why you need it, and who can access it.",
      priority: "High",
      difficulty: "Easy",
      relatedCategory: "Data Protection"
    });
  }

  if (profile.hasWebsite && categoryScores["Website and Domain Safety"] >= 25) {
    recommendations.push({
      title: "Assign a website owner",
      explanation: "Name one primary owner and one backup owner for the domain, hosting, website editor, and renewal details.",
      priority: "Medium",
      difficulty: "Easy",
      relatedCategory: "Website and Domain Safety"
    });
  }

  if (["51-100", "100+"].includes(profile.size) && categoryScores["Access Control"] >= 25) {
    recommendations.push({
      title: "Schedule access reviews",
      explanation: "For larger groups, review admins monthly or after each leadership, staff, or volunteer change.",
      priority: "Medium",
      difficulty: "Easy",
      relatedCategory: "Access Control"
    });
  }

  return recommendations;
}

function dedupeRecommendations(recommendations) {
  const seen = new Set();
  return recommendations.filter((recommendation) => {
    if (seen.has(recommendation.title)) return false;
    seen.add(recommendation.title);
    return true;
  });
}

function priorityRank(priority) {
  return { High: 0, Medium: 1, Low: 2 }[priority] ?? 3;
}

function renderResults(result) {
  const organization = result.organization || { name: "Organization" };
  const content = document.querySelector("#resultsContent");
  const safeLevel = safeRiskLevel(result.riskLevel);
  const riskClass = `risk-${safeLevel.toLowerCase()}`;
  const categoryDetails = result.categoryDetails || {};
  const categoryTiles = Object.entries(result.categoryScores || {})
    .map(([category, score]) => {
      const detail = categoryDetails[category];
      const safeCategory = escapeHtml(category);
      const safeScore = safeNumber(score);
      const detailText = detail
        ? `${safeNumber(detail.raw)}/${safeNumber(detail.max)} raw points${detail.applicable ? "" : " | not counted"}`
        : "legacy saved score";
      return `
        <div class="category-tile">
          <strong>${safeScore}</strong>
          <span>${safeCategory}</span>
          <small>${detailText}</small>
        </div>
      `;
    })
    .join("");

  const profileInsights = (result.profileInsights || [])
    .map((insight) => `<li>${escapeHtml(insight)}</li>`)
    .join("");

  const safeRecommendations = Array.isArray(result.recommendations) ? result.recommendations : [];
  const recommendations = safeRecommendations.length
    ? safeRecommendations
        .map((item) => {
          return `
            <article class="recommendation-card">
              <div class="tag-row">
                <span class="tag">${escapeHtml(item.priority)} priority</span>
                <span class="tag">${escapeHtml(item.difficulty)}</span>
              </div>
              <h4>${escapeHtml(item.title)}</h4>
              <p>${escapeHtml(item.explanation)}</p>
            </article>
          `;
        })
        .join("")
    : `
      <article class="recommendation-card">
        <div class="tag-row">
          <span class="tag">Maintenance</span>
        </div>
        <h4>No urgent fixes found</h4>
        <p>Your answers did not trigger a high-risk recommendation. Recheck access, backups, and recovery details whenever people change roles.</p>
      </article>
    `;

  content.innerHTML = `
    <div class="score-card">
      <div class="score-orb">
        <div>
          <strong>${safeNumber(result.totalScore)}</strong>
          <span>/100 normalized risk</span>
        </div>
      </div>
      <div class="terminal-card">
        <div class="terminal-bar" aria-hidden="true"><span></span><span></span><span></span></div>
        <span class="risk-label ${riskClass}">${safeLevel} Risk</span>
        <h4>${escapeHtml(organization.name)}</h4>
        <p>${getRiskExplanation(safeLevel)}</p>
        <p class="score-method">${escapeHtml(result.scoringSummary || "This saved report uses the earlier raw-point scoring model.")}</p>
      </div>
    </div>
    <div class="profile-insights">
      <h4>Profile context</h4>
      <ul>${profileInsights}</ul>
    </div>
    <div class="category-breakdown">${categoryTiles}</div>
    <div class="recommendation-list">${recommendations}</div>
  `;
}

function saveAssessment(result) {
  const existing = getSavedAssessments();
  const next = [result, ...existing].slice(0, 8);
  localStorage.setItem(storageKey, JSON.stringify(next));
}

function getSavedAssessments() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey)) || [];
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeAssessment).filter(Boolean);
  } catch {
    return [];
  }
}

function normalizeAssessment(item) {
  if (!item || typeof item !== "object") return null;

  const organization = item.organization && typeof item.organization === "object" ? item.organization : {};
  const categoryScores = normalizeCategoryScores(item.categoryScores);
  const categoryDetails = normalizeCategoryDetails(item.categoryDetails);
  const recommendations = Array.isArray(item.recommendations)
    ? item.recommendations.map(normalizeRecommendation).filter(Boolean).slice(0, 5)
    : [];

  return {
    id: safeText(item.id || String(Date.now())),
    organization: {
      name: safeText(organization.name || "Saved organization"),
      type: safeText(organization.type || "Unknown"),
      size: safeText(organization.size || "Unknown"),
      hasWebsite: Boolean(organization.hasWebsite),
      websiteUrl: safeText(organization.websiteUrl || ""),
      handlesSensitiveData: Boolean(organization.handlesSensitiveData)
    },
    answers: Array.isArray(item.answers) ? item.answers.map(normalizeAnswer).filter(Boolean) : [],
    rawRiskPoints: safeNumber(item.rawRiskPoints),
    totalScore: safeNumber(item.totalScore),
    riskLevel: safeRiskLevel(item.riskLevel),
    categoryScores,
    categoryDetails,
    recommendations,
    profileInsights: Array.isArray(item.profileInsights) ? item.profileInsights.map(safeText).slice(0, 4) : [],
    scoringSummary: safeText(item.scoringSummary || ""),
    createdAt: validDateString(item.createdAt)
  };
}

function normalizeCategoryScores(scores) {
  const normalized = {};
  if (!scores || typeof scores !== "object") return normalized;

  Object.entries(scores).forEach(([category, score]) => {
    if (!categoryNames.has(category)) return;
    normalized[category] = safeNumber(score);
  });

  return normalized;
}

function normalizeCategoryDetails(details) {
  const normalized = {};
  if (!details || typeof details !== "object") return normalized;

  Object.entries(details).forEach(([category, detail]) => {
    if (!categoryNames.has(category) || !detail || typeof detail !== "object") return;
    normalized[category] = {
      raw: safeNumber(detail.raw),
      max: safeNumber(detail.max),
      score: safeNumber(detail.score),
      applicable: Boolean(detail.applicable),
      weight: Number.isFinite(Number(detail.weight)) ? Math.max(0, Math.min(Number(detail.weight), 5)) : 1
    };
  });

  return normalized;
}

function normalizeAnswer(answer) {
  if (!answer || typeof answer !== "object" || !categoryNames.has(answer.category)) return null;
  return {
    questionId: safeText(answer.questionId),
    question: safeText(answer.question),
    category: answer.category,
    answer: safeText(answer.answer),
    riskPoints: safeNumber(answer.riskPoints)
  };
}

function normalizeRecommendation(recommendation) {
  if (!recommendation || typeof recommendation !== "object") return null;
  return {
    title: safeText(recommendation.title),
    explanation: safeText(recommendation.explanation),
    priority: safeText(recommendation.priority || "Medium"),
    difficulty: safeText(recommendation.difficulty || "Medium"),
    relatedCategory: categoryNames.has(recommendation.relatedCategory) ? recommendation.relatedCategory : "Account Security"
  };
}

function renderSavedAssessments() {
  const container = document.querySelector("#savedAssessments");
  const saved = getSavedAssessments();
  document.querySelector("#clearHistory").disabled = !saved.length;

  if (!saved.length) {
    container.innerHTML = `
      <article class="saved-card">
        <h3>No saved reports yet</h3>
        <p>Complete an assessment and the report will appear here on this device.</p>
      </article>
    `;
    return;
  }

  container.innerHTML = saved
    .map((item) => {
      const date = new Date(item.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
      const safeLevel = safeRiskLevel(item.riskLevel);
      return `
        <article class="saved-card">
          <span class="risk-label risk-${safeLevel.toLowerCase()}">${safeLevel} Risk</span>
          <h3>${escapeHtml(item.organization.name)}</h3>
          <p>${date} | ${safeNumber(item.totalScore)}/100 normalized risk</p>
          <button class="button button-secondary button-small" type="button" data-open-report="${escapeHtml(item.id)}">Open Report</button>
        </article>
      `;
    })
    .join("");

  container.querySelectorAll("[data-open-report]").forEach((button) => {
    button.addEventListener("click", () => {
      const report = getSavedAssessments().find((item) => item.id === button.dataset.openReport);
      if (!report) return;
      state.profile = report.organization;
      state.answers = report.answers;
      state.result = report;
      renderResults(report);
      showStep("results");
    });
  });
}

function openResource(resourceId) {
  const resource = resourceLibrary[resourceId];
  if (!resource) return;

  state.activeResource = resourceId;
  document.querySelector("#resourceTitle").textContent = resource.title;
  document.querySelector("#resourceBody").innerHTML = resource.html;
  document.querySelector("#resourceModal").classList.remove("hidden");
  document.querySelector("#closeResource").focus();
}

function closeResource() {
  document.querySelector("#resourceModal").classList.add("hidden");
  state.activeResource = null;
}

function downloadActiveResource() {
  const resource = resourceLibrary[state.activeResource];
  if (!resource) return;
  downloadText(`${slugify(resource.title)}.md`, resource.markdown);
}

function downloadReport(result) {
  const organization = result.organization || {};
  const categoryLines = Object.entries(result.categoryScores || {})
    .map(([category, score]) => {
      const detail = result.categoryDetails && result.categoryDetails[category];
      const raw = detail ? ` (${safeNumber(detail.raw)}/${safeNumber(detail.max)} raw points${detail.applicable ? "" : ", not counted"})` : "";
      return `- ${safeText(category)}: ${safeNumber(score)}/100${raw}`;
    })
    .join("\n");
  const recommendationLines = (Array.isArray(result.recommendations) ? result.recommendations : [])
    .map((item) => `- ${safeText(item.title)} (${safeText(item.priority)}, ${safeText(item.difficulty)}): ${safeText(item.explanation)}`)
    .join("\n");
  const profileLines = (result.profileInsights || []).map((insight) => `- ${safeText(insight)}`).join("\n");

  const report = `# SecureStart Report

Organization: ${safeText(organization.name || "Organization")}
Type: ${safeText(organization.type || "Unknown")}
People: ${safeText(organization.size || "Unknown")}
Website included: ${organization.hasWebsite ? "Yes" : "No"}
Handles customer or member data: ${organization.handlesSensitiveData ? "Yes" : "No"}
Date: ${new Date(result.createdAt).toLocaleDateString()}

Risk score: ${safeNumber(result.totalScore)}/100 normalized risk
Raw checklist points: ${safeNumber(result.rawRiskPoints)}
Risk level: ${safeRiskLevel(result.riskLevel)}

Scoring note: ${safeText(result.scoringSummary || "This saved report uses the earlier raw-point scoring model.")}

## Profile Context
${profileLines || "- No profile-specific notes."}

## Category Breakdown
${categoryLines}

## Recommended Next Steps
${recommendationLines || "- No urgent fixes were triggered by this assessment."}
`;

  downloadText(`${slugify(organization.name)}-securestart-report.md`, report);
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function slugify(value) {
  return safeText(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "securestart";
}

function safeText(value) {
  return String(value ?? "").replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 500);
}

function safeNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.max(0, Math.min(Math.round(number), 100));
}

function safeRiskLevel(level) {
  return allowedRiskLevels.has(level) ? level : "Low";
}

function validDateString(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

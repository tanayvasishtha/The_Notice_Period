export const generateWorkplaceScenario = (step: number, playerChoices: string[]): string => {
  const scenarios = [
    "Your boss schedules a 'quick sync' that lasts 2 hours about nothing important",
    "HR announces a new policy that contradicts the policy they announced yesterday",
    "The coffee machine breaks and productivity drops 73%",
    "Someone replies-all to a company-wide email to say 'please remove me from this list'",
    "Your computer crashes and IT says it'll be 'a few days' to fix it",
    "The office temperature is either arctic tundra or surface of the sun",
    "A coworker microwaves fish in the break room during your lunch break",
    "Management announces a 'fun' mandatory team building exercise",
    "The printer jams every time you have an important deadline",
    "Someone steals your lunch from the fridge (again)"
  ];
  
  return scenarios[step % scenarios.length] || scenarios[0];
};

export const generateBuzzwords = (): string[] => {
  return [
    "synergistic solutions",
    "paradigm shifts", 
    "disruptive innovation",
    "thought leadership",
    "growth hacking",
    "blockchain-enabled",
    "AI-powered optimization",
    "scalable frameworks",
    "agile methodologies",
    "customer-centric approaches",
    "data-driven insights",
    "cross-functional collaboration",
    "strategic initiatives",
    "value propositions",
    "core competencies"
  ];
};

export const generateRedditPost = (step: number, stressLevel: number, choice: string): string => {
  const stressEmojis = stressLevel > 80 ? "😵💀🔥" : stressLevel > 60 ? "😰😤😮‍💨" : stressLevel > 40 ? "😅😬🙃" : "😊🤔😐";
  
  const posts = [
    `Day ${step}: ${choice} ${stressEmojis}`,
    `Update Day ${step}: Corporate life is... something. ${choice} ${stressEmojis}`,
    `Day ${step} of my corporate journey: ${choice} Anyone else? ${stressEmojis}`,
    `Corporate Diary Day ${step}: ${choice} Send help ${stressEmojis}`,
    `Day ${step}: ${choice} Is this normal? ${stressEmojis}`
  ];
  
  return posts[step % posts.length] || posts[0];
};

export const generateMeetingTopics = (): string[] => {
  return [
    "Syncing on the sync about the previous sync",
    "Aligning our alignment on strategic alignment",
    "Circling back on the circle back action items",
    "Deep diving into shallow end solutions",
    "Touching base about touching base protocols",
    "Leveraging our leverage for maximum leverage",
    "Optimizing our optimization optimization",
    "Streamlining the streamlining process",
    "Ideating on ideation methodologies",
    "Brainstorming about brainstorming best practices"
  ];
};

export const generatePerformanceReviewComments = (): string[] => {
  return [
    "Needs to be more proactive about things we never mentioned",
    "Should have anticipated problems we didn't tell them about",
    "Lacks initiative in areas outside their job description",
    "Needs to improve communication by reading our minds better",
    "Should be more of a team player while working completely alone",
    "Needs to show more leadership without any authority",
    "Should be more flexible with completely inflexible deadlines",
    "Needs to work smarter, not harder (but also harder)",
    "Should take more ownership of other people's mistakes",
    "Needs to be more innovative within our rigid framework"
  ];
};
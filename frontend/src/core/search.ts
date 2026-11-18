// Search, Fuzzy Autocomplete, and Classification Engine for Similapunktur

/**
 * Computes standard Levenshtein edit distance between two strings
 */
export function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,    // deletion
          dp[i][j - 1] + 1,    // insertion
          dp[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }
  return dp[m][n];
}

/**
 * Computes fuzzy match score of a suggestion string against a single query term
 */
export function scoreSingleSuggestion(suggestion: string, query: string): number {
  const s = suggestion.toLowerCase();
  const q = query.toLowerCase();

  if (s === q) return 100;
  if (s.startsWith(q)) return 90;

  const idx = s.indexOf(q);
  if (idx !== -1) {
    if (idx > 0 && (s[idx - 1] === ' ' || s[idx - 1] === '-')) {
      return 85;
    }
    return 70;
  }

  const words = s.split(/[\s,.-]+/);
  let bestWordScore = 0;

  for (const word of words) {
    if (word.length < 3) continue;

    if (word.startsWith(q)) {
      bestWordScore = Math.max(bestWordScore, 80);
      continue;
    }

    const qLen = q.length;
    if (qLen >= 3) {
      const maxDistance = qLen <= 4 ? 1 : 2;
      let minWordDist = 999;

      for (let len = Math.max(3, qLen - 1); len <= Math.min(word.length, qLen + 1); len++) {
        const prefix = word.substring(0, len);
        const dist = levenshteinDistance(q, prefix);
        if (dist < minWordDist) {
          minWordDist = dist;
        }
      }

      if (minWordDist <= maxDistance) {
        const score = 60 - minWordDist * 15;
        bestWordScore = Math.max(bestWordScore, score);
      }
    }
  }

  return bestWordScore;
}

/**
 * Extracts synonyms for a search query using the provided synonyms dictionary
 */
export function getClientSynonyms(query: string, synonymsData: Record<string, string[]> = {}): string[] {
  const clean = query.trim().toLowerCase();
  const words = clean.match(/[a-zA-ZäöüÄÖÜßéèàáíóúñ]+/g) || [];
  const syns = new Set<string>();
  words.forEach(w => {
    if (synonymsData[w]) {
      synonymsData[w].forEach(s => syns.add(s));
    }
  });
  return Array.from(syns);
}

/**
 * Scores a suggestion considering the base query and all applicable synonyms
 */
export function scoreSuggestion(
  suggestion: string,
  query: string,
  synonymsData: Record<string, string[]> = {}
): number {
  const s = suggestion.toLowerCase();
  const q = query.toLowerCase().trim();

  // Multi-word AND search: all tokens (>= 2 chars) must match (including synonyms & Levenshtein)
  const tokens = q.split(/\s+/).filter(t => t.length >= 2);
  if (tokens.length > 1) {
    let totalScore = 0;
    for (const tok of tokens) {
      const tokSyns = getClientSynonyms(tok, synonymsData);
      const tokTerms = [tok, ...tokSyns];
      let bestTokScore = 0;
      for (const term of tokTerms) {
        const sc = scoreSingleSuggestion(s, term);
        const finalSc = term === tok ? sc : sc * 0.92;
        if (finalSc > bestTokScore) {
          bestTokScore = finalSc;
        }
      }
      if (bestTokScore === 0) {
        return 0; // AND semantics: every token must match
      }
      totalScore += bestTokScore;
    }
    return Math.round(totalScore / tokens.length);
  }

  const querySyns = getClientSynonyms(q, synonymsData);
  const terms = [q, ...querySyns];

  let bestScore = 0;
  for (const term of terms) {
    const score = scoreSingleSuggestion(s, term);
    // Slight penalty to synonym matches so exact term matches rank first
    const finalScore = term === q ? score : score * 0.92;
    if (finalScore > bestScore) {
      bestScore = finalScore;
    }
  }

  return bestScore;
}

/**
 * Filters and ranks a list of suggestions by match score
 */
export function filterAndRankSuggestions(
  suggestionsList: string[],
  query: string,
  synonymsData: Record<string, string[]> = {},
  limit = 10
): Array<{ text: string; score: number }> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const trimmed = query.trim();
  return suggestionsList
    .map(s => ({ text: s, score: scoreSuggestion(s, trimmed, synonymsData) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Classifies symptom text into an organ system / clinical category
 */
export function classifySymptomStatic(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("kopf") || t.includes("gehirn") || t.includes("nerv") || t.includes("schwindel") || t.includes("migrän") || t.includes("krampf")) return "Kopf & Nervensystem";
  if (t.includes("gemüt") || t.includes("geist") || t.includes("schlaf") || t.includes("traum") || t.includes("angst") || t.includes("traurig") || t.includes("unruh") || t.includes("hyster") || t.includes("reizbar")) return "Gemüt & Psyche";
  if (t.includes("herz") || t.includes("puls") || t.includes("blut") || t.includes("ader") || t.includes("gefäß") || t.includes("angina")) return "Herz & Kreislauf";
  if (t.includes("magen") || t.includes("darm") || t.includes("verdau") || t.includes("appetit") || t.includes("übel") || t.includes("erbr") || t.includes("leber") || t.includes("galle") || t.includes("abdomen") || t.includes("stuhl")) return "Magen & Verdauung";
  if (t.includes("lung") || t.includes("atmung") || t.includes("hust") || t.includes("kehlkopf") || t.includes("nase") || t.includes("hals") || t.includes("heiser") || t.includes("atemnot") || t.includes("schnupf")) return "Atmung & Hals";
  if (t.includes("urin") || t.includes("blas") || t.includes("nier") || t.includes("mens") || t.includes("uter") || t.includes("gebärmutter") || t.includes("schwanger")) return "Urogenitaltrakt";
  if (t.includes("haut") || t.includes("juck") || t.includes("ausschlag") || t.includes("schwitz") || t.includes("schwell") || t.includes("geschwür") || t.includes("ekzem")) return "Haut & Äußeres";
  return "Bewegungsapparat & Allgemeines";
}

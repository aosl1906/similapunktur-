import { describe, it, expect } from 'vitest';
import {
  levenshteinDistance,
  scoreSingleSuggestion,
  scoreSuggestion,
  filterAndRankSuggestions,
  classifySymptomStatic,
  getClientSynonyms
} from '../search';

describe('Search and Autocomplete Core Engine', () => {
  it('calculates levenshteinDistance correctly', () => {
    expect(levenshteinDistance('kopf', 'kopf')).toBe(0);
    expect(levenshteinDistance('kopf', 'kopfe')).toBe(1);
    expect(levenshteinDistance('kopf', 'topf')).toBe(1);
    expect(levenshteinDistance('', 'test')).toBe(4);
  });

  it('scores exact and prefix matches with highest scores', () => {
    expect(scoreSingleSuggestion('Kopfschmerz', 'kopfschmerz')).toBe(100);
    expect(scoreSingleSuggestion('Kopfschmerz drückend', 'kopf')).toBe(90);
  });

  it('handles fuzzy matching on typos', () => {
    // Single letter typo on 5-character word: "migran" vs "migräne"
    const score = scoreSingleSuggestion('Migräne mit Aura', 'migran');
    expect(score).toBeGreaterThan(0);
  });

  it('filters and ranks suggestions by score', () => {
    const list = [
      'Husten trocken',
      'Kopfschmerz drückend',
      'Husten bellend',
      'Kopfschmerz stechend'
    ];
    const results = filterAndRankSuggestions(list, 'kopf');
    expect(results.length).toBe(2);
    expect(results[0].text).toContain('Kopfschmerz');
  });

  it('expands query terms with synonyms', () => {
    const synonymsData = {
      'schmerz': ['weh', 'dolor', 'beschwerde']
    };
    const syns = getClientSynonyms('schmerz', synonymsData);
    expect(syns).toEqual(expect.arrayContaining(['weh', 'dolor']));

    // Scoring with synonym
    const score = scoreSuggestion('Kopfweh', 'schmerz', synonymsData);
    expect(score).toBeGreaterThan(0);
  });

  it('classifies symptoms into correct clinical categories', () => {
    expect(classifySymptomStatic('Starker Kopfschmerz mit Schwindel')).toBe('Kopf & Nervensystem');
    expect(classifySymptomStatic('Angst vor der Dunkelheit und Schlaflosigkeit')).toBe('Gemüt & Psyche');
    expect(classifySymptomStatic('Herzklopfen und Angina pectoris')).toBe('Herz & Kreislauf');
    expect(classifySymptomStatic('Übelkeit nach fettem Essen')).toBe('Magen & Verdauung');
    expect(classifySymptomStatic('Reizhusten und Heiserkeit')).toBe('Atmung & Hals');
    expect(classifySymptomStatic('Schmerzhafte Blasenentzündung')).toBe('Urogenitaltrakt');
    expect(classifySymptomStatic('Juckender Hautausschlag')).toBe('Haut & Äußeres');
    expect(classifySymptomStatic('Kniegelenksschmerzen')).toBe('Bewegungsapparat & Allgemeines');
  });

  it('supports multi-word AND search regardless of order and with typos', () => {
    const list = [
      '[Boericke] Kopf > Kopfschmerz (Cephalalgie) > Bewegung',
      '[Boericke] Gemüt > Angst > Sturm, Gewitter, während',
      '[Boericke] Schwindel > Bewegung, bei'
    ];
    const results = filterAndRankSuggestions(list, 'bewegnug kopf');
    expect(results.length).toBe(1);
    expect(results[0].text).toContain('Kopfschmerz');
  });
});

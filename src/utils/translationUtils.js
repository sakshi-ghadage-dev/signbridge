export const ENGLISH_TO_MARATHI = {
  'Hello': 'नमस्कार',
  'Thank You': 'धन्यवाद',
  'Yes': 'हो',
  'No': 'नाही',
  'Help': 'मदत',
  'Please': 'कृपया',
  'Sorry': 'माफ करा',
  'Good': 'चांगले',
  'Bad': 'वाईट',
  'Water': 'पाणी',
  'Food': 'अन्न',
  'Home': 'घर',
  'Family': 'कुटुंब',
  'Friend': 'मित्र',
  'Love': 'प्रेम',
  'Stop': 'थांबा',
  'Doctor': 'डॉक्टर',
  'School': 'शाळा',
};

export const MARATHI_TO_ENGLISH = Object.fromEntries(
  Object.entries(ENGLISH_TO_MARATHI).map(([key, value]) => [value, key])
);

export function translateToMarathi(text) {
  if (!text) return '';
  return text
    .split(' ')
    .map((word) => ENGLISH_TO_MARATHI[word] || ENGLISH_TO_MARATHI[capitalize(word)] || word)
    .join(' ');
}

export function translateToEnglish(text) {
  if (!text) return '';
  return text
    .split(' ')
    .map((word) => MARATHI_TO_ENGLISH[word] || word)
    .join(' ');
}

export function getSignDescription(text) {
  if (!text) return '';

  const normalized = text.toLowerCase();

  if (normalized.includes('hello')) {
    return 'Raise your open palm near shoulder level and move it gently side to side to indicate greeting.';
  }

  if (normalized.includes('help')) {
    return 'Place one hand flat and use the thumb of the other hand upward on the palm, then lift both hands slightly.';
  }

  if (normalized.includes('thank')) {
    return 'Touch fingers near the chin and move the hand outward respectfully.';
  }

  if (normalized.includes('water')) {
    return 'Form a W-like finger shape and tap gently near the chin to indicate water.';
  }

  if (normalized.includes('food')) {
    return 'Bring fingers together and tap near the mouth to indicate food or eating.';
  }

  return 'Break the sentence into important keywords and perform each sign clearly with visible hand movement and facial expression.';
}

export function speakText(text, lang = 'en-US') {
  if (!('speechSynthesis' in window) || !text) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

function capitalize(word) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
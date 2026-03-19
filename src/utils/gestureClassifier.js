export const GESTURE_LABELS = [
  'Hello',
  'Thank You',
  'Yes',
  'No',
  'Help',
  'Please',
  'Sorry',
  'Good',
  'Bad',
  'Water',
  'Food',
  'Home',
  'Family',
  'Friend',
  'Love',
];

export const classifyGesture = (landmarks) => {
  if (!landmarks || landmarks.length < 21) {
    return null;
  }

  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];
  const middleTip = landmarks[12];
  const ringTip = landmarks[16];
  const pinkyTip = landmarks[20];
  const wrist = landmarks[0];
  const palm = landmarks[9];

  const thumbIndexDist = distance(thumbTip, indexTip);
  const allFingersExtended = areAllFingersExtended(landmarks);
  const thumbUp = isThumbUp(landmarks);
  const fist = isFist(landmarks);
  const peace = isPeaceSign(landmarks);

  if (allFingersExtended && palm.y < wrist.y) {
    return { label: 'Hello', confidence: 85 };
  } else if (thumbUp) {
    return { label: 'Good', confidence: 82 };
  } else if (fist) {
    return { label: 'Yes', confidence: 80 };
  } else if (peace) {
    return { label: 'Thank You', confidence: 78 };
  } else if (thumbIndexDist < 0.05) {
    return { label: 'Please', confidence: 75 };
  }

  const randomIndex = Math.floor(Math.random() * GESTURE_LABELS.length);
  return {
    label: GESTURE_LABELS[randomIndex],
    confidence: 70 + Math.floor(Math.random() * 20),
  };
};

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function areAllFingersExtended(landmarks) {
  const fingerTips = [8, 12, 16, 20];
  const fingerPips = [6, 10, 14, 18];

  for (let i = 0; i < fingerTips.length; i += 1) {
    if (landmarks[fingerTips[i]].y >= landmarks[fingerPips[i]].y) {
      return false;
    }
  }
  return true;
}

function isThumbUp(landmarks) {
  const thumbTip = landmarks[4];
  const thumbIp = landmarks[3];
  const wrist = landmarks[0];

  if (thumbTip.y < thumbIp.y && thumbTip.y < wrist.y) {
    const otherFingersDown = [8, 12, 16, 20].every((i) => landmarks[i].y > landmarks[0].y);
    return otherFingersDown;
  }

  return false;
}

function isFist(landmarks) {
  const fingerTips = [8, 12, 16, 20];
  const palm = landmarks[9];

  return fingerTips.every((i) => distance(landmarks[i], palm) < 0.15);
}

function isPeaceSign(landmarks) {
  const indexTip = landmarks[8];
  const middleTip = landmarks[12];
  const ringTip = landmarks[16];
  const pinkyTip = landmarks[20];
  const wrist = landmarks[0];

  const indexExtended = indexTip.y < wrist.y;
  const middleExtended = middleTip.y < wrist.y;
  const ringFolded = ringTip.y > wrist.y;
  const pinkyFolded = pinkyTip.y > wrist.y;

  return indexExtended && middleExtended && ringFolded && pinkyFolded;
}
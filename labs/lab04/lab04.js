// Lab 04 – Trail Recommender and Distance Converter

// ─── Trail data (do not modify) ──────────────────────────────────────────
const trails = [
  { name: 'Lakeside Loop',       distance: 2.5,  hours: 1.5, level: 'beginner' },
  { name: 'Ridgeline Path',      distance: 5,    hours: 3,   level: 'beginner' },
  { name: 'Canyon Crossing',     distance: 8,    hours: 4.5, level: 'intermediate' },
  { name: 'Summit Approach',     distance: 12,   hours: 6,   level: 'intermediate' },
  { name: 'Granite Peak',        distance: 16,   hours: 7,   level: 'advanced' },
  { name: 'Wilderness Circuit',  distance: 20,   hours: 8,   level: 'advanced' },
];

// ─── DOM references ───────────────────────────────────────────────────────
const experienceSelect  = document.getElementById('experience');
const maxDistanceInput  = document.getElementById('max-distance');
const maxHoursInput     = document.getElementById('max-hours');
const findBtn           = document.getElementById('find-btn');
const recommendationDiv = document.getElementById('recommendation');

const incrementInput  = document.getElementById('increment');
const rowCountInput   = document.getElementById('row-count');
const generateBtn     = document.getElementById('generate-btn');
const tableOutputDiv  = document.getElementById('table-output');

// ─── Part 3: Trail recommender functions ─────────────────────────────────

// validateInputs(level, maxDistance, maxHours)
// Returns an error message string if any input is invalid, or null if all valid.
// Rules: level must be 'beginner'|'intermediate'|'advanced'
//        maxDistance must be 1–20
//        maxHours must be 1–8
function validateInputs(level, maxDistance, maxHours) {
  recommendationDiv.innerHTML = '';

  if (level !== 'beginner' && level !== 'intermediate' && level !== 'advanced') {
    const errMsg = document.createElement('p');
    errMsg.textContent = "Invalid experience level.";
    recommendationDiv.append(errMsg);
    return false;
  }
  if (maxDistance < 1 || maxDistance > 20) {
    const errMsg = document.createElement('p');
    errMsg.textContent = "Invalid distance.";
    recommendationDiv.append(errMsg);
    return false;
  }
  if (maxHours < 1 || maxHours > 8) {
    const errMsg = document.createElement('p');
    errMsg.textContent = "Invalid number of hours.";
    recommendationDiv.append(errMsg);
    return false;
  }

  return true;
}

// findTrail(level, maxDistance, maxHours)
// Returns the first trail matching all three criteria, or null if none match.
function findTrail(level, maxDistance, maxHours) {
  for (const trail of trails) {
    if (trail.level === level && trail.distance <= maxDistance && trail.hours <= maxHours) {
      return trail;
    }
  }

  return null;
}

// renderRecommendation(trail)
// Updates recommendationDiv.
// If trail is null: "No trail matches your criteria. Try adjusting your distance or time."
// If trail found: show name, distance, hours, and difficulty.
// Use createElement + textContent — no innerHTML.
function renderRecommendation(trail) {
  recommendationDiv.innerHTML = ''; // clear previous result
  const result = document.createElement('p');
  
  if (trail) {
    result.textContent = `Trail found: ${trail.name}:
                          \n- Distance: ${trail.distance} miles
                          \n- Hours: ${trail.hours}
                          \n- Difficulty: ${trail.level}`;
  } else {
    result.textContent = "No trail matches your criteria. Try adjusting your distance or time."; 
  }

  recommendationDiv.append(result);
}

// Button handler
findBtn.addEventListener('click', () => {
  // TODO: read values → validate → findTrail → renderRecommendation

  const level = document.querySelector('#experience').value;
  const maxDistance = Number(document.querySelector('#max-distance').value);
  const maxHours = Number(document.querySelector('#max-hours').value);

  if (validateInputs(level, maxDistance, maxHours)) {
    renderRecommendation(findTrail(level, maxDistance, maxHours));
  }
});

// ─── Part 4: Distance converter functions ────────────────────────────────

// milesToKm(miles)
// Returns miles converted to kilometers (miles × 1.60934), rounded to 2 decimal places.
function milesToKm(miles) {
  // TODO

  return Number((miles * 1.60934).toFixed(2));
}

// renderTable(increment, rows)
// Guard clauses: rows must be 1–20; increment must be >= 0.1
// Builds a <table> with columns Miles | Kilometers using createElement.
// Renders into tableOutputDiv.
function renderTable(increment, rows) {
  tableOutputDiv.innerHTML = ''; // clear previous result
  // TODO

  if (rows < 1 || rows > 20) {
    const errMsg = document.createElement('p');
    errMsg.textContent = "Invalid number of rows.";
    tableOutputDiv.append(errMsg);
    return;
  }
  if (increment < 0.1) {
    const errMsg = document.createElement('p');
    errMsg.textContent = "Invalid increment value.";
    tableOutputDiv.append(errMsg);
    return;
  } 

  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  const mileHeader = document.createElement('th');
  const kmHeader = document.createElement('th');

  mileHeader.textContent = 'Miles';
  kmHeader.textContent = 'Kilometers';
  headerRow.append(mileHeader, kmHeader);
  table.append(headerRow);

  let i = 1;

  for (i; i <= rows; ++i) {
    const row = document.createElement('tr');
    const mileData = document.createElement('td');
    const kmData = document.createElement('td');

    if (Number.isInteger(increment)) {
      mileData.textContent = i * increment;
    } else {
      mileData.textContent = (i * increment).toFixed(2);
    }
    
    kmData.textContent = milesToKm(i * increment);

    row.append(mileData, kmData);
    table.append(row);
  }

  tableOutputDiv.append(table);
}

generateBtn.addEventListener('click', () => {
  const increment = parseFloat(incrementInput.value);
  const rows      = parseInt(rowCountInput.value, 10);
  renderTable(increment, rows);
});
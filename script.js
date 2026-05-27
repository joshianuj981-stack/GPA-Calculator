
const grades = {
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D": 1.0,
  "F": 0.0
};

const weights = {
  "Regular": 0,
  "Honors": 0.5,
  "AP/IB": 1.0
};

function addRow() {
  const tbody = document.querySelector("#courseTable tbody");

  const row = document.createElement("tr");

  row.innerHTML = `
    <td><input type="text" placeholder="Ex: AP Chemistry"></td>

    <td>
      <select>
        <option>Fall</option>
        <option>Spring</option>
        <option>Full Year</option>
      </select>
    </td>

    <td><input type="number" min="0" step="0.5" value="1"></td>

    <td>
      <select>
        <option>Regular</option>
        <option>Honors</option>
        <option>AP/IB</option>
      </select>
    </td>

    <td>
      <select>
        ${Object.keys(grades).map(g => `<option value="${g}">${g}</option>`).join("")}
      </select>
    </td>

    <td>
      <button onclick="removeRow(this)">X</button>
    </td>
  `;

  tbody.appendChild(row);
}

function removeRow(button) {
  button.parentElement.parentElement.remove();
}

function calculateGPA() {
  const rows = document.querySelectorAll("#courseTable tbody tr");

  let totalCredits = 0;
  let totalPoints = 0;
  let weightedPoints = 0;

  rows.forEach(row => {
    const credits = parseFloat(row.children[2].querySelector("input").value);
    const level = row.children[3].querySelector("select").value;
    const grade = row.children[4].querySelector("select").value;

    const base = grades[grade];
    const weighted = base + weights[level];

    totalCredits += credits;
    totalPoints += base * credits;
    weightedPoints += weighted * credits;
  });

  const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  const weightedGPA = totalCredits ? (weightedPoints / totalCredits).toFixed(2) : "0.00";

  document.getElementById("gpa").textContent =
    `Unweighted GPA: ${gpa}`;

  document.getElementById("weighted").textContent =
    `Weighted GPA: ${weightedGPA}`;

  document.getElementById("credits").textContent =
    `Total Credits: ${totalCredits}`;
}

addRow();

//script file
//use your own students dataset
//dataset consist of SGPA,ROLL NO.,CGPA,M
const studentsData = [
    { rollNo: 73, name: "Mayank", sgpa1: 6.8, sgpa2: 6.26, sgpa3: 6.86, ygpa1: 6.55, cgpa: 6.64, mathScores: 17.3, photo: "download (1).jpg" },
    { rollNo: 74, name: "Arbaz", sgpa1: 7.4, sgpa2: 6.93, sgpa3: 7.18, ygpa1: 7.14, cgpa: 7.08, mathScores: 19.33, photo: "download (2).jpg" },
    { rollNo: 75, name: "Hussain", sgpa1: 6.63, sgpa2: 7.07, sgpa3: 6.64, ygpa1: 6.87, cgpa: 6.78, mathScores: 19.33, photo: "download (3).jpg" },
    { rollNo: 76, name: "sayeed", sgpa1: 7.86, sgpa2: 7.05, sgpa3: 5.04, ygpa1: 7.42, cgpa: 6.65, mathScores: 20, photo: "Clorlk on Instagram.jpg" },
    { rollNo: 77, name: "shaad", sgpa1: 5.54, sgpa2: 6.24, sgpa3: 5.89, ygpa1: 5.89, cgpa: 5.89, mathScores: 16.6, photo: "aaron cai __ i am not jessica chen __ ann liang.jpg" },
    { rollNo: 78, name: "shabab", sgpa1: 6.34, sgpa2: 5.44, sgpa3: 5.84, ygpa1: 5.89, cgpa: 5.87, mathScores: 9.66, photo: "aaron cai ✦ i am not jessica chen.jpg" },
    { rollNo: 80, name: "Mehuli", sgpa1: 8.34, sgpa2: 8.15, sgpa3: 8.55, ygpa1: 8.24, cgpa: 8.34, mathScores: 25.33, photo: "download (4).jpg"  },
    { rollNo: 81, name: "Mohit", sgpa1: 8.4, sgpa2: 8.27, sgpa3: 9, ygpa1: 8.33, cgpa: 8.55, mathScores: 22, photo: "julius gong aesthetic _ i hope this doesn’t find you.jpg" },
    { rollNo: 82, name: "Mojhaid", sgpa1: 6.27, sgpa2: 5.71, sgpa3: 7.27, ygpa1: 6, cgpa: 6.41, mathScores: 10, photo: "⋆ sɪʀʏʟɪɴ_🪐.jpg" },
    { rollNo: 83, name: "Nandini", sgpa1: 7.71, sgpa2: 7.68, sgpa3: 8.41, ygpa1: 7.69, cgpa: 7.93, mathScores: 20, photo: "Life of a programmer 👩_💻.jpg" },
    { rollNo: 87, name: "Piyush", sgpa1: 8.35, sgpa2: 7.1, sgpa3: 7.23, ygpa1: 7.72, cgpa: 7.35, mathScores: 21.33, photo: "Clorlk on Instagram.jpg" }
];

const API_KEY = "";
const API_URL = "";

let chartInstance = null;
let currentTab = 'sgpa';

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }
}

// Display top student after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const topStudentDiv = document.getElementById('top-student');
    if (topStudentDiv) {
        const topStudent = studentsData.reduce((prev, curr) => prev.cgpa > curr.cgpa ? prev : curr);
        topStudentDiv.textContent = `Top Student: ${topStudent.name} (CGPA: ${topStudent.cgpa})`;
        topStudentDiv.classList.add('slide-in');
        setTimeout(() => topStudentDiv.classList.remove('slide-in'), 500);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
        console.error('Element with ID "top-student" not found');
    }
});

// Student search filter
const studentSelect = document.getElementById('student');
const searchInput = document.getElementById('student-search');
if (searchInput && studentSelect) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const options = studentsData.map(s => `<option value="${s.name}">${s.name} (Roll: ${s.rollNo})</option>`);
        studentSelect.innerHTML = '<option value="">Select a student</option>' + 
            options.filter(opt => opt.toLowerCase().includes(query)).join('');
    });
}

// Tab switching
const tabButtons = document.querySelectorAll('.tab-button');
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentTab = button.dataset.tab;
        const student = studentSelect.value;
        if (student) loadStudentChart(student, currentTab);
    });
});

// Load student dashboard
function loadStudentDashboard() {
    const student = studentSelect?.value;
    const studentDashboard = document.getElementById('student-dashboard');
    const studentPhoto = document.getElementById('student-photo');
    const studentInfo = document.getElementById('student-info');
    const insightsDiv = document.getElementById('insights');
    const loadingDiv = document.getElementById('loading');
    const copyButton = document.getElementById('copy-insights');

    if (!studentDashboard || !studentPhoto || !studentInfo || !insightsDiv || !loadingDiv || !copyButton) {
        console.error('One or more DOM elements not found');
        alert('Error: Page elements not loaded correctly. Please refresh.');
        return;
    }

    if (!student) {
        alert('Please select a student!');
        studentDashboard.classList.add('hidden');
        insightsDiv.classList.add('hidden');
        copyButton.classList.add('hidden');
        return;
    }

    const studentData = studentsData.find(s => s.name === student);
    if (!studentData) {
        alert('Student not found!');
        return;
    }

    // Update student info and photo
    studentPhoto.src = studentData.photo;
    studentPhoto.alt = `${studentData.name}'s photo`;
    document.getElementById('table-rollno').textContent = studentData.rollNo;
    document.getElementById('table-sgpa1').textContent = studentData.sgpa1;
    document.getElementById('table-sgpa2').textContent = studentData.sgpa2;
    document.getElementById('table-sgpa3').textContent = studentData.sgpa3;
    document.getElementById('table-cgpa').textContent = studentData.cgpa;
    document.getElementById('table-math').textContent = studentData.mathScores;
    studentDashboard.classList.remove('hidden');
    studentDashboard.classList.add('slide-in');
    setTimeout(() => studentDashboard.classList.remove('slide-in'), 500);

    // Load chart and insights
    loadStudentChart(student, currentTab);
    loadInsights(student, insightsDiv, loadingDiv, copyButton);

    // Confetti for high performers
    if (studentData.cgpa >= 8.0) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
}

// Load student chart
function loadStudentChart(studentName, chartType) {
    const chartCanvas = document.getElementById('student-chart');
    if (!chartCanvas) {
        console.error('Chart canvas not found');
        return;
    }

    if (chartInstance) {
        chartInstance.destroy();
    }

    const studentData = studentsData.find(s => s.name === studentName);
    let chartConfig = {};
    if (chartType === 'sgpa') {
        chartConfig = {
            type: 'bar',
            data: {
                labels: ['Semester 1', 'Semester 2', 'Semester 3'],
                datasets: [{
                    label: `${studentName}'s SGPA`,
                    data: [studentData.sgpa1, studentData.sgpa2, studentData.sgpa3],
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true, max: 10, title: { display: true, text: 'SGPA' } }
                }
            }
        };
    } else if (chartType === 'cgpa-math') {
        chartConfig = {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Other Students',
                        data: studentsData.filter(s => s.name !== studentName).map(s => ({
                            x: s.mathScores,
                            y: s.cgpa,
                            name: s.name
                        })),
                        backgroundColor: 'rgba(156, 163, 175, 0.5)',
                        borderColor: 'rgba(156, 163, 175, 1)',
                        borderWidth: 1,
                        pointRadius: 5
                    },
                    {
                        label: studentName,
                        data: [{ x: studentData.mathScores, y: studentData.cgpa, name: studentName }],
                        backgroundColor: 'rgba(59, 130, 246, 0.8)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 1,
                        pointRadius: 8
                    }
                ]
            },
            options: {
                scales: {
                    x: { title: { display: true, text: 'Math Scores' } },
                    y: { beginAtZero: true, max: 10, title: { display: true, text: 'CGPA' } }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: context => `${context.raw.name}: CGPA ${context.raw.y}, Math ${context.raw.x}`
                        }
                    }
                }
            }
        };
    } else if (chartType === 'improvement') {
        const improvements = [
            studentData.sgpa2 - studentData.sgpa1,
            studentData.sgpa3 - studentData.sgpa2
        ];
        chartConfig = {
            type: 'line',
            data: {
                labels: ['Sem 1 to Sem 2', 'Sem 2 to Sem 3'],
                datasets: [{
                    label: `${studentName}'s SGPA Improvement`,
                    data: improvements,
                    borderColor: 'rgba(59, 130, 246, 1)',
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    fill: false,
                    tension: 0.4
                }]
            },
            options: {
                scales: {
                    y: { title: { display: true, text: 'SGPA Change' } }
                }
            }
        };
    }

    chartInstance = new Chart(chartCanvas, chartConfig);
    chartCanvas.parentElement.classList.add('slide-in');
    setTimeout(() => chartCanvas.parentElement.classList.remove('slide-in'), 500);
}

// Download chart
function downloadChart() {
    if (chartInstance) {
        const link = document.createElement('a');
        link.href = chartInstance.toBase64Image();
        link.download = 'student_performance_chart.png';
        link.click();
    } else {
        alert('No chart available to download.');
    }
}

// Load AI insights
async function loadInsights(studentName, insightsDiv, loadingDiv, copyButton) {
    loadingDiv.classList.remove('hidden');
    insightsDiv.classList.add('hidden');
    copyButton.classList.add('hidden');

    const student = studentsData.find(s => s.name === studentName);
    if (!student) {
        insightsDiv.textContent = 'Error: Student not found.';
        insightsDiv.classList.remove('hidden');
        loadingDiv.classList.add('hidden');
        return;
    }

    const prompt = `
        Generate a detailed performance analysis and actionable improvement suggestions (100-150 words) for a student named ${student.name} with:
        - Semester 1 SGPA: ${student.sgpa1}
        - Semester 2 SGPA: ${student.sgpa2}
        - Semester 3 SGPA: ${student.sgpa3}
        - 3-Semester CGPA: ${student.cgpa}
        - Math Scores (All Semesters): ${student.mathScores}
        Include:
        - A summary of their academic performance.
        - Semester-wise trend analysis (e.g., "Improved from Sem 1 to Sem 2" or "Declined in Sem 3").
        - Specific, actionable advice focusing on math performance and overall academic improvement.
        Format the response with clear sections: "Summary", "Trends", and "Suggestions".
    `;

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { response_mime_type: 'text/plain' }
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        const insight = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No insight available.';
        insightsDiv.innerHTML = insight.replace(/(Improved|Declined)/g, '<span class="$1">$1</span>')
            .replace(/Summary:/g, '<strong>Summary:</strong>')
            .replace(/Trends:/g, '<strong>Trends:</strong>')
            .replace(/Suggestions:/g, '<strong>Suggestions:</strong>')
            .replace(/\n/g, '<br>');
        insightsDiv.classList.remove('hidden');
        insightsDiv.classList.add('slide-in');
        copyButton.classList.remove('hidden');
        setTimeout(() => insightsDiv.classList.remove('slide-in'), 500);
    } catch (error) {
        console.error('Error:', error);
        insightsDiv.textContent = `Error: Failed to load insights. ${error.message}`;
        insightsDiv.classList.remove('hidden');
        insightsDiv.classList.add('slide-in');
        setTimeout(() => insightsDiv.classList.remove('slide-in'), 500);
    } finally {
        loadingDiv.classList.add('hidden');
    }
}

// Copy insights to clipboard
const copyButton = document.getElementById('copy-insights');
if (copyButton) {
    copyButton.addEventListener('click', () => {
        const insightsDiv = document.getElementById('insights');
        if (insightsDiv) {
            navigator.clipboard.writeText(insightsDiv.textContent).then(() => {
                alert('Insights copied to clipboard!');
            }).catch(err => {
                alert('Failed to copy insights.');
                console.error('Copy failed:', err);
            });
        }
    });
}

// Keyboard navigation
document.getElementById('student').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') loadStudentDashboard();
});
document.getElementById('student-search').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') loadStudentDashboard();
});
tabButtons.forEach(button => {
    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentTab = button.dataset.tab;
            const student = studentSelect.value;
            if (student) loadStudentChart(student, currentTab);
        }
    });
});

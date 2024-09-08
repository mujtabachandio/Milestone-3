function addEducation() {
    var educationSection = document.getElementById('education-section');
    var newEducation = document.createElement('div');
    newEducation.innerHTML = "\n        <label for=\"education-institution\">Institution:</label>\n        <input type=\"text\" name=\"education-institution\" required>\n        <label for=\"education-degree\">Degree:</label>\n        <input type=\"text\" name=\"education-degree\" required>\n        <label for=\"education-startDate\">Start Date:</label>\n        <input type=\"date\" name=\"education-startDate\" required>\n        <label for=\"education-endDate\">End Date:</label>\n        <input type=\"date\" name=\"education-endDate\" required>\n        <label for=\"education-description\">Description:</label>\n        <textarea name=\"education-description\" rows=\"3\" required></textarea>\n    ";
    educationSection.appendChild(newEducation);
}
function addExperience() {
    var experienceSection = document.getElementById('experience-section');
    var newExperience = document.createElement('div');
    newExperience.innerHTML = "\n        <label for=\"experience-company\">Company:</label>\n        <input type=\"text\" name=\"experience-company\" required>\n        <label for=\"experience-jobTitle\">Job Title:</label>\n        <input type=\"text\" name=\"experience-jobTitle\" required>\n        <label for=\"experience-startDate\">Start Date:</label>\n        <input type=\"date\" name=\"experience-startDate\" required>\n        <label for=\"experience-endDate\">End Date:</label>\n        <input type=\"date\" name=\"experience-endDate\" required>\n        <label for=\"experience-responsibilities\">Responsibilities:</label>\n        <textarea name=\"experience-responsibilities\" rows=\"3\" required></textarea>\n    ";
    experienceSection.appendChild(newExperience);
}
function generateResume() {
    var form = document.getElementById('resume-form');
    var formData = new FormData(form);
    var personalInfo = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
    };
    var education = [];
    var experience = [];
    var skills = [];
    var educationSections = document.querySelectorAll('#education-section > div');
    educationSections.forEach(function (section) {
        var inputs = section.querySelectorAll('input, textarea');
        education.push({
            institution: inputs[0].value,
            degree: inputs[1].value,
            startDate: inputs[2].value,
            endDate: inputs[3].value,
            description: inputs[4].value,
        });
    });
    var experienceSections = document.querySelectorAll('#experience-section > div');
    experienceSections.forEach(function (section) {
        var inputs = section.querySelectorAll('input, textarea');
        experience.push({
            company: inputs[0].value,
            jobTitle: inputs[1].value,
            startDate: inputs[2].value,
            endDate: inputs[3].value,
            responsibilities: inputs[4].value,
        });
    });
    skills.push({
        skillName: document.getElementById('skill-name').value,
        proficiencyLevel: document.getElementById('proficiency').value,
    });
    var resumePreview = document.getElementById('resume-preview');
    resumePreview.innerHTML = generateResumeContent(personalInfo, education, experience, skills);
}
function generateResumeContent(personalInfo, education, experience, skills) {
    return "\n        <h2>".concat(personalInfo.name, "</h2>\n        <p>Email: ").concat(personalInfo.email, "</p>\n        <p>Phone: ").concat(personalInfo.phone, "</p>\n        <p>Address: ").concat(personalInfo.address, "</p>\n\n        <h3>Education</h3>\n        ").concat(education.map(function (edu) { return "\n            <div>\n                <p><strong>".concat(edu.institution, "</strong></p>\n                <p>").concat(edu.degree, "</p>\n                <p>").concat(edu.startDate, " - ").concat(edu.endDate, "</p>\n                <p>").concat(edu.description, "</p>\n            </div>\n        "); }).join(''), "\n\n        <h3>Work Experience</h3>\n        ").concat(experience.map(function (exp) { return "\n            <div>\n                <p><strong>".concat(exp.company, "</strong> - ").concat(exp.jobTitle, "</p>\n                <p>").concat(exp.startDate, " - ").concat(exp.endDate, "</p>\n                <p>").concat(exp.responsibilities, "</p>\n            </div>\n        "); }).join(''), "\n\n        <h3>Skills</h3>\n        ").concat(skills.map(function (skill) { return "\n            <div>\n                <p>".concat(skill.skillName, " - ").concat(skill.proficiencyLevel, "</p>\n            </div>\n        "); }).join(''), "\n    ");
}

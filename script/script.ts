interface Education {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface WorkExperience {
    company: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    responsibilities: string;
}

interface Skill {
    skillName: string;
    proficiencyLevel: string;
}

function addEducation() {
    const educationSection = document.getElementById('education-section')!;
    const newEducation = document.createElement('div');
    newEducation.innerHTML = `
        <label for="education-institution">Institution:</label>
        <input type="text" name="education-institution" required>
        <label for="education-degree">Degree:</label>
        <input type="text" name="education-degree" required>
        <label for="education-startDate">Start Date:</label>
        <input type="date" name="education-startDate" required>
        <label for="education-endDate">End Date:</label>
        <input type="date" name="education-endDate" required>
        <label for="education-description">Description:</label>
        <textarea name="education-description" rows="3" required></textarea>
    `;
    educationSection.appendChild(newEducation);
}

function addExperience() {
    const experienceSection = document.getElementById('experience-section')!;
    const newExperience = document.createElement('div');
    newExperience.innerHTML = `
        <label for="experience-company">Company:</label>
        <input type="text" name="experience-company" required>
        <label for="experience-jobTitle">Job Title:</label>
        <input type="text" name="experience-jobTitle" required>
        <label for="experience-startDate">Start Date:</label>
        <input type="date" name="experience-startDate" required>
        <label for="experience-endDate">End Date:</label>
        <input type="date" name="experience-endDate" required>
        <label for="experience-responsibilities">Responsibilities:</label>
        <textarea name="experience-responsibilities" rows="3" required></textarea>
    `;
    experienceSection.appendChild(newExperience);
}

function generateResume() {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const formData = new FormData(form);

    const personalInfo = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
    };

    const education: Education[] = [];
    const experience: WorkExperience[] = [];
    const skills: Skill[] = [];

    const educationSections = document.querySelectorAll('#education-section > div');
    educationSections.forEach(section => {
        const inputs = (section as HTMLElement).querySelectorAll('input, textarea');
        education.push({
            institution: (inputs[0] as HTMLInputElement).value,
            degree: (inputs[1] as HTMLInputElement).value,
            startDate: (inputs[2] as HTMLInputElement).value,
            endDate: (inputs[3] as HTMLInputElement).value,
            description: (inputs[4] as HTMLTextAreaElement).value,
        });
    });

    const experienceSections = document.querySelectorAll('#experience-section > div');
    experienceSections.forEach(section => {
        const inputs = (section as HTMLElement).querySelectorAll('input, textarea');
        experience.push({
            company: (inputs[0] as HTMLInputElement).value,
            jobTitle: (inputs[1] as HTMLInputElement).value,
            startDate: (inputs[2] as HTMLInputElement).value,
            endDate: (inputs[3] as HTMLInputElement).value,
            responsibilities: (inputs[4] as HTMLTextAreaElement).value,
        });
    });

    skills.push({
        skillName: (document.getElementById('skill-name') as HTMLInputElement).value,
        proficiencyLevel: (document.getElementById('proficiency') as HTMLInputElement).value,
    });

    const resumePreview = document.getElementById('resume-preview')!;
    resumePreview.innerHTML = generateResumeContent(personalInfo, education, experience, skills);
}

function generateResumeContent(personalInfo: any, education: Education[], experience: WorkExperience[], skills: Skill[]): string {
    return `
        <h2>${personalInfo.name}</h2>
        <p>Email: ${personalInfo.email}</p>
        <p>Phone: ${personalInfo.phone}</p>
        <p>Address: ${personalInfo.address}</p>

        <h3>Education</h3>
        ${education.map(edu => `
            <div>
                <p><strong>${edu.institution}</strong></p>
                <p>${edu.degree}</p>
                <p>${edu.startDate} - ${edu.endDate}</p>
                <p>${edu.description}</p>
            </div>
        `).join('')}

        <h3>Work Experience</h3>
        ${experience.map(exp => `
            <div>
                <p><strong>${exp.company}</strong> - ${exp.jobTitle}</p>
                <p>${exp.startDate} - ${exp.endDate}</p>
                <p>${exp.responsibilities}</p>
            </div>
        `).join('')}

        <h3>Skills</h3>
        ${skills.map(skill => `
            <div>
                <p>${skill.skillName} - ${skill.proficiencyLevel}</p>
            </div>
        `).join('')}
    `;
}

const levels = {
    "novice": "20%",
    "basic": "30%",
    "intermediate": "50%",
    "proficient": "60%",
    "advanced": "90%",
    "expert": "100%"
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            displayNavbar(data.navbarLogo, data.navbar)
            displayProfile(data.profile)
            displayProjects(data.projects)
            displayWorkExperience(data.workExperience)
            displaySkills(data.skills)
            displayContact(data.contact)
        })
        .catch(error => console.error('Error loading JSON:', error))
})
function displayNavbar(logoData, navbarItems) {
    const navbar = document.querySelector('nav')

    const logoLink = document.createElement('a')
    logoLink.href = "#profileSection";
    const logoImg = document.createElement('img')
    logoImg.src = logoData.logo
    logoImg.alt = "Logo"
    logoImg.classList.add('h-10', 'w-10', 'ml-2')
    logoLink.appendChild(logoImg)

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('hidden', 'md:flex', 'justify-center', 'flex-grow', 'space-x-2', 'mr-16')

    navbarItems.forEach(item => {
        const button = document.createElement('button')
        button.id = item.id
        button.textContent = item.label
        button.classList.add('hover:text-slate-300', 'px-3', 'py-3', 'mx-2')
        button.addEventListener('click', () => {
            const targetSection = document.querySelector(item.link)
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' })
            }
        })
        buttonContainer.appendChild(button)
    })

    const hamburgerButton = document.createElement('button')
    hamburgerButton.id = "hamburgerButton"
    hamburgerButton.classList.add('md:hidden', 'flex', 'items-center', 'focus:outline-none', 'ml-auto', 'mr-4', 'text-white')
    hamburgerButton.innerHTML = `<i class='bx bx-menu text-3xl'></i>`

    const mobileMenu = document.createElement('div')
    mobileMenu.id = "mobileMenu";
    mobileMenu.classList.add('hidden', 'absolute', 'right-0', 'top-full', 'bg-[#303030]', 'bg-opacity-90', 'backdrop-blur-md', 'w-48', 'mt-2', 'rounded-lg', 'shadow-lg', 'p-4')

    navbarItems.forEach(item => {
        const mobileButton = document.createElement('button')
        mobileButton.id = `${item.id}-mobile`
        mobileButton.textContent = item.label
        mobileButton.classList.add('block', 'text-left', 'w-full', 'text-white', 'hover:text-slate-300', 'py-2')
        mobileButton.addEventListener('click', () => {
            const targetSection = document.querySelector(item.link)
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' })
            }
            mobileMenu.classList.add('hidden')
        })
        mobileMenu.appendChild(mobileButton)
    })

    hamburgerButton.addEventListener('click', (event) => {
        event.stopPropagation()
        mobileMenu.classList.toggle('hidden')
    })

    document.addEventListener('click', (event) => {
        if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && event.target !== hamburgerButton) {
            mobileMenu.classList.add('hidden')
        }
    })

    navbar.appendChild(logoLink)
    navbar.appendChild(buttonContainer)
    navbar.appendChild(hamburgerButton)
    navbar.appendChild(mobileMenu)
}

function displayProfile(profileData) {
    const profileName = document.getElementById('profileName')
    const profileDescription = document.getElementById('profileDescription')
    profileName.textContent = profileData.name
    profileDescription.textContent = profileData.description
}

function displayProjects(projects) {
    const projectSection = document.getElementById('projects')
    const projectContainer = document.createElement('div')
    projectContainer.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-6', 'md:gap-4', 'lg:gap-8', 'lg:px-16', 'lg:justify-center')

    projects.forEach(project => {
        const projectCard = document.createElement('div')
        projectCard.classList.add('bg-[#b2b1b3]', 'p-4', 'rounded-lg', 'shadow-lg', 'shadow-indigo-500/50', 'w-10/12', 'md:w-11/12', 'lg:w-12/12', 'mx-auto', 'flex', 'flex-col', 'justify-between', 'h-full')

        const title = document.createElement('h3')
        title.classList.add('text-[#201f20]', 'text-center', 'font-bold', 'text-xl', 'mb-6')
        title.textContent = project.title

        const description = document.createElement('p')
        description.classList.add('text-[#201f20]', 'mb-4')
        description.innerHTML = project.description

        const iframePreview = document.createElement('iframe')
        iframePreview.src = project.livePreviewUrl
        iframePreview.classList.add('w-11/12', 'h-48', 'rounded-lg', 'mb-6', 'ml-6')
        iframePreview.setAttribute('loading', 'lazy')
        iframePreview.setAttribute('sandbox', 'allow-scripts allow-same-origin')

        const techList = document.createElement('ul')
        techList.classList.add('list-disc', 'list-inside', 'text-[#201f20]', 'mb-4')
        if (project.technologiesUsed) {
            const technologies = project.technologiesUsed.split(', ')
            technologies.forEach(tech => {
                const techItem = document.createElement('li')
                techItem.textContent = tech
                techList.appendChild(techItem)
            })
            projectCard.appendChild(techList)
        }
        const link = document.createElement('a')
        link.classList.add('text-[#5c2e97]', 'font-semibold', 'mt-auto')
        link.href = project.link
        link.target = "_blank"
        link.textContent = 'View Project'

        projectCard.appendChild(title)
        projectCard.appendChild(iframePreview)
        projectCard.appendChild(description)
        projectCard.appendChild(techList)
        projectCard.appendChild(link)
        projectContainer.appendChild(projectCard)
        projectSection.appendChild(projectContainer)
    })
}
function displayWorkExperience(workExperiences) {
    const workSection = document.getElementById('workExperience')
    const workContainer = document.createElement('div')
    workContainer.classList.add('space-y-8', 'max-w-full', 'lg:ml-80', 'lg:max-w-[780px]', 'mx-auto')

    workExperiences.forEach((experience, index) => {
        const experienceCard = document.createElement('div')

        const company = document.createElement('h3')
        company.classList.add('font-bold', 'text-xl', 'mb-3')
        company.textContent = experience.company

        const companyRole = document.createElement('div')
        companyRole.classList.add('mb-6', 'mt-3')

        const role = document.createElement('p')
        role.classList.add('text-white', 'italic')
        role.textContent = `${experience.role} ${experience.duration}`

        companyRole.appendChild(company)
        companyRole.appendChild(role)

        const description = document.createElement('p')
        description.classList.add('text-white', 'leading-relaxed', 'mt-2', 'w-fit')
        description.textContent = experience.description

        experienceCard.appendChild(companyRole)
        experienceCard.appendChild(description)
        workContainer.appendChild(experienceCard)

        if (index < workExperiences.length - 1) {
            const separator = document.createElement('div')
            separator.classList.add('border-t', 'border-indigo-500', 'my-6', 'w-full')
            workContainer.appendChild(separator)
        }
    })
    workSection.appendChild(workContainer)
}
function displaySkills(skills) {
    const skillsContainer = document.getElementById('skillsContainer')
    skillsContainer.innerHTML = ''

    const categories = {
        spokenLanguages: "Spoken Languages",
        programmingLanguages: "Programming Languages and Frameworks",
        agileMethodology: "Agile software development",
        developmentEnvironments: "Development Environments"
    }

    Object.keys(skills).forEach(category => {
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('mb-8')

        const categoryTitle = document.createElement('h3')
        categoryTitle.classList.add('font-bold', 'text-xl', 'mb-4', 'border-b-2', 'pb-2')
        categoryTitle.textContent = categories[category]
        categoryContainer.appendChild(categoryTitle)

        skills[category].forEach(skill => {
            const skillContainer = document.createElement('div')
            skillContainer.classList.add('mb-4')

            const skillName = document.createElement('p')
            skillName.classList.add('font-semibold')
            skillName.textContent = skill.name

            const progressBarBackground = document.createElement('div')
            progressBarBackground.classList.add('bg-gray-300', 'rounded-full', 'h-4', 'w-80')

            const progressBar = document.createElement('div')
            progressBar.classList.add('bg-indigo-500', 'h-4', 'rounded-full')
            progressBar.style.width = levels[skill.level]

            progressBar.style.width = levels[skill.level]

            progressBarBackground.appendChild(progressBar)
            skillContainer.appendChild(skillName);
            skillContainer.appendChild(progressBarBackground)
            categoryContainer.appendChild(skillContainer)
        })
        skillsContainer.appendChild(categoryContainer)
    })
}
function displayContact(contactData) {
    const emailElement = document.getElementById('email')
    const locationElement = document.getElementById('location')

    emailElement.textContent = contactData.email
    locationElement.textContent = contactData.location
}

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
}
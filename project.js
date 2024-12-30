class ProjectManager {
    constructor() {
        this.projects = [];
        this.categories = [];
        this.init();
    }

    async init() {
        try {
            const response = await fetch('data/projects.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            this.projects = data.projects;
            this.categories = data.categories;
            
            this.renderCategories();
            this.renderProjects();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    }

    renderCategories() {
        const categoriesWrapper = document.querySelector('.categories-wrapper');
        if (!categoriesWrapper) return;

        const categoriesHTML = this.categories.map(category => `
            <button class="category-btn ${category.id === 'all' ? 'active' : ''}" 
                    data-category="${category.id}">
                ${category.name}
            </button>
        `).join('');

        categoriesWrapper.innerHTML = categoriesHTML;
    }

    renderProjects(category = 'all') {
        const projectsWrapper = document.querySelector('.projects-wrapper');
        if (!projectsWrapper) return;

        const filteredProjects = category === 'all' 
            ? this.projects 
            : this.projects.filter(project => project.categories.includes(category));

        const projectsHTML = filteredProjects.map(project => `
            <div class="project-card" data-categories='${JSON.stringify(project.categories)}'>
                <div class="project-thumbnail">
                    <img src="${project.imageUrl}" alt="${project.title}">
                    <div class="project-overlay">
                        <button class="watch-video-btn" data-video-id="${project.videoId}">
                            <i class="fas fa-play"></i>
                            <span>Watch Demo</span>
                        </button>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-categories">
                        ${project.categories.map(cat => {
                            const category = this.categories.find(c => c.id === cat);
                            return `<span>${category ? category.name : cat}</span>`;
                        }).join('')}
                    </div>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        projectsWrapper.innerHTML = projectsHTML;
    }

    setupEventListeners() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const category = button.dataset.category;
                this.renderProjects(category);
            });
        });

        // Replace video modal with direct YouTube link
        document.addEventListener('click', (e) => {
            const projectCard = e.target.closest('.project-card');
            if (projectCard) {
                const videoId = projectCard.querySelector('.watch-video-btn')?.dataset.videoId;
                if (videoId) {
                    // Open YouTube video in a new tab
                    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProjectManager();
});

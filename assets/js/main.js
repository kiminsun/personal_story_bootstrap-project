/**
 * 개인 포트폴리오 웹사이트 메인 JavaScript 파일
 * 주요 기능: 스크롤 이벤트, 다크모드, 모달, 관리자 패널, 데이터 로딩
 */

// ===== 전역 변수 =====
let portfolioData = {
    about: {},
    experience: [],
    skills: [],
    projects: [],
    awards: []
};

let logoClickCount = 0;
let logoClickTimer = null;

// ===== DOM 로드 완료 후 초기화 =====
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

/**
 * 포트폴리오 초기화 함수
 */
async function initializePortfolio() {
    try {
        // 로딩 화면 표시
        showLoadingScreen();
        
        // 데이터 로드
        await loadPortfolioData();
        
        // 이벤트 리스너 설정
        setupEventListeners();
        
        // 페이지 렌더링
        renderPortfolio();
        
        // AOS 애니메이션 초기화
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
        
        // 모바일에서 스킬 바 강제 애니메이션 (추가 보장)
        setTimeout(() => {
            forceMobileSkillAnimation();
        }, 2000);
        
        // 로딩 화면 숨김
        hideLoadingScreen();
        
    } catch (error) {
        console.error('포트폴리오 초기화 중 오류 발생:', error);
        hideLoadingScreen();
    }
}

/**
 * 로딩 화면 표시
 */
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
    }
}

/**
 * 로딩 화면 숨김
 */
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1000);
    }
}

/**
 * 포트폴리오 데이터 로드
 */
async function loadPortfolioData() {
    try {
        // 각 섹션별 JSON 데이터 로드
        const dataFiles = ['about', 'experience', 'skills', 'projects', 'awards'];
        
        for (const file of dataFiles) {
            try {
                const response = await fetch(`./data/${file}.json`);
                if (response.ok) {
                    portfolioData[file] = await response.json();
                } else {
                    console.warn(`${file}.json 파일을 찾을 수 없습니다. 기본 데이터를 사용합니다.`);
                    portfolioData[file] = getDefaultData(file);
                }
            } catch (error) {
                console.warn(`${file}.json 로드 실패:`, error);
                portfolioData[file] = getDefaultData(file);
            }
        }
    } catch (error) {
        console.error('데이터 로드 중 오류:', error);
        // 기본 데이터로 폴백
        loadDefaultData();
    }
}

/**
 * 기본 데이터 반환
 */
function getDefaultData(section) {
    const defaultData = {
        about: {
            name: "홍길동",
            motto: "코드로 세상을 더 나은 곳으로 만들어갑니다",
            description: "5년 이상의 풀스택 개발 경험을 바탕으로 사용자 중심의 웹 애플리케이션을 개발하고 있습니다. 새로운 기술을 학습하고 적용하는 것을 즐기며, 팀과의 협업을 통해 더 나은 결과를 만들어내는 것을 중요하게 생각합니다.",
            email: "your.email@example.com",
            phone: "010-1234-5678",
            location: "서울, 대한민국",
            kpis: {
                experience: "5+",
                projects: "30+",
                teamSize: "10+",
                clients: "50+"
            }
        },
        experience: [
            {
                company: "테크 컴퍼니",
                position: "시니어 풀스택 개발자",
                period: "2021.03 - 현재",
                tasks: [
                    "React.js 기반 프론트엔드 개발 및 최적화",
                    "Node.js/Express 백엔드 API 설계 및 구현",
                    "AWS 클라우드 인프라 구축 및 운영",
                    "팀 내 코드 리뷰 및 기술 멘토링"
                ]
            }
        ],
        skills: [
            {
                category: "Frontend",
                icon: "fas fa-laptop-code",
                skills: [
                    { name: "React.js", level: 90 },
                    { name: "Vue.js", level: 85 },
                    { name: "JavaScript", level: 95 },
                    { name: "TypeScript", level: 80 }
                ]
            }
        ],
        projects: [
            {
                title: "포트폴리오 웹사이트",
                description: "개인 포트폴리오를 위한 반응형 웹사이트",
                image: "./assets/images/project1.jpg",
                tags: ["React", "Node.js", "MongoDB"],
                techStack: "React.js, Node.js, MongoDB",
                contribution: "풀스택 개발",
                results: "사용자 경험 개선 및 성능 최적화",
                links: {
                    demo: "#",
                    github: "#"
                }
            }
        ],
        awards: [
            {
                title: "우수 개발자상",
                organization: "테크 컴퍼니",
                period: "2023.12",
                description: "뛰어난 기술력과 팀워크로 프로젝트 성공에 기여",
                icon: "fas fa-trophy"
            }
        ]
    };
    
    return defaultData[section] || [];
}

/**
 * 기본 데이터 로드
 */
function loadDefaultData() {
    portfolioData.about = getDefaultData('about');
    portfolioData.experience = getDefaultData('experience');
    portfolioData.skills = getDefaultData('skills');
    portfolioData.projects = getDefaultData('projects');
    portfolioData.awards = getDefaultData('awards');
}

/**
 * 이벤트 리스너 설정
 */
function setupEventListeners() {
    // 네비게이션 스크롤 이벤트
    window.addEventListener('scroll', handleScroll);
    
    // 다크모드 토글
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // 로고 클릭 이벤트 (관리자 모드)
    const logo = document.getElementById('logo');
    if (logo) {
        logo.addEventListener('click', handleLogoClick);
    }
    
    // 관리자 패널 토글
    const adminToggle = document.getElementById('adminToggle');
    if (adminToggle) {
        adminToggle.addEventListener('click', toggleAdminPanel);
    }
    
    // 연락처 버튼 이벤트
    setupContactEvents();
    
    // 스무스 스크롤
    setupSmoothScroll();
    
    // 스킬 프로그레스 바 애니메이션
    setupSkillAnimations();
}

/**
 * 스크롤 이벤트 핸들러
 */
function handleScroll() {
    const navbar = document.getElementById('mainNav');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 네비게이션 배경 변경
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // 활성 네비게이션 메뉴 업데이트
    updateActiveNavigation();
}

/**
 * 활성 네비게이션 메뉴 업데이트
 */
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * 다크모드 토글
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // 아이콘 변경
    const themeIcon = document.querySelector('#themeToggle i');
    if (themeIcon) {
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

/**
 * 저장된 테마 로드
 */
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeIcon = document.querySelector('#themeToggle i');
    if (themeIcon) {
        themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

/**
 * 로고 클릭 핸들러 (관리자 모드 활성화)
 */
function handleLogoClick(e) {
    e.preventDefault();
    
    logoClickCount++;
    
    if (logoClickTimer) {
        clearTimeout(logoClickTimer);
    }
    
    logoClickTimer = setTimeout(() => {
        if (logoClickCount >= 5) {
            showAdminPanel();
        }
        logoClickCount = 0;
    }, 2000);
}

/**
 * 관리자 패널 표시
 */
function showAdminPanel() {
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel) {
        adminPanel.style.display = 'block';
        console.log('관리자 모드가 활성화되었습니다.');
    }
}

/**
 * 관리자 패널 토글
 */
function toggleAdminPanel() {
    const adminModal = new bootstrap.Modal(document.getElementById('adminModal'));
    loadAdminForms();
    adminModal.show();
}

/**
 * 연락처 이벤트 설정
 */
function setupContactEvents() {
    // 이메일 복사 버튼
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', copyEmailToClipboard);
    }
    
    // 이메일 버튼
    const emailBtn = document.getElementById('emailBtn');
    if (emailBtn && portfolioData.about.email) {
        emailBtn.href = `mailto:${portfolioData.about.email}`;
    }
}

/**
 * 이메일 주소 클립보드 복사
 */
async function copyEmailToClipboard() {
    try {
        const email = portfolioData.about.email || 'your.email@example.com';
        await navigator.clipboard.writeText(email);
        
        // 성공 메시지 표시
        showToast('이메일 주소가 복사되었습니다!', 'success');
    } catch (error) {
        console.error('클립보드 복사 실패:', error);
        showToast('복사에 실패했습니다.', 'error');
    }
}

/**
 * 토스트 메시지 표시
 */
function showToast(message, type = 'info') {
    // 토스트 컨테이너 생성 (없는 경우)
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
        `;
        document.body.appendChild(toastContainer);
    }
    
    // 토스트 요소 생성
    const toast = document.createElement('div');
    toast.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    toast.style.cssText = `
        margin-bottom: 10px;
        min-width: 300px;
    `;
    toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    toastContainer.appendChild(toast);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
}

/**
 * 스무스 스크롤 설정
 */
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .hero-cta');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // 모바일 메뉴 닫기
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });
}

/**
 * 스킬 애니메이션 설정 (모바일 호환성 개선)
 */
function setupSkillAnimations() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    // 모바일 디바이스 감지
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768;
    
    // 스킬 바 애니메이션 실행 함수
    function animateSkillBars() {
        const skillBars = skillsSection.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            const percentage = bar.getAttribute('data-percentage');
            if (bar.style.width === '0%' || !bar.style.width || bar.style.opacity === '0') {
                setTimeout(() => {
                    bar.style.width = percentage + '%';
                    bar.style.opacity = '1';
                }, isMobile ? 100 + (index * 50) : 300 + (index * 100));
            }
        });
    }
    
    // 모바일에서는 더 관대한 설정으로 IntersectionObserver 설정
    const observerOptions = isMobile ? {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    } : {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                // 한 번 애니메이션이 실행되면 관찰 중지
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 스킬 섹션 관찰 시작
    observer.observe(skillsSection);
    
    // 모바일에서 더 빠른 폴백 로직
    const fallbackDelay = isMobile ? 800 : 1500;
    setTimeout(() => {
        const skillsRect = skillsSection.getBoundingClientRect();
        const isVisible = skillsRect.top < window.innerHeight && skillsRect.bottom > 0;
        
        if (isVisible) {
            const skillBars = skillsSection.querySelectorAll('.skill-progress');
            let needsAnimation = false;
            
            skillBars.forEach(bar => {
                if (bar.style.width === '0%' || !bar.style.width || bar.style.opacity === '0') {
                    needsAnimation = true;
                }
            });
            
            if (needsAnimation) {
                animateSkillBars();
            }
        }
    }, fallbackDelay);
    
    // 모바일에서 스크롤 이벤트 추가 폴백
    if (isMobile) {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const skillsRect = skillsSection.getBoundingClientRect();
                const isVisible = skillsRect.top < window.innerHeight && skillsRect.bottom > 0;
                
                if (isVisible) {
                    const skillBars = skillsSection.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        if (bar.style.width === '0%' || !bar.style.width || bar.style.opacity === '0') {
                            const percentage = bar.getAttribute('data-percentage');
                            bar.style.width = percentage + '%';
                            bar.style.opacity = '1';
                        }
                    });
                }
            }, 100);
        });
    }
}

/**
 * 모바일에서 스킬 바 강제 애니메이션 (추가 보장)
 */
function forceMobileSkillAnimation() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768;
    
    if (isMobile) {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const skillBars = skillsSection.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
                const percentage = bar.getAttribute('data-percentage');
                if (bar.style.width === '0%' || !bar.style.width || bar.style.opacity === '0') {
                    setTimeout(() => {
                        bar.style.width = percentage + '%';
                        bar.style.opacity = '1';
                        console.log(`모바일 스킬 바 강제 애니메이션: ${percentage}%`);
                    }, index * 200);
                }
            });
        }
    }
}

/**
 * 포트폴리오 렌더링
 */
function renderPortfolio() {
    renderAboutSection();
    renderExperienceSection();
    renderSkillsSection();
    renderProjectsSection();
    renderAwardsSection();
    
    // 저장된 테마 로드
    loadSavedTheme();
}

/**
 * 소개 섹션 렌더링
 */
function renderAboutSection() {
    const about = portfolioData.about;
    
    // 기본 정보 업데이트
    updateElementText('aboutName', about.name);
    updateElementText('aboutMotto', about.motto);
    updateElementText('aboutDescription', about.description);
    updateElementText('aboutEmail', about.email);
    updateElementText('aboutPhone', about.phone);
    updateElementText('aboutLocation', about.location);
    
    // KPI 업데이트
    if (about.kpis) {
        updateElementText('kpiExperience', about.kpis.experience);
        updateElementText('kpiProjects', about.kpis.projects);
        updateElementText('kpiTeamSize', about.kpis.teamSize);
        updateElementText('kpiClients', about.kpis.clients);
    }
}

/**
 * 경력 섹션 렌더링
 */
function renderExperienceSection() {
    const container = document.getElementById('experienceTimeline');
    if (!container) return;
    
    container.innerHTML = '';
    
    portfolioData.experience.forEach((exp, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.setAttribute('data-aos', 'fade-up');
        timelineItem.setAttribute('data-aos-delay', (index * 100).toString());
        
        const tasksHtml = exp.tasks.map(task => `<li>${task}</li>`).join('');
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <h4 class="timeline-company">${exp.company}</h4>
                <h5 class="timeline-position">${exp.position}</h5>
                <p class="timeline-period">${exp.period}</p>
                <ul class="timeline-tasks">
                    ${tasksHtml}
                </ul>
            </div>
            <div class="timeline-marker"></div>
        `;
        
        container.appendChild(timelineItem);
    });
}

/**
 * 스킬 섹션 렌더링
 */
function renderSkillsSection() {
    const container = document.getElementById('skillsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    portfolioData.skills.forEach((category, index) => {
        const skillsHtml = category.skills.map(skill => `
            <div class="skill-item">
                <div class="skill-name">
                    <span>${skill.name}</span>
                    <span class="skill-percentage">${skill.level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-percentage="${skill.level}" style="width: 0%; opacity: 0;"></div>
                </div>
            </div>
        `).join('');
        
        const skillCategory = document.createElement('div');
        skillCategory.className = 'col-lg-6 col-md-12';
        skillCategory.setAttribute('data-aos', 'fade-up');
        skillCategory.setAttribute('data-aos-delay', (index * 100).toString());
        
        skillCategory.innerHTML = `
            <div class="skill-category">
                <h3 class="skill-category-title">
                    <i class="skill-category-icon ${category.icon}"></i>
                    ${category.category}
                </h3>
                ${skillsHtml}
            </div>
        `;
        
        container.appendChild(skillCategory);
    });
}

/**
 * 프로젝트 섹션 렌더링
 */
function renderProjectsSection() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    portfolioData.projects.forEach((project, index) => {
        const tagsHtml = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
        
        const projectCard = document.createElement('div');
        projectCard.className = 'col-lg-4 col-md-6 col-sm-12 mb-4';
        projectCard.setAttribute('data-aos', 'fade-up');
        projectCard.setAttribute('data-aos-delay', (index * 100).toString());
        
        projectCard.innerHTML = `
            <div class="project-card" onclick="openProjectModal(${index})">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" onerror="this.src='./assets/images/placeholder.svg'">
                    <div class="project-overlay">
                        <i class="fas fa-eye"></i>
                    </div>
                </div>
                <div class="project-content">
                    <h4 class="project-title">${project.title}</h4>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${tagsHtml}
                    </div>
                    <div class="project-tech">
                        <i class="fas fa-code"></i>
                        <span>${project.techStack}</span>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(projectCard);
    });
}

/**
 * 수상/자격증 섹션 렌더링
 */
function renderAwardsSection() {
    const container = document.getElementById('awardsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    portfolioData.awards.forEach((award, index) => {
        const awardCard = document.createElement('div');
        awardCard.className = 'col-lg-4 col-md-6 col-sm-12 mb-4';
        awardCard.setAttribute('data-aos', 'fade-up');
        awardCard.setAttribute('data-aos-delay', (index * 100).toString());
        
        awardCard.innerHTML = `
            <div class="award-card">
                <div class="award-icon">
                    <i class="${award.icon}"></i>
                </div>
                <h4 class="award-title">${award.title}</h4>
                <h5 class="award-organization">${award.organization}</h5>
                <p class="award-period">${award.period}</p>
                <p class="award-description">${award.description}</p>
            </div>
        `;
        
        container.appendChild(awardCard);
    });
}

/**
 * 프로젝트 모달 열기
 */
function openProjectModal(index) {
    const project = portfolioData.projects[index];
    if (!project) return;
    
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('projectModalTitle');
    const modalBody = document.getElementById('projectModalBody');
    
    modalTitle.textContent = project.title;
    
    const tagsHtml = project.tags.map(tag => `<span class="badge bg-primary me-1">${tag}</span>`).join('');
    const linksHtml = Object.entries(project.links || {}).map(([key, url]) => 
        `<a href="${url}" class="btn btn-outline-primary btn-sm me-2" target="_blank">
            <i class="fas fa-external-link-alt"></i> ${key}
        </a>`
    ).join('');
    
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${project.image}" alt="${project.title}" class="img-fluid rounded mb-3" onerror="this.src='./assets/images/placeholder.svg'">
            </div>
            <div class="col-md-6">
                <h5>프로젝트 설명</h5>
                <p>${project.description}</p>
                
                <h6>기술 스택</h6>
                <p>${project.techStack}</p>
                
                <h6>태그</h6>
                <div class="mb-3">${tagsHtml}</div>
                
                <h6>기여도 및 역할</h6>
                <p>${project.contribution}</p>
                
                <h6>결과 및 성과</h6>
                <p>${project.results}</p>
                
                <div class="mt-3">
                    ${linksHtml}
                </div>
            </div>
        </div>
    `;
    
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

/**
 * 관리자 폼 로드
 */
function loadAdminForms() {
    const tabContent = document.getElementById('adminTabContent');
    if (!tabContent) return;
    
    tabContent.innerHTML = `
        <div class="tab-pane fade show active" id="adminAbout">
            <div class="admin-form">
                <h5>소개 정보 편집</h5>
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">이름</label>
                            <input type="text" class="form-control" id="adminAboutName" value="${portfolioData.about.name || ''}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">모토/슬로건</label>
                            <input type="text" class="form-control" id="adminAboutMotto" value="${portfolioData.about.motto || ''}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">이메일</label>
                            <input type="email" class="form-control" id="adminAboutEmail" value="${portfolioData.about.email || ''}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">전화번호</label>
                            <input type="text" class="form-control" id="adminAboutPhone" value="${portfolioData.about.phone || ''}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">위치</label>
                            <input type="text" class="form-control" id="adminAboutLocation" value="${portfolioData.about.location || ''}">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">자기소개</label>
                            <textarea class="form-control" rows="5" id="adminAboutDescription">${portfolioData.about.description || ''}</textarea>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="mb-3">
                                    <label class="form-label">경력 (년)</label>
                                    <input type="text" class="form-control" id="adminKpiExperience" value="${portfolioData.about.kpis?.experience || ''}">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">프로젝트 수</label>
                                    <input type="text" class="form-control" id="adminKpiProjects" value="${portfolioData.about.kpis?.projects || ''}">
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="mb-3">
                                    <label class="form-label">팀 규모</label>
                                    <input type="text" class="form-control" id="adminKpiTeamSize" value="${portfolioData.about.kpis?.teamSize || ''}">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">고객 수</label>
                                    <input type="text" class="form-control" id="adminKpiClients" value="${portfolioData.about.kpis?.clients || ''}">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="saveAboutData()">저장</button>
            </div>
        </div>
        
        <div class="tab-pane fade" id="adminExperience">
            <div class="admin-form">
                <h5>경력 정보 편집</h5>
                <div id="experienceEditor">
                    <!-- 경력 편집 폼이 여기에 로드됩니다 -->
                </div>
                <button class="btn btn-success" onclick="addExperience()">경력 추가</button>
                <button class="btn btn-primary" onclick="saveExperienceData()">저장</button>
            </div>
        </div>
        
        <div class="tab-pane fade" id="adminSkills">
            <div class="admin-form">
                <h5>스킬 정보 편집</h5>
                <div id="skillsEditor">
                    <!-- 스킬 편집 폼이 여기에 로드됩니다 -->
                </div>
                <button class="btn btn-success" onclick="addSkillCategory()">스킬 카테고리 추가</button>
                <button class="btn btn-primary" onclick="saveSkillsData()">저장</button>
            </div>
        </div>
        
        <div class="tab-pane fade" id="adminProjects">
            <div class="admin-form">
                <h5>프로젝트 정보 편집</h5>
                <div id="projectsEditor">
                    <!-- 프로젝트 편집 폼이 여기에 로드됩니다 -->
                </div>
                <button class="btn btn-success" onclick="addProject()">프로젝트 추가</button>
                <button class="btn btn-primary" onclick="saveProjectsData()">저장</button>
            </div>
        </div>
        
        <div class="tab-pane fade" id="adminAwards">
            <div class="admin-form">
                <h5>수상/자격증 정보 편집</h5>
                <div id="awardsEditor">
                    <!-- 수상/자격증 편집 폼이 여기에 로드됩니다 -->
                </div>
                <button class="btn btn-success" onclick="addAward()">수상/자격증 추가</button>
                <button class="btn btn-primary" onclick="saveAwardsData()">저장</button>
            </div>
        </div>
    `;
    
    // JSON 내보내기 버튼 이벤트
    const exportBtn = document.getElementById('exportDataBtn');
    if (exportBtn) {
        exportBtn.onclick = exportAllData;
    }
}

/**
 * 소개 데이터 저장
 */
function saveAboutData() {
    portfolioData.about = {
        name: document.getElementById('adminAboutName').value,
        motto: document.getElementById('adminAboutMotto').value,
        description: document.getElementById('adminAboutDescription').value,
        email: document.getElementById('adminAboutEmail').value,
        phone: document.getElementById('adminAboutPhone').value,
        location: document.getElementById('adminAboutLocation').value,
        kpis: {
            experience: document.getElementById('adminKpiExperience').value,
            projects: document.getElementById('adminKpiProjects').value,
            teamSize: document.getElementById('adminKpiTeamSize').value,
            clients: document.getElementById('adminKpiClients').value
        }
    };
    
    renderAboutSection();
    showToast('소개 정보가 저장되었습니다!', 'success');
}

/**
 * 모든 데이터 JSON으로 내보내기
 */
function exportAllData() {
    const dataToExport = {
        about: portfolioData.about,
        experience: portfolioData.experience,
        skills: portfolioData.skills,
        projects: portfolioData.projects,
        awards: portfolioData.awards
    };
    
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'portfolio-data.json';
    link.click();
    
    showToast('데이터가 성공적으로 내보내졌습니다!', 'success');
}

/**
 * 요소 텍스트 업데이트 유틸리티
 */
function updateElementText(id, text) {
    const element = document.getElementById(id);
    if (element && text) {
        element.textContent = text;
    }
}

/**
 * 요소 HTML 업데이트 유틸리티
 */
function updateElementHTML(id, html) {
    const element = document.getElementById(id);
    if (element && html) {
        element.innerHTML = html;
    }
}

// ===== 추가 관리자 기능들 (간단한 구현) =====

/**
 * 경력 추가
 */
function addExperience() {
    // 간단한 구현 - 실제로는 더 복잡한 폼이 필요
    showToast('경력 추가 기능은 추후 구현 예정입니다.', 'info');
}

/**
 * 스킬 카테고리 추가
 */
function addSkillCategory() {
    showToast('스킬 카테고리 추가 기능은 추후 구현 예정입니다.', 'info');
}

/**
 * 프로젝트 추가
 */
function addProject() {
    showToast('프로젝트 추가 기능은 추후 구현 예정입니다.', 'info');
}

/**
 * 수상/자격증 추가
 */
function addAward() {
    showToast('수상/자격증 추가 기능은 추후 구현 예정입니다.', 'info');
}

/**
 * 경력 데이터 저장
 */
function saveExperienceData() {
    showToast('경력 데이터 저장 기능은 추후 구현 예정입니다.', 'info');
}

/**
 * 스킬 데이터 저장
 */
function saveSkillsData() {
    showToast('스킬 데이터 저장 기능은 추후 구현 예정입니다.', 'info');
}

/**
 * 프로젝트 데이터 저장
 */
function saveProjectsData() {
    showToast('프로젝트 데이터 저장 기능은 추후 구현 예정입니다.', 'info');
}

/**
 * 수상/자격증 데이터 저장
 */
function saveAwardsData() {
    showToast('수상/자격증 데이터 저장 기능은 추후 구현 예정입니다.', 'info');
}

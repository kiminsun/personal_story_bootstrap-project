# 🌟 개인 포트폴리오 웹사이트

현대적이고 반응형인 개인 포트폴리오 웹사이트입니다. GitHub Pages를 통해 정적 배포가 가능하며, 관리자 패널을 통한 데이터 관리 기능을 제공합니다.

## ✨ 주요 기능

### 🎨 디자인 & UX
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 지원
- **다크모드**: 라이트/다크 테마 토글 기능
- **부드러운 애니메이션**: AOS 라이브러리를 활용한 스크롤 애니메이션
- **현대적인 UI**: Bootstrap 5 + 커스텀 CSS로 구현

### 📱 섹션 구성
- **홈**: 풀스크린 배경 비디오와 자기소개
- **소개**: 개인 정보, 모토, KPI 지표
- **경력**: 타임라인 형태의 경력 사항
- **스킬**: 카테고리별 기술 스택과 숙련도
- **프로젝트**: 갤러리 형태의 프로젝트 쇼케이스
- **수상/자격증**: 성취와 인증 내역
- **연락처**: 소셜 링크와 연락 방법

### 🔧 기술적 특징
- **정적 사이트**: HTML, CSS, JavaScript만으로 구현
- **JSON 기반 데이터**: 각 섹션별 JSON 파일로 데이터 관리
- **관리자 모드**: 로고 5회 클릭으로 활성화되는 데이터 편집 패널
- **SEO 최적화**: 메타 태그, Open Graph, Twitter Cards 지원
- **접근성**: ARIA 레이블, 키보드 네비게이션 지원

## 🚀 빠른 시작

### 1. 저장소 클론
```bash
git clone https://github.com/yourusername/personal-portfolio.git
cd personal-portfolio
```

### 2. 로컬 서버 실행
```bash
# Python 3 사용
python -m http.server 8000

# 또는 Node.js 사용
npx http-server

# 또는 Live Server (VS Code 확장) 사용
```

### 3. 브라우저에서 확인
`http://localhost:8000`에서 포트폴리오를 확인할 수 있습니다.

## 📁 프로젝트 구조

```
personal-portfolio/
├── index.html              # 메인 HTML 파일
├── assets/
│   ├── css/
│   │   └── style.css       # 메인 스타일시트
│   ├── js/
│   │   └── main.js         # 메인 JavaScript
│   ├── images/             # 이미지 파일들
│   └── videos/             # 배경 비디오 파일
├── data/                   # JSON 데이터 파일들
│   ├── about.json          # 소개 정보
│   ├── experience.json     # 경력 정보
│   ├── skills.json         # 스킬 정보
│   ├── projects.json       # 프로젝트 정보
│   └── awards.json         # 수상/자격증 정보
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions 배포 설정
└── README.md
```

## ⚙️ 커스터마이징

### 1. 개인 정보 수정
`data/` 폴더의 JSON 파일들을 편집하여 개인 정보를 업데이트하세요:

- `about.json`: 기본 정보, 연락처, KPI
- `experience.json`: 경력 사항
- `skills.json`: 기술 스택과 숙련도
- `projects.json`: 프로젝트 정보
- `awards.json`: 수상 및 자격증

### 2. 이미지 교체
- `assets/images/` 폴더에 이미지 파일들을 추가
- 프로젝트 이미지: `project1.jpg` ~ `project6.jpg`
- OG 이미지: `og-image.jpg` (1200x630px)
- 파비콘: `favicon.ico`

### 3. 배경 비디오 추가
- `assets/videos/background-video.mp4` 파일 추가
- 권장 사양: 1920x1080, MP4 형식, 10MB 이하

### 4. 색상 테마 변경
`assets/css/style.css` 파일의 CSS 변수를 수정하여 색상을 변경할 수 있습니다:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #06b6d4;
    /* ... */
}
```

## 🌐 GitHub Pages 배포

### 1. GitHub 저장소 생성
1. GitHub에서 새 저장소 생성
2. 저장소명: `yourusername.github.io` (개인 페이지) 또는 원하는 이름

### 2. 코드 푸시
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### 3. GitHub Pages 설정
1. 저장소 Settings → Pages
2. Source: "GitHub Actions" 선택
3. 자동으로 배포 워크플로우가 실행됩니다

### 4. 배포 확인
- Actions 탭에서 배포 진행 상황 확인
- 완료 후 `https://yourusername.github.io/your-repo` 에서 확인

## 🔐 관리자 모드

### 활성화 방법
1. 웹사이트에서 로고(S)를 5번 연속 클릭
2. 우상단에 "관리자" 버튼이 나타남
3. 버튼 클릭으로 관리자 패널 열기

### 기능
- **데이터 편집**: 각 섹션별 정보 실시간 수정
- **JSON 내보내기**: 편집한 데이터를 JSON 파일로 다운로드
- **실시간 미리보기**: 변경 사항 즉시 반영

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Poppins, Noto Sans KR)
- **Animation**: AOS (Animate On Scroll)
- **Deployment**: GitHub Actions + GitHub Pages

## 📱 브라우저 지원

- Chrome (최신 2개 버전)
- Firefox (최신 2개 버전)
- Safari (최신 2개 버전)
- Edge (최신 2개 버전)

## 🎯 성능 최적화

- **이미지 최적화**: WebP 형식 권장, 지연 로딩
- **CSS/JS 최소화**: 프로덕션 빌드 시 압축
- **CDN 활용**: Bootstrap, Font Awesome CDN 사용
- **캐싱**: 적절한 캐시 헤더 설정

## 📈 SEO 최적화

- **메타 태그**: 제목, 설명, 키워드 최적화
- **Open Graph**: 소셜 미디어 공유 최적화
- **Twitter Cards**: 트위터 공유 최적화
- **구조화된 데이터**: JSON-LD 스키마 적용 가능

## 🔧 문제 해결

### 배경 비디오가 재생되지 않는 경우
1. 비디오 파일 형식 확인 (MP4 권장)
2. 파일 크기 확인 (10MB 이하 권장)
3. 브라우저 자동재생 정책 확인

### 이미지가 표시되지 않는 경우
1. 파일 경로 확인
2. 이미지 파일 형식 확인 (JPG, PNG, WebP)
3. 파일명 대소문자 확인

### 데이터가 로드되지 않는 경우
1. JSON 파일 문법 확인 (JSON Validator 사용)
2. 파일 경로 확인
3. 브라우저 개발자 도구에서 네트워크 탭 확인

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

- **이메일**: your.email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **LinkedIn**: [Your Name](https://linkedin.com/in/yourname)

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!

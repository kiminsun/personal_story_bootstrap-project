# 🚀 배포 가이드

이 문서는 개인 포트폴리오 웹사이트를 GitHub Pages에 배포하는 방법을 설명합니다.

## 📋 배포 전 체크리스트

### 1. 필수 파일 확인
- [x] `index.html` - 메인 HTML 파일
- [x] `assets/css/style.css` - 스타일시트
- [x] `assets/js/main.js` - JavaScript 파일
- [x] `data/*.json` - 데이터 파일들
- [x] `.github/workflows/deploy.yml` - GitHub Actions 설정

### 2. 개인 정보 수정
- [ ] `data/about.json` - 이름, 연락처, 자기소개 수정
- [ ] `data/experience.json` - 경력 사항 수정
- [ ] `data/skills.json` - 기술 스택 수정
- [ ] `data/projects.json` - 프로젝트 정보 수정
- [ ] `data/awards.json` - 수상/자격증 수정

### 3. 미디어 파일 준비
- [ ] `assets/images/` - 프로젝트 이미지들 추가
- [ ] `assets/videos/background-video.mp4` - 배경 비디오 추가 (선택사항)
- [ ] `assets/images/og-image.jpg` - 소셜 미디어 공유 이미지
- [ ] `assets/images/favicon.ico` - 파비콘

## 🔧 GitHub 저장소 설정

### 1. 저장소 생성
```bash
# GitHub에서 새 저장소 생성 후
git init
git add .
git commit -m "Initial commit: Personal portfolio website"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

### 2. GitHub Pages 활성화
1. GitHub 저장소 → **Settings** 탭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source** 섹션에서 **GitHub Actions** 선택
4. 자동으로 워크플로우가 실행됩니다

### 3. 배포 확인
- **Actions** 탭에서 배포 진행 상황 확인
- 성공 시 `https://yourusername.github.io/your-repo-name` 에서 확인 가능

## ⚙️ 환경 변수 설정 (필요시)

현재 프로젝트는 정적 사이트이므로 환경 변수가 필요하지 않지만, 향후 확장 시 참고:

```yaml
# .github/workflows/deploy.yml에 추가
env:
  SITE_URL: ${{ secrets.SITE_URL }}
  GOOGLE_ANALYTICS_ID: ${{ secrets.GOOGLE_ANALYTICS_ID }}
```

## 🔍 배포 후 확인사항

### 1. 기능 테스트
- [ ] 모든 섹션이 정상적으로 표시되는지 확인
- [ ] 네비게이션 메뉴 동작 확인
- [ ] 다크모드 토글 동작 확인
- [ ] 프로젝트 모달 동작 확인
- [ ] 관리자 모드 활성화 확인 (로고 5회 클릭)

### 2. 반응형 테스트
- [ ] 데스크톱 (1920px 이상)
- [ ] 태블릿 (768px - 1024px)
- [ ] 모바일 (320px - 767px)

### 3. 브라우저 호환성 테스트
- [ ] Chrome (최신)
- [ ] Firefox (최신)
- [ ] Safari (최신)
- [ ] Edge (최신)

### 4. 성능 테스트
- [ ] Google PageSpeed Insights 점수 확인
- [ ] 이미지 최적화 상태 확인
- [ ] 로딩 시간 측정

## 🛠️ 문제 해결

### 배포 실패 시
1. **Actions** 탭에서 오류 로그 확인
2. JSON 파일 문법 오류 확인: `node scripts/validate-json.js`
3. 파일 경로 대소문자 확인
4. 이미지 파일 크기 확인 (GitHub 100MB 제한)

### 이미지가 표시되지 않는 경우
1. 파일 경로 확인 (`./assets/images/`)
2. 파일명 대소문자 정확히 입력
3. 지원되는 형식 사용 (JPG, PNG, SVG, WebP)

### 스타일이 적용되지 않는 경우
1. CSS 파일 경로 확인
2. CDN 링크 상태 확인 (Bootstrap, Font Awesome)
3. 브라우저 캐시 삭제

## 📈 SEO 최적화

### 1. 메타 태그 수정
`index.html`에서 다음 항목들을 개인 정보에 맞게 수정:
- `<title>` 태그
- `<meta name="description">` 
- `<meta name="keywords">`
- Open Graph 태그들
- Twitter Card 태그들

### 2. 구조화된 데이터 추가 (선택사항)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Your Name",
  "jobTitle": "Software Developer",
  "url": "https://yourusername.github.io"
}
</script>
```

### 3. 사이트맵 생성 (선택사항)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourusername.github.io/your-repo</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

## 📊 분석 도구 연동

### Google Analytics 4 추가
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Google Search Console 등록
1. [Google Search Console](https://search.google.com/search-console) 접속
2. 속성 추가 → URL 접두어 방식
3. HTML 태그 또는 HTML 파일로 소유권 확인

## 🔄 지속적인 업데이트

### 1. 정기적인 업데이트
- 프로젝트 정보 추가/수정
- 경력 사항 업데이트
- 새로운 스킬 추가
- 수상/자격증 추가

### 2. 성능 모니터링
- Google Analytics 데이터 확인
- 사용자 피드백 수집
- 페이지 로딩 속도 개선

### 3. 보안 업데이트
- 의존성 라이브러리 업데이트
- CDN 링크 최신 버전 유지

---

## 📞 지원

배포 과정에서 문제가 발생하면:
1. GitHub Issues에 문제 보고
2. [GitHub Pages 문서](https://docs.github.com/en/pages) 참조
3. [GitHub Actions 문서](https://docs.github.com/en/actions) 참조

**성공적인 배포를 위해 이 체크리스트를 단계별로 따라해주세요! 🚀**

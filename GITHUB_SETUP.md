# 🔧 GitHub 저장소 설정 가이드

## 1. 저장소 생성 및 코드 업로드

### 저장소 생성
1. GitHub에 로그인
2. 우상단 **+** 버튼 → **New repository**
3. Repository name: `personal-portfolio` (또는 원하는 이름)
4. Public으로 설정 (GitHub Pages 무료 사용을 위해)
5. **Create repository** 클릭

### 코드 업로드
현재 디렉토리에서 다음 명령어 실행:

```bash
# Git 초기화 (아직 안했다면)
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: Personal portfolio website"

# 메인 브랜치로 변경
git branch -M main

# 원격 저장소 연결 (YOUR_USERNAME과 YOUR_REPO_NAME을 실제 값으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 코드 푸시
git push -u origin main
```

## 2. GitHub Pages 설정

### 자동 배포 활성화
1. GitHub 저장소 페이지에서 **Settings** 탭 클릭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source** 섹션에서 **GitHub Actions** 선택
   - ⚠️ "Deploy from a branch"가 아님!
4. 저장하면 자동으로 워크플로우가 실행됩니다

### 배포 확인
1. **Actions** 탭에서 배포 진행 상황 확인
2. 성공 시 녹색 체크마크 표시
3. **Settings** → **Pages**에서 사이트 URL 확인
   - 보통 `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME` 형태

## 3. 인증 관련 문제 해결

### 🔐 Personal Access Token이 필요한 경우

만약 푸시할 때 인증 오류가 발생하면:

1. **GitHub** → **Settings** (프로필 설정)
2. **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. **Generate new token** → **Generate new token (classic)**
4. 다음 권한 선택:
   - `repo` (전체 저장소 접근)
   - `workflow` (GitHub Actions)
5. 생성된 토큰을 복사 (한 번만 표시됨!)

### Git 인증 설정
```bash
# 사용자 정보 설정
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 토큰 사용해서 푸시 (비밀번호 대신 토큰 입력)
git push -u origin main
```

### 🔑 SSH 키 사용 (권장)

더 안전한 방법으로 SSH 키를 사용할 수 있습니다:

1. **SSH 키 생성**:
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

2. **SSH 키를 GitHub에 등록**:
   - `~/.ssh/id_ed25519.pub` 파일 내용 복사
   - GitHub → Settings → SSH and GPG keys → New SSH key

3. **원격 저장소 URL 변경**:
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
```

## 4. 일반적인 오류 해결

### 배포 실패 시
1. **Actions** 탭에서 오류 로그 확인
2. 빨간색 X 표시 클릭해서 상세 오류 확인
3. 주요 오류 유형:
   - JSON 문법 오류 → `node scripts/validate-json.js` 실행
   - 파일 경로 오류 → 대소문자 확인
   - 권한 오류 → 저장소가 Public인지 확인

### 사이트가 표시되지 않는 경우
1. **Settings** → **Pages**에서 URL 확인
2. 배포 완료까지 5-10분 대기
3. 브라우저 캐시 삭제 후 재시도

## 5. 2단계 인증 (2FA) 사용자

GitHub에서 2단계 인증을 사용하는 경우:

1. **Personal Access Token 필수 사용**
2. 비밀번호 대신 토큰을 입력
3. 또는 SSH 키 사용 권장

## 6. 배포 상태 확인

### 성공적인 배포 확인 방법
1. **Actions** 탭에서 녹색 체크마크 확인
2. **Settings** → **Pages**에서 "Your site is published at..." 메시지 확인
3. 제공된 URL로 접속해서 사이트 확인

### 배포 URL 예시
- 개인 사이트: `https://username.github.io` (저장소명이 username.github.io인 경우)
- 프로젝트 사이트: `https://username.github.io/repository-name`

---

## 📞 추가 도움이 필요한 경우

1. **GitHub 공식 문서**: https://docs.github.com/en/pages
2. **GitHub Actions 문서**: https://docs.github.com/en/actions
3. **Git 기본 사용법**: https://git-scm.com/docs

**어떤 단계에서 문제가 발생했는지 알려주시면 더 구체적으로 도와드릴 수 있습니다!** 🚀

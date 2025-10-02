#!/usr/bin/env node

/**
 * JSON 파일 검증 스크립트
 * 모든 데이터 JSON 파일의 유효성을 검사합니다.
 */

const fs = require('fs');
const path = require('path');

// 검증할 JSON 파일들
const jsonFiles = [
    'data/about.json',
    'data/experience.json',
    'data/skills.json',
    'data/projects.json',
    'data/awards.json'
];

// 색상 코드 (콘솔 출력용)
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

/**
 * 로그 출력 함수
 */
function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * JSON 파일 검증
 */
function validateJsonFile(filePath) {
    try {
        // 파일 존재 여부 확인
        if (!fs.existsSync(filePath)) {
            log(`❌ 파일이 존재하지 않습니다: ${filePath}`, 'red');
            return false;
        }

        // 파일 읽기
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // JSON 파싱
        const jsonData = JSON.parse(fileContent);
        
        // 기본 검증
        if (jsonData === null || jsonData === undefined) {
            log(`❌ 빈 데이터: ${filePath}`, 'red');
            return false;
        }

        // 파일별 특별 검증
        const isValid = validateSpecificStructure(filePath, jsonData);
        
        if (isValid) {
            log(`✅ 유효한 JSON: ${filePath}`, 'green');
            return true;
        } else {
            return false;
        }
        
    } catch (error) {
        log(`❌ JSON 파싱 오류 in ${filePath}: ${error.message}`, 'red');
        return false;
    }
}

/**
 * 파일별 구조 검증
 */
function validateSpecificStructure(filePath, data) {
    const fileName = path.basename(filePath, '.json');
    
    try {
        switch (fileName) {
            case 'about':
                return validateAboutStructure(data);
            case 'experience':
                return validateExperienceStructure(data);
            case 'skills':
                return validateSkillsStructure(data);
            case 'projects':
                return validateProjectsStructure(data);
            case 'awards':
                return validateAwardsStructure(data);
            default:
                return true;
        }
    } catch (error) {
        log(`❌ 구조 검증 오류 in ${filePath}: ${error.message}`, 'red');
        return false;
    }
}

/**
 * About 구조 검증
 */
function validateAboutStructure(data) {
    const required = ['name', 'motto', 'description', 'email', 'phone', 'location', 'kpis'];
    
    for (const field of required) {
        if (!data[field]) {
            log(`❌ about.json: 필수 필드 누락 - ${field}`, 'red');
            return false;
        }
    }
    
    // KPI 구조 검증
    const kpiRequired = ['experience', 'projects', 'teamSize', 'clients'];
    for (const field of kpiRequired) {
        if (!data.kpis[field]) {
            log(`❌ about.json: KPI 필드 누락 - ${field}`, 'red');
            return false;
        }
    }
    
    return true;
}

/**
 * Experience 구조 검증
 */
function validateExperienceStructure(data) {
    if (!Array.isArray(data)) {
        log(`❌ experience.json: 배열이어야 합니다`, 'red');
        return false;
    }
    
    const required = ['company', 'position', 'period', 'tasks'];
    
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        for (const field of required) {
            if (!item[field]) {
                log(`❌ experience.json[${i}]: 필수 필드 누락 - ${field}`, 'red');
                return false;
            }
        }
        
        if (!Array.isArray(item.tasks)) {
            log(`❌ experience.json[${i}]: tasks는 배열이어야 합니다`, 'red');
            return false;
        }
    }
    
    return true;
}

/**
 * Skills 구조 검증
 */
function validateSkillsStructure(data) {
    if (!Array.isArray(data)) {
        log(`❌ skills.json: 배열이어야 합니다`, 'red');
        return false;
    }
    
    const required = ['category', 'icon', 'skills'];
    
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        for (const field of required) {
            if (!item[field]) {
                log(`❌ skills.json[${i}]: 필수 필드 누락 - ${field}`, 'red');
                return false;
            }
        }
        
        if (!Array.isArray(item.skills)) {
            log(`❌ skills.json[${i}]: skills는 배열이어야 합니다`, 'red');
            return false;
        }
        
        // 개별 스킬 검증
        for (let j = 0; j < item.skills.length; j++) {
            const skill = item.skills[j];
            if (!skill.name || typeof skill.level !== 'number') {
                log(`❌ skills.json[${i}].skills[${j}]: name과 level(숫자)이 필요합니다`, 'red');
                return false;
            }
            
            if (skill.level < 0 || skill.level > 100) {
                log(`❌ skills.json[${i}].skills[${j}]: level은 0-100 사이여야 합니다`, 'red');
                return false;
            }
        }
    }
    
    return true;
}

/**
 * Projects 구조 검증
 */
function validateProjectsStructure(data) {
    if (!Array.isArray(data)) {
        log(`❌ projects.json: 배열이어야 합니다`, 'red');
        return false;
    }
    
    const required = ['title', 'description', 'image', 'tags', 'techStack'];
    
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        for (const field of required) {
            if (!item[field]) {
                log(`❌ projects.json[${i}]: 필수 필드 누락 - ${field}`, 'red');
                return false;
            }
        }
        
        if (!Array.isArray(item.tags)) {
            log(`❌ projects.json[${i}]: tags는 배열이어야 합니다`, 'red');
            return false;
        }
    }
    
    return true;
}

/**
 * Awards 구조 검증
 */
function validateAwardsStructure(data) {
    if (!Array.isArray(data)) {
        log(`❌ awards.json: 배열이어야 합니다`, 'red');
        return false;
    }
    
    const required = ['title', 'organization', 'period', 'description', 'icon'];
    
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        for (const field of required) {
            if (!item[field]) {
                log(`❌ awards.json[${i}]: 필수 필드 누락 - ${field}`, 'red');
                return false;
            }
        }
    }
    
    return true;
}

/**
 * 메인 실행 함수
 */
function main() {
    log('🔍 JSON 파일 검증을 시작합니다...', 'cyan');
    log('', 'reset');
    
    let allValid = true;
    
    for (const filePath of jsonFiles) {
        const isValid = validateJsonFile(filePath);
        if (!isValid) {
            allValid = false;
        }
    }
    
    log('', 'reset');
    
    if (allValid) {
        log('🎉 모든 JSON 파일이 유효합니다!', 'green');
        process.exit(0);
    } else {
        log('💥 일부 JSON 파일에 오류가 있습니다. 위의 오류를 수정해주세요.', 'red');
        process.exit(1);
    }
}

// 스크립트 실행
if (require.main === module) {
    main();
}

module.exports = {
    validateJsonFile,
    validateSpecificStructure
};

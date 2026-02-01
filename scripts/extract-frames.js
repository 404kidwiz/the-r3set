#!/usr/bin/env node

/**
 * FFmpeg Frame Extraction Script
 * 
 * Automates the extraction of video frames for scroll-scrubbed sequences.
 * Converts .mp4/.mov videos into optimized JPEG frames at 24fps.
 * 
 * Requirements:
 *   - FFmpeg installed (brew install ffmpeg / apt install ffmpeg / choco install ffmpeg)
 * 
 * Usage:
 *   1. Create source-videos/ directory
 *   2. Add your .mp4 or .mov files
 *   3. Run: node scripts/extract-frames.js
 *   4. Frames output to: public/sequences/[video-name]/
 * 
 * @design-system Asset pipeline automation for cinematic scroll-scrubbed videos
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const VIDEOS_DIR = './source-videos';
const OUTPUT_DIR = './public/sequences';

// QUALITY PRESETS (choose one):
// - PREMIUM: Near-lossless, ~200KB/frame, ideal for hero sections/featured content
// - HIGH: Excellent quality, ~150KB/frame, recommended for all scroll sequences
// - BALANCED: Good quality, ~100KB/frame, use if bundle size is critical
const QUALITY_PRESET = 'PREMIUM'; // Options: 'PREMIUM', 'HIGH', 'BALANCED'

const QUALITY_MAP = {
    PREMIUM: 2,    // FFmpeg -q:v 2 (best)
    HIGH: 3,       // FFmpeg -q:v 3 (excellent)
    BALANCED: 5,   // FFmpeg -q:v 5 (good)
};

const FPS = 24;                // Frames per second (24=cinematic, 30=smooth, 60=ultra-smooth)
const WIDTH = 3840;            // Output width in pixels (1920=FHD, 2560=2K, 3840=4K)
// Height auto-calculated to maintain aspect ratio

// Color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
};

console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`🎬 FFmpeg Frame Extraction Script`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
console.log(`Quality: ${colors.green}${QUALITY_PRESET}${colors.reset} (FFmpeg -q:v ${QUALITY_MAP[QUALITY_PRESET]}) | Resolution: ${colors.green}${WIDTH}px${colors.reset} | FPS: ${colors.green}${FPS}${colors.reset}\n`);

// Check if source directory exists
if (!fs.existsSync(VIDEOS_DIR)) {
    console.error(`${colors.red}✗ Error: ${VIDEOS_DIR} does not exist.${colors.reset}`);
    console.log(`${colors.yellow}Creating directory: ${VIDEOS_DIR}${colors.reset}\n`);
    fs.mkdirSync(VIDEOS_DIR, { recursive: true });
    console.log(`${colors.yellow}Please add .mp4 or .mov files to ${VIDEOS_DIR} and run again.${colors.reset}`);
    process.exit(0);
}

// Check if FFmpeg is installed
try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
} catch (err) {
    console.error(`${colors.red}✗ Error: FFmpeg is not installed.${colors.reset}`);
    console.log(`\nInstall FFmpeg:`);
    console.log(`  macOS:   ${colors.cyan}brew install ffmpeg${colors.reset}`);
    console.log(`  Ubuntu:  ${colors.cyan}apt install ffmpeg${colors.reset}`);
    console.log(`  Windows: ${colors.cyan}choco install ffmpeg${colors.reset}\n`);
    process.exit(1);
}

// Create output directory
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Get all video files
const videos = fs.readdirSync(VIDEOS_DIR).filter(f =>
    f.endsWith('.mp4') || f.endsWith('.mov') || f.endsWith('.MP4') || f.endsWith('.MOV')
);

if (videos.length === 0) {
    console.error(`${colors.red}✗ No video files found in ${VIDEOS_DIR}${colors.reset}`);
    console.log(`${colors.yellow}Supported formats: .mp4, .mov${colors.reset}\n`);
    process.exit(0);
}

console.log(`Found ${colors.green}${videos.length}${colors.reset} video(s):\n`);
videos.forEach((v, i) => console.log(`  ${i + 1}. ${v}`));
console.log();

// Process each video
let successCount = 0;
let failCount = 0;

videos.forEach((video, index) => {
    const name = path.basename(video, path.extname(video));
    const outputPath = path.join(OUTPUT_DIR, name);

    // Create output directory
    fs.mkdirSync(outputPath, { recursive: true });

    // FFmpeg command to extract frames
    // -vf "fps=X,scale=Y:-1" = Extract X fps, scale to Y width, auto-height (maintains aspect ratio)
    // -q:v N = JPEG quality (2=best/near-lossless, 31=worst) - LOWER is BETTER
    // -pix_fmt yuvj420p = Full-range YUV color (prevents washed-out colors)
    const ffmpegQuality = QUALITY_MAP[QUALITY_PRESET];

    const cmd = `ffmpeg -i "${path.join(VIDEOS_DIR, video)}" -vf "fps=${FPS},scale=${WIDTH}:-1" -q:v ${ffmpegQuality} -pix_fmt yuvj420p "${path.join(outputPath, 'ezgif-frame-%03d.jpg')}"`;

    console.log(`${colors.cyan}[${index + 1}/${videos.length}]${colors.reset} Extracting: ${colors.yellow}${video}${colors.reset}`);
    console.log(`         → ${outputPath}`);

    try {
        execSync(cmd, { stdio: 'pipe' }); // Use 'pipe' to suppress FFmpeg verbose output

        // Count extracted frames
        const frames = fs.readdirSync(outputPath).filter(f => f.endsWith('.jpg'));
        console.log(`${colors.green}         ✓ Success: ${frames.length} frames extracted${colors.reset}\n`);
        successCount++;
    } catch (err) {
        console.error(`${colors.red}         ✗ Failed: ${err.message}${colors.reset}\n`);
        failCount++;
    }
});

// Summary
console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
console.log(`Summary:`);
console.log(`  ${colors.green}✓ Success: ${successCount}${colors.reset}`);
if (failCount > 0) {
    console.log(`  ${colors.red}✗ Failed:  ${failCount}${colors.reset}`);
}
console.log(`\nFrames saved to: ${colors.cyan}${OUTPUT_DIR}${colors.reset}`);
console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

// Next steps reminder
console.log(`${colors.yellow}Next steps:${colors.reset}`);
console.log(`  1. Verify frames in ${OUTPUT_DIR}/`);
console.log(`  2. Update page.tsx with new basePath:`);
console.log(`     ${colors.cyan}<ScrollVideoSequence basePath="/sequences/${videos[0] ? path.basename(videos[0], path.extname(videos[0])) : 'your-video'}" frameCount={X} />${colors.reset}`);
console.log(`  3. Test scroll-scrubbing in browser\n`);

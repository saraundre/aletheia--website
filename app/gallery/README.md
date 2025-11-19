# Gallery - Videos and Photos

This directory contains the gallery page showcasing our video content and photo collections. The gallery now features both video interviews and photo documentation of our events and activities.

## Video Collection

### 1. STEM for ALL x NTU LPD Collaboration with Project LOVE
**YouTube Link:** https://youtu.be/3z-Bf7_tB2g

**Description:** Dr. John Heng discusses the collaboration between STEM for ALL, NTU LPD, and Project LOVE, highlighting robotics and mechatronics education at NTU.

**Speaker:** Dr. John Heng - Head of the Robotics and Mechatronics Programme at the School of Mechanical & Aerospace Engineering, Nanyang Technological University.

---

### 2. STEM for All: Equitable Learning
**YouTube Link:** https://youtu.be/OKZwinw3kko

**Description:** Discover how we're making STEM education accessible to every student through innovative partnerships and community outreach.

**Speaker:** Steve Tung — Child Street 11, Head Marketing & Sustainable Sponsorships

---

### 3. Prof Marcelo Ang: Educational Leadership and Innovation in STEM
**YouTube Link:** https://youtu.be/peewpaS8_Bg

**Description:** Educational leadership and innovation in STEM, exploring cutting-edge approaches to robotics education and research collaboration.

**Speaker:** Prof. Marcelo Ang — Professor of Mechanical Engineering in the NUS, Director of Advance Robotics Center, President of Robotic Games Society

---

### 4. Mom Don't Cry Foundation: A Story of Resilience and Hope
**YouTube Link:** https://youtu.be/sp39XrJA0HE

**Description:** A powerful story of resilience and hope through the Mom Don't Cry Foundation, showcasing community support and transformation.

**Speaker:** Miss YangLan — Mom Don't Cry Foundation, Chairlady

---

### 5. Child Street 11 Kids: Inspiring Journeys
**YouTube Link:** https://youtu.be/jwfFaKxnsGY

**Description:** Follow the inspiring journeys of children from Street 11 as they discover new possibilities through STEM education and community support.

**Speaker:** Featuring children and educators from the Child Street 11 program

---

### 6. STEM FOR ALL x NTU LDP Charity Drive: Robot Parade
**YouTube Link:** https://youtu.be/u_bBdjv48iI

**Description:** Our charity drive event at Maker Festival Regional Library Singapore, featuring an exciting robot parade and community engagement.

**Speaker:** In Partnership with Project Love (Nanyang Technological University Singapore School of Mechanical and Aerospace School of Engineering, Leadership Development Programme)

---

### 7. Official Opening Speech By Dr. Sein
**YouTube Link:** https://youtu.be/y5VDXxmRYKw

**Description:** Dr. Sein delivers the official opening speech for our charity drive collaboration with NTU Leadership Development Programme at Maker Festival 2025.

**Speaker:** Dr. Sein - Founder of STEM for ALL Charity Drive with NTU LDP 2025

---

## Photo Collection

### Maker Festival 2024 Event Photos

The gallery now includes a collection of photos from our collaboration at the Maker Festival 2024, showcasing the interactive nature of our STEM education initiatives.

#### 1. STEM for All x Maker Festival 2024 - Main Event
**File:** `STEM for All x Maker Festival 2024.jpg`
**Description:** A vibrant showcase of our collaboration at the Maker Festival 2024, featuring interactive STEM demonstrations and community engagement activities.

#### 2. Maker Festival 2024 - Interactive Workshops
**File:** `STEM for All x Maker Festival 2024 (2).JPG`
**Description:** Students and educators participating in hands-on STEM workshops, demonstrating the practical application of robotics and technology education.

#### 3. Community Engagement at Maker Festival 2024
**File:** `STEM for All x Maker Festival 2024 (3).JPG`
**Description:** Community members exploring our STEM exhibits and learning about the impact of technology education on youth development.

#### 4. Maker Festival 2024 - Closing Celebration
**File:** `STEM for All x Maker Festival 2024 (4).jpg`
**Description:** The successful conclusion of our Maker Festival 2024 collaboration, celebrating the achievements and connections made during the event.

---

### China Collaborations 2025

#### 1. STEM for All x SparkOS trailblazing in China, Yunnan. 2025
**File:** `SparkOS x Ugly duck school Yunan 2025.jpg`
**Description:** STEM for All x SparkOS is on a mission to create a global community, one relationship at a time. We are on track to make a difference for neurodivergent, under resourced and minority communities. A collaboration with Ugly Duckling School, Yunnan.

#### 2. STEM for All x SparkOS Kiai in China, Foshan. 2025
**File:** `SparkOS x Yuegu Foshan 2025.jpg`
**Description:** STEM for All x SparkOS at community spaces for good. Designed to foster social connections, provide skill training and ensure sustainable community empowerment. A collaboration with Yuegu, Foshan.

#### 3. Maker Faire 2025, China Guangzhou. 2025
**File:** `SparkOS x STEM for All x Maker Festival 2025 Guangzhou.jpg.jpg`
**Description:** STEM for All at Maker Faire 2025, Guangzhou to share about inclusivity, equitable quality education and learning opportunities for all.

#### 4. STEM for All x SparkOS at China, Beijing. 2025
**File:** `SparkOS x Beijing 2025.jpg`
**Description:** "Individually, we are one drop. Together, we are an ocean", says Ryunosuke Satoro. STEM for All x SparkOS is part of United Nations Sustainable Development Goals to create an immense and powerful impact for people and planet (animals included). A collaboration with Zhengxin, Beijing.

---

## Technical Implementation

### Video Features
- **Video Thumbnails:** Automatically generated using YouTube's thumbnail API (`https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg`)
- **Embedded Playback:** Videos play directly on the page using YouTube's embed API
- **Interactive Controls:** Click to play/pause, close button to return to thumbnail view

### Photo Features
- **Photo Display:** High-quality photos with hover effects and smooth transitions
- **Responsive Images:** Photos adapt to different screen sizes while maintaining aspect ratio
- **Optimized Loading:** Photos are served from the local `/public/gallery/photos/` directory

### General Features
- **Responsive Design:** Gallery adapts to different screen sizes
- **Accessibility:** Proper alt text, ARIA labels, and keyboard navigation support
- **Mixed Content:** Seamless integration of videos and photos in the same gallery layout

## User Experience

The gallery provides an immersive multimedia experience:
- **Video Thumbnail View:** High-quality thumbnails with play button overlay
- **Video Embedded Playback:** Videos play directly on the page without leaving the gallery
- **Photo Display:** High-quality photos with subtle hover effects
- **Easy Navigation:** Close button allows users to return to thumbnail view
- **Responsive Layout:** Works seamlessly on desktop, tablet, and mobile devices
- **Mixed Content:** Videos and photos are displayed in a unified, consistent layout

## Usage

The gallery page is accessible at `/gallery` and displays all videos in a responsive grid layout. Each video card includes:
- High-quality thumbnail from YouTube
- Title and description
- Speaker/attribution information
- Click-to-play embedded functionality
- Close button for embedded videos

### Video Interaction Flow:
1. User sees thumbnail with play button
2. Click thumbnail to embed and play video
3. Video plays directly on the page
4. Click 'X' button to close video and return to thumbnail

### Photo Interaction Flow:
1. User sees photo with subtle hover effect
2. Photo scales slightly on hover for enhanced interaction
3. Photos are displayed at full quality without additional controls

### Adding New Content:

**To add new videos:**
1. Update the `galleryItems` array in `app/gallery/page.tsx`
2. Add the new video information to this README
3. Ensure the YouTube link follows the format `https://youtu.be/{VIDEO_ID}`

**To add new photos:**
1. Upload photos to the appropriate subdirectory in `public/gallery/photos/`
2. Update the `galleryItems` array in `app/gallery/page.tsx` with type: "photo"
3. Add the new photo information to this README
4. Ensure photos follow the naming convention and quality guidelines 
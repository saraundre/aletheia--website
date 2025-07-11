# Gallery Videos

This directory contains the gallery page showcasing our video content. Below is the complete list of videos featured in the gallery with their corresponding YouTube links.

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

## Technical Implementation

- **Video Thumbnails:** Automatically generated using YouTube's thumbnail API (`https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg`)
- **Embedded Playback:** Videos play directly on the page using YouTube's embed API
- **Interactive Controls:** Click to play/pause, close button to return to thumbnail view
- **Responsive Design:** Gallery adapts to different screen sizes
- **Accessibility:** Proper alt text, ARIA labels, and keyboard navigation support

## User Experience

The gallery provides an immersive video experience:
- **Thumbnail View:** High-quality thumbnails with play button overlay
- **Embedded Playback:** Videos play directly on the page without leaving the gallery
- **Easy Navigation:** Close button allows users to return to thumbnail view
- **Responsive Layout:** Works seamlessly on desktop, tablet, and mobile devices

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

To add new videos:
1. Update the `galleryItems` array in `app/gallery/page.tsx`
2. Add the new video information to this README
3. Ensure the YouTube link follows the format `https://youtu.be/{VIDEO_ID}` 
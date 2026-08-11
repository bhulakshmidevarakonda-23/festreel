FESTREEL MVP

1. Put your MP4 videos inside the "reels" folder.
2. Name them reel1.mp4, reel2.mp4, reel3.mp4, reel4.mp4
   OR change the filenames in script.js.
3. Open index.html in a browser to test.
4. For the real QR version, this folder needs to be hosted online.
5. The QR code will point to the hosted index.html/page.

Current MVP behavior:
- No user login.
- Same QR/page can be used by everyone.
- Each page load selects a random reel.
- The "Show Another Reel" button selects another reel.
- Immediate previous reel is avoided when there is more than one reel.
- Video starts muted to satisfy common browser autoplay restrictions.

Next production step:
- Move videos to cloud storage.
- Add a backend/database for content management.
- Deploy the site.
- Generate one permanent QR code pointing to the site.

// Presets
let fps = 60;
let frame = 0;
let satellites = 10;
let satelliteSize = 10;
let orbitSize = 250;
let orbitSpeed = 0.25;

// Add resize handler to keep canvas full size
(() => {
    const canvas = document.getElementById("canvas");
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    window.dispatchEvent(new Event("resize"));
})();

// Animation
(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let previousTime = performance.now();
    const animationLoop = (currentTime) => {
        // Animation logic to keep speeds the same on different refresh rate monitors
        let multiplier = (currentTime - previousTime) / (1000 / fps);
        frame += 1 * multiplier;
        previousTime = currentTime;

        // Generate satellite coordinates on the canvas based on frame
        let coordinates = new Array(satellites).fill().map((value, index) => {
            let angle = frame * orbitSpeed * (index + 1) * (Math.PI / 180);
            return {
                x: canvas.width / 2 + Math.cos(angle) * orbitSize,
                y: canvas.height / 2 + Math.sin(angle) * orbitSize
            }
        });

        // Clear previous frame
        ctx.fillStyle = "#111111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw orbit outline
        ctx.strokeStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, orbitSize, 0, 2 * Math.PI);
        ctx.stroke();

        coordinates.forEach((current, index) => {
            // Draw satellites
            ctx.fillStyle = "#FFFFFF";
            ctx.beginPath();
            ctx.arc(current.x, current.y, satelliteSize, 0, 2 * Math.PI);
            ctx.fill();

            // Draw connecting vertices to each satellite
            for(let i = 0; i < coordinates.length; i ++) {
                if(current === coordinates[i]) continue;
                ctx.beginPath();
                ctx.moveTo(current.x, current.y);
                ctx.lineTo(coordinates[i].x, coordinates[i].y);
                ctx.stroke();
            }
        });

        requestAnimationFrame(animationLoop);
    }
    requestAnimationFrame(animationLoop);
})();
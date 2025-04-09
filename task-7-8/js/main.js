class Iris {
    constructor(sepalLength, sepalWidth, petalLength, petalWidth, species) {
        this.sepalLength = sepalLength;
        this.sepalWidth = sepalWidth;
        this.petalLength = petalLength;
        this.petalWidth = petalWidth;
        this.species = species;
        
        this.x = 0;
        this.y = 0;

        // random speed and angle
        this.angle = Math.random() * Math.PI * 2; 
        this.speed = 0.05 + Math.random() * 0.1; 
        
        this.radius = this.petalWidth * 3; // size based on petal width
        this.opacity = 0.7 + Math.random() * 0.3; // random opacity
        this.twinkleSpeed = 0.02 + Math.random() * 0.03; // speed of twinkling

        // velocity properties for mouse pushing
        this.vx = 0;
        this.vy = 0;

        // friction to slow down velocity gradually
        this.friction = 0.75;

        // how much this star will be pushed based on size, smaller stars pushed more
        this.pushFactor = 1 / (this.radius * 0.5);
        
        // store original position for eventual return
        this.originalX = 0;
        this.originalY = 0;
        
        // force to gradually return to original position
        this.returnForce = 0.01;
    }

    pickColour() {
        switch(this.species) {
            case 'setosa':
                return '#5D9CEC'; // blue
            case 'versicolor':
                return '#AC92EB'; // purple
            case 'virginica':
                return '#EC87C0'; // pink
            default:
                return '#FFFFFF'; // white
        }
    }

    setInitialPosition(canvasWidth, canvasHeight) {
        // map sepal dimensions to spiral galaxy coordinates
        const distFromCenter = this.sepalLength * 20 + this.sepalWidth * 15;
        const baseAngle = (this.species === 'setosa') ? 0 : 
                          (this.species === 'versicolor') ? 2.1 : 4.2;
        
        const spiralAngle = baseAngle + (distFromCenter / 200);
        
        // position using polar coordinates for spiral galaxy effect
        this.x = canvasWidth/2 + Math.cos(spiralAngle) * distFromCenter;
        this.y = canvasHeight/2 + Math.sin(spiralAngle) * distFromCenter;

        this.originalX = this.x;
        this.originalY = this.y;
    }

    draw(context, time) {
        // twinkle effect using time
        const twinkle = 0.7 + 0.3 * Math.sin(time * this.twinkleSpeed);
        const radius = this.radius * twinkle;
        const opacity = this.opacity * twinkle;
        
        // draw star (gradient circle)
        const gradient = context.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, radius * 2
        );
        
        const color = this.pickColour();
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.5, color + Math.floor(opacity * 255).toString(16));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        context.beginPath();
        context.fillStyle = gradient;
        context.arc(this.x, this.y, radius * 2, 0, Math.PI * 2);
        context.fill();
    }

    // function to handle pushing effect when mouse gets close
    applyMouseForce(mouseX, mouseY, mouseVX, mouseVY) {
        // distance between mouse and star
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // push stars within certain radius
        const pushRadius = 100;
        
        if (distance < pushRadius) {
            // push force stronger when closer
            const force = (1 - distance / pushRadius) * 15 * this.pushFactor;
            
            // normalize direction vector
            const dirX = dx / distance || 0;
            const dirY = dy / distance || 0;
            
            // apply force to velocity
            this.vx += dirX * force + mouseVX * 0.2;
            this.vy += dirY * force + mouseVY * 0.2;
        }
    }

    // update position for animation
    update() {
        // orbital-ish movement
        this.angle += this.speed * 0.01;
        const orbitRadius = 1;
        this.originalX += Math.cos(this.angle) * orbitRadius * 0.1;
        this.originalY += Math.sin(this.angle) * orbitRadius * 0.1;
        
        this.x += this.vx;
        this.y += this.vy;
        
        this.vx *= this.friction;
        this.vy *= this.friction;
        
        const returnX = this.originalX - this.x;
        const returnY = this.originalY - this.y;
        this.vx += returnX * this.returnForce;
        this.vy += returnY * this.returnForce;
    }
}

window.onload = async function () {
    const response = await fetch('data/iris.json');
    const data = await response.json();

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 800;
    document.body.appendChild(canvas);
    
    const context = canvas.getContext('2d');

    // create iris objects
    const irisObjects = data.map(item => {
        const iris = new Iris(
            item.sepalLength, 
            item.sepalWidth, 
            item.petalLength, 
            item.petalWidth, 
            item.species
        );
        iris.setInitialPosition(canvas.width, canvas.height);
        return iris;
    });

    // mouse position and velocity
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let mouseVX = 0;
    let mouseVY = 0;
    
    canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
        
        mouseVX = mouseX - prevMouseX;
        mouseVY = mouseY - prevMouseY;
    });
    
    let time = 0;
    
    function animate() {
        context.fillStyle = 'rgba(0, 0, 0, 0.1)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // update and draw iris objects
        irisObjects.forEach(iris => {
            iris.applyMouseForce(mouseX, mouseY, mouseVX, mouseVY);
            iris.update();
            iris.draw(context, time);
        });
        
        // reduce mouse velocity when not moving
        mouseVX *= 0.9;
        mouseVY *= 0.9;
        
        time += 0.01;
        requestAnimationFrame(animate);
    }
    
    animate();
}
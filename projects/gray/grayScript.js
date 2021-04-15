var svg = d3.select("#mySvg");

const circleRadius = 10;
const intervalTime = 20;
const colorMixPercentage = 0.8;

let allCircles = [];
let currentTransPairs = [];
let play = true;
let toAddCircle = false;
let toRemoveCircle = false;
let currentColor = {
    r: 255,
    g: 255,
    b: 255
};
let idCount = 0;
let speedOfBall = 30;

const topBoundary = 0;
const bottomBoundary = 600;
const leftBoundary = 0;
const rightBoundary = 800;

function initializeCircle(x, y, r, g, b, a, vx, vy) {
    idCount += 1;
    var circleElement = svg
        .append('circle')
        .attr("id", "circle" + idCount.toString())
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', circleRadius)
        .style('fill', `rgba(${r}, ${g}, ${b}, ${a})`);
    var velocityX = vx;
    var velocityY = vy;
    return { circleElement, velocityX, velocityY, idCount };
}

function moveToNewPosition(circleObject) {
    var dx = circleObject.velocityX * (intervalTime / 1000.0);
    var dy = circleObject.velocityY * (intervalTime / 1000.0);
    circleObject.circleElement.attr('cx', parseFloat(circleObject.circleElement.attr('cx')) + dx);
    circleObject.circleElement.attr('cy', parseFloat(circleObject.circleElement.attr('cy')) + dy);
}

function boundaryCollisions(circleObject) {
    if ((parseFloat(circleObject.circleElement.attr('cx')) + circleRadius >= rightBoundary) && (circleObject.velocityX > 0)) circleObject.velocityX *= -1;
    if ((parseFloat(circleObject.circleElement.attr('cx')) - circleRadius <= leftBoundary) && (circleObject.velocityX < 0)) circleObject.velocityX *= -1;
    if ((parseFloat(circleObject.circleElement.attr('cy')) + circleRadius >= bottomBoundary) && (circleObject.velocityY > 0)) circleObject.velocityY *= -1;
    if ((parseFloat(circleObject.circleElement.attr('cy')) - circleRadius <= topBoundary) && (circleObject.velocityY < 0)) circleObject.velocityY *= -1;
}

function circleCollision(circleObject, position) {
    for (var i = 0; i < allCircles.length; i++) {
        if (position == i) continue;
        const distance = Math.pow(
            Math.pow(parseFloat(circleObject.circleElement.attr('cx')) - parseFloat(allCircles[i].circleElement.attr('cx')), 2)
            + Math.pow(parseFloat(circleObject.circleElement.attr('cy')) - parseFloat(allCircles[i].circleElement.attr('cy')), 2), 0.5);
        if (distance <= circleRadius * 2 && pairAlreadyCollided(position, i) == false) {
            transferMomentum(circleObject, allCircles[i]);
            transferColor(circleObject, allCircles[i]);
        }
    }
}

function pairAlreadyCollided(a, b) {
    let flag = false;
    for (var i = 0; i < currentTransPairs.length; i++) {
        if ((a == currentTransPairs[i][0] && b == currentTransPairs[i][1]) || (b == currentTransPairs[i][0] && a == currentTransPairs[i][1])) {
            flag = true;
            break;
        }
    }
    if (flag == false) currentTransPairs.push([a, b]);
    return flag;
}

function transferMomentum(circleObject1, circleObject2) {

    let x1 = circleObject1.circleElement.attr('cx');
    let x2 = circleObject2.circleElement.attr('cx');
    let y1 = circleObject1.circleElement.attr('cy');
    let y2 = circleObject2.circleElement.attr('cy');

    //Calculating the normal - plane of collision
    let normal = [];
    if (x1 == x2 && y1 == y2) normal = [0, 0];
    else {
        var mag = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
        normal = [(x1 - x2) / mag, (y1 - y2) / mag];
    }

    //Calculating the relative velocity
    let relVelocity = [circleObject1.velocityX - circleObject2.velocityX, circleObject1.velocityY - circleObject2.velocityY];

    //Calculating the separating velocity and vector
    let sepVelocity = relVelocity[0] * normal[0] + relVelocity[1] * normal[1];
    let newSepVelocity = -1 * sepVelocity;
    let sepVelVector = [normal[0] * newSepVelocity, normal[1] * newSepVelocity];

    circleObject1.velocityX = circleObject1.velocityX + sepVelVector[0];
    circleObject1.velocityY = circleObject1.velocityY + sepVelVector[1];
    circleObject2.velocityX = circleObject2.velocityX + (sepVelVector[0] * -1);
    circleObject2.velocityY = circleObject2.velocityY + (sepVelVector[1] * -1);
}

function subtr(x1, y1, x2, y2) {
    return new Vector(x1 - x2, y1 - y2);
}

function transferColor(circleObject1, circleObject2) {
    const color1 = d3.rgb(circleObject1.circleElement.style('fill'));
    const color2 = d3.rgb(circleObject2.circleElement.style('fill'));

    const r1 = colorMixPercentage * color1.r + (1 - colorMixPercentage) * color2.r;
    const g1 = colorMixPercentage * color1.g + (1 - colorMixPercentage) * color2.g;
    const b1 = colorMixPercentage * color1.b + (1 - colorMixPercentage) * color2.b;
    const r2 = (1 - colorMixPercentage) * color1.r + colorMixPercentage * color2.r;
    const g2 = (1 - colorMixPercentage) * color1.g + colorMixPercentage * color2.g;
    const b2 = (1 - colorMixPercentage) * color1.b + colorMixPercentage * color2.b;

    circleObject1.circleElement.style('fill', `rgba(${r1}, ${g1}, ${b1}, ${1})`);
    circleObject2.circleElement.style('fill', `rgba(${r2}, ${g2}, ${b2}, ${1})`);
}


function doPhysics() {
    if (play) {
        //Add Movement
        for (var i = 0; i < allCircles.length; i++) moveToNewPosition(allCircles[i]);
        //Boundary Collisions
        for (var i = 0; i < allCircles.length; i++) boundaryCollisions(allCircles[i]);
        //Circle Collisions
        for (var i = 0; i < allCircles.length; i++) circleCollision(allCircles[i], i);
        //Reset transformations
        currentTransPairs = [];
    }
    //loop
    setTimeout(doPhysics, intervalTime);
}
doPhysics();


function playPause() {
    play = !play;
    if (!play) document.getElementById("playText").innerHTML = "Play";
    else document.getElementById("playText").innerHTML = "Pause";

    toAddCircle = false;
    toRemoveCircle = false;
    document.body.style.cursor = "default";
}

function colorSelect(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    currentColor = {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    };
}


function addCircle() {
    document.body.style.cursor = "crosshair";
    toAddCircle = true;
    toRemoveCircle = false;
}

function removeCircle() {
    document.body.style.cursor = "not-allowed";
    toRemoveCircle = true;
    toAddCircle = false;
}

function clearAll() {
    allCircles = [];
    svg.selectAll("*").remove();
    idCount = 0;
    toRemoveCircle = false;
    toAddCircle = false;
    document.body.style.cursor = "default";
}


document.getElementById('mySvg').onclick = function clickEvent(e) {
    var rect = document.getElementById('mySvg').getBoundingClientRect();
    var x = e.x - rect.left;
    var y = e.y - rect.top;

    // Adding circle 
    if (toAddCircle) {
        let randomVelocityX = Math.random() * (2 * speedOfBall) - speedOfBall;
        let randomVelocityY = Math.sqrt(speedOfBall ** 2 - randomVelocityX ** 2) * ((-1) ** idCount);
        let flag = false;
        for (var i = 0; i < allCircles.length; i++) {
            let cx = allCircles[i].circleElement.attr('cx');
            let cy = allCircles[i].circleElement.attr('cy');
            if (Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) <= 2 * circleRadius) {
                flag = true;
                break;
            }
        }
        if (flag == false) {
            var circlen = initializeCircle(x, y, currentColor.r, currentColor.g, currentColor.b, 1, randomVelocityX, randomVelocityY);
            allCircles.push(circlen);
        }
    }

    // Removing Circle 
    if (toRemoveCircle) {
        for (var i = 0; i < allCircles.length; i++) {
            let cx = allCircles[i].circleElement.attr('cx');
            let cy = allCircles[i].circleElement.attr('cy');
            if (Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) <= circleRadius) {
                d3.selectAll('#circle' + allCircles[i].idCount).remove();
                allCircles.splice(i, 1);
                break;
            }
        }
    }
}

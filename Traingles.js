// another spiral

"use strict";

// declare global variables
let gl; 
let points;
let colors;

window.onload = function init()
{
    let canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }


    //  Initialize our data for the triangles
    //
    //(red, green, blue) values for all of the vertices
    colors = [];

    // And, add our vertices point into our array of points
    points = [];
    let c = vec3(Math.random(), Math.random(), Math.random());
    let x = 0.0 
    let y = 0.0
    let dx = x+0.0375;
    let dy = y+0.125;
    let pt_1x = x;
    let pt_1y = dy;
    let pt_2x = dx;
    let pt_2y = dy/2;
    let pt_3x = -dx;
    let pt_3y = dy/2;
    let a = .04;
    let b = .04;
    let val = 0;
    let thetaToRotate = 180-((Math.atan((dy/2)/dx)*(180/Math.PI))*2);

    for (i = 0; i <5000; i++){
    // Math.random() gives a random number between 0 and 1


    let color = vec3(Math.random(), Math.random(), Math.random());
    let color2 = vec3(Math.random(), Math.random(), Math.random());
    let color3 = vec3(Math.random(), Math.random(), Math.random()); 
        for ( let num = 0; num< 8; num++ ){

             let pt0 = vec2(x,y);
             let pt1 = vec2(pt_1x + x , pt_1y + y);
            let pt2 = vec2(pt_2x + x, pt_2y+ y );
            let pt3 = vec2(pt_3x + x,pt_3y + y);
          ///  let color = vec3(Math.random(), Math.random(), Math.random());
           // let color2 = vec3(Math.random(), Math.random(), Math.random());
           // let color3 = vec3(Math.random(), Math.random(), Math.random()); 
            var i;

            drawSolidTriangle(pt0, pt1, pt2, color,color2, color3);
            drawSolidTriangle(pt0, pt1 , pt3, c,c, c);
 
            let tempx = pt_1x;
            let tempy = pt_1y;
             pt_1x= (tempx*Math.cos(thetaToRotate))-(tempy*Math.sin(thetaToRotate));
             pt_1y = (tempx*Math.sin(thetaToRotate))+(tempy*Math.cos(thetaToRotate));

            let temp = pt_2x;
            let tempy2 = pt_2y;
            pt_2x = (temp*Math.cos(thetaToRotate))-(tempy2*Math.sin(thetaToRotate));
            pt_2y = (temp*Math.sin(thetaToRotate))+(tempy2*Math.cos(thetaToRotate));
        
            temp = pt_3x;
            tempy2 = pt_3y;
            pt_3x = (temp*Math.cos(thetaToRotate))-(tempy2*Math.sin(thetaToRotate));
            pt_3y = (temp*Math.sin(thetaToRotate))+(tempy2*Math.cos(thetaToRotate));


        }
     
        for ( let num = val; num< val+10; num++ ){
            let angle = 0.0015* num;
            x = (a+b *angle) * Math.cos(angle);
            y = (a+b *angle) * Math.sin(angle);
        }
        val +=10;
    }
    
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( .9, .9, .9, 1.0 ); //slight grey

    //  Load shaders and initialize attribute buffers

    let program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    let cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    
    let colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    
    // Load the data into the GPU

    let bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    let aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( aPosition );


    render();
};

function drawSolidTriangle(pt0, pt1,pt2, color, color2, color3) {
    //adds values to points and colors global variables
    //creates a triangle at pt0, with width dx, and height dy
 
   
    points.push(pt0);
    points.push(pt1);
    points.push(pt2);
   
    colors.push(color);
    colors.push(color2);
    colors.push(color3);
   
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, points.length);
}

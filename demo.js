// three.js set up - see threejs.org for more infomation //
var scene = new THREE.Scene()
scene.background = new THREE.Color( 0xffffff )

var camera = new THREE.OrthographicCamera( window.innerWidth / - 400, window.innerWidth / 400, (0.8*window.innerHeight) / 400, (0.8*window.innerHeight) / - 400, 0.0, 1000 );

camera.position.z = 5

var renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize( window.innerWidth, 0.8*window.innerHeight )
document.body.appendChild( renderer.domElement )

var animate = function () {
    requestAnimationFrame( animate )
    renderer.render( scene, camera )
}
// end three.js set up //

// create a new linkage, type available are:
// - Polygon( size, lengths, coords, angle_helpers, show_alt_switch )
// - Arm( lengths, coords )
// note, lengths are free positive real numbers, and coords are numbers in [0, 2pi]
// unless it is for a switch in which case it is a value in {0,1}
var polygon = new Polygon( 4, [2,1,2,1], [0, 1], [], true )

// an example of dynamically creating a linkage in response to html input
function linkage_renderer_take_input() {
    
    var lengths = [2,1,2,1]
    var coords = []
    var size = 4

    for ( var i = 1; i <= size; i++ ) {
        if ( !( (document.getElementById( 'coord_'.concat(i) ) === null) ) ) {
            coords.push( document.getElementById( 'coord_'.concat(i) ).value )
        }
    }

    scene.remove( polygon.mesh )
    polygon = new Polygon( 4, lengths, coords, [], true )
    
}

// starting three.js render
animate()
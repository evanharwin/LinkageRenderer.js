class Linkage {

    // linkage constructor - drawing and adding to scene
    constructor() {
        this.mesh = new THREE.Group()
        scene.add( this.mesh )
    }

    draw_lines(show_alt_switch) {
        
        // define lines and point shapes 
        var line_material = new THREE.LineBasicMaterial( { color: 0x000000 } )
        var point_geometry = new THREE.SphereGeometry( 0.02, 16 )
        var point_material = new THREE.MeshBasicMaterial( { color: 0x000000 } )
        
        // draw lines and points
        this.lines.forEach(line => {

            // add line
            let line_geometry = new THREE.BufferGeometry().setFromPoints( line )
            let line_mesh = new THREE.Line( line_geometry, line_material )
            this.mesh.add( line_mesh )

            // add points
            var point_mesh = new THREE.Mesh( point_geometry, point_material )
            this.mesh.add( point_mesh )
            point_mesh.position.set( line[0].x, line[0].y, line[0].z )
        
        })

        // add last point
        var point_mesh = new THREE.Mesh( point_geometry, point_material )
        this.mesh.add( point_mesh )
        point_mesh.position.set( 
            this.lines[this.lines.length - 1][1].x,
            this.lines[this.lines.length - 1][1].y,
            this.lines[this.lines.length - 1][1].z
        )

        // if neccessary, show alternate switch position
        if (show_alt_switch) {

            // dashed lines
            var alt_line_material = new THREE.LineDashedMaterial( { color: 0x000000, dashSize: 0.01 , gapSize: 0.04 } )

            // draw lines
            this.alt_switch.forEach(line => {
                var line_geometry = new THREE.BufferGeometry().setFromPoints( line )
                var line_mesh = new THREE.Line( line_geometry, alt_line_material )
                line_mesh.computeLineDistances()
                this.mesh.add( line_mesh )
            })

            // draw point
            var point_mesh = new THREE.Mesh( point_geometry, point_material )
            this.mesh.add( point_mesh )
            point_mesh.position.set( this.alt_switch[1][0].x, this.alt_switch[1][0].y, this.alt_switch[1][0].z )
            
        }
    }
}

class Polygon extends Linkage {
    constructor( size, lengths, coords, angle_helpers=[], show_alt_switch ) {
        super()

        this.angle_helpers = angle_helpers
        
        // base
        this.lines = [[
            new THREE.Vector3( 1, 0, 0 ),
            new THREE.Vector3( -1, 0, 0 )
        ]]
        
        // all the neccessary angles
        for ( var i = 1; i < (size-2); i++ ) {
            this.lines.push(
                [
                    this.lines[i-1][1],
                    this.lines[i-1][1].clone().add( new THREE.Vector3(
                        lengths[i] * Math.sin( coords[i-1] ),
                        lengths[i] * Math.cos( coords[i-1] ),
                        0
                    ) )
                ]
            )
        }

        // switch at the end
        var a = lengths[ lengths.length - 2 ]
        var b = lengths[ lengths.length - 1 ]
        var d = this.lines[0][0].clone().sub( this.lines[this.lines.length - 1][1] ) 
        var e = new THREE.Vector3(0, 1 ,0)
        var theta = Math.acos( d.dot(e) / d.length() )
        var alpha = (2 * coords[size - 3] - 1) * Math.acos( ( Math.pow(a,2) + Math.pow(d.length(),2) - Math.pow(b,2) ) / (2*a*d.length()) )
        var angle = theta - alpha
        
        if (show_alt_switch) {
            var alt_angle = theta + alpha
            this.alt_switch = [
                [
                    this.lines[ this.lines.length - 1 ][1],
                    this.lines[ this.lines.length - 1 ][1].clone().add( new THREE.Vector3(a*Math.sin(alt_angle),a*Math.cos(alt_angle),0) )            
                ]
            ]
            this.alt_switch.push(
                [
                    this.alt_switch[0][1],
                    this.lines[0][0]
                ]
            )
        }

        this.lines.push([
            this.lines[ this.lines.length - 1 ][1],
            this.lines[ this.lines.length - 1 ][1].clone().add( new THREE.Vector3(a*Math.sin(angle),a*Math.cos(angle),0) )            
        ])

        this.lines.push([
            this.lines[ this.lines.length - 1 ][1],
            this.lines[0][0]
        ])

        this.draw_lines(show_alt_switch)

    }
}

class Arm extends Linkage {

    constructor( coords, lengths ) {
        super()

        // base
        this.lines = [[
            new THREE.Vector3( 1, 0, 0 ),
            new THREE.Vector3( -1, 0, 0 )
        ]]
        
        // all the neccessary angles
        for ( var i = 1; i < coords.length+1; i++ ) {
            this.lines.push(
                [
                    this.lines[i-1][1],
                    this.lines[i-1][1].clone().add( new THREE.Vector3(
                        lengths[i-1] * Math.sin( coords[i-1] ),
                        lengths[i-1] * Math.cos( coords[i-1] ),
                        0
                    ) )
                ]
            )
        }
        
        // render
        this.draw_lines()
    }
}




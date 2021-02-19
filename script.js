$(document).ready(() => {
    let pos = $('.canvas').offset();
    let canvas_width = $('.canvas').width();
    let canvas_height = $('.canvas').height();

    $('#add-square').click(() => {
        let square_length = $('#Square_length').val();
        if (square_length !== "" && isNaN(square_length) !== true) {
            new Square(pos.left, canvas_width, canvas_height, square_length)
        }
    })

    $('#add-circle').click(() => {
        let circle_radius = $('#Circle_radius').val();
        if (circle_radius !== "" && isNaN(circle_radius) !== true) {
            new Circle(pos.left, canvas_width, canvas_height, circle_radius)
        }
    })

    $('#add-rectangle').click(() => {
        let rectangle_height = $('#Rectangle_height').val();
        let rectangle_width = $('#Rectangle_width').val();
        if (rectangle_height !== "" && rectangle_width !== "" && isNaN(rectangle_height) !== true && isNaN(rectangle_width) !== true) {
            new Rectangle(pos.left, canvas_width, canvas_height, rectangle_width, rectangle_height);
        }
    })

    $('#add-triangle').click(() => {
        let triangle_height = $('#Triangle_height').val();
        if (triangle_height !== "") {
            new Triangle(pos.left, canvas_width, canvas_height, triangle_height);
        }
    })
})

const margin_left = 64;
let randVal = (Max, Min) => Math.floor(Math.random() * (Max - Min)) + Min;

class Shape {
    constructor(x_coor, max_width, max_height) {
        this.x_coor = x_coor;
        this.x_start = this.x_coor + margin_left;
        this.max_width = max_width;
        this.max_height = max_height;
    }

    spawn_div(width, height, border_right = 0, border_bottom = 0) {
        this.object_width = parseInt(width, 10);
        this.object_height = parseInt(height, 10);
        this.border_right = parseInt(border_right, 10);
        this.border_bottom = parseInt(border_bottom, 10);

        if (this.object_width > this.max_width || this.object_height > this.max_height || this.border_right > this.max_width || this.border_bottom > this.max_height) {
            alert('Object size too big')
        } else {
            this.isTriangle();
            $(this.div).click(() => this.describe());
            $(this.div).dblclick(() => $(this.div).remove())
        }
    };

    isTriangle() {
        let css_array = {}
        if (this.border_right !== 0 && this.border_bottom !== 0) {
            let param_x = (this.max_width + this.x_start) - this.border_right;
            let param_y = this.max_height - this.border_bottom
            this.xVal = randVal(param_x, this.x_start);
            this.yVal = randVal(param_y, 0);
            css_array = {
                'position': 'absolute',
                'top': this.yVal,
                'left': this.xVal,
                'width': 0,
                'height': 0,
                'border-right': `${this.border_right}px solid #ffff00`,
                'border-bottom': `${this.border_bottom}px solid transparent`,
            }
        } else {
            let param_x = (this.max_width + this.x_start) - this.object_width;
            let param_y = this.max_height - this.object_height;
            this.xVal = randVal(param_x, this.x_start);
            this.yVal = randVal(param_y, 0);
            css_array = {
                'position': 'absolute',
                'top': this.yVal,
                'left': this.xVal,
                'width': this.object_width,
                'height': this.object_height,
            }
        }
        this.div = $('<div></div>')
        $('.canvas').append(this.div);
        $(this.div).css(css_array);
        $(this.div).css('cursor', 'pointer');
    }

    describe() {
        let shape_class = ($(this.div).attr('class').split(/\s+/)[0]).split('-')[0]
        $('#prop_shape').val(shape_class);
        switch (shape_class) {
            case "Triangle":
                this.prop_height = this.border_bottom;
                this.prop_width = this.border_right;
                this.prop_area = (0.5 * this.prop_height * this.prop_width);
                this.prop_perimeter = (2 * this.prop_height) + (Math.sqrt(2) * this.prop_height);
                this.prop_radius = "N/A"
                break;
            case "Circle":
                this.prop_height = "N/A";
                this.prop_width = "N/A";
                this.prop_area = Math.PI * Math.pow(this.object_width, 2);
                this.prop_perimeter = (2 * Math.PI * this.object_width);
                this.prop_radius = this.object_width;
                break;
            case "Rectangle":
                this.prop_height = this.object_height;
                this.prop_width = this.object_width;
                this.prop_area = this.prop_height * this.prop_width;
                this.prop_perimeter = (this.prop_height * 2) + (this.prop_width * 2);
                this.prop_radius = "N/A"
                break;
            case "Square":
                this.prop_height = this.object_height;
                this.prop_width = this.object_width;
                this.prop_area = Math.pow(this.prop_width, 2);
                this.prop_perimeter = this.prop_width * 4;
                this.prop_radius = "N/A"
                break;
        }
        $('#prop_height').val(this.prop_height);
        $('#prop_width').val(this.prop_width);
        $('#prop_area').val(this.prop_area);
        $('#prop_perimeter').val(this.prop_perimeter);
        $('#prop_radius').val(this.prop_radius);
    }
}

class Circle extends Shape {
    constructor(x_coor, max_width, max_height, radius) {
        super(x_coor, max_width, max_height)
        this.radius = radius;
        this.addCircle();
    };

    addCircle() {
        this.spawn_div(this.radius, this.radius);
        $(this.div).addClass('Circle-shape')
    }
}

class Triangle extends Shape {
    constructor(x_coor, max_width, max_height, height) {
        super(x_coor, max_width, max_height)
        this.triangle_height = height;
        this.addTriangle();
    };

    addTriangle() {
        this.spawn_div(0, 0, this.triangle_height, this.triangle_height)
        $(this.div).addClass('Triangle-shape');
    }
}

class Rectangle extends Shape {
    constructor(x_coor, max_width, max_height, width, height) {
        super(x_coor, max_width, max_height)
        this.width = width;
        this.height = height;
        this.addRectangle();
    };

    addRectangle() {
        this.spawn_div(this.width, this.height);
        $(this.div).addClass('Rectangle-shape')
    }
}

class Square extends Shape {
    constructor(x_coor, max_width, max_height, side_length) {
        super(x_coor, max_width, max_height)
        this.side_length = side_length;
        this.addSquare();

    }

    addSquare() {
        this.spawn_div(this.side_length, this.side_length);
        $(this.div).addClass('Square-shape');
    }
}

class Course {
    constructor(courseName, instructor) {
        this.courseName = courseName;
        this.instructor = instructor;
    }

    displayCourse() {
        console.log(`Course: ${this.courseName}, Instructor: ${this.instructor}`);
    }
}

let course1 = new Course("Web Technologies", "Dr. Kumar");
course1.displayCourse();

function enrollCourse(seatsAvailable) {
    return new Promise((resolve, reject) => {
        if (seatsAvailable)
            resolve("Enrollment Successful");
        else
            reject("Course Full");
    });
}

enrollCourse(true)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));

enrollCourse(false)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));
// Define lesson paths

/** The base path all lessons share */
let baseLessonPath = "C:/Users/student/Desktop/mJS/Lesson_";
let numOfLessons = 12;


/**
 * Template for a lesson div
 * @param LESSONID - The number of the lesson it belongs to
 * @param PROGRAMFILE - File inside of the "Program" folder where the program main page resides
 * @param LABFILE - File inside of the "Lab" folder where the lab main page resides
 * @param PROJECTFILE - File inside of the "Project" folder where the Project main page resides
 */
let baseLesson = `
<div id="lessonLESSONID">
    <h3 class="lessonContent" onclick="toggleLessonContent('LESSONID')">Lesson LESSONID</h3>
    <ul id="lessonLESSONIDcontent" hidden>
        <a href="../Lesson_LESSONID/Program/PROGRAMFILE"><li>Program</li></a>
        <a href="../Lesson_LESSONID/Lab/LABFILE"><li>Lab</li></a>
        <a href="../Lesson_LESSONID/Project/PROJECTFILE"><li>Project</li></a>
    </ul>
</div>
`;

/** Div surrounding all lessons */
let lessonsContainer = document.getElementById("LessonsContainer");

/** Converts a string of HTML directly to an HTML object */
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

/**
 * Ensures an ID is represented as a 2-digit string
 * @param num - Number to represent as 2 digits
 * @returns num as a 2-digit string
 */
function doubleDigit(num) {
    if (("" + num).length === 1) {  // Make the lesson-number 2 digits
        num = "0" + ("" + num);
    }
    return num;
}

// Duplicates and adds 12 lessons leading to their proper files
for (let i = 1; i <= numOfLessons; i++) {
    let lessonID = doubleDigit(i)
    
    let programPath = lessons[lessonID-1]["program"];
    let labPath = lessons[lessonID-1]["lab"];
    let projectPath = lessons[lessonID-1]["project"];

    // Replace placeholders in template with actual values
    let currentLesson  = baseLesson.replaceAll("LESSONID", lessonID).
                                    replaceAll("PROGRAMFILE", programPath).
                                    replaceAll("LABFILE", labPath).
                                    replaceAll("PROJECTFILE", projectPath);

    lessonsContainer.appendChild(htmlToElement(currentLesson));  // Add div
}

// Automatically expand Lesson if coming from assignment inside lesson
let url = window.location.href;
if (url.indexOf("?") !== -1) {  // Paramater has been passed
    id = doubleDigit(url.split("?")[1].split("=")[1])  // Not ideal, incase a bad value is passed or a different paramater.
    toggleLessonContent(id);
}

/**
 * Toggles the visibility of a Lesson Content list when clicked on
 * @param lessonID -  2 digit number of lesson to toggle
 */
function toggleLessonContent(lessonID) {
    let lessonContainer = document.getElementById("lesson"+lessonID+"content")
    lessonContainer.hidden = !lessonContainer.hidden;
}
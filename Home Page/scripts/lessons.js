// Define lesson paths

/** The base path all lessons share */
let baseLessonPath = "C:/Users/student/Desktop/mJS/Lesson_";
let numOfLessons = 12;

/** Last opened lesson ID */
let lastOpened = null;

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
        <a href="../Lesson_LESSONID/Program/PROGRAMFILE" target="_blank"><li>Program</li></a>
        <a href="../Lesson_LESSONID/Lab/LABFILE" target="_blank"><li>Lab</li></a>
        <a href="../Lesson_LESSONID/Project/PROJECTFILE" target="_blank"><li>Project</li></a>
    </ul>
</div>
`;

/** Div surrounding all lessons */
let lessonsContainer = document.getElementById("LessonsContainer");

// Duplicates and adds 12 lessons leading to their proper files, as well as the mid and final exams
for (let i = 1; i <= numOfLessons; i++) {
    let lessonID = doubleDigit(i)
    
    if (i === 8 || i === 11) {
        addDualLesson(lessonID);
        continue;  // Finished with dual lesson
    }


    let programPath = lessons[lessonID-1]["program"];
    let labPath = lessons[lessonID-1]["lab"];
    let projectPath = lessons[lessonID-1]["project"];

    // Replace placeholders in template with actual values
    let currentLesson  = baseLesson.replaceAll("LESSONID", lessonID).
                                    replaceAll("PROGRAMFILE", programPath).
                                    replaceAll("LABFILE", labPath).
                                    replaceAll("PROJECTFILE", projectPath);


    lessonsContainer.appendChild(htmlToElement(currentLesson));  // Add div

    // Put mid-term exam after week 7
    if (i === 7) addMidExam();
    if (i === numOfLessons) addFinalExam();

}

// Automatically expand Lesson if coming from assignment inside lesson
let url = window.location.href;
let baseURL = url;
if (url.indexOf("?") !== -1) {  // Paramater has been passed
    baseURL = url.split("?")[0];
    id = doubleDigit(url.split("?")[1].split("=")[1]);  // Not ideal, incase a bad value is passed or a different paramater. Oh well
    toggleLessonContent(id);
}

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

/**
 * Toggles the visibility of a Lesson Content list when clicked on
 * @param lessonID -  2 digit number of lesson to toggle
 */
function toggleLessonContent(lessonID) {
    let lessonContainer = document.getElementById("lesson"+lessonID+"content")
    lessonContainer.hidden = !lessonContainer.hidden;
    let newURL = baseURL;
    if (!lessonContainer.hidden) {
        newURL += "?lesson=" + lessonID;
    }
    window.history.pushState("","Austin Lennert", newURL);  // Update url to reflect open lesson when coming back to main page

    // Close previously opened lesson
    if (lastOpened && lastOpened !== lessonID) {
        document.getElementById("lesson"+lastOpened+"content").hidden = true;
    }

    lastOpened = lessonID;

}

/**
 *  Adds a lesson block for the Mid-Term Exam
 *  Lesson id is equal to "MIDEXAM" rather than a lesson number
 */
 function addMidExam() {
    let midExamDiv = `
    <div id="midExam">
        <h3 class="lessonContent" onclick="toggleLessonContent('MIDEXAM')">Midterm Exam</h3>
        <ul id="lessonMIDEXAMcontent" hidden>
        <li><a href="../Midterm_Exam/mid-term.html" target="_blank">View Midterm Exam Practical</a></li>
        </ul>
    </div>
    `;
    
    lessonsContainer.appendChild(htmlToElement(midExamDiv));  // Add div
}

/**
 *  Adds a lesson block for the Final Exam
 *  Lesson id is equal to "FINEXAM" rather than a lesson number
 */
function addFinalExam() {
    let finalExamDiv = `
    <div id="finExam">
        <h3 class="lessonContent" onclick="toggleLessonContent('FINEXAM')">Final Exam</h3>
        <ul id="lessonFINEXAMcontent" hidden>
        <li><a href="../Final_Exam/finalExam2.html" target="_blank">View Final Exam Practical</a></li>
        </ul>
    </div>
    `;
    
    lessonsContainer.appendChild(htmlToElement(finalExamDiv));  // Add div
}

/**
 * Adds a lesson block for Lesson XXa and Lesson XXb
 * @param {string} lessonID -  2 digit number of lesson
 */
function addDualLesson(lessonID) {
    lessonIDSingle = lessonID-0;
    // Setup A
    let programPathA = lessons[lessonID-1]["a"]["program"];
    let labPathA = lessons[lessonID-1]["a"]["lab"];
    let projectPathA = lessons[lessonID-1]["a"]["project"];

    // Replace placeholders in template with actual values
    let currentLessonA = baseLesson.replaceAll("LESSONID", lessonID);

    // Replace localhost paths
    if (programPathA.includes("localhost")) {
        let programPath = "../Lesson_LESSONID/Program/PROGRAMFILE".replaceAll("LESSONID", lessonID);
        currentLessonA = currentLessonA.replaceAll(programPath, programPathA);
    }
    if (labPathA.includes("localhost")) {
        let labPath = "../Lesson_LESSONID/Lab/LABFILE".replaceAll("LESSONID", lessonID);
        currentLessonA = currentLessonA.replaceAll(labPath, labPathA);
    }
    if (projectPathA.includes("localhost")) {
        let projectPath = "../Lesson_LESSONID/Project/PROJECTFILE".replaceAll("LESSONID", lessonID);
        currentLessonA = currentLessonA.replaceAll(projectPath, projectPathA);
    }

    // Replace non localhost paths
    currentLessonA = currentLessonA.
    replaceAll("PROGRAMFILE", `../${lessonIDSingle}a/Program/` + programPathA).
    replaceAll("LABFILE", `../${lessonIDSingle}a/Lab/` + labPathA).
    replaceAll("PROJECTFILE", `../${lessonIDSingle}a/Project/` + projectPathA);
    
    // Setup B
    let programPathB = lessons[lessonID-1]["b"]["program"];
    let labPathB = lessons[lessonID-1]["b"]["lab"];
    let projectPathB = lessons[lessonID-1]["b"]["project"];

    // Replace placeholders in template with actual values
    let currentLessonB  = baseLesson.replaceAll("LESSONID", lessonID);

    // Replace localhost paths
    if (programPathB.includes("localhost")) {
        let programPath = "../Lesson_LESSONID/Program/PROGRAMFILE".replaceAll("LESSONID", lessonID);
        currentLessonB = currentLessonB.replaceAll(programPath, programPathB);
    }
    if (labPathB.includes("localhost")) {
        let labPath = "../Lesson_LESSONID/Lab/LABFILE".replaceAll("LESSONID", lessonID);
        currentLessonB = currentLessonB.replaceAll(labPath, labPathB);
    }
    if (projectPathB.includes("localhost")) {
        let projectPath = "../Lesson_LESSONID/Project/PROJECTFILE".replaceAll("LESSONID", lessonID);
        currentLessonB = currentLessonB.replaceAll(projectPath, projectPathB);
    }

    // Replace non localhost paths
    currentLessonB = currentLessonB.
    replaceAll("PROGRAMFILE", `../${lessonIDSingle}b/Program/` + programPathB).
    replaceAll("LABFILE", `../${lessonIDSingle}b/Lab/` + labPathB).
    replaceAll("PROJECTFILE", `../${lessonIDSingle}b/Project/` + projectPathB);
    
    lessonsContainer.appendChild(htmlToElement(currentLessonA));  // Add A div
    let mainLessonContainer = lessonsContainer.children[lessonsContainer.children.length - 1];  // Get last child, which is Lesson 8A
    let aList = mainLessonContainer.children[mainLessonContainer.children.length - 1];  // Get last content additions, which is ul with A content
    let aContents = aList.innerHTML;

    lessonsContainer.appendChild(htmlToElement(currentLessonB));  // Add B div
    let lessonSubcontainerB = lessonsContainer.children[lessonsContainer.children.length - 1];  // Get last child, which is Lesson 8B
    let bList = lessonSubcontainerB.children[lessonSubcontainerB.children.length - 1];  // Get last content additions, which is ul with B content
    let bContents = bList.innerHTML;

    aList.innerHTML = (`
    <li>${lessonIDSingle}A
        <ul>
            ` + aContents + `
        </ul>
    </li>
    <li>${lessonIDSingle}B
        <ul>
            ` + bContents + `
        </ul>
    </li>`);

    lessonsContainer.removeChild(lessonSubcontainerB);

}
let initializeExperiment

$(document).keypress(function (e) {
    if (e.which === 13) {
        document.getElementById("submit").click();
    }
});

$(window).on('load', function () {
    document.getElementById('askTrialNumbers').style.display = 'block'
});


function getRandomInt(min, max) {
    if (min < 1.0 && min > 0) {
        return (Math.random() * (max - min) + min).toFixed(4)
    } else {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}

function readTrialNumber() {
    let trialNumber = parseInt(document.getElementById('numberTrials').value);
    if (!trialNumber || typeof trialNumber != "number") {
        alert("Please choose a valid number");
    } else {
        document.getElementById('askTrialNumbers').style.display = 'none';
        document.getElementById('askTrialNumbers').style.display = 'none';
        let trials = generateTrials(trialNumber);
        return initializeExperiment(trials);
    }
}

function generateTrials(number) {
    let timeline = []
    for (let step = 0; step < number; step++) {
        let p = getRandomInt(0.5, 1.0);
        let p_ = (1.0 - p).toFixed(4);
        let x1 = getRandomInt(-10, 10);
        let y1 = getRandomInt(-10, 10);
        let x2 = getRandomInt(-10, 10);
        let y2 = getRandomInt(-10, 10);
        let trial = {
            type: 'html-button-response',
            stimulus:
                `<p>Round Number: ${step + 1}</p>` +
                '<p></p>' +
                '<p>Please click on the gamble game you would like to play.</p>' +
                '<table>\n' +
                '        <thead>\n' +
                '          <tr>\n' +
                '              <th>Probability</th>\n' +
                '              <th>Gamble 1</th>\n' +
                '              <th>Gamble 2</th>\n' +
                '          </tr>\n' +
                '        </thead>\n' +
                '\n' +
                '        <tbody>\n' +
                '          <tr>\n' +
                `            <td>${p}</td>\n` +
                `            <td>${x1}</td>\n` +
                `            <td>${y1}</td>\n` +
                '          </tr>\n' +
                '          <tr>\n' +
                `            <td>${p_}</td>\n` +
                `            <td>${x2}</td>\n` +
                `            <td>${y2}</td>\n` +
                '          </tr>\n' +
                '        </tbody>\n' +
                '      </table>',
            // prompt: "<p>Is this activity healthy or unhealthy?</p>",
            button_html: '<button class="waves-effect waves-light btn-large">%choice%</button>',
            choices: ['Gamble 1', 'Gamble 2'],
        };
        timeline.push(trial);
    }
    return timeline
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

//
$(function () {
    $.ajaxSetup({
        headers: {"X-CSRFToken": getCookie("csrftoken")}
    });
});

//
function postData(data) {
    console.log("DATA FOR POST", data)
    $.ajax({
        url: '/choice_game/save-game',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json',
        success: function (result) {
            console.log(result);
            alert(result.Result);
        }
    });
}

//
function output(inp) {
    document.getElementById("prettyData").appendChild(document.createElement('pre')).innerHTML = inp;
    document.getElementById("prettyData").appendChild(document.createElement('pre')).innerHTML = "<p>Thank you for participating.</p><p>Your test results are shown above.</p>";
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function prettyPrint(data) {
    let data_str = JSON.stringify(data, undefined, 4);
    return output(syntaxHighlight(data_str));
}

//
initializeExperiment = function (trials) {
    // let experiment_timeline, i, main;

    console.log('INITIALIZE EXPERIMENT');
    // console.log(trials);
    // i = 0;
    // main = {
    //     type: 'choice_experiment',
    //     timeline: trials
    // };
    // experiment_timeline = [main];
    // console.log(experiment_timeline)
    return jsPsych.init({
        display_element: document.getElementById('jspsych-render'),
        timeline: trials,
        on_finish: function (data) {
            let test_data = JSON.parse(data.json())
            console.log('experiment data', test_data)
            postData(data.json());
            return prettyPrint(test_data);
            // return jsPsych.data.displayData("json");
        },
        on_data_update: function (data) {
            // if (random === 0) {
            //     jsPsych.data.addProperties({condition: 'normal reward'});
            // } else {
            //     jsPsych.data.addProperties({condition: 'reward with reward shaping'});
            // }
            return console.log('trial data', data);
        }
    });
};
autowatch = 1;
inlets = 1;
outlets = 1;

// Here the data consist of every event in a beat (pauses and notes!!!).
// That way, we can recreate onset&offsets via ratios (event percentages of total beat duration).


// Now I need to add.. if the beat duration changes. that the changes would be made.



//ALSO, the regular data needs to be converted to this kind of data (with spaces between ratios).

var bar_column_idx = 2; 
var beat_column_idx = 3;
var beats_per_bar = 3;
var data = new Array();

//format is onset, offset, bar number, beat number
data[0] = [0, 1.56, 1, 1];
data[1] = [1.56, 1.9, 1, 1];
data[2] = [1.9, 2.4, 1, 1];

data[3] = [2.4, 4.5, 1, 2];
data[4] = [4.5, 5.1, 1, 2];
data[5] = [5.1, 5.7, 1, 2];

data[6] = [5.7, 6.3, 1, 3];
data[7] = [6.3, 6.5, 1, 3];

data[8] = [6.5, 7.0, 2, 1];
data[9] = [7.0, 8.0, 2, 1];

data[10] = [8.0, 8.32, 2, 2];
data[11] = [8.32, 8.9, 2, 2];
data[12] = [8.9, 9.4, 2, 2];

data[13] = [9.4, 10.0, 2, 3];
data[14] = [10.0, 10.3, 2, 3];

function calc_note_ratios() {

    //here we store the note ratios. 
    var event_perc = new Array();
    // get the total length of the track in seconds.
    var beat_durations = new Array();
    //var temp_data = new Array();
    var curr_beat_number = 0;
    var curr_bar_number = 0;
    var total_num_bars = data[data.length-1][bar_column_idx];

    //Iterate over the number of bars.
    for(var i=0; i<total_num_bars;i++) {
        //set the current bar number
        curr_bar_number = i+1;
        outlet(0, "bar number:", curr_bar_number);

        //Iterate over the number of beats
        for(var j=0; j<beats_per_bar; j++) {
            //set the current beat number
            curr_beat_number = j+1;
            outlet(0, "beat number:", curr_beat_number);

            temp_data = new Array();
            // iterate over the data
            for(var x=0; x<data.length; x++) {
                //if the row has the desired bar and beat number
                if ((data[x][bar_column_idx] == curr_bar_number) && (data[x][beat_column_idx] == curr_beat_number)) {
                    //load it into the temp_array for further processing.
                    temp_data.push(data[x]);
                };
            };

            //for(var z=0; z<temp_data.length;z++){
            //    outlet(0, "data:",temp_data[z]);
            //};


            // Here I do the processing and ratio collection of each beat
            // store in the event precentage array.


        };

    }; 

    // Now I need to find the first beat.. calc the durations and percentages, then move on. 

    //var beat_duration = data[data.length-1][1] - data[0][0];


    //Add each events duration percentage (relative to the total length) to a variable
    //for(var i=0; i < data.length; i++) {
    //    var event_length = data[i][1] - data[i][0];
    //    event_perc.push(Math.round(((event_length/beat_duration)*100)*100)/100); 
    //};

    //print the data
    //for(var i = 0; i < data.length; i++) {
    //    outlet(0, "stored data:", data[i]);
    //};
    //print the event_perc
    //outlet(0, "event percentages of total duration:", event_perc);
};



// maybe here we can pass the new beat duration..
function recreate() {

    var recreated_data = new Array();
    var time = 0;
    var prev_time = 0;
    var inc_time = 0;

    for(var i=0; i<data.length; i++) {
        //set the element of array to a list.
        recreated_data[i] = [];

        // get the total duration of time for that event. 
        // calculate what event_perc[0]% is of the total length.
        time = (event_perc[i]/100) * beat_duration;

        // increment the time with the previous duration.
        inc_time = time + prev_time;

        //add the onset time and offset times of the events.
        recreated_data[i].push(Math.round((inc_time-time)*100)/100);
        recreated_data[i].push(Math.round(inc_time*100)/100);

        //update the previous duration variable.
        prev_time = inc_time; 
    };
    //print.. but should optimally just change the main data file.
    for(var i = 0; i < recreated_data.length; i++) {
        outlet(0,"recreated duration from event percentages of the total duration:", recreated_data[i]);
    };
};
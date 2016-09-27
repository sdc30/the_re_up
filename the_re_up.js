var TwitterPackage = require('twitter');
var secret = require("./secret.json");

var send_me_a_pic_of_your_twits = new TwitterPackage(secret);

var TWITTER_SEARCH_PHRASE = ['#dichalice', '@di_chalice'];
var dc_usn = 'di_chalice';

var rt_and_reply_name = "<retweet and reply>";
var rt_name = "<retweet>";
var reply_name = "<reply>";
var re_up_name = "<re_up_init>";

var search_tweets = 'search/tweets';
var status_rt = 'statuses/retweet/';
var status_filter = 'statuses/filter';
var status_update = 'statuses/update';

var i = 0;
var j = 0;

var out_loop = 0;
var in_loop = 0;

var rannum;
var flip_flag = 1;
var breakout = 10;

function error_out(func_name, err, num){
	console.log("error_out");
	console.log("<" + func_name + "> error. [" + num + "]");
	console.log("Err: " + err);
}

function gen_random() {
	//console.log("gen_random");
	var r = randomTimeValue = Math.floor((Math.random() * 3) + 1);
	console.log("Random Time: " + r);
	return r;
}

function date_me() {
	//console.log("date_me");
	
	var date = new Date;
	date.setTime(date.getTime());

	var seconds = date.getSeconds();
	var minutes = date.getMinutes();
	var hour = date.getHours();

	var year = date.getFullYear();
	var mon = month(date.getMonth()); // beware: January = 0; February = 1, etc.
	var dy = day(date.getDay());

	var milliSeconds = date.getMilliseconds();
	
	console.log(mon + " " + dy + " " + year + " " + hour%12 +  ": " + minutes + ": " + seconds + "." + milliSeconds);
	
}

function day(n) { 
	//console.log("day");
	var d;
	switch (n) {
	    case 0:
	        d = "Sunday";
	        break;
	    case 1:
	        d = "Monday";
	        break;
	    case 2:
	        d = "Tuesday";
	        break;
	    case 3:
	        d = "Wednesday";
	        break;
	    case 4:
	        d = "Thursday";
	        break;
	    case 5:
	        d = "Friday";
	        break;
	    case 6:
	        d = "Saturday";
	}
	
	return d;
}

function month(n) {
	//console.log("month");
	var mon;
	switch (n) {
	    case 0:
	        mon = "Janruary";
	        break;
	    case 1:
	        mon = "February";
	        break;
	    case 2:
	        mon = "March";
	        break;
	    case 3:
	        mon = "April";
	        break;
	    case 4:
	        mon = "May";
	        break;
	    case 5:
	        mon = "June";
	        break;
	    case 6:
	        mon = "July";
	    case 7:
	        mon = "August";
	        break;
	    case 8:
	        mon = "September";
	        break;
	    case 9:
	        mon = "October";
	        break;
	    case 10:
	        mon = "November";
	        break;
	    case 11:
	        mon = "December";
	        break;

	}
	
	return mon;
}



function the_re_up_init(n) {
	console.log("the_re_up_init");
	var val;
	var breakout = 0;
	do {
		if(n){
			console.log("the_re_up_init -> main_loop");
			main_loop(breakout);
		}
		
		else{
			console.log("the_re_up_init done");
		}
		
		breakout = breakout + 1;
	}while(breakout < 2);
	
	setTimeout(function() {
		date_me();
		console.log("We retweeted " + i + " tweets");
		console.log("We replied to " + j + " tweets");
		
	}, 15*1000)
}



function main_loop(n) {

	console.log("main_loop " + "caller [" + n + "]");
	date_me();
	rannum = gen_random() * 1000;
//	var i = 1;
	var intervalId;
	
	intervalId = setInterval(function() {
//	    if(i >= 1){
	        clearInterval(intervalId);
//	    }
	    date_me();
		console.log("called from main ["+ n + "]");
		retweet_and_reply();
	}, rannum);
	

	console.log("end main_loop " + "caller [" + n + "]");
}



function enableBot(num) {
	date_me();
	if(num) {
		console.log("enableBot");
		the_re_up_init(num);
	}
}


function retweet_and_reply() {
	console.log("running in r_a_r..");
	
/*	
	if(TWITTER_SEARCH_PHRASE.length % 2 == 0)
		TWITTER_SEARCH_PHRASE.length = TWITTER_SEARCH_PHRASE.length / 2;
	else if (TWITTER_SEARCH_PHRASE.length % 3 == 0)
		TWITTER_SEARCH_PHRASE.length = TWITTER_SEARCH_PHRASE.length / 3;
	else
		TWITTER_SEARCH_PHRASE.length = TWITTER_SEARCH_PHRASE.length 
*/		
		
	for(var q = 0; q < TWITTER_SEARCH_PHRASE.length; q++)
	send_me_a_pic_of_your_twits.get(search_tweets, {q: TWITTER_SEARCH_PHRASE[q]}, function(error, tweets, response){
		console.log(rt_and_reply_name + " running...");
		
		if(error) { 
			error_out(rt_and_reply_name, error, 1);
		} 
		else if(tweets.statuses.length > 0){
			for(var k = 0; k < tweets.statuses.length; k++) {
				var t_s = tweets.statuses[k];
				//console.log(k)
				var usn = t_s.user.screen_name;
			
				if(usn != dc_usn) {
					var status = {status: "Thanks for the mention @" + usn + "!"}
					var id = {
						id: t_s.id_str
					}
			
			
					//rt			
					send_me_a_pic_of_your_twits.post(status_rt + id.id, function(error, tweet, response){
					
						if(error){
							error_out(rt_and_reply_name, error, 2);
						
						}
						else {
							i++;
							
						}
						
						
					
					});
			
					//reply

					send_me_a_pic_of_your_twits.post(status_update, status, function(error, reply, response){
					
						if(error) { 
							error_out(rt_and_reply_name, error, 3);
						} else {
							j++;
							//console.log(rt_and_reply_name + " Reply text: " + reply.text);
							
						}
				
					});
				
				
				}
			}
		}
	
	});
}

enableBot(1);




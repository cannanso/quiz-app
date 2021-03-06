var totalCorrect = 0; // need a better way of storing this var

function showQuestion(question) {
	$('.step-title').text(question.title)	;
	$('.step-question').text(question.question);	
}

function showChoices(question) {
	// should I use this.question = question instead?
	var choicesDiv = $('.choices');
	choicesDiv.empty();
	for(var i=0; i < question.choices.length; i++) {
		$(choicesDiv).append('<label><input type="radio" name="choicesRadios" value="' + i + '">' + question.choices[i] + '</label>');
	}
}

function showDetail(question) {
	$('.step-detail').fadeIn('slow').children('p').text(question.detail);
}

function drawProgress(width) {
	this.width = width * 20;
	$('.progress').find('.bar').animate({'width':this.width+'%'}, 'slow');
	$('.progress .fa').not('.fa-circle').first().removeClass('fa-circle-o').addClass('fa-circle');
}

function submitChoice(question) {
	var checked = $('input:checked').val();
	if (question.checkAnswer(checked)) {
		$('.step-detail h1').text('Hey, Yurright!');
		totalCorrect++;
		drawProgress(totalCorrect);
	}
	else {
		$('.step-detail h1').text('Get outta here.');
	}
}

function newGame(question) {
	console.log('Start a new game!');
	totalCorrect = 0;
	showQuestion(question);
	showChoices(question);
	$('.progress .fa').addClass('fa-circle-o').removeClass('fa-circle');
	$('.progress').find('.bar').animate({'width':'0%'}, 'slow');
	$('.step').fadeIn('slow');
	$('.step-detail').hide();
}

var questions = [
	{
		title: 'Question 1',
		question: 'What was the city was originally called?',
		choices: ['New Germany', 'New Amsterdam', 'New London', 'New Jack City'],
		answer: 1,
		detail: 'New Amsterdam was a 17th-century Dutch settlement established at the southern tip of Manhattan Island. It was renamed New York on September 8, 1664, in honor of the Duke of York in whose name the English had captured it.',
		checkAnswer: function(checked) {
			checked = parseInt(checked);
			if(checked !== this.answer) {
				return false;
			}
			else {
				return true;
			}
		},	
	},
	{
		title: 'Question 2',
		question: 'Which of these is NOT a borough?',
		choices: ['Brooklyn', 'Staten Island', 'Bronx', 'Yonkers'],
		answer: 3,
		detail: 'New York City is divided into five different boroughs, or neighborhoods. They are Manhattan, the Bronx, Queens, Brooklyn and Staten Island.',
		checkAnswer: function(checked) {
			checked = parseInt(checked);
			if(checked !== this.answer) {
				return false;
			}
			else {
				return true;
			}
		},	
	},
	{
		title: 'Question 3',
		question: 'Where is Brooklyn\'\s original Chinatown?',
		choices: ['Williamsburg', 'Flatbush', 'Sunset Park', 'Sheepshead Bay'],
		answer: 2,
		detail: 'The first Brooklyn Chinatown was originally established in the Sunset Park area of the New York City borough of Brooklyn. The borough has since evolved three larger Chinatowns, between Sunset Park, Bensonhurst, and Avenue U in Sheepshead Bay.',
		checkAnswer: function(checked) {
			checked = parseInt(checked);
			if(checked !== this.answer) {
				return false;
			}
			else {
				return true;
			}
		},	
	},
	{
		title: 'Question 4',
		question: 'Broadway originally shared a name with which famous store?',
		choices: ['Bloomingdale\'\s', 'Macy\'\s', 'Kmart', 'Walmart'],
		answer: 0,
		detail: 'In the 18th century, Broadway ended at the town commons north of Wall Street, where traffic continued up the West Side via Bloomingdale Road. On February 14, 1899, the name "Broadway" was extended to the entire Broadway/Bloomingdale/Boulevard road.',
		checkAnswer: function(checked) {
			checked = parseInt(checked);
			if(checked !== this.answer) {
				return false;
			}
			else {
				return true;
			}
		},	
	},
	{
		title: 'Question 5',
		question: 'What is another popular name for Times Square?',
		choices: ['The Crossroads of the City','The Center of the Planet','The Great White Way', 'The Giant Lightbulb'],
		answer: 2,
		detail: 'This nickname came about because Broadway was one of the first streets in the United States to be lit with electric lights.',
		checkAnswer: function(checked) {
			checked = parseInt(checked);
			if(checked !== this.answer) {
				return false;
			}
			else {
				return true;
			}
		},	
	},		
];

$(document).ready(function(){
	
	var counter = 0;

	$('#start').click(function(){
		newGame(questions[0]);
		counter = 0;
	});

	$('#submit').click(function(e){
		e.preventDefault();
		submitChoice(questions[counter]);
		showDetail(questions[counter]);
		counter++;						
		if (counter < questions.length) {
			showQuestion(questions[counter]);
			showChoices(questions[counter]);
		}
		else {
			$('.step').slideUp('slow');
			$('.user-response-check').text('Yay!').next('p').text('You got ' + totalCorrect + ' out of ' + questions.length + ' right!');
		}
	});
});

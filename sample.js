//jQuery(document).ready(function($){

	function onFieldError( field, result ) { 	// field - input dom el, being validated, result - object, contaninig error messages
		$( field ).css({border: '1px solid red'})
		//... whatever
	}

	function onSubmitError( field, result ) {
		$( field ).css({border: '1px solid red'})
		$( field ).next().text( result.error )
		//... whatever
	}

	function onSuccess( field ) {
		$( field ).css({border: '1px solid green'})
		$( field ).next().text( '' ) //remove erorr text
		//... whatever
	}

	function onFormSuccess( form ) {
		alert('Form is valid right now.')
		//... form submission and so on
	}

	//start fields
	var fields = {
		username: {
			value: '',
			placeholder: 'John Doe',
			validate: {
				required: {
					error: 'Please, fill username properly',
				},
				pattern: {
					reg: /^[a-zA-Z\s]+$/,
					error: 'Please, fill username properly',
				}
			},
		},
		password: {
			value: 'whatever',
			placeholder: 'Type your password, please',
			validate: {
				required: {
					error: 'Please, fill password field',
				},
				pattern: {
					reg: /^[\w\d]+$/
				},
				min: {
					treshold: 4,
					error: 'The minimum amount of symbols is 4',
				},
				max:{
					treshold: 60,
					error: 'The ,aximum amount of symbols is 60',
				},
			}
		}
	}
	//end fields

	var forms = [
		{
			id: 'test-form',
			fields: {
				myname: fields.username,
				mypass: fields.password,
			},
			//optional callback
			onFormSuccess: function( form ) {
				alert('Form is valid right now.')
			},
		},
	]
	//end forms

	validateUs( forms )
	//Let's rock!
//});

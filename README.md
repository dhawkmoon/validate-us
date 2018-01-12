# Validate-us

![VER](https://img.shields.io/badge/ver-0.2--alpha-red.svg) ![requires jquery](https://img.shields.io/badge/jquery->_1.9.1-blue.svg)

Lightweight library making form validation in declarative style. Requires jQuery (yet).

## Installation

Download this package, and include script named validate-us.min.js in your head of footer section, right after jQuery library.

## About

This library handles declarative connection of user predefined rules with html forms. This library doesn't cover any form processing, messages alerting or styling. User should provide his own callbacks functions for such tasks, but this library provides a mechanism of connecting such functions with validation proccess. Better take a look on the example below.

## Basic usage

Let's create a simple html form.

``` html

  <!-- FORM MUST HAVE ID -->
  <form action="/whatever.php" id="test-form">
    <label for="myname">Username:</label>
    <input type="text" name="name" placeholder="username" id="myname"> <span class="error"></span> <br /><br />
    <label for="myname">Password: </label>
    <input type="password" name="password" placeholder="password" id="mypass"> <span class="error"></span> <br /><br />
    <button>Register</button>
  </form>
```
Form and it's fields must have unique ids.

Next step is to create js file and define our fields and forms as objects.
As you see, our simple form has only two fields - username field and password field. Let's define username field first. 
Let's suppose that our username should be required and can include only latin characters and whitespaces, no digits or any other symbols.

``` js

var username = {
  value: '', //initial value of input will be overriden with this value if its lenght > 0
  placeholder: 'John Doe', //the same for placeholder
  validate: { //validation object, that contains rules
    required: { //if this property is presented, this field must be filled in order to pass validation
      error: 'Please, fill username properly', //error text, that will be used later (f.e. you can show it to user ... )
    },
    pattern: { //Regular exp validation. It can be anything.
      reg: /^[a-zA-Z\s]+$/, //pattern
      error: 'Please, fill username properly', //erorr text
    },
  },
}

```

As you can see, we have declared our validation rules for username field. But we haven't set any id yet. So, we have an abstract object, that describes a validation process for any username field. If we have two or three different username fields, this rules can be applied for them at once, or we can create different rules for any reason.

Let's move forward and create password object. Let's suppose, that our password should include word and digits, and it's minimum length should be 4 scharacters.

``` js

var password = {
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
  }
}

```

Now, it's time to create such object for our form. Actually, we have only one form, but this library can handle several forms, so we should create an array. 

``` js

var forms = [
  {
    id: 'test=form', //id of our form
    fields: { // here we connect actual html inputs of our forms with previously declared rules via ids
      myname: username, //IMPORTANT: the key of property - id of our input! Value - our field object.
      mypass: password, //the same for password.
    }
  }
]

```
## Actions

That's it. Our form and it's fields now are declared and ready to be validated, but first we also need to define basic actions. 
This library provide several basic actions, taht should be defined by user:

- onFieldError
- onSubmitError
- onSuccess
- onFormSuccess

Actually, "action" - is a callback function, that handles specific. If we define these 4 functions (useing the same name), we will create four common handlers. We can also provide specific handler per field and form. But we will talk about it later.

### onFieldError

This action fires, when user change field. For example while typing.
So, basic example of such action may be defined as this:

``` js
var onFieldError = function( field, result ) { 	// field - input dom el, being validated, result - object, contaninig error messages
	$( field ).css({border: '1px solid red'})
	//... whatever
}
```

The function in the example above will add red border to our input.

### onSubmitError

This action fires, when user try to submit form. We can use this action, for example, to show error text to user.
> Tip: To get error text, you can use ***result.error***

``` js
function onSubmitError( field, result ) {
	$( field ).next().text( result.error )
	//... whatever
}
```

The function in the example above will add text next to input field.

### onSuccess

This action fires, when single input changes and pass validation.
``` js
function onSuccess( field ) {
	$( field ).css({border: '1px solid green'})
	$( field ).next().text( '' ) //remove errrr text
	//... whatever
}
```

Function above adds green border to input and remove err text, if such was appended before on form submission.

### onFormSuccess

This action fires, when a whole form have passed validation.
Here you can handle backend data processing via ajax, or just submit form

> Tip: this action gives provide form dom element. It can be submitted like this: form.submit()

``` js
function onFormSuccess( form ) {
	alert('Form is valid right now.')
	//... form submission and so on
}
```

The function above just alerts message to user.

## At last...

Now, after we have defined our fields, forms and actions, we can make it work!
Just call this funtion and pass array with forms:

``` js
  validateUs( forms )
```

You can find this example working in js-fiddle.



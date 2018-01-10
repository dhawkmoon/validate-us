# Validate-us
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
As you see, our simple form has only two fields - username fields and password field. Let's define username field first. 
Let's suppose that our username should be required and can include only latin characters and whitespaces, no digits or any other symbols.

``` js

var username = {
  value: '', //initial value of input will be overriden with this value if its lenght > 0
  placeholder: 'John Doe' //the same for placeholder,
  validate: { //validation object, that contains rules
    required: { //if this property is presented, this field must be filled in order to pass validation
      error: 'Please, fill username properly', //error text, that will be used later (f.e. you can show it to user ... )
    },
    pattern: { //Regular exp validation. It can be anything.
      reg: /^[a-zA-Z\s]+$/, //pattern
      error: 'Please, fill username properly', //erorr text
    },
  }
}

```

# Validate-us
Lightweight library making form validation in declarative style. Requires jQuery (yet).
<hr>

#Installation

Download this package, and include script named validate-us.min.js in your head of footer section, right after jQuery library.

#About

This library handles declarative connection of user predefined rules with html forms. This library doesn't cover any form processing, messages alerting or styling. User should provide his own callbacks functions for such tasks, but this library has a mechanism of firing such functions. Better take a look on the example below.

#Basic usage

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

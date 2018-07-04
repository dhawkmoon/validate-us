/***
	Basic Validation Func
	***/
function validateField( f ) {
//	console.log( typeof f.validate )
	if( typeof f.validate != 'undefined' ) {
		//console.log(f.validate)
		//Required fields checks if value is not empty
		if( f.validate.required ) {
			if( f.value.length === 0 ) {
				return {
					error: f.validate.required.error,
				}
			}
		}

		//Pattern
		if( f.validate.pattern ) {
			if( !f.value.match( f.validate.pattern.reg ) ) {
				return {
					error: f.validate.pattern.error,
				}
			}
		}

    //Min
    if( f.validate.min ) {
      if( f.value.length < f.validate.min.treshold ) {
        return {
					error: f.validate.min.error,
				}
      }
    }

    //Max
    if( f.validate.max ) {
      if( f.value.length > f.validate.max.treshold ) {
        return {
					error: f.validate.max.error,
				}
      }
    }

		//Custom callback for validation
		if( f.validate.callback ) {

			return f.validate.callback( f.value )
		}

		return true;
	}
	else {
		return true;
	}
}
/***
	Form validation func
	***/
function validateForm( e ) {
	var f = e.target.data
	//console.log(f)
	e.preventDefault()
	var errors = []
	for( var k in f.fields ) {

		if(  f.fields.hasOwnProperty( k )  ) {
			var $field = document.getElementById( k )

			f.fields[k].value = $field.value
	
			var result = validateField(f.fields[k])
			//console.log(result)
			if( result !== true ) {
				if( typeof f.fields[k].onError == 'function' ) {
					f.fields[k].onSubmitError( $field, result )
				}
				else {
					window.onSubmitError( $field, result )
				}
				errors.push( result )
			}
			else {
				if( typeof f.fields[k].onSuccess == 'function' ) {
					f.fields[k].onSuccess( $field )
				}
				else {
					window.onSuccess( $field )
				}
			}
		}
    // endfor
	}

  //
  if( errors.length === 0 ) {
    var id = this.getAttribute('id')
    var form = forms.filter( function( form ) {
      return form.id == id
    } )
    if( form.length === 0 ) {
      console.log( 'No form set' )
      window.onFormSuccess( this )
    }
    else {
      //
      if( typeof form[0].onFormSuccess == 'function' ) {
        form[0].onFormSuccess( this )
      }
      else {
        window.onFormSuccess( this )
      }
      //
    }
  }
}

function validateSingleField( e ) {
	//console.log(1)
	var field = e.target.data
	//console.log(field)

	field.value = this.value
	var result = validateField( field )
	//console.log(result)
	if( result !== true ) {
		if( typeof field.onError == 'function' ) {
			field.onFieldError( this, result )
		}
		else {
			window.onFieldError(this, result )
		}
	}
	else {
		if( typeof field.onSuccess == 'function' ) {
			field.onSuccess( this )
		}
		else {
			window.onSuccess( this )
		}
	}
}

function validateUs( forms ) {
  //Handlers
  for( var i=0; i<forms.length; i++ ) {
    var $form = document.getElementById( forms[i].id )
  	
  	$form.addEventListener( 'submit', validateForm, false )
  	$form.data = forms[i]
  	
  	for( var k in forms[i].fields ) {
  		var $field = document.getElementById( k )
  		$field.addEventListener( 'keyup', validateSingleField, false )
  		$field.addEventListener( 'change', validateSingleField, false )
        $field.data = forms[i].fields[k]
      //Set placeholder
      if( typeof forms[i].fields[k].placeholder != 'undefined' && forms[i].fields[k].placeholder.length > 0  ) {
        $field.setAttribute( 'placeholder', forms[i].fields[k].placeholder )
      }
      //Set value
      if( typeof forms[i].fields[k].value != 'undefined' && forms[i].fields[k].value.length > 0  ) {
        $field.value = forms[i].fields[k].value
      }
  	}
  }
}

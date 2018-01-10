/***
	Basic Validation Func
	***/
function validateField( f ) {
//	console.log( typeof f.validate )
	if( typeof f.validate != 'undefined' ) {
		//console.log(f.validate)
		//Required fields checks if value is not empty
		if( f.validate.required ) {
			if( f.value.length == 0 ) {
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
	var f = e.data
	//console.log(f)
	e.preventDefault()
	var errors = []
	for( var k in f.fields ) {

		if(  f.fields.hasOwnProperty( k )  ) {
			var $field = $( '#' + k )
		//	console.log(k, $(this) )
			var v = $field.val()
			f.fields[k].value = v
		//	console.log(f)
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
  if( errors.length == 0 ) {
    var $form = $( this )
    var form = forms.filter( function( form ) {
      //console.log( form.id, $form )
      return form.id == $form.attr('id')
    } )
    if( form.length == 0 ) {
      console.log( 'No form set' )
      window.onFormSuccess( $(this) )
    }
    else {
      //
      if( typeof form[0].onFormSuccess == 'function' ) {
        form[0].onFormSuccess( $(this) )
      }
      else {
          window.onFormSuccess( $(this) )
      }
      //
    }
  }
}

function validateSingleField( e ) {
	//console.log(1)
	var field = e.data
	//console.log(field)
	var $field = $( this )
	field.value = $field.val()
	var result = validateField( field )
	//console.log(result)
	if( result !== true ) {
		if( typeof field.onError == 'function' ) {
			field.onFieldError($field, result )
		}
		else {
			window.onFieldError($field, result )
		}
	}
	else {
		if( typeof field.onSuccess == 'function' ) {
			field.onSuccess( $field )
		}
		else {
			window.onSuccess( $field )
		}
	}
}

function validateUs( forms ) {
  //Handlers
  for( var i=0; i<forms.length; i++ ) {
  	$('#'+forms[i].id).on('submit', forms[i], validateForm );
  	for( var k in forms[i].fields ) {
  		//console.log($( '#'+forms[i].id ).find( '[data-field="' + k + '"]' ))
  		$( '#' + k ).on('keyup', forms[i].fields[k], validateSingleField )
  		$( '#' + k ).on('change', forms[i].fields[k], validateSingleField )
      //Set placeholder
      if( typeof forms[i].fields[k].placeholder != 'undefined' && forms[i].fields[k].placeholder.length > 0  ) {
        $( '#' + k ).attr( 'placeholder', forms[i].fields[k].placeholder )
      }
      //Set value
      if( typeof forms[i].fields[k].value != 'undefined' && forms[i].fields[k].value.length > 0  ) {
        $( '#' + k ).val( forms[i].fields[k].value  )
      }
  	}
  }
}

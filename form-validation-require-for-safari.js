/*
	on document content loaded event add listener for form submit event
	on submit check for elements having required attribute and perform validation
*/
addEventListener("DOMContentLoaded", function(){
	//ensure its safari then apply validation algorithm
	if(navigator.vendor.toLowerCase().indexOf('apple') != -1){

		window.FormValidation = new (function(){
			/*
				1.0.0 scan all forms and add submit listner and check for required attr and display message if empty
				1.1.0 added element.validity and validityState objects
				1.2.0 safari has element.validity object, removing it
				1.2.1 tooltip coloring customization added
				1.2.2 specific custom message generation method added 
				1.3.0 added validation of all properties of validityState
			*/
			this.version = "1.3.0";

			//add support for date picker
			this.validInputTypes = ["text", "email", "number", "url", "tel", "search", "password", "checkbox", "radio", "file"];

			//customizable css styling
			this.background = "#000";
			this.color = "#FFF";

			//specific custom message genration added
			this.generateValidationMessage = function(element){
				if(element.validity.patternMismatch)
					return "Please Match the requested format";
				if(element.validity.rangeOverflow)
					return "Value must be less than or equal to "+element.max;
				if(element.validity.rangeUnderflow)
					return "Value must be greater than or equal to "+element.min;
				if(element.validity.stepMismatch){
					var val = parseInt(element.value);
					var step = parseInt(element.step);
					var prev = val - (val%step);
					var next = prev + step;
					return "Please enter valid value. valid values are "+prev+" and "+next;
				}
				//if(element.validity.tooLong){
				if(parseInt(element.value.length) > parseInt(element.maxLength)){
					return "Please shorten this text to "+element.maxLength+" character or less (you are currently using "+element.value.length+" characters)";
				}
				if(element.validity.typeMismatch){
					return "Please enter valid "+element.type;
				}	
				if(element.validity.valueMissing)
					return "Please fill out this field";
				// console.log(element.max);
				return element.validationMessage;
			};

			this.displayMessage = function(element){
				//main div which contains two div one message pane and another triangle
				var parentDiv = document.createElement('div');

				//triangle div for corner triangle
				var triangleDiv = document.createElement('div');
				triangleDiv.setAttribute('style', "margin-left:10px;  transition: .3s;    border-style: solid;    width: 0px;    height: 0px;    line-height: 0px;    border-width: 0px 10px 10px 10px;    border-color: transparent transparent "+this.background+" transparent;");

				//main message pane div
				var messageDiv = document.createElement('div');
				messageDiv.setAttribute('style', "min-width:50px; word-wrap: break-word; color:"+this.color+"; moz-box-shadow: 3px 3px 5px #535353; -webkit-box-shadow: 3px 3px 5px #535353;         box-shadow: 3px 3px 5px #535353; -moz-border-radius: 10px 10px 10px 10px; -webkit-border-radius: 10px; border-radius:10px 10px 10px 10px; /*border: 2px solid #000;*/ background: "+this.background+"; padding: 10px;");
				messageDiv.innerHTML = this.generateValidationMessage(element);
				//add title message
				
				if(element.title.length != 0)
					messageDiv.innerHTML += "<div style=''>:"+element.title+"</div>";

				//positions for parent div
				var posX = element.offsetTop + element.offsetHeight - 10;
				var posY = element.offsetWidth;
				parentDiv.setAttribute("style", "max-width:250px; position: absolute; top:"+posX+"px; left:"+posY+"px; z-index: 1000;");

				//add both triangle and message pane div to parent div
				parentDiv.appendChild(triangleDiv);
				parentDiv.appendChild(messageDiv);

				//node that is appended to body
				var child = document.body.appendChild(parentDiv);
				element.focus();
				child.validityMessageDisplay = true;

				//function to remove child if already appended to body
				var removeChildDiv = function(){
					if(child.validityMessageDisplay == true){
						document.body.removeChild(child);
						element.removeEventListener('input', removeChildDiv);	
						child.validityMessageDisplay = false;						
					}
				}

				//event listeners after which child should be removed
				element.addEventListener('input', removeChildDiv);
				element.addEventListener('blur', removeChildDiv);
			}

			this.initialize = function(){
				//refernce for main formValidation object 
				var that = this;
				//add submit listener to all forms
				for(var i=0; i<document.forms.length; i++){
					document.forms[i].addEventListener("submit", function(event){				
						var form = event.srcElement; 
						for(index=0; index<form.elements.length; index++){
							var element = form.elements[index];
							//instead of willValidate check for required attr
							if(element.willValidate == true && element.validity.valid == false ){	
							// if(element.getAttribute("required") != null){
								event.preventDefault();
								that.displayMessage(element);
								break;			
							}
						}
					});
				}
			};	//end of inilialize
			this.initialize();
		})();
	}
});
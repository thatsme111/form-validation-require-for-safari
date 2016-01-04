addEventListener("DOMContentLoaded", function(){
	if(navigator.vendor.toLowerCase().indexOf('apple') !== -1){
		for(var i=0; i<document.forms.length; i++){
			document.forms[i].addEventListener("submit", function(e){
				var form = e.srcElement;

				for(var i=0; i<form.elements.length; i++){
					if(form.elements[i].getAttribute('must') !== null){
						if (form.elements[i].value == null || form.elements[i].value == ""){
							var parentDiv = document.createElement('div');

							var triangleDiv = document.createElement('div');
							triangleDiv.setAttribute('style', " margin-left:10px;  transition: .3s;    border-style: solid;    width: 0px;    height: 0px;    line-height: 0px;    border-width: 0px 10px 10px 10px;    border-color: transparent transparent #000 transparent;");

							var messageDiv = document.createElement('div');
							messageDiv.setAttribute('style', "color:#000; moz-box-shadow: 3px 3px 5px #535353; -webkit-box-shadow: 3px 3px 5px #535353;         box-shadow: 3px 3px 5px #535353; -moz-border-radius: 10px 10px 10px 10px; -webkit-border-radius: 10px; border-radius:10px 10px 10px 10px; border: 2px solid #000; background: #FFF; padding: 10px;");
							messageDiv.innerHTML = " Please fill out this field. ";

							var posX = form.elements[i].offsetTop + form.elements[i].offsetHeight - 10;
							var posY = form.elements[i].offsetWidth;
							parentDiv.setAttribute("style", " position: absolute; top:"+posX+"px; left:"+posY+"px; z-index: 1000;");

							parentDiv.appendChild(triangleDiv);
							parentDiv.appendChild(messageDiv);

							var child = document.body.appendChild(parentDiv);
							var removeChildDiv = function(){
								document.body.removeChild(child);
								form.elements[i].removeEventListener('input', removeChildDiv);
							}

							form.elements[i].addEventListener('input', removeChildDiv);
							e.preventDefault();										
							break;
						}
					}
				}
			});
		}
	}
});

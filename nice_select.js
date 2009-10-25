/*  Nice Select, version 1.0
 *  (c) 2009 Denis Jacquemin
 *
 *  Nice select is freely distributable under the terms of an MIT license.
 *  For details, see the Nice Select filter github page: http://github.com/denisjacquemin/
 *
 *--------------------------------------------------------------------------*/
 var NiceSelect = Class.create({
      
      initialize: function(selectElement, otherOptionValue) {
        this.selectTag = $(selectElement);
        this.otherOptionValue = otherOptionValue;
        this.selectTag.observe('change', this.actOnChange.bind(this));
      },
      
      actOnChange: function(event) {
         if (Event.element(event).value == this.otherOptionValue) {
             var newLabel = prompt("Enter the new name:", "");
             
             var alreadyTakenIndex = this.alreadyTaken(newLabel);
             if ( alreadyTakenIndex == -1 ) {
                 var newOptionValue = 'new#' + this.selectTag.select('option').length;
                 var newOption = new Element('option',{'value': newOptionValue });
                 newOption.innerHTML = newLabel;
             
                 this.selectTag.insert({bottom:newOption});
                 this.selectTag.value = newOptionValue;
             } else {
                 alert('Name has already been taken');
                 this.selectTag.options[alreadyTakenIndex].selected = 'selected';
             }
             
         }
      },
      
      alreadyTaken: function(label) {
          
          var taken = -1;
          var index = 0;
          this.selectTag.select('option').each( function(option) {
              if (option.innerHTML == label) {
                  taken = index;
              }
              index = index+1;
          })
          
          return taken;
      }
      
    });

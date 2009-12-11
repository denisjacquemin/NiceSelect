/*  Nice Select, version 1.0
 *  (c) 2009 Denis Jacquemin
 *
 *  Nice select is freely distributable under the terms of an MIT license.
 *  For details, see the Nice Select filter github page: http://github.com/denisjacquemin/
 *
 *--------------------------------------------------------------------------*/
 var NiceSelect = Class.create({
      
      initialize: function(selectElement, options) {
        this.options = Object.extend({otherOptionValue: "---"}, options || {});
        this.selectTag = $(selectElement);
        this.selectTag.observe('change', this.actOnChange.bindAsEventListener(this));
      },
      
      actOnChange: function(event) {
          var element = event.element();
          if (!$F(element) == this.options.otherOptionValue) return;

          var newLabel = prompt("Enter the new name:", "");
          
          if (this.alreadyTaken(newLabel)) { 
              alert('Name has already been taken'); 
              this.selectTag.options[alreadyTakenIndex].selected = 'selected'; 
              return; 
          }
          
          var newOptionValue = 'new#' + this.selectTag.select('option').length;
          this.selectTag.insert({bottom: new Element('option', {'value': newOptionValue}).update(newLabel)});
          this.selectTag.value = newOptionValue;
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
          
          if (taken == -1) return false;
          else return true;
      }
      
    });

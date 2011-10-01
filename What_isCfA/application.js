// jQuery.noConflict();
jQuery(function() {
  
  if (jQuery.support.opacity) {
    $("#hint").css("visibility", "visible").css("opacity", 0).fadeTo(1000, 1);
    setTimeout(function () { $("#hint").css("visibility", "visible").css("opacity", 1).fadeTo(1000, 0); }, 2000);
  } else {
    $("#hint").css("left", "260");
    $("#hint").css("visibility", "visible");
    setTimeout(function () { $("#hint").css("visibility", "hidden"); }, 2000);
  }

  $(".scroller").click(function(e, element) {
    var target = this.href.substr(this.href.indexOf("#"));
    $.scrollTo(target, {duration: 1000});
    return false;
  });

  $(".fader").click(function(e, element) {
    var target = this.href.substr(this.href.indexOf("#"));
    $(target).css("visibility", "visible").css("opacity", 0).fadeTo(1000, 1);
    return false;
  });

  jQuery("#submit-namingcontest").click(function() {
    jQuery("#namingcontest").submit();
    return false;
  });

  jQuery("#namingcontest").submit(function() {
    if (jQuery("#proposal").val() != "") {
      $("#samara").fadeTo(500, 0);
      jQuery('#samara').hide();
      jQuery.post("/names.json", {"name[name]": jQuery('#proposal').val()}, function(data) {
        if (data.profanity) {
         jQuery('#proposals').html("<span class='mine'>Sorry, but we don't like proposals containing profanity.</span>");
        } else {
          jQuery("#email-name-id").val(data.last_id);
          jQuery.each(data.names, function() {
            if (this.name.toLowerCase() == jQuery("#proposal").val().toLowerCase()) {
              jQuery('#names-list').append("<span class='mine'>" + this.name + "</span> ");
            } else {
              jQuery('#names-list').append("<span class='" + this.classname + "'>" + this.name + "</span> ");
            }
          });
        }
        $("#proposals").css("visibility", "visible").css("opacity", 0).fadeTo(1000, 1);
      }, "json");
    }
    return false;
  });

  jQuery("#email-submit").click(function() {
    jQuery("#email").submit();
    return false;
  });

  jQuery("#email").submit(function() {
    if (jQuery("#email-name-id").val() != "") {
      jQuery.post("/names/" +jQuery("#email-name-id").val()+ ".json", { "_method": "put", "name[email]": jQuery("#email-email").val() }, function(data) {
        jQuery("#email-confirmation").html(" We stored your e-mail address (" + jQuery("#email-email").val() + ").");
        jQuery("#email-email").hide();
        jQuery("#email-submit").hide();
      }, "json");
    }
    return false;
  });
  
  // DISCUSS
  
  jQuery("#answer-email-submit").click(function() {
    jQuery("#answer-email").submit();
    return false;
  });

  jQuery("#answer-submit").click(function() {
    jQuery("#answer-form").submit();
    return false;
  });

});

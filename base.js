"use strict";
function _typeof(n) {
  return(
    _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (n) {
        return typeof n
      }
      : function (n) {
        return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype
          ? "symbol"
          : typeof n
      }
  )(n)
}
!function (i) {
  ({
    init: function () {
      var n = this;
      i(document).ready(function () {
        n.renderForm(),
        n.handleSubmit(),
        n.renderPBPopUps(),
        n.attachCloseBtn(),
        n.initPhoneFlag()
      }),
      i(document).on("wffn_reload_popups", function () {
        n.renderPBPopUps()
      }),
      i(document).on("wffn_reload_phone_field", function () {
        n.initPhoneFlag()
      })
    },
    initPhoneFlag: function () {
      var n = {
        initialCountry: window.wffnfunnelVars.op_flag_country,
        separateDialCode: !0,
        geoIpLookup: function (e) {
          i.get("https://ipinfo.io", function () {}, "jsonp").always(function (n) {
            n = n && n.country
              ? n.country
              : "us";
            e(n)
          })
        }
      };
      void 0 !== window.wffnfunnelVars.onlyCountries && 0 < window
        .wffnfunnelVars
        .onlyCountries
        .length && (n.onlyCountries = window.wffnfunnelVars.onlyCountries);
      var e,
        t = document.querySelectorAll(".phone_flag_code input[type='tel']");
      for (e in t) 
        "object" === _typeof(t[e]) && void 0 !== window.intlTelInput && window.intlTelInput(t[e], n)
      
    },
    attachCloseBtn: function () {
      jQuery(document).on("click", ".bwf_pp_close", function (n) {
        n.preventDefault(),
        jQuery(".bwf_pp_overlay").removeClass("show_popup_form")
      })
    },
    renderPBPopUps: function () {
      jQuery(".wfop_pb_widget_wrap").each(function () {
        var e = this;
        jQuery(this).find(".bwf-custom-button a").click(function (n) {
          n.preventDefault(),
          jQuery(e).find(".bwf_pp_overlay").addClass("show_popup_form")
        })
      })
    },
    renderForm: function () {
      0 < jQuery(".bwf_pp_overlay").length && jQuery('a[href*="wfop-popup=yes"]').on("click", function (n) {
        n.preventDefault(),
        jQuery(".bwf_pp_overlay").addClass("show_popup_form")
      })
    },
    DoValidation: function (f) {
      var r = !0;
      return jQuery(f).find(".wfop_required").each(function () {
        var n,
          e = jQuery(this),
          t = null,
          a = window.wffnfunnelVars.op_valid_text,
          o = window.wffnfunnelVars.op_valid_email;
        "" === jQuery.trim(e.val())
          ? t = a
          : "checkbox" === e.attr("type")
            ? e.prop("checked") || (t = a)
            : "radio" === e.attr("type") && (n = e.attr("name"), 0 === jQuery(f).find("input:radio[name=" + n + "]:checked").length && (t = a));
        "" !== jQuery.trim(e.val()) && "wfop_optin_email" === e.attr("name") && (jQuery.trim(e.val()).match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/) || (t = o)),
        null !== t && (e.parents(".bwfac_form_sec").addClass("bwfac_error"), 0 === e
          .parents(".bwfac_form_sec")
          .find(".error")
          .length && e.parents(".bwfac_form_sec").append('<span class="error">' + t + "</span>"), r =! 1)
      }),
      r
    },
    setUpClick: function (r) {
      var i = this;
      jQuery(r).find("#wffn_custom_optin_submit").on("click", function (n) {
        var e = !0;
        jQuery(this).removeAttr("disabled");
        var t = jQuery(this),
          a = r;
        jQuery(a).find(".bwfac_form_sec").removeClass("bwfac_error"),
        jQuery(a).find(".bwfac_form_sec .error").remove();
        var o = jQuery(a).find("input[name=optin_is_admin]").val(),
          f = jQuery(a).find("input[name=optin_is_ajax]").val(),
          a = jQuery(a).find("input[name=optin_is_preview]").val();
        (o || f || a) && (e =! 1),
        e = i.DoValidation(r),
        n.preventDefault(),
        e
          ? (jQuery(this).attr("disabled", "disabled"), e = jQuery(this).attr("data-subitting-text"), jQuery(r).find("button.wfop_submit_btn .bwf_heading").html(e), void 0 !== window.intlTelInputGlobals && void 0 !== jQuery(r).find('input[name="wfop_optin_phone"]').get(0) && (e = window
            .intlTelInputGlobals
            .getInstance(jQuery(r).find('input[name="wfop_optin_phone"]').get(0))
            .getSelectedCountryData(), jQuery(r)
            .find('input[name="wfop_optin_phone_dialcode"]')
            .eq(0)
            .val("+" + e.dialCode), jQuery(r)
            .find('input[name="wfop_optin_phone_countrycode"]')
            .eq(0)
            .val(e.iso2)), t.parents(".wffn-custom-optin-from").addClass("wffn-form-overlay"), i.handleLeadEvent(), jQuery.ajax({
            url: window.wffnfunnelVars.ajaxUrl + "?action=wffn_submit_custom_optin_form&lead_event_id=" + wffnfunnelVars
              .op_lead_tracking
              .fb
              .event_ID,
            data: jQuery(r).serialize(),
            dataType: "json",
            type: "post"
          }).always(function (n) {
            if (t.parents(".wffn-custom-optin-from").addClass("wffn-form-overlay"), Object
                .prototype
                .hasOwnProperty
                .call(n, "mapped")) {
              for (var e in n.mapped) 
                jQuery(".wfop_integration_form input[name='" + e + "']").val(n.mapped[e]);
              
              jQuery(".wfop_integration_form").trigger("submit")
            } else 
              Object
                .prototype
                .hasOwnProperty
                .call(n, "next_url") && "" !== n.next_url && (window.location.href = n.next_url)
            
          }))
          : console.log("form validation failed")
      })
    },
    handleSubmit: function () {
      var n = this;
      jQuery("form.wffn-custom-optin-from").each(function () {
        n.setUpClick(this)
      })
    },
    handleLeadEvent: function () {
      var n,
        e,
        t,
        a,
        o,
        f,
        r;
      "object" === _typeof(wffnfunnelVars
        .op_lead_tracking
        .fb
        .enable) && "yes" === wffnfunnelVars
        .op_lead_tracking
        .fb
        .enable[0] && !1 !== wffnfunnelVars
        .op_lead_tracking
        .fb
        .fb_pixels && (
        "undefined" == typeof fbq && (n = window, e = document, n.fbq || (t = n.fbq = function () {
          t.callMethod
            ? t.callMethod.apply(t, arguments)
            : t.queue.push(arguments)
        }, n._fbq || (n._fbq = t), (t.push = t).loaded =! 0, t.version = "2.0", t.queue =[], (a = e.createElement("script")).async =! 0, a.src = "https://connect.facebook.net/en_US/fbevents.js", (r = e.getElementsByTagName("script")[0]).parentNode.insertBefore(a, r)), a = wffnfunnelVars
          .op_lead_tracking
          .fb
          .fb_pixels
          .split(","), i(a).each(function (n, e) {
          fbq("init", e)
        })),
        r = "undefined" != typeof wffnAddTrafficParamsToEvent
          ? wffnAddTrafficParamsToEvent({})
          : {},
        fbq("track", "Lead", r, {
          eventID: wffnfunnelVars
            .op_lead_tracking
            .fb
            .event_ID
        })
      ),
      "object" === _typeof(wffnfunnelVars
        .op_lead_tracking
        .pint
        .enable) && "yes" === wffnfunnelVars
        .op_lead_tracking
        .pint
        .enable[0] && !1 !== wffnfunnelVars
        .op_lead_tracking
        .pint
        .pixels && (
        window.pintrk || (window.pintrk = function () {
          window
            .pintrk
            .queue
            .push(Array
              .prototype
              .slice
              .call(arguments))
        }, (o = window.pintrk).queue =[], o.version = "3.0", (a = document.createElement("script")).async =! 0, a.src = "https://s.pinimg.com/ct/core.js", (o = document.getElementsByTagName("script")[0]).parentNode.insertBefore(a, o)),
        o = wffnfunnelVars
          .op_lead_tracking
          .pint
          .pixels
          .split(","),
        i(o).each(function (n, e) {
          pintrk("load", e, {np: "woofunnels"}),
          pintrk("page")
        }),
        r = "undefined" != typeof wffnAddTrafficParamsToEvent
          ? wffnAddTrafficParamsToEvent({})
          : {},
        pintrk("track", "Lead", r)
      ),
      "object" === _typeof(wffnfunnelVars
        .op_lead_tracking
        .ga
        .enable) && "yes" === wffnfunnelVars
        .op_lead_tracking
        .ga
        .enable[0] && !1 !== wffnfunnelVars
        .op_lead_tracking
        .ga
        .ids && (f = wffnfunnelVars
        .op_lead_tracking
        .ga
        .ids
        .split(","), (
          r = "undefined" != typeof wffnAddTrafficParamsToEvent
            ? wffnAddTrafficParamsToEvent({})
            : {}
        ).send_to = f[0], gtag("event", "Lead", r)),
      "object" === _typeof(wffnfunnelVars
        .op_lead_tracking
        .gad
        .enable) && "yes" === wffnfunnelVars
        .op_lead_tracking
        .gad
        .enable[0] && !1 !== wffnfunnelVars
        .op_lead_tracking
        .gad
        .ids && (f = wffnfunnelVars
        .op_lead_tracking
        .gad
        .ids
        .split(","), (
          r = "undefined" != typeof wffnAddTrafficParamsToEvent
            ? wffnAddTrafficParamsToEvent({})
            : {}
        ).send_to = f[0], gtag("event", "Lead", r))
    }
  }).init()
}(jQuery);
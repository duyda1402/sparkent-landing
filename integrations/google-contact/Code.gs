/**
 * Google Apps Script web app for the contact form on sparkent.vn.
 * Script properties: FORM_ID (Google Form editor ID), NOTIFICATION_EMAIL.
 */
function setupContactForm() {
  // Run once from the script editor attached to the Form. Bound-form access is
  // unavailable inside the deployed web app, so store the ID for doPost().
  var form = FormApp.getActiveForm();
  if (!form) throw new Error('Open this script from the Google Form editor');
  PropertiesService.getScriptProperties().setProperty('FORM_ID', form.getId());
  console.log('FORM_ID saved for ' + form.getTitle());
}

function doPost(event) {
  var values = event && event.parameter ? event.parameter : {};
  var requestId = /^[0-9a-f-]{36}$/i.test(values.requestId || '') ? values.requestId : '';

  try {
    if (!requestId || values.website) {
      return contactResult_(requestId, 'error');
    }

    var name = String(values.name || '').trim();
    var email = String(values.email || '').trim();
    var lookingFor = String(values.lookingFor || '').trim();
    var message = String(values.message || '').trim();
    if (!name || name.length > 200 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
        ['STUDIO', 'ACADEMY', 'LABEL', 'COLLAB'].indexOf(lookingFor) === -1 ||
        !message || message.length > 5000) {
      return contactResult_(requestId, 'error');
    }

    var settings = PropertiesService.getScriptProperties();
    var formId = settings.getProperty('FORM_ID');
    if (!formId) throw new Error('Missing FORM_ID script property');

    var form = FormApp.openById(formId);
    var items = form.getItems();
    var nameItem = contactItem_(items, 'Họ và tên', FormApp.ItemType.TEXT);
    var emailItem = contactItem_(items, 'Email', FormApp.ItemType.TEXT);
    var interestItem = contactItem_(items, 'Lĩnh vực quan tâm', FormApp.ItemType.LIST).asListItem();
    var messageItem = contactItem_(items, 'Mô tả dự án', FormApp.ItemType.PARAGRAPH_TEXT);
    var validChoice = interestItem.getChoices().some(function (choice) {
      return choice.getValue() === lookingFor;
    });
    if (!validChoice) throw new Error('Interest value is absent from the Google Form');

    form.createResponse()
      .withItemResponse(nameItem.asTextItem().createResponse(name))
      .withItemResponse(emailItem.asTextItem().createResponse(email))
      .withItemResponse(interestItem.createResponse(lookingFor))
      .withItemResponse(messageItem.asParagraphTextItem().createResponse(message))
      .submit();

    // Programmatic FormResponse.submit() does not fire the form-submit trigger.
    // Send the notification here, after the response has been saved.
    var notificationEmail = settings.getProperty('NOTIFICATION_EMAIL');
    if (notificationEmail) {
      try {
        MailApp.sendEmail({
          to: notificationEmail,
          subject: '[Spark] Liên hệ mới: ' + lookingFor,
          body: 'Họ và tên: ' + name + '\nEmail: ' + email +
            '\nLĩnh vực: ' + lookingFor + '\nMô tả dự án:\n' + message,
          replyTo: email
        });
      } catch (mailError) {
        // The Google Form/Sheet already contains this response.
        console.error('Contact saved, but notification failed: ' + mailError);
      }
    }

    return contactResult_(requestId, 'saved');
  } catch (error) {
    console.error('Contact submission failed: ' + error);
    return contactResult_(requestId, 'error');
  }
}

function contactItem_(items, title, type) {
  var item = items.filter(function (candidate) {
    return candidate.getTitle().trim() === title && candidate.getType() === type;
  })[0];
  if (!item) throw new Error('Missing Google Form question: ' + title);
  return item;
}

function contactResult_(requestId, status) {
  var payload = JSON.stringify({
    source: 'spark-contact-form',
    requestId: requestId,
    status: status
  });
  // The web page receives the save result from the hidden iframe.
  return HtmlService.createHtmlOutput(
    '<!doctype html><html><body><script>window.top.postMessage(' + payload +
    ', "*");</script></body></html>'
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

var ss = SpreadsheetApp.getActiveSpreadsheet();
var trackerSheet = ss.getSheets()[0];

function test() {
 highlightRow(trackerSheet, 60, "FF0000"); 
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();

  ui.createMenu('ALI Tools')
      .addItem('Add uSC', 'addWorkerDisplay')
      .addSeparator()
      .addToUi();
}

function addWorkerDisplay() {
  var html = HtmlService.createHtmlOutputFromFile('AddWorkerForm.html')
      .setWidth(350);
  SpreadsheetApp.getUi()
      .showModalDialog(html, 'Add uSC');
}

function isEmpty(str) {
    return !str || 0 === str.length;
}

function addRow(sheet, rowIndex, data) {
  Logger.log(rowIndex);
  Logger.log(data);
  sheet.insertRowBefore(rowIndex).getRange(rowIndex, 1, 1, data.length).setValues([data]);
}

function highlightRow(sheet, rowIndex, color) {
  sheet.getRange(rowIndex.toString() + ":" + rowIndex.toString()).setBackground(color);
}

function addWorker(form) {
  var name = form.name;
  var phone = form.phone;
  var email = form.email;
  var major = form.major;
  var ws = form.ws.substring(0,1).toUpperCase();
  var re = form.re;
  var mentor = form.mentor;
  var grad = form.grad;
  
  var sheet = trackerSheet;
  var names = sheet.getRange("A10:A").getValues();
  
  if(!isEmpty(name)) {
    for(var i = 0; i < names.length; ++i) {
      var comp = name.localeCompare(names[i]);
      
      if(comp === -1 || isEmpty(names[i])) {
        addRow(sheet, 10 + i, [name, 1, phone, email, major, ws, mentor, grad]);
        
        if(re === "no") {
          highlightRow(sheet, 10 + i, "#FFFF00");
        }
  
        break;
      }
    }
  }
}
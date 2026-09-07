function processRow(e) {
  $(e).closest('tbody').find('tr').each(function(index) {
    let qty = parseFloat($(this).find('input.calc[name="quantity"').val());
    let cost = parseFloat($(this).find('input.calc[name="cost"').val());
    let subtotal = (qty * cost).toFixed(2);
    $(this).find('input[name="itemTotal"]').val(subtotal);
  });
};

function addRow(e) {
  let clone = $(e).closest('table').find('tbody tr:last-child').clone(true);
  clone.removeAttr('id'); // avoid duplicate ids in same document.
  $(e).closest('table').find('tbody').append(clone);
};

function main() {
  // Setup up add row button
  $('#sheet0 button.addRow').on('click', function(e) {
    addRow(this);
  });
  // find all input elements that will trigger a recalculation of the 
  // sheet.
  $('#sheet0 input.calc').on('change', function(e) {
    processRow(this);
  });
}

// make sure entire document is loaded
// before interacting with DOM.
$(document).ready(function() {
  main();
});

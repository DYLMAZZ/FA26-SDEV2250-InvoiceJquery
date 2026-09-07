function processRow(e) {
  $(e).closest('tbody').find('tr').each(function(index) {
    let qty = parseFloat($(this).find('input.calc[name="quantity"]').val());
    let cost = parseFloat($(this).find('input.calc[name="cost"').val());
    let subtotal = (qty * cost).toFixed(2);
    $(this).find('input[name="itemTotal"]').val(subtotal);
  });

  processTotals(e); //doing this as a separate function
};

function processTotals(e) {
    let table = $(e).closest('table');
    let subtotal = 0;
    
    // sum all elements in table with name="itemTotal
    table.find('input[name="itemTotal"]').each(function(){
        subtotal += parseFloat($(this).val()) || 0;
    });
    
    table.find('input[name="subTotal"]').val(subtotal.toFixed(2));

    let taxRate = parseFloat(table.find('input[name="tax"]').val()) || 0;
    let taxTotal = subtotal * (taxRate / 100);

    table.find('input[name="taxTotal"]').val(taxTotal.toFixed(2));

    let total = subtotal + taxTotal;

    table.find('input[name="total"]').val(total.toFixed(2));
}

function addRow(e) {
  let clone = $(e).closest('table').find('tbody tr:last-child').clone(true);
  clone.removeAttr('id'); // avoid duplicate ids in same document.

  //clear cloned row's values
  clone.find('input').val(function(){
    return $(this).attr('name') === 'item' ? '' : '0';
  });

  $(e).closest('table').find('tbody').append(clone);
};

function main() {
  // Setup up add row button
  $('.sheet button.addRow').on('click', function(e) {
    addRow(this);
  });
  // find all input elements that will trigger a recalculation of the 
  // sheet.
  $('.sheet input.calc').on('change', function(e) {
    processRow(this);
  });
}

// make sure entire document is loaded
// before interacting with DOM.
$(document).ready(function() {
  main();
});

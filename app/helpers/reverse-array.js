export default function reverseArray(array, status) {
  if (status == 'all') {
    return array.slice().reverse();
  } else if (status == 'credit'){
    return array.slice().reverse().filter(val => val.method == 'credit')
  } else if (status == 'debit'){
    return array.slice().reverse().filter(val => val.method == 'debit')
  } else {
    return array.slice().reverse().filter(val => val.method == 'refund')
  }
  
}
